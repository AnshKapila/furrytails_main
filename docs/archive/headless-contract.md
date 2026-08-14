# Furrytail Headless — Integration Contract

**Status:** proposed · **Frontend:** Ansh · **Backend/WooCommerce:** Kshitij

This document is the single agreed boundary between the Next.js frontend and
WooCommerce. Ansh builds against the JSON shape in §2 and never touches
WordPress or handles an API key. Kshitij makes WooCommerce emit that shape.

---

## 1. Ownership

| Area | Owner |
|---|---|
| Woo config, categories, attributes, ACF, Razorpay, shipping, GST | Kshitij |
| `furrytail/v1` endpoint + this contract | Kshitij |
| Product data entry in wp-admin | Ansh (against §3 spec) |
| Cart→checkout handoff, session cookie, subdomain, DNS | Kshitij |
| Checkout / My Account page CSS theming | Ansh writes CSS, Kshitij installs |
| LiteSpeed exclusions, CORS, WP infra | Kshitij |
| `src/services/api.ts`, pages, components, server-component refactor | Ansh |
| `generateMetadata`, product JSON-LD, ISR config | Ansh |

**Rule:** no WooCommerce consumer keys ever enter the Next.js repo. Catalog data
is public; the endpoint in §2 is public and read-only.

---

## 2. The contract

### Endpoints

```
GET  /wp-json/furrytail/v1/products          → Product[]
GET  /wp-json/furrytail/v1/products/{slug}   → Product | 404
```

Host: `https://shop.furrytailjoy.com` (see §7 for why a subdomain).

Read-only, unauthenticated, cacheable. Implemented as an mu-plugin that reads
Woo internally and returns the shape below — deliberately *not* raw `wc/v3`,
so ACF/meta serialisation and variation assembly stay on the WP side.

### Shape

```json
{
  "id": "gentle-daily-shampoo",
  "name": "Gentle Daily Shampoo",
  "category": "Daily Ritual",
  "productType": "Shampoo",
  "species": "both",
  "volume": "300 ml",
  "shortDesc": "A shampoo made for daily use — gentle enough for every wash...",
  "price": "₹695",
  "standardPrice": null,
  "badge": null,
  "inStock": true,
  "image": { "src": "https://...", "alt": "Gentle Daily Shampoo — Fig & Neroli" },
  "variantLabel": null,
  "variants": [
    {
      "id": "santal-white-tea",
      "label": "Santal & White Tea",
      "price": "₹695",
      "standardPrice": null,
      "shortDesc": "Warm wood and pale tea...",
      "inStock": true,
      "image": { "src": "https://...", "alt": "..." }
    }
  ]
}
```

### Field reference

| Field | Type | Notes |
|---|---|---|
| `id` | string | Woo product **slug**. Drives `/products/{id}` URLs — must not change |
| `name` | string | Product title |
| `category` | enum | `Daily Ritual` · `Defense` · `Remedy` · `Refresh` |
| `productType` | enum | `Shampoo` · `Spray` · `Cleaner` · `Mist` |
| `species` | enum | `dog` · `cat` · `both` |
| `volume` | string | e.g. `300 ml`. Rendered on card + PDP |
| `shortDesc` | string | Plain text, no HTML. PDP body copy |
| `price` | string | **Pre-formatted with ₹.** Current sell price |
| `standardPrice` | string \| null | Pre-formatted. Non-null renders a strikethrough |
| `badge` | string \| null | Short uppercase label, e.g. `NEW`. Null = no badge |
| `inStock` | boolean | **New field** — see §5 |
| `image` | `{src, alt}` | Featured image. Absolute URL |
| `variantLabel` | string \| null | Single-fragrance products only. Static text, no selector |
| `variants` | `Variant[]` | Empty/absent for simple products |

`variants[].id` is the variation **slug** of the fragrance attribute term
(`santal-white-tea`), not a numeric Woo variation ID — it appears in cart state
and must stay stable.

### Do NOT build these

Declared in `WooProduct` today but rendered nowhere. Leave them out; adding them
to Woo is wasted work until the frontend grows a section that needs them.

`hoverImage` · `isNew` · `rating` · `reviews` · `foundingPriceLabel` ·
`ingredients` · `benefits` · `howToUse`

> The PDP currently renders only: image, volume, name, price, variant selector,
> `shortDesc`, add-to-cart, trust markers, related products. There are no
> ingredients / benefits / how-to-use sections.

### Formatting rule

Prices arrive **pre-formatted as strings** (`"₹695"`), matching the frontend's
existing `parsePrice()` in `src/lib/cart.tsx`. This keeps currency symbol and
rounding decisions on the backend. If we later need numeric prices for sorting,
add a separate `priceNum` field rather than changing `price`.

---

## 3. WooCommerce configuration spec

### Product categories

| Name | Slug |
|---|---|
| Daily Ritual | `daily-ritual` |
| Defense | `defense` |
| Remedy | `remedy` |
| Refresh | `refresh` |

