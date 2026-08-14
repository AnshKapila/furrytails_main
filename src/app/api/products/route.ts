import { NextResponse } from 'next/server';
import { fetchProducts } from '@/lib/woo';

// Same-origin catalogue endpoint for client components (search overlay,
// homepage product rails). Server components import getAllProducts() directly
// and never come through here.
//
// Exists so the browser never talks to store.furrytailjoy.com — that would be a
// cross-origin request needing CORS headers on the WordPress side.

export const revalidate = 300;

export async function GET() {
  try {
    const products = await fetchProducts();
    return NextResponse.json(
      { products },
      {
        headers: {
          // Serve stale while revalidating so a slow WordPress never blocks
          // the browser on an interaction like opening search.
          'Cache-Control':
            'public, s-maxage=300, stale-while-revalidate=3600',
        },
      },
    );
  } catch (err) {
    console.error('[api/products]', err);
    // Deliberately not returning an empty product list with a 200 — callers
    // must be able to tell "catalogue unavailable" from "no products".
    //
    // no-store is essential: without it this error inherits the route's
    // revalidate window and gets persisted to .next/cache, so a brief
    // WordPress outage leaves the endpoint returning 503 long after the store
    // recovers — and a process restart does not clear it, only a rebuild does.
    // That happened in production during the domain migration.
    return NextResponse.json(
      { products: [], error: 'catalogue_unavailable' },
      {
        status: 503,
        headers: { 'Cache-Control': 'no-store, must-revalidate' },
      },
    );
  }
}
