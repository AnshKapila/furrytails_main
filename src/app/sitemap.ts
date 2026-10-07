import type { MetadataRoute } from 'next';
import { getBaseUrl } from '../lib/site-url';
import { fetchProductSlugs, fetchProducts } from '../lib/woo';
import { JOURNAL_ARTICLES, articlePath } from '../lib/journal';

// Next.js serves this at `/sitemap.xml` automatically.
//
// Product URLs are pulled from WooCommerce so a product added in wp-admin
// appears here on the next revalidation, without a code change. fetchProductSlugs()
// never throws — it falls back to the committed snapshot — so an unreachable
// store degrades to the known product list rather than an empty sitemap.
//
// /account is deliberately absent: it is noindex (see app/account/page.tsx), and
// listing a noindex page in the sitemap sends crawlers contradictory signals.

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Species landing pages: written for "natural dog/cat grooming" searches.
    {
      url: `${baseUrl}/dog-grooming`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cat-grooming`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ingredients`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/journal`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/shipping`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    { url: `${baseUrl}/privacy-policy`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${baseUrl}/terms-of-use`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
  ];

  // Journal entries come from the article registry, with real publish/modify
  // dates so crawlers can tell which pieces actually changed.
  const journalRoutes: MetadataRoute.Sitemap = JOURNAL_ARTICLES.map((a) => ({
    url: `${baseUrl}${articlePath(a.slug)}`,
    lastModified: new Date(a.dateModified),
    changeFrequency: 'monthly',
    priority: 0.7,
    images: [`${baseUrl}${a.image.src}`],
  }));

  // Products, with their gallery images so they surface in Google Images and
  // Shopping. Falls back to slugs only (from the snapshot) if the catalogue
  // fetch fails, so the sitemap is never empty.
  const products = await fetchProducts().catch(() => null);
  const productRoutes: MetadataRoute.Sitemap = products
    ? products.map((p) => ({
        url: `${baseUrl}/products/${p.id}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        // Product pages sit just under /shop: they are the pages that convert.
        priority: 0.8,
        images: [...new Set((p.gallery?.length ? p.gallery : [p.image]).map((i) => i.src))].slice(0, 10),
      }))
    : (await fetchProductSlugs()).map((slug) => ({
        url: `${baseUrl}/products/${slug}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));

  return [...staticRoutes, ...journalRoutes, ...productRoutes];
}
