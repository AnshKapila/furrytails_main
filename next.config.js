const fs = require('node:fs');
const path = require('node:path');

// Legacy HTML pipeline marker. The old Python ``website_create`` pipeline
// writes the chosen design to ``public/prototype.html``; the Next.js
// pipeline (``website_create_opencode``) overlays real routes onto
// ``src/app/`` and never writes a prototype file. The rewrite below only
// kicks in for legacy apps so the new pipeline's real routes take effect
// without hitting an infinite-loop on Vercel
// (``/`` → ``/prototype.html`` → 404 → ``_not-found`` → rewrite → loop).
const hasPrototypeHtml = fs.existsSync(
  path.join(__dirname, 'public', 'prototype.html'),
);

// Cache-bust for the stamp-driven analytics SDK, DERIVED from the file bytes at
// build time (never hand-bumped): /kite-analytics.js is served from public/ at a
// stable path, so the layout busts browser/CDN caches with ?v=<content hash>.
// Any SDK edit changes the hash on the next build — it cannot be forgotten.
const crypto = require('node:crypto');
const kiteSdkPath = path.join(__dirname, 'public', 'kite-analytics.js');
const kiteSdkHash = fs.existsSync(kiteSdkPath)
  ? crypto
      .createHash('sha256')
      .update(fs.readFileSync(kiteSdkPath))
      .digest('hex')
      .slice(0, 12)
  : 'dev';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    NEXT_PUBLIC_KITE_SDK_HASH: kiteSdkHash,
  },
  reactStrictMode: true,
  devIndicators: false,
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['*.sandbox.kite.ai'],

  experimental: {
    // Firefox reports transferSize=0 for cross-site iframe navigations, which
    // the dev client's debug channel misreads as an HTTP-cache restore and
    // answers with location.reload() — an infinite reload loop inside the
    // preview iframe. The channel only streams React debug info in dev.
    reactDebugChannel: false,
  },

  // Gentle Daily Shampoo was one variable product with three fragrance
  // variations. The client split it into three separate simple products, so the
  // old slug no longer resolves. 301 to the closest successor (Fig & Neroli was
  // the fragrance the parent product's own image showed) rather than letting it
  // 404 - it is in the sitemap and may be linked externally.
  //
  // Without this the retired page also keeps serving from the ISR cache: when
  // revalidation finds no product it calls notFound(), which throws, and Next
  // deliberately keeps the last good page rather than caching an error.
  async redirects() {
    return [
      {
        source: '/products/gentle-daily-shampoo',
        destination: '/products/gentle-daily-shampoo-fig-neroli',
        permanent: true,
      },
    ];
  },

  // Legacy: serve the chosen design as the live site. The backend writes
  // ``public/prototype.html`` (with its content JSONs in ``public/content/``)
  // and this rewrite makes any non-API, non-static request fall through to
  // that single static file. The prototype's own client-side router handles
  // route changes by reading ``window.location.pathname``, so multi-page
  // sites work without per-route server handlers.
  async rewrites() {
    if (!hasPrototypeHtml) return [];
    return [
      {
        source:
          '/((?!api|_next|content|images|js|favicon|robots|sitemap|prototype).*)',
        destination: '/prototype.html',
      },
    ];
  },
};

module.exports = nextConfig;
