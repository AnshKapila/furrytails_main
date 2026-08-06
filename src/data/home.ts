// ─────────────────────────────────────────────────────────────────────────────
// Furrytail — homepage content data
// ─────────────────────────────────────────────────────────────────────────────

export const LOGO_URL =
  'https://static.kite.ai/image/upload/c_crop,x_0.000,y_0.000,w_1.000,h_1.000/v1785039071/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/p40hxhe6ojzmmsib6v6z.png';

// ── Navbar ──────────────────────────────────────────────────────────────────

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/#contact' },
];

// ── Hero ─────────────────────────────────────────────────────────────────────

export const hero = {
  eyebrow: 'Natural care, considered',
  headline: 'A new morning ritual,',
  headlineEm: 'for you and your dog.',
  body:
    'Real ingredients. No filler. No hype. A considered range of daily care pet products held to your standard, made for theirs.',
  primaryCta: 'Shop Collection',
  secondaryCta: 'Our Story',
};

// Five portrait-format hero images — approved mascot-consistent assets
export const heroImages = [
  {
    src: 'https://static.kite.ai/image/upload/v1785527943/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/iter3/hero-labrador-window-r1.png',
    alt: 'Labrador resting in early sunlight beside a linen curtain',
  },
  {
    src: 'https://static.kite.ai/image/upload/v1785527942/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/iter3/hero-tabby-linen-r1.png',
    alt: 'Tabby cat on soft linen',
  },
  {
    src: 'https://static.kite.ai/image/upload/v1785527942/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/iter3/hero-labrador-hands-r1.png',
    alt: 'Labrador receiving gentle care as part of a morning ritual',
  },
  {
    src: 'https://static.kite.ai/image/upload/v1785527942/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/iter3/hero-tabby-sun-r1.png',
    alt: 'Tabby cat stretching in soft morning sunlight',
  },
  {
    src: 'https://static.kite.ai/image/upload/v1785527942/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/iter3/hero-labrador-garden-r1.png',
    alt: 'Labrador among sage green garden leaves',
  },
];

// ── Trust / Commitment statements ────────────────────────────────────────────

export const trustStatements = [
  {
    heading: 'What you see is what is in it',
    body: 'Every ingredient is listed in full, by name, with a reason for being there. Nothing hidden, nothing padded.',
    icon: 'eye',
    image: {
      src: 'https://static.kite.ai/image/upload/v1785347282/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/iter4/trust-ingredients.png',
      alt: 'Glass dropper bottle beside an ingredient list on cream paper',
    },
  },
  {
    heading: 'We tell you when something is out',
    body: 'If a product is sold out or a batch is delayed, we say so clearly. You should not have to guess.',
    icon: 'check',
    image: {
      src: 'https://static.kite.ai/image/upload/v1785347261/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/iter4/trust-stock.png',
      alt: 'Empty product shelf in warm minimal light',
    },
  },
  {
    heading: 'Small batches, real oversight',
    body: 'We make less on purpose so we can check everything ourselves. Volume is not the goal.',
    icon: 'batch',
    image: {
      src: 'https://static.kite.ai/image/upload/v1785347261/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/iter4/trust-batches.png',
      alt: 'Hands measuring dried botanicals into a glass jar',
    },
  },
  {
    heading: 'No vet endorsements for sale',
    body: 'If a vet recommends our products, it is because they chose to. We do not pay for endorsements.',
    icon: 'shield',
    image: {
      src: 'https://static.kite.ai/image/upload/v1785347261/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/iter4/trust-endorsements.png',
      alt: "Veterinarian's hands gently examining a golden retriever",
    },
  },
];

// ── Best Sellers (Connection section) ───────────────────────────────────────
// Shows 4 of the 5 product families as a homepage introduction.
// The full range (all 5 families / 7 SKUs) lives on /shop.

