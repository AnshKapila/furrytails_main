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

const SLUG = 'travelling-with-your-pet-waterless-essentials';
const ARTICLE = getArticle(SLUG);

export const metadata: Metadata = articleMetadata(SLUG);

const FAQS: Faq[] = [
  {
    q: "What should I pack when travelling with my dog?",
    a: "Your dog's usual food and water bowl, bedding, lead and ID tag, plus a small grooming kit: a waterless dry shampoo, a no-rinse paw cleaner, a tick and flea repellent for new trails, a coat mist, a microfibre towel and a soft brush.",
  },
  {
    q: "How do I keep my dog clean while travelling?",
    a: "Clean only what needs it, where you are: a no-rinse paw cleaner at every pit stop, a waterless dry foam shampoo when the coat gets messy, and a light coat mist on arrival. Save full baths for home.",
  },
  {
    q: "Can I use dry shampoo on my dog while travelling?",
    a: "Yes. Furrytail's Dry Foam Shampoo is a no-rinse, leave-on safe foam for dogs and cats in a 100 ml bottle: apply 4–6 sprays, massage through and let it dry in 60–90 seconds.",
  },
  {
    q: "How do I protect my dog from ticks on holiday?",
    a: "Check the coat after walks in grass and on trails, especially around the ears, neck and between the toes, and use a tick and flea repellent before walks in new places. Defense is applied before the walk and left to dry.",
  },
  {
    q: "Which travel products are safe for cats?",
    a: "The Dry Foam Shampoo is made for dogs and cats. The Paw Cleaner, Defense spray and Refreshing Mist are for dogs only.",
  },
  {
    q: "How do I keep my dog's paws clean on a road trip?",
    a: "Clean them at every pit stop before your dog gets back in the car: pump a little no-rinse paw cleaner onto each paw or a damp cloth, massage between the pads and wipe clean.",
  },
  {
    q: "How do I stop my dog smelling of the car after a long drive?",
    a: "A light coat mist freshens a clean coat on arrival. If the coat itself is oily or stale, use a waterless dry foam shampoo instead of a fragrance.",
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
              Travelling With Your Pet? Pack These Waterless Essentials
            </h1>
            <p className="text-[1.125rem] md:text-[1.25rem] font-light text-[#3B3A38]/80 leading-[1.6]">
              Four waterless essentials keep your pet clean, fresh and protected on any trip, with no tub, no hose and no rinse.
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
              The festive season is here, and more of us are packing the car for Diwali at home, a long weekend in the hills or a December escape to Goa. More and more, the dog comes too. Travel is wonderful together, but it is hard on a grooming routine. There is mud at the rest stop, dust on the highway, a damp coat after a rainy walk, and a hotel room that wants a clean pet on its bedsheets.
            </p>

            <p>
              This guide covers what to pack, when to use each product and how to keep bath-day calm going while you are away. Browse all four on our <Link href="/travel-essentials" className={LINK}>travel essentials</Link> page.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Why waterless care belongs in your travel bag</h2>



            <p>
              A full bath on the road is rarely practical. Hotel bathrooms are not built for a wet Labrador, and a coat that stays damp in a cold car or an air-conditioned room is uncomfortable for your pet.
            </p>

            <p>
              Waterless care solves the in-between moments. You clean only what needs cleaning, right where you are, and you are done in minutes. It also keeps the routine familiar. The same scents and the same gentle touch help your pet feel at home, even when home is a hundred kilometres behind you.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">1. Dry Foam Shampoo: a bath without the bath</h2>


            <div className="my-16">
              <Image
                src="/ingredient-hinoki-bamboo.webp"
                alt="Furrytail Remedy Dry Foam Shampoo in Hinoki & Bamboo beside cut bamboo and a hinoki cypress branch"
                width={1000}
                height={1000}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <p>
              Our <Link href="/products/dry-foam-shampoo" className={LINK}>Dry Foam Shampoo</Link> is the closest thing to bath day you can carry in a backpack. Shake well, hold it 15 cm from the coat and apply 4&ndash;6 sprays from neck to tail. Massage it gently through with your hands or a soft brush and allow 60&ndash;90 seconds to dry. No water, no rinse, no towelling.
            </p>

            <p>
              It is made for dogs and cats, and it comes in a 100 ml bottle that tucks into any bag. The Hinoki &amp; Bamboo scent is clean and woody &ndash; hinoki cypress and fresh bamboo, the scent of a Japanese bathhouse &ndash; a quiet reminder of home after a long day on the road.
            </p>

            <p>
              <strong>Use it when:</strong> your pet rolls in something on a hike, the coat smells of the car after a long drive, or you want them fresh before meeting family.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">2. Paw Cleaner: clean paws before every car ride</h2>


            <div className="my-16">
              <Image
                src="/images/journal/travel/img1.webp"
                alt="A man wiping his dog's paw at a roadside pit stop before it hops back into the car"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <p>
              Paws carry the whole trip with them: highway dust, wet mud, sand from the beach and whatever is on the hotel lobby floor. Our no-rinse <Link href="/products/paw-cleaner" className={LINK}>Paw Cleaner</Link> lifts it away before it reaches your car seats or bedsheets.
            </p>

            <p>
              Pump a small amount onto each paw or onto a damp cloth, massage gently across each pad and between the toes, then wipe clean with a damp cloth or towel. One pump, thirty seconds, done. The Spearmint &amp; Sea Salt scent feels crisp and fresh. It comes in a 150 ml bottle and is made for dogs.
            </p>

            <p>
              <strong>Use it when:</strong> your dog gets back in the car after a pit stop, comes in from a walk, or is about to settle on the bed.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">3. Defense: protection for new trails</h2>


            <div className="my-16">
              <Image
                src="/images/journal/travel/img3.webp"
                alt="A woman walking her labrador on a misty pine-forest trail at a hill station"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <p>
              A new place means new grass, new trails and new parks. <Link href="/products/anti-tick-flea-spray" className={LINK}>Defense Anti-Tick &amp; Flea Spray</Link> is our pre-walk protection. It helps deter ticks and fleas before your dog heads out, with vetiver and cypress &ndash; no permethrin, no synthetic pyrethroids, no DEET, no fipronil.
            </p>

            <p>
              Shake well, hold it 20 cm from the coat and apply 6&ndash;8 sprays across the back, flanks and base of the tail, avoiding the eyes and mouth. Let it dry completely before walking. Make it part of your pre-walk routine, like grabbing the leash. It is made for dogs only, in a 100 ml bottle.
            </p>

            <p>
              <strong>Use it when:</strong> you are exploring a hill-station trail, a farmhouse lawn or any park your dog has not walked before. (<Link href="/journal/ticks-fleas-and-the-indian-dog" className={LINK}>More on ticks and travel-season walks.</Link>)
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">4. Refreshing Mist: fresh between washes</h2>


            <div className="my-16">
              <Image
                src="/images/journal/travel/img2.webp"
                alt="A clean beagle resting on its own blanket at the foot of a hotel bed"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <p>
              Hours in a car can leave even the cleanest dog smelling of the journey. Our <Link href="/products/refreshing-mist" className={LINK}>Refreshing Mist</Link> &ndash; yuzu and ambrette seed musk &ndash; freshens the coat in seconds, so your dog is ready for the next cuddle, photo or family hello.
            </p>

            <p>
              Hold it 25 cm from the coat and apply 3&ndash;5 sprays over the back and flanks. Let it settle naturally &ndash; don&rsquo;t rub it in; it dries into the coat within seconds. Avoid the eyes and mouth. It is made for dogs, in a 100 ml bottle.
            </p>

            <p>
              <strong>Use it when:</strong> you arrive somewhere new, wake up in the hotel, or want a quick refresh before dinner.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">A simple travel-day routine</h2>



            <p>
              Use all four together and a travel day takes care of itself:
            </p>

            <ol className="space-y-4 mt-6 list-decimal pl-5">
              <li><strong>Before you head out:</strong> spray Defense over your dog&rsquo;s coat before any walk in a new place, and let it dry.</li>
              <li><strong>At every pit stop:</strong> clean paws with the Paw Cleaner before they hop back in the car.</li>
              <li><strong>On arrival:</strong> a few sprays of Refreshing Mist, left to settle.</li>
              <li><strong>When it gets messy:</strong> a Dry Foam Shampoo cleanse in place of a full bath.</li>
            </ol>

            <p>
              Pack alongside them: a microfibre towel, a soft brush, wet wipes for the face, a water bowl and your pet&rsquo;s usual bedding. Familiar smells help pets settle faster in a new room. Travelling over Diwali? Read <Link href="/journal/diwali-pet-safety-tips" className={LINK}>Diwali and your pet</Link> too.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Travel light, come home happy</h2>



            <p>
              The best trips are the ones where your pet comes home as happy as they left. Our waterless range is built for exactly that: gentle care that fits in a bag and works anywhere.
            </p>

            <p>
              Pack the <Link href="/travel-essentials" className={LINK}>travel essentials</Link> - or all four together in the <Link href="/products/travel-kit-bundle" className={LINK}>Travel Kit</Link> - before your next adventure.
            </p>

            <p>
              Happily ever after.
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
