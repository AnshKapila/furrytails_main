'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { EXPERTS, visibleExperts, type Expert } from '@/data/experts';

// Homepage carousel of expert quotes, below "Our Range". Content lives in
// data/experts.ts - see the rules there before adding anyone.

const QuoteMark = ({ flip = false }: { flip?: boolean }) => (
  <svg
    viewBox="0 0 64 48"
    className={`w-10 md:w-14 h-auto text-[#8D9A83] ${flip ? 'rotate-180' : ''}`}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M0 48V27C0 12 7 3 22 0l2 6C15 9 12 15 12 22h12v26H0zm38 0V27c0-15 7-24 22-27l2 6c-9 3-12 9-12 16h12v26H38z" />
  </svg>
);

const Arrow = ({ dir }: { dir: 'prev' | 'next' }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {dir === 'prev' ? <path d="M19 12H5m6-6-6 6 6 6" /> : <path d="M5 12h14m-6-6 6 6-6 6" />}
  </svg>
);

function Portrait({ expert }: { expert: Expert }) {
  const initials = expert.name
    .split(/\s+/)
    .filter((w) => !/^dr\.?$/i.test(w))
    .map((w) => w[0])
    .slice(0, 2)
    .join('');
  return (
    <div className="relative w-36 h-36 md:w-56 md:h-56 rounded-full overflow-hidden bg-[#D8CFC4] shrink-0">
      {expert.photo ? (
        <Image src={expert.photo} alt={expert.name} fill sizes="(max-width: 768px) 144px, 224px" className="object-cover" />
      ) : (
        <span
          className="absolute inset-0 flex items-center justify-center text-[#F8F5F1] text-5xl md:text-7xl font-light"
          style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          aria-hidden="true"
        >
          {initials}
        </span>
      )}
    </div>
  );
}

export default function ExpertVoices() {
  const experts = visibleExperts(EXPERTS, process.env.NODE_ENV === 'production');
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);

  if (experts.length === 0) return null;

  const go = (step: number) => setIndex((i) => (i + step + experts.length) % experts.length);
  const expert = experts[index];
  const multiple = experts.length > 1;

  return (
    <section
      id="expert-voices"
      className="py-16 md:py-24 bg-[#EDE7DF]"
      aria-roledescription="carousel"
      aria-label="What experts say"
      data-kite-surface="home.expert-voices"
      data-kite-surface-type="testimonial"
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') go(-1);
        if (e.key === 'ArrowRight') go(1);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <p className="text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#8D9A83] mb-10 md:mb-12 text-center md:text-left">
          In their words
        </p>

        <div className="relative flex items-center gap-2 md:gap-6">
          {multiple && (
            <button
              type="button"
              onClick={() => go(-1)}
              className="hidden md:flex shrink-0 p-2 text-[#3B3A38]/60 hover:text-[#3B3A38] transition-colors"
              aria-label="Previous quote"
            >
              <Arrow dir="prev" />
            </button>
          )}

          <div
            key={index}
            className="expert-slide flex-1 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-16 items-center"
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${experts.length}`}
          >
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <Portrait expert={expert} />
              <p className="mt-6 text-[#3B3A38] text-lg font-normal">{expert.name}</p>
              <p className="mt-1 text-[0.8125rem] font-light text-[#3B3A38]/70 max-w-[240px]">{expert.role}</p>
              {expert.disclosure && (
                <p className="mt-2 text-[0.6875rem] font-light text-[#3B3A38]/55 max-w-[240px]">{expert.disclosure}</p>
              )}
            </div>

            <figure className="flex flex-col">
              <QuoteMark />
              <blockquote
                className="my-4 md:my-6 text-[#3B3A38] italic font-light leading-[1.35] text-[clamp(1.375rem,2.4vw,2rem)]"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                {expert.quote}
              </blockquote>
              <div className="self-end">
                <QuoteMark flip />
              </div>
              <figcaption className="sr-only">
                {expert.name}, {expert.role}
              </figcaption>
            </figure>
          </div>

          {multiple && (
            <button
              type="button"
              onClick={() => go(1)}
              className="hidden md:flex shrink-0 p-2 text-[#3B3A38]/60 hover:text-[#3B3A38] transition-colors"
              aria-label="Next quote"
            >
              <Arrow dir="next" />
            </button>
          )}
        </div>

        {multiple && (
          <div className="mt-10 flex justify-center gap-3">
            {experts.map((e, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-[#3B3A38]' : 'w-2 bg-[#3B3A38]/25 hover:bg-[#3B3A38]/50'}`}
                aria-label={`Show quote ${i + 1}`}
                aria-current={i === index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
