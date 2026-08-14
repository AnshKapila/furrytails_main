# Furrytail Headless — Resilience Design

**Companion to** `docs/headless-contract.md` · **Owner:** Kshitij (with frontend rules for Ansh)

Goal: the storefront stays up and sellable even when WordPress does not.

---

## 1. The core principle

In a naive headless build, **every page render depends on WordPress**. Since WP
sits on Hostinger shared hosting behind LiteSpeed, that makes the storefront no
more reliable than the least reliable part of the stack — and shared hosting
will go down. Plugin updates, PHP fatals, LiteSpeed misconfig, host maintenance,
a slow neighbour on the same box, an `mu-plugin` typo.

So don't build it that way. Split the site into two failure domains:

| Path | Depends on WP? | Target availability |
|---|---|---|
| **Browse** — home, shop, PDP, cart drawer | **No** (after first build) | Vercel CDN, ~100% |
| **Purchase** — cart handoff, checkout, payment | Yes | Whatever WP gives us |

WordPress becomes a *content source*, not a *runtime dependency*. When WP is
down, customers can still browse the entire catalog; only completing a purchase
is affected — and that degrades with a clear message instead of a broken page.

This single decision is worth more than every other item in this document.

---

## 2. Non-negotiable rules

These are testable. Each maps to a real failure mode.

### R1 — Never render the catalog dynamically

Use time-based ISR. Never `cache: 'no-store'`, never `export const dynamic = 'force-dynamic'`
on catalog pages. A dynamic page means WP down = site down.

```ts
export const revalidate = 300;   // 5 min
```

### R2 — In Next 15/16, `fetch` is NOT cached by default

This is the easiest way to accidentally violate R1. You must opt in explicitly:

```ts
await fetch(url, { next: { revalidate: 300 } });
```

Without that option every render hits WordPress. Verify with a load test, not
by reading the code.

### R3 — Never cache an empty catalog

The most dangerous failure isn't an error — it's successfully caching *nothing*.
If the fetch fails and the code returns `[]`, ISR happily caches an empty shop
page and serves it for the full revalidate window.

```ts
const products = validate(await res.json());
if (products.length === 0) throw new Error('empty catalog — refusing to cache');
```

Counter-intuitive but correct: **throw on failure during revalidation.** Next.js
keeps serving the last good page when regeneration throws. Swallowing the error
and returning empty is what actually breaks the site.

### R4 — Fixture fallback at build time only

R3 throws — but at build time there is no previous page to fall back to, so a
throw fails the deploy. Fall back to the committed fixture *only* when there is
no cached page yet:

```ts
try {
  return await fetchLive();
} catch (e) {
  if (isBuild) return fixture;   // deploy must never be blocked by WP
  throw e;                       // runtime: keep the stale page
}
```

Consequence: a Vercel deploy while WordPress is down still succeeds and ships a
working store. This matters more than it sounds — ISR cache is dropped on each
new deployment, so deploys are exactly when WP downtime bites.

### R5 — Validate and quarantine every product

Ansh is entering product data in wp-admin. A missing image, a price typed as
text, a mistyped attribute term — any of these can crash a page. `<Image>` with
an empty `src` throws; `parsePrice()` on garbage yields `NaN`.

Validate each product at the boundary. **Drop invalid items, keep the rest, log
loudly.** One bad product must never take down the shop page.

`src/lib/cart.tsx` already does exactly this for localStorage hydration —
per-item validation with normalisation. Extend that precedent to the catalog.

### R6 — The checkout path always has a fallback

If the Store API cart call fails, don't leave a dead button. Fall back to Woo's
native URL-param add-to-cart:

```
{woo}/cart/?add-to-cart={id}&quantity={n}
```

And if WP is unreachable entirely, disable the checkout CTA with an honest
message rather than letting it fail silently. A customer who sees "checkout is
briefly unavailable, your cart is saved" comes back. One who hits a white screen
does not.

### R7 — Woo is always authoritative on price and stock

The catalog is up to 5 minutes stale by design. Woo recalculates everything when
it builds the real cart. Never let a localStorage price reach an order. If the
price changed between browse and checkout, surface it plainly.

`inStock` in the contract is **advisory** — good enough to grey out a button, never
the basis for accepting an order.

### R8 — Slugs are immutable

`id` is the Woo slug and drives every product URL. Changing a slug in wp-admin
404s a live page and loses its SEO. Treat slugs as write-once. If one must
change, add a 301 — `redirects.csv` already exists in the repo for this.

---

## 3. WordPress-side hardening

### The mu-plugin must never fatal

A PHP fatal in the custom endpoint can take down the endpoint *and* wp-admin.

- Wrap all logic in try/catch; return a 500 JSON body, never a fatal
- No dependency on ACF functions without `function_exists()` guards
- If ACF is deactivated, the endpoint should still return products minus custom fields
- Version the namespace (`furrytail/v1`) so a future breaking change ships as `v2`

