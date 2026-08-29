# Furrytail — Pending Tasks

Canonical list of what's left. Updated 2026-08-29.

Everything still outstanding is in **Part One**. Everything finished and verified
is in **Part Two** at the bottom, kept for the evidence rather than the tick.

**Ansh has handed over.** The 2.5D/3D homepage effects were dropped by the client
and are not happening.

---

## Deploy routine — purge the CDN

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
---

# PART ONE — PENDING

---

## 1. Razorpay — finish going live · Kshitij · HIGH

The test-mode path is fully proven (see Part Two). What remains is live mode.

Razorpay has **verified `furrytailjoy.com`** and the account is live-activated,
so there is no activation blocker. The dashboard shows 1/3 of the go-live
checklist complete — website details done, gateway setup and payment methods
outstanding.

- [~] **Verify the system cron is actually running.** ADDED 2026-08-29 in hPanel
      (store.furrytailjoy.com → Advanced → Cron Jobs), **not yet verified**. A
      cron with a wrong path fails silently and looks identical to a working one.

      Confirm by pulling `razorpay-logs-2026-08-29` after a period with **no
      store browsing** and checking that `Running webhook cron.` lands at a steady
      cadence rather than clustering around page visits.

      Why it matters: the plugin does not act on a webhook when it arrives, it
      *saves* the event and processes it from `Running webhook cron`. That is
      WP-Cron, which fires on page visits, so it stalls on a quiet store — the
      Aug 28 log shows an **82-minute gap** between 20:01 and 21:23. In the exact
      case the webhook exists for (customer pays, never returns) the order can sit
      in Pending payment for an hour before the queued event is processed.
      Delayed, not lost — but indistinguishable from a failure while you wait.

      The job, every 5 minutes:

          curl -s https://store.furrytailjoy.com/wp-cron.php?doing_wp_cron > /dev/null 2>&1

      Leave WP-Cron **enabled** in `wp-config.php` alongside it. WordPress locks
      cron runs so the overlap is harmless, and it stays a fallback. Setting
      `DISABLE_WP_CRON` without a working system cron kills scheduled email and
      WooCommerce Action Scheduler too.

- [ ] **Generate live keys** (`rzp_live_...`) — Account & Settings → Websites &
      API keys → Generate Live Key. The secret is shown **once**; store it before
      closing the dialog. Then paste both into the WooCommerce plugin and save.

- [ ] **Confirm payment methods are enabled in LIVE.** Methods are enabled
      separately per mode — test mode shows everything regardless, which is why
      cards, netbanking and wallets all worked in testing. **UPI is the one to
      check**: it is the majority of Indian consumer payments and sometimes needs
      separate enablement. The plugin's checkout title currently reads *"UPI,
      Cards, NetBanking"*, so if UPI is not live-enabled that title is advertising
      something customers cannot use.

- [ ] **Add a SECOND webhook for live mode.** Test and live webhooks are separate
      objects in Razorpay — this is the easy one to forget. The plugin should
      auto-create it when live keys are saved; **confirm it appeared** with Live
      mode selected rather than assuming, and re-check the events list.

- [ ] **Place one small real order**, confirm it lands correctly, then refund it.
      Test-mode success doesn't prove live works: different keys, different
      webhook, different environment.

- [ ] **Soften the cancelled-payment message.** Closing the Razorpay modal logs an
      empty payment id and shows the customer *"An error occured. Please contact
      administrator for assistance"* — alarming, and misspelt, for someone who
      simply changed their mind.

Known and accepted: the Razorpay merchant is *Clamique Personal Care Private
Limited*, so that name may appear on customer statements rather than Furrytail.

Benign noise, do not chase: the `runOneCCAddressSync` / `isMerchantEligible` 401
and 502 errors in the plugin log are Magic Checkout eligibility probes. Every
order logs `is1ccCheckout is set to no`, so this is an unused feature failing to
check whether it could be used.

---

## 2. Store configuration · Kshitij · HIGH

- [ ] **Shipping zones.** **DEFERRED BY KSHITIJ — do this last (2026-08-29).**
      Orders currently charge **₹0 delivery**, so courier cost is absorbed on
      every sale. WooCommerce → Settings → Shipping → India zone with a flat rate
      or free-above-threshold. Still the only item that costs money on every order
      while unset — deferred deliberately, not overlooked.

- [ ] **WordPress timezone is UTC, not IST.** Order #137 was recorded at 13:45
      while Razorpay logged the payment attempt at 19:18 IST — a 5h30m offset.
      Every order timestamp, order email and invoice date is 5.5 hours behind real
      time, and orders placed after 18:30 IST are dated the previous day.
      Settings → General → Timezone → **Kolkata** (choose the city, not a UTC
      offset, so the value stays correct).

- [ ] **Confirm current prices are intentional.** Live: shampoos ₹669, Refreshing
      Mist ₹459, Dry Foam ₹429, Anti-Tick ₹399, Paw Cleaner ₹519. Ansh's product
      master specifies ₹695 / ₹545 / ₹595 / ₹595 / ₹495 — every one differs, and
      orders are being taken at the live figures.

