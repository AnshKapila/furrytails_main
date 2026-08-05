export type ChartValueFormat = 'number' | 'currency' | 'percent';

export function formatChartValue(
  value: number,
  format: ChartValueFormat = 'number',
  currency = 'USD',
) {
  if (format === 'currency') {
    return new Intl.NumberFormat('en', {
      style: 'currency',
      currency,
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  }

  if (format === 'percent') {
    return `${value.toLocaleString('en', {
      maximumFractionDigits: 1,
    })}%`;
  }

  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}
