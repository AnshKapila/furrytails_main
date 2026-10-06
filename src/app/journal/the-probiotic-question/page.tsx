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

const SLUG = 'the-probiotic-question';
const ARTICLE = getArticle(SLUG);

export const metadata: Metadata = articleMetadata(SLUG);

const FAQS: Faq[] = [
  {
    q: "What does probiotic mean in pet shampoo?",
    a: "“Probiotic” traditionally refers to live microorganisms administered in adequate amounts to provide a health benefit. In pet shampoo, however, the term can be used in different ways. Some products contain live microorganisms, while others use fermentation-derived ingredients as part of their formulation. The specific ingredient, intended function and evidence should always be examined rather than assuming every probiotic-labelled shampoo works the same way.",
  },
  {
    q: "Are probiotic shampoos good for dogs?",
    a: "The answer depends on what the product means by “probiotic” and what benefit it claims. Research into topical probiotics and canine skin conditions is promising but still limited, and recent evidence has not established a universal clinical benefit for canine atopic dermatitis. A probiotic-labelled shampoo should therefore not automatically be considered a treatment for a skin condition.",
  },
  {
    q: "Are probiotics in shampoo the same as oral probiotics?",
    a: "No. Oral probiotics are administered through the gastrointestinal route, while a topical product interacts with the skin and is usually rinsed away. The microorganism, dose, delivery method and intended outcome can therefore be completely different. Evidence that supports a particular oral probiotic does not automatically prove that the same organism or concept works when applied in a shampoo.",
  },
  {
    q: "What is Leuconostoc/Radish Root Ferment Filtrate?",
    a: "Leuconostoc/Radish Root Ferment Filtrate is a fermentation-derived cosmetic ingredient used in Furry Tail’s [Gentle Daily Shampoo](/products/gentle-daily-shampoo-santal-white-tea) as part of its preservation system. The current formulation lists it as Leuconostoc/Radish Root Ferment Filtrate (Leucidal Liquid). It should be understood in that formulation context rather than automatically equated with a therapeutic live probiotic treatment.",
  },
  {
    q: "Does probiotic shampoo restore a dog’s skin microbiome?",
    a: "That is a stronger claim than the current evidence supports universally. The skin microbiome is a genuine biological ecosystem and topical probiotics are being studied, but results vary by microorganism, formulation, condition and study design. A 2025 systematic review of canine atopic dermatitis found no statistically significant overall effect from probiotic interventions on the measured disease scores.",
  },
  {
    q: "Is probiotic shampoo suitable for cats?",
    a: "It depends entirely on the individual product and formulation. A product designed for dogs should not automatically be assumed suitable for cats. Furry Tail’s current Gentle Daily Shampoo is specifically labelled for [dogs and cats](/products/gentle-daily-shampoo-santal-white-tea), but species eligibility should always be checked product by product.",
  },
  {
    q: "Do pets need probiotic shampoo?",
    a: "Not necessarily. [Routine grooming](/journal/how-often-should-you-bathe-your-dog) and therapeutic skin care are different questions. Probiotic products may be relevant in particular formulations or circumstances, but there is no universal requirement for healthy dogs or cats to use probiotic shampoo. Persistent itching, redness, lesions, odour or other skin changes warrant veterinary assessment rather than relying on a grooming product alone. The same goes for [ticks and fleas](/journal/ticks-fleas-and-the-indian-dog) and for [skin problems that recur through the monsoon](/journal/the-monsoon-ritual).",
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
              <span>Ingredients</span>
              <span className="w-1 h-1 rounded-full bg-[#E9E2D7]" />
              <span>{ARTICLE.readTime}</span>
              <span className="w-1 h-1 rounded-full bg-[#E9E2D7]" />
              <time dateTime={ARTICLE.datePublished}>{formatArticleDate(ARTICLE.datePublished)}</time>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#3B3A38] leading-[1.1] mb-8 font-display">
              The probiotic question.
            </h1>
            <p className="text-[1.125rem] md:text-[1.25rem] font-light text-[#3B3A38]/80 leading-[1.6]">
              Leuconostoc/Radish Root Ferment Filtrate, the skin microbiome, and why the most defensible claim on a shampoo bottle is usually the narrowest one.
            </p>
          </header>

          {/* Hero Image */}
          <div className="max-w-[1000px] mx-auto px-6 md:px-8 mb-16 md:mb-24">
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-[#E9E2D7] overflow-hidden rounded-[2px]">
              <Image
                src="/images/journal/probiotic-question/main.webp"
                alt="A golden retriever beside a veterinarian, with a gut microbiome analysis chart and magnified bacteria on screen"
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
              There is something reassuring about the word probiotic.
            </p>
            <p>
              We have learned to associate it with balance, good bacteria and a healthier microbiome. It appears on yoghurt, supplements, functional foods and increasingly on pet-care products.
            </p>
            <p>
              Now it is appearing on shampoo bottles.
            </p>
            <p>
              But there is a useful question hiding behind the word:<br />
              What exactly is the probiotic doing?
            </p>
            <p>
              That question matters because &ldquo;probiotic&rdquo; does not describe one universal ingredient or one universal benefit. In veterinary nutrition, probiotics generally refer to live microorganisms administered in adequate amounts to provide a health benefit. Research in dogs and cats has explored their relationship with the gut microbiome, gastrointestinal health and, more recently, skin. But the evidence remains strain-, dose- and condition-specific.
            </p>
            <p className="font-medium text-[1.125rem]">
              A shampoo raises an entirely different formulation question.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">First, what is a probiotic?</h2>
            <p>
              The simplest definition is also the most useful.
            </p>
            <p>
              A probiotic is a live microorganism that, when administered in an adequate amount, provides a health benefit to the host. That definition matters because not every fermented ingredient, bacterial extract or &ldquo;microbiome&rdquo; product automatically qualifies as a probiotic.
            </p>
            <p>
              And not all probiotics are interchangeable.
            </p>
            <p>
              A particular bacterial strain can behave differently from another. The dose matters. The route of administration matters. The condition being addressed matters.
            </p>
            <p>
              Research into dogs and cats has found potential benefits from some probiotic preparations, particularly around gastrointestinal health, but reviews also highlight substantial uncertainty around which strains work, at what dose and for which animals or conditions.
            </p>
            <p className="font-medium">
              So when you see the word probiotic, the next question should be:<br />
              Which one, doing what, and how?
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">The gut microbiome is not the skin microbiome</h2>

            <div className="my-16">
              <Image
                src="/images/journal/probiotic-question/img1.webp"
                alt="Illustration of a dog in profile with its internal microbial community rendered as a soft translucent bloom"
                width={1024}
                height={765}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            <p>
              This distinction is easy to miss.
            </p>
            <p>
              Most of the probiotic conversation in pet health has historically centred on the gut. Dogs and cats have complex gastrointestinal microbial communities, and researchers have spent years investigating how diet, disease, antibiotics and probiotic supplementation can influence them.
            </p>
            <p>
              The skin has its own microbial ecosystem.
            </p>
            <p>
              That has made topical probiotics an interesting area of research. But &ldquo;interesting&rdquo; is not the same as &ldquo;settled&rdquo;.
            </p>
            <p>
              A systematic review of topical probiotics found evidence worth investigating, while also highlighting the need for more research. More recently, a systematic review and meta-analysis of probiotics as an adjunct for canine atopic dermatitis found no statistically significant improvement across the measured disease scores, despite reductions being observed across the included trials.
            </p>
            <p>
              In other words:<br />
              The skin microbiome is real. The possibility of influencing it is real. The clinical claims are still more complicated.
            </p>
            <p className="font-medium">
              That distinction is worth keeping.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Then there is the preservation question</h2>

            <div className="my-16">
              <Image
                src="/images/journal/probiotic-question/img2.webp"
                alt="An amber bottle and a small glass vessel of ferment filtrate on a linen cloth beside dried botanicals"
                width={1024}
                height={572}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            <p>
              This is where the conversation becomes particularly interesting for formulation.
            </p>
            <p>
              A shampoo contains water. Water-containing products need an appropriate strategy for controlling unwanted microbial growth and remaining stable throughout their intended shelf life.
            </p>
            <p>
              That makes preservation a formulation requirement - not simply an ingredient category to be removed because &ldquo;preservative-free&rdquo; sounds better.
            </p>
            <p>
              Furry Tail takes a different route here.
            </p>
            <p>
              Its <Link href="/products/gentle-daily-shampoo-santal-white-tea" className="underline decoration-[#8D9A83] underline-offset-4">Gentle Daily Shampoo</Link> uses <Link href="/ingredients" className="underline decoration-[#8D9A83] underline-offset-4">Leuconostoc/Radish Root Ferment Filtrate</Link>, described in the supplied formulation material as a probiotic ferment used as part of the preservation system. The current product label lists the ingredient as Leuconostoc/Radish Root Ferment Filtrate (Leucidal Liquid).
            </p>
            <p>
              This is an important distinction.
            </p>
            <p>
              The ingredient is being used as part of the formula&rsquo;s preservation architecture.
            </p>
            <p>
              That is not the same claim as saying that washing a dog with the shampoo delivers a therapeutic dose of live probiotics to the skin.
            </p>
            <p className="font-medium">
              The bottle deserves a more precise reading than that.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Fermentation is not a synonym for live bacteria</h2>
            <p>
              Fermented ingredients have become increasingly familiar in personal care.
            </p>
            <p>
              But &ldquo;fermented&rdquo;, &ldquo;probiotic&rdquo;, &ldquo;postbiotic&rdquo; and &ldquo;microbiome-friendly&rdquo; are not interchangeable terms.
            </p>
            <p>
              A fermentation-derived ingredient can contain metabolites, components or filtrates produced through fermentation. A product can also use microorganisms as part of a manufacturing or preservation process without functioning like an oral probiotic supplement.
            </p>
            <p>
              That distinction is particularly important because some probiotic products are designed around living organisms, while others use non-living microbial components or fermentation-derived materials.
            </p>
            <p>
              The science is developing quickly, but terminology should not move faster than evidence.
            </p>
            <p className="font-medium">
              For a reader, the useful habit is simple:<br />
              Read the ingredient. Then read the function. Then read the claim.
            </p>
            <p>
              If those three things line up, the label starts to make sense.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">So what does the Furry Tail &ldquo;probiotic&rdquo; mean?</h2>
            <p>
              For Furry Tail, it is primarily a formulation decision.
            </p>
            <p>
              The Gentle Daily Shampoo preservation system uses Leuconostoc/Radish Root Ferment Filtrate rather than the synthetic preservatives excluded from the current formula. The label also identifies the shampoo as suitable for dogs and cats.
            </p>
            <p>
              The important point is not that conventional preservatives are inherently bad.
            </p>
            <p>
              It is that preservation systems can be designed differently.
            </p>
            <p>
              Furry Tail&rsquo;s formulation philosophy is to choose the preservation approach deliberately rather than defaulting to conventional synthetic preservatives. The brand&rsquo;s own formulation material describes the probiotic culture as part of that preservation strategy.
            </p>
            <p>
              That is a narrower - and more defensible - proposition than saying the shampoo &ldquo;restores the microbiome&rdquo;.
            </p>
            <p className="font-medium">
              We would not make that leap.<br />
              There is no need to.
            </p>

            <div className="my-16">
              <Image
                src="/images/journal/probiotic-question/img3.webp"
                alt="A shopper reading the small print on the back of a product bottle in a store aisle"
                width={1408}
                height={768}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            <h2 className="text-3xl font-display mt-16 mb-6">What should you ask when you see &ldquo;probiotic&rdquo; on a pet product?</h2>
            <p>
              Start with five questions.
            </p>
            <ol className="space-y-6 mt-8 list-decimal pl-5">
              <li>
                <strong>Is it actually a live microorganism?</strong><br />
                If so, which strain?
              </li>
              <li>
                <strong>What is the intended benefit?</strong><br />
                Gut health, skin health, preservation or something else?
              </li>
              <li>
                <strong>Is there evidence for that specific use?</strong><br />
                Evidence for an oral probiotic does not automatically establish evidence for a shampoo.
              </li>
              <li>
                <strong>What is the delivery system?</strong><br />
                Something swallowed, left on the skin or rinsed away presents very different biological questions.
              </li>
              <li>
                <strong>Is the claim appropriate for the species?</strong><br />
                Dogs and cats should not automatically be treated as interchangeable.
              </li>
            </ol>
            <p>
              This last point is particularly important in grooming. <Link href="/#thoughtfully-formulated" className="underline decoration-[#8D9A83] underline-offset-4">Our approach to formulation</Link> explicitly considers species eligibility, <Link href="/journal/what-we-found-in-most-pet-shampoos" className="underline decoration-[#8D9A83] underline-offset-4">surfactant type and concentration</Link>, <Link href="/journal/santal-a-primer" className="underline decoration-[#8D9A83] underline-offset-4">fragrance sensitivities</Link> and pH management before a formula is finalised.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">The interesting part is what we don&rsquo;t know yet</h2>
            <p>
              There is a tendency in modern pet care to turn every new scientific idea into a finished marketing claim.
            </p>
            <p>
              Microbiome science is especially vulnerable to this.
            </p>
            <p>
              We know microbial communities matter. We know they interact with their host. We know diet, disease, medication and environment can influence them. We also know probiotics can have effects in some circumstances.
            </p>
            <p>
              But the next step - therefore this particular shampoo restores your pet&rsquo;s microbiome - requires evidence.
            </p>
            <p>
              The current research does not justify treating every probiotic-labelled product as equivalent. Veterinary reviews continue to call for better-defined strains, outcomes, dosing and clinical studies.
            </p>
            <p className="font-medium text-lg text-center my-10 italic">
              That uncertainty is not a weakness in the science.<br />
              It is simply where the science is.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">A better way to read the word</h2>
            <p>
              Perhaps the most useful thing about &ldquo;probiotic&rdquo; is not the promise attached to it.
            </p>
            <p>
              It is the question it makes us ask.
            </p>

            <div className="my-16 p-8 bg-[#F0EBE4] border border-[#E9E2D7] rounded-[2px]">
              <h3 className="text-2xl font-display mb-4">Four questions for any probiotic claim</h3>
              <ul className="list-disc pl-5 space-y-2 text-[#3B3A38]/80">
                <li><strong>What organism?</strong> - named strain, or a fermentation-derived material?</li>
                <li><strong>What function?</strong> - therapeutic benefit, or part of the preservation system?</li>
                <li><strong>What evidence?</strong> - for this route, this species, this condition?</li>
                <li><strong>What formulation?</strong> - left on the skin, or rinsed away?</li>
              </ul>
            </div>

            <p>
              In Furry Tail&rsquo;s case, the answer is unusually specific: Leuconostoc/Radish Root Ferment Filtrate is part of the preservation system in the Gentle Daily Shampoo.
            </p>
            <p>
              That does not need to become a grander claim.
            </p>
            <p>
              Good formulation rarely needs one.
            </p>
            <p>
              The better habit is to turn the bottle around, read the <Link href="/journal/reading-the-inci-list" className="underline decoration-[#8D9A83] underline-offset-4">INCI list</Link> and ask what each ingredient is actually there to do.
            </p>
            <p>
              <Link href="/ingredients" className="underline decoration-[#8D9A83] underline-offset-4">Every ingredient has a name and a reason</Link>.
            </p>

            <div className="my-16">
              <Image
                src="/images/journal/probiotic-question/img4.webp"
                alt="A golden retriever resting on a linen throw in a calm, sunlit room"
                width={1024}
                height={572}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            <p className="font-medium text-xl italic mt-8 text-center">
              That is where the probiotic question becomes a formulation question.
            </p>

            <div className="mt-16 text-center">
              <Link href="/journal" className="inline-flex items-center gap-2 border border-[#3B3A38] text-[#3B3A38] px-8 py-4 text-[0.75rem] font-medium tracking-[0.08em] uppercase hover:bg-[#3B3A38] hover:text-[#F8F5F1] transition-colors duration-[400ms]">
                Explore the Journal
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
