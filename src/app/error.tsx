'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F5F1] text-[#3B3A38]">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-24 text-center">
        <div className="max-w-[560px] mx-auto flex flex-col items-center">
          {/* Eyebrow */}
          <p className="text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#8D9A83] mb-4">
            System Error
          </p>

          {/* Heading */}
          <h1
            className="text-[#3B3A38] mb-6 !mx-0 text-center"
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Something went wrong.
          </h1>

          {/* Subtext */}
          <p className="text-[0.9375rem] font-light text-[#3B3A38]/70 leading-[1.65] mb-10 max-w-[440px]">
            An unexpected glitch interrupted this section. Please try again or return to the homepage.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => reset()}
              className="hero-btn-primary group cursor-pointer"
            >
              Try Again
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true" className="btn-arrow flex-shrink-0">
                <line x1="1" y1="7" x2="13" y2="7" />
                <polyline points="8,2 13,7 8,12" />
              </svg>
            </button>
            <Link
              href="/"
              className="hero-btn-secondary group focus:outline-none border border-[#D8CFC4] hover:border-[#8D9A83] px-6 py-3 min-h-[48px]"
            >
              Return Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
