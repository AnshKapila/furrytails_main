import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientProviders from '@/components/ClientProviders';
import IngredientAccordion from '@/components/IngredientAccordion';
import { brandStory, trustStatements } from '@/data/home';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Furrytail — Our Story, Ingredients & Sourcing',
  description: 'Why Furrytail exists, what goes into every product, and how we source our ingredients. Fewer things, made more carefully.',
  alternates: { canonical: '/about' },
  openGraph: {
    url: '/about',
    title: 'About Furrytail — Our Story, Ingredients & Sourcing',
    description: 'Why Furrytail exists, what goes into every product, and how we source our ingredients.',
    images: ['https://static.kite.ai/image/upload/v1785338589/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/iter4/about-brand-story.png'],
  },
};

export default function AboutPage() {
  return (
    <ClientProviders>
    <div className="min-h-screen bg-[#F8F5F1]">
      <Navbar />

      <main
        className="bg-[#F8F5F1] pt-24"
        data-kite-page-id="about"
        data-kite-page-type="about"
      >

        {/* ── Page header ─────────────────────────────────────────────────── */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-8 pt-14 pb-16 md:pt-16 md:pb-20 border-b border-[#E9E2D7]">
          <div className="max-w-[720px]">
            <p className="text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#8D9A83] mb-3">
              About Furrytail
            </p>
            <h1
              className="text-[#3B3A38]"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2.75rem, 4.5vw, 3.75rem)', fontWeight: 300, lineHeight: 1.08, letterSpacing: '-0.02em' }}
            >
              Fewer things, made more carefully.
            </h1>
          </div>
        </section>

        {/* ── Our Story ────────────────────────────────────────────────────── */}
        <section
          id="our-story"
          className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20"
          data-kite-surface="about.story"
          data-kite-surface-type="features"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={brandStory.image?.src ?? ''}
                alt={brandStory.image?.alt ?? 'Brand story'}
                fill
                className="object-cover object-center [filter:saturate(70%)]"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <p className="text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#BEB8AF] mb-3">
                  01 — Our Story
                </p>
                <h2
                  className="text-[#3B3A38] mb-6"
                  style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem, 3.2vw, 2.625rem)', fontWeight: 300, lineHeight: 1.15 }}
                >
                  {brandStory.heading}
                </h2>
              </div>
              <div className="flex flex-col gap-4">
                {brandStory.body.map((para, i) => (
                  <p key={i} className="text-[0.875rem] font-light text-[#3B3A38]/80 leading-[1.6]">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── What's Inside ─────────────────────────────────────────────────── */}
        <section
          id="whats-inside"
          className="bg-[#EDE7DF] py-16 md:py-20"
          data-kite-surface="about.ingredients"
          data-kite-surface-type="features"
        >
          <div className="max-w-[1200px] mx-auto px-6 md:px-8">
            <div className="mb-12">
              <p className="text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#BEB8AF] mb-3">
                02 — What&apos;s Inside
              </p>
              <h2
                className="text-[#3B3A38] max-w-[520px]"
                style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem, 3.2vw, 2.625rem)', fontWeight: 300, lineHeight: 1.15 }}
              >
                Every ingredient, listed. Every reason, given.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="flex flex-col gap-5">
                <p className="text-[0.875rem] font-light text-[#3B3A38]/80 leading-[1.6]">
                  We do not use proprietary blends to hide what is actually in our products. Every formulation lists every ingredient by its proper name, with the reason it is there.
                </p>
                <p className="text-[0.875rem] font-light text-[#3B3A38]/80 leading-[1.6]">
                  If an ingredient sounds unfamiliar, we explain it. If we cannot justify why something is in a product, it is not in the product.
                </p>
                <p className="text-[0.875rem] font-light text-[#3B3A38]/80 leading-[1.6]">
                  No fillers. No synthetic fragrances. No preservatives that exist only to extend shelf life at the cost of what the product does.
                </p>
              </div>

              <IngredientAccordion />
            </div>
          </div>
        </section>

        {/* ── How We Source ─────────────────────────────────────────────────── */}
        <section
          id="how-we-source"
          className="py-16 md:py-20"
          data-kite-surface="about.sourcing"
          data-kite-surface-type="features"
        >
          <div className="max-w-[1200px] mx-auto px-6 md:px-8">
            <div className="mb-12">
              <p className="text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#BEB8AF] mb-3">
                03 — How We Source
              </p>
              <h2
                className="text-[#3B3A38] max-w-[520px]"
                style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem, 3.2vw, 2.625rem)', fontWeight: 300, lineHeight: 1.15 }}
              >
                Small batches. Known origins. Personal oversight.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E9E2D7]">
              {trustStatements.map((item) => (
                <div key={item.heading} className="bg-[#F8F5F1] p-8 flex flex-col gap-4">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image?.src ?? ''}
                      alt={item.image?.alt ?? item.heading}
                      fill
                      className="object-cover object-center [filter:saturate(60%)]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <h3
                    className="text-[#3B3A38] mt-2"
                    style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.5rem', fontWeight: 300, lineHeight: 1.2 }}
                  >
                    {item.heading}
                  </h3>
                  <p className="text-[0.75rem] font-light text-[#68735F] leading-[1.55]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section
          className="py-16 md:py-20 border-t border-[#E9E2D7]"
          data-kite-surface="about.cta"
          data-kite-surface-type="cta"
        >
          <div className="max-w-[1200px] mx-auto px-6 md:px-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <p className="text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#8D9A83] mb-3">
                Ready to start
              </p>
              <h2
                className="text-[#3B3A38]"
                style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem, 3.2vw, 2.625rem)', fontWeight: 300, lineHeight: 1.15 }}
              >
                See what we make.
              </h2>
            </div>
            <Link
              href="/shop"
              className="hero-btn-primary flex-shrink-0"
              style={{ minHeight: '48px', padding: '0 28px' }}
              data-kite-cta-id="about-shop-cta"
              data-kite-role="primary"
              data-kite-event="shop_clicked"
            >
              Shop the range
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true" className="btn-arrow flex-shrink-0">
                <line x1="1" y1="7" x2="13" y2="7" />
                <polyline points="8,2 13,7 8,12" />
              </svg>
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
    </ClientProviders>
  );
}
