---
name: tool-discovery-execution
description: >
  Use this skill to discover which integrations the team can reach and to
  run tools through them — whenever a task needs data or an action from a
  named platform or app or its objects (communities, posts, profiles, jobs),
  a connected app, structured provider-backed data, a question only team
  data can answer, a private app link, or an exhaustive list or ranking
  behind a public interface — or the user asks what integrations exist.
  Always load it for a platform-specific task even when data is public:
  "find active subreddits", "export all reviews", "what ads is
  competitor.com running", sending a message, creating an issue, adding a
  sheet row. Also load it when another skill needs an integration-backed
  step — it supplies discovery and invocation; that skill keeps the
  deliverable. For generic narrative web research that names no platform and
  needs representative examples rather than exhaustive coverage, use
  web-research; for a public website supplied as a design reference, use
  website-design-content-extraction.
mode: sandbox
notification_title: "Using integrations"
agent_policies:
  orchestrator: orchestrator-policy.md
---

# tool-discovery-execution

Use the `kite-integrations` CLI (via the `bash` tool) to call the tool gateway. The gateway is team-scoped: it exposes the team's connected integrations plus the platform integrations. The CLI resolves the scope (`$TEAM_ID` if set, otherwise `$APPLICATION_ID`), token, and URL from the env — you never handle auth or identifiers yourself. In a sandbox without `kite-integrations` on PATH (e.g. the website orchestrator's), read `references/raw-endpoint-fallback.md` and hand-build the same requests.

Success means the user's request is fulfilled: the needed data is retrieved, the requested action runs on the target system, or the question is answered from available tools. After resolving access as described below, workflow on the chosen integration path is always **search → describe → execute**:

1. `search` — find what's available (connected integrations, platform integrations, matching tools).
2. `describe` — get a tool's input schema. Run this before the first execution of any tool. Use only parameter names that appear verbatim in `input_schema` or `configurable_props`; do not infer, abbreviate, or substitute similar-sounding names.
3. `execute` — run it.

For a multi-step request, first state a checklist with one item per external action, naming its app/tool and what it supplies to the next step; mark each item complete as you execute it.

## Integrations and tools — the vocabulary this skill uses

An **integration** is a provider — Mixpanel, Notion, Reddit. A **tool** is one function an integration exposes — read a report, run a query, create a page. Integration access comes in two kinds, and a brand can expose both when its public-data and account-action routes differ. Every tool name carries its kind and integration:

- **Connected integrations** — the team authenticated them, so their tools act on the *team's own account and data*. They appear in `connected_apps`, and their tools are named `composio:<tool_slug>` for integrations served by the default broker, `pipedream:<component_key>` for configured overrides such as `linkedin_ads`, or `mcp:<server_slug>/<tool>`. Broker routing is per integration, not per team; always use the names returned by `search`.
- **Platform integrations** — served through Kite-owned adapters. Most need no user authentication; a few are team-connected through a Kite first-party install (their recipes say so). They appear in `platform_integrations`, and their tools are named `native:<integration>-<tool>`. Each `tools[]` entry's `app` field names its integration.

Native tools listed with an `endpoint` (e.g. image generation) are the same tools documented in their own skills — prefer those skills' recipes; this gateway lists them for discovery.

## Choose tools for the task — connected, then platform, then connect offer, then the open web

Understand the task before picking any tool: list the data and actions it needs. A real task often needs **several tools across several integrations** — a connected CRM may hold the contacts while a platform integration supplies the enrichment and a not-yet-connected ads account holds the spend data. Read each integration's description (`connected_apps`, `platform_integrations`, and `tools[].description`) and map every need to the integration that actually provides it — never to the brand you find familiar.

Then, for **each** need, pick in this order:

1. **A connected integration whose tools cover it.** The team connected it because their data and configuration live there — use it even when a platform integration overlaps the same capability.
2. **A platform integration.** Kite already serves it and it costs the user nothing — use it rather than asking the user to connect an equivalent.
3. **A connectable integration the team hasn't connected.** Only for needs the first two can't serve: follow **Recipe: connect an unconnected integration** — do the parts you can already do, and offer the connect for the rest.
4. **Generic web search** (`native:research-*`, the `web-research` skill). Only for needs no integration serves — none connected, none platform, none connectable (or the user declined the connect). Label what it returns as secondary evidence, and never use it to read a platform's own pages.
5. **A browser session.** The last resort, when search can't reach the data either — never a way around the rungs above for a service an integration already serves.

A public URL does not by itself make the task public-web research. When the requested outcome requires enumerating an underlying population, exhausting pages, or ranking structured records hidden behind an interface, use this ladder before a browser fallback. One blocked or empty page does not establish that the dataset is unavailable.

Cover the whole task, not just the first need you can serve: run the connected and platform parts now, and batch **every** missing connection into one message (see the multi-step-flow rule in the connect recipe) — never discover gaps one turn at a time.

**A platform-specific task is served by that platform's integrations.** When the task names a platform or its objects (its communities, posts, profiles, or jobs), map every need for that platform's data to integrations of that platform and walk the same ladder: its connected integration first, then its platform integration. Web search sits on rung 4, behind the named platform's own tools — reach for its search and synthesis commands only for needs no platform-specific tool covers (never to read the platform's own pages), and label what it returns as secondary evidence. When a platform tool fails (a `503 gateway_not_configured`, a catalog with no suitable endpoint), fall to the next rung or offer the connect — never to unauthenticated fetches of the platform's own pages, which get rate-limited and blocked and verify nothing.

**The gateway, not this skill, decides which route a brand takes.** The integration catalog changes continuously, so never assume from memory that a brand is connectable, platform-served, or both — read it from the responses. A bare `search` shows the current truth: an integration in `connected_apps` is rung 1, one in `platform_integrations` is rung 2, and `catalog-search` says whether it is connectable (rung 3). A brand that appears in `platform_integrations` but not in `catalog-search` is served natively and nowhere else: use its `native:*` tools, and do not offer a connect or go looking for a `composio:*`/`pipedream:*` copy of it. A few platform integrations are team-connected through a Kite first-party install instead of a broker link; their recipes say what to do when a `409 provider_not_connected` comes back.

**Platform tools never act as the user's account.** A brand can sit on rung 1 and rung 2 at once — platform tools serving its public data while a connectable integration serves account actions. When the request needs the user's own account on a service (publishing, replying, private data), walk the ladder for its connectable integration. A service is not "already connected" merely because platform tools cover its public side, and it is not "unconnectable" merely because the platform tools answered the read.

A question only the team's data can answer ("why isn't my website converting?", "how are we ranking?") is a tool request with no integration named. Decide what data answers it, then apply the same ladder: answer from connected integrations and platform integrations first, and when a needed source lives in an unconnected account (their analytics, ads, CRM), follow **Recipe: connect an unconnected integration** — report what you can already see and what the connection adds, rather than answering from general knowledge alone.

**Slack and GitHub are native, not brokered — they never appear in `connected_apps`.** To post to Slack use the `kite-slack` CLI (read `references/slack.md` for sending, channel access, and reply modes); don't search for `composio:slack*` or `pipedream:slack*` tools. For GitHub account and API actions use `native:github-api-request` via the `kite-github` CLI (read `references/github.md` for the call grammar and what to tell the user for each `409` connection state — `provider_not_connected` means install the App via connect, `already_connected` means proceed without offering a button, `connection_pending` means an org admin must approve); don't search for `composio:github*` or `pipedream:github*` tools.

## Resolve access first — don't make the user choose the method

`resolve` applies the ladder above to one named service. Whenever a task needs to reach an external service — log into a site, pull data from it, post to it — **start by resolving how to reach it, then act in the same turn.** Do not ask the user "should I use the integration or the browser?" or wait to be told to check a login; decide from what's already available.

