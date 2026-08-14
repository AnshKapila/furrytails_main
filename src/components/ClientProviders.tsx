'use client';

import { CartProvider } from '@/lib/cart';
import { WishlistProvider } from '@/lib/wishlist';
import CartDrawer from '@/components/CartDrawer';

// Wraps every page's interactive state. Safe to render from a server component —
// children rendered on the server pass straight through.
//
// There is no ProfileProvider: account details and order history belong to
// WooCommerce, which owns sign-in. See ProfileDashboard for the rationale.
export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <WishlistProvider>
      <CartProvider>
        {children}
        <CartDrawer />
      </CartProvider>
    </WishlistProvider>
  );
}
