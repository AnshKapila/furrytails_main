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

const SLUG = 'why-your-dog-still-smells-after-a-bath';
const ARTICLE = getArticle(SLUG);

export const metadata: Metadata = articleMetadata(SLUG);

const FAQS: Faq[] = [
  {
    q: 'Why does my dog smell bad even after a bath?',
    a: 'A dog may smell after bathing because the coat is still damp, the shampoo has not been rinsed out completely, the smell is coming from bedding or a collar, or the source lies in the ears or skin. If the smell persists or returns repeatedly, a veterinary examination may be appropriate.',
  },
  {
    q: 'Why does my dog smell bad or musty when wet?',
    a: 'A wet coat can make an existing odour more noticeable, and dense or long hair may take longer to dry. A musty smell alone does not confirm a skin infection. Dry the coat thoroughly and watch for accompanying skin changes or persistent odour.',
  },
  {
    q: 'Can not drying a dog properly cause a smell?',
    a: 'Incomplete drying can contribute to a lingering damp smell. Towel-dry carefully and check beneath the surface hair, especially in dense coats and folds. Use a dryer only if suitable for your dog, with safe temperature and airflow.',
  },
  {
    q: 'Why do my dog’s ears smell after a bath?',
    a: 'Moisture may make an existing ear problem more noticeable, but persistent odour – especially with head shaking, scratching, redness, discharge or pain – needs veterinary assessment. Do not put cotton swabs or unprescribed products into the ear canal.',
  },
  {
    q: 'Should I bathe my dog again if it still smells?',
    a: 'Not automatically. First check whether the coat is fully dry, the shampoo was rinsed out, and bedding or collars may be contributing. If the odour persists or repeatedly returns without an obvious explanation, consult your veterinarian instead of [increasing bathing frequency](/journal/how-often-should-you-bathe-your-dog).',
  },
  {
    q: 'Can dog bedding or a collar make a clean dog smell again?',
    a: 'Yes, these are sensible places to investigate. Wash washable bedding, towels and collars according to their care instructions, then dry them fully. If the smell remains when your dog is clean, dry and away from these items, investigate other sources. More in [how to get rid of dog smell in the house](/journal/how-to-get-rid-of-dog-smell-in-house).',
  },
  {
    q: 'When should I take my dog to the vet for a bad smell?',
    a: 'Arrange a veterinary assessment for persistent or recurrent unexplained odour, particularly with itching, redness, sores, hair loss, discharge, greasy skin or discomfort. Seek prompt advice for painful ears or worsening skin lesions, and urgent care if your dog is severely unwell.',
  },
  {
    q: 'Can a freshness product replace a bath?',
    a: 'No. A between-bath freshness product such as [Refreshing Mist](/products/refreshing-mist) may support an everyday grooming routine when used according to its directions, but it does not replace appropriate cleansing or treat a medical cause of odour. More on when a [dry bath vs. a wet bath](/journal/dry-bath-vs-wet-bath-for-dogs) makes sense. Persistent ear or skin odour needs a different response.',
  },
  {
    q: "How do I get rid of dog smell on my dog naturally?",
    a: "Start with the source rather than a stronger scent: rinse shampoo out thoroughly, dry the coat right down to the skin, brush regularly, and wash bedding, towels and collars until they are fully dry. If the smell persists or comes with itching, redness or ear changes, see your vet rather than masking it.",
  },
];

const LINK = 'underline decoration-[#8D9A83] underline-offset-4';

