import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Loader2, ShieldCheck, ShieldAlert, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useSensitiveAction } from '@/hooks/useSensitiveAction';
import { markAal2Verified } from '@/lib/adminSession';

interface EnrollState {
  factorId: string;
  qrSvg: string;
  secret: string;
  uri: string;
}

const MfaSettings: React.FC = () => {
  const { toast } = useToast();
  const { requireFreshAal2 } = useSensitiveAction();
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);
  const [verifiedFactors, setVerifiedFactors] = useState<Array<{ id: string; friendly_name?: string | null; created_at: string }>>([]);
  const [enroll, setEnroll] = useState<EnrollState | null>(null);
  const [code, setCode] = useState('');

  const loadFactors = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.mfa.listFactors();
    if (error) {
      toast({ title: 'Failed to load MFA factors', description: error.message, variant: 'destructive' });
    } else {
      setVerifiedFactors((data?.totp ?? []).filter(f => f.status === 'verified') as any);
      // clean up unverified factors silently
      const unverified = (data?.all ?? []).filter((f: any) => f.status !== 'verified');
      for (const f of unverified) {
        await supabase.auth.mfa.unenroll({ factorId: f.id });
      }
    }
    setLoading(false);
  };

  useEffect(() => { loadFactors(); }, []);

  const startEnroll = async () => {
    setWorking(true);
    setCode('');
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: 'totp',
      friendlyName: `Admin TOTP ${new Date().toISOString().slice(0, 10)}`,
    });
    setWorking(false);
    if (error || !data) {
      toast({ title: 'Enrollment failed', description: error?.message ?? 'Unknown error', variant: 'destructive' });
      return;
    }
    setEnroll({
      factorId: data.id,
      qrSvg: data.totp.qr_code,
      secret: data.totp.secret,
      uri: data.totp.uri,
    });
  };

  const cancelEnroll = async () => {
    if (!enroll) return;
    await supabase.auth.mfa.unenroll({ factorId: enroll.factorId });
    setEnroll(null);
    setCode('');
  };

  const verifyEnroll = async () => {
    if (!enroll) return;
    if (!/^\d{6}$/.test(code)) {
      toast({ title: 'Invalid code', description: 'Enter the 6-digit code from your authenticator app.', variant: 'destructive' });
      return;
    }
    setWorking(true);
    const { data: challenge, error: cErr } = await supabase.auth.mfa.challenge({ factorId: enroll.factorId });
    if (cErr || !challenge) {
      setWorking(false);
      toast({ title: 'Challenge failed', description: cErr?.message ?? 'Unknown error', variant: 'destructive' });
      return;
    }
    const { error: vErr } = await supabase.auth.mfa.verify({
      factorId: enroll.factorId,
      challengeId: challenge.id,
      code,
    });
    setWorking(false);
    if (vErr) {
      toast({ title: 'Verification failed', description: vErr.message, variant: 'destructive' });
      return;
    }
    markAal2Verified();
    toast({ title: 'MFA enabled', description: 'Two-factor authentication is now active on your account.' });
    setEnroll(null);
    setCode('');
    loadFactors();
  };

  const removeFactor = (factorId: string) => {
    if (!confirm('Remove this MFA factor? You will no longer be required to enter a code at sign-in.')) return;
    requireFreshAal2(async () => {
      setWorking(true);
      const { error } = await supabase.auth.mfa.unenroll({ factorId });
      setWorking(false);
      if (error) {
        toast({ title: 'Failed to remove factor', description: error.message, variant: 'destructive' });
        return;
      }
      toast({ title: 'MFA factor removed' });
      loadFactors();
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-utu-red" />
      </div>
    );
  }

  const isEnabled = verifiedFactors.length > 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {isEnabled ? <ShieldCheck className="h-5 w-5 text-green-600" /> : <ShieldAlert className="h-5 w-5 text-yellow-600" />}
              Multi-Factor Authentication
            </CardTitle>
            <CardDescription>
              Protect your admin account with a time-based one-time password (TOTP) from an authenticator app.
            </CardDescription>
          </div>
          <Badge variant={isEnabled ? 'default' : 'secondary'}>{isEnabled ? 'Enabled' : 'Disabled'}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {isEnabled && (
          <div className="space-y-2">
            <Label>Registered factors</Label>
            {verifiedFactors.map(f => (
              <div key={f.id} className="flex items-center justify-between rounded border p-3">
                <div>
                  <div className="font-medium">{f.friendly_name || 'TOTP'}</div>
                  <div className="text-xs text-muted-foreground">
                    Added {new Date(f.created_at).toLocaleDateString()}
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => removeFactor(f.id)} disabled={working}>
                  <Trash2 className="h-4 w-4 mr-1" /> Remove
                </Button>
              </div>
            ))}
          </div>
        )}

        {!enroll && (
          <Button onClick={startEnroll} disabled={working} className="bg-utu-red hover:bg-red-700">
            {working ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
            {isEnabled ? 'Add another authenticator' : 'Enable MFA'}
          </Button>
        )}

        {enroll && (
          <div className="space-y-4 rounded-lg border p-4">
            <div>
              <h4 className="font-semibold mb-1">1. Scan the QR code</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Open Google Authenticator, 1Password, Authy, or any TOTP app and scan this code.
              </p>
              <div
                className="inline-block bg-white p-3 rounded border"
                // Supabase returns the QR as an SVG string
                dangerouslySetInnerHTML={{ __html: enroll.qrSvg }}
              />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Can't scan? Enter this key manually</h4>
              <code className="block break-all rounded bg-muted px-2 py-1 text-xs">{enroll.secret}</code>
            </div>
            <div className="space-y-2">
              <Label htmlFor="totp-code">2. Enter the 6-digit code</Label>
              <Input
                id="totp-code"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                placeholder="123456"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                disabled={working}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={verifyEnroll} disabled={working || code.length !== 6} className="bg-utu-red hover:bg-red-700">
                {working ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                Verify & enable
              </Button>
              <Button variant="outline" onClick={cancelEnroll} disabled={working}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MfaSettings;
