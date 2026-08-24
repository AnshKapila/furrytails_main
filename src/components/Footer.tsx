import Link from 'next/link';
import Image from 'next/image';
import { getGlobalSettings } from '@/services/api';

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
          </div>
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