export const bestSellers = {
  eyebrow: 'A place to start',
  heading: 'Where most people begin',
  subheading:
    'A small selection to introduce the range. Each one made with the same care as everything else we do.',
  products: [
    {
      id: 'gentle-daily-shampoo',
      name: 'Gentle Daily Shampoo',
      category: 'Daily Ritual',
      productType: 'Shampoo' as const,
      species: 'both' as const,
      volume: '300 ml',
      shortDesc: 'Daily cleansing for dogs and cats. Three fragrances. 300 ml.',
      price: '₹695',
      standardPrice: null,
      foundingPriceLabel: null,
      badge: null,
      image: {
        src: 'https://static.kite.ai/image/upload/v1785648855/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/j2sgtsiamihlvbryljwr.png',
        alt: 'Gentle Daily Shampoo — Fig & Neroli',
      },
      variants: [
        {
          id: 'santal-white-tea',
          label: 'Santal & White Tea',
          price: '₹695',
          standardPrice: null,
          shortDesc: 'Warm wood and pale tea. Calm and grounding — a scent that lingers gently after the wash.',
          image: {
            src: 'https://static.kite.ai/image/upload/v1785648889/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/ueua3svmrxa4n1awqytg.png',
            alt: 'Gentle Daily Shampoo — Santal & White Tea',
          },
        },
        {
          id: 'fig-neroli',
          label: 'Fig & Neroli',
          price: '₹695',
          standardPrice: null,
          shortDesc: 'Warm fig with a bright neroli note. A considered scent for the daily routine.',
          image: {
            src: 'https://static.kite.ai/image/upload/v1785648855/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/j2sgtsiamihlvbryljwr.png',
            alt: 'Gentle Daily Shampoo — Fig & Neroli',
          },
        },
        {
          id: 'hinoki-bamboo',
          label: 'Hinoki & Bamboo',
          price: '₹695',
          standardPrice: null,
          shortDesc: 'Clean and quietly green. A cool, forested note for daily washing.',
          image: {
            src: 'https://static.kite.ai/image/upload/v1785648855/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/j2sgtsiamihlvbryljwr.png',
            alt: 'Gentle Daily Shampoo — Hinoki & Bamboo',
          },
        },
      ],
    },
    {
      id: 'anti-tick-flea-spray',
      name: 'Anti-Tick & Flea Spray',
      category: 'Defense',
      productType: 'Spray' as const,
      species: 'dog' as const,
      volume: '100 ml',
      shortDesc: 'Natural everyday protection. Vetiver & Cypress. 100 ml.',
      price: '₹595',
      standardPrice: null,
      foundingPriceLabel: null,
      badge: null,
      variantLabel: 'Vetiver & Cypress',
      image: {
        src: 'https://static.kite.ai/image/upload/v1785648902/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/t6q1d4qrm398solinpel.png',
        alt: 'Anti-Tick & Flea Spray — Vetiver & Cypress',
      },
    },
    {
      id: 'paw-cleaner',
      name: 'Paw Cleaner',
      category: 'Remedy',
      productType: 'Cleaner' as const,
      species: 'dog' as const,
      volume: '150 ml',
      shortDesc: 'Clean paws after every walk. Spearmint & Sea Salt. 150 ml.',
      price: '₹495',
      standardPrice: null,
      foundingPriceLabel: null,
      badge: null,
      variantLabel: 'Spearmint & Sea Salt',
      image: {
        src: 'https://static.kite.ai/image/upload/v1785646596/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/iter5/our-range-paw-cleaner.png',
        alt: 'Paw Cleaner — Spearmint & Sea Salt',
      },
    },
    {
      id: 'dry-foam-shampoo',
      name: 'Dry Foam Shampoo',
      category: 'Refresh',
      productType: 'Shampoo' as const,
      species: 'dog' as const,
      volume: '150 ml',
      shortDesc: 'Waterless cleanse between baths. Mimosa & Tonka. 150 ml.',
      price: '₹595',
      standardPrice: null,
      foundingPriceLabel: null,
      badge: null,
      variantLabel: 'Mimosa & Tonka',
      image: {
        src: 'https://static.kite.ai/image/upload/v1785646597/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/iter5/our-range-dry-foam-shampoo.png',
        alt: 'Dry Foam Shampoo — Mimosa & Tonka',
      },
    },
  ],
};

// ── Brand story / Vision ─────────────────────────────────────────────────────

