---
name: manage-workflows
description: >
  Use this skill when the user wants recurring work, scheduled edits,
  automation, or periodic checks, such as "update my site every Monday",
  "send me a weekly report", "schedule this task", or "show my scheduled
  automations". Skip this skill for one-time edits the user wants done now.
mode: both
agent_policies:
  orchestrator: orchestrator-policy.md
---

# Manage Workflows

Use this skill to create, list, update, or remove recurring workflows for the current team.

## Hard requirements

- These requirements take precedence over the supporting rules below.
- Before creating a workflow, first list existing workflows, then verify every required third-party app is connected. Do not create it until both checks pass.
- When the recurring work signs in to a website the run drives through a browser (not a connectable app), set up that login before the workflow can fire — follow "Workflows that need a browser login".
- Change an existing workflow in place when the user's request refers to its current purpose or cadence. Preserve its id and every field the user did not ask to change.
- Never create a second workflow to override or replace an existing workflow.
- Verify the returned id, prompt, timing, assignee, and enabled state before reporting success.

## Rules

- Capture what should happen and when in plain language, then translate the timing into cron yourself; never surface cron syntax or ask for it.
- When the timing is ambiguous and you are in a live conversation, ask one plain-language clarifying question ("Which timezone should I use?"); when running non-interactively from a task, pick the most reasonable interpretation and state the assumption. Never guess time zones or dates silently.
- When telling the user about a workflow, describe it by what it will do and when ("Every Monday morning, check traffic and send a summary"), not by its prompt, cron, or plumbing. That cadence belongs in what you say to them, not in the prompt you store (see "Writing the prompt").
- Each workflow run executes unattended as a fresh team task with no prior context, so a missing app connection makes every run fail. List the third-party apps the recurring work needs and verify each connection; when one is missing, follow `tool-discovery-execution`'s connect recipe and wait until the connection is completed.
- Workflows belong to the team.
- Write the prompt as a self-contained instruction because each run starts a fresh team task — name the apps and data the run needs. See "Writing the prompt" for its wording.
- If the list of workflows is empty, report that no workflows are currently active and offer to create one.
- To change, replace, reschedule, pause, or resume recurring work that already exists, update that workflow in place so its id and run history remain intact.

## Writing the prompt

The prompt is the instruction one fired run executes, not a description of the
arrangement. By the time it runs, the schedule has already fired — so write it in
the imperative, as work that is due now.

Keep two things out of it, because both are already real settings the run applies
on its own: the cadence (the cron) and where the result goes (`delivery`).

```
Good:  Go to Slack, list the workspace's members and channels, and write a summary of both.
Bad:   Every Monday, go to Slack and post a summary of members and channels to the team channel.
```

The cadence still belongs in what you tell the user ("every Monday I'll…") and in
the `title` where it reads naturally (`Weekly Slack Summary`) — just not in the
prompt itself.

## Cron grammar

- Five space-separated fields, in order: `minute hour day_of_month month day_of_week`, all UTC.
- Each field is `*`, a number, a list (`1,15`), a range (`1-5`), or a step (`*/15`).
- `day_of_week` is `0`–`6` with `0` = Sunday.
- Examples: `0 9 * * 1` = Mondays 09:00 UTC; `*/30 * * * *` = every 30 minutes; `0 0 1 * *` = first of each month 00:00 UTC.

## Where each run reports (`delivery`)

Every run reports its result somewhere. Pick it from what the user asks; it is a
real setting (the `delivery` tool argument, or the `--delivery` CLI flag),
separate from the prompt text.

- **`default_channel` (default)** — post the result to the team's main Slack
  channel. Use this whenever the user does not say where results should go.
