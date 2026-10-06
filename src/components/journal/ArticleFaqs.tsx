import Link from 'next/link';
import { Fragment } from 'react';

// FAQ answers are plain strings so the same text can feed the visible list and
// the FAQPage JSON-LD. Inline links use markdown syntax: [anchor text](/path).

export interface Faq {
  q: string;
  a: string;
}

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Answer text with link markup removed, for structured data. */
export function faqPlainText(text: string): string {
  return text.replace(LINK_RE, '$1');
}

function renderAnswer(text: string) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK_RE)) {
    const i = m.index ?? 0;
    if (i > last) parts.push(text.slice(last, i));
    parts.push(
      <Link key={i} href={m[2]} className="underline decoration-[#8D9A83] underline-offset-4">
        {m[1]}
      </Link>,
    );
    last = i + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.map((p, i) => <Fragment key={i}>{p}</Fragment>);
}

export default function ArticleFaqs({ faqs }: { faqs: Faq[] }) {
  return (
    <section className="max-w-[800px] mx-auto px-6 md:px-8 mt-32 border-t border-[#E9E2D7] pt-16">
      <h2 className="text-2xl md:text-3xl font-display mb-10 text-center">Frequently Asked Questions</h2>

      <div className="space-y-8">
        {faqs.map((faq) => (
          <div key={faq.q}>
            <h3 className="font-medium text-[1.0625rem] mb-2">{faq.q}</h3>
            <p className="text-[#3B3A38]/80 text-[0.9375rem] leading-relaxed">{renderAnswer(faq.a)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