export const brandStory = {
  eyebrow: 'Why Furrytail exists',
  heading: 'Built for the relationship, not the routine.',
  body: [
    'Most pet care products are made around logistics. Shelf life, margin, packaging cost. The animal is an afterthought to the supply chain.',
    'It started with a dog that deserved better. Not marketing-better. Actually better. That meant fewer products, better sourced, made by someone who lives with animals rather than just selling to them.',
  ],
  image: {
    src: 'https://static.kite.ai/image/upload/v1785338589/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/iter4/about-brand-story.png',
    alt: 'A person gently grooming a small dog in warm morning light',
  },
};

export const brandPhilosophy = {
  eyebrow: 'WHY FURRYTAIL EXISTS',
  heading: 'Built for the relationship, not the routine.',
  body: [
    'Most pet care products are designed around logistics.',
    'Shelf life.',
    'Margins.',
    'Packaging.',
    'The animal often comes second.',
    'We started somewhere else.',
    'With the quiet moments people share with the animals they love.',
    'Everything we create begins there.',
    'Not with trends.',
    'Not with marketing.',
    'With better ingredients.',
    'Fewer products.',
    'And everyday rituals that respect both the pet and the person caring for them.',
  ],
  closing: 'Better ingredients. Fewer products. Nothing unnecessary.',
  image: {
    src: '/brand_philosophy_garden_lifestyle_1786042533875.jpg',
    alt: 'A peaceful private garden morning where an owner gently strokes an adult Yellow Labrador Retriever affectionately leaning on them, while a fluffy orange cat plays with a tennis ball nearby.',
  },
};

// ── Four Pillars ─────────────────────────────────────────────────────────────

export const pillars = [
  {
    id: 'ritual',
    name: 'Ritual',
    tagline: 'Daily care as a considered habit.',
    body: 'Morning supplements, coat oils, and daily routines designed to work quietly in the background of a day you already have.',
    image: {
      src: 'https://static.kite.ai/image/upload/v1785571363/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/iter3/pillar-ritual-bath-r2.png',
      alt: 'Ritual bath products arranged on a warm surface',
    },
    cta: 'Shop Ritual',
    href: '/shop?ritual=Daily%20Ritual',
  },
  {
    id: 'defense',
    name: 'Defense',
    tagline: 'Protection from the outside in.',
    body: 'Balms, barriers, and seasonal shields. For the dog that runs through everything and the cat that sits in the sun too long.',
    image: {
      src: 'https://static.kite.ai/image/upload/v1785571363/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/iter3/pillar-defense-entry-r2.png',
      alt: 'Entry mat with paw care products beside a door',
    },
    cta: 'Shop Defense',
    href: '/shop?ritual=Defense',
  },
  {
    id: 'remedy',
    name: 'Remedy',
    tagline: 'For when something needs to settle.',
    body: 'Botanical blends for anxious days, sore patches, and the kind of restlessness that just needs something calm and considered to help.',
    image: {
      src: 'https://static.kite.ai/image/upload/v1785571363/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/iter3/pillar-remedy-paw-r2.png',
      alt: 'Gentle paw care and remedy products on a linen surface',
    },
    cta: 'Shop Remedy',
    href: '/shop?ritual=Remedy',
  },
  {
    id: 'refresh',
    name: 'Refresh',
    tagline: 'Between washes, after walks.',
    body: 'Coat mists, rinses, and dry-day fresheners. Not to mask the dog smell. Just to keep things clean and calm.',
    image: {
      src: 'https://static.kite.ai/image/upload/v1785571363/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/iter3/pillar-refresh-livingroom-r2.png',
      alt: 'Living room setting with refresh products on a side table',
    },
    cta: 'Shop Refresh',
    href: '/shop?ritual=Refresh',
  },
];

// ── Our Range (homepage exhibition gallery) ──────────────────────────────────
// Five products shown as the curated range introduction on the homepage.
// No prices, badges, or variants shown in this section — those live on product pages.

