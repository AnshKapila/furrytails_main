// Site-wide SEO facts in one place: the brand entity search engines and AI
// answer engines learn from, the default homepage copy, and the keyword
// themes each page is written around.
//
// Every claim here must already be true elsewhere on the site (product labels,
// TrustMarkersData, Shipping & Returns). Structured data that contradicts the
// visible page is a Google spam-policy violation, so nothing is invented here:
// no ratings, no review counts, no return window until one is published.

import { getBaseUrl } from '@/lib/site-url';
// Brand logo for structured data, served from our own domain so the brand
// entity (Organization logo, article publisher) is self-contained.
export function logoUrl(): string {
  return `${getBaseUrl()}/furrytail-logo.png`;
}

export const ORG_NAME = 'Furrytail';
export const ORG_ALTERNATE_NAMES = ['Furry Tail', 'Furrytail Joy'];
export {
  INSTAGRAM_URL,
  FACEBOOK_URL,
  YOUTUBE_URL,
  AMAZON_STORE_URL,
  FLIPKART_STORE_URL,
  GOOGLE_BUSINESS_URL,
  GOOGLE_REVIEW_URL,
  BRAND_PROFILES,
} from '@/lib/brand';
import { BRAND_PROFILES } from '@/lib/brand';
export const WHATSAPP_NUMBER = '+91-8796786531';

export const DEFAULT_TITLE = 'Furrytail — Natural Dog & Cat Grooming Products, India';
export const DEFAULT_DESCRIPTION =
  'Natural pet care for dogs and cats: sulphate-free, paraben-free dog & cat shampoo, ' +
  'dry foam shampoo, paw cleaner, natural tick & flea spray and coat mist. 99.5% natural ' +
  'origin, probiotic-preserved, vet consulted. Shipped across India.';

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
        logo: { '@type': 'ImageObject', url: logoUrl(), width: 720, height: 274 },
        image: logoUrl(),
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
        sameAs: BRAND_PROFILES,
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
  const suffix = `Natural ${speciesLabel(p)} ${kind} | ${ORG_NAME}`;
  // Woo names variants "Gentle Daily Shampoo-Fig & Neroli". The space-before
  // test leaves real hyphenated words ("Anti-Tick") alone.
  const parts = p.name.match(/^(.* \S+)-(\S.*)$/);
  const name = parts ? `${parts[1]} – ${parts[2]}` : p.name;
  // Google cuts titles at ~60 characters: drop the line name for variants,
  // then the descriptor, so the keyword and brand survive.
  const candidates = [
    `${name} – ${suffix}`,
    ...(parts ? [`${parts[2]} ${suffix}`] : []),
    `${name} | ${ORG_NAME}`,
  ];
  return candidates.find((t) => t.length <= TITLE_MAX) ?? candidates[candidates.length - 1];
}

const TITLE_MAX = 60;

// Shipping and returns facts for Product structured data. Google needs a rate
// and a return window in days. These match /shipping (free delivery, 3–5 days,
// 7-day returns on unopened products); structured data must never say more
// than the page does, so change both together.
export const SHIPPING_POLICY: {
  /** Flat shipping fee in INR (0 for free shipping). */
  rateInr: number | null;
  /** Order value at or above which shipping is free, if any. */
  freeOverInr: number | null;
  handlingDays: [number, number];
  transitDays: [number, number];
  /** Days a customer has to return an unopened product. */
  returnDays: number | null;
} = {
  rateInr: 0, // free delivery on every order
  freeOverInr: null,
  // "Delivery in 3–5 days" from order: 1 day to dispatch, 2–4 in transit.
  handlingDays: [1, 1],
  transitDays: [2, 4],
  returnDays: 7, // unopened products, published on /shipping
};

/** OfferShippingDetails + MerchantReturnPolicy, or nothing until the facts exist. */
export function offerPolicyJsonLd() {
  const s = SHIPPING_POLICY;
  const out: Record<string, unknown> = {};
  if (s.rateInr !== null) {
    const days = (d: [number, number]) => ({ '@type': 'QuantitativeValue', minValue: d[0], maxValue: d[1], unitCode: 'DAY' });
    const details = (rate: number, extra: Record<string, unknown> = {}) => ({
      '@type': 'OfferShippingDetails',
      shippingRate: { '@type': 'MonetaryAmount', value: rate, currency: 'INR' },
      shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'IN' },
      deliveryTime: {
        '@type': 'ShippingDeliveryTime',
        handlingTime: days(s.handlingDays),
        transitTime: days(s.transitDays),
      },
      ...extra,
    });
    // A free-shipping threshold is a second, zero-rate option that only
    // applies to orders at or above it.
    out.shippingDetails =
      s.freeOverInr !== null && s.rateInr > 0
        ? [
            details(s.rateInr),
            details(0, {
              eligibleTransactionVolume: { '@type': 'PriceSpecification', minPrice: s.freeOverInr, priceCurrency: 'INR' },
            }),
          ]
        : details(s.rateInr);
  }
  if (s.returnDays !== null) {
    out.hasMerchantReturnPolicy = {
      '@type': 'MerchantReturnPolicy',
      applicableCountry: 'IN',
      returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
      merchantReturnDays: s.returnDays,
      returnMethod: 'https://schema.org/ReturnByMail',
      // Furrytail pays return shipping (published on /shipping).
      returnFees: 'https://schema.org/FreeReturn',
      merchantReturnLink: `${getBaseUrl()}/shipping`,
    };
  }
  return out;
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
