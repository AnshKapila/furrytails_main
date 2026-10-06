# Furrytail — Full Project Context

Hand this file to a fresh session on any machine. It describes **what this
project is, how it is put together, and why**. It deliberately does **not**
cover outstanding work — see `docs/pending.md` for that.

Written 2026-09-08. Repo: `https://github.com/AnshKapila/furrytails_main` ·
branch `main` (commits go straight to main, no branches/PRs).

---

## 1. What this is

Furrytail (brand: **Furrytail**, domain **furrytailjoy.com**) is a premium
natural pet-care brand launching in India — shampoos, sprays, a paw cleaner and
a mist for dogs and cats. Founder: **Bhargav Das** (single founder; the brand is
pre-launch / newly launching — do not imply traction, team size, or history).

This repo is the **storefront**: a Next.js 16 app that reads its catalogue from a
WooCommerce install and hands checkout off to it.

**People:** Frontend was built by **Ansh** (handed over). WordPress /
WooCommerce / infrastructure is **Kshitij** (the repo owner).

---

## 2. Architecture — the one thing to understand

```
furrytailjoy.com          →  Next.js 16 app on Hostinger Node.js (Web App)
                             home, /shop, /products/[slug], all design & content

store.furrytailjoy.com    →  WordPress + WooCommerce (own docroot, own SSL)
                             cart build, checkout, Razorpay, My Account, orders
```

Two halves, one seam:

1. **Catalogue reads** — the Next app fetches the **WooCommerce Store API**
   server-side (`/wp-json/wc/store/v1/products`). These endpoints are **public
   and read-only**, so there are **no API keys anywhere in this repo**. If you
   think you need a WooCommerce secret, something has gone wrong.
2. **Checkout** — a **top-level browser navigation** to WordPress:
   `store.furrytailjoy.com/?ft-checkout=1&items=slug*qty,...`. Because it is a
   navigation and not a `fetch`, there is no CORS, and WooCommerce sets its own
   session cookie normally.

That is the entire integration. **No cart API, no CORS handling, no cookie
juggling, no custom JSON contract.** Products added in wp-admin appear on the
site automatically within the 5-minute ISR window — no redeploy.

**Failure-domain split** (the core design decision): browsing does not depend on
WordPress at runtime (ISR-cached), only purchasing does. WordPress is a *content
source*, not a *runtime dependency*.

> ⚠️ **The store must stay in its own document root**
> (`domains/store.furrytailjoy.com/public_html`), never nested inside the Web
> App's directory. When it was under
> `domains/furrytailjoy.com/public_html/storewp`, connecting the apex to a Web
> App displaced the whole site and took the store's docroot and SSL with it.

---

## 3. Stack

| | |
|---|---|
| Framework | **Next.js 16.2.7**, App Router, React 19 |
| Language | TypeScript (strict), path alias `@/*` → `./src/*` |
| Styling | **Tailwind CSS v4** (`@import 'tailwindcss'` + `@theme` block) plus hand-written CSS in `globals.css` |
| Icons | `lucide-react`, plus many inline hand-rolled SVGs |
| Fonts | `next/font/google` — Cormorant Garamond (display), Inter (body) |
| Package manager | **npm** (`package-lock.json`). No pnpm lockfile; the `packageManager` field was deliberately removed |
| Node | >= 22.17.1 |
| Dev port | **4321** (`next dev -p 4321`) |
| Build output | `output: 'standalone'` — deployment depends on this, leave it |
| Images | Next's optimizer, enabled in `21295b3`. Was `unoptimized: true` (2 cores, pre-compress instead), but local PNGs were converted to WebP and the videos dropped in the same commit, which cut the payload enough to afford it. `remotePatterns` allows `store.furrytailjoy.com` and `static.kite.ai`; `/_next/image` is verified serving 200s in production |
| Hosting | Hostinger (Business plan), Node.js Web App, 2 cores / 3 GB |

Scripts: `dev`, `build`, `start`, `lint`, `typecheck` (`tsc --noEmit`),
`prettier`, `prettier:fix`. `npm run build` passes clean in ~20s.

`start` must stay plain `next start` with **no `-p` flag**, so the app binds the
host-provided `PORT`.

`build` must stay `next build --webpack`. Next 16 defaults to Turbopack, which
runs PostCSS (Tailwind) in separate Node worker processes; on Hostinger's build
server those workers exit before Turbopack can connect, and the build dies with
`TurbopackInternalError: [project]/src/app/globals.css ... node process exited
before we could connect to it`. It passes locally, so it looks like a code bug
— it is not. Webpack runs PostCSS in-process and builds the same site. Seen
2026-10-05/06; the live site was stuck on a late-September build until then.

---

## 4. Repo layout

