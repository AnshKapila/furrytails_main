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
  /** Curated pages list their products explicitly instead of by species. */
  productIds?: string[];
  breadcrumbLabel?: string;
  productsHeading?: string;
};

export const DOG_LANDING: LandingContent = {
  species: 'dog',
  path: '/dog-grooming',
  seoTitle: 'Dog Shampoo & Natural Dog Grooming Products | Furrytail',
  description:
    'Natural dog grooming: sulphate-free dog shampoo, dry foam shampoo, paw cleaner and plant-based tick & flea spray. ' +
    '99.5% natural origin, probiotic-preserved.',
  eyebrow: 'Dog shampoo & natural dog grooming',
  heading: 'Natural dog shampoo and grooming products.',
  intro: [
    'A dog’s skin is thinner than ours and more easily stripped, so what goes into a dog shampoo matters more than how much it lathers. Every Furrytail product is made to a 99.5% Natural Origin Index (calculated per ISO 16128-2), cleansed with amino acid-derived surfactants instead of sulphates, and preserved with a probiotic radish-root ferment instead of parabens, MIT or phenoxyethanol - a sulphate-free, paraben-free natural dog shampoo range made in India, gentle enough for sensitive skin.',
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
      body: 'Plant-derived actives - vetiver, hinoki cypress, eucalyptus and neem - instead of synthetic pesticides. A deterrent for tick-season walks, not a treatment for an existing infestation.',
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
      question: 'What is the best natural dog shampoo in India?',
      answer:
        'Look for a shampoo that skips sulphates (SLS/SLES), parabens, MIT and phenoxyethanol, uses mild plant-derived surfactants, and lists every ingredient. Furrytail’s Gentle Daily Shampoo is made to a 99.5% Natural Origin Index, cleansed with amino acid-derived surfactants and preserved with a probiotic ferment.',
      links: [{ label: 'How to choose a dog shampoo', href: '/journal/how-to-choose-a-dog-shampoo' }],
    },
    {
      question: 'How often should I bathe my dog?',
      answer:
        'There is no universal schedule - it depends on coat type, lifestyle, outdoor exposure and skin health. A gentle, sulphate-free shampoo can be used as often as the coat genuinely needs; your vet can advise if your dog has a skin condition.',
      links: [{ label: 'How often should you bathe your dog?', href: '/journal/how-often-should-you-bathe-your-dog' }],
    },
    {
      question: 'Is a natural tick spray for dogs enough?',
      answer:
        'A plant-based spray like Furrytail’s Anti-Tick & Flea Spray helps deter ticks and fleas before walks in tick-active areas. It is a deterrent, not a pesticide treatment - for an established infestation, consult your vet.',
      links: [{ label: 'Ticks, fleas & the Indian dog', href: '/journal/ticks-fleas-and-the-indian-dog' }],
    },
    {
      question: 'Which natural dog shampoo is best for sensitive skin?',
      answer:
        'Choose a mild, sulphate-free shampoo with a short, readable ingredient list and no harsh preservatives. The Gentle Daily Shampoo adds colloidal oatmeal, aloe vera and glycerin to support the skin barrier. Persistent itching or redness needs a vet, not a new shampoo.',
      links: [{ label: 'Gentle Daily Shampoo', href: '/products/gentle-daily-shampoo-santal-white-tea' }],
    },
    {
      question: 'Is there a dog shampoo without water?',
      answer:
        'Yes - a waterless dry foam shampoo. Furrytail’s Dry Foam Shampoo is sprayed on, massaged through and left to dry in 60–90 seconds, with no rinsing. It is for between baths, not instead of one.',
      links: [{ label: 'Dry Foam Shampoo', href: '/products/dry-foam-shampoo' }],
    },
    {
      question: 'Can I use these products on puppies?',
      answer:
        'Consult your vet for puppies under 12 weeks. For puppies over 12 weeks the gentle shampoos are suitable for regular use; check with your vet before using the Anti-Tick & Flea Spray on a puppy.',
    },
  ],
  journalSlugs: ['how-to-bathe-a-dog-at-home', 'how-often-should-you-bathe-your-dog', 'ticks-fleas-and-the-indian-dog'],
  crossLink: { label: 'Grooming a cat? See the products made for cats', href: '/cat-grooming' },
};

export const CAT_LANDING: LandingContent = {
  species: 'cat',
  path: '/cat-grooming',
  seoTitle: 'Cat Shampoo: Natural & Waterless Cat Grooming | Furrytail',
  description:
    'Natural cat grooming: a gentle sulphate-free cat shampoo and a waterless dry foam shampoo for cats who hate baths. ' +
    '99.5% natural origin, probiotic-preserved.',
  eyebrow: 'Cat shampoo & natural cat grooming',
  heading: 'Natural cat shampoo and grooming products.',
  intro: [
    'Cats groom themselves, so anything left on the coat is eventually licked off. That is why only part of our range is made for cats: the Gentle Daily Shampoo in all three fragrances and the waterless Dry Foam Shampoo. Both are made to a 99.5% Natural Origin Index (calculated per ISO 16128-2), with mild amino acid-derived cleansers and a probiotic preservative instead of parabens, MIT or phenoxyethanol.',
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
      question: 'What is the best natural cat shampoo?',
      answer:
        'A mild, sulphate-free shampoo that is formulated for cats, not just dogs - cats lick off whatever is left on the coat. Furrytail’s Gentle Daily Shampoo is made for dogs and cats, cleansed with amino acid-derived surfactants and preserved with a probiotic ferment.',
      links: [{ label: 'Gentle Daily Shampoo', href: '/products/gentle-daily-shampoo-violet-leaf-muslin' }],
    },
    {
      question: 'How do I clean a cat that hates baths?',
      answer:
        'Use a cat dry shampoo: a waterless foam lets you clean the coat without a tub. Spray a little onto the coat, massage it through with your hands or a soft brush and let it dry - no rinsing. Furrytail’s Dry Foam Shampoo is made for both cats and dogs.',
      links: [{ label: 'Dry Foam Shampoo', href: '/products/dry-foam-shampoo' }],
    },
    {
      question: 'Which cat shampoo is suitable for a Persian or long-haired cat?',
      answer:
        'Any cat shampoo you use should be formulated for cats. For long, dense coats like a Persian’s, lather lightly, rinse very thoroughly so nothing is left to be licked off, and dry the coat right down to the skin. Between baths, the waterless Dry Foam Shampoo avoids a full wash.',
      links: [{ label: 'Dry Foam Shampoo', href: '/products/dry-foam-shampoo' }],
    },
    {
      question: 'Can you bathe a cat with dog shampoo?',
      answer:
        'Only if the shampoo is made for cats too - many dog products contain ingredients cats should not ingest when they groom. Furrytail’s Gentle Daily Shampoo and Dry Foam Shampoo are formulated for both.',
    },
  ],
  journalSlugs: ['can-you-bathe-a-cat', 'what-we-found-in-most-pet-shampoos', 'reading-the-inci-list'],
  crossLink: { label: 'Grooming a dog? See the full dog range', href: '/dog-grooming' },
};

