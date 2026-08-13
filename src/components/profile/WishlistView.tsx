'use client';

import React, { useEffect, useState } from 'react';
import { useWishlist } from '@/lib/wishlist';
import Link from 'next/link';
import Image from 'next/image';

export default function WishlistView() {
  const { items, toggleWishlist } = useWishlist();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <div className="animate-pulse h-64 bg-[#E9E2D7] rounded-sm" />;

  return (
    <div>
      <h2 className="text-[#3B3A38] text-2xl mb-6" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 400 }}>
        Wish List
      </h2>
      
      {items.length === 0 ? (
        <div className="border border-[#E9E2D7] p-8 text-center flex flex-col items-center justify-center gap-4 rounded-sm">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-[#8D9A83]">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <p className="text-[0.875rem] font-light text-[#3B3A38]/80 leading-[1.65]" style={{ fontFamily: 'var(--font-inter)' }}>
            Your wish list is empty.
          </p>
          <Link href="/shop" className="text-[0.625rem] font-normal tracking-[0.14em] uppercase text-[#68735F] hover:text-[#3B3A38] transition-colors duration-[800ms] border border-[#D8CFC4] hover:border-[#8D9A83] px-5 py-3 mt-2">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {items.map((item) => (
            <div key={item.id} className="group flex flex-col gap-3 relative">
              <Link href={`/products/${item.id}`} className="block relative aspect-square overflow-hidden bg-[#F1EBE3] rounded-sm">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover object-center transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
                />
              </Link>
              
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleWishlist(item);
                }}
                className="absolute top-2 right-2 bg-white/80 hover:bg-white p-2 rounded-full shadow-sm transition-colors text-[#3B3A38]"
                aria-label="Remove from Wishlist"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>

              <div className="flex flex-col gap-1 px-1">
                <h3 className="text-[0.75rem] font-normal text-[#3B3A38] leading-tight" style={{ fontFamily: 'var(--font-inter)' }}>
                  <Link href={`/products/${item.id}`} className="hover:opacity-70 transition-opacity">
                    {item.name}
                  </Link>
                </h3>
                <p className="text-[0.6875rem] text-[#68735F]" style={{ fontFamily: 'var(--font-inter)' }}>
                  {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
