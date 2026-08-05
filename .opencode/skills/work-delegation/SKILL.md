---
name: work-delegation
description: >
  Use this skill when work should be handed to another agent — the task calls
  for a specialist outside your own role (research, website changes, data
  analysis, SEO/AEO, image work), or a piece of work should run as its own
  subtask, or a follow-up may redirect work already delegated. Triggers on
  "ask Kite to research …", "delegate this", "have someone build …", "for
  every X find Y, then enrich Z", a deliverable that fans out across a
  population with layered detail under each member, a delegated task
  returning while the rest of its population still needs tasks, and whenever
  you are about to attempt specialist work another agent owns. Keep
  the work yourself when your own role is the best fit — delegation is for
  routing work, not for doing it.
mode: sandbox
---

# Work Delegation

Use this skill to delegate work to another agent when the task needs a different specialist.

Kite's CMO plans and delegates every deliverable. Other agents keep work in
their own function when it is the best fit.

The _Delegation Rules_ below are the team's only routing map. Agent
descriptions state what each agent owns; who receives a task is decided here.

## Context

Check which of `THREAD_ID` or `TASK_ID` is set — it selects the workflow below and the available `kite-tasks` commands.

- Conversational agents have `THREAD_ID`. They can use `kite-tasks agents`, `kite-tasks create`, `kite-tasks list`, `kite-tasks status`, and `kite-comments create`.
- Task agents have `TASK_ID`. They can use `kite-tasks create` to create subtasks. They cannot use `kite-tasks agents`, `kite-tasks list`, or `kite-tasks status`.
- Task agents also have `set-task-result` and must use it when their own task result changes.

## Conversational Workflow

Use this workflow when `THREAD_ID` is set.

### Follow-up decision

A new user message is always yours to interpret first; it is never
automatically forwarded to a task. Decide from the message and conversation:

- Reply directly when the user is asking a question, requesting status, or
  otherwise does not need delegated work changed. Do not create a task comment.
- When the message redirects or clarifies existing delegated work, run
  `kite-tasks list` or `kite-tasks status "<task_id>"` to identify the relevant
  task, then use `kite-comments create "<task_id>" "<markdown>"`. That explicit
  comment interrupts a running target and resumes it with the comment.
- When the message asks for a separate outcome, create the appropriate new task
  instead of attaching it to whichever task happens to be newest.

1. Run `kite-tasks agents` to list available agents.
2. Apply the _Delegation Rules_ function map, choose the matching `name`, and pass it verbatim — not a shortened or display form. A bundled request is not "fits no specialist": split it per _Decomposing Work_ so each specialist owns its part.
3. Write the title and description to files with a single-quoted heredoc, then run `kite-tasks create --content-files <title_path> <description_path> "<assignee_agent>"`. This preserves the exact user text; do not put task content in command arguments. If the command fails with an error listing `valid_agents`, the assignee was not recognized: re-run `kite-tasks agents` and retry once with an exact `name` from it.
4. If the task advances an initiative on the board, add `--initiative-id "<initiative_id>"` — `kite-tasks create --content-files <title_path> <description_path> "<assignee_agent>" --initiative-id "<initiative_id>"` — so the platform links the task to it. Use the `id` from the `kite-initiatives create` or `kite-initiatives list` output. Every task you delegate toward an initiative must carry its id.
5. Tag the task per _Tagging the Task_ with `--tags "<keys>"`.
6. Confirm the create output contains a non-empty task identifier, then tell the user what is now underway and when they will hear back, in outcome terms; leave assignee names to the task board unless the user asks. When the output has no task identifier, report that the task was not created.

Use `kite-tasks list`, `kite-tasks status "<task_id>"`, and `kite-comments create "<task_id>" "<markdown>"` only for tasks created from this conversation.

### Reading a status check

For an `in_progress` task, the `kite-tasks status` JSON carries
`seconds_since_last_activity` — the age of the run's last observed work
(model output or tool calls), refreshed about every 5 minutes while the run
is alive. The field is meaningful only in `kite-tasks status` output: in
`kite-tasks list` it is always null and carries no signal, so judge staleness
only after a `kite-tasks status` read of that task. Interpret it before
reporting status to the user:

- Under 900, or null on a task whose `updated_at` is within the last 15
  minutes: the task is working — report it as underway.
- 900 or more, or null on a task whose `updated_at` is older than 15 minutes:
  the run has stopped reporting activity. Say that plainly — "no activity for
  N minutes, it may have stalled" — instead of calling it in progress. With
  the user's go-ahead, nudge it:
  `kite-comments create "<task_id>" "Status check — please resume and report current progress."`
  The nudge is best-effort: a live run resumes with the comment; a dead one
  cannot consume it. Re-run `kite-tasks status` about 5 minutes after
  nudging — if `seconds_since_last_activity` has not dropped, tell the user
  the run looks dead and offer to re-delegate the work as a fresh task. A
  task that has meanwhile turned `failed` requiring manual retry restarts
  only from a comment the user writes themself — ask them to add one; your
  own comment does not authorize the retry.

