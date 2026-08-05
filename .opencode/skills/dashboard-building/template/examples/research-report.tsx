/*
 * Composition reference only: this file is typechecked but is not a route.
 * It shows the research/analysis archetype: findings lead, facts sit beside
 * them, and charts appear only where numeric evidence exists. Sources stay
 * in the task result, never on the page. Copy the structure that fits the
 * question; replace every value and label with verified data.
 */
import { Callout } from '@/components/portal/callout';
import { CategoryBarChart } from '@/components/portal/category-bar-chart';
import { ChartCard } from '@/components/portal/chart-card';
import { DashboardSection } from '@/components/portal/dashboard-section';
import { FactList } from '@/components/portal/fact-list';
import { KeyFindings } from '@/components/portal/key-findings';
import { DrilldownCard } from '@/components/portal/drilldown-card';
import { PageShell } from '@/components/portal/page-shell';
import { ProportionDonut } from '@/components/portal/proportion-donut';
import { ReportFigure } from '@/components/portal/report-figure';
import { SectionNav } from '@/components/portal/section-nav';
import { StatGroup } from '@/components/portal/stat-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Header nav carries the report's important internal pages — here, the two
// competitor drill-downs — not an anchor for every section.
const navItems = [
  { href: '/competitive-landscape-meridian', label: 'Meridian deep dive' },
  { href: '/competitive-landscape-northwind', label: 'Northwind deep dive' },
];

const shareOfVoice = [
  { label: 'Meridian Analytics', value: 34 },
  { label: 'Northwind BI', value: 27 },
  { label: 'Acme (us)', value: 18 },
  { label: 'Cobalt Metrics', value: 12 },
  { label: 'Smaller vendors', value: 9 },
];

const trafficMix = [
  { label: 'Organic search', value: 41200 },
  { label: 'Direct', value: 18300 },
  { label: 'Referral', value: 9600 },
  { label: 'Paid', value: 6100 },
  { label: 'Other', value: 2400 },
];

const channelBySegment = [
  { label: 'Enterprise', value: 46, comparison: 31 },
  { label: 'Mid-market', value: 33, comparison: 42 },
  { label: 'Small business', value: 21, comparison: 27 },
];

