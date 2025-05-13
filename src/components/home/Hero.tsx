
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative bg-utu-black text-white overflow-hidden min-h-[80vh] flex items-center">
      {/* Simple background with overlay */}
      <div className="absolute inset-0 bg-black">
        <img 
          src="/lovable-uploads/b07d8f50-577a-4699-87ba-8759e7ace688.png" 
          alt="African children" 
          className="w-full h-full object-cover opacity-30"
        />
        <div 
          className="absolute inset-0 bg-gradient-to-r from-utu-black via-black/80 to-transparent"
        ></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 font-heading leading-tight">
            Creating <span className="text-utu-red">Sustainable Impact</span> Across Africa
          </h1>
          <p className="text-lg mb-8 text-gray-200 max-w-2xl">
            Utu Wa Kiafrika Charity Network delivers transformative programs in education, healthcare, 
            clean water, and economic empowerment to build resilient communities.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/donate">
              <Button className="bg-utu-red hover:bg-red-700 text-white px-6 py-2 rounded-md flex items-center gap-2">
                <Heart size={16} />
                Donate Now
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="border border-white text-white hover:bg-white/10 px-6 py-2 rounded-md"
              onClick={() => scrollToSection('programs')}
            >
              Our Programs <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          {/* Simplified Impact Statistics */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">150+</p>
              <p className="text-gray-300 text-sm">Schools Supported</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">75</p>
              <p className="text-gray-300 text-sm">Water Projects</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">25K+</p>
              <p className="text-gray-300 text-sm">Lives Impacted</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">45</p>
              <p className="text-gray-300 text-sm">Communities</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Remove scroll indicator for cleaner UI */}
    </section>
  );
};

export default Hero;
