# Platform tool inventory — owning skills and direct-call guidance

One entry per `native:*` family: who owns it, and how to pick within it.

- `native:research-*` — web search, page extract and scrape, brand tokens, page imagery (Firecrawl-backed) — owned by `web-research` (`kite-research` CLI).
- `native:images-*` — image generation, editing, background removal — owned by `images`.
- `native:dashboard-*` — legacy-page recovery and viewer-auth setup for the shared Next.js reports portal — owned by `dashboard-building` (`kite-dashboards` CLI). Portal source persists and auto-publishes through `kite-projects submit`.
- `native:slack-*`, `native:github-api-request`, `native:integrations-*` — the `kite-slack` (`references/slack.md`), `kite-github` (`references/github.md`), and `kite-integrations` (SKILL.md) recipes.
- `native:email-send` — send email as the team's own address; recipes live in the email skills when you hold them, otherwise `describe` → `execute` it directly.
- `native:crustdata-fetch-linkedin-profile` / `-posts` — a person's or company's public LinkedIn profile / recent original posts, given a LinkedIn URL. No owning skill; call directly.
- `native:ads-*` — which ads a brand is running, with copy, transcript, media, and landing page. Resolve the advertiser first (`native:ads-find-brands-by-domain` when you know their website, `native:ads-search-brands` when you only have a name), then pull creative with `native:ads-get-brand-ads`; use `native:ads-search-ads` only when studying angles across advertisers rather than one brand. No owning skill; call directly. Brand-resolution calls need only a handful of candidates; a creative-pattern read needs a representative sample, and an exhaustive population ask needs every page. These tools name the capability, not a vendor — the platform picks the provider, and a request filtered to a platform no provider covers says so in the response's `notes` rather than returning a quietly narrower answer.
- `native:brandfetch-brand` / `native:context-dev-company` / `native:pagespeed-audit` / `native:siftly-brand-research` — structured company data from platform datasources (brand identity, product catalog + site shape, Lighthouse scores, competitors/AEO) — owned by `company-deep-dive`.
- `native:printify-*` — team-scoped artwork, product, publishing, ordering, and blueprint operations — use `references/printify.md`.
- Dynamic **catalog** integrations — their tools are a `native:<integration>-list-tools` / `native:<integration>-call-tool` pair; see **Catalogs** in SKILL.md.
