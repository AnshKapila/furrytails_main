// Copy for the species landing pages (/dog-grooming, /cat-grooming). These are
// the pages written to rank for "natural dog shampoo", "cat grooming products"
// and the like, so each one answers the search directly and links into the
// product pages and journal.
//
// Every product statement here must match the product pages and the FAQ
// (data/faq.ts) - in particular which products are safe for cats.

import type { Faq } from './faq';

export type Species = 'dog' | 'cat';

export type RoutineStep = {
  when: string;
  title: string;
  body: string;
  product: { name: string; href: string };
};

export type LandingContent = {
  species: Species;
  path: string;
  seoTitle: string;
  description: string;
  eyebrow: string;
  heading: string;
  intro: string[];
  routineHeading: string;
  routine: RoutineStep[];
  faqs: Faq[];
  journalSlugs: string[];
  crossLink: { label: string; href: string };
};

export const DOG_LANDING: LandingContent = {
  species: 'dog',
  path: '/dog-grooming',
  seoTitle: 'Natural Dog Grooming Products: Shampoo, Paw Cleaner, Tick Spray | Furrytail',
  description:
    'Natural dog grooming: sulphate-free dog shampoo, dry foam shampoo, paw cleaner and plant-based tick & flea spray. ' +
    '99.5% natural origin, probiotic-preserved.',
  eyebrow: 'Natural dog grooming',
  heading: 'Natural grooming products for dogs.',
  intro: [
    'A dog’s skin is thinner than ours and more easily stripped, so what goes into a dog shampoo matters more than how much it lathers. Every Furrytail product is made to a 99.5% Natural Origin Index (calculated per ISO 16128-2), cleansed with coconut- and sugar-derived surfactants instead of sulphates, and preserved with a probiotic radish-root ferment instead of parabens, MIT or phenoxyethanol.',
    'The range covers the whole week, not just bath day: a gentle daily shampoo, a waterless dry foam for between baths, a paw cleaner for after walks, a plant-based tick and flea spray for before them, and a coat mist for everything in between.',
  ],
  routineHeading: 'A natural dog grooming routine',
  routine: [
    {
      when: 'Bath day',
      title: 'Wash with a sulphate-free dog shampoo',
      body: 'Gentle enough for weekly or fortnightly baths without stripping the coat’s natural oils. Three fragrances: Santal & White Tea, Fig & Neroli, Violet Leaf & Muslin.',
      product: { name: 'Gentle Daily Shampoo', href: '/products/gentle-daily-shampoo-santal-white-tea' },
    },
    {
      when: 'Between baths',
      title: 'Freshen up without water',
      body: 'A rinse-free dry foam shampoo for the days a full bath isn’t possible - work it into the coat and towel off.',
      product: { name: 'Dry Foam Shampoo', href: '/products/dry-foam-shampoo' },
    },
    {
      when: 'Before every walk',
      title: 'Deter ticks and fleas, naturally',
      body: 'Plant-derived actives - vetiver, cypress, citronella and neem - instead of synthetic pesticides. A deterrent for tick-season walks, not a treatment for an existing infestation.',
      product: { name: 'Anti-Tick & Flea Spray', href: '/products/anti-tick-flea-spray' },
    },
    {
      when: 'After every walk',
      title: 'Clean paws at the door',
      body: 'A rinse-free foam with a built-in brush: massage each pad and between the toes, then wipe with a damp cloth.',
      product: { name: 'Paw Cleaner', href: '/products/paw-cleaner' },
    },
    {
      when: 'Any time',
      title: 'Refresh the coat',
      body: 'A fine coat mist for the moments in between - before guests arrive, after a car ride, before bed.',
      product: { name: 'Refreshing Mist', href: '/products/refreshing-mist' },
    },
  ],
  faqs: [
    {
      question: 'What is the best natural shampoo for dogs?',
      answer:
        'Look for a shampoo that skips sulphates (SLS/SLES), parabens, MIT and phenoxyethanol, uses mild plant-derived surfactants, and lists every ingredient. Furrytail’s Gentle Daily Shampoo is made to a 99.5% Natural Origin Index, cleansed with coconut- and sugar-derived surfactants and preserved with a probiotic ferment.',
    },
    {
      question: 'How often should I bathe my dog?',
      answer:
        'Weekly or fortnightly is typical for most dogs. A gentle, sulphate-free shampoo can be used that often without stripping the coat’s natural oils; your vet can advise for your dog’s coat type, skin and activity level.',
      links: [{ label: 'How often should you bathe your dog?', href: '/journal/how-often-should-you-bathe-your-dog' }],
    },
    {
      question: 'Is a natural tick and flea spray enough?',
      answer:
        'A plant-based spray like Furrytail’s Anti-Tick & Flea Spray helps deter ticks and fleas before walks in tick-active areas. It is a deterrent, not a pesticide treatment - for an established infestation, consult your vet.',
      links: [{ label: 'Ticks, fleas & the Indian dog', href: '/journal/ticks-fleas-and-the-indian-dog' }],
    },
    {
      question: 'Can I use these products on puppies?',
      answer:
        'Consult your vet for puppies under 12 weeks. For puppies over 12 weeks the gentle shampoos are suitable for regular use; check with your vet before using the Anti-Tick & Flea Spray on a puppy.',
    },
  ],
  journalSlugs: ['how-often-should-you-bathe-your-dog', 'ticks-fleas-and-the-indian-dog', 'the-monsoon-ritual'],
  crossLink: { label: 'Grooming a cat? See the products made for cats', href: '/cat-grooming' },
};

