import React from 'react';

export const TRUST_MARKERS = [
  {
    id: 'natural-origin',
    label: '99.5% Natural Origin',
    caption: 'ISO 16128-2 Standard',
    external: false,
    icon: (
      // Shield with botanical sprig inside — standard & natural origin together
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 2L3 5.5v5c0 4 3 6.5 7 7.5 4-1 7-3.5 7-7.5v-5L10 2Z" />
        <line x1="10" y1="13" x2="10" y2="7" />
        <path d="M10 9 C8.5 8.5 7.5 9.5 8 11 C8.5 10.5 9.5 10 10 9Z" />
        <path d="M10 9 C11.5 8.5 12.5 9.5 12 11 C11.5 10.5 10.5 10 10 9Z" />
      </svg>
    ),
  },
  {
    id: 'probiotic',
    label: 'Probiotic Preserved',
    caption: 'Free of Parabens, MIT & Phenoxyethanol',
    external: false,
    icon: (
      // Droplet — gentle probiotic preservation
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 3c0 0-6 5.5-6 9.5a6 6 0 0 0 12 0C16 8.5 10 3 10 3Z" />
        <path d="M7.5 13.5c.5-1.5 2-2.5 3.5-2" />
      </svg>
    ),
  },
  {
    id: 'ifra',
    label: 'IFRA-Compliant Fragrance',
    caption: 'Fragrance Safety Standard',
    external: true,
    icon: (
      // Leaf — botanical / natural fragrance origin
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 16c2-6 6-10 12-11C15 11 11 15 4 16Z" />
        <line x1="4" y1="16" x2="10" y2="10" />
      </svg>
    ),
  },
  {
    id: 'vet-reviewed',
    label: 'Vet Reviewed',
    caption: 'Formulated with Veterinary Guidance',
    external: false,
    icon: (
      // Doctor — head with stethoscope draped at shoulders
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="10" cy="5.5" r="2.5" />
        <path d="M5 18c0-3.5 2.2-5.5 5-5.5s5 2 5 5.5" />
        <path d="M7 12.5 C6 11 6 9.5 7.5 9.5 C9 9.5 9 11 9 12 C9 13.2 10 14 11 14 C12.5 14 13 13 13 11.5" />
        <circle cx="13" cy="11" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
] as const;
