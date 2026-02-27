import React from 'react';
import ProgramCard from './ProgramCard';
import { useProgramsManagement } from '@/hooks/useProgramsManagement';
import { BookOpen, Heart, Briefcase, Users, Star, Globe } from 'lucide-react';

const iconMap: Record<string, any> = {
  BookOpen,
  Heart,
  Briefcase,
  Users,
  Star,
  Globe
};

const CorePrograms = () => {
  const { programs, loading } = useProgramsManagement();
  
  const corePrograms = programs.filter(p => p.category !== 'future' && p.category !== 'special-events');

  if (loading) {
    return (
      <div className="mb-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-utu-black font-heading">
          Our Core Programs
        </h2>
        <div className="w-20 h-1 bg-utu-red mx-auto mb-12"></div>
        <div className="text-center text-muted-foreground">Loading programs...</div>
      </div>
    );
  }

  return (
    <div className="mb-20">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-utu-black font-heading">
        Our Core Programs
      </h2>
      <div className="w-20 h-1 bg-utu-red mx-auto mb-12"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {corePrograms.map((program, index) => {
          const IconComponent = program.icon && iconMap[program.icon];
          const icon = IconComponent ? <IconComponent className="h-8 w-8 text-utu-red" /> : null;
          
          return (
            <ProgramCard
              key={program.id}
              title={program.title}
              description={program.description}
              icon={icon}
              color={program.color || 'bg-utu-red'}
              image={program.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CorePrograms;
