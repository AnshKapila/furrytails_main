'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientProviders from '@/components/ClientProviders';
import FeaturedIngredients from '@/components/FeaturedIngredients';
import SecondaryOutlineBtn from '@/components/SecondaryOutlineBtn';
import { useCart, parsePrice } from '@/lib/cart';
import {
  hero,
  heroImages,
  bestSellers,
  brandPhilosophy,
  pillars,
  allProducts,
  ourRange,
  founderNote,
  contact,
  ingredientStories,
} from '@/data/home';
import { PawPrint } from 'lucide-react';

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useReveal(threshold = 0.3) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { setVisible(entry.isIntersecting); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Inline SVG icons ─────────────────────────────────────────────────────────

function BtnArrow({ className = '' }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true" className={`btn-arrow flex-shrink-0 ${className}`}>
      <line x1="1" y1="7" x2="13" y2="7" />
      <polyline points="8,2 13,7 8,12" />
    </svg>
  );
}

// Dog outline — for species badge
function DogIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: 'inline', verticalAlign: 'middle', flexShrink: 0 }}>
      <path d="M14 2l2 2v3h2l1 2-2 1v4a2 2 0 01-2 2H5a2 2 0 01-2-2V9L1 8l1-2h2V4l2-2h1l1 2h4l1-2h1Z" />
      <circle cx="7.5" cy="10.5" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="12.5" cy="10.5" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Cat outline — for species badge
function CatIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: 'inline', verticalAlign: 'middle', flexShrink: 0 }}>
      <path d="M4 2L2 6v6a6 6 0 0012 0V6L12 2l-2 3h-4L4 2Z" />
      <circle cx="7.5" cy="10" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="12.5" cy="10" r="0.7" fill="currentColor" stroke="none" />
      <path d="M8.5 12.5c.4.5 2.6.5 3 0" />
    </svg>
  );
}

// Ghost bag icon for quick-add overlay
function BagIconOutline() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 4h12l-1.5 9H3.5L2 4Z" />
      <path d="M5.5 4C5.5 2.067 6.567 1 8 1s2.5 1.067 2.5 3" />
    </svg>
  );
}

// ─── Species badge — matches Best Seller pill style (ivory bg, charcoal text) ──
function SpeciesBadge({ species, className = '' }: { species: 'dog' | 'cat' | 'both'; className?: string }) {
  return (
    <span
      className={`inline-flex flex-row items-center gap-1 px-2 py-0.5 bg-[#F8F5F1]/85 text-[#3B3A38] text-[0.6875rem] font-normal tracking-[0.14em] uppercase leading-none ${className}`}
      style={{ fontFamily: 'var(--font-inter)', whiteSpace: 'nowrap' }}
    >
      {(species === 'dog' || species === 'both') && <DogIcon />}
      {(species === 'cat' || species === 'both') && <CatIcon />}
      <span style={{ lineHeight: 1 }}>
        {species === 'dog' && 'Dog'}
        {species === 'cat' && 'Cat'}
        {species === 'both' && 'Dog & Cat'}
      </span>
    </span>
  );
}

// ─── Product card ─────────────────────────────────────────────────────────────
// Hierarchy: image → name → variant/volume → price → add to cart
// Hover: card scale+tilt, image zoom 3-4%, border → sage
type ProductItem = typeof allProducts.products[0];

