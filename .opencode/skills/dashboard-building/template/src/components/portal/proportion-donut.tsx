'use client';

import { Cell, Pie, PieChart } from 'recharts';

import { formatChartValue, type ChartValueFormat } from '@/lib/format';
import { cn } from '@/lib/utils';

export type ProportionSlice = {
  label: string;
  value: number;
};

const palette = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
];

/*
 * Composition of a whole with at most five slices; group the remainder into
 * an "Other" slice before rendering. The HTML legend carries every label,
 * value, and share, so the drawing itself stays decorative.
 */
export function ProportionDonut({
  data,
  totalLabel = 'Total',
  valueFormat = 'number',
  currency = 'USD',
  className,
}: {
  data: ProportionSlice[];
  totalLabel?: string;
  valueFormat?: ChartValueFormat;
  currency?: string;
  className?: string;
}) {
  const total = data.reduce((sum, slice) => sum + slice.value, 0);
  const formatValue = (value: number) =>
    formatChartValue(value, valueFormat, currency);

  return (
    <div
      className={cn(
        'flex min-w-0 flex-wrap items-center gap-x-8 gap-y-6',
        className,
      )}
    >
      <div className="relative size-44 shrink-0" aria-hidden="true">
        <PieChart width={176} height={176}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            innerRadius={60}
            outerRadius={84}
            strokeWidth={2}
            stroke="var(--card)"
            isAnimationActive={false}
          >
            {data.map((slice, index) => (
              <Cell key={slice.label} fill={palette[index % palette.length]} />
            ))}
          </Pie>
        </PieChart>
        <div className="absolute inset-0 grid place-content-center text-center">
          <span className="text-xl font-semibold tracking-[-0.02em] tabular-nums">
            {formatValue(total)}
          </span>
          <span className="text-xs text-muted-foreground">{totalLabel}</span>
        </div>
      </div>
      <ul className="min-w-0 flex-1 basis-56 space-y-2.5">
        {data.map((slice, index) => {
          const share = total > 0 ? (slice.value / total) * 100 : 0;

          return (
            <li
              key={slice.label}
              className="flex min-w-0 items-center gap-2.5 text-sm"
            >
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ background: palette[index % palette.length] }}
                aria-hidden="true"
              />
              <span className="min-w-0 flex-1 truncate font-medium">
                {slice.label}
              </span>
              <span className="shrink-0 tabular-nums">
                {formatValue(slice.value)}
              </span>
              <span className="w-12 shrink-0 text-right tabular-nums text-muted-foreground">
                {share.toLocaleString('en', { maximumFractionDigits: 0 })}%
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
