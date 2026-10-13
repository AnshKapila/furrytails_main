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

const SLUG = 'what-does-natural-mean-in-pet-care';
const ARTICLE = getArticle(SLUG);

export const metadata: Metadata = articleMetadata(SLUG);

const FAQS: Faq[] = [
  {
    q: 'Is natural dog shampoo safer than regular shampoo?',
    a: 'Not automatically. Ingredient origin alone cannot establish safety. The formulation, ingredient identity, concentration, intended use and individual dog’s sensitivities all matter. A natural-origin claim can describe an ingredient’s origin under a defined framework, but it does not independently prove that the finished shampoo is safer than alternatives.',
  },
  {
    q: 'What does natural origin mean in pet care?',
    a: 'It describes the origin of ingredients according to a particular definition or framework. Some ingredients are obtained directly from natural sources, while others are processed or derived from natural raw materials. Because brands may use the word differently, look for a clearly defined claim and supporting information rather than relying on the word alone.',
  },
  {
    q: 'What is the Natural Origin Index?',
    a: 'Under ISO 16128-2, the Natural Origin Index is a calculated measure based on ingredient characterisation and the standard’s methodology. It helps quantify natural-origin contribution; it is not a rating of safety, efficacy or overall product quality. A high index should not be interpreted as proof that a product is hypoallergenic or suitable for every animal.',
  },
  {
    q: 'Does ISO 16128-2 certify that a product is safe?',
    a: 'No. ISO 16128-2 provides a framework for calculating natural, natural-origin, organic and organic-origin indexes. The standard does not assess human or environmental safety, clinical efficacy or every applicable regulatory requirement. Product safety and other performance claims need their own appropriate evidence.',
  },
  {
    q: 'Are synthetic ingredients bad for dogs?',
    a: 'No. “Synthetic” describes an aspect of how an ingredient is produced; it does not automatically determine whether it is safe or unsuitable. The relevant questions concern its identity, concentration, purpose, exposure and use in the finished product. The same principle applies to ingredients obtained from natural sources.',
  },
  {
    q: 'Can natural ingredients irritate a dog’s skin?',
    a: 'Yes. Some naturally occurring substances can irritate skin or trigger adverse reactions, depending on the substance, concentration and exposure. Essential oils are one example for which veterinary poison-control guidance recommends caution, particularly with concentrated products. Natural origin should not be used as a substitute for appropriate product selection.',
  },
  {
    q: 'What should I look for in a natural dog shampoo?',
    a: 'Read the [ingredient list](/journal/reading-the-inci-list), check the intended use, understand the product’s claims and follow its directions. Consider whether the formulation is appropriate for your dog’s species and individual circumstances. If your dog has persistent itching, redness or other skin concerns, seek veterinary advice rather than assuming that a natural-labelled product will resolve the problem.',
  },
  {
    q: 'Does a 99.5% Natural Origin Index mean a product has no synthetic ingredients?',
    a: 'No. The index should be interpreted according to the ISO 16128-2 framework and the ingredient characterisation used in its calculation. It is not equivalent to a blanket “no synthetic ingredients” claim. It also does not establish product safety, hypoallergenicity or clinical performance.',
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
              What Does &ldquo;Natural&rdquo; Actually Mean in Pet Care?
              <span className="block mt-4 text-[0.875rem] md:text-[0.9375rem] [font-family:var(--font-inter),Inter,sans-serif] font-normal tracking-[0.06em] uppercase text-[#8D9A83] leading-[1.4]">
                Natural dog shampoo, ingredient origin and ISO 16128-2
              </span>
            </h1>
            <p className="text-[1.125rem] md:text-[1.25rem] font-light text-[#3B3A38]/80 leading-[1.6]">
              The word natural sounds reassuring. But ingredient origin is only one part of the formulation story.
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
              There is a particular comfort in the word <em>natural</em>. It suggests something familiar, uncomplicated and closer to the world as it was meant to be. On a bottle of dog shampoo, it can feel like a useful shortcut: natural must mean gentler, perhaps safer, perhaps better.
            </p>
            <p>
              But formulation is rarely that simple.
            </p>
            <p>
              A natural ingredient can irritate. A synthetic ingredient can serve a useful, well-understood purpose. And a product containing ingredients of natural origin can still vary considerably in its quality, suitability and performance.
            </p>
            <p>
              When choosing a <strong>natural dog shampoo</strong> or another pet-care product, the more useful question is not simply how natural it is. It is what the ingredients are, why they are there, how the formulation is designed to work and whether the finished product is appropriate for the animal it is intended for.
            </p>
            <p className="font-medium text-[1.125rem]">
              The label is a starting point, not a verdict.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">What does &ldquo;natural&rdquo; actually mean?</h2>

            <div className="my-16">
              <Image
                src="/images/journal/what-natural-means/img1.webp"
                alt="Close-up of raw botanical materials – a leaf with water droplets, seeds, a dried pod, roots and white flowers"
                width={1432}
                height={955}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            <p>
              In everyday language, natural usually suggests that an ingredient comes from plants, animals, minerals or other sources found in nature. In formulation, however, the distinction between <em>natural</em>, <em>naturally derived</em> and <em>synthetic</em> can be more complicated.
            </p>
            <p>
              An ingredient may be extracted directly from a botanical source. Another may begin with a natural raw material and undergo processing or chemical transformation. A third may be manufactured through a synthetic route.
            </p>
            <p>
              These descriptions tell us something about origin and production. They do not, on their own, establish the ingredient&rsquo;s safety or performance.
            </p>
            <p>
              There is also no single universal consumer definition of &ldquo;natural&rdquo; that applies across every market and product category. For example, the US Food and Drug Administration says it has not established a regulatory definition of &ldquo;natural&rdquo; for cosmetics. That is useful context, but it should not be mistaken for a statement of Indian law.
            </p>
            <p className="font-medium">
              For a pet parent reading a label, the practical lesson is straightforward: ask what the claim means for that particular product.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Natural versus synthetic: a false choice?</h2>
            <p>
              The debate often presents natural and synthetic ingredients as opposing camps: one desirable, the other suspect.
            </p>
            <p>
              Chemistry does not divide so neatly.
            </p>
            <p>
              An ingredient&rsquo;s identity, concentration, impurities, route of exposure and intended use can all influence how it behaves. The source of an ingredient does not independently establish whether it will be safe in a finished formulation.
            </p>
            <p>
              Consider fragrance. A botanical essential oil may contain many naturally occurring compounds, some of which can irritate or be harmful at certain concentrations or through particular forms of exposure. The ASPCA cautions that concentrated essential oils can pose risks to pets and that species, formulation and exposure matter. (We looked at one fragrance ingredient in detail in <Link href="/journal/santal-a-primer" className={LINK}>Santal: a primer</Link>.)
            </p>
            <p>
              That does not mean botanical ingredients should be dismissed. Nor does it mean synthetic ingredients are automatically preferable.
            </p>
            <p>
              It means neither category deserves a blanket endorsement.
            </p>
            <p className="font-medium text-[1.125rem]">
              A better formulation question is: what does this ingredient contribute, at what concentration, and is the finished product appropriate for its intended use?
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">The ingredient is only part of the formulation</h2>

            <div className="my-16">
              <Image
                src="/images/journal/what-natural-means/img2.webp"
                alt="A formulation bench with beakers, a flask holding a botanical sprig, test tubes, a pipette and a lab notebook"
                width={1432}
                height={955}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            <p>
              An ingredient list is useful, but it is not the entire formulation.
            </p>
            <p>
              A shampoo is a system. Its cleansing agents, conditioning components, preservatives, fragrance and other ingredients work together in a particular concentration and product format. The same ingredient can behave differently depending on what surrounds it and how the product is used.
            </p>
            <p>
              This is why judging a dog shampoo by one ingredient &ndash; or by the number of botanical names on its label &ndash; can be misleading. It is the same pattern we described in <Link href="/journal/what-we-found-in-most-pet-shampoos" className={LINK}>what we found in most pet shampoos</Link>.
            </p>
            <p>
              Preservatives, for example, are not automatically undesirable simply because they are synthetic. In water-containing products, preservation can be an important part of controlling microbial contamination. Whether a preservative system is appropriate depends on the formulation, the intended use and suitable safety and quality controls.
            </p>
            <p>
              Likewise, a plant-derived ingredient is not automatically beneficial just because it sounds familiar.
            </p>
            <p>
              A thoughtful label review asks three questions:
            </p>
            <ul className="space-y-4 pl-5 list-disc">
              <li><strong>Purpose:</strong> What role does each ingredient play?</li>
              <li><strong>Context:</strong> How does it function within the finished formulation?</li>
              <li><strong>Evidence:</strong> What supports the product&rsquo;s claims and intended use?</li>
            </ul>
            <p className="font-medium">
              The objective is not to memorise every chemical name. It is to understand why a formulation contains what it does.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">What does the Natural Origin Index mean?</h2>
            <p>
              This is where a technical measure can be more useful than a vague adjective.
            </p>
            <p>
              <strong>ISO 16128-2:2017</strong> provides approaches for calculating natural, natural-origin, organic and organic-origin indexes for cosmetic ingredients and products, based on ingredient characterisation. It works alongside <strong>ISO 16128-1</strong>, which defines the relevant ingredient categories.
            </p>
            <p>
              A Natural Origin Index is a way of quantifying natural-origin contribution under that framework. It is not a universal score for how good a product is.
            </p>
            <p>
              Furry Tail&rsquo;s approved product claim is:
            </p>
            <p className="font-medium text-[1.125rem] text-center">
              99.5% Natural Origin Index per ISO 16128-2
            </p>
            <p>
              The wording matters. It refers to a Natural Origin Index under a specified technical framework &ndash; not an unrestricted statement that the product is &ldquo;99.5% natural&rdquo; in every possible sense.
            </p>
            <p>
              It is also important to understand what the index does not establish.
            </p>
            <p>
              It is not, by itself, a safety certification, veterinary approval, clinical efficacy result or proof that a product is hypoallergenic. It does not guarantee suitability for every dog or cat, establish that the formulation is gentler than every alternative, or prove that the product contains no synthetic ingredients.
            </p>
            <p>
              ISO itself states that the 16128 framework does not address human or environmental safety, product communication, socio-economic considerations or applicable regulatory requirements.
            </p>
            <p className="font-medium">
              A percentage can answer a specific question about ingredient origin. It cannot answer every question a consumer might have about a product.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">What should you look for on a pet-care label?</h2>

            <div className="my-16">
              <Image
                src="/images/journal/what-natural-means/img3.webp"
                alt="A magnifying glass over a printed shampoo ingredient list beside a notebook of formulation notes"
                width={1432}
                height={955}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            <p>
              Start with the actual ingredient list rather than the front-of-pack promise.
            </p>
            <p>
              Ingredient nomenclature can look technical because it is designed to identify ingredients, not necessarily to tell a consumer the whole story in familiar language. Learning to recognise common ingredient names is useful &ndash; <Link href="/journal/reading-the-inci-list" className={LINK}>reading the INCI list</Link> is a good place to start &ndash; but unfamiliar terminology is not evidence of danger.
            </p>
            <p>
              Next, look at the product&rsquo;s intended use. A rinse-off shampoo, a leave-on spray and a concentrated essential oil do not create identical exposure conditions. A formulation appropriate for one use cannot automatically be assumed appropriate for another.
            </p>
            <p>
              Species matters, too. Dogs and cats do not always respond to the same substances in the same way. A product intended for dogs should not be assumed suitable for cats unless its documentation explicitly supports that use.
            </p>
            <p>
              Finally, consider the claims. &ldquo;Natural origin,&rdquo; &ldquo;hypoallergenic,&rdquo; &ldquo;dermatologically tested&rdquo; and &ldquo;veterinarian approved&rdquo; are not interchangeable phrases. Each requires its own definition and supporting evidence. A natural-origin calculation does not substantiate unrelated claims about clinical outcomes or suitability for sensitive skin.
            </p>
            <p className="font-medium">
              If your dog has a persistent skin problem, recurrent irritation or a known sensitivity, an ingredient list alone cannot identify the cause. Veterinary advice is more appropriate than selecting a product solely because it is labelled natural.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">A more considered way to formulate</h2>

            <div className="my-16">
              <Image
                src="/images/journal/what-natural-means/img4.webp"
                alt="A Furrytail Remedy Paw Cleaner foam bottle labelled 99.5% natural origin, beside spearmint and an amber glass flask"
                width={1432}
                height={955}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            <p>
              At Furry Tail, the useful question is not how many ingredients can be described as natural. It is whether the formulation has a clear purpose and whether its claims can be explained responsibly.
            </p>
            <p>
              That means treating ingredient transparency as more than a decorative list on packaging. It means distinguishing origin from function, formulation rationale from clinical evidence, and a technical index from a safety guarantee.
            </p>
            <p>
              The same discipline applies when assessing products from any brand &ndash; including our own, from the <Link href="/products/paw-cleaner" className={LINK}>Remedy Paw Cleaner</Link> to <Link href="/products/gentle-daily-shampoo-santal-white-tea" className={LINK}>Ritual &ndash; Gentle Daily Shampoo</Link>.
            </p>
            <p>
              A high Natural Origin Index can tell you something meaningful within its defined framework. It should not be asked to tell you everything.
            </p>
            <p>
              The next time you reach for a natural dog shampoo, look beyond the adjective. Read the ingredients. Understand the intended use. Ask what supports the claims.
            </p>
            <p className="font-medium text-xl italic mt-8 text-center">
              Good formulation is not a contest between nature and chemistry. It is the considered use of ingredients, for a defined purpose, in a product designed for the animal that will use it.
            </p>

            <div className="mt-16 text-center">
              <Link href="/ingredients" className="inline-flex items-center gap-2 border border-[#3B3A38] text-[#3B3A38] px-8 py-4 text-[0.75rem] font-medium tracking-[0.08em] uppercase hover:bg-[#3B3A38] hover:text-[#F8F5F1] transition-colors duration-[400ms]">
                Explore The Standard
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
