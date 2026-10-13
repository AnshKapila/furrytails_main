import { NextResponse, type NextRequest } from 'next/server';

// Pass-through middleware, plus a Cache-Control correction for HTML documents.
//
// Previously re-exported ``@appsmithorg/template-shared/middleware`` (a
// prerender-for-bots helper), but that file uses ``return fetch(req)`` for the
// pass-through case, which loops back through Vercel's edge into middleware
// again → 508 INFINITE_LOOP_DETECTED on the Next.js pipeline. Legacy apps were
// rescued by ``next.config.js``'s rewrite to ``/prototype.html`` (a static file
// that bypasses middleware re-entry); the Next.js pipeline has no such rewrite.
//
// Re-enable prerender once the upstream package is fixed to use
// ``NextResponse.next()`` for pass-through.
export default function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Next serves prerendered pages with ``Cache-Control: s-maxage=31536000``,
  // which assumes the CDN in front is purged on deploy (Vercel does that
  // automatically). Hostinger's hcdn does not, so it pinned the document at
  // the edge - one was observed with ``Age: 67138``. Chunk filenames are
  // content-hashed, so that stale document requested the previous build's
  // ``/_next/static/chunks/*``, the stylesheet 404'd, and the page painted with
  // no CSS at all: `next/image` fill images lost their `relative` container and
  // stretched to the full viewport until the client recovered and reloaded.
  //
  // Measured after deploying this: document requests come back
  // ``public, max-age=0, must-revalidate`` with ``x-hcdn-cache-status:
  // DYNAMIC``, i.e. hcdn stops edge-caching the HTML. ETag still makes
  // revalidation a cheap 304, and the hashed assets stay immutable because the
  // matcher below skips them.
  //
  // Set here rather than in next.config.js's headers(), which Next documents as
  // being overwritten for statically generated routes.
  //
  // Note this deliberately only covers document requests. Anything sending
  // ``Accept: */*`` still gets Next's ``s-maxage=31536000``, so the page
  // segments also set ``revalidate`` to keep that ceiling short - see
  // src/app/layout.tsx.
  if (req.headers.get('accept')?.includes('text/html')) {
    res.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
  }

  return res;
}

export const config = {
  // Skip the immutable build output and the image optimizer - their long-lived
  // caching is correct and must not be downgraded.
  matcher: ['/((?!_next/static|_next/image).*)'],
};
