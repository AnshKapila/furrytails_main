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

const SLUG = 'paw-cleaner-for-dogs-post-walk-paw-care';
const ARTICLE = getArticle(SLUG);

export const metadata: Metadata = articleMetadata(SLUG);

const FAQS: Faq[] = [
  {
    q: 'Do I need to clean my dog’s paws after every walk?',
    a: 'Not necessarily. The appropriate response depends on what your dog encountered. A clean, dry paw after a short walk may only need inspection, while muddy, wet or visibly dirty paws may benefit from cleaning. The goal is proportionate care rather than a rigid after-every-walk rule.',
  },
  {
    q: 'How do I clean my dog’s paws after a walk?',
    a: 'Start by inspecting the pads, toes and nails. Remove loose debris gently, clean the paws using an appropriate dog-specific method when needed, then dry them carefully. If something is deeply embedded or the paw appears injured, seek veterinary guidance rather than trying to remove it aggressively.',
  },
  {
    q: 'What is the best paw cleaner for dogs?',
    a: 'There is no single best product for every dog. Consider the dog’s individual sensitivity, the type of exposure and the product’s intended use. A dedicated [paw cleaner](/products/paw-cleaner) can be useful for targeted post-walk cleaning, but it should not be presented as a treatment for an underlying paw condition. [Reading the ingredient list](/journal/reading-the-inci-list) is a good place to start.',
  },
  {
    q: 'Can I use a paw cleaner every day?',
    a: 'It depends on the product and the individual dog. Routine cleaning should be gentle and proportionate to actual exposure. Repeated or aggressive cleansing can be irritating for some dogs, particularly those with existing skin problems. Follow the product’s directions and speak with a veterinarian if irritation develops.',
  },
  {
    q: 'Should I clean my dog’s paws during monsoon?',
    a: 'Wet and muddy walks may make paw cleaning and drying more relevant, but monsoon does not automatically mean every dog needs intensive cleaning. Inspect the paws, remove visible mud when necessary and dry them carefully after wet walks. More in [the monsoon ritual](/journal/the-monsoon-ritual).',
  },
  {
    q: 'How do I clean muddy dog paws?',
    a: 'Remove loose mud gently, then clean the paws using an appropriate dog-specific method. Pay attention to the spaces between the toes and dry thoroughly afterward. If mud contains an unidentified or potentially harmful substance, veterinary advice may be more appropriate than routine grooming.',
  },
  {
    q: 'Should I dry my dog’s paws after cleaning?',
    a: 'Yes, when the cleaning process leaves the paws wet. Gentle drying is particularly useful around the spaces between the toes. Moisture and friction can be relevant factors in some interdigital skin problems, although wet paws alone do not mean a dog will develop one.',
  },
  {
    q: 'Can I use human soap on my dog’s paws?',
    a: 'A dog-specific product is the more appropriate choice for routine canine grooming. Human cleansers are formulated for human skin and should not automatically be assumed suitable for dogs. If your dog’s paws are already irritated, consult a veterinarian rather than experimenting with household products.',
  },
  {
    q: 'When should I worry about red or irritated paws?',
    a: 'Persistent redness, swelling, pain, limping, discharge, wounds or repeated licking or chewing deserve attention. Paw irritation can have several causes, including trauma, allergens, parasites and infection, so persistent symptoms should not simply be managed with more cleaning.',
  },
  {
    q: 'Is paw cleaning necessary for apartment dogs?',
    a: 'Not every apartment dog needs the same routine. However, dogs moving between outdoor surfaces and indoor floors may benefit from checking their paws and cleaning visible dirt or mud when appropriate. The amount of cleaning should reflect the actual walk rather than apartment living alone.',
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
              The Paw Problem: What Happens Between Walks.
              <span className="block mt-4 text-[0.875rem] md:text-[0.9375rem] [font-family:var(--font-inter),Inter,sans-serif] font-normal tracking-[0.06em] uppercase text-[#8D9A83] leading-[1.4]">
                Paw cleaner for dogs: the post-walk routine
              </span>
            </h1>
            <p className="text-[1.125rem] md:text-[1.25rem] font-light text-[#3B3A38]/80 leading-[1.6]">
              The walk ends at the front door. But for your dog&rsquo;s paws, it doesn&rsquo;t quite end there.
            </p>
          </header>

          {/* Hero Image */}
          <div className="max-w-[1000px] mx-auto px-6 md:px-8 mb-16 md:mb-24">
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-[#E9E2D7] overflow-hidden rounded-[2px]">
              <Image
                src={ARTICLE.image.src}
                alt={ARTICLE.image.alt}
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
              They have crossed pavement, grass, soil, dust, wet surfaces and perhaps a muddy patch or two. Then those same paws move across the entrance, the floor, the rug &ndash; and eventually the sofa or bed.
            </p>
            <p>
              This is not an argument for treating every walk like a contamination event. Nor does every paw need an elaborate cleaning ritual.
            </p>
            <p>
              It is simply a useful way to think about <strong>dog paw cleaning</strong>: the paw is the transition point between two environments.
            </p>
            <p className="font-medium text-[1.125rem]">
              And once you see it that way, the question becomes less <em>How do I keep my dog&rsquo;s paws perfectly clean?</em> and more <em>What did the paws actually encounter today?</em>
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">The walk ends at the door. The paws don&rsquo;t.</h2>

            <div className="my-16">
              <Image
                src="/images/journal/paw-problem/img1.webp"
                alt="A woman kneeling on a jute doormat to inspect her dog’s paw pads after a walk"
                width={1432}
                height={955}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            <p>
              Dog paw pads are not decorative surfaces. They cushion movement, provide traction and help protect the feet from rough terrain and environmental conditions. Because dogs bear weight through relatively small areas of their feet, even minor paw injuries can affect how they walk.
            </p>
            <p>
              The spaces between the toes deserve attention too.
            </p>
            <p>
              A quick post-walk inspection can reveal things that are easy to miss at a glance: a small piece of plant material, accumulated mud, a cut, swelling or something unusual around the pads or nails.
            </p>
            <p>
              Veterinary guidance recommends checking paws after walks for cuts, bruises and foreign material, including around the toes and pads.
            </p>
            <p>
              The point isn&rsquo;t to inspect obsessively.
            </p>
            <p className="font-medium">
              It is to notice.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">What your dog&rsquo;s paws actually pick up outside</h2>
            <p>
              For an urban dog, a walk can involve several surfaces within twenty minutes.
            </p>
            <p>
              There may be dry pavement, a grassy verge, soil around a tree, a damp patch near a drain and the dusty entrance to an apartment complex.
            </p>
            <p>
              In Indian cities, the combination changes with the weather. Delhi NCR can bring dry dust and heat. Bengaluru may alternate between dry paths and sudden rain. Mumbai and other coastal cities can add humidity and wet surfaces. During monsoon, muddy paths become part of ordinary walking life.
            </p>
            <p>
              Most of this is simply environmental material &ndash; not something inherently dangerous.
            </p>
            <p>
              But visible dirt, mud and moisture are reasonable reasons to clean paws before moving further into the home.
            </p>
            <p>
              The response should match the exposure.
            </p>
            <ul className="space-y-3 pl-5 list-disc font-medium">
              <li>Clean, dry paws after a short walk may need little more than a look.</li>
              <li>Mud-covered paws may need proper cleaning.</li>
              <li>Wet paws may need careful drying.</li>
            </ul>
            <p>
              And if a dog has stepped into a substance that appears chemically irritating or otherwise concerning, ordinary grooming should not be treated as the solution. Veterinary guidance may be appropriate. Chemical burns and other paw injuries can require specific care.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">How to clean dog paws after a walk</h2>

            <div className="my-16">
              <Image
                src="/images/journal/paw-problem/img2.webp"
                alt="Drying a dog’s muddy front paw with a soft towel at the front door, including between the toes"
                width={1432}
                height={955}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            <p>
              There is no prize for the longest cleaning routine.
            </p>
            <p>
              A useful framework is:
            </p>
            <p className="font-medium text-[1.125rem] text-center tracking-[0.04em]">
              LOOK &rarr; REMOVE &rarr; CLEAN &rarr; DRY &rarr; OBSERVE
            </p>
            <ol className="space-y-6 mt-8 list-decimal pl-5">
              <li>
                <strong>Look.</strong><br />
                Check the pads, between the toes, around the nails and the visible surface of the paw.
              </li>
              <li>
                <strong>Remove.</strong><br />
                Gently remove visible dirt or loose debris. If something appears deeply embedded, don&rsquo;t dig at it. Veterinary guidance specifically cautions against attempting to extract deeply lodged foreign material yourself.
              </li>
              <li>
                <strong>Clean.</strong><br />
                For ordinary dirt or mud, use an appropriate dog-specific cleaning method. A <Link href="/products/paw-cleaner" className={LINK}>paw cleaner for dogs</Link> can be useful when targeted cleaning makes more sense than bathing the entire dog. Veterinary and pet-care guidance commonly recommends wiping or washing paws after outdoor exposure when dirt or potentially irritating material is present.
              </li>
              <li>
                <strong>Dry.</strong><br />
                Do not stop at cleaning. If paws are wet, gently dry them, paying attention to the spaces between the toes.
              </li>
              <li>
                <strong>Observe.</strong><br />
                Notice anything that doesn&rsquo;t look or feel normal: persistent redness, swelling, pain, discharge, repeated licking or a visible wound.
              </li>
            </ol>
            <p className="font-medium">
              That last step is important because cleaning is not treatment.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">A paw cleaner is not a miniature bath</h2>
            <p>
              This distinction matters.
            </p>
            <p className="font-medium text-[1.125rem]">
              Paw cleaning &ne; full-body bathing.
            </p>
            <p>
              A dog can return from a dusty walk with dirty paws while the rest of its coat remains perfectly acceptable.
            </p>
            <p>
              In that situation, targeted cleaning can be a more proportionate response than turning a twenty-minute walk into a full grooming session.
            </p>
            <p>
              Likewise, a muddy monsoon walk may genuinely require more thorough washing &ndash; and when the whole coat needs it, that is a job for a bath with <Link href="/products/gentle-daily-shampoo-santal-white-tea" className={LINK}>Ritual &ndash; Gentle Daily Shampoo</Link>, taken <Link href="/journal/how-often-should-you-bathe-your-dog" className={LINK}>as often as the dog actually needs</Link>.
            </p>
            <p>
              The point is not that a paw cleaner is always better than a bath.
            </p>
            <p>
              It is that <strong>different exposures call for different levels of cleaning</strong>.
            </p>
            <p>
              The current pet-care market reflects this distinction, with dedicated paw-cleaning products positioned specifically for post-walk use.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">When cleaning becomes too much</h2>
            <p>
              Good hygiene is not the same as maximum hygiene.
            </p>
            <p>
              Repeated or overly aggressive cleansing can be irritating for some dogs, particularly when there is already an underlying skin problem. Veterinary dermatology references consider bathing frequency and excessive wetting relevant when evaluating certain skin conditions.
            </p>
            <p>
              That does not mean routine paw cleaning is harmful.
            </p>
            <p>
              It means <strong>clean according to what the paws encountered</strong> rather than following a rigid rule that every paw must be scrubbed after every outing.
            </p>
            <p>
              Avoid aggressive rubbing. Avoid improvising with household cleansers. And don&rsquo;t assume that a product intended for humans is automatically appropriate for canine skin &ndash; if in doubt, <Link href="/journal/reading-the-inci-list" className={LINK}>read the INCI list</Link>.
            </p>
            <p className="font-medium">
              A good post-walk routine should leave the paws clean enough &ndash; not stripped, scrubbed or irritated.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Monsoon changes the routine</h2>

            <div className="my-16">
              <Image
                src="/images/journal/paw-problem/img3.webp"
                alt="A woman with a folded umbrella walking her wet, mud-splashed dog into an apartment lobby during monsoon rain"
                width={1432}
                height={955}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            <p>
              Indian monsoon weather makes this particularly relevant.
            </p>
            <p>
              A short walk can suddenly involve wet pavement, mud and standing water. Dogs may return with damp fur around their feet and material packed between their toes.
            </p>
            <p>
              The answer isn&rsquo;t necessarily more baths.
            </p>
            <p>
              It is more attention to the transition.
            </p>
            <p>
              Check the paws. Clean visible mud when needed. Dry them properly. Look between the toes. (<Link href="/journal/the-monsoon-ritual" className={LINK}>The monsoon ritual</Link> covers the rest of the wet-season routine, from damp coats to ticks.)
            </p>
            <p>
              Paw anatomy and skin conditions vary between dogs, and moisture can be relevant to some interdigital problems; veterinary literature describes the role that moisture, friction and tissue maceration can play in certain interdigital disorders.
            </p>
            <p>
              But that is very different from saying that every wet paw will develop a problem.
            </p>
            <p className="font-medium">
              Monsoon care is about observation, not alarm.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Where a paw cleaner fits</h2>
            <p>
              This is where a targeted product has a useful role.
            </p>
            <p>
              <Link href="/products/paw-cleaner" className={LINK}>Remedy &ndash; Paw Foam Cleaner</Link> sits within Furry Tail&rsquo;s <strong>Remedy</strong> care family: the part of the routine concerned with targeted, everyday care.
            </p>
            <p>
              Its relevance is simple.
            </p>
            <p>
              After a walk, not every dog needs a bath.
            </p>
            <p>
              Sometimes the question is simply: <em>What do I do with these paws before we continue into the house?</em>
            </p>
            <p>
              A dedicated paw-cleaning format can make that transition easier to incorporate into an everyday grooming routine.
            </p>
            <p>
              But the principle comes first: use cleaning where cleaning is warranted, follow the product&rsquo;s directions, and don&rsquo;t confuse routine grooming with veterinary treatment. That restraint is part of <Link href="/ingredients" className={LINK}>the Furry Tail approach to formulation</Link>.
            </p>
            <p className="font-medium">
              A paw cleaner does not diagnose paw disease, treat an infection or replace veterinary care.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">When paws need more than cleaning</h2>
            <p>
              Some changes deserve more attention than another wipe.
            </p>
            <p>
              Persistent redness, swelling, pain, limping, bleeding, discharge, significant odour, repeated licking or chewing, wounds or suspected chemical exposure are reasons to consider veterinary assessment.
            </p>
            <p>
              Paw licking in particular is not a diagnosis (<Link href="/journal/why-is-my-dog-licking-its-paws" className="underline decoration-[#8D9A83] underline-offset-4">why dogs lick their paws</Link>). It can occur with several different skin problems, including allergies, <Link href="/journal/ticks-fleas-and-the-indian-dog" className={LINK}>parasites</Link> and infections.
            </p>
            <p>
              So if something keeps happening, don&rsquo;t simply increase the cleaning routine.
            </p>
            <p className="font-medium">
              Find out why.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">The better way to think about paw care</h2>

            <div className="my-16">
              <Image
                src="/images/journal/paw-problem/img4.webp"
                alt="A dog on a lead stepping from a sunlit street across the threshold into an apartment entrance"
                width={1432}
                height={955}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            <p>
              The most useful post-walk routine is not complicated:
            </p>
            <p className="font-medium text-[1.125rem] text-center tracking-[0.04em]">
              STREET &rarr; PAWS &rarr; HOME
            </p>
            <p>
              The street provides the exposure.
            </p>
            <p>
              The paws carry the evidence.
            </p>
            <p>
              The home is where you decide what needs to be cleaned.
            </p>
            <p>
              Sometimes that means nothing more than a quick inspection. Sometimes it means wiping. Sometimes it means washing and drying. And occasionally, it means stopping the grooming routine altogether and asking a veterinarian what is going on.
            </p>
            <p>
              Good paw care isn&rsquo;t about making paws sterile.
            </p>
            <p>
              It is about paying attention to what they encountered &ndash; and responding proportionately.
            </p>
            <p className="font-medium text-xl italic mt-8 text-center">
              The walk may end at the door. The care continues quietly after it.
            </p>

            <div className="mt-16 text-center">
              <Link href="/products/paw-cleaner" className="inline-flex items-center gap-2 border border-[#3B3A38] text-[#3B3A38] px-8 py-4 text-[0.75rem] font-medium tracking-[0.08em] uppercase hover:bg-[#3B3A38] hover:text-[#F8F5F1] transition-colors duration-[400ms]">
                Explore Remedy &ndash; Paw Foam Cleaner
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
