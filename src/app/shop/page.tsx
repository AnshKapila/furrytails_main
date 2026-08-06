'use client';

import { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientProviders from '@/components/ClientProviders';
import { allProducts } from '@/data/home';
import { useCart, parsePrice } from '@/lib/cart';

// ─── Icons ────────────────────────────────────────────────────────────────────

function BtnArrow({ className = '' }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true" className={`btn-arrow flex-shrink-0 ${className}`}>
      <line x1="1" y1="7" x2="13" y2="7" />
      <polyline points="8,2 13,7 8,12" />
    </svg>
  );
}

function BagIconOutline() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function DogIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2 .336-3.5 2-3.5 4 0 1.381.956 2.521 2.312 3.115" />
      <path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2 .336 3.5 2 3.5 4 0 1.381-.956 2.521-2.312 3.115" />
      <path d="M8 14v.5" /><path d="M16 14v.5" />
      <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
      <path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.161.306" />
    </svg>
  );
}

function CatIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 17 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z" />
      <path d="M8 14v.5" /><path d="M16 14v.5" />
      <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
    </svg>
  );
}

function SpeciesBadge({ species, className = '' }: { species: 'dog' | 'cat' | 'both'; className?: string }) {
  return (
    <span
      className={`inline-flex flex-row items-center gap-1 px-2 py-0.5 bg-[#F8F5F1]/85 text-[#3B3A38] text-[0.6875rem] font-normal tracking-[0.14em] uppercase leading-none ${className}`}
      style={{ fontFamily: 'var(--font-inter)', whiteSpace: 'nowrap' }}
    >
      {species === 'dog' && <><DogIcon /> Dog</>}
      {species === 'cat' && <><CatIcon /> Cat</>}
      {species === 'both' && <><DogIcon /><CatIcon /> Dog &amp; Cat</>}
    </span>
  );
}

// ─── Product card ─────────────────────────────────────────────────────────────

type Product = typeof allProducts.products[number];

