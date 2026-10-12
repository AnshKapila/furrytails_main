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

const SLUG = 'dog-hair-fall-vs-shedding';
const ARTICLE = getArticle(SLUG);

export const metadata: Metadata = articleMetadata(SLUG);

const FAQS: Faq[] = [
  {
    q: "Why is my dog losing so much hair?",
    a: "Most often it's normal shedding, especially in double-coated breeds like Labradors, Golden Retrievers and German Shepherds, which shed year-round with heavier seasonal sheds. If there are bald patches, sores, itching or smell, see your vet.",
  },
  {
    q: "How can I tell normal shedding from hair fall caused by a problem?",
    a: "Normal shedding is even across the body, with a full coat and healthy skin underneath. Bald or thinning patches, redness, scabs, flaking, itching or a persistent smell suggest a skin problem.",
  },
  {
    q: "Why does my Labrador shed so much?",
    a: "Labradors have a short, dense double coat and shed steadily all year, with heavier sheds a couple of times a year. Regular brushing with a rubber curry brush or deshedding tool keeps it under control.",
  },
  {
    q: "How do I reduce my dog's shedding?",
    a: "Brush regularly with the right tool for the coat, bathe with a mild dog shampoo when the coat needs it, dry thoroughly and brush while drying, and keep your dog on a balanced diet. You can manage shedding, but you can't stop a healthy dog from shedding.",
  },
  {
    q: "Should I shave my dog to stop shedding?",
    a: "No - shaving a double-coated dog doesn't stop shedding and removes the coat's protection against heat and sun. Brush out the loose undercoat instead.",
  },
  {
    q: "Can a shampoo stop dog hair fall?",
    a: "A gentle shampoo can help remove loose undercoat during a bath, but no shampoo stops normal shedding or treats hair loss from a skin condition. Persistent or patchy hair loss needs a vet.",
  },
  {
    q: "When should I take my dog to the vet for hair loss?",
    a: "When you see bald or thinning patches, red or broken skin, scabs, flaking, itching, a greasy coat or smell, or hair loss alongside other changes in your dog's health or behaviour.",
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
              Dog Hair Fall vs Normal Shedding: When to Worry
            </h1>
            <p className="text-[1.125rem] md:text-[1.25rem] font-light text-[#3B3A38]/80 leading-[1.6]">
              Hair on the sofa is normal. Hair missing from the dog isn&rsquo;t.
            </p>
          </header>

          {/* Hero Image */}
          <div className="max-w-[1000px] mx-auto px-6 md:px-8 mb-16 md:mb-24">
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-[#E9E2D7] overflow-hidden rounded-[2px]">
              <Image
                src={ARTICLE.image.src}
                alt={ARTICLE.image.alt}
                fill
                className="object-cover object-[center_60%]"
                priority
                sizes="(max-width: 1000px) 100vw, 1000px"
              />
            </div>
          </div>

          {/* Article Content */}
          <article className="max-w-[700px] mx-auto px-6 md:px-8 font-light text-[#3B3A38] leading-[1.8] text-[1.0625rem] space-y-8">
            <p className="text-[1.25rem] leading-[1.6]">
              If you share your home with a Labrador, a Golden or a German Shepherd, you already know the feeling: hair on the sofa, hair on your clothes, hair in corners you cleaned yesterday. &ldquo;Dog hair fall&rdquo; is one of the most common grooming worries in India &ndash; and most of the time, it&rsquo;s simply shedding.
            </p>

            <p>
              The useful question isn&rsquo;t <em>how do I stop my dog losing hair?</em> It&rsquo;s <strong>is this normal shedding, or is something wrong with the skin?</strong>
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">What normal shedding looks like</h2>


            <div className="my-16">
              <Image
                src="/images/journal/hair-fall/img1.webp"
                alt="A deshedding brush full of loose undercoat held above a dog’s back"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <p>
              All dogs replace old hair; some just do it far more visibly. Double-coated breeds &ndash; Labradors, Golden Retrievers, German Shepherds, Huskies, many Indies &ndash; shed steadily and have heavier &ldquo;coat blows&rdquo; a couple of times a year.
            </p>

            <p>
              Normal shedding usually means:
            </p>

            <ul className="space-y-3 pl-5 list-disc">
              <li>hair comes out <strong>evenly across the body</strong>, often in tufts of soft undercoat;</li>
              <li>the coat underneath stays <strong>full, with no bare patches</strong>;</li>
              <li>the <strong>skin looks healthy</strong> &ndash; no redness, scabs, flaking or smell;</li>
              <li>your dog <strong>isn&rsquo;t scratching, licking or chewing</strong> more than usual.</li>
            </ul>

            <h2 className="text-3xl font-display mt-16 mb-6">When hair fall is a warning sign</h2>


            <div className="my-16">
              <Image
                src="/images/journal/hair-fall/img2.webp"
                alt="A veterinarian gently checking a golden retriever’s coat and skin at home"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <p>
              Hair loss that comes with changes in the skin or the dog&rsquo;s behaviour is different. See your vet if you notice:
            </p>

            <ul className="space-y-3 pl-5 list-disc">
              <li><strong>bald or thinning patches</strong>, especially if they&rsquo;re spreading;</li>
              <li><strong>redness, sores, scabs, bumps or flaky skin</strong>;</li>
              <li><strong>itching, licking or chewing</strong> at one area;</li>
              <li>a <strong>greasy coat or a persistent smell</strong>;</li>
              <li>broken, brittle hair or a dull, patchy coat;</li>
              <li>hair loss alongside <strong>tiredness, weight change or other changes</strong> in your dog.</li>
            </ul>

            <p>
              These can have many causes &ndash; parasites, allergies, skin infections, hormonal conditions, diet &ndash; and they can look alike. A vet can examine the skin and work out which it is. More grooming or a different shampoo won&rsquo;t fix them.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">How to manage normal shedding at home</h2>



            <h3 className="text-2xl [font-family:var(--font-cormorant),Georgia,serif] font-light mt-10 mb-4">Brush more, not harder</h3>

            <p>
              Regular brushing removes loose hair before it lands on the floor, keeps the coat ventilated and lets you spot skin changes early.
            </p>

            <div className="overflow-x-auto my-10">
              <table className="w-full text-left text-[0.9375rem] border-collapse">
                <thead>
                  <tr className="border-b border-[#3B3A38]/20">
                    <th className="py-3 pr-4 font-medium">Coat</th>
                    <th className="py-3 pr-4 font-medium">Brush</th>
                    <th className="py-3 pr-4 font-medium">How often</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">Short double coat (Labrador, Indie)</td>
                    <td className="py-3 pr-4 align-top">Rubber curry brush or deshedding tool</td>
                    <td className="py-3 pr-4 align-top">2&ndash;3 times a week; daily when shedding</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">Long double coat (Golden, GSD)</td>
                    <td className="py-3 pr-4 align-top">Undercoat rake, then a comb</td>
                    <td className="py-3 pr-4 align-top">2&ndash;3 times a week; daily when shedding</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">Long single coat (Shih Tzu)</td>
                    <td className="py-3 pr-4 align-top">Pin brush and metal comb</td>
                    <td className="py-3 pr-4 align-top">Daily</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              Use deshedding tools gently and not every day &ndash; over-brushing can irritate the skin.
            </p>

            <h3 className="text-2xl [font-family:var(--font-cormorant),Georgia,serif] font-light mt-10 mb-4">Bathe thoughtfully</h3>

            <p>
              A good bath loosens dead undercoat so it can be brushed out. Use a mild, sulphate-free dog shampoo, rinse thoroughly and <Link href="/journal/how-to-bathe-a-dog-at-home" className={LINK}>dry right down to the skin</Link> &ndash; then brush while drying, when loose hair comes away most easily.
            </p>

            <p>
              Over-bathing with harsh cleansers can dry the skin, so bathe when the coat needs it, <Link href="/journal/how-often-should-you-bathe-your-dog" className={LINK}>not on a fixed calendar</Link>. Furrytail&rsquo;s <Link href="/products/gentle-daily-shampoo-santal-white-tea" className={LINK}>Gentle Daily Shampoo</Link> is a sensitive-skin, pH-balanced formulation cleansed with amino acid-derived surfactants, with a guar conditioner, camellia oil and vitamin E.
            </p>

            <h3 className="text-2xl [font-family:var(--font-cormorant),Georgia,serif] font-light mt-10 mb-4">Feed well, and ask your vet</h3>

            <p>
              Coat condition reflects overall health and diet. If your dog&rsquo;s coat seems dull or thin, ask your vet before adding supplements.
            </p>

            <h3 className="text-2xl [font-family:var(--font-cormorant),Georgia,serif] font-light mt-10 mb-4">Don&rsquo;t shave a double coat</h3>

            <p>
              It won&rsquo;t stop shedding &ndash; the hair is just shorter &ndash; and the coat helps protect the skin and regulate temperature. Brush out the undercoat instead. (<Link href="/journal/golden-retriever-grooming-at-home" className={LINK}>Why, in more detail.</Link>)
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Shedding and the Indian climate</h2>


            <div className="my-16">
              <Image
                src="/images/journal/hair-fall/img3.webp"
                alt="A healthy indie dog with a smooth, shiny coat on a morning walk in a green Indian city park"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <p>
              Many owners notice heavier shedding with seasonal change and in hot, humid months. Keep up the brushing, dry the coat fully after monsoon walks, and keep an eye on the skin &ndash; damp, matted coats are where problems start. See <Link href="/journal/the-monsoon-ritual" className={LINK}>the monsoon ritual</Link>.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">The takeaway</h2>



            <p>
              Hair on the floor is usually just a coat doing its job. Hair missing from the dog &ndash; patches, sores, itching, smell &ndash; is the skin asking for a vet.
            </p>

            <p>
              Brush regularly, bathe gently, dry thoroughly, and look at the skin, not just the sofa.
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
