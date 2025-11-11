import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

export interface SuccessMetric {
  id: string;
  metric_name: string;
  metric_value: string;
  category?: string;
  icon?: string;
  display_order?: number;
  active?: boolean;
}

export const useMetricsManagement = () => {
  const [metrics, setMetrics] = useState<SuccessMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('success_metrics')
        .select('*')
        .eq('active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setMetrics(data || []);
    } catch (error) {
      console.error('Error fetching metrics:', error);
      toast({
        title: "Error Loading Metrics",
        description: "Failed to load metrics. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addMetric = async (metric: Omit<SuccessMetric, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('success_metrics')
        .insert([metric])
        .select()
        .single();

      if (error) throw error;

      setMetrics(prev => [...prev, data]);
      toast({
        title: "Success",
        description: "Metric added successfully.",
      });
      return true;
    } catch (error: any) {
      console.error('Error adding metric:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add metric.",
        variant: "destructive"
      });
      return false;
    }
  };

  const updateMetric = async (id: string, updates: Partial<SuccessMetric>) => {
    try {
      const { data, error } = await supabase
        .from('success_metrics')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setMetrics(prev => 
        prev.map(metric => metric.id === id ? data : metric)
      );
      toast({
        title: "Success",
        description: "Metric updated successfully.",
      });
      return true;
    } catch (error: any) {
      console.error('Error updating metric:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update metric.",
        variant: "destructive"
      });
      return false;
    }
  };

  const deleteMetric = async (id: string) => {
    try {
      const { error } = await supabase
        .from('success_metrics')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMetrics(prev => prev.filter(metric => metric.id !== id));
      toast({
        title: "Success",
        description: "Metric deleted successfully.",
      });
      return true;
    } catch (error: any) {
      console.error('Error deleting metric:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete metric.",
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    metrics,
    loading,
    addMetric,
    updateMetric,
    deleteMetric,
    refetch: fetchMetrics
  };
};
