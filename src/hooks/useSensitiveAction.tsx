import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import ReauthDialog from '@/components/admin/ReauthDialog';
import { isAal2Fresh } from '@/lib/adminSession';
import { useToast } from '@/hooks/use-toast';

type SensitiveAction = () => void | Promise<void>;

interface SensitiveActionContextValue {
  /** Run `action` immediately if a recent TOTP verification exists,
   *  otherwise prompt for a fresh code first. */
  requireFreshAal2: (action: SensitiveAction) => void;
}

const SensitiveActionContext = createContext<SensitiveActionContextValue | null>(null);

export const SensitiveActionProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const pendingRef = useRef<SensitiveAction | null>(null);
  const { toast } = useToast();

  const runPending = useCallback(async () => {
    const action = pendingRef.current;
    pendingRef.current = null;
    if (!action) return;
    try {
      await action();
    } catch (err) {
      console.error('Sensitive action failed', err);
    }
  }, []);

  const requireFreshAal2 = useCallback(
    (action: SensitiveAction) => {
      if (isAal2Fresh()) {
        void action();
        return;
      }
      pendingRef.current = action;
      setOpen(true);
    },
    [],
  );

  const handleCancel = useCallback(() => {
    pendingRef.current = null;
    setOpen(false);
    toast({
      title: 'Action cancelled',
      description: 'MFA confirmation is required for this action.',
    });
  }, [toast]);

  const handleVerified = useCallback(() => {
    setOpen(false);
    void runPending();
  }, [runPending]);

  const value = useMemo(() => ({ requireFreshAal2 }), [requireFreshAal2]);

  return (
    <SensitiveActionContext.Provider value={value}>
      {children}
      <ReauthDialog open={open} onCancel={handleCancel} onVerified={handleVerified} />
    </SensitiveActionContext.Provider>
  );
};

export const useSensitiveAction = (): SensitiveActionContextValue => {
  const ctx = useContext(SensitiveActionContext);
  if (!ctx) {
    throw new Error(
      'useSensitiveAction must be used inside <SensitiveActionProvider> (mounted by ProtectedAdminRoute).',
    );
  }
  return ctx;
};
