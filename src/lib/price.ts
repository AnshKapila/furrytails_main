// Pure price helpers, usable from both server and client.
//
// Deliberately NOT in cart.tsx: that file is 'use client', so anything exported
// from it cannot be called during server rendering — the product page needs
// parsePrice() to build its JSON-LD offer.

/** "₹695" → 695. Returns 0 for anything unparseable. */
export function parsePrice(price: string): number {
  if (!price) return 0;
  const n = parseFloat(price.replace(/[^\d.]/g, ''));
  return Number.isNaN(n) ? 0 : n;
}
