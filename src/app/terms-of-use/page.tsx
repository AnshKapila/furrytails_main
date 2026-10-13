import type { Metadata } from 'next';
import Link from 'next/link';
import PolicyPage, { COMPANY, GrievanceOfficer, POLICY_LINK, type PolicySection } from '@/components/PolicyPage';

export const metadata: Metadata = {
  title: 'Terms of Use | Furrytail',
  description:
    'The terms for using furrytailjoy.com and buying Furrytail natural pet grooming products: orders, payment, free delivery, returns and liability.',
  alternates: { canonical: '/terms-of-use' },
};

// Delivery and returns here must match /shipping (free delivery, 3-5 days,
// 7-day returns on unopened products, return shipping paid by Furrytail).
const sections: PolicySection[] = [
  {
    heading: 'About these terms',
    items: [
      {
        label: 'Who you are dealing with',
        body: (
          <p>
            furrytailjoy.com and store.furrytailjoy.com are run by {COMPANY.legalName} (&ldquo;Furrytail&rdquo;, &ldquo;we&rdquo;),
            GSTIN {COMPANY.gstin}, {COMPANY.address}.
          </p>
        ),
      },
      {
        label: 'Agreeing to them',
        body: (
          <p>
            By using the site or placing an order you agree to these terms and to our{' '}
            <Link href="/privacy-policy" className={POLICY_LINK}>Privacy Policy</Link>. If you do not agree, please do not use the
            site. We may update these terms; the version on this page when you place an order applies to that order.
          </p>
        ),
      },
      {
        label: 'Using the site',
        body: (
          <p>
            You must be 18 or older to buy from us. Please give accurate details, keep your account password private, and do not
            misuse the site - for example by attempting to break its security or copying its content at scale.
          </p>
        ),
      },
    ],
  },
  {
    heading: 'Products and advice',
    items: [
      {
        label: 'Using our products',
        body: (
          <p>
            Use every product as directed on its label and product page, and only on the pets it is made for - each page states
            whether a product is for dogs, cats or both. All products are for external use only. If irritation occurs, stop using
            the product and consult your vet.
          </p>
        ),
      },
      {
        label: 'Not veterinary advice',
        body: (
          <p>
            Our products are grooming products, not medicines, and are not intended to diagnose, treat or cure any condition. Our
            journal articles and FAQs are general information; they do not replace advice from your own vet about your pet.
          </p>
        ),
      },
      {
        label: 'Product information',
        body: (
          <p>
            We describe and photograph our products as accurately as we can, and list ingredients as printed on the packaging. Colours
            and packaging may vary slightly between batches and screens.
          </p>
        ),
      },
    ],
  },
  {
    heading: 'Orders and payment',
    items: [
      {
        label: 'Prices',
        body: (
          <p>
            Prices are in Indian Rupees (₹). The final amount, including any applicable taxes, is shown at checkout before you pay. We
            may change prices at any time, but not for an order we have already confirmed.
          </p>
        ),
      },
      {
        label: 'Payment',
        body: <p>Payment is made online at checkout by UPI, card or net banking through Razorpay. Cash on delivery is not available.</p>,
      },
      {
        label: 'When an order is confirmed',
        body: (
          <p>
            Your order is confirmed when payment succeeds and you receive our order confirmation. We may cancel an order - for example
            if an item is out of stock or a price was shown in error - and if we do, we refund you in full.
          </p>
        ),
      },
      {
        label: 'Cancelling an order',
        body: (
          <p>
            You can cancel within 6 hours of placing an order, for a full refund to your original payment method. After 6 hours the
            order may already have been dispatched: if it has not, we will still cancel it on request; if it has, it cannot be
            cancelled and must be returned unopened within 7 days of delivery instead.
          </p>
        ),
      },
    ],
  },
  {
    heading: 'Delivery and returns',
    items: [
      {
        label: 'Delivery',
        body: <p>Delivery is free on every order across India and usually takes 3–5 days, depending on your location.</p>,
      },
      {
        label: 'Returns and refunds',
        body: (
          <p>
            You can return unopened products in their original condition within 7 days of delivery, and we pay the return shipping.
            Damaged, wrong or missing items are replaced, not refunded. Refunds for returns go back to your original payment method. Full details
            are on our <Link href="/shipping" className={POLICY_LINK}>Shipping &amp; Returns</Link> page.
          </p>
        ),
      },
      {
        label: 'Marketplace orders',
        body: <p>Orders placed on Amazon or Flipkart follow that marketplace&rsquo;s delivery and return terms.</p>,
      },
    ],
  },
  {
    heading: 'Rewards, content and liability',
    items: [
      {
        label: 'Rewards programme',
        body: (
          <p>
            The Furrytail rewards programme is run with our partner Nector. Points have no cash value, cannot be transferred, and the
            programme&rsquo;s rules may change or end with notice on the site.
          </p>
        ),
      },
      {
        label: 'Our content',
        body: (
          <p>
            The Furrytail name, logo, photographs, product designs and written content belong to us. You may share links to our pages,
            but not copy or reuse our content commercially without written permission.
          </p>
        ),
      },
      {
        label: 'Reviews and messages you send',
        body: (
          <p>
            If you send us a review, photo or testimonial, you allow us to show it on our site and social media. Please do not send
            anything unlawful, misleading or that belongs to someone else.
          </p>
        ),
      },
      {
        label: 'Our liability',
        body: (
          <p>
            Nothing in these terms limits your rights under the Consumer Protection Act, 2019. Beyond those rights, our liability for any
            order is limited to the amount you paid for it, and we are not responsible for losses caused by using a product other
            than as directed, or by events outside our reasonable control.
          </p>
        ),
      },
    ],
  },
  {
    heading: 'Law and complaints',
    items: [
      {
        label: 'Governing law',
        body: <p>These terms are governed by the laws of India. Courts in Gurugram, Haryana have jurisdiction, without affecting your right to approach a consumer commission.</p>,
      },
      {
        label: 'Grievance Officer',
        body: <GrievanceOfficer />,
      },
    ],
  },
];

export default function TermsOfUsePage() {
  return (
    <PolicyPage
      pageId="terms-of-use"
      title="Terms of Use"
      lastUpdated="2026-10-13"
      intro={<p>The terms that apply when you use furrytailjoy.com and buy Furrytail products: orders, payment, delivery, returns and the rest.</p>}
      sections={sections}
    />
  );
}
