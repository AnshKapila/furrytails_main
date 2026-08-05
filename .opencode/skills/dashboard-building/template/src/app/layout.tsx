import type { Metadata } from 'next';

import { brandStyle, portalConfig } from '@/lib/portal';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: `${portalConfig.brand.companyName} reports`,
    template: `%s · ${portalConfig.brand.companyName}`,
  },
  description: `Reports and dashboards for ${portalConfig.brand.companyName}.`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={brandStyle}>
      <body>{children}</body>
    </html>
  );
}
