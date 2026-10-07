// Homepage route. A server component so it can own its metadata - the page
// itself is interactive and lives in HomeClient.
//
// The canonical is set here, not in the root layout: a layout-level canonical
// is inherited by every page that doesn't set one, which would point them all
// at the homepage and drop them from the index.

import type { Metadata } from 'next';
import HomeClient from './HomeClient';
import { HOME_META_DESCRIPTION as DEFAULT_DESCRIPTION, DEFAULT_TITLE, pageOpenGraph } from '@/lib/seo';

export const metadata: Metadata = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: pageOpenGraph({ url: '/', title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION }),
};

export default function Page() {
  return <HomeClient />;
}
