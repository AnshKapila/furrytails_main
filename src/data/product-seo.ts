import type { Faq } from '@/components/journal/ArticleFaqs';

// Per-product search copy, layered over what WooCommerce supplies.
//
// title       - <title>, ≤60 characters, leads with the phrase people search
//               (see docs/seo-keyword-plan.md, section A).
// description - meta description, ≤158 characters.
// faqs        - shown on the product page and emitted as FAQPage JSON-LD.
//               Inline links use [anchor](/path).
//
// SOURCE OF TRUTH: the product's mono carton (packaging in the market). Every
// claim, ingredient and direction here restates the carton; if the site,
// WooCommerce or anything else disagrees, the carton wins.
//
// A product without an entry falls back to productTitle() / productMetaDescription().

export interface ProductSeo {
  title: string;
  description: string;
  faqs: Faq[];
}

// Gentle Daily Shampoo INCI, as printed on the 250 ml cartons.
const SHAMPOO_INCI = (botanicals: string) =>
  'Aqua, Sodium Cocoyl Isethionate, Cocamidopropyl Betaine, Decyl Glucoside, Aloe Barbadensis Leaf Juice, Avena Sativa Kernel Flour, Glycerin, Guar Hydroxypropyltrimonium Chloride, Camellia Japonica Seed Oil, Azadirachta Indica Leaf Extract, Tocopherol, ' +
  botanicals +
  ', Leuconostoc/Radish Root Ferment Filtrate, Citric Acid, Xanthan Gum.';

interface ShampooFacts {
  fragrance: string;
  /** Slug suffix shared by the shampoo and its Complete Ritual, e.g. 'fig-neroli'. */
  scent: string;
  /** INCI names of the fragrance botanicals, in carton order. */
  inciBotanicals: string;
}

const shampooFaqs = ({ fragrance, scent, inciBotanicals }: ShampooFacts): Faq[] => [
  {
    q: 'Is this a sulphate-free and paraben-free dog shampoo?',
    a: `Yes. ${fragrance} Gentle Daily Shampoo is cleansed with amino acid-derived surfactants instead of sulphates and preserved with probiotics - Leuconostoc/Radish Root Ferment Filtrate - instead of synthetic preservatives. What's out of it: sulphates, parabens, MIT, synthetic preservatives and synthetic fragrance.`,
  },
  {
    q: 'Is it suitable for dogs with sensitive skin?',
    a: 'Yes - it is a sensitive-skin, pH-balanced formulation with colloidal oatmeal, aloe vera and vegetable glycerin. If irritation occurs, stop using it and consult your vet.',
  },
  {
    q: 'Can I use it on my cat?',
    a: 'Yes. The Gentle Daily Shampoo is made for dogs and cats. Lather slowly, keep clear of the eyes, take extra care around the face and rinse until the water runs clean.',
  },
  {
    q: 'Why does this dog shampoo lather less?',
    a: 'That is the point. Sulphate surfactants create foam, but they also strip the skin barrier and the coat’s natural oils. Amino acid surfactants clean as effectively with less lather - expect a quieter bath. A second application, if needed, shows slightly more lather because the coat is already clean.',
  },
  {
    q: 'How do I bathe my dog with it?',
    a: 'Brush the coat thoroughly to remove tangles first. Wet the coat right down to the skin - take your time with double-coated breeds. Apply a small amount and lather slowly from neck to tail, keeping clear of the eyes, then rinse until the water runs clean. Two passes give the best result.',
  },
  {
    q: 'Will my dog smell nice after a bath?',
    a: `Yes. ${fragrance} is IFRA-compliant, with no synthetic fragrance, and stays close to the coat for up to 48 hours as it dries softer and calmer. Can’t choose? The [Bath Ritual Trio](/products/bath-ritual-trio) has all three scents, and [The Complete Ritual – ${fragrance}](/products/the-complete-ritual-${scent}) adds Defense, the Paw Cleaner and Refreshing Mist for dogs.`,
  },
  {
    q: 'Is it a neem and aloe vera dog shampoo?',
    a: 'Neem extract and aloe vera are both in the formula, alongside colloidal oatmeal, a guar conditioner, camellia oil and vitamin E. It is a gentle daily shampoo - not a medicated or anti-tick shampoo.',
  },
  {
    q: 'Do I need a separate dog conditioner?',
    a: 'Usually not. The formula includes a guar-based conditioner with camellia oil and vitamin E, and the coat dries softer - for most coats one product does both jobs.',
  },
  {
    q: 'What are the full ingredients?',
    a: `As printed on the carton (INCI): ${SHAMPOO_INCI(inciBotanicals)} [Reading the INCI list](/journal/reading-the-inci-list) explains what each part does.`,
  },
];

