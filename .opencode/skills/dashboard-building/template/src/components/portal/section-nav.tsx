'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

export type SectionNavItem = {
  label: string;
  /** Route to an important internal page (a drill-down or sibling report). */
  href?: string;
  /** Anchor to a section id — only for a long page that truly needs it. */
  id?: string;
};

/*
 * Header navigation for the pages that matter to this report — drill-downs
 * and sibling pages a reader needs to reach. Renders inside `PageShell`'s
 * single sticky header via its `nav` prop. Most reports need no nav at all;
 * section anchors are the exception for genuinely long pages, not the rule.
 */
export function SectionNav({
  items,
  className,
}: {
  items: SectionNavItem[];
  className?: string;
}) {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string | null>(null);
  const anchorIds = items
    .filter((item) => item.id && !item.href)
    .map((item) => item.id as string);

  useEffect(() => {
    const targets = anchorIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (targets.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-15% 0px -70% 0px' },
    );

    for (const target of targets) {
      observer.observe(target);
    }

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchorIds.join(',')]);

  const pillClass = (isActive: boolean) =>
    cn(
      'inline-flex min-h-9 items-center rounded-full px-3.5 text-sm font-medium transition-colors',
      isActive
        ? 'bg-primary text-primary-foreground'
        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
    );

  return (
    <nav aria-label="Report pages" className={cn('min-w-0', className)}>
      <ul className="flex items-center gap-1 overflow-x-auto py-2">
        {items.map((item) => {
          const key = item.href ?? item.id ?? item.label;

          return (
            <li key={key} className="shrink-0">
              {item.href ? (
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className={pillClass(pathname === item.href)}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={`#${item.id}`}
                  aria-current={item.id === activeId ? 'true' : undefined}
                  className={pillClass(item.id === activeId)}
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
