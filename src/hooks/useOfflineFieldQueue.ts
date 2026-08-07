import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { flushBufferedAudit, logUnpAudit } from '@/lib/unp/audit';
import {
  decryptJson,
  encryptJson,
  getKeyMeta,
  keyRotationDue,
  rotateEncryptionKey,
  secureStoreAvailable,
} from '@/lib/unp/secureStore';
import {
  createIntegrityStamp,
  INTEGRITY_REASON_LABELS,
  verifyIntegrity,
  type IntegrityStamp,
} from '@/lib/unp/integrity';

const STORAGE_KEY = 'unp_field_queue_v2';
const LEGACY_STORAGE_KEY = 'unp_field_queue_v1';

export interface QueuedFieldReport {
  localId: string;
  createdAt: string;
  attempts: number;
  lastError?: string;
  rejected?: boolean;
  photoDataUrl?: string | null;
  integrity?: IntegrityStamp;
  payload: {
    title: string;
    report_date: string;
    submitted_by: string | null;
    district: string | null;
    village: string | null;
    latitude: number | null;
    longitude: number | null;
    project_id: string | null;
    findings: string | null;
    challenges: string | null;
    recommendations: string | null;
    sync_status: string;
  };
}

/** Reads and decrypts the on-device queue, migrating any legacy plaintext cache. */
const read = async (): Promise<QueuedFieldReport[]> => {
  try {
    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacy) {
      localStorage.removeItem(LEGACY_STORAGE_KEY);
      const parsed = JSON.parse(legacy) as QueuedFieldReport[];
      const current = await read();
      const merged = [...current, ...parsed];
      await write(merged);
      return merged;
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const items = (await decryptJson<QueuedFieldReport[]>(raw)) ?? [];
    if (items.length && !decryptLogged) {
      decryptLogged = true;
      void logUnpAudit({
        action: 'decrypt',
        moduleId: 'field-reports',
        moduleLabel: 'Field Reports',
        description: `Decrypted ${items.length} cached field submission${items.length === 1 ? '' : 's'} on device`,
        metadata: { items: items.length, outcome: 'success', storage: 'aes-gcm-indexeddb' },
      });
    }
    return items;
  } catch (err) {
    void logUnpAudit({
      action: 'decrypt',
      moduleId: 'field-reports',
      moduleLabel: 'Field Reports',
      description: 'Failed to decrypt cached field submissions on device',
      metadata: { outcome: 'failure', error: err instanceof Error ? err.message : 'Unknown error' },
    });
    return [];
  }
};

/** Encrypts the queue (reports + GPS + photo evidence) before it touches disk. */
const write = async (items: QueuedFieldReport[]) => {
  try {
    if (!items.length) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }
    localStorage.setItem(STORAGE_KEY, await encryptJson(items));
    void logUnpAudit({
      action: 'encrypt',
      moduleId: 'field-reports',
      moduleLabel: 'Field Reports',
      description: `Encrypted ${items.length} field submission${items.length === 1 ? '' : 's'} at rest on device`,
      metadata: { items: items.length, outcome: 'success', storage: 'aes-gcm-indexeddb' },
    });
  } catch (err) {
    // storage full or crypto unavailable — keep in-memory state only
    void logUnpAudit({
      action: 'encrypt',
      moduleId: 'field-reports',
      moduleLabel: 'Field Reports',
      description: 'Failed to encrypt field submissions on device',
      metadata: { items: items.length, outcome: 'failure', error: err instanceof Error ? err.message : 'Unknown error' },
    });
  }
};

let decryptLogged = false;

const dataUrlToBlob = async (dataUrl: string) => (await fetch(dataUrl)).blob();

/**
 * Offline-first queue for field data collection.
 * Reports are encrypted at rest (AES-GCM, non-extractable key in IndexedDB) and
 * pushed to Supabase as soon as connectivity is available.
 */
