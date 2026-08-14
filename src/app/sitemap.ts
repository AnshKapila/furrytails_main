import type { MetadataRoute } from 'next';
import { getBaseUrl } from '../lib/site-url';
import { fetchProductSlugs } from '../lib/woo';

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
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/shipping`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  const slugs = await fetchProductSlugs();
  const productRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${baseUrl}/products/${slug}`,
    lastModified,
    changeFrequency: 'weekly',
    // Product pages sit just under /shop: they are the pages that convert.
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
