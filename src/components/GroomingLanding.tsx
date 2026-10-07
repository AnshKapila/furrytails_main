import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientProviders from '@/components/ClientProviders';
import RelatedArticles from '@/components/journal/RelatedArticles';
import { getAllProducts } from '@/services/api';
import { getBaseUrl } from '@/lib/site-url';
import { getArticle } from '@/lib/journal';
import { breadcrumbJsonLd, jsonLdString, websiteId } from '@/lib/seo';
import type { LandingContent } from '@/data/landing';

// Server-rendered species landing page (/dog-grooming, /cat-grooming): keyword
// H1, the products suitable for that pet, a routine that links every product,
// a short FAQ and related journal reading. Copy lives in data/landing.ts.

export default async function GroomingLanding({ content }: { content: LandingContent }) {
  const all = await getAllProducts();
  const products = all.filter((p) => p.species === 'both' || p.species === content.species);
  const base = getBaseUrl();
  const url = `${base}${content.path}`;
  const label = content.species === 'dog' ? 'Dog grooming' : 'Cat grooming';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#page`,
        url,
        name: content.seoTitle,
        description: content.description,
        isPartOf: { '@id': websiteId() },
        inLanguage: 'en-IN',
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: products.length,
          itemListElement: products.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${base}/products/${p.id}`,
            name: p.name,
          })),
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: content.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
      breadcrumbJsonLd([
        ['Home', '/'],
        ['Shop', '/shop'],
        [label, content.path],
      ]),
    ],
  };

  return (
    <ClientProviders>
      <div className="min-h-screen bg-[#F8F5F1]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
        <Navbar />
        <main className="pt-28 md:pt-36">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="max-w-[1200px] mx-auto px-6 md:px-8 mb-8 flex items-center gap-2 text-[0.625rem] tracking-[0.18em] uppercase">
            <Link href="/" className="text-[#8D9A83] hover:text-[#3B3A38]">Home</Link>
            <span className="text-[#BEB8AF]" aria-hidden="true">/</span>
            <Link href="/shop" className="text-[#8D9A83] hover:text-[#3B3A38]">Shop</Link>
            <span className="text-[#BEB8AF]" aria-hidden="true">/</span>
            <span className="text-[#3B3A38]">{label}</span>
          </nav>

          {/* Intro */}
          <section className="max-w-[1200px] mx-auto px-6 md:px-8 mb-14 md:mb-20">
            <h1 className="mb-6 max-w-3xl">
              <span className="block text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#8D9A83] mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
                {content.eyebrow}
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl font-display font-light text-[#3B3A38] leading-[1.1]">
                {content.heading}
              </span>
            </h1>
            <div className="max-w-2xl space-y-4">
              {content.intro.map((para) => (
                <p key={para.slice(0, 24)} className="text-[1rem] md:text-[1.0625rem] font-light text-[#3B3A38]/80 leading-[1.7]">
                  {para}
                </p>
              ))}
            </div>
          </section>

          {/* Products */}
          <section className="bg-[#EDE7DF] py-14 md:py-20" aria-labelledby="landing-products">
            <div className="max-w-[1200px] mx-auto px-6 md:px-8">
              <h2 id="landing-products" className="mb-8 md:mb-10">
                {content.species === 'dog' ? 'Shop natural dog grooming' : 'Shop natural cat grooming'}
              </h2>
              <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {products.map((p) => (
                  <li key={p.id}>
                    <Link href={`/products/${p.id}`} className="group block">
                      <div className="relative aspect-square bg-[#F0EBE4] overflow-hidden">
                        <Image
                          src={p.image.src}
                          alt={p.image.alt || p.name}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </div>
                      <p className="mt-3 text-[0.9375rem] text-[#3B3A38] leading-snug">{p.name}</p>
                      <p className="mt-1 text-[0.8125rem] text-[#3B3A38]/60">
                        {p.price}
                        {p.volume ? ` · ${p.volume}` : ''}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Routine - links every product with what it is for */}
          <section className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-20" aria-labelledby="landing-routine">
            <h2 id="landing-routine" className="mb-8 md:mb-10">{content.routineHeading}</h2>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {content.routine.map((step, i) => (
                <li key={step.title} className="border-t border-[#D8CFC4] pt-5">
                  <p className="text-[0.625rem] tracking-[0.2em] uppercase text-[#8D9A83] mb-2">
                    {String(i + 1).padStart(2, '0')} · {step.when}
                  </p>
                  <h3 className="text-[1.375rem] font-display font-light text-[#3B3A38] mb-2">{step.title}</h3>
                  <p className="text-[0.9375rem] font-light text-[#3B3A38]/75 leading-relaxed mb-3">{step.body}</p>
                  <Link href={step.product.href} className="text-[0.8125rem] text-[#68735F] underline underline-offset-4 decoration-[#8D9A83]/40 hover:text-[#3B3A38]">
                    {step.product.name} →
                  </Link>
                </li>
              ))}
            </ol>
          </section>

          {/* FAQ */}
          <section className="max-w-[1200px] mx-auto px-6 md:px-8 pb-14 md:pb-20" aria-labelledby="landing-faq">
            <h2 id="landing-faq" className="mb-8">Questions pet parents ask</h2>
            <div className="max-w-3xl divide-y divide-[#E5E0D8] border-y border-[#E5E0D8]">
              {content.faqs.map((f) => (
                <details key={f.question} className="group py-5" open>
                  <summary className="cursor-pointer list-none text-[1.125rem] md:text-[1.25rem] font-display text-[#3B3A38]">
                    {f.question}
                  </summary>
                  <p className="mt-3 text-[0.9375rem] font-light text-[#3B3A38]/75 leading-relaxed">{f.answer}</p>
                  {f.links && (
                    <p className="mt-3 text-[0.8125rem]">
                      {f.links.map((l) => (
                        <Link key={l.href} href={l.href} className="mr-5 text-[#68735F] underline underline-offset-4 decoration-[#8D9A83]/40 hover:text-[#3B3A38]">
                          {l.label}
                        </Link>
                      ))}
                    </p>
                  )}
                </details>
              ))}
            </div>
            <p className="mt-8 text-[0.875rem] text-[#3B3A38]/70">
              More answers in the <Link href="/faq" className="underline underline-offset-4 text-[#68735F] hover:text-[#3B3A38]">full FAQ</Link>
              {' · '}
              <Link href={content.crossLink.href} className="underline underline-offset-4 text-[#68735F] hover:text-[#3B3A38]">{content.crossLink.label}</Link>
            </p>
          </section>

          <div className="pb-24">
            <RelatedArticles
              articles={content.journalSlugs.map((s) => getArticle(s))}
              eyebrow="From the journal"
              heading="Read before you groom."
            />
          </div>
        </main>
        <Footer />
      </div>
    </ClientProviders>
  );
}
