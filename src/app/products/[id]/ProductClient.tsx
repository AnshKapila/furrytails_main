'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart, parsePrice } from '@/lib/cart';
import { useWishlist } from '@/lib/wishlist';
import type { WooProduct } from '@/services/types';

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

export default function ProductClient({
  product,
  related,
}: {
  product: WooProduct;
  related: WooProduct[];
}) {
  const [added, setAdded] = useState(false);
  const { addItem, openDrawer } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const displayPrice = product.price;
  const displayStandardPrice = product.standardPrice;
  const displayDesc = product.shortDesc ?? '';
  const displayImage = product.image;

  const volume = product.volume;
  const soldOut = product.inStock === false;

  function handleAdd() {
    if (added || soldOut) return;
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
    setAdded(true);
    openDrawer();
    setTimeout(() => setAdded(false), 2000);
  }

  // Thumbnails placeholder structure matching prototype
  const thumbs = [
    { label: 'In use' },
    { label: 'Texture' },
    { label: 'Label detail' },
  ];

  return (
    <main className="pt-24 md:pt-32 pb-16">
      
      {/* Breadcrumb nav */}
      <nav 
        aria-label="Breadcrumb"
        className="max-w-[1200px] mx-auto px-6 md:px-8 mb-8 md:mb-10 flex items-center gap-2"
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

      {/* Product layout matching Prototype Structure */}
      <section
        className="max-w-[1200px] mx-auto px-6 md:px-8 py-4 md:py-6"
        data-kite-surface="product.detail"
        data-kite-surface-type="features"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-24 items-start">

          {/* GALLERY - Prototype Structure */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[4/5] md:aspect-[4/5] overflow-hidden bg-[#3F5A46] w-full flex items-center justify-center">
              {displayImage?.src && (
                <Image
                  src={displayImage.src}
                  alt={displayImage.alt ?? product.name}
                  fill
                  className="object-cover object-center transition-opacity duration-300 mix-blend-multiply"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              )}
              {product.badge && (
                <span
                  className="absolute top-4 right-4 text-[0.6875rem] font-normal tracking-[0.14em] uppercase px-2 py-0.5 bg-[#F8F5F1]/90 text-[#3B3A38]"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {product.badge}
                </span>
              )}
            </div>
            
            {/* Thumb row */}
            <div className="grid grid-cols-4 gap-2 md:gap-4">
              <div className="relative aspect-square bg-[#3F5A46] overflow-hidden cursor-pointer">
                {displayImage?.src && (
                  <Image src={displayImage.src} alt="Thumbnail 1" fill className="object-cover mix-blend-multiply" />
                )}
              </div>
              {thumbs.map((thumb, idx) => (
                <div key={idx} className="relative aspect-square bg-[#3F5A46] text-[#F8F5F1] flex items-center justify-center p-2 text-center text-[0.625rem] md:text-[0.75rem] tracking-[0.05em] uppercase font-light opacity-80 cursor-pointer hover:opacity-100 transition-opacity">
                  {thumb.label}
                </div>
              ))}
            </div>
          </div>

          {/* INFO - Prototype Structure */}
          <div className="flex flex-col gap-5 md:gap-6 pt-4 lg:pt-8">

            {/* pdp__family */}
            <div className="flex items-center gap-2">
              <span
                className="text-[0.6875rem] font-normal tracking-[0.2em] uppercase text-[#68735F]"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {product.category}
              </span>
              <span className="text-[#8D9A83]" aria-hidden="true">&middot;</span>
              <span
                className="text-[0.6875rem] font-normal tracking-[0.2em] uppercase text-[#68735F]"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {product.badge || 'Ritual'}
              </span>
            </div>

            {/* pdp__name */}
            <h1 className="text-4xl md:text-5xl font-cormorant font-light text-[#3B3A38]">
              {product.name}
            </h1>

            {/* pdp__fragrance */}
            {(product.variantLabel) && (
              <div 
                className="text-[0.875rem] font-normal tracking-[0.05em] text-[#8D9A83]"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {product.variantLabel}
              </div>
            )}

            {/* pdp__sensory */}
            <p className="text-[1rem] font-light text-[#3B3A38] leading-[1.65]">
              {displayDesc}
            </p>

            {/* pdp__price */}
            <div className="flex items-end gap-3 mt-2">
              <div className="text-2xl font-light text-[#3B3A38]">
                {displayPrice}
              </div>
              {displayStandardPrice && (
                <span className="text-[1rem] font-light text-[#BEB8AF] line-through leading-[1.3] mb-0.5">
                  {displayStandardPrice}
                </span>
              )}
            </div>

            {/* pdp__size */}
            <div className="flex items-center gap-2 mt-1">
              <span
                className="text-[0.75rem] font-normal tracking-[0.1em] text-[#68735F]"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {volume || '300ml'}
              </span>
              <span className="text-[#8D9A83]" aria-hidden="true">&middot;</span>
              <span
                className="inline-flex flex-row items-center gap-1.5 text-[#68735F]"
                style={{ fontFamily: 'var(--font-inter)', fontSize: '0.75rem', letterSpacing: '0.1em' }}
              >
                {product.species === 'dog' && <><DogIcon /> Dogs</>}
                {product.species === 'cat' && <><CatIcon /> Cats</>}
                {product.species === 'both' && <><DogIcon /><CatIcon /> Dogs &amp; Cats</>}
              </span>
            </div>

            {/* pdp__cta-row */}
            <div className="flex items-center gap-3 mt-6">
              {/* Add to bag */}
              <button
                type="button"
                onClick={handleAdd}
                disabled={soldOut}
                className="hero-btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ minHeight: '52px', padding: '0 32px' }}
                data-kite-cta-id="product-add-to-bag"
                data-kite-role="primary"
                data-kite-event="add_to_bag"
                data-kite-item={product.id}
              >
                {soldOut ? (
                  'Sold out'
                ) : added ? (
                  <>
                    Added
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0 ml-2">
                      <polyline points="1 6 4.5 9.5 11 2.5" />
                    </svg>
                  </>
                ) : (
                  <>Add to the Ritual</>
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
                    price: displayPrice ?? '',
                    image: displayImage?.src ?? '',
                  });
                }}
                className="flex items-center justify-center border border-[#D8CFC4] hover:border-[#8D9A83] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8D9A83] aspect-square rounded-sm text-[#3B3A38]"
                style={{ minHeight: '52px', padding: '0 16px' }}
                aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            {/* pdp__accordions */}
            {product.description && (
              <div className="mt-10 pt-8 border-t border-[#E9E2D7]">
                <div
                  className="product-detail-prose"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            )}
            
          </div>
        </div>

      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section
          className="max-w-[1200px] mx-auto px-6 md:px-8 pb-20 border-t border-[#E9E2D7] mt-16 md:mt-24 pt-12 md:pt-16"
          data-kite-surface="product.related"
          data-kite-surface-type="features"
        >
          <div className="flex flex-col items-center mb-12 md:mb-16">
            <span
              className="text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#BEB8AF] mb-4"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              The Ritual family
            </span>
            <h2 className="text-3xl md:text-4xl font-cormorant font-light text-[#3B3A38]">
              Also in the {product.category}.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {related.map((rel) => {
              const relImg = rel.image;
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
                    {rel.variantLabel && (
                      <p className="text-[0.75rem] font-light text-[#8D9A83]" style={{ fontFamily: 'var(--font-inter)' }}>
                        {rel.variantLabel}
                      </p>
                    )}
                    <p
                      className="text-[0.875rem] font-normal text-[#3B3A38] mt-0.5"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {rel.price}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Back to shop */}
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
