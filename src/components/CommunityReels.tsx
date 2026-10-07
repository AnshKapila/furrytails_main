'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { REELS, REELS_HEADING, type Reel } from '@/data/reels';

// Horizontal strip of customer videos below the expert quotes. Content lives in
// data/reels.ts. Videos are muted, loop, and only download/play while on
// screen, so six clips don't cost anything until someone scrolls to them.

const PREVIEW_COUNT = 6;

function SoundIcon({ muted }: { muted: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5 6 9H2v6h4l5 4V5z" />
      {muted ? <path d="m23 9-6 6m0-6 6 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />}
    </svg>
  );
}

function ReelCard({ reel }: { reel: Reel }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduceMotion) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.6 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (video.paused) video.play().catch(() => {});
  };

  return (
    <li className="flex-shrink-0 w-[44vw] sm:w-[30vw] md:w-[24vw] lg:w-[calc((100%-5*1.25rem)/6)] snap-start">
      <div className="relative aspect-[9/16] rounded-lg overflow-hidden bg-[#D8CFC4]">
        <video
          ref={videoRef}
          src={reel.src}
          poster={reel.poster}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover"
          aria-label={reel.caption || 'Customer video'}
        />
        <button
          type="button"
          onClick={toggleSound}
          className="absolute top-3 right-3 p-2 rounded-full bg-[#3B3A38]/45 text-[#F8F5F1] backdrop-blur-sm hover:bg-[#3B3A38]/70 transition-colors"
          aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
        >
          <SoundIcon muted={muted} />
        </button>
        {reel.handle && (
          <a
            href={`https://instagram.com/${reel.handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 left-3 text-[0.75rem] text-[#F8F5F1] drop-shadow hover:underline"
          >
            @{reel.handle}
          </a>
        )}
      </div>
      {(reel.caption || reel.product) && (
        <div className="mt-3 px-1">
          {reel.caption && <p className="text-[0.875rem] font-light text-[#3B3A38]">{reel.caption}</p>}
          {reel.product && (
            <Link href={reel.product.href} className="mt-1 inline-block text-[0.75rem] tracking-[0.04em] text-[#68735F] hover:text-[#3B3A38] underline-offset-4 hover:underline">
              {reel.product.name} →
            </Link>
          )}
        </div>
      )}
    </li>
  );
}

function PlaceholderCard({ n }: { n: number }) {
  return (
    <li className="flex-shrink-0 w-[44vw] sm:w-[30vw] md:w-[24vw] lg:w-[calc((100%-5*1.25rem)/6)] snap-start">
      <div className="aspect-[9/16] rounded-lg bg-[#D8CFC4] flex items-center justify-center text-[0.75rem] tracking-[0.15em] uppercase text-[#3B3A38]/50">
        Video {n}
      </div>
    </li>
  );
}

export default function CommunityReels() {
  const preview = REELS.length === 0 && process.env.NODE_ENV !== 'production';
  const stripRef = useRef<HTMLUListElement>(null);
  // Which arrows have somewhere to go. On wide screens all six cards fit and
  // neither shows.
  const [canScroll, setCanScroll] = useState({ prev: false, next: false });

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const update = () =>
      setCanScroll({
        prev: strip.scrollLeft > 4,
        next: strip.scrollLeft + strip.clientWidth < strip.scrollWidth - 4,
      });
    update();
    strip.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(strip);
    return () => {
      strip.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, []);

  if (REELS.length === 0 && !preview) return null;

  const scroll = (dir: 1 | -1) => {
    const strip = stripRef.current;
    if (strip) strip.scrollBy({ left: dir * strip.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <section
      id="community-reels"
      className="py-16 md:py-20 bg-[#F8F5F1]"
      aria-label={REELS_HEADING.heading}
      data-kite-surface="home.community-reels"
      data-kite-surface-type="testimonial"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <h2 className="text-[#3B3A38] mb-8 md:mb-10" style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem, 3.2vw, 2.625rem)', fontWeight: 300, lineHeight: 1.15 }}>
          {REELS_HEADING.heading}
        </h2>

        <div className="relative">
          <ul
            ref={stripRef}
            className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
            style={{ scrollPaddingLeft: '1.5rem', scrollbarWidth: 'none' }}
          >
            {preview
              ? Array.from({ length: PREVIEW_COUNT }, (_, i) => <PlaceholderCard key={i} n={i + 1} />)
              : REELS.map((reel) => <ReelCard key={reel.src} reel={reel} />)}
          </ul>

          {/* Arrows overlap the strip edges, vertically centred on the videos */}
          {([-1, 1] as const).filter((dir) => (dir === -1 ? canScroll.prev : canScroll.next)).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => scroll(dir)}
              className={`hidden md:flex absolute top-[calc(50%-0.75rem)] -translate-y-1/2 ${dir === -1 ? 'left-2' : 'right-2'} w-11 h-11 rounded-full bg-[#F8F5F1] shadow-[0_2px_10px_rgba(59,58,56,0.18)] items-center justify-center text-[#3B3A38] hover:bg-white transition-colors`}
              aria-label={dir === -1 ? 'Scroll videos left' : 'Scroll videos right'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {dir === -1 ? <path d="m15 6-6 6 6 6" /> : <path d="m9 6 6 6-6 6" />}
              </svg>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