```
src/
  app/                          App Router
    layout.tsx                  metadata, fonts, WhatsAppNudge, NewsletterPopup
    page.tsx                    homepage ('use client', ~1400 lines)
    globals.css                 design tokens + hand-written component CSS
    fonts.ts                    Cormorant Garamond + Inter
    loading.tsx / error.tsx / global-error.tsx / not-found.tsx
    robots.ts                   /robots.txt  (absolute Sitemap: URL, AI-bot rules)
    sitemap.ts                  /sitemap.xml (product URLs pulled from Woo)
    shop/page.tsx               server: fetches catalogue → ShopClient
    shop/ShopClient.tsx         'use client': filters, sort, grid, sections
    products/[id]/page.tsx      server: metadata + Product JSON-LD → ProductClient
    products/[id]/ProductClient.tsx   'use client': gallery, variants, add-to-cart
    about/ ingredients/ journal/ faq/ shipping/ account/
    privacy-policy/ terms-of-use/ cookie-settings/
    journal/what-we-found-in-most-pet-shampoos/
    api/products/route.ts       same-origin catalogue JSON for client components
    api/contact/route.ts        contact form → Brevo transactional email
    api/newsletter/route.ts     newsletter popup → Braze
    api/v1/health/route.ts      trivial health check
  components/
    Navbar.tsx                  fixed nav, scroll/hero-aware colours, search, bag
    Footer.tsx                  charcoal footer, three link columns
    CartDrawer.tsx              slide-over cart, checkout handoff button
    ClientProviders.tsx         WishlistProvider > CartProvider > children + CartDrawer
    SearchOverlay.tsx           full-screen search over the catalogue
    NewsletterPopup.tsx         timed popup (3.5s), localStorage-gated
    WhatsAppNudge.tsx           fixed WhatsApp pill, expands on hover
    FeaturedIngredients.tsx     homepage scroll-pinned ingredient chapters (776 lines)
    IngredientAccordion.tsx     hover accordion (desktop) / IO reveal (mobile)
    IngredientRow.tsx           /ingredients row
    SecondaryOutlineBtn.tsx     outlined button with perimeter-draw hover
    TrustMarkers.tsx + TrustMarkersData.tsx
    AnimatedSection.tsx         useInView fade-up wrapper
    profile/ProfileDashboard.tsx  account page — links out to Woo
    profile/WishlistView.tsx
  data/
    home.ts                     ALL editorial content (530 lines) — see §7
    products.snapshot.json      committed catalogue fallback for builds
  hooks/
    useProducts.ts              client-side catalogue via /api/products, module cache
    useInView.ts                IntersectionObserver helper
  lib/
    woo.ts                      ** WooCommerce Store API client + adapter (393 lines)
    config.ts                   WP_URL single source
    cart.tsx                    'use client' cart context + checkout URL builder
    wishlist.tsx                'use client' wishlist context (localStorage)
    price.ts                    parsePrice — server-safe, deliberately not in cart.tsx
    site-url.ts                 getBaseUrl() for metadata/sitemap/robots
  services/
    api.ts                      content + catalogue facade the pages import
    types.ts                    WooProduct / WooProductVariant / WooImage / WooShopContent
  kite.d.ts

wordpress/mu-plugins/
  ft-checkout.php               ** cart handoff endpoint — LOAD-BEARING
  ft-store-scope.php            scopes + noindexes the store subdomain

docs/
  CONTEXT.md                    this file
  build-brief.md                architecture, verified state, deploy + SMTP runbook
  pending.md                    canonical outstanding-work list
  product-data.md               WooCommerce field spec, exact attribute values
  client-requirements.md        client-facing ask list
  archive/                      superseded Vercel/headless-endpoint plans
  qa/                           QA scan report + screenshots

scripts/
  make-deploy-zip.py            ** builds deploy/furrytail-source.zip (source-only)
  deploy.ps1                    builds deploy/furrytail-deploy.zip (standalone bundle)
  extract-kite-manifest.mjs

public/                         ~25 MB of imagery, hero videos, kite-analytics.js
middleware.ts                   pass-through only (see §11)
next.config.js                  standalone, redirects, legacy prototype rewrite
.opencode/                      site-builder ("Kite") agent skills — see §14
```

Root-level leftovers from the original generator that are **not** part of the
app: `extract.js`, `extract.ps1`, `refactor.js`, `remove_bg.py`,
`update_components.{js,py}`, `vercel.ts`, `redirects.csv`, `.kite/`, `.vercel/`,
`prompts-used/`, `Dog_and_cat_with_product_*.mp4`, `title_logo.jpg`, and
`visual_spec.md` (a generic generated spec that does **not** match the shipped
design — the real design rules are in §6).

---

## 5. Data flow

### Catalogue (live, from WooCommerce)

```
WooCommerce Store API
  /wp-json/wc/store/v1/products?per_page=100
  /wp-json/wc/store/v1/products?slug=<slug>
  /wp-json/wc/store/v1/products/<variation-id>
        ↓  src/lib/woo.ts   (fetch + validate + adapt)
        ↓  src/services/api.ts   getAllProducts / getProductById / getRelatedProducts
        ↓
  server components  →  shop/page.tsx, products/[id]/page.tsx
  client components  →  /api/products  →  useProducts()  (search overlay, homepage rails)
```

The browser **never** talks to `store.furrytailjoy.com` for catalogue data —
that would need CORS headers on the WordPress side. Client components go through
the same-origin `/api/products` route instead.

`revalidate = 300` (5 minutes) on every catalogue surface, and
`next: { revalidate: 300 }` on every `fetch` — in Next 15/16 `fetch` is **not**
cached by default, so without the explicit option every render hits WordPress.

### Prices — the classic trap

The Store API returns **minor units as strings**:

```json
"prices": { "price": "69500", "currency_symbol": "₹", "currency_minor_unit": 2 }
```

