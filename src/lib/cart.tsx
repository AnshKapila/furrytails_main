'use client';

// ─────────────────────────────────────────────────────────────────────────────
// Furrytail cart — frontend-only, localStorage-backed.
// No WooCommerce backend is wired in the current project architecture.
// The Checkout button hands off to the store's native checkout URL (configured
// in WOOCOMMERCE_CHECKOUT_URL env var or falls back to a placeholder).
// ─────────────────────────────────────────────────────────────────────────────

import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { WP_URL } from '@/lib/config';

export interface CartItem {
  id: string;         // product id
  name: string;
  price: string;      // display price e.g. "₹28"
  priceNum: number;   // numeric value for subtotal
  image: string;
  imageAlt: string;
  variantId?: string;
  variantLabel?: string;
  qty: number;
}

interface CartState {
  items: CartItem[];
  drawerOpen: boolean;
}

type CartAction =
  | { type: 'ADD'; item: Omit<CartItem, 'qty'>; qty?: number }
  | { type: 'REMOVE'; id: string; variantId?: string }
  | { type: 'UPDATE_QTY'; id: string; variantId?: string; qty: number }
  | { type: 'OPEN_DRAWER' }
  | { type: 'CLOSE_DRAWER' }
  | { type: 'HYDRATE'; items: CartItem[] };

function key(id: string, variantId?: string) {
  return variantId ? `${id}__${variantId}` : id;
}

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'HYDRATE':
      return { ...state, items: action.items };

    case 'ADD': {
      const k = key(action.item.id, action.item.variantId);
      const existing = state.items.find(
        (i) => key(i.id, i.variantId) === k
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            key(i.id, i.variantId) === k
              ? { ...i, qty: i.qty + (action.qty ?? 1) }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.item, qty: action.qty ?? 1 }],
      };
    }

    case 'REMOVE': {
      const k = key(action.id, action.variantId);
      return {
        ...state,
        items: state.items.filter((i) => key(i.id, i.variantId) !== k),
      };
    }

    case 'UPDATE_QTY': {
      const k = key(action.id, action.variantId);
      if (action.qty <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => key(i.id, i.variantId) !== k),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          key(i.id, i.variantId) === k ? { ...i, qty: action.qty } : i
        ),
      };
    }

    case 'OPEN_DRAWER':
      return { ...state, drawerOpen: true };
    case 'CLOSE_DRAWER':
      return { ...state, drawerOpen: false };

    default:
      return state;
  }
}

const STORAGE_KEY = 'furrytail_cart_v1';

interface CartContextValue {
  items: CartItem[];
  drawerOpen: boolean;
  itemCount: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, 'qty'>, qty?: number) => void;
  removeItem: (id: string, variantId?: string) => void;
  updateQty: (id: string, variantId: string | undefined, qty: number) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], drawerOpen: false });

  // Hydrate from localStorage on mount.
  // Per-item validation: drop any item that is missing required fields or has
  // corrupt values so the cart never renders NaN prices, blank keys, or a
  // Next.js <Image> crash from a null/undefined src.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const valid: CartItem[] = parsed.filter((item): item is CartItem => {
            if (!item || typeof item !== 'object') return false;
            if (typeof item.id !== 'string' || !item.id) return false;
            if (typeof item.name !== 'string' || !item.name) return false;
            if (typeof item.image !== 'string' || !item.image) return false;
            if (typeof item.imageAlt !== 'string') return false;
            if (typeof item.price !== 'string') return false;
            const qty = Number(item.qty);
            const priceNum = Number(item.priceNum);
            if (!isFinite(qty) || qty <= 0) return false;
            if (!isFinite(priceNum) || priceNum < 0) return false;
            // Normalise numeric fields so downstream code always gets numbers
            item.qty = Math.round(qty);
            item.priceNum = priceNum;
            return true;
          });
          dispatch({ type: 'HYDRATE', items: valid });
        }
      }
    } catch { /* ignore */ }
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch { /* ignore */ }
  }, [state.items]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = state.drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [state.drawerOpen]);

  // Guard against any hypothetical NaN from stale/corrupt state by coercing to
  // finite numbers — ensures badge and subtotal never display "NaN".
  const itemCount = state.items.reduce((s, i) => s + (isFinite(i.qty) ? i.qty : 0), 0);
  const subtotal = state.items.reduce(
    (s, i) => s + (isFinite(i.priceNum) && isFinite(i.qty) ? i.priceNum * i.qty : 0),
    0,
  );

  return (
    <CartContext.Provider value={{
      items: state.items,
      drawerOpen: state.drawerOpen,
      itemCount,
      subtotal,
      addItem: (item, qty) => dispatch({ type: 'ADD', item, qty }),
      removeItem: (id, variantId) => dispatch({ type: 'REMOVE', id, variantId }),
      updateQty: (id, variantId, qty) => dispatch({ type: 'UPDATE_QTY', id, variantId, qty }),
      openDrawer: () => dispatch({ type: 'OPEN_DRAWER' }),
      closeDrawer: () => dispatch({ type: 'CLOSE_DRAWER' }),
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

// Re-exported so existing client imports keep working. The implementation lives
// in lib/price.ts because server components need it too and this file is
// 'use client'.
export { parsePrice } from './price';

// ─── WooCommerce checkout handoff ────────────────────────────────────────────
// The cart lives here (localStorage) for UI purposes only. On checkout the
// browser navigates to WordPress, which rebuilds the cart authoritatively and
// takes payment. Because it's a top-level navigation rather than a fetch, there
// is no CORS involved and WooCommerce sets its own session cookie normally.
//
// Prices held here are display values. WooCommerce recalculates everything at
// checkout and its numbers are the ones that count.

export { WP_URL } from '@/lib/config';

/**
 * Build the handoff URL. The ft-checkout endpoint (a small mu-plugin on the
 * WordPress side) resolves the slugs, fills the Woo cart and redirects to the
 * real checkout.
 *
 * Returns null when WP_URL is unset or the cart is empty, so callers can
 * disable the button instead of navigating somewhere broken.
 */
export function buildCheckoutUrl(items: CartItem[]): string | null {
  if (!WP_URL || items.length === 0) return null;
  const parts = items
    .map((i) => {
      const slug = i.variantId ? `${i.id}:${i.variantId}` : i.id;
      return `${slug}*${Math.max(1, Math.round(i.qty))}`;
    })
    .join(',');
  return `${WP_URL}/?ft-checkout=1&items=${encodeURIComponent(parts)}`;
}

/** Woo account area — real login, addresses and order history live there. */
export const ACCOUNT_URL = WP_URL ? `${WP_URL}/my-account` : null;
