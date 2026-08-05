# Recipe: Slack (`kite-slack`)

Slack posting goes through the platform-native Kite bot, not the team's generic integration provider, so it works without a broker connection — but it does require the team to have installed the Kite Slack bot from Team settings. The `kite-slack` CLI calls the tool gateway for you (scope, token, and URL are resolved from the env).

## Send a message

Put generated message text in a quoted-heredoc file so newlines, dollar signs, and other shell characters arrive unchanged:

```bash
message_file=$(mktemp)
cat >"$message_file" <<'EOF'
*Weekly update*

Rankings improved for 12 keywords.
EOF
kite-slack send "#general" --text-file "$message_file"
rm -f "$message_file"
```

To reply inside an existing thread, pass the thread timestamp after the text file:

```bash
message_file=$(mktemp)
cat >"$message_file" <<'EOF'
Following up here 👇
EOF
kite-slack send "#general" --text-file "$message_file" "1718900000.123456"
rm -f "$message_file"
```

- `channel` — channel id (`C…`) or name (`#general`); both work for posting.
- `text` — the message. Use `--text-file <path>` for generated text; the positional form remains available for short static text.
- `thread_ts` *(optional)* — reply inside an existing thread instead of posting a new message.
- The message is attributed to **Kite** (the bot), not to a person. The result returns the posted message's `channel` and `ts`.
- `409 provider_not_connected` means the team hasn't installed the Kite Slack bot — tell the user to connect Slack in **Team settings**.
- `502 provider_error` with `Slack rejected the message: not_in_channel` (or `channel_not_found`) and `retryable: false` means the Kite bot isn't in that channel — tell the user to invite **@Kite** to it (`/invite @Kite` in Slack). Don't retry; it won't change until the bot is invited.

## Check channel access first (`kite-slack channel`)

When the user asks whether Kite can post somewhere, or before posting to a channel you're not confident the bot can reach, check it — never send a test message to find out:

```bash
kite-slack channel "#team-marketing"
```

Returns `{ channel_id, name, exists, is_member, is_private }`:

- `exists: true` — the channel is visible to the bot. `is_member: false` on a **public** channel is fine: the bot can post to any public channel without joining. On a private channel (`is_private: true`), `is_member` must be true to post.
- `exists: false` — no channel by that id/name is visible to the bot: either a typo, or a private channel the bot isn't in. If the user says the channel exists, ask them to run `/invite @Kite` in it, then check again.
- **Private channels can't be found by name** (the name lookup covers public channels only), so `exists: false` for a name the user insists on may be a private channel the bot is *already* in. Check it by channel id (`C…`/`G…`) if you have one; otherwise, once the user confirms the bot was invited, send directly — a `not_in_channel` error will still tell you if they were wrong.

## Change a channel's reply mode (`kite-slack reply-mode`)

Run this command whenever someone asks you to stop replying in a channel unless explicitly tagged (`tagged_only`), or to resume auto-replying in threads you're tagged into or started (`auto`). The ask is only fulfilled by running it — an acknowledgment without the command changes nothing:

```bash
kite-slack reply-mode "#team-marketing" tagged_only
```

- `mode` — `tagged_only` (act only on explicit @mentions) or `auto` (the default: follow threads you're tagged into or started and reply when relevant).
- Private channels resolve by id (`C…`/`G…`) only, same as the access check above.
- After it succeeds, confirm in one line what the channel now does (e.g. "Done — I'll only reply here when tagged."). Don't explain the modes or repeat the command.
