# Furrytail — Pending Tasks

Canonical list of what's left. Updated 2026-08-28.

**Live and working:** furrytailjoy.com serves the Next.js frontend, catalogue
reads from WooCommerce, COD orders complete end to end, order emails deliver via
authenticated SMTP, the contact form relays through Brevo, cache exclusions are
verified, Razorpay works in test mode, and the Node process survived its
overnight persistence test.

---

## 0. Deploy routine — purge the CDN

```
1. python scripts/make-deploy-zip.py
2. upload + deploy in hPanel
3. purge the CDN            <- easy to forget
4. verify
```

**Step 3 is not optional.** Next.js marks fully-static pages
`Cache-Control: s-maxage=31536000` (one year), and Hostinger's CDN honours it.
Without a purge a deploy looks like it silently failed.

Diagnose with:

    curl -sI https://furrytailjoy.com/ | grep -i "age:\|x-hcdn-cache-status"

`x-hcdn-cache-status: HIT` with a large `Age` means you are looking at a cached
page, not your deploy. `DYNAMIC` means it is fresh.

**The faster tell: add a query string.** If `?cb=1` behaves differently from the
plain URL, it is cache, not code. This masked a working change four times during
the build — twice on the homepage, twice on the store root.

**The store subdomain has TWO cache layers and its own CDN entry.** A store-side
change needs LiteSpeed purged *inside WordPress* (Toolbox → Purge All) **and**
the CDN purged on the **store's** hPanel entry — not the apex's. They are
separate websites in hPanel.

---

## 1. Razorpay — finish going live · Kshitij · HIGH

Test mode works. Both COD and Razorpay render on checkout, and a test payment
succeeded (order correctly landed in **Processing** — paid, awaiting dispatch).

- [ ] **Verify the last test order recorded a payment ID.** WooCommerce → Orders
      → open it → order notes should show `pay_XXXXXXXX`. If it's missing, the
      order was marked paid without the transaction attached, which makes refunds
      and reconciliation painful later.

- [ ] **Configure the webhook (test mode).** WooCommerce → Settings → Payments →
      Razorpay shows the webhook URL and secret. Paste both into Razorpay →
      Settings → Webhooks → Add New. Subscribe to `payment.authorized` and
      `payment.failed`.

      Why it matters: the successful test worked because we returned to the site
      after paying. The webhook covers customers who don't — closed tab, lost
      signal, UPI app not redirecting back. Without it, money lands in Razorpay
      while the order looks unpaid in WooCommerce. On mobile UPI that's routine,
      not an edge case.

- [ ] **Enable Live Mode**, generate live keys (`rzp_live_...`), swap them in.

- [ ] **Add a SECOND webhook for live mode.** Test and live webhooks are separate
      in Razorpay — this is the easy one to forget.

- [ ] **Place one small real order**, confirm it lands correctly, then refund it.
      Test-mode success doesn't prove live works: different keys, different
      webhook, different environment.

Known and accepted: the Razorpay merchant is *Clamique Personal Care Private
Limited*, so that name may appear on customer statements rather than Furrytail.

---

## 2. Store configuration · Kshitij · HIGH

- [ ] **Shipping zones.** Orders currently charge **₹0 delivery**, so courier cost
      is absorbed on every sale. WooCommerce → Settings → Shipping → India zone
      with a flat rate or free-above-threshold. The only remaining item that costs
      money on every order while it's unset.

- [ ] **Confirm current prices are intentional.** Live: shampoos ₹669,
      Refreshing Mist ₹459, Dry Foam ₹429, Anti-Tick ₹399, Paw Cleaner ₹519.
      Ansh's product master specifies ₹695 / ₹545 / ₹595 / ₹595 / ₹495 — every
      one differs, and orders are being taken at the live figures.

