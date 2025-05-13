
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Heart, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative bg-utu-black text-white overflow-hidden min-h-[90vh] sm:min-h-[80vh] flex items-center">
      {/* Video background with overlay */}
      <div className="absolute inset-0 opacity-40 bg-black">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="/lovable-uploads/b07d8f50-577a-4699-87ba-8759e7ace688.png" 
            alt="African children" 
            className="w-full h-full object-cover"
          />
        </div>
        <div 
          className="absolute inset-0 bg-gradient-to-r from-utu-black via-black/80 to-transparent"
          style={{ mixBlendMode: 'multiply' }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-3/5 lg:w-1/2 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 md:pr-8">
            <div className="flex items-center mb-4">
              <div className="w-24 h-1 bg-utu-red mr-3"></div>
              <p className="text-lg font-medium text-gray-200">Since 2024</p>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 font-heading leading-tight">
              Creating <span className="text-utu-red">Sustainable Impact</span> Across Africa
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 text-gray-200 max-w-2xl">
              Utu Wa Kiafrika Charity Network delivers transformative programs in education, healthcare, 
              clean water, and economic empowerment to build resilient communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/donate" onClick={() => window.scrollTo(0, 0)}>
                <Button className="bg-utu-red hover:bg-red-700 text-white px-8 sm:px-10 py-6 sm:py-7 text-lg sm:text-xl w-full sm:w-auto transition-transform hover:scale-105 flex items-center gap-3 rounded-full">
                  <Heart size={24} />
                  Donate Now
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white/10 px-8 sm:px-10 py-6 sm:py-7 text-lg sm:text-xl w-full sm:w-auto transition-transform hover:scale-105 rounded-full"
                onClick={() => scrollToSection('programs')}
              >
                Our Programs <ChevronRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </div>
            
            {/* Impact Statistics */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white">150+</p>
                <p className="text-gray-300 text-sm mt-1">Schools Supported</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white">75</p>
                <p className="text-gray-300 text-sm mt-1">Water Projects</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white">25K+</p>
                <p className="text-gray-300 text-sm mt-1">Lives Impacted</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white">45</p>
                <p className="text-gray-300 text-sm mt-1">Communities</p>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-2/5 lg:w-1/2 mt-16 md:mt-0 hidden md:flex justify-center items-center">
            <div className="relative">
              <div className="absolute -z-10 w-72 h-72 bg-utu-red/20 rounded-full blur-3xl"></div>
              <div className="absolute -z-10 w-64 h-64 bg-white/10 rounded-full blur-2xl -right-10 -top-10"></div>
              <div className="grid grid-cols-2 gap-6 max-w-lg">
                <img 
                  src="/lovable-uploads/c520e25e-9088-4335-9397-90370407dd62.png" 
                  alt="Water project" 
                  className="rounded-2xl shadow-xl h-48 object-cover w-full transform rotate-3 border-4 border-white/20"
                />
                <img 
                  src="/lovable-uploads/7e1302ab-dabd-404d-b089-b1c7bdf0e631.png" 
                  alt="Education initiative" 
                  className="rounded-2xl shadow-xl h-48 object-cover w-full transform -rotate-3 border-4 border-white/20"
                />
                <img 
                  src="/lovable-uploads/6e61272d-7786-4ccc-950e-4ae86bc5f39d.png" 
                  alt="School classroom" 
                  className="rounded-2xl shadow-xl h-48 object-cover w-full transform -rotate-6 border-4 border-white/20"
                />
                <img 
                  src="/lovable-uploads/53460912-2f2a-428b-b6e5-bc12ccf03604.png" 
                  alt="Healthcare initiative" 
                  className="rounded-2xl shadow-xl h-48 object-cover w-full transform rotate-6 border-4 border-white/20"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-utu-red p-6 rounded-2xl text-white rotate-6 shadow-lg">
                <p className="font-bold text-lg">Est. 2024</p>
                <p>Making a difference</p>
              </div>
              <button className="absolute -top-10 -right-10 p-5 rounded-full bg-white/10 backdrop-blur-sm shadow-xl hover:bg-white/20 transition-all duration-300">
                <PlayCircle className="h-20 w-20 text-utu-red" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-white/70 text-sm mb-2">Scroll to explore</span>
        <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
