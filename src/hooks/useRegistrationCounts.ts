import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useRegistrationCounts = () => {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchCounts = async () => {
      const { data, error } = await (supabase as any)
        .from('event_registrations')
        .select('event_id');

      if (!error && data) {
        const map: Record<string, number> = {};
        data.forEach((r: { event_id: string }) => {
          map[r.event_id] = (map[r.event_id] || 0) + 1;
        });
        setCounts(map);
      }
    };
    fetchCounts();
  }, []);

  return counts;
};
