import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  quote: string;
  image_url?: string;
  display_order?: number;
  active?: boolean;
}

export const useTestimonialsManagement = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast({
        title: "Error Loading Testimonials",
        description: "Failed to load testimonials. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addTestimonial = async (testimonial: Omit<Testimonial, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .insert([testimonial])
        .select()
        .single();

      if (error) throw error;

      setTestimonials(prev => [...prev, data]);
      toast({
        title: "Success",
        description: "Testimonial added successfully.",
      });
      return true;
    } catch (error: any) {
      console.error('Error adding testimonial:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add testimonial.",
        variant: "destructive"
      });
      return false;
    }
  };

  const updateTestimonial = async (id: string, updates: Partial<Testimonial>) => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setTestimonials(prev => 
        prev.map(testimonial => testimonial.id === id ? data : testimonial)
      );
      toast({
        title: "Success",
        description: "Testimonial updated successfully.",
      });
      return true;
    } catch (error: any) {
      console.error('Error updating testimonial:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update testimonial.",
        variant: "destructive"
      });
      return false;
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTestimonials(prev => prev.filter(testimonial => testimonial.id !== id));
      toast({
        title: "Success",
        description: "Testimonial deleted successfully.",
      });
      return true;
    } catch (error: any) {
      console.error('Error deleting testimonial:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete testimonial.",
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    testimonials,
    loading,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    refetch: fetchTestimonials
  };
};
