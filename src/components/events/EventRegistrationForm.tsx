import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, Loader2 } from 'lucide-react';

interface EventRegistrationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventId: string;
  eventTitle: string;
  eventDate: string;
}

const EventRegistrationForm = ({ open, onOpenChange, eventId, eventTitle, eventDate }: EventRegistrationFormProps) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      toast({ title: "Please fill in your name and email", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from('event_registrations' as any).insert({
        event_id: eventId,
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        organization: organization.trim() || null,
        message: message.trim() || null,
      });

      if (error) throw error;

      setSubmitted(true);
      toast({ title: "Registration successful!", description: `You're registered for ${eventTitle}.` });
    } catch (err: any) {
      console.error('Registration error:', err);
      toast({ title: "Registration failed", description: err.message || "Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset after close animation
    setTimeout(() => {
      setFullName('');
      setEmail('');
      setPhone('');
      setOrganization('');
      setMessage('');
      setSubmitted(false);
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{submitted ? 'Registration Complete!' : `Register for Event`}</DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">You're Registered!</h3>
            <p className="text-muted-foreground text-sm mb-1">
              <strong>{eventTitle}</strong>
            </p>
            <p className="text-muted-foreground text-sm mb-4">{eventDate}</p>
            <p className="text-muted-foreground text-xs">
              A confirmation will be sent to <strong>{email}</strong>.
            </p>
            <Button className="mt-4" onClick={handleClose}>Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            <p className="text-sm text-muted-foreground">
              <strong>{eventTitle}</strong> — {eventDate}
            </p>
            <div>
              <Label htmlFor="reg-name">Full Name *</Label>
              <Input id="reg-name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your full name" required />
            </div>
            <div>
              <Label htmlFor="reg-email">Email *</Label>
              <Input id="reg-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required />
            </div>
            <div>
              <Label htmlFor="reg-phone">Phone (Optional)</Label>
              <Input id="reg-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+256 7XX XXX XXX" />
            </div>
            <div>
              <Label htmlFor="reg-org">Organization (Optional)</Label>
              <Input id="reg-org" value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder="Your organization" />
            </div>
            <div>
              <Label htmlFor="reg-msg">Message (Optional)</Label>
              <Textarea id="reg-msg" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Any questions or special requirements?" rows={3} />
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registering...</> : 'Register Now'}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EventRegistrationForm;
