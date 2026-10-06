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

const SLUG = 'the-monsoon-ritual';
const ARTICLE = getArticle(SLUG);

export const metadata: Metadata = articleMetadata(SLUG);

const FAQS: Faq[] = [
  {
    q: "How often should I bathe my dog during monsoon?",
    a: "There is [no universal bathing schedule](/journal/how-often-should-you-bathe-your-dog), monsoon or otherwise. Bathing depends on your dog’s coat, lifestyle, cleanliness and skin health. A dog that gets muddy may need a bath, while one that simply gets wet in the rain may only need thorough drying. Frequent bathing can contribute to dryness or irritation in some dogs.",
  },
  {
    q: "Should I clean my dog’s paws after every rainy walk?",
    a: "If your dog has walked through mud, dirty water or visibly contaminated areas, cleaning the paws is sensible. Pay particular attention to the spaces between the toes and around the pads, then dry thoroughly. A full bath is not necessary every time the paws need cleaning.",
  },
  {
    q: "Does a wet dog always need a bath?",
    a: "No. Wetness alone does not necessarily mean the coat is dirty. After ordinary rain, towel-drying and checking the coat may be sufficient. Bathing is more appropriate when the coat has accumulated mud, dirt, unpleasant residue or odour, or when a veterinarian has recommended a particular bathing routine.",
  },
  {
    q: "Can I bathe my dog every week during monsoon?",
    a: "Some dogs may require more frequent bathing for specific medical or lifestyle reasons, but weekly bathing should not automatically become the default simply because it is monsoon. Excessive bathing can affect the skin and coat. If your dog needs frequent baths, discuss the appropriate frequency and shampoo with your veterinarian.",
  },
  {
    q: "How can I prevent ticks during monsoon?",
    a: "Tick prevention should not depend entirely on the weather. Veterinary parasite guidance supports consistent, [year-round tick control](/journal/ticks-fleas-and-the-indian-dog), alongside checking your dog after outdoor exposure and reducing contact with tick-prone environments. Choose prevention appropriate for your dog with veterinary guidance and follow the product’s label.",
  },
  {
    q: "Why is drying important after rain?",
    a: "Thorough drying removes moisture from the coat and allows you to inspect the skin and fur at the same time. It can also help reduce matting and the characteristic wet-dog odour. Dogs with dense coats may require more careful drying because moisture can remain closer to the skin.",
  },
  {
    q: "When should I speak to a veterinarian?",
    a: "Persistent itching, redness, swelling, skin lesions, hair loss, unusual odour, repeated irritation or a heavy tick infestation deserves veterinary attention. Grooming products should not be used as substitutes for diagnosis or treatment of an underlying skin condition.",
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
              <span>Seasonal</span>
              <span className="w-1 h-1 rounded-full bg-[#E9E2D7]" />
              <span>{ARTICLE.readTime}</span>
              <span className="w-1 h-1 rounded-full bg-[#E9E2D7]" />
              <time dateTime={ARTICLE.datePublished}>{formatArticleDate(ARTICLE.datePublished)}</time>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#3B3A38] leading-[1.1] mb-8 font-display">
              The monsoon ritual.
            </h1>
            <p className="text-[1.125rem] md:text-[1.25rem] font-light text-[#3B3A38]/80 leading-[1.6]">
              Four wet paws, a damp coat and mud between the toes - what monsoon grooming actually requires, and what it doesn&rsquo;t.
            </p>
          </header>

          {/* Hero Image */}
          <div className="max-w-[1000px] mx-auto px-6 md:px-8 mb-16 md:mb-24">
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-[#E9E2D7] overflow-hidden rounded-[2px]">
              <Image
                src="/images/journal/monsoon-ritual/main.webp"
                alt="A man in a raincoat drying a wet golden retriever by the front door after a monsoon walk"
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
              There is a particular moment after a monsoon walk when the front door opens and the problem becomes obvious.
            </p>
            <p>
              Four wet paws. A damp coat. Mud between the toes. Water on the floor. And a dog who would prefer to shake everything off immediately.
            </p>
            <p>
              In Mumbai, Chennai or Bengaluru, this can become a daily ritual for weeks.
            </p>
            <p>
              The instinct is often to reach for the shampoo. But monsoon grooming is not necessarily a question of <strong>more bathing</strong>. Healthy dogs generally need bathing according to their coat, lifestyle and individual needs; <Link href="/journal/how-often-should-you-bathe-your-dog" className="underline decoration-[#8D9A83] underline-offset-4">bathing too frequently</Link> can strip natural oils and contribute to dryness or irritation.
            </p>
            <p>
              The better approach is to separate the problems.
            </p>
            <p className="font-medium text-[1.125rem]">
              Paws need cleaning. Wet coats need drying. Parasites need prevention. Baths should happen when they are actually useful.
            </p>
            <p>
              That distinction makes the monsoon routine considerably easier.
            </p>

            <div className="my-16">
              <Image
                src="/images/journal/monsoon-ritual/img1.webp"
                alt="Close-up of a dog's muddy, rain-soaked paws on a stone floor"
                width={1024}
                height={559}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            <h2 className="text-3xl font-display mt-16 mb-6">1. Start at the paws</h2>
            <p>
              The paws are where the outside world comes home first.
            </p>
            <p>
              After a wet walk, inspect the pads and the spaces between the toes. Mud, grit, plant material and other debris can collect there, particularly in dogs with hairy feet. Regular inspection also gives you an opportunity to notice cuts, redness or irritation before they become more obvious problems.
            </p>
            <p>
              A full bath is rarely necessary simply because the paws are dirty.
            </p>
            <p>
              For a routine walk, start small: clean the paws, including between the toes, then dry them thoroughly. Veterinary guidance similarly recommends checking between the toes and removing accumulated debris rather than treating every outdoor outing as a full bathing event.
            </p>
            <p>
              This is where a <Link href="/products/paw-cleaner" className="underline decoration-[#8D9A83] underline-offset-4">paw cleaner</Link> makes sense in the ritual.
            </p>
            <p>
              Not as another product to add to the shelf, but as a way of solving a very specific problem: the four surfaces of the dog that have just travelled through the city.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">2. Then deal with the wet coat</h2>
            <p>
              The second mistake is treating <em>wet</em> and <em>dirty</em> as the same thing.
            </p>
            <p>
              They aren&rsquo;t.
            </p>
            <p>
              A dog can come home soaked by rain without needing shampoo. What the coat needs first is <strong>proper drying</strong>.
            </p>
            <p>
              Towel-drying removes much of the surface moisture. Dogs with dense, long or double coats may require more attention because moisture can remain close to the skin. Drying also creates a useful opportunity to check for unusual bumps, redness, cuts, scabs or parasites.
            </p>
            <p>
              Think of this as the quiet middle step of the monsoon ritual:
            </p>
            <p className="font-medium">
              Rain &rarr; towel &rarr; inspect &rarr; dry.
            </p>
            <p>
              Not automatically:
            </p>
            <p className="font-medium">
              Rain &rarr; shampoo &rarr; shampoo again.
            </p>
            <p>
              The distinction matters because frequent bathing can remove oils from the skin and coat and contribute to irritation in some dogs.
            </p>

            <div className="my-16">
              <Image
                src="/images/journal/monsoon-ritual/img2.webp"
                alt="A person towel-drying a golden retriever's damp coat beside a rain-streaked window"
                width={1024}
                height={559}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            <h2 className="text-3xl font-display mt-16 mb-6">3. The bath should have a reason</h2>
            <p>
              Monsoon can make dogs <em>feel</em> permanently dirty.
            </p>
            <p>
              The city is wet. The streets are muddy. The coat smells different. The paws seem to collect half the neighbourhood.
            </p>
            <p>
              But bathing frequency should still be individual.
            </p>
            <p>
              Veterinary guidance notes that bathing depends on factors such as coat type, lifestyle and health status. A dog that has rolled in mud or entered dirty water may genuinely need a bath; another that simply walked through rain may only need cleaning and drying. Dogs with certain skin conditions may also have veterinarian-directed bathing schedules.
            </p>
            <p>
              So rather than asking:
            </p>
            <p className="font-medium">
              &ldquo;How often should I bathe my dog during monsoon?&rdquo;
            </p>
            <p>
              a better question is:
            </p>
            <p className="font-medium">
              &ldquo;What happened to the coat today?&rdquo;
            </p>
            <p>
              If it is merely wet, dry it.
            </p>
            <p>
              If the paws are muddy, clean the paws.
            </p>
            <p>
              If the coat is genuinely dirty or has an unpleasant residue or odour, bathe.
            </p>
            <p>
              If the skin is irritated, unusually itchy or repeatedly problematic, speak with your veterinarian rather than simply increasing the number of baths.
            </p>
            <p>
              And when you do bathe, use a <Link href="/products/gentle-daily-shampoo-santal-white-tea" className="underline decoration-[#8D9A83] underline-offset-4">shampoo formulated specifically for dogs</Link>. Human shampoos are not designed around canine skin &ndash; and <Link href="/journal/what-we-found-in-most-pet-shampoos" className="underline decoration-[#8D9A83] underline-offset-4">not every pet shampoo is formulated the same way</Link>.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">4. Monsoon is also a parasite season - but prevention is not a rainy-day decision</h2>
            <p>
              Ticks are a different category of problem &ndash; one we cover in depth in <Link href="/journal/ticks-fleas-and-the-indian-dog" className="underline decoration-[#8D9A83] underline-offset-4">Ticks, fleas &amp; the Indian dog</Link>.
            </p>
            <p>
              They are not something to address only after seeing one.
            </p>
            <p>
              Veterinary parasite guidance recommends consistent, year-round tick control rather than waiting for seasonal activity or visible infestation. Ticks can also persist in environments around homes, making reactive treatment less reliable.
            </p>
            <p>
              That does not mean every dog needs the same product or schedule.
            </p>
            <p>
              It means parasite prevention should be part of the dog&rsquo;s broader care plan, selected according to species, lifestyle, geography and veterinary advice.
            </p>
            <p>
              A <Link href="/products/anti-tick-flea-spray" className="underline decoration-[#8D9A83] underline-offset-4">tick-control spray</Link> can therefore belong in the <strong>defense</strong> part of the monsoon ritual, but it should not be confused with shampoo, paw cleaning or a treatment for an existing skin condition.
            </p>
            <p>
              And frequency matters: <strong>follow the product label rather than inventing a monsoon-specific schedule.</strong>
            </p>
            <p>
              If you find an attached tick, don&rsquo;t improvise with household remedies &ndash; here is <Link href="/journal/ticks-fleas-and-the-indian-dog#what-to-do-when-you-find-a-tick" className="underline decoration-[#8D9A83] underline-offset-4">what to do when you find a tick</Link>. Prompt, careful removal is recommended, and a veterinarian should be involved when there is a heavy infestation or concerning signs.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">5. The ritual is really about sequence</h2>
            <p>
              The most useful way to think about monsoon grooming is not as a shopping list.
            </p>
            <p>
              It is a sequence.
            </p>
            <p className="font-medium text-[1.125rem]">
              After an ordinary rainy walk
            </p>
            <ol className="space-y-6 mt-8 list-decimal pl-5">
              <li>
                <strong>Inspect</strong><br />
                Look at paws, between toes and visible areas of the coat.
              </li>
            </ol>

            <div className="my-16">
              <Image
                src="/images/journal/monsoon-ritual/img3.webp"
                alt="A woman gently checking her golden retriever's coat and ears after a rainy walk"
                width={1024}
                height={559}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            <ol className="space-y-6 list-decimal pl-5" start={2}>
              <li>
                <strong>Clean</strong><br />
                Remove mud and outdoor debris, concentrating on the paws when that is all that needs attention.
              </li>
              <li>
                <strong>Dry</strong><br />
                Towel-dry thoroughly, paying attention to areas that hold moisture.
              </li>
              <li>
                <strong>Check</strong><br />
                Look for ticks, irritation, cuts, unusual odour or changes in the skin.
              </li>
              <li>
                <strong>Bathe when necessary</strong><br />
                Use a dog-formulated shampoo when the coat genuinely needs a deeper clean &ndash; and <Link href="/journal/reading-the-inci-list" className="underline decoration-[#8D9A83] underline-offset-4">read its ingredient list</Link> first: look for a <Link href="/journal/the-probiotic-question" className="underline decoration-[#8D9A83] underline-offset-4">deliberate preservation system</Link> and a <Link href="/journal/santal-a-primer" className="underline decoration-[#8D9A83] underline-offset-4">considered fragrance</Link>.
              </li>
              <li>
                <strong>Maintain parasite prevention</strong><br />
                Keep the dog&rsquo;s established tick and flea prevention routine consistent.
              </li>
            </ol>
            <p>
              The order is deliberately simple.
            </p>
            <p>
              It prevents the common tendency to use the most intensive grooming step first.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">6. What changes in Mumbai, Chennai and Bengaluru?</h2>
            <p>
              The ritual stays the same, but the daily reality differs.
            </p>
            <p>
              In <strong>Mumbai</strong>, heavy rainfall and waterlogging can make the distance between a clean walk and a muddy return particularly short.
            </p>
            <p>
              In <strong>Chennai</strong>, monsoon conditions can arrive differently across the year, making the transition between dry days and very wet outings less predictable.
            </p>
            <p>
              In <strong>Bengaluru</strong>, shorter intense showers can turn familiar walking routes into muddy, wet surfaces surprisingly quickly.
            </p>
            <p>
              The useful response isn&rsquo;t to create three entirely different grooming systems.
            </p>
            <p>
              It is to make the <strong>post-walk reset</strong> easy enough to perform every time.
            </p>
            <p>
              Keep the towel where the leash comes off. Keep the paw-cleaning step close to the entrance. Keep parasite prevention on its own schedule. Keep shampoo for the occasions when shampoo is actually required.
            </p>
            <p>
              Good routines remove friction.
            </p>

            <div className="my-16">
              <Image
                src="/images/journal/monsoon-ritual/img4.webp"
                alt="A flat-lay of grooming essentials - towel, brush, paw cleaner and leash - beside a rain-streaked window"
                width={1024}
                height={559}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            <h2 className="text-3xl font-display mt-16 mb-6">Practical takeaway</h2>
            <p>
              For most healthy dogs, a sensible monsoon routine looks less like <strong>constant bathing</strong> and more like <strong>targeted maintenance</strong>.
            </p>
            <p className="font-medium">Wet? Dry.</p>
            <p className="font-medium">Muddy paws? Clean the paws.</p>
            <p className="font-medium">Dirty coat? Bathe.</p>
            <p className="font-medium">Tick risk? Maintain prevention.</p>
            <p className="font-medium">
              Persistent itching, redness, lesions, unusual odour or repeated skin problems? Ask your veterinarian.
            </p>
            <p>
              The goal is not to make the dog permanently pristine.
            </p>
            <p>
              It is to keep the transition between <strong>outside and inside</strong> clean, dry and considered.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">The monsoon ritual is a small system</h2>
            <p>
              The best grooming routine is rarely the most complicated one.
            </p>
            <p>
              It is the one that fits naturally between the walk and the front door.
            </p>
            <p>
              A paw cleaner by the entrance. A good towel within reach. A proper bath when the coat actually calls for one. A consistent parasite-prevention routine. A few seconds spent looking rather than assuming.
            </p>
            <p>
              That is enough to turn monsoon grooming from a daily scramble into a ritual.
            </p>
            <p>
              And perhaps that is the real luxury of good pet care: not doing more, but knowing <strong>what needs doing - and what doesn&rsquo;t.</strong>
            </p>

            <div className="mt-16 text-center">
              <Link href="/shop" className="inline-flex items-center gap-2 border border-[#3B3A38] text-[#3B3A38] px-8 py-4 text-[0.75rem] font-medium tracking-[0.08em] uppercase hover:bg-[#3B3A38] hover:text-[#F8F5F1] transition-colors duration-[400ms]">
                Explore the Ritual
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