`"69500"` means ₹695.00. `formatPrice()` in `woo.ts` divides by
`10 ** currency_minor_unit` and formats with `en-IN` at the boundary, so the rest
of the app only ever sees pre-formatted display strings like `"₹695"`.
`parsePrice()` (`src/lib/price.ts`) turns them back into numbers for subtotals
and JSON-LD.

### HTML entities

WordPress serves entity-encoded text in JSON — numeric entities in post titles
(`Anti-Tick &#038; Flea Spray`) and named ones in taxonomy terms
(`Yuzu &amp; White Musk`). React escapes whatever it renders, so untouched
values show customers the literal `&#038;`. **Every plain-text field from the
API goes through `decodeEntities()`.** The one exception is `description`, which
is intentional HTML and rendered as such.

### Store API → `WooProduct` adapter rules (`woo.ts`)

- **`id` is the slug**, not the numeric WooCommerce id. `/products/<slug>`.
- The Type attribute is **`pa_producttype`**, not `pa_type` — WordPress reserves
  `type` as a query variable and WooCommerce rejects it as an attribute slug.
  Its display name is still "Type".
- `species` comes from the **`pa_pet` term slug**, which must be exactly
  `dog` / `cat` / `both` (WordPress would otherwise auto-generate `dogs-only`
  and `dogs-cats`, and products silently vanish from the pet filter).
- `short_description` arrives as HTML — stripped to plain text.
- **A product with no image is dropped**, logged with a warning: `next/image`
  throws on an empty `src`, and dropping one bad product beats blanking the shop.
- An **unreadable price** drops the product the same way.

### Resilience contract (why the error handling looks odd)

| Rule | Behaviour |
|---|---|
| Never render the catalogue dynamically | time-based ISR only; never `no-store`, never `force-dynamic` on catalogue pages |
| Never cache an empty catalogue | `fetchProducts()` **throws** when the list validates to empty — Next.js then keeps serving the last good page. Returning `[]` would cache an empty shop for the whole window |
| Build-time fallback only | at build there is no last-good page, so a throw fails the deploy. `IS_BUILD` (`NEXT_PHASE === 'phase-production-build'`) switches to `src/data/products.snapshot.json` |
| Woo is authoritative | storefront prices are display values; WooCommerce recalculates at checkout and its numbers win |
| Slugs are immutable | they are the public identifier and the checkout key |
| `/api/products` errors are `no-store` | without it a 503 inherits the route's revalidate window and is persisted to `.next/cache` — a brief WordPress outage then kept the endpoint 503-ing long after recovery, and a process restart did **not** clear it, only a rebuild. This happened in production during the domain migration |

`fetchProductSlugs()` is the exception: it **never throws**, falling back to the
snapshot so `generateStaticParams` and the sitemap degrade to the known product
list rather than going empty.

These rules are R1–R8 in `docs/archive/resilience.md`, which is the one archive
doc still worth reading — `woo.ts` is its implementation.

### Cart

`src/lib/cart.tsx` — **localStorage-backed, frontend-only** (`furrytail_cart_v1`).
The Store API cart endpoints are deliberately **not** wired: they aren't needed
and would add CORS and cart-token handling for no gain.

Every item is validated on hydration (id/name/image/price present, qty and
priceNum finite and positive) so a corrupt localStorage entry can never render
`NaN` or crash `next/image`. Items are keyed `id__variantId`.

`buildCheckoutUrl()` produces
`${WP_URL}/?ft-checkout=1&items=<slug>[:<variant>]*<qty>,...` and returns
`null` when `WP_URL` is unset or the cart is empty — callers **disable the
button with a message** rather than navigate to a dead end.

Wishlist (`src/lib/wishlist.tsx`) is the same shape, key `furrytail_wishlist`.
It stays client-side because it is per-device by nature and needs no account.

### Accounts

There is **no ProfileProvider and no local account state**. Sign-in, saved
addresses and order history all live in WooCommerce; `/account` renders the
wishlist and links out to `${WP_URL}/my-account`. A "profile" in localStorage
never reaches an order, and a local order history would tell a customer who just
bought something that they have no orders.

---

## 6. Design system

The visual language is **premium editorial / quiet luxury** — Aesop, Diptyque,
Biche as reference points. It must read calm, boutique, editorial, organic,
timeless. It must **not** read corporate, tech-startup, SaaS, futuristic, or
loud.

### Palette (Tailwind `@theme` tokens in `globals.css`)

| Token | Hex | Role |
|---|---|---|
| `ivory` | `#F8F5F1` | primary background |
| `beige` | `#E9E2D7` | secondary surface / borders |
| `travertine` | `#D8CFC4` | borders, dividers |
| `stone` | `#BEB8AF` | muted text, placeholders |
| `sage` | `#8D9A83` | accent |
| `moss` | `#68735F` | accent, eyebrow text |
| `charcoal` | `#3B3A38` | primary text, footer, primary buttons |

Also in use: `#EDE7DF` (alternating section band), `#1C1B1A` (primary button
hover), `#25D366` (WhatsApp only), `#c0392b` (form error only).

**No pure black, no pure white, no saturated colour, no gradients, no
glassmorphism.** `--radius-none: 0px` — square corners; `button, input` are
reset to `border-radius: 0`.

