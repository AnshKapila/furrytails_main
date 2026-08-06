'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useInView } from '@/hooks/useInView';
import { PawPrint } from 'lucide-react';

// Using inline types to avoid circular/import issues with typeof ingredientStories
type Story = {
  index: number;
  ingredient: string;
  shortIntro: string;
  benefits: string[];
  product: string;
  productId: string;
  ingredientImage: {
    src: string;
    alt: string;
  };
};

export default function IngredientRow({ story, i }: { story: Story; i: number }) {
  const { ref, inView } = useInView({ threshold: 0.2 });
  const isEven = i % 2 === 0;

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-[#E9E2D7] group ${i === 0 ? '' : ''}`}
    >
      {/* Image */}
      <div
        className={`relative aspect-[4/3] overflow-hidden bg-[#EDE7DF] anim-accordion ${inView ? 'in-view' : ''} ${isEven ? 'md:order-first' : 'md:order-last'}`}
      >
        <Image
          src={story.ingredientImage.src}
          alt={story.ingredientImage.alt}
          fill
          className="object-cover object-center transition-[transform,filter] duration-[800ms] ease-out [filter:saturate(50%)] group-hover:[filter:saturate(100%)] group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={i === 0}
        />
      </div>

      {/* Content */}
      <div
        className={`flex flex-col justify-center gap-6 py-12 md:py-16 ${isEven ? 'md:pl-14 md:pr-4' : 'md:pr-14 md:pl-4'}`}
      >
        <div>
          <p className={`text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#BEB8AF] mb-3 anim-blur-slide ${inView ? 'in-view' : ''}`} style={{ transitionDelay: '0ms' }}>
            {String(i + 1).padStart(2, '0')} — Featured ingredient
          </p>
          <h2
            className={`text-[#3B3A38] anim-blur-slide ${inView ? 'in-view' : ''}`}
            style={{ transitionDelay: '100ms', fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2rem, 3.2vw, 2.625rem)', fontWeight: 300, lineHeight: 1.15 }}
          >
            {story.ingredient}
          </h2>
        </div>

        <p className={`text-[0.875rem] font-light text-[#3B3A38]/80 leading-[1.65] anim-blur-slide ${inView ? 'in-view' : ''}`} style={{ transitionDelay: '200ms' }}>
          {story.shortIntro}
        </p>

        <div className="flex flex-col gap-3">
          {story.benefits.map((benefit, bIdx) => (
            <div key={benefit} className={`flex items-start gap-3 anim-blur-slide ${inView ? 'in-view' : ''}`} style={{ transitionDelay: `${300 + (bIdx * 100)}ms` }}>
              <PawPrint className="w-3 h-3 flex-shrink-0 text-[#8D9A83] mt-[3px]" aria-hidden="true" />
              <p className="text-[0.75rem] font-light text-[#68735F] leading-[1.55]">
                {benefit}
              </p>
            </div>
          ))}
        </div>

        <div className={`pt-2 border-t border-[#E9E2D7] anim-blur-slide ${inView ? 'in-view' : ''}`} style={{ transitionDelay: '500ms' }}>
          <p className="text-[0.5625rem] font-normal tracking-[0.18em] uppercase text-[#BEB8AF] mb-2">
            Featured in
          </p>
          <Link
            href={`/products/${story.productId}`}
            className="hero-btn-secondary group focus:outline-none"
            data-kite-cta-id="ingredient-product-link"
            data-kite-role="secondary"
            data-kite-event="product_viewed"
            data-kite-item={story.productId}
          >
            {story.product}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true" className="flex-shrink-0 transition-transform duration-400 group-hover:translate-x-1 group-focus-visible:translate-x-1">
              <line x1="1" y1="7" x2="13" y2="7" />
              <polyline points="8,2 13,7 8,12" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
