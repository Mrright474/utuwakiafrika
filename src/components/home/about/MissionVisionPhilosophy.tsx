
import React from 'react';
import { Heart, Star, Users } from 'lucide-react';

const MissionVisionPhilosophy = () => {
  return (
    <div className="mb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Mission */}
        <div className="ubuntu-card rounded-2xl p-8 text-center border border-white/20 hover:shadow-xl transition-all duration-300">
          <div className="bg-gradient-to-br from-utu-red to-red-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Heart className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-utu-black">Our Mission</h3>
          <div className="w-12 h-1 bg-utu-red mx-auto mb-4"></div>
          <p className="text-utu-gray leading-relaxed">
            To build compassionate, self-sustaining African communities through education, 
            empowerment, and advocacy, guided by the timeless wisdom of Ubuntu.
          </p>
        </div>

        {/* Vision */}
        <div className="ubuntu-card rounded-2xl p-8 text-center border border-white/20 hover:shadow-xl transition-all duration-300">
          <div className="bg-gradient-to-br from-utu-gold to-yellow-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Star className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-utu-black">Our Vision</h3>
          <div className="w-12 h-1 bg-utu-gold mx-auto mb-4"></div>
          <p className="text-utu-gray leading-relaxed">
            A united, empowered, and dignified Africa where every person thrives, 
            communities flourish, and the spirit of Ubuntu guides our collective progress.
          </p>
        </div>

        {/* Philosophy */}
        <div className="ubuntu-card rounded-2xl p-8 text-center border border-white/20 hover:shadow-xl transition-all duration-300">
          <div className="bg-gradient-to-br from-utu-green to-green-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Users className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-utu-black">Our Philosophy</h3>
          <div className="w-12 h-1 bg-utu-green mx-auto mb-4"></div>
          <p className="text-utu-gray leading-relaxed">
            Ubuntu values, Pan-Africanism, and community-based transformation. 
            We believe in the interconnectedness of humanity and the power of collective action.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MissionVisionPhilosophy;
