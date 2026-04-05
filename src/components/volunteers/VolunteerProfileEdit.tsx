import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface ProfileData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  city?: string;
  country?: string;
  volunteer_area?: string;
  skills?: string;
  motivation?: string;
  availability?: string;
  occupation?: string;
  languages?: string;
  emergency_contact?: string;
  emergency_phone?: string;
}

interface VolunteerProfileEditProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: ProfileData;
  onSaved: () => void;
}

const VolunteerProfileEdit = ({ open, onOpenChange, profile, onSaved }: VolunteerProfileEditProps) => {
  const [form, setForm] = useState({
    first_name: profile.first_name,
    last_name: profile.last_name,
    phone: profile.phone || '',
    city: profile.city || '',
    country: profile.country || '',
    volunteer_area: profile.volunteer_area || '',
    skills: profile.skills || '',
    motivation: profile.motivation || '',
    availability: profile.availability || '',
    occupation: profile.occupation || '',
    languages: profile.languages || '',
    emergency_contact: profile.emergency_contact || '',
    emergency_phone: profile.emergency_phone || '',
  });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.first_name.trim() || !form.last_name.trim()) {
      toast({ title: "First and last name are required", variant: "destructive" });
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from('volunteer_profiles')
        .update({
          first_name: form.first_name.trim(),
          last_name: form.last_name.trim(),
          phone: form.phone.trim() || null,
          city: form.city.trim() || null,
          country: form.country.trim() || null,
          volunteer_area: form.volunteer_area.trim() || null,
          skills: form.skills.trim() || null,
          motivation: form.motivation.trim() || null,
          availability: form.availability.trim() || null,
          occupation: form.occupation.trim() || null,
          languages: form.languages.trim() || null,
          emergency_contact: form.emergency_contact.trim() || null,
          emergency_phone: form.emergency_phone.trim() || null,
        })
        .eq('id', profile.id);

      if (error) throw error;

      toast({ title: "Profile updated!", description: "Your changes have been saved." });
      onSaved();
      onOpenChange(false);
    } catch (err: any) {
      console.error('Update error:', err);
      toast({ title: "Update failed", description: err.message || "Please try again.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Your Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-fname">First Name *</Label>
              <Input id="edit-fname" value={form.first_name} onChange={e => handleChange('first_name', e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="edit-lname">Last Name *</Label>
              <Input id="edit-lname" value={form.last_name} onChange={e => handleChange('last_name', e.target.value)} required />
            </div>
          </div>

          <div>
            <Label htmlFor="edit-phone">Phone</Label>
            <Input id="edit-phone" value={form.phone} onChange={e => handleChange('phone', e.target.value)} placeholder="+256 7XX XXX XXX" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-city">City</Label>
              <Input id="edit-city" value={form.city} onChange={e => handleChange('city', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="edit-country">Country</Label>
              <Input id="edit-country" value={form.country} onChange={e => handleChange('country', e.target.value)} />
            </div>
          </div>

          <div>
            <Label htmlFor="edit-occupation">Occupation</Label>
            <Input id="edit-occupation" value={form.occupation} onChange={e => handleChange('occupation', e.target.value)} />
          </div>

          <div>
            <Label htmlFor="edit-area">Volunteer Area</Label>
            <Select value={form.volunteer_area} onValueChange={v => handleChange('volunteer_area', v)}>
              <SelectTrigger id="edit-area">
                <SelectValue placeholder="Select area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="education">Education & Scholarships</SelectItem>
                <SelectItem value="health">Health & Sanitation</SelectItem>
                <SelectItem value="livelihood">Livelihood & Entrepreneurship</SelectItem>
                <SelectItem value="gender">Gender Equality</SelectItem>
                <SelectItem value="youth">Youth Leadership</SelectItem>
                <SelectItem value="culture">Pan-African Culture</SelectItem>
                <SelectItem value="general">General Support</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="edit-availability">Availability</Label>
            <Select value={form.availability} onValueChange={v => handleChange('availability', v)}>
              <SelectTrigger id="edit-availability">
                <SelectValue placeholder="Select availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekdays">Weekdays</SelectItem>
                <SelectItem value="weekends">Weekends</SelectItem>
                <SelectItem value="both">Both</SelectItem>
                <SelectItem value="flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="edit-skills">Skills</Label>
            <Textarea id="edit-skills" value={form.skills} onChange={e => handleChange('skills', e.target.value)} placeholder="e.g. Teaching, First Aid, Project Management" rows={2} />
          </div>

          <div>
            <Label htmlFor="edit-languages">Languages</Label>
            <Input id="edit-languages" value={form.languages} onChange={e => handleChange('languages', e.target.value)} placeholder="e.g. English, Swahili, French" />
          </div>

          <div>
            <Label htmlFor="edit-motivation">Motivation</Label>
            <Textarea id="edit-motivation" value={form.motivation} onChange={e => handleChange('motivation', e.target.value)} rows={2} />
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-semibold mb-3">Emergency Contact</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-ec-name">Contact Name</Label>
                <Input id="edit-ec-name" value={form.emergency_contact} onChange={e => handleChange('emergency_contact', e.target.value)} />
              </div>
              <div>
                <Label htmlFor="edit-ec-phone">Contact Phone</Label>
                <Input id="edit-ec-phone" value={form.emergency_phone} onChange={e => handleChange('emergency_phone', e.target.value)} />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={saving}>
              {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VolunteerProfileEdit;
