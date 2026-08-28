'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { WooProduct } from '@/services/types';
import { useCart, parsePrice } from '@/lib/cart';
import { useWishlist } from '@/lib/wishlist';

// Icons
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

        <p className="text-[0.8125rem] font-light text-[#68735F] leading-relaxed line-clamp-2 mt-auto mb-5">
          {product.shortDesc}
        </p>

        <button
          type="button"
          onClick={handleQuickAdd}
          disabled={product.inStock === false}
          className="w-full h-[42px] border border-[#D8CFC4] text-[0.75rem] font-normal tracking-[0.1em] uppercase text-[#3B3A38] transition-colors duration-[800ms] hover:border-[#8D9A83] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8D9A83] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center bg-transparent mt-auto"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {product.inStock === false ? 'Sold Out' : quickAdded ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </Link>
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

      {/* Category Sections */}
      {CATEGORY_MAP.map((cat) => {
        const catProducts = products.filter(p => p.category === cat.id);
        
        if (catProducts.length === 0) return null;

        return (
          <section key={cat.id} id={cat.title.toLowerCase()} className="max-w-[1200px] mx-auto px-6 md:px-8 mb-24 md:mb-32">
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
      })}

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

