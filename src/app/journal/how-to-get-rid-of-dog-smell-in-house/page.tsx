import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientProviders from '@/components/ClientProviders';
import ArticleFaqs, { type Faq } from '@/components/journal/ArticleFaqs';
import ArticleJsonLd from '@/components/journal/ArticleJsonLd';
import RelatedArticles from '@/components/journal/RelatedArticles';
import { articleMetadata, formatArticleDate, getArticle, getRelatedArticles, ARTICLE_BYLINE } from '@/lib/journal';
import type { Metadata } from 'next';

const SLUG = 'how-to-get-rid-of-dog-smell-in-house';
const ARTICLE = getArticle(SLUG);

export const metadata: Metadata = articleMetadata(SLUG);

const FAQS: Faq[] = [
  {
    q: "How do I get rid of dog smell in my house?",
    a: "Find and clean the source: wash dog bedding, blankets and towels weekly and dry them fully, vacuum sofas and rugs often, clean accidents with an enzyme cleaner, air the house daily, and keep your dog clean and dry.",
  },
  {
    q: "Why does my house smell like dog?",
    a: "Usually because of bedding, sofas and rugs that hold skin oils and hair, damp from wet coats or humidity, collars and harnesses, or a dog whose coat isn't drying fully after baths and walks.",
  },
  {
    q: "How do I get dog smell out of my sofa?",
    a: "Vacuum it regularly, sprinkle baking soda on fabric, leave it for a while and vacuum again, and cover your dog's favourite spot with a washable throw you wash with the bedding.",
  },
  {
    q: "How often should I wash my dog's bed?",
    a: "Weekly is a good rule, and more often in monsoon or if your dog has been wet or muddy. Dry it completely - ideally in sunlight - before using it again.",
  },
  {
    q: "Does a dog perfume spray get rid of dog smell?",
    a: "A coat mist adds fragrance to a clean dog; it doesn't remove the cause of a smell. Clean the source first, then freshen.",
  },
  {
    q: "Why does my house smell worse in monsoon?",
    a: "Humidity keeps coats, towels and bedding damp for longer, and damp is what turns everyday dog smell musty. Dry your dog thoroughly after wet walks, dry bedding fully and air the house daily.",
  },
  {
    q: "When is dog smell a health problem?",
    a: "When the smell is strong, sudden, or comes from your dog's ears, mouth, skin or rear, or comes with itching, redness or discharge. See your vet.",
  },
];

const LINK = 'underline decoration-[#8D9A83] underline-offset-4';

