# Update for Ansh — Going Headless with WooCommerce

Hi Ansh — the frontend looks great, and we're now wiring it to WooCommerce so
the catalog is live-editable instead of hardcoded. Here's the plan and what's
needed from you.

**Two reference docs in the repo:**
- `docs/headless-contract.md` — the JSON shape you'll build against
- `docs/resilience.md` — reliability rules (§4 is the frontend part)

---

## 1. How we're splitting the work

| You | Me (Kshitij) |
|---|---|
| Everything in this Next.js repo | All of WordPress / WooCommerce |
| Pages, components, design, data layer | Razorpay, shipping, GST, login |
| Server-component refactor, SEO | The API endpoint you'll consume |
| Checkout page CSS (I install it) | Hosting, caching, DNS, webhooks |
| Product data entry in wp-admin | Woo config, ACF, attributes |

**You will never need a WooCommerce API key.** The endpoint is public and
read-only. If you ever find yourself needing a secret in this repo, stop and
ping me — it means we've designed something wrong.

---

## 2. The most important thing: you are not blocked

Do **not** wait for WordPress to be ready. Here's how we stay parallel:

1. Reshape the product data currently in `src/data/home.ts` into exactly the JSON
   shape in `docs/headless-contract.md` §2.
2. Commit it as `src/data/products.fixture.json`.
3. Make `src/services/api.ts` read from one env var:

   ```
   NEXT_PUBLIC_CATALOG_SOURCE=fixture
   NEXT_PUBLIC_CATALOG_SOURCE=https://shop.furrytailjoy.com/wp-json/furrytail/v1
   ```

4. Build the entire frontend against `fixture`.
5. My endpoint is "done" when its response matches your fixture byte-for-byte in
   shape. Integration becomes a one-line env change.

**Please do this step first.** Everything else depends on it, and it's what lets
us work simultaneously instead of you waiting on me.

---

## 3. What needs to change in the frontend

### 3.1 Server-component refactor — the big one

Right now `src/app/page.tsx`, `src/app/shop/page.tsx` and
`src/app/products/[id]/page.tsx` are all `'use client'`, and `shop/page.tsx`
calls `getAllProducts()` at **module scope** (line ~80), which bakes the whole
catalog into the JS bundle.

Needed:
- Convert those three pages to **server components**
- Keep interactive parts as client components — cart drawer, filter panel,
  variant selector, search overlay. Client leaves inside server pages.
