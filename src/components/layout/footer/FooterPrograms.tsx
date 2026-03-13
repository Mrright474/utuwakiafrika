
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const FooterPrograms = () => {
  const { data: programs = [] } = useQuery({
    queryKey: ['footer-programs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('programs')
        .select('id, title')
        .eq('active', true)
        .eq('category', 'core')
        .order('display_order')
        .limit(6);
      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div>
      <h3 className="text-lg font-bold mb-4 relative">
        <span className="after:content-[''] after:absolute after:w-8 after:h-1 after:bg-utu-red after:left-0 after:bottom-0 after:mt-1 pb-2">
          Our Programs
        </span>
      </h3>
      <ul className="space-y-3">
        {programs.map((program) => (
          <li key={program.id}>
            <Link to="/programs" className="text-gray-400 hover:text-white transition-colors flex items-center">
              <span className="mr-2">•</span> {program.title}
            </Link>
          </li>
        ))}
        <li>
          <Link to="/impact" className="text-gray-400 hover:text-white transition-colors flex items-center">
            <span className="mr-2">•</span> View Our Impact
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default FooterPrograms;
