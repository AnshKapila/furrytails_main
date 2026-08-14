'use client';

// ─────────────────────────────────────────────────────────────────────────────
// Account area.
//
// Real accounts live in WooCommerce: sign-in, saved addresses and order history
// are all handled there, and this page links out to them. We deliberately do
// NOT keep a local copy — a "profile" in localStorage never reaches an order,
// and an order history that can't read WooCommerce would tell a customer who
// just bought something that they have no orders.
//
// The wish list is different: it's per-device by nature, needs no account, and
// works entirely client-side. So it stays here.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import Link from 'next/link';
import WishlistView from './WishlistView';
import { ACCOUNT_URL } from '@/lib/cart';

function ExternalArrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true" className="flex-shrink-0">
      <line x1="2" y1="12" x2="12" y2="2" />
      <polyline points="5,2 12,2 12,9" />
    </svg>
  );
}

export default function ProfileDashboard() {
  return (
    <div className="flex flex-col md:flex-row gap-12 md:gap-24">

      {/* Sidebar */}
      <div className="w-full md:w-64 flex-shrink-0 flex flex-col gap-10">

        <div className="flex flex-col gap-4">
          <span
            className="text-left text-[0.875rem] text-[#3B3A38] font-medium"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Wish List
          </span>

          {ACCOUNT_URL && (
            <a
              href={ACCOUNT_URL}
              className="text-left text-[0.875rem] text-[#68735F] hover:text-[#3B3A38] transition-colors inline-flex items-center gap-1.5"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Orders &amp; addresses <ExternalArrow />
            </a>
          )}
        </div>

        {/* Supplementary Links */}
        <div className="border-t border-[#E9E2D7] pt-8 flex flex-col gap-4">
          <Link
            href="/shop"
            className="text-left text-[0.875rem] text-[#68735F] hover:text-[#3B3A38] transition-colors"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Browse Products
          </Link>
          <Link
            href="/#contact"
            className="text-left text-[0.875rem] text-[#68735F] hover:text-[#3B3A38] transition-colors"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Get in Touch
          </Link>
          <Link
            href="/shipping"
            className="text-left text-[0.875rem] text-[#68735F] hover:text-[#3B3A38] transition-colors"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Shipping &amp; Returns
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col gap-12">
        <WishlistView />

        {/* Orders / addresses live in WooCommerce */}
        {ACCOUNT_URL && (
          <div className="border-t border-[#E9E2D7] pt-10 max-w-xl">
            <h2
              className="text-[#3B3A38] text-2xl mb-3"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 400 }}
            >
              Orders &amp; addresses
            </h2>
            <p
              className="text-[0.875rem] font-light text-[#3B3A38]/80 leading-[1.65] mb-5"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Your order history, saved addresses and account details are kept
              securely with your orders. Sign in to view them.
            </p>
            <a
              href={ACCOUNT_URL}
              className="hero-btn-secondary inline-flex items-center gap-2"
              style={{ minHeight: '48px', padding: '0 28px', fontSize: '0.875rem' }}
              data-kite-cta-id="account-woo-signin"
              data-kite-role="secondary"
            >
              Sign in to your account <ExternalArrow />
            </a>
          </div>
        )}
      </div>

    </div>
  );
}
