// FAQ content, shared by the /faq page, its FAQPage structured data and
// /llms.txt. AI answer engines quote these answers verbatim, so every one
// must match the product pages and labels.

export type Faq = {
  question: string;
  answer: string;
  /** Related product and journal pages, shown under the answer. */
  links?: { label: string; href: string }[];
};

export const FAQS: Faq[] = [
  {
    question: "What does 99.5% Natural Origin Index actually mean?",
    answer: "It is a Natural Origin Index of 99.5%, calculated under ISO 16128-2 - the international standard for working out how much of a formula's ingredient content is of natural origin. It is a calculated number, not a loose adjective, and it can be verified per batch. What it measures is ingredient origin. It is not a safety certification or a veterinary approval, and it does not mean the formula contains no synthetic ingredients - the full ingredient list is disclosed so you can read exactly what is in it.",
    links: [{ label: 'What does natural actually mean in pet care?', href: '/journal/what-does-natural-mean-in-pet-care' }, { label: 'Reading the INCI list', href: '/journal/reading-the-inci-list' }]
  },
  {
    question: "What is probiotic preservation?",
    answer: "Our formulas use Leuconostoc/Radish Root Ferment Filtrate - a fermentation-derived antimicrobial system - instead of synthetic preservatives like MIT, MCIT, parabens, or phenoxyethanol. It provides the same shelf stability without the synthetic chemistry. It is harder to formulate with, requires more rigorous pH management, and has a narrower operating range than synthetics. We chose it because the person reading our label deserved the alternative.",
    links: [{ label: 'The probiotic question', href: '/journal/the-probiotic-question' }, { label: 'Our ingredients', href: '/ingredients' }]
  },
  {
    question: "Are the products safe for cats?",
    answer: "The Gentle Daily Shampoo range - Santal & White Tea, Fig & Neroli, and Violet Leaf & Muslin - and the Dry Foam Shampoo (Hinoki & Bamboo) are made for both dogs and cats. The natural-origin, probiotic-preserved formulas are gentle enough for cats when used as directed. The Anti-Tick & Flea Spray, Paw Cleaner and Refreshing Mist are formulated for dogs only, because they use fragrance actives or functional ingredients that are not suitable for cats. Each product page states which pets it is for.",
    links: [{ label: 'Shop dog & cat grooming', href: '/shop' }]
  },
  {
    question: "What does IFRA-compliant mean?",
    answer: "IFRA is the International Fragrance Association. Their guidelines set maximum usage levels for fragrance ingredients based on safety data. IFRA-compliant means our fragrance profiles have been built within those limits. It is the industry's safety standard for fine fragrance - the same standard applied to personal care products for humans. Note: IFRA-compliant is accurate. IFRA-certified is not a claim we make, as certification is a separate process."
  },
  {
    question: "Can I use these products on puppies?",
    answer: "We recommend consulting your vet for puppies under 12 weeks. For puppies over 12 weeks, the gentle surfactant system in our shampoos is suitable for regular use. The Anti-Tick & Flea Spray is intended for adult dogs in active tick or flea environments - consult your vet before using it on puppies.",
    links: [{ label: 'How often should you bathe your dog?', href: '/journal/how-often-should-you-bathe-your-dog' }]
  },
  {
    question: "How often should I use the Gentle Daily Shampoo?",
    answer: "The name says daily but we mean it is gentle enough for frequent use - weekly or bi-weekly bathing is typical for most dogs. The surfactant system is mild enough not to strip the coat's natural oils with regular use. Your vet can advise based on your dog's coat type, skin condition, and activity level.",
    links: [{ label: 'Gentle Daily Shampoo - Santal & White Tea', href: '/products/gentle-daily-shampoo-santal-white-tea' }, { label: 'How often should you bathe your dog?', href: '/journal/how-often-should-you-bathe-your-dog' }]
  },
  {
    question: "Do I need to rinse the Paw Cleaner?",
    answer: "No. The Paw Cleaner is a rinse-free foam formula. Apply a small amount directly onto each paw or onto a damp cloth, gently massage each pad and between the toes, then wipe off with a clean damp cloth. No rinsing required. Use after every walk.",
    links: [{ label: 'Paw Cleaner', href: '/products/paw-cleaner' }, { label: 'The paw problem', href: '/journal/paw-cleaner-for-dogs-post-walk-paw-care' }, { label: 'The monsoon ritual', href: '/journal/the-monsoon-ritual' }]
  },
  {
    question: "How does the Anti-Tick & Flea Spray work?",
    answer: "The spray uses plant-derived actives - vetiver root oil and hinoki cypress oil - alongside eucalyptus oil and neem extract. These help deter ticks and fleas through scent masking and natural insect-repellent properties. It is not a pesticide and does not use synthetic chemical actives. It is designed to be used before every walk in tick or flea-active environments, not as a treatment after infestation. For an established infestation, consult your vet.",
    links: [{ label: 'Anti-Tick & Flea Spray', href: '/products/anti-tick-flea-spray' }, { label: 'Ticks, fleas & the Indian dog', href: '/journal/ticks-fleas-and-the-indian-dog' }]
  },
  {
    question: "What is the shelf life of the products?",
    answer: "All Furrytail products carry a 24-month shelf life from manufacture date, and a 12-month period after opening (PAO). The probiotic preservation system provides this stability without synthetic preservatives. Store in a cool, dry place away from direct sunlight."
  },
  {
    question: "Are the bottles recyclable?",
    answer: "The bottles are frosted matte PET - recyclable in most municipal systems. The brushed gold caps are currently not recyclable. We are working on an alternative for Phase 2. Please check your local recycling guidelines for PET plastics before disposal."
  },
  {
    question: "Where are the products made?",
    answer: "Furrytail is India-made. Formulated and manufactured in India to the same standards we would hold a European or US product to - which is the point. The 99.5% Natural Origin Index is calculated and verified per batch. Made here. Held to the same standard as anywhere."
  },
  {
    question: "Is delivery free, and how long does it take?",
    answer: "Yes. Delivery is free on every order across India, with no minimum order value, and orders arrive in 3–5 days depending on your location. You will receive a tracking link by email once your order has been dispatched.",
    links: [{ label: 'Shipping & Returns', href: '/shipping' }]
  },
  {
    question: "Can I return a product?",
    answer: "Yes. You can return unopened products in their original condition within 7 days of delivery, and we pay the return shipping. Write to us before sending anything back so we can guide you through it. If you have opened a product and it is not working for your pet, write to us anyway - we would rather understand what happened.",
    links: [{ label: 'Shipping & Returns', href: '/shipping' }]
  },
  {
    question: "How do I contact you?",
    answer: "Email hello@furrytailjoy.com. We respond within one business day. You can also reach the contact page for the full form."
  }
];