function ProductCard({ product }: { product: ProductItem }) {
  const [quickAdded, setQuickAdded] = useState(false);
  const { addItem, openDrawer } = useCart();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const prod = product as any;
  // Multi-variant: use first variant for quick-add price/image
  const hasVariants = 'variants' in prod && Array.isArray(prod.variants) && prod.variants.length > 0;
  const firstVariant = hasVariants ? prod.variants[0] : null;
  const displayPrice = firstVariant ? firstVariant.price : product.price;
  const displayImage = firstVariant?.image?.src ? firstVariant.image : product.image;
  // Single-variant label shown on card
  const singleVariantLabel: string | undefined = !hasVariants && prod.variantLabel ? prod.variantLabel : undefined;
  const volume: string | undefined = prod.volume;

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (quickAdded) return;
    addItem({
      id: product.id,
      name: product.name,
      price: displayPrice,
      priceNum: parsePrice(displayPrice),
      image: displayImage?.src ?? '',
      imageAlt: displayImage?.alt ?? product.name,
      variantId: firstVariant?.id,
      variantLabel: firstVariant?.label ?? singleVariantLabel,
    });
    setQuickAdded(true);
    setTimeout(() => {
      setQuickAdded(false);
      openDrawer();
    }, 800);
  }

  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col h-full bg-[#F8F5F1] overflow-hidden border border-[#D8CFC4] hover:border-[#8D9A83] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8D9A83] transition-[transform,border-color] duration-[800ms] ease-out hover:[transform:scale(1.015)_rotate(0.4deg)]"
      style={{ WebkitTapHighlightColor: 'transparent' }}
      data-kite-cta-id="product-card"
      data-kite-role="primary"
      data-kite-event="product_viewed"
      data-kite-item={product.id}
    >
      {/* Image — fixed 3:4 proportion, identical across all cards */}
      <div className="relative overflow-hidden aspect-[3/4] bg-[#F0EBE4] flex-shrink-0">
        <Image
          src={displayImage?.src ?? ''}
          alt={displayImage?.alt ?? product.name}
          fill
          className="object-cover object-center transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 25vw"
        />
        {product.badge && (
          <span
            className="absolute top-3 right-3 text-[0.6875rem] font-normal tracking-[0.14em] uppercase px-2 py-0.5 bg-[#F8F5F1]/85 text-[#3B3A38]"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {product.badge}
          </span>
        )}
        <SpeciesBadge species={product.species} className="absolute bottom-3 left-3" />
      </div>

      {/* Card body — grows to fill remaining height, price row pinned to bottom */}
      <div className="px-4 pt-4 pb-5 flex flex-col flex-1 gap-1.5">
        {/* Meta block — name + optional variant label + volume — occupies top of body */}
        <div className="flex flex-col gap-1.5 flex-1">
          {/* Name — Cormorant Garamond per approved typography rules */}
          <h3
            className="text-[1.125rem] text-[#3B3A38] leading-snug line-clamp-2"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 400 }}
          >
            {product.name}
          </h3>

          {/* Single-variant label */}
          {singleVariantLabel && (
            <p className="text-[0.75rem] font-light text-[#8D9A83]" style={{ fontFamily: 'var(--font-inter)' }}>
              {singleVariantLabel}
            </p>
          )}

          {/* Volume — Desktop */}
          {volume && (
            <p className="hidden md:block text-[0.6875rem] font-light text-[#BEB8AF] tracking-[0.04em]" style={{ fontFamily: 'var(--font-inter)' }}>
              {volume}
            </p>
          )}
        </div>

        {/* ── DESKTOP LAYOUT (md:flex) ──────────────────────────────────────── */}
        <div className="hidden md:flex items-center justify-between gap-2 pt-3">
          <div className="flex items-baseline gap-2">
            <span
              className="text-[1.125rem] text-[#3B3A38] leading-none"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 300 }}
            >
              {displayPrice}
            </span>
            {product.standardPrice && (
              <span
                className="text-[0.875rem] font-light text-[#BEB8AF]/70 line-through leading-none"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {product.standardPrice}
              </span>
            )}
          </div>
          {/* Add to cart */}
          <button
            type="button"
            onClick={handleQuickAdd}
            aria-label={`Add ${product.name} to cart`}
            className="focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8D9A83] flex-shrink-0 inline-flex items-center gap-1.5 border border-[#3B3A38] text-[#3B3A38] px-3 py-1.5 text-[0.6875rem] font-normal tracking-[0.06em] hover:bg-[#3B3A38] hover:text-[#F8F5F1] transition-colors duration-[800ms]"
            style={{ fontFamily: 'var(--font-inter)', whiteSpace: 'nowrap' }}
          >
            {quickAdded ? (
              <>
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="1 6 4.5 9.5 11 2.5"/>
                </svg>
                Added
              </>
            ) : (
              <>
                <BagIconOutline />
                Add to cart
              </>
            )}
          </button>
        </div>

        {/* ── MOBILE LAYOUT (md:hidden) ─────────────────────────────────────── */}
        <div className="flex flex-col gap-2.5 pt-2 md:hidden">
          {/* Row 1: Volume on left, Price on right */}
          <div className="flex items-baseline justify-between w-full">
            <span className="text-[0.6875rem] font-light text-[#BEB8AF] tracking-[0.04em]" style={{ fontFamily: 'var(--font-inter)' }}>
              {volume ?? ''}
            </span>
            <div className="flex items-baseline gap-1.5 ml-auto">
              <span
                className="text-[1.125rem] text-[#3B3A38] leading-none"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 300 }}
              >
                {displayPrice}
              </span>
              {product.standardPrice && (
                <span
                  className="text-[0.75rem] font-light text-[#BEB8AF]/70 line-through leading-none"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {product.standardPrice}
                </span>
              )}
            </div>
          </div>

          {/* Row 2: Add to cart button spanning full width from left to right */}
          <button
            type="button"
            onClick={handleQuickAdd}
            aria-label={`Add ${product.name} to cart`}
            className="w-full focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8D9A83] inline-flex items-center justify-center gap-1.5 border border-[#3B3A38] text-[#3B3A38] px-3 py-2 text-[0.6875rem] font-normal tracking-[0.06em] hover:bg-[#3B3A38] hover:text-[#F8F5F1] active:bg-[#3B3A38] active:text-[#F8F5F1] transition-colors duration-[400ms]"
            style={{ fontFamily: 'var(--font-inter)', whiteSpace: 'nowrap' }}
          >
            {quickAdded ? (
              <>
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="1 6 4.5 9.5 11 2.5"/>
                </svg>
                Added
              </>
            ) : (
              <>
                <BagIconOutline />
                Add to cart
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}

// ─── Trust Markers ────────────────────────────────────────────────────────────

const TRUST_MARKERS = [
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

function TrustMarkerItem({ marker }: { marker: typeof TRUST_MARKERS[number] }) {
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

function TrustMarkersSection() {
  return (
    <section
      className="py-16 md:py-20 bg-[#F8F5F1] border-t border-[#E9E2D7]"
      data-kite-surface="home.trust"
      data-kite-surface-type="testimonial"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Heading row */}
        <div className="mb-10 md:mb-12">
          <h2
            className="text-[#3B3A38] mb-3"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2rem, 3.2vw, 2.625rem)', fontWeight: 300, lineHeight: 1.15 }}
          >
            Your Standard is Now for Your Pet
          </h2>
          <p className="text-[0.8125rem] font-light text-[#8D9A83] leading-relaxed max-w-[520px]">
            Every formula is guided by globally recognised standards and transparent formulation principles.
          </p>
        </div>

        {/* Markers — 2x2 grid on mobile, 4-column equidistant full-width on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full justify-between items-start">
          {TRUST_MARKERS.map((marker) => (
            <TrustMarkerItem key={marker.id} marker={marker} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Video placeholder ────────────────────────────────────────────────────────
function VideoPlaceholder({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden group ${className}`}>
      <Image src={src} alt={alt} fill className="object-cover object-center transition-[transform,filter] duration-[800ms] ease-out [filter:saturate(50%)] group-hover:[filter:saturate(100%)]" sizes="(max-width: 768px) 100vw, 50vw" />
      <div className="absolute inset-0 bg-[#3B3A38]/15 group-hover:bg-[#3B3A38]/25 transition-colors duration-[800ms] pointer-events-none" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-14 h-14 rounded-full border border-[#F8F5F1]/60 flex items-center justify-center bg-[#F8F5F1]/20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-[800ms]">
          <svg width="16" height="18" viewBox="0 0 16 18" fill="none" aria-hidden="true"><path d="M2 1l12 8-12 8V1z" fill="#F8F5F1" /></svg>
        </div>
      </div>
      <div className="absolute bottom-3 left-3 text-[#F8F5F1]/70 text-[0.625rem] tracking-[0.2em] uppercase font-normal pointer-events-none">Coming soon</div>
    </div>
  );
}




function RevealSection({ children, className = '', delay = 0, id, ...rest }: {
  children: React.ReactNode; className?: string; delay?: number; id?: string; [key: string]: unknown;
}) {
  const { ref, visible } = useReveal(0.3);
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id={id}
      className={`anim-blur-slide ${visible ? 'in-view' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...(rest as React.HTMLAttributes<HTMLElement>)}
    >
      {children}
    </section>
  );
}

// ─── Contact form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  function validate() {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email.';
    if (!form.message.trim()) e.message = 'Please write a message.';
    return e;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/v1/kite-platform/website-contact-form-management/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, subject: `Furrytail enquiry from ${form.name}`, text_body: form.message, json_body: { name: form.name, email: form.email, message: form.message } }),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      window.__kite && window.__kite.conversion('contact');
    } catch { setStatus('error'); }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col gap-3" aria-live="polite">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#68735F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="8" cy="8" r="7"/><polyline points="5 8 7 10 11 6"/></svg>
          <p className="text-[0.78rem] font-normal text-[#68735F] tracking-wide">Message received.</p>
        </div>
        <p className="text-[0.78rem] font-light text-[#68735F] leading-relaxed">We will be in touch within a day or two.</p>
      </div>
    );
  }

  const fieldClass = (err?: string) => `w-full h-11 px-4 bg-transparent border text-[0.875rem] font-light text-[#3B3A38] placeholder:text-[#BEB8AF] outline-none transition-colors duration-200 focus:border-[#3B3A38] ${err ? 'border-[#c0392b]' : 'border-[#D8CFC4]'}`;
  const errIcon = <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><circle cx="5" cy="5" r="4.5"/><line x1="5" y1="3" x2="5" y2="5.5"/><circle cx="5" cy="7" r="0.4" fill="currentColor" stroke="none"/></svg>;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4" data-kite-form-type="contact" data-kite-conversion="contact" data-kite-event="contact_completed" data-kite-conversion-hook>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-name" className="text-[0.625rem] font-normal tracking-[0.15em] uppercase text-[#68735F]">Name</label>
        <input id="contact-name" name="name" type="text" autoComplete="name" required value={form.name} onChange={(e) => { setForm((f) => ({ ...f, name: e.target.value })); setErrors((er) => ({ ...er, name: undefined })); }} className={fieldClass(errors.name)} placeholder="Your name" />
        {errors.name && <p className="text-[0.65rem] text-[#c0392b] flex items-center gap-1" role="alert">{errIcon}{errors.name}</p>}
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-email" className="text-[0.625rem] font-normal tracking-[0.15em] uppercase text-[#68735F]">Email</label>
        <input id="contact-email" name="email" type="email" autoComplete="email" required value={form.email} onChange={(e) => { setForm((f) => ({ ...f, email: e.target.value })); setErrors((er) => ({ ...er, email: undefined })); }} className={fieldClass(errors.email)} placeholder="you@example.com" />
        {errors.email && <p className="text-[0.65rem] text-[#c0392b] flex items-center gap-1" role="alert">{errIcon}{errors.email}</p>}
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className="text-[0.625rem] font-normal tracking-[0.15em] uppercase text-[#68735F]">Message</label>
        <textarea id="contact-message" name="message" rows={4} required value={form.message} onChange={(e) => { setForm((f) => ({ ...f, message: e.target.value })); setErrors((er) => ({ ...er, message: undefined })); }} className={`w-full px-4 py-3 bg-transparent border text-[0.875rem] font-light text-[#3B3A38] placeholder:text-[#BEB8AF] outline-none transition-colors duration-200 focus:border-[#3B3A38] resize-none ${errors.message ? 'border-[#c0392b]' : 'border-[#D8CFC4]'}`} placeholder="Tell us what is on your mind." />
        {errors.message && <p className="text-[0.65rem] text-[#c0392b] flex items-center gap-1" role="alert">{errIcon}{errors.message}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <button type="submit" disabled={status === 'sending'} className="hero-btn-primary w-full justify-center" style={{ minHeight: '48px' }} data-kite-cta-id="contact-submit" data-kite-role="primary" data-kite-event="contact_requested">
          {status === 'sending' ? 'Sending...' : <><span>Send Message</span><BtnArrow /></>}
        </button>
        {status === 'error' && <p className="text-[0.65rem] text-[#c0392b] flex items-center gap-1.5" role="alert"><svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><circle cx="5" cy="5" r="4.5"/><line x1="3.5" y1="3.5" x2="6.5" y2="6.5"/><line x1="6.5" y1="3.5" x2="3.5" y2="6.5"/></svg>Please try again in a moment.</p>}
      </div>
    </form>
  );
}

function MobilePillarItem({ pillar, idx }: { pillar: typeof pillars[number]; idx: number }) {
  const [userToggled, setUserToggled] = useState<boolean | null>(null);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isOpen = userToggled !== null ? userToggled : inView;
  const num = String(idx + 1).padStart(2, '0');
  const handleToggle = () => setUserToggled(!isOpen);

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      key={pillar.id}
      className="relative overflow-hidden cursor-pointer"
      style={{ height: isOpen ? '360px' : '88px', transition: 'height 800ms cubic-bezier(0.4, 0, 0.2, 1)' }}
      onClick={handleToggle}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleToggle(); }}
      tabIndex={0}
      role="button"
      aria-label={`Learn about ${pillar.name}`}
      aria-expanded={isOpen}
    >
      <div className="absolute inset-0 pointer-events-none">
        <Image src={pillar.image?.src ?? ''} alt={pillar.image?.alt ?? pillar.name} fill className="object-cover transition-[filter] duration-[800ms] ease-out" style={{ objectPosition: pillar.id === 'defense' ? 'center 30%' : 'center', filter: isOpen ? 'saturate(90%)' : 'saturate(30%)', transform: pillar.id === 'defense' ? 'scale(1.35)' : undefined }} sizes="100vw" />
        <div className="absolute inset-0 transition-opacity duration-[800ms]" style={{ background: isOpen ? 'linear-gradient(to top, rgba(30,28,26,0.85) 0%, rgba(30,28,26,0.30) 55%, rgba(30,28,26,0.06) 100%)' : 'linear-gradient(to top, rgba(30,28,26,0.72) 0%, rgba(30,28,26,0.20) 60%, transparent 100%)' }} />
      </div>
      <div className="relative z-10 flex flex-col justify-end h-full px-5 py-5">
        <p className="text-[0.625rem] font-normal tracking-[0.28em] uppercase text-[#D8CFC4]/50 mb-1">{num}</p>
        <h3 className="text-[#F8F5F1]" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.5rem', fontWeight: 300, lineHeight: 1.2 }}>{pillar.name}</h3>
        <div className="overflow-hidden" style={{ maxHeight: isOpen ? '220px' : '0px', opacity: isOpen ? 1 : 0, marginTop: isOpen ? '12px' : '0px', transition: 'max-height 800ms cubic-bezier(0.4, 0, 0.2, 1), opacity 700ms ease-out, margin-top 800ms ease-out' }}>
          <div className="w-6 h-px bg-[#F8F5F1]/25 mb-3" />
          <p className="text-[#E8E0D6] mb-2" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.5rem', fontWeight: 300, lineHeight: 1.2 }}>{pillar.tagline}</p>
          <p className="text-[0.875rem] font-light text-[#BEB8AF] leading-relaxed">{pillar.body}</p>
          <Link href={pillar.href} className="inline-block mt-4 text-[0.58rem] font-normal tracking-[0.2em] uppercase text-[#F8F5F1]/70 border-b border-[#F8F5F1]/25 hover:text-[#F8F5F1] hover:border-[#F8F5F1]/60 transition-all duration-[800ms] focus:outline-none pb-px" onClick={(e) => e.stopPropagation()} data-kite-cta-id={`pillar-${pillar.id}-cta`} data-kite-role="secondary" data-kite-event="pillar_explored">{pillar.cta}</Link>
        </div>
      </div>
    </article>
  );
}

// ─── Pillar accordion row ─────────────────────────────────────────────────────
function PillarAccordionRow() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const handleToggle = (idx: number) => { setActiveIdx((prev) => (prev === idx ? null : idx)); };
  const effectiveIdx = hoveredIdx !== null ? hoveredIdx : activeIdx;

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex gap-[2px]" style={{ height: '480px' }} onMouseLeave={() => setHoveredIdx(null)}>
        {pillars.map((pillar, idx) => {
          const isActive = effectiveIdx === idx;
          const hasActive = effectiveIdx !== null;
          const num = String(idx + 1).padStart(2, '0');
          return (
            <article key={pillar.id} className="relative overflow-hidden cursor-pointer" style={{ flex: isActive ? '3.2' : hasActive ? '0.6' : '1', transition: 'flex 800ms cubic-bezier(0.4, 0, 0.2, 1)', minWidth: 0 }} onMouseEnter={() => setHoveredIdx(idx)} onClick={() => handleToggle(idx)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleToggle(idx); }} tabIndex={0} role="button" aria-label={`Learn about ${pillar.name}`} aria-expanded={activeIdx === idx}>
              <div className="absolute inset-0 pointer-events-none">
                <Image src={pillar.image?.src ?? ''} alt={pillar.image?.alt ?? pillar.name} fill className="object-cover transition-[transform,filter] duration-[800ms] ease-out" style={{ objectPosition: pillar.id === 'defense' ? 'center 30%' : 'center', filter: isActive ? 'saturate(90%)' : 'saturate(30%)', transform: pillar.id === 'defense' ? (isActive ? 'scale(1.404)' : 'scale(1.35)') : (isActive ? 'scale(1.04)' : 'scale(1)') }} sizes="(max-width: 768px) 100vw, 40vw" />
                <div className="absolute inset-0 transition-opacity duration-[800ms]" style={{ background: isActive ? 'linear-gradient(to top, rgba(30,28,26,0.82) 0%, rgba(30,28,26,0.28) 55%, rgba(30,28,26,0.04) 100%)' : 'linear-gradient(to top, rgba(30,28,26,0.70) 0%, rgba(30,28,26,0.22) 50%, rgba(30,28,26,0.04) 100%)' }} />
              </div>
              {/* Cards 0+1 expand rightward → content anchored left; cards 2+3 expand leftward → content anchored right */}
              <div className={`relative z-10 flex flex-col justify-end h-full px-5 py-6 lg:px-6 lg:py-7 ${idx >= 2 ? 'items-end text-right' : 'items-start text-left'}`}>
                <p className="text-[0.625rem] font-normal tracking-[0.28em] uppercase transition-all duration-[800ms]" style={{ color: isActive ? 'rgba(248,245,241,0.6)' : 'rgba(216,207,196,0.5)' }}>{num}</p>
                <h3 className="text-[#F8F5F1] mt-2" style={{ fontFamily: 'var(--font-cormorant)', fontSize: isActive ? '1.75rem' : '1.5rem', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2, transition: 'font-size 800ms cubic-bezier(0.4, 0, 0.2, 1)' }}>{pillar.name}</h3>
                <div className="overflow-hidden" style={{ maxHeight: isActive ? '240px' : '0px', opacity: isActive ? 1 : 0, marginTop: isActive ? '14px' : '0px', transition: 'max-height 800ms cubic-bezier(0.4, 0, 0.2, 1), opacity 700ms ease-out, margin-top 800ms ease-out' }}>
                  <div className={`w-8 h-px bg-[#F8F5F1]/25 mb-4 ${idx >= 2 ? 'ml-auto' : ''}`} />
                  <p className="text-[#E8E0D6] mb-3" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.5rem', fontWeight: 300, lineHeight: 1.2 }}>{pillar.tagline}</p>
                  <p className="text-[0.875rem] font-light text-[#BEB8AF] leading-relaxed">{pillar.body}</p>
                  <Link href={pillar.href} className="inline-block mt-5 text-[0.58rem] font-normal tracking-[0.2em] uppercase text-[#F8F5F1]/70 border-b border-[#F8F5F1]/25 hover:text-[#F8F5F1] hover:border-[#F8F5F1]/60 transition-all duration-[800ms] focus:outline-none pb-px" onClick={(e) => e.stopPropagation()} data-kite-cta-id={`pillar-${pillar.id}-cta`} data-kite-role="secondary" data-kite-event="pillar_explored">{pillar.cta}</Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {/* Mobile — Auto opens on scroll into view */}
      <div className="flex flex-col gap-px md:hidden">
        {pillars.map((pillar, idx) => (
          <MobilePillarItem key={pillar.id} pillar={pillar} idx={idx} />
        ))}
      </div>
    </>
  );
}

// ─── Our Range Gallery ────────────────────────────────────────────────────────
// Five products shown as a curated editorial exhibition.
// Desktop: scroll-linked horizontal-motion (vertical scroll drives horizontal pan).
// Mobile/reduced-motion: native horizontal swipe row.
// Uses the canonical website-scroll-management horizontal-motion contract.

function OurRangeGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    const viewport = viewportRef.current;
    const strip = stripRef.current;
    if (!root || !viewport || !strip) return;

    // ── Ancestor-overflow patch ──────────────────────────────────────────────
    const patched: { el: HTMLElement; o: string; x: string; y: string }[] = [];
    const breaks = (v: string) => v === 'hidden' || v === 'auto' || v === 'scroll';
    for (
      let el: HTMLElement | null = root;
      el && el !== document.documentElement;
      el = el.parentElement
    ) {
      const cs = getComputedStyle(el);
      if (!breaks(cs.overflow) && !breaks(cs.overflowX) && !breaks(cs.overflowY)) continue;
      const s = el.style;
      patched.push({ el, o: s.overflow, x: s.overflowX, y: s.overflowY });
      s.overflow = 'clip';
    }

    // ── horizontal-motion init (inlined from canonical init.js) ─────────────
    const priorStripWidth = strip.style.width;
    strip.style.width = '100%';

    const upgradeStrip = () => {
      strip.style.overflowX = 'visible';
      strip.style.scrollSnapType = 'none';
      if (strip.scrollLeft) strip.scrollLeft = 0;
    };
    const restoreStrip = () => {
      strip.style.overflowX = '';
      strip.style.scrollSnapType = '';
    };

    const mq = window.matchMedia('(max-width: 767px)');
    const reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isStatic = () => mq.matches || reduceMq.matches;

    let raf = 0;
    let inside = false;
    let pinRange = 0;
    let distance = 0;
    const PACE = 1.6;

    const layout = () => {
      if (isStatic()) {
        root.style.height = '';
        pinRange = 0;
        distance = 0;
        strip.style.transform = 'translate3d(0,0,0)';
        restoreStrip();
        return;
      }
      upgradeStrip();
      distance = Math.max(0, strip.scrollWidth - viewport.clientWidth);
      if (distance <= 0) {
        root.style.height = '';
        pinRange = 0;
        strip.style.transform = 'translate3d(0,0,0)';
        restoreStrip();
        return;
      }
      pinRange = distance * PACE;
      root.style.height = `${pinRange + window.innerHeight}px`;
    };

    const update = () => {
      raf = 0;
      if (isStatic() || pinRange <= 0 || distance <= 0) {
        strip.style.transform = 'translate3d(0,0,0)';
        return;
      }
      const rect = root.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / pinRange));
      strip.style.transform = `translate3d(${-progress * distance}px, 0, 0)`;
    };

    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { layout(); update(); });
    };

    const onScroll = () => {
      if (!inside || raf) return;
      raf = requestAnimationFrame(update);
    };

    const gate = new IntersectionObserver(
      (entries) => {
        inside = entries[0]?.isIntersecting ?? false;
        if (inside) schedule();
      },
      { rootMargin: '0px', threshold: 0 }
    );
    gate.observe(root);

    const resizeObs = new ResizeObserver(schedule);
    resizeObs.observe(strip);

    mq.addEventListener('change', schedule);
    reduceMq.addEventListener('change', schedule);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    strip.querySelectorAll('img').forEach((img) => {
      if (!(img as HTMLImageElement).complete) {
        img.addEventListener('load', schedule, { once: true });
      }
    });

    schedule();

    return () => {
      patched.forEach(({ el, o, x, y }) => {
        el.style.overflow = o;
        el.style.overflowX = x;
        el.style.overflowY = y;
      });
      gate.disconnect();
      resizeObs.disconnect();
      mq.removeEventListener('change', schedule);
      reduceMq.removeEventListener('change', schedule);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', schedule);
      if (raf) cancelAnimationFrame(raf);
      root.style.height = '';
      strip.style.transform = '';
      strip.style.width = priorStripWidth;
      restoreStrip();
    };
  }, []);

  return (
    // overflow-clip on the section root — never overflow-hidden (breaks sticky pin)
    <section
      ref={sectionRef}
      className="overflow-clip max-md:!h-auto border-t border-[#E9E2D7]"
      data-website-scroll-management
      data-scroll-pattern="horizontal-motion"
      data-kite-surface="home.our-range"
      data-kite-surface-type="features"
      id="all-products"
    >
      {/* Sticky viewport — h-screen, flex-col: header + products; max-md fallback: static */}
      <div
        ref={viewportRef}
        className="sticky top-0 h-screen flex flex-col justify-center max-md:static max-md:h-auto"
        data-scroll-viewport
      >
        {/* Section header — pinned inside the viewport alongside the products */}
        <div className="max-w-[1200px] mx-auto w-full px-6 md:px-8 pt-12 md:pt-16 pb-8 md:pb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 flex-shrink-0">
          <div>
            <p
              className="text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#BEB8AF] mb-3"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {ourRange.eyebrow}
            </p>
            <h2
              className="text-[#3B3A38] leading-tight"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2rem, 3.2vw, 2.625rem)', fontWeight: 300, lineHeight: 1.15 }}
            >
              {ourRange.heading}
            </h2>
          </div>
          <SecondaryOutlineBtn
            href="/shop"
            data-kite-cta-id="our-range-shop-cta"
            data-kite-role="secondary"
            data-kite-event="shop_clicked"
          >
            View all
          </SecondaryOutlineBtn>
        </div>

        {/* Strip — authored as native swipe row; JS upgrades to translate on desktop */}
        <div
          ref={stripRef}
          className="w-full flex items-center gap-10 md:gap-14 overflow-x-auto snap-x px-6 md:px-16 pb-16 md:pb-10 will-change-transform"
          style={{ scrollbarWidth: 'none' } as React.CSSProperties}
          data-scroll-strip
        >
          {ourRange.products.map((product, i) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group flex-[0_0_72%] md:flex-[0_0_26%] min-w-0 snap-center flex flex-col items-center gap-6 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8D9A83] cursor-pointer"
              data-kite-cta-id="our-range-product"
              data-kite-role="primary"
              data-kite-event="product_viewed"
              data-kite-item={product.id}

            >
              {/* Circle image */}
              <div
                className="relative overflow-hidden rounded-full border border-[#D8CFC4] flex-shrink-0"
                style={{
                  width: 'clamp(200px, 22vw, 280px)',
                  height: 'clamp(200px, 22vw, 280px)',
                  transition: 'border-color 800ms ease-out, box-shadow 800ms ease-out',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = '#8D9A83';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(59,58,56,0.10)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = '#D8CFC4';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                }}
              >
                <img
                  src={product.image?.src ?? ''}
                  alt={product.image?.alt ?? product.name}
                  loading="eager"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  style={{ transition: 'transform 900ms ease-out' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.07)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                />
                {/* Soft editorial vignette */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(59,58,56,0.12) 100%)' }}
                  aria-hidden="true"
                />
              </div>

              {/* Text — name + descriptor only, no price/badge/button */}
              <div className="flex flex-col items-center gap-2 text-center max-w-[220px]">
                <h3
                  className="text-[#3B3A38]"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(1.25rem, 1.8vw, 1.5rem)', fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.01em' }}
                >
                  {product.name}
                </h3>
                <p
                  className="text-[0.75rem] font-light text-[#8D9A83] leading-[1.55]"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {product.descriptor}
                </p>
              </div>
            </Link>
          ))}

          {/* Trailing breathing room */}
          <div className="flex-shrink-0 w-6 md:w-16" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

