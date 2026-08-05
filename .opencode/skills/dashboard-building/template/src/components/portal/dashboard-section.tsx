import { cn } from '@/lib/utils';

export function SectionHeader({
  headingId,
  eyebrow,
  title,
  description,
  actions,
  className,
}: {
  headingId?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between',
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow ? (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            {eyebrow}
          </p>
        ) : null}
        <h2
          id={headingId}
          className="text-xl font-semibold tracking-[-0.02em] text-balance sm:text-2xl"
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-2 max-w-[70ch] text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {actions}
        </div>
      ) : null}
    </div>
  );
}

export function DashboardSection({
  id,
  eyebrow,
  title,
  description,
  actions,
  children,
  className,
  contentClassName,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  const headingId = `${id}-heading`;

  return (
    <section
      aria-labelledby={headingId}
      id={id}
      className={cn('scroll-mt-16 space-y-5', className)}
    >
      <SectionHeader
        headingId={headingId}
        eyebrow={eyebrow}
        title={title}
        description={description}
        actions={actions}
      />
      <div className={cn('min-w-0', contentClassName)}>{children}</div>
    </section>
  );
}
