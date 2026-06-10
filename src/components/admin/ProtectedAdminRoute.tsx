import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/layout/Layout';
import { SensitiveActionProvider } from '@/hooks/useSensitiveAction';
import { useAdminIdleTimeout } from '@/hooks/useAdminIdleTimeout';
import IdleWarningDialog from '@/components/admin/IdleWarningDialog';
import { clearAdminSessionState } from '@/lib/adminSession';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

/**
 * Guards /admin/* routes. Redirects to /admin/auth when:
 * - No authenticated user
 * - User is not an admin
 * - User has MFA enrolled (nextLevel === 'aal2') but the current
 *   session has not completed the TOTP challenge (currentLevel !== 'aal2')
 *
 * Also enforces an idle timeout and provides the SensitiveActionProvider
 * so any descendant can require a fresh TOTP before destructive actions.
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
          setAalOk(false);
        } else {
          const { currentLevel, nextLevel } = data ?? {};
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

  // Clear stored admin session timestamps on sign-out events.
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        clearAdminSessionState();
      }
    });
    return () => subscription.unsubscribe();
  }, []);

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

  return (
    <SensitiveActionProvider>
      <AdminIdleGuard>{children}</AdminIdleGuard>
    </SensitiveActionProvider>
  );
};

// Internal: mounts the idle-timeout hook only when actually inside the
// protected admin tree.
const AdminIdleGuard = ({ children }: { children: React.ReactNode }) => {
  const { warningOpen, msUntilSignOut, stayActive, signOutNow } =
    useAdminIdleTimeout(true);
  return (
    <>
      {children}
      <IdleWarningDialog
        open={warningOpen}
        msUntilSignOut={msUntilSignOut}
        onStay={stayActive}
        onSignOut={() => void signOutNow()}
      />
    </>
  );
};

export default ProtectedAdminRoute;