export const useOfflineFieldQueue = () => {
  const [queue, setQueue] = useState<QueuedFieldReport[]>([]);
  const [online, setOnline] = useState<boolean>(() => navigator.onLine);
  const [syncing, setSyncing] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [encrypted] = useState(() => secureStoreAvailable());

  const persist = useCallback(async (items: QueuedFieldReport[]) => {
    setQueue(items);
    await write(items);
  }, []);

  const refresh = useCallback(async () => {
    setQueue(await read());
  }, []);

  const enqueue = useCallback(
    async (report: Omit<QueuedFieldReport, 'localId' | 'createdAt' | 'attempts'>) => {
      const item: QueuedFieldReport = {
        ...report,
        localId: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        attempts: 0,
        integrity: await createIntegrityStamp(report.payload, report.photoDataUrl),
      };
      await persist([...(await read()), item]);
      return item;
    },
    [persist]
  );

  const remove = useCallback(
    async (localId: string) => persist((await read()).filter((i) => i.localId !== localId)),
    [persist]
  );

  const sync = useCallback(async (): Promise<{ synced: number; failed: number; rejected: number }> => {
    if (!navigator.onLine) return { synced: 0, failed: 0, rejected: 0 };
    const pending = await read();
    if (!pending.length) return { synced: 0, failed: 0, rejected: 0 };

    setSyncing(true);
    let synced = 0;
    let failed = 0;
    let rejected = 0;
    const remaining: QueuedFieldReport[] = [];

    for (const item of pending) {
      // Integrity gate: never upload a cached submission that no longer matches
      // the fingerprint taken when it was captured in the field.
      const integrity = await verifyIntegrity(item.integrity, item.payload, item.photoDataUrl);
      if (!integrity.ok) {
        rejected += 1;
        remaining.push({
          ...item,
          rejected: true,
          lastError: INTEGRITY_REASON_LABELS[integrity.reason],
        });
        void logUnpAudit({
          action: 'integrity_failed',
          moduleId: 'field-reports',
          moduleLabel: 'Field Reports',
          recordLabel: item.payload.title,
          description: `Field submission "${item.payload.title}" rejected during sync: ${INTEGRITY_REASON_LABELS[integrity.reason]}`,
          metadata: {
            outcome: 'rejected',
            reason: integrity.reason,
            local_id: item.localId,
            queued_at: item.createdAt,
            expected_hash: integrity.expected ?? null,
            actual_hash: integrity.actual ?? null,
          },
        });
        continue;
      }

      try {
        let photoUrl: string | null = null;
        if (item.photoDataUrl) {
          const blob = await dataUrlToBlob(item.photoDataUrl);
          const path = `field-reports/${item.localId}.jpg`;
          const { error: upErr } = await supabase.storage
            .from('uploads')
            .upload(path, blob, { contentType: 'image/jpeg', upsert: true });
          if (!upErr) {
            photoUrl = supabase.storage.from('uploads').getPublicUrl(path).data.publicUrl;
          }
        }

        const { error } = await supabase
          .from('unp_field_reports')
          .insert({ ...item.payload, photo_url: photoUrl, sync_status: 'synced' });

        if (error) throw error;
        synced += 1;
        void logUnpAudit({
          action: 'sync',
          moduleId: 'field-reports',
          moduleLabel: 'Field Reports',
          recordLabel: item.payload.title,
          description: `Field submission "${item.payload.title}" synced successfully`,
          metadata: {
            outcome: 'success',
            integrity_hash: integrity.hash,
            local_id: item.localId,
            attempts: item.attempts + 1,
            queued_at: item.createdAt,
            has_photo: Boolean(item.photoDataUrl),
            latitude: item.payload.latitude,
            longitude: item.payload.longitude,
          },
        });
      } catch (err) {
        failed += 1;
        void logUnpAudit({
          action: 'sync_failed',
          moduleId: 'field-reports',
          moduleLabel: 'Field Reports',
          recordLabel: item.payload.title,
          description: `Field submission "${item.payload.title}" failed to sync`,
          metadata: {
            outcome: 'failure',
            local_id: item.localId,
            attempts: item.attempts + 1,
            queued_at: item.createdAt,
            error: err instanceof Error ? err.message : 'Unknown error',
          },
        });
        remaining.push({
          ...item,
          rejected: false,
          attempts: item.attempts + 1,
          lastError: err instanceof Error ? err.message : 'Unknown error',
        });
      }
    }

    await persist(remaining);
    setSyncing(false);
    await flushBufferedAudit();
    if (synced > 0) {
      setLastSyncedAt(new Date().toISOString());
      void logUnpAudit({
        action: 'sync',
        moduleId: 'field-reports',
        moduleLabel: 'Field Reports',
        description: `Synced ${synced} offline field report${synced === 1 ? '' : 's'}`,
        metadata: { synced, failed, rejected },
      });
    }
    return { synced, failed, rejected };
  }, [persist]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    const goOnline = () => {
      setOnline(true);
      void flushBufferedAudit();
      void sync();
    };
    const goOffline = () => setOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    if (navigator.onLine) void sync();
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, [sync]);

  return { queue, online, syncing, lastSyncedAt, encrypted, enqueue, remove, sync, refresh };
};
