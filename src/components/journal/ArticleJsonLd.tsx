import { getBaseUrl } from '@/lib/site-url';
import { PUBLISHER_NAME, articlePath, getArticle } from '@/lib/journal';
import { faqPlainText, type Faq } from './ArticleFaqs';
import { LOGO_URL } from '@/data/home';

// BlogPosting + BreadcrumbList + FAQPage for one article, emitted as a single
// @graph so search engines and AI crawlers read them as related entities.
export default function ArticleJsonLd({ slug, faqs }: { slug: string; faqs: Faq[] }) {
  const base = getBaseUrl();
  const a = getArticle(slug);
  const url = `${base}${articlePath(slug)}`;
  const publisher = {
    '@type': 'Organization',
    '@id': `${base}/#organization`,
    name: PUBLISHER_NAME,
    url: base,
    logo: { '@type': 'ImageObject', url: LOGO_URL },
  };

  const graph = [
    {
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      url,
      headline: a.title.replace(/\.$/, ''),
      description: a.description,
      image: {
        '@type': 'ImageObject',
        url: `${base}${a.image.src}`,
        width: a.image.width,
        height: a.image.height,
      },
      datePublished: a.datePublished,
      dateModified: a.dateModified,
      author: publisher,
      publisher,
      articleSection: a.category,
      keywords: a.keywords.join(', '),
      inLanguage: 'en-IN',
      isPartOf: { '@type': 'Blog', '@id': `${base}/journal#blog`, name: `${PUBLISHER_NAME} Journal` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: base },
        { '@type': 'ListItem', position: 2, name: 'Journal', item: `${base}/journal` },
        { '@type': 'ListItem', position: 3, name: a.title.replace(/\.$/, ''), item: url },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: faqPlainText(f.a) },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c'),
      }}
    />
  );
}