When content has user text, Markdown, dollar amounts, backslashes, or newlines, write it with a single-quoted heredoc so the shell does not interpret it:

```sh
cat > /tmp/task-title.txt <<'EOF'
Approve launch budget
EOF
cat > /tmp/task-description.md <<'EOF'
# Budget

1. Approve $2,500.
EOF
kite-tasks create --content-files /tmp/task-title.txt /tmp/task-description.md "<assignee_agent>"
```

For a task result, use the same file-based transport for both the summary and Markdown body:

```sh
cat > /tmp/task-summary.txt <<'EOF'
Approved the $2,500 launch budget.
EOF
cat > /tmp/task-result.md <<'EOF'
# Budget

1. Approved $2,500.
EOF
set-task-result --summary-file /tmp/task-summary.txt < /tmp/task-result.md
```

For a task comment, write the Markdown to a file first and pass it as `"$(cat notes.md)"`.

## Task Workflow

Use this workflow when `TASK_ID` is set.

1. Delegate only when a specialist should do a separate subtask.
2. Use the assignee named by the task instructions when one is provided, verbatim.
3. If no assignee is named in the instructions, apply the _Delegation Rules_ function map. Do not create a recursive subtask for the agent already running the work. Every create command must include an explicit `<assignee_agent>`; omission is invalid and never selects a default agent.
4. Write the title and description to files with a single-quoted heredoc, then run `kite-tasks create --content-files <title_path> <description_path> "<assignee_agent>"`. If it fails with an error listing `valid_agents` (the assignee was not recognized), retry once with an exact `name` from that list — task agents cannot run `kite-tasks agents`, so the returned `valid_agents` is your source of valid names. Tag the subtask per _Tagging the Task_ with `--tags "<keys>"`.
5. Continue your own task or end your turn so the platform can resume you when the subtask changes.
6. Write the summary and Markdown result to files with a single-quoted heredoc, then run `set-task-result --summary-file <summary_path> < <markdown_path>` when your own task has a final or updated result. The summary is required: a single past-tense sentence stating the outcome; run histories show only that sentence.

Do not call `kite-tasks agents`, `kite-tasks list`, `kite-tasks status`, or `kite-comments create` from a task context.

A task cannot schedule future work. When work must happen later — a follow-up send, a measurement readout, a re-check — put that plan in the task result so the delegating agent can schedule it.

## Decomposing Work

Apply these rules in either context before any `kite-tasks create`.

1. One task, one outcome. When a request needs several distinct deliverables, create one task per deliverable rather than one task listing all of them — each runs with its own specialist and its own result.
2. Independent pieces can be created together and run in parallel. When one piece needs another's output, create the first task alone and create the dependent task after the first result arrives, passing that result in its description.
3. Match each piece to the specialist whose role owns it; split a piece that would straddle two specialists.
4. A request that mixes work listed specialists own with unmatched work is a bundle. Split it into sequenced tasks: each specialist piece goes to its owner, while only the residue that fits no specialist goes to `generalist` or stays with the current non-CMO task.
5. Parallel tasks may share a destination; they must not share a file. Submits merge per file, so parallel tasks add different report pages to the same portal, or different pages to the wiki, without disturbing each other's work; two tasks writing the same file lose one side's work to whichever submits last. Give each parallel task its own page or file, and name that file in its description.
6. A hub page or shared config file covering the parallel work has exactly one writer at a time — never two parallel tasks — assigned per _Delegation Rules_ rule 4. Handing its remainder to a sequential continuation subtask is the one exception, since that subtask runs alone.
7. A conversational delegator creates the hub task after the parallel tasks complete, per rule 2 above; a hub task created alongside them cannot see when they finish. A task agent that created those tasks as subtasks writes the hub itself and extends it on every resume, adding what each subtask completed by then — the platform wakes it whenever a subtask changes but guarantees no wake after the last one lands, so a hub built incrementally is complete whenever the task ends. List the members the hub covers in the task result: a subtask that completes after your latest wake message is invisible to you — a task agent cannot query subtask status — and that list is what lets the delegator spot a straggler.
8. Rules 6 and 7 govern a hub over pages the parallel tasks published themselves. When those tasks write records instead — wiki entries, research notes, no page of their own — a single assembly task after them turns the records into the one page, assigned per _Delegation Rules_ rule 4. Over a population, give the hub or assembly task each member's page slug or record location and one-line verdict rather than every member's full result.

