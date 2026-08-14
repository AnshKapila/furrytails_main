'use client';

import { useEffect, useState } from 'react';
import type { WooProduct } from '@/services/types';

// Module-level cache so the search overlay and the homepage rails share one
// request per page load rather than each fetching the catalogue.
let cache: WooProduct[] | null = null;
let inflight: Promise<WooProduct[]> | null = null;

async function load(): Promise<WooProduct[]> {
  if (cache) return cache;
  if (inflight) return inflight;

  inflight = fetch('/api/products')
    .then((res) => {
      if (!res.ok) throw new Error(`/api/products responded ${res.status}`);
      return res.json();
    })
    .then((data) => {
      const products: WooProduct[] = Array.isArray(data?.products)
        ? data.products
        : [];
      // Only cache a non-empty catalogue, so a transient failure doesn't pin an
      // empty list for the rest of the session.
      if (products.length) cache = products;
      return products;
    })
    .finally(() => {
      inflight = null;
    });

  return inflight;
}

/**
 * Catalogue for client components.
 *
 * Server components should call getAllProducts() from '@/services/api' instead —
 * that renders products into the HTML and is what product/shop pages use.
 */
export function useProducts(): {
  products: WooProduct[];
  loading: boolean;
  error: boolean;
} {
  const [products, setProducts] = useState<WooProduct[]>(cache ?? []);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (cache) return;
    let active = true;

    load()
      .then((p) => {
        if (!active) return;
        setProducts(p);
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setError(true);
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { products, loading, error };
}
