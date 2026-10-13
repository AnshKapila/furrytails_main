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

const SLUG = 'how-to-choose-a-dog-shampoo';
const ARTICLE = getArticle(SLUG);

export const metadata: Metadata = articleMetadata(SLUG);

const FAQS: Faq[] = [
  {
    q: "What is the best dog shampoo in India?",
    a: "There's no single best shampoo for every dog. Look for one made for dogs, with a full ingredient list, mild sulphate-free cleansers, a pH balanced for pets and built-in conditioning - then match it to your dog's coat, skin, age and climate.",
  },
  {
    q: "What should I look for in a dog shampoo?",
    a: "A full INCI ingredient list, mild sulphate-free cleansers, a pet-appropriate pH, conditioning ingredients, a considered preservative system and clear, not overpowering, fragrance.",
  },
  {
    q: "What is the best dog shampoo for sensitive skin?",
    a: "A sensitive-skin, pH-balanced formula with soothing ingredients such as colloidal oatmeal and aloe vera and a short, readable ingredient list. Patch-test first, and see a vet for persistent itching or redness.",
  },
  {
    q: "Do I need a separate dog conditioner?",
    a: "Not if the shampoo has conditioning built in. Shampoos with conditioners or plant oils leave most coats soft without a second product.",
  },
  {
    q: "Can I use the same shampoo on my dog and cat?",
    a: "Only if it is formulated for cats as well as dogs. Cats lick their coats clean, so a shampoo used on a cat must be made for cats.",
  },
  {
    q: "Is a shampoo with more foam better?",
    a: "No. Big foam usually comes from strong sulphate cleansers. Gentle cleansers lather less and still clean effectively.",
  },
  {
    q: "Can a shampoo stop itching, hair fall or ticks?",
    a: "An everyday grooming shampoo cleans and conditions; it isn't a treatment. Persistent itching, patchy hair loss or a tick infestation needs a vet.",
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
              How to Choose a Dog Shampoo: A Checklist for Indian Pet Parents
            </h1>
            <p className="text-[1.125rem] md:text-[1.25rem] font-light text-[#3B3A38]/80 leading-[1.6]">
              Read the formula, not the front label &ndash; then match it to the dog in front of you.
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
              Search &ldquo;best dog shampoo in India&rdquo; and you&rsquo;ll find long lists of bottles, each promising softer coats, fewer ticks and a better smell. The trouble is that there is no single best dog shampoo. There&rsquo;s the right shampoo for <em>your</em> dog &ndash; its coat, its skin, its age, the city it lives in and how often it gets dirty.
            </p>

            <p>
              This is a practical checklist for choosing one. For the deeper reading, we&rsquo;ve written separately about <Link href="/journal/what-we-found-in-most-pet-shampoos" className={LINK}>what we found in most pet shampoos</Link> and <Link href="/journal/reading-the-inci-list" className={LINK}>how to read an INCI list</Link>.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Step 1: Turn the bottle around</h2>



            <p>
              The front label is marketing. The back label is the product. Before anything else, check that:
            </p>

            <ul className="space-y-3 pl-5 list-disc">
              <li>it&rsquo;s <strong>made for dogs</strong> &ndash; not people (<Link href="/journal/can-i-use-human-shampoo-on-my-dog" className={LINK}>here&rsquo;s why that matters</Link>);</li>
              <li>it lists a <strong>full ingredient (INCI) list</strong>, not just &ldquo;key ingredients&rdquo;;</li>
              <li>it says <strong>who it&rsquo;s for</strong> &ndash; dogs only, or dogs and cats &ndash; and gives <strong>directions</strong>;</li>
              <li>it names the <strong>manufacturer</strong> and has a batch number and expiry.</li>
            </ul>

            <p>
              A shampoo that won&rsquo;t tell you what&rsquo;s in it isn&rsquo;t one to trust with daily use.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Step 2: Check the five things that matter most</h2>


            <div className="my-16">
              <Image
                src="/images/journal/choose-shampoo/img1.webp"
                alt="Hands comparing two shampoo bottles side by side with a dog nearby"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <div className="overflow-x-auto my-10">
              <table className="w-full text-left text-[0.9375rem] border-collapse">
                <thead>
                  <tr className="border-b border-[#3B3A38]/20">
                    <th className="py-3 pr-4 font-medium">Check</th>
                    <th className="py-3 pr-4 font-medium">What to look for</th>
                    <th className="py-3 pr-4 font-medium">Why</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">Cleansers</td>
                    <td className="py-3 pr-4 align-top">Mild, sulphate-free surfactants</td>
                    <td className="py-3 pr-4 align-top">Harsh sulphates create big foam but can strip the skin barrier</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">pH</td>
                    <td className="py-3 pr-4 align-top">pH-balanced for pets</td>
                    <td className="py-3 pr-4 align-top">Canine skin differs from human skin</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">Conditioning</td>
                    <td className="py-3 pr-4 align-top">Conditioners or plant oils in the formula</td>
                    <td className="py-3 pr-4 align-top">A softer coat without a separate product</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">Preservation</td>
                    <td className="py-3 pr-4 align-top">A named, considered preservative system</td>
                    <td className="py-3 pr-4 align-top">Water-based products must be preserved &ndash; how matters</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">Fragrance</td>
                    <td className="py-3 pr-4 align-top">Clearly described, not overpowering</td>
                    <td className="py-3 pr-4 align-top">Dogs live nose-first</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              Less foam is not a warning sign. Gentle cleansers simply lather less.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Step 3: Match it to your dog</h2>


            <div className="my-16">
              <Image
                src="/images/journal/choose-shampoo/img2.webp"
                alt="A golden retriever, a black labrador and a Shih Tzu sitting together on a rug"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <h3 className="text-2xl [font-family:var(--font-cormorant),Georgia,serif] font-light mt-10 mb-4">Sensitive or easily irritated skin</h3>

            <p>
              Look for a <strong>sensitive-skin, pH-balanced</strong> formula with soothing ingredients such as colloidal oatmeal and aloe vera, and a short, readable ingredient list. Patch-test a small area first. Persistent itching, redness or flaking needs a vet, not a new shampoo.
            </p>

            <h3 className="text-2xl [font-family:var(--font-cormorant),Georgia,serif] font-light mt-10 mb-4">Long or double coats (Golden Retriever, Shih Tzu, German Shepherd)</h3>

            <p>
              Choose a shampoo with <strong>built-in conditioning</strong> so the coat dries soft and tangle-free, and pair it with good brushing and thorough drying. See our <Link href="/journal/golden-retriever-grooming-at-home" className={LINK}>Golden Retriever</Link> and <Link href="/journal/shih-tzu-grooming-at-home" className={LINK}>Shih Tzu</Link> guides.
            </p>

            <h3 className="text-2xl [font-family:var(--font-cormorant),Georgia,serif] font-light mt-10 mb-4">Short coats (Labrador, Beagle, Indie)</h3>

            <p>
              A gentle everyday cleanser is enough. Brushing does more for shedding than any shampoo &ndash; see <Link href="/journal/dog-hair-fall-vs-shedding" className={LINK}>hair fall vs normal shedding</Link>.
            </p>

            <h3 className="text-2xl [font-family:var(--font-cormorant),Georgia,serif] font-light mt-10 mb-4">Puppies</h3>

            <p>
              Use a gentle pet shampoo, keep it well away from the eyes, and check with your vet before bathing a puppy under 12 weeks. More in <Link href="/journal/how-to-bathe-a-dog-at-home" className={LINK}>how to bathe a dog at home</Link>.
            </p>

            <h3 className="text-2xl [font-family:var(--font-cormorant),Georgia,serif] font-light mt-10 mb-4">Homes with cats too</h3>

            <p>
              If one bottle will be used on both, it must be <strong>formulated for cats</strong> as well &ndash; cats lick off whatever is left on the coat. See <Link href="/journal/can-you-bathe-a-cat" className={LINK}>can you bathe a cat?</Link>
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Step 4: Think about India&rsquo;s climate</h2>



            <ul className="space-y-3 pl-5 list-disc">
              <li><strong>Humid and monsoon months:</strong> the shampoo matters less than rinsing and <strong>drying right down to the skin</strong>. A damp coat is where smells and skin trouble start. (<Link href="/journal/the-monsoon-ritual" className={LINK}>The monsoon ritual</Link>.)</li>
              <li><strong>Hot, dusty summers:</strong> gentle formulas you&rsquo;re comfortable using whenever the coat genuinely needs it, not harsh &ldquo;deep cleansers&rdquo;. (<Link href="/journal/summer-dog-care-india" className={LINK}>Summer dog care in India</Link>.)</li>
              <li><strong>Between baths:</strong> a waterless dry shampoo saves a full wash. (<Link href="/journal/dry-bath-vs-wet-bath-for-dogs" className={LINK}>Dry bath vs. wet bath</Link>.)</li>
            </ul>

            <h2 className="text-3xl font-display mt-16 mb-6">Step 5: Be careful with big claims</h2>



            <p>
              A grooming shampoo cleans and conditions. Be wary of everyday shampoos that promise to <strong>cure itching, stop hair fall or kill ticks</strong> &ndash; those are medical claims, and skin conditions and parasites need a vet. (<Link href="/journal/ticks-fleas-and-the-indian-dog" className={LINK}>Ticks, fleas and the Indian dog</Link>.)
            </p>

            <p>
              And &ldquo;natural&rdquo; on the front tells you about origin, not suitability. (<Link href="/journal/what-does-natural-mean-in-pet-care" className={LINK}>What &ldquo;natural&rdquo; actually means.</Link>)
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">How Furrytail&rsquo;s Gentle Daily Shampoo measures up</h2>


            <div className="my-16">
              <Image
                src="/images/journal/choose-shampoo/img3.webp"
                alt="A dog and a cat sitting side by side on a bathroom mat beside folded towels"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <p>
              We built <Link href="/products/gentle-daily-shampoo-santal-white-tea" className={LINK}>Gentle Daily Shampoo</Link> to pass this checklist:
            </p>

            <ul className="space-y-3 pl-5 list-disc">
              <li><strong>Made for dogs and cats</strong>, with a full INCI list on every carton.</li>
              <li><strong>Cleansed with amino acid-derived surfactants</strong> instead of sulphates.</li>
              <li><strong>pH-balanced, sensitive-skin formulation</strong> with colloidal oatmeal, aloe vera and glycerin.</li>
              <li><strong>Built-in conditioning</strong> &ndash; guar conditioner, camellia oil and vitamin E.</li>
              <li><strong>Preserved with probiotics</strong> instead of synthetic preservatives.</li>
              <li><strong>IFRA-compliant fragrance</strong> in three identities &ndash; Santal &amp; White Tea, Fig &amp; Neroli, and Violet Leaf &amp; Muslin &ndash; with no synthetic fragrance.</li>
            </ul>

            <p>
              Between baths, the waterless <Link href="/products/dry-foam-shampoo" className={LINK}>Dry Foam Shampoo</Link> keeps the coat fresh without a wash.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">The checklist</h2>



            <ol className="space-y-4 mt-6 list-decimal pl-5">
              <li>Made for dogs (and cats, if needed)?</li>
              <li>Full ingredient list on the back?</li>
              <li>Mild, sulphate-free cleansers?</li>
              <li>pH-balanced for pets?</li>
              <li>Conditioning built in?</li>
              <li>Considered preservation and fragrance?</li>
              <li>Right for your dog&rsquo;s coat, skin, age and climate?</li>
              <li>No medical promises from an everyday shampoo?</li>
            </ol>

            <p>
              If a bottle ticks these boxes, you&rsquo;ve found a good dog shampoo &ndash; for your dog.
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
