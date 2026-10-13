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

const SLUG = 'can-i-use-human-shampoo-on-my-dog';
const ARTICLE = getArticle(SLUG);

export const metadata: Metadata = articleMetadata(SLUG);

const FAQS: Faq[] = [
  {
    q: "Can I use human shampoo on my dog?",
    a: "It isn't recommended. Human shampoos are formulated for human skin, which is more acidic than a dog's, and many use stronger cleansers and fragrance designed for people. Use a shampoo formulated for dogs.",
  },
  {
    q: "Can I use human shampoo on my dog just once?",
    a: "A single wash with a mild human shampoo is unlikely to cause lasting harm. Rinse thoroughly, dry the coat well and watch the skin for redness, flaking or itching. If irritation persists, consult your vet.",
  },
  {
    q: "Is baby shampoo safe for dogs?",
    a: "Baby shampoo is gentler than many adult shampoos, but it is still formulated for human skin. It's a better emergency option than a harsh shampoo, not a replacement for a dog shampoo.",
  },
  {
    q: "Can I use human shampoo on my cat?",
    a: "No. Cats lick their coats clean, so anything left behind is swallowed. Use a shampoo that is formulated for cats.",
  },
  {
    q: "Can I use human shampoo on my puppy?",
    a: "No. Puppies have delicate skin - use a pet shampoo, and check with your vet before bathing a puppy under 12 weeks.",
  },
  {
    q: "Is dog shampoo pH different from human shampoo?",
    a: "Yes. Human skin is mildly acidic, while canine skin generally has a higher and more variable pH. A dog shampoo should be pH-balanced for pets.",
  },
  {
    q: "Can I use dog shampoo on myself?",
    a: "Dog shampoo is formulated for canine skin and coats, not for people. Use products made for the species they are intended for.",
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
              Why Human Shampoo Doesn&rsquo;t Belong in Your Dog&rsquo;s Bath
            </h1>
            <p className="text-[1.125rem] md:text-[1.25rem] font-light text-[#3B3A38]/80 leading-[1.6]">
              It&rsquo;s the bottle that&rsquo;s already in the bathroom. That doesn&rsquo;t make it the right one.
            </p>
          </header>

          {/* Hero Image */}
          <div className="max-w-[1000px] mx-auto px-6 md:px-8 mb-16 md:mb-24">
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-[#E9E2D7] overflow-hidden rounded-[2px]">
              <Image
                src={ARTICLE.image.src}
                alt={ARTICLE.image.alt}
                fill
                className="object-cover object-[center_35%]"
                priority
                sizes="(max-width: 1000px) 100vw, 1000px"
              />
            </div>
          </div>

          {/* Article Content */}
          <article className="max-w-[700px] mx-auto px-6 md:px-8 font-light text-[#3B3A38] leading-[1.8] text-[1.0625rem] space-y-8">
            <p className="text-[1.25rem] leading-[1.6]">
              The dog is muddy, the pet shampoo has run out, and there is a perfectly good bottle of shampoo on the bathroom shelf. It&rsquo;s one of the most common grooming questions there is: <strong>can I use human shampoo on my dog?</strong>
            </p>

            <p>
              The short answer is that it&rsquo;s the wrong tool for the job. Not because one wash is an emergency, but because a shampoo is designed around the skin it&rsquo;s meant for &ndash; and a dog&rsquo;s skin is not a smaller version of ours.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Dog skin is not human skin</h2>


            <div className="my-16">
              <Image
                src="/images/journal/human-shampoo/img1.webp"
                alt="Hands gently parting a golden retriever's thick coat to check the skin underneath"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <p>
              Human skin is mildly acidic. Shampoos made for people are formulated to suit that, and to clean hair that grows very differently from a coat.
            </p>

            <p>
              Canine skin generally sits at a higher, less acidic pH, and it varies more between dogs and between areas of the body. A dog&rsquo;s outer skin layer is also thinner than ours, and a coat holds water, product and residue close to the skin in a way human hair doesn&rsquo;t.
            </p>

            <p>
              So a shampoo can be perfectly gentle <em>for people</em> and still be the wrong match for a dog. That is why a pet shampoo&rsquo;s pH and cleansing system should be formulated for the species that will use it.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">What a human shampoo is built to do</h2>



            <p>
              Most shampoos made for people are designed for a scalp that produces oil quickly and is washed often. Many rely on stronger foaming cleansers, and many are heavily fragranced, because for people a rich lather and a lasting scent signal &ldquo;clean&rdquo;.
            </p>

            <p>
              None of that is a fault &ndash; for human hair. On a dog, the same choices can mean:
            </p>

            <ul className="space-y-3 pl-5 list-disc">
              <li><strong>more cleansing than the skin needs</strong>, taking natural oils with the dirt;</li>
              <li><strong>fragrance designed for people</strong>, not for an animal that lives nose-first;</li>
              <li><strong>residue left in a dense coat</strong>, where it sits against the skin after the bath.</li>
            </ul>

            <h2 className="text-3xl font-display mt-16 mb-6">&ldquo;But it&rsquo;s baby shampoo&rdquo;</h2>



            <p>
              Baby shampoo is gentler than many adult shampoos &ndash; but it is still formulated for human skin. Gentle for a baby&rsquo;s scalp is not the same as appropriate for a dog&rsquo;s skin, or for a cat who will lick the coat afterwards. It&rsquo;s a better emergency option than a harsh shampoo, not a substitute for a dog shampoo.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">What about cats and puppies?</h2>


            <div className="my-16">
              <Image
                src="/images/journal/human-shampoo/img2.webp"
                alt="A fluffy puppy and a tabby cat each wrapped in a cream towel after a bath"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <p>
              <strong>Cats</strong> groom themselves, so whatever is left on the coat is eventually swallowed. A shampoo for a cat should be made for cats &ndash; not borrowed from a human or even a dog-only product.
            </p>

            <p>
              <strong>Puppies</strong> have delicate skin and are still getting used to handling and water. Check with your vet before bathing a puppy under 12 weeks, and use a shampoo formulated for pets.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">I already used it once. Is my dog OK?</h2>



            <p>
              In most cases, a single wash with a mild human shampoo is not a crisis. Rinse the coat thoroughly, dry it well, and watch the skin over the next few days. If you notice redness, flaking, itching or scratching that persists, speak to your vet.
            </p>

            <p>
              The aim isn&rsquo;t to panic about one bath. It&rsquo;s to avoid making a mismatched product part of the routine.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">What to look for in a dog shampoo instead</h2>



            <p>
              Turn the bottle around and read the formula, not just the front label. A good everyday dog shampoo should be:
            </p>

            <ol className="space-y-4 mt-6 list-decimal pl-5">
              <li><strong>Made for dogs</strong> &ndash; and for cats too, if you&rsquo;ll use it on a cat.</li>
              <li><strong>pH-balanced for pets</strong>, not for people.</li>
              <li><strong>Mild in how it cleans</strong> &ndash; without sulphates that strip the skin barrier.</li>
              <li><strong>Clear about its ingredients</strong>, with a full INCI list on the pack (<Link href="/journal/reading-the-inci-list" className={LINK}>here&rsquo;s how to read one</Link>).</li>
              <li><strong>Honest about fragrance and preservation</strong> &ndash; what&rsquo;s in it, and what&rsquo;s been left out.</li>
            </ol>

            <p>
              Furrytail&rsquo;s <Link href="/products/gentle-daily-shampoo-santal-white-tea" className={LINK}>Gentle Daily Shampoo</Link> is built that way: a sensitive-skin, pH-balanced formulation for dogs and cats, cleansed with amino acid-derived surfactants instead of sulphates and preserved with probiotics instead of synthetic preservatives. Expect less lather than a human shampoo &ndash; that&rsquo;s the point: sulphates make foam, and foam was never the measure of clean.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">The takeaway</h2>


            <div className="my-16">
              <Image
                src="/images/journal/human-shampoo/img3.webp"
                alt="A freshly bathed golden retriever resting on a woven rug in a sunlit living room"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <p>
              Human shampoo isn&rsquo;t poison, and one bath with it isn&rsquo;t a disaster. But it is made for human skin &ndash; its pH, its cleansers and its fragrance all start from a different place.
            </p>

            <p>
              Your dog&rsquo;s bath deserves a formula made for your dog. And <Link href="/journal/how-often-should-you-bathe-your-dog" className={LINK}>how often</Link> you use it matters just as much as what&rsquo;s in the bottle.
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
