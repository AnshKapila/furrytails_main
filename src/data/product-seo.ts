import type { Faq } from '@/components/journal/ArticleFaqs';

// Per-product search copy, layered over what WooCommerce supplies.
//
// title       - <title>, ≤60 characters, leads with the phrase people search
//               (see docs/seo-keyword-plan.md, section A).
// description - meta description, ≤158 characters.
// faqs        - shown on the product page and emitted as FAQPage JSON-LD.
//               Answers may only restate what the product label already says
//               (WooCommerce description / how to use / safety). Inline links
//               use [anchor](/path).
//
// A product without an entry falls back to productTitle() / productMetaDescription().

export interface ProductSeo {
  title: string;
  description: string;
  faqs: Faq[];
}

const shampooFaqs = (fragrance: string): Faq[] => [
  {
    q: 'Is this a sulphate-free and paraben-free dog shampoo?',
    a: `Yes. ${fragrance} Gentle Daily Shampoo is cleansed with coconut- and sugar-derived surfactants instead of sulphates, and preserved with a probiotic ferment (Leuconostoc/Radish Root Ferment Filtrate) instead of parabens. [Reading the ingredient list](/journal/reading-the-inci-list) shows how to check this on any bottle.`,
  },
  {
    q: 'Is it suitable for dogs with sensitive skin?',
    a: 'It is formulated to be gentle, with colloidal oatmeal, aloe vera and vegetable glycerin to support the skin barrier. It is a cleansing shampoo, not a treatment: if your dog has persistent itching, redness or flaking, ask your vet before changing shampoos.',
  },
  {
    q: 'Can I use it on my cat?',
    a: 'Yes. The Gentle Daily Shampoo is formulated for dogs and cats. Lather lightly, take extra care around the face and rinse until the water runs clean.',
  },
  {
    q: 'How often can I bathe my dog with it?',
    a: 'As often as the coat actually needs - the surfactants are mild enough for regular bathing. There is no universal schedule; [how often to bathe your dog](/journal/how-often-should-you-bathe-your-dog) depends on coat, lifestyle and skin.',
  },
];

