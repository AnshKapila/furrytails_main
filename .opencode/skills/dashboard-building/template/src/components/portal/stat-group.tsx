import { cn } from '@/lib/utils';

export type StatGroupItem = {
  label: string;
  value: string;
  detail?: string;
};

/*
 * Borderless secondary stats. Use for numbers that support the story so they
 * do not compete with the primary `MetricCard` row for visual weight.
 */
export function StatGroup({
  items,
  className,
}: {
  items: StatGroupItem[];
  className?: string;
}) {
  return (
    <dl
      className={cn(
        'grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4',
        className,
      )}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="min-w-0 border-l-2 border-primary/40 pl-4"
        >
          <dt className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
            {item.label}
          </dt>
          <dd className="mt-1">
            <span className="block break-words text-xl font-semibold tracking-[-0.02em] tabular-nums">
              {item.value}
            </span>
            {item.detail ? (
              <span className="mt-0.5 block text-sm leading-5 text-muted-foreground">
                {item.detail}
              </span>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}
