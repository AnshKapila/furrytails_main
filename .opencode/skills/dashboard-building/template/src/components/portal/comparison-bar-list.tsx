import { cn } from '@/lib/utils';

export type ComparisonBarItem = {
  id?: string;
  label: string;
  value: number;
  displayValue?: string;
  detail?: string;
};

export function ComparisonBarList({
  items,
  maxValue,
  valueLabel = 'Value',
  className,
}: {
  items: ComparisonBarItem[];
  maxValue?: number;
  valueLabel?: string;
  className?: string;
}) {
  const scaleMax =
    maxValue ??
    items.reduce((currentMax, item) => Math.max(currentMax, item.value), 0);

  return (
    <div className={cn('space-y-5', className)} role="list">
      {items.map((item, index) => {
        const width =
          scaleMax > 0 && item.value > 0
            ? `${Math.max(2, Math.min(100, (item.value / scaleMax) * 100))}%`
            : '0%';

        return (
          <div
            key={item.id ?? `${item.label}:${index}`}
            className="min-w-0"
            role="listitem"
          >
            <div className="mb-2 flex items-start justify-between gap-4 text-sm">
              <div className="min-w-0">
                <p className="font-medium leading-5">{item.label}</p>
                {item.detail ? (
                  <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                    {item.detail}
                  </p>
                ) : null}
              </div>
              <p className="shrink-0 font-semibold tabular-nums">
                <span className="sr-only">{valueLabel}: </span>
                {item.displayValue ?? item.value.toLocaleString()}
              </p>
            </div>
            <div
              className="h-2.5 overflow-hidden rounded-full bg-muted"
              aria-hidden="true"
            >
              <div
                className="h-full rounded-full bg-primary"
                style={{ width }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
