
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface EventItem {
  id: string;
  title: string;
  description: string;
  event_date: string;
  event_time: string | null;
  location: string | null;
  image_url: string | null;
  attendees: string | null;
  category: string | null;
  impact: string | null;
  active: boolean | null;
  display_order: number | null;
  created_at: string | null;
  updated_at: string | null;
}

export const useEventsManagement = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setEvents((data as EventItem[]) || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const addEvent = async (event: Partial<EventItem>, imageFile?: File | null) => {
    try {
      let image_url = event.image_url || '';

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `events/${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('uploads')
          .upload(fileName, imageFile);
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from('uploads').getPublicUrl(fileName);
        image_url = urlData.publicUrl;
      }

      const { error } = await supabase.from('events').insert({
        title: event.title || '',
        description: event.description || '',
        event_date: event.event_date || '',
        event_time: event.event_time || null,
        location: event.location || null,
        image_url: image_url || null,
        attendees: event.attendees || null,
        category: event.category || 'upcoming',
        impact: event.impact || null,
        display_order: events.length,
        active: true,
      });

      if (error) throw error;
      toast.success('Event added successfully');
      await fetchEvents();
    } catch (error: any) {
      toast.error('Failed to add event: ' + error.message);
      throw error;
    }
  };

  const updateEvent = async (event: EventItem, imageFile?: File | null) => {
    try {
      let image_url = event.image_url;

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `events/${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('uploads')
          .upload(fileName, imageFile);
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from('uploads').getPublicUrl(fileName);
        image_url = urlData.publicUrl;
      }

      const { error } = await supabase
        .from('events')
        .update({
          title: event.title,
          description: event.description,
          event_date: event.event_date,
          event_time: event.event_time,
          location: event.location,
          image_url,
          attendees: event.attendees,
          category: event.category,
          impact: event.impact,
        })
        .eq('id', event.id);

      if (error) throw error;
      toast.success('Event updated successfully');
      await fetchEvents();
    } catch (error: any) {
      toast.error('Failed to update event: ' + error.message);
      throw error;
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const { error } = await supabase.from('events').delete().eq('id', id);
      if (error) throw error;
      toast.success('Event deleted successfully');
      await fetchEvents();
    } catch (error: any) {
      toast.error('Failed to delete event: ' + error.message);
    }
  };

  const toggleEventActive = async (id: string, active: boolean) => {
    try {
      const { error } = await supabase.from('events').update({ active }).eq('id', id);
      if (error) throw error;
      toast.success(active ? 'Event activated' : 'Event deactivated');
      await fetchEvents();
    } catch (error: any) {
      toast.error('Failed to toggle event: ' + error.message);
    }
  };

  return {
    events,
    loading,
    addEvent,
    updateEvent,
    deleteEvent,
    toggleEventActive,
  };
};