function Source({ href, title, publisher }: { href: string; title: string; publisher: string }) {
  return (
    <p className="text-[0.875rem] text-[#3B3A38]/70 leading-[1.6]">
      Source: {publisher},{' '}
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${LINK} italic`}>
        {title}
      </a>
      .
    </p>
  );
}

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
              Why Your Dog Still Smells After a Bath.
            </h1>
            <p className="text-[1.125rem] md:text-[1.25rem] font-light text-[#3B3A38]/80 leading-[1.6]">
              Odour is a clue to investigate, not an automatic request for another bath.
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
              The bath is over. The towels are damp, the bathroom needs attention, and your dog is finally settling down. But there it is: a musty smell that never quite disappeared, or one that returned before the coat was properly dry.
            </p>
            <p>
              If your <strong>dog smells after a bath</strong>, another round of shampoo is not necessarily the answer. The source may be moisture held close to the skin, residue left during washing, a collar or bed that needs cleaning, or an odour coming from the ears or skin rather than the coat itself.
            </p>
            <p className="font-medium">
              The useful first step is to work out where the smell is coming from. A bath can remove dirt, but it cannot resolve every source of odour &ndash; and repeated washing may not address the underlying issue.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">First, work out what kind of smell it is</h2>
            <p>
              Begin with observation, not diagnosis. Notice when the odour appears, whether it affects the whole dog or one area, and whether anything else has changed.
            </p>
            <p>
              Does the smell seem strongest while the coat is wet? Does it remain after the coat has dried? Is it concentrated around the ears, paws, skin folds or another specific area? Are there signs such as scratching, redness, greasy skin or discharge?
            </p>
            <p>
              These details help you decide what to check next. They do not identify a condition on their own. A musty smell, for example, is not proof of a yeast problem, and a particular odour cannot reliably distinguish one medical cause from another.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">The coat may not be drying properly</h2>

            <div className="my-16">
              <Image
                src="/images/journal/dog-smells-after-bath/img1.webp"
                alt="Parting a golden retriever’s damp coat by hand to check whether the fur is still wet near the skin"
                width={1432}
                height={955}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            <p>
              A coat can feel dry on the surface while remaining damp closer to the skin. This matters particularly for dogs with dense undercoats, long hair, curls, mats or skin folds, where water can be harder to remove.
            </p>
            <p>
              Thorough drying is part of grooming, not simply a finishing touch. The American Kennel Club recommends drying a wet dog completely, noting that it can help reduce wet-dog odour and make it easier to spot skin changes.
            </p>
            <Source publisher="AKC" title="How to Dry Your Dog Properly" href="https://www.akc.org/expert-advice/health/dry-your-dog/" />
            <p>
              Start by pressing a clean, absorbent towel gently into the coat rather than rubbing vigorously and creating tangles. Pay attention to dense areas, the underside and the spaces around folds. If brushing is appropriate for your dog&rsquo;s coat, gentle brushing during drying may help separate the hair.
            </p>
            <p>
              Some dogs may benefit from a pet-specific dryer, while others do well with towel-drying and time in a comfortable, well-ventilated space. If you use a dryer, choose a suitable low-heat or cool setting, keep it moving and stop if your dog becomes distressed. Never assume that high heat is safe. Dogs with dense coats, matting or special grooming needs may benefit from advice from an experienced groomer or veterinarian.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Shampoo, rinsing and the temptation to wash again</h2>
            <p>
              A good bathing routine depends on more than fragrance. The shampoo should be formulated for dogs and appropriate for the individual animal; the directions should be followed, and the coat should be rinsed thoroughly.
            </p>
            <p>
              Product residue is one practical possibility to review if the coat feels coated or the skin seems irritated after bathing. But do not assume that every surfactant, fragrance or preservative is harmful. Ingredient suitability depends on the substance, formulation, exposure and the dog concerned &ndash; which is why it helps to know <Link href="/journal/reading-the-inci-list" className={LINK}>how to read a dog shampoo label</Link>.
            </p>
            <p>
              Veterinary guidance also cautions against a universal bathing schedule. <Link href="/journal/how-often-should-you-bathe-your-dog" className={LINK}>How often to bathe your dog</Link> varies with coat type, lifestyle and health; dogs with certain skin conditions may even need a veterinarian-directed bathing routine. If frequent washing seems necessary, seek advice rather than repeatedly increasing the frequency.
            </p>
            <Source publisher="VCA Animal Hospitals" title="Grooming and Coat Care for Your Dog" href="https://vcahospitals.com/know-your-pet/grooming-and-coat-care-for-your-dog" />
            <p>
              Furry Tail&rsquo;s <Link href="/products/gentle-daily-shampoo-santal-white-tea" className={LINK}>Gentle Daily Shampoo</Link> can be considered within an appropriate cleansing routine, provided its directions suit your dog. Its name should not be read as an instruction to bathe every day, and no shampoo should be expected to resolve every source of persistent odour.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Sometimes the smell isn&rsquo;t coming from the coat</h2>

            <h3 className="text-2xl [font-family:var(--font-cormorant),Georgia,serif] font-light mt-10 mb-4">Ears</h3>
            <p>
              An unusual or persistent ear odour deserves attention, especially when accompanied by head shaking, scratching, redness, discharge or discomfort. Ear inflammation can have several causes, including infection, allergies or other problems; examination is needed to establish what is happening.
            </p>
            <Source publisher="Merck Veterinary Manual" title="Ear Infections and Otitis Externa in Dogs" href="https://www.merckvetmanual.com/dog-owners/ear-disorders-of-dogs/ear-infections-and-otitis-externa-in-dogs" />
            <p>
              After a bath, gently dry the parts of the ear you can see. Do not insert cotton swabs or other objects into the ear canal, and do not use an ear treatment simply because the ear smells. If odour persists or other signs appear, contact your vet.
            </p>

            <h3 className="text-2xl [font-family:var(--font-cormorant),Georgia,serif] font-light mt-10 mb-4">Skin, folds and paws</h3>
            <p>
              Persistent odour alongside itching, redness, greasy or flaky skin, sores, hair loss or frequent licking calls for a closer look. Skin disorders and secondary infections can be associated with body odour, but the smell alone cannot establish the cause.
            </p>
            <Source publisher="VCA Animal Hospitals" title="Coat and Skin Appearance in the Healthy Dog" href="https://vcahospitals.com/lawrence/know-your-pet/coat-and-skin-appearance-in-the-healthy-dog" />
            <p>
              Folds and dense coats may need more attentive drying and grooming. If only the paws smell, check for visible dirt, dampness or irritation &ndash; the same <Link href="/journal/paw-cleaner-for-dogs-post-walk-paw-care" className={LINK}>post-walk paw check</Link> applies &ndash; without assuming that the paws explain the odour elsewhere. Avoid trying to mask a persistent, localised smell with fragrance.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">The smell may be coming back from the environment</h2>

            <div className="my-16">
              <Image
                src="/images/journal/dog-smells-after-bath/img2.webp"
                alt="A folded towel and a canvas collar drying on a wooden bench, with a golden retriever resting on its bed behind"
                width={1432}
                height={955}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            <p>
              Sometimes the dog is clean, but the things they return to are not. A damp towel, bedding, blanket, collar or harness can hold an unpleasant smell and transfer it back to the coat.
            </p>
            <p>
              This is especially worth checking during humid weather or <Link href="/journal/the-monsoon-ritual" className={LINK}>the monsoon</Link>, when bedding and grooming fabrics may take longer to dry. After a wet walk, dry your dog before they settle onto their bed. Wash washable fabrics according to their care instructions, allow them to dry fully, and let towels and grooming equipment dry between uses.
            </p>
            <p>
              Clean the collar or harness when appropriate for its material, and make sure it is completely dry before putting it back on. If the odour persists when the dog is fully dry and away from these items, return your attention to the dog rather than assuming the home is the source.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">A practical troubleshooting checklist</h2>
            <p>
              Use this sequence to organise your observations. It is not a diagnostic tool.
            </p>
            <ol className="space-y-6 mt-8 list-decimal pl-5">
              <li>
                <strong>Notice the timing.</strong><br />
                Does the smell appear immediately, after the coat dries, or after returning to the bed or outdoors?
              </li>
              <li>
                <strong>Check the coat.</strong><br />
                Feel gently through the hair to see whether the coat is still damp near the skin.
              </li>
              <li>
                <strong>Review the bath.</strong><br />
                Confirm that the shampoo was suitable for dogs, used as directed and rinsed thoroughly.
              </li>
              <li>
                <strong>Check the surroundings.</strong><br />
                Inspect bedding, collars, harnesses, towels and grooming tools.
              </li>
              <li>
                <strong>Look for other signs.</strong><br />
                Notice redness, itching, discharge, sores, pain, repeated licking or changes around the ears.
              </li>
              <li>
                <strong>Know when to stop.</strong><br />
                If the smell persists or repeatedly returns without an obvious grooming explanation, arrange veterinary advice.
              </li>
            </ol>

            <h2 className="text-3xl font-display mt-16 mb-6">When to stop troubleshooting and call the vet</h2>
            <p>
              Contact your veterinarian if the odour continues despite appropriate bathing and drying, repeatedly returns, or is accompanied by changes in the skin or ears. Itching, redness, sores, hair loss, discharge, greasy skin and discomfort all strengthen the case for an examination.
            </p>
            <p>
              Seek prompt veterinary advice for a painful ear, significant swelling, an open or worsening skin lesion, or marked discomfort. If your dog seems severely unwell or has sudden, severe symptoms, seek urgent veterinary care.
            </p>
            <p className="font-medium">
              Do not respond to a possible medical problem by increasing the fragrance, trying home remedies, or starting a medicated shampoo without guidance. Your veterinarian can examine the affected area and decide whether testing or specific treatment is needed.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Freshness starts with understanding the source</h2>

            <div className="my-16">
              <Image
                src="/images/journal/dog-smells-after-bath/img3.webp"
                alt="A clean, dry golden retriever relaxing on a woven rug in a sunlit living room"
                width={1432}
                height={955}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            <p>
              A healthy dog does not need to smell like a fragrance counter. The aim is a comfortable dog and a sensible routine: appropriate cleansing, thorough rinsing, careful drying and attention to changes that do not belong in an ordinary grooming routine.
            </p>
            <p>
              Furry Tail&rsquo;s <Link href="/products/refreshing-mist" className={LINK}>Refresh</Link> may have a place in an everyday between-bath freshness routine if its directions are suitable for your dog. It is not a treatment for persistent skin or ear odour, and it should never delay veterinary assessment.
            </p>
            <p className="font-medium text-xl italic mt-8 text-center">
              When the source is medical, the useful next step is not a stronger scent. It is understanding what needs attention.
            </p>

            <div className="mt-16 text-center">
              <Link href="/products/refreshing-mist" className="inline-flex items-center gap-2 border border-[#3B3A38] text-[#3B3A38] px-8 py-4 text-[0.75rem] font-medium tracking-[0.08em] uppercase hover:bg-[#3B3A38] hover:text-[#F8F5F1] transition-colors duration-[400ms]">
                Explore the between-bath freshness routine
              </Link>
            </div>

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
