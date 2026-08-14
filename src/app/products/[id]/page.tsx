// Server component. Resolves the product from WooCommerce, emits per-product
// metadata and Product JSON-LD, then hands the interactive parts to
// ProductClient.
//
// `id` is the WooCommerce product slug, so /products/gentle-daily-shampoo keeps
// working exactly as before.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientProviders from '@/components/ClientProviders';
import ProductClient from './ProductClient';
import { getProductById, getRelatedProducts } from '@/services/api';
import { fetchProductSlugs } from '@/lib/woo';
import { parsePrice } from '@/lib/price';
import { getBaseUrl } from '@/lib/site-url';

// Catalogue changes are picked up within this window without a redeploy.
export const revalidate = 300;

// Pre-render the products that exist at build time; anything added in wp-admin
// afterwards is rendered on first request rather than 404ing.
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await fetchProductSlugs();
  return slugs.map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id).catch(() => undefined);

  if (!product) {
    return { title: 'Product not found — Furrytail' };
  }

  const title = `${product.name} — Furrytail`;
  const description =
    product.shortDesc?.slice(0, 160) ||
    `${product.name} from Furrytail. ${product.volume ?? ''}`.trim();

  return {
    title,
    description,
    alternates: { canonical: `/products/${product.id}` },
    openGraph: {
      type: 'website',
      url: `/products/${product.id}`,
      title,
      description,
      images: [{ url: product.image.src, alt: product.image.alt }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  const related = await getRelatedProducts(product.id, product.category).catch(
    () => [],
  );

  // Product structured data — drives rich results for a commerce listing.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDesc ?? '',
    image: product.image.src,
    sku: product.sku ?? product.id,
    brand: { '@type': 'Brand', name: 'Furrytail' },
    offers: {
      '@type': 'Offer',
      url: `${getBaseUrl()}/products/${product.id}`,
      priceCurrency: 'INR',
      price: parsePrice(product.price),
      availability:
        product.inStock === false
          ? 'https://schema.org/OutOfStock'
          : 'https://schema.org/InStock',
    },
  };

  return (
    <ClientProviders>
      <div className="min-h-screen bg-[#F8F5F1]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <ProductClient product={product} related={related} />
        <Footer />
      </div>
    </ClientProviders>
  );
}
