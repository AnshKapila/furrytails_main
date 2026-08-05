'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { allProducts } from '@/data/home';

// Flatten all products from allProducts for search
const PRODUCT_CATALOG = allProducts.products;

// Search terms that should match each product (name + category)
function matches(query: string, product: (typeof PRODUCT_CATALOG)[0]): boolean {
  const q = query.toLowerCase().trim();
  if (!q) return false;
  const haystack = [product.name, product.category, product.shortDesc]
    .join(' ')
    .toLowerCase();
  return q.split(' ').every((word) => haystack.includes(word));
}

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when overlay opens; clear query when closing
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const results = query.trim()
    ? PRODUCT_CATALOG.filter((p) => matches(query, p))
    : [];
  const hasQuery = query.trim().length > 0;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-[#3B3A38]/30 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Overlay panel — slides down from top */}
      <div
        className={`fixed top-0 left-0 right-0 z-[70] bg-[#F8F5F1] border-b border-[#E9E2D7] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          open ? 'translate-y-0' : '-translate-y-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
      >
        {/* Search input row */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 h-16 flex items-center gap-4">
          {/* Magnifier icon (static inside field) */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
            stroke="#BEB8AF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="flex-shrink-0"
          >
            <circle cx="9" cy="9" r="6" />
            <line x1="14" y1="14" x2="18" y2="18" />
          </svg>

          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by product, range, or ingredient..."
            className="flex-1 h-full bg-transparent text-[0.875rem] font-light text-[#3B3A38] placeholder:text-[#BEB8AF] outline-none border-none"
            style={{ fontFamily: 'var(--font-inter)' }}
            aria-label="Search products"
            autoComplete="off"
            spellCheck={false}
          />

          <button
            type="button"
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-[#3B3A38] hover:opacity-60 transition-opacity duration-[800ms] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#68735F]"
            aria-label="Close search"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <line x1="2" y1="2" x2="14" y2="14" stroke="#3B3A38" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="14" y1="2" x2="2" y2="14" stroke="#3B3A38" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Results area — shown only when user has typed something */}
        {hasQuery && (
          <div className="max-w-[1200px] mx-auto px-6 md:px-8 pb-6 border-t border-[#E9E2D7]">
            {results.length === 0 ? (
              <p
                className="pt-5 text-[0.8125rem] font-light text-[#BEB8AF]"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                No products match &ldquo;{query}&rdquo;.
              </p>
            ) : (
              <ul
                className="pt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                role="list"
              >
                {results.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/products/${product.id}`}
                      onClick={onClose}
                      className="group flex flex-col gap-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8D9A83]"
                    >
                      {/* Image */}
                      <div className="relative aspect-[3/4] bg-[#F0EBE4] overflow-hidden">
                        <Image
                          src={product.image?.src ?? ''}
                          alt={product.image?.alt ?? product.name}
                          fill
                          className="object-cover object-center transition-transform duration-[800ms] group-hover:scale-[1.04]"
                          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
                        />
                      </div>
                      {/* Name + price */}
                      <div className="flex flex-col gap-0.5">
                        <p
                          className="text-[0.8125rem] font-medium text-[#3B3A38] leading-snug group-hover:text-[#68735F] transition-colors duration-[800ms]"
                          style={{ fontFamily: 'var(--font-inter)' }}
                        >
                          {product.name}
                        </p>
                        <p
                          className="text-[0.75rem] font-normal text-[#8D9A83]"
                          style={{ fontFamily: 'var(--font-inter)' }}
                        >
                          {product.price}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  );
}
