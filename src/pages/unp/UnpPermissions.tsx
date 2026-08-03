import { Fragment, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { UNP_GROUPS, UNP_MODULES } from '@/lib/unp/modules';
import type { UnpModulePermission } from '@/hooks/useUnpPermissions';
import SEO from '@/components/seo/SEO';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

type Action = 'can_view' | 'can_create' | 'can_edit' | 'can_delete';

const ACTIONS: { key: Action; label: string }[] = [
  { key: 'can_view', label: 'View' },
  { key: 'can_create', label: 'Create' },
  { key: 'can_edit', label: 'Edit' },
  { key: 'can_delete', label: 'Delete' },
];

const DEFAULTS: Record<Action, boolean> = {
  can_view: true,
  can_create: false,
  can_edit: false,
  can_delete: false,
};

const UnpPermissions = () => {
  const { toast } = useToast();
  const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);
  const [departmentId, setDepartmentId] = useState<string>('');
  const [rules, setRules] = useState<Record<string, UnpModulePermission>>({});
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      const { data } = await supabase.from('org_departments').select('id, name').order('name');
      setDepartments(data ?? []);
      setDepartmentId((prev) => prev || data?.[0]?.id || '');
      setLoading(false);
    })();
  }, []);

  const loadRules = async (deptId: string) => {
    if (!deptId) return;
    const { data } = await supabase
      .from('unp_module_permissions')
      .select('*')
      .eq('department_id', deptId);
    setRules(
      Object.fromEntries(((data as UnpModulePermission[]) ?? []).map((r) => [r.module_id, r]))
    );
  };

  useEffect(() => {
    void loadRules(departmentId);
  }, [departmentId]);

  const grouped = useMemo(
    () => UNP_GROUPS.map((g) => ({ group: g, modules: UNP_MODULES.filter((m) => m.group === g) })).filter((g) => g.modules.length),
    []
  );

  const valueOf = (moduleId: string, action: Action) =>
    rules[moduleId] ? rules[moduleId][action] : DEFAULTS[action];

  const toggle = async (moduleId: string, action: Action, next: boolean) => {
    if (!departmentId) return;
    setBusy(`${moduleId}:${action}`);
    const existing = rules[moduleId];
    const payload = {
      department_id: departmentId,
      module_id: moduleId,
      can_view: existing?.can_view ?? DEFAULTS.can_view,
      can_create: existing?.can_create ?? DEFAULTS.can_create,
      can_edit: existing?.can_edit ?? DEFAULTS.can_edit,
      can_delete: existing?.can_delete ?? DEFAULTS.can_delete,
      [action]: next,
    };
    const { data, error } = await supabase
      .from('unp_module_permissions')
      .upsert(payload, { onConflict: 'department_id,module_id' })
      .select()
      .single();
    setBusy(null);
    if (error) {
      toast({ title: 'Could not save permission', description: error.message, variant: 'destructive' });
      return;
    }
    setRules((prev) => ({ ...prev, [moduleId]: data as UnpModulePermission }));
  };

  const applyPreset = async (preset: 'read-only' | 'contributor' | 'full') => {
    if (!departmentId) return;
    setBusy('preset');
    const flags = {
      'read-only': { can_view: true, can_create: false, can_edit: false, can_delete: false },
      contributor: { can_view: true, can_create: true, can_edit: true, can_delete: false },
      full: { can_view: true, can_create: true, can_edit: true, can_delete: true },
    }[preset];
    const rows = UNP_MODULES.map((m) => ({ department_id: departmentId, module_id: m.id, ...flags }));
    const { error } = await supabase
      .from('unp_module_permissions')
      .upsert(rows, { onConflict: 'department_id,module_id' });
    setBusy(null);
    if (error) {
      toast({ title: 'Could not apply preset', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Preset applied', description: `All modules set to ${preset}.` });
    void loadRules(departmentId);
  };

  return (
    <div className="space-y-4">
      <SEO
        title="Module Permissions | Ubuntu NGO Platform"
        description="Control which modules each department can view, create, edit or delete."
        path="/unp/permissions"
        noindex
      />
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Module Permissions</h1>
        <p className="text-sm text-muted-foreground">
          Limit each department to specific view, create, edit and delete actions per module.
          Access levels still apply — these rules can only narrow them. Platform admins are never restricted.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Select value={departmentId} onValueChange={setDepartmentId}>
          <SelectTrigger className="w-64" aria-label="Department">
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((d) => (
              <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" disabled={!departmentId || !!busy} onClick={() => applyPreset('read-only')}>
          Read-only preset
        </Button>
        <Button variant="outline" size="sm" disabled={!departmentId || !!busy} onClick={() => applyPreset('contributor')}>
          Contributor preset
        </Button>
        <Button variant="outline" size="sm" disabled={!departmentId || !!busy} onClick={() => applyPreset('full')}>
          Full access preset
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
          ) : !departments.length ? (
            <p className="p-6 text-sm text-muted-foreground">Create a department first to configure permissions.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Module</TableHead>
                    {ACTIONS.map((a) => (
                      <TableHead key={a.key} className="w-24 text-center">{a.label}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {grouped.map(({ group, modules }) => (
                    <Fragment key={group}>
                      <TableRow className="bg-muted/40 hover:bg-muted/40">
                        <TableCell colSpan={5} className="py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          {group}
                        </TableCell>
                      </TableRow>
                      {modules.map((m) => (
                        <TableRow key={m.id}>
                          <TableCell className="whitespace-nowrap font-medium">{m.label}</TableCell>
                          {ACTIONS.map((a) => (
                            <TableCell key={a.key} className="text-center">
                              <Checkbox
                                checked={valueOf(m.id, a.key)}
                                disabled={busy === `${m.id}:${a.key}` || busy === 'preset'}
                                onCheckedChange={(v) => toggle(m.id, a.key, v === true)}
                                aria-label={`${a.label} ${m.label}`}
                              />
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </Fragment>
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

export default UnpPermissions;