- [ ] **Fix fragrance capitalisation.** The third shampoo reads *"violet leaf &
      muslin"* — lowercase, next to "Fig & Neroli" and "Santal & White Tea".
      Products → Attributes → Fragrance → Configure terms. Note: Ansh changed
      this in `home.ts`, which no longer supplies product data — the fix has to
      be made in wp-admin.

- [ ] **Product naming.** The three shampoos read `Gentle Daily Shampoo-Fig &
      Neroli` — hyphen with no spaces, which sits cramped on cards. A spaced
      en-dash reads better.

- [ ] **Plugin audit.** A "Point of Sale" tab appears in WooCommerce settings, so
      a POS plugin is installed. Remove it and anything else unused. Target set:
      WooCommerce, Razorpay, LiteSpeed Cache, WP Mail SMTP, PDF invoices.

- [ ] **Real stock quantities** per SKU (currently placeholder numbers).

- [ ] **Delete the old `hostinger-ai-theme`** now Storefront is active and
      verified. It emitted untranslated `trans-*` tokens into the checkout footer.

---

## 3. Receipts / invoices · Kshitij · BLOCKED on client

Plan agreed, not started — it depends on the GST answer.

- [ ] Get the client's **GST registration status** (see §5)
- [ ] Install **WooCommerce PDF Invoices & Packing Slips** (WP Overnight, free)
- [ ] Configure: attach to **Completed order** (invoice arrives with the goods,
      which suits COD), number format `FT-[[year]]-0001`, reset yearly
- [ ] Set shop name, address and logo on the General tab — that's what prints
- [ ] Test: place an order, mark Completed, confirm the PDF attaches to the email
      and downloads from My Account

**Do not label it "Tax Invoice" without a GSTIN and HSN codes.** If the client is
GST-registered the document legally needs GSTIN, sequential numbering, HSN per
line, taxable value, and the CGST/SGST/IGST split with place of supply. If they
aren't registered, call it a Receipt.

Legal entity for invoices: **Clamique Personal Care Private Limited**.

---

## 4. Reliability · Kshitij · MEDIUM

- [x] ~~Node persistence test~~ — passed.

- [ ] **UptimeRobot** on furrytailjoy.com, 5-minute interval. Nothing blocks this
      now the persistence test is done.

- [ ] **Zero-orders alert** during business hours. The only check that catches a
      silently broken payment path — uptime monitors return 200 throughout.

- [ ] **Verify a backup restore actually works**, on staging, once. An untested
      backup isn't a backup.

- [ ] **Object cache** — included in the Business plan. The store responds in
      ~2.3s, and cart/checkout can never be page-cached, so this is the main lever.

---

## 5. Waiting on the client

Full detail in `docs/client-requirements.md`. The two that block most:

- [ ] **GST status + GSTIN + HSN code and rate per product** — blocks correct
      invoicing entirely
- [ ] **Shipping decisions** — courier, rates, per-product weight and dimensions,
      COD pincode coverage, whether to charge a COD fee
- [ ] Legal policies: return/refund, shipping, privacy, T&Cs, contact details.
      Required by Indian e-commerce rules *and* Razorpay onboarding
- [ ] Final prices (see §2), real SKU/barcode values
- [ ] Refreshing Mist volume — 100 ml or 120 ml (product master flags the conflict)
- [ ] Per-fragrance shampoo photography — check all three now differ
- [ ] Who works the order queue daily, and who reads orders@furrytailjoy.com

---

## 6. Frontend · Ansh

- [ ] **2.5D/3D homepage effects** — client-requested, still not started, and the
      most visible gap. Approach in `docs/build-brief.md` §3.8: layered parallax
      on the existing transparent PNGs, cursor tilt, sticky depth reveals. CSS
      transforms rather than Three.js; disable on mobile; respect
      `prefers-reduced-motion`.

- [ ] **Hidden honeypot field on the contact form.** `/api/contact` already drops
      submissions where a `company` field is filled, but the form has no such
      hidden input, so the check never fires. A few lines, and the cheapest spam
      defence available.

