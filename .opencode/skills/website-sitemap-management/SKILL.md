---
name: website-sitemap-management
description: >
  Use this skill when adding, moving, renaming, or deleting a page or route, or
  adding a redirect — for example "add a pricing page", "move /blog to
  /resources", or "remove this route". Update the sitemap and redirects in the
  same change.
mode: sandbox
---

# The sitemap target

Edit only `src/app/sitemap.ts`. Next.js serves it at `/sitemap.xml`
automatically, so a `public/sitemap.xml` alongside it would be dead code that
drifts — leave the route file as the single source of truth. When a stale
`frontend/public/sitemap.xml` is present from a pre-migration layout, leave it
alone; it is not served.

# Next.js sitemap (`src/app/sitemap.ts`)

## Create the file if it is missing

If `src/app/sitemap.ts` does not exist (older sandbox, partial migration), create it with this canonical shape before editing — it pulls the base URL from the shared helper and ships the homepage entry. If `src/lib/site-url.ts` is also missing, create that too with the contents shown.

```ts
// src/lib/site-url.ts
export function getBaseUrl(): string {
  const vercel =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:4321';
}
```

```ts
// src/app/sitemap.ts
import type { MetadataRoute } from 'next';
import { getBaseUrl } from '../lib/site-url';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];

  return staticRoutes;
}
```

Then continue to the relevant subsection below.

The sitemap is code, so static routes are listed and data-driven routes are mapped from their data source. Both live in the same file.

## Adding a static page

When a new route lives at `src/app/<slug>/page.tsx`, append one entry to the `staticRoutes` array:

```ts
{
  url: `${baseUrl}/<slug>`,
  lastModified,
  changeFrequency: 'monthly',
  priority: 0.8,
}
```

- Use `${baseUrl}/<slug>` — never a hardcoded origin. The `getBaseUrl()` helper resolves the deploy URL at runtime.
- Reuse the shared `lastModified` constant already defined in the file; do not introduce a per-entry literal date.
- `changeFrequency: 'monthly'` and `priority: 0.8` are the defaults for content pages. The homepage stays at `priority: 1.0` and `changeFrequency: 'weekly'`.

## Adding a dynamic route segment

When a new dynamic route lives at `src/app/<segment>/[<param>]/page.tsx` (e.g. `src/app/blog/[slug]/page.tsx`), drive it from its data source instead of listing each entry by hand:

```ts
import posts from '../../public/content/blog.json';

const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
  url: `${baseUrl}/blog/${post.slug}`,
  lastModified: new Date(post.updatedAt ?? post.publishedAt),
  changeFrequency: 'monthly',
  priority: 0.6,
}));

return [...staticRoutes, ...blogRoutes];
```

- Import from the same JSON file the route's `generateStaticParams` reads. One source of truth — adding a blog post to the JSON updates both the route set and the sitemap.
- If the data source has no per-item timestamp, fall back to the shared `lastModified`.
- Concatenate dynamic groups into the returned array; leave `staticRoutes` unchanged.

## Changing a page's URL

Update the matching `url:` value. The shared `lastModified` already reflects "today".

## Deleting a page

Remove the entry, plus any `import` that was the only consumer of its data source.

# Redirects

When adding redirects, also add them to `redirects.csv` (columns: source, destination, statusCode, caseSensitive, preserveQueryParams).
Use only these redirect status codes: `301`, `302`, `307`, `308`.

# Verify

- Only `src/app/sitemap.ts` was edited.
- Every live route appears exactly once and every removed route is absent.
- The sitemap code type-checks.
- Each redirect row has all five columns and an allowed status code.
