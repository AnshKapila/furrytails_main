import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientProviders from '@/components/ClientProviders';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping & Returns — Furrytail',
  description: 'How we ship, how long it takes, and what to do if something goes wrong. We keep this simple.',
  alternates: { canonical: '/shipping' },
};

// ─── Content ─────────────────────────────────────────────────────────────────

// NOTE: Specific shipping timelines, fees, and return windows to be confirmed
// with Bhargav before launch. All policy details below use honest general language
// until exact logistics are finalised.
const sections = [
  {
    number: '01',
    heading: 'Shipping',
    items: [
      {
        label: 'Processing',
        body: 'Every order is packed by hand and checked before it leaves. We take care with this and do not rush it.',
      },
      {
        label: 'Delivery',
        body: 'We ship across India. Delivery times vary by location. You will receive a tracking link by email once your order has been dispatched.',
      },
      {
        label: 'Shipping cost',
        body: 'Shipping details including any free-shipping threshold will be shown clearly at checkout before you confirm your order.',
      },
      {
        label: 'Tracking',
        body: 'If your tracking link does not arrive after dispatch, check your spam folder first, then reach out to us through the contact form.',
      },
    ],
  },
  {
    number: '02',
    heading: 'Returns',
    items: [
      {
        label: 'Our guarantee',
        body: 'If a product arrives damaged, leaking, or is not what you ordered, we will make it right. Just get in touch and tell us what happened.',
      },
      {
        label: 'Change of mind',
        body: 'We accept returns on unopened products in their original condition. Please reach out to us before sending anything back so we can guide you through the process.',
      },
      {
        label: 'Opened products',
        body: 'If you have opened a product and it is not working for your pet, write to us. We would rather understand what happened than process a refund without learning anything.',
      },
      {
        label: 'Refunds',
        body: 'Approved refunds are processed promptly. The time it takes to appear in your account depends on your bank or payment method.',
      },
    ],
  },
  {
    number: '03',
    heading: 'Damaged or missing orders',
    items: [
      {
        label: 'Damaged on arrival',
        body: 'Please get in touch through our contact form with your order details and a photo. We will arrange a replacement or refund as quickly as we can.',
      },
      {
        label: 'Missing items',
        body: 'If your order is missing an item, please contact us soon after delivery. We check every order before it ships, but if something went wrong we will make it right.',
      },
      {
        label: 'Lost in transit',
        body: 'If tracking shows your order as delivered but you have not received it, give it a little time — carriers sometimes mark early. If it still has not arrived, contact us and we will look into it.',
      },
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ShippingPage() {
  return (
    <ClientProviders>
    <div className="min-h-screen bg-[#F8F5F1]">
      <Navbar />

      <main
        className="bg-[#F8F5F1] pt-24"
        data-kite-page-id="shipping"
        data-kite-page-type="policy"
      >

        {/* ── Page header ─────────────────────────────────────────────── */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20 border-b border-[#E9E2D7]">
          <p className="text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#8D9A83] mb-4"
            style={{ fontFamily: 'var(--font-inter)' }}>
            Policies
          </p>
          <h1
            className="text-[#3B3A38] max-w-[640px] !mx-0 text-left"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(3rem, 5vw, 4rem)', fontWeight: 300, lineHeight: 1.06, letterSpacing: '-0.02em' }}
          >
            Shipping &amp; Returns
          </h1>
          <p className="mt-5 text-[0.875rem] font-light text-[#68735F] leading-[1.6] max-w-[500px]">
            We keep this simple. If something goes wrong, get in touch and we will sort it out.
          </p>
        </section>

        {/* ── Policy sections ─────────────────────────────────────────── */}
        {sections.map((section) => (
          <section
            key={section.number}
            className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16 border-b border-[#E9E2D7]"
            data-kite-surface={`shipping.${section.heading.toLowerCase().replace(/\s+/g, '-')}`}
            data-kite-surface-type="features"
          >
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16">
              {/* Section label */}
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

              {/* Items */}
              <div className="flex flex-col gap-0">
                {section.items.map((item, i) => (
                  <div
                    key={item.label}
                    className={`flex flex-col gap-2 py-6 ${i < section.items.length - 1 ? 'border-b border-[#E9E2D7]' : ''}`}
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

        {/* ── CTA ─────────────────────────────────────────────────────── */}
        <section
          className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20"
          data-kite-surface="shipping.cta"
          data-kite-surface-type="cta"
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
              data-kite-cta-id="shipping-contact-cta"
              data-kite-role="primary"
              data-kite-event="contact_opened"
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
