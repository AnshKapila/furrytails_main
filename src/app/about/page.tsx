import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientProviders from '@/components/ClientProviders';
import SecondaryOutlineBtn from '@/components/SecondaryOutlineBtn';
import { TrustMarkerItem } from '@/components/TrustMarkers';
import { TRUST_MARKERS } from '@/components/TrustMarkersData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Story — Furrytail',
  description: 'Care, Extended. We didn\'t start with shampoo. We started with a question.',
  alternates: { canonical: '/about' },
  openGraph: {
    url: '/about',
    title: 'Our Story — Furrytail',
    description: 'Care, Extended. We didn\'t start with shampoo. We started with a question.',
    images: ['/about_hero_door.jpg'],
  },
};

export default function AboutPage() {
  return (
    <ClientProviders>
      <div className="min-h-screen bg-[#F8F5F1]">
        <Navbar />

        <main
          className="bg-[#F8F5F1] pt-24 pb-16 md:pb-24"
          data-kite-page-id="about"
          data-kite-page-type="about"
        >

          {/* SECTION 1 — Hero/Intro */}
          <section className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20 border-b border-[#E9E2D7]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="flex flex-col gap-6 max-w-[500px]">
                <h1
                  className="text-[#3B3A38] leading-[1.08] tracking-[-0.02em]"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2.75rem, 4.5vw, 4rem)', fontWeight: 300 }}
                >
                  Care, Extended.
                </h1>
                <p className="text-[1.0625rem] md:text-[1.125rem] font-light text-[#3B3A38]/80 leading-[1.6]">
                  Some relationships never ask us to perform. They simply wait by the door. They celebrate our return as though we&apos;ve been gone forever. They trust us completely. Furrytail exists to honour that relationship.
                </p>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/about_hero_door.jpg"
                  alt="A Labrador retriever waiting attentively by a front door in warm entryway light"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </section>

          {/* SECTION 2 — Origin */}
          <section className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-24 border-b border-[#E9E2D7]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="relative aspect-[4/5] overflow-hidden order-2 md:order-1">
                <Image
                  src="/about_origin_notebook.jpg"
                  alt="Hands holding an open notebook and an ingredient list on a wooden table, an orange tabby domestic shorthair cat resting quietly nearby"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col gap-6 max-w-[500px] order-1 md:order-2">
                <h2
                  className="text-[#3B3A38] leading-[1.15]"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2rem, 3.2vw, 2.75rem)', fontWeight: 300 }}
                >
                  We Didn&apos;t Start With Shampoo. We Started With A Question.
                </h2>
                <p className="text-[0.9375rem] font-light text-[#3B3A38]/80 leading-[1.65]">
                  Why should the products we choose for ourselves reflect more thought than the ones we choose for the companions we love most? That question stayed with us. We searched for grooming products that felt as carefully formulated as modern skincare — ingredient transparency, beautiful fragrances, thoughtful formulation, international standards. We couldn&apos;t find them. So we created them. Not because the world needed another pet care brand. Because we believed this relationship deserved one.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 3 — The Standard */}
          <section className="bg-[#EDE7DF] py-16 md:py-24 border-b border-[#D8CFC4]">
            <div className="max-w-[1200px] mx-auto px-6 md:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mb-16 md:mb-20">
                <div className="flex flex-col gap-6 max-w-[500px]">
                  <h2
                    className="text-[#3B3A38] leading-[1.15]"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2.25rem, 3.5vw, 3rem)', fontWeight: 300 }}
                  >
                    Thoughtfulness Is Our Standard.
                  </h2>
                  <p className="text-[0.9375rem] font-light text-[#3B3A38]/80 leading-[1.65]">
                    Every bottle reflects hundreds of deliberate decisions. The ingredients we include. The ingredients we leave behind. The preservation system we chose. The fragrances we created. Not because they sound impressive. Because thoughtful care is built one decision at a time.
                  </p>
                </div>
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src="/about_standard_botanicals.jpg"
                    alt="A natural pet care product bottle on a textured surface, surrounded by loose natural botanical ingredients and herbs"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full justify-between items-start pt-16 md:pt-20 border-t border-[#D8CFC4]">
                {TRUST_MARKERS.map((marker) => (
                  <TrustMarkerItem key={marker.id} marker={marker} />
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 4 — The Craft */}
          <section className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-24 border-b border-[#E9E2D7]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="relative aspect-[4/5] overflow-hidden order-2 md:order-1">
                <Image
                  src="/designed-to-be-used.jpg"
                  alt="A beautifully designed pet shampoo bottle sitting naturally on a bathroom shelf beside rolled towels"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col gap-6 max-w-[500px] order-1 md:order-2">
                <h2
                  className="text-[#3B3A38] leading-[1.15]"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2.25rem, 3.5vw, 3rem)', fontWeight: 300 }}
                >
                  Designed To Be Used. Not Displayed.
                </h2>
                <p className="text-[0.9375rem] font-light text-[#3B3A38]/80 leading-[1.65]">
                  Beautiful products belong in everyday life. On bathroom shelves. By the front door. In travel bags. Beside muddy paws. The true measure of a bottle isn&apos;t how it looks. It&apos;s how naturally it becomes part of your routine.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 5 — The Promise */}
          <section className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-24 text-center">
            <div className="max-w-[600px] mx-auto flex flex-col items-center">
              <h2
                className="text-[#3B3A38] leading-[1.15] mb-6"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 300 }}
              >
                Happily Ever After.
              </h2>
              <p className="text-[1.0625rem] font-light text-[#3B3A38]/80 leading-[1.65] mb-12">
                Not the ending. The everyday. The Wednesday bath. The Sunday walk. The quiet brush before bed. The welcome home after work. These are the moments that become a lifetime together. They&apos;re the moments we create for.
              </p>
              
              <div className="relative w-full aspect-[16/9] mb-16 overflow-hidden">
                <Image
                  src="/about_promise_brushing.jpg"
                  alt="A candid, warm evening moment of a person gently brushing a Labrador retriever in a cozy living room"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>

              <div className="mx-auto" style={{ width: 'fit-content' }}>
                <SecondaryOutlineBtn
                  href="/shop"
                  aria-label="Begin the Ritual - Shop Collection"
                >
                  Begin the Ritual
                </SecondaryOutlineBtn>
              </div>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </ClientProviders>
  );
}
