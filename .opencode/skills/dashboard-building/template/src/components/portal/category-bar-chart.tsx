'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { formatChartValue, type ChartValueFormat } from '@/lib/format';
import { cn } from '@/lib/utils';

export type CategoryPoint = {
  label: string;
  value: number;
  comparison?: number;
};

/*
 * Categorical comparison as real bars. Use the horizontal layout when
 * category labels are long or there are more than five categories; use
 * `ComparisonBarList` instead when a handful of directly-labeled rows is
 * enough.
 */
export function CategoryBarChart({
  data,
  valueLabel,
  comparisonLabel,
  valueFormat = 'number',
  currency = 'USD',
  horizontal = false,
  categoryWidth = 140,
  className,
}: {
  data: CategoryPoint[];
  valueLabel: string;
  comparisonLabel?: string;
  valueFormat?: ChartValueFormat;
  currency?: string;
  horizontal?: boolean;
  categoryWidth?: number;
  className?: string;
}) {
  const config = {
    value: {
      label: valueLabel,
      color: 'var(--chart-1)',
    },
    comparison: {
      label: comparisonLabel ?? 'Comparison',
      color: 'var(--chart-2)',
    },
  } satisfies ChartConfig;

  const formatValue = (value: number) =>
    formatChartValue(value, valueFormat, currency);

  return (
    <ChartContainer
      config={config}
      className={cn('h-72 w-full aspect-auto sm:h-80', className)}
    >
      <BarChart
        accessibilityLayer
        data={data}
        layout={horizontal ? 'vertical' : 'horizontal'}
        margin={{ left: 0, right: 12, top: 12, bottom: 0 }}
        responsive
        style={{ width: '100%', height: '100%' }}
      >
        <CartesianGrid
          horizontal={!horizontal}
          vertical={horizontal}
          strokeDasharray="3 3"
        />
        {horizontal ? (
          <>
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tickFormatter={formatValue}
              tickMargin={8}
            />
            <YAxis
              type="category"
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              width={categoryWidth}
            />
          </>
        ) : (
          <>
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              minTickGap={16}
              tickMargin={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={formatValue}
              tickMargin={8}
              width={52}
            />
          </>
        )}
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Bar
          dataKey="value"
          fill="var(--color-value)"
          radius={horizontal ? [0, 4, 4, 0] : [4, 4, 0, 0]}
          maxBarSize={44}
          isAnimationActive={false}
        />
        {comparisonLabel ? (
          <Bar
            dataKey="comparison"
            fill="var(--color-comparison)"
            radius={horizontal ? [0, 4, 4, 0] : [4, 4, 0, 0]}
            maxBarSize={44}
            isAnimationActive={false}
          />
        ) : null}
      </BarChart>
    </ChartContainer>
  );
}
