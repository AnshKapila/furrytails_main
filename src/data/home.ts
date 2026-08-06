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

export const ingredientStories = {
  eyebrow: 'What goes in',
  heading: 'Nature behind every formula.',
  body: 'Every ingredient earns its place. Nothing added for fragrance alone, nothing left in because it was easier to keep.',
  cta: 'How we source',
  ctaHref: '/about#how-we-source',
  stories: [
    {
      index: 0,
      ingredient: 'White Tea',
      // Short intro — two lines max, always visible
      shortIntro: 'White tea is one of the most gentle antioxidants available. It protects the coat from oxidative stress without stripping natural oils.',
      // Three botanical benefits — revealed on hover (desktop) / always visible (mobile)
      benefits: [
        'Shields the coat from daily oxidative stress',
        'Soothes the scalp without disrupting natural oils',
        'Leaves the fur calm, soft and honestly clean',
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
      ingredient: 'Sandalwood',
      shortIntro: 'Sandalwood is one of the oldest aromatic woods in recorded use. Its warmth is soft and long-lasting on fabric and fur.',
      benefits: [
        'Warm base note that lingers gently after the wash',
        'Calms the senses without masking the natural coat scent',
        'Sourced responsibly, used with restraint',
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
      index: 2,
      ingredient: 'Vetiver',
      shortIntro: 'Extracted from the root of a grass native to India. Vetiver has been used as a natural insect deterrent for generations — steadily, not aggressively.',
      benefits: [
        'Disrupts tick and flea activity as a natural scent barrier',
        'Grounded, woody character that stays calm on the coat',
        'Gentle on sensitive skin — no harsh chemical residue',
      ],
      product: 'Anti-Tick & Flea Spray',
      productId: 'anti-tick-flea-spray',
      productDesc: 'Natural everyday protection. Vetiver & Cypress.',
      price: '\u20b9595',
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
      index: 3,
      ingredient: 'Spearmint',
      shortIntro: 'A milder alternative to peppermint — cooling and antiseptic without the harshness that irritates sensitive paw skin.',
      benefits: [
        'Cools and soothes paw pads after walks',
        'Mild antiseptic action without skin irritation',
        'Pairs with sea salt to gently draw out moisture and debris',
      ],
      product: 'Paw Cleaner',
      productId: 'paw-cleaner',
      productDesc: 'Clean paws after every walk. Spearmint & Sea Salt.',
      price: '\u20b9495',
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
      index: 4,
      ingredient: 'Coconut-Derived Cleansing Agents',
      shortIntro: 'Plant-derived cleansing ingredients chosen for gentle everyday use.',
      benefits: [
        'Mild cleansing action that does not strip the coat',
        'Gentle enough for frequent use and sensitive skin',
        'A soft, natural lather without harsh synthetic sulfates',
      ],
      product: 'Gentle Daily Shampoo',
      productId: 'gentle-daily-shampoo',
      productDesc: 'Daily cleansing for dogs and cats. Santal & White Tea.',
      price: '₹695',
      ingredientImage: {
        src: '/ingredient-coconut.jpg',
        alt: 'Macro botanical photography of fresh white coconut flesh and a subtle ceramic bowl',
      },
      productImage: {
        src: 'https://static.kite.ai/image/upload/v1785648889/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/ueua3svmrxa4n1awqytg.png',
        alt: 'Gentle Daily Shampoo — Santal & White Tea',
      },
    },
    {
      index: 5,
      ingredient: 'Vitamin E',
      shortIntro: 'An antioxidant ingredient that helps support skin and coat conditioning.',
      benefits: [
        'Potent antioxidant support against environmental stress',
        'Helps condition and soften the skin',
        'Supports overall coat health and natural shine',
      ],
      product: 'Gentle Daily Shampoo',
      productId: 'gentle-daily-shampoo',
      productDesc: 'Daily cleansing for dogs and cats. Santal & White Tea.',
      price: '₹695',
      ingredientImage: {
        src: '/ingredient-vitamin-e.jpg',
        alt: 'Macro botanical photography of golden amber oil drops on a natural wood surface',
      },
      productImage: {
        src: 'https://static.kite.ai/image/upload/v1785648889/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/ueua3svmrxa4n1awqytg.png',
        alt: 'Gentle Daily Shampoo — Santal & White Tea',
      },
    },
    {
      index: 6,
      ingredient: 'Leuconostoc / Radish Root Ferment Filtrate',
      shortIntro: 'A naturally derived probiotic preservation ingredient used in place of conventional synthetic preservatives.',
      benefits: [
        'Provides naturally derived preservation for the formula',
        'Helps maintain long-term product stability safely',
        'Supports the brand’s strict probiotic preservation philosophy',
      ],
      product: 'Gentle Daily Shampoo',
      productId: 'gentle-daily-shampoo',
      productDesc: 'Daily cleansing for dogs and cats. Santal & White Tea.',
      price: '₹695',
      ingredientImage: {
        src: '/ingredient-radish-root.jpg',
        alt: 'Macro botanical photography of delicate sliced radish root next to a minimalist ceramic vessel',
      },
      productImage: {
        src: 'https://static.kite.ai/image/upload/v1785648889/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/ueua3svmrxa4n1awqytg.png',
        alt: 'Gentle Daily Shampoo — Santal & White Tea',
      },
    },
  ],
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
