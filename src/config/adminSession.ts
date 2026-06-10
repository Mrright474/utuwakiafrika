/**
 * Admin session security configuration.
 * All values are client-side defense-in-depth. Real authorization lives in
 * Supabase RLS + `has_role()`.
 */

const MIN = 60 * 1000;

/** Inactivity before forced sign-out. */
export const IDLE_TIMEOUT_MS = 15 * MIN;

/** How long before timeout to show the "still there?" warning dialog. */
export const IDLE_WARNING_MS = 2 * MIN;

/** Max age of last successful TOTP verification before a sensitive
 *  admin action requires a fresh TOTP. */
export const SENSITIVE_AAL2_MAX_AGE_MS = 5 * MIN;

/** sessionStorage keys. Using sessionStorage (not localStorage) so closing
 *  the tab always forces fresh AAL2. */
export const SS_KEYS = {
  lastActivityAt: 'utu.admin.lastActivityAt',
  lastAal2VerifiedAt: 'utu.admin.lastAal2VerifiedAt',
} as const;
