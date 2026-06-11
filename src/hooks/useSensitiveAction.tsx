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
import { logAdminAction } from '@/lib/adminAudit';
import { useToast } from '@/hooks/use-toast';

type SensitiveAction = () => void | Promise<void>;

interface RequireOptions {
  /** Short identifier for the audit log, e.g. "mfa.unenroll". */
  action: string;
  /** Optional structured context recorded with the audit entry. */
  metadata?: Record<string, unknown>;
}

interface SensitiveActionContextValue {
  /** Run `fn` immediately if a recent TOTP verification exists,
   *  otherwise prompt for a fresh code first. The action is recorded
   *  in the admin audit log on successful execution. */
  requireFreshAal2: (fn: SensitiveAction, options: RequireOptions) => void;
}

const SensitiveActionContext = createContext<SensitiveActionContextValue | null>(null);

interface PendingEntry {
  fn: SensitiveAction;
  options: RequireOptions;
}

export const SensitiveActionProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const pendingRef = useRef<PendingEntry | null>(null);
  const { toast } = useToast();

  const runPending = useCallback(async (reauthRequired: boolean) => {
    const entry = pendingRef.current;
    pendingRef.current = null;
    if (!entry) return;
    try {
      await entry.fn();
      void logAdminAction(entry.options.action, {
        ...(entry.options.metadata ?? {}),
        reauth_required: reauthRequired,
      });
    } catch (err) {
      console.error('Sensitive action failed', err);
      void logAdminAction(`${entry.options.action}.failed`, {
        ...(entry.options.metadata ?? {}),
        reauth_required: reauthRequired,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }, []);

  const requireFreshAal2 = useCallback(
    (fn: SensitiveAction, options: RequireOptions) => {
      if (isAal2Fresh()) {
        pendingRef.current = { fn, options };
        void runPending(false);
        return;
      }
      pendingRef.current = { fn, options };
      setOpen(true);
    },
    [runPending],
  );

  const handleCancel = useCallback(() => {
    const entry = pendingRef.current;
    pendingRef.current = null;
    setOpen(false);
    if (entry) {
      void logAdminAction(`${entry.options.action}.cancelled`, entry.options.metadata);
    }
    toast({
      title: 'Action cancelled',
      description: 'MFA confirmation is required for this action.',
    });
  }, [toast]);

  const handleVerified = useCallback(() => {
    setOpen(false);
    void runPending(true);
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
