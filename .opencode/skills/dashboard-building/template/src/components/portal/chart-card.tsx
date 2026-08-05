import { ChevronDown } from 'lucide-react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function ChartCard({
  title,
  description,
  source,
  dataWindow,
  actions,
  children,
  dataTable,
  dataTableLabel = 'View underlying data',
  className,
}: {
  title: string;
  description?: string;
  source?: string;
  dataWindow?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  dataTable?: React.ReactNode;
  dataTableLabel?: string;
  className?: string;
}) {
  return (
    <Card
      role="figure"
      aria-label={title}
      className={cn('min-w-0 overflow-hidden', className)}
    >
      <CardHeader className="gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
        <div className="min-w-0">
          <CardTitle className="text-lg">{title}</CardTitle>
          {description ? (
            <p className="mt-2 max-w-[65ch] text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? (
          <div className="flex flex-wrap items-center gap-2">{actions}</div>
        ) : null}
      </CardHeader>
      <CardContent className="min-w-0">{children}</CardContent>
      {dataTable ? (
        <div className="border-t border-border">
          <details className="group">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-6 py-3 text-sm font-medium hover:bg-muted/40 [&::-webkit-details-marker]:hidden">
              {dataTableLabel}
              <ChevronDown
                className="size-4 shrink-0 transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <div className="border-t border-border pb-4">{dataTable}</div>
          </details>
        </div>
      ) : null}
      {source || dataWindow ? (
        <CardFooter className="flex-wrap gap-x-5 gap-y-1 border-t border-border pt-4 text-xs leading-5 text-muted-foreground">
          {source ? <span>Source: {source}</span> : null}
          {dataWindow ? <span>Window: {dataWindow}</span> : null}
        </CardFooter>
      ) : null}
    </Card>
  );
}