- [ ] **Hero video double-load.** `src/app/page.tsx` has two `<video>` elements
      toggled with `block md:hidden` / `hidden md:block`. `display:none` doesn't
      reliably prevent the fetch, so mobile may download both. Fix with one
      `<video>` and `<source media="...">`. Add a `poster` — the hero is blank
      until the video starts.

- [ ] **`src/app/page.tsx` is mangled** — 1,263 lines compressed to ~32, with a
      BOM and corrupted UTF-8 in the comments (`â€"` for `—`). It builds and no
      mojibake reaches the page, but it is effectively unmaintainable. Whatever
      tool did this should not be run again.

### What is load-bearing in ProductClient.tsx

Three rewrites of this file have each dropped something. Not obvious from the
JSX, so worth stating:

- **the gallery block** reads `product.gallery` — the WooCommerce image gallery.
  Removing it brings back the fake "Placeholder / In use / Texture" tiles.
- **the ingredients section** renders `product.description` — that is where the
  ingredients / how-to-use / safety copy lives, authored in wp-admin.
- **`variantId`** must reach the cart if a variable product ever returns.
  `ft-checkout.php` refuses a variable product without a variation, so the item
  is silently dropped at checkout. This took the flagship product offline once.

### General

`src/data/home.ts` no longer supplies product data — only editorial content
(hero copy, brand story, ingredient chapters). Anything keyed off a product
**name** or a hardcoded **price** will drift the moment the catalogue is edited
in wp-admin. Slugs and attribute term slugs are the stable identifiers.

---

## 7. Deferred technical debt

Not blocking, but real.

- [ ] **28 `static.kite.ai` references** in `src/data/home.ts` — editorial and
      ingredient imagery served from the site-builder's CDN, on an account we
      don't control. Product images are already migrated; these aren't. (Was 48;
      20 went with the dead product arrays.)

- [ ] **Unoptimised assets** in `public/`. Product images compressed 97%
      (8.18 MB → 0.23 MB) as WebP; Ansh has since compressed the hero videos.
      The remaining editorial JPEGs are untouched.

- [ ] Consider per-fragrance ingredient copy on the shampoos — all three
      currently list every fragrance's botanicals together.

- [ ] **SPF merge, if Brevo's role grows.** Domain authentication was deliberately
      skipped: the domain already has
      `v=spf1 include:_spf.mail.hostinger.com ~all`, and a domain may only have
      ONE SPF record. Adding a second breaks all mail, including order
      confirmations. If Brevo is ever used to email *customers*, merge the
      includes into a single record rather than adding one.

- [ ] Refresh `src/data/products.snapshot.json` occasionally — the build-time
      fallback used when WordPress is unreachable:

      curl -s https://furrytailjoy.com/api/products > snap.json

      then replace the file with the `products` array from it.

---

## Reference

| Doc | Contents |
|---|---|
| `docs/build-brief.md` | architecture, verified state, deploy notes |
| `docs/product-data.md` | WooCommerce field spec, exact attribute values |
| `docs/client-requirements.md` | client-facing ask list |
| `scripts/make-deploy-zip.py` | builds the deploy zip for Hostinger |
| `wordpress/mu-plugins/ft-checkout.php` | cart handoff — **load-bearing**, deleting it breaks checkout |
| `wordpress/mu-plugins/ft-store-scope.php` | scopes the store subdomain, noindexes it |

### Env vars

| Where | Var | Notes |
|---|---|---|
| build time | `NEXT_PUBLIC_WP_URL` | `NEXT_PUBLIC_*` is inlined at build — must be set **before** deploying. Literal fallback in `src/lib/config.ts`. |
| runtime | `BREVO_API_KEY` | server-only, read at runtime — set in hPanel and restart, no rebuild |
| runtime | `CONTACT_TO_EMAIL` | `orders@furrytailjoy.com` |
| runtime | `CONTACT_FROM_EMAIL` | must be a Brevo-verified sender |
