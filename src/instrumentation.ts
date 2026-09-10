import { setCdnPurgeStatus } from '@/lib/cdn-purge-status';

// Purge the Hostinger CDN cache once, when the server starts.
//
// Hostinger's CDN does not purge on deploy (unlike Vercel's, which Next's
// caching defaults assume). Its docs claim dynamic content is never
// CDN-cached, but that only holds for PHP: Next serves prerendered pages with
// ``Cache-Control: s-maxage=31536000``, which hcdn honours - a document was
// observed held at the edge with ``Age: 67138``. Because chunk filenames are
// content-hashed, a stale document requests the previous build's
// ``/_next/static/chunks/*``, the stylesheet 404s, and the site paints with no
// CSS until the client gives up and reloads.
//
// ``middleware.ts`` stops document requests being edge-cached, and the page
// segments cap ``s-maxage`` for everything else, so fresh HTML should reach
// visitors without this. It stays as the belt to those braces: it also clears
// anything cached before this build went live, and it is the only mechanism
// that works if the CDN ever ignores the response headers.
//
// A deploy on Hostinger means the Web App restarts, so hooking server startup
// is what "purge on redeploy" looks like here - there is no deploy webhook to
// hang it off.
//
// Entirely opt-in: with no credentials set this is a no-op, so local dev and
// any other host are unaffected. Set in hPanel > Web App > environment:
//   HOSTINGER_API_TOKEN         hpanel.hostinger.com/api (Dev tools > API)
//   HOSTINGER_ACCOUNT_USERNAME  hosting account username (scripts/purge-cdn.ps1
//                               prints it)
//   HOSTINGER_PURGE_DOMAIN      e.g. furrytailjoy.com
//
// Every outcome is recorded for /api/v1/health, because hPanel does not expose
// the runtime log - stdout here is effectively write-only.

const API_BASE = 'https://developers.hostinger.com';

export async function register() {
  // Middleware and edge routes each get their own runtime; only the Node server
  // should purge. Edge isolates have their own globalThis, so returning here
  // cannot clobber the record the Node runtime writes below.
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;

  const at = new Date().toISOString();
  const nodeEnv = process.env.NODE_ENV ?? 'unset';

  // Recorded before any further guard so that an early return still leaves
  // evidence on /api/v1/health. Without this, "instrumentation did not run"
  // was ambiguous: it could mean register() was never called, or that it bailed
  // at a guard without recording. Overwritten by the real outcome below.
  setCdnPurgeStatus({ at, ok: false, detail: `started (NODE_ENV=${nodeEnv})` });

  // Skip an actual dev server only. This previously required
  // NODE_ENV === 'production' and returned silently, which disabled the purge
  // in any runtime where NODE_ENV was merely unset - and left no trace saying
  // so. The credentials below are the real gate: without them this is a no-op,
  // and a dev machine will not have them set.
  if (nodeEnv === 'development') {
    setCdnPurgeStatus({ at, ok: false, detail: 'skipped - development' });
    return;
  }

  const token = process.env.HOSTINGER_API_TOKEN;
  const username = process.env.HOSTINGER_ACCOUNT_USERNAME;
  const domain = process.env.HOSTINGER_PURGE_DOMAIN;

  // Reported by name rather than silently skipped: a dropped env var is the
  // likeliest way this safety net dies, and it is otherwise undetectable.
  const missing = [
    !token && 'HOSTINGER_API_TOKEN',
    !username && 'HOSTINGER_ACCOUNT_USERNAME',
    !domain && 'HOSTINGER_PURGE_DOMAIN',
  ].filter(Boolean);

  if (missing.length) {
    const detail = `skipped - not set: ${missing.join(', ')}`;
    setCdnPurgeStatus({ at, ok: false, detail });
    console.log(`[cdn-purge] ${detail}`);
    return;
  }

  const url =
    `${API_BASE}/api/hosting/v1/accounts/${encodeURIComponent(username!)}` +
    `/websites/${encodeURIComponent(domain!)}/cache/clear`;

  // Deliberately not awaited: a purge must never delay or fail the boot that
  // is meant to be serving the new build. Failures are recorded, not thrown.
  void (async () => {
    try {
      const res = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
        signal: AbortSignal.timeout(15_000),
      });

      if (res.ok) {
        setCdnPurgeStatus({ at, ok: true, detail: `purged ${domain}` });
        console.log(`[cdn-purge] purged ${domain}`);
        return;
      }

      // The body carries the reason (bad token, wrong username, CDN not enabled
      // on the plan) and can name account details, so it goes to stdout only -
      // /api/v1/health is public and records the status code alone.
      const body = await res.text().catch(() => '');
      setCdnPurgeStatus({ at, ok: false, detail: `HTTP ${res.status}` });
      console.error(
        `[cdn-purge] failed for ${domain}: ${res.status} ${res.statusText} ${body.slice(0, 500)}`,
      );
    } catch (err) {
      setCdnPurgeStatus({ at, ok: false, detail: 'request failed' });
      console.error(`[cdn-purge] request error for ${domain}:`, err);
    }
  })();
}
