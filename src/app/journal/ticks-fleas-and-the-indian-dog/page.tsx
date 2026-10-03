import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientProviders from '@/components/ClientProviders';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ticks, Fleas & the Indian Dog: What Actually Works | Furry Tail',
  description: 'Where Indian dogs actually encounter ticks, why grooming isn’t parasite control, what to do when you find a tick, and a five-step routine for tick and flea prevention.',
  alternates: { canonical: '/journal/ticks-fleas-and-the-indian-dog' },
  openGraph: {
    url: '/journal/ticks-fleas-and-the-indian-dog',
    title: 'Ticks, fleas & the Indian dog.',
    description: 'Don’t build your parasite routine around the tick you can see. Build it around the exposure you can manage.',
    images: ['/images/journal/ticks-fleas-indian-dog/main.webp'],
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
              <span>Care</span>
              <span className="w-1 h-1 rounded-full bg-[#E9E2D7]" />
              <span>7 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#3B3A38] leading-[1.1] mb-8 font-display">
              Ticks, fleas &amp; the Indian dog: what actually works.
            </h1>
            <p className="text-[1.125rem] md:text-[1.25rem] font-light text-[#3B3A38]/80 leading-[1.6]">
              The tick you can see is only part of the story.
            </p>
          </header>

          {/* Hero Image */}
          <div className="max-w-[1000px] mx-auto px-6 md:px-8 mb-16 md:mb-24">
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-[#E9E2D7] overflow-hidden rounded-[2px]">
              <Image
                src="/images/journal/ticks-fleas-indian-dog/main.webp"
                alt="A woman walking her golden retriever along a rain-washed path through a green city park"
                fill
                className="object-cover object-[center_60%]"
                priority
              />
            </div>
          </div>

          {/* Article Content */}
          <article className="max-w-[700px] mx-auto px-6 md:px-8 font-light text-[#3B3A38] leading-[1.8] text-[1.0625rem] space-y-8">
            <p className="text-[1.25rem] leading-[1.6]">
              Finding a tick on your dog can make the problem seem deceptively simple.
            </p>
            <p>
              Remove it. Clean the area. Move on.
            </p>
            <p>
              But the visible parasite is only one part of the story.
            </p>
            <p className="font-medium text-[1.125rem]">
              The more useful question is: how did the tick get there, and what reduces the chance of encountering another one?
            </p>
            <p>
              That distinction matters in India, where dogs move between apartments, parks, gardens, streets, travel environments and shared outdoor spaces. Research from India has documented canine ticks and tick-borne pathogens across very different regions, including Delhi and Mumbai. More recent Indian studies also show that tick abundance varies with climate, habitat, host and season rather than following one universal national &ldquo;tick season.&rdquo;
            </p>
            <p className="font-medium">
              Good tick and flea prevention for dogs is therefore less about one product and more about understanding exposure.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">The tick you can see is only part of the problem</h2>
            <p>
              A tick on a dog is evidence of exposure &ndash; not necessarily the beginning or end of the story.
            </p>
            <p>
              Ticks can be encountered outdoors and can also be carried into the home on pets. The CDC recommends checking dogs regularly, particularly after outdoor exposure, and discussing appropriate tick-prevention products with a veterinarian.
            </p>
            <p>
              This creates an important distinction between five different activities:
            </p>
            <ul className="space-y-4 list-disc pl-5">
              <li><strong>Grooming</strong> cleans and allows inspection.</li>
              <li><strong>Removal</strong> takes an existing tick off the dog.</li>
              <li><strong>Deterrence</strong> may help reduce the likelihood of certain parasite encounters.</li>
              <li><strong>Environmental management</strong> addresses places where parasites or their life stages may persist.</li>
              <li><strong>Veterinary parasite control</strong> uses appropriate antiparasitic products and protocols according to the dog&rsquo;s circumstances.</li>
            </ul>
            <p className="font-medium">
              They overlap. They are not interchangeable.
            </p>

            <div className="my-16">
              <Image
                src="/images/journal/ticks-fleas-indian-dog/img1.webp"
                alt="A golden retriever trotting along a wet garden path between lush plants, its owner walking behind"
                width={1431}
                height={806}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            <h2 className="text-3xl font-display mt-16 mb-6">Where Indian dogs actually encounter ticks</h2>
            <p>
              The idea of a single Indian &ldquo;tick season&rdquo; is too simple.
            </p>
            <p>
              Tick populations respond to temperature, humidity, rainfall, habitat and host availability. Research in Tamil Nadu found seasonal variation in tick abundance and reported that rainfall, relative humidity and temperature influenced tick activity. A recent longitudinal study in Wayanad similarly found substantial seasonal variation, with tick abundance highest during the monsoon across the animals studied.
            </p>
            <p className="font-medium">
              That does not mean every dog in India faces its highest risk during the monsoon.
            </p>
            <p>
              The ecology of a dog living in an apartment in Delhi is different from that of a dog regularly moving through vegetation in Kerala. Even within cities, exposure can change with access to gardens, parks, open ground and other animals.
            </p>
            <p>
              Indian research has also documented <em>Rhipicephalus</em> ticks among dogs in urban Delhi and Mumbai, while other tick genera occur in different ecological settings.
            </p>
            <p>
              So &ldquo;urban dog&rdquo; does not automatically mean &ldquo;low exposure.&rdquo;
            </p>

            <div className="my-16">
              <Image
                src="/images/journal/ticks-fleas-indian-dog/img2.webp"
                alt="A woman parting her dog's coat to check the skin as it lies on a rug in a sunlit living room"
                width={1429}
                height={1071}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            <h2 className="text-3xl font-display mt-16 mb-6">Grooming helps you see the problem. It doesn&rsquo;t solve all of it.</h2>
            <p>
              A good grooming routine has an important role in parasite awareness.
            </p>
            <p>
              Brushing allows you to look through the coat. Regular inspection can help reveal attached ticks, unusual skin changes or signs associated with fleas. The CDC recommends checking dogs for ticks daily, particularly after outdoor exposure.
            </p>
            <p>
              But grooming is not the same as parasite control.
            </p>
            <p>
              A freshly bathed dog can still encounter a tick.
            </p>
            <p>
              A well-brushed dog can still pick up fleas.
            </p>
            <p>
              And removing one visible tick does not prevent another from attaching tomorrow.
            </p>
            <p>
              This is particularly important for fleas because much of their life cycle occurs away from the animal. Flea eggs can fall into bedding, carpets and other environments, while larvae and pupae develop in protected areas. Veterinary references therefore describe effective flea control as involving the animal, the environment and prevention of reinfestation.
            </p>
            <p className="font-medium">
              Cleanliness is useful. It is simply not the whole system.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Spray, shampoo or veterinary parasite control?</h2>
            <p>
              The word &ldquo;anti-tick&rdquo; can make very different products sound equivalent.
            </p>
            <p>
              They aren&rsquo;t.
            </p>

            <h3 className="text-xl font-medium mt-10 mb-3">Shampoo</h3>
            <p>
              A shampoo is primarily a cleansing format. Some shampoos contain antiparasitic active ingredients, but a conventional grooming shampoo should not automatically be assumed to kill ticks or fleas.
            </p>

            <h3 className="text-xl font-medium mt-10 mb-3">Spray</h3>
            <p>
              A spray is a leave-on format whose function depends entirely on its formulation and documented claims. &ldquo;Spray&rdquo; does not automatically mean &ldquo;kills parasites.&rdquo;
            </p>

            <h3 className="text-xl font-medium mt-10 mb-3">Veterinary antiparasitic</h3>
            <p>
              A veterinary antiparasitic is a different category again. Veterinary products may use specific active ingredients and dosing schedules designed for flea or tick control. Veterinary references emphasise selecting parasite-control products according to the individual animal and situation.
            </p>

            <p>
              The useful question isn&rsquo;t simply:
            </p>
            <p className="font-medium">
              &ldquo;Which format is best?&rdquo;
            </p>
            <p>
              It is:
            </p>
            <p className="font-medium text-[1.125rem]">
              &ldquo;What is this particular formulation actually designed to do?&rdquo;
            </p>
            <p>
              That distinction prevents a grooming product from being mistaken for a complete veterinary parasite-control programme.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">What to do when you find a tick</h2>
            <p>
              First, don&rsquo;t panic.
            </p>
            <p>
              If you find an attached tick, prompt removal is appropriate. Veterinary guidance recommends using a suitable tick-removal tool or fine-tipped tweezers, grasping the tick close to the skin and pulling steadily rather than crushing, twisting or applying heat.
            </p>
            <p>
              Avoid household &ldquo;hacks&rdquo; involving petroleum jelly, nail polish, chemicals or hot matches. These are not reliable removal methods and can create additional risks.
            </p>
            <p>
              After removal, clean the area and your hands.
            </p>
            <p>
              Then ask the more important question:
            </p>
            <p className="font-medium text-[1.125rem]">
              Why did this tick reach my dog?
            </p>
            <p>
              If ticks are recurring, numerous or accompanied by skin irritation or signs of illness, the conversation should move from grooming to veterinary care.
            </p>

            <div className="my-16">
              <Image
                src="/images/journal/ticks-fleas-indian-dog/img3.webp"
                alt="A golden retriever resting on a plush dog bed beside a folded towel and a wooden grooming brush"
                width={1254}
                height={1254}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            <h2 className="text-3xl font-display mt-16 mb-6">Fleas are a different problem</h2>
            <p>
              Fleas deserve their own strategy.
            </p>
            <p>
              Adult fleas live on the host, but eggs fall into the surrounding environment. Larvae develop in protected locations such as bedding, carpets, cracks and shaded outdoor areas. A flea problem can therefore continue even after the visible adults on a dog have been reduced.
            </p>
            <p>
              This is why established flea infestations may require more than treating the dog.
            </p>
            <p>
              Veterinary parasite-control guidance describes three interconnected goals: eliminate fleas on the animal, address environmental infestation where necessary, and prevent subsequent reinfestation.
            </p>
            <p>
              In practical terms, that can mean thinking about the dog&rsquo;s bedding, sleeping areas, other animals in the household and the broader environment &ndash; not just the coat.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">A better prevention routine</h2>
            <p>
              For everyday dog care, think in five steps:
            </p>
            <ol className="space-y-6 mt-8 list-decimal pl-5">
              <li>
                <strong>Check</strong><br />
                Inspect the coat after outdoor exposure, particularly around areas where ticks can hide or attach.
              </li>
              <li>
                <strong>Clean</strong><br />
                Keep the coat, paws, bedding and appropriate living areas clean. Use bathing and grooming according to the dog&rsquo;s actual needs.
              </li>
              <li>
                <strong>Deter</strong><br />
                Use appropriately formulated grooming or support products according to their documented purpose.
              </li>
              <li>
                <strong>Prevent</strong><br />
                For dogs at meaningful parasite risk, discuss veterinarian-recommended flea and tick prevention rather than relying on grooming alone.
              </li>
              <li>
                <strong>Respond</strong><br />
                Remove visible parasites appropriately and seek veterinary advice when infestation is substantial, recurring or associated with illness.
              </li>
            </ol>
            <p>
              It is a more useful framework than simply asking how often to spray or bathe.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">Where Defense fits</h2>
            <p className="font-medium">
              Furry Tail <Link href="/products/anti-tick-flea-spray" className="underline decoration-[#8D9A83] underline-offset-4">Defense &ndash; Anti-Tick &amp; Flea Spray</Link> belongs within this broader approach.
            </p>
            <p className="font-medium">
              Its approved positioning is deliberately specific: Defense helps deter ticks and fleas.
            </p>
            <p>
              That makes it part of an exposure-management and grooming routine &ndash; not a replacement for veterinary parasite prevention.
            </p>
            <p>
              The distinction matters.
            </p>
            <p>
              Defense should not be understood as a veterinary treatment, a cure for infestation, guaranteed protection, treatment for tick-borne disease or a substitute for veterinarian-recommended antiparasitic protocols.
            </p>
            <p>
              The role of a thoughtful grooming product is narrower &ndash; and more honest.
            </p>
            <p>
              It can be one part of the routine.
            </p>

            <h2 className="text-3xl font-display mt-16 mb-6">When prevention needs a veterinarian</h2>
            <p>
              Veterinary advice becomes particularly important when a dog has numerous ticks, recurring infestation, significant itching or skin inflammation, or symptoms such as weakness, lethargy, poor appetite or other unexplained changes.
            </p>
            <p>
              Tick exposure matters because ticks can transmit pathogens. Indian studies have identified multiple canine tick-borne pathogens, including <em>Ehrlichia</em>, <em>Anaplasma</em>, <em>Babesia</em> and <em>Hepatozoon</em>, although prevalence varies by location, population and study design.
            </p>
            <p className="font-medium">
              The presence of a tick does not mean a dog has a tick-borne disease.
            </p>
            <p>
              It means the exposure deserves to be taken seriously.
            </p>
            <p>
              For puppies, senior dogs, medically vulnerable dogs or dogs with repeated parasite problems, a veterinarian can help determine which preventive approach is appropriate.
            </p>

            <div className="my-16">
              <Image
                src="/images/journal/ticks-fleas-indian-dog/img4.webp"
                alt="A golden retriever resting on a towel beside a bottle of Furrytail Defense Anti-Tick & Flea Spray"
                width={1431}
                height={806}
                className="w-full rounded-[2px]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            <h2 className="text-3xl font-display mt-16 mb-6">The practical takeaway</h2>
            <p>
              The most useful mindset is simple:
            </p>
            <p className="font-medium text-[1.125rem]">
              Don&rsquo;t build your parasite routine around the tick you can see. Build it around the exposure you can manage.
            </p>
            <p className="font-medium">Inspect after walks.</p>
            <p className="font-medium">Keep grooming consistent.</p>
            <p className="font-medium">Understand where your dog spends time.</p>
            <p className="font-medium">Pay attention to the home environment when fleas are involved.</p>
            <p className="font-medium">Use deterrent products only for what they are actually formulated to do.</p>
            <p>
              And where parasite risk warrants it, use veterinary prevention rather than asking a cosmetic product to do a medical job.
            </p>
            <p>
              A tick found today is one event.
            </p>
            <p className="font-medium text-xl italic mt-8 text-center">
              Good prevention is the system around it.
            </p>

            <div className="mt-16 text-center">
              <Link href="/journal" className="inline-flex items-center gap-2 border border-[#3B3A38] text-[#3B3A38] px-8 py-4 text-[0.75rem] font-medium tracking-[0.08em] uppercase hover:bg-[#3B3A38] hover:text-[#F8F5F1] transition-colors duration-[400ms]">
                Explore the Journal
              </Link>
            </div>

          </article>

          {/* FAQs Section */}
          <section className="max-w-[800px] mx-auto px-6 md:px-8 mt-32 border-t border-[#E9E2D7] pt-16">
            <h2 className="text-2xl md:text-3xl font-display mb-10 text-center">Frequently Asked Questions</h2>

            <div className="space-y-8">
              <div>
                <h3 className="font-medium text-[1.0625rem] mb-2">How do I prevent ticks on my dog?</h3>
                <p className="text-[#3B3A38]/80 text-[0.9375rem] leading-relaxed">Effective tick prevention generally combines regular inspection with appropriate veterinary parasite control and sensible exposure management. Grooming can help you detect ticks early, while veterinarian-recommended preventives are designed specifically for parasite control. The right approach depends on the dog&rsquo;s location, lifestyle, exposure and health.</p>
              </div>

              <div>
                <h3 className="font-medium text-[1.0625rem] mb-2">How do dogs get ticks in India?</h3>
                <p className="text-[#3B3A38]/80 text-[0.9375rem] leading-relaxed">Dogs can encounter ticks through outdoor environments including vegetation, gardens and other areas where suitable hosts and tick habitats overlap. Indian research has documented ticks on dogs in both urban and rural settings, including Delhi and Mumbai. Exposure varies by geography, climate, habitat and season.</p>
              </div>

              <div>
                <h3 className="font-medium text-[1.0625rem] mb-2">Can indoor dogs get ticks?</h3>
                <p className="text-[#3B3A38]/80 text-[0.9375rem] leading-relaxed">Yes. Indoor living reduces some outdoor exposure but does not eliminate risk. Dogs can bring ticks indoors after outdoor activity, and certain tick species can persist in indoor environments. Regular inspection and appropriate parasite prevention therefore remain relevant even for predominantly indoor dogs.</p>
              </div>

              <div>
                <h3 className="font-medium text-[1.0625rem] mb-2">Does bathing a dog prevent ticks?</h3>
                <p className="text-[#3B3A38]/80 text-[0.9375rem] leading-relaxed">Bathing cleans the coat but should not automatically be considered tick prevention. Some specially formulated products may have antiparasitic properties, but ordinary grooming shampoo is not equivalent to a veterinary tick preventive. Bathing is best viewed as one part of grooming and inspection rather than a complete parasite-control strategy.</p>
              </div>

              <div>
                <h3 className="font-medium text-[1.0625rem] mb-2">Does shampoo kill ticks?</h3>
                <p className="text-[#3B3A38]/80 text-[0.9375rem] leading-relaxed">It depends entirely on the formulation. Some shampoos contain specific antiparasitic ingredients, while ordinary cleansing shampoos do not have the same purpose. Always check the product&rsquo;s documented claims and ingredients rather than assuming that any shampoo labelled for grooming controls ticks.</p>
              </div>

              <div>
                <h3 className="font-medium text-[1.0625rem] mb-2">Can fleas live in the house?</h3>
                <p className="text-[#3B3A38]/80 text-[0.9375rem] leading-relaxed">Yes. Flea eggs can fall from an infested animal into bedding, carpets and other protected areas, where immature stages develop. Consequently, an established flea infestation may involve both the pet and its environment.</p>
              </div>

              <div>
                <h3 className="font-medium text-[1.0625rem] mb-2">What should I do if I find a tick on my dog?</h3>
                <p className="text-[#3B3A38]/80 text-[0.9375rem] leading-relaxed">Remove an attached tick promptly using an appropriate tick-removal tool or fine-tipped tweezers, grasping close to the skin and pulling steadily. Avoid petroleum jelly, chemicals and heat-based methods. If there are many ticks, repeated infestations or signs of illness, contact a veterinarian.</p>
              </div>

              <div>
                <h3 className="font-medium text-[1.0625rem] mb-2">Can grooming replace tick and flea prevention?</h3>
                <p className="text-[#3B3A38]/80 text-[0.9375rem] leading-relaxed">No. Grooming is valuable because it helps maintain coat hygiene and makes inspection easier, but it does not automatically prevent parasites. Effective parasite management may require veterinary preventives, environmental measures and ongoing inspection depending on the dog&rsquo;s circumstances.</p>
              </div>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </ClientProviders>
  );
}
