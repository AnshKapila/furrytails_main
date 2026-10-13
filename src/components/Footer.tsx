import Link from 'next/link';
import Image from 'next/image';
import { getGlobalSettings } from '@/services/api';
import { POPULAR_SEARCHES } from '@/data/popular-searches';
import { FACEBOOK_URL, GOOGLE_REVIEW_URL, YOUTUBE_URL } from '@/lib/brand';

export default function Footer() {
  const { logoUrl: LOGO_URL, footer } = getGlobalSettings();
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-[#3B3A38] text-[#F8F5F1]"
      data-kite-surface="home.footer"
      data-kite-surface-type="footer"
    >
      {/* Upper footer */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 pt-16 pb-12 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 md:gap-8">
        {/* Brand col */}
        <div className="flex flex-col gap-5">
          <Link href="/" data-kite-nav="footer-logo" data-kite-nav-location="footer" aria-label="Furrytail">
            <Image
              src={LOGO_URL}
              alt="Furrytail"
              width={120}
              height={30}
              className="h-8 w-auto object-contain brightness-0 invert"
            />
          </Link>
          <p className="text-[0.875rem] font-light text-[#D8CFC4] leading-[1.6] max-w-[240px]">
            {footer.tagline}
          </p>
          <div className="flex items-center gap-4 mt-1">
            <a
              href="https://www.instagram.com/furrytailjoy/"
              target="_blank"
              rel="noreferrer"
              className="text-[#BEB8AF] hover:text-[#F8F5F1] transition-colors duration-[800ms] focus:outline-none focus-visible:text-[#F8F5F1]"
              aria-label="Follow Furrytail on Instagram"
              data-kite-nav="instagram"
              data-kite-nav-location="social"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
              className="text-[#BEB8AF] hover:text-[#F8F5F1] transition-colors duration-[800ms] focus:outline-none focus-visible:text-[#F8F5F1]"
              aria-label="Follow Furrytail on Facebook"
              data-kite-nav="facebook"
              data-kite-nav-location="social"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noreferrer"
              className="text-[#BEB8AF] hover:text-[#F8F5F1] transition-colors duration-[800ms] focus:outline-none focus-visible:text-[#F8F5F1]"
              aria-label="Watch Furrytail on YouTube"
              data-kite-nav="youtube"
              data-kite-nav-location="social"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
              </svg>
            </a>
          </div>
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noreferrer"
            className="text-[0.75rem] font-light text-[#BEB8AF] underline decoration-[#BEB8AF]/30 underline-offset-4 hover:text-[#F8F5F1] transition-colors duration-[800ms] focus:outline-none focus-visible:text-[#F8F5F1]"
            data-kite-nav="google-review"
            data-kite-nav-location="social"
          >
            Review us on Google
          </a>
        </div>

        {/* Shop col */}
        <div>
          <p className="text-[0.625rem] font-normal tracking-[0.2em] uppercase text-[#8D9A83] mb-5">Shop</p>
          <ul className="flex flex-col gap-3">
            {footer.shopLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[0.875rem] font-light text-[#D8CFC4] hover:text-[#F8F5F1] transition-colors duration-[800ms] focus:outline-none focus-visible:text-[#F8F5F1]"
                  data-kite-nav={`footer-shop-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  data-kite-nav-location="footer"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company col */}
        <div>
          <p className="text-[0.625rem] font-normal tracking-[0.2em] uppercase text-[#8D9A83] mb-5">Company</p>
          <ul className="flex flex-col gap-3">
            {footer.companyLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[0.875rem] font-light text-[#D8CFC4] hover:text-[#F8F5F1] transition-colors duration-[800ms] focus:outline-none focus-visible:text-[#F8F5F1]"
                  data-kite-nav={`footer-company-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  data-kite-nav-location="footer"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Popular searches */}
      <nav
        aria-label="Popular searches"
        className="border-t border-[#F8F5F1]/10 max-w-[1200px] mx-auto px-6 md:px-8 py-8"
      >
        <p className="text-[0.625rem] font-normal tracking-[0.2em] uppercase text-[#8D9A83] mb-4">Popular searches</p>
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {POPULAR_SEARCHES.map((s) => (
            <li key={s.term}>
              <Link
                href={s.href}
                className="text-[0.75rem] font-light text-[#BEB8AF] underline decoration-[#BEB8AF]/30 underline-offset-4 hover:text-[#F8F5F1] hover:decoration-[#F8F5F1]/60 transition-colors duration-[800ms] focus:outline-none focus-visible:text-[#F8F5F1]"
                data-kite-nav={`footer-search-${s.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                data-kite-nav-location="footer"
              >
                {s.term}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Lower footer */}
      <div className="border-t border-[#F8F5F1]/10 max-w-[1200px] mx-auto px-6 md:px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-[0.6875rem] font-light text-[#BEB8AF] tracking-wide">
          &copy; {year} Furrytail. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          {footer.legalLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[0.6875rem] font-light text-[#BEB8AF] hover:text-[#F8F5F1] transition-colors duration-[800ms] focus:outline-none focus-visible:text-[#F8F5F1]"
              data-kite-nav={`footer-legal-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              data-kite-nav-location="footer"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

