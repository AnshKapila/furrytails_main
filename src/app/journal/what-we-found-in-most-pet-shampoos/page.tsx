import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientProviders from '@/components/ClientProviders';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What We Found in Most Pet Shampoos | Furry Tail',
  description: 'A closer look at pet shampoo ingredients, surfactants, fragrance, preservatives and what a considered formula should actually do.',
  alternates: { canonical: '/journal/what-we-found-in-most-pet-shampoos' },
  openGraph: {
    url: '/journal/what-we-found-in-most-pet-shampoos',
    title: 'The pet shampoo label is telling you more than the front of the bottle.',
    description: 'A closer look at pet shampoo ingredients, surfactants, fragrance, preservatives and what a considered formula should actually do.',
    images: ['/images/journal/what-we-found/main.png'],
  },
};

export default function ArticlePage() {
  return (
    <ClientProviders>
      <div className="min-h-screen bg-[#F8F5F1] text-[#3B3A38] selection:bg-[#8D9A83]/20">
        <Navbar />
        
        <main className="pt-32 pb-24 md:pt-40 md:pb-32">
          {/* Header */}
          <header className="max-w-[800px] mx-auto px-6 md:px-8 mb-16 md:mb-20">
            <div className="flex items-center gap-2 text-[0.6875rem] font-normal tracking-[0.06em] text-[#8D9A83] uppercase mb-6">
              <Link href="/journal" className="hover:text-[#3B3A38] transition-colors">Journal</Link>
              <span className="w-1 h-1 rounded-full bg-[#E9E2D7]" />
              <span>Editorial</span>
              <span className="w-1 h-1 rounded-full bg-[#E9E2D7]" />
              <span>5 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#3B3A38] leading-[1.1] mb-8 font-cormorant">
              What We Found in Most Pet Shampoos.
            </h1>
            <p className="text-[1.125rem] md:text-[1.25rem] font-light text-[#3B3A38]/80 leading-[1.6]">
              A closer look at what actually sits inside a conventional pet shampoo - and why the architecture of a formula matters more than the front-of-pack promise.
            </p>
          </header>

          {/* Hero Image */}
          <div className="max-w-[1000px] mx-auto px-6 md:px-8 mb-16 md:mb-24">
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-[#E9E2D7] overflow-hidden rounded-[2px]">
              <Image 
                src="/images/journal/what-we-found/main.png"
                alt="Pet shampoo bottle beside an open ingredient label and grooming essentials"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Article Content */}
          <article className="max-w-[700px] mx-auto px-6 md:px-8 font-light text-[#3B3A38] leading-[1.8] text-[1.0625rem] space-y-8">
            <p className="text-[1.25rem] leading-[1.6]">
              There is a particular moment in the bath when the shampoo starts to foam.
            </p>
            <p>
              The coat smells fresh. The bottle looks reassuring. The label says gentle, natural, soothing, perhaps even veterinary-inspired.
            </p>
            <p>
              And yet the most useful information is usually much smaller.<br />
              Turn the bottle around.
            </p>
            <p>
              The ingredient list tells a different story - not necessarily a bad one, but a more interesting one. Most pet shampoos are built around the same fundamental jobs: water, cleansing agents, conditioning ingredients, fragrance or botanical components, and something to keep the formula stable.
            </p>
            <p>
              The question is not whether an ingredient sounds familiar or unfamiliar. It is why it is there, what it is doing, and whether the whole formula makes sense for an animal's skin and grooming behaviour.
            </p>
            <p className="font-medium text-[1.125rem]">
              That is where a better shampoo conversation begins.
            </p>

            <div className="my-16">
              <Image src="/images/journal/what-we-found/img1.png" alt="Shampoo formulation and mixing" width={800} height={500} className="w-full rounded-[2px]" />
            </div>

            <h2 className="text-3xl font-cormorant mt-16 mb-6">A shampoo is a formulation, not a list of fashionable ingredients</h2>
            <p>
              A good pet shampoo has a fairly simple brief: remove dirt, excess oil and residue without making the skin feel like it has been scrubbed clean.
            </p>
            <p>
              Veterinary dermatology generally separates animal shampoos into three broad categories: <Link href="#" className="underline decoration-[#8D9A83] underline-offset-4">cleansing</Link>, antiparasitic and <Link href="#" className="underline decoration-[#8D9A83] underline-offset-4">medicated</Link>. A routine cleansing shampoo is fundamentally different from a product designed to manage infection, seborrhoea or parasites.
            </p>
            <p>
              This distinction matters. A shampoo containing chlorhexidine, for example, may have a legitimate place in veterinary dermatology. It does not automatically make sense as an everyday grooming shampoo. Medicated formulations are designed around a specific therapeutic purpose and should be used accordingly.
            </p>
            <p className="font-medium">
              The first question to ask of a bottle, then, is surprisingly basic:<br />
              What is this shampoo actually formulated to do?
            </p>
            <p>
              If the answer is simply cleansing, the rest of the formula should support that job without unnecessary drama.
            </p>

            <h2 className="text-3xl font-cormorant mt-16 mb-6">Then there are the surfactants</h2>
            <p>
              <Link href="#" className="underline decoration-[#8D9A83] underline-offset-4">Surfactants</Link> are the working part of shampoo. They help water spread across the coat, loosen oils and dirt, and lift that material away when the shampoo is rinsed. They are also responsible for much of what we perceive as "lather".
            </p>
            <p>
              And this is where marketing can distort the experience.<br />
              More foam does not necessarily mean more cleaning.
            </p>
            <p>
              A review of companion-animal skin research notes that surfactants are common in pet shampoos and that their effect depends on the specific surfactant, concentration and exposure. Some detergents can irritate the <Link href="#" className="underline decoration-[#8D9A83] underline-offset-4">skin barrier</Link> and compromise function, particularly with inappropriate exposure.
            </p>
            <p>
              That does not mean every sulphate is automatically dangerous, or that every unfamiliar surfactant is better. It means formulation matters.
            </p>
            <p>
              <Link href="#" className="underline decoration-[#8D9A83] underline-offset-4">Amino acid surfactants</Link> and other mild surfactant systems can be designed to cleanse effectively while taking a gentler approach to the skin. Furry Tail's <Link href="/products/gentle-daily-shampoo" className="underline decoration-[#8D9A83] underline-offset-4">Gentle Daily Shampoo</Link>, for example, uses amino-acid-derived cleansing agents including sodium cocoyl isethionate, alongside cocamidopropyl betaine and decyl glucoside.
            </p>
            <p>
              The result is intentionally less theatrical: less foam, more attention to what happens after the rinse.
            </p>

            <div className="my-16">
              <Image src="/images/journal/what-we-found/img4.png" alt="A clear bottle containing a flower" width={800} height={500} className="w-full rounded-[2px]" />
            </div>

            <h2 className="text-3xl font-cormorant mt-16 mb-6">"Natural" is not the same as well formulated</h2>
            <p>
              This is perhaps the most persistent problem with reading pet-care labels.
            </p>
            <p>
              An ingredient can be natural and still be inappropriate for a particular animal, concentration or formulation. An ingredient can also have a chemical-sounding <Link href="#" className="underline decoration-[#8D9A83] underline-offset-4">INCI</Link> name and perform a perfectly useful job.
            </p>
            <p>
              The word "natural" tells you very little on its own.
            </p>
            <p>
              Take fragrance. A botanical essential oil may sound gentler than a synthetic fragrance molecule. But some <Link href="#" className="underline decoration-[#8D9A83] underline-offset-4">essential oils</Link> and their constituents can present species-specific risks, particularly for cats. Feline grooming behaviour also matters because topical substances may eventually be ingested through licking.
            </p>
            <p>
              This is why "natural" should never replace the more useful questions:<br />
              Which species? At what concentration? For what purpose? In what finished formula?
            </p>
            <p>
              The same principle applies to <Link href="#" className="underline decoration-[#8D9A83] underline-offset-4">preservatives</Link>.
            </p>
            <p>
              A water-based product needs a preservation strategy. The absence of a conventional preservative does not automatically make a product better; the formula still needs to remain microbiologically stable.
            </p>
            <p>
              Furry Tail's approach is different by design: the Gentle Daily Shampoo uses Leuconostoc/Radish Root Ferment Filtrate as part of its preservation system rather than synthetic preservatives, according to the current product formulation.
            </p>
            <p>
              The important point is not that one preservation philosophy is universally superior. It is that preservation is part of formulation, not an ingredient to remove for marketing purposes.
            </p>

            <div className="my-16">
              <Image src="/images/journal/what-we-found/img3.png" alt="Herbs and essential oils" width={800} height={500} className="w-full rounded-[2px]" />
            </div>

            <h2 className="text-3xl font-cormorant mt-16 mb-6">Fragrance deserves more thought than "fresh"</h2>
            <p>
              Pet shampoo has traditionally been associated with a particular smell: unmistakably clean, often strong, sometimes difficult to place.
            </p>
            <p>
              But <Link href="#" className="underline decoration-[#8D9A83] underline-offset-4">fragrance</Link> is not simply decoration.
            </p>
            <p>
              For a premium grooming ritual, scent can change how the entire experience feels. At the same time, fragrance choices have to account for species, exposure and known sensitivities.
            </p>
            <p>
              This becomes particularly important when dogs and cats share a product.
            </p>
            <p>
              Cats are not simply small dogs. Their metabolism, grooming behaviour and sensitivity to certain compounds can make ingredient and fragrance selection a species-specific formulation question. Furry Tail's formulation process explicitly includes species eligibility and fragrance review before finalisation.
            </p>
            <p>
              That is a more useful standard than simply asking whether a shampoo "smells good." It should smell considered and make sense for the animal using it.
            </p>

            <div className="my-16 p-8 bg-[#F0EBE4] border border-[#E9E2D7] rounded-[2px]">
              <h3 className="text-2xl font-cormorant mb-4">The ingredient list is where the quiet details live</h3>
              <p className="mb-4">A front label might give you five words. The INCI list gives you the architecture. Look for the functional groups:</p>
              <ul className="list-disc pl-5 space-y-2 text-[#3B3A38]/80">
                <li><strong>Cleansers / surfactants</strong> - what actually removes dirt and excess oil?</li>
                <li><strong>Conditioners</strong> - what helps the coat feel softer and easier to manage?</li>
                <li><strong>Humectants</strong> - what helps retain moisture?</li>
                <li><strong>Botanicals and extracts</strong> - why are they included?</li>
                <li><strong>Fragrance components</strong> - what creates the scent, and for which species?</li>
                <li><strong>Preservation system</strong> - how is the water-based formula kept stable?</li>
                <li><strong>pH adjusters and thickeners</strong> - what keeps the finished formula usable and consistent?</li>
              </ul>
            </div>

            <p>
              This is also why ingredient literacy is more valuable than memorising a blacklist.
            </p>
            <p>
              For example, veterinary sources recognise a wide range of legitimate ingredients in cleansing and medicated shampoos, depending on the intended use. Oatmeal, aloe, fatty acids, glycerin and other conditioning or moisturising components can appear in routine formulations, while ingredients such as chlorhexidine, miconazole or benzoyl peroxide have more targeted veterinary applications.
            </p>
            <p className="font-medium text-lg text-center my-10 italic">Context changes everything.</p>
            
            <h2 className="text-3xl font-cormorant mt-16 mb-6">What should you actually look for?</h2>
            <p>
              For an everyday grooming shampoo, start with the boring questions. They are usually the important ones.
            </p>
            <ul className="space-y-6 mt-8">
              <li>
                <strong>Is it made specifically for dogs or cats?</strong><br />
                Species suitability comes before fragrance, packaging or ingredient fashion.
              </li>
              <li>
                <strong>Does the cleansing system look considered?</strong><br />
                A shampoo should clean the coat without relying on aggressive cleansing simply to create a dramatic lather.
              </li>
              <li>
                <strong>Is there a clear reason for the conditioning and botanical ingredients?</strong><br />
                A long list is not automatically a thoughtful one.
              </li>
              <li>
                <strong>Does the fragrance make sense for the species?</strong><br />
                Especially with cats, this deserves closer attention.
              </li>
              <li>
                <strong>Is the product clearly a cleansing shampoo or a medicated treatment?</strong><br />
                If your pet has persistent itching, redness, lesions, unusual hair loss or another skin problem, a grooming shampoo is not a substitute for veterinary assessment. Veterinary dermatology distinguishes routine cleansing from therapeutic treatment for good reason.
              </li>
            </ul>

            <div className="my-16">
              <Image src="/images/journal/what-we-found/img2.png" alt="Dog being washed" width={800} height={500} className="w-full rounded-[2px]" />
            </div>

            <h2 className="text-3xl font-cormorant mt-16 mb-6">The better shampoo is not the louder one</h2>
            <p>
              A well-formulated pet shampoo does not need to make ten promises. It needs to get a few things right.
            </p>
            <p>
              It should clean effectively. It should suit the intended species. Its surfactant system should make sense. Its preservation strategy should be deliberate. Its fragrance should be considered. And <Link href="/ingredients" className="underline decoration-[#8D9A83] underline-offset-4">every ingredient has a name and a reason</Link> for being there.
            </p>
            <p>
              That is the difference between reading a label and actually understanding one.
            </p>
            <p>
              The next time you reach for a pet shampoo, turn the bottle around before you open it.
            </p>
            <p className="font-medium text-xl italic mt-8 text-center">
              Ignore the bubbles for a moment.<br />
              Read what is underneath them.
            </p>
            
            <div className="mt-16 text-center">
              <Link href="/shop" className="inline-flex items-center gap-2 border border-[#3B3A38] text-[#3B3A38] px-8 py-4 text-[0.75rem] font-medium tracking-[0.08em] uppercase hover:bg-[#3B3A38] hover:text-[#F8F5F1] transition-colors duration-[400ms]">
                Explore The Ritual
              </Link>
            </div>
            
          </article>

          {/* FAQs Section */}
          <section className="max-w-[800px] mx-auto px-6 md:px-8 mt-32 border-t border-[#E9E2D7] pt-16">
            <h2 className="text-2xl md:text-3xl font-cormorant mb-10 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-medium text-[1.0625rem] mb-2">What ingredients should be in a dog shampoo?</h3>
                <p className="text-[#3B3A38]/80 text-[0.9375rem] leading-relaxed">A routine dog shampoo generally needs an appropriate cleansing system plus ingredients that support the coat and skin, such as conditioners or moisturising components where appropriate. There is no universal "best" ingredient list because formulation depends on the product's purpose, the dog's skin and coat, and whether the shampoo is routine or medicated.</p>
              </div>
              
              <div>
                <h3 className="font-medium text-[1.0625rem] mb-2">What ingredients should I avoid in pet shampoo?</h3>
                <p className="text-[#3B3A38]/80 text-[0.9375rem] leading-relaxed">Avoid thinking in terms of a universal blacklist. Some ingredients can be appropriate in one formulation and inappropriate in another depending on concentration, species and purpose. Particular care is warranted with strong detergents, fragrance ingredients and essential oils, especially for cats. The finished formulation and intended use matter more than a simplistic "natural versus synthetic" label.</p>
              </div>

              <div>
                <h3 className="font-medium text-[1.0625rem] mb-2">Are sulphates bad for dog shampoo?</h3>
                <p className="text-[#3B3A38]/80 text-[0.9375rem] leading-relaxed">Not every sulphate should be treated identically, but stronger detergent systems can be irritating or drying depending on the ingredient, concentration and exposure. A good shampoo should be judged by its complete cleansing system rather than by lather alone. Mild surfactant systems can provide effective cleansing without making maximum foam the goal.</p>
              </div>

              <div>
                <h3 className="font-medium text-[1.0625rem] mb-2">Can cats use dog shampoo?</h3>
                <p className="text-[#3B3A38]/80 text-[0.9375rem] leading-relaxed">Only when the specific product is explicitly formulated and labelled for cats as well as dogs. Cats have different metabolic and grooming considerations, so a product suitable for dogs should not automatically be assumed to be suitable for cats. Furry Tail's current Gentle Daily Shampoo range is designated for <Link href="/shop" className="underline decoration-[#8D9A83] underline-offset-4">dogs and cats</Link>.</p>
              </div>

              <div>
                <h3 className="font-medium text-[1.0625rem] mb-2">Are essential oils safe in pet shampoo?</h3>
                <p className="text-[#3B3A38]/80 text-[0.9375rem] leading-relaxed">Essential oils require species-specific consideration. Some essential oils and their constituents can be harmful to cats, and topical exposure can become ingestion through grooming. A product's fragrance system should therefore be evaluated as part of the complete formulation rather than judged simply by whether its ingredients are botanical.</p>
              </div>

              <div>
                <h3 className="font-medium text-[1.0625rem] mb-2">What is the difference between cleansing and medicated pet shampoo?</h3>
                <p className="text-[#3B3A38]/80 text-[0.9375rem] leading-relaxed">Cleansing shampoos are primarily intended to remove dirt and excess oils from the coat. Medicated shampoos contain active ingredients intended to manage specific dermatological problems, such as bacterial or fungal conditions. They are not interchangeable, and therapeutic products may require veterinary guidance regarding application and contact time.</p>
              </div>

              <div>
                <h3 className="font-medium text-[1.0625rem] mb-2">Does more foam mean a better pet shampoo?</h3>
                <p className="text-[#3B3A38]/80 text-[0.9375rem] leading-relaxed">No. Foam is largely a sensory and formulation characteristic; it is not a reliable measure of cleansing quality. A shampoo can clean effectively with a lower-lather surfactant system. What matters is how well the finished formula removes dirt and excess oil while remaining appropriate for the animal's skin and coat.</p>
              </div>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </ClientProviders>
  );
}
