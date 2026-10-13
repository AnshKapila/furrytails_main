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

const SLUG = 'how-to-bathe-a-dog-at-home';
const ARTICLE = getArticle(SLUG);

export const metadata: Metadata = articleMetadata(SLUG);

const FAQS: Faq[] = [
  {
    q: "How do I bathe my dog at home?",
    a: "Brush the coat first, wet it right down to the skin with lukewarm water, lather a pet shampoo slowly from neck to tail, rinse until the water runs clear, and dry thoroughly - pressing with towels and checking that the undercoat is dry.",
  },
  {
    q: "How do I bathe a dog that hates water?",
    a: "Keep it short and calm, use a non-slip mat and lukewarm water, pour gently with a cup rather than a shower head, and reward throughout. A dry bath between washes means fewer wet baths.",
  },
  {
    q: "When can puppies take a bath?",
    a: "Check with your vet before bathing a puppy under 12 weeks. Use a pet shampoo, keep the room warm and the bath short, and dry the puppy completely.",
  },
  {
    q: "How do I dry my dog after a bath?",
    a: "Press water out with absorbent towels rather than rubbing, then part the coat to check the skin is dry - especially under the collar, belly, armpits and between the toes. If you use a dryer, keep it cool or low and moving.",
  },
  {
    q: "Why does my dog shampoo lather so little?",
    a: "Gentle, sulphate-free shampoos make less foam. Less lather doesn't mean less clean - sulphates create foam but can strip the skin barrier. A second pass shows more lather once the coat is clean.",
  },
  {
    q: "Should I use conditioner on my dog?",
    a: "Many dogs don't need a separate conditioner if the shampoo includes conditioning ingredients. Furrytail's Gentle Daily Shampoo includes a guar conditioner, camellia oil and vitamin E.",
  },
  {
    q: "Can I bathe my dog with cold water?",
    a: "Use lukewarm water. Cold water is uncomfortable, makes dogs more anxious about baths, and slows drying.",
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
              How to Bathe a Dog at Home: The Ritual, Step by Step
            </h1>
            <p className="text-[1.125rem] md:text-[1.25rem] font-light text-[#3B3A38]/80 leading-[1.6]">
              A good bath isn&rsquo;t fast or foamy. It&rsquo;s slow, thorough, and finished properly.
            </p>
          </header>

          {/* Hero Image */}
          <div className="max-w-[1000px] mx-auto px-6 md:px-8 mb-16 md:mb-24">
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-[#E9E2D7] overflow-hidden rounded-[2px]">
              <Image
                src={ARTICLE.image.src}
                alt={ARTICLE.image.alt}
                fill
                className="object-cover object-[center_45%]"
                priority
                sizes="(max-width: 1000px) 100vw, 1000px"
              />
            </div>
          </div>

          {/* Article Content */}
          <article className="max-w-[700px] mx-auto px-6 md:px-8 font-light text-[#3B3A38] leading-[1.8] text-[1.0625rem] space-y-8">
            <p className="text-[1.25rem] leading-[1.6]">
              Most bath-time problems &ndash; a dog that hates it, a coat that still smells, skin that itches afterwards &ndash; don&rsquo;t come from the shampoo. They come from the steps around it: skipping the brush, wetting only the surface, rinsing in a hurry, or leaving the coat damp.
            </p>

            <p>
              This is the ritual we print on every Gentle Daily Shampoo carton, expanded into a full guide.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Before you begin: set up</h2>



            <p>
              Gather everything before the dog is wet &ndash; you won&rsquo;t want to leave a soaking dog to fetch a towel.
            </p>

            <ul className="space-y-3 pl-5 list-disc">
              <li>A <strong>dog shampoo</strong> made for pets (not <Link href="/journal/can-i-use-human-shampoo-on-my-dog" className={LINK}>human shampoo</Link>)</li>
              <li><strong>Two or three absorbent towels</strong></li>
              <li>A <strong>brush or comb</strong> suited to the coat</li>
              <li>A <strong>non-slip mat</strong> for the tub or bathroom floor</li>
              <li><strong>Lukewarm water</strong> &ndash; comfortable to your wrist, never hot</li>
              <li>Treats, if your dog works for them</li>
            </ul>

            <h2 className="text-3xl font-display mt-16 mb-6">Step 1: Brush the coat thoroughly</h2>


            <div className="my-16">
              <Image
                src="/images/journal/bathe-at-home/img1.webp"
                alt="A woman brushing a labrador's dry coat on a bathroom mat with towels laid out before a bath"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <p>
              Brush before water touches the coat. Water tightens tangles and mats, and a matted coat can&rsquo;t be washed or dried properly underneath.
            </p>

            <p>
              This is also your chance to check the skin for anything unusual, and <Link href="/journal/paw-cleaner-for-dogs-post-walk-paw-care" className={LINK}>the paws</Link> for anything caught between the toes.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Step 2: Wet completely &ndash; down to the skin</h2>



            <p>
              Saturate the coat right down to the skin, not just the surface. Start at the neck and work back, keeping water away from the eyes and ears.
            </p>

            <p>
              For double-coated breeds &ndash; Labradors, Golden Retrievers, German Shepherds, Shih Tzus &ndash; take your time. The undercoat repels water, and a coat that only looks wet won&rsquo;t clean evenly.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Step 3: Lather slowly &ndash; and expect less foam</h2>


            <div className="my-16">
              <Image
                src="/images/journal/bathe-at-home/img2.webp"
                alt="Hands working a gentle, low lather into a wet dog's coat beside a bathtub"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <p>
              Apply a small amount of shampoo and lather slowly from neck to tail, keeping clear of the eyes.
            </p>

            <p>
              The lather will be less than you expect. That&rsquo;s the point: sulphate cleansers create big foam, but they also strip the skin barrier and the coat&rsquo;s natural oils. A gentle, amino acid-based shampoo cleans as effectively with a quieter lather.
            </p>

            <p>
              Clean the face with a damp cloth rather than shampoo, and don&rsquo;t pour water into the ears.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Step 4: Two passes for best results</h2>



            <p>
              The first application cleans. A second, if the coat needs it, will show slightly more lather &ndash; because the coat is already clean. For most baths, two passes give the best result.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Step 5: Rinse until the water runs clean</h2>



            <p>
              Rinse longer than feels necessary. Shampoo left in a dense coat sits against the skin and is one of the most common reasons a freshly bathed dog <Link href="/journal/why-your-dog-still-smells-after-a-bath" className={LINK}>still smells or itches</Link>. Keep going until the water runs completely clear and the coat no longer feels slippery.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Step 6: Dry properly</h2>


            <div className="my-16">
              <Image
                src="/images/journal/bathe-at-home/img3.webp"
                alt="A man pressing a thick towel into a golden retriever's damp coat after a bath"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <p>
              This is the step most people rush.
            </p>

            <ul className="space-y-3 pl-5 list-disc">
              <li><strong>Press, don&rsquo;t rub.</strong> Squeeze water out with a towel; vigorous rubbing creates tangles.</li>
              <li><strong>Get to the skin.</strong> Part the coat and check &ndash; the surface can feel dry while the undercoat is still wet.</li>
              <li><strong>Mind the hidden places:</strong> under the collar line, the belly, armpits, between the toes, and the outer ears.</li>
              <li><strong>If you use a dryer,</strong> choose a pet dryer or a cool, low setting, keep it moving, and stop if your dog is distressed. Never use high heat.</li>
              <li><strong>Let them finish</strong> somewhere warm and well-ventilated, not on their bed while still damp.</li>
            </ul>

            <h2 className="text-3xl font-display mt-16 mb-6">The reveal</h2>



            <p>
              The real result appears as the coat dries: softer, calmer, and with a fragrance that stays close to the coat. With Furrytail&rsquo;s <Link href="/products/gentle-daily-shampoo-santal-white-tea" className={LINK}>Gentle Daily Shampoo</Link>, that&rsquo;s up to 48 hours.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">If your dog hates water</h2>



            <ul className="space-y-3 pl-5 list-disc">
              <li>Keep sessions <strong>short and calm</strong>; a quick, positive bath beats a long, stressful one.</li>
              <li>Use a <strong>non-slip mat</strong> &ndash; much of the fear is about slipping.</li>
              <li>Keep water <strong>lukewarm</strong> and the flow <strong>gentle</strong>; a cup or jug is less alarming than a shower head.</li>
              <li>Talk, praise and reward throughout.</li>
              <li>Between baths, use a **<Link href="/journal/dry-bath-vs-wet-bath-for-dogs" className={LINK}>dry bath</Link>** so a wet bath isn&rsquo;t needed as often.</li>
            </ul>

            <h2 className="text-3xl font-display mt-16 mb-6">Bathing a puppy for the first time</h2>


            <div className="my-16">
              <Image
                src="/images/journal/bathe-at-home/img4.webp"
                alt="A golden puppy wrapped snugly in a cream towel after its first bath"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <p>
              Check with your vet before bathing a puppy under 12 weeks. When it&rsquo;s time:
            </p>

            <ul className="space-y-3 pl-5 list-disc">
              <li>Use a <strong>pet shampoo</strong>, a small amount, and keep it well away from the eyes.</li>
              <li>Keep the room <strong>warm</strong> and the bath <strong>short</strong>.</li>
              <li>Dry the puppy <strong>completely</strong> &ndash; puppies lose heat quickly.</li>
              <li>Make it gentle and positive: the first baths shape how they&rsquo;ll feel about bath-time for life.</li>
            </ul>

            <h2 className="text-3xl font-display mt-16 mb-6">How often?</h2>



            <p>
              There&rsquo;s no universal schedule. Bathe when the coat genuinely needs it &ndash; and see <Link href="/journal/how-often-should-you-bathe-your-dog" className={LINK}>how often should you bathe your dog</Link> for how coat type, lifestyle and Indian weather change the answer.
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
