import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useUnpPermissions } from '@/hooks/useUnpPermissions';
import type { UnpField, UnpModule } from '@/lib/unp/modules';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Plus, Search, Pencil, Trash2, Download, Loader2, Inbox, Lock } from 'lucide-react';

type Row = Record<string, any>;

const NONE = '__none__';

const label = (row: Row, refLabel: string | string[]) =>
  Array.isArray(refLabel)
    ? refLabel.map((k) => row[k]).filter(Boolean).join(' ')
    : (row[refLabel] ?? '');

const fmt = (field: UnpField, value: any, refs: Record<string, Row[]>) => {
  if (value === null || value === undefined || value === '') return '—';
  if (field.type === 'ref' && field.refTable) {
    const match = (refs[field.refTable] ?? []).find((r) => r.id === value);
    return match ? label(match, field.refLabel ?? 'name') : '—';
  }
  if (field.type === 'number') return Number(value).toLocaleString();
  if (field.type === 'date') return new Date(value).toLocaleDateString();
  return String(value);
};

const badgeVariant = (value: string) => {
  const v = String(value).toLowerCase();
  if (['critical', 'high', 'off-track', 'blocked', 'rejected', 'expired', 'out-of-stock', 'grounded', 'confidential'].includes(v))
    return 'destructive' as const;
  if (['active', 'approved', 'done', 'completed', 'achieved', 'on-track', 'awarded', 'in-stock', 'available', 'synced', 'published', 'reconciled'].includes(v))
    return 'default' as const;
  return 'secondary' as const;
};