### Typography

- Display: **Cormorant Garamond** 300/400 → `var(--font-cormorant)` / `font-display`
- Body: **Inter** 300/400 → `var(--font-inter)` / `font-sans`, body weight 300
- `h1`: `clamp(3rem, 5vw, 4rem)`, weight 300, `line-height: 1.06`, `letter-spacing: -.03em`
- `h2`: `clamp(2rem, 3.2vw, 2.625rem)`, weight 300 — **one global token; component
  overrides must not introduce a different size or weight for section-title h2s**
- `.eyebrow`: `.625rem`, uppercase, `letter-spacing: .25em`, moss
- `h1.product-price` on PDPs gets the full h1 treatment without centring

### Motion

Restrained and slow. Common durations 220ms (colour), 250ms (lift), 400ms
(arrow), 800ms (image zoom, perimeter draw). Named keyframes in `globals.css`:
`marquee-scroll`, `marquee-x`, `scrollIndicator`, `success-pulse`.

Signature interactions:

- `.hero-btn-primary` — charcoal fill, arrow slides 4px right on hover
- `SecondaryOutlineBtn` — border line travels the full perimeter (SVG
  `stroke-dashoffset`, 800ms) while the arrow exits right and re-enters left
- `.ritual-frame:hover .ritual-image` — `scale(1.2)` and `saturate(50% → 100%)`
- `FeaturedIngredients` — scroll-pinned section, content swaps on scroll
  progress, tighter pin range on mobile
- `useInView` / `AnimatedSection` — fade-up reveals

Mobile-first, then scale up. The breakpoint in the hand-written CSS is
`max-width: 767px`, plus a short-viewport tweak at
`(max-height: 690px) and (max-width: 600px)`.

### Copy guardrails (factual)

Only facts explicitly confirmed may appear on the site. In particular: no sales
history / customer counts / "since" dates / traction; single founder; no
certification badges, vet approval, endorsements or partnerships; no medical or
disease-prevention claims; **no strikethrough price unless both real prices are
supplied**; no invented shipping timelines, courier names, fees, return windows,
addresses, social handles or payment providers. When a fact is unknown, write
the safest true version in calm premium language.

Full versions of both rule sets live in
`.opencode/skills/furrytails-design-constitution/SKILL.md` and
`.opencode/skills/furrytail-factual-reference-guardrails/SKILL.md`.

---

## 7. Content model

Two sources, deliberately separate:

| | Source | Editable by |
|---|---|---|
| **Products** — names, prices, images, attributes, ingredients/how-to-use/safety | WooCommerce (wp-admin) | the client, live, no redeploy |
| **Editorial** — hero copy, brand story, pillars, ingredient chapters, founder note, contact, nav, footer | `src/data/home.ts` | code change + deploy |

`src/data/home.ts` exports: `LOGO_URL`, `navLinks`, `hero`, `heroImages`,
`trustStatements`, `bestSellers`, `brandStory`, `brandPhilosophy`, `pillars`,
`ourRange`, `allProducts` (headings + **filter option lists**), `founderNote`,
`contact`, `ingredientChapters`, `ingredientStories`, `footer`.

> ⚠️ **`home.ts` no longer supplies product data.** Anything keyed off a product
> **name** or a hardcoded **price** will drift the moment the catalogue is edited
> in wp-admin. Slugs and attribute term slugs are the stable identifiers.

> ⚠️ The shop filters match on **exact category name** and on `pa_pet` **term
> slug**. `allProducts.filterCategories` is
> `['All', 'Daily Ritual', 'Defense', 'Remedy', 'Refresh']` — if WooCommerce
> says `Ritual` while the code filters on `Daily Ritual`, that chip returns zero
> products with no error and nothing in the console.

Also served from `home.ts` / `layout.tsx`: **28 `static.kite.ai` image URLs**
(logo, hero images, editorial and ingredient photography, the favicon) — a CDN
on an account we do not control. Product images have already been migrated to
the WP media library; these have not.

---

## 8. The catalogue as it actually stands

**7 simple products, no variable products.** Note this contradicts
`docs/product-data.md` §C4, which specifies Gentle Daily Shampoo as one variable
product with three fragrance variations — the client split it into three
separate simple products instead, and `next.config.js` carries a permanent
redirect from the retired `/products/gentle-daily-shampoo` to
`gentle-daily-shampoo-fig-neroli`. Treat `products.snapshot.json` and the live
Store API as the truth about the current catalogue, and `product-data.md` as the
field-mapping spec.

