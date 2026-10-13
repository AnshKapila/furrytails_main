import type { Metadata } from 'next';
import Link from 'next/link';
import PolicyPage, { COMPANY, GrievanceOfficer, POLICY_LINK, type PolicySection } from '@/components/PolicyPage';

export const metadata: Metadata = {
  title: 'Privacy Policy | Furrytail',
  description:
    'How Furrytail (Clamique Personal Care Pvt Ltd) collects, uses and protects your personal data when you shop natural dog and cat grooming products.',
  alternates: { canonical: '/privacy-policy' },
};

// Written from what the site actually does: WooCommerce checkout on
// store.furrytailjoy.com, Razorpay payments, Google Analytics, Nector rewards,
// newsletter sign-up (email marketing provider), contact form (sent by email
// through Brevo), WhatsApp chat, and cart/wishlist kept in the browser.
// Update this page whenever one of those changes.
const sections: PolicySection[] = [
  {
    heading: 'Who we are',
    items: [
      {
        label: 'The data fiduciary',
        body: (
          <>
            <p>
              Furrytail is a brand of {COMPANY.legalName} (GSTIN {COMPANY.gstin}), {COMPANY.address}. We decide how and why your
              personal data is used on furrytailjoy.com and store.furrytailjoy.com, and we are responsible for it under the Digital
              Personal Data Protection Act, 2023 and the Information Technology Act, 2000.
            </p>
          </>
        ),
      },
      {
        label: 'What this policy covers',
        body: (
          <p>
            Our website, our online store and checkout, our newsletter, our rewards programme and messages you send us. If you buy
            Furrytail on Amazon or Flipkart, that marketplace collects your order details under its own privacy policy.
          </p>
        ),
      },
    ],
  },
  {
    heading: 'What we collect',
    items: [
      {
        label: 'When you order',
        body: (
          <p>
            Your name, email address, phone number, billing and delivery address, and what you ordered. If you create an account, your
            login email and password (stored encrypted) and your order history.
          </p>
        ),
      },
      {
        label: 'When you pay',
        body: (
          <p>
            Payments are handled by Razorpay. You enter card, UPI or net banking details on Razorpay&rsquo;s secure payment page - we
            never see or store your full card number, UPI PIN or banking password. We receive confirmation of the payment and a
            transaction reference.
          </p>
        ),
      },
      {
        label: 'When you contact us or sign up',
        body: (
          <p>
            Your name, email and message when you use our contact form; your email address when you join the newsletter; and your
            phone number and messages if you chat with us on WhatsApp.
          </p>
        ),
      },
      {
        label: 'When you browse',
        body: (
          <p>
            If you accept analytics cookies: pages visited, the device and browser you use, your approximate location (city level)
            and how you arrived on the site, collected through Google Analytics. Your cart and wishlist are stored only in your own
            browser. See our{' '}
            <Link href="/cookie-settings" className={POLICY_LINK}>Cookie Policy</Link>.
          </p>
        ),
      },
    ],
  },
  {
    heading: 'How we use it',
    items: [
      {
        label: 'To fulfil your order',
        body: <p>Processing payment, packing and delivering your order, sending order and tracking updates, and handling returns and refunds.</p>,
      },
      {
        label: 'To support you',
        body: <p>Answering your messages and resolving problems with an order.</p>,
      },
      {
        label: 'To run rewards and offers',
        body: (
          <p>
            Tracking points in the Furrytail rewards programme, and - only if you sign up - sending our newsletter. Every newsletter
            has an unsubscribe link.
          </p>
        ),
      },
      {
        label: 'To improve the site and meet our obligations',
        body: (
          <p>
            Understanding which pages and products people use, preventing fraud, and keeping the invoices and records that tax and
            other laws require.
          </p>
        ),
      },
      {
        label: 'Our basis for using it',
        body: (
          <p>
            Your consent, which you give when you place an order, create an account, sign up or contact us - and which you can
            withdraw at any time - and the purposes the law allows without separate consent, such as keeping tax records. We do not
            sell your personal data.
          </p>
        ),
      },
    ],
  },
  {
    heading: 'Who we share it with',
    items: [
      {
        label: 'Service providers who work for us',
        body: (
          <>
            <p>We share only what each one needs to do its job:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Razorpay - payment processing</li>
              <li>Courier and logistics partners - delivering your order (name, address, phone)</li>
              <li>Our website and store hosting providers</li>
              <li>Google Analytics - website usage statistics</li>
              <li>Nector - the rewards programme</li>
              <li>Our email providers - newsletters and contact-form messages</li>
              <li>WhatsApp (Meta) - if you message us there</li>
            </ul>
            <p>They may only use your data to provide their service to us.</p>
          </>
        ),
      },
      {
        label: 'When the law requires it',
        body: <p>We disclose personal data to government authorities only when we are legally required to.</p>,
      },
      {
        label: 'Outside India',
        body: (
          <p>
            Some of these providers store or process data outside India. Where they do, it is under their own safeguards and only as
            permitted by Indian law.
          </p>
        ),
      },
    ],
  },
  {
    heading: 'How long we keep it',
    items: [
      {
        label: 'Orders and invoices',
        body: <p>For as long as the GST and income tax laws require us to keep accounting records - currently at least six years.</p>,
      },
      {
        label: 'Your account',
        body: <p>Until you ask us to delete it, subject to the order records above.</p>,
      },
      {
        label: 'Newsletter and messages',
        body: <p>Your email stays on the newsletter list until you unsubscribe. Contact messages are kept while we deal with them, and then only as long as needed.</p>,
      },
    ],
  },
  {
    heading: 'Your rights',
    items: [
      {
        label: 'What you can ask us',
        body: (
          <>
            <p>Under the Digital Personal Data Protection Act, 2023 you can:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>ask what personal data we hold about you and how we use it</li>
              <li>ask us to correct, complete or update it</li>
              <li>ask us to erase it, unless we must keep it by law</li>
              <li>withdraw your consent at any time</li>
              <li>nominate someone to exercise these rights for you</li>
              <li>raise a grievance with us, and then with the Data Protection Board of India</li>
            </ul>
            <p>
              Email <a href={`mailto:${COMPANY.email}`} className={POLICY_LINK}>{COMPANY.email}</a> from the address you shopped with,
              and we will respond within 30 days.
            </p>
          </>
        ),
      },
      {
        label: 'Children',
        body: (
          <p>
            Our store is for adults. We do not knowingly collect personal data from anyone under 18; if you believe a child has given
            us their details, contact us and we will delete them.
          </p>
        ),
      },
    ],
  },
  {
    heading: 'Security and contact',
    items: [
      {
        label: 'Keeping it safe',
        body: (
          <p>
            The site and checkout use encrypted (HTTPS) connections, payments are handled by Razorpay, and access to customer data is
            limited to the people who need it. No system is perfectly secure; if we become aware of a breach that affects you, we will
            tell you and the authorities as the law requires.
          </p>
        ),
      },
      {
        label: 'Grievance Officer',
        body: <GrievanceOfficer />,
      },
      {
        label: 'Changes to this policy',
        body: <p>When we change this policy we update the date at the top of this page. Significant changes will also be highlighted on the site.</p>,
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      pageId="privacy-policy"
      title="Privacy Policy"
      lastUpdated="2026-10-13"
      intro={
        <p>
          What personal data Furrytail collects when you shop with us, why, who it is shared with, and the rights you have over it.
          In short: we collect what we need to deliver your order, we never see your card details, and we do not sell your data.
        </p>
      }
      sections={sections}
    />
  );
}
