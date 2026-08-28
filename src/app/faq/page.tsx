import ClientProviders from '@/components/ClientProviders';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const faqs = [
  {
    question: "What does 99.5% Natural Origin Index actually mean?",
    answer: "It means 99.5% of the formula, by weight, is derived from natural sources - calculated under ISO 16128-2, the international standard for natural origin measurement. It is not a marketing claim. It is a calculated number that can be verified per batch. The 0.5% is disclosed. There is no ambiguity in it."
  },
  {
    question: "What is probiotic preservation?",
    answer: "Our formulas use Leuconostoc/Radish Root Ferment Filtrate - a fermentation-derived antimicrobial system - instead of synthetic preservatives like MIT, MCIT, parabens, or phenoxyethanol. It provides the same shelf stability without the synthetic chemistry. It is harder to formulate with, requires more rigorous pH management, and has a narrower operating range than synthetics. We chose it because the person reading our label deserved the alternative."
  },
  {
    question: "Are the products safe for cats?",
    answer: "The Gentle Daily Shampoo range - Santal & White Tea, Fig & Neroli, and Hinoki & Bamboo - is suitable for both dogs and cats. The natural-origin, probiotic-preserved formula is gentle enough for cats when used as directed. The remaining four products (Anti-Tick & Flea Spray, Paw Cleaner, Dry Foam Shampoo, and Refreshing Mist) are formulated for dogs only. Each uses fragrance actives or functional ingredients that are not safe for cats. See the For Cats page for a full breakdown."
  },
  {
    question: "What does IFRA-compliant mean?",
    answer: "IFRA is the International Fragrance Association. Their guidelines set maximum usage levels for fragrance ingredients based on safety data. IFRA-compliant means our fragrance profiles have been built within those limits. It is the industry's safety standard for fine fragrance - the same standard applied to personal care products for humans. Note: IFRA-compliant is accurate. IFRA-certified is not a claim we make, as certification is a separate process."
  },
  {
    question: "Can I use these products on puppies?",
    answer: "We recommend consulting your vet for puppies under 12 weeks. For puppies over 12 weeks, the gentle surfactant system in our shampoos is suitable for regular use. The Anti-Tick & Flea Spray is intended for adult dogs in active tick or flea environments - consult your vet before using it on puppies."
  },
  {
    question: "How often should I use the Gentle Daily Shampoo?",
    answer: "The name says daily but we mean it is gentle enough for frequent use - weekly or bi-weekly bathing is typical for most dogs. The surfactant system is mild enough not to strip the coat's natural oils with regular use. Your vet can advise based on your dog's coat type, skin condition, and activity level."
  },
  {
    question: "Do I need to rinse the Paw Cleaner?",
    answer: "No. The Paw Cleaner is a rinse-free foam formula. Apply a small amount directly onto each paw or onto a damp cloth, gently massage each pad and between the toes, then wipe off with a clean damp cloth. No rinsing required. Use after every walk."
  },
  {
    question: "How does the Anti-Tick & Flea Spray work?",
    answer: "The spray uses plant-derived actives - vetiver root oil and cypress oil - alongside citronella and neem extract. These help deter ticks and fleas through scent masking and natural insect-repellent properties. It is not a pesticide and does not use synthetic chemical actives. It is designed to be used before every walk in tick or flea-active environments, not as a treatment after infestation. For an established infestation, consult your vet."
  },
  {
    question: "What is the shelf life of the products?",
    answer: "All Furry Tail products carry a 24-month shelf life from manufacture date, and a 12-month period after opening (PAO). The probiotic preservation system provides this stability without synthetic preservatives. Store in a cool, dry place away from direct sunlight."
  },
  {
    question: "Are the bottles recyclable?",
    answer: "The bottles are frosted matte PET - recyclable in most municipal systems. The brushed gold caps are currently not recyclable. We are working on an alternative for Phase 2. Please check your local recycling guidelines for PET plastics before disposal."
  },
  {
    question: "Where are the products made?",
    answer: "Furry Tail is India-made. Formulated and manufactured in India to the same standards we would hold a European or US product to - which is the point. The 99.5% Natural Origin Index is calculated and verified per batch. Made here. Held to the same standard as anywhere."
  },
  {
    question: "How do I contact you?",
    answer: "Email hello@furrytailjoy.com. We respond within one business day. You can also reach the contact page for the full form."
  }
];

export default function FAQPage() {
  return (
    <ClientProviders>
      <div className="min-h-screen bg-[#F8F5F1]">
        <Navbar />
        <main className="pt-32 pb-24 md:pt-40 md:pb-32 px-6">
          <div className="max-w-[720px] mx-auto">
            <h1 className="text-3xl md:text-5xl font-display font-light text-[#3B3A38] mb-12">
              The questions we get most.
            </h1>
            <p className="text-[#3B3A38] opacity-80 mb-16 text-lg">
              Honest answers. No marketing language.
            </p>
            <div className="space-y-12">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-[#E5E0D8] pb-10">
                  <h3 className="text-xl md:text-2xl font-display font-medium text-[#3B3A38] mb-4">
                    {faq.question}
                  </h3>
                  <p className="text-sm md:text-[15px] leading-relaxed text-[#3B3A38] opacity-80">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ClientProviders>
  );
}
