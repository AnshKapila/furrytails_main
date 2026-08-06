import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientProviders from '@/components/ClientProviders';
import { ingredientChapters } from '@/data/home';
import IngredientRow from '@/components/IngredientRow';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Ingredients — Furrytail',
  description: 'Every botanical Furrytail uses, explained across three chapters. What each ingredient is, why it is in the formula, and where it comes from.',
  alternates: { canonical: '/ingredients' },
  openGraph: {
    url: '/ingredients',
    title: 'Our Ingredients — Furrytail',
    description: 'Every botanical Furrytail uses, explained across three chapters. What each ingredient is, why it is in the formula, and where it comes from.',
    images: ['https://static.kite.ai/image/upload/v1785786928/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/iter3/ingredient-white-tea-editorial-r2.png'],
  },
};

export default function IngredientsPage() {
  let globalIndex = 0;

  return (
    <ClientProviders>
      <div className="min-h-screen bg-[#F8F5F1]">
        <Navbar />

        <main
          className="bg-[#F8F5F1] pt-24"
          data-kite-page-id="ingredients"
          data-kite-page-type="about"
        >

          {/* ── Page header ─────────────────────────────────────────────────── */}
          <section className="max-w-[1200px] mx-auto px-6 md:px-8 pt-14 pb-16 md:pt-16 md:pb-20 border-b border-[#E9E2D7]">
            <div className="max-w-[720px]">
              <p className="text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#8D9A83] mb-3">
                What goes in
              </p>
              <h1
                className="text-[#3B3A38] mb-5 !mx-0 text-left"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2.75rem, 4.5vw, 3.75rem)', fontWeight: 300, lineHeight: 1.08, letterSpacing: '-0.02em' }}
              >
                Nature behind every formula.
              </h1>
              <p className="text-[0.875rem] font-light text-[#3B3A38]/70 leading-[1.65] max-w-[560px]">
                Every ingredient earns its place. Nothing is here for fragrance alone, nothing kept in because it was easier to leave it. Below is each botanical we use, organized across three chapters of formula philosophy.
              </p>
            </div>
          </section>

          {/* ── Ingredient chapters ──────────────────────────────────────────── */}
          <div
            className="max-w-[1200px] mx-auto px-6 md:px-8 pb-12"
            data-kite-surface="ingredients.list"
            data-kite-surface-type="features"
          >
            {ingredientChapters.map((chapter) => (
              <section key={chapter.id} className="pt-12 pb-6 border-b border-[#E9E2D7] last:border-b-0">
                {/* Chapter Header */}
                <div className="py-8 border-b border-[#E9E2D7]/60 mb-8">
                  <p className="text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#8D9A83] mb-2">
                    {chapter.chapterNumber}
                  </p>
                  <h2
                    className="text-[#3B3A38] mb-2 text-left"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(1.875rem, 3vw, 2.375rem)', fontWeight: 300 }}
                  >
                    {chapter.title}
                  </h2>
                  <p className="text-[0.875rem] font-light text-[#3B3A38]/70 max-w-[520px]">
                    {chapter.subtitle}
                  </p>
                </div>

                {/* Chapter Ingredient Rows */}
                <div>
                  {chapter.stories.map((story) => {
                    const currentIndex = globalIndex++;
                    return (
                      <IngredientRow
                        key={story.ingredient}
                        story={{ ...story, index: currentIndex }}
                        i={currentIndex}
                      />
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* ── CTA ──────────────────────────────────────────────────────────── */}
          <section
            className="py-16 md:py-20 border-t border-[#E9E2D7]"
            data-kite-surface="ingredients.cta"
            data-kite-surface-type="cta"
          >
            <div className="max-w-[1200px] mx-auto px-6 md:px-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <p className="text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#8D9A83] mb-3">
                  How we source
                </p>
                <h2
                  className="text-[#3B3A38]"
                  style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem, 3.2vw, 2.625rem)', fontWeight: 300, lineHeight: 1.15 }}
                >
                  Small batches. Known origins.
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/about#how-we-source"
                  className="inline-flex items-center gap-2 text-[0.625rem] font-normal tracking-[0.14em] uppercase text-[#68735F] hover:text-[#3B3A38] transition-colors duration-[800ms] border border-[#D8CFC4] hover:border-[#8D9A83] px-5 py-3 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8D9A83]"
                  data-kite-cta-id="ingredients-sourcing-link"
                  data-kite-role="secondary"
                  data-kite-event="sourcing_viewed"
                >
                  Our sourcing
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true" className="flex-shrink-0">
                    <line x1="1" y1="7" x2="13" y2="7" />
                    <polyline points="8,2 13,7 8,12" />
                  </svg>
                </Link>
                <Link
                  href="/shop"
                  className="hero-btn-primary flex-shrink-0"
                  style={{ minHeight: '48px', padding: '0 28px' }}
                  data-kite-cta-id="ingredients-shop-cta"
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
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </ClientProviders>
  );
}