- [ ] **Fix fragrance capitalisation.** The third shampoo reads *"violet leaf &
      muslin"* — lowercase, next to "Fig & Neroli" and "Santal & White Tea".
      Products → Attributes → Fragrance → Configure terms. Note: Ansh changed this
      in `home.ts`, which no longer supplies product data — the fix has to be made
      in wp-admin.

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
- [ ] Configure: attach to **Completed order** (invoice arrives with the goods),
      number format `FT-[[year]]-0001`, reset yearly
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
- [ ] **Legal policies**: return/refund, shipping, privacy, T&Cs, contact details.
      Required by Indian e-commerce rules. Razorpay has already verified the site,
      so these no longer block activation — but they are still legally required,
      and Razorpay re-reviews merchants and can hold settlements over them.
- [ ] Final prices (see §2), real SKU/barcode values
- [ ] Refreshing Mist volume — 100 ml or 120 ml (product master flags the conflict)
- [ ] Per-fragrance shampoo photography — check all three now differ
- [ ] Who works the order queue daily, and who reads orders@furrytailjoy.com
- [ ] Who reads **furrytail.joy@gmail.com** — Razorpay sends webhook delivery
      failure alerts there, not to orders@

---

## 6. Frontend · Ansh — handed over

- [ ] **`src/app/page.tsx` still carries a BOM and mojibake in its comments**
      (`â€"` for `—`). Ansh has reformatted the file, so it is readable again
      (1358 lines), but the encoding damage in comments remains. Cosmetic — no
      mojibake reaches the rendered page.

---

## 7. Deferred technical debt

Not blocking, but real.

- [ ] **28 `static.kite.ai` references** in `src/data/home.ts` — editorial and
      ingredient imagery served from the site-builder's CDN, on an account we
      don't control. Product images are already migrated; these aren't. (Was 48;
      20 went with the dead product arrays.)

- [ ] **Unoptimised assets** in `public/`. Product images compressed 97%
      (8.18 MB → 0.23 MB) as WebP; Ansh has since compressed the hero videos. The
      remaining editorial JPEGs are untouched.

- [ ] Consider per-fragrance ingredient copy on the shampoos — all three currently
      list every fragrance's botanicals together.

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
---

# PART TWO — DONE

Kept for the evidence, not the tick. Each of these was verified, not assumed.

---

## Live and working

furrytailjoy.com serves the Next.js frontend, the catalogue reads from
WooCommerce, orders complete end to end, order emails deliver via authenticated
SMTP, the contact form relays through Brevo, cache exclusions are verified, and
Razorpay works in test mode. COD is currently disabled.

---

## Razorpay — test mode proven end to end

- [x] **Node persistence test** — passed, survived overnight.

- [x] **Razorpay account is live-activated and the website is verified.** The
      dashboard reports *"Your website https://furrytailjoy.com is verified and
      ready to accept payments."* KYC is complete. This was the risk that could
      have blocked go-live behind the missing policy pages; it did not.

- [x] **Test order records its payment ID.** Confirmed in the plugin log —
      `updateOrder orderId: 113 , razorpayPaymentId: pay_TVEHZDmKRfJfA2 ,
      success: 1`. The transaction is attached to the order, so refunds and
      reconciliation will work.

- [x] **Webhook configured (test mode) — and proven to fire.** The plugin
      auto-created it when the API keys were saved; there is no webhook field in
      the plugin settings on this version, which is expected and not a fault.

          URL     store.furrytailjoy.com/wp-admin/admin-post.php?action=rzp_wc_webhook
          Events  payment.authorized, refund.created
          Alerts  furrytail.joy@gmail.com   <- read this inbox, failures go there

      Proof, from `razorpay-logs-2026-08-28.log` (times UTC):

          14:52:38  webhook process intitiated for event: payment.authorized
          14:52:38  webhook event saved for order:113
          14:52:49  Called check_razorpay_response ...      <- browser, 11s LATER

      **The webhook beat the browser callback by 11 seconds.** Razorpay reached
      the site, the signature verified, and the event was saved before the
      redirect completed — which is exactly the failure mode it exists to cover.

      Verified separately that the URL survives `ft-store-scope.php` (200, not a
      301 — line 40 carries an explicit `is_admin()` / `wp_doing_cron()`
      exemption), and that a handler is bound to the action: a forged POST returns
      an empty 200 while an unknown action returns 400.

- [x] **Payment Action is "Authorize and Capture".** Confirmed correct for retail
      — money is captured in one step. Left on "Authorize" only, payments would
      need manual capture within 5 days or they auto-refund.

**Diagnostic worth remembering:** an abandoned payment shows `Created` at Razorpay
(not `Captured`) and `Pending payment` in WooCommerce. That pairing is normal and
needs no action. The pairing that means trouble is `Captured` at Razorpay
alongside `Pending payment` in WooCommerce — which is what the webhook prevents.

---

## Load-bearing — do not break

### `ProductClient.tsx`

Three rewrites of this file have each dropped something. Not obvious from the
JSX, so worth stating:

- **the gallery block** reads `product.gallery` — the WooCommerce image gallery.
  Removing it brings back the fake "Placeholder / In use / Texture" tiles.
- **the ingredients section** renders `product.description` — that is where the
  ingredients / how-to-use / safety copy lives, authored in wp-admin.
- **`variantId`** must reach the cart if a variable product ever returns.
  `ft-checkout.php` refuses a variable product without a variation, so the item is
  silently dropped at checkout. This took the flagship product offline once.

### `src/data/home.ts`

No longer supplies product data — only editorial content (hero copy, brand story,
ingredient chapters). Anything keyed off a product **name** or a hardcoded
**price** will drift the moment the catalogue is edited in wp-admin. Slugs and
attribute term slugs are the stable identifiers.

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
