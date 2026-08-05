# Raw-endpoint fallback (no `kite-integrations` on PATH)

The CLI wraps three POST endpoints under
`$BACKEND_API_URL/api/v1/internal/tool-gateway/tools/` — `search`, `describe`,
`execute` — authed with `Authorization: Bearer $INTERNAL_API_TOKEN`. Bodies
mirror the CLI args, plus the scope field the CLI fills in for you: exactly one
of `"team_id": "$TEAM_ID"` or `"application_id": "$APPLICATION_ID"` (whichever
is set — both is rejected). On the `team_id` path also send
`-H "X-Sandbox-Session-Token: $KITE_SANDBOX_TOKEN"` — the gateway binds the call
to your session's own team and returns 403 for a `team_id` that isn't yours; the
`application_id` path omits this header:

```bash
curl -sS -X POST "$BACKEND_API_URL/api/v1/internal/tool-gateway/tools/execute" \
  -H "Authorization: Bearer $INTERNAL_API_TOKEN" \
  -H "X-Sandbox-Session-Token: $KITE_SANDBOX_TOKEN" \
  -H "Content-Type: application/json" \
  -d @- << EOF
{
  "team_id": "$TEAM_ID",
  "tool_name": "composio:NOTION_CREATE_PAGE",
  "params": { "parent_page_id": "…", "title": "Weekly update" }
}
EOF
```

`search` takes optional `"query"` and `"app"`; `describe` takes `"tool_name"`.
Use `<<EOF` so scope variables expand in the JSON body; a quoted terminator
would send the literal string `"$TEAM_ID"` and cause a 422 UUID-parse error.

Response: `{ "tool_name": "…", "status": "success", "result": {…}, "latency_ms": 1843 }`. For `composio:*` tools the provider's return value is nested in `result.data`; for `pipedream:*` tools it is nested in `result.ret`; `native:*` tools return their own result shape directly in `result`. Native Slack and GitHub use the `kite-slack` / `kite-github` CLIs (`references/slack.md`, `references/github.md`).
