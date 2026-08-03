import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useUnpStaff, type UnpStaffAccount } from '@/hooks/useUnpStaff';
import { logUnpAudit } from '@/lib/unp/audit';
import SEO from '@/components/seo/SEO';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Check, X } from 'lucide-react';

const UnpApprovals = () => {
  const { user } = useUnpStaff();
  const { toast } = useToast();
  const [accounts, setAccounts] = useState<UnpStaffAccount[]>([]);
  const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const [{ data: accs }, { data: depts }] = await Promise.all([
      supabase.from('unp_staff_accounts').select('*').order('created_at', { ascending: false }),
      supabase.from('org_departments').select('id, name').order('name'),
    ]);
    setAccounts((accs as UnpStaffAccount[]) ?? []);
    setDepartments(depts ?? []);
    setLoading(false);
  };

  useEffect(() => { void load(); }, []);

  const patch = async (id: string, values: Record<string, unknown>) => {
    const { error } = await supabase.from('unp_staff_accounts').update(values).eq('id', id);
    if (error) {
      toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
      return;
    }
    const target = accounts.find((a) => a.id === id);
    const status = values.status as string | undefined;
    void logUnpAudit({
      action: status === 'approved' ? 'approve' : status === 'rejected' ? 'reject' : 'permission_change',
      moduleId: 'staff-accounts',
      moduleLabel: 'Staff Access Control',
      recordId: id,
      recordLabel: target ? `${target.first_name} ${target.last_name}` : null,
      description: `Updated staff account (${Object.keys(values).join(', ')})`,
      metadata: values,
    });
    toast({ title: 'Updated', description: 'Staff account updated.' });
    void load();
  };

  return (
    <div className="space-y-4">
      <SEO
        title="Staff Access Control | Ubuntu NGO Platform"
        description="Approve staff accounts and assign departments and access levels."
        path="/unp/approvals"
        noindex
      />
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Staff Access Control</h1>
        <p className="text-sm text-muted-foreground">
          Approve new staff, assign their department and set their access level.
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Access level</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accounts.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell className="whitespace-nowrap font-medium">
                        {a.first_name} {a.last_name}
                        {a.user_id === user?.id && <span className="ml-2 text-xs text-muted-foreground">(you)</span>}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{a.email}</TableCell>
                      <TableCell className="whitespace-nowrap">{a.position ?? '—'}</TableCell>
                      <TableCell>
                        <Select
                          value={a.department_id ?? '__none__'}
                          onValueChange={(v) => patch(a.id, { department_id: v === '__none__' ? null : v })}
                        >
                          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="__none__">Unassigned</SelectItem>
                            {departments.map((d) => (
                              <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Select value={a.access_level} onValueChange={(v) => patch(a.id, { access_level: v })}>
                          <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {['admin', 'manager', 'staff', 'viewer'].map((l) => (
                              <SelectItem key={l} value={l} className="capitalize">{l}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={a.status === 'approved' ? 'default' : a.status === 'pending' ? 'secondary' : 'destructive'}
                          className="capitalize"
                        >
                          {a.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          {a.status !== 'approved' && (
                            <Button size="sm" onClick={() => patch(a.id, {
                              status: 'approved', approved_by: user?.id, approved_at: new Date().toISOString(),
                            })}>
                              <Check className="mr-1 h-3.5 w-3.5" /> Approve
                            </Button>
                          )}
                          {a.status === 'approved' && a.user_id !== user?.id && (
                            <Button size="sm" variant="outline" onClick={() => patch(a.id, { status: 'suspended' })}>
                              <X className="mr-1 h-3.5 w-3.5" /> Suspend
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
    </div>
  );
};

export default UnpApprovals;