// The Complete Ritual: one Gentle Daily Shampoo plus Defense, Paw Cleaner and
// Refreshing Mist. Three products, one per shampoo scent.
const completeRitual = ({ fragrance, scent }: Omit<ShampooFacts, 'inciBotanicals'>): ProductSeo => ({
  title: `Complete Ritual – ${fragrance} Dog Kit | Furrytail`,
  description:
    `Dog grooming kit: ${fragrance} Gentle Daily Shampoo, Defense tick & flea spray, Paw Cleaner and Refreshing Mist. The whole routine.`,
  faqs: [
    {
      q: 'What is in The Complete Ritual?',
      a: `The whole Furrytail routine in four products: [${fragrance} Gentle Daily Shampoo](/products/gentle-daily-shampoo-${scent}) (250 ml), [Defense Anti-Tick & Flea Spray](/products/anti-tick-flea-spray) (Vetiver & Cypress, 100 ml), [Paw Cleaner](/products/paw-cleaner) (Spearmint & Sea Salt, 150 ml) and [Refreshing Mist](/products/refreshing-mist) (Yuzu & White Musk, 100 ml).`,
    },
    {
      q: 'How do I use it?',
      a: 'Bath day: brush the coat, wet it right down to the skin, lather the shampoo slowly from neck to tail and rinse until the water runs clean - two passes give the best result. Before a walk: 6–8 sprays of Defense across the back, flanks and base of the tail, left to dry completely. After the walk: Paw Cleaner on each paw, massaged between the pads and wiped clean - no rinsing. Between baths: 3–5 sprays of Refreshing Mist from 25 cm, left to settle.',
    },
    {
      q: 'Is The Complete Ritual suitable for cats?',
      a: 'No - it is a set for dogs. The Gentle Daily Shampoo is made for dogs and cats, but Defense, the Paw Cleaner and Refreshing Mist are formulated for dogs.',
    },
    {
      q: 'Which scent should I choose?',
      a: `The set comes with one shampoo scent: this one is ${fragrance}. The Complete Ritual is also available with [Santal & White Tea](/products/the-complete-ritual-santal-white-tea), [Fig & Neroli](/products/the-complete-ritual-fig-neroli) or [Violet Leaf & Muslin](/products/the-complete-ritual-violet-leaf-muslin) - the shampoo formula is the same, only the fragrance changes.`,
    },
    {
      q: 'How is it different from the other kits?',
      a: 'It is the bath and the walk together. The [Walk Ritual Kit](/products/walk-ritual-kit) is Defense, Paw Cleaner and Refreshing Mist without the shampoo; the [Bath Ritual Trio](/products/bath-ritual-trio) is all three shampoo scents.',
    },
  ],
});

// Duos: two of the four single products. Directions restate the cartons.
type DuoItem = 'paw' | 'defense' | 'mist' | 'dryfoam';
const DUO_ITEMS: Record<DuoItem, { link: string; use: string; cats: boolean }> = {
  paw: {
    link: '[Paw Cleaner](/products/paw-cleaner) (Spearmint & Sea Salt, 150 ml)',
    use: 'After the walk, pump Paw Cleaner onto each paw or a damp cloth, massage across the pads and between the toes, and wipe clean - no rinsing.',
    cats: false,
  },
  defense: {
    link: '[Defense Anti-Tick & Flea Spray](/products/anti-tick-flea-spray) (Vetiver & Cypress, 100 ml)',
    use: 'Before the walk, shake Defense and apply 6–8 sprays from 20 cm across the back, flanks and base of the tail, avoiding the eyes and mouth, and let it dry completely.',
    cats: false,
  },
  mist: {
    link: '[Refreshing Mist](/products/refreshing-mist) (Yuzu & White Musk, 100 ml)',
    use: 'To finish, hold Refreshing Mist 25 cm from the coat, apply 3–5 sprays over the back and flanks and let it settle - do not rub it in.',
    cats: false,
  },
  dryfoam: {
    link: '[Dry Foam Shampoo](/products/dry-foam-shampoo) (Hinoki & Bamboo, 100 ml)',
    use: 'When the coat feels oily or smells stale, shake Dry Foam Shampoo and apply 4–6 sprays from 15 cm, neck to tail, massage through and let it dry in 60–90 seconds - no rinsing.',
    cats: true,
  },
};

