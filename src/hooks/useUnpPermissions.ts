import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUnpStaff, type UnpAccessLevel } from '@/hooks/useUnpStaff';

export interface UnpModulePermission {
  id: string;
  department_id: string;
  module_id: string;
  can_view: boolean;
  can_create: boolean;
  can_edit: boolean;
  can_delete: boolean;
}

export interface ModuleAbility {
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

/** Baseline capabilities from the access level — department rules can only narrow these. */
export const levelAbility = (level: UnpAccessLevel): ModuleAbility => ({
  canView: true,
  canCreate: ['admin', 'manager', 'staff'].includes(level),
  canEdit: ['admin', 'manager', 'staff'].includes(level),
  canDelete: ['admin', 'manager'].includes(level),
});

const narrow = (base: ModuleAbility, rule?: UnpModulePermission): ModuleAbility =>
  rule
    ? {
        canView: base.canView && rule.can_view,
        canCreate: base.canCreate && rule.can_create,
        canEdit: base.canEdit && rule.can_edit,
        canDelete: base.canDelete && rule.can_delete,
      }
    : base;

/**
 * Loads the department-scoped module permission matrix for the signed-in staff member.
 * Platform admins are never restricted. Departments without an explicit rule keep
 * the defaults implied by their access level.
 */
export const useUnpPermissions = () => {
  const { account, approved, level, isPlatformAdmin, loading: staffLoading } = useUnpStaff();
  const [rules, setRules] = useState<Record<string, UnpModulePermission>>({});
  const [loading, setLoading] = useState(true);

  const departmentId = account?.department_id ?? null;

  const load = useCallback(async () => {
    if (!approved || !departmentId) {
      setRules({});
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from('unp_module_permissions')
      .select('*')
      .eq('department_id', departmentId);
    setRules(
      Object.fromEntries(((data as UnpModulePermission[]) ?? []).map((r) => [r.module_id, r]))
    );
    setLoading(false);
  }, [approved, departmentId]);

  useEffect(() => {
    if (staffLoading) return;
    void load();
  }, [staffLoading, load]);

  const abilityFor = useCallback(
    (moduleId: string): ModuleAbility => {
      if (!approved) return { canView: false, canCreate: false, canEdit: false, canDelete: false };
      const base = levelAbility(level);
      if (isPlatformAdmin) return base;
      return narrow(base, rules[moduleId]);
    },
    [approved, level, isPlatformAdmin, rules]
  );

  return { abilityFor, rules, loading: loading || staffLoading, refresh: load };
};
