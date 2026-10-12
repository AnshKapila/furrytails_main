import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientProviders from '@/components/ClientProviders';
import ArticleFaqs, { type Faq } from '@/components/journal/ArticleFaqs';
import ArticleJsonLd from '@/components/journal/ArticleJsonLd';
import RelatedArticles from '@/components/journal/RelatedArticles';
import { articleMetadata, formatArticleDate, getArticle, getRelatedArticles } from '@/lib/journal';
import type { Metadata } from 'next';

const SLUG = 'shih-tzu-grooming-at-home';
const ARTICLE = getArticle(SLUG);

export const metadata: Metadata = articleMetadata(SLUG);

const FAQS: Faq[] = [
  {
    q: "How often should I groom my Shih Tzu at home?",
    a: "Brush daily, clean the paws after every walk, check the ears weekly, and bathe when the coat genuinely needs it. Most Shih Tzus also benefit from a professional trim every four to eight weeks.",
  },
  {
    q: "What is the best shampoo for a Shih Tzu?",
    a: "A dog shampoo that is mild, sulphate-free, pH-balanced for pets and includes conditioning ingredients for a long coat. Avoid human shampoo.",
  },
  {
    q: "How often should I bathe a Shih Tzu?",
    a: "There's no fixed schedule - bathe when the coat genuinely needs it, and always dry the coat completely afterwards. A dry bath can freshen the coat between washes.",
  },
  {
    q: "How do I stop my Shih Tzu's coat from matting?",
    a: "Brush and comb daily down to the skin, always brush out tangles before a bath, and dry the coat completely. A shorter puppy cut makes mats much less likely.",
  },
  {
    q: "Can I use puppy shampoo on my Shih Tzu puppy?",
    a: "Use a gentle shampoo made for pets, and check with your vet before bathing a puppy under 12 weeks.",
  },
  {
    q: "How do I keep my Shih Tzu smelling good?",
    a: "Dry the coat thoroughly after every bath, freshen between baths with a dry foam shampoo, wash bedding and collars regularly, and keep the ears clean and dry. A light coat mist can add fragrance to a clean coat.",
  },
  {
    q: "How do I clean my Shih Tzu's eyes?",
    a: "Wipe gently around the eyes daily with a soft, damp cloth and keep facial hair away from them. See your vet if you notice redness, discharge or cloudiness.",
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
            <div className="flex items-center gap-2 text-[0.6875rem] font-normal tracking-[0.06em] text-[#8D9A83] uppercase mb-6">
              <Link href="/journal" className="hover:text-[#3B3A38] transition-colors">Journal</Link>
              <span className="w-1 h-1 rounded-full bg-[#E9E2D7]" />
              <span>{ARTICLE.category}</span>
              <span className="w-1 h-1 rounded-full bg-[#E9E2D7]" />
              <span>{ARTICLE.readTime}</span>
              <span className="w-1 h-1 rounded-full bg-[#E9E2D7]" />
              <time dateTime={ARTICLE.datePublished}>{formatArticleDate(ARTICLE.datePublished)}</time>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#3B3A38] leading-[1.1] mb-8 font-display">
              Shih Tzu Grooming at Home: Coat, Face, Paws and Bath
            </h1>
            <p className="text-[1.125rem] md:text-[1.25rem] font-light text-[#3B3A38]/80 leading-[1.6]">
              That flowing coat is beautiful &ndash; and it asks for a little care every single day.
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
              Few dogs are as at home in Indian apartments as the Shih Tzu. Small, affectionate and built for companionship, they&rsquo;re also one of the higher-maintenance coats you can share a sofa with.
            </p>

            <p>
              The good news: most Shih Tzu grooming is small and regular rather than big and occasional. Ten minutes a day prevents most of the problems that send owners to a groomer in a hurry.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Understanding the Shih Tzu coat</h2>



            <p>
              The Shih Tzu has a <strong>long double coat</strong> &ndash; a soft undercoat beneath longer outer hair. It doesn&rsquo;t shed in clumps the way some breeds do; instead, loose hair gets caught in the coat. Left alone, that&rsquo;s how <strong>mats</strong> form &ndash; especially behind the ears, under the legs, on the belly and wherever a collar or harness rubs.
            </p>

            <p>
              Mats aren&rsquo;t just untidy. They hold moisture and dirt against the skin, they hurt when pulled, and they can&rsquo;t be properly washed or dried. That&rsquo;s why brushing is the foundation of everything else.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Daily: brush, and check</h2>


            <div className="my-16">
              <Image
                src="/images/journal/shih-tzu/img1.webp"
                alt="Brushing the long coat of a Shih Tzu with a pin brush"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <ul className="space-y-3 pl-5 list-disc">
              <li><strong>Brush daily</strong> with a pin brush, then follow with a metal comb to find the tangles the brush missed.</li>
              <li><strong>Work in sections</strong>, brushing down to the skin, not just the surface.</li>
              <li><strong>Mist lightly first</strong> &ndash; brushing a completely dry long coat can cause breakage.</li>
              <li><strong>Don&rsquo;t wet a matted coat.</strong> Gently tease small tangles apart with your fingers or the comb; leave large or tight mats to a professional groomer.</li>
            </ul>

            <p>
              Many owners in Indian cities choose a shorter <strong>&rdquo;puppy cut&rdquo;</strong>, which makes daily care far easier in heat and humidity. It&rsquo;s a practical choice, not a lesser one.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">The face and eyes</h2>


            <div className="my-16">
              <Image
                src="/images/journal/shih-tzu/img2.webp"
                alt="A Shih Tzu with a top-knot having the area around its eyes wiped with a soft damp cloth"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <p>
              Shih Tzus have prominent eyes and a short muzzle, so the face needs gentle daily attention:
            </p>

            <ul className="space-y-3 pl-5 list-disc">
              <li><strong>Wipe around the eyes</strong> with a soft, damp cloth, wiping away from the eye.</li>
              <li><strong>Keep facial hair away from the eyes</strong> &ndash; a top-knot or a neat trim helps.</li>
              <li><strong>Keep shampoo out of the eyes</strong> at bath time; clean the face with a damp cloth instead.</li>
              <li>If you notice <strong>redness, discharge, squinting or cloudiness</strong>, see your vet rather than treating it yourself.</li>
            </ul>

            <h2 className="text-3xl font-display mt-16 mb-6">Ears</h2>



            <p>
              Shih Tzu ears are hairy and hang down, which keeps them warm and less ventilated. Check them weekly, wipe the visible outer ear with a soft cloth, and dry it after every bath. Don&rsquo;t put cotton buds into the ear canal. A persistent smell, scratching or head-shaking is a reason to see your vet.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Paws</h2>


            <div className="my-16">
              <Image
                src="/images/journal/shih-tzu/img4.webp"
                alt="A woman wiping a Shih Tzu's paw on the doormat after a walk"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <p>
              The hair between a Shih Tzu&rsquo;s paw pads grows long and collects dust, mud and debris &ndash; and, in monsoon, stays damp.
            </p>

            <ul className="space-y-3 pl-5 list-disc">
              <li>Keep the <strong>hair between the pads trimmed</strong> short (a groomer can do this).</li>
              <li><strong>Clean the paws after every walk</strong> with a no-rinse <Link href="/products/paw-cleaner" className={LINK}>Paw Cleaner</Link> at the door.</li>
              <li><strong>Dry between the toes</strong> afterwards.</li>
            </ul>

            <p>
              More in <Link href="/journal/paw-cleaner-for-dogs-post-walk-paw-care" className={LINK}>the paw problem</Link>.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Bathing a Shih Tzu</h2>


            <div className="my-16">
              <Image
                src="/images/journal/shih-tzu/img3.webp"
                alt="A Shih Tzu being towel-dried after a bath with a small pet dryer nearby"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <p>
              Follow <Link href="/journal/how-to-bathe-a-dog-at-home" className={LINK}>the full bath ritual</Link>, with a few Shih Tzu specifics:
            </p>

            <ol className="space-y-4 mt-6 list-decimal pl-5">
              <li><strong>Brush out every tangle first.</strong> Water turns a small tangle into a mat.</li>
              <li><strong>Wet right down to the skin</strong> &ndash; the double coat repels water, so take your time.</li>
              <li><strong>Lather gently</strong> in the direction of hair growth; don&rsquo;t scrub the coat into knots.</li>
              <li><strong>Rinse thoroughly.</strong> A long, dense coat holds shampoo easily, and residue is a common cause of itching and odour.</li>
              <li><strong>Dry completely</strong> &ndash; this matters more for a Shih Tzu than almost any other breed. Press with towels, then use a cool or low pet dryer while brushing, until the coat is dry to the skin.</li>
            </ol>

            <p>
              As for how often: when the coat genuinely needs it, <Link href="/journal/how-often-should-you-bathe-your-dog" className={LINK}>not on a fixed calendar</Link>. Between baths, a <Link href="/journal/dry-bath-vs-wet-bath-for-dogs" className={LINK}>dry bath</Link> keeps the coat fresh without soaking it.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">What is the best shampoo for a Shih Tzu?</h2>



            <p>
              Because the coat is long and the skin is often sensitive, look for:
            </p>

            <ul className="space-y-3 pl-5 list-disc">
              <li>a shampoo <strong>made for dogs</strong>, never <Link href="/journal/can-i-use-human-shampoo-on-my-dog" className={LINK}>human shampoo</Link>;</li>
              <li><strong>mild, sulphate-free cleansers</strong> that don&rsquo;t strip the coat&rsquo;s natural oils;</li>
              <li><strong>pH-balanced</strong> for pets;</li>
              <li><strong>built-in conditioning</strong> to help a long coat stay soft and manageable;</li>
              <li>a clear, readable <strong>ingredient list</strong> (<Link href="/journal/reading-the-inci-list" className={LINK}>how to read one</Link>).</li>
            </ul>

            <p>
              Furrytail&rsquo;s <Link href="/products/gentle-daily-shampoo-violet-leaf-muslin" className={LINK}>Gentle Daily Shampoo</Link> is a sensitive-skin, pH-balanced formulation cleansed with amino acid-derived surfactants, with a guar conditioner, camellia oil and vitamin E for a softer coat. It&rsquo;s gentle enough for Shih Tzu puppies too &ndash; check with your vet before bathing a puppy under 12 weeks.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Keeping a Shih Tzu smelling fresh</h2>



            <ul className="space-y-3 pl-5 list-disc">
              <li><strong>Dry thoroughly</strong> after every bath &ndash; a damp long coat is the most common cause of a musty smell (<Link href="/journal/why-your-dog-still-smells-after-a-bath" className={LINK}>why your dog still smells after a bath</Link>).</li>
              <li><strong>Freshen between baths</strong> with the waterless <Link href="/products/dry-foam-shampoo" className={LINK}>Dry Foam Shampoo</Link>.</li>
              <li>For a light fragrance, <Link href="/products/refreshing-mist" className={LINK}>Refreshing Mist</Link> is a leave-on coat mist for dogs.</li>
              <li><strong>Wash bedding, collars and harnesses</strong> regularly &ndash; they hold smells and transfer them back.</li>
            </ul>

            <h2 className="text-3xl font-display mt-16 mb-6">A simple Shih Tzu grooming routine</h2>



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
                    <td className="py-3 pr-4 align-top">Daily</td>
                    <td className="py-3 pr-4 align-top">Brush and comb to the skin; wipe around the eyes</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">After every walk</td>
                    <td className="py-3 pr-4 align-top">Clean and dry the paws</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">Weekly</td>
                    <td className="py-3 pr-4 align-top">Check and wipe the outer ears; check for mats under legs and behind ears</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">Between baths</td>
                    <td className="py-3 pr-4 align-top">Dry foam for a stale or oily coat</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">When the coat needs it</td>
                    <td className="py-3 pr-4 align-top">Full bath, rinse thoroughly, dry completely</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">Every 4&ndash;8 weeks</td>
                    <td className="py-3 pr-4 align-top">Professional trim (face, paws, sanitary areas, overall length)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-display mt-16 mb-6">When to see a vet</h2>



            <p>
              Grooming keeps a coat healthy; it doesn&rsquo;t treat problems. See your vet for persistent itching, redness, hair loss, skin odour, eye discharge or cloudiness, ear scratching or head-shaking.
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
