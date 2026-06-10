import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  IDLE_TIMEOUT_MS,
  IDLE_WARNING_MS,
  SS_KEYS,
} from '@/config/adminSession';
import {
  clearAdminSessionState,
  getLastActivityAt,
  markActivity,
} from '@/lib/adminSession';

const ACTIVITY_EVENTS = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'] as const;
const THROTTLE_MS = 1000;
const TICK_MS = 5000;

interface UseAdminIdleTimeoutResult {
  warningOpen: boolean;
  msUntilSignOut: number;
  stayActive: () => void;
  signOutNow: () => Promise<void>;
}

export const useAdminIdleTimeout = (enabled: boolean): UseAdminIdleTimeoutResult => {
  const [warningOpen, setWarningOpen] = useState(false);
  const [msUntilSignOut, setMsUntilSignOut] = useState(IDLE_WARNING_MS);
  const lastThrottleRef = useRef(0);
  const navigate = useNavigate();
  const { toast } = useToast();
  const signedOutRef = useRef(false);

  const doSignOut = useCallback(
    async (reason: 'idle' | 'manual') => {
      if (signedOutRef.current) return;
      signedOutRef.current = true;
      clearAdminSessionState();
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch {
        /* ignore */
      }
      if (reason === 'idle') {
        toast({
          title: 'Signed out due to inactivity',
          description: 'Please sign in again to continue.',
        });
      }
      navigate('/admin/auth', { replace: true });
    },
    [navigate, toast],
  );

  const stayActive = useCallback(() => {
    markActivity();
    setWarningOpen(false);
    setMsUntilSignOut(IDLE_WARNING_MS);
  }, []);

  // Initialize last activity on mount.
  useEffect(() => {
    if (!enabled) return;
    markActivity();
  }, [enabled]);

  // Track user activity (throttled).
  useEffect(() => {
    if (!enabled) return;
    const onActivity = () => {
      const now = Date.now();
      if (now - lastThrottleRef.current < THROTTLE_MS) return;
      lastThrottleRef.current = now;
      markActivity(now);
      // Re-opening warning closes it as soon as the user interacts.
      if (warningOpen) setWarningOpen(false);
    };
    ACTIVITY_EVENTS.forEach((e) =>
      window.addEventListener(e, onActivity, { passive: true }),
    );
    return () => {
      ACTIVITY_EVENTS.forEach((e) => window.removeEventListener(e, onActivity));
    };
  }, [enabled, warningOpen]);

  // Cross-tab sync: a sibling tab updating activity should reset us too.
  useEffect(() => {
    if (!enabled) return;
    const onStorage = (e: StorageEvent) => {
      if (e.key === SS_KEYS.lastActivityAt && warningOpen) {
        setWarningOpen(false);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [enabled, warningOpen]);

  // Tick.
  useEffect(() => {
    if (!enabled) return;
    const interval = window.setInterval(() => {
      const idleMs = Date.now() - getLastActivityAt();
      if (idleMs >= IDLE_TIMEOUT_MS) {
        void doSignOut('idle');
        return;
      }
      const remaining = IDLE_TIMEOUT_MS - idleMs;
      if (remaining <= IDLE_WARNING_MS) {
        setMsUntilSignOut(remaining);
        setWarningOpen(true);
      }
    }, TICK_MS);
    return () => window.clearInterval(interval);
  }, [enabled, doSignOut]);

  return {
    warningOpen,
    msUntilSignOut,
    stayActive,
    signOutNow: () => doSignOut('manual'),
  };
};
