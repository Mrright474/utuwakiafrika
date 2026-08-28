/**
 * DEV-ONLY harness: simulates the offline field pipeline
 * encrypt → queue → integrity verify → sync → audit
 * without requiring a staff login or a live Supabase session.
 *
 * It uses the REAL crypto (`secureStore`) and REAL integrity (`integrity`)
 * modules; only the network (Supabase insert) and the audit sink are stubbed
 * locally, so what you see mirrors production behaviour end-to-end minus the
 * server write. This route is only mounted when `import.meta.env.DEV` is true.
 */
import { useCallback, useEffect, useState } from 'react';
import SEO from '@/components/seo/SEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AUDIT_ACTION_LABELS, type UnpAuditAction, type UnpAuditEntry } from '@/lib/unp/audit';
import {
  encryptJson,
  decryptJson,
  getKeyMeta,
  rotateEncryptionKey,
  secureStoreAvailable,
} from '@/lib/unp/secureStore';
import {
  createIntegrityStamp,
  verifyIntegrity,
  INTEGRITY_REASON_LABELS,
  type IntegrityStamp,
} from '@/lib/unp/integrity';
import { Wifi, WifiOff, ShieldCheck, RefreshCw, Trash2, Bug, KeyRound } from 'lucide-react';

const QUEUE_KEY = 'unp_dev_harness_queue_v1';

interface HarnessPayload {
  title: string;
  report_date: string;
  district: string;
  findings: string;
  latitude: number | null;
  longitude: number | null;
}

interface HarnessItem {
  localId: string;
  createdAt: string;
  attempts: number;
  rejected?: boolean;
  lastError?: string;
  integrity: IntegrityStamp;
  payload: HarnessPayload;
}

interface AuditRow extends UnpAuditEntry {
  id: string;
  at: string;
  buffered: boolean;
}

const actionVariant = (action: UnpAuditAction) => {
  if (['delete', 'reject', 'sync_failed', 'integrity_failed'].includes(action)) return 'destructive' as const;
  if (['approve', 'create', 'sync'].includes(action)) return 'default' as const;
  return 'secondary' as const;
};