### Fan-out over a population

A request that names a population and asks for detail under each member — for every event its sponsors, for every sponsor its attendees, then an enrichment on each attendee — decomposes per member and per layer.

1. When the population itself is unknown — every event in a space, every competitor in a category — enumerating it is the first layer and its own task. The members exist only once that task returns.
2. Pilot the first member through every layer before scaling out: one task per layer, run back-to-back. What they return establishes the working sources, the chunk size, and the result shape the rest inherit.
3. Once the pilot returns, sequence the layers that consume another layer's output and run members that depend on nothing in parallel.
4. Size each task to the chunk the pilot established — what one run can finish and check. Group several small members into one task when a single run covers them all; split a member across tasks by layer when a single run cannot. A population one run cannot finish never goes out as a single task: that task returns a thin sample of everything and a complete answer to nothing.
5. A chunk task names both its own slice and the full population that slice belongs to, with its acceptance criterion scoped to the slice. Decomposition narrows the task, never the request: the quantifiers of _Writing the Task_ rule 3 survive in every chunk.
6. When a result comes back partial, split the remainder finer — fewer members, a single layer — rather than re-running the same oversized task or accepting the gap. Full scope delivered across several tasks beats a sample delivered in one.
7. Name what is still missing when you report: which member, which layer, and why. The work is done when every member and layer is covered or explicitly blocked with its cause.

## Writing the Task

The assignee sees only the title and description you write — no conversation history, no context you had. The description must carry:

1. The goal and why it matters, in one or two sentences.
2. Every input the work needs: source data, URLs, names, prior results, constraints. A reference like "the list from earlier" is invisible to the assignee — inline it.
3. Acceptance criteria: what must be true for the task to count as done, stated so the assignee can check it themselves ("the report lists every competitor with pricing and a source link", not "research competitors"; for a website change, "the draft preview at /pricing renders the three tiers"). Preserve the request's quantifiers and acceptance scope: for "all", "top", or "highest" requests, name the population the assignee must evaluate. Never rewrite an exact request as "up to", "available", or a sample; if the original scope cannot be met, leave that acceptance criterion unsatisfied and require the assignee to say so.
4. The expected result shape when it matters — for findings, explicitly choose a concise task result or a web report; for other work, name the table, live URL, or draft. For a website change the shape is its draft preview URL, not a live URL.
5. The user's constraints verbatim — numbers, schedules, names, identifiers — never paraphrased. When a fact the work depends on is unknown to you (a table's columns, an event name, a timing window), say it is unknown and instruct the assignee to parameterize it or ask through the task result, never to guess it — a guessed identifier fails silently at integration time and costs a rebuild.
6. Who will apply the deliverable and what they can run. When the requester cannot execute commands, require finished artifacts — complete file contents, a hosted page — plus plain-language apply steps; a CLI runbook is not a deliverable for a non-technical requester.
7. Where the result goes: the assignee returns it through the task result, and you relay it onward. Never instruct the assignee to deliver to a channel (post to a chat thread, send an email) — task agents have no channel access, and such an instruction fails the task.

## Tagging the Task

Tags label a task with the kind of marketing work it is; the team's Activity feed shows and filters tasks by them.

1. Tag every marketing deliverable with the one or two keys that best describe the work, comma-separated (e.g. `--tags "content,seo"`); omit `--tags` when no key fits.
2. Use only these curated keys: `content`, `seo`, `paid-ads`, `social`, `email`, `creative-design`, `web-landing`, `analytics-reporting`, `pr-comms`, `experiment`. An unknown key fails the create and the error names the valid keys — retry with keys from that list.
3. Pass tags as `--tags "<keys>"` after the required arguments, in either context: `kite-tasks create --content-files <title_path> <description_path> "<assignee_agent>" --tags "content,seo"`. Optional flags (`--tags`, and `--initiative-id` in a conversation) work in any order; each one you skip changes nothing about the rest of the command.

## Delegation Rules

