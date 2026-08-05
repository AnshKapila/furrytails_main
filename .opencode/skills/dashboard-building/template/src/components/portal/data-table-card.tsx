import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function DataTableCard({
  title,
  description,
  source,
  dataWindow,
  actions,
  children,
  className,
}: {
  title: string;
  description?: string;
  source?: string;
  dataWindow?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card
      role="region"
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
      <CardContent className="px-0">{children}</CardContent>
      {source || dataWindow ? (
        <CardFooter className="flex-wrap gap-x-5 gap-y-1 border-t border-border pt-4 text-xs leading-5 text-muted-foreground">
          {source ? <span>Source: {source}</span> : null}
          {dataWindow ? <span>Window: {dataWindow}</span> : null}
        </CardFooter>
      ) : null}
    </Card>
  );
}
