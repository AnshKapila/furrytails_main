# Furrytail — Build Brief

**This supersedes everything in `docs/archive/`.** Those docs describe a
Vercel/headless-endpoint plan that was abandoned. Ignore them.

**Frontend:** Ansh · **WordPress/WooCommerce/infra:** Kshitij

---

## 1. Architecture (final)

```
furrytailjoy.com              →  Next.js 16 on Hostinger Node.js (Web App)
                                 home, /shop, /products/[slug], all design, 3D

store.furrytailjoy.com        →  WordPress + WooCommerce
                                 cart build, checkout, Razorpay, My Account, orders
```

Catalog is read from the **WooCommerce Store API**, server-side. Checkout is a
**top-level browser navigation** to WordPress. That's the whole integration —
no cart API, no CORS, no cookie handling, no custom JSON contract.

Products added in wp-admin appear on the site automatically. `/products/[id]` is
already a dynamic route, so new slugs work with no rebuild.

---

## 2. Already verified — don't re-investigate

| Item | Result |
|---|---|
| `npm run build` | ✅ passes clean, TypeScript OK, ~20s |
| Store API on the live site | ✅ `/wp-json/wc/store/v1/cart` returns a valid cart |
| Node on Hostinger | ✅ 22.x and 24.x; Next.js supported in server mode |
| Server specs | ✅ 2 cores / 3GB RAM — enough for Node + WordPress |
| Deploy size | ✅ 29.2MB zip via `output: 'standalone'` |
| Package manager | npm (`package-lock.json`). **No pnpm lockfile exists** |

`output: 'standalone'` has been added to `next.config.js`. Leave it — deployment
depends on it.

---

## 3. Ansh — task list, in order

### 3.1 Fix the package manager declaration

`package.json` declares `"packageManager": "pnpm@10.14.0"` but only
`package-lock.json` exists. If Hostinger's build honors that field it will run
pnpm against an npm lockfile. **Delete the `packageManager` field.**

### 3.2 Add the WordPress base URL as a single env var

```
NEXT_PUBLIC_WP_URL=https://store.furrytailjoy.com
```

Every WordPress reference goes through this. The subdomain choice is not final —
keeping it in one variable means changing it later is one line, not a hunt.

### 3.3 Replace the data layer in `src/services/api.ts`

Currently returns hardcoded objects from `src/data/home.ts`. Point it at the
Store API. **Fetch server-side** (server-to-server, so no CORS involved).

```
GET  {WP}/wp-json/wc/store/v1/products?per_page=100
GET  {WP}/wp-json/wc/store/v1/products?slug={slug}      → array, take [0]
```

Keep the exported function names and the `WooProduct` shape so the components
don't change. Make them `async`.

### 3.4 Prices arrive as integers — this will catch you out

Store API returns minor units, not formatted strings:

```json
"prices": {
  "price": "69500",
  "regular_price": "69500",
  "currency_symbol": "₹",
  "currency_minor_unit": 2
}
```

`"69500"` means ₹695.00. The existing `parsePrice("₹695")` in `src/lib/cart.tsx`
will not work on this.

```ts
function formatPrice(prices: {
  price: string;
  currency_symbol: string;
  currency_minor_unit: number;
}): string {
  const value = Number(prices.price) / 10 ** prices.currency_minor_unit;
  return `${prices.currency_symbol}${value.toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}
```

### 3.5 Adapter: Store API → `WooProduct`

```ts
function toWooProduct(p: StoreApiProduct): WooProduct {
  const attr = (taxonomy: string) =>
    p.attributes.find((a) => a.taxonomy === taxonomy)?.terms[0];

  return {
    id: p.slug,                                  // slug drives /products/[id]
    name: p.name,
    price: formatPrice(p.prices),
    standardPrice: p.on_sale
      ? formatPrice({ ...p.prices, price: p.prices.regular_price })
      : null,
    image: {
      src: p.images[0]?.src ?? '',
      alt: p.images[0]?.alt || p.name,
    },
    category: p.categories[0]?.name ?? '',
    productType: attr('pa_producttype')?.name,   // NOT pa_type — see note below
    species: attr('pa_pet')?.slug as 'dog' | 'cat' | 'both' | undefined,
    volume: attr('pa_volume')?.name,
    variantLabel: attr('pa_fragrance')?.name ?? null,
    shortDesc: stripHtml(p.short_description),
    inStock: p.is_in_stock,
  };
}
```

Notes:
- **`id` is the slug, not the numeric id.** Keeps existing URLs working.
- `short_description` comes back as HTML (`<p>…</p>`). Strip the tags — the
  components render it as plain text.
- **Never let `image.src` be an empty string** — Next's `<Image>` throws on it.
  If a product has no image, drop the product rather than render it.
- Validate each product and skip invalid ones. One bad product in wp-admin must
  not blank the shop page. `src/lib/cart.tsx` already does this pattern for
  localStorage; reuse the approach.

### 3.6 Cart — leave it exactly as it is

`src/lib/cart.tsx` stays localStorage-backed. Do **not** wire the Store API cart
endpoints; it isn't needed and adds CORS and cart-token handling for no gain.

Only change: the displayed price is a display value. WooCommerce recalculates
everything at checkout and its number wins.

### 3.7 Checkout handoff

Replace `CHECKOUT_URL` in `src/lib/cart.tsx`. Build a URL from the cart and do a
plain top-level navigation (`window.location.href = …`, not `fetch`). Because
it's a navigation, there is no CORS and WordPress sets its own cookies normally.

```ts
const url = `${process.env.NEXT_PUBLIC_WP_URL}/?ft-checkout=1&items=` +
  items.map((i) => `${i.id}:${i.qty}`).join(',');