- **`thread`** — reply in this conversation. Use this when the user says to
  answer here ("reply in this thread", "message me back here", "let me know in
  this chat"). Creating with `thread` requires a conversational source; task
  agents must use `default_channel` or `none` when creating a workflow.
- **`none`** — report only to the Tasks page, with no Slack message. Use this
  only when the user asks to keep the result off Slack.

To change where an existing workflow reports ("post to the thread instead of the
channel"), update it in place with the new `delivery` — do not recreate it.

## Workflows that need a browser login

Some recurring work signs in to a website the run drives through a browser rather
than a connectable app — for example "every morning, log in to `<site>` and export
the report". Each run executes unattended, so the login must already be saved to
the workflow's browser profile before the first run fires; otherwise every run
stalls at a login wall no one is watching.

Resolve the login **up front, in this conversation**, while the person is here to
complete it. Use this flow only when the work needs a site login that no connected
app already covers.

1. **Create the workflow disabled** with `kite-workflows create "<cron>" "<prompt>" "<title>" --disabled`. It is saved but does not fire. Read `id` and `browser_profile` from the response.
2. **Delegate a one-off login-setup task** (see `work-delegation`): `kite-tasks create` a task that opens the site's login page in a cloud browser **on the workflow's profile** — `kite-browser create --profile "<browser_profile>" "<login-url>"` — runs `kite-browser handoff`, puts the handoff URL in its task result, and stops without waiting (the handoff and profile mechanics are in `browser-session`, "Human handoff"). Pass the exact `browser_profile` from step 1 so the captured login persists where later runs reuse it.
3. **Relay the link and ask them to log in.** When the setup task reports back with the handoff URL, give that URL to the person and ask them to log in and tell you when they are done. The link expires with the browser session (minutes) — pass along the deadline and ask them to act promptly.
4. **On their confirmation, resume the setup task to save the login** with `kite-comments create "<task_id>" "logged in — verify the page and close the session"`. The task resumes in the same session, confirms the logged-in state, and closes so the login is written back to the profile.
5. **Enable the workflow** with `kite-workflows update "<id>" --enable`. Later triggers reuse the saved login automatically.

Keep the workflow disabled until the login is confirmed saved. If the browser
session expires before they finish, delegate a fresh setup task (step 2) — the
saved profile is unaffected.

## Sandbox — `kite-workflows` CLI

In the sandbox, manage workflows with the `kite-workflows` CLI. The team is resolved from your session token; you do not pass it.

- Create: `kite-workflows create "<cron_expression>" "<prompt>" "<title>" [--delivery thread|default_channel|none] [--disabled] [--webhook]` — prints the created workflow as JSON (with its `id`, `browser_profile`, and `url`, the workflow's detail page) on success. Pass `none` as the cron together with `--webhook` for a workflow that has no schedule and fires only when something POSTs to it (see "Run work when something happens"). The title is required: a short display name (at most 6 words, e.g. `Daily Pokemon Poem`) shown in the workflows UI. `--delivery` is optional; omitting it defaults to `default_channel` (see "Where each run reports"). `--disabled` creates the workflow without arming its schedule — use it only for the browser-login setup below, then enable with `update --enable`.
- On Slack, the platform appends a "View workflow" button linking to `url` to your reply after you create a workflow — leave the link out of your reply text there. On other channels, include `url` as a link when the user would benefit from opening the workflow.
- List: `kite-workflows list` — prints all team workflows, including paused ones, as JSON.
- Update: `kite-workflows update "<workflow_id>" [--cron "<cron_expression>"] [--prompt "<prompt>"] [--title "<title>"] [--assignee "<agent-name>"] [--delivery thread|default_channel|none] [--enable|--disable]` — changes only the supplied fields and prints the updated workflow as JSON. Copy the id from `list`; preserve fields the user did not ask to change.
- Delete: `kite-workflows delete "<workflow_id>"` — removes one workflow (exit 0 on success).
- Webhook: `kite-workflows webhook "<workflow_id>" --enable | --disable [--dedup-header "<Header-Name>"]` — turns the workflow's webhook trigger on or off and prints the workflow as JSON. Enabling returns a `webhook_url`; disabling clears it. `--dedup-header` names the header the source puts its event id in, so repeat deliveries of one event are dropped for 24h instead of only while identical bodies arrive within ~5 minutes — see "Stop one event firing the work twice".

Confirm the create or update response contains the expected `id`, prompt, timing, assignee, and enabled state before telling the user it changed. For deletion, confirm the command exits successfully. On failure, follow the shared single-retry rule and never claim the workflow changed without the expected result.

## Run work when something happens (webhook triggers)

A workflow can fire when something happens instead of on a clock. Use this when
the user describes work in terms of an occurrence rather than a time — "whenever
someone fills the contact form", "when a lead comes in, research them first",
"tell me every time we get a booking".

The trigger is a webhook: the workflow gets a URL, and anything that can send an
HTTP request fires a run by POSTing to it. That is deliberately the only
mechanism — it works the same whether the team's site was built here or
elsewhere, and whether their form goes through this platform, their own backend,
or a third-party form tool.

Create a workflow that fires only this way by passing `none` in place of the cron:

```
kite-workflows create none "<prompt>" "<title>" --webhook
```

Or add the trigger to a workflow that already has a schedule, so it fires both
on the clock and on the event:

```
kite-workflows webhook "<workflow_id>" --enable
```

- **Read `webhook_url` from the response and give that URL to whoever will call
  it.** Until something POSTs to it, the workflow will not fire. Say this
  plainly — do not describe the workflow as live when nothing is wired to the URL
  yet.
- **The POST body is handed to the run**, appended under the stored prompt as
  a Markdown code block below `Webhook payload:` (capped at 64 KB). Write the
  prompt for the work that is the same every time (which apps to touch, what to
  produce), and let the body carry the per-event detail. Name the fields you
  expect when the work depends on them.
- **The URL is a credential.** Report it once to the user and never post it to a
  shared channel.
- **Disable it with `--disable`** when the trigger is no longer wanted; any cron
  schedule keeps running.

### Stop one event firing the work twice

Sources retry. A form tool that times out waiting for a response, or an
analytics destination that redelivers, will POST the same event again — and
every fire spends a real run. The platform drops repeats for you, but how well
depends on what the source sends:

- **The source sends an event id in a header** — repeats of that event are
  dropped for 24 hours. This is the good case.
- **It sends nothing identifying** — repeats are dropped only while an identical
  body arrives within about 5 minutes. Two genuinely different events that
  happen to have identical bodies inside that window collapse into one run.

So when you wire up a source that sends a delivery/event id, tell the workflow
which header to read it from:

```
kite-workflows webhook "<workflow_id>" --enable --dedup-header "X-Dedupe-Key"
```

Read the real header name from the source's own webhook documentation or its
delivery inspector — do not guess one. `Idempotency-Key` and
`X-Idempotency-Key` are already read by default, so `--dedup-header` is only for
sources that use a different name (most do: PostHog, GitHub, Stripe and others
each ship their own). If a source lets you add a custom header with the event
id, `Idempotency-Key` is the name to use, and no flag is needed.

Do not claim a workflow is protected from duplicates when nothing identifying is
configured — say it deduplicates identical payloads for a few minutes, which is
the honest description.

### Who calls the URL

The user (or an agent working on their site) has to connect something to it.
When they ask you to set up event-driven work, say which of these they need:

- Their site's form handler or backend POSTs to the URL on submit.
- Their form tool (Typeform, HubSpot, Tally, a Google Apps Script, …) sends a
  webhook to the URL.
- Their analytics or automation tool (PostHog destinations, Segment, Zapier)
  forwards a chosen event to the URL.

If the user does not yet have any of these, the workflow can still be created —
tell them it will sit idle until the URL is called, rather than leaving them to
discover it never fires.
