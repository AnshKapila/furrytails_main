import { getCdnPurgeStatus } from '@/lib/cdn-purge-status';

export async function GET() {
  // cdnPurge reports what src/instrumentation.ts did when this process started.
  // hPanel does not expose the runtime log, so this endpoint is the only way to
  // see whether the CDN purge - the safety net against Hostinger serving stale
  // HTML that 404s the stylesheet - is actually working.
  //
  // null means register() never ran in this process, which is itself the
  // finding: instrumentation is not wired up.
  return Response.json({
    app: 'ok',
    at: Date.now(),
    cdnPurge: getCdnPurgeStatus() ?? { at: null, ok: false, detail: 'instrumentation did not run' },
  });
}
