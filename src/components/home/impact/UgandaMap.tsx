
import React from 'react';
import ugandaMap from '@/assets/uganda-impact-map.jpg';

const UgandaMap = () => {
  return (
    <div className="mb-16">
      <h3 className="text-xl sm:text-2xl font-bold mb-8 text-center font-heading text-utu-black">Where We Work in Uganda</h3>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="relative">
          <img
            src={ugandaMap}
            alt="Illustrated map of Uganda with red markers highlighting the districts where Utu Wa Kiafrika programs are active"
            loading="lazy"
            width={1024}
            height={1024}
            className="w-full h-auto object-contain rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default UgandaMap;
