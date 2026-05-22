import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/layout/Layout';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

/**
 * Guards /admin/* routes. Redirects to /admin/auth when:
 * - No authenticated user
 * - User is not an admin
 * - User has MFA enrolled (nextLevel === 'aal2') but the current
 *   session has not completed the TOTP challenge (currentLevel !== 'aal2')
 */
const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
  const { user, isAdmin, loading } = useAdminAuth();
  const location = useLocation();
  const [aalChecked, setAalChecked] = useState(false);
  const [aalOk, setAalOk] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const checkAal = async () => {
      if (!user) {
        if (!cancelled) {
          setAalOk(false);
          setAalChecked(true);
        }
        return;
      }
      try {
        const { data, error } =
          await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
        if (cancelled) return;
        if (error) {
          // Fail closed
          setAalOk(false);
        } else {
          const { currentLevel, nextLevel } = data ?? {};
          // If MFA is required (nextLevel aal2), current must also be aal2
          const ok = nextLevel === 'aal2' ? currentLevel === 'aal2' : true;
          setAalOk(ok);
        }
      } catch {
        if (!cancelled) setAalOk(false);
      } finally {
        if (!cancelled) setAalChecked(true);
      }
    };

    if (!loading) checkAal();

    return () => {
      cancelled = true;
    };
  }, [user, loading]);

  if (loading || (user && !aalChecked)) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-utu-red" />
        </div>
      </Layout>
    );
  }

  if (!user || !isAdmin || !aalOk) {
    return (
      <Navigate
        to="/admin/auth"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
