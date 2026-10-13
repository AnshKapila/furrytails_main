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

const SLUG = 'can-you-bathe-a-cat';
const ARTICLE = getArticle(SLUG);

export const metadata: Metadata = articleMetadata(SLUG);

const FAQS: Faq[] = [
  {
    q: "Can you bathe a cat?",
    a: "Yes, but most healthy cats rarely need it because they groom themselves. Baths are most useful for long-haired, older or less mobile cats, or a cat that has got into something.",
  },
  {
    q: "How often should I bathe my cat?",
    a: "Most short-haired cats rarely need a bath. Long-haired cats such as Persians may need an occasional bath if the coat becomes greasy. Regular brushing matters more than bathing.",
  },
  {
    q: "Can I use dog shampoo on my cat?",
    a: "Only if the shampoo is formulated for cats too. Many dog products aren't made for cats, who lick their coats clean.",
  },
  {
    q: "How do I clean my cat without a bath?",
    a: "Brush regularly, use a damp cloth for small spots, and use a waterless dry shampoo made for cats for a wider refresh.",
  },
  {
    q: "How do I groom a Persian cat at home?",
    a: "Comb daily down to the skin with a wide-toothed metal comb, wipe around the eyes gently, keep the rear end clean with a sanitary trim, and bathe occasionally with a cat-safe shampoo, drying the coat thoroughly afterwards.",
  },
  {
    q: "How do I bathe a cat that hates water?",
    a: "Keep it short and calm, use only a few centimetres of lukewarm water in a basin, keep water off the face, and rinse thoroughly. If your cat is very distressed, use a waterless dry shampoo instead.",
  },
  {
    q: "Why has my cat stopped grooming?",
    a: "A cat that stops grooming may be unwell, in pain, overweight or stressed. If you notice a greasy, matted or patchy coat, see your vet.",
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
              Can You Bathe a Cat? Cat Grooming at Home
            </h1>
            <p className="text-[1.125rem] md:text-[1.25rem] font-light text-[#3B3A38]/80 leading-[1.6]">
              Most cats keep themselves beautifully clean. Some need a little help.
            </p>
          </header>

          {/* Hero Image */}
          <div className="max-w-[1000px] mx-auto px-6 md:px-8 mb-16 md:mb-24">
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-[#E9E2D7] overflow-hidden rounded-[2px]">
              <Image
                src={ARTICLE.image.src}
                alt={ARTICLE.image.alt}
                fill
                className="object-cover object-[center_85%]"
                priority
                sizes="(max-width: 1000px) 100vw, 1000px"
              />
            </div>
          </div>

          {/* Article Content */}
          <article className="max-w-[700px] mx-auto px-6 md:px-8 font-light text-[#3B3A38] leading-[1.8] text-[1.0625rem] space-y-8">
            <p className="text-[1.25rem] leading-[1.6]">
              Cats spend a remarkable part of their day grooming. Their rough tongues work like a comb, and most healthy, short-haired cats rarely &ndash; if ever &ndash; need a bath.
            </p>

            <p>
              So, can you bathe a cat? Yes. The better question is <strong>when does your cat actually need one</strong> &ndash; and how to do it without stress for either of you.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">When a cat might need a bath</h2>



            <ul className="space-y-3 pl-5 list-disc">
              <li><strong>Long-haired cats</strong>, such as Persians, whose coats can get greasy or matted.</li>
              <li><strong>Older, overweight or less mobile cats</strong> who can&rsquo;t reach every part of their body to groom.</li>
              <li>A cat that has <strong>got into something</strong> &ndash; oil, something sticky, or something that shouldn&rsquo;t be licked off.</li>
              <li>When your <strong>vet recommends</strong> it for a specific reason.</li>
            </ul>

            <p>
              For most other cats, regular brushing does more good than bathing.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Brushing comes first</h2>


            <div className="my-16">
              <Image
                src="/images/journal/cat-grooming/img1.webp"
                alt="A ginger tabby cat on a soft towel being gently wiped with a damp cloth"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <ul className="space-y-3 pl-5 list-disc">
              <li><strong>Short-haired cats:</strong> brush once or twice a week with a soft brush or grooming glove.</li>
              <li><strong>Long-haired cats:</strong> brush and comb <strong>daily</strong> to prevent mats, especially behind the ears, under the legs and on the belly.</li>
              <li>Brushing removes loose hair, which means <strong>fewer hairballs</strong>, and lets you spot skin changes, fleas or lumps early.</li>
            </ul>

            <h2 className="text-3xl font-display mt-16 mb-6">Grooming a Persian or long-haired cat</h2>



            <p>
              Persians have a long, fine double coat and a flat face, so they need more help than most cats:
            </p>

            <ul className="space-y-3 pl-5 list-disc">
              <li><strong>Comb daily</strong> with a wide-toothed metal comb, working down to the skin. Leave tight mats to a groomer or vet &ndash; don&rsquo;t cut them out yourself near the skin.</li>
              <li><strong>Wipe around the eyes</strong> gently with a soft, damp cloth; Persian eyes often water.</li>
              <li><strong>Keep the rear end clean</strong> &ndash; a tidy &ldquo;sanitary trim&rdquo; from a groomer helps.</li>
              <li><strong>Bathe occasionally</strong> if the coat becomes greasy, followed by very thorough drying.</li>
            </ul>

            <h2 className="text-3xl font-display mt-16 mb-6">How to bathe a cat calmly</h2>


            <div className="my-16">
              <Image
                src="/images/journal/cat-grooming/img2.webp"
                alt="A long-haired cat being gently bathed in a shallow basin of water"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <ol className="space-y-4 mt-6 list-decimal pl-5">
              <li><strong>Brush first.</strong> Remove tangles and loose hair before any water.</li>
              <li><strong>Prepare everything</strong> &ndash; towels, a cat shampoo, a jug, a non-slip mat &ndash; before you bring your cat in.</li>
              <li><strong>Use a shallow basin or sink</strong> with a few centimetres of <strong>lukewarm</strong> water. Never a full tub.</li>
              <li><strong>Wet the body gently</strong> with a jug or cup, keeping water away from the face, eyes and ears.</li>
              <li><strong>Use a small amount of a cat-safe shampoo</strong> and lather lightly.</li>
              <li><strong>Rinse thoroughly</strong> &ndash; cats lick off whatever is left on the coat.</li>
              <li><strong>Wipe the face</strong> with a damp cloth instead of shampoo.</li>
              <li><strong>Towel-dry and keep your cat warm</strong> until the coat is completely dry.</li>
            </ol>

            <p>
              Keep it short, stay calm and speak softly. If your cat is very distressed, stop &ndash; a waterless clean is better than a frightening bath.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Which shampoo is safe for cats?</h2>



            <p>
              Only a shampoo that is <strong>formulated for cats</strong> &ndash; not <Link href="/journal/can-i-use-human-shampoo-on-my-dog" className={LINK}>human shampoo</Link>, and not a dog shampoo unless it&rsquo;s made for cats too. Because cats lick their coats clean, what&rsquo;s in the bottle matters even more. (<Link href="/journal/reading-the-inci-list" className={LINK}>How to read the ingredient list.</Link>)
            </p>

            <p>
              Furrytail&rsquo;s <Link href="/products/gentle-daily-shampoo-violet-leaf-muslin" className={LINK}>Gentle Daily Shampoo</Link> is made for dogs and cats: a sensitive-skin, pH-balanced formulation cleansed with amino acid-derived surfactants and preserved with probiotics. Lather slowly, take extra care around the face, and rinse until the water runs clean.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Cleaning a cat without a bath</h2>


            <div className="my-16">
              <Image
                src="/images/journal/cat-grooming/img3.webp"
                alt="A cat wrapped in a soft cream towel on a bathroom counter after a bath"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <p>
              For cats who hate water &ndash; which is most cats &ndash; a <strong>waterless dry shampoo</strong> is often the kinder option. Furrytail&rsquo;s <Link href="/products/dry-foam-shampoo" className={LINK}>Dry Foam Shampoo</Link> is made for dogs and cats and is a no-rinse, leave-on safe formula:
            </p>

            <ol className="space-y-4 mt-6 list-decimal pl-5">
              <li>Shake well and apply a little foam to the coat, avoiding the eyes.</li>
              <li>Massage it through gently with your hands or a soft brush.</li>
              <li>Let it dry &ndash; no rinsing, no towelling.</li>
            </ol>

            <p>
              For small spots, a soft, damp cloth is often all you need. More in <Link href="/journal/dry-bath-vs-wet-bath-for-dogs" className={LINK}>dry bath vs. wet bath</Link>.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">When grooming isn&rsquo;t the answer</h2>



            <p>
              A cat who <strong>stops grooming</strong>, grooms one area obsessively, or has a greasy, matted or patchy coat may be unwell, in pain or stressed. Hair loss, scabs, itching or a change in grooming habits are reasons to see your vet.
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
