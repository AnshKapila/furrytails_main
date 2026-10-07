// ── Expert voices (homepage carousel below "Our Range") ─────────────────────
//
// Only real, attributable quotes go live: a named person who agreed in writing
// to these exact words appearing on the site. The homepage promises "No vet
// endorsements for sale" (data/home.ts), and India's CCPA endorsement
// guidelines require any paid or gifted relationship to be disclosed - put
// that in `disclosure` when it applies.
//
// The quotes below are DRAFTS to send to each expert. They only use claims the
// site already makes (sulphate-free coconut-derived cleansers, probiotic
// preservation, free of parabens/MIT/phenoxyethanol, full ingredient lists).
// The expert may reword them; publish their version, not ours.
//
// Production shows only entries with `approved: true`, and hides the section
// when there are none. `npm run dev` shows every entry so the layout can be
// checked.

export type Expert = {
  name: string;
  /** Credential and where they practise, e.g. "BVSc, Small Animal Vet, Pune". */
  role: string;
  quote: string;
  /** Square photo in /public, e.g. "/experts/firstname-lastname.webp". Initials are shown if omitted. */
  photo?: string;
  /** e.g. "Received product samples for review." Shown under the role. */
  disclosure?: string;
  /** Set to true only once the expert has signed off on the final wording, name and photo. */
  approved: boolean;
};

export const EXPERTS: Expert[] = [
  {
    name: 'Dr. Santana',
    role: 'Senior Veterinarian & Animal Activist',
    photo: '/experts/dr-santana.webp',
    quote:
      'Most of the skin complaints I see after bath time start with a harsh shampoo, not the dog. I look for gentle, sulphate-free cleansers and no unnecessary preservatives - Furrytail lists every ingredient by name, which makes it easy to recommend with confidence.',
    approved: true,
  },
  {
    name: 'Dr. Kopal Chandra',
    role: 'Veterinarian & Professional Pet Care and Boarding Specialist',
    photo: '/experts/dr-kopal-chandra.webp',
    quote:
      'With pets in our care every day, I bathe a lot of coats, and I can tell when a shampoo strips them. Furrytail rinses clean, leaves no heavy residue and the coat still feels soft the next day. The scent is there, but it never overpowers the pet.',
    approved: true,
  },
  {
    name: 'Ms. Urvashi Sharma',
    role: 'Senior R&D Scientist, Cosmetic Formulations',
    photo: '/experts/urvashi-sharma.webp',
    quote:
      'Preservation is where most formulas quietly cut corners. Choosing a probiotic ferment over parabens, MIT and phenoxyethanol is harder to get right, and it shows a brand that is formulating for the animal, not the label.',
    approved: true,
  },
];

export const visibleExperts = (all: Expert[], production: boolean) =>
  production ? all.filter((e) => e.approved) : all;