export const ourRange = {
  eyebrow: 'Our range',
  heading: 'Five products, made with care.',
  products: [
    {
      id: 'gentle-daily-shampoo',
      name: 'Gentle Daily Shampoo',
      descriptor: 'Daily cleansing for sensitive coats',
      image: {
        src: 'https://static.kite.ai/image/upload/v1785648855/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/j2sgtsiamihlvbryljwr.png',
        alt: 'Gentle Daily Shampoo — Fig & Neroli',
      },
    },
    {
      id: 'anti-tick-flea-spray',
      name: 'Anti-Tick & Flea Spray',
      descriptor: 'Natural everyday protection',
      image: {
        src: 'https://static.kite.ai/image/upload/v1785648902/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/t6q1d4qrm398solinpel.png',
        alt: 'Anti-Tick & Flea Spray',
      },
    },
    {
      id: 'paw-cleaner',
      name: 'Paw Cleaner',
      descriptor: 'Clean paws after every adventure',
      image: {
        src: 'https://static.kite.ai/image/upload/v1785646596/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/iter5/our-range-paw-cleaner.png',
        alt: 'Paw Cleaner container on warm ivory background',
      },
    },
    {
      id: 'dry-foam-shampoo',
      name: 'Dry Foam Shampoo',
      descriptor: 'Quick cleansing between baths',
      image: {
        src: 'https://static.kite.ai/image/upload/v1785646597/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/iter5/our-range-dry-foam-shampoo.png',
        alt: 'Dry Foam Shampoo canister on warm ivory background',
      },
    },
    {
      id: 'refreshing-mist',
      name: 'Refreshing Mist',
      descriptor: 'Fresh coat finishing spray',
      image: {
        src: 'https://static.kite.ai/image/upload/v1785646598/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/iter5/our-range-refreshing-mist.png',
        alt: 'Refreshing Mist spray bottle on warm ivory background',
      },
    },
  ],
};

// ── All Products ─────────────────────────────────────────────────────────────
// Authoritative product database — 5 product families, 7 purchasable SKUs.
// Collection pages (shop) show all 7 SKUs; homepage shows 5 family cards.
// Do not add, remove, rename, or re-price products outside this definition.

