import Link from 'next/link';
import { ArrowUpRight, LayoutDashboard, ScrollText } from 'lucide-react';

import { BrandLogo } from '@/components/portal/brand-logo';
import { EmptyState } from '@/components/portal/empty-state';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { pageHref, portalPages } from '@/lib/portal';

export function PortalIndex() {
  return (
    <main className="min-h-screen w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-10 lg:py-14">
      <div className="mb-10 flex flex-col gap-6 border-b border-border pb-9 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <BrandLogo className="mb-7 max-h-10 max-w-52" />
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Team intelligence
          </p>
          <h1 className="mt-2 max-w-[24ch] text-3xl font-semibold tracking-[-0.025em] text-balance sm:text-4xl">
            Reports and dashboards
          </h1>
          <p className="mt-3 max-w-[70ch] leading-7 text-muted-foreground">
            Current analysis, operational views, and decision-ready snapshots
            shared by your team.
          </p>
        </div>
        <Badge variant="secondary">
          {portalPages.length} {portalPages.length === 1 ? 'page' : 'pages'}
        </Badge>
      </div>

      {portalPages.length ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {portalPages.map((page) => {
            const Icon =
              page.kind === 'dashboard' ? LayoutDashboard : ScrollText;
            return (
              <Link key={`${page.kind}:${page.slug}`} href={pageHref(page)}>
                <Card className="h-full transition-[border-color,transform,box-shadow] hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                  <CardHeader>
                    <div className="mb-5 flex items-center justify-between">
                      <span className="flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      <ArrowUpRight
                        className="size-4 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </div>
                    <CardTitle>{page.title}</CardTitle>
                    <CardDescription>
                      {page.description ||
                        (page.kind === 'dashboard'
                          ? 'Interactive operational dashboard'
                          : 'Point-in-time report')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="outline">
                      {page.kind}
                      {page.legacy ? ' · legacy' : ''}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No reports yet"
          description="Add a report or dashboard folder containing page.tsx and page.json. It will appear here automatically."
        />
      )}
    </main>
  );
}
