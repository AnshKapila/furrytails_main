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

const SLUG = 'summer-dog-care-india';
const ARTICLE = getArticle(SLUG);

export const metadata: Metadata = articleMetadata(SLUG);

const FAQS: Faq[] = [
  {
    q: "How do I take care of my dog in summer in India?",
    a: "Walk early in the morning and after sunset, test pavements before walking, keep fresh water and shade available at all times, brush out loose undercoat, bathe when needed with cool water and dry thoroughly, and watch for signs of heatstroke.",
  },
  {
    q: "What time should I walk my dog in summer?",
    a: "In the early morning and after sunset, when the ground has cooled. Keep midday outings short and in the shade.",
  },
  {
    q: "How do I know if the pavement is too hot for my dog?",
    a: "Place the back of your hand flat on it. If you can't hold it there for seven seconds, it's too hot for your dog's paws.",
  },
  {
    q: "Should I shave my dog in summer?",
    a: "Shaving double-coated breeds is generally not recommended, because the coat helps regulate temperature and protects the skin. Brush out the undercoat and ask a groomer for a tidy trim instead.",
  },
  {
    q: "Can I bathe my dog every day in summer?",
    a: "Daily bathing is rarely needed and can dry out the skin. Bathe when the coat needs it, with lukewarm to cool water, and dry thoroughly; use a dry bath in between.",
  },
  {
    q: "What are the signs of heatstroke in dogs?",
    a: "Heavy panting, drooling, bright red or pale gums, weakness, wobbling, vomiting, diarrhoea or confusion. Cool your dog down and see a vet immediately.",
  },
  {
    q: "Do dogs get more ticks in summer?",
    a: "Ticks are more active in warm, humid months. Check your dog after walks and use a tick and flea repellent before walks in tick-active areas.",
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
              Summer Dog Care in India: Grooming Through the Heat
            </h1>
            <p className="text-[1.125rem] md:text-[1.25rem] font-light text-[#3B3A38]/80 leading-[1.6]">
              Indian summers ask a lot of a dog in a fur coat. A few habits make it easier.
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
              From Delhi&rsquo;s dry 45°C afternoons to Chennai&rsquo;s sticky humidity, Indian summers are hard on dogs. (Winter brings its own challenges - see <Link href="/journal/winter-dog-care-india" className={LINK}>winter dog care in India</Link>.) They can&rsquo;t sweat the way we do &ndash; they cool down mostly by panting and through their paws &ndash; and they&rsquo;re walking on surfaces that can be far hotter than the air.
            </p>

            <p>
              Good summer care is less about special products and more about timing, shade, water and a sensible grooming routine.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Walk early, walk late</h2>


            <div className="my-16">
              <Image
                src="/images/journal/summer-care/img1.webp"
                alt="A woman walking her dog on a tree-lined Indian street at sunrise"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <ul className="space-y-3 pl-5 list-disc">
              <li><strong>Walk in the early morning and after sunset</strong>, when the ground has cooled.</li>
              <li><strong>Keep midday outings short</strong> &ndash; a quick toilet break, in the shade.</li>
              <li><strong>Shorten walks on the hottest days</strong>, especially for flat-faced breeds (Pugs, Shih Tzus, Bulldogs), puppies, older dogs and heavy-coated breeds.</li>
              <li><strong>Carry water</strong> on longer walks.</li>
            </ul>

            <h2 className="text-3xl font-display mt-16 mb-6">Hot pavements and paws</h2>


            <div className="my-16">
              <Image
                src="/images/journal/summer-care/img2.webp"
                alt="A hand pressed flat on sun-heated pavement to test its temperature, a dog waiting on the grass"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <p>
              Tar roads, paving and parking areas soak up heat and can stay hot long after sunset.
            </p>

            <p>
              <strong>The seven-second test:</strong> place the back of your hand flat on the pavement. If you can&rsquo;t hold it there for seven seconds, it&rsquo;s too hot for your dog&rsquo;s paws.
            </p>

            <ul className="space-y-3 pl-5 list-disc">
              <li>Walk on <strong>grass or shaded paths</strong> where you can.</li>
              <li><strong>Check the pads</strong> after walks for redness, blisters or peeling.</li>
              <li><strong>Clean the paws after every walk</strong> with a no-rinse <Link href="/products/paw-cleaner" className={LINK}>Paw Cleaner</Link> &ndash; street dust, grit and residue all come home on the pads. (<Link href="/journal/paw-cleaner-for-dogs-post-walk-paw-care" className={LINK}>More on paws.</Link>)</li>
            </ul>

            <h2 className="text-3xl font-display mt-16 mb-6">Keep them cool at home</h2>


            <div className="my-16">
              <Image
                src="/images/journal/summer-care/img3.webp"
                alt="A dog resting on a cool tiled floor under a ceiling fan"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <ul className="space-y-3 pl-5 list-disc">
              <li><strong>Fresh water, always</strong> &ndash; refill it often, and keep a second bowl in another room.</li>
              <li><strong>Shade and airflow</strong> &ndash; fans, open windows, and a cool tiled floor to lie on.</li>
              <li><strong>Never leave a dog in a parked car</strong>, even for a few minutes, even with the windows down.</li>
              <li>Avoid <strong>strenuous play</strong> in the heat of the day.</li>
            </ul>

            <h2 className="text-3xl font-display mt-16 mb-6">Grooming a double coat in summer</h2>



            <h3 className="text-2xl [font-family:var(--font-cormorant),Georgia,serif] font-light mt-10 mb-4">Brush out the undercoat</h3>

            <p>
              For Labradors, Golden Retrievers, German Shepherds, Huskies and many Indies, regular brushing is the most useful summer grooming you can do. Removing loose undercoat lets air move through the coat and keeps it from matting.
            </p>

            <h3 className="text-2xl [font-family:var(--font-cormorant),Georgia,serif] font-light mt-10 mb-4">Trim &ndash; don&rsquo;t shave</h3>

            <p>
              Shaving a double-coated dog is generally not recommended: the coat helps regulate temperature and protects the skin from sun, and it can grow back unevenly. A <strong>tidy trim</strong> of the feet, belly and feathering &ndash; or a shorter cut for single-coated breeds like Shih Tzus &ndash; is a better summer choice. More in <Link href="/journal/golden-retriever-grooming-at-home" className={LINK}>Golden Retriever grooming</Link> and <Link href="/journal/dog-hair-fall-vs-shedding" className={LINK}>hair fall vs normal shedding</Link>.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Bathing in the heat</h2>



            <p>
              A bath can be a welcome refresh, but summer doesn&rsquo;t mean bathing every day. Bathe when the coat genuinely needs it, with <strong>lukewarm to cool</strong> water and a gentle, sulphate-free dog shampoo such as Furrytail&rsquo;s <Link href="/products/gentle-daily-shampoo-santal-white-tea" className={LINK}>Gentle Daily Shampoo</Link>.
            </p>

            <p>
              Then <strong>dry the coat thoroughly</strong> &ndash; a damp undercoat in humid heat is how skin trouble and musty smells start. Between baths, a waterless <Link href="/products/dry-foam-shampoo" className={LINK}>Dry Foam Shampoo</Link> freshens the coat without soaking it. See <Link href="/journal/how-often-should-you-bathe-your-dog" className={LINK}>how often to bathe your dog</Link>.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Ticks and fleas peak in the warm months</h2>



            <p>
              Warmth and humidity bring more ticks. Run your hands through your dog&rsquo;s coat after walks, especially around the ears, neck and between the toes, and use a plant-based <Link href="/products/anti-tick-flea-spray" className={LINK}>tick and flea spray</Link> before walks in tick-active areas. Read <Link href="/journal/ticks-fleas-and-the-indian-dog" className={LINK}>ticks, fleas and the Indian dog</Link>.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Know the signs of heatstroke</h2>



            <p>
              Heatstroke is an emergency. Watch for:
            </p>

            <ul className="space-y-3 pl-5 list-disc">
              <li><strong>heavy, frantic panting</strong> and drooling;</li>
              <li><strong>bright red or pale gums</strong>;</li>
              <li><strong>weakness, wobbling or collapse</strong>;</li>
              <li><strong>vomiting or diarrhoea</strong>;</li>
              <li><strong>confusion or unresponsiveness</strong>.</li>
            </ul>

            <p>
              If you see these, move your dog to a cool, shaded place, offer small amounts of water, wet the coat with cool (not ice-cold) water, and <strong>get to a vet immediately</strong>.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">A summer care checklist</h2>



            <div className="overflow-x-auto my-10">
              <table className="w-full text-left text-[0.9375rem] border-collapse">
                <thead>
                  <tr className="border-b border-[#3B3A38]/20">
                    <th className="py-3 pr-4 font-medium">When</th>
                    <th className="py-3 pr-4 font-medium">What</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">Before 8 am / after sunset</td>
                    <td className="py-3 pr-4 align-top">Main walks; seven-second pavement test</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">Before walks in grass</td>
                    <td className="py-3 pr-4 align-top">Tick and flea spray</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">After every walk</td>
                    <td className="py-3 pr-4 align-top">Clean and check paws; quick tick check</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">Every day</td>
                    <td className="py-3 pr-4 align-top">Fresh water, shade, a cool place to lie</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">2&ndash;3 times a week (daily for heavy shedders)</td>
                    <td className="py-3 pr-4 align-top">Brush out loose undercoat</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">When the coat needs it</td>
                    <td className="py-3 pr-4 align-top">Cool bath, rinse well, dry to the skin</td>
                  </tr>
                </tbody>
              </table>
            </div>

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
