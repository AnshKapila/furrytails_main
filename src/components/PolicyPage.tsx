import type { ReactNode } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientProviders from '@/components/ClientProviders';

// Layout shared by the legal pages (privacy, terms, cookies). Numbered
// sections, each a list of labelled clauses - the same design the pages had,
// in one place.

export interface PolicyItem {
  label: string;
  body: ReactNode;
}

export interface PolicySection {
  heading: string;
  items: PolicyItem[];
}

// The business behind furrytailjoy.com, as on its GST registration certificate.
export const COMPANY = {
  legalName: 'Clamique Personal Care Private Limited',
  brand: 'Furrytail',
  gstin: '06AANCC8685M1ZR',
  address: 'Booth No. 460, 219, 2F, ILD Trade Centre, Sector 47, Sohna Road, Gurugram, Haryana 122018, India',
  email: 'hello@furrytailjoy.com',
  phone: '+91 87967 86531',
  // Named Grievance Officer, as the IT Rules and Consumer Protection
  // (E-Commerce) Rules require.
  grievanceOfficer: 'BD',
} as const;

/** Grievance Officer contact, shared by the privacy policy and terms. */
export function GrievanceOfficer() {
  return (
    <p>
      {COMPANY.grievanceOfficer}, Grievance Officer, {COMPANY.legalName}, {COMPANY.address}. Email{' '}
      <a href={`mailto:${COMPANY.email}`} className={POLICY_LINK}>{COMPANY.email}</a>, phone {COMPANY.phone}. We acknowledge
      complaints within 48 hours and aim to resolve them within one month.
    </p>
  );
}

export const POLICY_LINK =
  'underline decoration-[#8D9A83]/40 underline-offset-4 hover:text-[#3B3A38] hover:decoration-[#3B3A38]/60 transition-colors';

export default function PolicyPage({
  title,
  intro,
  lastUpdated,
  sections,
  pageId,
}: {
  title: string;
  intro: ReactNode;
  /** ISO date, e.g. '2026-10-13'. */
  lastUpdated: string;
  sections: PolicySection[];
  pageId: string;
}) {
  const updated = new Date(`${lastUpdated}T00:00:00`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <ClientProviders>
      <div className="min-h-screen bg-[#F8F5F1]">
        <Navbar />

        <main className="bg-[#F8F5F1] pt-24" data-kite-page-id={pageId} data-kite-page-type="policy">
          {/* Header */}
          <section className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20 border-b border-[#E9E2D7]">
            <p
              className="text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#8D9A83] mb-4"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Policies
            </p>
            <h1
              className="text-[#3B3A38] max-w-[640px] !mx-0 text-left"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(3rem, 5vw, 4rem)', fontWeight: 300, lineHeight: 1.06, letterSpacing: '-0.02em' }}
            >
              {title}
            </h1>
            <div className="mt-5 text-[0.875rem] font-light text-[#68735F] leading-[1.6] max-w-[620px] space-y-3">
              {intro}
            </div>
            <p className="mt-6 text-[0.75rem] font-light text-[#8D9A83]" style={{ fontFamily: 'var(--font-inter)' }}>
              Last updated: <time dateTime={lastUpdated}>{updated}</time>
            </p>
          </section>

          {/* Sections */}
          {sections.map((section, s) => (
            <section
              key={section.heading}
              className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16 border-b border-[#E9E2D7]"
            >
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16">
                <div className="flex flex-col gap-1">
                  <p
                    className="text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#BEB8AF]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {String(s + 1).padStart(2, '0')}
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
                      className={`flex flex-col gap-2 py-6 ${i < section.items.length - 1 ? 'border-b border-[#E9E2D7]' : ''}`}
                    >
                      <h3
                        className="text-[0.875rem] font-medium text-[#3B3A38] tracking-wide"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        {item.label}
                      </h3>
                      <div className="text-[0.875rem] font-light text-[#68735F] leading-[1.6] space-y-3">
                        {item.body}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}

          {/* CTA */}
          <section className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
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
              <Link href="/#contact" className="hero-btn-primary flex-shrink-0" style={{ minHeight: '48px', padding: '0 28px' }}>
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
