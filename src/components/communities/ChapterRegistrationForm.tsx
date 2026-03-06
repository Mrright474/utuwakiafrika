import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { UserPlus, Loader2 } from 'lucide-react';

const ChapterRegistrationForm = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    registration_type: 'join',
    business_type: '',
    message: '',
  });

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.full_name.trim() || !form.email.trim() || !form.country.trim() || !form.city.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    if (!form.email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await (supabase as any)
        .from('community_registrations')
        .insert({
          full_name: form.full_name.trim(),
          email: form.email.toLowerCase().trim(),
          phone: form.phone.trim() || null,
          country: form.country.trim(),
          city: form.city.trim(),
          registration_type: form.registration_type,
          business_type: form.business_type.trim() || null,
          message: form.message.trim() || null,
        });

      if (error) throw error;

      toast.success('Registration submitted! We'll be in touch soon.');
      setForm({
        full_name: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        registration_type: 'join',
        business_type: '',
        message: '',
      });
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="register" className="py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <UserPlus className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="text-2xl md:text-3xl font-heading">
              Join or Start a Chapter
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Fill in the form below and our team will connect you with a community near you — or help you start one.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input
                    id="full_name"
                    value={form.full_name}
                    onChange={e => handleChange('full_name', e.target.value)}
                    placeholder="Your full name"
                    maxLength={100}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={e => handleChange('email', e.target.value)}
                    placeholder="you@example.com"
                    maxLength={255}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                    placeholder="+1 234 567 890"
                    maxLength={20}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registration_type">I want to *</Label>
                  <Select value={form.registration_type} onValueChange={v => handleChange('registration_type', v)}>
                    <SelectTrigger id="registration_type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="join">Join an existing chapter</SelectItem>
                      <SelectItem value="start">Start a new chapter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    value={form.country}
                    onChange={e => handleChange('country', e.target.value)}
                    placeholder="e.g. Uganda"
                    maxLength={100}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City / Area *</Label>
                  <Input
                    id="city"
                    value={form.city}
                    onChange={e => handleChange('city', e.target.value)}
                    placeholder="e.g. Kampala"
                    maxLength={100}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="business_type">Your Business / Profession</Label>
                <Input
                  id="business_type"
                  value={form.business_type}
                  onChange={e => handleChange('business_type', e.target.value)}
                  placeholder="e.g. Restaurant owner, Software developer"
                  maxLength={200}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Anything else you'd like us to know?</Label>
                <Textarea
                  id="message"
                  value={form.message}
                  onChange={e => handleChange('message', e.target.value)}
                  placeholder="Tell us about your interests or what you hope to gain..."
                  maxLength={1000}
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {loading ? 'Submitting...' : 'Submit Registration'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ChapterRegistrationForm;
