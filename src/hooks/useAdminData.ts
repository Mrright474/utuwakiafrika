import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: string;
  created_at: string;
}

interface NewsletterSubscriber {
  id: string;
  email: string;
  status: string;
  subscribed_at: string;
  unsubscribed_at?: string;
}

interface VolunteerProfile {
  id: string;
  user_id: string;
  volunteer_id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  city?: string;
  country?: string;
  status: string;
  skills?: string;
  experience?: string;
  motivation?: string;
  created_at: string;
}

interface VolunteerHours {
  id: string;
  volunteer_id: string;
  activity_date: string;
  hours: number;
  activity_type: string;
  description?: string;
  location?: string;
  verified: boolean;
  verified_by?: string;
  created_at: string;
  volunteer_profiles?: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

export interface CommunityRegistration {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  country: string;
  city: string;
  registration_type: string;
  business_type?: string;
  message?: string;
  status: string;
  created_at: string;
}

export const useAdminData = (isAdmin: boolean) => {
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [newsletterSubscribers, setNewsletterSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [volunteerProfiles, setVolunteerProfiles] = useState<VolunteerProfile[]>([]);
  const [volunteerHours, setVolunteerHours] = useState<VolunteerHours[]>([]);
  const [communityRegistrations, setCommunityRegistrations] = useState<CommunityRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (isAdmin) {
      fetchAllData();
    } else {
      setLoading(false);
    }
  }, [isAdmin]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchContactSubmissions(),
        fetchNewsletterSubscribers(),
        fetchVolunteerProfiles(),
        fetchVolunteerHours(),
        fetchCommunityRegistrations()
      ]);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast({
        title: "Error Loading Data",
        description: "Failed to load admin data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchContactSubmissions = async () => {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setContactSubmissions(data || []);
  };

  const fetchNewsletterSubscribers = async () => {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('subscribed_at', { ascending: false });
    if (!error) setNewsletterSubscribers(data || []);
  };

  const fetchVolunteerProfiles = async () => {
    const { data, error } = await supabase
      .from('volunteer_profiles')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setVolunteerProfiles(data || []);
  };

  const fetchVolunteerHours = async () => {
    const { data, error } = await supabase
      .from('volunteer_hours')
      .select(`*, volunteer_profiles (first_name, last_name, email)`)
      .order('activity_date', { ascending: false });
    if (!error) setVolunteerHours(data || []);
  };

  const fetchCommunityRegistrations = async () => {
    const { data, error } = await (supabase as any)
      .from('community_registrations')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setCommunityRegistrations(data || []);
  };

  const updateContactStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('contact_submissions')
      .update({ status })
      .eq('id', id);
    if (error) {
      toast({ title: "Update Failed", description: error.message, variant: "destructive" });
      return false;
    }
    setContactSubmissions(prev => prev.map(item => item.id === id ? { ...item, status } : item));
    toast({ title: "Status Updated", description: "Contact submission status updated successfully." });
    return true;
  };

  const updateVolunteerStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('volunteer_profiles')
      .update({ status })
      .eq('id', id);
    if (error) {
      toast({ title: "Update Failed", description: error.message, variant: "destructive" });
      return false;
    }
    setVolunteerProfiles(prev => prev.map(item => item.id === id ? { ...item, status } : item));
    toast({ title: "Status Updated", description: "Volunteer status updated successfully." });
    return true;
  };

  const verifyVolunteerHours = async (id: string, verified: boolean) => {
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase
      .from('volunteer_hours')
      .update({ verified, verified_by: verified ? user?.id : null })
      .eq('id', id);
    if (error) {
      toast({ title: "Verification Failed", description: error.message, variant: "destructive" });
      return false;
    }
    setVolunteerHours(prev => prev.map(item => item.id === id ? { ...item, verified, verified_by: verified ? user?.id : undefined } : item));
    toast({ title: verified ? "Hours Verified" : "Verification Removed", description: verified ? "Volunteer hours have been verified." : "Verification has been removed." });
    return true;
  };

  const deleteContactSubmission = async (id: string) => {
    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', id);
    if (error) {
      toast({ title: "Delete Failed", description: error.message, variant: "destructive" });
      return false;
    }
    setContactSubmissions(prev => prev.filter(item => item.id !== id));
    toast({ title: "Deleted", description: "Contact submission deleted successfully." });
    return true;
  };

  const updateCommunityRegistrationStatus = async (id: string, status: string) => {
    const { error } = await (supabase as any)
      .from('community_registrations')
      .update({ status })
      .eq('id', id);
    if (error) {
      toast({ title: "Update Failed", description: error.message, variant: "destructive" });
      return false;
    }
    setCommunityRegistrations(prev => prev.map(item => item.id === id ? { ...item, status } : item));
    toast({ title: "Status Updated", description: "Community registration status updated." });
    return true;
  };

  const deleteCommunityRegistration = async (id: string) => {
    const { error } = await (supabase as any)
      .from('community_registrations')
      .delete()
      .eq('id', id);
    if (error) {
      toast({ title: "Delete Failed", description: error.message, variant: "destructive" });
      return false;
    }
    setCommunityRegistrations(prev => prev.filter(item => item.id !== id));
    toast({ title: "Deleted", description: "Community registration deleted." });
    return true;
  };

  return {
    contactSubmissions,
    newsletterSubscribers,
    volunteerProfiles,
    volunteerHours,
    communityRegistrations,
    loading,
    refetch: fetchAllData,
    updateContactStatus,
    updateVolunteerStatus,
    verifyVolunteerHours,
    deleteContactSubmission,
    updateCommunityRegistrationStatus,
    deleteCommunityRegistration
  };
};