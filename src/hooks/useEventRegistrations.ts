import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface EventRegistration {
  id: string;
  event_id: string;
  full_name: string;
  email: string;
  phone: string | null;
  organization: string | null;
  message: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  event_title?: string;
}

export const useEventRegistrations = () => {
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchRegistrations = useCallback(async () => {
    try {
      setLoading(true);
      // Fetch registrations
      const { data: regData, error: regError } = await (supabase as any)
        .from('event_registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (regError) throw regError;

      // Fetch events to map titles
      const { data: eventsData } = await supabase
        .from('events')
        .select('id, title');

      const eventMap = new Map((eventsData || []).map((e: any) => [e.id, e.title]));

      const enriched = (regData || []).map((r: any) => ({
        ...r,
        event_title: eventMap.get(r.event_id) || 'Unknown Event',
      }));

      setRegistrations(enriched);
    } catch (err: any) {
      console.error('Error fetching registrations:', err);
      toast({ title: 'Error loading registrations', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  const updateRegistrationStatus = async (id: string, status: string) => {
    try {
      const { error } = await (supabase as any)
        .from('event_registrations')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setRegistrations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
      toast({ title: `Registration ${status}` });
    } catch (err: any) {
      toast({ title: 'Error updating registration', description: err.message, variant: 'destructive' });
    }
  };

  const deleteRegistration = async (id: string) => {
    try {
      const { error } = await (supabase as any)
        .from('event_registrations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setRegistrations(prev => prev.filter(r => r.id !== id));
      toast({ title: 'Registration deleted' });
    } catch (err: any) {
      toast({ title: 'Error deleting registration', description: err.message, variant: 'destructive' });
    }
  };

  return { registrations, loading, fetchRegistrations, updateRegistrationStatus, deleteRegistration };
};
