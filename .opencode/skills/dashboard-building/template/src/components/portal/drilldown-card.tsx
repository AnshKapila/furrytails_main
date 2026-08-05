import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';

/*
 * A link into a drill-down or related portal page. Use on a hub page to hand
 * readers to per-topic detail pages; the href must be a registered portal
 * route.
 */
export function DrilldownCard({
  href,
  eyebrow,
  title,
  description,
  stat,
  className,
}: {
  href: string;
  eyebrow?: string;
  title: string;
  description?: string;
  stat?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex min-w-0 flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          {eyebrow}
        </p>
      ) : null}
      <div className="flex items-start justify-between gap-3">
        <h3 className="min-w-0 text-base font-semibold leading-6 text-balance">
          {title}
        </h3>
        <ArrowRight
          className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
          aria-hidden="true"
        />
      </div>
      {description ? (
        <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      ) : null}
      {stat ? (
        <p className="mt-auto pt-3 text-lg font-semibold tracking-[-0.02em] tabular-nums">
          {stat}
        </p>
      ) : null}
    </Link>
  );
}