| Slug | Name | Price | Category | Type | Pet | Volume | Fragrance | SKU |
|---|---|---|---|---|---|---|---|---|
| `gentle-daily-shampoo-santal-white-tea` | Gentle Daily Shampoo–Santal & White Tea | ₹669 | Daily Ritual | Shampoo | both | 250 ml | Santal & White Tea | SKU-01 |
| `gentle-daily-shampoo-fig-neroli` | Gentle Daily Shampoo–Fig & Neroli | ₹669 | Daily Ritual | Shampoo | both | 250 ml | Fig & Neroli | SKU-02 |
| `gentle-daily-shampoo-violet-leaf-muslin` | Gentle Daily Shampoo–Violet Leaf & Muslin | ₹669 | Daily Ritual | *(unset)* | both | 250 ml | Violet leaf & Muslin | SKU-03 |
| `anti-tick-flea-spray` | Anti-Tick & Flea Spray | ₹399 | Defense | Spray | dog | 100 ml | Vetiver & Cypress | SKU-04 |
| `paw-cleaner` | Paw Cleaner | ₹519 | Remedy | Cleaner | dog | 150 ml | Spearmint & Sea Salt | SKU-05 |
| `dry-foam-shampoo` | Dry Foam Shampoo | ₹429 | Remedy | Shampoo | both | 100 ml | Hinoki & Bamboo | SKU-06 |
| `refreshing-mist` | Refreshing Mist | ₹459 | Refresh | Mist | dog | 100 ml | Yuzu & White Musk | SKU-07 |

Figures above are from the committed snapshot; the live API is authoritative.
SKUs are placeholders. The third shampoo fragrance replaced *Hinoki & Bamboo*
with *Violet leaf & Muslin*, and `Mimosa & Tonka` was removed from the scent
filter list.

WooCommerce structure the code depends on:

- **Categories** (4, not nested): `Daily Ritual` / `Defense` / `Remedy` / `Refresh`
- **Attributes** (exactly 4, each holding terms — not one attribute per term):
  - `pa_pet` → terms with slugs **`both`**, **`dog`**, **`cat`** (override the
    auto-generated slugs)
  - `pa_producttype` → Shampoo · Spray · Cleaner · Mist
  - `pa_volume` → e.g. `300 ml` / `250 ml` / `150 ml` / `100 ml` (lowercase `ml`, one space)
  - `pa_fragrance` → the fragrance names, using `&` not "and"
- Long-form **Key ingredients / How to use / Safety** copy goes in the product's
  **Description** as HTML — the Store API returns `description`, so it renders
  without any new Woo fields. Custom fields would be invisible to the API.
- **Short description** takes the one-line product line.
- Attributes must be real *attributes*, not custom fields; products must be
  **Published** (drafts are invisible to the Store API) and have a **featured
  image** (no image ⇒ the frontend drops the product).
- Leave **Sale price** empty unless genuinely discounted — it triggers a
  strikethrough.

Frontend filters: category ("ritual"), pet, **scent**, plus sort. Scent options
are hardcoded in `ShopClient.tsx` as `SCENT_FILTERS` and matched against
`product.variantLabel`.

Declared in `WooProduct` but rendered nowhere and not going into WooCommerce:
`hoverImage`, `isNew`, `rating`, `reviews`, `foundingPriceLabel`, `ingredients`,
`benefits`, `howToUse`, `badge` (always `null`).

---

## 9. WordPress side

Two must-use plugins in `wordpress/mu-plugins/` (mu-plugins load automatically —
no activation, and they cannot be deactivated by accident from the admin UI).
They live in this repo as source of truth but must be **uploaded to
`wp-content/mu-plugins/`** on the store.

### `ft-checkout.php` — the cart handoff. **Load-bearing: deleting it breaks checkout.**

Accepts `/?ft-checkout=1&items=<slug>[:<variation-term>]*<qty>,...` on
`wp_loaded` priority 30 (when WooCommerce has initialised cart and session).
Then: empty the cart, resolve each slug via `get_page_by_path()`, resolve a
variation by matching **any** attribute value against the term slug, add to
cart, `calculate_totals()`, `wp_safe_redirect( wc_get_checkout_url() )`.

- The cart is emptied first, so re-clicking checkout **replaces** rather than accumulates.
- Unknown / unpurchasable slugs are **skipped and logged**, never fatal.
- A variable product with no resolved variation is skipped — Woo cannot add it.
- Prices from the browser are ignored entirely.
- Guards: max 50 lines, max qty 99, `nocache_headers()`, never fires for admin /
  cron / REST, and the whole body is wrapped in `try/catch` (a fatal here would
  take out the whole request), falling back to the shop or cart page rather than
  an empty checkout.

### `ft-store-scope.php` — keeps the subdomain transactional

WooCommerce still publishes its own `/shop` and `/product/*` pages, which
duplicate every product page and let customers browse an unstyled catalogue.
So: 301-redirect browsing to the apex (`/product/<slug>` → `/products/<slug>`,
`/shop` and `/product-category` → `/shop`, everything else → `/`), and
`noindex, nofollow` the whole subdomain via both header and meta, with
`wp_sitemaps_enabled` filtered off.

**Must be let through, or things break silently:**
`?wc-api=` (Razorpay's gateway callback arrives on the HOME url — a blanket `/`
redirect loses payments), `?ft-checkout=`, `?add-to-cart=`, `?wc-ajax=`,
`/checkout*`, `/cart*`, `/my-account*`, `/wp-login.php`, `/wp-json`,
`/wp-content`, `/wp-includes`, `/wp-admin`, plus admin / AJAX / cron / REST.

The redirect response itself is marked no-cache (`nocache_headers()`,
`X-LiteSpeed-Cache-Control: no-cache`, `litespeed_control_set_nocache`) —
LiteSpeed and Hostinger's CDN had both cached the pre-plugin 200 for `/` and
kept serving it, so the redirect only appeared when a query string bypassed the
cache.

### Caching exclusions — non-negotiable

