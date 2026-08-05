import Link from 'next/link';
import { CalendarRange, ChevronLeft, Database } from 'lucide-react';

import { BrandLogo } from '@/components/portal/brand-logo';
import { cn } from '@/lib/utils';

/*
 * One sticky header carries the whole navigation hierarchy: the brand mark
 * (always the way back to the portal index), an optional back crumb for
 * drill-down pages, and the page's section pills. Nothing else stacks
 * another bar on top of the content.
 */
export function PageShell({
  eyebrow,
  title,
  description,
  source,
  dataWindow,
  actions,
  nav,
  backHref,
  backLabel = 'Back',
  className,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  source?: string;
  dataWindow?: string;
  actions?: React.ReactNode;
  nav?: React.ReactNode;
  backHref?: string;
  backLabel?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#dashboard-content"
        className="sr-only z-50 rounded-md bg-card px-4 py-2 text-sm font-medium shadow-lg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to dashboard content
      </a>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex min-h-14 w-full items-center gap-4 px-4 sm:px-6 lg:px-10">
          <div className="flex shrink-0 items-center gap-3">
            <Link href="/" aria-label="Portal home">
              <BrandLogo />
            </Link>
            {backHref ? (
              <Link
                href={backHref}
                className="flex items-center gap-0.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ChevronLeft className="size-4" aria-hidden="true" />
                {backLabel}
              </Link>
            ) : null}
          </div>
          {nav ? (
            <div className="flex min-w-0 flex-1 items-center justify-end">
              {nav}
            </div>
          ) : null}
        </div>
      </header>
      <main
        id="dashboard-content"
        className={cn('w-full pb-7 sm:pb-9 lg:pb-10', className)}
      >
        {/* The hero band carries the brand: an accent wash under the title
            with a primary keyline, so every page opens in the company's
            palette rather than on a bare white block. */}
        <div className="w-full border-t-2 border-t-primary bg-gradient-to-b from-accent/60 via-accent/25 to-transparent px-4 pb-10 pt-7 sm:px-6 sm:pt-9 lg:px-10 lg:pt-10">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="min-w-0">
              {eyebrow ? (
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  {eyebrow}
                </p>
              ) : null}
              <h1 className="max-w-[24ch] text-3xl font-semibold tracking-[-0.025em] text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
                {title}
              </h1>
              {description ? (
                <p className="mt-4 max-w-[70ch] text-base leading-7 text-muted-foreground">
                  {description}
                </p>
              ) : null}
              {source || dataWindow ? (
                <dl className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                  {source ? (
                    <div className="flex min-w-0 items-center gap-2">
                      <Database
                        className="size-4 shrink-0"
                        aria-hidden="true"
                      />
                      <dt className="sr-only">Source</dt>
                      <dd className="break-words">{source}</dd>
                    </div>
                  ) : null}
                  {dataWindow ? (
                    <div className="flex min-w-0 items-center gap-2">
                      <CalendarRange
                        className="size-4 shrink-0"
                        aria-hidden="true"
                      />
                      <dt className="sr-only">Data window</dt>
                      <dd className="break-words">{dataWindow}</dd>
                    </div>
                  ) : null}
                </dl>
              ) : null}
            </div>
            {actions ? (
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                {actions}
              </div>
            ) : null}
          </div>
        </div>
        <div className="space-y-10 px-4 sm:px-6 lg:px-10">{children}</div>
      </main>
    </div>
  );
}