1. Delegate when the work matches another agent's primary function and does not match your own.
2. Keep work yourself when your own function covers it and no other function covers it more directly.
3. Route by the requested final artifact: evidence gathering — including keyword, SEO, AEO, search-competitor, and search-opportunity research — to `research`; customer-facing words to `content`; visual work to `design`; the public marketing website — new sites, bringing an existing website or code repository into the platform (import, clone, connect, or recreate, plus any build or edit that follows), creating or syncing the site's git repository, custom landing pages for conversion, SEO/AEO pages, blog posts, and every other marketing-site change — to `web-developer`, even when a research, audit, or AEO report supplies the inputs; measurement and experiments to `analyst`; and unmatched work — a standalone internal tool, a dashboard aggregating several agents' results — to `generalist`. Keep each specialist inside its function; a subtask for the agent already running the work is invalid.
   - A page build, edit, or refresh on the team's website lands on a website the platform already manages — distinct from designing a brand-new site (rule 6) or bringing one in (this rule's import path). Before delegating one, run `kite-websites list` (conversational agents get a read-only listing) and name the target website's `id` as the `website_id` in the task description.
   - When the listing is empty and the user has not already named a route, the change has nowhere to land: with `THREAD_ID` set, ask the user one question — start a fresh website or bring in their existing site from GitHub (a Next.js repository)? — then delegate the route they choose (a task agent follows the task-agent sub-bullet below instead). A bare approval ("approved", "go ahead") names no route: restate the two routes and wait, on every turn, until the user picks one. An explicit hand-back of the choice ("you decide", "whatever you recommend") selects the fresh-website route — import needs a repository only they can name. The import route is delegated with the GitHub `owner/repo` in the task description: when the user chooses import without naming the repository, ask for it first. These two routes are complete — an existing site with no Next.js repository to import is recreated through the fresh-website route.
   - The fresh route yields exactly one website: however many page requests gated on the empty listing, delegate a single NEW-website task, record the deferred page requests on the initiative when one exists (in the wiki otherwise) so they survive the design round-trip, then land those already-requested pages on that website's `id` after the user selects a design. A page request that arrives while that design round-trip is open joins the deferred set.
   - A task agent (`TASK_ID` set, no user channel) that finds the listing empty records the missing website and the two routes in its task result instead of creating the subtask.
4. Choose findings delivery before creating the task. Default to a concise task result. Require a web report when the user explicitly requests or confirms it, the workflow explicitly requires it, or the result is obviously too large for one message to preserve every decision-critical detail. Structured or tabular output alone is not enough. When the choice is unclear and `THREAD_ID` is set, ask the user and wait; do not create the report task until they acknowledge it. A task agent without a user channel defaults to a concise result and flags the ambiguity. State the selected result shape in the task description. The agent whose task produces the findings builds any required report with `dashboard-building` in that same task. A dashboard aggregating several tasks' or agents' results is its own deliverable: create the producing tasks first, then one `generalist` task carrying every result and requirement inlined — over a population, _Decomposing Work_ rule 8 replaces that with each member's slug and verdict. If an unplanned task returns findings, relay them rather than withholding them for a page.
5. After a delegated website change completes, when the change is user-visible and its result does not show it was verified, delegate an audit-only verification pass to `web-developer`, naming the exact pages and expected states to check on the draft preview and inlining the draft preview URL — the auditor cannot clone an unmerged draft; it checks the preview in the browser. The preview link deep-links page paths (`<preview URL>/pricing` opens that page), so name each page to check as a full URL.
6. A NEW-website task's deliverable is design options, not a finished site: write the task to generate designs from the approved brief and return each design's screenshot plus the designs link for the user to compare. This rule covers fresh builds only — a task importing, cloning, or connecting an existing website or repository (rule 3) delivers the brought-in site itself and skips the design-options flow. An "import"/"clone" request that names no site or repository to bring in has nothing to import: write it as a NEW-website task under this rule, not as an import under rule 3. Exception: a user answering rule 3's create-or-import question by choosing import is asked for the repository (per that sub-bullet), never converted to a NEW-website task. Give it no acceptance criteria that ask for a finalized, verified, or live site — no "complete page implemented", no "return the live URL", no browser-verification evidence — those apply only after the user picks a design. Only after the user names one of the returned designs, create the follow-up task (or comment on the existing one) stating the exact design number the user chose; that task selects the named design. Build-out beyond selection is a separate ask — include it only when the user's message actually requested it.
   - Before creating a NEW-website task, read the company brand knowledge (`/efs/knowledge/company/brand/`) and run `kite-websites list` (conversational agents get a read-only listing). A site is a match candidate only when its `selected_iteration` is set or it has a `deployment_url` — a site whose designs were generated but never selected has no committed look to match. When at least one candidate exists and you are conversing with the user, ask one question before delegating: match the design of an existing site (name only the candidates) or go with a fresh new direction? Record the answer in the task description — including which source site, when matching. When no candidate exists, skip the question and write the task as a fresh design. As a task agent (no user channel), skip the ask too: apply the preference order below and note the applied choice in your task result. Resolve the preference in this order: the user's current message, then what they stated earlier in the conversation (no re-asking), then — when neither exists and a candidate exists — record "match <most recently updated candidate>" as the default and say so where you report (chat reply or task result).
7. Never report delegation as complete unless the command returned task JSON with an `id`.
