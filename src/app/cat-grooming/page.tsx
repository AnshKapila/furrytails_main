import type { Metadata } from 'next';
import GroomingLanding from '@/components/GroomingLanding';
import { CAT_LANDING as CONTENT } from '@/data/landing';
import { pageOpenGraph } from '@/lib/seo';

export const revalidate = 300;

export const metadata: Metadata = {
  title: CONTENT.seoTitle,
  description: CONTENT.description,
  alternates: { canonical: CONTENT.path },
  openGraph: pageOpenGraph({ url: CONTENT.path, title: CONTENT.seoTitle, description: CONTENT.description }),
};

export default function Page() {
  return <GroomingLanding content={CONTENT} />;
}
