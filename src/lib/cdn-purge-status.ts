// Records what the CDN purge in ``src/instrumentation.ts`` did at server start,
// so ``/api/v1/health`` can report it.
//
// The purge logs its result to stdout, but Hostinger's hPanel only surfaces the
// BUILD log - the runtime stream is not exposed - so that output is invisible in
// practice. Without this, a purge that silently stopped working (expired token,
// dropped env var, changed API) would go unnoticed until the next deploy shipped
// changed client chunks and the site painted unstyled again.
//
// Held on globalThis, not in module scope: instrumentation and the route handler
// can be bundled separately, and module-level state would then not be shared.
// globalThis is per-process either way.

export type CdnPurgeStatus = {
  at: string;
  ok: boolean;
  /**
   * Short, non-sensitive summary. /api/v1/health is public, so the API's full
   * response body is logged to stdout only and never recorded here.
   */
  detail: string;
};

const KEY = '__furrytailCdnPurge';

export function setCdnPurgeStatus(status: CdnPurgeStatus): void {
  (globalThis as Record<string, unknown>)[KEY] = status;
}

export function getCdnPurgeStatus(): CdnPurgeStatus | null {
  return ((globalThis as Record<string, unknown>)[KEY] as CdnPurgeStatus) ?? null;
}
