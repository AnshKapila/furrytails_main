# WooCommerce Data Entry Reference

Reconciled from **Ansh's `FurryTail_WooCommerce_Product_Master_Updated.pdf`**
(authoritative for content) and **`src/data/home.ts`** (authoritative for what
the frontend code actually matches on).

Where they disagree, it's flagged in §0.

## Decisions — settled

| # | Decision |
|---|---|
| C1 | **Use `Daily Ritual`.** Ansh can rename to `Ritual` later — one line in `home.ts`. |
| C2 | **Dry Foam Shampoo → Remedy**, per the PDF. |
| C3 | **Refreshing Mist → 100 ml** per the PDF. Still pending a physical-pack check. |
| C4 | **Gentle Daily Shampoo stays ONE variable product.** Do not split it. |
| Prices | **Use the PDF prices as-is.** Owner may revise before launch. |
| SKUs | **Use `SKU-01`…`SKU-07`.** Owner will supply real values later. |

Only C3 is still genuinely open, and it doesn't block you — Volume is a
two-click change if the pack turns out to say 120 ml.

§0 below is retained as the reasoning behind these calls.

---

## 0. Conflicts to resolve first

### ⚠️ C1 — Category name: "Ritual" or "Daily Ritual"?

| Source | Value |
|---|---|
| PDF | `Ritual · Defense · Remedy · Refresh` |
| `src/data/home.ts` (shipping code) | `'Daily Ritual', 'Defense', 'Remedy', 'Refresh'` |

The frontend filters by **exact category name**. If WooCommerce says `Ritual`
and the code filters on `Daily Ritual`, that filter chip returns **zero products**
— no error, nothing in the console.

**Use `Daily Ritual`** for now — it matches the code that actually ships. If Ansh
prefers `Ritual`, it's a one-line change in `home.ts` and he should make it
*before* you enter products.

### ⚠️ C2 — Dry Foam Shampoo category — PDF wins

| Source | Value |
|---|---|
| PDF | **Remedy** (explicitly called out as a correction) |
| `home.ts` | Refresh |

The PDF states: *"Dry Foam Shampoo is classified under Remedy, not Refresh."*
That's a deliberate content decision, and it doesn't break anything in the code —
`Remedy` is already a valid filter value.

**Use Remedy.** Refresh then contains only Refreshing Mist.

### ⚠️ C3 — Refreshing Mist volume: 100 ml or 120 ml?

The PDF flags this itself and refuses to guess: prototype says 100 ml, an earlier
database said 120 ml. **Confirm against the physical pack** — this one needs the
client, not us. The doc below uses 100 ml per the PDF.

### ⚠️ C4 — Do NOT split the shampoo into 3 simple products

I suggested that earlier as a time-saver. **The PDF explicitly forbids it:**

> *"Gentle Daily Shampoo must remain one parent product… Do not create three
> unrelated product families."*

Disregard my earlier shortcut. If time pressure makes it tempting, it needs
Ansh's agreement first — it's his architectural call and it affects the product
page design.

---

## 1. Product categories

**Products → Categories.** Four, not nested:

| Name | Slug |
|---|---|
| `Daily Ritual` | `daily-ritual` |
| `Defense` | `defense` |
| `Remedy` | `remedy` |
| `Refresh` | `refresh` |

---

## 2. Global attributes

### Read this first — the structure

There are **exactly 4 attributes**. Each one holds several **terms**. Do not
create an attribute per term.

```
Pet        (pa_pet)          → Dogs & Cats | Dogs only | Cats only
Type       (pa_producttype)  → Shampoo | Spray | Cleaner | Mist
Volume     (pa_volume)       → 300 ml | 150 ml | 100 ml
Fragrance  (pa_fragrance)    → 7 fragrance names

⚠️ `Type` must use the slug **`producttype`**, not `type` — WordPress reserves
`type` as a query variable and WooCommerce rejects it. Leaving the slug blank
does not help; it auto-generates `type` and fails the same way.
```

**Two-step process per attribute, and the second step is easy to miss:**

