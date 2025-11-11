import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

export interface Program {
  id: string;
  title: string;
  description: string;
  category?: string;
  icon?: string;
  image_url?: string;
  display_order?: number;
  active?: boolean;
}

export const useProgramsManagement = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .eq('active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setPrograms(data || []);
    } catch (error) {
      console.error('Error fetching programs:', error);
      toast({
        title: "Error Loading Programs",
        description: "Failed to load programs. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addProgram = async (program: Omit<Program, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('programs')
        .insert([program])
        .select()
        .single();

      if (error) throw error;

      setPrograms(prev => [...prev, data]);
      toast({
        title: "Success",
        description: "Program added successfully.",
      });
      return true;
    } catch (error: any) {
      console.error('Error adding program:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add program.",
        variant: "destructive"
      });
      return false;
    }
  };

  const updateProgram = async (id: string, updates: Partial<Program>) => {
    try {
      const { data, error } = await supabase
        .from('programs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setPrograms(prev => 
        prev.map(program => program.id === id ? data : program)
      );
      toast({
        title: "Success",
        description: "Program updated successfully.",
      });
      return true;
    } catch (error: any) {
      console.error('Error updating program:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update program.",
        variant: "destructive"
      });
      return false;
    }
  };

  const deleteProgram = async (id: string) => {
    try {
      const { error } = await supabase
        .from('programs')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPrograms(prev => prev.filter(program => program.id !== id));
      toast({
        title: "Success",
        description: "Program deleted successfully.",
      });
      return true;
    } catch (error: any) {
      console.error('Error deleting program:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete program.",
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    programs,
    loading,
    addProgram,
    updateProgram,
    deleteProgram,
    refetch: fetchPrograms
  };
};
