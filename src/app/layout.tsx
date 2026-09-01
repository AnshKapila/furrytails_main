import type { Metadata } from 'next';
import { getBaseUrl } from '@/lib/site-url';
import { cormorant, inter } from './fonts';
import './globals.css';
import WhatsAppNudge from '@/components/WhatsAppNudge';
import NewsletterPopup from '@/components/NewsletterPopup';

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

