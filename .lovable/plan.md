# Admin Session Hardening: AAL2 Re-auth + Idle Timeout

Two layered protections for `/admin/*`:
1. **Idle timeout** — automatic sign-out after N minutes of inactivity.
2. **Sensitive-action gate** — re-verify AAL2 (fresh TOTP) before destructive/privileged actions, even if the session is already AAL2.

## 1. Configurable timeouts (`src/config/adminSession.ts`)

Single source of truth, easy to tune later:
- `IDLE_TIMEOUT_MS` — default **15 min**. Inactivity before forced sign-out.
- `IDLE_WARNING_MS` — default **2 min** before timeout. Shows warning dialog with "Stay signed in" / "Sign out".
- `SENSITIVE_AAL2_MAX_AGE_MS` — default **5 min**. Max age of the last successful TOTP verification before a sensitive action requires re-verification.

## 2. Idle timeout (`src/hooks/useAdminIdleTimeout.ts` + integration in `ProtectedAdminRoute`)

- Listens to `mousemove`, `keydown`, `click`, `scroll`, `touchstart` (throttled).
- Persists `lastActivityAt` in `sessionStorage` so multiple admin tabs share state via `storage` event.
- When idle > `IDLE_TIMEOUT_MS - IDLE_WARNING_MS`: show `IdleWarningDialog` (countdown, two buttons).
- When idle > `IDLE_TIMEOUT_MS`: call `supabase.auth.signOut({ scope: 'global' })`, clear stored AAL2 timestamp, redirect to `/admin/auth` with toast "Signed out due to inactivity."
- Hook is mounted inside `ProtectedAdminRoute` so it only runs on protected admin pages.

## 3. Sensitive-action AAL2 gate

### `src/hooks/useSensitiveAction.ts`
Returns `requireFreshAal2(action: () => Promise<void> | void)`. Logic:
1. Read `lastAal2VerifiedAt` from `sessionStorage`.
2. If `< SENSITIVE_AAL2_MAX_AGE_MS` ago → run `action()` immediately.
3. Otherwise open `<ReauthDialog />` — TOTP input that calls `supabase.auth.mfa.challengeAndVerify({ factorId })` against the user's verified TOTP factor.
4. On success: store fresh `lastAal2VerifiedAt = Date.now()`, then run `action()`.
5. On cancel/failure: do not run the action; show toast.

### `src/components/admin/ReauthDialog.tsx`
shadcn `Dialog` + 6-digit code input, "Verify" / "Cancel". Surfaces verification errors inline.

### Wiring sensitive actions
Wrap calls that mutate privileged state. Initial scope (matches existing admin surface):
- **User roles / admin promotion** — any UI that calls `promote_self_to_admin` or writes to `user_roles`.
- **Hard deletes** — destructive delete buttons in `ContentManagement`, `DepartmentsTab`, `ProjectsTab`, `StaffTab`, `SortableContentList`, `SortableTeamList`, success stories, events, volunteers.
- **MFA settings changes** in `MfaSettings.tsx` (unenroll factor).
- **CSV import** (`ImportButton.tsx`) and bulk actions (`BulkActionBar.tsx`).

Pattern at call site:
```ts
const { requireFreshAal2 } = useSensitiveAction();
const handleDelete = () => requireFreshAal2(async () => { /* existing delete */ });
```

## 4. AAL2 timestamp lifecycle

- Set `lastAal2VerifiedAt` in `sessionStorage` whenever:
  - User completes TOTP on `/admin/auth` (in `AdminAuth.tsx` after `challengeAndVerify` succeeds).
  - User completes a `ReauthDialog` verification.
- Cleared on sign-out (idle timeout, manual sign-out button, `onAuthStateChange` → `SIGNED_OUT`).

## 5. Files

**New**
- `src/config/adminSession.ts`
- `src/hooks/useAdminIdleTimeout.ts`
- `src/hooks/useSensitiveAction.ts`
- `src/components/admin/ReauthDialog.tsx`
- `src/components/admin/IdleWarningDialog.tsx`

**Edited**
- `src/components/admin/ProtectedAdminRoute.tsx` — mount idle hook + warning dialog.
- `src/pages/AdminAuth.tsx` — write `lastAal2VerifiedAt` on successful TOTP; clear on sign-out.
- `src/components/admin/MfaSettings.tsx` — gate unenroll.
- Admin tabs/components listed above — wrap destructive handlers with `requireFreshAal2`.

## Technical notes

- All client-side gating is defense-in-depth; true authorization stays in RLS + `has_role()`. No DB changes.
- `sessionStorage` (not `localStorage`) so closing the tab forces fresh AAL2.
- Activity listeners use `{ passive: true }` and a 1s throttle to avoid perf cost.
- Idle hook unmounts cleanly when leaving `/admin/*`.
- No changes to public routes or non-admin auth.
