
import React from 'react';
import { Heart, Users } from 'lucide-react';

const OurFounder = () => {
  return (
    <div className="mb-20 bg-gradient-to-br from-utu-light-gray to-white rounded-3xl p-8 md:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-utu-black font-heading">Our Founder</h2>
          <div className="w-16 h-1 bg-utu-red mb-6"></div>
          <h3 className="text-2xl font-bold text-utu-red mb-4">Ben Kazigo Luweru</h3>
          <p className="text-lg font-semibold text-utu-gold mb-6">Executive Director & Visionary Leader</p>
          
          <p className="text-utu-gray leading-relaxed mb-4">
            Ben Kazigo Luweru is a passionate youth leader whose vision for African dignity and Ubuntu 
            philosophy sparked the creation of Utu Wa Kiafrika. Born and raised in Uganda, Ben witnessed 
            firsthand the challenges facing African communities and the incredible resilience of our people.
          </p>
          
          <p className="text-utu-gray leading-relaxed mb-4">
            A firm believer in the power of grassroots movements and community-led solutions, Ben has 
            dedicated his life to fostering Pan-African unity and empowerment. His leadership style 
            embodies the Ubuntu principle that "a person is a person through other persons."
          </p>
          
          <p className="text-utu-gray leading-relaxed">
            Under his guidance, what began as a small group of passionate individuals has grown into 
            a continent-wide network committed to creating lasting change across Africa. Ben's vision 
            continues to inspire our work as we build bridges of hope and dignity across our beloved continent.
          </p>
          
          <div className="flex items-center mt-6 p-4 bg-white/60 rounded-xl border border-utu-red/20">
            <Users className="h-5 w-5 text-utu-red mr-3" />
            <p className="text-sm italic text-utu-gray">
              "Our strength lies not in our individual achievements, but in our collective commitment 
              to lifting each other up." - Ben Kazigo Luweru
            </p>
          </div>
        </div>
        
        <div className="order-1 lg:order-2 text-center">
          <div className="relative inline-block">
            <img 
              src="/lovable-uploads/6e61272d-7786-4ccc-950e-4ae86bc5f39d.png" 
              alt="Ben Kazigo Luweru, Founder and Executive Director" 
              className="w-80 h-80 object-cover rounded-3xl shadow-2xl ubuntu-card mx-auto" 
            />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-utu-red to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurFounder;
