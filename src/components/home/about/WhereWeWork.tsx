
import React from 'react';
import { MapPin } from 'lucide-react';

const WhereWeWork = () => {
  return (
    <div className="mb-20">
      <div className="ubuntu-card rounded-3xl p-8 md:p-12 border-2 border-utu-green/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-utu-black font-heading">Where We Work</h2>
            <div className="w-16 h-1 bg-utu-green mb-6"></div>
            
            <div className="flex items-center mb-6">
              <MapPin className="h-6 w-6 text-utu-green mr-3" />
              <p className="text-xl font-semibold text-utu-black">Based in Uganda, Serving All of Africa</p>
            </div>
            
            <p className="text-lg text-utu-gray leading-relaxed mb-6">
              While our headquarters proudly stand in the pearl of Africa, Uganda, our vision extends 
              far beyond borders. We are a truly Pan-African network, with our reach expanding across 
              the continent as we build bridges of hope and solidarity.
            </p>
            
            <p className="text-lg text-utu-gray leading-relaxed mb-6">
              Currently active in East Africa, we are steadily growing our presence across Central, 
              West, and Southern Africa. Each new community we touch becomes part of our Ubuntu family, 
              strengthening the bonds that unite us as one African people.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="text-center p-4 bg-white/60 rounded-xl border border-utu-green/20">
                <p className="text-2xl font-bold text-utu-green">45+</p>
                <p className="text-sm text-utu-gray">Communities Served</p>
              </div>
              <div className="text-center p-4 bg-white/60 rounded-xl border border-utu-green/20">
                <p className="text-2xl font-bold text-utu-green">8</p>
                <p className="text-sm text-utu-gray">African Countries</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <img 
              src="/lovable-uploads/f90b8fff-8fac-4c94-8b28-10ed3702cc33.png" 
              alt="African continent map showing our reach" 
              className="w-full max-w-md h-80 object-cover rounded-2xl shadow-xl ubuntu-card mx-auto" 
            />
            <p className="text-sm text-utu-gray mt-4 italic">
              "Africa is not just our continent — it is our home, our identity, our future."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhereWeWork;