```bash
kite-integrations resolve x.com        # a domain…
kite-integrations resolve notion       # …or an app name
```

It returns `recommendation` plus a `next` field with the exact command to run. Act on it, best path first:

| `recommendation`          | What it means → what you do |
| ------------------------- | --------------------------- |
| `use_integration`         | The app is already connected. Go straight to `search`/`describe`/`execute` — no browser, no connect link. |
| `use_native_tools`        | Kite already serves this brand natively — no login or connect needed. Go straight to `search`/`describe`/`execute` on the `native:<slug>-*` tool named in `next`; do **not** open a browser session for it. For a write or account action the read-focused native tools don't cover, fall through to a saved login or the brand's connect offer. |
| `use_browser_login`       | A saved browser login exists for this service. Use the **browser-session** skill with `--profile <label>` — it's already logged in; do **not** ask the user to log in again unless it has expired. |
| `offer_integration_connect` | Not connected, not served natively, and no saved login, but the integration catalog supports the app. Follow **Recipe: connect an unconnected integration** — mint the link, hand back one `<connect-cta>`. |
| `offer_mcp`               | A custom/platform MCP server can serve it. `kite-integrations connect <slug>` and hand back the `<connect-cta>` (or tell the user they can add a custom MCP server in Integrations). |
| `offer_browser`           | Nothing native and no saved login. Offer a **browser-session** handoff (the browser-session skill), or a custom MCP if the service has one. |

The order is deliberate: a connected integration beats everything — the team's own account holds their data and configuration. A brand Kite serves natively comes next: zero setup, platform-keyed, more robust than driving a browser session — but read-focused, so for a write or account action it doesn't cover, fall through to a saved login or the brand's connect offer. A **saved** browser login beats asking the user to connect a fresh integration (zero friction), and only when nothing is ready do you offer — the integration catalog first, then a custom MCP. The browser is the last resort. Resolve is read-only: it recommends, you run the follow-up command it names. If `resolve` isn't on PATH (an app/website sandbox with no `TEAM_ID`), fall back to the manual sequence: bare `search` (connected? served natively?) → `kite-browser profiles` (saved login?) → `catalog-search`/`connect` or a browser handoff.

