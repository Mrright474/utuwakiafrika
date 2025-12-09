import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface SuccessMetric {
  id: string;
  metric_name: string;
  metric_value: string;
  category: string | null;
  icon: string | null;
  active?: boolean;
}

export const useMetricsManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: metrics = [], isLoading } = useQuery({
    queryKey: ['success-metrics'],
    queryFn: async () => {
      // RLS handles filtering - admins see all, public sees active only
      const { data, error } = await (supabase as any)
        .from('success_metrics')
        .select('*')
        .order('display_order');
      
      if (error) throw error;
      return (data as any[]).map((metric: any) => ({
        id: metric.id,
        metric_name: metric.metric_name,
        metric_value: metric.metric_value,
        category: metric.category,
        icon: metric.icon,
        active: metric.active
      }));
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (metric: SuccessMetric) => {
      const { error } = await (supabase as any)
        .from('success_metrics')
        .update({
          metric_name: metric.metric_name,
          metric_value: metric.metric_value,
          category: metric.category,
          icon: metric.icon
        })
        .eq('id', metric.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['success-metrics'] });
      toast({
        title: "Success",
        description: "Metric updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update metric.",
        variant: "destructive",
      });
      console.error(error);
    }
  });

  const addMutation = useMutation({
    mutationFn: async (metric: Omit<SuccessMetric, 'id'>) => {
      const { error } = await (supabase as any)
        .from('success_metrics')
        .insert({
          metric_name: metric.metric_name,
          metric_value: metric.metric_value,
          category: metric.category,
          icon: metric.icon
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['success-metrics'] });
      toast({
        title: "Success",
        description: "Metric added successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add metric.",
        variant: "destructive",
      });
      console.error(error);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any)
        .from('success_metrics')
        .update({ active: false })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['success-metrics'] });
      toast({
        title: "Success",
        description: "Metric deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete metric.",
        variant: "destructive",
      });
      console.error(error);
    }
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, active }: { id: string; active: boolean }) => {
      const { error } = await (supabase as any)
        .from('success_metrics')
        .update({ active })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: (_, { active }) => {
      queryClient.invalidateQueries({ queryKey: ['success-metrics'] });
      toast({
        title: "Success",
        description: `Metric ${active ? 'activated' : 'deactivated'} successfully.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update metric status.",
        variant: "destructive",
      });
      console.error(error);
    }
  });

  const bulkToggleActiveMutation = useMutation({
    mutationFn: async ({ ids, active }: { ids: string[]; active: boolean }) => {
      const { error } = await (supabase as any)
        .from('success_metrics')
        .update({ active })
        .in('id', ids);
      
      if (error) throw error;
    },
    onSuccess: (_, { ids, active }) => {
      queryClient.invalidateQueries({ queryKey: ['success-metrics'] });
      toast({
        title: "Success",
        description: `${ids.length} metrics ${active ? 'activated' : 'deactivated'} successfully.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update metrics status.",
        variant: "destructive",
      });
      console.error(error);
    }
  });

  const bulkDeleteMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const { error } = await (supabase as any)
        .from('success_metrics')
        .delete()
        .in('id', ids);
      
      if (error) throw error;
    },
    onSuccess: (_, ids) => {
      queryClient.invalidateQueries({ queryKey: ['success-metrics'] });
      toast({
        title: "Success",
        description: `${ids.length} metrics deleted successfully.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete metrics.",
        variant: "destructive",
      });
      console.error(error);
    }
  });

  return {
    metrics,
    loading: isLoading,
    addMetric: addMutation.mutateAsync,
    updateMetric: updateMutation.mutateAsync,
    deleteMetric: deleteMutation.mutateAsync,
    toggleMetricActive: (id: string, active: boolean) => 
      toggleActiveMutation.mutateAsync({ id, active }),
    bulkToggleMetricsActive: (ids: string[], active: boolean) =>
      bulkToggleActiveMutation.mutateAsync({ ids, active }),
    bulkDeleteMetrics: (ids: string[]) =>
      bulkDeleteMutation.mutateAsync(ids),
    refetch: () => queryClient.invalidateQueries({ queryKey: ['success-metrics'] })
  };
};