### Global attributes

| Attribute | Slug | Terms |
|---|---|---|
| Pet | `pa_pet` | `dog`, `cat`, `both` |
| Type | `pa_type` | `shampoo`, `spray`, `cleaner`, `mist` |
| Fragrance | `pa_fragrance` | used for variations (see below) |

Term values must map exactly to the enums in §2 — the shop filters in
`src/app/shop/page.tsx` compare against those literal strings.

### Custom fields (ACF or plain post meta)

Only two needed:

| Field | Type | Applies to |
|---|---|---|
| `volume` | text | all products |
| `badge` | text (optional) | all products |

### Products to create

| Slug | Name | Category | Type | Pet | Volume | Price | Kind |
|---|---|---|---|---|---|---|---|
| `gentle-daily-shampoo` | Gentle Daily Shampoo | Daily Ritual | Shampoo | both | 300 ml | ₹695 | **variable** |
| `anti-tick-flea-spray` | Anti-Tick & Flea Spray | Defense | Spray | — | — | — | simple |
| `paw-cleaner` | Paw Cleaner | Remedy | Cleaner | dog | 150 ml | ₹495 | simple |
| `dry-foam-shampoo` | Dry Foam Shampoo | Refresh | Shampoo | dog | 150 ml | ₹595 | simple |
| `refreshing-mist` | Refreshing Mist | Refresh | Mist | dog | 120 ml | ₹545 | simple |

Canonical copy, prices and `variantLabel` values for every SKU live in
`src/data/home.ts` — treat that file as the content source of truth when
entering data.

### The one variable product

`gentle-daily-shampoo` has three `pa_fragrance` variations, each with its own
price and image:

| Variation slug | Label |
|---|---|
| `santal-white-tea` | Santal & White Tea |
| `fig-neroli` | Fig & Neroli |
| `hinoki-bamboo` | Hinoki & Bamboo |

The other four products carry a single fragrance as a **static label**
(`variantLabel`, e.g. `Spearmint & Sea Salt`) — no selector, no variations.
Model them as simple products; don't create single-variation variable products.

### Images

Product imagery currently sits on `static.kite.ai`, a site-builder CDN we don't
control. Upload all product images to the WP media library and let the endpoint
emit those URLs. Until that happens the storefront depends on third-party
infrastructure.

---

## 4. Parallel-work protocol

Ansh must not be blocked waiting on WooCommerce, and the two sides must not
drift. Mechanism:

1. Reshape `src/data/home.ts` product data into exactly the §2 JSON and commit
   it as `src/data/products.fixture.json`.
2. `src/services/api.ts` reads from one env var:

   ```
   NEXT_PUBLIC_CATALOG_SOURCE=fixture        # Ansh, day 1
   NEXT_PUBLIC_CATALOG_SOURCE=https://shop.furrytailjoy.com/wp-json/furrytail/v1
   ```

3. Ansh builds the whole frontend against the fixture.
4. Kshitij's endpoint is "done" when its response equals the fixture.
5. Integration is a one-line env change.

Without this, the two workstreams are serialised and integration becomes a
rewrite. With it, they're independent.

---

## 5. Cart and checkout

### Model

Catalog and cart UI stay in Next.js. Payment happens on WooCommerce.

| Step | Renders | Design |
|---|---|---|
| Home / Shop / PDP | Next.js | 100% ours |
| Cart drawer | Next.js `CartDrawer.tsx` | 100% ours |
| Address + shipping | Woo `/checkout` | themed, ~90–95% |
| Card / UPI | Razorpay modal | Razorpay's — intentionally |
| Order confirmation | redirect to Next.js | 100% ours |

**Woo's cart page is never shown.** The drawer replaces it; go straight to
`/checkout`.

### Handoff

Build the cart server-side in Woo via Store API so prices and stock are
authoritative at handoff, then redirect:

```
POST {woo}/wp-json/wc/store/v1/cart/add-item   (credentials: 'include')
→ redirect to {woo}/checkout
```

This requires the shared session cookie in §7.

### Current cart gaps

`src/lib/cart.tsx` is localStorage-only and prices live in the browser, so they
go stale and are trivially tampered with. It also has no stock awareness. Adding
`inStock` to the contract (§2) lets the frontend disable add-to-cart, but the
authoritative check happens when Woo builds the cart. **Never trust the
localStorage price** — Woo recalculates at handoff.

`CHECKOUT_URL` currently falls back to a dead `/checkout` route. Point it at the
Woo checkout URL via env.

### Checkout theming

Use Woo's **block-based** checkout, not the classic shortcode — far more
CSS-addressable. Verify Razorpay works with blocks checkout early; that
combination is the main compatibility risk in this plan.

Design tokens to port (from `src/app/globals.css`):