const ModuleCrud = ({ module }: { module: UnpModule }) => {
  const { abilityFor, loading: permsLoading } = useUnpPermissions();
  const { canView, canCreate, canEdit, canDelete } = abilityFor(module.id);
  const { toast } = useToast();
  const [rows, setRows] = useState<Row[]>([]);
  const [refs, setRefs] = useState<Record<string, Row[]>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Row | null>(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Row | null>(null);

  const listFields = useMemo(() => module.fields.filter((f) => f.list), [module]);

  const load = async () => {
    setLoading(true);
    const sort = module.defaultSort ?? { column: 'created_at', ascending: false };
    const { data, error } = await supabase
      .from(module.table as any)
      .select('*')
      .order(sort.column, { ascending: sort.ascending, nullsFirst: false })
      .limit(1000);

    if (error) {
      toast({ title: 'Could not load records', description: error.message, variant: 'destructive' });
    }
    setRows((data as Row[]) ?? []);
    setLoading(false);
  };

  const loadRefs = async () => {
    const tables = Array.from(
      new Set(module.fields.filter((f) => f.type === 'ref' && f.refTable).map((f) => f.refTable as string))
    );
    const results = await Promise.all(
      tables.map(async (t) => {
        const { data } = await supabase.from(t as any).select('*').limit(1000);
        return [t, (data as Row[]) ?? []] as const;
      })
    );
    setRefs(Object.fromEntries(results));
  };

  useEffect(() => {
    void load();
    void loadRefs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [module.id]);

  const filtered = useMemo(() => {
    if (!search.trim()) return rows;
    const q = search.toLowerCase();
    return rows.filter((r) =>
      module.fields.some((f) => {
        const v = fmt(f, r[f.key], refs);
        return v !== '—' && v.toLowerCase().includes(q);
      })
    );
  }, [rows, search, module.fields, refs]);

  const startCreate = () => {
    const blank: Row = {};
    module.fields.forEach((f) => {
      blank[f.key] = f.type === 'select' && f.required ? (f.options?.[0] ?? '') : '';
    });
    setEditing(blank);
    setOpen(true);
  };

  const startEdit = (row: Row) => {
    setEditing({ ...row });
    setOpen(true);
  };

  const save = async () => {
    if (!editing) return;
    const missing = module.fields.filter((f) => f.required && !editing[f.key] && editing[f.key] !== 0);
    if (missing.length) {
      toast({
        title: 'Missing required fields',
        description: missing.map((f) => f.label).join(', '),
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    const payload: Row = {};
    module.fields.forEach((f) => {
      const raw = editing[f.key];
      if (raw === '' || raw === undefined || raw === NONE) payload[f.key] = null;
      else if (f.type === 'number') payload[f.key] = Number(raw);
      else payload[f.key] = raw;
    });

    const { error } = editing.id
      ? await supabase.from(module.table as any).update(payload).eq('id', editing.id)
      : await supabase.from(module.table as any).insert(payload);

    setSaving(false);
    if (error) {
      toast({ title: 'Save failed', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Saved', description: `${module.label} record saved successfully.` });
    setOpen(false);
    setEditing(null);
    void load();
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const { error } = await supabase.from(module.table as any).delete().eq('id', deleteTarget.id);
    setDeleteTarget(null);
    if (error) {
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Deleted', description: 'Record removed.' });
    void load();
  };

  const exportCsv = () => {
    const cols = module.fields;
    const header = cols.map((c) => `"${c.label}"`).join(',');
    const body = filtered
      .map((r) => cols.map((c) => `"${String(fmt(c, r[c.key], refs)).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([`${header}\n${body}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${module.id}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderInput = (f: UnpField) => {
    const value = editing?.[f.key] ?? '';
    const set = (v: any) => setEditing((prev) => ({ ...(prev ?? {}), [f.key]: v }));

    if (f.type === 'textarea')
      return <Textarea id={f.key} value={value} onChange={(e) => set(e.target.value)} rows={3} />;

    if (f.type === 'select')
      return (
        <Select value={value || undefined} onValueChange={set}>
          <SelectTrigger id={f.key}><SelectValue placeholder={`Select ${f.label.toLowerCase()}`} /></SelectTrigger>
          <SelectContent>
            {f.options?.map((o) => (
              <SelectItem key={o} value={o} className="capitalize">{o.replace(/-/g, ' ')}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    if (f.type === 'ref')
      return (
        <Select value={value || NONE} onValueChange={(v) => set(v === NONE ? '' : v)}>
          <SelectTrigger id={f.key}><SelectValue placeholder={`Select ${f.label.toLowerCase()}`} /></SelectTrigger>
          <SelectContent>
            <SelectItem value={NONE}>None</SelectItem>
            {(refs[f.refTable as string] ?? []).map((r) => (
              <SelectItem key={r.id} value={r.id}>{label(r, f.refLabel ?? 'name') || r.id}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    return (
      <Input
        id={f.key}
        type={f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : 'text'}
        value={value ?? ''}
        onChange={(e) => set(e.target.value)}
      />
    );
  };

  if (permsLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!canView) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-2 py-16 text-center">
          <Lock className="h-8 w-8 text-muted-foreground" />
          <p className="font-medium">No access to {module.label}</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Your department does not have permission to view this module. Contact a platform admin
            if you need access.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{module.label}</h1>
          <p className="text-sm text-muted-foreground">{module.description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={exportCsv} disabled={!filtered.length}>
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
          {canCreate && (
            <Button size="sm" onClick={startCreate}>
              <Plus className="mr-2 h-4 w-4" /> New record
            </Button>
          )}
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder={`Search ${module.label.toLowerCase()}…`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label={`Search ${module.label}`}
        />
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : !filtered.length ? (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
              <Inbox className="h-8 w-8 text-muted-foreground" />
              <p className="font-medium">No records yet</p>
              <p className="max-w-sm text-sm text-muted-foreground">{module.description}</p>
              {canCreate && (
                <Button size="sm" className="mt-2" onClick={startCreate}>
                  <Plus className="mr-2 h-4 w-4" /> Add the first record
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {listFields.map((f) => (
                      <TableHead key={f.key}>{f.label}</TableHead>
                    ))}
                    <TableHead className="w-24 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((row) => (
                    <TableRow key={row.id}>
                      {listFields.map((f) => (
                        <TableCell key={f.key} className="whitespace-nowrap">
                          {f.badge && row[f.key] ? (
                            <Badge variant={badgeVariant(row[f.key])} className="capitalize">
                              {String(row[f.key]).replace(/-/g, ' ')}
                            </Badge>
                          ) : (
                            <span className="line-clamp-1 max-w-[240px]">{fmt(f, row[f.key], refs)}</span>
                          )}
                        </TableCell>
                      ))}
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          {canEdit && (
                            <Button variant="ghost" size="icon" aria-label="Edit record" onClick={() => startEdit(row)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                          )}
                          {canDelete && (
                            <Button
                              variant="ghost"
                              size="icon"
                              aria-label="Delete record"
                              onClick={() => setDeleteTarget(row)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        {filtered.length} of {rows.length} records
      </p>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing?.id ? 'Edit' : 'New'} — {module.label}</DialogTitle>
            <DialogDescription>{module.description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2 sm:grid-cols-2">
            {module.fields.map((f) => (
              <div key={f.key} className={f.type === 'textarea' ? 'sm:col-span-2' : ''}>
                <Label htmlFor={f.key} className="mb-1.5 block">
                  {f.label}
                  {f.required && <span className="ml-1 text-destructive">*</span>}
                </Label>
                {renderInput(f)}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save} disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save record
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this record?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the record from {module.label}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ModuleCrud;
