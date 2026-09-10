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

const API_BASE = 'https://developers.hostinger.com';

export async function register() {
  // Middleware and edge routes each get their own runtime; only purge from the
  // Node server, and never from a dev server.
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;
  if (process.env.NODE_ENV !== 'production') return;

  const token = process.env.HOSTINGER_API_TOKEN;
  const username = process.env.HOSTINGER_ACCOUNT_USERNAME;
  const domain = process.env.HOSTINGER_PURGE_DOMAIN;

  if (!token || !username || !domain) return;

  const url =
    `${API_BASE}/api/hosting/v1/accounts/${encodeURIComponent(username)}` +
    `/websites/${encodeURIComponent(domain)}/cache/clear`;

  // Deliberately not awaited: a purge must never delay or fail the boot that
  // is meant to be serving the new build. Failures are logged, not thrown.
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
        console.log(`[cdn-purge] purged ${domain}`);
        return;
      }

      // Body carries the reason (bad token, wrong username, CDN not enabled on
      // the plan), which is the whole difficulty of debugging this remotely.
      const body = await res.text().catch(() => '');
      console.error(
        `[cdn-purge] failed for ${domain}: ${res.status} ${res.statusText} ${body.slice(0, 500)}`,
      );
    } catch (err) {
      console.error(`[cdn-purge] request error for ${domain}:`, err);
    }
  })();
}