interface DuoFacts {
  name: string;
  title: string;
  description: string;
  /** In routine order - the order the directions are given in. */
  items: [DuoItem, DuoItem];
  /** One line on when the duo is for. */
  moment: string;
  /** Where to go for the fuller routine. */
  more: string;
}

const duo = ({ name, title, description, items, moment, more }: DuoFacts): ProductSeo => {
  const [a, b] = items.map((i) => DUO_ITEMS[i]);
  const hasCatProduct = items.some((i) => DUO_ITEMS[i].cats);
  return {
    title,
    description,
    faqs: [
      { q: `What is in the ${name}?`, a: `Two Furrytail essentials: ${a.link} and ${b.link}. ${moment}` },
      { q: `How do I use the ${name}?`, a: `${a.use} ${b.use}` },
      {
        q: `Is the ${name} suitable for cats?`,
        a: hasCatProduct
          ? 'Only the Dry Foam Shampoo is made for dogs and cats; the other product is formulated for dogs, so the duo is for dogs.'
          : 'No. Both products are formulated for dogs, so the duo is for dogs only.',
      },
      { q: 'Is there a fuller kit?', a: more },
    ],
  };
};

export const PRODUCT_SEO: Record<string, ProductSeo> = {
  'after-walk-duo-paw-cleaner-refreshing-mist': duo({
    name: 'After-Walk Duo',
    title: 'After-Walk Duo – Dog Paw Cleaner & Mist | Furrytail',
    description: 'Dog paw cleaner and coat mist for coming home: no-rinse Paw Cleaner after every walk, then Refreshing Mist to finish. Two dog essentials, one duo.',
    items: ['paw', 'mist'],
    moment: 'Clean paws and a fresh coat when you get home from a walk.',
    more: 'Add Defense before the walk with the [Walk Ritual Kit](/products/walk-ritual-kit), or get the whole routine in [The Complete Ritual](/products/the-complete-ritual-santal-white-tea).',
  }),
  'out-back-duo': duo({
    name: 'Out & Back Duo',
    title: 'Out & Back Duo – Tick Spray & Paw Cleaner | Furrytail',
    description: 'Natural tick & flea spray before the walk and no-rinse paw cleaner after it. Defense and Paw Cleaner in one dog walk duo.',
    items: ['defense', 'paw'],
    moment: 'Defense on the way out, Paw Cleaner on the way back in.',
    more: 'Add Refreshing Mist to finish with the [Walk Ritual Kit](/products/walk-ritual-kit), or get the whole routine in [The Complete Ritual](/products/the-complete-ritual-santal-white-tea).',
  }),
  'fresh-walk-duo': duo({
    name: 'Fresh Walk Duo',
    title: 'Fresh Walk Duo – Tick Spray & Dog Mist | Furrytail',
    description: 'Natural tick & flea spray before the walk and Refreshing Mist after it. Defense and a light dog coat fragrance in one duo.',
    items: ['defense', 'mist'],
    moment: 'Protection before the walk and a fresh coat after it.',
    more: 'Add the Paw Cleaner with the [Walk Ritual Kit](/products/walk-ritual-kit), or get the whole routine in [The Complete Ritual](/products/the-complete-ritual-santal-white-tea).',
  }),
  'between-baths-duo-remedy-dry-foam-shampoo-refresh-refreshing-mist': duo({
    name: 'Between-Baths Duo',
    title: 'Between-Baths Duo – Dry Shampoo & Dog Mist | Furrytail',
    description: 'Waterless dry foam shampoo and Refreshing Mist for the days between baths - no tub, no rinse. Two no-rinse dog essentials in one duo.',
    items: ['dryfoam', 'mist'],
    moment: 'For the days between baths: a waterless clean, then a light fragrance.',
    more: 'For a full bath day, add a [Gentle Daily Shampoo](/products/gentle-daily-shampoo-santal-white-tea); for trips, the [Travel Kit](/products/travel-kit-bundle) has all four waterless essentials.',
  }),
  'no-rinse-duo-remedy-paw-cleaner-dry-foam-shampoo': duo({
    name: 'No-Rinse Duo',
    title: 'No-Rinse Duo – Dry Shampoo & Paw Cleaner | Furrytail',
    description: 'Waterless dry foam shampoo and no-rinse paw cleaner: clean coat and clean paws with no water. Two no-rinse dog essentials in one duo.',
    items: ['paw', 'dryfoam'],
    moment: 'Clean paws and a clean coat without water - for muddy, rainy days.',
    more: 'The [Travel Kit](/products/travel-kit-bundle) adds Defense and Refreshing Mist - all four waterless essentials.',
  }),
  'trail-duo-defense-anti-tick-flea-spray-remedy-dry-foam-shampoo': duo({
    name: 'Trail Duo',
    title: 'Trail Duo – Dry Shampoo & Tick Spray | Furrytail',
    description: 'Natural tick & flea spray before the trail and waterless dry foam shampoo after it. Defense and Dry Foam Shampoo in one dog duo.',
    items: ['defense', 'dryfoam'],
    moment: 'Defense before a walk in grass and woods; Dry Foam Shampoo for the coat afterwards.',
    more: 'The [Travel Kit](/products/travel-kit-bundle) adds the Paw Cleaner and Refreshing Mist - all four waterless essentials.',
  }),
  'the-complete-ritual-santal-white-tea': completeRitual({ fragrance: 'Santal & White Tea', scent: 'santal-white-tea' }),
  'the-complete-ritual-fig-neroli': completeRitual({ fragrance: 'Fig & Neroli', scent: 'fig-neroli' }),
  'the-complete-ritual-violet-leaf-muslin': completeRitual({ fragrance: 'Violet Leaf & Muslin', scent: 'violet-leaf-muslin' }),
  'travel-kit-bundle': {
    title: "Travel Kit Bundle – Waterless Dog Grooming Kit | Furrytail",
    description:
      "Dog travel kit: Dry Foam Shampoo, Paw Cleaner, Defense tick & flea spray and Refreshing Mist in one bundle. Waterless grooming for any trip - no rinse.",
    faqs: [
      {
        q: 'What is in the Travel Kit?',
        a: 'Four waterless essentials: [Dry Foam Shampoo](/products/dry-foam-shampoo) (Hinoki & Bamboo, 100 ml), [Paw Cleaner](/products/paw-cleaner) (Spearmint & Sea Salt, 150 ml), [Defense Anti-Tick & Flea Spray](/products/anti-tick-flea-spray) (Vetiver & Cypress, 100 ml) and [Refreshing Mist](/products/refreshing-mist) (Yuzu & White Musk, 100 ml).',
      },
      {
        q: 'How do I use the Travel Kit on a trip?',
        a: 'Before a walk in a new place, 6–8 sprays of Defense across the back, flanks and base of the tail, left to dry. At every pit stop, Paw Cleaner on each paw, massaged between the pads and wiped clean. On arrival, 3–5 sprays of Refreshing Mist, left to settle. When the coat gets messy, 4–6 sprays of Dry Foam Shampoo, massaged through and left to dry in 60–90 seconds - no rinsing.',
      },
      {
        q: 'Is the Travel Kit suitable for cats?',
        a: 'Only the Dry Foam Shampoo is made for dogs and cats. The Paw Cleaner, Defense spray and Refreshing Mist are for dogs only, so the kit is designed for travelling with a dog.',
      },
      {
        q: 'Do I need water to use it?',
        a: 'No. All four are no-rinse: no tub, no hose and no towelling for the Dry Foam Shampoo. They handle the in-between moments on a trip; a full bath at home is still right when the coat is genuinely dirty.',
      },
      {
        q: 'Will it fit in my travel bag?',
        a: 'Yes - three 100 ml bottles and one 150 ml bottle. More on what to pack in [travelling with your pet](/journal/travelling-with-your-pet-waterless-essentials).',
      },
    ],
  },
  'bath-ritual-trio': {
    title: 'Bath Ritual Trio – Sulphate-Free Dog Shampoo Set | Furrytail',
    description:
      'All three Gentle Daily Shampoos: Santal & White Tea, Fig & Neroli, Violet Leaf & Muslin. Sulphate-free, probiotic-preserved, for dogs & cats. 3 × 250 ml.',
    faqs: [
      {
        q: 'What is in the Bath Ritual Trio?',
        a: 'All three 250 ml Gentle Daily Shampoos: [Santal & White Tea](/products/gentle-daily-shampoo-santal-white-tea), [Fig & Neroli](/products/gentle-daily-shampoo-fig-neroli) and [Violet Leaf & Muslin](/products/gentle-daily-shampoo-violet-leaf-muslin).',
      },
      {
        q: 'Are the three shampoos the same formula?',
        a: 'Yes - only the fragrance changes. All three are cleansed with amino acid-derived surfactants, preserved with probiotics and pH-balanced for sensitive skin, with colloidal oatmeal, aloe vera, neem and camellia oil. What’s out of them: sulphates, parabens, MIT, synthetic preservatives and synthetic fragrance.',
      },
      {
        q: 'Can I use it on my cat?',
        a: 'Yes. The Gentle Daily Shampoos are made for dogs and cats. Lather slowly, keep clear of the eyes, take extra care around the face and rinse until the water runs clean.',
      },
      {
        q: 'How do I bathe my dog with it?',
        a: 'Brush the coat thoroughly to remove tangles first. Wet the coat right down to the skin, apply a small amount and lather slowly from neck to tail, keeping clear of the eyes, then rinse until the water runs clean. Two passes give the best result - expect less lather than a sulphate shampoo.',
      },
      {
        q: 'Why three scents?',
        a: 'So the bath can change with the mood or the season - warm Santal & White Tea, bright Fig & Neroli or soft Violet Leaf & Muslin. Each is IFRA-compliant, with no synthetic fragrance, and stays close to the coat for up to 48 hours.',
      },
    ],
  },
  'walk-ritual-kit': {
    title: 'Walk Ritual Kit – Dog Walk Care Bundle | Furrytail',
    description:
      'Dog walk kit: Defense tick & flea spray before the walk, Paw Cleaner after it and Refreshing Mist to finish. Three dog essentials in one bundle.',
    faqs: [
      {
        q: 'What is in the Walk Ritual Kit?',
        a: 'Three dog essentials for every walk: [Defense Anti-Tick & Flea Spray](/products/anti-tick-flea-spray) (Vetiver & Cypress, 100 ml), [Paw Cleaner](/products/paw-cleaner) (Spearmint & Sea Salt, 150 ml) and [Refreshing Mist](/products/refreshing-mist) (Yuzu & White Musk, 100 ml).',
      },
      {
        q: 'How do I use the Walk Ritual Kit?',
        a: 'Before the walk, shake Defense and apply 6–8 sprays from 20 cm across the back, flanks and base of the tail, avoiding the eyes and mouth, and let it dry completely. After the walk, pump Paw Cleaner onto each paw or a damp cloth, massage across the pads and between the toes, and wipe clean - no rinsing. To finish, hold Refreshing Mist 25 cm from the coat, apply 3–5 sprays over the back and flanks and let it settle; do not rub it in.',
      },
      {
        q: 'Can I use it every day?',
        a: 'Yes. The Paw Cleaner is a no-rinse, daily-use formula made to be used after every walk, and Refreshing Mist is made to wear daily. Repeat Defense before each walk in tick-active environments.',
      },
      {
        q: 'Is the Walk Ritual Kit suitable for cats?',
        a: 'No. Defense, the Paw Cleaner and Refreshing Mist are all formulated for dogs, so the kit is for dogs only.',
      },
      {
        q: 'How is it different from the Travel Kit?',
        a: 'The Walk Ritual Kit is the everyday routine at home - before, after and to finish. The [Travel Kit](/products/travel-kit-bundle) adds the [Dry Foam Shampoo](/products/dry-foam-shampoo) for trips, when a bath is not an option.',
      },
    ],
  },
  'gentle-daily-shampoo-santal-white-tea': {
    title: 'Santal & White Tea Sulphate-Free Dog Shampoo | Furrytail',
    description:
      'Sulphate-free dog & cat shampoo cleansed with amino acids, preserved with probiotics. pH-balanced for sensitive skin. Santal & White Tea, 250 ml.',
    faqs: shampooFaqs({
      fragrance: 'Santal & White Tea',
      scent: 'santal-white-tea',
      inciBotanicals: 'Camellia Sinensis Leaf Extract, Santalum Album Oil',
    }),
  },
  'gentle-daily-shampoo-fig-neroli': {
    title: 'Fig & Neroli Sulphate-Free Dog Shampoo | Furrytail',
    description:
      'Sulphate-free dog & cat shampoo cleansed with amino acids, preserved with probiotics. pH-balanced for sensitive skin. Fig & Neroli, 250 ml.',
    faqs: shampooFaqs({
      fragrance: 'Fig & Neroli',
      scent: 'fig-neroli',
      inciBotanicals: 'Ficus Carica Fruit Extract, Citrus Aurantium Amara Flower Oil',
    }),
  },
  'gentle-daily-shampoo-violet-leaf-muslin': {
    title: 'Violet Leaf & Muslin Sulphate-Free Dog Shampoo | Furrytail',
    description:
      'Sulphate-free dog & cat shampoo cleansed with amino acids, preserved with probiotics. pH-balanced for sensitive skin. Violet Leaf & Muslin, 250 ml.',
    faqs: shampooFaqs({
      fragrance: 'Violet Leaf & Muslin',
      scent: 'violet-leaf-muslin',
      inciBotanicals: 'Viola Odorata Leaf Extract, Muslin Essential Oil',
    }),
  },
  'dry-foam-shampoo': {
    title: 'Dry Foam Shampoo – Waterless Dog & Cat Shampoo | Furrytail',
    description:
      'Waterless dry shampoo for dogs & cats: no-rinse, leave-on safe foam that absorbs surface oils and neutralises odour between baths. Hinoki & Bamboo.',
    faqs: [
      {
        q: 'Is it good for travelling with my pet?',
        a: "Yes - it is a bath without the bath. The 100 ml bottle fits any bag, and it needs no water, no rinsing and no towelling: 4–6 sprays, massage through, dry in 60–90 seconds. Made for dogs and cats. See [travel essentials](/travel-essentials), or get all four in the [Travel Kit](/products/travel-kit-bundle).",
      },
      {
        q: 'How do you use dry shampoo on a dog?',
        a: 'Shake well, hold 15 cm from the coat and apply 4–6 sprays from neck to tail. Massage gently through with your hands or a soft brush and allow 60–90 seconds to dry. No rinsing required. Use between bath days as needed.',
      },
      {
        q: 'Is it a dog shampoo without water?',
        a: 'Yes. It is a waterless foam that refreshes between bath days - absorbing surface oils, neutralising odour and leaving a light conditioning finish without a drop of water. No tub, no towelling.',
      },
      {
        q: 'Can I use it as a dry shampoo for cats?',
        a: 'Yes. It is made for dogs and cats, and it is a no-rinse, leave-on safe formula - useful for cats who hate water. Avoid contact with the eyes.',
      },
      {
        q: 'What does Hinoki & Bamboo smell like?',
        a: 'Hinoki cypress and fresh bamboo - the scent of a Japanese bathhouse, quiet and architectural. There is no synthetic fragrance.',
      },
      {
        q: 'What are the full ingredients?',
        a: 'As printed on the carton (INCI): Aqua, Alcohol Denat, Aloe Barbadensis Leaf Juice, Cocamidopropyl Betaine, Decyl Glucoside, Panthenol, Glycerin, Sodium Bicarbonate, Chamaecyparis Obtusa Wood Oil, Bambusa Vulgaris Extract, Camellia Sinensis Leaf Extract, Leuconostoc/Radish Root Ferment Filtrate, Citric Acid. Probiotic-preserved; no parabens, MIT or synthetic surfactants.',
      },
      {
        q: 'How do I keep my dog clean between baths?',
        a: 'A dry foam for a coat that feels oily or smells stale, the [Paw Cleaner](/products/paw-cleaner) after every walk, and thorough drying after rain. If a smell keeps coming back, [find the source](/journal/why-your-dog-still-smells-after-a-bath) before washing more.',
      },
    ],
  },
  'refreshing-mist': {
    title: 'Refreshing Mist – Dog Perfume & Coat Spray | Furrytail',
    description:
      'A light dog perfume spray: IFRA-compliant, leave-on coat mist in Yuzu & White Musk that dries in seconds and lingers. Wear it daily. For dogs, 100 ml.',
    faqs: [
      {
        q: 'Is it good for travelling with my pet?',
        a: "Yes - a few sprays on arrival freshen a coat that smells of the journey, ready for the next cuddle or family hello. 100 ml, for dogs. See [travel essentials](/travel-essentials), or get all four in the [Travel Kit](/products/travel-kit-bundle).",
      },
      {
        q: 'Is Refreshing Mist a dog perfume?',
        a: 'Yes - it is a fine-mist coat fragrance for dogs, for the moments that matter: before guests arrive, before a car ride, before the evening cuddle on the sofa. Hold it 25 cm from the coat, apply 3 to 5 sprays over the back and flanks and let it settle naturally; do not rub it in. It dries into the coat within seconds.',
      },
      {
        q: 'Is it safe to use every day?',
        a: 'Yes - it is a leave-on, IFRA-compliant formula made for daily use. What’s out of it: synthetic fragrance, alcohol in harmful concentrations, synthetic preservatives, parabens and heavy fragrance allergens. For external use only; avoid the eyes and mouth, and if irritation occurs stop using it and consult your vet.',
      },
      {
        q: 'Is it a dog deodorant or smell remover spray?',
        a: 'It is a fragrance, not an odour treatment. It freshens a clean coat, but it will not fix the cause of a persistent smell - [why your dog still smells after a bath](/journal/why-your-dog-still-smells-after-a-bath) walks through what to check. For a coat that feels oily or stale between baths, the [Dry Foam Shampoo](/products/dry-foam-shampoo) absorbs surface oils and neutralises odour.',
      },
      {
        q: 'Is it a long-lasting dog perfume?',
        a: 'A light water base carries the fragrance through the coat and evaporates clean, leaving yuzu - bright Japanese citrus that opens on contact - and ambrette seed musk, warm and skin-close, that lingers long after. Light enough to layer, present enough to be noticed.',
      },
      {
        q: 'How often can I use the dog perfume spray?',
        a: 'It can be used daily or as needed between baths. After a walk, it finishes the [Walk Ritual Kit](/products/walk-ritual-kit) - Defense before, Paw Cleaner after, then the Mist.',
      },
      {
        q: 'What are the full ingredients?',
        a: 'As printed on the carton (INCI): Aqua, Decyl Glucoside, Cocamidopropyl Betaine, Sodium Lauroyl Sarcosinate, Panthenol, Betaine, Aloe Barbadensis Leaf Juice, Sodium Benzoate, Potassium Sorbate, Menthol.',
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
      'No-rinse dog paw cleaner foam with spearmint & sea salt, amino acid surfactants and probiotic preservation. Use after every walk. For dogs, 150 ml.',
    faqs: [
      {
        q: 'Is it good for travelling with my pet?',
        a: "Yes - clean paws at every pit stop before your dog gets back in the car, and before they settle on a hotel bed. The 150 ml no-rinse foam takes one pump and thirty seconds. See [travel essentials](/travel-essentials), or get all four in the [Travel Kit](/products/travel-kit-bundle).",
      },
      {
        q: 'How do I use a paw cleaner on my dog?',
        a: 'Pump a small amount directly onto each paw or onto a damp cloth. Gently massage across each pad and between the toes, then wipe clean with a damp cloth or towel. No rinsing required. One pump, thirty seconds - done at the door.',
      },
      {
        q: 'Should I clean my dog’s paws after every walk?',
        a: 'Yes - the Paw Cleaner is a no-rinse, daily-use formula made to be used after every walk. Urban walks leave more on paws than visible mud: construction dust, monsoon bacteria and road residue all travel inside on your dog’s pads. The [Walk Ritual Kit](/products/walk-ritual-kit) pairs it with Defense before the walk and Refreshing Mist to finish.',
      },
      {
        q: 'Is it safe if my dog licks its paws?',
        a: 'It is formulated without anything unsafe if licked - no synthetic surfactants, parabens, MIT or synthetic fragrance. For external use only; if irritation occurs, stop using it and consult your vet.',
      },
      {
        q: 'What is in the paw cleaner?',
        a: 'Aloe vera, oat extract, calendula, witch hazel water, panthenol (pro-vitamin B5) and allantoin, with salt, baking soda and spearmint for a naturally cooling, deodorising finish. As printed on the carton (INCI): Aqua, Aloe Barbadensis Leaf Juice, Cocamidopropyl Betaine, Decyl Glucoside, Glycerin, Panthenol, Sodium Chloride, Sodium Bicarbonate, Leuconostoc/Radish Root Ferment Filtrate, Avena Sativa Kernel Extract, Calendula Officinalis Flower Extract, Hamamelis Virginiana Water, Mentha Spicata Herb Oil, Allantoin, Citric Acid.',
      },
      {
        q: 'Can I use it on my cat?',
        a: 'No. The Paw Cleaner is for dogs only.',
      },
    ],
  },
  'anti-tick-flea-spray': {
    title: 'Natural Tick Spray for Dogs – Anti-Tick & Flea | Furrytail',
    description:
      'Natural tick & flea spray for dogs with vetiver, cypress and neem. No permethrin, pyrethroids, DEET or fipronil. Spray before every walk. 100 ml.',
    faqs: [
      {
        q: 'Is it good for travelling with my pet?',
        a: "Yes - a new place means new grass and new trails. Spray before walks in places your dog hasn’t been, and let it dry completely before walking. 100 ml, for dogs. See [travel essentials](/travel-essentials), or get all four in the [Travel Kit](/products/travel-kit-bundle).",
      },
      {
        q: 'Is this a natural tick repellent for dogs?',
        a: 'Yes - it helps deter ticks and fleas through scent. Vetiver root oil and cypress oil are plant-derived aromatic compounds that ticks and fleas actively avoid, and neem extract adds a biological deterrent layer. What’s out of it: permethrin, synthetic pyrethroids, DEET, fipronil and synthetic pesticides.',
      },
      {
        q: 'How do I use tick spray on my dog?',
        a: 'Shake well. Hold 20 cm from the coat and apply 6–8 sprays across the back, flanks and base of the tail, avoiding the eyes and mouth. Let it dry completely before walking, and repeat before each walk in tick-active environments. The [Walk Ritual Kit](/products/walk-ritual-kit) pairs it with the Paw Cleaner and Refreshing Mist for after the walk.',
      },
      {
        q: 'Is it suitable for dogs with sensitive skin?',
        a: 'It is a sensitive-skin, pH-balanced formulation. For external use only; if irritation occurs, stop using it and consult your vet.',
      },
      {
        q: 'Does it kill or remove ticks?',
        a: 'No. It is a plant-derived repellent, not a medicated treatment. If you find a tick, [remove it carefully](/journal/ticks-fleas-and-the-indian-dog); for active tick or flea infections, consult your veterinarian.',
      },
      {
        q: 'What are the full ingredients?',
        a: 'As printed on the carton (INCI): Aqua, Aloe Barbadensis Leaf Juice, Azadirachta Indica Leaf Extract, Glycerin, Caprylyl/Capryl Glucoside, Leuconostoc/Radish Root Ferment Filtrate, Vetiveria Zizanoides Root Oil, Chamaecyparis Obtusa Leaf Oil, Eucalyptus Globulus Leaf Oil, Citric Acid.',
      },
      {
        q: 'Can I use it on street dogs or puppies?',
        a: 'It is made for dogs; for street and community dogs the same directions apply, and a dog with an active infection needs a vet rather than a repellent. Check with your vet before using it on a puppy. It is not for cats.',
      },
    ],
  },
};
