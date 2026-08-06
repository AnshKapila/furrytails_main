'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LOGO_URL, navLinks } from '@/data/home';
import { useCart } from '@/lib/cart';
import SearchOverlay from '@/components/SearchOverlay';

// ─── Nav icon set — outlined, thin stroke 1.4, 20×20 viewport ────────────────
// All three icons share identical stroke weight, size, and vertical alignment.

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="9" r="6" />
      <line x1="14.5" y1="14.5" x2="18" y2="18" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="10" cy="7" r="3.5" />
      <path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 5.5h12l-1.5 11H5.5L4 5.5Z" />
      <path d="M7.5 5.5C7.5 3.567 8.567 2 10 2s2.5 1.567 2.5 3.5" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [atHero, setAtHero] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount, openDrawer } = useCart();
  const pathname = usePathname();

  // Transparent-over-hero behaviour is only active on the homepage
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close mobile nav on Escape
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') setOpen(false); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#F8F5F1]/95 backdrop-blur-sm border-b border-[#E9E2D7] shadow-[0_1px_12px_rgba(59,58,56,0.06)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#68735F]"
            data-kite-nav="logo"
            data-kite-nav-location="header"
            aria-label="Furrytail: go to homepage"
          >
            <Image
              src={LOGO_URL}
              alt="Furrytail"
              width={139}
              height={36}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav links — centre */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="nav-link text-[0.72rem] font-normal tracking-[0.12em] uppercase transition-colors duration-500 relative after:absolute after:bottom-[-2px] after:left-0 after:h-px after:w-0 after:bg-[#68735F] after:transition-all after:duration-[800ms] hover:after:w-full focus:outline-none text-[#3B3A38] hover:text-[#68735F] focus-visible:text-[#68735F]"
                data-kite-nav={link.label.toLowerCase().replace(/\s+/g, '-')}
                data-kite-nav-location="header"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side: icon group + CTA */}
          <div className="flex items-center gap-1">

            {/* ── Icon group: search, account, bag ── */}
            <div className="flex items-center gap-0.5">

              {/* Search */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="w-10 h-10 flex items-center justify-center transition-colors duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#68735F] text-[#3B3A38] hover:text-[#68735F]"
                aria-label="Search products"
                data-kite-cta-id="nav-search"
                data-kite-role="secondary"
                data-kite-event="search_opened"
              >
                <SearchIcon />
              </button>

              {/* Account */}
              <Link
                href="/account"
                className="w-10 h-10 flex items-center justify-center transition-colors duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#68735F] text-[#3B3A38] hover:text-[#68735F]"
                aria-label="Your account"
                data-kite-nav="account"
                data-kite-nav-location="header"
              >
                <AccountIcon />
              </Link>

              {/* Bag with item-count indicator */}
              <button
                type="button"
                onClick={openDrawer}
                className="relative w-10 h-10 flex items-center justify-center transition-colors duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#68735F] text-[#3B3A38] hover:text-[#68735F]"
                aria-label={itemCount > 0 ? `Open bag — ${itemCount} ${itemCount === 1 ? 'item' : 'items'}` : 'Open bag'}
                data-kite-cta-id="nav-cart"
                data-kite-role="primary"
                data-kite-event="cart_opened"
              >
                <BagIcon />
                {/* Item count indicator — sharp-cornered, charcoal bg, ivory text */}
                {itemCount > 0 && (
                  <span
                    className="absolute top-1.5 right-1.5 min-w-[14px] h-[14px] flex items-center justify-center bg-[#3B3A38] text-[#F8F5F1] text-[0.5rem] font-medium leading-none px-[3px]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                    aria-hidden="true"
                  >
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </button>
            </div>

            {/* Hamburger — mobile only */}
            <button
              type="button"
              className="md:hidden flex flex-col justify-center items-end gap-[5px] w-8 h-8 ml-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#68735F] z-50"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close navigation' : 'Open navigation'}
              aria-expanded={open}
            >
              <span className={`block h-px bg-[#3B3A38] transition-all duration-300 ${open ? 'w-6 rotate-45 translate-y-[7px]' : 'w-6'}`} />
              <span className={`block h-px bg-[#3B3A38] transition-all duration-200 ${open ? 'opacity-0 w-0' : 'w-4'}`} />
              <span className={`block h-px bg-[#3B3A38] transition-all duration-300 ${open ? 'w-6 -rotate-45 -translate-y-[7px]' : 'w-6'}`} />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-[#3B3A38]/30 backdrop-blur-[2px] md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-40 w-[280px] bg-[#F8F5F1] flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-[#E9E2D7] flex-shrink-0">
          <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[#BEB8AF] font-normal">Menu</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-8 h-8 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#68735F]"
            aria-label="Close navigation"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <line x1="2" y1="2" x2="14" y2="14" stroke="#3B3A38" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="14" y1="2" x2="2" y2="14" stroke="#3B3A38" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 flex flex-col px-6 pt-8 gap-1" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="py-3 text-[0.8rem] font-normal tracking-[0.1em] uppercase text-[#3B3A38] border-b border-[#E9E2D7]/50 hover:text-[#68735F] transition-colors duration-[800ms] focus:outline-none focus-visible:text-[#68735F]"
              onClick={() => setOpen(false)}
              data-kite-nav={link.label.toLowerCase().replace(/\s+/g, '-')}
              data-kite-nav-location="header"
            >
              {link.label}
            </Link>
          ))}
          {/* Account link in mobile nav */}
          <Link
            href="/account"
            className="py-3 text-[0.8rem] font-normal tracking-[0.1em] uppercase text-[#3B3A38] border-b border-[#E9E2D7]/50 hover:text-[#68735F] transition-colors duration-[800ms] focus:outline-none focus-visible:text-[#68735F]"
            onClick={() => setOpen(false)}
            data-kite-nav="account"
            data-kite-nav-location="header"
          >
            Account
          </Link>
        </nav>

        <div className="px-6 pb-8 pt-6 flex flex-col gap-3">
          <Link
            href="/shop"
            className="hero-btn-primary w-full justify-center"
            style={{ fontSize: '0.68rem', letterSpacing: '0.18em', minHeight: '48px' }}
            onClick={() => setOpen(false)}
            data-kite-cta-id="mobile-nav-shop-cta"
            data-kite-role="primary"
            data-kite-event="shop_clicked"
          >
            Shop Now
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true" className="btn-arrow flex-shrink-0">
              <line x1="1" y1="7" x2="13" y2="7" />
              <polyline points="8,2 13,7 8,12" />
            </svg>
          </Link>
          {/* Mobile search shortcut */}
          <button
            type="button"
            onClick={() => { setOpen(false); setSearchOpen(true); }}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-[0.68rem] font-normal tracking-[0.18em] uppercase text-[#68735F] border border-[#D8CFC4] hover:border-[#8D9A83] transition-colors duration-[800ms] focus:outline-none"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            <SearchIcon />
            Search
          </button>
        </div>
      </div>

      {/* Search overlay */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
