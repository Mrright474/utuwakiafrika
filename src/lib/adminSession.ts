import { SS_KEYS, SENSITIVE_AAL2_MAX_AGE_MS } from '@/config/adminSession';

const safeGet = (key: string): string | null => {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeSet = (key: string, value: string) => {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
};

const safeRemove = (key: string) => {
  try {
    sessionStorage.removeItem(key);
  } catch {
    /* ignore */
  }
};

export const markAal2Verified = (at: number = Date.now()) => {
  safeSet(SS_KEYS.lastAal2VerifiedAt, String(at));
};

export const getLastAal2VerifiedAt = (): number | null => {
  const v = safeGet(SS_KEYS.lastAal2VerifiedAt);
  if (!v) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

export const isAal2Fresh = (now: number = Date.now()): boolean => {
  const last = getLastAal2VerifiedAt();
  if (!last) return false;
  return now - last < SENSITIVE_AAL2_MAX_AGE_MS;
};

export const clearAal2Verified = () => {
  safeRemove(SS_KEYS.lastAal2VerifiedAt);
};

export const markActivity = (at: number = Date.now()) => {
  safeSet(SS_KEYS.lastActivityAt, String(at));
};

export const getLastActivityAt = (): number => {
  const v = safeGet(SS_KEYS.lastActivityAt);
  if (!v) return Date.now();
  const n = Number(v);
  return Number.isFinite(n) ? n : Date.now();
};

export const clearAdminSessionState = () => {
  safeRemove(SS_KEYS.lastActivityAt);
  safeRemove(SS_KEYS.lastAal2VerifiedAt);
};
