import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface SuccessStory {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  category: string | null;
  display_order: number;
  active: boolean;
  view_count?: number;
  created_at?: string | null;
  updated_at?: string | null;
}

export const useSuccessStoriesManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ['success-stories'],
    queryFn: async () => {
      // RLS handles filtering - admins see all, public sees active only
      const { data, error } = await supabase
        .from('success_stories')
        .select('*')
        .order('display_order');
      
      if (error) throw error;
      return data as SuccessStory[];
    }
  });

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `success-stories/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('uploads')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('uploads')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const deleteImage = async (imageUrl: string | null) => {
    if (!imageUrl) return;
    
    try {
      const path = imageUrl.split('/uploads/')[1];
      if (path) {
        await supabase.storage.from('uploads').remove([path]);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const addMutation = useMutation({
    mutationFn: async ({ story, imageFile }: { story: Omit<SuccessStory, 'id'>; imageFile?: File }) => {
      let image_url = story.image_url;
      
      if (imageFile) {
        image_url = await uploadImage(imageFile);
      }

      const { error } = await supabase
        .from('success_stories')
        .insert({
          title: story.title,
          description: story.description,
          image_url,
          category: story.category,
          display_order: story.display_order
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['success-stories'] });
      toast({
        title: "Success",
        description: "Success story added successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add success story.",
        variant: "destructive",
      });
      console.error(error);
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ story, imageFile }: { story: SuccessStory; imageFile?: File }) => {
      let image_url = story.image_url;
      
      if (imageFile) {
        await deleteImage(story.image_url);
        image_url = await uploadImage(imageFile);
      }

      const { error } = await supabase
        .from('success_stories')
        .update({
          title: story.title,
          description: story.description,
          image_url,
          category: story.category,
          display_order: story.display_order
        })
        .eq('id', story.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['success-stories'] });
      toast({
        title: "Success",
        description: "Success story updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update success story.",
        variant: "destructive",
      });
      console.error(error);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (story: SuccessStory) => {
      await deleteImage(story.image_url);
      
      const { error } = await supabase
        .from('success_stories')
        .update({ active: false })
        .eq('id', story.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['success-stories'] });
      toast({
        title: "Success",
        description: "Success story deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete success story.",
        variant: "destructive",
      });
      console.error(error);
    }
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, active }: { id: string; active: boolean }) => {
      const { error } = await supabase
        .from('success_stories')
        .update({ active })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: (_, { active }) => {
      queryClient.invalidateQueries({ queryKey: ['success-stories'] });
      toast({
        title: "Success",
        description: `Story ${active ? 'activated' : 'deactivated'} successfully.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update story status.",
        variant: "destructive",
      });
      console.error(error);
    }
  });

  const bulkToggleActiveMutation = useMutation({
    mutationFn: async ({ ids, active }: { ids: string[]; active: boolean }) => {
      const { error } = await supabase
        .from('success_stories')
        .update({ active })
        .in('id', ids);
      
      if (error) throw error;
    },
    onSuccess: (_, { ids, active }) => {
      queryClient.invalidateQueries({ queryKey: ['success-stories'] });
      toast({
        title: "Success",
        description: `${ids.length} stories ${active ? 'activated' : 'deactivated'} successfully.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update stories status.",
        variant: "destructive",
      });
      console.error(error);
    }
  });

  return {
    stories,
    loading: isLoading,
    addStory: addMutation.mutateAsync,
    updateStory: updateMutation.mutateAsync,
    deleteStory: deleteMutation.mutateAsync,
    toggleStoryActive: (id: string, active: boolean) => 
      toggleActiveMutation.mutateAsync({ id, active }),
    bulkToggleStoriesActive: (ids: string[], active: boolean) =>
      bulkToggleActiveMutation.mutateAsync({ ids, active }),
  };
};