// Curated, not species-filtered: the four no-rinse products customers say they
// pack for trips. Directions and claims follow the product cartons.
export const TRAVEL_LANDING: LandingContent = {
  species: 'dog',
  path: '/travel-essentials',
  seoTitle: 'Dog Travel Essentials: Waterless Grooming Kit | Furrytail',
  description:
    'Travelling with your dog? Four waterless essentials - dry foam shampoo, paw cleaner, tick & flea spray and coat mist - keep pets clean on any trip. No rinse.',
  eyebrow: 'Dog travel essentials',
  heading: 'Waterless essentials for travelling with your pet.',
  intro: [
    'A full bath on the road is rarely practical. Hotel bathrooms are not built for a wet Labrador, and a coat that stays damp in a cold car or an air-conditioned room is uncomfortable for your pet.',
    'These four no-rinse essentials handle the in-between moments - the pit stop, the new trail, the hotel bed - with no tub, no hose and no rinse. Each comes in a 100–150 ml bottle that fits in a travel bag - or get all four together in the Travel Kit bundle.',
  ],
  routineHeading: 'A simple travel-day routine',
  routine: [
    {
      when: 'Before you head out',
      title: 'Protect before new trails',
      body: '6–8 sprays of Defense across the back, flanks and base of the tail, avoiding the eyes and mouth. Let it dry completely before walking. Helps deter ticks and fleas - for dogs.',
      product: { name: 'Anti-Tick & Flea Spray', href: '/products/anti-tick-flea-spray' },
    },
    {
      when: 'At every pit stop',
      title: 'Clean paws before the car',
      body: 'One pump of no-rinse foam on each paw or a damp cloth, massage between the pads and wipe clean. Thirty seconds, done at the car door - for dogs.',
      product: { name: 'Paw Cleaner', href: '/products/paw-cleaner' },
    },
    {
      when: 'On arrival',
      title: 'Freshen the coat',
      body: '3–5 sprays of Refreshing Mist over the back and flanks from 25 cm. Let it settle naturally - it dries into the coat in seconds. For dogs.',
      product: { name: 'Refreshing Mist', href: '/products/refreshing-mist' },
    },
    {
      when: 'When it gets messy',
      title: 'A bath without the bath',
      body: '4–6 sprays of Dry Foam Shampoo from neck to tail, massage through and allow 60–90 seconds to dry. No rinsing, no towelling - for dogs and cats.',
      product: { name: 'Dry Foam Shampoo', href: '/products/dry-foam-shampoo' },
    },
  ],
  faqs: [
    {
      question: 'What should I pack when travelling with my dog?',
      answer:
        'Your dog’s usual food, water bowl, bedding, lead and ID tag, plus a small grooming kit: a waterless dry shampoo, a no-rinse paw cleaner, a tick and flea repellent for new trails, a coat mist, a microfibre towel and a soft brush.',
      links: [{ label: 'Travelling with your pet: the full guide', href: '/journal/travelling-with-your-pet-waterless-essentials' }, { label: 'Travel Kit bundle', href: '/products/travel-kit-bundle' }],
    },
    {
      question: 'How do I keep my dog clean while travelling?',
      answer:
        'Clean only what needs it, where you are: paws at every pit stop, a dry foam shampoo when the coat gets messy, and a light coat mist on arrival. Save full baths for home.',
    },
    {
      question: 'Which travel essentials are safe for cats?',
      answer:
        'The Dry Foam Shampoo is made for dogs and cats. The Paw Cleaner, Anti-Tick & Flea Spray and Refreshing Mist are for dogs only.',
    },
    {
      question: 'Do these replace a bath?',
      answer:
        'They handle the in-between moments on a trip. When the coat is genuinely dirty, a full bath at home is still the right call.',
      links: [{ label: 'Dry bath vs. wet bath', href: '/journal/dry-bath-vs-wet-bath-for-dogs' }],
    },
  ],
  journalSlugs: ['travelling-with-your-pet-waterless-essentials', 'dry-bath-vs-wet-bath-for-dogs', 'diwali-pet-safety-tips'],
  crossLink: { label: 'See the full dog grooming range', href: '/dog-grooming' },
  productIds: ['travel-kit-bundle', 'dry-foam-shampoo', 'paw-cleaner', 'anti-tick-flea-spray', 'refreshing-mist'],
  breadcrumbLabel: 'Travel essentials',
  productsHeading: 'Shop the travel essentials',
};
