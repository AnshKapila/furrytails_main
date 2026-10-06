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

const SLUG = 'santal-a-primer';
const ARTICLE = getArticle(SLUG);

export const metadata: Metadata = articleMetadata(SLUG);

const FAQS: Faq[] = [
  {
    q: 'What is sandalwood oil?',
    a: 'Sandalwood oil is an aromatic essential oil obtained from sandalwood heartwood. Santalum album is one of the best-known sources. Its characteristic fragrance comes from a complex mixture of compounds, including α-santalol and β-santalol. The exact composition depends on botanical source, processing and quality.',
  },
  {
    q: 'How is sandalwood oil made?',
    a: 'Traditional sandalwood oil is produced through steam distillation of aromatic heartwood. Steam carries volatile compounds from the wood, which are subsequently condensed and separated. The botanical source and processing conditions can influence the resulting oil’s composition and fragrance profile.',
  },
  {
    q: 'Is sandalwood oil good for skin?',
    a: 'Research has identified biological activity from Santalum album oil in laboratory and human dermatological studies, including anti-inflammatory activity. However, the evidence should not be generalised into a universal skincare or veterinary treatment claim. For pet products, human dermatology evidence should be kept separate from veterinary evidence.',
  },
  {
    q: 'Is natural sandalwood the same as synthetic sandalwood?',
    a: 'No. Natural sandalwood oil is a complex botanical mixture, while synthetic sandalwood materials are individual aroma chemicals designed to reproduce particular aspects of its characteristic scent. Synthetic alternatives are widely used in perfumery because natural sandalwood can be expensive and variable.',
  },
  {
    q: 'How can you tell if sandalwood oil is authentic?',
    a: 'Ingredient identity and analytical documentation matter. GC-MS is one analytical method used to characterise sandalwood oil composition. Research has found commercial products labelled as sandalwood oil that contained other botanical oils or synthetic materials, demonstrating why provenance and testing are important. The [INCI name](/journal/reading-the-inci-list) on the label is the first place to look.',
  },
  {
    q: 'What is IFRA compliance?',
    a: 'IFRA Standards are a fragrance-industry risk-management framework that can restrict, prohibit or specify conditions for certain fragrance materials depending on their safe use. Compliance relates to the intended product category and concentration; it is not a blanket statement that an ingredient is safe in every application.',
  },
  {
    q: 'Does Furry Tail’s Santal & White Tea contain sandalwood oil?',
    a: 'Yes. The formulation specification identifies Santalum Album Wood Oil as the sandalwood component of [Santal & White Tea](/products/gentle-daily-shampoo-santal-white-tea) and specifies GC-MS documentation and IFRA Category 4 compliance for its rinse-off application. The product is part of Furry Tail’s Gentle Daily Shampoo range for dogs and cats.',
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
              Santal: a primer.
            </h1>
            <p className="text-[1.125rem] md:text-[1.25rem] font-light text-[#3B3A38]/80 leading-[1.6]">
              There are fragrances that announce themselves, and there are fragrances that stay close.
            </p>
          </header>

          {/* Hero Image */}
          <div className="max-w-[1000px] mx-auto px-6 md:px-8 mb-16 md:mb-24">
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-[#E9E2D7] overflow-hidden rounded-[2px]">
              <Image
                src={ARTICLE.image.src}
                alt={ARTICLE.image.alt}
                fill
                className="object-cover object-[center_65%]"
                priority
                sizes="(max-width: 1000px) 100vw, 1000px"
              />
            </div>
          </div>

          {/* Article Content */}
          <article className="max-w-[700px] mx-auto px-6 md:px-8 font-light text-[#3B3A38] leading-[1.8] text-[1.0625rem] space-y-8">
            <p className="text-[1.25rem] leading-[1.6]">
              Sandalwood belongs to the second category.
            </p>
            <p>
              Warm, dry, creamy and quietly persistent, it has travelled from ritual and traditional medicine into modern perfumery, skincare and personal care. But the word <em>sandalwood</em> can conceal quite a lot.
            </p>
            <p>
              There is the tree. There is the heartwood. There is the distilled oil. There are the molecules responsible for its characteristic scent. And there are synthetic materials designed to recreate parts of that scent without using the natural oil.
            </p>
            <p>
              So when a formula says sandalwood, what does that actually mean?
            </p>
            <p className="font-medium text-[1.125rem]">
              For us, that question matters. Santal is not simply a fragrance name. It is a formulation decision.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">What exactly is sandalwood?</h2>

            <div className="my-16">
              <Image
                src="/images/journal/santal-primer/img1.webp"
                alt="Close-up of the fine grain of sandalwood heartwood in soft natural light"
                width={1024}
                height={559}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            <p>
              Sandalwood oil is an aromatic essential oil obtained from sandalwood heartwood. One of the most important traditional sources is <em>Santalum album</em>, commonly known as Indian or East Indian sandalwood.
            </p>
            <p>
              Unlike many aromatic plants where the leaves or flowers provide the main fragrance material, sandalwood&rsquo;s most valuable aromatic material develops in the <strong>heartwood</strong> &ndash; the dense inner wood of the tree.
            </p>
            <p>
              The oil contains many compounds, but two of the most important are <strong>&alpha;-santalol</strong> and <strong>&beta;-santalol</strong>. Their proportions and the wider chemical profile help determine both the identity and quality of sandalwood oil.
            </p>
            <p>
              That complexity is part of what makes natural sandalwood interesting.
            </p>
            <p>
              A single molecule can reproduce a recognisable aspect of a scent. A natural essential oil is different: it is a mixture of many compounds interacting with one another.
            </p>
            <p className="font-medium">
              That is why the word <em>sandalwood</em> should not automatically be treated as a single ingredient with a single chemical profile.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">From heartwood to oil</h2>

            <div className="my-16">
              <Image
                src="/images/journal/santal-primer/img2.webp"
                alt="A copper steam-distillation still with sandalwood chips, condensing aromatic oil into a glass flask"
                width={1024}
                height={559}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            <p>
              The classic route is steam distillation.
            </p>
            <p>
              Sandalwood heartwood is reduced into smaller pieces or chips, exposed to steam, and the volatile aromatic compounds are carried with the vapour. Once condensed, the resulting mixture separates into water and aromatic oil.
            </p>
            <p>
              It is an old process, but the chemistry is surprisingly sophisticated.
            </p>
            <p>
              The quality of the resulting oil depends on factors including the botanical source, the wood itself, processing and the composition of the final oil. Research comparing commercial sandalwood oils has found substantial differences between products sold under the same broad sandalwood name. Some samples have even been found to contain other oils or synthetic materials rather than authentic <em>Santalum album</em> oil.
            </p>
            <p>
              This is where something as unglamorous as <strong>GC-MS</strong> becomes useful.
            </p>
            <p>
              Gas chromatography&ndash;mass spectrometry can help characterise the volatile components of an oil and is one of the analytical tools used to assess sandalwood oil authenticity and composition.
            </p>
            <p>
              In other words, provenance is not just a storytelling detail.
            </p>
            <p className="font-medium">
              For an ingredient like sandalwood, what it is matters.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">What does sandalwood actually do to skin?</h2>
            <p>
              This is where the conversation needs a little restraint.
            </p>
            <p>
              Sandalwood oil has a long history of topical use, and scientific research has investigated its anti-inflammatory, antimicrobial and other biological properties. A review of <em>Santalum album</em> oil describes activity across laboratory models and reports early clinical research involving several human dermatological conditions.
            </p>
            <p>
              But there is an important distinction:
            </p>
            <p className="font-medium text-[1.125rem]">
              Evidence that sandalwood oil has biological activity is not the same as evidence that a sandalwood-fragranced pet-care product treats a skin condition.
            </p>
            <p>
              Much of the dermatological research concerns human skin, concentrated sandalwood preparations, or laboratory models. It should not automatically be translated into veterinary claims &ndash; the same restraint we apply to <Link href="/journal/the-probiotic-question" className={LINK}>probiotic claims on a shampoo bottle</Link>.
            </p>
            <p>
              For everyday grooming, therefore, we think of sandalwood first as a <strong>fragrance material with a long history and an interesting chemistry</strong>, rather than turning it into a medical ingredient.
            </p>
            <p>
              That distinction is important. Good formulation starts with knowing what an ingredient is <em>for</em>.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Natural sandalwood and synthetic sandalwood are not the same thing</h2>
            <p>
              There is an understandable assumption that a product smelling of sandalwood must contain sandalwood oil.
            </p>
            <p>
              It does not.
            </p>
            <p>
              Modern perfumery has developed numerous synthetic sandalwood odourants. Materials such as Sandalore, Ebanol, Polysantol and others were developed partly because natural sandalwood oil is expensive, variable and limited in supply.
            </p>
            <p>
              This is not automatically a story about &ldquo;natural good, synthetic bad.&rdquo;
            </p>
            <p>
              Synthetic fragrance materials can offer consistency, stability, availability and useful olfactory characteristics. In some formulations, they can also reduce dependence on scarce natural materials.
            </p>
            <p>
              The more interesting question is simply:
            </p>
            <p className="font-medium text-[1.125rem]">
              Which material is being used, and why?
            </p>
            <p>
              Natural sandalwood oil carries the chemistry of the plant and its source. A synthetic sandalwood material is designed to reproduce particular facets of that smell.
            </p>
            <p>
              They can belong to the same olfactory family without being the same ingredient.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Why standards matter</h2>
            <p>
              When an ingredient is expensive and highly valued, authenticity becomes more than a philosophical concern.
            </p>
            <p>
              It becomes a quality-control concern.
            </p>
            <p>
              Research examining commercial sandalwood oils has found examples where products marketed as sandalwood oil contained <em>Amyris balsamifera</em>, synthetic mixtures or other materials rather than oil matching the expected <em>Santalum album</em> profile.
            </p>
            <p>
              This is why analytical documentation matters.
            </p>
            <p>
              It is also why fragrance safety standards matter.
            </p>
            <p>
              IFRA Standards provide a risk-management framework for fragrance ingredients, including restrictions, specifications or prohibitions where appropriate. They are not a universal declaration that an ingredient is &ldquo;safe&rdquo; in every circumstance; their application depends on the intended use and concentration.
            </p>
            <p>
              For Furry Tail, the distinction becomes practical.
            </p>
            <p>
              The locked <Link href="/products/gentle-daily-shampoo-santal-white-tea" className={LINK}>Santal &amp; White Tea</Link> formulation specifies <strong>Santalum Album Wood Oil</strong> as the sandalwood ingredient, with GC-MS documentation required and an IFRA Category 4 requirement for the rinse-off application. The formulation specification also identifies the oil as natural rather than synthetic.
            </p>
            <p className="font-medium">
              That is a much more meaningful statement than simply saying &ldquo;contains sandalwood.&rdquo;
            </p>

            <div className="my-16">
              <Image
                src="/images/journal/santal-primer/img3.webp"
                alt="Sandalwood pieces beside an amber bottle of oil, a beaker and handwritten quality-check notes on a stone surface"
                width={1024}
                height={559}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            <h2 className="text-3xl font-display mt-16 mb-6">Why we chose Santal</h2>
            <p>
              Sandalwood has a particular quality that suits the idea of Ritual.
            </p>
            <p className="font-medium">
              It is warm without being loud. Woody without becoming austere. Familiar without feeling ordinary.
            </p>
            <p>
              In <Link href="/products/gentle-daily-shampoo-santal-white-tea" className={LINK}>Santal &amp; White Tea Gentle Daily Shampoo</Link>, sandalwood forms part of the fragrance identity alongside <strong>Camellia sinensis leaf extract</strong>, the white tea component. Furry Tail&rsquo;s formulation documentation specifies Santalum Album Wood Oil at 0.05&ndash;0.1% and white tea extract at 0.1&ndash;0.3%.
            </p>
            <p>
              The purpose is not to turn a bath product into a dermatological treatment.
            </p>
            <p>
              It is to make an <Link href="/journal/the-monsoon-ritual" className="underline decoration-[#8D9A83] underline-offset-4">everyday grooming ritual</Link> feel considered &ndash; from the ingredient choice to the fragrance experience to the way the formula is documented.
            </p>
            <p>
              That philosophy sits behind the wider Furry Tail approach: <Link href="/ingredients" className={LINK}>every ingredient should have a reason for being there</Link>.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">What to look for when you see &ldquo;sandalwood&rdquo; on a label</h2>
            <p>
              A useful <Link href="/journal/reading-the-inci-list" className={LINK}>label-reading habit</Link> is to ask four simple questions:
            </p>
            <ol className="space-y-6 mt-8 list-decimal pl-5">
              <li>
                <strong>What is the actual ingredient?</strong><br />
                Look beyond the fragrance name and find the INCI or botanical identity.
              </li>
              <li>
                <strong>Is it natural sandalwood oil or a sandalwood-type fragrance material?</strong><br />
                They are not interchangeable descriptions.
              </li>
              <li>
                <strong>Is there evidence of quality control?</strong><br />
                For natural essential oils, analytical documentation such as GC-MS can be relevant to identity and composition.
              </li>
              <li>
                <strong>What is the product actually claiming?</strong><br />
                A fragrance ingredient can contribute to sensory experience without being presented as a treatment for a medical condition. We draw the same line for <Link href="/journal/ticks-fleas-and-the-indian-dog" className="underline decoration-[#8D9A83] underline-offset-4">tick and flea deterrents</Link>.
              </li>
            </ol>
            <p>
              That last distinction may be the most useful one.
            </p>
            <p>
              A sophisticated formula does not need to make an ingredient sound like a miracle.
            </p>
            <p className="font-medium">
              It needs to know what the ingredient actually is.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">The practical takeaway</h2>

            <div className="my-16">
              <Image
                src="/images/journal/santal-primer/img4.webp"
                alt="A woman gently bathing her golden retriever in a calm stone bathroom with a towel and brush beside the tub"
                width={1024}
                height={559}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            <p>
              Sandalwood is both simpler and more complicated than the label suggests.
            </p>
            <p>
              At its simplest, it is a familiar warm woody scent. At a formulation level, it is a botanical material with a complex chemical composition, a specific production route, quality considerations, safety parameters and synthetic alternatives.
            </p>
            <p>
              And for pet care, there is one more layer: <strong>human dermatology research should not automatically be translated into veterinary claims.</strong>
            </p>
            <p>
              For a product designed for <Link href="/journal/how-often-should-you-bathe-your-dog" className="underline decoration-[#8D9A83] underline-offset-4">repeated grooming</Link>, the more responsible approach is to separate fragrance, formulation and therapeutic claims &ndash; and to be precise about each. (Cats deserve particular care here: <Link href="/journal/what-we-found-in-most-pet-shampoos" className={LINK}>fragrance is a species-specific formulation question</Link>.)
            </p>
            <p>
              That is why Santal interests us.
            </p>
            <p>
              Not because sandalwood needs more mythology.
            </p>
            <p className="font-medium">
              Because it deserves better explanation.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Conclusion</h2>
            <p>
              The best ingredients often become so familiar that we stop looking closely at them.
            </p>
            <p>
              Sandalwood is worth looking at again.
            </p>
            <p>
              Behind the quiet woody note is a tree, a heartwood, a distillation process, a distinctive chemical profile and an entire world of natural and synthetic alternatives. There is tradition here, but also modern analytical science. There is fragrance, but also formulation discipline.
            </p>
            <p>
              For Furry Tail, that balance is the point.
            </p>
            <p className="font-medium text-xl italic mt-8 text-center">
              Santal is not simply about making a pet smell good. It is about understanding what we choose to put into a grooming ritual &ndash; and being able to explain why.
            </p>

            <div className="mt-16 text-center">
              <Link href="/ingredients" className="inline-flex items-center gap-2 border border-[#3B3A38] text-[#3B3A38] px-8 py-4 text-[0.75rem] font-medium tracking-[0.08em] uppercase hover:bg-[#3B3A38] hover:text-[#F8F5F1] transition-colors duration-[400ms]">
                Read more about our approach to ingredients
              </Link>
            </div>

          </article>

          <ArticleFaqs faqs={FAQS} />

          <RelatedArticles articles={getRelatedArticles(SLUG)} />
        </main>
        <Footer />
      </div>
    </ClientProviders>
  );
}
