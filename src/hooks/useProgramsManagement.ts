import { useState } from 'react';
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
}

export const useProgramsManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: programs = [], isLoading } = useQuery({
    queryKey: ['programs'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('programs')
        .select('*')
        .eq('active', true)
        .order('display_order');
      
      if (error) throw error;
      return (data as any[]).map((program: any) => ({
        id: program.id,
        title: program.title,
        description: program.description,
        category: program.category,
        icon: program.icon,
        color: program.color,
        image: program.image_url || ''
      }));
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (program: Program) => {
      const { error } = await (supabase as any)
        .from('programs')
        .update({
          title: program.title,
          description: program.description,
          category: program.category,
          icon: program.icon,
          color: program.color,
          image_url: program.image
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
    mutationFn: async (program: Omit<Program, 'id'>) => {
      const { error } = await (supabase as any)
        .from('programs')
        .insert({
          title: program.title,
          description: program.description,
          category: program.category,
          icon: program.icon,
          color: program.color,
          image_url: program.image
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

  return {
    programs,
    loading: isLoading,
    addProgram: addMutation.mutateAsync,
    updateProgram: updateMutation.mutateAsync,
    deleteProgram: deleteMutation.mutateAsync,
    refetch: () => queryClient.invalidateQueries({ queryKey: ['programs'] })
  };
};
