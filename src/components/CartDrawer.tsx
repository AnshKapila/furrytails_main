'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart, CHECKOUT_URL } from '@/lib/cart';

// ─── Thin-stroke icons consistent with the nav icon set ───────────────────────

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <line x1="2" y1="2" x2="14" y2="14" stroke="#3B3A38" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="14" y1="2" x2="2" y2="14" stroke="#3B3A38" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <line x1="2" y1="6" x2="10" y2="6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <line x1="6" y1="2" x2="6" y2="10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="2" y1="6" x2="10" y2="6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function RemoveIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <line x1="2" y1="2" x2="10" y2="10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="10" y1="2" x2="2" y2="10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function CartDrawer() {
  const { items, drawerOpen, subtotal, closeDrawer, removeItem, updateQty } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-[#3B3A38]/30 backdrop-blur-[2px] transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[70] w-full max-w-[400px] bg-[#F8F5F1] flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-[#E9E2D7] flex-shrink-0">
          <div className="flex items-center gap-3">
            <span
              className="text-[0.625rem] font-normal tracking-[0.22em] uppercase text-[#3B3A38]"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Your bag
            </span>
            {items.length > 0 && (
              <span
                className="text-[0.6rem] font-normal text-[#8D9A83]"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {items.reduce((s, i) => s + (isFinite(i.qty) ? i.qty : 0), 0)} {items.reduce((s, i) => s + (isFinite(i.qty) ? i.qty : 0), 0) === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            className="w-8 h-8 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#68735F] transition-opacity duration-[800ms] hover:opacity-60"
            aria-label="Close bag"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Line items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#BEB8AF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <p
                className="text-[0.875rem] font-light text-[#BEB8AF] leading-[1.6]"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Your bag is empty.
              </p>
              <Link
                href="/shop"
                onClick={closeDrawer}
                className="text-[0.625rem] font-normal tracking-[0.18em] uppercase text-[#68735F] hover:text-[#3B3A38] transition-colors duration-[800ms] underline underline-offset-2"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Browse products
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-[#E9E2D7]" role="list">
              {items.map((item) => {
                // Guard against null/undefined id from corrupt localStorage items
                // (hydration validator should prevent this, but double-guard here)
                const safeId = item.id || '';
                const lineKey = item.variantId ? `${safeId}__${item.variantId}` : safeId || `line-${Math.random()}`;
                return (
                  <li key={lineKey} className="flex gap-4 px-6 py-5">
                    {/* Product image */}
                    <Link
                      href={safeId ? `/products/${safeId}` : '/shop'}
                      onClick={closeDrawer}
                      className="flex-shrink-0 block w-16 h-20 bg-[#F0EBE4] overflow-hidden focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8D9A83]"
                      aria-label={`View ${item.name}`}
                    >
                      <div className="relative w-full h-full">
                        {/* Guard: Next.js <Image> throws if src is null/undefined/empty */}
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.imageAlt || item.name}
                            fill
                            className="object-cover object-center"
                            sizes="64px"
                          />
                        ) : (
                          /* Fallback placeholder when image is missing */
                          <div className="w-full h-full bg-[#E9E2D7] flex items-center justify-center" aria-hidden="true">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#BEB8AF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="3" width="18" height="18" rx="1"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                            </svg>
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Details */}
                    <div className="flex-1 flex flex-col gap-2 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-col gap-0.5 min-w-0">
                          <p
                            className="text-[0.8125rem] font-medium text-[#3B3A38] leading-snug truncate"
                            style={{ fontFamily: 'var(--font-inter)' }}
                          >
                            {item.name}
                          </p>
                          {item.variantLabel && (
                            <p
                              className="text-[0.6875rem] font-light text-[#8D9A83]"
                              style={{ fontFamily: 'var(--font-inter)' }}
                            >
                              {item.variantLabel}
                            </p>
                          )}
                        </div>
                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => removeItem(item.id, item.variantId)}
                          className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-[#BEB8AF] hover:text-[#3B3A38] transition-colors duration-[800ms] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8D9A83] mt-0.5"
                          aria-label={`Remove ${item.name} from bag`}
                        >
                          <RemoveIcon />
                        </button>
                      </div>

                      {/* Price + qty row */}
                      <div className="flex items-center justify-between mt-auto">
                        <span
                          className="text-[0.875rem] font-medium text-[#3B3A38]"
                          style={{ fontFamily: 'var(--font-inter)' }}
                        >
                          {item.price}
                        </span>
                        {/* Quantity selector */}
                        <div className="flex items-center gap-0 border border-[#D8CFC4]">
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, item.variantId, item.qty - 1)}
                            className="w-8 h-8 flex items-center justify-center text-[#3B3A38] hover:bg-[#E9E2D7] transition-colors duration-[800ms] focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#8D9A83]"
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            <MinusIcon />
                          </button>
                          <span
                            className="w-8 text-center text-[0.75rem] font-normal text-[#3B3A38] select-none"
                            style={{ fontFamily: 'var(--font-inter)' }}
                            aria-label={`Quantity: ${item.qty}`}
                          >
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, item.variantId, item.qty + 1)}
                            className="w-8 h-8 flex items-center justify-center text-[#3B3A38] hover:bg-[#E9E2D7] transition-colors duration-[800ms] focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#8D9A83]"
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            <PlusIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer — subtotal + checkout */}
        {items.length > 0 && (
          <div className="flex-shrink-0 border-t border-[#E9E2D7] px-6 py-5 flex flex-col gap-4 bg-[#F8F5F1]">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span
                className="text-[0.625rem] font-normal tracking-[0.18em] uppercase text-[#8D9A83]"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Subtotal
              </span>
              <span
                className="text-[1rem] font-medium text-[#3B3A38]"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {/* Guard against NaN subtotal (e.g. from corrupt localStorage items) */}
                ₹{isFinite(subtotal) ? subtotal : 0}
              </span>
            </div>
            <p
              className="text-[0.6875rem] font-light text-[#8D9A83] leading-[1.5]"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Shipping and taxes are calculated at checkout.
            </p>
            {/* Checkout CTA — hands off to WooCommerce native checkout */}
            <a
              href={CHECKOUT_URL}
              className="hero-btn-primary justify-center w-full"
              style={{ minHeight: '52px', fontSize: '0.875rem', letterSpacing: '0.04em' }}
              data-kite-cta-id="cart-checkout"
              data-kite-role="primary"
              data-kite-event="checkout_started"
            >
              Proceed to checkout
            </a>
            <button
              type="button"
              onClick={closeDrawer}
              className="text-center text-[0.625rem] font-normal tracking-[0.18em] uppercase text-[#8D9A83] hover:text-[#3B3A38] transition-colors duration-[800ms] focus:outline-none focus-visible:underline"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Continue shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
