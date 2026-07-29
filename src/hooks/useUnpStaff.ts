import { useEffect, useState, useCallback } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export type UnpAccessLevel = 'admin' | 'manager' | 'staff' | 'viewer';
export type UnpAccountStatus = 'pending' | 'approved' | 'suspended' | 'rejected';

export interface UnpStaffAccount {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  position: string | null;
  department_id: string | null;
  access_level: UnpAccessLevel;
  status: UnpAccountStatus;
  avatar_url: string | null;
  approved_at: string | null;
  created_at: string;
}

/**
 * Session + staff-account state for the Ubuntu NGO Platform.
 * Authorization is enforced by RLS; this hook only drives the UI.
 */
export const useUnpStaff = () => {
  const [user, setUser] = useState<User | null>(null);
  const [account, setAccount] = useState<UnpStaffAccount | null>(null);
  const [loading, setLoading] = useState(true);

  const loadAccount = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from('unp_staff_accounts')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    setAccount((data as UnpStaffAccount) ?? null);
    setLoading(false);
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setTimeout(() => void loadAccount(session.user.id), 0);
      } else {
        setAccount(null);
        setLoading(false);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) void loadAccount(session.user.id);
      else setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [loadAccount]);

  const approved = account?.status === 'approved';
  const level = account?.access_level ?? 'viewer';

  return {
    user,
    account,
    loading,
    approved,
    level,
    isPlatformAdmin: approved && level === 'admin',
    canWrite: approved && ['admin', 'manager', 'staff'].includes(level),
    canDelete: approved && ['admin', 'manager'].includes(level),
    refresh: () => (user ? loadAccount(user.id) : Promise.resolve()),
    signOut: () => supabase.auth.signOut(),
  };
};
