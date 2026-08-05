'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const ITEMS = [
  { id: 'botanical-actives',      label: 'Botanical actives',      note: 'Plant-derived, selected for function not marketing appeal.' },
  { id: 'carrier-oils',           label: 'Carrier oils',            note: 'Cold-pressed where possible, from verified sources.' },
  { id: 'no-synthetic-fragrance', label: 'No synthetic fragrance',  note: 'Scent comes from the ingredients, not added perfume.' },
  { id: 'no-artificial-colour',   label: 'No artificial colour',    note: 'Natural tone only. If a product looks pale, that is correct.' },
] as const;

type ItemId = typeof ITEMS[number]['id'];

export default function IngredientAccordion() {
  // Desktop: the currently open item (hover-driven). First item open by default.
  const [openId, setOpenId] = useState<ItemId>(ITEMS[0].id);

  // Mobile: items revealed by IntersectionObserver as they scroll into view.
  const [revealed, setRevealed] = useState<Set<ItemId>>(new Set());

  // Map of item id → DOM node, populated via callback refs.
  const nodeMap = useRef<Map<ItemId, HTMLDivElement>>(new Map());

  const setRef = useCallback((id: ItemId) => (el: HTMLDivElement | null) => {
    if (el) {
      nodeMap.current.set(id, el);
    } else {
      nodeMap.current.delete(id);
    }
  }, []);

  // Attach IntersectionObservers for mobile scroll-reveal.
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    ITEMS.forEach((item) => {
      const el = nodeMap.current.get(item.id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setRevealed((prev) => {
              const next = new Set(prev);
              next.add(item.id);
              return next;
            });
            obs.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {ITEMS.map((item) => {
        const isOpen = openId === item.id;
        const isRevealed = revealed.has(item.id);
        const noteId = `ingredient-note-${item.id}`;
        const triggerId = `ingredient-trigger-${item.id}`;

        return (
          <div
            key={item.id}
            ref={setRef(item.id)}
            className="border-t border-[#D8CFC4] pt-5"
            onMouseEnter={() => setOpenId(item.id)}
          >
            {/* Label — acts as the accordion trigger; keyboard-focusable for a11y */}
            <button
              type="button"
              id={triggerId}
              aria-expanded={isOpen}
              aria-controls={noteId}
              className="w-full text-left flex items-center justify-between gap-3 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8D9A83]"
              data-kite-expand={item.id}
            >
              <p
                className="text-[0.875rem] font-medium text-[#3B3A38] tracking-wide"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {item.label}
              </p>
              {/* Chevron indicator — desktop only; hidden on mobile where note is always shown */}
              <svg
                width="10" height="10" viewBox="0 0 10 10" fill="none"
                stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
                aria-hidden="true"
                className={`hidden md:block flex-shrink-0 text-[#BEB8AF] transition-transform duration-[800ms] ${isOpen ? 'rotate-180' : ''}`}
              >
                <polyline points="2,3.5 5,6.5 8,3.5" />
              </svg>
            </button>

            {/* Desktop note — height-animated via max-height on hover */}
            <div
              id={noteId}
              role="region"
              aria-labelledby={triggerId}
              className="hidden md:block overflow-hidden"
              style={{
                maxHeight: isOpen ? '120px' : '0px',
                opacity: isOpen ? 1 : 0,
                marginTop: isOpen ? '6px' : '0px',
                transition: 'max-height 800ms ease, opacity 800ms ease, margin-top 800ms ease',
              }}
            >
              <p className="text-[0.75rem] font-light text-[#68735F] leading-[1.55]">
                {item.note}
              </p>
            </div>

            {/* Mobile note — always rendered but revealed as row enters viewport */}
            <div
              className="md:hidden mt-1.5"
              style={{
                opacity: isRevealed ? 1 : 0,
                transform: isRevealed ? 'translateY(0)' : 'translateY(5px)',
                transition: 'opacity 600ms ease, transform 600ms ease',
              }}
              aria-hidden={!isRevealed}
            >
              <p className="text-[0.75rem] font-light text-[#68735F] leading-[1.55]">
                {item.note}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
