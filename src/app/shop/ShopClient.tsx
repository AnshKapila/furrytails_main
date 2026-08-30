'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { WooProduct } from '@/services/types';
import { useCart, parsePrice } from '@/lib/cart';
import { useWishlist } from '@/lib/wishlist';

// Icons
function BagIconOutline() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0">
      <path d="M2 4h12l-1.5 9H3.5L2 4Z" />
      <path d="M5 4V2.5a3 3 0 0 1 6 0V4" />
    </svg>
  );
}
function BtnArrow({ className = '' }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true" className={`btn-arrow flex-shrink-0 ${className}`}>
      <line x1="1" y1="7" x2="13" y2="7" />
      <polyline points="8,2 13,7 8,12" />
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

function SpeciesBadge({ species, className = '' }: { species?: 'dog' | 'cat' | 'both'; className?: string }) {
  if (!species) return null;
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

// Product card 
function ProductCard({ product }: { product: WooProduct }) {
  const [quickAdded, setQuickAdded] = useState(false);
  const { addItem, openDrawer } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const displayPrice = product.price;
  const displayImage = product.image;

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (quickAdded) return;
    addItem({
      id: product.id,
      name: product.name,
      price: displayPrice ?? '',
      priceNum: parsePrice(displayPrice ?? ''),
      image: displayImage?.src ?? '',
      imageAlt: displayImage?.alt ?? product.name,
      variantId: undefined,
      variantLabel: product.variantLabel,
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
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist({
              id: product.id,
              name: product.name,
              price: displayPrice,
              image: displayImage?.src ?? '',
            });
          }}
          className="absolute bottom-3 right-3 bg-white/80 hover:bg-white p-2 rounded-full shadow-sm transition-colors text-[#3B3A38] z-10"
          aria-label="Toggle Wishlist"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3
            className="text-[1rem] sm:text-[1.125rem] font-medium text-[#3B3A38] leading-tight group-hover:text-[#68735F] transition-colors duration-[800ms]"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {product.name}
          </h3>
          <span
            className="text-[0.875rem] font-normal text-[#3B3A38] whitespace-nowrap"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {displayPrice}
          </span>
        </div>

        {product.variantLabel && (
          <p className="text-[0.75rem] font-light text-[#8D9A83] mb-3" style={{ fontFamily: 'var(--font-inter)' }}>
            {product.variantLabel}
          </p>
        )}

        

        <button
            type="button"
            onClick={handleQuickAdd}
            disabled={product.inStock === false}
            aria-label={`Add ${product.name} to cart`}
            className="w-full focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8D9A83] inline-flex items-center justify-center gap-1.5 border border-[#3B3A38] bg-transparent text-[#3B3A38] px-3 py-2 text-[0.6875rem] font-normal tracking-[0.06em] hover:bg-[#3B3A38] hover:text-[#F8F5F1] active:bg-[#3B3A38] active:text-[#F8F5F1] transition-colors duration-[400ms] mt-auto disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ minHeight: '42px', fontFamily: 'var(--font-inter)', whiteSpace: 'nowrap' }}
          >
            {product.inStock === false ? (
              'Sold out'
            ) : quickAdded ? (
              <>
                Added
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0 ml-1">
                  <polyline points="1 6 4.5 9.5 11 2.5" />
                </svg>
              </>
            ) : (
              <>
                <BagIconOutline />
                Add to Cart
              </>
            )}
          </button>
      </div>
    </Link>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true" className={`flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
      <polyline points="2,3.5 5,6.5 8,3.5" />
    </svg>
  );
}

const CATEGORY_MAP = [
  {
    id: 'Daily Ritual',
    title: 'Ritual',
    note: 'The bath is the ritual.',
  },
  {
    id: 'Defense',
    title: 'Defense',
    note: 'Before the walk.',
  },
  {
    id: 'Remedy',
    title: 'Remedy',
    note: 'For when things go wrong.',
  },
  {
    id: 'Refresh',
    title: 'Refresh',
    note: 'Between baths.',
  }
];

function ShopContent({ products }: { products: WooProduct[] }) {
  const SORT_OPTIONS = [
    { label: 'Recommended', value: 'default' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Alphabetical', value: 'name-asc' },
  ] as const;
  type SortValue = typeof SORT_OPTIONS[number]['value'];
  
  const [activeRitual, setActiveRitual] = useState<string>('All');
  const [activePet, setActivePet] = useState<string>('All pets');
  const [activeSort, setActiveSort] = useState<SortValue>('default');

  const [filterHovered, setFilterHovered] = useState(false);
  const [filterPinned, setFilterPinned] = useState(false);
  const filterOpen = filterHovered || filterPinned;

  const [sortHovered, setSortHovered] = useState(false);
  const [sortPinned, setSortPinned] = useState(false);
  const sortOpen = sortHovered || sortPinned;

  const [ritualHovered, setRitualHovered] = useState(false);
  const [ritualPinned, setRitualPinned] = useState(true);
  const ritualOpen = ritualHovered || ritualPinned;

  const [petHovered, setPetHovered] = useState(false);
  const [petPinned, setPetPinned] = useState(false);
  const petOpen = petHovered || petPinned;

  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  const RITUAL_FILTERS = [
    { label: 'Ritual', id: 'Daily Ritual' },
    { label: 'Defense', id: 'Defense' },
    { label: 'Refresh', id: 'Refresh' },
    { label: 'Remedy', id: 'Remedy' }
  ];
  const PET_FILTERS = ['Dog', 'Cat', 'Dog & Cat'];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterOpen && filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setFilterHovered(false);
        setFilterPinned(false);
      }
      if (sortOpen && sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortHovered(false);
        setSortPinned(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [filterOpen, sortOpen]);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash) {
        setActiveRitual('All');
        setActivePet('All pets');
        setActiveSort('default');
        
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const baseFiltered = products.filter((p) => {
    const prod = p as any;
    const ritualMatch = activeRitual === 'All' || p.category === activeRitual;
    
    let petMatch = activePet === 'All pets';
    if (!petMatch && prod.species) {
      if (activePet === 'Dog & Cat') petMatch = prod.species === 'both';
      else if (activePet === 'Dog') petMatch = prod.species === 'dog' || prod.species === 'both';
      else if (activePet === 'Cat') petMatch = prod.species === 'cat' || prod.species === 'both';
    }
    
    return ritualMatch && petMatch;
  });

  const filtered = [...baseFiltered].sort((a, b) => {
    if (activeSort === 'price-asc') return parsePrice(a.price) - parsePrice(b.price);
    if (activeSort === 'price-desc') return parsePrice(b.price) - parsePrice(a.price);
    if (activeSort === 'name-asc') return a.name.localeCompare(b.name);
    return 0;
  });

  const hasActiveFilter = activeRitual !== 'All' || activePet !== 'All pets';
  const activeFilterCount = (activeRitual !== 'All' ? 1 : 0) + (activePet !== 'All pets' ? 1 : 0);
  const activeSortLabel = SORT_OPTIONS.find((o) => o.value === activeSort)?.label ?? 'Sort';

  const triggerBase = "inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-full text-[0.625rem] font-normal tracking-[0.06em] uppercase transition-colors duration-[800ms] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8D9A83]";
  const triggerIdle = "border-[#D8CFC4] text-[#3B3A38] bg-transparent hover:border-[#8D9A83] hover:text-[#68735F]";
  const triggerActive = "border-[#3B3A38] bg-[#3B3A38] text-[#F8F5F1]";
  return (
    <main className="pt-32 pb-24 md:pt-40 md:pb-32 min-h-screen bg-[#F8F5F1]">
      {/* Page Hero */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-8 mb-20 md:mb-28">
        <span
          className="block text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#8D9A83] mb-6 md:mb-8"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          The Ritual
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-[#3B3A38] mb-6 max-w-2xl leading-[1.1]">
          The complete ritual.
        </h1>
        <p className="text-[1rem] md:text-[1.125rem] font-light text-[#68735F] leading-[1.6] max-w-2xl">
          Seven products. Four rituals. One formula standard. Every product in the Furry Tail range is built to the same certified natural-origin standard - the 99.5% Natural Origin Index per ISO 16128-2. None of them cut corners on preservation.
        </p>
      </section>

            {/* ── Controls bar ── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-8 pt-8 pb-12">
        <div className="flex items-center justify-between gap-4">
          {/* Left: result count + active filter summary */}
          <p className="text-[0.5625rem] font-normal tracking-[0.12em] uppercase text-[#BEB8AF]" style={{ fontFamily: 'var(--font-inter)' }}>
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
            {hasActiveFilter && (
              <button type="button" onClick={() => { setActiveRitual('All'); setActivePet('All pets'); }} className="ml-3 underline underline-offset-2 text-[#8D9A83] hover:text-[#3B3A38] transition-colors duration-[800ms] focus:outline-none">
                Clear
              </button>
            )}
          </p>
          {/* Right: Sort + Filter controls */}
          <div className="flex items-center gap-2">
            {/* Sort dropdown */}
            <div className="relative" ref={sortRef} onMouseEnter={() => setSortHovered(true)} onMouseLeave={() => setSortHovered(false)}>
              <button type="button" onClick={() => { setSortPinned((v) => !v); setFilterPinned(false); }} className={`${triggerBase} ${activeSort !== 'default' ? triggerActive : triggerIdle}`} style={{ fontFamily: 'var(--font-inter)' }} aria-expanded={sortOpen}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true" className="flex-shrink-0"><line x1="1" y1="3" x2="11" y2="3" /><line x1="2.5" y1="6" x2="9.5" y2="6" /><line x1="4" y1="9" x2="8" y2="9" /></svg>
                <span>{activeSort !== 'default' ? activeSortLabel : 'Featured'}</span>
                <ChevronIcon open={sortOpen} />
              </button>
              <div className={`absolute right-0 top-full mt-1 w-48 bg-[#F8F5F1] border border-[#E9E2D7] shadow-[0_4px_24px_rgba(59,58,56,0.08)] z-20 ${sortOpen ? 'block' : 'hidden'}`}>
                <div className="py-1">
                  {SORT_OPTIONS.map((opt) => (
                    <button key={opt.value} type="button" onClick={() => { setActiveSort(opt.value); setSortHovered(false); setSortPinned(false); }} className={`w-full text-left px-4 py-2.5 text-[0.625rem] font-normal transition-colors focus:outline-none ${activeSort === opt.value ? 'bg-[#3B3A38] text-[#F8F5F1]' : 'text-[#68735F] hover:bg-[#F0EBE4] hover:text-[#3B3A38]'}`}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Filter dropdown */}
            <div className="relative" ref={filterRef} onMouseEnter={() => setFilterHovered(true)} onMouseLeave={() => setFilterHovered(false)}>
              <button type="button" onClick={() => { setFilterPinned((v) => !v); setSortPinned(false); }} className={`${triggerBase} ${hasActiveFilter ? triggerActive : triggerIdle}`} style={{ fontFamily: 'var(--font-inter)' }} aria-expanded={filterOpen}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0"><line x1="1" y1="2.5" x2="11" y2="2.5" /><circle cx="8.5" cy="6" r="1.2" fill="currentColor" stroke="none" /><circle cx="3.5" cy="9.5" r="1.2" fill="currentColor" stroke="none" /></svg>
                <span>Filter{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}</span>
                <ChevronIcon open={filterOpen} />
              </button>
              <div className={`absolute right-0 top-full mt-1 w-64 bg-[#F8F5F1] border border-[#E9E2D7] shadow-[0_4px_24px_rgba(59,58,56,0.08)] z-20 ${filterOpen ? 'block' : 'hidden'}`}>
                <div>
                  <button type="button" onClick={() => setRitualPinned((v) => !v)} onMouseEnter={() => setRitualHovered(true)} onMouseLeave={() => setRitualHovered(false)} className="w-full flex items-center justify-between px-4 py-3 text-[0.75rem] font-normal text-[#3B3A38] hover:text-[#68735F] focus:outline-none border-b border-[#E9E2D7]">
                    <span>Ritual</span><ChevronIcon open={ritualOpen} />
                  </button>
                  <div className={`px-4 pb-4 pt-2 flex flex-wrap gap-1.5 border-b border-[#E9E2D7] ${ritualOpen ? 'block' : 'hidden'}`}>
                    <button type="button" onClick={() => setActiveRitual('All')} className={`px-2.5 py-1 text-[0.625rem] font-normal tracking-[0.04em] rounded-[2px] transition-colors ${activeRitual === 'All' ? 'bg-[#3B3A38] text-[#F8F5F1]' : 'bg-[#F0EBE4] text-[#68735F] hover:text-[#3B3A38]'}`}>All</button>
                    {RITUAL_FILTERS.map((cat) => (
                      <button key={cat.id} type="button" onClick={() => setActiveRitual(cat.id)} className={`px-2.5 py-1 text-[0.625rem] font-normal tracking-[0.04em] rounded-[2px] transition-colors ${activeRitual === cat.id ? 'bg-[#3B3A38] text-[#F8F5F1]' : 'bg-[#F0EBE4] text-[#68735F] hover:text-[#3B3A38]'}`}>{cat.label}</button>
                    ))}
                  </div>
                  
                  <button type="button" onClick={() => setPetPinned((v) => !v)} onMouseEnter={() => setPetHovered(true)} onMouseLeave={() => setPetHovered(false)} className="w-full flex items-center justify-between px-4 py-3 text-[0.75rem] font-normal text-[#3B3A38] hover:text-[#68735F] focus:outline-none">
                    <span>Pet</span><ChevronIcon open={petOpen} />
                  </button>
                  <div className={`px-4 pb-4 pt-2 flex flex-wrap gap-1.5 ${petOpen ? 'block' : 'hidden'}`}>
                    {['All pets', ...PET_FILTERS].map((pet) => (
                      <button key={pet} type="button" onClick={() => setActivePet(pet)} className={`px-2.5 py-1 text-[0.625rem] font-normal tracking-[0.04em] rounded-[2px] transition-colors ${activePet === pet ? 'bg-[#3B3A38] text-[#F8F5F1]' : 'bg-[#F0EBE4] text-[#68735F] hover:text-[#3B3A38]'}`}>{pet}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Category Sections or Filtered Grid */}
      {hasActiveFilter || activeSort !== 'default' ? (
        <section className="max-w-[1200px] mx-auto px-6 md:px-8 mb-24 md:mb-32 min-h-[50vh]">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {filtered.map((product, i) => (
                <div
                  key={product.id}
                  className="transition-[opacity,transform] ease-out"
                  style={{ transitionDuration: '800ms', transitionDelay: `${(i % 12) * 50}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pt-12 pb-24 text-center">
              <p className="text-[#3B3A38] text-h3 mb-2">No products found</p>
              <p className="text-[#68735F] text-p2">Try adjusting your filters to find what you're looking for.</p>
            </div>
          )}
        </section>
      ) : (
        CATEGORY_MAP.map((cat) => {
          const catProducts = filtered.filter(p => p.category === cat.id);
          
          if (catProducts.length === 0) return null;

          return (
            <section key={cat.id} id={cat.title.toLowerCase()} className="scroll-mt-32 max-w-[1200px] mx-auto px-6 md:px-8 mb-24 md:mb-32">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-12 border-b border-[#E9E2D7] pb-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-display font-light text-[#3B3A38] mb-2">
                    {cat.title}
                  </h2>
                  <span
                    className="text-[0.875rem] font-normal text-[#8D9A83]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {cat.note}
                  </span>
                </div>
                <span
                  className="text-[0.75rem] font-normal tracking-[0.1em] uppercase text-[#BEB8AF]"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {catProducts.length} {catProducts.length === 1 ? 'product' : 'products'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {catProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          );
        })
      )}

      {/* Shipping link */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-8">
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

export default function ShopClient({ products }: { products: WooProduct[] }) {
  return <ShopContent products={products} />;
}