```

Kshitij provides the `ft-checkout` endpoint (§5). It builds the Woo cart and
redirects to the real checkout.

If `NEXT_PUBLIC_WP_URL` is unset, **disable the button with a message** rather
than navigating to a dead `/checkout`. Never a dead end.

### 3.8 Homepage 2.5D/3D

Client wants depth on the homepage. Use CSS transforms, **not Three.js** — GPU
accelerated, near-zero payload, and nothing for the server to do.

1. **Layered parallax hero** — the product PNGs are already background-removed
   (`remove_bg.py`). Move background / product / foreground at different speeds.
2. **Cursor tilt** — `perspective()` + `rotateX/rotateY` on the hero bottle and
   product cards.
3. **Sticky scroll depth reveal** — `position: sticky` with layered
   scale/translate.

Two requirements: respect `prefers-reduced-motion`, and **disable parallax on
mobile** (it's janky on phones, and the client will demo on a phone).

True 3D product models are out of scope — no 3D model of the bottles exists.

### 3.9 Fix the hero video double-load

`src/app/page.tsx:1024-1043` has two `<video>` elements toggled with
`block md:hidden` / `hidden md:block`. `display: none` does not reliably prevent
the browser fetching the source, so mobile may download **both** files — 801KB +
1.56MB. Confirm in DevTools Network on a mobile viewport.

Fix: one `<video>` with `<source media="...">`. Also add a `poster` — the hero is
currently blank until the video starts.

### 3.10 Deploy

```bash
powershell -ExecutionPolicy Bypass -File scripts\deploy.ps1
```

Produces `deploy/furrytail-deploy.zip` (~29MB). Upload, extract at the Web App
root, start command `node server.js`.

The script guards the easy mistake: standalone output excludes `.next/static`
and `public/`, and if they're missing the site loads with no CSS or images.

---

## 4. Do NOT build these

Declared in `WooProduct` but rendered nowhere in the app:

`hoverImage` · `isNew` · `rating` · `reviews` · `foundingPriceLabel` ·
`ingredients` · `benefits` · `howToUse`

They aren't going into WooCommerce. Remove them from the interface.

`badge` is also `null` on all 5 products in `src/data/home.ts` — skip it too.

Also: **no PHP, and no WooCommerce API keys.** The Store API catalog endpoints
are public and read-only. If you need a secret, something is wrong — ask.

---

## 5. Kshitij — parallel tasks

**In WooCommerce:**
1. **Currency → Indian Rupee.** Currently set to **USD** (verified via the live
   Store API: `currency_code: "USD"`). Fix before entering products.
2. Store address → India (drives tax defaults).
3. Product categories: `daily-ritual`, `defense`, `remedy`, `refresh`.
4. **Global attributes** — `pa_pet`, `pa_producttype`, `pa_volume`,
   `pa_fragrance`. Note the Type attribute is `pa_producttype`, **not** `pa_type`:
   WordPress reserves `type` as a query variable, so WooCommerce rejects it as an
   attribute slug. Its display name is still "Type".
   These must be *attributes*, **not custom fields**: the Store API does not
   expose arbitrary post meta, so `volume` as an ACF field would be invisible
   to the frontend.
5. Enter the 5 products. Copy, prices and fragrance names are in
   `src/data/home.ts` — treat it as the content source of truth.
6. **Product slugs must match** the `id` values in `src/data/home.ts`.
7. Razorpay (test mode first), shipping zones, GST.
8. Turn **off** auto-updates for WooCommerce, Razorpay and the theme.

**The `ft-checkout` endpoint** (mu-plugin, ~20 lines): accept
`?ft-checkout=1&items=slug:qty,slug:qty`, resolve slugs to product IDs, add them
to the Woo cart, then `wp_safe_redirect( wc_get_checkout_url() )`. Must not
fatal on an unknown slug — skip it and continue.

**Infrastructure:**
- Move WordPress off the apex to `store.furrytailjoy.com` — do it now while the
  install is empty.
- LiteSpeed: exclude `/wp-json/wc/store/*`, `/checkout*`, `/cart*`,
  `/my-account*`. Verify with two browsers showing different carts.
- Enable object cache (now available on Business).
- Use the WordPress staging tool for all future Woo/plugin updates.
- CDN on for media.
- UptimeRobot: monitor the Node app **and** a zero-orders alert during business
  hours. The Node process is the new failure mode — if it dies, nothing else
  tells you.

**Simplification available if time runs short:** make the three Gentle Daily
Shampoo fragrances **three separate simple products**. 7 clean SKUs, each with
its own image and stock, and all variable-product complexity disappears. You
lose the variant selector on that one PDP. It's the cheapest thing to cut.

---

## 6. Known deferrals

Not blocking launch, but real:

- **48 `static.kite.ai` references** in `src/data/home.ts` — imagery served from
  the site-builder's CDN on an account we don't control. Will break eventually.
  Move to the WP media library.
- **25MB of unoptimized assets** in `public/` — ~30 JPEGs averaging 780KB.
  WebP at equivalent quality lands near 100–150KB each (≈85% reduction). A
  5–8MB homepage costs conversions.
- **Product SEO** — no `generateMetadata` anywhere. Server mode is supported on
  this host, so server-rendered product pages with proper metadata and JSON-LD
  are available in week two.
- Ingredients/benefits sections on the PDP, if wanted — needs Woo fields adding.

Leave `images: { unoptimized: true }`. Next's optimizer is CPU-heavy and there
are 2 cores; pre-compress instead and let the CDN serve them.