export const allProducts = {
  eyebrow: 'Full range',
  heading: 'Everything we make',
  subheading: 'A small range made for the standard. Nothing is here because we had a slot to fill.',
  // Filter dimensions supported by the shop page
  filterCategories: ['All', 'Daily Ritual', 'Defense', 'Remedy', 'Refresh'] as const,
  filterPets: ['All pets', 'Dogs', 'Cats'] as const,
  filterTypes: ['All types', 'Shampoo', 'Spray', 'Cleaner', 'Mist'] as const,
  products: [
    // ── 1. Gentle Daily Shampoo — 3 fragrance variants ──────────────────────
    {
      id: 'gentle-daily-shampoo',
      name: 'Gentle Daily Shampoo',
      category: 'Daily Ritual',
      productType: 'Shampoo' as const,
      species: 'both' as const,
      volume: '300 ml',
      shortDesc: 'A shampoo made for daily use — gentle enough for every wash, with fragrances that are quiet rather than loud. Leaves the coat clean, soft, and honestly fresh.',
      price: '₹695',
      standardPrice: null,
      foundingPriceLabel: null,
      badge: null,
      image: {
        src: 'https://static.kite.ai/image/upload/v1785648855/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/j2sgtsiamihlvbryljwr.png',
        alt: 'Gentle Daily Shampoo — Fig & Neroli',
      },
      variants: [
        {
          id: 'santal-white-tea',
          label: 'Santal & White Tea',
          price: '₹695',
          standardPrice: null,
          shortDesc: 'Warm wood and pale tea. Calm and grounding — a scent that lingers gently after the wash.',
          image: {
            src: 'https://static.kite.ai/image/upload/v1785648889/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/ueua3svmrxa4n1awqytg.png',
            alt: 'Gentle Daily Shampoo — Santal & White Tea',
          },
        },
        {
          id: 'fig-neroli',
          label: 'Fig & Neroli',
          price: '₹695',
          standardPrice: null,
          shortDesc: 'Warm fig with a bright neroli note. A considered scent for the daily routine.',
          image: {
            src: 'https://static.kite.ai/image/upload/v1785648855/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/j2sgtsiamihlvbryljwr.png',
            alt: 'Gentle Daily Shampoo — Fig & Neroli',
          },
        },
        {
          id: 'hinoki-bamboo',
          label: 'Hinoki & Bamboo',
          price: '₹695',
          standardPrice: null,
          shortDesc: 'Clean and quietly green. A cool, forested note for daily washing.',
          image: {
            src: 'https://static.kite.ai/image/upload/v1785648855/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/j2sgtsiamihlvbryljwr.png',
            alt: 'Gentle Daily Shampoo — Hinoki & Bamboo',
          },
        },
      ],
    },

    // ── 2. Anti-Tick & Flea Spray ────────────────────────────────────────────
    {
      id: 'anti-tick-flea-spray',
      name: 'Anti-Tick & Flea Spray',
      category: 'Defense',
      productType: 'Spray' as const,
      species: 'dog' as const,
      volume: '100 ml',
      shortDesc: 'Everyday protection from ticks and fleas. Vetiver & Cypress — a grounded, woody scent that stays calm on the coat.',
      price: '₹595',
      standardPrice: null,
      foundingPriceLabel: null,
      badge: null,
      variantLabel: 'Vetiver & Cypress',
      image: {
        src: 'https://static.kite.ai/image/upload/v1785648902/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/t6q1d4qrm398solinpel.png',
        alt: 'Anti-Tick & Flea Spray — Vetiver & Cypress',
      },
    },

    // ── 3. Paw Cleaner ───────────────────────────────────────────────────────
    {
      id: 'paw-cleaner',
      name: 'Paw Cleaner',
      category: 'Remedy',
      productType: 'Cleaner' as const,
      species: 'dog' as const,
      volume: '150 ml',
      shortDesc: 'Cleans and soothes paw pads after walks. Spearmint & Sea Salt — cool, clean, and mild on skin.',
      price: '₹495',
      standardPrice: null,
      foundingPriceLabel: null,
      badge: null,
      variantLabel: 'Spearmint & Sea Salt',
      image: {
        src: 'https://static.kite.ai/image/upload/v1785646596/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/iter5/our-range-paw-cleaner.png',
        alt: 'Paw Cleaner — Spearmint & Sea Salt',
      },
    },

    // ── 4. Dry Foam Shampoo ──────────────────────────────────────────────────
    {
      id: 'dry-foam-shampoo',
      name: 'Dry Foam Shampoo',
      category: 'Refresh',
      productType: 'Shampoo' as const,
      species: 'dog' as const,
      volume: '150 ml',
      shortDesc: 'Waterless cleanse between baths. Mimosa & Tonka — a soft, warm dry-foam that leaves the coat fresh without rinsing.',
      price: '₹595',
      standardPrice: null,
      foundingPriceLabel: null,
      badge: null,
      variantLabel: 'Mimosa & Tonka',
      image: {
        src: 'https://static.kite.ai/image/upload/v1785646597/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/iter5/our-range-dry-foam-shampoo.png',
        alt: 'Dry Foam Shampoo — Mimosa & Tonka',
      },
    },

    // ── 5. Refreshing Mist ───────────────────────────────────────────────────
    {
      id: 'refreshing-mist',
      name: 'Refreshing Mist',
      category: 'Refresh',
      productType: 'Mist' as const,
      species: 'dog' as const,
      volume: '120 ml',
      shortDesc: 'A finishing coat mist for between walks. Yuzu & White Musk — bright citrus with a soft, skin-close base.',
      price: '₹545',
      standardPrice: null,
      foundingPriceLabel: null,
      badge: null,
      variantLabel: 'Yuzu & White Musk',
      image: {
        src: 'https://static.kite.ai/image/upload/v1785646598/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/iter5/our-range-refreshing-mist.png',
        alt: 'Refreshing Mist — Yuzu & White Musk',
      },
    },
  ],
};

// ── Founder note (Trust section 2) ───────────────────────────────────────────

export const founderNote = {
  eyebrow: 'From Bhargav',
  pullQuote:
    'I am not trying to build the largest pet care brand. I am trying to build the most honest one.',
  body:
    'When people try Furrytail, I will share their words here — without editing them, without cherry-picking. For now, this is where I hold that intention.',
  attribution: 'Bhargav Das, Furrytail',
};

