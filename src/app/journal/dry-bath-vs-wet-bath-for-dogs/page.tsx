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

const SLUG = 'dry-bath-vs-wet-bath-for-dogs';
const ARTICLE = getArticle(SLUG);

export const metadata: Metadata = articleMetadata(SLUG);

const FAQS: Faq[] = [
  {
    q: "What is a dry bath for dogs?",
    a: "A dry bath uses a waterless, no-rinse shampoo - usually a foam or spray - to absorb surface oils and freshen the coat without water, a tub or towelling.",
  },
  {
    q: "Is a dry bath as good as a wet bath?",
    a: "They do different jobs. A wet bath properly cleans a dirty coat and skin; a dry bath refreshes a coat that's clean but oily or stale. A dry bath doesn't replace a wet bath when the coat is genuinely dirty.",
  },
  {
    q: "How often can I use dry shampoo on my dog?",
    a: "Use it between bath days as needed. If you're using it every day to cover a smell, look for the source of the smell instead.",
  },
  {
    q: "How do I clean my dog without bathing?",
    a: "Clean only what needs it: paws after walks with a no-rinse paw cleaner, a dry foam shampoo for an oily or stale coat, thorough towel-drying after rain, and regular brushing.",
  },
  {
    q: "Can I use dry shampoo on my cat?",
    a: "Only if it's made for cats. Furrytail's Dry Foam Shampoo is formulated for dogs and cats and is leave-on safe, which suits cats who hate water.",
  },
  {
    q: "Is dry shampoo good during monsoon?",
    a: "Yes - between baths it freshens the coat without soaking it, which matters when a wet coat takes hours to dry. Whenever you do bathe, dry the coat thoroughly.",
  },
  {
    q: "Does dry shampoo get rid of dog smell?",
    a: "A dry foam neutralises surface odour on a coat that's otherwise clean. It won't fix a smell coming from the ears, skin or bedding - those need their source found.",
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
              Dry Bath vs. Wet Bath: When Does Your Dog Actually Need Either?
            </h1>
            <p className="text-[1.125rem] md:text-[1.25rem] font-light text-[#3B3A38]/80 leading-[1.6]">
              A waterless bath isn&rsquo;t a shortcut. It&rsquo;s a different tool for a different problem.
            </p>
          </header>

          {/* Hero Image */}
          <div className="max-w-[1000px] mx-auto px-6 md:px-8 mb-16 md:mb-24">
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-[#E9E2D7] overflow-hidden rounded-[2px]">
              <Image
                src={ARTICLE.image.src}
                alt={ARTICLE.image.alt}
                fill
                className="object-cover object-[center_80%]"
                priority
                sizes="(max-width: 1000px) 100vw, 1000px"
              />
            </div>
          </div>

          {/* Article Content */}
          <article className="max-w-[700px] mx-auto px-6 md:px-8 font-light text-[#3B3A38] leading-[1.8] text-[1.0625rem] space-y-8">
            <p className="text-[1.25rem] leading-[1.6]">
              &ldquo;Dry bath&rdquo; sounds like a compromise &ndash; the thing you do when a real bath isn&rsquo;t possible. It&rsquo;s more useful to think of it as a separate tool. A wet bath and a dry bath solve different problems, and a good grooming routine uses each for what it&rsquo;s actually good at.
            </p>

            <p>
              So the better question isn&rsquo;t <em>which is better?</em> It&rsquo;s: <strong>what does your dog&rsquo;s coat need today?</strong>
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">What a wet bath does</h2>


            <div className="my-16">
              <Image
                src="/images/journal/dry-vs-wet/img1.webp"
                alt="A golden retriever standing in a white bathtub being rinsed with a handheld shower"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <p>
              A full bath with water and shampoo is the only thing that properly cleans a genuinely dirty coat. It lifts mud, dust and built-up oil from the hair <em>and</em> the skin, and rinses it all away.
            </p>

            <p>
              That&rsquo;s why a wet bath is the right call when:
            </p>

            <ul className="space-y-3 pl-5 list-disc">
              <li>the coat is <strong>visibly dirty</strong> &ndash; mud, dust, something your dog rolled in;</li>
              <li>the coat feels <strong>greasy right down to the skin</strong>;</li>
              <li>your dog has been <strong>swimming or caught in heavy rain</strong> on dirty streets;</li>
              <li>your vet has recommended a specific bathing routine.</li>
            </ul>

            <p>
              The trade-off is that a wet bath takes time, water and &ndash; most importantly &ndash; drying. A coat that&rsquo;s left damp can smell worse than before (<Link href="/journal/why-your-dog-still-smells-after-a-bath" className={LINK}>here&rsquo;s why</Link>).
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">What a dry bath does</h2>



            <p>
              A dry bath &ndash; a waterless or no-rinse shampoo &ndash; works on the surface of the coat. It absorbs excess oil, freshens a stale smell and leaves the coat feeling clean, without a tub, running water or a long drying session.
            </p>

            <p>
              That makes it the right call when:
            </p>

            <ul className="space-y-3 pl-5 list-disc">
              <li>the coat is <strong>clean but a little oily or stale</strong> between bath days;</li>
              <li>a full bath <strong>isn&rsquo;t practical</strong> &ndash; <Link href="/journal/travelling-with-your-pet-waterless-essentials" className={LINK}>travel</Link>, a busy week, a cold evening;</li>
              <li>it&rsquo;s <strong>monsoon</strong> and a wet coat would take hours to dry;</li>
              <li>your pet <strong>hates water</strong> &ndash; common with cats;</li>
              <li>you only need to <strong>spot-clean</strong> one area.</li>
            </ul>

            <h2 className="text-3xl font-display mt-16 mb-6">What a dry bath can&rsquo;t do</h2>



            <p>
              This is where honesty matters. A dry bath doesn&rsquo;t:
            </p>

            <ul className="space-y-3 pl-5 list-disc">
              <li>remove heavy mud or a genuinely dirty coat;</li>
              <li>replace a proper bath forever;</li>
              <li>treat itching, flaking or a skin problem;</li>
              <li>fix a smell that&rsquo;s coming from the ears, skin or bedding.</li>
            </ul>

            <p>
              If you find yourself reaching for dry shampoo every day to cover a smell, that&rsquo;s a sign to <Link href="/journal/why-your-dog-still-smells-after-a-bath" className={LINK}>find the source</Link> &ndash; not to spray more.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Dry bath vs. wet bath at a glance</h2>



            <div className="overflow-x-auto my-10">
              <table className="w-full text-left text-[0.9375rem] border-collapse">
                <thead>
                  <tr className="border-b border-[#3B3A38]/20">
                    <th className="py-3 pr-4 font-medium">Situation</th>
                    <th className="py-3 pr-4 font-medium">Better choice</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">Muddy after a walk</td>
                    <td className="py-3 pr-4 align-top">Wet bath (or <Link href="/products/paw-cleaner" className={LINK}>paws only</Link>, if only the paws are muddy)</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">Coat oily or a bit stale, otherwise clean</td>
                    <td className="py-3 pr-4 align-top">Dry bath</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">Monsoon week, coat won&rsquo;t dry</td>
                    <td className="py-3 pr-4 align-top">Dry bath between baths; dry thoroughly after any wet bath</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">Travelling or no time</td>
                    <td className="py-3 pr-4 align-top">Dry bath</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">Cat that hates water</td>
                    <td className="py-3 pr-4 align-top">Dry bath made for cats</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">Rolled in something</td>
                    <td className="py-3 pr-4 align-top">Wet bath</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">Itching, redness or a persistent smell</td>
                    <td className="py-3 pr-4 align-top">Neither &ndash; see your vet</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-display mt-16 mb-6">How to give your dog a dry bath</h2>


            <div className="my-16">
              <Image
                src="/our-range-dry-foam-shampoo.webp"
                alt="Furrytail Remedy Dry Foam Shampoo in Hinoki & Bamboo with a golden retriever and a cat"
                width={1000}
                height={1000}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <p>
              Furrytail&rsquo;s <Link href="/products/dry-foam-shampoo" className={LINK}>Dry Foam Shampoo</Link> is a no-rinse, leave-on safe foam for dogs and cats, made for the days between baths:
            </p>

            <ol className="space-y-4 mt-6 list-decimal pl-5">
              <li><strong>Shake well.</strong></li>
              <li><strong>Hold it 15 cm from the coat</strong> and apply 4&ndash;6 sprays from neck to tail.</li>
              <li><strong>Massage it through</strong> gently with your hands or a soft brush.</li>
              <li><strong>Allow 60&ndash;90 seconds to dry.</strong> No rinsing, no towelling.</li>
            </ol>

            <p>
              It absorbs surface oils, neutralises odour and leaves a light conditioning finish &ndash; with hinoki cypress and fresh bamboo, the scent of a Japanese bathhouse.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">How to keep your dog clean between baths</h2>


            <div className="my-16">
              <Image
                src="/images/journal/dry-vs-wet/img3.webp"
                alt="A dog back from a walk sitting on the doormat of an apartment entryway with towels by the door"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <p>
              Most &ldquo;my dog needs a bath&rdquo; moments are really one part of the dog that needs attention. Match the clean-up to the mess:
            </p>

            <ul className="space-y-3 pl-5 list-disc">
              <li><strong>Paws after every walk</strong> &ndash; a no-rinse <Link href="/products/paw-cleaner" className={LINK}>Paw Cleaner</Link> at the door. (<Link href="/journal/paw-cleaner-for-dogs-post-walk-paw-care" className={LINK}>More on the paw problem</Link>.)</li>
              <li><strong>Coat feels stale or oily</strong> &ndash; a dry bath with the Dry Foam Shampoo.</li>
              <li><strong>A light fragrance top-up</strong> &ndash; <Link href="/products/refreshing-mist" className={LINK}>Refreshing Mist</Link>, a leave-on coat mist for dogs.</li>
              <li><strong>Wet from rain</strong> &ndash; towel and dry thoroughly, right down to the skin.</li>
              <li><strong>Brush regularly</strong> &ndash; it lifts dust and loose hair before they become a bath.</li>
            </ul>

            <p>
              Then, when the coat genuinely needs it, give a proper wet bath with a <Link href="/products/gentle-daily-shampoo-santal-white-tea" className={LINK}>gentle daily shampoo</Link> &ndash; as often as the coat actually needs, <Link href="/journal/how-often-should-you-bathe-your-dog" className={LINK}>not on a fixed calendar</Link>.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">The takeaway</h2>



            <p>
              A wet bath cleans. A dry bath refreshes. Neither is a cure-all, and neither is a lesser option &ndash; they&rsquo;re different tools.
            </p>

            <p>
              The best routine uses water when the coat is genuinely dirty, a dry bath when it simply needs freshening, and good drying every time water is involved.
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
