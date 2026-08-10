'use client';

/**
 * FeaturedIngredients — Homepage Featured Ingredients section
 *
 * Layout: Full-width 50/50 split screen. Left = immersive ingredient photo
 * with ingredient label/name/description overlaid at bottom-left.
 * Right = always-visible product card (price, featured-in, name, desc, CTA).
 *
 * Scroll behaviour: Section is scroll-pinned inside the viewport for N chapters.
 * Content swaps on scroll progress. Normal scrolling resumes after last chapter.
 *
 * Works on both desktop and mobile. Mobile uses a tighter pin range so the
 * scroll distance is proportional to a phone screen.
 */

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SecondaryOutlineBtn from '@/components/SecondaryOutlineBtn';

// ── Types ────────────────────────────────────────────────────────────────────

export interface IngredientStory {
  index: number;
  ingredient: string;
  shortIntro: string;
  benefits: string[];
  product: string;
  productId: string;
  productDesc: string;
  price: string;
  ingredientImage: { src: string; alt: string };
  productImage: { src: string; alt: string };
}

// ── Inline BtnArrow icon ─────────────────────────────────────────────────────

function BtnArrow() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <line x1="1" y1="7" x2="13" y2="7" />
      <polyline points="8,2 13,7 8,12" />
    </svg>
  );
}

// ── Chapter progress indicator ────────────────────────────────────────────────