Exclude from LiteSpeed/CDN: `/checkout`, `/cart`, `/my-account`,
`/wp-json/wc/store/*`, `/?ft-checkout=`. Verify with two browsers showing
different carts. **Cached carts leak between customers.**

### Outbound mail

All WooCommerce mail goes out over authenticated SMTP via **WP Mail SMTP** from
the store subdomain:

```
Mailer      smtp
Host        smtp.hostinger.com
Port        465
SMTPSecure  ssl          (implicit TLS; correct for Hostinger)
SMTPAuth    true
Username    the FULL mailbox address, not the local part
Credentials in the DATABASE, not wp-config.php constants
```

**Port 465 + ssl is correct. Do not "fix" it to 587.** `SMTPAutoTLS` is a no-op
on 465 — don't spend time on it. `SMTP Debug: [empty]` next to an auth error is
expected, not a second fault.

This broke once (2026-09-01, `Could not authenticate`) and **nothing surfaced
it** — WooCommerce reported orders as placed, and the only signal was an admin
notice in wp-admin. The full diagnostic order is in
`docs/build-brief.md` → Outbound mail; read it before debugging mail again, it
rules out the WP-Cron and email-template false leads in one line. Verifying a
fix needs **two** steps: WP Mail SMTP → Tools → Email Test proves the transport,
but only a real order confirmation proves WooCommerce mail.

The apex contact form is a **completely separate path** (Brevo API) — fixing one
does not fix the other.

---

## 10. Email, forms and third parties

| Path | Service | Where |
|---|---|---|
| Contact form (apex) | **Brevo** transactional API, plain `fetch` to `https://api.brevo.com/v3/smtp/email` | `src/app/api/contact/route.ts` |
| Newsletter popup | **Braze** `/users/track`, `email_subscribe: 'opted_in'` | `src/app/api/newsletter/route.ts` |
| WooCommerce order mail | Hostinger SMTP via WP Mail SMTP | WordPress |
| Payments | **Razorpay** | WooCommerce |
| WhatsApp | `https://wa.me/918796786531` | `WhatsAppNudge.tsx` |

`/api/contact` hardening worth knowing about: `runtime = 'nodejs'`,
`dynamic = 'force-dynamic'`; a **honeypot** field named `company` that returns
`200` so bots get no signal; an in-process rate limit (5 per 10 minutes per IP,
with map pruning); length caps (name 100 / email 254 / message 5000); CR-LF
stripped from single-line values so a submission cannot inject email headers;
HTML-escaped interpolation; `replyTo` set to the customer so hitting reply
answers them directly; Brevo's failure reason logged but never returned.

Sender details are printed **first and without angle brackets** — an earlier
version put `From: Name <a@b.com>` in a footer and the address vanished, because
a bare `<a@b.com>` parses as an unknown HTML tag and gets dropped.

**SPF note:** the domain has exactly one SPF record
(`v=spf1 include:_spf.mail.hostinger.com ~all`). A domain may only have **one**.
Adding a second breaks all mail including order confirmations — if Brevo ever
emails customers, merge the includes rather than adding a record.

### Environment variables

| When | Var | Notes |
|---|---|---|
| **build** | `NEXT_PUBLIC_WP_URL` | `NEXT_PUBLIC_*` is **inlined at build time** — set it *before* deploying; setting it afterwards does nothing. Literal fallback `https://store.furrytailjoy.com` in `src/lib/config.ts` |
| build | `NEXT_PUBLIC_SITE_URL` | optional; `site-url.ts` falls back to `https://furrytailjoy.com` in production |
| runtime | `BREVO_API_KEY` | server-only ⇒ read at runtime; set in hPanel and restart, no rebuild |
| runtime | `CONTACT_TO_EMAIL` | `orders@furrytailjoy.com` |
| runtime | `CONTACT_FROM_EMAIL` | must be a Brevo-verified sender |
| runtime | `BRAZE_API_KEY`, `BRAZE_REST_ENDPOINT` | newsletter; without the key the route just logs |

`.env.example` also lists `NEXT_PUBLIC_APP_ID`, `PLATFORM_BASE_URL`,
`PLATFORM_API_KEY`, `PRERENDER_TOKEN`, `NEXT_PUBLIC_DISABLE_KITE_BADGE` — all
inherited from the site-builder platform and unused by the live app.

`src/lib/site-url.ts` uses `||` and not `??` deliberately: the sandbox preview
writes these keys **present-but-empty**, and `new URL('')` throws, which would
500 every route.

---

## 11. SEO, metadata and analytics

- Root `layout.tsx` sets `metadataBase` from `getBaseUrl()`, the site title,
  Twitter card and icons (the favicon is currently a `static.kite.ai` URL).
- `/products/[id]` has `generateMetadata` (title, description, canonical,
  OpenGraph with the product image) and emits **Product JSON-LD** with brand,
  SKU, `priceCurrency: 'INR'`, price and availability.
- `/shop` has `generateMetadata`; the content pages have static `metadata`.
- `sitemap.ts` lists `/`, `/shop`, `/about`, `/ingredients`, `/journal`,
  `/shipping` plus every product URL from `fetchProductSlugs()`,
  `revalidate = 3600`. `/account` is deliberately absent — it is noindex, and
  listing a noindex page sends crawlers contradictory signals.
