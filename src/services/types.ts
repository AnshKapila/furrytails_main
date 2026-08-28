// ─────────────────────────────────────────────────────────────────────────────
// Shared content/product types.
//
// Lives in its own module so src/lib/woo.ts (the Store API client) and
// src/services/api.ts can both use them without a circular import.
// ─────────────────────────────────────────────────────────────────────────────

export interface WooImage {
  src: string;
  alt: string;
}

export interface WooProductVariant {
  id: string; // fragrance term slug, e.g. "fig-neroli"
  label: string; // display name, e.g. "Fig & Neroli"
  price: string; // pre-formatted, e.g. "₹695"
  standardPrice?: string | null;
  shortDesc?: string;
  image?: WooImage;
}

export interface WooProduct {
  id: string; // product slug — drives /products/<id>
  name: string;
  price: string; // pre-formatted, e.g. "₹695"
  standardPrice?: string | null; // non-null renders a strikethrough
  badge?: string | null;
  category: string; // e.g. "Daily Ritual"
  image: WooImage;
  gallery?: WooImage[]; // full WooCommerce image gallery, featured image first
  productType?: string; // from pa_producttype, e.g. "Shampoo"
  species?: 'dog' | 'cat' | 'both'; // from pa_pet term slug
  volume?: string; // from pa_volume, e.g. "300 ml"
  variantLabel?: string; // single-fragrance products only
  variants?: WooProductVariant[]; // variable products only
  shortDesc?: string;
  description?: string; // HTML: ingredients / how to use / safety
  slug?: string;
  sku?: string;
  inStock?: boolean;
  descriptor?: string;
}

export interface WooShopContent {
  eyebrow: string;
  heading: string;
  subheading: string;
  filterCategories: readonly string[];
  filterPets: readonly string[];
  filterTypes: readonly string[];
}
