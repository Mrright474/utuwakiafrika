import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, ShieldCheck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { markAal2Verified } from '@/lib/adminSession';

interface ReauthDialogProps {
  open: boolean;
  onCancel: () => void;
  onVerified: () => void;
}

const ReauthDialog = ({ open, onCancel, onVerified }: ReauthDialogProps) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [working, setWorking] = useState(false);

  useEffect(() => {
    if (!open) {
      setCode('');
      setError(null);
      setWorking(false);
    }
  }, [open]);

  const handleVerify = async () => {
    setError(null);
    if (!/^\d{6}$/.test(code)) {
      setError('Enter the 6-digit code from your authenticator app.');
      return;
    }
    setWorking(true);
    try {
      const { data: factors, error: lfErr } = await supabase.auth.mfa.listFactors();
      if (lfErr) {
        setError(lfErr.message);
        return;
      }
      const factor = (factors?.totp ?? []).find((f) => f.status === 'verified');
      if (!factor) {
        setError('No verified TOTP factor on this account.');
        return;
      }
      const { error: cvErr } = await supabase.auth.mfa.challengeAndVerify({
        factorId: factor.id,
        code,
      });
      if (cvErr) {
        setError(cvErr.message);
        return;
      }
      markAal2Verified();
      onVerified();
    } finally {
      setWorking(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onCancel(); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-utu-red" />
            Confirm with MFA
          </DialogTitle>
          <DialogDescription>
            This action is sensitive. Enter a fresh 6-digit code from your authenticator app to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="reauth-code">Authentication code</Label>
          <Input
            id="reauth-code"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder="123456"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            disabled={working}
            autoFocus
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel} disabled={working}>
            Cancel
          </Button>
          <Button
            onClick={handleVerify}
            disabled={working || code.length !== 6}
            className="bg-utu-red hover:bg-red-700"
          >
            {working ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
            Verify
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReauthDialog;
