import type { Metadata } from 'next';
import { getBaseUrl } from './site-url';

// Single source of truth for journal articles. The journal index, sitemap,
// per-article metadata, JSON-LD and the "Continue reading" / product-page
// cross-links all read from here, so a new article only needs an entry below
// plus its page.tsx.

// One spelling everywhere - search engines treat "Furry Tail" and "Furrytail" as
// different entities. Must match ORG_NAME in lib/seo.ts.
export const PUBLISHER_NAME = 'Furrytail';

export interface JournalImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface JournalArticle {
  slug: string;
  /** Display title, as set in the H1 and journal cards. */
  title: string;
  /** <title> tag - written for search, kept under ~60 characters. */
  seoTitle: string;
  /** Meta description - kept within ~155 characters. */
  description: string;
  /** Longer teaser for the journal index card. */
  excerpt: string;
  /** Social share line. */
  ogDescription: string;
  category: string;
  readTime: string;
  datePublished: string;
  dateModified: string;
  image: JournalImage;
  /** Optional different image for the journal index card. */
  cardImageSrc?: string;
  keywords: string[];
  /** Slugs of the articles to surface under "Continue reading", in order. */
  related: string[];
  /** Product slugs the article discusses; those product pages link back. */
  products: string[];
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    slug: 'santal-a-primer',
    title: 'Santal: a primer.',
    seoTitle: 'Sandalwood Oil in Pet Shampoo: A Primer | Furry Tail',
    description:
      'What sandalwood oil is, how it’s distilled from Santalum album heartwood, natural vs synthetic sandalwood, GC-MS and IFRA, and what it means in pet shampoo.',
    excerpt:
      'Sandalwood has been used in personal care for centuries. What it actually is, how the oil is made, what the skin research does and doesn’t show, and why we chose it as the anchor for our first fragrance. Steam-distilled heartwood, GC-MS, IFRA compliance, and the question of synthetic alternatives.',
    ogDescription:
      'Santal is not simply a fragrance name. It is a formulation decision.',
    category: 'Fragrance',
    readTime: '7 min read',
    datePublished: '2026-10-06',
    dateModified: '2026-10-06',
    image: {
      src: '/images/journal/santal-primer/main.webp',
      width: 1024,
      height: 559,
      alt: 'A small glass bottle of sandalwood oil beside pieces of sandalwood heartwood on a travertine slab',
    },
    cardImageSrc: '/journal_santal.webp',
    keywords: [
      'sandalwood oil',
      'Santalum album wood oil',
      'natural vs synthetic sandalwood',
      'is sandalwood oil good for skin',
      'sandalwood dog shampoo',
      'IFRA compliance',
      'GC-MS sandalwood',
    ],
    related: ['reading-the-inci-list', 'what-we-found-in-most-pet-shampoos', 'the-probiotic-question'],
    products: ['gentle-daily-shampoo-santal-white-tea'],
  },
  {
    slug: 'ticks-fleas-and-the-indian-dog',
    title: 'Ticks, fleas & the Indian dog.',
    seoTitle: 'Tick & Flea Prevention for Dogs in India | Furry Tail',
    description:
      'Where Indian dogs pick up ticks, why grooming isn’t parasite control, how to remove a tick safely, and a five-step tick and flea prevention routine.',
    excerpt:
      'The tick you can see is only part of the story. Where Indian dogs actually encounter ticks, why grooming isn’t parasite control, what to do when you find one, and a five-step routine built around exposure.',
    ogDescription:
      'Don’t build your parasite routine around the tick you can see. Build it around the exposure you can manage.',
    category: 'Care',
    readTime: '7 min read',
    datePublished: '2026-10-03',
    dateModified: '2026-10-06',
    image: {
      src: '/images/journal/ticks-fleas-indian-dog/main.webp',
      width: 1431,
      height: 805,
      alt: 'A woman walking her golden retriever along a rain-washed path through a green city park',
    },
    keywords: [
      'tick prevention for dogs',
      'flea prevention for dogs',
      'ticks on dogs India',
      'how to remove a tick from a dog',
      'anti-tick spray for dogs',
      'can indoor dogs get ticks',
    ],
    related: ['the-monsoon-ritual', 'how-often-should-you-bathe-your-dog', 'reading-the-inci-list'],
    products: ['anti-tick-flea-spray', 'paw-cleaner'],
  },
  {
    slug: 'how-often-should-you-bathe-your-dog',
    title: 'How often should you bathe your dog?',
    seoTitle: 'How Often Should You Bathe Your Dog? | Furry Tail',
    description:
      'There is no universal dog bath schedule. How coat type, lifestyle, outdoor exposure, skin health and the Indian climate decide how often to bathe your dog.',
    excerpt:
      'The question isn’t monthly. Coat, lifestyle, outdoor exposure, skin health and climate tell you far more than a calendar does. When to brush, when to clean the paws, and when a full bath actually makes sense.',
    ogDescription: 'The question isn’t monthly. It’s whether your dog needs a bath today.',
    category: 'Grooming',
    readTime: '7 min read',
    datePublished: '2026-10-03',
    dateModified: '2026-10-06',
    image: {
      src: '/images/journal/how-often-bathe-dog/main.webp',
      width: 1234,
      height: 1274,
      alt: 'A dog being gently bathed in a bright, minimal bathroom',
    },
    keywords: [
      'how often should you bathe your dog',
      'dog bathing frequency',
      'how often to bathe a dog in India',
      'can I bathe my dog every week',
      'dog grooming routine',
      'gentle dog shampoo',
    ],
    related: ['the-monsoon-ritual', 'what-we-found-in-most-pet-shampoos', 'ticks-fleas-and-the-indian-dog'],
    products: [
      'gentle-daily-shampoo-santal-white-tea',
      'gentle-daily-shampoo-fig-neroli',
      'gentle-daily-shampoo-violet-leaf-muslin',
      'paw-cleaner',
      'dry-foam-shampoo',
    ],
  },
  {
    slug: 'reading-the-inci-list',
    title: 'Reading the INCI list.',
    seoTitle: 'How to Read a Pet Shampoo Ingredient (INCI) List | Furry Tail',
    description:
      'What INCI means, how to read a pet-care ingredient list without memorising it, and why “natural” is a description rather than a safety verdict.',
    excerpt:
      'Every ingredient has two names. The one you know. The one on the label. A field guide to decoding what is actually in your pet’s products: what to look for, what to question, and what the jargon means in plain language.',
    ogDescription: 'The front tells you the story. The back tells you the formulation.',
    category: 'Guide',
    readTime: '6 min read',
    datePublished: '2026-09-29',
    dateModified: '2026-10-06',
    image: {
      src: '/images/journal/reading-inci-list/main.webp',
      width: 1024,
      height: 1024,
      alt: 'A person reading the ingredient list printed on a botanical skincare label',
    },
    cardImageSrc: '/journal_label.webp',
    keywords: [
      'INCI list meaning',
      'how to read pet shampoo ingredients',
      'dog shampoo ingredient list',
      'are essential oils safe for cats',
      'natural pet shampoo ingredients',
    ],
    related: ['what-we-found-in-most-pet-shampoos', 'santal-a-primer', 'the-probiotic-question'],
    products: ['gentle-daily-shampoo-santal-white-tea', 'anti-tick-flea-spray'],
  },
  {
    slug: 'the-monsoon-ritual',
    title: 'The monsoon ritual.',
    seoTitle: 'Monsoon Dog Grooming Guide: Paws, Drying & Ticks | Furry Tail',
    description:
      'A practical monsoon grooming routine for dogs in Mumbai, Chennai and Bengaluru: paw cleaning, drying a wet coat, bathing frequency and tick prevention.',
    excerpt:
      'Mumbai, Chennai, Bangalore: monsoon season and a wet dog are a grooming challenge. What to use, when, and in what order: paw cleaning, drying, the question of bathing frequency, and consistent tick prevention.',
    ogDescription:
      'Four wet paws, a damp coat and mud between the toes: what monsoon grooming actually requires, and what it doesn’t.',
    category: 'Seasonal',
    readTime: '4 min read',
    datePublished: '2026-09-26',
    dateModified: '2026-10-06',
    image: {
      src: '/images/journal/monsoon-ritual/main.webp',
      width: 1024,
      height: 559,
      alt: 'A man in a raincoat drying a wet golden retriever by the front door after a monsoon walk',
    },
    cardImageSrc: '/journal_monsoon.webp',
    keywords: [
      'monsoon dog care',
      'monsoon grooming for dogs',
      'how to clean dog paws after walk',
      'ticks in monsoon',
      'dog paw cleaner',
      'bathing dog in monsoon',
    ],
    related: ['ticks-fleas-and-the-indian-dog', 'how-often-should-you-bathe-your-dog', 'what-we-found-in-most-pet-shampoos'],
    products: ['paw-cleaner', 'anti-tick-flea-spray', 'refreshing-mist', 'dry-foam-shampoo'],
  },
  {
    slug: 'the-probiotic-question',
    title: 'The probiotic question.',
    seoTitle: 'Probiotic Pet Shampoo: What It Really Means | Furry Tail',
    description:
      'What “probiotic” means on a pet shampoo bottle: Leuconostoc/Radish Root Ferment Filtrate, the skin microbiome, and why preservation is a formulation decision.',
    excerpt:
      'Leuconostoc/Radish Root Ferment Filtrate. How a fermentation-derived ingredient fits into a shampoo’s preservation system, what the skin-microbiome research does and doesn’t show, and how to read a probiotic claim.',
    ogDescription:
      'What “probiotic” actually means on a pet shampoo bottle, and why preservation is a formulation decision, not a marketing claim.',
    category: 'Ingredients',
    readTime: '6 min read',
    datePublished: '2026-09-08',
    dateModified: '2026-10-06',
    image: {
      src: '/images/journal/probiotic-question/main.webp',
      width: 1200,
      height: 675,
      alt: 'A golden retriever beside a veterinarian, with a gut microbiome analysis chart and magnified bacteria on screen',
    },
    cardImageSrc: '/journal_probiotic.webp',
    keywords: [
      'probiotic dog shampoo',
      'probiotic pet shampoo',
      'Leuconostoc/Radish Root Ferment Filtrate',
      'Leucidal Liquid',
      'dog skin microbiome',
      'preservative-free dog shampoo',
    ],
    related: ['reading-the-inci-list', 'what-we-found-in-most-pet-shampoos', 'how-often-should-you-bathe-your-dog'],
    products: [
      'gentle-daily-shampoo-santal-white-tea',
      'gentle-daily-shampoo-fig-neroli',
      'gentle-daily-shampoo-violet-leaf-muslin',
    ],
  },
  {
    slug: 'what-we-found-in-most-pet-shampoos',
    title: 'What We Found in Most Pet Shampoos.',
    seoTitle: 'Pet Shampoo Ingredients: What We Found | Furry Tail',
    description:
      'A closer look at pet shampoo ingredients: surfactants, fragrance, preservatives, essential oils and what a well-formulated dog or cat shampoo should do.',
    excerpt:
      'A shampoo can lather beautifully and still leave you with questions. We looked past the front label and into the formulation: cleansing agents, preservatives, fragrance, skin compatibility and the choices that matter.',
    ogDescription:
      'A closer look at pet shampoo ingredients, surfactants, fragrance, preservatives and what a considered formula should actually do.',
    category: 'Formulation',
    readTime: '5 min read',
    datePublished: '2026-08-26',
    dateModified: '2026-10-06',
    image: {
      src: '/images/journal/what-we-found/main.webp',
      width: 367,
      height: 457,
      alt: 'Pet shampoo bottle beside an open ingredient label and grooming essentials',
    },
    keywords: [
      'pet shampoo ingredients',
      'best dog shampoo ingredients',
      'sulphate-free dog shampoo',
      'can cats use dog shampoo',
      'essential oils in pet shampoo',
      'mild surfactant dog shampoo',
    ],
    related: ['reading-the-inci-list', 'santal-a-primer', 'the-probiotic-question'],
    products: [
      'gentle-daily-shampoo-santal-white-tea',
      'gentle-daily-shampoo-fig-neroli',
      'gentle-daily-shampoo-violet-leaf-muslin',
    ],
  },
];

