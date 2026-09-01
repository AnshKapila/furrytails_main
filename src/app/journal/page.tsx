import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientProviders from '@/components/ClientProviders';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Journal â€” Furrytail',
  description: 'Slow reading for the pet parent who pays attention. Ingredient deep-dives, grooming rituals, and the science behind the label.',
  alternates: { canonical: '/journal' },
  openGraph: {
    url: '/journal',
    title: 'Journal â€” Furrytail',
    description: 'Slow reading for the pet parent who pays attention.',
    images: ['/journal_featured.webp'],
  },
};

const ARTICLES = [
  {
    id: 'probiotic-question',
    category: 'Ingredients',
    readTime: '4 min read',
    title: 'The probiotic question.',
    description: 'Leuconostoc/Radish Root Ferment Filtrate. How a fermentation-derived system replaces the synthetic preservatives that most brands quietly rely on. What it is, how it works, and why it is harder to formulate with.',
    imageSrc: '/journal_probiotic.webp',
  },
  {
    id: 'santal-primer',
    category: 'Fragrance',
    readTime: '3 min read',
    title: 'Santal: a primer.',
    description: 'Sandalwood has been used in personal care for centuries. Here is what it actually is, what it does to the skin, and why we chose it as the anchor for our first fragrance. Steam-distilled heartwood, IFRA compliance, and the question of synthetic alternatives.',
    imageSrc: '/journal_santal.webp',
  },
  {
    id: 'monsoon-ritual',
    category: 'Seasonal',
    readTime: '4 min read',
    title: 'The monsoon ritual.',
    description: 'Mumbai, Chennai, Bangalore: monsoon season and a wet dog are a formulation challenge. What to use, when, and in what order. The Paw Cleaner, the Anti-Tick Spray, and the question of frequency during the high-humidity months.',
    imageSrc: '/journal_monsoon.webp',
  },
  {
    id: 'reading-inci-list',
    category: 'Guide',
    readTime: '6 min read',
    title: 'Reading the INCI list.',
    description: 'Every ingredient has two names. The one you know. The one on the label. A field guide to decoding what is actually in your pet\'s products â€” what to look for, what to avoid, and what the jargon means in plain language.',
    imageSrc: '/journal_label.webp',
  },
];

