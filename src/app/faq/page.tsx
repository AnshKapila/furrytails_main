import type { Metadata } from 'next';
import Link from 'next/link';
import ClientProviders from '@/components/ClientProviders';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FAQS } from '@/data/faq';
import { getBaseUrl } from '@/lib/site-url';
import { breadcrumbJsonLd, jsonLdString, pageOpenGraph, websiteId } from '@/lib/seo';

const TITLE = 'Dog & Cat Grooming FAQ: Natural Shampoo, Tick Spray, Paw Care | Furrytail';
const DESCRIPTION =
  'Straight answers on natural dog & cat grooming: 99.5% natural origin, probiotic preservation, ' +
  'what is safe for cats and puppies, and how the tick spray works.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/faq' },
  openGraph: pageOpenGraph({ url: '/faq', title: TITLE, description: DESCRIPTION }),
};

export default function FAQPage() {
  const base = getBaseUrl();
  // FAQPage is what AI answer engines and Google lift answers from - the text
  // must match the visible answers exactly.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        '@id': `${base}/faq#faq`,
        url: `${base}/faq`,
        name: TITLE,
        isPartOf: { '@id': websiteId() },
        inLanguage: 'en-IN',
        mainEntity: FAQS.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
      breadcrumbJsonLd([
        ['Home', '/'],
        ['FAQ', '/faq'],
      ]),
    ],
  };

  return (
    <ClientProviders>
      <div className="min-h-screen bg-[#F8F5F1]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
        <Navbar />
        <main className="pt-32 pb-24 md:pt-40 md:pb-32 px-6">
          <div className="max-w-[720px] mx-auto">
            <h1 className="mb-12">
              <span
                className="block text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#8D9A83] mb-4"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Dog &amp; cat grooming FAQ
              </span>
              <span className="block text-3xl md:text-5xl font-display font-light text-[#3B3A38]">
                The questions we get most.
              </span>
            </h1>
            <p className="text-[#3B3A38] opacity-80 mb-16 text-lg">
              Honest answers. No marketing language.
            </p>
            <div className="space-y-12">
              {FAQS.map((faq) => (
                <div key={faq.question} className="border-b border-[#E5E0D8] pb-10">
                  <h3 className="text-xl md:text-2xl font-display font-medium text-[#3B3A38] mb-4">
                    {faq.question}
                  </h3>
                  <p className="text-sm md:text-[15px] leading-relaxed text-[#3B3A38] opacity-80">
                    {faq.answer}
                  </p>
                  {faq.links && (
                    <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[0.8125rem]">
                      <span className="text-[#3B3A38]/50">Related:</span>
                      {faq.links.map((l) => (
                        <Link key={l.href} href={l.href} className="text-[#68735F] underline underline-offset-4 decoration-[#8D9A83]/40 hover:text-[#3B3A38]">
                          {l.label}
                        </Link>
                      ))}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ClientProviders>
  );
}
