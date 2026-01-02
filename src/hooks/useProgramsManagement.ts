import { useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface Program {
  id: string;
  title: string;
  description: string;
  category: string | null;
  icon: string | null;
  color: string | null;
  image: string;
  active?: boolean;
}

const uploadImage = async (file: File, folder: string = 'programs'): Promise<string> => {
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

export const useProgramsManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: programs = [], isLoading } = useQuery({
    queryKey: ['programs'],
    queryFn: async () => {
      // Fetch all programs for admin (RLS will filter based on user role)
      const { data, error } = await (supabase as any)
        .from('programs')
        .select('*')
        .order('display_order');
      
      if (error) throw error;
      return (data as any[]).map((program: any) => ({
        id: program.id,
        title: program.title,
        description: program.description,
        category: program.category,
        icon: program.icon,
        color: program.color,
        image: program.image_url || '',
        active: program.active
      }));
    }
  });

  // Real-time subscription for instant updates
  useEffect(() => {
    const channel = supabase
      .channel('programs_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'programs'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['programs'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const updateMutation = useMutation({
    mutationFn: async ({ program, file }: { program: Program; file?: File }) => {
      let imageUrl = program.image;
      
      if (file) {
        imageUrl = await uploadImage(file, 'programs');
      }

      const { error } = await (supabase as any)
        .from('programs')
        .update({
          title: program.title,
          description: program.description,
          category: program.category,
          icon: program.icon,
          color: program.color,
          image_url: imageUrl
        })
        .eq('id', program.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      toast({
        title: "Success",
        description: "Program updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update program.",
        variant: "destructive",
      });
      console.error(error);
    }
  });

  const addMutation = useMutation({
    mutationFn: async ({ program, file }: { program: Omit<Program, 'id'>; file?: File }) => {
      let imageUrl = program.image;
      
      if (file) {
        imageUrl = await uploadImage(file, 'programs');
      }

      const { error } = await (supabase as any)
        .from('programs')
        .insert({
          title: program.title,
          description: program.description,
          category: program.category,
          icon: program.icon,
          color: program.color,
          image_url: imageUrl
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      toast({
        title: "Success",
        description: "Program added successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add program.",
        variant: "destructive",
      });
      console.error(error);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any)
        .from('programs')
        .update({ active: false })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      toast({
        title: "Success",
        description: "Program deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete program.",
        variant: "destructive",
      });
      console.error(error);
    }
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, active }: { id: string; active: boolean }) => {
      const { error } = await (supabase as any)
        .from('programs')
        .update({ active })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: (_, { active }) => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      toast({
        title: "Success",
        description: `Program ${active ? 'activated' : 'deactivated'} successfully.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update program status.",
        variant: "destructive",
      });
      console.error(error);
    }
  });

  const bulkToggleActiveMutation = useMutation({
    mutationFn: async ({ ids, active }: { ids: string[]; active: boolean }) => {
      const { error } = await (supabase as any)
        .from('programs')
        .update({ active })
        .in('id', ids);
      
      if (error) throw error;
    },
    onSuccess: (_, { ids, active }) => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      toast({
        title: "Success",
        description: `${ids.length} programs ${active ? 'activated' : 'deactivated'} successfully.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update programs status.",
        variant: "destructive",
      });
      console.error(error);
    }
  });

  const bulkDeleteMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const { error } = await (supabase as any)
        .from('programs')
        .delete()
        .in('id', ids);
      
      if (error) throw error;
    },
    onSuccess: (_, ids) => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      toast({
        title: "Success",
        description: `${ids.length} programs deleted successfully.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete programs.",
        variant: "destructive",
      });
      console.error(error);
    }
  });

  const reorderMutation = useMutation({
    mutationFn: async (items: Program[]) => {
      const updates = items.map((item, index) =>
        (supabase as any)
          .from('programs')
          .update({ display_order: index })
          .eq('id', item.id)
      );
      const results = await Promise.all(updates);
      const errors = results.filter((r) => r.error);
      if (errors.length > 0) throw errors[0].error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      toast({ title: 'Success', description: 'Program order updated.' });
    },
    onError: (error) => {
      toast({ title: 'Error', description: 'Failed to update order.', variant: 'destructive' });
      console.error(error);
    },
  });

  return {
    programs,
    loading: isLoading,
    addProgram: (program: Omit<Program, 'id'>, file?: File) => 
      addMutation.mutateAsync({ program, file }),
    updateProgram: (program: Program, file?: File) => 
      updateMutation.mutateAsync({ program, file }),
    deleteProgram: deleteMutation.mutateAsync,
    toggleProgramActive: (id: string, active: boolean) => 
      toggleActiveMutation.mutateAsync({ id, active }),
    bulkToggleProgramsActive: (ids: string[], active: boolean) =>
      bulkToggleActiveMutation.mutateAsync({ ids, active }),
    bulkDeletePrograms: (ids: string[]) =>
      bulkDeleteMutation.mutateAsync(ids),
    reorderPrograms: (items: Program[]) => reorderMutation.mutateAsync(items),
    refetch: () => queryClient.invalidateQueries({ queryKey: ['programs'] })
  };
};
