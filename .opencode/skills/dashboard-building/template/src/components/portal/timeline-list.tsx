import { cn } from '@/lib/utils';

export type TimelineItem = {
  date: string;
  title: string;
  detail?: string;
  badge?: React.ReactNode;
};

/*
 * Date-ordered items on a visible time rail — events, launches, milestones.
 * Pass items already sorted; the rail communicates sequence, so keep each
 * item's detail to one or two short sentences.
 */
export function TimelineList({
  items,
  className,
}: {
  items: TimelineItem[];
  className?: string;
}) {
  return (
    <ol className={cn('space-y-0', className)}>
      {items.map((item, index) => (
        <li
          key={`${item.date}:${item.title}`}
          className="relative flex gap-4 pb-7 last:pb-0"
        >
          <span className="flex flex-col items-center" aria-hidden="true">
            <span className="mt-1.5 size-2.5 shrink-0 rounded-full border-2 border-primary bg-background" />
            {index < items.length - 1 ? (
              <span className="w-px flex-1 bg-border" />
            ) : null}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              {item.date}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <h3 className="text-base font-semibold leading-6 text-balance">
                {item.title}
              </h3>
              {item.badge}
            </div>
            {item.detail ? (
              <p className="mt-1 max-w-[70ch] text-sm leading-6 text-muted-foreground">
                {item.detail}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