### Turn off auto-updates

On Hostinger, plugin auto-updates are the most likely cause of a sudden outage.
Disable auto-updates for WooCommerce, ACF, and the payment gateway. Update
manually on staging first. Woo minor releases have broken Store API responses
before.

### Staging environment

A Hostinger staging clone, so Woo/plugin updates and mu-plugin changes are never
tested in production. Non-optional given the site is transactional.

### Cache the catalog endpoint, never the cart

```
CACHE:     /wp-json/furrytail/v1/*         ← public catalog, cache hard
NO CACHE:  /wp-json/wc/store/*
           /checkout*  /cart*  /my-account*
```

Getting this backwards leaks carts between customers. Verify by loading a cart
in two different browsers and confirming they differ.

### Rate-limit and secret the revalidation webhook

A Woo product-save webhook firing into a Next.js `revalidatePath` route needs a
shared secret, or anyone can force-invalidate your cache. Debounce it too — bulk
edits in wp-admin can fire dozens of webhooks in seconds.

---

## 4. Frontend hardening (Ansh)

| Requirement | Reason |
|---|---|
| ISR on all catalog pages (R1, R2) | Survives WP downtime |
| Fixture fallback at build (R4) | Deploys never blocked by WP |
| Throw, don't return empty (R3) | Prevents caching a broken page |
| Per-product validation (R5) | One bad product can't break the shop |
| `error.tsx` per route segment | Contains failures to a section |
| Skeletons via `loading.tsx` | No layout jump on slow first load |
| No empty `<Image src>` ever | Throws at render |
| Checkout CTA degrades gracefully (R6) | Never a dead end |

`src/app/error.tsx`, `global-error.tsx`, `loading.tsx` and `not-found.tsx`
already exist — they need to actually be wired per segment rather than only at
the root.

---

## 5. Monitoring

You should never learn about an outage from a customer.

| Check | Frequency | Alerts on |
|---|---|---|
| `furrytailjoy.com` 200 | 1 min | storefront down |
| `/wp-json/furrytail/v1/products` returns ≥5 products | 5 min | catalog broken or emptied |
| `shop.furrytailjoy.com/checkout` 200 | 5 min | purchase path down |
| Razorpay test transaction | daily | payment silently broken |
| Vercel build failures | on event | deploy broken |

The product-count check is the important one. It catches the failure that no
uptime monitor sees: **the site is up and serving a stale or empty catalog.**

Extend the existing `src/app/api/v1/health/route.ts` with a *separate* upstream
check (`/api/v1/health/upstream`) that reports WP reachability. Keep it separate
so Vercel's own health signal doesn't go red when WP hiccups — that's expected
behaviour in this architecture, not an outage.

### Silent revenue loss

The worst failure mode is one where the site looks fine and nobody can pay.
Alert on **zero orders in N hours** during business hours. It's the only check
that catches a broken gateway, a mispriced product, or a blocked checkout.

---

## 6. Change management

- **Vercel preview deploys** on every branch; verify before promoting to prod
- **Vercel instant rollback** is the recovery path for a bad frontend deploy —
  know how to trigger it before you need it
- **WP changes go through staging** — no exceptions once live
- **Database backups** daily, and verify a restore actually works once
- Deploy frontend and backend changes **separately**, never same-window, so
  cause is unambiguous when something breaks

---

## 7. Pre-launch checklist

Blocking items before taking a single real order:

- [ ] LiteSpeed exclusions verified — two browsers, two different carts
- [ ] Catalog page still renders with WordPress deliberately stopped
- [ ] Vercel deploy succeeds with WordPress deliberately stopped
- [ ] A product with a missing image does not break the shop page
- [ ] Razorpay works on Woo blocks checkout (test + live mode)
- [ ] Price changed in wp-admin is reflected within the revalidate window
- [ ] Out-of-stock product cannot be ordered
- [ ] Cart survives the handoff from `furrytailjoy.com` to `shop.furrytailjoy.com`
- [ ] GST / tax correct on a real order
- [ ] Order confirmation email fires
- [ ] Slugs match the contract exactly
- [ ] Monitoring live and alerting to a phone
- [ ] Rollback rehearsed once
- [ ] Staging environment exists

---

## 8. What "breakproof" honestly means here

Achievable: **browsing the store is as reliable as Vercel's CDN**, and stays up
through WordPress outages, plugin failures, and host maintenance.

Not achievable: taking payments while WordPress is down. That path needs Woo
live. The mitigation is honest degradation (R6) plus fast alerting (§5), not
elimination.

The failure you should actually plan for is not a dramatic outage — it's the
quiet one: a stale price, a silently emptied catalog, a payment gateway that
stopped working on Tuesday. R3, R5, R7 and the zero-orders alert exist for
exactly those.