// NatureFormulaSection has been replaced by the FeaturedIngredients component
// imported from @/components/FeaturedIngredients

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <ClientProviders>
    <div className="min-h-screen bg-[#F8F5F1]" style={{ overflow: 'clip' }}>
      <Navbar />

      <main className="bg-[#F8F5F1]" data-kite-page-id="home" data-kite-page-type="landing">

        {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
        <section
          ref={heroRef as React.RefObject<HTMLElement>}
          className="hero hero-fullbleed"
          data-kite-surface="home.hero"
          data-kite-surface-type="hero"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-right"
          >
            <source src="/Labrador_cat_curtains_plant_sunlight_202608061234.mp4" type="video/mp4" />
          </video>

          {/* Subtle left-to-right overlay for copy legibility */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(248,245,241,0.78) 0%, rgba(248,245,241,0.38) 45%, rgba(248,245,241,0.04) 75%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Copy — left-aligned */}
          <div className={`hero-copy hero-copy-left transition-[opacity,transform] duration-700 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[14px]'}`}>
            <h1>{hero.headline} <em>{hero.headlineEm}</em></h1>
            <p className="intro">{hero.body}</p>
            <div className="hero-actions hero-actions-left">
              <Link href="/shop" className="hero-btn-primary" data-kite-cta-id="hero-shop-now" data-kite-role="primary" data-kite-event="shop_clicked">
                {hero.primaryCta}<BtnArrow />
              </Link>
            </div>
          </div>
        </section>

        {/* ── 2. FOUR PILLARS ──────────────────────────────────────────────── */}
        <section id="pillars" className="py-16 md:py-20 bg-[#F8F5F1]" data-kite-surface="home.pillars" data-kite-surface-type="features">
          <div className="max-w-[1200px] mx-auto px-6 md:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#8D9A83] mb-2">Four categories</p>
                <h2 className="text-[#3B3A38]" style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem, 3.2vw, 2.625rem)', fontWeight: 300, lineHeight: 1.15 }}>Everything has a reason.</h2>
              </div>
              <SecondaryOutlineBtn
                href="/shop"
                data-kite-cta-id="pillars-shop-cta"
                data-kite-role="secondary"
                data-kite-event="shop_clicked"
              >
                Check out full range
              </SecondaryOutlineBtn>
            </div>
            <PillarAccordionRow />
          </div>
        </section>

        {/* ── 3. TRUST MARKERS ─────────────────────────────────────────────── */}
        <TrustMarkersSection />

        {/* ── 4. FEATURED PRODUCTS ─────────────────────────────────────────── */}
        <RevealSection id="best-sellers" className="py-16 md:py-20 bg-[#EDE7DF]" data-kite-surface="home.best-sellers" data-kite-surface-type="features">
          <div className="max-w-[1200px] mx-auto px-6 md:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#8D9A83] mb-2">{bestSellers.eyebrow}</p>
                <h2 className="text-[#3B3A38]" style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem, 3.2vw, 2.625rem)', fontWeight: 300, lineHeight: 1.15 }}>{bestSellers.heading}</h2>
              </div>
              <SecondaryOutlineBtn
                href="/shop"
                data-kite-cta-id="bestsellers-view-all"
                data-kite-role="secondary"
                data-kite-event="range_explored"
              >
                View all products
              </SecondaryOutlineBtn>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {bestSellers.products.map((product, i) => (
                <div key={product.id} className="transition-[opacity,transform] ease-out" style={{ transitionDuration: '350ms', transitionDelay: `${i * 60}ms` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* ── 5. BRAND PHILOSOPHY ────────────────────────────────────────────── */}
        <section id="brand-philosophy" className="relative bg-[#F8F5F1] overflow-hidden" data-kite-surface="home.brand-philosophy" data-kite-surface-type="features">
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch min-h-screen">
              
              {/* Media col - 50% left, no margin, 100vh height */}
              <div className="relative h-[60vh] md:h-screen w-full">
                <RevealSection className="w-full h-full">
                  <div className="relative w-full h-full overflow-hidden group">
                    <Image
                      src={brandPhilosophy.image.src}
                      alt={brandPhilosophy.image.alt}
                      fill
                      className="object-cover object-center transition-[transform] duration-[2500ms] ease-out hover:scale-[1.015]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </div>
                </RevealSection>
              </div>

              {/* Copy col - Offset right, deliberate spacing */}
              <div className="relative h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32 py-16 md:py-0 bg-[#F0EBE4]">
                <RevealSection delay={200}>
                  <p className="text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#8D9A83] mb-6 md:mb-8">{brandPhilosophy.eyebrow}</p>
                  <h2 className="text-[#3B3A38] mb-8 md:mb-10" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2.25rem, 4vw, 3.25rem)', fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.01em' }}>
                    {brandPhilosophy.heading}
                  </h2>
                  <div className="flex flex-col gap-8">
                    {brandPhilosophy.body.map((line, i) => (
                      <p key={i} className="text-[1.125rem] font-light text-[#3B3A38]/90 leading-[1.7] max-w-[480px]" style={{ fontFamily: 'var(--font-inter)' }}>
                        {line}
                      </p>
                    ))}
                    
                    <ul className="flex flex-col gap-5 mt-2">
                      {brandPhilosophy.pointers?.map((pointer, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <PawPrint className="w-[18px] h-[18px] flex-shrink-0 text-[#8D9A83] mt-1" aria-hidden="true" strokeWidth={1.5} />
                          <span className="text-[1.0625rem] font-light text-[#3B3A38]/90 leading-[1.6] max-w-[420px]" style={{ fontFamily: 'var(--font-inter)' }}>
                            {pointer}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </RevealSection>
              </div>

            </div>
          </div>
        </section>

        {/* ── 6. FEATURED INGREDIENTS — scroll-pinned split editorial ──────── */}
        <FeaturedIngredients stories={ingredientStories.stories.slice(0, 4)} />

        {/* ── 7. OUR RANGE EXHIBITION GALLERY ──────────────────────────────── */}
        <OurRangeGallery />

        {/* ── 8. FOUNDER NOTE ──────────────────────────────────────────────── */}
        <RevealSection id="founder-note" className="py-16 md:py-20 bg-[#3B3A38]" data-kite-surface="home.founder-note" data-kite-surface-type="testimonial">
          <div className="max-w-[760px] mx-auto px-6 md:px-8 text-center">
            <p className="text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#8D9A83] mb-8">{founderNote.eyebrow}</p>
            <div className="flex justify-center mb-6" aria-hidden="true">
              <svg width="28" height="22" viewBox="0 0 28 22" fill="none"><path d="M0 22V12.6C0 5.8 4.2 1.6 12.6 0l1.4 2.4C8.8 3.4 6 6 5.4 10H11V22H0ZM17 22V12.6C17 5.8 21.2 1.6 29.6 0L31 2.4C25.8 3.4 23 6 22.4 10H28V22H17Z" fill="#68735F" opacity="0.6"/></svg>
            </div>
            <blockquote>
              <p className="text-[#F8F5F1] mb-6 italic" style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(1.5rem, 2.5vw, 1.75rem)', fontWeight: 300, lineHeight: 1.2 }}>{founderNote.pullQuote}</p>
            </blockquote>
            <div className="w-8 h-px bg-[#68735F] mx-auto mb-6" />
            <p className="text-[0.875rem] font-light text-[#D8CFC4] leading-[1.6] mb-5">{founderNote.body}</p>
            <p className="text-[0.625rem] font-normal tracking-[0.2em] uppercase text-[#8D9A83]">{founderNote.attribution}</p>
          </div>
        </RevealSection>

        {/* ── 9. CONTACT ───────────────────────────────────────────────────── */}
        <RevealSection id="contact" className="py-16 md:py-20" data-kite-surface="home.contact" data-kite-surface-type="contact">
          <div className="max-w-[1200px] mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-stretch">
              <div className="relative overflow-hidden group aspect-[4/3] md:aspect-auto md:min-h-[400px]">
                <Image src={contact.image.src} alt={contact.image.alt} fill className="object-cover object-center transition-[filter] duration-[800ms] ease-out [filter:saturate(50%)] group-hover:[filter:saturate(100%)]" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-[#F8F5F1]/10 pointer-events-none" />
              </div>
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#8D9A83] mb-2">{contact.eyebrow}</p>
                  <h2 className="text-[#3B3A38] mb-3" style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem, 3.2vw, 2.625rem)', fontWeight: 300, lineHeight: 1.15 }}>{contact.heading}</h2>
                  <p className="text-[0.875rem] font-light text-[#68735F] leading-[1.6]">{contact.body}</p>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </RevealSection>

      </main>

      <Footer />
    </div>
    </ClientProviders>
  );
}
