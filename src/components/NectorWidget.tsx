'use client';
import { useEffect } from 'react';
import { WP_URL } from '@/lib/config';

// Nector reward widget. The API key is public (the stock snippet prints it in
// a data attribute); the signing secret is not, and lives only in WordPress.
//
// Customers log in on the store subdomain, so this page cannot know who they
// are. wordpress/mu-plugins/ft-nector.php answers that with the customer's own
// login cookie and returns a signed digest, which must be on window before the
// loader runs - hence fetch first, then inject the script.
const API_KEY =
  process.env.NEXT_PUBLIC_NECTOR_API_KEY ||
  'ak_8f3c45a5342911d609d348d0be77fd2484099805814a76793bef85be23f3c0d5';
const LOADER_SRC = 'https://cdn.nector.io/nector-static/no-cache/reward-widget/mainloader.min.js';
const AUTH_TIMEOUT_MS = 4000;

type NectorAuth = { customer_id: string | null; lead_digest?: string; timestamp?: string };

declare global {
  interface Window {
    nector_data?: { _auth?: Record<string, string> };
  }
}

async function fetchAuth(): Promise<NectorAuth | null> {
  try {
    const res = await fetch(`${WP_URL}/wp-admin/admin-ajax.php?action=ft_nector_auth`, {
      credentials: 'include',
      cache: 'no-store',
      signal: AbortSignal.timeout(AUTH_TIMEOUT_MS),
    });
    return res.ok ? await res.json() : null;
  } catch {
    // Store down or slow: still show the widget, just as a guest.
    return null;
  }
}

export default function NectorWidget() {
  useEffect(() => {
    if (document.querySelector(`script[src="${LOADER_SRC}"]`)) return;
    let cancelled = false;

    fetchAuth().then((auth) => {
      if (cancelled) return;
      const customerId = auth?.customer_id && auth.lead_digest && auth.timestamp ? auth.customer_id : '';

      if (customerId) {
        window.nector_data = window.nector_data || {};
        window.nector_data._auth ??= {
          customer_id: customerId,
          api_key: API_KEY,
          lead_digest: auth!.lead_digest!,
          timestamp: auth!.timestamp!,
        };
      }

      const s = document.createElement('script');
      s.async = true;
      s.src = LOADER_SRC;
      s.dataset.op = 'widget';
      s.dataset.api_key = API_KEY;
      s.dataset.customer_id = customerId;
      s.dataset.platform = 'woocommerce';
      document.body.appendChild(s);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
