import { supabase } from '@/integrations/supabase/client';

/**
 * Record a sensitive admin action in the audit log.
 * Fire-and-forget: failures are logged but never block the action.
 */
export async function logAdminAction(
  action: string,
  metadata?: Record<string, unknown>,
): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.warn('[audit] skipped — no authenticated user', { action });
      return;
    }
    const { error } = await supabase.from('admin_audit_log').insert({
      user_id: user.id,
      action,
      metadata: metadata ?? null,
    });
    if (error) {
      console.error('[audit] failed to record action', action, error);
    }
  } catch (err) {
    console.error('[audit] unexpected error', action, err);
  }
}
