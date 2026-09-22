import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Smartphone, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface DonationChannel {
  key: string;
  name: string;
  number: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  channel: DonationChannel | null;
  amount: number;
  dialHref: (amount: number) => string;
}

const formatAmount = (value: number) => value.toLocaleString('en-UG', { maximumFractionDigits: 0 });

const DonationDetailsDialog = ({ open, onOpenChange, channel, amount, dialHref }: Props) => {
  const { toast } = useToast();
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [note, setNote] = React.useState('');
  const [saving, setSaving] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!channel) return;

    if (!name.trim() || phone.replace(/\D/g, '').length < 9) {
      toast({
        title: 'Missing details',
        description: 'Please enter your name and a valid phone number.',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    const { error } = await supabase.from('donation_requests').insert({
      donor_name: name.trim().slice(0, 100),
      phone: phone.trim().slice(0, 20),
      email: email.trim().toLowerCase().slice(0, 255) || null,
      amount,
      currency: 'UGX',
      provider: channel.key,
      note: note.trim().slice(0, 500) || null,
    });
    setSaving(false);

    if (error) {
      toast({
        title: 'Could not save your details',
        description: 'You can still continue and pay with mobile money.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Thank you, ' + name.trim().split(' ')[0],
        description: `Your pending donation of UGX ${formatAmount(amount)} was recorded. Complete it on your phone.`,
      });
    }

    onOpenChange(false);
    window.location.href = dialHref(amount);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Donation details</DialogTitle>
          <DialogDescription>
            {channel
              ? `Confirm your details, then we'll open ${channel.name} with UGX ${formatAmount(amount)} ready to send.`
              : ''}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="donor-name">Full name</Label>
            <Input
              id="donor-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              maxLength={100}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="donor-phone">Phone number</Label>
            <Input
              id="donor-phone"
              type="tel"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="07XX XXX XXX"
              maxLength={20}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="donor-email">Email (optional)</Label>
            <Input
              id="donor-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              maxLength={255}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="donor-amount">Amount (UGX)</Label>
            <Input id="donor-amount" value={formatAmount(amount)} readOnly className="font-semibold" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="donor-note">Message (optional)</Label>
            <Textarea
              id="donor-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Dedicate your gift or tell us what to support"
              maxLength={500}
              rows={3}
            />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={saving}>
            {saving ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Smartphone className="mr-2 h-5 w-5" />
            )}
            {saving ? 'Saving…' : `Continue to ${channel?.name ?? 'mobile money'}`}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DonationDetailsDialog;
