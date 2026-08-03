import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { logUnpAudit } from '@/lib/unp/audit';

const STORAGE_KEY = 'unp_field_queue_v1';

export interface QueuedFieldReport {
  localId: string;
  createdAt: string;
  attempts: number;
  lastError?: string;
  photoDataUrl?: string | null;
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

const read = (): QueuedFieldReport[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as QueuedFieldReport[]) : [];
  } catch {
    return [];
  }
};

const write = (items: QueuedFieldReport[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // storage full — keep in-memory state only
  }
};

const dataUrlToBlob = async (dataUrl: string) => (await fetch(dataUrl)).blob();

/**
 * Offline-first queue for field data collection.
 * Reports are persisted to localStorage immediately and pushed to Supabase
 * as soon as connectivity is available.
 */
export const useOfflineFieldQueue = () => {
  const [queue, setQueue] = useState<QueuedFieldReport[]>(() => read());
  const [online, setOnline] = useState<boolean>(() => navigator.onLine);
  const [syncing, setSyncing] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);

  const persist = useCallback((items: QueuedFieldReport[]) => {
    setQueue(items);
    write(items);
  }, []);

  const enqueue = useCallback(
    (report: Omit<QueuedFieldReport, 'localId' | 'createdAt' | 'attempts'>) => {
      const item: QueuedFieldReport = {
        ...report,
        localId: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        attempts: 0,
      };
      persist([...read(), item]);
      return item;
    },
    [persist]
  );

  const remove = useCallback(
    (localId: string) => persist(read().filter((i) => i.localId !== localId)),
    [persist]
  );

  const sync = useCallback(async (): Promise<{ synced: number; failed: number }> => {
    if (!navigator.onLine) return { synced: 0, failed: 0 };
    const pending = read();
    if (!pending.length) return { synced: 0, failed: 0 };

    setSyncing(true);
    let synced = 0;
    let failed = 0;
    const remaining: QueuedFieldReport[] = [];

    for (const item of pending) {
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
      } catch (err) {
        failed += 1;
        remaining.push({
          ...item,
          attempts: item.attempts + 1,
          lastError: err instanceof Error ? err.message : 'Unknown error',
        });
      }
    }

    persist(remaining);
    setSyncing(false);
    if (synced > 0) {
      setLastSyncedAt(new Date().toISOString());
      void logUnpAudit({
        action: 'sync',
        moduleId: 'field-reports',
        moduleLabel: 'Field Reports',
        description: `Synced ${synced} offline field report${synced === 1 ? '' : 's'}`,
        metadata: { synced, failed },
      });
    }
    return { synced, failed };
  }, [persist]);

  useEffect(() => {
    const goOnline = () => {
      setOnline(true);
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

  return { queue, online, syncing, lastSyncedAt, enqueue, remove, sync, refresh: () => setQueue(read()) };
};
