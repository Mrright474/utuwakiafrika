import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string | null;
  display_order: number;
  active: boolean;
}

export const useGalleryManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: images = [], isLoading } = useQuery({
    queryKey: ['gallery-images'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('active', true)
        .order('display_order');
      
      if (error) throw error;
      return data as GalleryImage[];
    }
  });

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `gallery/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('uploads')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('uploads')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const deleteImage = async (imageUrl: string) => {
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
    mutationFn: async ({ image, imageFile }: { image: Omit<GalleryImage, 'id' | 'image_url'>; imageFile: File }) => {
      const image_url = await uploadImage(imageFile);

      const { error } = await supabase
        .from('gallery_images')
        .insert({
          title: image.title,
          description: image.description,
          image_url,
          category: image.category,
          display_order: image.display_order
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery-images'] });
      toast({
        title: "Success",
        description: "Gallery image added successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add gallery image.",
        variant: "destructive",
      });
      console.error(error);
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ image, imageFile }: { image: GalleryImage; imageFile?: File }) => {
      let image_url = image.image_url;
      
      if (imageFile) {
        await deleteImage(image.image_url);
        image_url = await uploadImage(imageFile);
      }

      const { error } = await supabase
        .from('gallery_images')
        .update({
          title: image.title,
          description: image.description,
          image_url,
          category: image.category,
          display_order: image.display_order
        })
        .eq('id', image.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery-images'] });
      toast({
        title: "Success",
        description: "Gallery image updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update gallery image.",
        variant: "destructive",
      });
      console.error(error);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (image: GalleryImage) => {
      await deleteImage(image.image_url);
      
      const { error } = await supabase
        .from('gallery_images')
        .update({ active: false })
        .eq('id', image.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery-images'] });
      toast({
        title: "Success",
        description: "Gallery image deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete gallery image.",
        variant: "destructive",
      });
      console.error(error);
    }
  });

  return {
    images,
    loading: isLoading,
    addImage: addMutation.mutateAsync,
    updateImage: updateMutation.mutateAsync,
    deleteImage: deleteMutation.mutateAsync,
  };
};
