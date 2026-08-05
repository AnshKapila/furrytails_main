---
name: website-page-design
description: "Use this skill when starting a new page design or redesign and you need a concrete visual foundation to build from — fetches a real design specification (layout structure, typography, color usage, spacing, and component patterns) based on a short description of what the page is about. Triggers when a newly-sitemapped page has no existing layout, the previous specification is not working and you want a different direction, or the build pipeline needs an inspiration source before generating the page — even when the user just says 'give me a fresh look' or 'try a different layout'. Skip this skill when the site already has pages of the kind being added: a new article on a site that already publishes articles takes its design from those existing pages, and a fresh specification would make it look like a different site."
mode: sandbox
---

# website-page-design

Calls the Kite gallery API to return a visual design specification — layout structure, typography, color usage, spacing, and component patterns — for a website page.

## When to reach for this

- A page redesign is starting and you need a design foundation.
- A newly-sitemapped page has no existing layout and you need inspiration.
- A previous spec isn't working and you want to try a different one.

## When the site answers the question already

A site that already has a page of the kind being added holds the design
foundation on disk. Copy that page's structure, typography, and components
instead of calling this API — a new article on a site with a blog, a second
case study, another comparison page. `website-page-creation` covers how to
find that family and reuse it. A fetched specification here would give the new
page a visual direction the rest of the family does not share.

## Call it

```bash
curl -sS -X POST "$GALLERY_API_URL/api/external/visual-specs" \
  -H "Authorization: Bearer $GALLERY_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"data": ["A photography portfolio homepage"], "quantity": 1}'
```

Replace the `data[0]` string with a short description of what the page is about — this steers category selection server-side.

## Read the response

JSON shape:

```json
{
  "category": { "name": "...", "description": "..." },
  "visual_specs": [
    { "inspiration_website_name": "...", "visual_spec": "<design description>" }
  ]
}
```

Use `visual_specs[0].visual_spec` as the design foundation. `visual_specs[0].inspiration_website_name` identifies the source folder if you need to reference it later.

## Env vars

- `$GALLERY_API_URL` — base URL
- `$GALLERY_API_TOKEN` — bearer token (never log or echo this)