export const PRODUCT_SEO: Record<string, ProductSeo> = {
  'gentle-daily-shampoo-santal-white-tea': {
    title: 'Santal & White Tea Sulphate-Free Dog Shampoo | Furrytail',
    description:
      'Sulphate-free, paraben-free natural dog shampoo for dogs and cats, gentle on sensitive skin. Santal & White Tea, probiotic-preserved, 250 ml.',
    faqs: shampooFaqs('Santal & White Tea'),
  },
  'gentle-daily-shampoo-fig-neroli': {
    title: 'Fig & Neroli Sulphate-Free Dog Shampoo | Furrytail',
    description:
      'Sulphate-free, paraben-free natural dog shampoo for dogs and cats, gentle on sensitive skin. Fig & Neroli, probiotic-preserved, 250 ml.',
    faqs: shampooFaqs('Fig & Neroli'),
  },
  'gentle-daily-shampoo-violet-leaf-muslin': {
    title: 'Violet Leaf & Muslin Sulphate-Free Dog Shampoo | Furrytail',
    description:
      'Sulphate-free, paraben-free natural dog shampoo for dogs and cats, gentle on sensitive skin. Violet Leaf & Muslin, probiotic-preserved, 250 ml.',
    faqs: shampooFaqs('Violet Leaf & Muslin'),
  },
  'dry-foam-shampoo': {
    title: 'Dry Foam Shampoo – Waterless Dog & Cat Shampoo | Furrytail',
    description:
      'Waterless dry shampoo for dogs and cats: a no-rinse foam that absorbs surface oils and freshens the coat between baths. Hinoki & Bamboo, 100 ml.',
    faqs: [
      {
        q: 'How do you use dry shampoo on a dog?',
        a: 'Shake well, hold 15 cm from the coat and apply 4–6 sprays from neck to tail. Massage it through with your hands or a soft brush and allow 60–90 seconds to dry. No rinsing required.',
      },
      {
        q: 'Is it a dog shampoo without water?',
        a: 'Yes. It is a waterless foam for between bath days: it absorbs surface oils and neutralises odour without a tub or towelling. It does not replace a full bath when the coat is genuinely dirty.',
      },
      {
        q: 'Can I use it as a dry shampoo for cats?',
        a: 'Yes. It is formulated for dogs and cats - useful for cats who hate water. Avoid the eyes, and stop using it and consult your vet if irritation occurs.',
      },
      {
        q: 'How do I keep my dog clean between baths?',
        a: 'Match the clean-up to the mess: a dry foam for a coat that feels oily or smells stale, a [paw cleaner](/products/paw-cleaner) after muddy walks, and thorough drying after rain. If a smell keeps coming back, [find the source](/journal/why-your-dog-still-smells-after-a-bath) before washing more.',
      },
    ],
  },
  'refreshing-mist': {
    title: 'Refreshing Mist – Dog Perfume & Coat Spray | Furrytail',
    description:
      'A light dog perfume spray: fine coat mist in Yuzu & White Musk that dries in seconds. For daily use between baths. Made for dogs, 100 ml.',
    faqs: [
      {
        q: 'Is Refreshing Mist a dog perfume?',
        a: 'Yes - it is a fine-mist coat fragrance for dogs. Hold it 25 cm from the coat, apply 3 to 5 sprays over the back and flanks and let it settle; do not rub it in. It dries into the coat within seconds.',
      },
      {
        q: 'Is it a dog deodorant or smell remover spray?',
        a: 'It is a fragrance, not an odour treatment. It freshens a clean coat, but it will not fix the cause of a persistent smell - [why your dog still smells after a bath](/journal/why-your-dog-still-smells-after-a-bath) walks through what to check. For a coat that feels oily or stale between baths, the [Dry Foam Shampoo](/products/dry-foam-shampoo) absorbs surface oils and neutralises odour.',
      },
      {
        q: 'How often can I use the dog perfume spray?',
        a: 'It can be used daily or as needed between baths.',
      },
      {
        q: 'Can I use it on my cat?',
        a: 'No. Refreshing Mist is formulated for dogs and is not suitable for cats.',
      },
    ],
  },
  'paw-cleaner': {
    title: 'Paw Cleaner for Dogs – No-Rinse Paw Foam | Furrytail',
    description:
      'Dog paw cleaner foam with spearmint and sea salt: lifts mud and grit after walks with no rinsing and no tub. Made for dogs, 150 ml.',
    faqs: [
      {
        q: 'How do I use a paw cleaner on my dog?',
        a: 'Pump a small amount directly onto each paw or onto a damp cloth, massage gently across each pad and between the toes, then wipe clean with a damp cloth or towel. No rinsing required - but dry the paws afterwards, especially between the toes.',
      },
      {
        q: 'Do I need to clean my dog’s paws after every walk?',
        a: 'Not necessarily. Use it when paws come back muddy, wet or visibly dirty; after a clean, dry walk a quick look may be all they need. More in [the paw problem](/journal/paw-cleaner-for-dogs-post-walk-paw-care).',
      },
      {
        q: 'How do I keep my dog clean after a walk?',
        a: 'Look at the paws first, clean only what is dirty, then dry - wet fur between the toes is the part most often missed. In [the monsoon](/journal/the-monsoon-ritual), drying the coat matters as much as cleaning the paws.',
      },
      {
        q: 'Can I use it on my cat?',
        a: 'No. The Paw Cleaner is formulated for dogs and is not suitable for cats.',
      },
    ],
  },
  'anti-tick-flea-spray': {
    title: 'Natural Tick Spray for Dogs – Anti-Tick & Flea | Furrytail',
    description:
      'Natural tick repellent spray for dogs with vetiver, cypress and neem. No permethrin, pyrethroids or DEET. Spray before walks in tick-active areas.',
    faqs: [
      {
        q: 'Is this a natural tick repellent for dogs?',
        a: 'Yes. It repels through scent, using plant-derived vetiver root oil, cypress oil and neem extract. It contains no synthetic pesticides, no permethrin, no pyrethroids and no DEET.',
      },
      {
        q: 'How do I use tick spray on my dog?',
        a: 'Shake well, hold 20 cm from the coat and apply 6 to 8 sprays over the back, flanks and base of the tail, avoiding the eyes, nose and mouth. Let it dry completely before going out, and repeat before each walk in tick-active places - parks, trails, monsoon-wet grass.',
      },
      {
        q: 'Does it kill or remove ticks?',
        a: 'No. It is a repellent, not a medicated treatment. If you find a tick, [remove it carefully](/journal/ticks-fleas-and-the-indian-dog); for an established infestation, consult your vet.',
      },
      {
        q: 'Can I use it on street dogs or puppies?',
        a: 'For street and community dogs the same directions apply - patch-test first, and a dog with a heavy tick load needs a vet rather than a repellent. Check with your vet before using it on a puppy. It is not suitable for cats.',
      },
    ],
  },
};
