
import React from 'react';
import { Award } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface StatItemProps {
  value: string | number;
  label: string;
  icon: React.ReactNode;
}

const StatItem = ({ value, label, icon }: StatItemProps) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-all duration-300">
    <div className="bg-utu-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
      {icon}
    </div>
    <h3 className="text-3xl md:text-4xl font-bold mb-2 text-utu-black">{value}</h3>
    <p className="text-sm sm:text-base text-utu-gray">{label}</p>
  </div>
);

interface StatsSectionProps {
  stats: Array<{
    value: string | number;
    label: string;
    icon: string;
  }>;
  iconComponents: Record<string, React.ReactNode>;
  loading?: boolean;
}

const StatsSection = ({ stats, iconComponents, loading = false }: StatsSectionProps) => {
  const getIconComponent = (iconName: string) => {
    return iconComponents[iconName as keyof typeof iconComponents] || 
           <Award className="h-6 w-6 sm:h-8 sm:w-8 text-utu-red" />;
  };

  console.log("StatsSection rendering with stats:", stats);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-md">
            <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
            <Skeleton className="h-10 w-24 mx-auto mb-2" />
            <Skeleton className="h-4 w-32 mx-auto" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {stats.map((stat, index) => (
        <StatItem 
          key={index} 
          value={stat.value} 
          label={stat.label} 
          icon={getIconComponent(stat.icon)} 
        />
      ))}
    </div>
  );
};

export default StatsSection;
