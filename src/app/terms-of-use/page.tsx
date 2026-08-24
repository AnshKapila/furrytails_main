import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientProviders from '@/components/ClientProviders';

// Content structure
const sections = [
  {
    number: '01',
    heading: 'Products & Ingredients',
    items: [
      {
        label: 'Are your products safe for both dogs and cats?',
        body: 'Yes, our core range is formulated to be perfectly safe and pH-balanced for both dogs and cats, using natural origin ingredients.',
      },
      {
        label: 'Do you use artificial fragrances?',
        body: 'No. All our fragrances are IFRA-compliant and made without harsh synthetic chemicals, ensuring they are gentle on your pet\'s sensitive nose.',
      },
      {
        label: 'Is the Paw Cleaner safe if my dog licks their paws?',
        body: 'Yes, the Paw Cleaner is made with natural botanical extracts and probiotic preservation. While it is not meant to be ingested, it is entirely safe if they lick their paws after cleaning.',
      },
    ],
  },
  {
    number: '02',
    heading: 'Orders & Shipping',
    items: [
      {
        label: 'How long does shipping take?',
        body: 'Orders are typically dispatched within 1-2 business days. Delivery generally takes 3-5 working days depending on your location.',
      },
      {
        label: 'Do you offer Cash on Delivery?',
        body: 'Yes, we offer Cash on Delivery (COD) across most pincodes in India.',
      },
      {
        label: 'How can I track my order?',
        body: 'Once your order ships, we will send you a tracking link via email and SMS.',
      },
    ],
  },
  {
    number: '03',
    heading: 'Returns & Support',
    items: [
      {
        label: 'What is your return policy?',
        body: 'We accept returns on unopened products in their original condition. Please refer to our Shipping & Returns page for detailed information.',
      },
      {
        label: 'How can I get in touch?',
        body: 'You can reach us through our contact form, or connect with us directly on WhatsApp using the icon on the bottom right of your screen.',
      },
    ],
  },
];

export default function TermsOfUsePage() {
  return (
    <ClientProviders>
    <div className="min-h-screen bg-[#F8F5F1]">
      <Navbar />

      <main
        className="bg-[#F8F5F1] pt-24"
        data-kite-page-id="faq"
        data-kite-page-type="policy"
      >

        {/* Header */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20 border-b border-[#E9E2D7]">
          <p className="text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#8D9A83] mb-4"
            style={{ fontFamily: 'var(--font-inter)' }}>
            Support
          </p>
          <h1
            className="text-[#3B3A38] max-w-[640px] !mx-0 text-left"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(3rem, 5vw, 4rem)', fontWeight: 300, lineHeight: 1.06, letterSpacing: '-0.02em' }}
          >
            Terms of Use
          </h1>
          <p className="mt-5 text-[0.875rem] font-light text-[#68735F] leading-[1.6] max-w-[500px]">
            The terms and conditions for using our website.
          </p>
        </section>

        {/* Sections */}
        {sections.map((section) => (
          <section
            key={section.number}
            className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16 border-b border-[#E9E2D7]"
          >
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16">
              <div className="flex flex-col gap-1">
                <p
                  className="text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#BEB8AF]"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {section.number}
                </p>
                <h2
                  className="text-[#3B3A38]"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2rem, 3.2vw, 2.625rem)', fontWeight: 300, lineHeight: 1.15 }}
                >
                  {section.heading}
                </h2>
              </div>

              <div className="flex flex-col gap-0">
                {section.items.map((item, i) => (
                  <div
                    key={item.label}
                    className={`flex flex-col gap-2 py-6 ${i < section.items.length - 1 ? "border-b border-[#E9E2D7]" : ""}`}
                  >
                    <p
                      className="text-[0.875rem] font-medium text-[#3B3A38] tracking-wide"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {item.label}
                    </p>
                    <p className="text-[0.875rem] font-light text-[#68735F] leading-[1.6]">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section
          className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <p
                className="text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#8D9A83] mb-3"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Still have a question?
              </p>
              <h2
                className="text-[#3B3A38]"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2rem, 3.2vw, 2.625rem)', fontWeight: 300, lineHeight: 1.15 }}
              >
                We read every message ourselves.
              </h2>
            </div>
            <Link
              href="/#contact"
              className="hero-btn-primary flex-shrink-0"
              style={{ minHeight: '48px', padding: '0 28px' }}
            >
              Get in touch
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


