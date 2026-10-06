import React from 'react';
import { TRUST_MARKERS } from './TrustMarkersData';

// Running banner under the homepage hero. Claims are limited to ones the site
// already makes elsewhere (TrustMarkersData, product labels) - add a line here
// only once it is substantiated.

const icon = (path: React.ReactNode) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {path}
  </svg>
);

const markerIcon = (id: (typeof TRUST_MARKERS)[number]['id']) =>
  TRUST_MARKERS.find((m) => m.id === id)!.icon;

const ITEMS: { label: string; icon: React.ReactNode }[] = [
  { label: '99.5% natural origin', icon: markerIcon('natural-origin') },
  { label: 'Probiotic preserved', icon: markerIcon('probiotic') },
  {
    label: 'Free of parabens, MIT & phenoxyethanol',
    // Circle with a slash - "free of"
    icon: icon(
      <>
        <circle cx="10" cy="10" r="7" />
        <line x1="5" y1="15" x2="15" y2="5" />
      </>,
    ),
  },
  { label: 'IFRA-compliant fragrance', icon: markerIcon('ifra') },
  { label: 'Vet reviewed', icon: markerIcon('vet-reviewed') },
  {
    label: 'Made for dogs & cats',
    // Paw print
    icon: icon(
      <>
        <ellipse cx="10" cy="13.5" rx="3.5" ry="3" />
        <circle cx="5" cy="9" r="1.4" />
        <circle cx="8" cy="5.5" r="1.4" />
        <circle cx="12" cy="5.5" r="1.4" />
        <circle cx="15" cy="9" r="1.4" />
      </>,
    ),
  },
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <li key={item.label} className="flex items-center gap-3 px-6 md:px-8 whitespace-nowrap">
          <span className="text-[#E9E2D7]">{item.icon}</span>
          <span className="text-[0.875rem] md:text-[0.9375rem] font-light tracking-[0.02em] text-[#F8F5F1]">
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function TrustTicker() {
  return (
    <section
      aria-label="Why Furrytail"
      className="trust-ticker relative overflow-hidden bg-[#68735F] py-4 md:py-5"
      data-kite-surface="home.trust-ticker"
      data-kite-surface-type="banner"
    >
      {/* Two identical rows; the track slides by exactly one row's width, so
          the loop is seamless. The second row is hidden from screen readers. */}
      <div className="trust-ticker-track flex w-max">
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