function ProductCard({ product }: { product: Product }) {
  const [quickAdded, setQuickAdded] = useState(false);
  const { addItem, openDrawer } = useCart();

  const hasVariants = 'variants' in product && Array.isArray(product.variants) && product.variants.length > 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const firstVariant = hasVariants ? (product as any).variants[0] : null;
  const displayPrice = firstVariant ? firstVariant.price : product.price;
  const displayImage = (firstVariant?.image?.src) ? firstVariant.image : product.image;
  const singleVariantLabel = !hasVariants && 'variantLabel' in product ? (product as any).variantLabel as string | undefined : undefined;

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
      variantLabel: firstVariant?.label,
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
      <div className="relative overflow-hidden aspect-[3/4] bg-[#F0EBE4] flex-shrink-0">
        <Image
          src={displayImage?.src ?? ''}
          alt={displayImage?.alt ?? product.name}
          fill
          className="object-cover object-center transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
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

      <div className="px-4 pt-4 pb-5 flex flex-col flex-1 gap-1.5">
        <div className="flex flex-col gap-1.5 flex-1">
          <h3
            className="text-[1.125rem] text-[#3B3A38] leading-snug line-clamp-2"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 400 }}
          >
            {product.name}
          </h3>

          {singleVariantLabel && (
            <p className="text-[0.75rem] font-light text-[#8D9A83]" style={{ fontFamily: 'var(--font-inter)' }}>
              {singleVariantLabel}
            </p>
          )}

          {'volume' in product && (product as any).volume && (
            <p className="hidden md:block text-[0.6875rem] font-light text-[#BEB8AF] tracking-[0.04em]" style={{ fontFamily: 'var(--font-inter)' }}>
              {(product as any).volume}
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
                  <polyline points="1 6 4.5 9.5 11 2.5" />
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
              {'volume' in product ? (product as any).volume ?? '' : ''}
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
                  <polyline points="1 6 4.5 9.5 11 2.5" />
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

// ─── Chevron icon ─────────────────────────────────────────────────────────────

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="10" height="10" viewBox="0 0 10 10" fill="none"
      stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
      aria-hidden="true"
      className={`flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
    >
      <polyline points="2,3.5 5,6.5 8,3.5" />
    </svg>
  );
}

// ─── Sort options ─────────────────────────────────────────────────────────────

const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A–Z' },
] as const;

type SortValue = typeof SORT_OPTIONS[number]['value'];

// ─── Page constants ───────────────────────────────────────────────────────────

const RITUAL_FILTERS = allProducts.filterCategories;
const PET_FILTERS = allProducts.filterPets;
const TYPE_FILTERS = allProducts.filterTypes;

// ─── ShopContent ─────────────────────────────────────────────────────────────

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Filter state — three independent dimensions
  const [activeRitual, setActiveRitual] = useState<string>(() => {
    const r = searchParams.get('ritual');
    return r && RITUAL_FILTERS.includes(r as typeof RITUAL_FILTERS[number]) ? r : 'All';
  });
  const [activePet, setActivePet] = useState<string>('All pets');
  const [activeType, setActiveType] = useState<string>('All types');

  // Sort state
  const [activeSort, setActiveSort] = useState<SortValue>('default');

  // Dropdown hover & pinned states
  const [filterHovered, setFilterHovered] = useState(false);
  const [filterPinned, setFilterPinned] = useState(false);
  const filterOpen = filterHovered || filterPinned;

  const [sortHovered, setSortHovered] = useState(false);
  const [sortPinned, setSortPinned] = useState(false);
  const sortOpen = sortHovered || sortPinned;

  // Nested accordion hover & pinned states inside the filter panel
  const [ritualHovered, setRitualHovered] = useState(false);
  const [ritualPinned, setRitualPinned] = useState(true);
  const ritualOpen = ritualHovered || ritualPinned;

  const [petHovered, setPetHovered] = useState(false);
  const [petPinned, setPetPinned] = useState(false);
  const petOpen = petHovered || petPinned;

  const [typeHovered, setTypeHovered] = useState(false);
  const [typePinned, setTypePinned] = useState(false);
  const typeOpen = typeHovered || typePinned;

  // Refs for outside-click detection
  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // Sync ritual from URL
  useEffect(() => {
    const r = searchParams.get('ritual');
    if (r && RITUAL_FILTERS.includes(r as typeof RITUAL_FILTERS[number])) {
      setActiveRitual(r);
    } else if (!r) {
      setActiveRitual('All');
    }
  }, [searchParams]);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterHovered(false);
        setFilterPinned(false);
      }
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortHovered(false);
        setSortPinned(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setFilterHovered(false);
        setFilterPinned(false);
        setSortHovered(false);
        setSortPinned(false);
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const handleRitualChange = useCallback((ritual: string) => {
    setActiveRitual(ritual);
    if (ritual === 'All') {
      router.push('/shop', { scroll: false });
    } else {
      router.push(`/shop?ritual=${encodeURIComponent(ritual)}`, { scroll: false });
    }
  }, [router]);

  // Filter logic — AND across all active dimensions
  const baseFiltered = allProducts.products.filter((p) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const prod = p as any;
    const ritualMatch = activeRitual === 'All' || p.category === activeRitual;
    const sp = p.species as string;
    const petMatch =
      activePet === 'All pets' ||
      (activePet === 'Dogs' && (sp === 'dog' || sp === 'both')) ||
      (activePet === 'Cats' && (sp === 'cat' || sp === 'both'));
    const typeMatch = activeType === 'All types' || prod.productType === activeType;
    return ritualMatch && petMatch && typeMatch;
  });

  // Apply sort
  const filtered = [...baseFiltered].sort((a, b) => {
    if (activeSort === 'price-asc') return parsePrice(a.price) - parsePrice(b.price);
    if (activeSort === 'price-desc') return parsePrice(b.price) - parsePrice(a.price);
    if (activeSort === 'name-asc') return a.name.localeCompare(b.name);
    return 0; // 'default' — original data order
  });

  const hasActiveFilter = activeRitual !== 'All' || activePet !== 'All pets' || activeType !== 'All types';

  // Count of active filter dimensions (for badge)
  const activeFilterCount = (activeRitual !== 'All' ? 1 : 0) + (activePet !== 'All pets' ? 1 : 0) + (activeType !== 'All types' ? 1 : 0);

  const activeSortLabel = SORT_OPTIONS.find((o) => o.value === activeSort)?.label ?? 'Sort';

  // Shared control trigger style
  const triggerBase = 'inline-flex items-center gap-2 h-9 px-4 border text-[0.75rem] font-normal transition-colors duration-[800ms] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8D9A83]';
  const triggerIdle = 'bg-transparent border-[#D8CFC4] text-[#68735F] hover:border-[#8D9A83] hover:text-[#3B3A38]';
  const triggerActive = 'bg-transparent border-[#3B3A38] text-[#3B3A38]';

  // Shared inner option button style (smaller than trigger/labels)
  const optionBase = 'inline-flex items-center h-7 px-3 border text-[0.625rem] font-normal transition-colors duration-[800ms] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8D9A83]';
  const optionIdle = 'bg-transparent border-[#D8CFC4] text-[#68735F] hover:border-[#8D9A83] hover:text-[#3B3A38]';
  const optionSelected = 'bg-[#3B3A38] border-[#3B3A38] text-[#F8F5F1]';

  return (
    <main
      className="bg-[#F8F5F1] pt-24"
      data-kite-page-id="shop"
      data-kite-page-type="shop"
    >

      {/* ── Page header ─────────────────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20 border-b border-[#E9E2D7]">
        <p className="text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#8D9A83] mb-4">
          {allProducts.eyebrow}
        </p>
        <h1
          className="text-[#3B3A38] !mx-0 text-left"
          style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(3rem, 5vw, 4rem)', fontWeight: 300, lineHeight: 1.06, letterSpacing: '-0.02em' }}
        >
          {allProducts.heading}
        </h1>
        <p className="text-[0.875rem] font-light text-[#68735F] leading-[1.6] max-w-[360px] mt-4">
          {allProducts.subheading}
        </p>
      </section>

      {/* ── Controls bar — right-aligned Sort + Filter ───────────────── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-8 pt-8 pb-0">
        <div className="flex items-center justify-between gap-4">

          {/* Left: result count + active filter summary */}
          <p
            className="text-[0.5625rem] font-normal tracking-[0.12em] uppercase text-[#BEB8AF]"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
            {hasActiveFilter && (
              <button
                type="button"
                onClick={() => { handleRitualChange('All'); setActivePet('All pets'); setActiveType('All types'); }}
                className="ml-3 underline underline-offset-2 text-[#8D9A83] hover:text-[#3B3A38] transition-colors duration-[800ms] focus:outline-none"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Clear
              </button>
            )}
          </p>

          {/* Right: Sort + Filter controls */}
          <div className="flex items-center gap-2">

            {/* ── Sort dropdown ── */}
            <div
              className="relative"
              ref={sortRef}
              onMouseEnter={() => setSortHovered(true)}
              onMouseLeave={() => setSortHovered(false)}
            >
              <button
                type="button"
                onClick={() => { setSortPinned((v) => !v); setFilterPinned(false); }}
                className={`${triggerBase} ${activeSort !== 'default' ? triggerActive : triggerIdle}`}
                style={{ fontFamily: 'var(--font-inter)' }}
                aria-expanded={sortOpen}
                aria-haspopup="listbox"
                data-kite-cta-id="shop-sort-trigger"
                data-kite-role="secondary"
                data-kite-event="sort_opened"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true" className="flex-shrink-0">
                  <line x1="1" y1="3" x2="11" y2="3" />
                  <line x1="2.5" y1="6" x2="9.5" y2="6" />
                  <line x1="4" y1="9" x2="8" y2="9" />
                </svg>
                <span>{activeSort !== 'default' ? activeSortLabel : 'Featured'}</span>
                <ChevronIcon open={sortOpen} />
              </button>

              <div
                className={`absolute right-0 top-full mt-1 w-48 bg-[#F8F5F1] border border-[#E9E2D7] shadow-[0_4px_24px_rgba(59,58,56,0.08)] z-20 dropdown-smooth-enter ${sortOpen ? 'open' : ''}`}
                role="listbox"
                aria-label="Sort options"
              >
                <div className="dropdown-smooth-inner">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      role="option"
                      aria-selected={activeSort === opt.value}
                      onClick={() => {
                        setActiveSort(opt.value);
                        setSortHovered(false);
                        setSortPinned(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-[0.625rem] font-normal transition-colors duration-[800ms] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8D9A83] ${
                        activeSort === opt.value
                          ? 'bg-[#3B3A38] text-[#F8F5F1]'
                          : 'text-[#68735F] hover:bg-[#F0EBE4] hover:text-[#3B3A38]'
                      }`}
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Filter dropdown ── */}
            <div
              className="relative"
              ref={filterRef}
              onMouseEnter={() => setFilterHovered(true)}
              onMouseLeave={() => setFilterHovered(false)}
            >
              <button
                type="button"
                onClick={() => { setFilterPinned((v) => !v); setSortPinned(false); }}
                className={`${triggerBase} ${hasActiveFilter ? triggerActive : triggerIdle}`}
                style={{ fontFamily: 'var(--font-inter)' }}
                aria-expanded={filterOpen}
                aria-haspopup="dialog"
                data-kite-cta-id="shop-filter-trigger"
                data-kite-role="secondary"
                data-kite-event="filter_opened"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0">
                  <line x1="1" y1="2.5" x2="11" y2="2.5" />
                  <line x1="1" y1="6" x2="11" y2="6" />
                  <line x1="1" y1="9.5" x2="11" y2="9.5" />
                  <circle cx="3.5" cy="2.5" r="1.2" fill="currentColor" stroke="none" />
                  <circle cx="8.5" cy="6" r="1.2" fill="currentColor" stroke="none" />
                  <circle cx="3.5" cy="9.5" r="1.2" fill="currentColor" stroke="none" />
                </svg>
                <span>Filter{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}</span>
                <ChevronIcon open={filterOpen} />
              </button>

              <div
                className={`absolute right-0 top-full mt-1 w-64 bg-[#F8F5F1] border border-[#E9E2D7] shadow-[0_4px_24px_rgba(59,58,56,0.08)] z-20 dropdown-smooth-enter ${filterOpen ? 'open' : ''}`}
                role="dialog"
                aria-label="Filter products"
              >
                <div className="dropdown-smooth-inner">
                  {/* ── Ritual accordion ── */}
                  <div
                    className="border-b border-[#E9E2D7]"
                    onMouseEnter={() => setRitualHovered(true)}
                    onMouseLeave={() => setRitualHovered(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setRitualPinned((v) => !v)}
                      className="w-full flex items-center justify-between px-4 py-3 text-[0.75rem] font-normal text-[#3B3A38] hover:text-[#68735F] transition-colors duration-[800ms] focus:outline-none"
                      style={{ fontFamily: 'var(--font-inter)' }}
                      aria-expanded={ritualOpen}
                      data-kite-expand="filter-ritual"
                    >
                      <span>Ritual</span>
                      <ChevronIcon open={ritualOpen} />
                    </button>
                    <div className={`dropdown-smooth-enter ${ritualOpen ? 'open' : ''}`}>
                      <div className="dropdown-smooth-inner px-4 pb-4 flex flex-wrap gap-1.5">
                        {RITUAL_FILTERS.map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => handleRitualChange(cat === 'All' ? 'All' : cat)}
                            className={`${optionBase} ${activeRitual === cat || (cat === 'All' && activeRitual === 'All') ? optionSelected : optionIdle}`}
                            style={{ fontFamily: 'var(--font-inter)' }}
                            aria-pressed={activeRitual === cat || (cat === 'All' && activeRitual === 'All')}
                          >
                            {cat === 'All' ? 'All' : cat}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ── Pet accordion ── */}
                  <div
                    className="border-b border-[#E9E2D7]"
                    onMouseEnter={() => setPetHovered(true)}
                    onMouseLeave={() => setPetHovered(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setPetPinned((v) => !v)}
                      className="w-full flex items-center justify-between px-4 py-3 text-[0.75rem] font-normal text-[#3B3A38] hover:text-[#68735F] transition-colors duration-[800ms] focus:outline-none"
                      style={{ fontFamily: 'var(--font-inter)' }}
                      aria-expanded={petOpen}
                      data-kite-expand="filter-pet"
                    >
                      <span>Pet</span>
                      <ChevronIcon open={petOpen} />
                    </button>
                    <div className={`dropdown-smooth-enter ${petOpen ? 'open' : ''}`}>
                      <div className="dropdown-smooth-inner px-4 pb-4 flex flex-wrap gap-1.5">
                        {PET_FILTERS.map((pet) => (
                          <button
                            key={pet}
                            type="button"
                            onClick={() => setActivePet(pet)}
                            className={`${optionBase} ${activePet === pet ? optionSelected : optionIdle}`}
                            style={{ fontFamily: 'var(--font-inter)' }}
                            aria-pressed={activePet === pet}
                          >
                            {pet}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ── Type accordion ── */}
                  <div
                    onMouseEnter={() => setTypeHovered(true)}
                    onMouseLeave={() => setTypeHovered(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setTypePinned((v) => !v)}
                      className="w-full flex items-center justify-between px-4 py-3 text-[0.75rem] font-normal text-[#3B3A38] hover:text-[#68735F] transition-colors duration-[800ms] focus:outline-none"
                      style={{ fontFamily: 'var(--font-inter)' }}
                      aria-expanded={typeOpen}
                      data-kite-expand="filter-type"
                    >
                      <span>Type</span>
                      <ChevronIcon open={typeOpen} />
                    </button>
                    <div className={`dropdown-smooth-enter ${typeOpen ? 'open' : ''}`}>
                      <div className="dropdown-smooth-inner px-4 pb-4 flex flex-wrap gap-1.5">
                        {TYPE_FILTERS.map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setActiveType(type)}
                            className={`${optionBase} ${activeType === type ? optionSelected : optionIdle}`}
                            style={{ fontFamily: 'var(--font-inter)' }}
                            aria-pressed={activeType === type}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Product grid ─────────────────────────────────────────────── */}
      <section
        className="max-w-[1200px] mx-auto px-6 md:px-8 py-10"
        data-kite-surface="shop.grid"
        data-kite-surface-type="features"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {filtered.map((product, i) => (
            <div
              key={product.id}
              className="transition-[opacity,transform] ease-out"
              style={{ transitionDuration: '350ms', transitionDelay: `${i * 45}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-[0.78rem] font-light text-[#BEB8AF] py-16 text-center">
            Nothing in this category yet.
          </p>
        )}
      </section>

      {/* ── Shipping link ─────────────────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-8 pb-16">
        <div className="border-t border-[#E9E2D7] pt-8 flex justify-end">
          <Link
            href="/shipping"
            className="text-[0.625rem] font-normal tracking-[0.15em] uppercase text-[#68735F] hover:text-[#3B3A38] transition-colors duration-[800ms] flex items-center gap-1.5"
            data-kite-cta-id="shop-shipping-link"
            data-kite-role="secondary"
            data-kite-event="shipping_viewed"
          >
            Shipping &amp; returns <BtnArrow />
          </Link>
        </div>
      </section>

    </main>
  );
}

export default function ShopPage() {
  return (
    <ClientProviders>
      <div className="min-h-screen bg-[#F8F5F1]">
        <Navbar />
        <Suspense fallback={
          <main className="bg-[#F8F5F1] pt-24 min-h-screen" />
        }>
          <ShopContent />
        </Suspense>
        <Footer />
      </div>
    </ClientProviders>
  );
}
