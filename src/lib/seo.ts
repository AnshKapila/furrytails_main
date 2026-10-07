// Site-wide SEO facts in one place: the brand entity search engines and AI
// answer engines learn from, the default homepage copy, and the keyword
// themes each page is written around.
//
// Every claim here must already be true elsewhere on the site (product labels,
// TrustMarkersData, Shipping & Returns). Structured data that contradicts the
// visible page is a Google spam-policy violation, so nothing is invented here:
// no ratings, no review counts, no return window until one is published.

import { getBaseUrl } from '@/lib/site-url';
import { LOGO_URL } from '@/data/home';

export const ORG_NAME = 'Furrytail';
export const ORG_ALTERNATE_NAMES = ['Furry Tail', 'Furrytail Joy'];
export const INSTAGRAM_URL = 'https://www.instagram.com/furrytailjoy/';
export const WHATSAPP_NUMBER = '+91-8796786531';

export const DEFAULT_TITLE = 'Furrytail — Natural Dog & Cat Grooming Products | Natural Pet Care';
export const DEFAULT_DESCRIPTION =
  'Natural pet care for dogs and cats: sulphate-free, paraben-free dog & cat shampoo, ' +
  'dry foam shampoo, paw cleaner, natural tick & flea spray and coat mist. 99.5% natural ' +
  'origin, probiotic-preserved, vet reviewed. Shipped across India.';

/** Homepage meta description - kept under ~155 characters so Google shows all of it. */
export const HOME_META_DESCRIPTION =
  'Natural dog & cat grooming: sulphate-free shampoo, dry foam shampoo, paw cleaner & plant-based tick spray. 99.5% natural origin, probiotic-preserved.';

/** Topics the site is written to rank for. Used for meta keywords and llms.txt. */
export const KEYWORD_THEMES = [
  'natural pet care',
  'natural dog shampoo',
  'natural cat shampoo',
  'dog grooming products',
  'cat grooming products',
  'sulphate-free dog shampoo',
  'paraben-free pet shampoo',
  'probiotic pet shampoo',
  'dry shampoo for dogs and cats',
  'waterless dog shampoo',
  'dog paw cleaner',
  'natural tick and flea spray for dogs',
  'dog coat spray',
  'gentle shampoo for puppies and sensitive skin',
  'pet grooming products India',
];

export const orgId = () => `${getBaseUrl()}/#organization`;
export const websiteId = () => `${getBaseUrl()}/#website`;

/** Organization + WebSite, emitted once in the root layout as one @graph. */
export function siteJsonLd() {
  const base = getBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'OnlineStore'],
        '@id': orgId(),
        name: ORG_NAME,
        alternateName: ORG_ALTERNATE_NAMES,
        url: base,
        logo: { '@type': 'ImageObject', url: LOGO_URL },
        image: LOGO_URL,
        description: DEFAULT_DESCRIPTION + ' Formulated and made in India.',
        email: 'hello@furrytailjoy.com',
        slogan: 'Your standard. Now for your pet.',
        areaServed: { '@type': 'Country', name: 'India' },
        knowsAbout: [
          'Natural pet grooming',
          'Dog grooming',
          'Cat grooming',
          'Pet shampoo formulation',
          'Probiotic preservation',
          'Natural tick and flea prevention',
        ],
        sameAs: [INSTAGRAM_URL],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          telephone: WHATSAPP_NUMBER,
          email: 'hello@furrytailjoy.com',
          areaServed: 'IN',
          availableLanguage: ['English'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': websiteId(),
        url: base,
        name: ORG_NAME,
        description: DEFAULT_DESCRIPTION,
        inLanguage: 'en-IN',
        publisher: { '@id': orgId() },
      },
    ],
  };
}

/** BreadcrumbList from [name, path] pairs, path relative to the site root. */
export function breadcrumbJsonLd(items: [string, string][]) {
  const base = getBaseUrl();
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: `${base}${path}`,
    })),
  };
}

/** Serialise JSON-LD safely for a <script> tag (no "</script>" breakout). */
export function jsonLdString(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export const OG_IMAGE = { url: '/og-default.jpg', width: 1200, height: 630, alt: 'Furrytail natural dog and cat grooming range' };

/**
 * Open Graph for a page. Next.js replaces (does not merge) a parent's
 * openGraph when a page sets its own, so every page goes through this to keep
 * siteName, locale and a share image.
 */
export function pageOpenGraph(og: { url: string; title: string; description: string; type?: 'website' | 'article'; images?: { url: string; alt?: string; width?: number; height?: number }[] }) {
  return {
    type: og.type ?? 'website',
    siteName: ORG_NAME,
    locale: 'en_IN',
    url: og.url,
    title: og.title,
    description: og.description,
    images: og.images?.length ? og.images : [OG_IMAGE],
  } as const;
}

// ─── Product copy helpers ────────────────────────────────────────────────────

/** Google product taxonomy path for everything Furrytail sells. */
export const GOOGLE_PRODUCT_CATEGORY = 'Animals & Pet Supplies > Pet Supplies > Pet Grooming Supplies';

type ProductLike = { id: string; name: string; productType?: string; species?: 'dog' | 'cat' | 'both'; shortDesc?: string; description?: string; volume?: string };

export function speciesLabel(p: ProductLike) {
  return p.species === 'dog' ? 'Dog' : p.species === 'cat' ? 'Cat' : 'Dog & Cat';
}

export function speciesPlural(p: ProductLike) {
  return p.species === 'dog' ? 'dogs' : p.species === 'cat' ? 'cats' : 'dogs and cats';
}

/** "Paw Cleaner – Natural Dog Grooming | Furrytail" */
export function productTitle(p: ProductLike) {
  const kind = p.productType === 'Shampoo' || /shampoo/i.test(p.name) ? 'Shampoo' : 'Grooming';
  return `${p.name} – Natural ${speciesLabel(p)} ${kind} | ${ORG_NAME}`;
}

/**
 * Plain-text product copy: HTML stripped, whitespace collapsed, and shouted
 * ALL-CAPS taglines ("BEFORE EVERY WALK.") turned into sentence case.
 */
export function plainProductText(p: ProductLike) {
  const raw = `${p.shortDesc ?? ''} ${p.description ?? ''}`
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#8217;|&rsquo;/g, '’')
    .replace(/\s+/g, ' ')
    .trim();
  return raw.replace(/\b([A-Z][A-Z ,'’&-]{6,}[A-Z])([.!]?)/g, (_m, words: string, end: string) => {
    const s = words.toLowerCase();
    return s.charAt(0).toUpperCase() + s.slice(1) + end;
  });
}

/** ~155-character meta description, cut at a word boundary. */
export function productMetaDescription(p: ProductLike) {
  const lead = `${p.name}${p.volume ? ` (${p.volume})` : ''} — natural ${speciesLabel(p).toLowerCase()} grooming by ${ORG_NAME}. `;
  const body = plainProductText(p);
  const text = lead + body;
  if (text.length <= 158) return text;
  return text.slice(0, 155).replace(/\s+\S*$/, '') + '…';
}
