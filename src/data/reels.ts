// ── Customer video reels (homepage, below "In their words") ─────────────────
//
// Put each video in /public/reels/ as an .mp4 (H.264, portrait 9:16, ideally
// under ~4 MB and 15-30 s) plus a poster frame (.webp) shown before it plays.
// Only use clips the pet parent has given permission to repost.
//
// The section is hidden in production while this list is empty. `npm run dev`
// shows grey placeholder cards so the layout can be checked.

export type Reel = {
  /** e.g. "/reels/bruno-bath.mp4" */
  src: string;
  /** e.g. "/reels/bruno-bath.webp" - first frame, shown until the video loads. */
  poster?: string;
  /** Short line under the video, e.g. "Bruno's Sunday bath". */
  caption?: string;
  /** Instagram handle without @, linked to their profile if given. */
  handle?: string;
  /** Product featured in the clip, e.g. { name: 'Gentle Daily Shampoo', href: '/products/123' }. */
  product?: { name: string; href: string };
};

export const REELS_HEADING = {
  // Keep this number true - update it from order data, don't round up.
  heading: 'Loved by 1000+ Furry Tails',
};

// Order alternates dogs and cats. Posters are hand-picked frames, not frame 0.
export const REELS: Reel[] = [
  {
    src: '/reels/shih-tzu-paws.mp4',
    poster: '/reels/shih-tzu-paws.webp',
    caption: 'Clean paws after every walk',
    product: { name: 'Paw Cleaner', href: '/products/paw-cleaner' },
  },
  {
    src: '/reels/cat-dry-foam.mp4',
    poster: '/reels/cat-dry-foam.webp',
    caption: 'A fresh coat, no bath needed',
    product: { name: 'Dry Foam Shampoo', href: '/products/dry-foam-shampoo' },
  },
  {
    src: '/reels/pom-paws.mp4',
    poster: '/reels/pom-paws.webp',
    caption: 'Muddy paws, sorted',
    product: { name: 'Paw Cleaner', href: '/products/paw-cleaner' },
  },
  {
    src: '/reels/tick-spray-walk.mp4',
    poster: '/reels/tick-spray-walk.webp',
    caption: 'Before every walk in the park',
    product: { name: 'Anti-Tick & Flea Spray', href: '/products/anti-tick-flea-spray' },
  },
  {
    src: '/reels/snowfy-bath.mp4',
    poster: '/reels/snowfy-bath.webp',
    caption: 'Snowfy’s bath day',
    product: { name: 'Gentle Daily Shampoo - Violet Leaf & Muslin', href: '/products/gentle-daily-shampoo-violet-leaf-muslin' },
  },
  {
    src: '/reels/caspy-paws.mp4',
    poster: '/reels/caspy-paws.webp',
    caption: 'Caspy didn’t run away',
    product: { name: 'Paw Cleaner', href: '/products/paw-cleaner' },
  },
];
