'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart, parsePrice } from '@/lib/cart';
import { useWishlist } from '@/lib/wishlist';
import type { WooProduct } from '@/services/types';
import { useProducts } from '@/hooks/useProducts';

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
            className="text-[0.875rem] font-normal text-[#3B3A38] flex-shrink-0"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {displayPrice}
          </span>
        </div>
        <p
          className="text-[0.8125rem] font-light text-[#8D9A83] leading-snug mb-4"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {product.shortDesc}
        </p>

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

export default function ProductClient({
  product,
  related,
}: {
  product: WooProduct;
  related: WooProduct[];
}) {
  const { products } = useProducts();
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

  // Gallery thumbnails come from the WooCommerce product gallery (featured
  // image first). Capped at 4 to match the grid; the row is hidden entirely
  // when a product only has its featured image, rather than padding it out
  // with empty tiles.
  const [activeImage, setActiveImage] = useState(0);
  const gallery = (product.gallery?.length ? product.gallery : [product.image])
    .filter((img) => Boolean(img?.src))
    .slice(0, 4);
  const heroImage = gallery[activeImage] ?? displayImage;

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
            <div className="relative aspect-[4/5] md:aspect-[4/5] overflow-hidden bg-[#F0EBE4] w-full flex items-center justify-center">
              {heroImage?.src && (
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt ?? product.name}
                  fill
                  className="object-cover object-center transition-opacity duration-300"
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
            
            {/* Thumb row - real gallery images, hidden when there is only one */}
            {gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-2 md:gap-4">
                {gallery.map((img, idx) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setActiveImage(idx)}
                    aria-label={`View image ${idx + 1} of ${gallery.length}`}
                    aria-pressed={activeImage === idx}
                    className={`relative aspect-square bg-[#F0EBE4] overflow-hidden transition-opacity duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8D9A83] ${
                      activeImage === idx ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt ?? product.name}
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                  </button>
                ))}
              </div>
            )}
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
              {(product.badge || product.productType) && (
                <>
                  <span className="text-[#8D9A83]" aria-hidden="true">&middot;</span>
                  <span
                    className="text-[0.6875rem] font-normal tracking-[0.2em] uppercase text-[#68735F]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {product.badge || product.productType}
                  </span>
                </>
              )}
            </div>

            {/* pdp__name */}
            <h1 className="text-h1 text-[#3B3A38] mb-2">
              {product.name}
            </h1>

            {/* pdp__fragrance & pdp__price */}
            <div className="flex flex-col gap-1">
              {(product.variantLabel) && (
                <div className="text-p1 text-[#8D9A83]">
                  {product.variantLabel}
                </div>
              )}
              
              <div className="flex items-end gap-3 mt-1">
                <div className="text-h1 text-[#3B3A38]">
                  {displayPrice}
                </div>
                {displayStandardPrice && (
                  <span className="text-p1 text-[#BEB8AF] line-through leading-[1.3] mb-2">
                    {displayStandardPrice}
                  </span>
                )}
              </div>
            </div>

            {/* pdp__size */}
            <div className="flex items-center gap-2 mt-3">
              <span className="text-p2 text-[#68735F] uppercase tracking-[0.1em]">
                {volume || '300ml'}
              </span>
              <span className="text-[#8D9A83]" aria-hidden="true">&middot;</span>
              <span className="inline-flex flex-row items-center gap-1.5 text-[#68735F] text-p2 uppercase tracking-[0.1em]">
                {product.species === 'dog' && <><DogIcon /> Dogs</>}
                {product.species === 'cat' && <><CatIcon /> Cats</>}
                {product.species === 'both' && <><DogIcon /><CatIcon /> Dogs &amp; Cats</>}
              </span>
            </div>

            {/* pdp__cta-row */}
            <div className="flex items-center gap-3 mt-5 mb-6">
              {/* Add to bag */}
              <button
                type="button"
                onClick={handleAdd}
                disabled={soldOut}
                aria-label={`Add ${product.name} to cart`}
                className="flex-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8D9A83] inline-flex items-center justify-center gap-1.5 border border-[#3B3A38] bg-[#3B3A38] text-[#F8F5F1] px-3 py-2 text-[0.6875rem] font-normal tracking-[0.06em] hover:bg-[#2A2928] hover:border-[#2A2928] active:bg-[#2A2928] active:border-[#2A2928] transition-colors duration-[400ms] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ minHeight: '52px', fontFamily: 'var(--font-inter)', whiteSpace: 'nowrap' }}
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
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0">
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
                className="flex items-center justify-center border border-[#D8CFC4] hover:border-[#8D9A83] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8D9A83] aspect-square rounded-[1px] text-[#3B3A38]"
                style={{ minHeight: '52px', minWidth: '52px' }}
                aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            {/* pdp__sensory */}
            <p className="text-p2 text-[#3B3A38]">
              {displayDesc}
            </p>

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
      {products.length > 0 && (
        <section
          className="max-w-[1200px] mx-auto px-6 md:px-8 pb-20 border-t border-[#E9E2D7] mt-16 md:mt-24 pt-12 md:pt-16"
          data-kite-surface="product.related"
          data-kite-surface-type="features"
        >
          <div className="flex flex-col items-center mb-12 md:mb-16">
              <h2 className="text-h2 text-[#3B3A38]">
                Explore All Our Products
              </h2>
            </div>
  
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-5 pb-8 -mx-6 px-6 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden" style={{ scrollPaddingLeft: "1.5rem", scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {products.map((rel, i) => (
                <div key={rel.id} className="flex-shrink-0 w-[80vw] sm:w-[45vw] md:w-[30vw] lg:w-[calc(25%-0.9375rem)] snap-start " style={{ transitionDuration: "800ms", transitionDelay: `${i * 100}ms` }}>
                  <ProductCard product={rel} />
                </div>
              ))}
            </div>
        </section>
      )}

      {/* Back to shop */}
      {products.length === 0 && (
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










