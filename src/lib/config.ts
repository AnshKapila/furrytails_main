// Single source for the WordPress/WooCommerce base URL.
//
// IMPORTANT: NEXT_PUBLIC_* variables are inlined at BUILD time, not read at
// runtime. Setting this in the host's environment panel after building has no
// effect — the value must be present when `next build` runs. Changing it means
// rebuilding and redeploying.
//
// The literal default is deliberate: without it, a build that forgot .env.local
// would silently ship with an empty URL, which disables the checkout button.
// A wrong-but-present default fails loudly; an empty one fails silently.
export const WP_URL =
  process.env.NEXT_PUBLIC_WP_URL ?? 'https://store.furrytailjoy.com';
