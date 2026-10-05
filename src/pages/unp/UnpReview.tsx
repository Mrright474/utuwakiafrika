import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Download, FileText, HandCoins, ScrollText, RefreshCw } from 'lucide-react';
import { exportToCSV } from '@/utils/exportData';

const fmtDate = (v?: string | null) => (v ? new Date(v).toLocaleString() : '—');
const matches = (row: Record<string, unknown>, q: string) =>
  !q || Object.values(row).some((v) => v != null && String(v).toLowerCase().includes(q.toLowerCase()));

function useTable(table: 'unp_field_reports' | 'donation_requests' | 'unp_audit_log', order: string) {
  return useQuery({
    queryKey: ['unp-review', table],
    queryFn: async () => {
      const { data, error } = await supabase.from(table).select('*').order(order, { ascending: false }).limit(1000);
      if (error) throw error;
      return (data ?? []) as Record<string, any>[];
    },
  });
}

const Empty = ({ text }: { text: string }) => <p className="py-10 text-center text-sm text-muted-foreground">{text}</p>;

const ErrorNote = () => (
  <p className="py-10 text-center text-sm text-muted-foreground">
    You don't have access to view this list. Ask a platform admin to raise your access level.
  </p>
);

export default function UnpReview() {
  const [q, setQ] = useState('');
  const reports = useTable('unp_field_reports', 'report_date');
  const donations = useTable('donation_requests', 'created_at');
  const audit = useTable('unp_audit_log', 'created_at');

  const fReports = useMemo(() => (reports.data ?? []).filter((r) => matches(r, q)), [reports.data, q]);
  const fDonations = useMemo(() => (donations.data ?? []).filter((r) => matches(r, q)), [donations.data, q]);
  const fAudit = useMemo(() => (audit.data ?? []).filter((r) => matches(r, q)), [audit.data, q]);

  const donationTotal = (donations.data ?? []).reduce((s, d) => s + Number(d.amount || 0), 0);
  const refreshAll = () => { reports.refetch(); donations.refetch(); audit.refetch(); };
  const stamp = new Date().toISOString().slice(0, 10);

  const body = (state: { isLoading: boolean; error: unknown }, rows: unknown[], emptyText: string, table: JSX.Element) =>
    state.isLoading ? <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 animate-spin" /></div>
    : state.error ? <ErrorNote />
    : rows.length === 0 ? <Empty text={emptyText} />
    : <div className="overflow-x-auto">{table}</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Review Centre</h1>
          <p className="text-sm text-muted-foreground">Field reports, donations and activity history in one place.</p>
        </div>
        <div className="flex gap-2">
          <Input placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} className="w-56" />
          <Button variant="outline" size="icon" onClick={refreshAll} aria-label="Refresh"><RefreshCw className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card><CardHeader className="pb-2"><CardDescription>Field reports</CardDescription><CardTitle>{reports.data?.length ?? 0}</CardTitle></CardHeader></Card>
        <Card><CardHeader className="pb-2"><CardDescription>Donations (UGX {donationTotal.toLocaleString()})</CardDescription><CardTitle>{donations.data?.length ?? 0}</CardTitle></CardHeader></Card>
        <Card><CardHeader className="pb-2"><CardDescription>Audit entries</CardDescription><CardTitle>{audit.data?.length ?? 0}</CardTitle></CardHeader></Card>
      </div>

      <Tabs defaultValue="reports">
        <TabsList>
          <TabsTrigger value="reports"><FileText className="mr-1 h-4 w-4" />Field reports</TabsTrigger>
          <TabsTrigger value="donations"><HandCoins className="mr-1 h-4 w-4" />Donations</TabsTrigger>
          <TabsTrigger value="audit"><ScrollText className="mr-1 h-4 w-4" />Audit log</TabsTrigger>
        </TabsList>

        <TabsContent value="reports">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Field reports</CardTitle>
              <Button size="sm" variant="outline" disabled={!fReports.length} onClick={() => exportToCSV(fReports, ['title','report_date','submitted_by','district','village','latitude','longitude','findings','challenges','recommendations','sync_status'], `field-reports-${stamp}`)}><Download className="mr-1 h-4 w-4" />CSV</Button>
            </CardHeader>
            <CardContent>
              {body(reports, fReports, 'No field reports yet.', (
                <Table>
                  <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Title</TableHead><TableHead>Submitted by</TableHead><TableHead>Location</TableHead><TableHead>Findings</TableHead><TableHead>Sync</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {fReports.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className="whitespace-nowrap">{r.report_date}</TableCell>
                        <TableCell className="font-medium">{r.title}</TableCell>
                        <TableCell>{r.submitted_by ?? '—'}</TableCell>
                        <TableCell>{[r.village, r.district].filter(Boolean).join(', ') || '—'}{r.latitude != null && <div className="text-xs text-muted-foreground">{Number(r.latitude).toFixed(4)}, {Number(r.longitude).toFixed(4)}</div>}</TableCell>
                        <TableCell className="max-w-xs truncate" title={r.findings ?? ''}>{r.findings ?? '—'}</TableCell>
                        <TableCell><Badge variant="outline">{r.sync_status}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="donations">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Donations</CardTitle>
              <Button size="sm" variant="outline" disabled={!fDonations.length} onClick={() => exportToCSV(fDonations, ['created_at','donor_name','phone','email','amount','currency','provider','status','note'], `donations-${stamp}`)}><Download className="mr-1 h-4 w-4" />CSV</Button>
            </CardHeader>
            <CardContent>
              {body(donations, fDonations, 'No donations yet.', (
                <Table>
                  <TableHeader><TableRow><TableHead>Received</TableHead><TableHead>Donor</TableHead><TableHead>Phone</TableHead><TableHead>Operator</TableHead><TableHead className="text-right">Amount</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {fDonations.map((d) => (
                      <TableRow key={d.id}>
                        <TableCell className="whitespace-nowrap">{fmtDate(d.created_at)}</TableCell>
                        <TableCell className="font-medium">{d.donor_name}</TableCell>
                        <TableCell>{d.phone}</TableCell>
                        <TableCell>{d.provider === 'mtn' ? 'MTN MoMo' : d.provider === 'airtel' ? 'Airtel Money' : d.provider}</TableCell>
                        <TableCell className="text-right whitespace-nowrap">{d.currency} {Number(d.amount).toLocaleString()}</TableCell>
                        <TableCell><Badge variant={d.status === 'confirmed' ? 'default' : 'secondary'}>{d.status}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Audit log</CardTitle>
              <Button size="sm" variant="outline" disabled={!fAudit.length} onClick={() => exportToCSV(fAudit, ['created_at','actor_name','actor_email','action','module_label','record_label','description'], `audit-log-${stamp}`)}><Download className="mr-1 h-4 w-4" />CSV</Button>
            </CardHeader>
            <CardContent>
              {body(audit, fAudit, 'No activity recorded yet.', (
                <Table>
                  <TableHeader><TableRow><TableHead>When</TableHead><TableHead>Who</TableHead><TableHead>Action</TableHead><TableHead>Module</TableHead><TableHead>Details</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {fAudit.map((a) => (
                      <TableRow key={a.id}>
                        <TableCell className="whitespace-nowrap">{fmtDate(a.created_at)}</TableCell>
                        <TableCell>{a.actor_name ?? a.actor_email ?? '—'}</TableCell>
                        <TableCell><Badge variant="outline">{a.action}</Badge></TableCell>
                        <TableCell>{a.module_label ?? a.module_id ?? '—'}</TableCell>
                        <TableCell className="max-w-sm truncate" title={a.description ?? ''}>{a.record_label ? `${a.record_label} — ` : ''}{a.description ?? ''}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
