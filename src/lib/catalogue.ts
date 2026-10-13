import type { WooProduct } from '@/services/types';

// The seven single products sit in these WooCommerce categories. Anything else
// - the "Bundle" category, or none at all - is a bundle of those products.
const SINGLE_CATEGORIES = new Set(['Daily Ritual', 'Defense', 'Remedy', 'Refresh']);

export function isBundle(product: WooProduct): boolean {
  return !SINGLE_CATEGORIES.has(product.category);
}

/** The core range only - for sections that introduce the seven products. */
export function singleProducts(products: WooProduct[]): WooProduct[] {
  return products.filter((p) => !isBundle(p));
}
