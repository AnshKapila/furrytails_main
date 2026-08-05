import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export type MetricTrend = {
  text: string;
  direction?: 'up' | 'down' | 'flat';
  sentiment?: 'positive' | 'negative' | 'neutral';
};

const trendIcons = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  flat: ArrowRight,
};

export function MetricCard({
  label,
  value,
  trend,
  context,
  icon: Icon,
  featured = false,
}: {
  label: string;
  value: string;
  trend?: MetricTrend;
  context?: string;
  icon?: LucideIcon;
  featured?: boolean;
}) {
  const TrendIcon = trend ? trendIcons[trend.direction ?? 'flat'] : null;

  return (
    <Card
      className={cn(
        'min-w-0 gap-4 overflow-hidden',
        featured && 'border-primary/30 bg-accent/35',
      )}
    >
      <CardHeader className="grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <CardTitle className="text-sm font-medium leading-5 text-muted-foreground">
          {label}
        </CardTitle>
        {Icon ? (
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary">
            <Icon className="size-4" aria-hidden="true" />
          </span>
        ) : null}
      </CardHeader>
      <CardContent className="mt-auto">
        <p className="break-words text-3xl font-semibold tracking-[-0.025em] tabular-nums sm:text-[2rem]">
          {value}
        </p>
        {trend ? (
          <Badge
            variant="outline"
            className={cn(
              'mt-3 max-w-full whitespace-normal',
              trend.sentiment === 'positive' &&
                'border-success/25 bg-success/10 text-success',
              trend.sentiment === 'negative' &&
                'border-danger/25 bg-danger/10 text-danger',
            )}
          >
            {TrendIcon ? (
              <TrendIcon className="size-3.5 shrink-0" aria-hidden="true" />
            ) : null}
            <span>{trend.text}</span>
          </Badge>
        ) : null}
        {context ? (
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {context}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
