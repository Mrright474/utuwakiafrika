import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import SEO from '@/components/seo/SEO';
import { UNP_MODULES } from '@/lib/unp/modules';
import { AUDIT_ACTION_LABELS, UNP_AUDIT_ACTIONS, type UnpAuditAction } from '@/lib/unp/audit';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Search, Download, RefreshCw, Inbox } from 'lucide-react';

interface AuditRow {
  id: string;
  actor_name: string | null;
  actor_email: string | null;
  action: string;
  module_id: string | null;
  module_label: string | null;
  record_label: string | null;
  description: string | null;
  created_at: string;
}

const ALL = '__all__';

const actionVariant = (action: string) => {
  if (['delete', 'reject', 'sync_failed'].includes(action)) return 'destructive' as const;
  if (['approve', 'create', 'sync'].includes(action)) return 'default' as const;
  return 'secondary' as const;
};

const UnpAuditLog = () => {
  const [rows, setRows] = useState<AuditRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [action, setAction] = useState<string>(ALL);
  const [moduleId, setModuleId] = useState<string>(ALL);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const load = async () => {
    setLoading(true);
    let query = supabase
      .from('unp_audit_log')
      .select('id, actor_name, actor_email, action, module_id, module_label, record_label, description, created_at')
      .order('created_at', { ascending: false })
      .limit(1000);

    if (action !== ALL) query = query.eq('action', action);
    if (moduleId !== ALL) query = query.eq('module_id', moduleId);
    if (from) query = query.gte('created_at', new Date(`${from}T00:00:00`).toISOString());
    if (to) query = query.lte('created_at', new Date(`${to}T23:59:59`).toISOString());

    const { data } = await query;
    setRows((data as AuditRow[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, moduleId, from, to]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [r.actor_name, r.actor_email, r.module_label, r.record_label, r.description]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [rows, search]);

  const exportCsv = () => {
    const header = ['Timestamp', 'Staff', 'Email', 'Action', 'Module', 'Record', 'Details'];
    const body = filtered.map((r) =>
      [
        new Date(r.created_at).toLocaleString(),
        r.actor_name ?? '',
        r.actor_email ?? '',
        AUDIT_ACTION_LABELS[r.action as UnpAuditAction] ?? r.action,
        r.module_label ?? '',
        r.record_label ?? '',
        r.description ?? '',
      ]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(',')
    );
    const blob = new Blob([[header.join(','), ...body].join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-log-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <SEO
        title="Audit Log | Ubuntu NGO Platform"
        description="Organisation-wide record of staff activity across every module."
        path="/unp/audit"
        noindex
      />

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Audit Log</h1>
          <p className="text-sm text-muted-foreground">
            Every sign-in, record change, approval and sync, with timestamp and affected module.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => void load()}>
            <RefreshCw className="mr-2 h-4 w-4" />Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={exportCsv} disabled={!filtered.length}>
            <Download className="mr-2 h-4 w-4" />Export CSV
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="relative sm:col-span-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              aria-label="Search audit log"
              placeholder="Search staff, record or details…"
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={action} onValueChange={setAction}>
            <SelectTrigger aria-label="Filter by action"><SelectValue placeholder="All actions" /></SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All actions</SelectItem>
              {UNP_AUDIT_ACTIONS.map((a) => (
                <SelectItem key={a} value={a}>{AUDIT_ACTION_LABELS[a]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={moduleId} onValueChange={setModuleId}>
            <SelectTrigger aria-label="Filter by module"><SelectValue placeholder="All modules" /></SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All modules</SelectItem>
              {UNP_MODULES.map((m) => (
                <SelectItem key={m.id} value={m.id}>{m.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Input type="date" aria-label="From date" value={from} onChange={(e) => setFrom(e.target.value)} />
            <Input type="date" aria-label="To date" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
          ) : !filtered.length ? (
            <div className="flex flex-col items-center gap-2 py-16 text-muted-foreground">
              <Inbox className="h-8 w-8" />
              <p className="text-sm">No activity recorded for these filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">Timestamp</TableHead>
                    <TableHead>Staff</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Module</TableHead>
                    <TableHead>Record</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                        {new Date(r.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <span className="font-medium">{r.actor_name ?? '—'}</span>
                        <span className="block text-xs text-muted-foreground">{r.actor_email}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={actionVariant(r.action)}>
                          {AUDIT_ACTION_LABELS[r.action as UnpAuditAction] ?? r.action}
                        </Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{r.module_label ?? '—'}</TableCell>
                      <TableCell className="max-w-[220px] truncate">{r.record_label ?? '—'}</TableCell>
                      <TableCell className="max-w-[320px] text-sm text-muted-foreground">
                        {r.description ?? '—'}
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
        Showing {filtered.length} of the most recent 1,000 entries. Audit records cannot be edited or deleted.
      </p>
    </div>
  );
};

export default UnpAuditLog;
