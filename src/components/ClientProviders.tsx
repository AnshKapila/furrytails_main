'use client';

import { CartProvider } from '@/lib/cart';
import { WishlistProvider } from '@/lib/wishlist';
import { ProfileProvider } from '@/lib/profile';
import CartDrawer from '@/components/CartDrawer';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ProfileProvider>
      <WishlistProvider>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </WishlistProvider>
    </ProfileProvider>
  );
}