export default function ArticlePage() {
  return (
    <ClientProviders>
      <div className="min-h-screen bg-[#F8F5F1] text-[#3B3A38] selection:bg-[#8D9A83]/20">
        <Navbar />
        <ArticleJsonLd slug={SLUG} faqs={FAQS} />

        <main className="pt-32 pb-24 md:pt-40 md:pb-32">
          {/* Header */}
          <header className="max-w-[800px] mx-auto px-6 md:px-8 mb-16 md:mb-20">
            <div className="flex flex-wrap items-center gap-2 text-[0.6875rem] font-normal tracking-[0.06em] text-[#8D9A83] uppercase mb-6">
              <Link href="/journal" className="hover:text-[#3B3A38] transition-colors">Journal</Link>
              <span className="w-1 h-1 rounded-full bg-[#E9E2D7]" />
              <span>{ARTICLE.category}</span>
              <span className="w-1 h-1 rounded-full bg-[#E9E2D7]" />
              <span>{ARTICLE.readTime}</span>
              <span className="w-1 h-1 rounded-full bg-[#E9E2D7]" />
              <time dateTime={ARTICLE.datePublished}>{formatArticleDate(ARTICLE.datePublished)}</time>
              <span className="w-1 h-1 rounded-full bg-[#E9E2D7]" />
              <span>{ARTICLE_BYLINE}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#3B3A38] leading-[1.1] mb-8 font-display">
              How to Get Rid of Dog Smell in the House
            </h1>
            <p className="text-[1.125rem] md:text-[1.25rem] font-light text-[#3B3A38]/80 leading-[1.6]">
              A home that smells of dog isn&rsquo;t a dirty home. It&rsquo;s a home with a source you haven&rsquo;t found yet.
            </p>
          </header>

          {/* Hero Image */}
          <div className="max-w-[1000px] mx-auto px-6 md:px-8 mb-16 md:mb-24">
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-[#E9E2D7] overflow-hidden rounded-[2px]">
              <Image
                src={ARTICLE.image.src}
                alt={ARTICLE.image.alt}
                fill
                className="object-cover object-[center_70%]"
                priority
                sizes="(max-width: 1000px) 100vw, 1000px"
              />
            </div>
          </div>

          {/* Article Content */}
          <article className="max-w-[700px] mx-auto px-6 md:px-8 font-light text-[#3B3A38] leading-[1.8] text-[1.0625rem] space-y-8">
            <p className="text-[1.25rem] leading-[1.6]">
              You stop noticing it after a while. Then a guest walks in, or you come home after a weekend away, and there it is: the unmistakable smell of dog.
            </p>

            <p>
              Room sprays and incense cover it for an hour. The lasting fix is the same as for a dog that <Link href="/journal/why-your-dog-still-smells-after-a-bath" className={LINK}>still smells after a bath</Link>: <strong>find the source, then deal with it.</strong>
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Where dog smell in the house comes from</h2>



            <p>
              Smell builds up wherever your dog spends time &ndash; and wherever moisture, skin oils and hair collect:
            </p>

            <ul className="space-y-3 pl-5 list-disc">
              <li><strong>Dog beds, blankets and towels</strong> &ndash; the biggest source in most homes.</li>
              <li><strong>Sofas, cushions and rugs</strong> your dog lies on.</li>
              <li><strong>Collars and harnesses</strong> &ndash; worn against the skin, rarely washed.</li>
              <li><strong>Damp</strong> &ndash; a wet coat after a monsoon walk, damp towels, a humid room that never airs.</li>
              <li><strong>Accidents</strong> &ndash; urine that wasn&rsquo;t fully cleaned soaks into floors, grout and rugs.</li>
              <li><strong>The dog itself</strong> &ndash; a damp coat, ears, skin, teeth or paws.</li>
            </ul>

            <h2 className="text-3xl font-display mt-16 mb-6">Start with the dog</h2>



            <p>
              If your dog smells, so will everything they lie on.
            </p>

            <ul className="space-y-3 pl-5 list-disc">
              <li><strong>Bathe when the coat genuinely needs it</strong> &ndash; and <Link href="/journal/how-to-bathe-a-dog-at-home" className={LINK}>dry it right down to the skin</Link>. A damp coat is the most common cause of a musty dog smell.</li>
              <li><strong>Clean the paws after every walk</strong> with a no-rinse <Link href="/products/paw-cleaner" className={LINK}>Paw Cleaner</Link>, so street dust and mud don&rsquo;t come in with them.</li>
              <li><strong>Between baths</strong>, a waterless <Link href="/products/dry-foam-shampoo" className={LINK}>Dry Foam Shampoo</Link> absorbs surface oils and neutralises odour on a coat that&rsquo;s otherwise clean.</li>
              <li><strong>Check ears, teeth and skin.</strong> A smell that comes from one place, or comes back quickly, needs a vet rather than more cleaning.</li>
            </ul>

            <h2 className="text-3xl font-display mt-16 mb-6">Wash the bedding &ndash; properly</h2>


            <div className="my-16">
              <Image
                src="/images/journal/house-smell/img1.webp"
                alt="Loading a cream dog blanket into a washing machine while the dog watches"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <ul className="space-y-3 pl-5 list-disc">
              <li>Wash <strong>dog beds, covers, blankets and towels weekly</strong>, more often in monsoon.</li>
              <li><strong>Dry them completely</strong>, ideally in sunlight &ndash; damp bedding smells worse than dirty bedding.</li>
              <li>Have <strong>two sets</strong> so the bed is never used half-dry.</li>
              <li>Wash <strong>collars and harnesses</strong> as their material allows, and let them dry fully before putting them back on.</li>
            </ul>

            <h2 className="text-3xl font-display mt-16 mb-6">Sofas, rugs and floors</h2>


            <div className="my-16">
              <Image
                src="/images/journal/house-smell/img2.webp"
                alt="Vacuuming a light rug while a dog sits calmly on the sofa"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <ul className="space-y-3 pl-5 list-disc">
              <li><strong>Vacuum often</strong> &ndash; hair holds skin oils, and skin oils hold smell. Get under cushions and along edges.</li>
              <li><strong>Sprinkle baking soda</strong> on rugs and fabric sofas, leave it for a while, then vacuum it up.</li>
              <li>Use <strong>washable throws</strong> on your dog&rsquo;s favourite spots and wash them with the bedding.</li>
              <li><strong>Mop hard floors</strong> with a pet-safe floor cleaner, especially near beds and entrances.</li>
            </ul>

            <h2 className="text-3xl font-display mt-16 mb-6">Accidents: clean them thoroughly</h2>



            <p>
              If urine isn&rsquo;t fully broken down, the smell lingers and dogs tend to return to the same spot. Blot up as much as you can, then use an <strong>enzyme-based pet stain cleaner</strong> made for urine, following its directions. Avoid ammonia-based cleaners, which can smell like urine to a dog.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Fix the damp</h2>


            <div className="my-16">
              <Image
                src="/images/journal/house-smell/img3.webp"
                alt="A dog bed and folded blanket drying in sunlight on a balcony"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <p>
              Humidity is the multiplier. In monsoon and in humid coastal cities:
            </p>

            <ul className="space-y-3 pl-5 list-disc">
              <li><strong>Air the house daily</strong> &ndash; open windows when you can, and run fans.</li>
              <li><strong>Dry towels and wet gear outside the bedroom</strong>, not over the dog bed.</li>
              <li><strong>Dry your dog thoroughly</strong> after every wet walk before they settle anywhere. More in <Link href="/journal/the-monsoon-ritual" className={LINK}>the monsoon ritual</Link>.</li>
            </ul>

            <h2 className="text-3xl font-display mt-16 mb-6">Freshen &ndash; after you clean</h2>



            <p>
              Fragrance works best on top of clean, not instead of it. Once the source is dealt with, a light <Link href="/products/refreshing-mist" className={LINK}>Refreshing Mist</Link> on a clean coat adds a fresh note &ndash; yuzu and ambrette seed musk that dries into the coat in seconds.
            </p>

            <p>
              Avoid heavy air fresheners near your dog&rsquo;s bed &ndash; dogs live nose-first, and strong scents can be overwhelming.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">A weekly fresh-home routine</h2>



            <div className="overflow-x-auto my-10">
              <table className="w-full text-left text-[0.9375rem] border-collapse">
                <thead>
                  <tr className="border-b border-[#3B3A38]/20">
                    <th className="py-3 pr-4 font-medium">How often</th>
                    <th className="py-3 pr-4 font-medium">What</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">After every walk</td>
                    <td className="py-3 pr-4 align-top">Clean and dry the paws</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">Daily</td>
                    <td className="py-3 pr-4 align-top">Air the house; vacuum the dog&rsquo;s favourite spots</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">Weekly</td>
                    <td className="py-3 pr-4 align-top">Wash bedding, blankets, throws and towels; dry fully</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">Every couple of weeks</td>
                    <td className="py-3 pr-4 align-top">Wash collars and harnesses; baking soda on rugs</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">When the coat needs it</td>
                    <td className="py-3 pr-4 align-top">Bath, rinse well, dry to the skin</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">Between baths</td>
                    <td className="py-3 pr-4 align-top">Dry foam for a stale coat; light mist on a clean coat</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-display mt-16 mb-6">When the smell is your dog&rsquo;s health</h2>



            <p>
              If the smell is strong, sudden, or comes from your dog&rsquo;s ears, mouth, skin or rear &ndash; or comes with itching, redness or discharge &ndash; see your vet. No amount of cleaning fixes a smell with a medical cause.
            </p>

          </article>

          <ArticleFaqs faqs={FAQS} />

          <RelatedArticles articles={getRelatedArticles(SLUG)} />
        </main>
        <Footer />
      </div>
    </ClientProviders>
  );
}
