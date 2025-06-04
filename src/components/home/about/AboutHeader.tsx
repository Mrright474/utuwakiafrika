
import React from 'react';
import { Heart } from 'lucide-react';

const AboutHeader = () => {
  return (
    <div className="text-center max-w-4xl mx-auto mb-20">
      <div className="mb-6">
        <div className="inline-flex items-center bg-utu-red/10 backdrop-blur-sm border border-utu-red/20 rounded-full px-6 py-3 text-sm font-medium text-utu-red mb-6">
          <Heart className="mr-2 h-4 w-4" />
          Ubuntu Philosophy: "I am because we are"
        </div>
      </div>
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-utu-black font-heading">
        About <span className="text-gradient bg-gradient-to-r from-utu-red via-utu-gold to-utu-green bg-clip-text text-transparent">Utu Wa Kiafrika</span>
      </h1>
      <div className="w-24 h-1 bg-gradient-to-r from-utu-red via-utu-gold to-utu-green mx-auto mb-8"></div>
      <p className="text-xl text-utu-gray leading-relaxed">
        A grassroots humanitarian organization founded on the principle of <em>Utu</em> — 
        Swahili for humanity, compassion, and dignity.
      </p>
    </div>
  );
};

export default AboutHeader;