- `robots.ts` is code rather than a static file so the `Sitemap:` directive can
  be **absolute** (both Google and sitemaps.org silently ignore relative ones).
  It names the major AI crawlers explicitly (GPTBot, ClaudeBot, PerplexityBot,
  …) with the same allow policy as `*`, so the site declares an AI-bot policy
  instead of leaving agents to infer one.
- **`middleware.ts` is pass-through only.** It used to re-export a
  prerender-for-bots helper that did `return fetch(req)` for the pass-through
  case, which loops back through the edge into middleware again →
  `508 INFINITE_LOOP_DETECTED`.
- `next.config.js` also derives `NEXT_PUBLIC_KITE_SDK_HASH` from a SHA-256 of
  `public/kite-analytics.js` at build time, so the analytics SDK's cache-bust
  can never be forgotten. The DOM carries `data-kite-page-id`,
  `data-kite-surface`, `data-kite-cta-id`, `data-kite-event` attributes for that
  SDK, described by `kite-manifest.json`.
- The `rewrites()` block routing everything to `/prototype.html` is **legacy**
  and inert — it only fires if `public/prototype.html` exists, which it does not
  in this (Next.js pipeline) app.

---

## 12. Deploy

Hostinger Web Apps **builds from source**. Two scripts exist; the source one is
the current routine:

```bash
python scripts/make-deploy-zip.py
```

Produces `deploy/furrytail-source.zip` — **source only**, no `node_modules`, no
`.next`. Hostinger runs `npm install` then `npm run build` itself. Uploading a
prebuilt bundle instead makes framework detection try to build it and fail.

It is Python and not PowerShell because **PowerShell 5.1's `Compress-Archive`
writes backslashes as zip path separators**, which Linux `unzip` rejects — the
build server would extract flat files named `src\lib\woo.ts`. It uses an
**allowlist**, not an exclude list, so nothing ships unless it is named (that is
how a 2.5 MB unused video and a stray curl dump got into earlier zips).

hPanel settings that go with it:

```
Framework preset : Next.js
Node version     : 22.x
Root directory   : ./
Build settings   : Default for Next.js
Env var          : NEXT_PUBLIC_WP_URL = https://store.furrytailjoy.com
```

`scripts/deploy.ps1` is the alternative path: it builds locally and packages
`.next/standalone` into `deploy/furrytail-deploy.zip` (~29–48 MB), to be
extracted at the Web App root and started with `node server.js`. It guards the
easy mistake — Next's standalone output **excludes `.next/static` and
`public/`**, and if they are missing the site loads with no CSS and no images,
which looks exactly like a broken build.

### CDN staleness — fixed in three layers, but know the failure

This was the single worst bug of the build. Hostinger's CDN does **not** purge
on deploy, and Next marks fully-static pages `Cache-Control: s-maxage=31536000`
(one year), which hcdn honours — a document was caught held at the edge with
`Age: 67138` (~18 h). Chunk filenames are content-hashed, so that stale
document asked for the *previous* build's `/_next/static/chunks/*`: the
stylesheet 404'd and the page painted with **no CSS at all**. The visible
symptom was one photo filling the whole viewport for ~5 s — a `next/image`
`fill` element whose `relative` container had lost its Tailwind class — before
the client gave up and reloaded. A successful deploy looked like it had
silently failed.

Three independent layers now, because no single one covers every request:

| Layer | Covers | Verified |
|---|---|---|
| `middleware.ts` | Document requests (`Accept: text/html`) get `public, max-age=0, must-revalidate` | hcdn returns `x-hcdn-cache-status: DYNAMIC` — the HTML is no longer edge-cached |
| `revalidate = 300` in `src/app/layout.tsx` + `expireTime: 3600` in `next.config.js` | Everything else, e.g. a crawler sending `Accept: */*`, which middleware deliberately skips | `s-maxage=300, stale-while-revalidate=3300` |
| `src/instrumentation.ts` | Purges via the Hostinger API on server start — which on Hostinger *is* a redeploy; there is no deploy webhook | `/api/v1/health` reports `purged furrytailjoy.com` |

`Cache-Control` cannot be set from `next.config.js`'s `headers()` — Next
overwrites it for statically generated routes. Middleware works; that was
measured, and the finding is recorded in `middleware.ts` so nobody retries it.

**Purging is no longer a manual step**, provided these are set in hPanel →
Web App → Environment (all three, or it skips):

```
HOSTINGER_API_TOKEN         hpanel.hostinger.com/api  (Dev tools > API)
HOSTINGER_ACCOUNT_USERNAME  u124723716   <- the account username, not the domain
HOSTINGER_PURGE_DOMAIN      furrytailjoy.com
```

Verify after a deploy — hPanel exposes only the **build** log, so the purge's
stdout is unreachable and this endpoint is the only window onto it:

```bash
curl -s https://furrytailjoy.com/api/v1/health
```

`cdnPurge.detail` names the outcome: `purged <domain>`, `skipped - not set:
<vars>`, `HTTP 4xx` (token invalid or unscoped), `started (NODE_ENV=…)`, or
`instrumentation did not run`. `purgeEnv` reports whether each var is present
(booleans only) read independently of instrumentation, so a missing var cannot
be confused with instrumentation failing.

Two traps when reading it:

- **The app runs more than one worker.** Each runs `register()` separately, so
  right after a deploy you may hit one still mid-purge — two different
  `cdnPurge.at` timestamps were observed from the same deploy. Check twice.
- **The purge is fire-and-forget**, so `started` a fraction of a second after
  boot just means the API call is in flight. It is not a failure.

`scripts/purge-cdn.ps1` purges on demand and is the fallback if the automatic
one ever stops. It resolves the account username from the API and then polls
until the served document's stylesheet actually resolves — a purge takes minutes
to propagate globally, and checking once reports a false failure.

Diagnosing it by hand:

```bash
curl -sI https://furrytailjoy.com/ | grep -i "age:\|x-hcdn-cache-status"
```

`x-hcdn-cache-status: HIT` with a large `Age` means you are looking at a cached
page; `DYNAMIC` means fresh. **The faster tell: add a query string** — if
`?cb=1` behaves differently from the plain URL, it is cache, not code. That
masked a working change four times during the build. Beware the inverse too:
reading a cached response and concluding the *code* is broken. A CDN `HIT`
replays the headers from whenever it was stored, so a fix can look inert when it
is actually live — that happened while fixing this very bug.

**The store subdomain has two cache layers and its own CDN entry.** A store-side
change needs LiteSpeed purged *inside WordPress* (Toolbox → Purge All) **and**
the CDN purged on the **store's** hPanel entry, not the apex's. They are
separate websites in hPanel.

### Hostinger layout

```
furrytailjoy.com                           → Next.js Web App
store.furrytailjoy.com                     → WordPress + WooCommerce (own docroot + SSL)
maroon-gull-464135.hostingersite.com       → spare Web App, useful as staging
furrytailjoy-com-668919.hostingersite.com  → old placeholder WordPress
```

Refresh the build-time snapshot occasionally:

```bash
curl -s https://furrytailjoy.com/api/products > snap.json
```

then replace `src/data/products.snapshot.json` with the `products` array from it.

---

## 13. Working conventions in this repo

- **Comments explain *why*, at length.** Most non-obvious lines carry a comment
  naming the failure it prevents, often with the date and symptom. Match that
  density — it is the house style, and several of those comments are the only
  record of a production incident.
- Section dividers use box-drawing runs:
  `// ─── Name ─────────────────────────────────────`.
- Prettier with `.prettierrc` (`semi`, `singleQuote`).
- The client/server split is explicit and deliberate: `'use client'` files must
  not export anything a server component needs (that is exactly why `parsePrice`
  lives in `lib/price.ts` and not `lib/cart.tsx`).
- Server components import `@/services/api`; client components use
  `useProducts()` / `/api/products`.
- Validate-and-quarantine for *display* data (drop one bad product),
  throw-rather-than-cache for *cache* decisions.
- **No PHP work and no WooCommerce API keys** on the frontend side.
- Git: **commits go straight to `main`** — no branches, no PRs. Push only when
  asked. **Never add a Co-Authored-By / Claude attribution trailer** to commits.

### Load-bearing files — do not casually rewrite

| File | Why |
|---|---|
| `wordpress/mu-plugins/ft-checkout.php` | deleting it breaks checkout entirely |
| `src/lib/woo.ts` | every resilience rule in §5 lives here |
| `src/app/products/[id]/ProductClient.tsx` | three rewrites each dropped something — see below |
| `next.config.js` `output: 'standalone'` | deployment depends on it |
| `scripts/make-deploy-zip.py` allowlist | keeps junk out of the deploy |

`ProductClient.tsx` specifically:

- the **gallery block** reads `product.gallery` (the WooCommerce image gallery);
  removing it brings back the fake "Placeholder / In use / Texture" tiles
- the **ingredients section** renders `product.description` — that is where the
  ingredients / how-to-use / safety copy authored in wp-admin appears
- **`variantId`** must reach the cart if a variable product ever returns.
  `ft-checkout.php` refuses a variable product without a variation, so the item
  is silently dropped at checkout. This took the flagship product offline once.

---

## 14. Documentation map

| Doc | Read it for |
|---|---|
| `docs/CONTEXT.md` | this file — whole-project orientation |
| `docs/build-brief.md` | architecture, verified state, deploy notes, **SMTP runbook** |
| `docs/pending.md` | the canonical outstanding-work list, deploy routine, load-bearing notes, env var table |
| `docs/product-data.md` | WooCommerce field spec — exact categories, attribute slugs, per-product copy |
| `docs/client-requirements.md` | what is still needed from the client (Razorpay KYC, GST/HSN, shipping, policies) |
| `docs/archive/*` | **superseded** — a Vercel/headless-endpoint plan that was abandoned. `resilience.md` is the exception worth reading: its R1–R8 rules are what `woo.ts` implements |
| `visual_spec.md` | a generic generated spec that does **not** describe the shipped design. Ignore it; use §6 |
| `.opencode/skills/furrytails-design-constitution/SKILL.md` | full design constitution |
| `.opencode/skills/furrytail-factual-reference-guardrails/SKILL.md` | full copy guardrails |

`.opencode/` also holds ~60 unrelated site-builder agent skills inherited from
the platform that generated the original scaffold. They are not part of the app
and are not used at runtime — the two Furrytail-specific ones above are the only
ones that carry project rules.
