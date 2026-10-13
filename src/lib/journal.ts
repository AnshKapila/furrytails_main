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
  /** Social share title, when it should differ from the display title. */
  ogTitle?: string;
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
    slug: 'travelling-with-your-pet-waterless-essentials',
    title: 'Travelling With Your Pet? Pack These Waterless Essentials.',
    seoTitle: "Travelling With Your Dog: Waterless Essentials | Furrytail",
    description:
      "What to pack when travelling with your dog or cat: four waterless essentials that keep your pet clean, fresh and protected on any trip - no tub, no rinse.",
    excerpt:
      'Four waterless essentials keep your pet clean, fresh and protected on any trip, with no tub, no hose and no rinse. What to pack, when to use each one, and a simple travel-day routine.',
    ogDescription: 'Four waterless essentials keep your pet clean, fresh and protected on any trip - no tub, no hose, no rinse.',
    category: 'Travel',
    readTime: '5 min read',
    datePublished: '2026-10-12',
    dateModified: '2026-10-12',
    image: {
      src: '/images/journal/travel/main.webp',
      width: 1184,
      height: 864,
      alt: 'A golden retriever on the back seat of a car on a hill road trip, with a travel bag and towel beside it',
    },
    keywords: ['travelling with dog', 'dog travel essentials', 'travelling with pets in india', 'road trip with dog', 'how to keep dog clean while travelling', 'waterless dog shampoo', 'dog travel kit'],
    related: ['dry-bath-vs-wet-bath-for-dogs', 'diwali-pet-safety-tips', 'winter-dog-care-india'],
    products: ['dry-foam-shampoo', 'paw-cleaner', 'anti-tick-flea-spray', 'refreshing-mist'],
  },
  {
    slug: "winter-dog-care-india",
    title: "Winter Dog Care in India: Cold, Smog and Dry Skin.",
    seoTitle: "Winter Dog Care in India: Cold, Smog & Dry Skin | Furrytail",
    description:
      "Winter care for dogs in Delhi NCR and North India: keeping warm, walking in smog and fog, bathing in the cold, dry skin and paws, and heater safety.",
    excerpt:
      "North Indian winters bring cold mornings, thick smog and dry air. Who feels the cold most, keeping warm safely, walking in smog and fog, bathing in winter, dry skin and paws, and heater safety.",
    ogDescription: "North Indian winters bring cold mornings, thick smog and dry air. Your dog’s routine should change with them.",
    category: "Seasonal",
    readTime: "7 min read",
    datePublished: '2026-10-12',
    dateModified: '2026-10-12',
    image: {
      src: '/images/journal/winter/main.webp',
      width: 1184,
      height: 864,
      alt: "An indie dog in a knitted sweater on a misty winter morning walk in a Delhi park",
    },
    keywords: ["winter dog care tips","how to take care of dog in winter","dog care in winter india","dog bath in winter","dog dry skin in winter","do dogs need sweaters","air pollution and dogs"],
    related: ["diwali-pet-safety-tips","summer-dog-care-india","dry-bath-vs-wet-bath-for-dogs"],
    products: ["gentle-daily-shampoo-santal-white-tea","dry-foam-shampoo","paw-cleaner"],
  },
  {
    slug: "diwali-pet-safety-tips",
    title: "Diwali and Your Pet: Firecrackers, Smoke and a Calmer Festival.",
    seoTitle: "Diwali Pet Safety: Calm a Dog During Crackers | Furrytail",
    description:
      "How to keep your dog or cat calm and safe this Diwali: firecracker anxiety, a safe den, smoke and air quality, diyas, sweets, and keeping pets from bolting.",
    excerpt:
      "The festival of lights is also, for a dog, the loudest week of the year. Signs of fear, building a safe den, what to do during the crackers, smoke and air quality, diyas, sweets, and keeping pets from getting lost.",
    ogDescription: "The festival of lights is also, for a dog, the loudest week of the year. A little planning makes it gentler.",
    category: "Seasonal",
    readTime: "7 min read",
    datePublished: '2026-10-12',
    dateModified: '2026-10-12',
    image: {
      src: '/images/journal/diwali/main.webp',
      width: 1184,
      height: 864,
      alt: "A golden retriever asleep on its bed in a living room decorated for Diwali, with lit diyas on a high shelf out of reach",
    },
    keywords: ["diwali pet safety tips","how to calm dog during diwali","dog scared of crackers","diwali dog anxiety","firecrackers and pets","diwali tips for pet parents","cats and diwali"],
    related: ["winter-dog-care-india","how-to-get-rid-of-dog-smell-in-house","can-you-bathe-a-cat"],
    products: ["paw-cleaner","dry-foam-shampoo"],
  },
  {
    slug: 'how-to-choose-a-dog-shampoo',
    title: 'How to Choose a Dog Shampoo: A Checklist for Indian Pet Parents.',
    seoTitle: "How to Choose a Dog Shampoo: Buyer's Checklist | Furrytail",
    description:
      "How to choose the best dog shampoo in India: what to look for on the label, and how to match it to coat, sensitive skin, puppies, cats and climate.",
    excerpt:
      'There is no single best dog shampoo - there is the right one for your dog. Read the formula, not the front label, then match it to coat, skin, age, cats at home and the Indian climate. A practical eight-point checklist.',
    ogDescription: 'Read the formula, not the front label - then match it to the dog in front of you.',
    category: 'Ingredients',
    readTime: '6 min read',
    datePublished: '2026-10-12',
    dateModified: '2026-10-12',
    image: {
      src: '/images/journal/choose-shampoo/main.webp',
      width: 1184,
      height: 864,
      alt: 'A woman reading the back label of a pet shampoo bottle while her golden retriever rests its head on her knee',
    },
    keywords: ['best dog shampoo in india', 'how to choose dog shampoo', 'best dog shampoo ingredients', 'dog shampoo for sensitive skin', 'dog shampoo for puppies', 'best shampoo for dogs', 'dog shampoo and conditioner'],
    related: ['what-we-found-in-most-pet-shampoos', 'reading-the-inci-list', 'can-i-use-human-shampoo-on-my-dog'],
    products: ['gentle-daily-shampoo-santal-white-tea', 'gentle-daily-shampoo-fig-neroli', 'gentle-daily-shampoo-violet-leaf-muslin', 'dry-foam-shampoo'],
  },
  {
    slug: "can-you-bathe-a-cat",
    title: "Can You Bathe a Cat? Cat Grooming at Home.",
    seoTitle: "Can You Bathe a Cat? Cat Grooming at Home | Furrytail",
    description:
      "Do cats need baths? When to bathe a cat, how to do it calmly, waterless options for cats who hate water, and grooming long-haired and Persian cats.",
    excerpt:
      "Most cats keep themselves beautifully clean; some need a little help. When a cat actually needs a bath, how to do it calmly, waterless options for cats who hate water, and caring for Persian and long-haired coats.",
    ogDescription: "Most cats keep themselves beautifully clean. Some need a little help.",
    category: "Cats",
    readTime: "6 min read",
    datePublished: '2026-10-12',
    dateModified: '2026-10-12',
    image: {
      src: '/images/journal/cat-grooming/main.webp',
      width: 1184,
      height: 864,
      alt: "A fluffy Persian cat being gently groomed on a woman’s lap in a bright living room",
    },
    keywords: ["can you bathe a cat","how to bathe a cat","cat grooming at home","cat shampoo","cat dry shampoo","persian cat grooming","can you bathe a cat with dog shampoo"],
    related: ["can-i-use-human-shampoo-on-my-dog","dry-bath-vs-wet-bath-for-dogs","reading-the-inci-list"],
    products: ["gentle-daily-shampoo-violet-leaf-muslin","gentle-daily-shampoo-fig-neroli","gentle-daily-shampoo-santal-white-tea","dry-foam-shampoo"],
  },
  {
    slug: "summer-dog-care-india",
    title: "Summer Dog Care in India: Grooming Through the Heat.",
    seoTitle: "Summer Dog Care in India: Heat, Grooming & Paws | Furrytail",
    description:
      "How to care for your dog in Indian summer: safe walk times, hot pavements and paws, grooming a double coat in the heat, bathing, ticks and heatstroke signs.",
    excerpt:
      "Indian summers ask a lot of a dog in a fur coat. Safe walk times, the seven-second pavement test, brushing (not shaving) a double coat, bathing in the heat, ticks, and the signs of heatstroke.",
    ogDescription: "Indian summers ask a lot of a dog in a fur coat. A few habits make it easier.",
    category: "Seasonal",
    readTime: "7 min read",
    datePublished: '2026-10-12',
    dateModified: '2026-10-12',
    image: {
      src: '/images/journal/summer-care/main.webp',
      width: 1184,
      height: 864,
      alt: "A dog drinking from a ceramic water bowl in the shade on a sunlit Indian apartment balcony",
    },
    keywords: ["summer dog care tips","how to take care of dogs in summer","dog care in summer india","dog grooming in summer","hot pavement dog paws","heatstroke in dogs","should i shave my dog in summer"],
    related: ["winter-dog-care-india","the-monsoon-ritual","ticks-fleas-and-the-indian-dog"],
    products: ["anti-tick-flea-spray","paw-cleaner","gentle-daily-shampoo-santal-white-tea","dry-foam-shampoo"],
  },
  {
    slug: "how-to-get-rid-of-dog-smell-in-house",
    title: "How to Get Rid of Dog Smell in the House.",
    seoTitle: "How to Get Rid of Dog Smell in the House | Furrytail",
    description:
      "Why your home smells of dog and how to fix it at the source: bedding, sofas, rugs, damp, the dog itself - plus a weekly routine for a fresh home.",
    excerpt:
      "A home that smells of dog isn’t a dirty home - it’s a home with a source you haven’t found yet. Bedding, sofas, rugs, damp, accidents and the dog itself, plus a weekly fresh-home routine.",
    ogDescription: "A home that smells of dog isn’t a dirty home. It’s a home with a source you haven’t found yet.",
    category: "Home",
    readTime: "6 min read",
    datePublished: '2026-10-12',
    dateModified: '2026-10-12',
    image: {
      src: '/images/journal/house-smell/main.webp',
      width: 1184,
      height: 864,
      alt: "A bright, airy living room with open windows and a clean dog resting on a freshly made dog bed",
    },
    keywords: ["how to get rid of dog smell in house","dog smell in house","how to get rid of dog smell on couch","dog smell in room","dog smell on blankets","dog smell remover"],
    related: ["why-your-dog-still-smells-after-a-bath","dry-bath-vs-wet-bath-for-dogs","the-monsoon-ritual"],
    products: ["refreshing-mist","dry-foam-shampoo","paw-cleaner"],
  },
  {
    slug: "why-is-my-dog-licking-its-paws",
    title: "Why Is My Dog Licking Its Paws?",
    seoTitle: "Why Is My Dog Licking Its Paws? Causes & Help | Furrytail",
    description:
      "Normal grooming or a sign of something more? Why dogs lick their paws, what to check at home, how to keep paws clean and dry, and when to see your vet.",
    excerpt:
      "A little licking is grooming; a lot of licking is a message. The common reasons dogs lick their paws, what to check at home, how to keep paws clean and dry, and when it’s time for the vet.",
    ogDescription: "A little licking is grooming. A lot of licking is a message.",
    category: "Care",
    readTime: "6 min read",
    datePublished: '2026-10-12',
    dateModified: '2026-10-12',
    image: {
      src: '/images/journal/paw-licking/main.webp',
      width: 1184,
      height: 864,
      alt: "A beagle lying on a rug licking its front paw in soft afternoon light",
    },
    keywords: ["dog licking paws","why is my dog licking its paws","dog licking paws too much","dog licking paws meaning","dog paws red and itchy","dog chewing paws"],
    related: ["paw-cleaner-for-dogs-post-walk-paw-care","the-monsoon-ritual","ticks-fleas-and-the-indian-dog"],
    products: ["paw-cleaner"],
  },
  {
    slug: "dog-hair-fall-vs-shedding",
    title: "Dog Hair Fall vs Normal Shedding: When to Worry.",
    seoTitle: "Dog Hair Fall vs Normal Shedding: When to Worry | Furrytail",
    description:
      "Is your dog’s hair fall normal shedding or a problem? How to tell the difference, how to manage shedding at home, and the signs that need a vet.",
    excerpt:
      "Hair on the sofa is normal; hair missing from the dog isn’t. How to tell normal shedding from a skin problem, the right brush for each coat, bathing for shedding, and when to see a vet.",
    ogDescription: "Hair on the sofa is normal. Hair missing from the dog isn’t.",
    category: "Care",
    readTime: "6 min read",
    datePublished: '2026-10-12',
    dateModified: '2026-10-12',
    image: {
      src: '/images/journal/hair-fall/main.webp',
      width: 1184,
      height: 864,
      alt: "A black labrador lying on a rug beside a deshedding brush and a small pile of shed hair",
    },
    keywords: ["dog hair fall","dog hair fall reason","dog shedding","labrador hair fall","dog shedding season","dog losing hair in patches","deshedding brush"],
    related: ["golden-retriever-grooming-at-home","how-to-bathe-a-dog-at-home","how-often-should-you-bathe-your-dog"],
    products: ["gentle-daily-shampoo-santal-white-tea","gentle-daily-shampoo-fig-neroli","gentle-daily-shampoo-violet-leaf-muslin"],
  },
  {
    slug: "golden-retriever-grooming-at-home",
    title: "Golden Retriever Grooming at Home: Coat, Ears and Bath.",
    seoTitle: "Golden Retriever Grooming at Home: Coat & Bath | Furrytail",
    description:
      "How to groom a Golden Retriever at home: brushing a double coat, shedding season, ears, bathing and drying - and why you shouldn’t shave a Golden in summer.",
    excerpt:
      "That golden coat is built for weather; your job is to keep it working. Brushing a double coat, shedding season, why not to shave, ears, paws, bathing and drying, and the best shampoo for a Golden.",
    ogDescription: "That golden coat is built for weather. Your job is to keep it working.",
    category: "Breeds",
    readTime: "7 min read",
    datePublished: '2026-10-12',
    dateModified: '2026-10-12',
    image: {
      src: '/images/journal/golden-retriever/main.webp',
      width: 1184,
      height: 864,
      alt: "A happy golden retriever with a glossy, brushed feathered coat sitting in a sunlit living room",
    },
    keywords: ["golden retriever grooming","golden retriever grooming at home","best shampoo for golden retriever","golden retriever shedding","how to bathe a golden retriever","should i shave my golden retriever"],
    related: ["how-to-bathe-a-dog-at-home","dog-hair-fall-vs-shedding","shih-tzu-grooming-at-home"],
    products: ["gentle-daily-shampoo-santal-white-tea","dry-foam-shampoo","paw-cleaner","anti-tick-flea-spray"],
  },
  {
    slug: 'shih-tzu-grooming-at-home',
    title: 'Shih Tzu Grooming at Home: Coat, Face, Paws and Bath.',
    seoTitle: 'Shih Tzu Grooming at Home: A Complete Guide | Furrytail',
    description:
      'How to groom a Shih Tzu at home: daily brushing, keeping the face and eyes clean, paws, bathing and drying a long double coat, and the best shampoo to use.',
    excerpt:
      'That flowing coat is beautiful, and it asks for a little care every day. Daily brushing, the face and eyes, ears, paws, and how to bathe and dry a long double coat without mats.',
    ogDescription: 'That flowing coat is beautiful - and it asks for a little care every single day.',
    category: 'Breeds',
    readTime: '7 min read',
    datePublished: '2026-10-12',
    dateModified: '2026-10-12',
    image: {
      src: '/images/journal/shih-tzu/main.webp',
      width: 1184,
      height: 864,
      alt: 'A groomed white and gold Shih Tzu with a top-knot sitting on a cream sofa in a bright apartment',
    },
    keywords: [
      'shih tzu grooming at home',
      'shih tzu grooming',
      'best shampoo for shih tzu',
      'dog shampoo for shih tzu',
      'how to bathe a shih tzu',
      'shih tzu coat care',
      'shih tzu puppy shampoo',
    ],
    related: ['how-to-bathe-a-dog-at-home', 'dry-bath-vs-wet-bath-for-dogs', 'paw-cleaner-for-dogs-post-walk-paw-care'],
    products: ['gentle-daily-shampoo-violet-leaf-muslin', 'dry-foam-shampoo', 'paw-cleaner', 'refreshing-mist'],
  },
  {
    slug: 'how-to-bathe-a-dog-at-home',
    title: 'How to Bathe a Dog at Home: The Ritual, Step by Step.',
    seoTitle: 'How to Bathe a Dog at Home, Step by Step | Furrytail',
    description:
      'A calm, step-by-step guide to bathing your dog at home: brushing, wetting to the skin, lathering, rinsing and drying - plus puppies and dogs who hate water.',
    excerpt:
      'A good bath isn’t fast or foamy. It’s slow, thorough and finished properly: brush first, wet to the skin, lather less than you expect, rinse longer than you think, and dry right down to the skin.',
    ogDescription: 'A good bath isn’t fast or foamy. It’s slow, thorough, and finished properly.',
    category: 'Ritual',
    readTime: '7 min read',
    datePublished: '2026-10-12',
    dateModified: '2026-10-12',
    image: {
      src: '/images/journal/bathe-at-home/main.webp',
      width: 1184,
      height: 864,
      alt: 'A calm golden retriever in a home bathtub while its owner works a gentle lather into the coat',
    },
    keywords: [
      'how to bathe a dog at home',
      'how to bathe a dog',
      'how to bathe a dog that hates water',
      'how to bathe a puppy for the first time',
      'when can puppies take a bath',
      'how to dry a dog after a bath',
      'dog bathing tips',
    ],
    related: ['how-often-should-you-bathe-your-dog', 'can-i-use-human-shampoo-on-my-dog', 'why-your-dog-still-smells-after-a-bath'],
    products: ['gentle-daily-shampoo-santal-white-tea', 'gentle-daily-shampoo-fig-neroli', 'gentle-daily-shampoo-violet-leaf-muslin'],
  },
  {
    slug: 'dry-bath-vs-wet-bath-for-dogs',
    title: 'Dry Bath vs. Wet Bath: When Does Your Dog Actually Need Either?',
    seoTitle: 'Dry Bath vs Wet Bath for Dogs: Which & When | Furrytail',
    description:
      'Dry shampoo or a full bath? When a waterless dry bath is enough, when your dog needs water, and how to keep your dog clean between baths.',
    excerpt:
      'A waterless bath isn’t a shortcut - it’s a different tool for a different problem. When a wet bath is the right call, when a dry bath is enough, what a dry bath can’t do, and how to keep your dog clean between baths.',
    ogDescription: 'A waterless bath isn’t a shortcut. It’s a different tool for a different problem.',
    category: 'Care',
    readTime: '6 min read',
    datePublished: '2026-10-12',
    dateModified: '2026-10-12',
    image: {
      src: '/images/journal/dry-vs-wet/main.webp',
      width: 1184,
      height: 864,
      alt: 'A woman massaging a light foam into a relaxed beagle’s dry coat on a mat in a living room',
    },
    keywords: [
      'dry bath for dogs',
      'dry shampoo for dogs',
      'waterless dog shampoo',
      'no rinse dog shampoo',
      'how to clean a dog without bathing',
      'how to keep dog clean between baths',
      'dry shampoo for cats',
    ],
    related: ['how-often-should-you-bathe-your-dog', 'why-your-dog-still-smells-after-a-bath', 'the-monsoon-ritual'],
    products: ['dry-foam-shampoo', 'paw-cleaner', 'refreshing-mist'],
  },
  {
    slug: 'can-i-use-human-shampoo-on-my-dog',
    title: 'Why Human Shampoo Doesn’t Belong in Your Dog’s Bath.',
    seoTitle: 'Can I Use Human Shampoo on My Dog? | Furrytail',
    description:
      'Can you use human shampoo on a dog or cat? Why skin pH, cleansers and fragrance differ - and what to use instead, from puppies to everyday baths.',
    excerpt:
      'It’s the bottle that’s already in the bathroom. Why dog skin isn’t human skin, what about baby shampoo, cats and puppies, what to do if you’ve already used it, and what to look for in a dog shampoo instead.',
    ogDescription: 'It’s the bottle that’s already in the bathroom. That doesn’t make it the right one.',
    category: 'Care',
    readTime: '6 min read',
    datePublished: '2026-10-12',
    dateModified: '2026-10-12',
    image: {
      src: '/images/journal/human-shampoo/main.webp',
      width: 1184,
      height: 864,
      alt: 'A golden retriever sitting in a bright bathroom beside a shelf of human shampoo bottles',
    },
    keywords: [
      'can i use human shampoo on my dog',
      'human shampoo on dogs',
      'can i use human shampoo on my cat',
      'can i use human shampoo on my puppy',
      'dog shampoo ph vs human',
      'baby shampoo for dogs',
      'dog shampoo',
    ],
    related: ['how-to-bathe-a-dog-at-home', 'reading-the-inci-list', 'what-we-found-in-most-pet-shampoos'],
    products: ['gentle-daily-shampoo-santal-white-tea', 'gentle-daily-shampoo-fig-neroli', 'gentle-daily-shampoo-violet-leaf-muslin'],
  },
  {
    slug: 'why-your-dog-still-smells-after-a-bath',
    title: 'Why Your Dog Still Smells After a Bath.',
    seoTitle: 'Why Your Dog Still Smells After a Bath | Furrytail Journal',
    description:
      'Why does your dog still smell after a bath? Learn how drying, shampoo residue, bedding, ears and skin may contribute—and when to call the vet.',
    excerpt:
      'The bath is over, but a musty smell never quite left. Before reaching for the shampoo again: how drying, rinsing, bedding, collars, ears and skin can each play a part, and where everyday freshness ends and veterinary care begins.',
    ogDescription:
      'Your dog has had a bath, but the smell is still there. Before reaching for the shampoo again, learn what the coat, ears, skin and everyday surroundings may be telling you.',
    category: 'Care',
    readTime: '6 min read',
    datePublished: '2026-10-12',
    dateModified: '2026-10-12',
    image: {
      src: '/images/journal/dog-smells-after-bath/main.webp',
      width: 1432,
      height: 955,
      alt: 'A wet golden retriever being towel-dried in a bright bathroom after a bath',
    },
    keywords: [
      'dog smells after bath',
      'dog still smells after bathing',
      'wet dog smell after bath',
      'dog smells musty after bath',
      'how to dry a dog properly after a bath',
      'dog ear smell after bath',
      'why does my dog’s skin smell',
      'how often should you bathe a dog',
      'clean dog bedding and collars',
    ],
    related: ['dry-bath-vs-wet-bath-for-dogs', 'how-often-should-you-bathe-your-dog', 'how-to-bathe-a-dog-at-home'],
    products: ['refreshing-mist', 'gentle-daily-shampoo-santal-white-tea'],
  },
  {
    slug: 'what-does-natural-mean-in-pet-care',
    title: 'What Does “Natural” Actually Mean in Pet Care?',
    seoTitle: 'What Does Natural Mean in Pet Care? | Furrytail',
    description:
      'Is natural dog shampoo always safer? Understand ingredient origin, ISO 16128-2, formulation quality and what to look for on a pet-care label.',
    excerpt:
      'The word natural sounds reassuring. But an ingredient’s origin cannot tell you everything about its safety, concentration or purpose. A practical guide to reading pet-care claims with more clarity – and less marketing noise.',
    ogTitle: 'Natural Doesn’t Automatically Mean Better',
    ogDescription:
      'The word natural tells you something about an ingredient’s origin. It does not, by itself, tell you whether a product is safe, effective or right for your pet.',
    category: 'Ingredients',
    readTime: '7 min read',
    datePublished: '2026-10-12',
    dateModified: '2026-10-12',
    image: {
      src: '/images/journal/what-natural-means/main.webp',
      width: 1432,
      height: 955,
      alt: 'Botanical ingredients – green tea leaves, white blossoms, sea salt, mint, wood and a glass flask of oil – on a sunlit stone surface',
    },
    keywords: [
      'natural dog shampoo',
      'natural pet care products',
      'natural vs synthetic ingredients',
      'naturally derived ingredients for dogs',
      'natural origin index',
      'ISO 16128-2',
      'dog shampoo ingredients',
      'is natural dog shampoo safer',
      'are synthetic ingredients bad for dogs',
      'how to read dog shampoo labels',
    ],
    related: ['reading-the-inci-list', 'santal-a-primer', 'what-we-found-in-most-pet-shampoos'],
    products: ['gentle-daily-shampoo-santal-white-tea'],
  },
  {
    slug: 'paw-cleaner-for-dogs-post-walk-paw-care',
    title: 'The Paw Problem: What Happens Between Walks.',
    seoTitle: 'Paw Cleaner for Dogs: The Post-Walk Paw Routine | Furrytail',
    description:
      'How to clean dog paws after walks without overdoing it. A practical guide to paw hygiene, drying, monsoon care and when paws need a vet.',
    excerpt:
      'A walk doesn’t really end at the front door. The paws are where the outside world meets the home, and good paw care is about knowing when to clean, when simply to inspect, and when to pay closer attention.',
    ogDescription:
      'The walk ends at the door. The paws don’t. A proportionate, post-walk approach to dog paw care.',
    category: 'Care',
    readTime: '6 min read',
    datePublished: '2026-10-12',
    dateModified: '2026-10-12',
    image: {
      src: '/images/journal/paw-problem/main.webp',
      width: 1432,
      height: 955,
      alt: 'A happy dog with muddy legs standing at an apartment front door after a walk, on a woven doormat',
    },
    keywords: [
      'paw cleaner for dogs',
      'dog paw cleaning',
      'how to clean dog paws after a walk',
      'clean dog paws after walk',
      'muddy dog paws',
      'paw hygiene for dogs',
      'dog paw care',
      'dog paw cleaning during monsoon',
      'do I need to clean my dog’s paws after every walk',
      'can I use human soap on dog paws',
    ],
    related: ['the-monsoon-ritual', 'how-often-should-you-bathe-your-dog', 'reading-the-inci-list'],
    products: ['paw-cleaner'],
  },
  {
    slug: 'santal-a-primer',
    title: 'Santal: a primer.',
    seoTitle: 'Sandalwood Oil in Pet Shampoo: A Primer | Furrytail',
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
    seoTitle: 'Tick & Flea Prevention for Dogs in India | Furrytail',
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
    seoTitle: 'How Often Should You Bathe Your Dog? | Furrytail',
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
    related: ['how-to-bathe-a-dog-at-home', 'can-i-use-human-shampoo-on-my-dog', 'why-your-dog-still-smells-after-a-bath'],
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
    seoTitle: 'How to Read a Pet Shampoo Ingredient (INCI) List | Furrytail',
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
    related: ['what-does-natural-mean-in-pet-care', 'what-we-found-in-most-pet-shampoos', 'santal-a-primer'],
    products: ['gentle-daily-shampoo-santal-white-tea', 'anti-tick-flea-spray'],
  },
  {
    slug: 'the-monsoon-ritual',
    title: 'The monsoon ritual.',
    seoTitle: 'Monsoon Dog Grooming Guide: Paws, Drying & Ticks | Furrytail',
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
    related: ['paw-cleaner-for-dogs-post-walk-paw-care', 'summer-dog-care-india', 'ticks-fleas-and-the-indian-dog'],
    products: ['paw-cleaner', 'anti-tick-flea-spray', 'refreshing-mist', 'dry-foam-shampoo'],
  },
  {
    slug: 'the-probiotic-question',
    title: 'The probiotic question.',
    seoTitle: 'Probiotic Pet Shampoo: What It Really Means | Furrytail',
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
    seoTitle: 'Pet Shampoo Ingredients: What We Found | Furrytail',
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
      width: 1184,
      height: 864,
      alt: 'Furrytail Gentle Daily Shampoo beside a folded towel, a ceramic vase and violet leaves',
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
  const ogTitle = a.ogTitle ?? a.title.replace(/\.$/, '');
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
