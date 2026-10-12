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

const SLUG = 'diwali-pet-safety-tips';
const ARTICLE = getArticle(SLUG);

export const metadata: Metadata = articleMetadata(SLUG);

const FAQS: Faq[] = [
  {
    q: "How can I calm my dog during Diwali crackers?",
    a: "Walk your dog early in the day, set up a quiet safe den in an inner room with curtains closed, use gentle background sound to mask the noise, and stay calm and close. For dogs that panic, talk to your vet well before Diwali.",
  },
  {
    q: "Is it okay to comfort my dog when it's scared of firecrackers?",
    a: "Yes. Calm comfort doesn't reward fear and can help your dog feel safer. Avoid punishing fearful behaviour, and let your dog hide if it wants to.",
  },
  {
    q: "Can I give my dog something to calm down during Diwali?",
    a: "Only what your vet prescribes. Never give your pet human sedatives or calming medicines, which can be dangerous for animals. See your vet well before the festival.",
  },
  {
    q: "How do I keep my cat safe during Diwali?",
    a: "Keep your cat indoors with doors and windows closed, provide high shelves or covered boxes to hide in, keep diyas out of reach, and keep flowers, garlands and sweets away from them.",
  },
  {
    q: "Is Diwali smoke harmful for dogs?",
    a: "Heavy smoke and poor air quality can irritate the eyes and airways, especially in flat-faced breeds, puppies, older dogs and dogs with breathing problems. Keep windows closed, shorten walks on high-smoke days and see your vet for coughing or breathing trouble.",
  },
  {
    q: "Which Diwali sweets are dangerous for dogs?",
    a: "Chocolate, raisins, anything with xylitol, and rich, ghee-heavy or fried foods. Onion and garlic in savoury snacks are also harmful. Keep festive food out of reach and ask guests not to feed your pet.",
  },
  {
    q: "What should I do if my dog runs away during Diwali?",
    a: "Make sure your dog wears an ID tag with your number before the festival. If your dog goes missing, search the area immediately, alert neighbours and your building security, and contact local rescues and vets.",
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
              Diwali and Your Pet: Firecrackers, Smoke and a Calmer Festival
            </h1>
            <p className="text-[1.125rem] md:text-[1.25rem] font-light text-[#3B3A38]/80 leading-[1.6]">
              The festival of lights is also, for a dog, the loudest week of the year. A little planning makes it gentler.
            </p>
          </header>

          {/* Hero Image */}
          <div className="max-w-[1000px] mx-auto px-6 md:px-8 mb-16 md:mb-24">
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-[#E9E2D7] overflow-hidden rounded-[2px]">
              <Image
                src={ARTICLE.image.src}
                alt={ARTICLE.image.alt}
                fill
                className="object-cover object-[center_80%]"
                priority
                sizes="(max-width: 1000px) 100vw, 1000px"
              />
            </div>
          </div>

          {/* Article Content */}
          <article className="max-w-[700px] mx-auto px-6 md:px-8 font-light text-[#3B3A38] leading-[1.8] text-[1.0625rem] space-y-8">
            <p className="text-[1.25rem] leading-[1.6]">
              For us, Diwali is lamps, sweets and family. For many dogs and cats, it&rsquo;s days of sudden bangs, flashes, smoke and strangers at the door &ndash; often while they&rsquo;re expected to carry on as normal.
            </p>

            <p>
              Dogs hear sounds we can&rsquo;t and feel the vibration of louder ones, so a firecracker that&rsquo;s merely loud to us can be overwhelming to them. In Delhi NCR and other big cities, the smoke that follows adds a second problem: air that&rsquo;s harder on small lungs.
            </p>

            <p>
              None of this means your pet has to have a bad Diwali. It means planning for it.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Signs your pet is frightened</h2>



            <p>
              Fear doesn&rsquo;t always look like barking. Watch for:
            </p>

            <ul className="space-y-3 pl-5 list-disc">
              <li><strong>trembling, panting or drooling</strong> when it isn&rsquo;t hot;</li>
              <li><strong>pacing, hiding</strong> under beds or behind furniture;</li>
              <li><strong>trying to escape</strong> &ndash; scratching at doors, slipping a collar;</li>
              <li><strong>clinging to you</strong>, or the opposite, refusing to come out;</li>
              <li><strong>not eating</strong>, or accidents in the house;</li>
              <li>in cats: <strong>hiding for hours, flattened ears, refusing food</strong>.</li>
            </ul>

            <h2 className="text-3xl font-display mt-16 mb-6">Before Diwali</h2>


            <div className="my-16">
              <Image
                src="/images/journal/diwali/img1.webp"
                alt="A covered dog crate draped with a soft blanket in a quiet inner room, a dog peeking out calmly"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <h3 className="text-2xl [font-family:var(--font-cormorant),Georgia,serif] font-light mt-10 mb-4">Walk early, and tire them out</h3>

            <p>
              Crackers usually build through the evening. <strong>Walk your dog earlier in the day</strong>, finish toilet breaks before dusk, and use play to tire them out so they&rsquo;re more likely to rest through the noise.
            </p>

            <h3 className="text-2xl [font-family:var(--font-cormorant),Georgia,serif] font-light mt-10 mb-4">Build a safe den</h3>

            <p>
              Choose an <strong>inner room away from windows and the street</strong> &ndash; often a bedroom or bathroom.
            </p>

            <ul className="space-y-3 pl-5 list-disc">
              <li>Put their <strong>bed, a blanket that smells of you, water and a favourite toy</strong> inside.</li>
              <li><strong>Close curtains</strong> to cut out flashes.</li>
              <li>A <strong>covered crate</strong> works well for crate-trained dogs &ndash; leave the door open.</li>
              <li>For cats, a <strong>high shelf or a covered box</strong> gives them the hiding spot they look for.</li>
            </ul>

            <p>
              Let your pet get used to the space a few days before the festival, so it already feels safe.
            </p>

            <h3 className="text-2xl [font-family:var(--font-cormorant),Georgia,serif] font-light mt-10 mb-4">Mask the noise</h3>

            <p>
              Soft background sound &ndash; a fan, the television, calm music &ndash; takes the edge off sudden bangs. Keep it at a gentle level, not loud.
            </p>

            <h3 className="text-2xl [font-family:var(--font-cormorant),Georgia,serif] font-light mt-10 mb-4">Make sure they can&rsquo;t get lost</h3>

            <p>
              More pets go missing around festivals than at almost any other time. <strong>Check that the collar fits and has an ID tag with your phone number</strong>, update microchip details if your pet has one, and <strong>keep doors, gates and balcony access closed</strong>. A frightened dog can slip a loose collar or squeeze through a gap it would normally ignore.
            </p>

            <h3 className="text-2xl [font-family:var(--font-cormorant),Georgia,serif] font-light mt-10 mb-4">Talk to your vet early if your pet is very fearful</h3>

            <p>
              If your pet has panicked during past festivals, see your vet <strong>well before Diwali</strong>. They can suggest a plan, and if needed prescribe something suitable. <strong>Never give your pet human sedatives or calming medicines</strong> &ndash; many are dangerous for animals.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">During the noise</h2>


            <div className="my-16">
              <Image
                src="/images/journal/diwali/img2.webp"
                alt="A woman sitting on the floor at night gently comforting an anxious beagle wrapped in a light blanket"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <ul className="space-y-3 pl-5 list-disc">
              <li><strong>Stay calm and stay close.</strong> Comforting a frightened pet doesn&rsquo;t &ldquo;reward&rdquo; fear &ndash; your calm presence helps.</li>
              <li><strong>Let them hide</strong> if that&rsquo;s what they choose. Don&rsquo;t drag them out.</li>
              <li><strong>Never punish fearful behaviour</strong> &ndash; it only adds to the stress.</li>
              <li>Offer a <strong>long-lasting chew or a stuffed toy</strong> as a distraction.</li>
              <li><strong>Keep pets indoors</strong> &ndash; never tied outside, on a balcony or in a car during crackers.</li>
              <li><strong>Never take your dog to a cracker-bursting area</strong>, even if they seem fine at first.</li>
            </ul>

            <h2 className="text-3xl font-display mt-16 mb-6">Smoke, air quality and walks</h2>


            <div className="my-16">
              <Image
                src="/images/journal/diwali/img3.webp"
                alt="Wiping a dog’s paws with a soft cloth at the door on a hazy, smoky evening"
                width={1184}
                height={864}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>



            <p>
              The days after Diwali often bring heavy smoke and poor air quality, especially in Delhi NCR.
            </p>

            <ul className="space-y-3 pl-5 list-disc">
              <li><strong>Keep windows closed</strong> when smoke is heaviest, and run an air purifier if you have one.</li>
              <li><strong>Shorten walks</strong> on high-pollution days and <strong>avoid late-night walks</strong> when smoke from the night&rsquo;s crackers hangs lowest.</li>
              <li>Take extra care with <strong>flat-faced breeds (Pugs, Shih Tzus, Bulldogs), puppies, older pets and pets with breathing problems</strong>.</li>
              <li>See your vet for <strong>coughing, wheezing, laboured breathing or red, watery eyes</strong> that don&rsquo;t settle.</li>
            </ul>

            <h3 className="text-2xl [font-family:var(--font-cormorant),Georgia,serif] font-light mt-10 mb-4">Clean off the residue</h3>

            <p>
              Ash, cracker debris and street residue settle on pavements and come home on paws and coats.
            </p>

            <ul className="space-y-3 pl-5 list-disc">
              <li><strong>Clean paws after every walk</strong> with a no-rinse <Link href="/products/paw-cleaner" className={LINK}>Paw Cleaner</Link>, and check between the toes for debris or small burns.</li>
              <li><strong>Freshen the coat without a full bath</strong> using the waterless <Link href="/products/dry-foam-shampoo" className={LINK}>Dry Foam Shampoo</Link> &ndash; useful when it&rsquo;s cold and smoky outside. More in <Link href="/journal/dry-bath-vs-wet-bath-for-dogs" className={LINK}>dry bath vs. wet bath</Link>.</li>
              <li><strong>Stop your dog eating anything on the street</strong> &ndash; spent crackers and their debris contain chemicals that are harmful if swallowed.</li>
            </ul>

            <h2 className="text-3xl font-display mt-16 mb-6">Around the house</h2>



            <h3 className="text-2xl [font-family:var(--font-cormorant),Georgia,serif] font-light mt-10 mb-4">Diyas, candles and lights</h3>

            <ul className="space-y-3 pl-5 list-disc">
              <li>Keep <strong>diyas and candles high and out of reach</strong> of wagging tails, curious cats and jumping dogs.</li>
              <li><strong>Never leave flames unattended</strong> with pets in the room.</li>
              <li>Tuck away <strong>electric light wires</strong> that puppies and kittens might chew.</li>
            </ul>

            <h3 className="text-2xl [font-family:var(--font-cormorant),Georgia,serif] font-light mt-10 mb-4">Sweets and festive food</h3>

            <p>
              Festive snacks aren&rsquo;t pet food. Keep away from pets:
            </p>

            <ul className="space-y-3 pl-5 list-disc">
              <li><strong>chocolate</strong> and anything containing it;</li>
              <li><strong>raisins and grapes</strong> (often in sweets and dry-fruit mixes);</li>
              <li>sweets or gum with <strong>xylitol</strong>;</li>
              <li><strong>rich, ghee-heavy or fried food</strong>, which can upset the stomach and, in some dogs, trigger pancreatitis;</li>
              <li><strong>onion and garlic</strong>, common in savoury snacks.</li>
            </ul>

            <p>
              Tell guests not to feed your pet, and keep gift boxes off low tables.
            </p>

            <h3 className="text-2xl [font-family:var(--font-cormorant),Georgia,serif] font-light mt-10 mb-4">Decorations and rangoli</h3>

            <p>
              Keep pets away from <strong>rangoli colours</strong> and freshly painted decorations, and watch puppies and kittens around <strong>flowers and garlands</strong> &ndash; some plants and flowers are toxic, especially to cats. If your pet eats something it shouldn&rsquo;t, call your vet.
            </p>

            <h3 className="text-2xl [font-family:var(--font-cormorant),Georgia,serif] font-light mt-10 mb-4">Guests</h3>

            <p>
              A house full of visitors is stressful for some pets. Let them retreat to their den, and make sure guests close doors behind them.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Community dogs and cats</h2>



            <p>
              Street and community animals have nowhere to hide. If you can, <strong>leave water and a sheltered corner</strong>, avoid bursting crackers near animals, and contact a local animal rescue if you find an injured or terrified animal.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">A Diwali checklist</h2>



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
                    <td className="py-3 pr-4 align-top">A week before</td>
                    <td className="py-3 pr-4 align-top">Vet visit if your pet is very fearful; set up and introduce the safe den; check ID tag</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">Each festival day</td>
                    <td className="py-3 pr-4 align-top">Walk early; finish toilet breaks before dusk; doors and balconies closed</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">During crackers</td>
                    <td className="py-3 pr-4 align-top">Pet indoors in the den; background sound; stay calm and close</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">Around the house</td>
                    <td className="py-3 pr-4 align-top">Diyas high; sweets and chocolate out of reach; wires tucked away</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">After walks</td>
                    <td className="py-3 pr-4 align-top">Clean and check paws; no eating debris</td>
                  </tr>
                  <tr className="border-b border-[#E9E2D7]">
                    <td className="py-3 pr-4 align-top">High-smoke days</td>
                    <td className="py-3 pr-4 align-top">Windows closed; short walks; watch breathing</td>
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
