import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  image_url: string | null;
  active?: boolean;
}

const uploadImage = async (file: File, folder: string = 'testimonials'): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${folder}/${Math.random().toString(36).substring(2)}.${fileExt}`;
  
  const { error: uploadError } = await supabase.storage
    .from('uploads')
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from('uploads')
    .getPublicUrl(fileName);

  return data.publicUrl;
};

export const useTestimonialsManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      // RLS handles filtering - admins see all, public sees active only
      const { data, error } = await (supabase as any)
        .from('testimonials')
        .select('*')
        .order('display_order');
      
      if (error) throw error;
      return (data as any[]).map((testimonial: any) => ({
        id: testimonial.id,
        name: testimonial.name,
        role: testimonial.role,
        quote: testimonial.quote,
        image_url: testimonial.image_url,
        active: testimonial.active
      }));
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ testimonial, file }: { testimonial: Testimonial; file?: File }) => {
      let imageUrl = testimonial.image_url;
      
      if (file) {
        imageUrl = await uploadImage(file, 'testimonials');
      }

      const { error } = await (supabase as any)
        .from('testimonials')
        .update({
          name: testimonial.name,
          role: testimonial.role,
          quote: testimonial.quote,
          image_url: imageUrl
        })
        .eq('id', testimonial.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast({
        title: "Success",
        description: "Testimonial updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update testimonial.",
        variant: "destructive",
      });
      console.error(error);
    }
  });

  const addMutation = useMutation({
    mutationFn: async ({ testimonial, file }: { testimonial: Omit<Testimonial, 'id'>; file?: File }) => {
      let imageUrl = testimonial.image_url;
      
      if (file) {
        imageUrl = await uploadImage(file, 'testimonials');
      }

      const { error } = await (supabase as any)
        .from('testimonials')
        .insert({
          name: testimonial.name,
          role: testimonial.role,
          quote: testimonial.quote,
          image_url: imageUrl
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast({
        title: "Success",
        description: "Testimonial added successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add testimonial.",
        variant: "destructive",
      });
      console.error(error);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any)
        .from('testimonials')
        .update({ active: false })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast({
        title: "Success",
        description: "Testimonial deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete testimonial.",
        variant: "destructive",
      });
      console.error(error);
    }
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, active }: { id: string; active: boolean }) => {
      const { error } = await (supabase as any)
        .from('testimonials')
        .update({ active })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: (_, { active }) => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast({
        title: "Success",
        description: `Testimonial ${active ? 'activated' : 'deactivated'} successfully.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update testimonial status.",
        variant: "destructive",
      });
      console.error(error);
    }
  });

  return {
    testimonials,
    loading: isLoading,
    addTestimonial: (testimonial: Omit<Testimonial, 'id'>, file?: File) => 
      addMutation.mutateAsync({ testimonial, file }),
    updateTestimonial: (testimonial: Testimonial, file?: File) => 
      updateMutation.mutateAsync({ testimonial, file }),
    deleteTestimonial: deleteMutation.mutateAsync,
    toggleTestimonialActive: (id: string, active: boolean) => 
      toggleActiveMutation.mutateAsync({ id, active }),
    refetch: () => queryClient.invalidateQueries({ queryKey: ['testimonials'] })
  };
};