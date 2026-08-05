import { cn } from '@/lib/utils';

export type Fact = {
  label: string;
  value: React.ReactNode;
};

/*
 * Compact entity facts (founded, headquarters, funding, team size, …) for
 * profile pages. A definition list, not a row of metric cards: profile
 * attributes are reference detail, not measures with trends.
 */
export function FactList({
  facts,
  columns = 1,
  className,
}: {
  facts: Fact[];
  columns?: 1 | 2;
  className?: string;
}) {
  return (
    <dl
      className={cn(
        'grid gap-x-8',
        columns === 2 && 'sm:grid-cols-2',
        className,
      )}
    >
      {facts.map((fact) => (
        <div
          key={fact.label}
          className="grid grid-cols-[minmax(7rem,auto)_minmax(0,1fr)] gap-3 border-b border-border py-3 text-sm last:border-b-0 sm:grid-cols-[minmax(9rem,auto)_minmax(0,1fr)]"
        >
          <dt className="font-medium text-muted-foreground">{fact.label}</dt>
          <dd className="min-w-0 break-words font-medium leading-6">
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
