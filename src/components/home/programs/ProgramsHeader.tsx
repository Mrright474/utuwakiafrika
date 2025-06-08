
import React from 'react';
import { Heart } from 'lucide-react';

const ProgramsHeader = () => {
  return (
    <div className="text-center max-w-4xl mx-auto mb-20">
      <div className="mb-6">
        <div className="inline-flex items-center bg-utu-red/10 backdrop-blur-sm border border-utu-red/20 rounded-full px-6 py-3 text-sm font-medium text-utu-red mb-6">
          <Heart className="mr-2 h-4 w-4" />
          Why It Matters
        </div>
      </div>
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-utu-black font-heading">
        Our <span className="text-gradient bg-gradient-to-r from-utu-red via-utu-gold to-utu-green bg-clip-text text-transparent">Programs</span>
      </h1>
      <div className="w-24 h-1 bg-gradient-to-r from-utu-red via-utu-gold to-utu-green mx-auto mb-8"></div>
      <p className="text-xl text-utu-gray leading-relaxed mb-6">
        At the heart of every thriving community lies <em>Utu</em> — our shared humanity. 
        Across Africa, millions face challenges that seem insurmountable alone, but together, 
        we have the power to restore dignity, create opportunity, and build stronger communities.
      </p>
      <p className="text-lg text-utu-gray leading-relaxed">
        Our programs are not just initiatives; they are movements of hope, designed to address 
        the root causes of inequality while celebrating the resilience and potential of African people. 
        Through sustainable action and community-driven solutions, we're not just changing lives — 
        we're transforming the narrative of what's possible when Africa rises together.
      </p>
    </div>
  );
};

export default ProgramsHeader;
