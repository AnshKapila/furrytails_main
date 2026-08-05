import {
  CircleAlert,
  CircleCheck,
  Info,
  TriangleAlert,
  type LucideIcon,
} from 'lucide-react';

import { cn } from '@/lib/utils';

type CalloutIntent = 'info' | 'success' | 'warning' | 'danger';

const intents: Record<
  CalloutIntent,
  { icon: LucideIcon; rule: string; iconColor: string }
> = {
  info: {
    icon: Info,
    rule: 'border-l-primary',
    iconColor: 'text-primary',
  },
  success: {
    icon: CircleCheck,
    rule: 'border-l-success',
    iconColor: 'text-success',
  },
  warning: {
    icon: TriangleAlert,
    rule: 'border-l-warning',
    iconColor: 'text-warning',
  },
  danger: {
    icon: CircleAlert,
    rule: 'border-l-danger',
    iconColor: 'text-danger',
  },
};

/*
 * A caveat, risk, or notable aside inside a section. Smaller than
 * `InsightBanner`, which stays reserved for the page's single primary finding.
 */
export function Callout({
  intent = 'info',
  title,
  children,
  className,
}: {
  intent?: CalloutIntent;
  title: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const { icon: Icon, rule, iconColor } = intents[intent];

  return (
    <aside
      className={cn(
        'flex gap-3 rounded-xl border border-border border-l-4 bg-card p-4',
        rule,
        className,
      )}
    >
      <Icon
        className={cn('mt-0.5 size-4.5 shrink-0', iconColor)}
        aria-hidden="true"
      />
      <div className="min-w-0">
        <p className="text-sm font-semibold leading-5">{title}</p>
        {children ? (
          <div className="mt-1 max-w-[70ch] text-sm leading-6 text-muted-foreground">
            {children}
          </div>
        ) : null}
      </div>
    </aside>
  );
}
