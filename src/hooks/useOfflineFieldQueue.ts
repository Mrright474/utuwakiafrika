import { useCallback, useEffect, useRef, useState } from 'react';
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
/** Exponential backoff between failed key-rotation attempts (capped at 1h). */
const ROTATION_BACKOFF_MS = [30 * 1000, 2 * 60 * 1000, 10 * 60 * 1000, 30 * 60 * 1000, 60 * 60 * 1000];
const MAX_ROTATION_ATTEMPTS = ROTATION_BACKOFF_MS.length;

export const useOfflineFieldQueue = () => {
  const [queue, setQueue] = useState<QueuedFieldReport[]>([]);
  const [online, setOnline] = useState<boolean>(() => navigator.onLine);
  const [syncing, setSyncing] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [encrypted] = useState(() => secureStoreAvailable());
  const [keyGeneration, setKeyGeneration] = useState<number | null>(null);
  const [keyRotatedAt, setKeyRotatedAt] = useState<string | null>(null);
  const [rotationError, setRotationError] = useState<string | null>(null);
  const [rotationAttempts, setRotationAttempts] = useState(0);
  const [rotationRetryAt, setRotationRetryAt] = useState<string | null>(null);
  const [rotationIntervalMs, setRotationIntervalMsState] = useState(() => getKeyRotationInterval());
  const rotating = useRef(false);
  const retryTimer = useRef<number | null>(null);
  const attemptsRef = useRef(0);

  /** Updates the rotation schedule, clamped to the safe min/max bounds. */
  const setRotationIntervalDays = useCallback((days: number) => {
    const { intervalMs, clamped } = setKeyRotationInterval(daysToMs(days));
    setRotationIntervalMsState(intervalMs);
    return { intervalMs, clamped };
  }, []);



  const persist = useCallback(async (items: QueuedFieldReport[]) => {
    setQueue(items);
    await write(items);
  }, []);

  const refresh = useCallback(async () => {
    setQueue(await read());
  }, []);

  /**
   * Rotates the device encryption key and re-encrypts every queued item under
   * the new generation. Old key material is only discarded after the rewrite
   * succeeds, so a pending submission can never become unreadable. Failures are
   * retried with exponential backoff and recorded in the audit log.
   */
  const rotateKey = useCallback(
    async (force = false) => {
      if (!secureStoreAvailable() || rotating.current) return;
      if (!force && !(await keyRotationDue())) return;
      if (force) {
        attemptsRef.current = 0;
        setRotationAttempts(0);
      }
      rotating.current = true;
      const outcome = await rotateEncryptionKey(async () => {
        const items = await read(); // decrypted with the retired key
        await write(items); // re-encrypted with the new active key
        setQueue(items);
        return items.length;
      });
      rotating.current = false;

      const meta = await getKeyMeta();
      setKeyGeneration(meta?.generation ?? null);
      setKeyRotatedAt(meta?.createdAt ?? null);

      if (outcome.rotated) {
        attemptsRef.current = 0;
        setRotationAttempts(0);
        setRotationError(null);
        setRotationRetryAt(null);
        if (retryTimer.current) {
          window.clearTimeout(retryTimer.current);
          retryTimer.current = null;
        }
      } else if (outcome.stage !== 'unavailable') {
        // Schedule a backed-off retry; key material for every generation is
        // retained meanwhile so queued submissions stay readable.
        const attempt = Math.min(attemptsRef.current + 1, MAX_ROTATION_ATTEMPTS);
        attemptsRef.current = attempt;
        setRotationAttempts(attempt);
        setRotationError(outcome.error ?? 'Key rotation failed');
        const delay = ROTATION_BACKOFF_MS[attempt - 1];
        const retryAt = new Date(Date.now() + delay).toISOString();
        setRotationRetryAt(retryAt);
        if (retryTimer.current) window.clearTimeout(retryTimer.current);
        retryTimer.current = window.setTimeout(() => {
          retryTimer.current = null;
          void rotateKey(true);
        }, delay);
      }

      void logUnpAudit({
        action: outcome.rotated ? 'encrypt' : 'sync_failed',
        moduleId: 'field-reports',
        moduleLabel: 'Field Reports',
        description: outcome.rotated
          ? `Rotated device encryption key (generation ${outcome.from} → ${outcome.to}) and re-encrypted ${outcome.reEncrypted} queued submission${outcome.reEncrypted === 1 ? '' : 's'}`
          : `Device encryption key rotation failed at "${outcome.stage}" stage: ${outcome.error ?? 'Unknown error'}${outcome.rolledBack ? ' — active key rolled back to previous generation' : ''}`,
        metadata: {
          event: 'key_rotation',
          outcome: outcome.rotated ? 'success' : 'failure',
          stage: outcome.stage,
          from_generation: outcome.from ?? null,
          to_generation: outcome.to ?? null,
          re_encrypted: outcome.reEncrypted ?? 0,
          forced: force,
          error: outcome.error ?? null,
          rolled_back: outcome.rolledBack ?? false,
          retained_generations: outcome.retained ?? [],
          data_safe: outcome.dataSafe ?? null,
          attempt: outcome.rotated ? 0 : attemptsRef.current,
          queued_items: (await read()).length,
        },
      });
      return outcome;
    },
    []
  );


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

  // Scheduled key rotation: check on mount, then hourly while the app is open.
  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      if (cancelled) return;
      const meta = await getKeyMeta();
      if (cancelled) return;
      setKeyGeneration(meta?.generation ?? null);
      setKeyRotatedAt(meta?.createdAt ?? null);
      await rotateKey();
    };
    void check();
    const timer = window.setInterval(() => void check(), 60 * 60 * 1000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
      if (retryTimer.current) {
        window.clearTimeout(retryTimer.current);
        retryTimer.current = null;
      }
    };
  }, [rotateKey]);


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

  return {
    queue,
    online,
    syncing,
    lastSyncedAt,
    encrypted,
    keyGeneration,
    keyRotatedAt,
    rotationError,
    rotationAttempts,
    rotationRetryAt,

    rotateKey,
    enqueue,
    remove,
    sync,
    refresh,
  };
};
