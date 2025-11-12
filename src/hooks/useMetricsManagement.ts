import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface SuccessMetric {
  id: string;
  metric_name: string;
  metric_value: string;
  category: string | null;
  icon: string | null;
}

export const useMetricsManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: metrics = [], isLoading } = useQuery({
    queryKey: ['success-metrics'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('success_metrics')
        .select('*')
        .eq('active', true)
        .order('display_order');
      
      if (error) throw error;
      return (data as any[]).map((metric: any) => ({
        id: metric.id,
        metric_name: metric.metric_name,
        metric_value: metric.metric_value,
        category: metric.category,
        icon: metric.icon
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

  return {
    metrics,
    loading: isLoading,
    addMetric: addMutation.mutateAsync,
    updateMetric: updateMutation.mutateAsync,
    deleteMetric: deleteMutation.mutateAsync,
    refetch: () => queryClient.invalidateQueries({ queryKey: ['success-metrics'] })
  };
};