- Move data fetching out of module scope into the component body
- Make the `services/api.ts` functions **async** (they're synchronous today)

### 3.2 Caching rules — please read `docs/resilience.md` §4

This is what keeps the store up when WordPress goes down, so it matters more
than it looks. Three rules that are easy to get wrong:

**Use ISR, never dynamic rendering:**
```ts
export const revalidate = 300;
```

**In Next 15/16 `fetch` is NOT cached by default** — you must opt in explicitly,
or every single page render hits WordPress:
```ts
await fetch(url, { next: { revalidate: 300 } });
```

**Never return an empty array on fetch failure.** Throw instead:
```ts
if (products.length === 0) throw new Error('empty catalog — refusing to cache');
```
Counter-intuitive, but if you catch the error and return `[]`, Next.js caches an
empty shop page and serves it for the next 5 minutes. If you *throw*, Next keeps
serving the last good page. Throwing is the safe behaviour here.

**Fall back to the fixture at build time only** — so a deploy still succeeds if
WordPress happens to be down.

### 3.3 Validate product data — I'll be entering it, so assume I'll typo

Please validate each product at the boundary and **drop invalid ones rather than
crashing the page**. A missing image, a price typed as text, or a mistyped
attribute will otherwise take down the whole shop page — `<Image>` throws on an
empty `src`, and `parsePrice()` returns `NaN` on garbage.

You already do exactly this pattern in `src/lib/cart.tsx` for localStorage
hydration (per-item validation + normalisation). Same idea, applied to the
catalog.

### 3.4 SEO — currently missing entirely

There's no `generateMetadata` anywhere in the app. For a store, that's a real
cost: product pages have no individual title, description, or OG image, so they
don't rank and look broken when shared on WhatsApp/Instagram.

Needed:
- `generateMetadata` per product — title, description, OG image
- `Product` JSON-LD on PDPs (name, image, price, availability)
- `generateStaticParams` for product slugs, with `dynamicParams = true` so newly
  added products work without a redeploy

### 3.5 New products must appear automatically

That's the core requirement — I add a product in wp-admin, it shows on the site.
So: no hardcoded product arrays anywhere, `generateStaticParams` +
`dynamicParams`, and I'll fire a webhook at a `revalidatePath` route handler you
expose. The existing `src/app/api/v1/health/route.ts` shows the route pattern.

### 3.6 Filters move server-side

The three shop filters (`activeRitual` / `activePet` / `activeType` around
`src/app/shop/page.tsx:385`) currently filter a client-side array. These map onto
Woo category + two attributes. Filtering via URL params is better for SEO and
shareable filtered views — but if it's a big lift, client-side filtering over the
full 5-product catalog is acceptable for v1. Your call.

### 3.7 Images

`next.config.js` has `images: { unoptimized: true }` and no `remotePatterns`.
Please enable optimisation and allowlist the WordPress media host — I'll confirm
the hostname. Given how much this design leans on photography, unoptimised hero
images are costing us real load time.

Also: all product images currently point at `static.kite.ai`, the builder's CDN.
I'm moving them into the WP media library — the URLs will change, which the
contract handles since images come from the API.

---

## 4. Cart and checkout

Keep your cart drawer exactly as it is — it's staying, and Woo's cart page will
never be shown. Flow:

```
Your drawer  →  [I build the real cart in Woo]  →  Woo checkout  →  Razorpay  →  back to a Next.js confirmation page
```

Two changes needed on your side:

**Stop treating localStorage prices as authoritative.** Woo recalculates
everything at handoff. The drawer can display the cached price, but it's a
display value only, and if it differs at checkout the customer sees Woo's price.

**The checkout button must never dead-end.** `CHECKOUT_URL` in `src/lib/cart.tsx`
currently falls back to a non-existent `/checkout` route. If the cart handoff
fails, either fall back to Woo's URL-param add-to-cart, or disable the CTA with
an honest message ("checkout briefly unavailable, your cart is saved"). See
`docs/resilience.md` R6.

---

## 5. Checkout page styling — a CSS-only task for you

The address/shipping step happens on WooCommerce, so it's the one page in the
funnel that isn't yours. We want it as close to the brand as possible. Could you
write standalone CSS matching your design system, which I'll install into the WP
theme?

Your tokens from `src/app/globals.css`:

```css
--color-ivory:      #F8F5F1;   /* page background */
--color-beige:      #E9E2D7;
--color-travertine: #D8CFC4;   /* borders */
--color-stone:      #BEB8AF;
--color-sage:       #8D9A83;   /* accent / focus */
--color-moss:       #68735F;
--color-charcoal:   #3B3A38;   /* text, buttons */
```

Cormorant Garamond 300/400 headings, Inter 300/400 body, `border-radius: 0`
everywhere, `font-weight: 300` default. I'll send you the rendered checkout
markup to target. Note the Razorpay payment popup stays Razorpay-branded — that's
deliberate, it's a trust signal for Indian customers.

---

## 6. Please don't build these

Eight fields are declared in the `WooProduct` interface in `src/services/api.ts`
but rendered nowhere in the app:

`hoverImage` · `isNew` · `rating` · `reviews` · `foundingPriceLabel` ·
`ingredients` · `benefits` · `howToUse`

I'm leaving them out of WooCommerce for now, so please drop them from the
interface too — otherwise we're both maintaining fields that don't exist on
either side.

**Worth raising though:** the PDP is currently quite thin — image, volume, name,
price, variant selector, one short description, add-to-cart. For a brand built on
"we list every ingredient by name," an ingredients section feels like it belongs.
If you think the PDP needs it, say so and I'll add the fields properly on the Woo
side. Better to decide now than retrofit.

---

## 7. Product structure, so the data layer matches reality

- **4 of 5 products are simple products.** They carry a single fragrance as
  static display text (`variantLabel`, e.g. "Spearmint & Sea Salt") — no
  selector.
- **Only `gentle-daily-shampoo` is a variable product**, with 3 fragrance
  variations, each with its own price and image.
- **`id` is the product slug**, not a numeric ID. So `/products/gentle-daily-shampoo`
  URLs stay exactly as they are today. Slugs are immutable once live — if one
  ever needs to change we add a 301.

---

## 8. Suggested order of work

1. Fixture + env-var switch in `services/api.ts` *(unblocks everything — first)*
2. Server-component refactor of the three pages
3. ISR + caching rules + validation (`docs/resilience.md` §4)
4. `generateMetadata` + JSON-LD + `generateStaticParams`
5. Image optimisation + `remotePatterns`
6. `error.tsx` / `loading.tsx` wired per route segment, not just at root
7. Checkout CSS
8. Cart handoff — we'll pair on this once my endpoint is live

Steps 1–6 need nothing from me. By the time you're at 8, WordPress will be ready.

---

## 9. Questions for you

1. Any concerns about the server-component refactor breaking animations? A few
   components (`AnimatedSection`, `useInView`) rely on client hooks — I assume
   they stay client leaves, but flag if it's messier than that.
2. Rough estimate for steps 1–6?
3. Do you want the PDP ingredients section (§6)? Affects what I build in Woo.
4. Server-side filtering vs keeping it client-side for v1 (§3.6) — your call.

Thanks — the design is genuinely strong and worth building properly behind.
