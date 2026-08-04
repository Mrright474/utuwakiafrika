import { supabase } from '@/integrations/supabase/client';

export type UnpAuditAction =
  | 'login'
  | 'logout'
  | 'create'
  | 'edit'
  | 'delete'
  | 'approve'
  | 'reject'
  | 'permission_change'
  | 'export'
  | 'sync'
  | 'sync_failed'
  | 'encrypt'
  | 'decrypt';

export interface UnpAuditEntry {
  action: UnpAuditAction;
  moduleId?: string;
  moduleLabel?: string;
  recordId?: string | null;
  recordLabel?: string | null;
  description?: string;
  metadata?: Record<string, unknown>;
}

export const UNP_AUDIT_ACTIONS: UnpAuditAction[] = [
  'login',
  'logout',
  'create',
  'edit',
  'delete',
  'approve',
  'reject',
  'permission_change',
  'export',
  'sync',
  'sync_failed',
  'encrypt',
  'decrypt',
];

export const AUDIT_ACTION_LABELS: Record<UnpAuditAction, string> = {
  login: 'Sign in',
  logout: 'Sign out',
  create: 'Record created',
  edit: 'Record edited',
  delete: 'Record deleted',
  approve: 'Approval granted',
  reject: 'Request rejected',
  permission_change: 'Permissions changed',
  export: 'Data exported',
  sync: 'Offline data synced',
  sync_failed: 'Offline sync failed',
  encrypt: 'Device encryption',
  decrypt: 'Device decryption',
};

const OFFLINE_BUFFER_KEY = 'unp_audit_buffer_v1';

const bufferOffline = (entry: UnpAuditEntry) => {
  try {
    const raw = localStorage.getItem(OFFLINE_BUFFER_KEY);
    const items = raw ? (JSON.parse(raw) as UnpAuditEntry[]) : [];
    items.push({ ...entry, metadata: { ...(entry.metadata ?? {}), occurred_at: new Date().toISOString(), buffered_offline: true } });
    localStorage.setItem(OFFLINE_BUFFER_KEY, JSON.stringify(items.slice(-100)));
  } catch {
    // buffer is best-effort
  }
};

/** Flushes audit events that were recorded while the device was offline. */
export const flushBufferedAudit = async (): Promise<void> => {
  let items: UnpAuditEntry[] = [];
  try {
    const raw = localStorage.getItem(OFFLINE_BUFFER_KEY);
    if (!raw) return;
    items = JSON.parse(raw) as UnpAuditEntry[];
    localStorage.removeItem(OFFLINE_BUFFER_KEY);
  } catch {
    return;
  }
  for (const item of items) await logUnpAudit(item);
};

/**
 * Records a staff action in the organisation-wide audit log.
 * Fire-and-forget: logging must never block or break the user's action.
 */
export const logUnpAudit = async (entry: UnpAuditEntry): Promise<void> => {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    bufferOffline(entry);
    return;
  }
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    let actorName: string | null = null;
    const { data: account } = await supabase
      .from('unp_staff_accounts')
      .select('first_name, last_name')
      .eq('user_id', user.id)
      .maybeSingle();
    if (account) actorName = `${account.first_name} ${account.last_name}`.trim();

    await supabase.from('unp_audit_log').insert({
      user_id: user.id,
      actor_name: actorName,
      actor_email: user.email ?? null,
      action: entry.action,
      module_id: entry.moduleId ?? null,
      module_label: entry.moduleLabel ?? null,
      record_id: entry.recordId ?? null,
      record_label: entry.recordLabel ?? null,
      description: entry.description ?? null,
      metadata: (entry.metadata ?? {}) as never,
    });
  } catch {
    bufferOffline(entry);
  }
};