function ProgressDots({ total, active }: { total: number; active: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} aria-hidden="true">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          style={{
            display: 'block',
            width: i === active ? '20px' : '6px',
            height: '1px',
            background: i === active ? 'rgba(248,245,241,0.85)' : 'rgba(248,245,241,0.35)',
            transition: 'width 500ms ease, background 500ms ease',
          }}
        />
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function FeaturedIngredients({ stories }: { stories: IngredientStory[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const rafRef = useRef(0);
  const pinRangeRef = useRef(0);
  const sectionTopRef = useRef(0);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastIdxRef = useRef(0);

  const CHAPTER_COUNT = stories.length;
  // Scroll distance per chapter — viewport heights.
  // Desktop: 90vh per chapter. Mobile: 70vh (shorter distance on small screens).
  const CHAPTER_VH_DESKTOP = 0.9;
  const CHAPTER_VH_MOBILE = 0.7;

  // ── Scroll-pin engine ──────────────────────────────────────────────────────
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    // Patch ancestor overflow so sticky works inside overflow:clip parents.
    // overflow:clip doesn't break sticky the same way hidden does, but we patch
    // hidden/auto/scroll ancestors to 'clip' so scroll events propagate correctly.
    const patched: { el: HTMLElement; o: string; x: string; y: string }[] = [];
    const breaksSticky = (v: string) => v === 'hidden' || v === 'auto' || v === 'scroll';
    for (
      let el: HTMLElement | null = root.parentElement;
      el && el !== document.documentElement;
      el = el.parentElement
    ) {
      const cs = getComputedStyle(el);
      if (!breaksSticky(cs.overflow) && !breaksSticky(cs.overflowX) && !breaksSticky(cs.overflowY)) continue;
      const s = el.style;
      patched.push({ el, o: s.overflow, x: s.overflowX, y: s.overflowY });
      s.overflow = 'clip';
    }

    const reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileMq = window.matchMedia('(max-width: 767px)');

    // Only bail out for reduced-motion — mobile participates in the scroll animation
    const isStatic = () => reduceMq.matches;

    const computeLayout = () => {
      if (isStatic()) {
        root.style.height = '';
        pinRangeRef.current = 0;
        return;
      }
      const vH = window.innerHeight;
      const chapterVh = mobileMq.matches ? CHAPTER_VH_MOBILE : CHAPTER_VH_DESKTOP;
      // (CHAPTER_COUNT - 1) transitions between N chapters.
      // Add one viewport at the end so section exit is smooth.
      const totalPinRange = vH * chapterVh * (CHAPTER_COUNT - 1);
      pinRangeRef.current = totalPinRange;
      root.style.height = `${totalPinRange + vH}px`;

      // Cache the section's absolute top offset once (re-computed on layout).
      // Use pageYOffset + getBoundingClientRect for accuracy even after layout shifts.
      sectionTopRef.current = window.scrollY + root.getBoundingClientRect().top;
    };

    const update = () => {
      rafRef.current = 0;
      if (isStatic() || pinRangeRef.current <= 0) return;

      // Use scrollY relative to cached section top — unaffected by ancestor clip.
      const scrolledIntoSection = window.scrollY - sectionTopRef.current;
      const rawProgress = scrolledIntoSection / pinRangeRef.current;
      const progress = Math.min(1, Math.max(0, rawProgress));

      // Map progress [0,1] across (CHAPTER_COUNT - 1) segment boundaries.
      // Each chapter occupies 1/(CHAPTER_COUNT-1) of progress except chapter 0 which starts at 0.
      // This ensures chapter N activates exactly when progress crosses N/(CHAPTER_COUNT-1).
      const segments = CHAPTER_COUNT - 1;
      const newIdx = segments <= 0
        ? 0
        : Math.min(CHAPTER_COUNT - 1, Math.floor(progress * segments + 0.5));

      if (newIdx !== lastIdxRef.current) {
        lastIdxRef.current = newIdx;
        setActiveIdx(newIdx);

        // Trigger fade-out / fade-in transition
        if (transitionTimer.current) clearTimeout(transitionTimer.current);
        setIsTransitioning(true);
        transitionTimer.current = setTimeout(() => setIsTransitioning(false), 380);
      }
    };

    const schedule = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        computeLayout();
        // Re-cache section top after layout change
        if (root) {
          sectionTopRef.current = window.scrollY + root.getBoundingClientRect().top;
        }
        update();
      });
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(update);
    };

    mobileMq.addEventListener('change', schedule);
    reduceMq.addEventListener('change', schedule);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    // Initial layout + position cache
    schedule();

    return () => {
      patched.forEach(({ el, o, x, y }) => {
        el.style.overflow = o; el.style.overflowX = x; el.style.overflowY = y;
      });
      mobileMq.removeEventListener('change', schedule);
      reduceMq.removeEventListener('change', schedule);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', schedule);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
      root.style.height = '';
    };
  }, [CHAPTER_COUNT, CHAPTER_VH_DESKTOP, CHAPTER_VH_MOBILE]);

  const story = stories[activeIdx];

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Reduced-motion override */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .ft-content-animate {
            transition: none !important;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="overflow-clip bg-[#F8F5F1]"
        data-kite-surface="home.ingredients"
        data-kite-surface-type="features"
        id="ingredients"
        aria-label="Featured Ingredients"
      >
        {/* ── Sticky canvas — always one viewport tall ── */}
        <div className="sticky top-0 overflow-clip" style={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}>

          {/* ── Section header strip ── */}
          <div
            style={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 'clamp(12px, 1.5vh, 16px) clamp(20px, 4vw, 56px)',
              background: '#F8F5F1',
            }}
          >
            {/* Left: heading + descriptor */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: 'clamp(2rem, 3.2vw, 2.625rem)',
                  fontWeight: 300,
                  lineHeight: 1.15,
                  letterSpacing: '-0.01em',
                  color: '#3B3A38',
                  margin: 0,
                }}
              >
                Nature Behind Every Formula
              </h2>
              <p
                className="hidden md:block"
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.5625rem',
                  fontWeight: 300,
                  letterSpacing: '0.04em',
                  color: '#8D9A83',
                  lineHeight: 1.4,
                  margin: 0,
                }}
              >
                Every botanical is selected with intention — gentle, purposeful and crafted for everyday pet wellness.
              </p>
            </div>

            {/* Right: secondary CTA */}
            <SecondaryOutlineBtn
              href="/ingredients"
              className="hidden md:inline-flex"
              data-kite-cta-id="ingredients-view-all"
              data-kite-role="secondary"
              data-kite-event="ingredients_explored"
            >
              View All Ingredients
            </SecondaryOutlineBtn>
          </div>

          {/* ── Main split canvas ── */}
          <div style={{ flex: 1, display: 'flex', minHeight: 0, position: 'relative' }}>

            {/* ── LEFT PANEL: ingredient photography — desktop only ── */}
            <div
              className="hidden md:block"
              style={{
                position: 'relative',
                width: '50%',
                flexShrink: 0,
                overflow: 'hidden',
              }}
              aria-hidden="true"
              onMouseEnter={() => setIsImageHovered(true)}
              onMouseLeave={() => setIsImageHovered(false)}
            >
              {/* Image layers — crossfade between chapters */}
              {stories.map((s, i) => (
                <div
                  key={s.index}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: i === activeIdx ? 1 : 0,
                    transition: 'opacity 700ms ease-in-out',
                    zIndex: i === activeIdx ? 2 : 1,
                  }}
                >
                  <Image
                    src={s.ingredientImage.src}
                    alt={s.ingredientImage.alt}
                    fill
                    className="object-cover object-center transition-[filter] duration-[800ms] ease-out"
                    style={{ filter: isImageHovered ? 'saturate(100%)' : 'saturate(50%)' }}
                    sizes="50vw"
                    priority={i === 0}
                    loading="eager"
                  />
                  {/* Editorial vignette */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(20,18,16,0.88) 0%, rgba(20,18,16,0.62) 30%, rgba(20,18,16,0.22) 55%, transparent 72%)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>
              ))}

              {/* Counter — bottom-right */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '32px',
                  right: '32px',
                  zIndex: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '10px',
                }}
              >
                <ProgressDots total={CHAPTER_COUNT} active={activeIdx} />
                <p
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.5rem',
                    fontWeight: 400,
                    letterSpacing: '0.24em',
                    textTransform: 'uppercase',
                    color: 'rgba(248,245,241,0.65)',
                    margin: 0,
                  }}
                >
                  {String(activeIdx + 1).padStart(2, '0')} / {String(CHAPTER_COUNT).padStart(2, '0')}
                </p>
              </div>

              {/* Ingredient overlay — bottom-left, over the image */}
              <div
                className="ft-content-animate"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  zIndex: 10,
                  padding: '28px 32px 32px',
                  opacity: isTransitioning ? 0 : 1,
                  transform: isTransitioning ? 'translateY(8px)' : 'translateY(0)',
                  transition: 'opacity 400ms ease-out, transform 400ms ease-out',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.5rem',
                    fontWeight: 400,
                    letterSpacing: '0.24em',
                    textTransform: 'uppercase',
                    color: 'rgba(186,202,174,0.9)',
                    marginBottom: '10px',
                  }}
                >
                  Featured Ingredient
                </p>

                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: 'clamp(1.75rem, 2.8vw, 2.25rem)',
                    fontWeight: 300,
                    lineHeight: 1.1,
                    letterSpacing: '-0.01em',
                    color: 'rgba(248,245,241,0.97)',
                    margin: '0 0 12px',
                  }}
                >
                  {story.ingredient}
                </h3>

                {/* Short intro — revealed on hover */}
                <div
                  style={{
                    overflow: 'hidden',
                    maxHeight: isImageHovered ? '160px' : '0px',
                    opacity: isImageHovered ? 1 : 0,
                    transition: 'max-height 500ms ease, opacity 500ms ease',
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '1px',
                      background: 'rgba(248,245,241,0.35)',
                      marginBottom: '12px',
                    }}
                  />
                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '0.8125rem',
                      fontWeight: 300,
                      lineHeight: 1.6,
                      color: 'rgba(248,245,241,0.75)',
                      maxWidth: '340px',
                      margin: 0,
                    }}
                  >
                    {story.shortIntro}
                  </p>
                </div>
              </div>
            </div>

            {/* ── RIGHT PANEL: product card ── */}
            <div
              className="flex-1 md:w-1/2 overflow-y-auto md:overflow-hidden"
              style={{
                background: '#F8F5F1',
                display: 'flex',
                flexDirection: 'column',
                padding: 'clamp(24px, 4vw, 48px) clamp(28px, 5.5vw, 72px)',
                position: 'relative',
              }}
            >
              {/* Animated content wrapper — fades + slides on chapter transition */}
              <div
                className="ft-content-animate"
                style={{
                  flex: 1,
                  minHeight: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  opacity: isTransitioning ? 0 : 1,
                  transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)',
                  transition: 'opacity 400ms ease-out, transform 400ms ease-out',
                }}
              >
                {/* Mobile ingredient image + details — stacked above product card */}
                <div className="block md:hidden">
                  <div
                    style={{
                      position: 'relative',
                      aspectRatio: '4 / 3',
                      overflow: 'hidden',
                      background: '#EDE7DF',
                      marginBottom: '0',
                    }}
                  >
                    {/* Mobile crossfade: all images stacked, active one visible */}
                    {stories.map((s, i) => (
                      <div
                        key={s.index}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          opacity: i === activeIdx ? 1 : 0,
                          transition: 'opacity 700ms ease-in-out',
                          zIndex: i === activeIdx ? 2 : 1,
                        }}
                      >
                        <Image
                          src={s.ingredientImage.src}
                          alt={s.ingredientImage.alt}
                          fill
                          className="object-cover object-center"
                          sizes="100vw"
                          priority={i === 0}
                          loading="eager"
                        />
                      </div>
                    ))}
                    {/* Mobile vignette */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 5,
                        background: 'linear-gradient(to top, rgba(20,18,16,0.68) 0%, rgba(20,18,16,0.12) 50%, transparent 70%)',
                        pointerEvents: 'none',
                      }}
                    />
                    {/* Mobile ingredient name overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 10,
                        padding: '20px 20px 22px',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-inter)',
                          fontSize: '0.5rem',
                          fontWeight: 400,
                          letterSpacing: '0.24em',
                          textTransform: 'uppercase',
                          color: 'rgba(186,202,174,0.9)',
                          marginBottom: '6px',
                        }}
                      >
                        Featured Ingredient
                      </p>
                      <h3
                        style={{
                          fontFamily: 'var(--font-cormorant), Georgia, serif',
                          fontSize: 'clamp(1.5rem, 5vw, 1.875rem)',
                          fontWeight: 300,
                          lineHeight: 1.1,
                          letterSpacing: '-0.01em',
                          color: 'rgba(248,245,241,0.97)',
                          margin: '0 0 8px',
                        }}
                      >
                        {story.ingredient}
                      </h3>
                      <p
                        style={{
                          fontFamily: 'var(--font-inter)',
                          fontSize: '0.8125rem',
                          fontWeight: 300,
                          lineHeight: 1.55,
                          color: 'rgba(248,245,241,0.72)',
                          margin: 0,
                        }}
                      >
                        {story.shortIntro}
                      </p>
                    </div>
                  </div>

                  {/* Mobile progress dots below image */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '12px 0 4px',
                    }}
                    aria-hidden="true"
                  >
                    {Array.from({ length: CHAPTER_COUNT }).map((_, i) => (
                      <span
                        key={i}
                        style={{
                          display: 'block',
                          width: i === activeIdx ? '20px' : '6px',
                          height: '1px',
                          background: i === activeIdx ? 'rgba(59,58,56,0.7)' : 'rgba(59,58,56,0.25)',
                          transition: 'width 500ms ease, background 500ms ease',
                        }}
                      />
                    ))}
                  </div>

                  <div style={{ height: '16px' }} />
                </div>

                {/* ── Product card ── */}
                <div
                  style={{
                    flex: 1,
                    minHeight: 0,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Product image */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      flex: 1,
                      minHeight: 0,
                      background: '#EDE7DF',
                      overflow: 'hidden',
                      marginBottom: 'clamp(16px, 2.5vh, 28px)',
                    }}
                  >
                    {/* Product image crossfade */}
                    {stories.map((s, i) => (
                      <div
                        key={s.index}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          opacity: i === activeIdx ? 1 : 0,
                          transition: 'opacity 700ms ease-in-out',
                          zIndex: i === activeIdx ? 2 : 1,
                        }}
                      >
                        <Image
                          src={s.productImage.src}
                          alt={s.productImage.alt}
                          fill
                          className="object-contain object-center"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          loading="eager"
                          priority={i === 0}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Eyebrow */}
                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '0.5rem',
                      fontWeight: 400,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: '#BEB8AF',
                      marginBottom: '8px',
                      flexShrink: 0,
                    }}
                  >
                    Featured in
                  </p>

                  {/* Product name */}
                  <p
                    style={{
                      fontFamily: 'var(--font-cormorant), Georgia, serif',
                      fontSize: 'clamp(1.25rem, 1.8vw, 1.625rem)',
                      fontWeight: 300,
                      lineHeight: 1.2,
                      letterSpacing: '-0.01em',
                      color: '#3B3A38',
                      marginBottom: '6px',
                      flexShrink: 0,
                    }}
                  >
                    {story.product}
                  </p>

                  {/* Product description */}
                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '0.8125rem',
                      fontWeight: 300,
                      lineHeight: 1.55,
                      color: '#8D9A83',
                      marginBottom: 'clamp(14px, 2vh, 22px)',
                      flexShrink: 0,
                    }}
                  >
                    {story.productDesc}
                  </p>

                  {/* Bottom row: price + CTA */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                      flexShrink: 0,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-cormorant), Georgia, serif',
                        fontSize: 'clamp(1.375rem, 2vw, 1.625rem)',
                        fontWeight: 300,
                        lineHeight: 1,
                        color: '#3B3A38',
                        margin: 0,
                      }}
                    >
                      {story.price}
                    </p>

                    <Link
                      href={`/products/${story.productId}`}
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: '0.5625rem',
                        fontWeight: 400,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: '#F8F5F1',
                        background: '#3B3A38',
                        padding: '12px 24px',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        minHeight: '44px',
                        transition: 'background 800ms ease',
                        outline: 'none',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#68735F')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = '#3B3A38')}
                      className="focus-visible:ring-1 focus-visible:ring-[#8D9A83]"
                      data-kite-cta-id="ingredient-shop-cta"
                      data-kite-role="primary"
                      data-kite-event="product_viewed"
                      data-kite-item={story.productId}
                    >
                      Shop Now
                      <BtnArrow />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile View All Ingredients Button */}
        <div className="md:hidden w-full flex justify-center py-10 bg-[#F8F5F1] border-t border-[#E9E2D7]">
          <SecondaryOutlineBtn
            href="/ingredients"
            data-kite-cta-id="ingredients-view-all-mobile"
            data-kite-role="secondary"
            data-kite-event="ingredients_explored"
          >
            View All Ingredients
          </SecondaryOutlineBtn>
        </div>

        {/* sr-only chapter markers for a11y */}
        <div className="sr-only" aria-hidden="true">
          {stories.map((s, i) => (
            <div key={s.index} data-scroll-chapter data-chapter-index={i}>
              {s.ingredient}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
