// ─────────────────────────────────────────────────────────────────────────────
// Content + catalogue access.
//
// Two distinct sources, deliberately kept separate:
//
//   Products   → WooCommerce Store API (live, editable in wp-admin)
//   Editorial  → src/data/home.ts (hero copy, brand story, ingredient chapters)
//
// Product functions are async and must be called from a server component or a
// route handler. Client components read /api/products instead — same-origin,
// so no CORS and no API keys anywhere.
// ─────────────────────────────────────────────────────────────────────────────

import {
  allProducts,
  bestSellers,
  brandPhilosophy,
  brandStory,
  contact,
  footer,
  founderNote,
  hero,
  heroImages,
  ingredientChapters,
  ingredientStories,
  LOGO_URL,
  navLinks,
  ourRange,
  pillars,
} from '@/data/home';

import { fetchProducts, fetchProductBySlug } from '@/lib/woo';

export type {
  WooImage,
  WooProduct,
  WooProductVariant,
  WooShopContent,
} from '@/services/types';

import type { WooProduct, WooShopContent } from '@/services/types';

export interface WooGlobalSettings {
  logoUrl: string;
  navLinks: Array<{ label: string; href: string }>;
  footer: typeof footer;
  contact: typeof contact;
}

// ─── Editorial content (static, synchronous) ─────────────────────────────────

/** Global layout content — navbar, footer, contact. */
export function getGlobalSettings(): WooGlobalSettings {
  return { logoUrl: LOGO_URL, navLinks, footer, contact };
}

/** Homepage editorial content. Product lists come from getAllProducts(). */
export function getHomeContent() {
  return {
    hero,
    heroImages,
    brandPhilosophy,
    pillars,
    founderNote,
    bestSellers: {
      eyebrow: bestSellers.eyebrow,
      heading: bestSellers.heading,
      subheading: bestSellers.subheading,
    },
    ourRange: {
      eyebrow: ourRange.eyebrow,
      heading: ourRange.heading,
    },
  };
}

/** Shop page headings and filter options. */
export function getShopContent(): WooShopContent {
  return {
    eyebrow: allProducts.eyebrow,
    heading: allProducts.heading,
    subheading: allProducts.subheading,
    filterCategories: allProducts.filterCategories,
    filterPets: allProducts.filterPets,
    filterTypes: allProducts.filterTypes,
  };
}

export function getAboutContent() {
  return { brandStory };
}

export function getIngredientsContent() {
  return { chapters: ingredientChapters, stories: ingredientStories };
}

// ─── Products (live from WooCommerce) ────────────────────────────────────────

/**
 * Every published product, newest WooCommerce data.
 *
 * Server-side only. Throws if the catalogue is unreachable or validates to
 * empty — that is intentional, so Next.js keeps serving the last good page
 * instead of caching an empty one. See docs/resilience.md R3.
 */
export async function getAllProducts(): Promise<WooProduct[]> {
  return fetchProducts();
}

/**
 * A single product by slug.
 *
 * Named "ById" because the public identifier *is* the slug — /products/<slug>.
 */
export async function getProductById(
  slug: string,
): Promise<WooProduct | undefined> {
  const product = await fetchProductBySlug(slug);
  return product ?? undefined;
}

/** Up to `limit` products other than `excludeSlug`, same category first. */
export async function getRelatedProducts(
  excludeSlug: string,
  category: string,
  limit = 3,
): Promise<WooProduct[]> {
  const products = await getAllProducts();
  return products
    .filter((p) => p.id !== excludeSlug)
    .sort(
      (a, b) =>
        Number(b.category === category) - Number(a.category === category),
    )
    .slice(0, limit);
}