export const CAT_LANDING: LandingContent = {
  species: 'cat',
  path: '/cat-grooming',
  seoTitle: 'Natural Cat Grooming: Cat Shampoo & Waterless Dry Shampoo | Furrytail',
  description:
    'Natural cat grooming: a gentle sulphate-free cat shampoo and a waterless dry foam shampoo for cats who hate baths. ' +
    '99.5% natural origin, probiotic-preserved.',
  eyebrow: 'Natural cat grooming',
  heading: 'Natural grooming products for cats.',
  intro: [
    'Cats groom themselves, so anything left on the coat is eventually licked off. That is why only part of our range is made for cats: the Gentle Daily Shampoo in all three fragrances and the waterless Dry Foam Shampoo. Both are made to a 99.5% Natural Origin Index (calculated per ISO 16128-2), with mild coconut- and sugar-derived cleansers and a probiotic preservative instead of parabens, MIT or phenoxyethanol.',
    'Our Anti-Tick & Flea Spray, Paw Cleaner and Refreshing Mist are for dogs only - they use fragrance actives and functional ingredients that are not suitable for cats.',
  ],
  routineHeading: 'A gentle cat grooming routine',
  routine: [
    {
      when: 'When a bath is needed',
      title: 'Use a mild, sulphate-free cat shampoo',
      body: 'Gentle enough for cats when used as directed. Lather lightly, keep it away from the eyes and rinse thoroughly.',
      product: { name: 'Gentle Daily Shampoo', href: '/products/gentle-daily-shampoo-violet-leaf-muslin' },
    },
    {
      when: 'For cats who hate water',
      title: 'Clean the coat without a bath',
      body: 'A rinse-free dry foam shampoo: work a little into the coat with your hands, then towel off. No running water, no tub.',
      product: { name: 'Dry Foam Shampoo', href: '/products/dry-foam-shampoo' },
    },
  ],
  faqs: [
    {
      question: 'Which Furrytail products are safe for cats?',
      answer:
        'The Gentle Daily Shampoo (Santal & White Tea, Fig & Neroli, Violet Leaf & Muslin) and the Dry Foam Shampoo are made for both dogs and cats. The Anti-Tick & Flea Spray, Paw Cleaner and Refreshing Mist are for dogs only.',
    },
    {
      question: 'How do I clean a cat that hates baths?',
      answer:
        'A waterless dry foam shampoo lets you clean the coat without a tub: work a small amount into the fur with your hands and towel it off. Furrytail’s Dry Foam Shampoo is made for both cats and dogs.',
      links: [{ label: 'Dry Foam Shampoo', href: '/products/dry-foam-shampoo' }],
    },
    {
      question: 'Can I use dog shampoo on my cat?',
      answer:
        'Only if the shampoo is made for cats too - many dog products contain ingredients cats should not ingest when they groom. Furrytail’s Gentle Daily Shampoo and Dry Foam Shampoo are formulated for both.',
    },
  ],
  journalSlugs: ['what-we-found-in-most-pet-shampoos', 'reading-the-inci-list', 'the-probiotic-question'],
  crossLink: { label: 'Grooming a dog? See the full dog range', href: '/dog-grooming' },
};