**One instruction outranks the ladder: explicitly-directed login setup.** When your task or delegation instructions themselves direct setting up a browser login handoff for a named profile (e.g. a workflow's `workflow-<id>` profile), follow the browser-session skill's "delegated login-setup" rule — it owns that case end to end. The ladder still governs *reading that platform's data*.

## Gotchas

- **Always source app slugs from `connected_apps`.** Copy `connected_apps[].name_slug` verbatim; never substitute a brand name. Slugs may be version-suffixed, and connections are granular (`google_sheets`, `google_drive`, and `google_docs` are distinct). Use the returned slug unchanged in `app` and tool names.
- **Quote the params JSON in single quotes.** The params argument is one JSON object string (`'{"title": "…"}'`); double-quoting it invites shell expansion inside the JSON.
- **Search with one word at a time.** Use the most specific noun first (e.g. `message`, not `send message`); provider search may AND multi-word queries. If that returns nothing, try one related or broader noun.
- **Pass default `timeout: 120000` to bash for `execute`.** If provider documentation gives a longer expected duration, use twice that duration in milliseconds (a documented 5-minute action gets `600000`). If it times out, surface the timeout error instead of retrying blindly.
- **Results are real side effects — never re-run a succeeded action.** A successful write (a `kite-slack send`, a `kite-github api POST …`, or a `composio:*`/`pipedream:*` create) really changes data. Do not re-run it to verify or retry it.
- **Validate parsed responses before acting.** Required fields must be present, success responses must have the documented status/result shape, and errors must carry the documented `detail.code` and `detail.message`. Treat a missing `detail.retryable` as `false`. Surface malformed responses instead of acting on partial data.
- **Reduce large results in the sandbox before they reach you.** Whatever your `bash` command prints to stdout enters your context. Project with `jq` (or `python3`), push filters to the provider, and use `per_page` ≤ 30 so pages stay below 50 KB. If a response still exceeds 50 KB, project fewer fields before printing it; truncated output is not valid JSON.

## Search

List connected integrations, platform integrations, and matching tools. **Always start with a bare request** (no `query`, no `app`) — it returns `connected_apps` (the connected integrations, and the source of the valid `app` slugs) plus `platform_integrations` and every platform tool, so one call shows everything rungs 1 and 2 of the ladder can use. If `connected_apps` is empty, the team has not connected any third-party integrations. When the integration the user needs is in neither list, do **not** stop at "it's not connected" — follow **Recipe: connect an unconnected integration** below to hand the user a connect link.

```bash
kite-integrations search                 # bare — the full rung-1/rung-2 picture
kite-integrations search "page" notion   # then scope: keyword + exact connected-app slug
```

- `query` — optional keyword (1st arg); searches tool names and descriptions.
- `app` — optional connected-app slug (2nd arg), copied verbatim from `connected_apps[].name_slug`. Omitting both skips per-app action search.

Response shape (values illustrative):

```json
{"team_id": "…",
 "connected_apps": [{"name_slug": "notion", "name": "team-workspace", "account_id": "apn_…", "healthy": true}],
 "platform_integrations": [{"name_slug": "reddit", "name": "Reddit", "description": "Reddit posts, comments, communities, search, and user activity."}],
 "tools": [{"name": "composio:NOTION_CREATE_PAGE", "provider": "composio", "app": "notion", "description": "Create a page", "connected": true, "invocation": "gateway", "endpoint": null}]}
```

## Describe, then execute

```bash
kite-integrations describe composio:NOTION_CREATE_PAGE
kite-integrations execute composio:NOTION_CREATE_PAGE '{"parent_page_id": "…", "title": "Weekly update"}'
```

Both take `tool_name` exactly as it appeared in a search result's `tools[].name` — do not retype, change case, or "correct" it. Reading a `describe` result: for `composio:*` tools, `input_schema` is the tool's JSON input schema. For `pipedream:*` tools, `input_schema.configurable_props` lists the params: `name` is the key to send, `optional: true`/`default` means skippable, everything else is required. Props with `remoteOptions: true` accept raw values (e.g. a channel name like `#general`) — there is no option-picker here. For `native:*` tools it's a standard JSON schema.

`execute`'s `params` is a JSON object string (2nd arg, optional when the tool takes none). Params above ~100 KB (e.g. base64 artwork) exceed the shell's per-argument limit — write the JSON object to a file and pass `@` plus the path instead: `kite-integrations execute native:printify-upload-artwork @/tmp/artwork-params.json`.

## Raw-endpoint fallback (no `kite-integrations` on PATH)

Read `references/raw-endpoint-fallback.md`: the CLI wraps three POST endpoints (`search`/`describe`/`execute`) you can call with `curl` — that file carries the auth headers, the scope rules, the heredoc quoting trap, and where each provider nests its result.

## Platform integrations

`native:*` tools are the platform integrations' tools: they run through Kite-owned adapters and never get a broker connect link. Most are always available; Slack and GitHub require their first-party team installs. Their place in the ladder: when no relevant connected integration covers the need, use the platform integration rather than asking the user to connect an equivalent — a relevant **connected** integration still comes first, because the team's own account holds their data and configuration. Ask the user to connect only for data or actions that live in the team's own account (their analytics, their CRM records, their docs). The bare search lists them all; `describe` → `execute` them like any other tool.

Most native tools belong to an owning skill or CLI — when you hold the owner, use its recipes instead of raw `execute`. `native:ads-*` is metered per ad returned: resolve the advertiser first, then request the smallest page that answers the question and paginate when it turns out you need more. Read `references/platform-tools.md` before choosing tools from a `native:*` family, unless you already hold that family's owning skill and are using its recipes — it is the per-family inventory of which skill owns each family, which families have no owner and so are called directly, and the selection order within a family. `describe` gives you a schema; it does not tell you that a sibling skill owns the family or which of several entry points fits the ask. Vendor recipes live beside it: `references/slack.md`, `references/github.md`, `references/printify.md`.

**Catalogs.** A catalog integration keeps its evolving endpoint set behind `list-tools` instead of listing fixed tools. The bare `search` shows which platform integrations work this way (their `tools[]` are the `list-tools`/`call-tool` pair) and what each covers (`platform_integrations[].description`) — read coverage from those descriptions, not from memory.

Catalog ownership is capability-first. When a task names a platform covered by its own catalog, keep discovery and execution on that platform's `list-tools`/`call-tool` pair even when the returned endpoint is supplied by another provider. Provider catalogs serve endpoints that have no named-platform owner.

Never guess catalog tool names or input fields. First execute `native:<catalog>-list-tools` with a focused 2–4 word noun phrase in `"query"`, then copy one returned `tools[].name` and read its `input_schema` and `price`. Calling `list-tools` is discovery, not task execution: when it returns a suitable endpoint with a non-empty schema, execute `native:<catalog>-call-tool` with that exact name and the endpoint arguments **nested** in `params` before considering a fallback. An absent or empty `input_schema` makes the endpoint unavailable; surface the provider failure instead of inferring fields from validation errors. The response may also carry an `unavailable` list — endpoints the provider is not serving usable metadata for right now, each with its cause. Work with the returned `tools`, and when the gap could affect the ask, say what was unavailable rather than treating the list as complete.

If discovery has no suitable match, refine the query once, then follow the remaining integration ladder instead of forcing a mismatched endpoint. For named-platform data, the fallback is secondary web search and synthesis followed by the connect path or an explicit unsupported-data gap. It is never `webfetch`, scrape, or a local, cloud, or stealth browser visit to the platform's own pages.

Call shape: `kite-integrations execute native:<catalog>-call-tool '{"tool_name": "<name from list-tools>", "params": { … }}'`.

Two rules bind every catalog run:

- **Population-wide asks are exhaustive.** A requested output count is not a coverage limit — "top 10" means rank the whole population and return 10, not fetch 10 and rank those. For "top", "highest", or "all", establish the population size and continue until every relevant record is covered, validating record type and removing duplicates before ranking. A sample is complete only when the user explicitly asked for a sample; otherwise report observed vs. total and mark the request incomplete.
- **Metering is Kite-internal.** Keep prices, per-call charges, and accumulated spend out of every user-facing message, report, and deliverable; use `price` only to choose between endpoints.

A catalog run may return `status: "RUNNING"` with a `runId` after bounded polling. Resume that same paid run by calling the same `native:<catalog>-call-tool` with the same `tool_name`, empty `params`, and `"run_id": "<runId>"` — preserved exactly, because re-calling without it starts a second run and charges again. Prefer the least expensive endpoint that answers the question, and request the smallest result count that answers it: a spot check needs one page, a population-wide ask needs every page.

## Recipe: connect an unconnected integration

When the app the user needs is not connected, give them a connect link instead of stopping — and tell them you will resume their request automatically once they connect. The `kite-integrations` CLI drives this: it calls the tool gateway for you, so you pass only the app — no token, URL, or thread id.

When the user named the job but not the app ("email the list", "log this in our CRM") and no connected app covers it, first ask which tool the team uses for that job — name two or three common options — then connect the tool they actually use, not the one you assumed.

**Multi-step flows: collect every gap before asking.** When the request is a flow spanning several apps, list every app the whole flow needs against `connected_apps` **before starting any step** — do not discover gaps one at a time and make the user authenticate over several turns. Resolve any named-job-but-not-app steps first (ask which tool, as above), then run `resolve` once and the resulting connect command once for **each** missing app. Hand all links back in one message: a single opening sentence naming the flow, then a single `<connect-cta>` block whose body is a JSON **array** of `{"app", "ref", "reason"}` objects. When the flow resumes after a connect, re-check `connected_apps` and re-offer only the apps still missing.

**App absent from `connected_apps`:**

1. Use the `resolve` result already obtained from the routing table above. When its recommendation is `offer_mcp` or `offer_integration_connect`, run the exact `kite-integrations connect <slug>` command in `next`. The `offer_mcp` route is how an unconnected platform OAuth MCP remains connectable even though it is absent from the broker catalog and `connected_apps`. For every other recommendation, follow the resolve table instead of forcing a connect. If the connect command fails (non-zero exit or an `error` field — e.g. a network blip), surface that error to the user.

2. Hand back the connect link. The connect command prints `{ "app", "provider", "connect_url", "connect_ref" }`. End your final message with a single `<connect-cta>` block carrying the `connect_ref` — **not** the URL — the platform renders it as a **Connect** button on Slack and a bulleted link on the web. Keep the text before the block to one short sentence naming the flow — do not paste raw URLs or restate each app's reason in prose — then end the turn:

```
Notion isn't connected yet. Connect it below and I'll pick your request back up automatically once you're done.

<connect-cta>
{"app": "Notion", "ref": "<connect_ref>"}
</connect-cta>
```

For a flow needing several apps, the body is a JSON array (one entry per app, max 5): `[{"app": "PostHog", "ref": "<connect_ref>", "reason": "to pull your traffic numbers"}, …]`. Every surface renders each `reason` next to its app (web: inline on the bullet; Slack: beneath the buttons), so a one-line opener is enough.

- `app` — the app's display name (the button reads "Connect <app>"); use the matched app's `name` from the `resolve` result, not its `name_slug` or the connect response's slug-valued `app`.
- `reason` — optional, a few words on what that app is for (not a full sentence); set it whenever the flow needs two or more apps so each bullet is self-explanatory. Skip it for a single-app CTA whose preceding sentence already says why.
- Run `resolve` and `connect` **before** composing your reply, and write that reply **once** — mint silently (or with one short status line), then one complete reply ending in the block. Announcing the link first, then minting, then re-writing sends the user two near-identical messages.
- `ref` — the `connect_ref` from the CLI for that app; one `kite-integrations connect` call per app. It is a short hex handle the platform swaps back for the real URL, so the link cannot be corrupted in transit. Never put a `connect_url` in the block and never write a connect URL into your prose. On the rare run where `connect_ref` comes back `null`, fall back to `"url": "<connect_url>"` for that entry, copied verbatim.
- Emit **at most one** `<connect-cta>` block, with a valid JSON body, and make it the **last thing** in the message. The block is only for handing back connect links — never for a working link.
- After emitting it, **end your turn**. The CLI already wired your conversation to the connect, so a new turn fires on its own once the user connects; you do not poll or wait. If the user instead replies again without connecting (so no resume has fired), re-offer the same link with a fresh `<connect-cta>` block — don't assume they connected, and don't mint a second link if the first is still valid.

**MCP server awaiting OAuth.** A configured MCP server appears in `connected_apps`, but `describe`/`execute` returns `409` with `detail.code: "provider_not_connected"` and a `detail.message` saying the server needs OAuth authorization. That specific 409 (an MCP slug that is already in `connected_apps`) is the trigger — distinct from a 409 for an app that simply isn't connected. Run `kite-integrations connect <slug>` with that server's slug to mint its authorization link, and hand it back the same way — one line of context plus a closing `<connect-cta>` block.

**Slack is the one native connect case with no mintable link.** Point the user to the first-party UI in prose (no `<connect-cta>`) and do not pass `slack` to `kite-integrations connect` — install Slack from **Integrations** or **Team settings**. GitHub, though also native, mints its first-party App install link through the normal connect recipe: `kite-integrations connect github`, then hand back the `<connect-cta>`.

## Errors

Every non-2xx response carries `detail: { code, message, retryable }`:

| HTTP | code                     | What to do                                                                                                                                                                                                                                                                                 |
| ---- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 401  | —                        | `INTERNAL_API_TOKEN` missing or wrong. Check the env, stop.                                                                                                                                                                                                                                |
| 403  | —                        | Team-scoped call missing/invalid `X-Sandbox-Session-Token`, or the `team_id` isn't your session's team. Send the `-H "X-Sandbox-Session-Token: $KITE_SANDBOX_TOKEN"` header with the `$TEAM_ID` from your env — don't substitute another team's id. Stop.                                     |
| 404  | `application_not_found`  | Bad `$APPLICATION_ID`. Stop.                                                                                                                                                                                                                                                               |
| 404  | `team_not_found`         | Bad `$TEAM_ID`. Stop.                                                                                                                                                                                                                                                                       |
| 422  | `missing_identifier` (or a schema validation error) | The scope env is broken (neither or both of `$TEAM_ID` / `$APPLICATION_ID` reached the gateway). `kite-integrations` sends exactly one from the env; check the env and stop rather than retrying.                                                                                                    |
| 404  | `tool_not_found`         | Unknown tool name — re-run `search`, don't invent names.                                                                                                                                                                                                                                   |
| 409  | `provider_not_connected` | That exact slug isn't connected. **First run a bare `search` and check `connected_apps[].name_slug`** — the app is often connected under a different or version-suffixed slug (e.g. a `<brand>_v2` rather than `<brand>`); if so, retry with that exact slug. If it's genuinely absent, serve the request through a connected app with the same capability (e.g., `google_drive` reads Sheets/Docs files even when `google_sheets` is not connected); otherwise follow **Recipe: connect an unconnected integration** to hand the user a connect link (for an MCP server, this 409 is the trigger to mint its OAuth link). Don't retry the slug you guessed — retry only with a `name_slug` from `connected_apps`. |
| 422  | `invalid_params`         | Params don't match the schema. Re-run `describe` and fix; don't retry blindly.                                                                                                                                                                                                             |
| 429  | `rate_limited`           | Back off and retry once after a pause.                                                                                                                                                                                                                                                     |
| 502  | `provider_error`         | Upstream failure. Retry once **only when `detail.retryable` is true**; a `retryable: false` 502 (e.g. Slack `not_in_channel`/`channel_not_found`) won't change on retry — act on the message instead (e.g. ask the user to invite **@Kite** to the channel).                                  |
| 503  | `gateway_not_configured` | On a `native:*` tool: the platform credential is absent in this environment — do not retry; fall back per your skill's failure handling (see _Platform integrations_). On team-integration work: tell the user "Integrations are not available in this workspace. Contact your administrator." and stop.                                                                                                       |

## Output contract — the integration ran, and here is the evidence

Every use of this skill ends with a verifiable claim, not a bare assertion. Before returning, verify and report:

- **What ran.** Each executed call names its integration and tool. For a multi-step request, every checklist item is marked complete with its app/tool and the data it handed to the next step.
- **Reads:** the needed fields are present in the named tool's result — confirm them, don't assume. When the ask was population-wide, report observed vs. total counts and whether coverage is complete.
- **Writes:** the success status and result shape match `describe` and the documented response. Confirm the result's durable identifier (message `ts`, page id, issue number or URL) as your own evidence the write landed, and give the user the form that means something to them — a permalink, issue number, page URL, or the channel it landed in — rather than the raw id. A succeeded write is final — report it; never re-run it to verify.
- **Failures:** report the `detail.code` and which ladder rung you fell to (or which connect you offered) — never a bare "it didn't work".
- **Connect handoffs:** name the intentionally incomplete items in the context before the single valid-JSON `<connect-cta>` block.