```css
--color-ivory:      #F8F5F1;   /* page background */
--color-beige:      #E9E2D7;
--color-travertine: #D8CFC4;   /* borders */
--color-stone:      #BEB8AF;
--color-sage:       #8D9A83;   /* accent / focus */
--color-moss:       #68735F;
--color-charcoal:   #3B3A38;   /* text, buttons */
```

Fonts: **Cormorant Garamond** 300/400 (headings), **Inter** 300/400 (body).
Two global rules carry most of the brand: `border-radius: 0` on everything, and
`font-weight: 300` as the default body weight.

---

## 6. Authentication — recommendation: defer

Headless WP auth is the most expensive item in the backend scope: JWT issuance
and refresh, password-reset email flows, order history, address book, session
expiry edge cases. `src/app/account/page.tsx` is a static placeholder today.

**For v1, keep My Account on WooCommerce** and hand off exactly like checkout.
It inherits the §5 CSS at no extra cost, and guest checkout covers most
first-time conversions. Revisit once order volume justifies it.

---

## 7. Infrastructure checklist

### Domains

Next.js and WordPress cannot both serve `furrytailjoy.com`.

```
furrytailjoy.com        → Next.js (Vercel)
shop.furrytailjoy.com   → WordPress + WooCommerce
```

**Must be a subdomain of the same apex**, so the Woo session cookie can be
scoped to `.furrytailjoy.com` and survive the cart handoff. A separate apex
domain empties the cart on handoff and forces a custom cart-rebuild endpoint.

### LiteSpeed Cache — blocking

LiteSpeed is active on the Hostinger install. It will cache Store API cart
responses and **leak one customer's cart to another**. Exclude before taking a
single order:

```
/wp-json/wc/store/*
/checkout*
/cart*
/my-account*
```

`/wp-json/furrytail/v1/*` *should* be cached — it's public catalog data.

### CORS

Server-component catalog fetches are server-to-server: no CORS needed. Cart
calls run from the browser and do, with credentials:

```
Access-Control-Allow-Origin: https://furrytailjoy.com
Access-Control-Allow-Credentials: true
```

Wildcard origin is invalid alongside credentials.

### Next.js config

`next.config.js` currently sets `images: { unoptimized: true }` with no
`remotePatterns`. Add the Woo media host and enable optimisation — this is a
visual brand and unoptimised hero imagery is a real cost.

### Freshness

ISR with time-based `revalidate`, plus a Woo webhook (product created/updated)
hitting a Next.js `revalidatePath` route handler for instant updates. The
pattern is already proven by `src/app/api/v1/health/route.ts`.

New products appear without a redeploy via `generateStaticParams` +
`dynamicParams = true`.

---

## 8. Frontend refactor required (Ansh)

Today `src/app/page.tsx`, `src/app/shop/page.tsx` and
`src/app/products/[id]/page.tsx` are all `'use client'`, and `shop/page.tsx`
calls `getAllProducts()` at **module scope** — baking the whole catalog into the
JS bundle. There is no `generateMetadata` anywhere.

| Task | Why |
|---|---|
| Convert the three pages to server components | Enables server fetch + ISR |
| Move data fetching out of module scope | Currently bundles the catalog |
| Make `services/api.ts` functions async | They're synchronous today |
| Add `generateMetadata` per product | No per-product title/OG today — real SEO cost |
| Add product JSON-LD | Rich results for a commerce site |
| Keep cart/filters as client components | They need interactivity |
| `generateStaticParams` + `dynamicParams` | New products without redeploy |

Interactive leaves (cart drawer, filter panel, variant selector) stay client
components inside server pages.

---

## 9. Sequencing

| Phase | Work | Owner |
|---|---|---|
| 0 | Freeze fixture (§4); agree this contract | both |
| 1a | Woo: categories, attributes, custom fields, 5 products, images | Kshitij (entry: Ansh) |
| 1b | `furrytail/v1` endpoint returning fixture-equal JSON | Kshitij |
| 1c | Subdomain, cookie scope, LiteSpeed exclusions, CORS | Kshitij |
| 2a | Server-component refactor + metadata + JSON-LD, on fixture | Ansh |
| 2b | Razorpay, shipping zones, GST, tax | Kshitij |
| 3 | Switch env to live endpoint; verify parity | both |
| 4 | Store API cart handoff; retire localStorage pricing | Kshitij + Ansh |
| 5 | Checkout + My Account theming | Ansh (CSS) / Kshitij (install) |
| 6 | Later: headless checkout, headless auth, Woo-driven journal | — |

Phases 1 and 2 run fully in parallel because of §4.

---

## 10. Open items

- Confirm Razorpay + Woo **blocks** checkout compatibility (§5) — highest risk
- Decide `shop.` vs `wp.` subdomain
- Migrate product images off `static.kite.ai` (§3)
- Homepage currently renders untranslated `trans-menu` / `trans-contacts`
  placeholders on the live WP site — irrelevant once Next.js serves the apex,
  but confirm nothing depends on that theme
- `anti-tick-flea-spray` volume/price not captured in this doc — pull from
  `src/data/home.ts` at entry time
