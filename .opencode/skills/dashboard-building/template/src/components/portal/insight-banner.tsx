import { Lightbulb, type LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

export function InsightBanner({
  label = 'Executive readout',
  title,
  description,
  icon: Icon = Lightbulb,
  supporting,
  className,
}: {
  label?: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  supporting?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      aria-label={label}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-primary/20 bg-accent/45 p-5 shadow-[inset_4px_0_0_var(--primary)] sm:p-7',
        className,
      )}
    >
      <div className="grid gap-5 md:grid-cols-[auto_minmax(0,1fr)] md:items-start">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            {label}
          </p>
          <h2 className="mt-2 max-w-[36ch] text-xl font-semibold tracking-[-0.02em] text-balance sm:text-2xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-3 max-w-[70ch] text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
              {description}
            </p>
          ) : null}
          {supporting ? (
            <div className="mt-5 flex flex-wrap gap-2">{supporting}</div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
