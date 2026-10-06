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

const SLUG = 'how-often-should-you-bathe-your-dog';
const ARTICLE = getArticle(SLUG);

export const metadata: Metadata = articleMetadata(SLUG);

const FAQS: Faq[] = [
  {
    q: "How often should you bathe your dog?",
    a: "There is no universal bathing schedule. Frequency depends on coat type, lifestyle, outdoor exposure, skin health and climate. Many healthy dogs need occasional rather than very frequent baths, while active dogs or dogs with specific dermatological conditions may need different routines. Veterinary guidance should take priority when a skin condition is involved.",
  },
  {
    q: "How often should dogs be bathed in India?",
    a: "Indian dogs do not automatically need more baths simply because of the climate. However, heat, dust, humidity, monsoon mud, swimming and outdoor exposure can change grooming needs. Rather than following a fixed monthly schedule, assess the dog’s coat and skin and use brushing or localised cleaning between full baths when appropriate.",
  },
  {
    q: "Can I bathe my dog every week?",
    a: "Weekly bathing may be appropriate in some circumstances, particularly when recommended for a specific coat or veterinary treatment, but it should not automatically become the routine for every dog. Frequent bathing can affect skin and coat condition, so the appropriate frequency depends on the individual dog and [the product being used](/journal/what-we-found-in-most-pet-shampoos).",
  },
  {
    q: "Can I bathe my dog after every muddy walk?",
    a: "If a dog becomes genuinely dirty or muddy, cleaning may be appropriate rather than waiting for a scheduled bath. However, a full shampoo bath is not necessarily required every time. Depending on the situation, rinsing, wiping or cleaning localised areas may be sufficient.",
  },
  {
    q: "Does coat type affect dog bathing frequency?",
    a: "Yes. Coat characteristics influence grooming requirements. Long, curly, dense and continuously growing coats can require more brushing and maintenance, while some dogs with thick or water-repellent coats may not benefit from frequent bathing. Coat type should be considered alongside lifestyle and skin health.",
  },
  {
    q: "Should I bathe my dog more often during monsoon?",
    a: "Not automatically. Monsoon conditions can increase exposure to mud, rain and damp environments, which may create more occasions when cleaning is necessary. But the appropriate response might be [drying, brushing, paw cleaning](/journal/the-monsoon-ritual) or a localised rinse rather than increasing full-body baths on a fixed schedule.",
  },
  {
    q: "What if my dog smells even after bathing?",
    a: "Persistent or unusual odour should not automatically be treated with more frequent bathing. Odour can have different causes, including skin or coat issues. If the smell persists or occurs alongside itching, redness, sores, hair loss or other changes, veterinary assessment is appropriate.",
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
              <span>Grooming</span>
              <span className="w-1 h-1 rounded-full bg-[#E9E2D7]" />
              <span>{ARTICLE.readTime}</span>
              <span className="w-1 h-1 rounded-full bg-[#E9E2D7]" />
              <time dateTime={ARTICLE.datePublished}>{formatArticleDate(ARTICLE.datePublished)}</time>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#3B3A38] leading-[1.1] mb-8 font-display">
              How often should you bathe your dog?
            </h1>
            <p className="text-[1.125rem] md:text-[1.25rem] font-light text-[#3B3A38]/80 leading-[1.6]">
              The question isn&rsquo;t monthly.
            </p>
          </header>

          {/* Hero Image */}
          <div className="max-w-[1000px] mx-auto px-6 md:px-8 mb-16 md:mb-24">
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-[#E9E2D7] overflow-hidden rounded-[2px]">
              <Image
                src="/images/journal/how-often-bathe-dog/main.webp"
                alt="A dog being gently bathed in a bright, minimal bathroom"
                fill
                className="object-cover object-[center_55%]"
                priority
                sizes="(max-width: 1000px) 100vw, 1000px"
              />
            </div>
          </div>

          {/* Article Content */}
          <article className="max-w-[700px] mx-auto px-6 md:px-8 font-light text-[#3B3A38] leading-[1.8] text-[1.0625rem] space-y-8">
            <p className="text-[1.25rem] leading-[1.6]">
              There is something strangely comforting about a calendar.
            </p>
            <p>
              First Saturday: haircut.<br />
              Last Sunday: groceries.<br />
              Every four weeks: dog bath.
            </p>
            <p>
              Except dogs do not live by calendars.
            </p>
            <p>
              A dog who spends most of the day indoors in an air-conditioned apartment has a very different grooming life from one who runs through muddy parks, swims on weekends or comes home from a monsoon walk with half the street attached to its coat.
            </p>
            <p className="font-medium">
              So, how often should you bathe your dog?
            </p>
            <p className="font-medium text-[1.125rem]">
              The honest answer is: there is no universal schedule.
            </p>
            <p>
              Veterinary guidance generally considers factors such as coat type, lifestyle, outdoor exposure and underlying health when determining bathing frequency. Some healthy dogs may need baths only occasionally, while others require more regular bathing because of their coat, activities or a veterinarian-directed skin-care routine.
            </p>
            <p>
              The better question is not &ldquo;Is it bath day?&rdquo;
            </p>
            <p className="font-medium">
              It is: &ldquo;Does my dog need a bath today?&rdquo;
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">1. Start with the coat, not the calendar</h2>

            <div className="my-16">
              <Image
                src="/images/journal/how-often-bathe-dog/img1.webp"
                alt="Close-up of a brush moving through a dog's coat"
                width={1600}
                height={1066}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            <p>
              A dog&rsquo;s coat is more than hair. It is part of the skin environment, and different coats behave differently.
            </p>
            <p>
              Short coats may be relatively simple to maintain between baths. Long or continuously growing coats can require considerably more brushing and professional grooming. Dense or double coats can hold loose hair and debris and often benefit more from consistent brushing than from simply adding more baths.
            </p>
            <p>
              That last distinction matters.
            </p>
            <p className="font-medium text-[1.125rem]">
              Brushing and bathing solve different problems.
            </p>
            <p>
              Regular brushing can remove loose hair and surface debris, help prevent tangles and allow you to inspect the skin underneath. Veterinary grooming guidance considers coat brushing an important part of routine care, particularly for dogs with longer or denser coats.
            </p>
            <p>
              So a dog with a thick coat does not automatically need more frequent shampooing.
            </p>
            <p className="font-medium">
              They may simply need better grooming between baths.
            </p>
            <p>
              And a dog with a short coat is not automatically maintenance-free either.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">2. Lifestyle changes the equation</h2>
            <p>
              Imagine two dogs living in the same apartment building.
            </p>
            <p>
              One spends most of the week indoors, takes two short walks on paved paths and comes home clean.
            </p>
            <p>
              The other visits the park every morning, runs through grass, rolls on dusty ground and swims on weekends.
            </p>
            <p>
              Should they have the same dog bath routine?
            </p>
            <p>
              Probably not.
            </p>
            <p>
              Veterinary sources specifically note that dogs who become muddy or dirty through outdoor activities may need bathing based on those events rather than on a predetermined calendar.
            </p>
            <p className="font-medium">
              That is why how often to wash a dog cannot be answered without asking what the dog actually does.
            </p>
            <p>
              A useful distinction is:
            </p>
            <ul className="space-y-4 list-disc pl-5">
              <li><strong>Mostly indoor:</strong> brushing and local cleaning may often be enough between baths.</li>
              <li><strong>Regular park visits:</strong> inspect the coat and paws after outdoor activity.</li>
              <li><strong>Swimming:</strong> rinse or bathe when needed depending on what the dog has been exposed to.</li>
              <li><strong>Mud or dirt:</strong> clean when the coat is genuinely dirty rather than waiting for a particular date.</li>
              <li><strong>Rolled in something unpleasant:</strong> this is rarely a situation where the calendar gets the final say.</li>
            </ul>
            <p>
              The goal is not maximum cleanliness.
            </p>
            <p className="font-medium">
              It is appropriate cleanliness.
            </p>

            <div className="my-16 flex justify-center">
              <Image
                src="/images/journal/how-often-bathe-dog/img2.webp"
                alt="A Shih Tzu having its paw gently cleaned with a paw cleaner"
                width={477}
                height={589}
                className="w-full max-w-[420px] rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 420px"
              />
            </div>

            <h2 className="text-3xl font-display mt-16 mb-6">3. A full bath isn&rsquo;t the only kind of clean</h2>
            <p>
              One of the easiest ways to improve a dog&rsquo;s grooming routine is to stop treating every cleaning problem as a full-bath problem.
            </p>
            <p>
              After a dusty walk, for example, you might brush the coat.
            </p>
            <p>
              After a muddy outing, you may need to clean the paws and affected areas.
            </p>
            <p>
              After exposure to something particularly dirty, a complete bath may make more sense.
            </p>
            <p>
              This creates a useful hierarchy:
            </p>
            <p className="font-medium text-[1.125rem] text-center">
              Brush &rarr; local clean &rarr; rinse &rarr; full bath
            </p>
            <p>
              Not every situation requires moving all the way to the last step.
            </p>
            <p>
              This becomes especially relevant in Indian cities, where a dog&rsquo;s daily exposure can vary dramatically between seasons. A Delhi NCR walk in a dry, dusty spell is different from a Bengaluru afternoon in heavy rain. Mumbai&rsquo;s monsoon streets create another kind of exposure altogether &ndash; we cover that season in <Link href="/journal/the-monsoon-ritual" className="underline decoration-[#8D9A83] underline-offset-4">the monsoon ritual</Link>.
            </p>

            <div className="my-16">
              <Image
                src="/images/journal/how-often-bathe-dog/img3.webp"
                alt="A man bringing a rain-soaked golden retriever indoors after a monsoon walk"
                width={1024}
                height={559}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            <p>
              The practical question is always:
            </p>
            <p className="font-medium">
              What actually needs cleaning?
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">4. Skin health changes everything</h2>
            <p>
              This is where routine grooming and veterinary care need to be separated.
            </p>
            <p className="font-medium">
              A healthy dog being bathed for ordinary grooming is not the same as a dog undergoing therapeutic bathing for a diagnosed skin condition.
            </p>
            <p>
              Veterinarians may prescribe more frequent bathing, sometimes with medicated shampoos, for particular dermatological conditions. The frequency and product depend on the condition and should be determined by the veterinary team rather than copied from a general grooming schedule.
            </p>
            <p>
              That means more baths are not automatically better &ndash; and fewer baths are not automatically safer.
            </p>
            <p>
              If your dog repeatedly develops:
            </p>
            <ul className="space-y-2 list-disc pl-5">
              <li>itching</li>
              <li>redness</li>
              <li>flaky or irritated skin</li>
              <li>hair loss</li>
              <li>sores</li>
              <li>recurrent hot spots</li>
              <li>unusual or persistent odour</li>
              <li>greasy skin</li>
            </ul>
            <p>
              the answer is not necessarily another bath.
            </p>
            <p>
              These signs can have multiple causes and warrant veterinary assessment rather than an attempt to solve the problem by simply increasing bathing frequency.
            </p>
            <p className="font-medium">
              Therapeutic bathing is a treatment plan, not a grooming trend.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">5. Then there is the Indian climate</h2>
            <p>
              India makes the bathing question particularly interesting.
            </p>
            <p className="font-medium">
              Not because Indian dogs necessarily need more baths &ndash; but because their environment can change considerably across the year.
            </p>
            <p>
              Summer can mean dust, heat and frequent outdoor activity. Monsoon can mean wet pavements, muddy parks and coats that take longer to dry. In humid cities such as Mumbai and Chennai, the experience of keeping a coat dry can be quite different from a dry spell in Delhi NCR or a cooler period in Bengaluru.
            </p>
            <p>
              But humidity itself should not become another simplistic rule:
            </p>
            <p className="italic">
              &ldquo;It&rsquo;s humid, therefore bathe your dog more.&rdquo;
            </p>
            <p className="font-medium">
              The more useful approach is to watch the actual coat and skin.
            </p>
            <ul className="space-y-2 list-disc pl-5">
              <li>Has the dog become dirty?</li>
              <li>Is the coat damp for prolonged periods?</li>
              <li>Has the dog been swimming?</li>
              <li>Has mud accumulated?</li>
              <li>Is there a persistent odour?</li>
              <li>Has the skin changed?</li>
            </ul>
            <p>
              Those observations are more meaningful than the date on the calendar.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">6. So, how often should dogs be bathed?</h2>
            <p>
              There is no single number that works for every dog.
            </p>
            <p>
              Veterinary guidance gives different ranges for different situations. For example, VCA notes that healthy non-shedding dogs may often be bathed around every six to eight weeks, while other sources describe monthly bathing as reasonable for many dogs depending on their circumstances. At the same time, active or dirty dogs may need bathing sooner, while dogs with dermatological conditions may follow a much more frequent veterinarian-directed schedule.
            </p>
            <p className="font-medium">
              These are examples, not prescriptions.
            </p>
            <p>
              Instead, think in terms of five questions:
            </p>

            <h3 className="text-xl font-medium mt-10 mb-3">Coat</h3>
            <p>What does the coat require?</p>

            <h3 className="text-xl font-medium mt-10 mb-3">Lifestyle</h3>
            <p>How active is the dog?</p>

            <h3 className="text-xl font-medium mt-10 mb-3">Outdoor exposure</h3>
            <p>What are they actually encountering?</p>

            <h3 className="text-xl font-medium mt-10 mb-3">Skin</h3>
            <p>Is the skin healthy, or is there an underlying concern?</p>

            <h3 className="text-xl font-medium mt-10 mb-3">Climate</h3>
            <p>What is the current environment doing to the coat?</p>

            <p>
              Put together, these five factors create a much more useful answer than &ldquo;once a month.&rdquo;
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">A practical bathing routine</h2>
            <p>
              For a healthy dog, think of bathing as one part of grooming rather than the entire grooming routine.
            </p>
            <p className="font-medium">
              Between baths:
            </p>
            <ul className="space-y-2 list-disc pl-5">
              <li>Brush according to the coat&rsquo;s needs.</li>
              <li>Check the skin while grooming &ndash; and <Link href="/journal/ticks-fleas-and-the-indian-dog" className="underline decoration-[#8D9A83] underline-offset-4">look for ticks</Link> after outdoor walks.</li>
              <li>Clean <Link href="/products/paw-cleaner" className="underline decoration-[#8D9A83] underline-offset-4">paws</Link> or visibly dirty areas after messy walks.</li>
              <li>Dry the coat properly after getting wet.</li>
              <li>Use products <Link href="/journal/what-we-found-in-most-pet-shampoos" className="underline decoration-[#8D9A83] underline-offset-4">formulated specifically for dogs</Link>.</li>
              <li>Adjust the routine when lifestyle or seasons change.</li>
            </ul>
            <p>
              Dog-specific shampoo matters because canine skin differs from human skin, and veterinary sources advise against using human shampoo for dogs.
            </p>
            <p>
              For a routine bath, a gentle dog-specific cleanser can become part of a considered grooming ritual rather than something used simply because the calendar says it is time. Furry Tail&rsquo;s <Link href="/products/gentle-daily-shampoo-santal-white-tea" className="underline decoration-[#8D9A83] underline-offset-4">Ritual &ndash; Gentle Daily Shampoo</Link> sits naturally within that philosophy: bathing as considered everyday care, rather than bathing for the sake of a schedule. If you want to know what is in the bottle, start with <Link href="/journal/reading-the-inci-list" className="underline decoration-[#8D9A83] underline-offset-4">how to read its ingredient list</Link>, <Link href="/journal/the-probiotic-question" className="underline decoration-[#8D9A83] underline-offset-4">what its ferment-based preservation does</Link> and <Link href="/journal/santal-a-primer" className="underline decoration-[#8D9A83] underline-offset-4">why it smells of sandalwood</Link>.
            </p>

            <div className="my-16">
              <Image
                src="/images/journal/how-often-bathe-dog/img4.webp"
                alt="A woman checking her golden retriever's coat and skin on a rug in a sunlit living room"
                width={1432}
                height={955}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            <h2 className="text-3xl font-display mt-16 mb-6">The takeaway</h2>
            <p className="font-medium">
              The best answer to &ldquo;how often should you bathe your dog?&rdquo; is rarely a number.
            </p>
            <p>
              It is a method.
            </p>
            <p className="font-medium">Look at the coat.</p>
            <p className="font-medium">Consider the lifestyle.</p>
            <p className="font-medium">Notice the outdoor exposure.</p>
            <p className="font-medium">Pay attention to the skin.</p>
            <p className="font-medium">Adapt to the climate.</p>
            <p>
              A dog living through Mumbai&rsquo;s monsoon, Delhi&rsquo;s dust or Bengaluru&rsquo;s changing weather may need a different routine at different points of the year.
            </p>
            <p>
              And sometimes the right answer is a bath.
            </p>
            <p>
              Sometimes it is a brush.
            </p>
            <p>
              Sometimes it is simply cleaning the paws.
            </p>
            <p>
              Good grooming is not about doing more.
            </p>
            <p className="font-medium text-xl italic mt-8 text-center">
              It is about knowing what your dog actually needs.
            </p>

            <div className="mt-16 text-center">
              <Link href="/journal" className="inline-flex items-center gap-2 border border-[#3B3A38] text-[#3B3A38] px-8 py-4 text-[0.75rem] font-medium tracking-[0.08em] uppercase hover:bg-[#3B3A38] hover:text-[#F8F5F1] transition-colors duration-[400ms]">
                Explore the Journal
              </Link>
              <p className="text-[0.875rem] text-[#3B3A38]/70 mt-4">
                Read more about ingredients and thoughtful pet care.
              </p>
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