const OfflineHarness = () => {
  const [online, setOnline] = useState(true);
  const [queue, setQueue] = useState<HarnessItem[]>([]);
  const [envelope, setEnvelope] = useState<string | null>(null);
  const [audit, setAudit] = useState<AuditRow[]>([]);
  const [buffer, setBuffer] = useState<AuditRow[]>([]);
  const [keyGen, setKeyGen] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState<HarnessPayload>({
    title: 'Test borehole assessment',
    report_date: new Date().toISOString().slice(0, 10),
    district: 'Kampala',
    findings: 'Pump operational, community trained on maintenance.',
    latitude: 0.3476,
    longitude: 32.5825,
  });

  const available = secureStoreAvailable();

  /** Mirrors `logUnpAudit`: buffers locally while "offline", flushes on reconnect. */
  const log = useCallback(
    (entry: UnpAuditEntry, isOnline: boolean) => {
      const row: AuditRow = {
        ...entry,
        id: crypto.randomUUID(),
        at: new Date().toISOString(),
        buffered: !isOnline,
      };
      if (isOnline) setAudit((a) => [row, ...a]);
      else setBuffer((b) => [...b, row]);
    },
    []
  );

  const refreshKey = useCallback(async () => {
    const meta = await getKeyMeta();
    setKeyGen(meta?.generation ?? null);
  }, []);

  const readQueue = useCallback(async (): Promise<HarnessItem[]> => {
    const raw = localStorage.getItem(QUEUE_KEY);
    if (!raw) return [];
    return (await decryptJson<HarnessItem[]>(raw)) ?? [];
  }, []);

  const writeQueue = useCallback(
    async (items: HarnessItem[], isOnline: boolean) => {
      if (!items.length) {
        localStorage.removeItem(QUEUE_KEY);
        setEnvelope(null);
      } else {
        const env = await encryptJson(items);
        localStorage.setItem(QUEUE_KEY, env);
        setEnvelope(env);
        log(
          {
            action: 'encrypt',
            moduleId: 'field-reports',
            moduleLabel: 'Field Reports',
            description: `Encrypted ${items.length} field submission${items.length === 1 ? '' : 's'} at rest on device`,
            metadata: { items: items.length, outcome: 'success', storage: 'aes-gcm-indexeddb' },
          },
          isOnline
        );
      }
      setQueue(items);
    },
    [log]
  );

  useEffect(() => {
    void (async () => {
      await refreshKey();
      const raw = localStorage.getItem(QUEUE_KEY);
      setEnvelope(raw);
      setQueue(await readQueue());
    })();
  }, [readQueue, refreshKey]);

  const submit = async () => {
    setBusy(true);
    const item: HarnessItem = {
      localId: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      attempts: 0,
      integrity: await createIntegrityStamp(form, null),
      payload: { ...form },
    };
    await writeQueue([...(await readQueue()), item], online);
    setBusy(false);
  };

  /** Rewrites the encrypted cache with a mutated payload but the original stamp. */
  const tamper = async () => {
    const items = await readQueue();
    if (!items.length) return;
    items[0] = { ...items[0], payload: { ...items[0].payload, findings: 'TAMPERED CONTENT' } };
    localStorage.setItem(QUEUE_KEY, await encryptJson(items));
    setEnvelope(localStorage.getItem(QUEUE_KEY));
    setQueue(items);
  };

  const sync = async (force = false) => {
    if (!online && !force) return;

    setBusy(true);
    const pending = await readQueue();
    const remaining: HarnessItem[] = [];
    let synced = 0;
    let rejected = 0;

    for (const item of pending) {
      const result = await verifyIntegrity(item.integrity, item.payload, null);
      if (!result.ok) {
        rejected += 1;
        remaining.push({ ...item, rejected: true, lastError: INTEGRITY_REASON_LABELS[result.reason!] });
        log(
          {
            action: 'integrity_failed',
            moduleId: 'field-reports',
            moduleLabel: 'Field Reports',
            recordLabel: item.payload.title,
            description: `Field submission "${item.payload.title}" rejected during sync: ${INTEGRITY_REASON_LABELS[result.reason!]}`,
            metadata: {
              outcome: 'rejected',
              reason: result.reason,
              expected_hash: result.expected ?? null,
              actual_hash: result.actual ?? null,
            },
          },
          true
        );
        continue;
      }
      // Stubbed server write (no Supabase call in the harness).
      await new Promise((r) => setTimeout(r, 120));
      synced += 1;
      log(
        {
          action: 'sync',
          moduleId: 'field-reports',
          moduleLabel: 'Field Reports',
          recordLabel: item.payload.title,
          description: `Field submission "${item.payload.title}" synced successfully`,
          metadata: {
            outcome: 'success',
            integrity_hash: result.hash,
            local_id: item.localId,
            latitude: item.payload.latitude,
            longitude: item.payload.longitude,
            simulated: true,
          },
        },
        true
      );
    }

    await writeQueue(remaining, true);
    if (synced > 0) {
      log(
        {
          action: 'sync',
          moduleId: 'field-reports',
          moduleLabel: 'Field Reports',
          description: `Synced ${synced} offline field report${synced === 1 ? '' : 's'}`,
          metadata: { synced, failed: 0, rejected, simulated: true },
        },
        true
      );
    }
    setBusy(false);
  };

  /** Flushes buffered audit entries, then syncs — same order as the real hook. */
  const reconnect = async () => {
    setOnline(true);
    setBuffer((b) => {
      if (b.length) setAudit((a) => [...b.map((r) => ({ ...r, buffered: true })).reverse(), ...a]);
      return [];
    });
    await sync();
  };

  const rotate = async () => {
    setBusy(true);
    const outcome = await rotateEncryptionKey(async () => {
      const items = await readQueue();
      if (items.length) localStorage.setItem(QUEUE_KEY, await encryptJson(items));
      setQueue(items);
      return items.length;
    });
    setEnvelope(localStorage.getItem(QUEUE_KEY));
    await refreshKey();
    log(
      {
        action: outcome.rotated ? 'encrypt' : 'sync_failed',
        moduleId: 'field-reports',
        moduleLabel: 'Field Reports',
        description: outcome.rotated
          ? `Rotated device encryption key (generation ${outcome.from} → ${outcome.to}) and re-encrypted ${outcome.reEncrypted} queued submission(s)`
          : `Key rotation failed at "${outcome.stage}" stage: ${outcome.error ?? 'Unknown error'}`,
        metadata: { event: 'key_rotation', outcome: outcome.rotated ? 'success' : 'failure', stage: outcome.stage },
      },
      online
    );
    setBusy(false);
  };

  const reset = async () => {
    localStorage.removeItem(QUEUE_KEY);
    setQueue([]);
    setEnvelope(null);
    setAudit([]);
    setBuffer([]);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-4 p-6">
      <SEO title="Offline Pipeline Harness (dev)" description="Development harness" path="/dev/offline-harness" noindex />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <Bug className="h-5 w-5" /> Offline Pipeline Harness
          </h1>
          <p className="text-sm text-muted-foreground">
            Dev-only simulation of encrypt → queue → integrity → sync → audit. Real crypto, stubbed server.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={available ? 'default' : 'destructive'}>
            <ShieldCheck className="mr-1 h-3 w-3" />
            {available ? `AES-GCM · key gen ${keyGen ?? '—'}` : 'Secure store unavailable'}
          </Badge>
          <Badge variant={online ? 'default' : 'secondary'}>
            {online ? <Wifi className="mr-1 h-3 w-3" /> : <WifiOff className="mr-1 h-3 w-3" />}
            {online ? 'Online' : 'Offline (simulated)'}
          </Badge>
          {buffer.length > 0 && <Badge variant="secondary">{buffer.length} audit entries buffered</Badge>}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant={online ? 'outline' : 'default'} size="sm" onClick={() => setOnline(false)} disabled={!online}>
          <WifiOff className="mr-2 h-4 w-4" />Go offline
        </Button>
        <Button size="sm" onClick={() => void reconnect()} disabled={online || busy}>
          <Wifi className="mr-2 h-4 w-4" />Reconnect &amp; sync
        </Button>
        <Button variant="outline" size="sm" onClick={() => void sync()} disabled={!online || busy}>
          <RefreshCw className="mr-2 h-4 w-4" />Sync now
        </Button>
        <Button variant="outline" size="sm" onClick={() => void tamper()} disabled={!queue.length}>
          <Bug className="mr-2 h-4 w-4" />Tamper with cache
        </Button>
        <Button variant="outline" size="sm" onClick={() => void rotate()} disabled={busy || !available}>
          <KeyRound className="mr-2 h-4 w-4" />Rotate key
        </Button>
        <Button variant="ghost" size="sm" onClick={() => void reset()}>
          <Trash2 className="mr-2 h-4 w-4" />Reset
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Test field report</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="h-title">Title</Label>
              <Input id="h-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="h-date">Date</Label>
                <Input id="h-date" type="date" value={form.report_date} onChange={(e) => setForm({ ...form, report_date: e.target.value })} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="h-district">District</Label>
                <Input id="h-district" value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="h-findings">Findings</Label>
              <Textarea id="h-findings" rows={3} value={form.findings} onChange={(e) => setForm({ ...form, findings: e.target.value })} />
            </div>
            <p className="text-xs text-muted-foreground">
              GPS: {form.latitude}, {form.longitude}
            </p>
            <Button onClick={() => void submit()} disabled={busy}>Submit report</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Encrypted cache ({queue.length} queued)</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="mb-1 text-xs font-medium text-muted-foreground">localStorage envelope</p>
              <pre className="max-h-28 overflow-auto rounded bg-muted p-2 text-[10px] leading-tight break-all whitespace-pre-wrap">
                {envelope ?? '(empty)'}
              </pre>
            </div>
            <div className="space-y-2">
              {queue.map((i) => (
                <div key={i.localId} className="rounded border p-2 text-xs">
                  <p className="font-medium">{i.payload.title}</p>
                  <p className="text-muted-foreground break-all">sha256 {i.integrity.hash.slice(0, 32)}…</p>
                  {i.rejected && <p className="text-destructive">Rejected: {i.lastError}</p>}
                </div>
              ))}
              {!queue.length && <p className="text-xs text-muted-foreground">Queue empty.</p>}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Simulated audit log ({audit.length})</CardTitle></CardHeader>
        <CardContent className="p-0">
          {!audit.length ? (
            <p className="p-6 text-sm text-muted-foreground">No audit entries yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Module</TableHead>
                    <TableHead>Record</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {audit.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                        {new Date(r.at).toLocaleTimeString()}
                        {r.buffered && <span className="block text-[10px]">buffered offline</span>}
                      </TableCell>
                      <TableCell>
                        <Badge variant={actionVariant(r.action)}>{AUDIT_ACTION_LABELS[r.action]}</Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{r.moduleLabel ?? '—'}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{r.recordLabel ?? '—'}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{r.description ?? '—'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OfflineHarness;