// ── Contact ───────────────────────────────────────────────────────────────────

export const contact = {
  eyebrow: 'Get in touch',
  heading: 'A question about a product, an ingredient, or just your dog?',
  body: 'We read every message ourselves. Response time is honest: usually within a day, sometimes two.',
  image: {
    src: 'https://static.kite.ai/image/upload/v1785874976/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/n8rqhsnd5pdofsbgn0gr.png',
    alt: 'Golden retriever looking up in warm morning light',
  },
};

// ── Nature Behind Every Formula — ingredient stories ────────────────────────
// Four stories powering the scroll-pinned FeaturedIngredients section on the homepage.
// Each story introduces one botanical ingredient and maps to its featured product.
// Product names, IDs, and prices are the factual source of truth — do not alter them.

export const ingredientChapters = [
  {
    id: 'chapter-1',
    chapterNumber: 'Chapter 01',
    title: 'Botanical Actives',
    subtitle: 'Ingredients chosen primarily for skin and coat wellness.',
    stories: [
      {
        index: 0,
        ingredient: 'White Tea',
        shortIntro: 'Chosen for its gentle antioxidant character and daily protection against environmental stress.',
        benefits: [
          'Shields coat from daily environmental stress',
          'Soothes delicate skin without stripping oils',
          'Leaves fur soft and naturally balanced',
        ],
        product: 'Gentle Daily Shampoo',
        productId: 'gentle-daily-shampoo',
        productDesc: 'Daily cleansing for dogs and cats. Santal & White Tea.',
        price: '₹695',
        ingredientImage: {
          src: 'https://static.kite.ai/image/upload/v1785786928/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/iter3/ingredient-white-tea-editorial-r2.png',
          alt: 'White tea leaves arranged on a warm stone surface',
        },
        productImage: {
          src: 'https://static.kite.ai/image/upload/v1785648889/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/ueua3svmrxa4n1awqytg.png',
          alt: 'Gentle Daily Shampoo — Santal & White Tea',
        },
      },
      {
        index: 1,
        ingredient: 'Vitamin E',
        shortIntro: 'Selected for its nourishing depth that restores moisture to dry skin and fur.',
        benefits: [
          'Deeply nourishes dry skin and coat fibers',
          'Restores natural coat flexibility and shine',
          'Fortifies skin against daily moisture loss',
        ],
        product: 'Gentle Daily Shampoo',
        productId: 'gentle-daily-shampoo',
        productDesc: 'Daily cleansing for dogs and cats. Santal & White Tea.',
        price: '₹695',
        ingredientImage: {
          src: '/ingredient-vitamin-e.jpg',
          alt: 'Golden amber oil drops on a natural wood surface',
        },
        productImage: {
          src: 'https://static.kite.ai/image/upload/v1785648889/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/ueua3svmrxa4n1awqytg.png',
          alt: 'Gentle Daily Shampoo — Santal & White Tea',
        },
      },
    ],
  },
  {
    id: 'chapter-2',
    chapterNumber: 'Chapter 02',
    title: 'Botanical Aromatics',
    subtitle: "Ingredients selected to shape each product's sensory identity.",
    stories: [
      {
        index: 2,
        ingredient: 'Fig',
        shortIntro: 'Chosen for its lush, green warmth that imparts a subtle botanical sweetness.',
        benefits: [
          'Subtle green aroma with soft sweetness',
          'Hydrates coat fibers with botanical sap',
          'Leaves a clean, velvety finish',
        ],
        product: 'Gentle Daily Shampoo',
        productId: 'gentle-daily-shampoo',
        productDesc: 'Daily cleansing for dogs and cats. Fig & Neroli.',
        price: '₹695',
        ingredientImage: {
          src: '/ingredient-fig.jpg',
          alt: 'Fresh split fig resting on a warm travertine surface',
        },
        productImage: {
          src: 'https://static.kite.ai/image/upload/v1785648855/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/j2sgtsiamihlvbryljwr.png',
          alt: 'Gentle Daily Shampoo — Fig & Neroli',
        },
      },
      {
        index: 3,
        ingredient: 'Neroli',
        shortIntro: 'Selected for its delicate orange blossom notes that calm both pet and coat.',
        benefits: [
          'Delicate blossom scent that relaxes during grooming',
          'Soothes dry skin with gentle flora',
          'Uplifts coat freshness with subtle clarity',
        ],
        product: 'Gentle Daily Shampoo',
        productId: 'gentle-daily-shampoo',
        productDesc: 'Daily cleansing for dogs and cats. Fig & Neroli.',
        price: '₹695',
        ingredientImage: {
          src: '/ingredient-neroli.jpg',
          alt: 'Delicate white neroli blossom flowers on warm linen',
        },
        productImage: {
          src: 'https://static.kite.ai/image/upload/v1785648855/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/j2sgtsiamihlvbryljwr.png',
          alt: 'Gentle Daily Shampoo — Fig & Neroli',
        },
      },
      {
        index: 4,
        ingredient: 'Sandalwood',
        shortIntro: 'Chosen for its grounding warmth that lingers softly on the coat long after washing.',
        benefits: [
          'Warm base note that lingers gently after grooming',
          'Calms senses without masking natural scents',
          'Sourced responsibly and formulated with restraint',
        ],
        product: 'Gentle Daily Shampoo',
        productId: 'gentle-daily-shampoo',
        productDesc: 'Daily cleansing for dogs and cats. Santal & White Tea.',
        price: '₹695',
        ingredientImage: {
          src: 'https://static.kite.ai/image/upload/v1785786926/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/iter3/ingredient-sandalwood-editorial-r2.png',
          alt: 'Sandalwood bark and shavings in warm editorial light',
        },
        productImage: {
          src: 'https://static.kite.ai/image/upload/v1785648889/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/ueua3svmrxa4n1awqytg.png',
          alt: 'Gentle Daily Shampoo — Santal & White Tea',
        },
      },
      {
        index: 5,
        ingredient: 'Vetiver',
        shortIntro: 'Selected for its earthy quietness and natural heritage as a gentle coat shield.',
        benefits: [
          'Earthy root essence that grounds the blend',
          'Natural heritage protection for outdoors',
          'Calms sensitive coats without heavy residue',
        ],
        product: 'Anti-Tick & Flea Spray',
        productId: 'anti-tick-flea-spray',
        productDesc: 'Natural everyday protection. Vetiver & Cypress.',
        price: '₹595',
        ingredientImage: {
          src: 'https://static.kite.ai/image/upload/v1785786927/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/iter3/ingredient-vetiver-editorial-r2.png',
          alt: 'Vetiver grass roots in rich earthy tones',
        },
        productImage: {
          src: 'https://static.kite.ai/image/upload/v1785648902/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/t6q1d4qrm398solinpel.png',
          alt: 'Anti-Tick & Flea Spray — Vetiver & Cypress',
        },
      },
      {
        index: 6,
        ingredient: 'Spearmint',
        shortIntro: 'Chosen for its subtle cooling touch that freshens paws gently without sting.',
        benefits: [
          'Mild cooling touch for sensitive paw pads',
          'Naturally refreshing botanical aroma',
          'Clean comfort for daily paw care',
        ],
        product: 'Paw Cleaner',
        productId: 'paw-cleaner',
        productDesc: 'Clean paws after every walk. Spearmint & Sea Salt.',
        price: '₹495',
        ingredientImage: {
          src: 'https://static.kite.ai/image/upload/v1785786927/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/iter3/ingredient-spearmint-editorial-r2.png',
          alt: 'Fresh spearmint leaves with soft natural light',
        },
        productImage: {
          src: 'https://static.kite.ai/image/upload/v1785646596/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/iter5/our-range-paw-cleaner.png',
          alt: 'Paw Cleaner — Spearmint & Sea Salt',
        },
      },
      {
        index: 7,
        ingredient: 'Yuzu',
        shortIntro: 'Chosen for its bright citrus radiance that naturally clarifies and revives.',
        benefits: [
          'Bright citrus note that revives fur',
          'Clarifies coat dullness without harsh stripping',
          'Imparts a light, sun-warmed botanical scent',
        ],
        product: 'Dry Foam Shampoo',
        productId: 'dry-foam-shampoo',
        productDesc: 'Waterless cleanse between baths. Mimosa & Tonka.',
        price: '₹595',
        ingredientImage: {
          src: '/ingredient-yuzu.jpg',
          alt: 'Fresh whole and sliced Yuzu fruit on warm matte ceramic',
        },
        productImage: {
          src: 'https://static.kite.ai/image/upload/v1785646597/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/iter5/our-range-dry-foam-shampoo.png',
          alt: 'Dry Foam Shampoo — Mimosa & Tonka',
        },
      },
    ],
  },
  {
    id: 'chapter-3',
    chapterNumber: 'Chapter 03',
    title: 'Formula Science',
    subtitle: 'Ingredients that explain our formulation philosophy.',
    stories: [
      {
        index: 8,
        ingredient: 'Coconut-Derived Cleansing Agents',
        shortIntro: 'Selected as a gentle plant alternative to harsh sulfates for pure, low-foaming care.',
        benefits: [
          'Gentle plant cleansing without stripping moisture',
          'Low-foaming rinse that leaves no residue',
          'Ideal for sensitive, easily irritated coats',
        ],
        product: 'Gentle Daily Shampoo',
        productId: 'gentle-daily-shampoo',
        productDesc: 'Daily cleansing for dogs and cats. Santal & White Tea.',
        price: '₹695',
        ingredientImage: {
          src: '/ingredient-coconut.jpg',
          alt: 'Fresh white coconut flesh and a subtle ceramic bowl',
        },
        productImage: {
          src: 'https://static.kite.ai/image/upload/v1785648889/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/ueua3svmrxa4n1awqytg.png',
          alt: 'Gentle Daily Shampoo — Santal & White Tea',
        },
      },
      {
        index: 9,
        ingredient: 'Probiotic Preservative',
        shortIntro: 'Chosen as a natural probiotic preserver in place of conventional synthetic chemicals.',
        benefits: [
          'Probiotic fermentation protects formula freshness',
          'Gentle alternative to harsh synthetic preservers',
          'Skin-friendly and microbiome supportive',
        ],
        product: 'Gentle Daily Shampoo',
        productId: 'gentle-daily-shampoo',
        productDesc: 'Daily cleansing for dogs and cats. Santal & White Tea.',
        price: '₹695',
        ingredientImage: {
          src: '/ingredient-radish-root.jpg',
          alt: 'Sliced radish root next to a minimalist ceramic vessel',
        },
        productImage: {
          src: 'https://static.kite.ai/image/upload/v1785648889/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/ueua3svmrxa4n1awqytg.png',
          alt: 'Gentle Daily Shampoo — Santal & White Tea',
        },
      },
    ],
  },
];

