---
name: prospect-research
description: >
  Use this skill when the task is to build a list of people matching a target
  profile, or to research and enrich named people — "build a prospect list for
  this event", "find CTOs at enterprise AI companies in New York", "get their
  work emails", "enrich these contacts", "who should we invite". Covers turning
  an ICP or event brief into a sourced, verified, fit-scored contact list with
  professional emails, and drafting per-contact messages for channels a human
  sends. For choosing which events to attend, use `conference-research`; for
  sending the emails, use `email-campaigns`; for one inbound lead that needs a
  response, use `inbound-lead-handling`.
mode: sandbox
---

# Prospect Research

Turn a target profile into an outreach-ready contact list: sourced, verified,
enriched, fit-scored.

## Inputs

Capture or infer before sourcing:

- The target profile: roles, seniority, company types, geography — from the
  task, or derived from wiki `icp/` and `positioning/` pages (see
  `wiki-management`) plus the event or campaign brief.
- List size the task needs.
- The outreach channel the list feeds — email, LinkedIn, event invites — which
  decides the required contact fields.
- Exclusions: existing customers, competitors, and opt-outs from wiki `email/`
  pages.

## Workflow

1. Write the profile as one testable sentence ("Heads of AI or CTOs at
   500+-person enterprises in the NYC area evaluating agent platforms").
   Every listed contact must pass it.
2. Source candidates. When the task names a population — an event, a community,
   a set of companies — start from named-population pages: speaker, attendee,
   and sponsor pages, member lists, company team pages, LinkedIn searches via
   `web-research`. When the task instead describes companies worth reaching
   *now*, source by signal first (see Signal-First Sourcing). Record a source
   URL per candidate. When both are thin, source from profile criteria with the
   enrichment catalog's find-and-enrich tool (see Contact Enrichment).
3. Verify identity before enriching: confirm current role and company from a
   public page, or `native:crustdata-fetch-linkedin-profile` when a LinkedIn
   URL is known. Drop candidates whose role no longer passes the profile; note
   recent title changes.
4. Enrich verified candidates in fit order, up to the list size (see Contact
   Enrichment).
5. Score fit 1-5 against the profile with a one-line reason each. Tier the
   list (primary/secondary) when it exceeds ~15 contacts.
6. Deliver per Output.

## Signal-First Sourcing

Use this when the task asks who is worth reaching *now* rather than naming a
population — "companies that just raised", "who is scaling their growth team",
"accounts showing buying intent".

1. Pick the signal that matches the profile and pull the companies:
   - `kite-research find-companies-by-signal <categories> [limit]` — e.g.
     `receives_financing` for budget, `increases_headcount_by` or
     `expands_offices_to` for scaling, `hires` for leadership change. Pass
     several as one comma-separated argument.
   - `kite-research find-companies-by-hiring <seniority> [since] [limit]` when
     the hiring itself is the signal. Narrowing is by seniority level —
     `c_level`, `vice_president`, `head`, `director`, `manager` — because the
     API has no free-text title filter.
   Both are billed per returned company, so narrow the filter before raising
   `limit`.
2. Drop stale signals yourself. `find-companies-by-signal` has **no date
   filter** — the endpoint accepts none — so it can return events of any age.
   Read each event's `found_at` and discard anything older than about 90 days:
   a signal that old is no longer a reason to reach out today.
   (`find-companies-by-hiring` does take a `since`, so pass it there — dated
   within the last year, which is as far back as that endpoint searches.)
3. Keep only companies that also pass the profile sentence. A signal is a
   reason to contact someone, never a substitute for fit.
4. Carry each company's triggering event — what happened, its date, and its
   source URL — through to the output. That event is the "why now" the outreach
   draft opens with, and it is the difference between a personalized message
   and a generic one.
5. Find the right people at those companies through the normal path: named
   pages and company team pages first, then the enrichment catalog.

## Contact Enrichment

The enrichment catalog runs through the platform-native gateway — always
available, no team connection. These are gateway tools, not shell commands or
team integrations: no `clay` binary exists in the sandbox and the
team-integrations catalog does not list Clay.

1. List the catalog's tools to find the contact find-and-enrich tool and its
   schema, then run it with `native:clay-call-tool` the same way, with the
   tool's name and arguments nested in `params` (details and error handling:
   "Platform integrations" in `tool-discovery-execution`):

   ```bash
   curl -sS -X POST "$BACKEND_API_URL/api/v1/internal/tool-gateway/tools/execute" \
     -H "Authorization: Bearer $INTERNAL_API_TOKEN" \
     -H "Content-Type: application/json" \
     -d @- << EOF
   { "team_id": "$TEAM_ID", "tool_name": "native:clay-list-tools", "params": {} }
   EOF
   ```

2. Request professional email data: include
   `dataPoints: { "contactDataPoints": [{ "type": "Email" }] }`, or the
   equivalent email data-point request for an existing search.
3. When a call fails validation naming a field the catalog description did
   not (e.g. the description says `contacts` but the error demands
   `contactIdentifiers`), trust the error: retry once with the field it
   names.
4. Mark each email `high`, `medium`, `low`, `unverified`, or `not found`.
   Never pattern-guess an email — a fabricated address bounces and burns the
   sender domain.
5. Include only professional data relevant to the business purpose. Never
   include personal emails, phone numbers, home addresses, private social
   accounts, protected attributes, or sensitive personal inferences.
6. Enrichment failure does not stop the list: after one retry, continue with
   public sources, mark affected fields
   `enrichment unavailable: <exact error>`, and name the blocker in the task
   result.

## Output

- A table, one row per contact: name, title, company, LinkedIn URL, email with
  confidence, fit score with reason, source URL. When the list came from
  Signal-First Sourcing, add a "why now" column carrying that company's
  triggering event and its date. Deliver it in the task
  result; when the task names a store (database, spreadsheet, CRM), also load
  it there via `tool-discovery-execution`.
- When the task asks for outreach on a channel the platform cannot send
  (LinkedIn DMs, warm intros): draft one message per primary contact —
  personalized from the enrichment, under 60 words, matching
  `company/brand/voice.md` — for a human to send. Sending email is
  `email-campaigns`, not this skill.

## Verification

- Every listed contact passes the profile sentence and carries a source URL.
- No email is marked above `unverified` without an enrichment result or public
  source behind it.
- The task result states list size delivered versus requested, and any
  enrichment blocker.
- An `enrichment unavailable` claim is backed by a gateway call that failed
  in this run — never by a previous run's notes or files.

## Failure Handling

- Profile underivable (no ICP in the wiki, none in the task): ask the
  delegating agent for target roles and companies; do not source against a
  guessed profile.
- Fewer qualified candidates than requested: deliver the shorter verified list
  and say why — a padded list is worse than a short one.
