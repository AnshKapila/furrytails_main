import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type KeyFinding = {
  title: string;
  detail?: string;
  tag?: string;
  tone?: 'positive' | 'negative' | 'warning' | 'neutral';
};

const toneClasses = {
  positive: 'border-success/25 bg-success/10 text-success',
  negative: 'border-danger/25 bg-danger/10 text-danger',
  warning: 'border-warning/25 bg-warning/10 text-warning',
  neutral: '',
} as const;

/*
 * Ranked qualitative findings. This is the lead element for research and
 * analysis pages: a numbered typographic list, not a grid of cards.
 */
export function KeyFindings({
  findings,
  className,
}: {
  findings: KeyFinding[];
  className?: string;
}) {
  return (
    <ol className={cn('divide-y divide-border', className)}>
      {findings.map((finding, index) => (
        <li key={finding.title} className="flex gap-4 py-5 first:pt-0">
          <span
            aria-hidden="true"
            className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold tabular-nums text-primary"
          >
            {index + 1}
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-semibold leading-6 text-balance">
                {finding.title}
              </h3>
              {finding.tag ? (
                <Badge
                  variant="outline"
                  className={cn(toneClasses[finding.tone ?? 'neutral'])}
                >
                  {finding.tag}
                </Badge>
              ) : null}
            </div>
            {finding.detail ? (
              <p className="mt-1.5 max-w-[70ch] text-sm leading-6 text-muted-foreground">
                {finding.detail}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
