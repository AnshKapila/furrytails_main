import { getCdnPurgeStatus } from '@/lib/cdn-purge-status';

export async function GET() {
  // cdnPurge reports what src/instrumentation.ts did when this process started.
  // hPanel does not expose the runtime log, so this endpoint is the only way to
  // see whether the CDN purge - the safety net against Hostinger serving stale
  // HTML that 404s the stylesheet - is actually working.
  //
  // "instrumentation did not run" now means register() was genuinely never
  // called by the runtime, since it records a marker before any guard.
  const cdnPurge = getCdnPurgeStatus() ?? {
    at: null,
    ok: false,
    detail: 'instrumentation did not run',
  };

  // Read independently of instrumentation, so a missing var can be told apart
  // from instrumentation never running. Booleans only - never the values.
  const purgeEnv = {
    token: Boolean(process.env.HOSTINGER_API_TOKEN),
    username: Boolean(process.env.HOSTINGER_ACCOUNT_USERNAME),
    domain: Boolean(process.env.HOSTINGER_PURGE_DOMAIN),
    nodeEnv: process.env.NODE_ENV ?? 'unset',
  };

  return Response.json({ app: 'ok', at: Date.now(), cdnPurge, purgeEnv });
}
