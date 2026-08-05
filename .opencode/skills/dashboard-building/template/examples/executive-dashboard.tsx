/*
 * Composition reference only: this file is typechecked but is not a route.
 * Copy the structure that fits the question; replace every value and label
 * with verified data.
 */
import { DollarSign, Target, TrendingUp, Users } from 'lucide-react';

import { ChartCard } from '@/components/portal/chart-card';
import { ComparisonBarList } from '@/components/portal/comparison-bar-list';
import { DashboardSection } from '@/components/portal/dashboard-section';
import { DataTableCard } from '@/components/portal/data-table-card';
import { InsightBanner } from '@/components/portal/insight-banner';
import { MetricCard } from '@/components/portal/metric-card';
import { PageShell } from '@/components/portal/page-shell';
import { TrendChart } from '@/components/portal/trend-chart';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const trend = [
  { label: 'Jan', value: 620000, comparison: 540000 },
  { label: 'Feb', value: 680000, comparison: 570000 },
  { label: 'Mar', value: 705000, comparison: 610000 },
  { label: 'Apr', value: 790000, comparison: 650000 },
  { label: 'May', value: 845000, comparison: 690000 },
  { label: 'Jun', value: 930000, comparison: 735000 },
];

const segments = [
  {
    label: 'Enterprise',
    value: 930000,
    displayValue: '$930k',
    detail: '46% of bookings',
  },
  {
    label: 'Mid-market',
    value: 675000,
    displayValue: '$675k',
    detail: '34% of bookings',
  },
  {
    label: 'Small business',
    value: 405000,
    displayValue: '$405k',
    detail: '20% of bookings',
  },
];

export function ExecutiveDashboardExample() {
  return (
    <PageShell
      eyebrow="Revenue operations"
      title="Enterprise expansion is carrying the quarter"
      description="Bookings are ahead of plan, but the result depends on a small set of expansion deals. Protect those renewals before shifting attention to new pipeline."
      source="CRM opportunity snapshot"
      dataWindow="1 Jan–30 Jun 2026 · refreshed 1 Jul"
    >
      <InsightBanner
        title="Bookings are 14% above plan; enterprise expansion contributed most of the upside."
        description="The leading indicator is healthy, while pipeline coverage for the next quarter remains the main risk to watch."
        supporting={
          <>
            <Badge>On track</Badge>
            <Badge variant="outline">Next review: 8 Jul</Badge>
          </>
        }
      />

      <DashboardSection
        id="headline-metrics"
        eyebrow="Current position"
        title="The four measures that explain the result"
        description="Keep the first metric row short. Each card provides context instead of repeating a number without meaning."
        contentClassName="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <MetricCard
          label="Quarter bookings"
          value="$2.01m"
          icon={DollarSign}
          featured
          trend={{
            text: '14% above plan',
            direction: 'up',
            sentiment: 'positive',
          }}
          context="Closed-won bookings through 30 Jun."
        />
        <MetricCard
          label="Plan attainment"
          value="114%"
          icon={Target}
          trend={{
            text: '+9 pts month over month',
            direction: 'up',
            sentiment: 'positive',
          }}
          context="Quarter-to-date performance against plan."
        />
        <MetricCard
          label="Pipeline coverage"
          value="2.7×"
          icon={TrendingUp}
          trend={{
            text: '0.3× below target',
            direction: 'down',
            sentiment: 'negative',
          }}
          context="Qualified next-quarter pipeline versus quota."
        />
        <MetricCard
          label="Expansion accounts"
          value="18"
          icon={Users}
          trend={{
            text: '3 added this month',
            direction: 'up',
            sentiment: 'positive',
          }}
          context="Accounts with a closed expansion this quarter."
        />
      </DashboardSection>

      <DashboardSection
        id="drivers"
        eyebrow="Drivers"
        title="Momentum improved through the quarter"
        description="Use two or three decision-relevant views. Lead chart titles with the insight, not a generic measure name."
        contentClassName="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)]"
      >
        <ChartCard
          title="Monthly bookings moved above last year in March and kept widening"
          description="The dashed line is the comparable prior-year month."
          source="CRM opportunity snapshot"
          dataWindow="Jan–Jun 2026"
          dataTable={
            <Table>
              <TableCaption>
                Monthly bookings and prior-year comparison.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead className="text-right">Bookings</TableHead>
                  <TableHead className="text-right">Prior year</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trend.map((point) => (
                  <TableRow key={point.label}>
                    <TableCell className="font-medium">{point.label}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      ${point.value.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      ${point.comparison.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          }
        >
          <TrendChart
            data={trend}
            valueLabel="Bookings"
            comparisonLabel="Prior year"
            valueFormat="currency"
          />
        </ChartCard>

        <ChartCard
          title="Enterprise generated nearly half of bookings"
          description="Direct labels make a separate legend unnecessary."
          source="CRM opportunity snapshot"
          dataWindow="Quarter to date"
        >
          <ComparisonBarList items={segments} valueLabel="Bookings" />
        </ChartCard>
      </DashboardSection>

      <DashboardSection
        id="account-detail"
        eyebrow="Evidence"
        title="Expansion deals that need attention"
        description="Put row-level evidence after the conclusion and drivers so it supports, rather than obscures, the decision."
      >
        <DataTableCard
          title="Largest open expansion opportunities"
          description="Sorted by expected value. Dates are shown in a reader-friendly format."
          source="CRM opportunity snapshot"
          dataWindow="Refreshed 1 Jul 2026"
        >
          <Table>
            <TableCaption>
              Open enterprise expansion opportunities over $100k.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Account</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Close date</TableHead>
                <TableHead className="text-right">Expected value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Northstar Labs</TableCell>
                <TableCell>
                  <Badge variant="outline">Commercial review</Badge>
                </TableCell>
                <TableCell>18 Jul 2026</TableCell>
                <TableCell className="text-right font-medium tabular-nums">
                  $240,000
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Juniper Health</TableCell>
                <TableCell>
                  <Badge variant="outline">Security review</Badge>
                </TableCell>
                <TableCell>29 Jul 2026</TableCell>
                <TableCell className="text-right font-medium tabular-nums">
                  $185,000
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DataTableCard>
      </DashboardSection>
    </PageShell>
  );
}
