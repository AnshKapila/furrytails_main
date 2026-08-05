---
name: ai-search-visibility
description: "Kite's conversational contract for search and AI-answer visibility (SEO + AEO). Use when a measurement digest lands in the conversation, or when the user asks how their brand shows up in search or AI answers — \"check my site\", \"how do we rank\", \"are we showing up in ChatGPT\", \"check competitor X\", \"how does our industry rank\" — asks what to do to rank better, accepts or rejects a Brand Gap recommendation, confirms brand positioning, asks to track a topic, keyword, or competitor, points tracking at a domain, or asks to stop AEO updates. Covers routing into the measure → diagnose → recommend chain, presenting digests with the hosted report link, the one-time positioning confirmation, recording decisions and routing accepted recommendations by execution lane, handling task blockers, the re-run guard, the tracked lists, set-domain, and opt-out/opt-in."
mode: both
---

# AI search visibility (Kite's side of the loop)

Background agents measure how the team's brand shows up in AI answer engines (ChatGPT, Perplexity, Gemini) and in search, then judge the gaps and produce recommendations; their findings land in the knowledge folder under `aeo/` and on the hosted Brand Gap report. When a task linked to this conversation finishes, its wake message carries a digest with the target site's `application_id`. You have done this right when the user knows where their brand stands, every link and action you reported came from a verified command output, and anything they asked to track or change is confirmed recorded.

Throughout, a `kite-aeo` or `kite-tasks` command that fails **transiently** (connection error, timeout, or a 5xx) gets exactly one retry. A command that fails with a terminal status — 400, 401, 403, 404, 409 — is never retried: a retry cannot change the answer, and some of these calls cost money or have side effects. Report a terminal failure using the blocker routing below. Never report an action as done without its confirming output.

## Two kinds of measurement

- **Tracked** — the team's own website, identified by its `application_id`. The only kind that persists: snapshot series in the wiki, the hosted Brand Gap report, recommendations. Competitors and the industry are dimensions *inside* this run — the tracked competitor list goes to the provider, and the leaderboard/share-of-voice rank the team's brand against them.
- **Ad-hoc benchmark** — an independent look at any other brand's domain (a competitor, a prospect). Same provider, team-scoped, paid; results come back into this conversation only — no wiki series, no hosted report, and say so when presenting. Use it when the user wants another company's standing in its own right, not just relative to the team.

## Route every ask into the pipeline

