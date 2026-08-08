/**
 * Configuration for the offline field queue's device encryption key rotation.
 *
 * The interval is operator-configurable but always clamped to safe bounds: too
 * short and field devices churn keys (and risk interrupted re-encryption on
 * flaky connections), too long and a compromised device key stays valid for an
 * unacceptable window.
 */

const DAY_MS = 24 * 60 * 60 * 1000;

/** Shortest allowed rotation interval: 1 day. */
export const MIN_KEY_ROTATION_INTERVAL_MS = 1 * DAY_MS;

/** Longest allowed rotation interval: 180 days. */
export const MAX_KEY_ROTATION_INTERVAL_MS = 180 * DAY_MS;

/** Default rotation interval when nothing is configured: 30 days. */
export const DEFAULT_KEY_ROTATION_INTERVAL_MS = 30 * DAY_MS;

/** localStorage key holding the operator override (milliseconds). */
export const KEY_ROTATION_INTERVAL_STORAGE_KEY = 'unp_key_rotation_interval_ms';

/** Convenience presets surfaced in the field UI. */
export const KEY_ROTATION_PRESETS: { label: string; days: number }[] = [
  { label: 'Every 7 days', days: 7 },
  { label: 'Every 14 days', days: 14 },
  { label: 'Every 30 days (default)', days: 30 },
  { label: 'Every 60 days', days: 60 },
  { label: 'Every 90 days', days: 90 },
];

/** Clamps any requested interval into the safe range. */
export const clampRotationInterval = (ms: number): number => {
  if (!Number.isFinite(ms) || ms <= 0) return DEFAULT_KEY_ROTATION_INTERVAL_MS;
  return Math.min(MAX_KEY_ROTATION_INTERVAL_MS, Math.max(MIN_KEY_ROTATION_INTERVAL_MS, Math.round(ms)));
};

export const daysToMs = (days: number) => days * DAY_MS;
export const msToDays = (ms: number) => Math.round((ms / DAY_MS) * 10) / 10;

/** Reads the configured interval, falling back to the default. */
export const getKeyRotationInterval = (): number => {
  try {
    const raw = localStorage.getItem(KEY_ROTATION_INTERVAL_STORAGE_KEY);
    if (!raw) return DEFAULT_KEY_ROTATION_INTERVAL_MS;
    return clampRotationInterval(Number(raw));
  } catch {
    return DEFAULT_KEY_ROTATION_INTERVAL_MS;
  }
};

/** Persists a new interval (clamped) and returns the value actually stored. */
export const setKeyRotationInterval = (ms: number): { intervalMs: number; clamped: boolean } => {
  const intervalMs = clampRotationInterval(ms);
  try {
    localStorage.setItem(KEY_ROTATION_INTERVAL_STORAGE_KEY, String(intervalMs));
  } catch {
    // best-effort; in-memory default still applies
  }
  return { intervalMs, clamped: intervalMs !== Math.round(ms) };
};
