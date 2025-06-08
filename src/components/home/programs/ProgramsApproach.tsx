
import React from 'react';
import { Users, Star, Globe } from 'lucide-react';

const ProgramsApproach = () => {
  return (
    <div className="bg-ubuntu-gradient text-white p-8 md:p-12 rounded-3xl mb-16">
      <h3 className="text-3xl font-bold mb-8 text-center font-heading">Our Ubuntu Approach</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h4 className="font-bold mb-3 text-lg">Community-Driven</h4>
          <p className="text-white/90 text-sm leading-relaxed">
            Every program starts with listening to communities. We don't impose solutions; 
            we co-create them with the people who know their needs best.
          </p>
        </div>
        
        <div className="text-center">
          <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="h-8 w-8 text-white" />
          </div>
          <h4 className="font-bold mb-3 text-lg">Culturally Rooted</h4>
          <p className="text-white/90 text-sm leading-relaxed">
            Our solutions honor African values, wisdom, and traditions while embracing 
            innovation and modern approaches to development.
          </p>
        </div>
        
        <div className="text-center">
          <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="h-8 w-8 text-white" />
          </div>
          <h4 className="font-bold mb-3 text-lg">Sustainable Impact</h4>
          <p className="text-white/90 text-sm leading-relaxed">
            We build local capacity and empower communities to continue initiatives 
            independently, ensuring lasting change beyond our direct involvement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgramsApproach;
