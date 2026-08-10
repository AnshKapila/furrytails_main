import {
  allProducts,
  bestSellers,
  brandPhilosophy,
  brandStory,
  contact,
  footer,
  founderNote,
  hero,
  heroImages,
  ingredientChapters,
  ingredientStories,
  LOGO_URL,
  navLinks,
  ourRange,
  pillars,
} from '@/data/home';

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface WooImage {
  src: string;
  alt: string;
}

export interface WooProductVariant {
  id: string;
  label: string;
  price: string;
  standardPrice?: string;
  shortDesc?: string;
  image?: WooImage;
}

export interface WooProduct {
  id: string;
  name: string;
  price?: string;
  standardPrice?: string;
  badge?: string;
  isNew?: boolean;
  category?: string;
  image?: WooImage;
  hoverImage?: WooImage;
  rating?: number;
  reviews?: number;
  variantLabel?: string;
  volume?: string;
  variants?: WooProductVariant[];
  slug?: string;
  shortDesc?: string;
  descriptor?: string;
  productType?: string;
  species?: 'dog' | 'cat' | 'both';
  ingredients?: string[];
  benefits?: string[];
  howToUse?: string[];
}

export interface WooShopContent {
  eyebrow: string;
  heading: string;
  subheading: string;
  filterCategories: readonly string[];
  filterPets: readonly string[];
  filterTypes: readonly string[];
}

export interface WooGlobalSettings {
  logoUrl: string;
  navLinks: Array<{ label: string; href: string }>;
  footer: typeof footer;
  contact: typeof contact;
}

export interface WooHomeContent {
  hero: typeof hero;
  heroImages: typeof heroImages;
  bestSellers: {
    eyebrow: string;
    heading: string;
    subheading: string;
    products: WooProduct[];
  };
  brandPhilosophy: typeof brandPhilosophy;
  pillars: typeof pillars;
  founderNote: typeof founderNote;
  ourRange: {
    eyebrow: string;
    heading: string;
    products: WooProduct[];
  };
}

// ─── Data Fetching Functions ──────────────────────────────────────────────────

/**
 * Get global layout settings (Navbar, Footer, Contact info)
 */
export function getGlobalSettings(): WooGlobalSettings {
  return {
    logoUrl: LOGO_URL,
    navLinks: navLinks,
    footer: footer,
    contact: contact,
  };
}

/**
 * Get homepage specific content
 */
export function getHomeContent(): WooHomeContent {
  return {
    hero: hero,
    heroImages: heroImages,
    bestSellers: bestSellers as unknown as { eyebrow: string; heading: string; subheading: string; products: WooProduct[] },
    brandPhilosophy: brandPhilosophy,
    pillars: pillars,
    founderNote: founderNote,
    ourRange: ourRange as unknown as { eyebrow: string; heading: string; products: WooProduct[] },
  };
}

/**
 * Get Shop page metadata and filters
 */
export function getShopContent(): WooShopContent {
  return {
    eyebrow: allProducts.eyebrow,
    heading: allProducts.heading,
    subheading: allProducts.subheading,
    filterCategories: allProducts.filterCategories,
    filterPets: allProducts.filterPets,
    filterTypes: allProducts.filterTypes,
  };
}

/**
 * Get all products
 */
export function getAllProducts(): WooProduct[] {
  return allProducts.products as WooProduct[];
}

/**
 * Get product by ID
 */
export function getProductById(id: string): WooProduct | undefined {
  const products = getAllProducts();
  return products.find((p) => p.id === id);
}

/**
 * Get About (Our Story) page content
 */
export function getAboutContent() {
  return {
    brandStory: brandStory,
  };
}

/**
 * Get Ingredients page content
 */
export function getIngredientsContent() {
  return {
    chapters: ingredientChapters,
    stories: ingredientStories,
  };
}