export function ResearchReportExample() {
  return (
    <PageShell
      eyebrow="Competitive research"
      title="Meridian owns the category conversation; our wedge is practitioner content"
      description="Meridian and Northwind dominate paid and analyst visibility, but both underserve hands-on evaluators. The fastest gain is organic content aimed at practitioners comparing tools."
      source="Public web research and traffic estimates"
      dataWindow="Collected 20–24 Jul 2026"
      nav={<SectionNav items={navItems} />}
    >
      <DashboardSection
        id="findings"
        eyebrow="What we learned"
        title="Four findings that should change the plan"
        contentClassName="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)]"
      >
        <KeyFindings
          findings={[
            {
              title:
                'Meridian holds a third of category share of voice, built on analyst coverage',
              detail:
                'Its lead concentrates in gated analyst content, which practitioner evaluators rarely read. Head-to-head paid bidding against it would be expensive and indirect.',
              tag: 'Threat',
              tone: 'negative',
            },
            {
              title:
                'Comparison-intent searches are growing and nobody answers them well',
              detail:
                'The top comparison queries return outdated third-party listicles. A maintained, honest comparison hub is an open position none of the four vendors occupies.',
              tag: 'Opportunity',
              tone: 'positive',
            },
            {
              title:
                'Northwind wins mid-market on onboarding speed, not features',
              detail:
                'Review-site praise clusters on time-to-first-dashboard. Feature-led messaging will not move that segment; proof-of-speed content might.',
              tag: 'Insight',
            },
            {
              title:
                'Cobalt is retreating upmarket, leaving small-business intent unserved',
              detail:
                'Its pricing page dropped the entry tier in June. Their abandoned segment matches our self-serve motion.',
              tag: 'Opportunity',
              tone: 'positive',
            },
          ]}
        />
        <Card className="self-start">
          <CardHeader>
            <CardTitle className="text-base">Category snapshot</CardTitle>
          </CardHeader>
          <CardContent>
            <FactList
              facts={[
                { label: 'Vendors tracked', value: '4 primary, 11 minor' },
                { label: 'Category', value: 'Self-serve BI and analytics' },
                { label: 'Est. market size', value: '$4.2b, growing ~11%/yr' },
                { label: 'Our position', value: '#3 by share of voice' },
                { label: 'Review rating', value: '4.6 vs 4.3 category median' },
              ]}
            />
          </CardContent>
        </Card>
      </DashboardSection>

      <DashboardSection
        id="market"
        eyebrow="Market context"
        title="Demand is shifting to comparison and migration intent"
      >
        <div className="space-y-6">
          <StatGroup
            items={[
              {
                label: 'Comparison searches',
                value: '+38%',
                detail: 'Year over year, category-wide',
              },
              {
                label: 'Our organic share',
                value: '11%',
                detail: 'Of tracked category queries',
              },
              {
                label: 'Migration mentions',
                value: '3×',
                detail: 'Growth in community threads since Jan',
              },
              {
                label: 'Analyst mentions',
                value: '2 of 9',
                detail: 'Reports that include us',
              },
            ]}
          />
          <Callout intent="warning" title="Traffic figures are estimates">
            Third-party traffic estimates carry wide error bars for the two
            smaller vendors; treat gaps under ten points as parity, not as a
            ranking.
          </Callout>
          {/* Concept visuals come from the images skill; `src` must be a
              hosted URL a platform image recipe returned. Never render data
              as an image — charts and tables stay code. */}
          <ReportFigure
            src="https://static.kite.ai/app/example/market-positioning-map.png"
            alt="Positioning map: four BI vendors placed by analyst visibility versus practitioner appeal, with the open practitioner-content quadrant highlighted"
            caption="Where the four vendors sit today — the practitioner quadrant is unclaimed."
          />
        </div>
      </DashboardSection>

      <DashboardSection
        id="competition"
        eyebrow="Competitive position"
        title="Two vendors hold the visibility; neither holds the evaluators"
        contentClassName="grid gap-5 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
      >
        <ChartCard
          title="Meridian leads share of voice, but its lead is analyst-driven"
          description="Share of tracked category mentions across analyst, review, and community sources."
          source="Public web research"
          dataWindow="Jul 2026"
        >
          <CategoryBarChart
            data={shareOfVoice}
            valueLabel="Share of voice"
            valueFormat="percent"
            horizontal
          />
        </ChartCard>
        <ChartCard
          title="Organic search brings four times what paid brings"
          description="Estimated monthly visits to the four primary vendors, by channel."
          source="Traffic estimates"
          dataWindow="Jun 2026"
        >
          <ProportionDonut data={trafficMix} totalLabel="Est. monthly visits" />
        </ChartCard>
      </DashboardSection>

      <DashboardSection
        id="channels"
        eyebrow="Where to compete"
        title="Enterprise attention is on analysts; ours converts through search"
        description="The same question sliced two ways; each tab is a complete view."
      >
        <Tabs defaultValue="us">
          <TabsList>
            <TabsTrigger value="us">Our channel mix</TabsTrigger>
            <TabsTrigger value="meridian">Meridian's channel mix</TabsTrigger>
          </TabsList>
          <TabsContent value="us">
            <CategoryBarChart
              data={channelBySegment}
              valueLabel="Our share %"
              comparisonLabel="Category average %"
              valueFormat="percent"
            />
          </TabsContent>
          <TabsContent value="meridian">
            <CategoryBarChart
              data={channelBySegment.map((row) => ({
                label: row.label,
                value: row.comparison ?? 0,
                comparison: row.value,
              }))}
              valueLabel="Meridian share %"
              comparisonLabel="Our share %"
              valueFormat="percent"
            />
          </TabsContent>
        </Tabs>
      </DashboardSection>

      <DashboardSection
        id="go-deeper"
        eyebrow="Go deeper"
        title="Per-competitor drill-downs"
        description="Each detail page answers one competitor question and links back here. Every href must be a registered portal route."
        contentClassName="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        <DrilldownCard
          href="/competitive-landscape-meridian"
          eyebrow="Deep dive"
          title="Meridian: where its visibility does and does not convert"
          description="Analyst positioning, pricing moves, and the practitioner gap."
          stat="34% share of voice"
        />
        <DrilldownCard
          href="/competitive-landscape-northwind"
          eyebrow="Deep dive"
          title="Northwind: the onboarding-speed story"
          description="What reviewers praise, and the proof points we need to match."
          stat="27% share of voice"
        />
      </DashboardSection>
    </PageShell>
  );
}
