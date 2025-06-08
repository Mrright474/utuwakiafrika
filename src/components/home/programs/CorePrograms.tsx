
import React from 'react';
import ProgramCard from './ProgramCard';
import { corePrograms } from './programsData';

const CorePrograms = () => {
  return (
    <div className="mb-20">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-utu-black font-heading">
        Our Core Programs
      </h2>
      <div className="w-20 h-1 bg-utu-red mx-auto mb-12"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {corePrograms.map((program, index) => (
          <ProgramCard
            key={index}
            title={program.title}
            description={program.description}
            icon={program.icon}
            color={program.color}
            image={program.image}
          />
        ))}
      </div>
    </div>
  );
};

export default CorePrograms;
