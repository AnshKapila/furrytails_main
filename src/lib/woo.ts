// ─────────────────────────────────────────────────────────────────────────────
// WooCommerce Store API client.
//
// Reads the catalogue from the public, read-only Store API on the WordPress
// install. No API keys are involved — Store API catalogue endpoints require no
// authentication, so nothing secret ever reaches this repo.
//
// Fetches run server-side (server components + the /api/products route
// handler), so they are server-to-server and no CORS is involved. Client
// components read /api/products instead, which is same-origin.
//
// See docs/build-brief.md for the architecture and docs/product-data.md for the
// WooCommerce field mapping.
// ─────────────────────────────────────────────────────────────────────────────

import type { WooProduct, WooProductVariant, WooImage } from '@/services/types';
import snapshotJson from '@/data/products.snapshot.json';

// ─── Build-time fallback ─────────────────────────────────────────────────────
// A committed snapshot of the catalogue, used ONLY when the Store API is
// unreachable during a production build.
//
// Why: a deploy must never be blocked by WordPress being briefly unavailable.
// This first bit during the apex domain migration — the build container hit an
// SSL error reaching store.furrytailjoy.com while certificates were reissuing,
// and the whole deploy failed.
//
// At RUNTIME the opposite behaviour is correct: a failed revalidation must
// throw, so Next.js keeps serving the last good page rather than caching an
// empty catalogue. See docs/resilience.md R3 and R4.
//
// Refresh with: curl -s <site>/api/products | jq .products > src/data/products.snapshot.json
const SNAPSHOT = snapshotJson as unknown as WooProduct[];

const IS_BUILD = process.env.NEXT_PHASE === 'phase-production-build';

function buildFallback(context: string, err: unknown): WooProduct[] {
  console.warn(
    `[woo] ${context} failed during build — falling back to committed ` +
      `snapshot (${SNAPSHOT.length} products). ISR will replace this with live ` +
      `data on the first request after deploy. Cause:`,
    err,
  );
  return SNAPSHOT;
}

export { WP_URL } from '@/lib/config';
import { WP_URL } from '@/lib/config';

const STORE_API = `${WP_URL}/wp-json/wc/store/v1`;

// Catalogue revalidation window. Prices and stock are up to this stale on the
// storefront; WooCommerce recalculates authoritatively at checkout either way.
const REVALIDATE_SECONDS = 300;

// ─── Store API response shapes (only the fields we consume) ──────────────────

interface StoreApiPrices {
  price: string; // minor units, e.g. "69500" == ₹695.00
  regular_price: string;
  sale_price: string;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
}

interface StoreApiImage {
  src: string;
  alt: string;
}

interface StoreApiTerm {
  name: string;
  slug: string;
}

interface StoreApiAttribute {
  name: string;
  taxonomy: string;
  terms: StoreApiTerm[];
}

interface StoreApiVariationRef {
  id: number;
  attributes: Array<{ name: string; value: string }>;
}