1. **Products → Attributes** — enter the attribute Name (`Pet`), leave the slug
   field **blank** so WooCommerce generates `pa_pet`. Leave "Enable archives"
   unchecked. Click Add.
2. In the attributes table, click the small **"Configure terms"** link on that
   attribute's row. *This* is where you add Dogs & Cats, Dogs only, Cats only.

Only the **Pet** terms need manual slugs. Everything else can auto-generate.

### Pet → `pa_pet`

⚠️ **Slug matters here. WordPress auto-generates the wrong one for term 3.**

| Term name | Slug — must be exactly this |
|---|---|
| Dogs & Cats | `both` ← WP suggests `dogs-cats`. Override it. |
| Dogs only | `dog` ← WP suggests `dogs-only`. Override it. |
| Cats only | `cat` |

The code reads this by **slug**, not name. Get these wrong and products vanish
from the pet filter silently.

### Type → `pa_producttype`

Attribute Name: `Type` · Attribute Slug: **`producttype`** (see warning above).

Term names must be exact — the code matches on name.

`Shampoo` · `Spray` · `Cleaner` · `Mist`

### Volume → `pa_volume`

`300 ml` · `150 ml` · `100 ml`

Lowercase `ml`, one space. (No 120 ml unless C3 resolves that way.)

### Fragrance → `pa_fragrance`

`Santal & White Tea` · `Fig & Neroli` · `Hinoki & Bamboo` ·
`Vetiver & Cypress` · `Spearmint & Sea Salt` · `Mimosa & Tonka` ·
`Yuzu & White Musk`

Use `&`, not "and".

---

## 3. Where the long-form content goes

The PDF supplies **Key ingredients**, **How to use**, and **Safety / suitability**
for every SKU. The frontend has no fields for these today.

**Put them in the product's main Description field as HTML.** The Store API
returns `description`, so Ansh can render it without any new Woo fields. Custom
fields would be invisible to the API — don't use them for this.

Suggested structure, same for every product:

```html
<h3>Key ingredients</h3>
<p>Santalum Album · Camellia Sinensis</p>

<h3>How to use</h3>
<p>Wet coat; apply a small amount; lather neck to tail; leave 1–2 min; rinse;
towel dry or low-heat dry. Weekly or bi-weekly.</p>

<h3>Safety</h3>
<p>Avoid eyes and mouth. Suitable over 12 weeks. Consult a vet for younger
animals or known skin sensitivities.</p>
```

The **Short description** field takes the one-line product description.

---

## 4. The products

### SKU-01/02/03 — Gentle Daily Shampoo — VARIABLE product

One parent product, three Fragrance variations. Per-variation SKU, price and image.

| Field | Value |
|---|---|
| Slug | `gentle-daily-shampoo` |
| Category | Daily Ritual |
| Type | Shampoo |
| Pet | Dogs & Cats |
| Volume | 300 ml |
| Price | 695 (all three variations) |

| Variation | SKU | Short description | Key ingredients |
|---|---|---|---|
| Santal & White Tea | SKU-01 | Warm sandalwood and quiet white tea; the grounding bath-day option. | Santalum Album · Camellia Sinensis |
| Fig & Neroli | SKU-02 | Sun-warmed fig with bright neroli; the more expressive Ritual option. | Ficus Carica · Citrus Aurantium |
| Hinoki & Bamboo | SKU-03 | Cool Japanese cypress and clean bamboo; quiet, mineral and spa-like. | Chamaecyparis Obtusa · Bambusa Vulgaris |

**How to use** (all three): Wet coat; apply a small amount; lather neck to tail;
leave 1–2 min; rinse; towel dry or low-heat dry. Weekly or bi-weekly.

**Safety** (all three): Avoid eyes and mouth. Suitable over 12 weeks. Consult a
vet for younger animals or known skin sensitivities.

### SKU-04 — Anti-Tick & Flea Spray — simple

| Field | Value |
|---|---|
| Slug | `anti-tick-flea-spray` |
| Category | Defense · Type Spray · Pet Dogs only · Volume 100 ml |
| Fragrance | Vetiver & Cypress |
| Price | 595 |

