import { cn } from '@/lib/utils';

/*
 * A tight ordinal score as step dots. Use beside a ranked list when scores
 * cluster (say 16–23 of 25) — magnitude bars would render them all
 * near-identical. The value stays visible as text; the dots are redundant.
 */
export function RatingDots({
  value,
  max = 5,
  label,
  className,
}: {
  value: number;
  max?: number;
  label?: string;
  className?: string;
}) {
  const filled = Math.round(Math.max(0, Math.min(value, max)));

  return (
    <span
      className={cn('inline-flex items-center gap-2', className)}
      role="img"
      aria-label={`${label ?? 'Score'}: ${value} of ${max}`}
    >
      <span className="flex items-center gap-1" aria-hidden="true">
        {Array.from({ length: max }, (_, index) => (
          <span
            key={index}
            className={cn(
              'size-1.5 rounded-full',
              index < filled ? 'bg-primary' : 'bg-muted',
            )}
          />
        ))}
      </span>
      <span className="text-xs font-medium tabular-nums text-muted-foreground">
        {value}/{max}
      </span>
    </span>
  );
}
