// /llms.txt - a plain-Markdown brief of the site for AI answer engines
// (ChatGPT, Perplexity, Claude, Gemini / AI Overviews). See llmstxt.org.
//
// Generated from the same sources as the pages - live WooCommerce products,
// data/faq.ts and the journal registry - so it can never drift from what the
// site says. Facts only; no claims that are not on the product pages.

import { fetchProducts } from '@/lib/woo';
import { getBaseUrl } from '@/lib/site-url';
import { FAQS } from '@/data/faq';
import { JOURNAL_ARTICLES, articlePath } from '@/lib/journal';
import { DOG_LANDING, CAT_LANDING } from '@/data/landing';
import { DEFAULT_DESCRIPTION, INSTAGRAM_URL, ORG_NAME, plainProductText, speciesPlural } from '@/lib/seo';

export const revalidate = 3600;

export async function GET() {
  const base = getBaseUrl();
  const products = await fetchProducts().catch(() => []);

  const productLines = products.map((p) => {
    const summary = plainProductText({ ...p, description: '' }).slice(0, 220).replace(/\s+\S*$/, '');
    return `- [${p.name}](${base}/products/${p.id}): ${p.price}${p.volume ? `, ${p.volume}` : ''}. For ${speciesPlural(p)}. ${summary}…`;
  });

  const md = `# ${ORG_NAME}

> ${DEFAULT_DESCRIPTION}

${ORG_NAME} (also written "Furry Tail") is an Indian natural pet care brand making grooming products for dogs and cats, sold at ${base}. Formulated and made in India.

## Key facts

- Every formula has a 99.5% Natural Origin Index, calculated per ISO 16128-2 (a calculation standard, not a certification).
- Preserved with a probiotic ferment (Leuconostoc/Radish Root Ferment Filtrate) instead of parabens, MIT, MCIT or phenoxyethanol.
- Sulphate-free: cleansed with coconut- and sugar-derived surfactants.
- Fragrances are IFRA-compliant (within International Fragrance Association limits).
- Vet reviewed. No paid vet endorsements.
- Safe for cats: the Gentle Daily Shampoo (all three fragrances) and the Dry Foam Shampoo. Dogs only: Anti-Tick & Flea Spray, Paw Cleaner, Refreshing Mist.
- Ships across India; cash on delivery available on most pincodes.
- Contact: hello@furrytailjoy.com · Instagram: ${INSTAGRAM_URL}

## Products

${productLines.join('\n')}

## Guides by pet

- [${DOG_LANDING.heading.replace(/\.$/, '')}](${base}${DOG_LANDING.path}): ${DOG_LANDING.description}
- [${CAT_LANDING.heading.replace(/\.$/, '')}](${base}${CAT_LANDING.path}): ${CAT_LANDING.description}
- [All products](${base}/shop)
- [Ingredients, explained](${base}/ingredients)

## Journal

${JOURNAL_ARTICLES.map((a) => `- [${a.title.replace(/\.$/, '')}](${base}${articlePath(a.slug)}): ${a.description}`).join('\n')}

## FAQ

${FAQS.map((f) => `### ${f.question}\n\n${f.answer}`).join('\n\n')}

## Policies

- [Shipping & Returns](${base}/shipping)
- [FAQ](${base}/faq)
- [Privacy Policy](${base}/privacy-policy)
- [Terms of Use](${base}/terms-of-use)
`;

  return new Response(md, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