Short: Vetiver root and cypress resin; designed for pre-walk protection.
Ingredients: Vetiveria Zizanoides · Cupressus Sempervirens
How to use: Shake well. Spray evenly from 15–20 cm, focusing on legs, belly and
neck. Let dry completely. Use before walks in tick/flea-active environments.
Safety: **Not suitable for cats.** Avoid eyes, nose and mouth. Patch-test
sensitive dogs. For established infestations, consult a vet.

> Not a pesticide. Plant-derived actives: vetiver root oil, cypress oil,
> citronella, neem. Avoid any claim that implies pesticidal efficacy.

### SKU-05 — Paw Cleaner — simple

| Field | Value |
|---|---|
| Slug | `paw-cleaner` |
| Category | Remedy · Type Cleaner · Pet Dogs only · Volume 150 ml |
| Fragrance | Spearmint & Sea Salt |
| Price | 495 |

Short: Cool spearmint and clean sea salt for the post-walk ritual.
Ingredients: Mentha Spicata · Maris Sal
How to use: Pump onto each paw or a damp cloth. Massage pads and between toes.
Wipe with a clean damp cloth. No rinsing. Use after every walk.
Safety: **Not suitable for cats** (spearmint menthol/carvone compounds).

### SKU-06 — Dry Foam Shampoo — simple

| Field | Value |
|---|---|
| Slug | `dry-foam-shampoo` |
| Category | **Remedy** (see C2) · Type Shampoo · Pet Dogs only · Volume 150 ml |
| Fragrance | Mimosa & Tonka |
| Price | 595 |

Short: Powdery mimosa and warm tonka for between-bath freshening.
Ingredients: Acacia Dealbata · Dipteryx Odorata
How to use: Shake. Hold 20 cm from coat and spray evenly. Work through with hands
or soft brush. Focus on odour-prone areas. Allow to dry. No rinsing.
Safety: Formulated for dogs; **not suitable for cats.**

### SKU-07 — Refreshing Mist — simple

| Field | Value |
|---|---|
| Slug | `refreshing-mist` |
| Category | Refresh · Type Mist · Pet Dogs only · Volume **100 ml** (see C3) |
| Fragrance | Yuzu & White Musk |
| Price | 545 |

Short: Japanese yuzu and white musk for a light coat refresh.
Ingredients: Citrus Junos · White Musk Accord
How to use: Hold 25 cm from coat. Apply 3–5 sprays over back and flanks. Allow to
settle and dry naturally. Use after Dry Foam or alone; can be used daily.
Safety: Formulated for dogs; **not suitable for cats.**

---

## 5. Per-product checklist

- [ ] **Slug** exactly as above (check the permalink under the title)
- [ ] Price in **Regular price**, numbers only — `695`, not `₹695`
- [ ] All four attributes assigned, **"Visible on the product page"** ticked
- [ ] **Featured image** set — no image means the frontend drops the product
- [ ] **Manage stock** on, quantity set
- [ ] **Published**, not draft — drafts are invisible to the Store API
- [ ] Short description + long description filled

Leave **Sale price** empty unless genuinely discounted — it triggers a
strikethrough on the frontend.

---

## 6. Still outstanding before launch

From the PDF's own QA notes — all yours:

- **Real SKUs.** `SKU-01`…`SKU-07` are placeholders. Replace with the client's
  actual SKU/barcode values.
- **Prices are prototype values.** Confirm final MRP, launch discounts and tax
  treatment with the client before publishing.
- **HSN codes and GST rate** per product — needed for compliant Indian invoicing.
- Weight and dimensions — shipping rates depend on them.
- Shipping class, low-stock threshold, tax status.
- **C3:** confirm Refreshing Mist volume against the physical pack.

Three of these need the client, not you. Worth asking today rather than on
launch day.

---

## 7. Verify when done

```
https://store.furrytailjoy.com/wp-json/wc/store/v1/products
```

All 5 parent products should appear (7 purchasable SKUs, since the shampoo has 3
variations). On any product confirm: `prices.currency_code` is `INR`,
`images[0].src` is present, and `attributes` includes `pa_pet`, `pa_type`,
`pa_volume` — with `pa_pet` term slugs reading `dog` / `cat` / `both`.
