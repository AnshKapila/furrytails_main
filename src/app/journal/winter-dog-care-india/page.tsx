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

const SLUG = 'winter-dog-care-india';
const ARTICLE = getArticle(SLUG);

export const metadata: Metadata = articleMetadata(SLUG);

const FAQS: Faq[] = [
  {
    q: "How do I take care of my dog in winter in India?",
    a: "Give your dog a warm bed raised off the floor, use a sweater for short-coated, small, young or old dogs, check the air quality and shorten walks on smoggy days, bathe less often in a warm room with lukewarm water and dry thoroughly, and wipe and check the paws after walks.",
  },
  {
    q: "Do dogs need sweaters in winter?",
    a: "Short-coated breeds, small dogs, puppies and senior dogs often benefit from a well-fitting sweater on cold walks. Double-coated breeds usually don't need one. Remove it indoors so your dog doesn't overheat.",
  },
  {
    q: "Can I bathe my dog in winter?",
    a: "Yes, when the coat genuinely needs it. Bathe in a warm room with lukewarm water, use a gentle shampoo, and dry your dog completely before going outside. Use a dry bath between washes.",
  },
  {
    q: "How often should I bathe my dog in winter?",
    a: "Usually less often than in summer, because dogs get less muddy and drying takes longer. Bathe when the coat needs it and freshen between baths with a waterless dry shampoo.",
  },
  {
    q: "Is air pollution harmful for dogs?",
    a: "Heavy smog can irritate the eyes and airways, especially in flat-faced breeds, puppies, older dogs and dogs with breathing problems. Shorten walks on poor-air days, keep windows closed and see your vet for coughing or breathing difficulty.",
  },
  {
    q: "What time should I walk my dog in Delhi winter?",
    a: "When the air quality has improved and there's some sun, rather than late at night or very early in the morning, when smog and fog tend to be heaviest. Check the air quality before going out.",
  },
  {
    q: "How do I treat my dog's dry skin in winter?",
    a: "Brush regularly, bathe less often with a gentle shampoo, keep your dog hydrated and avoid human lotions. If dryness, flaking or itching persists, see your vet.",
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
              Winter Dog Care in India: Cold, Smog and Dry Skin
            </h1>
            <p className="text-[1.125rem] md:text-[1.25rem] font-light text-[#3B3A38]/80 leading-[1.6]">
              North Indian winters bring cold mornings, thick smog and dry air. Your dog&rsquo;s routine should change with them.
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
              Winter in Delhi NCR and much of North India is more than a drop in temperature. Mornings can be close to freezing, fog cuts visibility, and smog settles over the city for weeks. Indoors, the air dries out and heaters come on.
            </p>

            <p>
              Dogs handle this very differently depending on their coat, size and age. A Husky or a German Shepherd may love it; a short-coated Indie, a small breed, a puppy or an older dog can feel the cold quickly.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Who feels the cold most</h2>



            <ul className="space-y-3 pl-5 list-disc">
              <li><strong>Short-coated dogs</strong> &ndash; Indies, Beagles, Dachshunds, Dobermans, Boxers.</li>
              <li><strong>Small and toy breeds</strong> &ndash; Chihuahuas, Pomeranians, Shih Tzus with short cuts.</li>
              <li><strong>Puppies and senior dogs</strong>, and dogs with joint problems.</li>
              <li><strong>Thin or unwell dogs</strong>.</li>
            </ul>

            <p>
              Signs your dog is cold: shivering, curling up tightly, lifting paws off the ground on walks, reluctance to go out, or seeking out warm spots.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Keep them warm &ndash; safely</h2>


            <div className="my-16">
              <Image
                src="/images/journal/winter/img1.webp"
                alt="A small dog curled up on a raised, cushioned bed with a wool blanket in a cosy winter living room"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <ul className="space-y-3 pl-5 list-disc">
              <li><strong>Raise the bed off cold floors</strong> and add a thick blanket; keep it away from draughts and doors.</li>
              <li><strong>A dog sweater or coat</strong> helps short-coated, small, young and older dogs on cold walks. Make sure it fits well, doesn&rsquo;t restrict movement, and is removed indoors so your dog doesn&rsquo;t overheat. Double-coated breeds usually don&rsquo;t need one.</li>
              <li><strong>Never leave a dog in a cold car, on a balcony or tied outside overnight.</strong></li>
            </ul>

            <h3 className="text-2xl [font-family:var(--font-cormorant),Georgia,serif] font-light mt-10 mb-4">Heater safety</h3>

            <ul className="space-y-3 pl-5 list-disc">
              <li>Keep <strong>heaters and blowers at a safe distance</strong> from beds and blankets, and use guards where possible.</li>
              <li><strong>Never leave a dog alone in a room with a heater on.</strong></li>
              <li><strong>Never use coal, wood or angithi heaters in a closed room</strong> &ndash; they can release carbon monoxide, which is dangerous for pets and people alike.</li>
            </ul>

            <h2 className="text-3xl font-display mt-16 mb-6">Walking in smog and fog</h2>


            <div className="my-16">
              <Image
                src="/images/journal/winter/img2.webp"
                alt="A labrador resting indoors with windows closed and an air purifier running, hazy sky outside"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <p>
              Winter smog is one of the biggest challenges for city dogs in North India.
            </p>

            <ul className="space-y-3 pl-5 list-disc">
              <li><strong>Check the air quality</strong> before going out, and <strong>shorten walks on poor-air days</strong> &ndash; a quick toilet walk and play indoors instead.</li>
              <li><strong>Avoid the smoggiest times.</strong> Air is often at its worst late at night and in the early morning; walk when it has improved and there&rsquo;s some sun.</li>
              <li><strong>Keep windows closed</strong> on heavy-smog days and run an <strong>air purifier</strong> if you have one.</li>
              <li>Take extra care with <strong>flat-faced breeds, puppies, older dogs and dogs with breathing or heart problems</strong>.</li>
              <li>See your vet for <strong>coughing, wheezing, laboured breathing or red, watery eyes</strong>.</li>
            </ul>

            <p>
              <strong>In fog,</strong> use a <strong>reflective collar or harness or a small clip-on light</strong>, keep your dog on a lead near roads, and stay on familiar routes.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Bathing in winter</h2>


            <div className="my-16">
              <Image
                src="/images/journal/winter/img3.webp"
                alt="A woman gently towel-drying a dog after a lukewarm bath in a warm bathroom"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <p>
              Dogs don&rsquo;t need more baths in winter &ndash; often fewer. But when the coat genuinely needs it:
            </p>

            <ul className="space-y-3 pl-5 list-disc">
              <li><strong>Bathe indoors in a warm room</strong>, with <strong>lukewarm</strong> water.</li>
              <li>Use a gentle, sulphate-free, pH-balanced shampoo such as Furrytail&rsquo;s <Link href="/products/gentle-daily-shampoo-santal-white-tea" className={LINK}>Gentle Daily Shampoo</Link>, whose guar conditioner, camellia oil and vitamin E help the coat dry soft.</li>
              <li><strong>Dry completely, right down to the skin</strong> &ndash; a damp coat chills a dog quickly. Use towels, then a pet dryer on a cool or low setting.</li>
              <li><strong>Bathe earlier in the day</strong>, and don&rsquo;t walk your dog until the coat is fully dry.</li>
            </ul>

            <p>
              Between baths, the waterless <Link href="/products/dry-foam-shampoo" className={LINK}>Dry Foam Shampoo</Link> freshens the coat without any water at all. See <Link href="/journal/dry-bath-vs-wet-bath-for-dogs" className={LINK}>dry bath vs. wet bath</Link> and <Link href="/journal/how-to-bathe-a-dog-at-home" className={LINK}>how to bathe a dog at home</Link>.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Dry skin and coat</h2>



            <p>
              Cold air outside and heaters inside both dry out skin.
            </p>

            <ul className="space-y-3 pl-5 list-disc">
              <li><strong>Brush regularly</strong> &ndash; it spreads the coat&rsquo;s natural oils and lifts flakes and dead hair.</li>
              <li><strong>Don&rsquo;t over-bathe</strong>, and avoid harsh cleansers.</li>
              <li><strong>Keep your dog well hydrated</strong>; dogs often drink less in winter, so keep water fresh and at room temperature.</li>
              <li><strong>Don&rsquo;t apply human lotions or oils</strong> &ndash; dogs lick them off.</li>
              <li>If flaking, itching or redness persists, see your vet &ndash; dry skin can also have other causes. See <Link href="/journal/dog-hair-fall-vs-shedding" className={LINK}>dog hair fall vs normal shedding</Link>.</li>
            </ul>

            <h2 className="text-3xl font-display mt-16 mb-6">Paws in winter</h2>



            <ul className="space-y-3 pl-5 list-disc">
              <li><strong>Wipe and check the paws after every walk</strong> &ndash; winter streets carry dust and pollution residue, and pads can dry and crack. A no-rinse <Link href="/products/paw-cleaner" className={LINK}>Paw Cleaner</Link> at the door does it quickly.</li>
              <li><strong>Dry between the toes</strong> so damp fur doesn&rsquo;t chill.</li>
              <li><strong>Keep the fur between the pads trimmed.</strong></li>
              <li>See your vet for <strong>cracked, bleeding or sore pads</strong>. More in <Link href="/journal/paw-cleaner-for-dogs-post-walk-paw-care" className={LINK}>the paw problem</Link>.</li>
            </ul>

            <h2 className="text-3xl font-display mt-16 mb-6">Food and activity</h2>



            <p>
              Shorter walks mean less exercise. <strong>Keep up indoor play</strong> &ndash; fetch in a corridor, tug, puzzle feeders &ndash; and <strong>don&rsquo;t overfeed</strong> to compensate for the cold unless your vet advises it.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Cats and community animals</h2>



            <ul className="space-y-3 pl-5 list-disc">
              <li><strong>Indoor cats</strong> look for warm spots &ndash; keep them away from heaters.</li>
              <li><strong>Community cats often shelter under car bonnets</strong> for warmth. <strong>Tap the bonnet before starting your car</strong> in winter.</li>
              <li>If you can, leave <strong>water and a sheltered, dry corner</strong> for community dogs and cats, and contact a local rescue for an animal in distress.</li>
            </ul>

            <h2 className="text-3xl font-display mt-16 mb-6">Winter care checklist</h2>



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
                    <td className="py-3 pr-4 align-top">Daily</td>
                    <td className="py-3 pr-4 align-top">Check air quality; walk when it&rsquo;s better; warm bed off the floor</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">Every walk</td>
                    <td className="py-3 pr-4 align-top">Sweater for short-coated or small dogs; reflective gear in fog; wipe and check paws</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">Indoors</td>
                    <td className="py-3 pr-4 align-top">Heaters guarded and supervised; no coal or wood heaters in closed rooms</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">Weekly</td>
                    <td className="py-3 pr-4 align-top">Brush to spread natural oils; check skin and pads</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">When the coat needs it</td>
                    <td className="py-3 pr-4 align-top">Warm room, lukewarm water, dry completely; dry bath in between</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">Watch for</td>
                    <td className="py-3 pr-4 align-top">Shivering, coughing, wheezing, cracked pads, persistent dry skin</td>
                  </tr>
                </tbody>
              </table>
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