export default function JournalPage() {
  return (
    <ClientProviders>
      <div className="min-h-screen bg-[#F8F5F1]">
        <Navbar />

        <main
          className="bg-[#F8F5F1] pt-24 pb-16 md:pb-24"
          data-kite-page-id="journal"
          data-kite-page-type="blog"
        >

          {/* SECTION 1 â€” Hero */}
          <section className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20 border-b border-[#E9E2D7]">
            <div className="max-w-[800px]">
              <p className="text-[0.6875rem] md:text-[0.75rem] font-medium tracking-[0.15em] uppercase text-[#8D9A83] mb-6">
                THE JOURNAL
              </p>
              <h1
                className="text-[#3B3A38] leading-[1.08] tracking-[-0.02em] mb-8 md:mb-10"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2.75rem, 4.5vw, 4rem)', fontWeight: 300 }}
              >
                Slow reading for the pet parent who pays attention.
              </h1>
              <p className="text-[1.0625rem] md:text-[1.125rem] font-light text-[#3B3A38]/80 leading-[1.6]">
                Ingredient deep-dives. Grooming rituals. The science behind the label. One piece at a time.
              </p>
            </div>
          </section>

          {/* SECTION 2 â€” Featured Article */}
          <section className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-24 border-b border-[#E9E2D7]">
            <p className="text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#BEB8AF] mb-6">
              Featured
            </p>
            <Link href="/journal/what-we-found-in-most-pet-shampoos" className="group block border border-[#E9E2D7] transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#111610]/5 overflow-hidden rounded-[2px] bg-[#F8F5F1]">
              <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] items-stretch">
                <div className="relative aspect-square md:aspect-auto md:h-full overflow-hidden bg-[#1c1a18]">
                  <Image
                    src="/images/journal/what-we-found/main.png"
                    alt="Pet shampoo bottle beside an open ingredient label and grooming essentials"
                    fill
                    className="object-cover object-center opacity-85 transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority
                  />
                </div>
                <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
                  <div className="text-[0.6875rem] font-normal tracking-[0.06em] text-[#8D9A83] uppercase mb-4 flex items-center gap-2">
                    <span>Formulation</span>
                    <span className="w-1 h-1 rounded-full bg-[#E9E2D7]" />
                    <span>5 min read</span>
                  </div>
                  <h2
                    className="text-[#3B3A38] leading-[1.15] mb-4 transition-colors duration-300 group-hover:text-[#68735F]"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2rem, 3.2vw, 2.5rem)', fontWeight: 300 }}
                  >
                    What We Found in Most Pet Shampoos.
                  </h2>
                  <p className="text-[0.9375rem] font-light text-[#3B3A38]/80 leading-[1.65] mb-8">
                    A shampoo can lather beautifully and still leave you with questions. We looked past the front label and into the formulation: cleansing agents, preservatives, fragrance, skin compatibility and the choices that matter.
                  </p>
                  <span className="text-[0.8125rem] font-medium tracking-[0.04em] text-[#3B3A38] uppercase flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
                    Read the full article
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                      <line x1="1" y1="6" x2="11" y2="6" />
                      <polyline points="7,2 11,6 7,10" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </section>

          {/* SECTION 3 â€” Article Grid */}
          <section className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-24 border-b border-[#E9E2D7]">
            <div className="text-center mb-12 md:mb-16">
              <p className="text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#BEB8AF] mb-3">
                From the journal
              </p>
              <h2
                className="text-[#3B3A38] leading-[1.15]"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2rem, 3.2vw, 2.625rem)', fontWeight: 300 }}
              >
                More reading.
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {ARTICLES.map((article) => (
                <Link key={article.id} href="#" className="group flex flex-col gap-6 outline-none">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-[#E9E2D7]">
                    <Image
                      src={article.imageSrc}
                      alt={article.title}
                      fill
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[0.6875rem] font-normal tracking-[0.06em] text-[#8D9A83] uppercase mb-3 flex items-center gap-2">
                      <span>{article.category}</span>
                      <span className="w-1 h-1 rounded-full bg-[#E9E2D7]" />
                      <span>{article.readTime}</span>
                    </div>
                    <h3
                      className="text-[#3B3A38] leading-[1.2] mb-3 transition-colors duration-300 group-hover:text-[#68735F]"
                      style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(1.5rem, 2.2vw, 1.75rem)', fontWeight: 400 }}
                    >
                      {article.title}
                    </h3>
                    <p className="text-[0.875rem] font-light text-[#3B3A38]/80 leading-[1.65] mb-5">
                      {article.description}
                    </p>
                    <span className="text-[0.75rem] font-medium tracking-[0.04em] text-[#3B3A38] uppercase flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
                      Read the full article
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                        <line x1="1" y1="6" x2="11" y2="6" />
                        <polyline points="7,2 11,6 7,10" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* SECTION 4 â€” Newsletter */}
          <section className="bg-[#EDE7DF] py-20 md:py-28 text-center border-t border-[#D8CFC4]">
            <div className="max-w-[500px] mx-auto px-6 md:px-8">
              <p className="text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#8D9A83] mb-4">
                New in the journal
              </p>
              <h2
                className="text-[#3B3A38] leading-[1.15] mb-4"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2.25rem, 3.5vw, 3rem)', fontWeight: 300 }}
              >
                Get the next piece when it is ready.
              </h2>
              <p className="text-[0.9375rem] font-light text-[#3B3A38]/80 leading-[1.65] mb-10">
                We write when there is something worth saying. No cadence, no frequency pressure.
              </p>
              
              <form className="flex flex-col gap-4" action="#">
                <input
                  type="email"
                  placeholder="Your email address"
                  aria-label="Email address"
                  required
                  className="w-full bg-transparent border-b border-[#BEB8AF] pb-3 text-[0.9375rem] text-[#3B3A38] placeholder-[#BEB8AF] focus:outline-none focus:border-[#8D9A83] transition-colors rounded-none"
                  style={{ fontFamily: 'var(--font-inter)' }}
                />
                <button
                  type="submit"
                  className="mt-2 w-full flex items-center justify-center gap-2 border border-[#3B3A38] text-[#3B3A38] px-6 py-4 text-[0.75rem] font-medium tracking-[0.08em] uppercase hover:bg-[#3B3A38] hover:text-[#F8F5F1] transition-colors duration-[400ms]"
                >
                  Join the Ritual
                </button>
              </form>
              <p className="text-[0.6875rem] font-light text-[#8D9A83] mt-6 italic">
                Unsubscribe at any time.
              </p>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </ClientProviders>
  );
}