export const FEATURED_SLUG = 'what-we-found-in-most-pet-shampoos';

export function getArticle(slug: string): JournalArticle {
  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);
  if (!article) throw new Error(`Unknown journal article: ${slug}`);
  return article;
}

export function articlePath(slug: string): string {
  return `/journal/${slug}`;
}

export function getRelatedArticles(slug: string): JournalArticle[] {
  return getArticle(slug).related.map(getArticle);
}

/** Articles that discuss a product, newest first - for product-page links. */
export function getArticlesForProduct(productSlug: string): JournalArticle[] {
  return JOURNAL_ARTICLES.filter((a) => a.products.includes(productSlug));
}

/** Long-form date for the article header, e.g. "3 October 2026". */
export function formatArticleDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** Full Next.js metadata for an article page, built from the registry. */
export function articleMetadata(slug: string): Metadata {
  const a = getArticle(slug);
  const path = articlePath(slug);
  const ogImage = { url: a.image.src, width: a.image.width, height: a.image.height, alt: a.image.alt };
  const ogTitle = a.title.replace(/\.$/, '');
  return {
    title: a.seoTitle,
    description: a.description,
    keywords: a.keywords,
    authors: [{ name: PUBLISHER_NAME, url: getBaseUrl() }],
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      url: path,
      siteName: PUBLISHER_NAME,
      locale: 'en_IN',
      title: ogTitle,
      description: a.ogDescription,
      publishedTime: a.datePublished,
      modifiedTime: a.dateModified,
      section: a.category,
      tags: a.keywords,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: a.ogDescription,
      images: [a.image.src],
    },
  };
}
