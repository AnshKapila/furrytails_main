import type { Metadata } from 'next';
import Link from 'next/link';
import PolicyPage, { COMPANY, POLICY_LINK, type PolicySection } from '@/components/PolicyPage';
import { CookieChoiceButton } from '@/components/CookieConsent';

export const metadata: Metadata = {
  title: 'Cookie Policy | Furrytail',
  description:
    'The cookies and browser storage furrytailjoy.com uses - for your cart, checkout, analytics and rewards - and how to control or turn them off.',
  alternates: { canonical: '/cookie-settings' },
};

// Matches what the site loads: Google Analytics (src/app/layout.tsx), Nector
// rewards widget, cart / wishlist / newsletter flag in localStorage, and
// WooCommerce + Razorpay on the store subdomain. Google Analytics loads only
// after the visitor accepts in the CookieConsent banner.
const sections: PolicySection[] = [
  {
    heading: 'What cookies are',
    items: [
      {
        label: 'Cookies and browser storage',
        body: (
          <p>
            Cookies are small files a website saves in your browser. Sites can also keep information in the browser&rsquo;s local
            storage. Both let a site remember things between pages and visits - like what is in your cart.
          </p>
        ),
      },
    ],
  },
  {
    heading: 'What we use',
    items: [
      {
        label: 'Essential - the site and checkout',
        body: (
          <p>
            Your cart, your wishlist and whether you have already seen our newsletter pop-up are kept in your browser&rsquo;s local
            storage; they never leave your device. When you go to checkout, our store (store.furrytailjoy.com) uses cookies to keep
            your basket and login session, and Razorpay uses cookies to process payment securely. Without these the cart and checkout
            cannot work.
          </p>
        ),
      },
      {
        label: 'Analytics - Google Analytics',
        body: (
          <p>
            Only if you click Accept in our cookie banner, Google Analytics sets cookies (named <code>_ga</code> and <code>_ga_…</code>)
            to count visits and show us which pages and products people use, which devices they browse on and roughly where they are
            (city level). It does not tell us who you are. Google processes this data under its own privacy policy. If you decline,
            Google Analytics does not load at all.
          </p>
        ),
      },
      {
        label: 'Rewards - Nector',
        body: (
          <p>
            The rewards widget, run by our partner Nector, uses cookies and browser storage to show your points and link them to your
            store account when you are logged in.
          </p>
        ),
      },
      {
        label: 'Embedded links',
        body: (
          <p>
            Links to Instagram, Facebook, YouTube, WhatsApp, Amazon and Flipkart take you to those sites, which set their own cookies
            under their own policies.
          </p>
        ),
      },
    ],
  },
  {
    heading: 'Your choices',
    items: [
      {
        label: 'Change your cookie choice',
        body: (
          <>
            <p>
              Your Accept or Decline is saved in your browser. To change it, reopen the cookie banner. Declining after accepting
              deletes the Google Analytics cookies.
            </p>
            <CookieChoiceButton />
          </>
        ),
      },
      {
        label: 'Control cookies in your browser',
        body: (
          <p>
            Every browser lets you see, block and delete cookies and site data - look under Settings, then Privacy. Blocking all
            cookies will stop the cart and checkout from working; blocking only third-party cookies will not.
          </p>
        ),
      },
      {
        label: 'Turn off Google Analytics',
        body: (
          <p>
            Install Google&rsquo;s{' '}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer" className={POLICY_LINK}>
              Analytics opt-out browser add-on
            </a>{' '}
            to stop Google Analytics on every site, including ours.
          </p>
        ),
      },
      {
        label: 'More about your data',
        body: (
          <p>
            Our <Link href="/privacy-policy" className={POLICY_LINK}>Privacy Policy</Link> explains how we use personal data and your
            rights. Questions: <a href={`mailto:${COMPANY.email}`} className={POLICY_LINK}>{COMPANY.email}</a>.
          </p>
        ),
      },
    ],
  },
];

export default function CookiePolicyPage() {
  return (
    <PolicyPage
      pageId="cookie-settings"
      title="Cookie Policy"
      lastUpdated="2026-10-13"
      intro={<p>The cookies and browser storage furrytailjoy.com uses, what each one is for, and how to turn them off. Analytics cookies are only set if you accept them.</p>}
      sections={sections}
    />
  );
}
