
import React from 'react';
import { Heart } from 'lucide-react';

const TeamIntroduction = () => {
  return (
    <div className="max-w-4xl mx-auto mb-16 text-center">
      <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-utu-red">
        <div className="flex justify-center mb-4">
          <Heart className="w-8 h-8 text-utu-red" />
        </div>
        <p className="text-lg text-utu-gray leading-relaxed italic mb-4">
          "Behind every act of compassion is a dedicated team. At Utu wa Ki Afrika, our strength lies in our people — young, wise, bold, and compassionate individuals across Africa, united by the dream of a dignified and empowered continent."
        </p>
        <div className="w-16 h-1 bg-utu-red mx-auto"></div>
      </div>
    </div>
  );
};

export default TeamIntroduction;
