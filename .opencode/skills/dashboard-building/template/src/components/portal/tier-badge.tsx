import { cn } from '@/lib/utils';

export type TierTone = 'positive' | 'info' | 'neutral' | 'caution' | 'negative';

const tones: Record<TierTone, string> = {
  positive: 'border-success/30 bg-success/12 text-success',
  info: 'border-primary/30 bg-primary/12 text-primary',
  neutral: 'border-border bg-muted text-muted-foreground',
  caution: 'border-warning/30 bg-warning/12 text-warning',
  negative: 'border-danger/30 bg-danger/12 text-danger',
};

/*
 * A categorical verdict rendered as color, not prose: "Must attend",
 * "Sponsor selectively", "Monitor". Map the scale once per page and keep the
 * same tone for the same tier everywhere it appears.
 */
export function TierBadge({
  label,
  tone = 'neutral',
  className,
}: {
  label: string;
  tone?: TierTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold',
        tones[tone],
        className,
      )}
    >
      {label}
    </span>
  );
}