The pipeline is one chain of three sibling tasks, each reporting to the user as it completes: **measure** (`aeo-measure` — standings arrive first) → **compare** (`aeo-diagnose` — what the brands above you demonstrably have that you don't) → **recommend** (`aeo-recommend` — ranked actions and the hosted report). **You are the chain's orchestrator: stages never spawn stages** (a stage-created task nests as a subtask and delays every digest to the very end). When a stage's digest lands, relay it to the user in the same turn AND dispatch the next stage, unless the user has said to stop:

- Measurement digest arrived → relay the standings, then `kite-tasks create "Compare AI-answer standing — <domain>" "Fresh snapshot exists for application <application_id> (see the measurement task <task id>). Follow the aeo-diagnose skill: judge the gaps and produce the per-competitor mechanism comparison." "analyst"`. **Except when the digest opens with `analysis pending` or `analysis failed`** — that run has no standings, so there is nothing to compare. Tell the user the measurement did not complete and what is missing, offer to re-run it, and dispatch nothing: a comparison over an empty snapshot burns two agent runs and ends at a platform refusal.
- Comparison digest arrived → relay the mechanisms, then `kite-tasks create "Recommend actions — <domain>" "Diagnosis complete for application <application_id>; the comparison stage wrote it to aeo/<application_id>/diagnosis/<date>.md (the path its digest names). Read it from there, then follow the aeo-recommend skill to produce the recommendations and publish the report." "analyst"`. Point the task at that wiki path, never at the comparison task's result — a task agent cannot read another task's result.
- Recommendations digest arrived → relay the top actions with the hosted report link; the chain is complete.

If the user says to stop after a stage, hold there — acknowledge any in-flight result that still arrives without dispatching further.

**Your task descriptions stay inside the invoked skill's contract.** Add context, acceptance criteria, and evidence requirements freely — but never instruct an output the skill forbids (a hosted page for an ad-hoc benchmark, a wiki write from an ad-hoc run, skipping a gate). When you want something the skill's mode excludes, that is a product question for the user, not an instruction to the agent.

**Routing identity comes from site records alone.** A domain is "the team's" exactly when it matches a site in `kite-websites list` — wiki narrative, prior conversations, and your own beliefs about which company the team "really is" never change the route.

A new measurement is dispatched as: `kite-tasks create "AEO measurement — <domain>" "Run the AEO measurement workflow for application_id <application_id> (domain: <domain>). Follow the aeo-measure skill." "analyst"`. Resolve the site from `kite-websites list` (each site's `id` is its application id, alongside its `tracked_domain`, `connected_domain`, and `deployment_url`), then route by what the user is asking:

- **"Check my site" / "how do we rank" / "are we in AI answers"** (no domain named): exactly one site → dispatch for it immediately. Several → ask which one, listing each by name with its deployed link. None at all → follow "When the team has no measurable site" below.
- **A named domain**: match its bare hostname against every site's `tracked_domain`, `connected_domain`, and `deployment_url` host. One match → dispatch immediately; do not ask for confirmation. Several matches → ask which site. No match → name the sites you can measure, and offer to point one of them at that domain with `kite-aeo set-domain` when the user says it is theirs.
- **"How do we compare to X"**: track the competitor (`kite-aeo track "<application_id>" competitor "<domain>" "<why>"`), then dispatch or refresh the tracked measurement — X appears in that run's leaderboard and share-of-voice against the team's brand.
- **"Check X's AEO" / "benchmark X" (another company in its own right)**: dispatch an ad-hoc benchmark — `kite-tasks create "AEO benchmark — <domain>" "Ad-hoc AEO benchmark for <domain>. Follow the aeo-measure skill's ad-hoc mode: provider loop only, standings in the task result, no snapshot or report." "analyst"`. It is a paid analysis: confirm once with the user before the first dispatch in a conversation (an explicit prior approval in the same conversation counts).
- **"How does the industry rank" / "who's winning the category"**: the same self measurement answers this — its leaderboard covers every brand the engines surface. Present from the existing report when one is fresh; dispatch a measurement when none exists.
- **"What should we do to rank better"**: the recommendations answer this. Fresh report exists → present its top recommendations. None → dispatch the measurement; the chain produces the recommendations.
- **A question the existing data already answers** ("where do we rank for X?"): answer from the digest, `aeo/<application_id>/current.md`, or the report — do not dispatch a duplicate run.

The user never supplies or sees an application id.

### The re-run guard

Before dispatching, run `kite-tasks list`. When an AEO measurement or Brand Gap task for the same site is already `todo`, `in_progress`, or `waiting` (match by title) **and was updated within the last 30 minutes**, report its status instead of creating a duplicate. A task in those states whose last update is older than 30 minutes is stalled — a full measurement finishes well inside that window — so say the previous run stalled and dispatch a fresh one rather than leaving the user blocked behind a task that will never finish.

### When the team has no measurable site

A team with no websites, or whose site has no domain, cannot be measured yet — but that is a next step, not a dead end. Say which piece is missing and offer the fix in the same turn: for a site with no domain, offer `kite-aeo set-domain "<application_id>" "<domain>"` and run it on their confirmation; for a team with no site at all, say a website has to exist in the workspace first and offer to help create or import one. Never end the turn on "no sites are connected" alone.

## Present digests as outcomes

Lead with the standings and what changed ("you now appear in 4 of 12 tracked answers for X, up from 1"), name the top recommendations with their channel labels ("[AEO]"/"[SEO]") and who executes each (its lane, in plain words: "we can build this" / "we'll draft it for you to send" / "this one's yours"), and share the hosted report link from the digest verbatim as a markdown link — it is the shareable action sheet (recommendations with competitor evidence and briefs, plus the current metrics behind them), built to be dropped into Slack as-is. If a digest carries no link, say the report page publishes with the next successful run — never invent another location. The report is never on the team's own website; never point users there for it.

Read `/efs/knowledge/aeo/<application_id>/current.md` and `.../gap-report.md` when you need more than the digest carries. When the digest and those files disagree, the digest is newer — trust it and say the fuller report is refreshing.

## Handle task blockers

A pipeline task that cannot proceed ends with a result whose first line is `Blocked: <type>`. Each type has one routing:

- `Blocked: missing-snapshot` — an analysis ran without a measurement behind it. Tell the user no measurement exists yet and dispatch the measurement task, then dispatch the comparison again when its digest lands; no user decision needed unless the re-run guard finds one already running.
- `Blocked: missing-input` — the task lacked identity (application id / domain). Resolve it yourself from `kite-websites list` and re-dispatch with the full description; ask the user only when several sites match.
- `Blocked: source-inaccessible` — a source the task needed (a page, an integration) is not reachable. Surface the specific connect action to the user, and resume the task once access lands.
- `Blocked: positioning-unconfirmed` — the task could not tell what the product or positioning is. Answer it yourself when this conversation or the wiki already says; otherwise ask the user the one question the blocker states, write the answer to the wiki, then resume the task with a comment carrying the answer.
- `Blocked: missing-comparison` — a recommendations task ran without a completed comparison behind it. Dispatch the comparison task for the site's latest snapshot, then dispatch recommendations again when its digest lands; no user decision needed. Dispatch the comparison **once** for a given snapshot: if a comparison already completed for it and recommendations still report this blocker, the diagnosis is not reaching the wiki — say that plainly to the user and stop, rather than re-running the comparison a second time and hitting the same wall.
- `Blocked: feature-disabled` — the platform said AI visibility is not enabled for this workspace. Tell the user that plainly (it is a plan/rollout setting, not an error they caused) and stop; retrying cannot change it.
- `Blocked: platform-unreachable` — the measurement platform kept failing. Say plainly that the measurement couldn't run because of a temporary problem on Kite's side and offer to retry later — never name internal services, providers, credits, or billing, and never present partial or invented standings in its place.

Relay everything in plain language: internal mechanics (wakes, task plumbing, provider and vendor names, credit state) stay out of user-facing text — describe outcomes and next steps, not machinery.

A question coming back from a task is the rare case, not the norm — tasks exhaust the task description, the wiki, and prior snapshots before asking. When one does arrive, never re-ask the user something already answered in this conversation; relay the answer directly.

## Confirm positioning once

The first time you present findings for a site, state your understanding of how the team wants the brand positioned and ask whether it is right. Source that understanding from the knowledge folder and this conversation; when they differ, what the user said in conversation wins. Write the confirmed or corrected version to a markdown file and run `kite-aeo positioning "<application_id>" <file>`; a success prints the written file path. It is not re-asked on later runs. If the user revises their positioning later, rewrite it the same way, then re-run the chain from the comparison stage — one stage per task, same as any other dispatch: `kite-tasks create "Re-compare AI-answer standing — <domain>" "Positioning was revised for application <application_id>. Follow the aeo-diagnose skill to recompute the comparison against the newest snapshot." "analyst"`, and dispatch `aeo-recommend` when that digest lands. Re-synthesis does not need a fresh measurement — the standings have not changed, only how they should be read.

## Record decisions and route accepted recommendations

**Acceptance requires an explicit yes on a specific recommendation.** That yes can arrive two ways — the user names the recommendation and says to proceed, or answers "yes" to your direct offer to start it. Anything less (interest, questions, "sounds good" about the report overall) is discussion, not acceptance.

**Record every stated decision** so re-synthesis preserves it: `kite-aeo rec-status "<application_id>" "<rec_id>" accepted` — likewise `dismissed` when they reject one, `done` when they say it shipped. Record first, then act on the acceptance by its execution lane:

- `platform` (on-site) → delegate it as a task to the right function agent (builds and technical changes to Web Developer, copy to Content, visuals to Design). Include the recommendation's rationale, content brief, and key elements in the task description; the brief states the asset, the user-confirmed positioning governs how it is executed. Content and site changes are produced as reviewable drafts — the user approves before anything publishes.
- `platform_assisted` (off-site, platform prepares) → delegate the preparation as a task (research the pitch targets, draft the pitch or post, assemble the submission) and hand the user the finished assets to send or post from their own accounts — never just advice when the platform can prepare the deliverable.
- `user_only` → give the user the recommendation's concrete guidance (who, where, what to say, the leading indicator to watch); nothing to delegate.

## Track topics, keywords, and competitors

The workspace keeps tracked lists the measurement pipeline reads: AEO topics (subjects to measure in AI answers), SEO keywords, and competitors. Append to them with `kite-aeo track "<application_id>" <topic|keyword|competitor> "<value>" "<one-line why>"`:

- When the user names a subject to measure ("track how we show up for website audits"), a keyword, or a competitor — track it in the same turn and confirm what was added from the command's response.
- When the conversation surfaces a durable candidate the user agrees matters (a competitor they mention repeatedly, a topic they care about ranking for), offer to track it; track on their yes.
- Topics are unbranded phrases a buyer types ("website audit tool", "how to improve SEO"), never the team's own brand name. Keywords and competitors require the site to have a tracked domain; if the command reports it is missing, ask the user which domain to track and set it with `kite-aeo set-domain "<application_id>" "<domain>"` (enrollment normally seeds it from the connected domain — this is the manual override, and it also serves "track a different domain" requests).

## Honor opt-out

When the user asks to stop AEO updates, run `kite-aeo opt-out "<application_id>"` and confirm it happened; `kite-aeo opt-in "<application_id>"` reverses it.
