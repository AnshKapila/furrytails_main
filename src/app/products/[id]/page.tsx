'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientProviders from '@/components/ClientProviders';
import { getProductById, getAllProducts, WooProduct } from '@/services/api';
import { useCart, parsePrice } from '@/lib/cart';
import { useWishlist } from '@/lib/wishlist';
import { notFound } from 'next/navigation';

// ─── Icons ────────────────────────────────────────────────────────────────────

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

// ─── Product content — rendered inside CartProvider via ClientProviders ────────
// useCart() is safe here because this component only renders inside the provider.

type Product = WooProduct;

function ProductContent({ product }: { product: Product }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const prod = product as any;

  // Multi-variant selector — only Gentle Daily Shampoo has variants[]
  const hasVariants = 'variants' in prod && Array.isArray(prod.variants) && prod.variants.length > 0;
  const variants: { id: string; label: string; price: string; standardPrice: string | null; shortDesc: string; image?: { src: string; alt: string } }[] =
    hasVariants ? prod.variants : [];

  // Single-variant label (e.g. "Vetiver & Cypress") — displayed as static info, no selector
  const singleVariantLabel: string | undefined = !hasVariants && prod.variantLabel ? prod.variantLabel : undefined;

  const [activeVariantId, setActiveVariantId] = useState(hasVariants ? variants[0].id : null);
  const [added, setAdded] = useState(false);
  const { addItem, openDrawer } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const activeVariant = hasVariants ? variants.find((v) => v.id === activeVariantId) ?? variants[0] : null;

  const displayPrice = activeVariant ? activeVariant.price : product.price;
  const displayStandardPrice = activeVariant ? activeVariant.standardPrice : product.standardPrice;
  const displayDesc = activeVariant ? activeVariant.shortDesc : product.shortDesc;
  // Variant-specific image when available, fall back to product image
  const displayImage = (activeVariant?.image?.src) ? activeVariant.image : product.image;

  // Volume from product data
  const volume: string | undefined = prod.volume;

  // Related products — up to 3 others from the same category, or any other products
  const related = getAllProducts()
    .filter((p) => p.id !== product.id)
    .sort((a, b) => (a.category === product.category ? -1 : 1) - (b.category === product.category ? -1 : 1))
    .slice(0, 3);

  function handleAdd() {
    if (added) return;
    addItem({
      id: product.id,
      name: product.name,
      price: displayPrice ?? '',
      priceNum: parsePrice(displayPrice ?? ''),
      image: displayImage?.src ?? '',
      imageAlt: displayImage?.alt ?? product.name,
      variantId: activeVariant?.id,
      variantLabel: activeVariant?.label ?? singleVariantLabel,
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openDrawer();
    }, 800);
  }

  return (
    <main
      className="bg-[#F8F5F1] pt-24"
      data-kite-page-id={`product-${product.id}`}
      data-kite-page-type="product"
    >

      {/* ── Breadcrumb ─────────────────────────────────────────────── */}
      <nav
        className="max-w-[1200px] mx-auto px-6 md:px-8 pt-8 pb-0 flex items-center gap-2"
        aria-label="Breadcrumb"
      >
        <Link
          href="/shop"
          className="text-[0.625rem] font-normal tracking-[0.18em] uppercase text-[#8D9A83] hover:text-[#3B3A38] transition-colors duration-[800ms]"
        >
          Shop
        </Link>
        <span className="text-[#BEB8AF] text-[0.625rem]" aria-hidden="true">/</span>
        <span className="text-[0.625rem] font-normal tracking-[0.18em] uppercase text-[#3B3A38]">
          {product.name}
        </span>
      </nav>

      {/* ── Product layout ──────────────────────────────────────────── */}
      <section
        className="max-w-[1200px] mx-auto px-6 md:px-8 py-12 md:py-16"
        data-kite-surface="product.detail"
        data-kite-surface-type="features"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">

          {/* Image — swaps when active variant has its own image */}
          <div className="relative aspect-[3/4] overflow-hidden bg-[#F0EBE4]">
            <Image
              src={displayImage?.src ?? ''}
              alt={displayImage?.alt ?? product.name}
              fill
              className="object-cover object-center transition-opacity duration-300"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {product.badge && (
              <span
                className="absolute top-4 right-4 text-[0.6875rem] font-normal tracking-[0.14em] uppercase px-2 py-0.5 bg-[#F8F5F1]/90 text-[#3B3A38]"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {product.badge}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-6">

            {/* Category + species row */}
            <div className="flex items-center gap-3">
              <span
                className="text-[0.625rem] font-normal tracking-[0.22em] uppercase text-[#8D9A83]"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {product.category}
              </span>
              <span className="w-px h-3 bg-[#D8CFC4]" aria-hidden="true" />
              <span
                className="inline-flex flex-row items-center gap-1 px-2 py-0.5 bg-[#3B3A38] text-[#F8F5F1]"
                style={{ fontFamily: 'var(--font-inter)', fontSize: '0.625rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}
              >
                {(product.species as string) === 'dog' && <><DogIcon /> Dog</>}
                {(product.species as string) === 'cat' && <><CatIcon /> Cat</>}
                {(product.species as string) === 'both' && <><DogIcon /><CatIcon /> Dog &amp; Cat</>}
              </span>
              {volume && (
                <>
                  <span className="w-px h-3 bg-[#D8CFC4]" aria-hidden="true" />
                  <span
                    className="text-[0.625rem] font-normal tracking-[0.14em] text-[#8D9A83]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {volume}
                  </span>
                </>
              )}
            </div>

            {/* Name */}
            <h2 className="text-[#3B3A38]">
              {product.name}
            </h2>

            {/* Single-variant scent label — static, no selector */}
            {singleVariantLabel && (
              <p
                className="text-[0.8125rem] font-light text-[#8D9A83] tracking-[0.04em]"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {singleVariantLabel}
              </p>
            )}

            {/* Description */}
            <p className="text-[0.875rem] font-light text-[#3B3A38]/80 leading-[1.6]">
              {displayDesc}
            </p>

            {/* Fragrance selector — only shown when product has multiple fragrance variants */}
            {hasVariants && (
              <div className="flex flex-col gap-3">
                <p
                  className="text-[0.625rem] font-normal tracking-[0.22em] uppercase text-[#BEB8AF]"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  Fragrance
                </p>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Select fragrance">
                  {variants.map((variant) => (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setActiveVariantId(variant.id)}
                      className={`text-[0.875rem] font-light tracking-[0.02em] px-5 py-2.5 border transition-colors duration-[800ms] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8D9A83] ${
                        activeVariantId === variant.id
                          ? 'bg-transparent text-[#3B3A38] border-[#3B3A38]'
                          : 'bg-transparent text-[#68735F] border-[#D8CFC4] hover:border-[#8D9A83] hover:text-[#3B3A38]'
                      }`}
                      style={{ fontFamily: 'var(--font-inter)' }}
                      aria-pressed={activeVariantId === variant.id}
                    >
                      {variant.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing */}
            <div className="flex items-end gap-4">
              <h1 className="product-price text-[#3B3A38]">
                {displayPrice}
              </h1>
              {displayStandardPrice && (
                <span
                  className="text-[0.875rem] font-light text-[#BEB8AF]/70 line-through leading-none mb-2"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {displayStandardPrice}
                </span>
              )}
            </div>


                        {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Add to bag */}
              <button
                type="button"
                onClick={handleAdd}
                className="hero-btn-primary flex-1"
                style={{ minHeight: '52px', padding: '0 32px' }}
                data-kite-cta-id="product-add-to-bag"
                data-kite-role="primary"
                data-kite-event="add_to_bag"
                data-kite-item={product.id}
              >
                {added ? (
                  <>
                    Added
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0">
                      <polyline points="1 6 4.5 9.5 11 2.5" />
                    </svg>
                  </>
                ) : (
                  <>Add to Bag <BtnArrow /></>
                )}
              </button>
              
              {/* Add to Wishlist */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  toggleWishlist({
                    id: product.id,
                    name: product.name,
                    price: displayPrice,
                    image: displayImage?.src ?? '',
                  });
                }}
                className="flex items-center justify-center border border-[#D8CFC4] hover:border-[#8D9A83] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8D9A83] aspect-square rounded-sm text-[#3B3A38]"
                style={{ minHeight: '52px', padding: '0 16px' }}
                aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            {/* Shipping note */}
            <p className="text-[0.75rem] font-light text-[#8D9A83] leading-[1.55]">
              Shipping details are shown at checkout.{' '}
              <Link href="/shipping" className="underline underline-offset-2 hover:text-[#3B3A38] transition-colors duration-[800ms]">
                Shipping &amp; returns
              </Link>
            </p>

            {/* Divider */}
            <div className="border-t border-[#E9E2D7]" />

            {/* Commitment list */}
            <div className="flex flex-col gap-3">
              {[
                'No synthetic fragrance or artificial colour',
                'Every ingredient listed by name, with a reason',
                'Small batch — reviewed before it ships',
              ].map((line) => (
                <div key={line} className="flex items-start gap-3">
                  <div className="mt-[6px] flex-shrink-0 w-3 h-px bg-[#8D9A83]" aria-hidden="true" />
                  <p className="text-[0.75rem] font-light text-[#68735F] leading-[1.55]">{line}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── Related products ─────────────────────────────────────────── */}
      {related.length > 0 && (
        <section
          className="max-w-[1200px] mx-auto px-6 md:px-8 pb-20 border-t border-[#E9E2D7] pt-12"
          data-kite-surface="product.related"
          data-kite-surface-type="features"
        >
          <p
            className="text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#BEB8AF] mb-8"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Also from the range
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {related.map((rel) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const r = rel as any;
              const relImg = r.variants?.[0]?.image ?? rel.image;
              return (
                <Link
                  key={rel.id}
                  href={`/products/${rel.id}`}
                  className="group flex flex-col gap-3 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8D9A83]"
                  data-kite-cta-id="product-related"
                  data-kite-role="secondary"
                  data-kite-event="product_viewed"
                  data-kite-item={rel.id}
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#F0EBE4]">
                    <Image
                      src={relImg?.src ?? ''}
                      alt={relImg?.alt ?? rel.name}
                      fill
                      className="object-cover object-center transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 80vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p
                      className="text-[0.875rem] font-medium text-[#3B3A38] group-hover:text-[#68735F] transition-colors duration-[800ms]"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {rel.name}
                    </p>
                    {r.variantLabel && (
                      <p className="text-[0.75rem] font-light text-[#8D9A83]" style={{ fontFamily: 'var(--font-inter)' }}>
                        {r.variantLabel}
                      </p>
                    )}
                    <p
                      className="text-[0.875rem] font-normal text-[#3B3A38] mt-0.5"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {r.variants?.[0]?.price ?? rel.price}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Back to shop ─────────────────────────────────────────────── */}
      {related.length === 0 && (
        <section className="max-w-[1200px] mx-auto px-6 md:px-8 pb-20 border-t border-[#E9E2D7] pt-10">
          <Link
            href="/shop"
            className="text-[0.625rem] font-normal tracking-[0.15em] uppercase text-[#68735F] hover:text-[#3B3A38] transition-colors duration-[800ms] flex items-center gap-2"
            data-kite-cta-id="product-back-to-shop"
            data-kite-role="secondary"
            data-kite-event="shop_viewed"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
              <line x1="13" y1="7" x2="1" y2="7" />
              <polyline points="6,2 1,7 6,12" />
            </svg>
            Back to shop
          </Link>
        </section>
      )}

    </main>
  );
}

// ─── Page shell — resolves product, then renders inside CartProvider ──────────

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const productFound = getProductById(id);

  if (!productFound) notFound();

  const product = productFound!;

  return (
    <ClientProviders>
      <div className="min-h-screen bg-[#F8F5F1]">
        <Navbar />
        {/* ProductContent renders inside ClientProviders so useCart() has its provider */}
        <ProductContent product={product} />
        <Footer />
      </div>
    </ClientProviders>
  );
}

