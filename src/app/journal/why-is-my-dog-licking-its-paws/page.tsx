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

const SLUG = 'why-is-my-dog-licking-its-paws';
const ARTICLE = getArticle(SLUG);

export const metadata: Metadata = articleMetadata(SLUG);

const FAQS: Faq[] = [
  {
    q: "Why is my dog licking its paws so much?",
    a: "Common reasons include dirt or something stuck in the paw, moisture between the toes, allergies, parasites, skin infections, pain, or boredom and stress. Persistent licking is a sign to look more closely and, if it continues, to see your vet.",
  },
  {
    q: "Is it normal for dogs to lick their paws?",
    a: "A little licking to groom, especially after a walk, is normal. Long or constant licking, staining, redness, swelling, smell or limping is not.",
  },
  {
    q: "Why is my dog licking its paws after a walk?",
    a: "Often it's simple cleaning, or a reaction to dirt, grit or moisture picked up outside. Cleaning and drying the paws after every walk helps. If it continues or one paw is the focus, check for an injury or something stuck.",
  },
  {
    q: "What does it mean when a dog licks only one paw?",
    a: "Licking focused on one paw often points to something local - a cut, a cracked pad, a split nail or something stuck between the toes. Check carefully and see your vet if you can't find the cause.",
  },
  {
    q: "What does reddish-brown fur between my dog's toes mean?",
    a: "That staining usually comes from saliva and is a sign of frequent licking. It's worth finding out why your dog is licking that much.",
  },
  {
    q: "Can I put coconut oil or cream on my dog's paws?",
    a: "Avoid putting human creams or home remedies on your dog's paws - dogs lick them off, and they don't treat the cause. Ask your vet what's suitable.",
  },
  {
    q: "When should I take my dog to the vet for paw licking?",
    a: "If the licking lasts more than a few days, keeps coming back, or comes with redness, swelling, sores, discharge, smell, limping or itching elsewhere on the body.",
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
              Why Is My Dog Licking Its Paws?
            </h1>
            <p className="text-[1.125rem] md:text-[1.25rem] font-light text-[#3B3A38]/80 leading-[1.6]">
              A little licking is grooming. A lot of licking is a message.
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
              Every dog licks its paws sometimes. It&rsquo;s part of how they groom, especially after a walk or a meal. But when the licking becomes constant &ndash; at night, after every walk, until the fur turns reddish-brown &ndash; it&rsquo;s worth paying attention.
            </p>

            <p>
              Paw licking isn&rsquo;t a diagnosis. It&rsquo;s a sign. The job is to work out what it&rsquo;s a sign <em>of</em>.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Normal grooming vs too much licking</h2>



            <p>
              <strong>Usually normal:</strong> a few minutes of licking after a walk or nap, on clean, healthy-looking paws, with no limping or change in behaviour.
            </p>

            <p>
              <strong>Worth a closer look:</strong>
            </p>

            <ul className="space-y-3 pl-5 list-disc">
              <li>licking or chewing that goes on for long stretches, or wakes your dog at night;</li>
              <li><strong>rust-brown staining</strong> on light-coloured fur between the toes (from saliva);</li>
              <li><strong>red, swollen or moist</strong> skin between the toes or around the pads;</li>
              <li>a <strong>smell</strong> from the paws;</li>
              <li><strong>limping</strong>, flinching when you touch a paw, or favouring one leg;</li>
              <li>licking that focuses on <strong>one paw</strong> rather than all four.</li>
            </ul>

            <h2 className="text-3xl font-display mt-16 mb-6">Common reasons dogs lick their paws</h2>



            <h3 className="text-2xl [font-family:var(--font-cormorant),Georgia,serif] font-light mt-10 mb-4">Something on or in the paw</h3>

            <p>
              Dirt, mud, grit, grass seeds, a splinter, a cut or a cracked pad can all set off licking &ndash; especially if it&rsquo;s one paw and it started suddenly after a walk.
            </p>

            <h3 className="text-2xl [font-family:var(--font-cormorant),Georgia,serif] font-light mt-10 mb-4">Moisture between the toes</h3>

            <p>
              Paws that stay damp after monsoon walks or baths can become irritated, and licking keeps them wet &ndash; a loop that&rsquo;s easy to start and hard to stop. This is one of the most common, and most preventable, triggers in Indian cities.
            </p>

            <h3 className="text-2xl [font-family:var(--font-cormorant),Georgia,serif] font-light mt-10 mb-4">Allergies</h3>

            <p>
              Environmental allergies (to things like pollen, grass or dust mites) and food allergies often show up as itchy paws, often alongside itchy ears, belly or armpits.
            </p>

            <h3 className="text-2xl [font-family:var(--font-cormorant),Georgia,serif] font-light mt-10 mb-4">Parasites</h3>

            <p>
              Fleas, mites and ticks can cause itching that dogs relieve by licking and chewing. See <Link href="/journal/ticks-fleas-and-the-indian-dog" className={LINK}>ticks, fleas and the Indian dog</Link>.
            </p>

            <h3 className="text-2xl [font-family:var(--font-cormorant),Georgia,serif] font-light mt-10 mb-4">Skin infections</h3>

            <p>
              Yeast and bacterial infections between the toes often bring redness, a greasy feel and a distinctive smell. They need a vet, not a home remedy.
            </p>

            <h3 className="text-2xl [font-family:var(--font-cormorant),Georgia,serif] font-light mt-10 mb-4">Pain, boredom or stress</h3>

            <p>
              Dogs sometimes lick a paw because a joint or nail hurts, and some lick out of boredom or anxiety, the way people bite their nails.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">What to check at home</h2>


            <div className="my-16">
              <Image
                src="/images/journal/paw-licking/img1.webp"
                alt="Hands gently spreading a dog’s toes to inspect the paw pads and fur between them"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <ol className="space-y-4 mt-6 list-decimal pl-5">
              <li><strong>Look between the toes and pads</strong> in good light. Gently spread the toes.</li>
              <li><strong>Check for anything stuck</strong> &ndash; seeds, grit, a thorn &ndash; and any cut, crack or swelling.</li>
              <li><strong>Check the nails</strong> &ndash; a split or overgrown nail can hurt.</li>
              <li><strong>Notice the pattern</strong> &ndash; one paw or all four? After walks? At night? With other itching?</li>
            </ol>

            <p>
              If something is deeply embedded, don&rsquo;t dig at it &ndash; see your vet.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">How to keep paws clean and dry</h2>


            <div className="my-16">
              <Image
                src="/images/journal/paw-licking/img2.webp"
                alt="Drying a golden retriever’s paws with a soft towel indoors after a rainy walk"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <ul className="space-y-3 pl-5 list-disc">
              <li><strong>Clean the paws after every walk.</strong> A no-rinse <Link href="/products/paw-cleaner" className={LINK}>Paw Cleaner</Link> at the door lifts surface grit and residue without water.</li>
              <li><strong>Dry between the toes</strong> &ndash; especially in monsoon and after baths.</li>
              <li><strong>Keep the fur between the pads trimmed</strong> so it holds less mud and moisture.</li>
              <li><strong>Avoid human creams and home remedies</strong> on the paws &ndash; your dog will lick them off.</li>
            </ul>

            <p>
              More in <Link href="/journal/paw-cleaner-for-dogs-post-walk-paw-care" className={LINK}>the paw problem</Link> and <Link href="/journal/the-monsoon-ritual" className={LINK}>the monsoon ritual</Link>.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">When to see your vet</h2>


            <div className="my-16">
              <Image
                src="/images/journal/paw-licking/img3.webp"
                alt="A veterinarian examining a dog’s front paw at home while its owner looks on"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <p>
              Cleaning and drying help with dirt and moisture &ndash; they don&rsquo;t treat allergies, infections or injuries. See your vet if the licking:
            </p>

            <ul className="space-y-3 pl-5 list-disc">
              <li>lasts more than a few days or keeps coming back;</li>
              <li>comes with redness, swelling, sores, discharge or a smell;</li>
              <li>causes limping or pain;</li>
              <li>is focused on one paw and you can&rsquo;t find the cause;</li>
              <li>comes with itching elsewhere &ndash; ears, belly, armpits.</li>
            </ul>

            <h2 className="text-3xl font-display mt-16 mb-6">The takeaway</h2>



            <p>
              A dog licking its paws after a walk is grooming. A dog licking its paws all evening is telling you something.
            </p>

            <p>
              Look first, clean and dry what you can, and let your vet handle what grooming can&rsquo;t.
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
