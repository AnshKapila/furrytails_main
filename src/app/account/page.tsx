import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientProviders from '@/components/ClientProviders';
import ProfileDashboard from '@/components/profile/ProfileDashboard';

export const metadata = {
  title: 'Your account — Furrytail',
  description: 'Manage your profile details, view order history, and access your wish list.',
  alternates: { canonical: '/account' },
  openGraph: {
    url: '/account',
    title: 'Your account — Furrytail',
    description: 'Manage your profile details, view order history, and access your wish list.',
    images: ['https://static.kite.ai/image/upload/v1785648855/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/j2sgtsiamihlvbryljwr.png'],
  },
};

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

        <section className="max-w-[1200px] mx-auto px-6 md:px-8 py-12 md:py-16">
          <ProfileDashboard />
        </section>
      </main>

      <Footer />
    </div>
    </ClientProviders>
  );
}
