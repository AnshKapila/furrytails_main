# Furrytail — Pending Tasks

Canonical list of what's left. Updated 2026-08-20.

**Live and working:** furrytailjoy.com serves the Next.js frontend, catalogue
reads from WooCommerce, COD orders complete end to end, order emails deliver via
authenticated SMTP, cache exclusions verified, Razorpay works in test mode.

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

- [ ] **Confirm ₹669 vs ₹695.** Shampoo variations are selling at ₹669; the
      product master specifies ₹695. Live orders have already been placed at 669.

- [ ] **Fix fragrance capitalisation.** The third shampoo variant reads
      *"violet leaf & muslin"* — lowercase, next to "Fig & Neroli" and "Santal &
      White Tea" on product cards. Products → Attributes → Fragrance → Configure
      terms. Also confirm it deliberately replaced *Hinoki & Bamboo*.

- [ ] **Plugin audit.** A "Point of Sale" tab appears in WooCommerce settings, so
      a POS plugin is installed. Remove it and anything else unused — every plugin
      is update risk and attack surface. Target set: WooCommerce, Razorpay,
      LiteSpeed Cache, WP Mail SMTP, PDF invoices. Nothing else.

- [ ] **Real stock quantities** per SKU (currently placeholder numbers).

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

- [ ] **Node persistence test.** Still not run — needs one uninterrupted 8–12 hour
      window with nobody touching furrytailjoy.com. Then load it:
      - instant → process stayed alive
      - 10–30s then loads → cold start (workable; monitoring keeps it warm)
      - error → it died and doesn't self-restart

      Do this **before** setting up UptimeRobot — monitoring pings keep the
      process warm and invalidate the test.

- [ ] **UptimeRobot** on furrytailjoy.com (5-minute interval), after the test.

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
- [ ] Final prices, real SKU/barcode values
- [ ] Refreshing Mist volume — 100 ml or 120 ml (product master flags the conflict)
- [ ] Per-fragrance shampoo photography — only 2 distinct images exist for 3
      fragrances, so two currently show the same picture
- [ ] Who works the order queue daily, and who reads orders@furrytailjoy.com

---

## 6. Frontend · Ansh

- [ ] **Merge `feat/woo-integration` before writing any new code.** It
      restructured files he's actively in: `shop/page.tsx` split into `page.tsx`
      (server) + `ShopClient.tsx`, and `products/[id]` into `page.tsx` +
      `ProductClient.tsx`.

- [ ] **2.5D/3D homepage effects** — client-requested, not started, and the most
      visible gap. Approach in `docs/build-brief.md` §3.8: layered parallax on the
      existing transparent PNGs, cursor tilt, sticky depth reveals. CSS transforms
      rather than Three.js; disable on mobile; respect `prefers-reduced-motion`.

- [ ] **Hero video double-load.** `src/app/page.tsx` has two `<video>` elements
      toggled with `block md:hidden` / `hidden md:block`. `display:none` doesn't
      reliably prevent the fetch, so mobile may download both (801KB + 1.56MB).
      Fix with one `<video>` and `<source media="...">`. Add a `poster` too — the
      hero is blank until the video starts.

- [ ] His profile/orders components were removed deliberately: a hardcoded "no
      past orders" view would have told paying customers they had none. Wishlist
      was kept. Worth him reviewing rather than discovering.

---

## 7. Deferred technical debt

Not blocking, but real.

- [ ] **48 `static.kite.ai` references** in `src/data/home.ts` — editorial and
      ingredient imagery served from the site-builder's CDN, on an account we
      don't control. Product images are already migrated; these aren't.

- [ ] **~25 MB of unoptimised assets** in `public/`. Product images compressed 97%
      (8.18 MB → 0.23 MB) as WebP; the rest are untouched. A 5–8 MB homepage costs
      conversions.

- [ ] Product pages now render ingredients / how-to-use / safety from the
      WooCommerce Description field. Consider whether the shampoo needs
      per-variant ingredient text rather than all three fragrances listed together.

- [ ] Refresh `src/data/products.snapshot.json` occasionally — it's the build-time
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
| `wordpress/mu-plugins/ft-checkout.php` | cart handoff endpoint |
