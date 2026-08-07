/**
 * End-to-end integrity verification for offline field submissions.
 *
 * Every queued submission is fingerprinted with a SHA-256 digest over a
 * canonical (key-sorted) JSON representation of its payload plus any photo
 * evidence. The digest is re-computed just before upload: if the stored cache
 * was tampered with on the device, the digests diverge and the submission is
 * rejected instead of being pushed to the server.
 */

export const INTEGRITY_ALGO = 'SHA-256' as const;
export const INTEGRITY_VERSION = 'i1' as const;

export interface IntegrityStamp {
  version: string;
  algo: string;
  hash: string;
  hashedAt: string;
}

/** Deterministic JSON: object keys sorted so hashing is stable across runs. */
const canonicalize = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === 'object') {
    return Object.keys(value as Record<string, unknown>)
      .sort()
      .reduce<Record<string, unknown>>((acc, key) => {
        acc[key] = canonicalize((value as Record<string, unknown>)[key]);
        return acc;
      }, {});
  }
  return value;
};

const toHex = (buf: ArrayBuffer) =>
  Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

/** Computes the integrity digest for a submission payload + photo evidence. */
export const computeIntegrityHash = async (
  payload: unknown,
  photoDataUrl?: string | null
): Promise<string> => {
  const body = JSON.stringify({
    v: INTEGRITY_VERSION,
    payload: canonicalize(payload),
    photo: photoDataUrl ?? null,
  });
  const digest = await crypto.subtle.digest(INTEGRITY_ALGO, new TextEncoder().encode(body));
  return toHex(digest);
};

/** Creates a stamp to store alongside the queued submission. */
export const createIntegrityStamp = async (
  payload: unknown,
  photoDataUrl?: string | null
): Promise<IntegrityStamp> => ({
  version: INTEGRITY_VERSION,
  algo: INTEGRITY_ALGO,
  hash: await computeIntegrityHash(payload, photoDataUrl),
  hashedAt: new Date().toISOString(),
});

export type IntegrityFailureReason =
  | 'missing_stamp'
  | 'unsupported_version'
  | 'hash_mismatch'
  | 'unavailable';

export interface IntegrityResult {
  ok: boolean;
  hash?: string;
  reason?: IntegrityFailureReason;
  expected?: string;
  actual?: string;
}

/** Verifies a queued submission against its stored stamp. */
export const verifyIntegrity = async (
  stamp: IntegrityStamp | undefined,
  payload: unknown,
  photoDataUrl?: string | null
): Promise<IntegrityResult> => {
  if (typeof crypto === 'undefined' || !crypto.subtle) return { ok: false, reason: 'unavailable' };
  if (!stamp?.hash) return { ok: false, reason: 'missing_stamp' };
  if (stamp.version !== INTEGRITY_VERSION || stamp.algo !== INTEGRITY_ALGO) {
    return { ok: false, reason: 'unsupported_version' };
  }
  const actual = await computeIntegrityHash(payload, photoDataUrl);
  if (actual !== stamp.hash) {
    return { ok: false, reason: 'hash_mismatch', expected: stamp.hash, actual };
  }
  return { ok: true, hash: actual };
};

export const INTEGRITY_REASON_LABELS: Record<
  Exclude<IntegrityResult, { ok: true }>['reason'],
  string
> = {
  missing_stamp: 'No integrity fingerprint was stored with this submission',
  unsupported_version: 'Integrity fingerprint uses an unsupported format',
  hash_mismatch: 'Cached submission was modified after it was saved',
  unavailable: 'This browser cannot verify submission integrity',
};
