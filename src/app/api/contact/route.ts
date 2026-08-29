import { NextResponse } from 'next/server';

// ─────────────────────────────────────────────────────────────────────────────
// Contact form endpoint.
//
// Sends the message through Brevo's transactional email API. Deliberately a
// plain fetch rather than an SDK — it is one HTTPS POST, and this avoids adding
// a dependency to the deploy bundle.
//
// Replaces the form's original target, a Kite platform URL that does not exist
// in this app: it 404'd on every submission, so the form showed an error to
// every customer who tried to use it.
//
// Required env (server-only — NOT NEXT_PUBLIC, so these are read at runtime and
// can be set in hPanel without rebuilding):
//   BREVO_API_KEY       Brevo → SMTP & API → API Keys (v3)
//   CONTACT_TO_EMAIL    where messages land
//   CONTACT_FROM_EMAIL  a sender Brevo has verified for this domain
// ─────────────────────────────────────────────────────────────────────────────

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const BREVO_ENDPOINT = 'https://api.brevo.com/v3/smtp/email';

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;

// Best-effort in-process rate limit. Not distributed and resets on restart,
// which is fine: it exists to blunt casual abuse of a public endpoint, not to
// be an authority.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Keep the map from growing without bound on a long-lived process.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

/** Strip CR/LF so a submitted value cannot inject extra email headers. */
function oneLine(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

/** Escape before interpolating user input into the HTML part of the email. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(req: Request) {
  const apiKey = process.env.BREVO_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? to;

  if (!apiKey || !to || !from) {
    console.error('[api/contact] missing BREVO_API_KEY / CONTACT_TO_EMAIL');
    return NextResponse.json(
      { ok: false, error: 'not_configured' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  // Honeypot: a real person never fills a field they cannot see. Answer 200 so
  // a bot gets no signal that it was rejected.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const name = oneLine(String(body.name ?? '')).slice(0, MAX_NAME);
  const email = oneLine(String(body.email ?? '')).slice(0, MAX_EMAIL);
  const message = String(body.message ?? '').trim().slice(0, MAX_MESSAGE);

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 });
  }

  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { ok: false, error: 'rate_limited' },
      { status: 429, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  try {
    const res = await fetch(BREVO_ENDPOINT, {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'Furrytail Website', email: from },
        to: [{ email: to }],
        // So hitting reply in the inbox answers the customer directly.
        replyTo: { email, name },
        subject: `Website enquiry from ${name}`,
        // Sender details go FIRST, and without angle brackets. The previous
        // version put them in a footer as "From: Name <a@b.com>" and the
        // address was disappearing — a bare <a@b.com> parses as an unknown HTML
        // tag and gets dropped, so the reply address never reached the inbox.
        textContent: [
          `Name:  ${name}`,
          `Email: ${email}`,
          '',
          'Message:',
          message,
          '',
          '--',
          'Sent from the furrytailjoy.com contact form.',
          'Reply to this email to answer the customer directly.',
        ].join('\n'),
        htmlContent: [
          '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#3B3A38;line-height:1.6">',
          `<p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(name)}</p>`,
          `<p style="margin:0 0 16px"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>`,
          '<p style="margin:0 0 6px"><strong>Message:</strong></p>',
          `<p style="margin:0;white-space:pre-wrap">${escapeHtml(message)}</p>`,
          '<hr style="border:none;border-top:1px solid #E9E2D7;margin:20px 0">',
          '<p style="margin:0;font-size:13px;color:#8D9A83">Sent from the furrytailjoy.com contact form. Reply to this email to answer the customer directly.</p>',
          '</div>',
        ].join(''),
      }),
      cache: 'no-store',
    });

    if (!res.ok) {
      // Log Brevo's reason (bad key, unverified sender, quota) but never return
      // it — it can contain account detail.
      console.error('[api/contact] brevo responded', res.status, await res.text());
      return NextResponse.json(
        { ok: false, error: 'send_failed' },
        { status: 502, headers: { 'Cache-Control': 'no-store' } },
      );
    }

    return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (err) {
    console.error('[api/contact]', err);
    return NextResponse.json(
      { ok: false, error: 'send_failed' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
