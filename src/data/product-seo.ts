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
  /** INCI names of the fragrance botanicals, in carton order. */
  inciBotanicals: string;
}

const shampooFaqs = ({ fragrance, inciBotanicals }: ShampooFacts): Faq[] => [
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
    a: `Yes. ${fragrance} is IFRA-compliant, with no synthetic fragrance, and stays close to the coat for up to 48 hours as it dries softer and calmer.`,
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

export const PRODUCT_SEO: Record<string, ProductSeo> = {
  'gentle-daily-shampoo-santal-white-tea': {
    title: 'Santal & White Tea Sulphate-Free Dog Shampoo | Furrytail',
    description:
      'Sulphate-free dog & cat shampoo cleansed with amino acids, preserved with probiotics. pH-balanced for sensitive skin. Santal & White Tea, 250 ml.',
    faqs: shampooFaqs({
      fragrance: 'Santal & White Tea',
      inciBotanicals: 'Camellia Sinensis Leaf Extract, Santalum Album Oil',
    }),
  },
  'gentle-daily-shampoo-fig-neroli': {
    title: 'Fig & Neroli Sulphate-Free Dog Shampoo | Furrytail',
    description:
      'Sulphate-free dog & cat shampoo cleansed with amino acids, preserved with probiotics. pH-balanced for sensitive skin. Fig & Neroli, 250 ml.',
    faqs: shampooFaqs({
      fragrance: 'Fig & Neroli',
      inciBotanicals: 'Ficus Carica Fruit Extract, Citrus Aurantium Amara Flower Oil',
    }),
  },
  'gentle-daily-shampoo-violet-leaf-muslin': {
    title: 'Violet Leaf & Muslin Sulphate-Free Dog Shampoo | Furrytail',
    description:
      'Sulphate-free dog & cat shampoo cleansed with amino acids, preserved with probiotics. pH-balanced for sensitive skin. Violet Leaf & Muslin, 250 ml.',
    faqs: shampooFaqs({
      fragrance: 'Violet Leaf & Muslin',
      inciBotanicals: 'Viola Odorata Leaf Extract, Muslin Essential Oil',
    }),
  },
  'dry-foam-shampoo': {
    title: 'Dry Foam Shampoo – Waterless Dog & Cat Shampoo | Furrytail',
    description:
      'Waterless dry shampoo for dogs & cats: no-rinse, leave-on safe foam that absorbs surface oils and neutralises odour between baths. Hinoki & Bamboo.',
    faqs: [
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
      'A light dog perfume spray: fine coat mist in Yuzu & White Musk that dries in seconds, with a musk that lingers. For daily use between baths. 100 ml.',
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
        q: 'Is it a long-lasting dog perfume?',
        a: 'The bright yuzu opens on contact and fades first; the ambrette seed musk is warm and skin-close and lingers long after. It is a light mist by design - reapply between baths as needed.',
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
      'No-rinse dog paw cleaner foam with spearmint & sea salt, amino acid surfactants and probiotic preservation. Use after every walk. For dogs, 150 ml.',
    faqs: [
      {
        q: 'How do I use a paw cleaner on my dog?',
        a: 'Pump a small amount directly onto each paw or onto a damp cloth. Gently massage across each pad and between the toes, then wipe clean with a damp cloth or towel. No rinsing required. One pump, thirty seconds - done at the door.',
      },
      {
        q: 'Should I clean my dog’s paws after every walk?',
        a: 'Yes - the Paw Cleaner is a no-rinse, daily-use formula made to be used after every walk. Urban walks leave more on paws than visible mud: construction dust, monsoon bacteria and road residue all travel inside on your dog’s pads.',
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
        q: 'Is this a natural tick repellent for dogs?',
        a: 'Yes - it helps deter ticks and fleas through scent. Vetiver root oil and cypress oil are plant-derived aromatic compounds that ticks and fleas actively avoid, and neem extract adds a biological deterrent layer. What’s out of it: permethrin, synthetic pyrethroids, DEET, fipronil and synthetic pesticides.',
      },
      {
        q: 'How do I use tick spray on my dog?',
        a: 'Shake well. Hold 20 cm from the coat and apply 6–8 sprays across the back, flanks and base of the tail, avoiding the eyes and mouth. Let it dry completely before walking, and repeat before each walk in tick-active environments.',
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
