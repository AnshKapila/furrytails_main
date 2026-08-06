import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientProviders from '@/components/ClientProviders';

export const metadata = {
  title: 'Your account — Furrytail',
  description: 'Sign in or create a Furrytail account to view your orders and manage your details.',
  alternates: { canonical: '/account' },
  openGraph: {
    url: '/account',
    title: 'Your account — Furrytail',
    description: 'Sign in or create a Furrytail account to view your orders and manage your details.',
    images: ['https://static.kite.ai/image/upload/v1785648855/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/j2sgtsiamihlvbryljwr.png'],
  },
};

// WooCommerce native account/login page URL.
// Replace NEXT_PUBLIC_WC_ACCOUNT_URL in your environment to point to the
// actual WooCommerce customer account page when the backend is live.
const WC_ACCOUNT_URL = process.env.NEXT_PUBLIC_WC_ACCOUNT_URL ?? null;

export default function AccountPage() {
  return (
    <ClientProviders>
    <div className="min-h-screen bg-[#F8F5F1]">
      <Navbar />

      <main
        className="bg-[#F8F5F1] pt-16"
        data-kite-page-id="account"
        data-kite-page-type="account"
      >
        {/* Breadcrumb */}
        <nav
          className="max-w-[1200px] mx-auto px-6 md:px-8 pt-10 pb-0 flex items-center gap-2"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="text-[0.625rem] font-normal tracking-[0.18em] uppercase text-[#8D9A83] hover:text-[#3B3A38] transition-colors duration-[800ms]"
          >
            Home
          </Link>
          <span className="text-[#BEB8AF] text-[0.625rem]" aria-hidden="true">/</span>
          <span className="text-[0.625rem] font-normal tracking-[0.18em] uppercase text-[#3B3A38]">
            Account
          </span>
        </nav>

        <section className="max-w-[560px] mx-auto px-6 md:px-8 py-16 md:py-24">
          <p
            className="text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#8D9A83] mb-4"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Your account
          </p>
          <h1
            className="text-[#3B3A38] mb-6 !mx-0 text-left"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2.25rem, 4vw, 3rem)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.02em' }}
          >
            Welcome back.
          </h1>

          {WC_ACCOUNT_URL ? (
            /* When WooCommerce account URL is configured — link out to native account */
            <div className="flex flex-col gap-5">
              <p
                className="text-[0.875rem] font-light text-[#3B3A38]/80 leading-[1.65]"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Sign in to view your orders and manage your details.
              </p>
              <a
                href={WC_ACCOUNT_URL}
                className="hero-btn-primary self-start"
                style={{ minHeight: '52px', padding: '0 32px' }}
                data-kite-cta-id="account-signin"
                data-kite-role="primary"
                data-kite-event="account_signin_started"
              >
                Sign in to your account
              </a>
              <p
                className="text-[0.75rem] font-light text-[#8D9A83] leading-[1.55]"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                No account yet?{' '}
                <a
                  href={WC_ACCOUNT_URL}
                  className="underline underline-offset-2 hover:text-[#3B3A38] transition-colors duration-[800ms]"
                >
                  Create one here.
                </a>
              </p>
            </div>
          ) : (
            /* Account not yet connected — honest holding state */
            <div className="flex flex-col gap-6">
              <p
                className="text-[0.875rem] font-light text-[#3B3A38]/80 leading-[1.65]"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Customer accounts are coming soon. Once they are ready, you will be able to sign in here to view your order history and manage your details.
              </p>

              <div className="border-t border-[#E9E2D7] pt-6 flex flex-col gap-4">
                <p
                  className="text-[0.625rem] font-normal tracking-[0.18em] uppercase text-[#BEB8AF]"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  In the meantime
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {/* Browse our products */}
                  <Link
                    href="/shop"
                    className="group flex flex-col items-center justify-center gap-3 border border-[#D8CFC4] hover:border-[#8D9A83] aspect-square p-4 transition-colors duration-[800ms] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8D9A83]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-[#8D9A83] group-hover:text-[#3B3A38] transition-colors duration-[800ms] flex-shrink-0">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    <span className="text-[0.5625rem] font-normal tracking-[0.12em] uppercase text-[#3B3A38] group-hover:text-[#68735F] transition-colors duration-[800ms] text-center leading-[1.4]">
                      Browse products
                    </span>
                  </Link>

                  {/* Get in touch */}
                  <Link
                    href="/#contact"
                    className="group flex flex-col items-center justify-center gap-3 border border-[#D8CFC4] hover:border-[#8D9A83] aspect-square p-4 transition-colors duration-[800ms] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8D9A83]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-[#8D9A83] group-hover:text-[#3B3A38] transition-colors duration-[800ms] flex-shrink-0">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span className="text-[0.5625rem] font-normal tracking-[0.12em] uppercase text-[#3B3A38] group-hover:text-[#68735F] transition-colors duration-[800ms] text-center leading-[1.4]">
                      Get in touch
                    </span>
                  </Link>

                  {/* Shipping & returns */}
                  <Link
                    href="/shipping"
                    className="group flex flex-col items-center justify-center gap-3 border border-[#D8CFC4] hover:border-[#8D9A83] aspect-square p-4 transition-colors duration-[800ms] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8D9A83]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-[#8D9A83] group-hover:text-[#3B3A38] transition-colors duration-[800ms] flex-shrink-0">
                      <rect x="1" y="3" width="15" height="13" rx="1" />
                      <path d="M16 8h4l3 5v3h-7V8Z" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                    <span className="text-[0.5625rem] font-normal tracking-[0.12em] uppercase text-[#3B3A38] group-hover:text-[#68735F] transition-colors duration-[800ms] text-center leading-[1.4]">
                      Shipping &amp; returns
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
    </ClientProviders>
  );
}
