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

const SLUG = 'reading-the-inci-list';
const ARTICLE = getArticle(SLUG);

export const metadata: Metadata = articleMetadata(SLUG);

const FAQS: Faq[] = [
  {
    q: "What does INCI mean on a pet-care product?",
    a: "INCI stands for International Nomenclature of Cosmetic Ingredients. It is a standardised system for identifying cosmetic ingredients. An INCI name tells you how an ingredient is formally identified on a label; it does not by itself mean that the ingredient is approved, safe in every use, or appropriate for every species.",
  },
  {
    q: "Are ingredients listed from highest to lowest concentration?",
    a: "Generally, yes, under major cosmetic labelling systems. However, there are important exceptions. In the US and EU frameworks, ingredients at or below 1% can generally appear in a different order after the ingredients above that threshold. Therefore, the beginning of a list is more informative about relative prominence than the final few ingredients.",
  },
  {
    q: "Does a chemical-sounding ingredient mean it is harmful?",
    a: "No. Chemical names often sound unfamiliar simply because they are technical names. Safety depends on the ingredient’s identity, concentration, exposure, formulation and intended use. An unfamiliar name should prompt investigation, not an automatic verdict.",
  },
  {
    q: "Are natural ingredients always safer for dogs and cats?",
    a: "No. “Natural” describes origin, not automatically safety. Concentrated essential oils, for example, can cause toxic effects in animals, and cats are particularly sensitive to some exposures. The appropriate question is how an ingredient is formulated, at what concentration, and for which species.",
  },
  {
    q: "What should I look for in a dog shampoo ingredient list?",
    a: "Look at the [cleansing ingredients](/journal/what-we-found-in-most-pet-shampoos), conditioning or humectant components, preservatives, fragrance and botanical ingredients. Then check the intended use and directions. Avoid judging the product solely by whether the names sound natural or synthetic; formulation context matters more than vocabulary.",
  },
  {
    q: "What does “parfum” or “fragrance” mean on an ingredient list?",
    a: "Fragrance can represent a fragrance composition rather than one single substance. Labelling conventions vary by jurisdiction, and some fragrance components may need to be identified individually under applicable rules. The EU, for example, has specific requirements for certain fragrance allergens above defined thresholds.",
  },
  {
    q: "Are essential oils safe for cats?",
    a: "Essential oils deserve particular caution around cats. Veterinary references note that cats can be especially vulnerable because of differences in metabolism, and exposure can occur through skin, ingestion or inhalation. Concentrated essential oils should not be directly applied to pets unless specifically directed by an appropriate veterinary professional.",
  },
  {
    q: "Is a shorter ingredient list automatically better?",
    a: "Not necessarily. A finished formula needs ingredients that perform different functions, including cleansing, stability, [preservation](/journal/the-probiotic-question) and sensory properties. A short list can be useful, but ingredient count alone does not tell you whether a formulation is well designed.",
  },
];

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
              <span>Guide</span>
              <span className="w-1 h-1 rounded-full bg-[#E9E2D7]" />
              <span>{ARTICLE.readTime}</span>
              <span className="w-1 h-1 rounded-full bg-[#E9E2D7]" />
              <time dateTime={ARTICLE.datePublished}>{formatArticleDate(ARTICLE.datePublished)}</time>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#3B3A38] leading-[1.1] mb-8 font-display">
              Reading the INCI list.
            </h1>
            <p className="text-[1.125rem] md:text-[1.25rem] font-light text-[#3B3A38]/80 leading-[1.6]">
              The front tells you the story. The back tells you the formulation.
            </p>
          </header>

          {/* Hero Image */}
          <div className="max-w-[1000px] mx-auto px-6 md:px-8 mb-16 md:mb-24">
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-[#E9E2D7] overflow-hidden rounded-[2px]">
              <Image
                src="/images/journal/reading-inci-list/main.webp"
                alt="A person reading the ingredient list printed on a botanical skincare label"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1000px) 100vw, 1000px"
              />
            </div>
          </div>

          {/* Article Content */}
          <article className="max-w-[700px] mx-auto px-6 md:px-8 font-light text-[#3B3A38] leading-[1.8] text-[1.0625rem] space-y-8">
            <p className="text-[1.25rem] leading-[1.6]">
              There is a particular kind of label fatigue that happens in the bathroom.
            </p>
            <p>
              You turn the bottle around and encounter a paragraph of names: <em>Aqua. Glycerin. Something ending in -ate. A botanical Latin name. A preservative. Parfum.</em>
            </p>
            <p>
              It can look deliberately complicated.
            </p>
            <p>
              But an ingredient list isn&rsquo;t really a secret code. <strong>INCI &ndash; International Nomenclature of Cosmetic Ingredients &ndash; is a standardised naming system used to identify cosmetic ingredients.</strong> It exists precisely so an ingredient can be identified consistently rather than changing names from one market or manufacturer to another. Importantly, an INCI name is a name, not a safety certificate. Its presence does not mean an ingredient has been approved or is automatically safe in every use.
            </p>
            <p>
              Once you understand that distinction, reading a label becomes much more interesting.
            </p>
            <p>
              You don&rsquo;t need to recognise every name.
            </p>
            <p className="font-medium text-[1.125rem]">
              You need to understand what role an ingredient plays, where it appears in the formula, and what the finished product is actually claiming to do.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">1. First, understand what INCI actually means</h2>
            <p>
              INCI stands for <strong>International Nomenclature of Cosmetic Ingredients</strong>.
            </p>
            <p>
              It is a standardised system for naming ingredients used in cosmetic and personal-care products. Botanical ingredients commonly appear using Latin botanical names, while other materials have standardised names based on their chemical or technical identity.
            </p>

            <div className="my-16">
              <Image
                src="/images/journal/reading-inci-list/img1.webp"
                alt="Furry Tail Anti-Tick & Flea Spray packaging showing its full INCI ingredient list alongside a What's In It and What's Out Of It panel"
                width={1254}
                height={1254}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            <p>
              This is why a label may say something like:
            </p>
            <p className="font-medium text-center">
              Camellia Sinensis Leaf Extract
            </p>
            <p>
              rather than simply:
            </p>
            <p className="font-medium text-center">
              Green Tea
            </p>
            <p>
              Both refer to the same botanical source, but the first tells you something more precise about how the ingredient is identified on the label.
            </p>
            <p>
              The important point is this:
            </p>
            <p className="font-medium">
              A complicated name is not automatically a bad ingredient.
            </p>
            <p>
              And the reverse is equally important:
            </p>
            <p className="font-medium">
              A familiar or natural-sounding name is not automatically a good one.
            </p>
            <p>
              The name tells you <em>what something is called</em>. The formulation tells you <em>why it is there and how it is being used</em>.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">2. Read the list from the beginning - but don&rsquo;t overinterpret it</h2>
            <p>
              Ingredient lists are generally arranged in descending order of predominance under major cosmetic labelling frameworks. In the US, for example, ingredients are generally listed from highest to lowest concentration, with an important exception: ingredients present at 1% or less can be listed in any order after those above 1%.
            </p>
            <p>
              That gives you a useful first principle:
            </p>
            <p className="font-medium text-[1.125rem]">
              The beginning of the list tells you more about the bulk of the formula than the end does.
            </p>
            <p>
              If water is first, water is a major component.
            </p>
            <p>
              If a surfactant appears near the beginning, it is likely playing a substantial role in cleansing.
            </p>
            <p>
              But don&rsquo;t turn ingredient order into a concentration calculator.
            </p>
            <p>
              Once you reach the lower-concentration portion of the formula, the order may no longer tell you precisely which ingredient is present at a higher concentration than another. Different jurisdictions also have their own detailed labelling rules.
            </p>
            <p>
              So the ingredient list is a <strong>map</strong>, not a laboratory report.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">3. Learn the jobs, not hundreds of names</h2>

            <div className="my-16">
              <Image
                src="/images/journal/reading-inci-list/img2.webp"
                alt="A dropper of concentrated formulation liquid held above an amber glass bottle"
                width={1000}
                height={1000}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            <p>
              You don&rsquo;t need to memorise an ingredient dictionary.
            </p>
            <p>
              Start by recognising the broad jobs ingredients perform.
            </p>

            <h3 className="text-xl font-medium mt-10 mb-3">Surfactants</h3>
            <p>
              These are the cleansing agents.
            </p>
            <p>
              They help water interact with oils, dirt and other substances so they can be removed during washing.
            </p>
            <p>
              Different surfactants have <Link href="/journal/what-we-found-in-most-pet-shampoos" className="underline decoration-[#8D9A83] underline-offset-4">different properties</Link>, and a formulation can combine several of them to achieve a particular cleansing experience.
            </p>
            <p>
              So seeing a technical surfactant name isn&rsquo;t a reason to panic.
            </p>
            <p>
              The better question is:
            </p>
            <p className="font-medium">
              What cleansing system has the formulator built?
            </p>

            <h3 className="text-xl font-medium mt-10 mb-3">Humectants</h3>
            <p>
              Ingredients such as glycerin are commonly used as humectants - materials that help attract and retain water.
            </p>

            <h3 className="text-xl font-medium mt-10 mb-3">Thickeners and stabilisers</h3>
            <p>
              These help determine texture, viscosity and physical stability.
            </p>
            <p>
              A shampoo needs to remain a shampoo from the first pump to the last.
            </p>

            <h3 className="text-xl font-medium mt-10 mb-3">Preservatives</h3>
            <p>
              Water-containing products need protection against microbial growth. (We look at one alternative preservation approach in <Link href="/journal/the-probiotic-question" className="underline decoration-[#8D9A83] underline-offset-4">the probiotic question</Link>.)
            </p>
            <p>
              This is one reason the idea that a product should contain &ldquo;nothing chemical&rdquo; doesn&rsquo;t really make formulation sense. A well-designed formula needs ingredients for stability as well as sensory performance.
            </p>

            <h3 className="text-xl font-medium mt-10 mb-3">Botanical extracts</h3>
            <p>
              These can provide a variety of formulation purposes, but their presence should not automatically be interpreted as proof of a therapeutic effect.
            </p>
            <p>
              A plant name on a label is not a medical claim. The same applies to <Link href="/journal/ticks-fleas-and-the-indian-dog" className="underline decoration-[#8D9A83] underline-offset-4">anti-tick and flea claims</Link>: read what the formula is actually designed to do.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">4. The ingredient you recognise may not tell the whole story</h2>
            <p>
              This is where label literacy becomes more interesting.
            </p>
            <p>
              Imagine seeing:
            </p>
            <p className="font-medium">
              Green tea extract.
            </p>
            <p>
              That sounds simple.
            </p>
            <p>
              But what matters is the actual botanical identity, the part of the plant used, the extraction method, concentration, formulation environment and intended purpose.
            </p>
            <p>
              The same principle applies to fragrance.
            </p>
            <p>
              &ldquo;Natural&rdquo; does not mean that an ingredient is automatically appropriate for every animal or every application.
            </p>
            <p>
              Essential oils are a particularly important example. Veterinary toxicology sources note that concentrated essential oils can cause problems through ingestion, skin exposure or inhalation, and cats are particularly vulnerable to some essential-oil exposures.
            </p>
            <p>
              So when reading a pet-care label, don&rsquo;t ask only:
            </p>
            <p className="font-medium">
              &ldquo;Is this natural?&rdquo;
            </p>
            <p>
              Ask:
            </p>
            <p className="font-medium">
              &ldquo;What is it, at what concentration, in what formulation, for which species, and how is the product intended to be used?&rdquo;
            </p>
            <p>
              That is a much more useful question.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">5. Don&rsquo;t build a blacklist from unfamiliar words</h2>
            <p>
              The internet has made ingredient lists strangely emotional.
            </p>
            <p>
              One month, a particular preservative is the villain. The next month, a surfactant is. Then everything with a chemical-sounding name becomes suspect.
            </p>
            <p>
              This is not how formulation science works.
            </p>
            <p>
              An ingredient&rsquo;s safety depends on factors including its identity, concentration, route and duration of exposure, formulation and intended use.
            </p>
            <p>
              The Cosmetic Ingredient Review, for example, evaluates ingredients using available scientific evidence and considers factors such as composition, concentration, dermal exposure, irritation and sensitisation. It reviews <strong>ingredients rather than finished products</strong>.
            </p>
            <p>
              That distinction matters.
            </p>
            <p>
              An ingredient cannot be evaluated properly by its name alone.
            </p>
            <p>
              And a finished pet shampoo cannot be judged simply by counting how many ingredients sound &ldquo;natural.&rdquo;
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">6. What should you actually look for?</h2>
            <p>
              A good label-reading habit is to ask five questions.
            </p>
            <ol className="space-y-6 mt-8 list-decimal pl-5">
              <li>
                <strong>What is the ingredient?</strong><br />
                Look beyond the marketing name and identify the actual declared ingredient.
              </li>
              <li>
                <strong>What is its role?</strong><br />
                Is it cleansing, preserving, thickening, conditioning, fragrancing or something else?
              </li>
              <li>
                <strong>Where does it appear?</strong><br />
                The position gives you useful information about relative prominence, particularly near the beginning of the list.
              </li>
              <li>
                <strong>Is the claim supported by the formula?</strong><br />
                If the front says botanical, natural, gentle or fragrance-led, look at the back and see what the formula actually contains.
              </li>
              <li>
                <strong>Is it appropriate for my animal?</strong><br />
                This is perhaps the most important question in pet care.
              </li>
            </ol>
            <p>
              Dogs and cats are not simply small versions of humans.
            </p>
            <p>
              Cats also groom themselves extensively, which can create an additional ingestion route for substances present on their coat. Veterinary references specifically warn about essential-oil exposure in cats and dogs.
            </p>
            <p>
              The label should therefore be read alongside the <strong>species, directions and intended use</strong>.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">7. The front of the bottle is the invitation. The back is the conversation.</h2>
            <p>
              This is perhaps the simplest way to think about an INCI list.
            </p>
            <p>
              The front tells you the story the brand wants you to notice.
            </p>
            <p>
              The ingredient list tells you how the product was constructed.
            </p>
            <p>
              Neither should be read in isolation.
            </p>
            <p>
              At Furry Tail, this is the thinking behind <Link href="/ingredients" className="underline decoration-[#8D9A83] underline-offset-4"><strong>The Standard</strong></Link>: ingredients should have a reason for being there, and formulation decisions should be explainable rather than hidden behind marketing language.
            </p>
            <p>
              That doesn&rsquo;t mean a shorter ingredient list is automatically better.
            </p>
            <p>
              It means a thoughtful formula should make sense.
            </p>
            <p>
              Take Furry Tail&rsquo;s <Link href="/products/gentle-daily-shampoo-santal-white-tea" className="underline decoration-[#8D9A83] underline-offset-4">Santal &amp; White Tea Gentle Daily Shampoo</Link>. The fragrance story begins with Santal, but the formulation conversation is larger than the name on the front. The product&rsquo;s documented formulation includes <strong>Santalum Album Wood Oil</strong> and <strong>Camellia Sinensis Leaf Extract</strong>, with defined formulation ranges and documentation requirements including GC-MS for the sandalwood oil and IFRA Category 4 compliance for its rinse-off fragrance application.
            </p>
            <p>
              That is the difference between saying an ingredient is present and being able to explain <strong>why it is present and how it is controlled</strong>. (We go deeper on that ingredient in <Link href="/journal/santal-a-primer" className="underline decoration-[#8D9A83] underline-offset-4">Santal: a primer</Link>.)
            </p>

            <div className="my-16">
              <Image
                src="/images/journal/reading-inci-list/img3.webp"
                alt="Two shoppers reading the ingredient panel on a product label together in a store"
                width={1430}
                height={953}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            <h2 className="text-3xl font-display mt-16 mb-6">Practical takeaway</h2>
            <p>
              Next time you pick up a pet-care product, don&rsquo;t try to decode the entire label in thirty seconds.
            </p>
            <p>
              Instead:
            </p>
            <p className="font-medium">Read the first five or six ingredients.</p>
            <p className="font-medium">Identify the cleansing system.</p>
            <p className="font-medium">Look for preservatives and fragrance.</p>
            <p className="font-medium">Understand the botanical names rather than fearing them.</p>
            <p className="font-medium">Check the intended species and directions &ndash; and use the product <Link href="/journal/how-often-should-you-bathe-your-dog" className="underline decoration-[#8D9A83] underline-offset-4">only as often as your dog actually needs</Link>, <Link href="/journal/the-monsoon-ritual" className="underline decoration-[#8D9A83] underline-offset-4">monsoon included</Link>.</p>
            <p className="font-medium">Treat &ldquo;natural&rdquo; as a description, not a safety verdict.</p>
            <p>
              And if your pet has a known allergy, skin condition or unusual reaction, take the complete product label to your veterinarian rather than trying to diagnose the problem from an ingredient list.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">The label is worth reading</h2>
            <p>
              An INCI list is not designed to impress you.
            </p>
            <p>
              At its best, it is there to tell you what is actually inside the bottle.
            </p>
            <p>
              You don&rsquo;t need a chemistry degree to read it. You need a little curiosity and a willingness to look past the front label.
            </p>
            <p>
              Because thoughtful pet care begins with a deceptively simple question:
            </p>
            <p className="font-medium text-xl italic mt-8 text-center">
              What exactly are we putting on them?
            </p>

            <div className="mt-16 text-center">
              <Link href="/ingredients" className="inline-flex items-center gap-2 border border-[#3B3A38] text-[#3B3A38] px-8 py-4 text-[0.75rem] font-medium tracking-[0.08em] uppercase hover:bg-[#3B3A38] hover:text-[#F8F5F1] transition-colors duration-[400ms]">
                Read more about The Standard
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
