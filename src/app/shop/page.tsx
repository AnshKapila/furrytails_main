// Server component. Fetches the catalogue from WooCommerce so the product grid
// is in the HTML, then hands filtering and cart interaction to ShopClient.

import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientProviders from '@/components/ClientProviders';
import ShopClient from './ShopClient';
import { getAllProducts } from '@/services/api';
import { getBaseUrl } from '@/lib/site-url';
import { breadcrumbJsonLd, jsonLdString, pageOpenGraph, websiteId } from '@/lib/seo';

export const revalidate = 300;

const SHOP_TITLE = 'Shop Natural Dog & Cat Grooming Products | Furrytail';
const SHOP_DESCRIPTION =
  'Shop natural dog & cat grooming: sulphate-free shampoos, waterless dry foam shampoo, paw cleaner, ' +
  'plant-based tick & flea spray and coat mist. Ships across India.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: SHOP_TITLE,
    description: SHOP_DESCRIPTION,
    alternates: { canonical: '/shop' },
    openGraph: pageOpenGraph({ url: '/shop', title: SHOP_TITLE, description: SHOP_DESCRIPTION }),
  };
}

export default async function ShopPage() {
  const products = await getAllProducts();
  const base = getBaseUrl();

  // CollectionPage listing every product, plus the breadcrumb.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${base}/shop#page`,
        url: `${base}/shop`,
        name: SHOP_TITLE,
        description: SHOP_DESCRIPTION,
        isPartOf: { '@id': websiteId() },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: products.length,
          itemListElement: products.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${base}/products/${p.id}`,
            name: p.name,
          })),
        },
      },
      breadcrumbJsonLd([
        ['Home', '/'],
        ['Shop', '/shop'],
      ]),
    ],
  };

  return (
    <ClientProviders>
      <div className="min-h-screen bg-[#F8F5F1]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
        <Navbar />
        <ShopClient products={products} />
        <Footer />
      </div>
    </ClientProviders>
  );
}
