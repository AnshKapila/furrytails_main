import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientProviders from '@/components/ClientProviders';
import ArticleFaqs, { type Faq } from '@/components/journal/ArticleFaqs';
import ArticleJsonLd from '@/components/journal/ArticleJsonLd';
import RelatedArticles from '@/components/journal/RelatedArticles';
import ArticleAuthors from '@/components/journal/ArticleAuthors';
import { articleMetadata, formatArticleDate, getArticle, getRelatedArticles, ARTICLE_BYLINE } from '@/lib/journal';
import type { Metadata } from 'next';

const SLUG = 'golden-retriever-grooming-at-home';
const ARTICLE = getArticle(SLUG);

export const metadata: Metadata = articleMetadata(SLUG);

const FAQS: Faq[] = [
  {
    q: "How often should I brush my Golden Retriever?",
    a: "Two or three times a week for most of the year, and daily during heavy shedding. Use an undercoat rake or slicker brush, then a wide-toothed comb through the feathering.",
  },
  {
    q: "Should I shave my Golden Retriever in summer?",
    a: "Shaving a double-coated breed is generally not recommended - the coat helps regulate temperature and protects the skin. Brush out loose undercoat, keep your dog in shade and ask a groomer for a tidy trim instead.",
  },
  {
    q: "What is the best shampoo for a Golden Retriever?",
    a: "A dog shampoo that is mild, sulphate-free, pH-balanced for pets and conditioning enough for a long, feathered coat. Avoid human shampoo.",
  },
  {
    q: "How often should I bathe a Golden Retriever?",
    a: "When the coat genuinely needs it, rather than on a fixed schedule. Always dry the coat right down to the skin afterwards.",
  },
  {
    q: "Why does my Golden Retriever shed so much?",
    a: "Goldens have a double coat and shed year-round, with heavier seasonal sheds. Even shedding from a healthy coat is normal; bald patches, sores or itching need a vet.",
  },
  {
    q: "How do I dry a Golden Retriever after a bath?",
    a: "Press water out with absorbent towels, then use a cool or low pet dryer while brushing until the coat is dry to the skin - especially the undercoat, ears and feathering.",
  },
  {
    q: "How do I clean my Golden Retriever's ears?",
    a: "Check them weekly and wipe the visible outer ear with a soft, dry cloth, especially after baths and swims. Don't put cotton buds into the ear canal, and see your vet for a smell, redness or head-shaking.",
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
              Golden Retriever Grooming at Home: Coat, Ears and Bath
            </h1>
            <p className="text-[1.125rem] md:text-[1.25rem] font-light text-[#3B3A38]/80 leading-[1.6]">
              That golden coat is built for weather. Your job is to keep it working.
            </p>
          </header>

          {/* Hero Image */}
          <div className="max-w-[1000px] mx-auto px-6 md:px-8 mb-16 md:mb-24">
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-[#E9E2D7] overflow-hidden rounded-[2px]">
              <Image
                src={ARTICLE.image.src}
                alt={ARTICLE.image.alt}
                fill
                className="object-cover object-[center_55%]"
                priority
                sizes="(max-width: 1000px) 100vw, 1000px"
              />
            </div>
          </div>

          {/* Article Content */}
          <article className="max-w-[700px] mx-auto px-6 md:px-8 font-light text-[#3B3A38] leading-[1.8] text-[1.0625rem] space-y-8">
            <p className="text-[1.25rem] leading-[1.6]">
              The Golden Retriever is one of India&rsquo;s most-loved family dogs &ndash; and one of the fluffiest. Underneath that easy-going nature is a coat that sheds steadily, mats in a few predictable places and holds water like a sponge.
            </p>

            <p>
              None of it is difficult. It just rewards a routine.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Understanding the Golden coat</h2>



            <p>
              Goldens have a <strong>double coat</strong>: a dense, soft undercoat for insulation and a longer, water-resistant outer coat on top, with feathering on the chest, legs, belly and tail.
            </p>

            <p>
              That design matters in India. The undercoat traps air, which helps insulate the dog from heat as well as cold &ndash; as long as the loose undercoat is brushed out so air can move through it. A matted, neglected coat traps heat and moisture instead.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Brushing: the heart of the routine</h2>


            <div className="my-16">
              <Image
                src="/images/journal/golden-retriever/img1.webp"
                alt="Brushing a golden retriever’s thick coat with an undercoat rake, loose fluffy undercoat on the floor"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <ul className="space-y-3 pl-5 list-disc">
              <li><strong>Two or three times a week</strong> most of the year; <strong>daily during heavy shedding</strong>.</li>
              <li>Use an <strong>undercoat rake or slicker brush</strong> to lift loose undercoat, then a <strong>wide-toothed comb</strong> through the feathering.</li>
              <li>Pay attention to the <strong>mat hotspots</strong>: behind the ears, the &ldquo;trousers&rdquo; on the back legs, under the collar and the armpits.</li>
              <li>Brush <strong>before</strong> a bath, never after &ndash; water tightens tangles.</li>
            </ul>

            <p>
              Goldens shed all year, with heavier &ldquo;coat blows&rdquo; a couple of times a year. A sudden heavy shed with a healthy coat and skin is normal; patchy hair loss, sores or itching is not &ndash; see <Link href="/journal/dog-hair-fall-vs-shedding" className={LINK}>hair fall vs normal shedding</Link>.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Should you shave a Golden Retriever in summer?</h2>



            <p>
              It&rsquo;s tempting when the city hits 40°C, but shaving a double-coated breed is generally not recommended. The coat helps regulate temperature and protects the skin from sun, and a shaved double coat may grow back unevenly.
            </p>

            <p>
              A better summer approach: brush out the loose undercoat regularly, keep the dog in shade and out of midday heat, and ask a groomer for a <strong>tidy trim</strong> of the feet, ears and feathering rather than a shave. More in <Link href="/journal/summer-dog-care-india" className={LINK}>summer dog care in India</Link>.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Ears</h2>


            <div className="my-16">
              <Image
                src="/images/journal/golden-retriever/img2.webp"
                alt="Hands gently lifting a golden retriever’s floppy ear to check inside"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <p>
              Golden ears are soft, heavy and floppy, which means less airflow and more moisture &ndash; especially after swimming, baths and monsoon walks.
            </p>

            <ul className="space-y-3 pl-5 list-disc">
              <li><strong>Check weekly</strong> for redness, smell or debris.</li>
              <li><strong>Wipe the visible outer ear</strong> with a soft, dry cloth after every bath or swim.</li>
              <li>Don&rsquo;t push cotton buds into the ear canal.</li>
              <li>Head-shaking, scratching or a persistent smell is a reason to see your vet.</li>
            </ul>

            <h2 className="text-3xl font-display mt-16 mb-6">Paws</h2>



            <p>
              The fur between a Golden&rsquo;s toes grows long and collects mud, grass seeds and grit. Keep it neatly trimmed, check between the pads, and clean the paws after every walk with a no-rinse <Link href="/products/paw-cleaner" className={LINK}>Paw Cleaner</Link>. (<Link href="/journal/paw-cleaner-for-dogs-post-walk-paw-care" className={LINK}>More on paws</Link>.)
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Bathing a Golden Retriever</h2>


            <div className="my-16">
              <Image
                src="/images/journal/golden-retriever/img3.webp"
                alt="A golden retriever being towel-dried after a bath with a pet dryer nearby"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <p>
              Follow <Link href="/journal/how-to-bathe-a-dog-at-home" className={LINK}>the full bath ritual</Link>, with the Golden-specific emphasis on two steps:
            </p>

            <ol className="space-y-4 mt-6 list-decimal pl-5">
              <li><strong>Wet right down to the skin.</strong> The outer coat repels water; it can take several minutes to saturate a Golden properly.</li>
              <li><strong>Dry right down to the skin.</strong> This is where Golden coats go wrong. Press out water with towels, then use a cool or low pet dryer while brushing. A Golden that&rsquo;s left damp under the coat is the classic cause of a <Link href="/journal/why-your-dog-still-smells-after-a-bath" className={LINK}>musty smell after a bath</Link>.</li>
            </ol>

            <p>
              Bathe when the coat genuinely needs it &ndash; <Link href="/journal/how-often-should-you-bathe-your-dog" className={LINK}>not on a fixed calendar</Link>. Between baths, a <Link href="/journal/dry-bath-vs-wet-bath-for-dogs" className={LINK}>dry bath</Link> keeps the coat fresh without the long drying session.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">What&rsquo;s the best shampoo for a Golden Retriever?</h2>



            <p>
              Look for a shampoo that&rsquo;s made for dogs, mild and sulphate-free so it doesn&rsquo;t strip the coat&rsquo;s natural oils, pH-balanced for pets, and conditioning enough to help the feathering stay soft and tangle-free.
            </p>

            <p>
              Furrytail&rsquo;s <Link href="/products/gentle-daily-shampoo-santal-white-tea" className={LINK}>Gentle Daily Shampoo</Link> is a sensitive-skin, pH-balanced formulation cleansed with amino acid-derived surfactants, with a guar conditioner, camellia oil and vitamin E &ndash; so a long coat dries softer without a separate conditioner.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Ticks love Goldens</h2>



            <p>
              That dense coat is easy for ticks to hide in, especially around the ears, neck and between the toes. Run your hands through the coat after walks in grass, and use a plant-based <Link href="/products/anti-tick-flea-spray" className={LINK}>tick and flea spray</Link> before walks in tick-active areas. See <Link href="/journal/ticks-fleas-and-the-indian-dog" className={LINK}>ticks, fleas and the Indian dog</Link>.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">A simple Golden Retriever routine</h2>



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
                    <td className="py-3 pr-4 align-top">Clean and dry the paws; quick tick check</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">2&ndash;3 times a week (daily when shedding)</td>
                    <td className="py-3 pr-4 align-top">Undercoat rake, then comb through the feathering</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">Weekly</td>
                    <td className="py-3 pr-4 align-top">Check and wipe the outer ears; check mat hotspots</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">Between baths</td>
                    <td className="py-3 pr-4 align-top">Dry foam for a stale or oily coat</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">When the coat needs it</td>
                    <td className="py-3 pr-4 align-top">Full bath, rinse thoroughly, dry to the skin</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">Every 6&ndash;8 weeks</td>
                    <td className="py-3 pr-4 align-top">Tidy trim of feet, ears and feathering</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-display mt-16 mb-6">When to see a vet</h2>



            <p>
              Persistent itching, red or moist patches of skin, hair loss in patches, ear scratching or head-shaking, or a smell that keeps coming back all need a vet rather than more grooming.
            </p>

          </article>

          <ArticleFaqs faqs={FAQS} />

          <ArticleAuthors />

          <RelatedArticles articles={getRelatedArticles(SLUG)} />
        </main>
        <Footer />
      </div>
    </ClientProviders>
  );
}
