// Server component. Fetches the catalogue from WooCommerce so the product grid
// is in the HTML, then hands filtering and cart interaction to ShopClient.

import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientProviders from '@/components/ClientProviders';
import ShopClient from './ShopClient';
import { getAllProducts, getShopContent } from '@/services/api';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const { heading, subheading } = getShopContent();
  const title = `${heading} — Furrytail`;
  return {
    title,
    description: subheading,
    alternates: { canonical: '/shop' },
    openGraph: { type: 'website', url: '/shop', title, description: subheading },
  };
}

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <ClientProviders>
      <div className="min-h-screen bg-[#F8F5F1]">
        <Navbar />
        <ShopClient products={products} />
        <Footer />
      </div>
    </ClientProviders>
  );
}
