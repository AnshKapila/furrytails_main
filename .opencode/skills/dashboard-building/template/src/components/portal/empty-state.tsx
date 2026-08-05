import { Inbox, type LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

export function EmptyState({
  title,
  description,
  action,
  icon: Icon = Inbox,
  compact = false,
  className,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: LucideIcon;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex min-w-0 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/25 px-5 text-center',
        compact ? 'min-h-48 py-8' : 'min-h-72 py-12',
        className,
      )}
    >
      <span className="flex size-11 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground shadow-sm">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-base font-semibold">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-[50ch] text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
