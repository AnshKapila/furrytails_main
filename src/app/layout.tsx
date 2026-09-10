import type { Metadata } from 'next';
import { getBaseUrl } from '@/lib/site-url';
import { cormorant, inter } from './fonts';
import './globals.css';
import WhatsAppNudge from '@/components/WhatsAppNudge';
import NewsletterPopup from '@/components/NewsletterPopup';

// Caps the shared-cache TTL on every page below this layout. Without it Next
// serves prerendered pages with ``s-maxage=31536000``, and Hostinger's CDN -
// which does not purge on deploy - held a document for 18 hours; because chunk
// filenames are content-hashed, that stale HTML requested the previous build's
// chunks and the stylesheet 404'd, painting the site with no CSS.
//
// middleware.ts already stops document requests being cached, but only those
// sending ``Accept: text/html``. A crawler or prefetch asking with ``*/*``
// would otherwise let the edge store the HTML for a year and serve it on to
// browsers, so this keeps the ceiling at five minutes for those too. It also
// means WooCommerce product changes surface without a redeploy.
export const revalidate = 300;

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: 'Furrytail — Natural care, considered',
  description: 'Join the Furrytail early access list for a new natural pet care ritual.',
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: 'https://static.kite.ai/image/upload/v1785039469/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/sfz9mtw46huqdvgxykuq.png',
    shortcut: 'https://static.kite.ai/image/upload/v1785039469/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/sfz9mtw46huqdvgxykuq.png',
    apple: 'https://static.kite.ai/image/upload/v1785039469/app/eaccac4c-a287-4e55-89be-8007fdbfaef1/sfz9mtw46huqdvgxykuq.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${inter.variable}`}>
        {children}
        <WhatsAppNudge />
        <NewsletterPopup />
      </body>
    </html>
  );
}

