
import React from 'react';
import { Heart } from 'lucide-react';

const UbuntuMessage = () => {
  return (
    <div className="text-center bg-gradient-to-r from-utu-red to-utu-green p-8 rounded-lg text-white">
      <Heart className="w-8 h-8 mx-auto mb-4 opacity-80" />
      <p className="text-lg italic leading-relaxed max-w-3xl mx-auto">
        "Every member of our team brings heart and hope to the Utu mission. Together, we are building a compassionate Africa — one village, one child, one act at a time."
      </p>
      <div className="w-20 h-1 bg-white mx-auto mt-4 opacity-60"></div>
    </div>
  );
};

export default UbuntuMessage;
