import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useUnpStaff } from '@/hooks/useUnpStaff';
import { useOfflineFieldQueue } from '@/hooks/useOfflineFieldQueue';
import SEO from '@/components/seo/SEO';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, MapPin, Wifi, WifiOff, RefreshCw, Camera, Trash2, CloudUpload, CheckCircle2, ShieldCheck, ShieldAlert } from 'lucide-react';

const NONE = '__none__';

const emptyForm = () => ({
  title: '',
  report_date: new Date().toISOString().slice(0, 10),
  district: '',
  village: '',
  project_id: NONE,
  latitude: '' as string | number,
  longitude: '' as string | number,
  findings: '',
  challenges: '',
  recommendations: '',
});

/** Downscale a captured photo so it survives localStorage while offline. */
const compressImage = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read photo'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Could not decode photo'));
      img.onload = () => {
        const max = 1280;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext('2d')?.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });

const UnpFieldCollect = () => {
  const { account } = useUnpStaff();
  const { toast } = useToast();
  const {
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
    rotationIntervalMs,
    setRotationIntervalDays,


    enqueue,
    remove,
    sync,
  } = useOfflineFieldQueue();
  const [form, setForm] = useState(emptyForm());
  const [projects, setProjects] = useState<{ id: string; title: string }[]>([]);
  const [photo, setPhoto] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    void (async () => {
      const { data } = await supabase.from('org_projects').select('id, title').order('title');
      setProjects(data ?? []);
    })();
  }, []);

  const set = (key: string, value: unknown) => setForm((prev) => ({ ...prev, [key]: value }));

  const captureLocation = () => {
    if (!navigator.geolocation) {
      toast({ title: 'GPS unavailable', description: 'This device does not support location capture.', variant: 'destructive' });
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        set('latitude', Number(pos.coords.latitude.toFixed(6)));
        set('longitude', Number(pos.coords.longitude.toFixed(6)));
        setAccuracy(Math.round(pos.coords.accuracy));
        setLocating(false);
        toast({ title: 'Location captured', description: `Accurate to about ${Math.round(pos.coords.accuracy)} m.` });
      },
      (err) => {
        setLocating(false);
        toast({ title: 'Could not get location', description: err.message, variant: 'destructive' });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const onPhoto = async (file?: File) => {
    if (!file) return;
    try {
      setPhoto(await compressImage(file));
    } catch (e) {
      toast({ title: 'Photo failed', description: e instanceof Error ? e.message : 'Try again', variant: 'destructive' });
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast({ title: 'Report title is required', variant: 'destructive' });
      return;
    }
    setSubmitting(true);

    await enqueue({
      photoDataUrl: photo,
      payload: {
        title: form.title.trim(),
        report_date: form.report_date,
        submitted_by: account ? `${account.first_name} ${account.last_name}` : null,
        district: form.district || null,
        village: form.village || null,
        latitude: form.latitude === '' ? null : Number(form.latitude),
        longitude: form.longitude === '' ? null : Number(form.longitude),
        project_id: form.project_id === NONE ? null : form.project_id,
        findings: form.findings || null,
        challenges: form.challenges || null,
        recommendations: form.recommendations || null,
        sync_status: 'pending',
      },
    });

    setForm(emptyForm());
    setPhoto(null);
    setAccuracy(null);
    if (fileRef.current) fileRef.current.value = '';

    if (navigator.onLine) {
      const { synced, failed, rejected } = await sync();
      toast({
        title: rejected
          ? 'Integrity check failed'
          : synced
            ? 'Report submitted'
            : 'Saved on this device',
        description: rejected
          ? `${rejected} cached submission${rejected === 1 ? ' was' : 's were'} blocked because the stored data no longer matches its fingerprint.`
          : synced
            ? 'Your field report was uploaded successfully.'
            : `Upload did not go through (${failed} pending). It will retry automatically.`,
        variant: rejected ? 'destructive' : undefined,
      });
    } else {
      toast({
        title: 'Saved offline',
        description: 'The report is stored on this device and will upload when you are back online.',
      });
    }
    setSubmitting(false);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-4 pb-16">
      <SEO
        title="Field Data Collection | Ubuntu NGO Platform"
        description="Mobile-friendly offline field data collection with GPS capture and automatic sync."
        path="/unp/field"
        noindex
      />

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Field Data Collection</h1>
          <p className="text-sm text-muted-foreground">
            Works without internet. Reports are encrypted on your device and sync automatically.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={encrypted ? 'secondary' : 'outline'} className="gap-1.5">
            {encrypted ? <ShieldCheck className="h-3.5 w-3.5" /> : <ShieldAlert className="h-3.5 w-3.5" />}
            {encrypted ? 'Encrypted on device' : 'Encryption unavailable'}
          </Badge>
          {encrypted && keyGeneration !== null && (
            <Badge variant="outline" className="gap-1.5">
              Key v{keyGeneration}
              {keyRotatedAt && ` · rotated ${new Date(keyRotatedAt).toLocaleDateString()}`}
            </Badge>
          )}
          {encrypted && (
            <Select
              value={String(msToDays(rotationIntervalMs))}
              onValueChange={(v) => {
                const { intervalMs, clamped } = setRotationIntervalDays(Number(v));
                toast({
                  title: 'Rotation schedule updated',
                  description: `Device key rotates every ${msToDays(intervalMs)} days${clamped ? ' (adjusted to the allowed range)' : ''}.`,
                });
              }}
            >
              <SelectTrigger className="h-7 w-[190px] text-xs" aria-label="Encryption key rotation schedule">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {KEY_ROTATION_PRESETS.map((p) => (
                  <SelectItem key={p.days} value={String(p.days)}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {rotationError && (
            <Badge variant="destructive" className="gap-1.5">
              <ShieldAlert className="h-3.5 w-3.5" />
              Key rotation retrying
              {rotationRetryAt && ` · ${new Date(rotationRetryAt).toLocaleTimeString()}`}
              {rotationAttempts > 0 && ` (attempt ${rotationAttempts})`}
            </Badge>
          )}

          <Badge variant={online ? 'default' : 'destructive'} className="gap-1.5">
            {online ? <Wifi className="h-3.5 w-3.5" /> : <WifiOff className="h-3.5 w-3.5" />}
            {online ? 'Online' : 'Offline'}
          </Badge>
        </div>
      </div>

      {(queue.length > 0 || lastSyncedAt) && (
        <Card>
          <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div className="flex items-center gap-2 text-sm">
              {queue.length ? (
                <>
                  <CloudUpload className="h-4 w-4 text-primary" />
                  <span>{queue.length} report{queue.length === 1 ? '' : 's'} waiting to sync</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>All reports synced{lastSyncedAt ? ` · ${new Date(lastSyncedAt).toLocaleTimeString()}` : ''}</span>
                </>
              )}
            </div>
            <Button size="sm" variant="outline" onClick={() => void sync()} disabled={!online || syncing || !queue.length}>
              {syncing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
              Sync now
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">New field report</CardTitle>
          <CardDescription>Capture what you observed during the visit.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label htmlFor="title">Report title *</Label>
              <Input id="title" value={form.title} onChange={(e) => set('title', e.target.value)} required />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="report_date">Visit date *</Label>
                <Input id="report_date" type="date" value={form.report_date}
                  onChange={(e) => set('report_date', e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="project">Project</Label>
                <Select value={form.project_id} onValueChange={(v) => set('project_id', v)}>
                  <SelectTrigger id="project"><SelectValue placeholder="Not linked" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value={NONE}>Not linked</SelectItem>
                    {projects.map((p) => <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="district">District</Label>
                <Input id="district" value={form.district} onChange={(e) => set('district', e.target.value)} />
              </div>
              <div>
                <Label htmlFor="village">Village / community</Label>
                <Input id="village" value={form.village} onChange={(e) => set('village', e.target.value)} />
              </div>
            </div>

            <div className="rounded-lg border p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-sm">
                  <p className="font-medium">GPS location</p>
                  <p className="text-muted-foreground">
                    {form.latitude !== '' && form.longitude !== ''
                      ? `${form.latitude}, ${form.longitude}${accuracy ? ` (±${accuracy} m)` : ''}`
                      : 'Not captured yet'}
                  </p>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={captureLocation} disabled={locating}>
                  {locating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <MapPin className="mr-2 h-4 w-4" />}
                  Capture GPS
                </Button>
              </div>
            </div>

            <div className="rounded-lg border p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-sm">
                  <p className="font-medium">Photo evidence</p>
                  <p className="text-muted-foreground">{photo ? 'Photo attached' : 'Optional — uploads on sync'}</p>
                </div>
                <div className="flex gap-2">
                  <input
                    ref={fileRef}
                    id="photo"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={(e) => void onPhoto(e.target.files?.[0])}
                  />
                  <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
                    <Camera className="mr-2 h-4 w-4" />{photo ? 'Replace' : 'Add photo'}
                  </Button>
                  {photo && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => setPhoto(null)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              {photo && (
                <img src={photo} alt="Field report photo preview" loading="lazy" decoding="async"
                  className="mt-3 max-h-48 w-full rounded-md object-cover" />
              )}
            </div>

            <div>
              <Label htmlFor="findings">Findings</Label>
              <Textarea id="findings" rows={3} value={form.findings} onChange={(e) => set('findings', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="challenges">Challenges</Label>
              <Textarea id="challenges" rows={3} value={form.challenges} onChange={(e) => set('challenges', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="recommendations">Recommendations</Label>
              <Textarea id="recommendations" rows={3} value={form.recommendations}
                onChange={(e) => set('recommendations', e.target.value)} />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {online ? 'Submit report' : 'Save offline'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {queue.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pending on this device</CardTitle>
            <CardDescription>Each report is fingerprinted (SHA-256) when saved and verified before upload; tampered items are blocked.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {queue.map((q) => (
              <div key={q.localId} className="flex items-start justify-between gap-3 rounded-md border p-3">
                <div className="min-w-0 text-sm">
                  <p className="truncate font-medium">{q.payload.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {q.payload.report_date}
                    {q.payload.district ? ` · ${q.payload.district}` : ''}
                    {q.attempts ? ` · ${q.attempts} failed attempt${q.attempts === 1 ? '' : 's'}` : ''}
                  </p>
                  {q.rejected && (
                    <p className="text-xs font-medium text-destructive">
                      Blocked: failed integrity verification — this submission will not upload.
                    </p>
                  )}
                  {q.lastError && <p className="text-xs text-destructive">{q.lastError}</p>}
                </div>
                <Button variant="ghost" size="icon" aria-label="Discard queued report" onClick={() => void remove(q.localId)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UnpFieldCollect;
