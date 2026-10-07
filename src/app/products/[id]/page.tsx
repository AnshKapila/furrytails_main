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
import { getArticlesForProduct } from '@/lib/journal';
import RelatedArticles from '@/components/journal/RelatedArticles';
import {
  GOOGLE_PRODUCT_CATEGORY,
  breadcrumbJsonLd,
  jsonLdString,
  orgId,
  pageOpenGraph,
  plainProductText,
  productMetaDescription,
  productTitle,
  speciesLabel,
} from '@/lib/seo';

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

  const title = productTitle(product);
  const description = productMetaDescription(product);

  return {
    title,
    description,
    alternates: { canonical: `/products/${product.id}` },
    openGraph: pageOpenGraph({
      url: `/products/${product.id}`,
      title,
      description,
      images: (product.gallery?.length ? product.gallery : [product.image])
        .slice(0, 4)
        .map((img) => ({ url: img.src, alt: img.alt || product.name })),
    }),
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

  // Product + BreadcrumbList. Feeds product rich results and Google Shopping's
  // free listings (Merchant Center reads this alongside the feed). Only facts
  // the page itself shows: no ratings or reviews until real ones exist.
  const base = getBaseUrl();
  const url = `${base}/products/${product.id}`;
  const images = (product.gallery?.length ? product.gallery : [product.image]).map((i) => i.src);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        '@id': `${url}#product`,
        name: product.name,
        description: plainProductText(product).slice(0, 5000),
        url,
        image: [...new Set(images)].slice(0, 10),
        sku: product.sku ?? product.id,
        mpn: product.sku ?? product.id,
        brand: { '@type': 'Brand', name: 'Furrytail' },
        manufacturer: { '@id': orgId() },
        category: GOOGLE_PRODUCT_CATEGORY,
        ...(product.volume ? { size: product.volume } : {}),
        audience: {
          '@type': 'Audience',
          audienceType: `${speciesLabel(product)} owners`,
        },
        offers: {
          '@type': 'Offer',
          url,
          priceCurrency: 'INR',
          price: parsePrice(product.price),
          itemCondition: 'https://schema.org/NewCondition',
          availability:
            product.inStock === false
              ? 'https://schema.org/OutOfStock'
              : 'https://schema.org/InStock',
          seller: { '@id': orgId() },
        },
      },
      breadcrumbJsonLd([
        ['Home', '/'],
        ['Shop', '/shop'],
        [product.name, `/products/${product.id}`],
      ]),
    ],
  };

  return (
    <ClientProviders>
      <div className="min-h-screen bg-[#F8F5F1]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
        />
        <Navbar />
        <ProductClient product={product} related={related} />
        <div className="pb-24">
          <RelatedArticles
            articles={getArticlesForProduct(product.id).slice(0, 3)}
            eyebrow="From the journal"
            heading="Read before you pour."
          />
        </div>
        <Footer />
      </div>
    </ClientProviders>
  );
}
