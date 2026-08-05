'use client';

import { useId } from 'react';
import { Area, AreaChart, CartesianGrid, Line, XAxis, YAxis } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { formatChartValue, type ChartValueFormat } from '@/lib/format';
import { cn } from '@/lib/utils';

export type TrendPoint = {
  label: string;
  value: number;
  comparison?: number;
};

export function TrendChart({
  data,
  valueLabel,
  comparisonLabel,
  valueFormat = 'number',
  currency = 'USD',
  className,
}: {
  data: TrendPoint[];
  valueLabel: string;
  comparisonLabel?: string;
  valueFormat?: ChartValueFormat;
  currency?: string;
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
  const gradientId = `trend-fill-${useId().replace(/:/g, '')}`;

  const formatValue = (value: number) =>
    formatChartValue(value, valueFormat, currency);

  // Recharts 3.10 sizes responsive charts from normal CSS instead of an
  // additional ResponsiveContainer wrapper.
  return (
    <ChartContainer
      config={config}
      className={cn('h-72 w-full aspect-auto sm:h-80', className)}
    >
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{ left: 0, right: 12, top: 12, bottom: 0 }}
        responsive
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-value)"
              stopOpacity={0.24}
            />
            <stop
              offset="95%"
              stopColor="var(--color-value)"
              stopOpacity={0.02}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="label"
          axisLine={false}
          tickLine={false}
          minTickGap={24}
          tickMargin={10}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickFormatter={formatValue}
          tickMargin={8}
          width={52}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Area
          dataKey="value"
          type="monotone"
          fill={`url(#${gradientId})`}
          fillOpacity={1}
          stroke="var(--color-value)"
          strokeWidth={2.5}
          activeDot={{ r: 4 }}
          isAnimationActive={false}
        />
        {comparisonLabel ? (
          <Line
            dataKey="comparison"
            type="monotone"
            stroke="var(--color-comparison)"
            strokeDasharray="5 5"
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
          />
        ) : null}
      </AreaChart>
    </ChartContainer>
  );
}