export const ingredientStories = {
  eyebrow: 'What goes in',
  heading: 'Nature behind every formula.',
  body: 'Every ingredient earns its place. Nothing added for fragrance alone, nothing left in because it was easier to keep.',
  cta: 'How we source',
  ctaHref: '/about#how-we-source',
  stories: ingredientChapters.flatMap((ch) => ch.stories),
};

// ── Footer ───────────────────────────────────────────────────────────────────

export const footer = {
  tagline: 'Natural care, considered.',
  shopLinks: [
    { label: 'All Products', href: '/shop' },
    { label: 'Ritual', href: '/shop?ritual=Daily%20Ritual' },
    { label: 'Defense', href: '/shop?ritual=Defense' },
    { label: 'Remedy', href: '/shop?ritual=Remedy' },
    { label: 'Refresh', href: '/shop?ritual=Refresh' },
  ],
  companyLinks: [
    { label: 'About', href: '/about' },
    { label: 'Our Ingredients', href: '/ingredients' },
    { label: 'How We Source', href: '/about#how-we-source' },
    { label: 'Contact', href: '/#contact' },
  ],
  legalLinks: [
    { label: 'Shipping & Returns', href: '/shipping' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Use', href: '#' },
    { label: 'Cookie Settings', href: '#' },
  ],
};
