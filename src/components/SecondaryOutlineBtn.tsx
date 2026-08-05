'use client';

/**
 * SecondaryOutlineBtn
 *
 * Outlined secondary button with three coordinated hover animations:
 *  1. Border line travels around the full perimeter (800ms, SVG stroke-dashoffset)
 *  2. Arrow exits right, new arrow enters from left
 *  3. Label text translates with the arrow for coordination
 *
 * Usage: wrap any <Link> or <a> content. Accepts `href` for Next.js Link,
 * or `onClick` for button behaviour.
 */

import { useRef, useState } from 'react';
import Link from 'next/link';

// ── Arrow icon ────────────────────────────────────────────────────────────────
function Arrow() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      aria-hidden="true"
      style={{ flexShrink: 0, display: 'block' }}
    >
      <line x1="1" y1="7" x2="13" y2="7" />
      <polyline points="8,2 13,7 8,12" />
    </svg>
  );
}

// ── Props ─────────────────────────────────────────────────────────────────────
interface SecondaryOutlineBtnProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  // Pass-through kite analytics
  'data-kite-cta-id'?: string;
  'data-kite-role'?: string;
  'data-kite-event'?: string;
  'data-kite-nav'?: string;
  'data-kite-nav-location'?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function SecondaryOutlineBtn({
  href,
  onClick,
  children,
  className = '',
  style,
  ...kiteProps
}: SecondaryOutlineBtnProps) {
  const [hovered, setHovered] = useState(false);
  const elRef = useRef<HTMLElement>(null);

  // Perimeter animation via SVG stroke-dashoffset
  // We render an absolutely-positioned SVG <rect> that draws around the border on hover.
  // The SVG fills the button exactly; stroke is inset 0.5px so it sits on the border edge.

  const borderColor = '#3B3A38';
  const restBorderColor = '#8D9A83';
  const textColor = hovered ? '#3B3A38' : '#68735F';

  const sharedStyles: React.CSSProperties = {
    fontFamily: 'var(--font-inter)',
    fontSize: '0.625rem',
    fontWeight: 400,
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    color: textColor,
    textDecoration: 'none',
    // Static border so the element keeps its size; animated SVG overlays the travelling line
    border: `1px solid ${hovered ? borderColor : restBorderColor}`,
    padding: '9px 16px',
    position: 'relative' as const,
    display: 'inline-flex',
    alignItems: 'center',
    overflow: 'hidden',
    gap: 0,
    outline: 'none',
    transition: 'color 200ms ease, border-color 200ms ease',
    cursor: 'pointer',
    ...style,
  };

  // Inner content: text + arrow slide in sync on hover
  // Two layers stacked via absolute; on hover the "rest" layer exits right,
  // the "hover" layer enters from left — creating the conveyor illusion.
  const innerTranslate = hovered ? '-100%' : '0%';
  const enterTranslate = hovered ? '0%' : '100%';

  const innerStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    transform: `translateX(${innerTranslate})`,
    transition: 'transform 400ms cubic-bezier(0.4, 0, 0.2, 1)',
    whiteSpace: 'nowrap' as const,
  };

  const enterStyle: React.CSSProperties = {
    position: 'absolute' as const,
    inset: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    transform: `translateX(${enterTranslate})`,
    transition: 'transform 400ms cubic-bezier(0.4, 0, 0.2, 1)',
    whiteSpace: 'nowrap' as const,
    padding: '9px 16px',
  };

  // SVG travelling border overlay
  // The SVG is absolute, inset 0, pointer-events none.
  // stroke-dasharray = perimeter; stroke-dashoffset animates 0 → perimeter on hover.
  // We use a CSS animation driven by a class toggle.
  const svgOverlay = (
    <svg
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'visible',
      }}
    >
      <rect
        x="0.5"
        y="0.5"
        width="calc(100% - 1px)"
        height="calc(100% - 1px)"
        fill="none"
        stroke={borderColor}
        strokeWidth="1"
        style={{
          strokeDasharray: '9999',
          strokeDashoffset: hovered ? '0' : '9999',
          transition: hovered
            ? 'stroke-dashoffset 800ms cubic-bezier(0.4, 0, 0.2, 1)'
            : 'stroke-dashoffset 0ms',
        }}
      />
    </svg>
  );

  const content = (
    <>
      {svgOverlay}
      {/* Exiting layer */}
      <span style={innerStyle}>
        {children}
        <Arrow />
      </span>
      {/* Entering layer */}
      <span style={enterStyle} aria-hidden="true">
        {children}
        <Arrow />
      </span>
    </>
  );

  const eventHandlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus: () => setHovered(true),
    onBlur: () => setHovered(false),
  };

  if (href) {
    return (
      <Link
        ref={elRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        style={sharedStyles}
        className={`focus-visible:ring-1 focus-visible:ring-[#8D9A83] ${className}`}
        {...eventHandlers}
        {...(kiteProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={elRef as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      style={sharedStyles}
      className={`focus-visible:ring-1 focus-visible:ring-[#8D9A83] ${className}`}
      {...eventHandlers}
      {...(kiteProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
