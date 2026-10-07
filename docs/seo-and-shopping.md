# SEO, AI search and Google Shopping

What the site does for search, and the account steps that have to be done by
hand in Google's dashboards.

## What is in the code

| Piece | Where | What it does |
|---|---|---|
| Brand + website entity | `lib/seo.ts` → root layout | Organization/OnlineStore + WebSite JSON-LD on every page, one spelling ("Furrytail") |
| Page metadata | each `page.tsx` | Keyword title, ≤160-char description, own canonical, Open Graph image |
| One H1 per page | homepage, shop, products, landing pages, FAQ | H1 carries the search phrase ("Natural grooming for dogs & cats") without changing the look |
| Product structured data | `app/products/[id]/page.tsx` | Product (all images, price, stock, condition, category) + BreadcrumbList |
| Keyword landing pages | `/dog-grooming`, `/cat-grooming` (`data/landing.ts`) | Products per pet, routine guide linking every product, FAQ, journal links |
| FAQ | `data/faq.ts` → `/faq` | FAQPage JSON-LD + "Related" links to products and journal |
| Internal links | footer, shop intro, FAQ, landing pages | Real URLs with keywords on every page |
| Sitemap | `app/sitemap.ts` | All pages, journal, products with their gallery images |
| Merchant feed | `/feeds/google-merchant.xml` | Live product feed for Google Shopping, built from WooCommerce |
| AI brief | `/llms.txt` | Plain-Markdown summary of products, facts and FAQ for AI answer engines |
| AI crawlers | `app/robots.ts` | GPTBot, ClaudeBot, PerplexityBot, Google-Extended etc. explicitly allowed |

Rule for all of it: structured data and feeds only state what the page shows.
No ratings or review counts until real reviews exist on the page.

## One-time setup (by hand)

### 1. Google Search Console
1. search.google.com/search-console → Add property → **Domain** `furrytailjoy.com`
   (verify with the DNS TXT record in Hostinger DNS), or **URL prefix** with the
   HTML-tag method: put the `content="..."` value in hPanel env var
   `NEXT_PUBLIC_GSC_VERIFICATION` and redeploy (build-time variable).
2. Sitemaps → submit `https://furrytailjoy.com/sitemap.xml`.
3. URL inspection → Request indexing for `/`, `/shop`, `/dog-grooming`,
   `/cat-grooming`, `/faq` and each product page.

### 2. Google Merchant Center (Shopping ads + free listings)
1. merchants.google.com → create account, country **India**, currency **INR**.
2. Verify and claim `furrytailjoy.com` (link Search Console, or the same HTML tag).
3. **Products → Add product source → From a file → Enter a link**:
   `https://furrytailjoy.com/feeds/google-merchant.xml`, fetch **daily**.
4. **Settings → Shipping and returns**: add a shipping service for India
   (delivery 1–2 days handling + 3–5 days transit, your shipping rate / free
   threshold) and a **return policy with a number of days**. Merchant Center
   will not approve products without a return window - publish the same window
   on the Shipping & Returns page (it currently says "to be confirmed").
5. Turn on **Free listings** (Growth → Manage programs).
6. Link Merchant Center to Google Ads (Settings → Linked accounts), then create
   a **Performance Max** or **Shopping** campaign. The feed's custom labels let
   you split bids: `custom_label_0` = pet (Dog / Cat / Dog & Cat),
   `custom_label_1` = product line, `custom_label_2` = product type.

### 3. Barcodes (optional, recommended)
The feed sends `identifier_exists = no` because the products have no GTINs.
If you register GS1 barcodes, add them to WooCommerce and to the feed as
`g:gtin` - items with GTINs get more Shopping impressions.

### 4. Bing Webmaster Tools
bing.com/webmasters → import from Search Console. Feeds ChatGPT search and
Copilot, which use Bing's index.

## Content that still needs fixing in WooCommerce
- Product descriptions say "Furry Tail" - change to "Furrytail" so the brand
  is one entity everywhere.
- Violet Leaf & Muslin and Anti-Tick & Flea Spray have 5 gallery photos;
  8+ helps both the product page and Shopping (`additional_image_link`).

## Keeping it working
- New product in WooCommerce → appears in the shop, sitemap, feed and
  `llms.txt` automatically (within an hour). Set its species (`pa_pet`) so it
  lands on the right landing page.
- New journal article → add it to `lib/journal.ts`; it joins the sitemap,
  journal JSON-LD and `llms.txt`.
- Changing a fact (price, ingredient, which pets) → change it at the source;
  every page, feed and the AI brief read from the same data.
