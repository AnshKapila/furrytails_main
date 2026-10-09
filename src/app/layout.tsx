import type { Metadata } from 'next';
import { getBaseUrl } from '@/lib/site-url';
import { HOME_META_DESCRIPTION as DEFAULT_DESCRIPTION, DEFAULT_TITLE, KEYWORD_THEMES, OG_IMAGE, ORG_NAME, jsonLdString, siteJsonLd } from '@/lib/seo';
import { cormorant, inter } from './fonts';
import './globals.css';
import Script from 'next/script';
import WhatsAppNudge from '@/components/WhatsAppNudge';
import NewsletterPopup from '@/components/NewsletterPopup';
import NectorWidget from '@/components/NectorWidget';

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

// Root metadata doubles as the homepage's (app/page.tsx is a client component
// and cannot export its own). Pages that set `title` override it entirely.
export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  keywords: KEYWORD_THEMES,
  applicationName: ORG_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    type: 'website',
    siteName: ORG_NAME,
    locale: 'en_IN',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: { card: 'summary_large_image', title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, images: ['/og-default.jpg'] },
  // Search Console ownership: set NEXT_PUBLIC_GSC_VERIFICATION in hPanel to the
  // content="" value Google gives for the HTML-tag method (build-time var).
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
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
    <html lang="en-IN">
      <body className={`${cormorant.variable} ${inter.variable}`}>
        {/* Brand + website entity for search engines and AI answer engines */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(siteJsonLd()) }} />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-V1STLY9M7V" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-V1STLY9M7V');
          `}
        </Script>
        {children}
        <WhatsAppNudge />
        <NewsletterPopup />
        <NectorWidget />
      </body>
    </html>
  );
}

