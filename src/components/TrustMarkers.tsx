'use client';

import { useState } from 'react';

import { TRUST_MARKERS } from './TrustMarkersData';
export function TrustMarkerItem({ marker }: { marker: typeof TRUST_MARKERS[number] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex flex-col items-center text-center gap-3 w-full px-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8D9A83] rounded-[1px]"
      style={{
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'transform 250ms ease',
        cursor: 'default',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      role="img"
      aria-label={`${marker.label}: ${marker.caption}`}
    >
      {/* Icon — lifts further and shifts to moss on hover */}
      <div
        style={{
          color: hovered ? '#68735F' : '#BEB8AF',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          transition: 'color 250ms ease, transform 250ms ease',
        }}
      >
        {marker.icon}
      </div>
      {/* Label — unified H3 styling for all cards */}
      <h3
        className="text-[1.125rem] leading-snug"
        style={{
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontWeight: 400,
          color: hovered ? '#68735F' : '#3B3A38',
          transition: 'color 250ms ease',
        }}
      >
        {marker.label}
      </h3>
      {/* Caption — starts dimmer so the reveal is more noticeable */}
      <p
        className="text-[0.625rem] font-light leading-snug max-w-[180px]"
        style={{
          fontFamily: 'var(--font-inter)',
          color: '#8D9A83',
          opacity: hovered ? 1 : 0.55,
          transition: 'opacity 250ms ease',
        }}
      >
        {marker.caption}
      </p>
    </div>
  );
}