interface StoreApiProduct {
  id: number;
  name: string;
  slug: string;
  type: string;
  sku: string;
  short_description: string;
  description: string;
  on_sale: boolean;
  is_in_stock: boolean;
  is_purchasable: boolean;
  prices: StoreApiPrices;
  images: StoreApiImage[];
  categories: StoreApiTerm[];
  attributes: StoreApiAttribute[];
  variations?: StoreApiVariationRef[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Store API returns prices as integer strings in the currency's minor unit.
 * "69500" with currency_minor_unit 2 is ₹695.00.
 *
 * The rest of the app consumes pre-formatted display strings ("₹695"), matching
 * parsePrice() in src/lib/cart.tsx, so formatting happens here at the boundary.
 */
export function formatPrice(prices: StoreApiPrices): string {
  const value = Number(prices.price) / 10 ** prices.currency_minor_unit;
  if (!Number.isFinite(value)) return '';
  return `${prices.currency_symbol}${value.toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

function formatFrom(prices: StoreApiPrices, raw: string): string {
  return formatPrice({ ...prices, price: raw });
}

/**
 * Decode HTML entities.
 *
 * WordPress serves entity-encoded text in JSON: post titles use numeric
 * entities ("Anti-Tick &#038; Flea Spray") and taxonomy terms use named ones
 * ("Yuzu &amp; White Musk"). React escapes whatever it renders, so passing
 * these through untouched shows customers the literal "&#038;".
 *
 * Every plain-text field from the API must go through this. The `description`
 * field is the exception — it is intentional HTML and rendered as such.
 *
 * &amp; is decoded last so a decoded numeric entity can't be re-interpreted.
 */
function decodeEntities(input: string): string {
  if (!input) return '';
  return input
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&rsquo;/g, '’')
    .replace(/&lsquo;/g, '‘')
    .replace(/&ldquo;/g, '“')
    .replace(/&rdquo;/g, '”')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&hellip;/g, '…')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .trim();
}

/** WooCommerce descriptions come back as HTML; components render plain text. */
function stripHtml(html: string): string {
  if (!html) return '';
  return decodeEntities(html.replace(/<[^>]*>/g, ''));
}

function term(p: StoreApiProduct, taxonomy: string): StoreApiTerm | undefined {
  return p.attributes?.find((a) => a.taxonomy === taxonomy)?.terms?.[0];
}

function allTerms(p: StoreApiProduct, taxonomy: string): StoreApiTerm[] {
  return p.attributes?.find((a) => a.taxonomy === taxonomy)?.terms ?? [];
}

function firstImage(p: StoreApiProduct): WooImage | null {
  const img = p.images?.[0];
  if (!img?.src) return null;
  return { src: img.src, alt: decodeEntities(img.alt || p.name) };
}

/** Every gallery image, featured first. Entries without a src are dropped. */
function allImages(p: StoreApiProduct): WooImage[] {
  return (p.images ?? [])
    .filter((i) => Boolean(i?.src))
    .map((i) => ({ src: i.src, alt: decodeEntities(i.alt || p.name) }));
}

// ─── Fetch ────────────────────────────────────────────────────────────────────

async function storeFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${STORE_API}${path}`, {
    // Next 15/16 does NOT cache fetch by default — without this every render
    // hits WordPress. See docs/resilience.md R2.
    next: { revalidate: REVALIDATE_SECONDS },
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    throw new Error(`Store API ${path} responded ${res.status}`);
  }
  return res.json() as Promise<T>;
}

// ─── Adapter ──────────────────────────────────────────────────────────────────

/**
 * Map a Store API product onto the WooProduct shape the components already use.
 *
 * Returns null when the product is unusable — most importantly when it has no
 * image, because next/image throws on an empty src. Dropping one bad product is
 * always preferable to breaking the whole shop page: see docs/resilience.md R5.
 */
function toWooProduct(
  p: StoreApiProduct,
  variants?: WooProductVariant[],
): WooProduct | null {
  if (!p?.slug || !p?.name) return null;

  const image = firstImage(p);
  if (!image) {
    // Visible in server logs so a missing image in wp-admin is diagnosable.
    console.warn(`[woo] dropping "${p.slug}" — no product image set`);
    return null;
  }

  const price = formatPrice(p.prices);
  if (!price) {
    console.warn(`[woo] dropping "${p.slug}" — unreadable price`);
    return null;
  }

  const species = term(p, 'pa_pet')?.slug;

  return {
    id: p.slug, // slug is the public identifier: /products/<slug>
    name: decodeEntities(p.name),
    price,
    standardPrice: p.on_sale ? formatFrom(p.prices, p.prices.regular_price) : null,
    badge: null,
    category: decodeEntities(p.categories?.[0]?.name ?? ''),
    image,
    gallery: allImages(p),
    // NOTE: the Type attribute is pa_producttype, not pa_type — WordPress
    // reserves "type" as a query var so WooCommerce rejects it as a slug.
    productType: decodeEntities(term(p, 'pa_producttype')?.name ?? '') || undefined,
    species:
      species === 'dog' || species === 'cat' || species === 'both'
        ? species
        : undefined,
    volume: decodeEntities(term(p, 'pa_volume')?.name ?? '') || undefined,
    variantLabel: variants?.length
      ? undefined
      : decodeEntities(term(p, 'pa_fragrance')?.name ?? '') || undefined,
    variants: variants?.length ? variants : undefined,
    shortDesc: stripHtml(p.short_description),
    description: p.description ?? '',
    slug: p.slug,
    sku: p.sku || undefined,
    inStock: p.is_in_stock !== false,
  };
}

/**
 * Build the variant list for a variable product.
 *
 * The parent only carries variation ids plus their attribute values, so each
 * variation is fetched for its own price and image. Variations with no image of
 * their own fall back to the parent's, which is deliberate — only one of the
 * three shampoo fragrances has distinct photography.
 */
async function buildVariants(
  parent: StoreApiProduct,
): Promise<WooProductVariant[]> {
  const refs = parent.variations ?? [];
  if (!refs.length) return [];

  // slug -> display name, from the parent's fragrance terms
  const labels = new Map(
    allTerms(parent, 'pa_fragrance').map((t) => [t.slug, t.name]),
  );
  const parentImage = firstImage(parent);

  const results = await Promise.all(
    refs.map(async (ref) => {
      const slug = ref.attributes?.[0]?.value;
      if (!slug) return null;
      try {
        const v = await storeFetch<StoreApiProduct>(`/products/${ref.id}`);
        return {
          id: slug,
          label: decodeEntities(labels.get(slug) ?? slug),
          price: formatPrice(v.prices),
          standardPrice: v.on_sale
            ? formatFrom(v.prices, v.prices.regular_price)
            : null,
          image: firstImage(v) ?? parentImage ?? undefined,
        } as WooProductVariant;
      } catch {
        // A single unreachable variation must not fail the product page.
        console.warn(`[woo] variation ${ref.id} unavailable, skipping`);
        return null;
      }
    }),
  );

  // Preserve the order the terms are defined in WooCommerce.
  const order = [...labels.keys()];
  return results
    .filter((v): v is WooProductVariant => v !== null)
    .sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Every published, purchasable product.
 *
 * Throws rather than returning [] when the catalogue comes back empty. That is
 * deliberate: Next.js keeps serving the last good page when regeneration
 * throws, whereas returning [] would cache an empty shop page for the whole
 * revalidation window. See docs/resilience.md R3.
 */
export async function fetchProducts(): Promise<WooProduct[]> {
  try {
    const raw = await storeFetch<StoreApiProduct[]>('/products?per_page=100');

    if (!Array.isArray(raw)) {
      throw new Error('[woo] products response was not an array');
    }

    const products = await Promise.all(
      raw.map(async (p) => {
        const variants = p.type === 'variable' ? await buildVariants(p) : [];
        return toWooProduct(p, variants);
      }),
    );

    const valid = products.filter((p): p is WooProduct => p !== null);

    if (valid.length === 0) {
      throw new Error(
        '[woo] catalogue is empty after validation — refusing to cache. ' +
          'Check products are published and have featured images.',
      );
    }

    return valid;
  } catch (err) {
    // Build: ship the snapshot so the deploy succeeds.
    if (IS_BUILD) return buildFallback('catalogue fetch', err);
    // Runtime: rethrow so Next keeps serving the last good page.
    throw err;
  }
}

/** A single product by slug. Returns null when not found. */
export async function fetchProductBySlug(
  slug: string,
): Promise<WooProduct | null> {
  try {
    const raw = await storeFetch<StoreApiProduct[]>(
      `/products?slug=${encodeURIComponent(slug)}`,
    );
    const p = Array.isArray(raw) ? raw[0] : undefined;
    if (!p) return null;

    const variants = p.type === 'variable' ? await buildVariants(p) : [];
    return toWooProduct(p, variants);
  } catch (err) {
    if (IS_BUILD) {
      return buildFallback(`product "${slug}"`, err).find((p) => p.id === slug) ?? null;
    }
    throw err;
  }
}

/**
 * Slugs for generateStaticParams.
 *
 * Never throws. Falls back to the snapshot so a deploy still prerenders the
 * known products when the Store API is briefly unreachable; anything missing is
 * rendered on first request anyway, since dynamicParams is enabled.
 */
export async function fetchProductSlugs(): Promise<string[]> {
  try {
    const raw = await storeFetch<StoreApiProduct[]>('/products?per_page=100');
    const slugs = Array.isArray(raw) ? raw.map((p) => p.slug).filter(Boolean) : [];
    if (slugs.length) return slugs;
    throw new Error('[woo] no slugs returned');
  } catch (err) {
    console.warn('[woo] slug list unavailable, using snapshot:', err);
    return SNAPSHOT.map((p) => p.id).filter(Boolean);
  }
}
