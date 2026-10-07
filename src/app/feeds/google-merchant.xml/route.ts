// Google Merchant Center product feed: /feeds/google-merchant.xml
//
// Add this URL in Merchant Center (Products > Add products > "Add product
// source" > "Add products from a file" > "Enter a link to your file", schedule
// daily). It is built from the live WooCommerce catalogue on each fetch (cached
// for an hour), so prices and stock never need exporting by hand.
//
// Values must match what the product page shows - Google disapproves items
// whose feed price or availability differs from the landing page.
//
// Shipping and returns are configured once in Merchant Center (Settings >
// Shipping and returns) rather than per item here.

import { fetchProducts } from '@/lib/woo';
import { parsePrice } from '@/lib/price';
import { getBaseUrl } from '@/lib/site-url';
import { GOOGLE_PRODUCT_CATEGORY, ORG_NAME, plainProductText, speciesLabel } from '@/lib/seo';
import type { WooProduct } from '@/services/types';

export const revalidate = 3600;

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

const tag = (name: string, value: string | number | undefined | null) =>
  value === undefined || value === null || value === '' ? '' : `      <g:${name}>${esc(String(value))}</g:${name}>\n`;

/** "Furrytail Paw Cleaner – Natural Dog Grooming, 150 ml" (Google caps titles at 150). */
function feedTitle(p: WooProduct) {
  const kind = p.productType === 'Shampoo' || /shampoo/i.test(p.name) ? 'Shampoo' : 'Grooming';
  const t = `${ORG_NAME} ${p.name} – Natural ${speciesLabel(p)} ${kind}${p.volume ? `, ${p.volume}` : ''}`;
  return t.slice(0, 150);
}

function item(p: WooProduct, base: string) {
  const link = `${base}/products/${p.id}`;
  const images = [...new Set((p.gallery?.length ? p.gallery : [p.image]).map((i) => i.src))];
  const price = parsePrice(p.price);
  const id = p.sku || p.id;

  return (
    '    <item>\n' +
    tag('id', id) +
    tag('title', feedTitle(p)) +
    tag('description', plainProductText(p).slice(0, 5000)) +
    tag('link', link) +
    tag('image_link', images[0]) +
    images.slice(1, 11).map((src) => tag('additional_image_link', src)).join('') +
    tag('availability', p.inStock === false ? 'out_of_stock' : 'in_stock') +
    tag('price', `${price.toFixed(2)} INR`) +
    tag('brand', ORG_NAME) +
    tag('condition', 'new') +
    tag('google_product_category', GOOGLE_PRODUCT_CATEGORY) +
    tag('product_type', `Pet Grooming > ${p.category || 'Grooming'}`) +
    // No GTIN/barcodes registered yet. If the products get GS1 barcodes, add
    // g:gtin and drop this - items with GTINs get noticeably more impressions.
    tag('identifier_exists', 'no') +
    tag('mpn', id) +
    tag('unit_pricing_measure', p.volume?.replace(/\s+/g, '')) +
    // Segments for Google Ads campaigns (bid by pet or product line).
    tag('custom_label_0', speciesLabel(p)) +
    tag('custom_label_1', p.category) +
    tag('custom_label_2', p.productType) +
    '    </item>\n'
  );
}

export async function GET() {
  const base = getBaseUrl();
  const products = await fetchProducts();
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">\n' +
    '  <channel>\n' +
    `    <title>${esc(ORG_NAME)} – natural dog &amp; cat grooming</title>\n` +
    `    <link>${esc(base)}</link>\n` +
    '    <description>Furrytail product feed for Google Merchant Center</description>\n' +
    products.filter((p) => parsePrice(p.price) > 0).map((p) => item(p, base)).join('') +
    '  </channel>\n' +
    '</rss>\n';

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
