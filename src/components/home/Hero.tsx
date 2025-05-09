
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
      <div className="absolute inset-0 opacity-30 bg-black">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="/lovable-uploads/b07d8f50-577a-4699-87ba-8759e7ace688.png" 
            alt="African children" 
            className="w-full h-full object-cover"
          />
        </div>
        <div 
          className="absolute inset-0 bg-gradient-to-r from-utu-black to-transparent"
          style={{ mixBlendMode: 'multiply' }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-2/3 lg:w-1/2 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 md:pr-8">
            <div className="flex items-center mb-4">
              <div className="w-10 h-1 bg-utu-red mr-2"></div>
              <p className="text-lg font-medium text-gray-200">Making a Difference Since 2024</p>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 font-heading leading-tight">
              A Helping Hand For <span className="text-utu-red">Every African</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-200 max-w-2xl">
              Utu Wa Kiafrika Charity Network is committed to empowering African communities
              through sustainable programs that address education, healthcare, infrastructure,
              and economic development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/donate" onClick={() => window.scrollTo(0, 0)}>
                <Button className="bg-utu-red hover:bg-red-700 text-white px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg w-full sm:w-auto transition-transform hover:scale-105 flex items-center gap-2">
                  <Heart size={18} />
                  Donate Now
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg w-full sm:w-auto transition-transform hover:scale-105"
                onClick={() => scrollToSection('programs')}
              >
                Our Programs <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
            
            {/* Impact Statistics */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-white/10">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-white">150+</p>
                <p className="text-gray-300 text-sm">Schools Supported</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-white">75</p>
                <p className="text-gray-300 text-sm">Water Projects</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-white">25K+</p>
                <p className="text-gray-300 text-sm">Lives Impacted</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-white">45</p>
                <p className="text-gray-300 text-sm">Communities</p>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/3 lg:w-1/2 mt-12 md:mt-0 hidden md:block">
            <div className="relative">
              <img 
                src="/lovable-uploads/969161e6-4a43-456e-8ceb-4578f7e45935.png" 
                alt="African community" 
                className="rounded-lg shadow-2xl border-4 border-white/20 w-full max-w-md mx-auto"
              />
              <div className="absolute -bottom-4 -left-4 bg-utu-red p-4 rounded-lg text-white rotate-3 shadow-lg">
                <p className="font-bold">Est. 2024</p>
                <p className="text-sm">Building brighter futures</p>
              </div>
              <div className="absolute -top-6 -right-6 p-4 rounded-full bg-white/10 backdrop-blur-sm shadow-xl">
                <PlayCircle className="h-16 w-16 text-utu-red" />
              </div>
              <div className="absolute bottom-0 right-0 transform translate-y-1/3 translate-x-1/4">
                <img 
                  src="/lovable-uploads/53460912-2f2a-428b-b6e5-bc12ccf03604.png" 
                  alt="Healthcare initiative" 
                  className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
                />
              </div>
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
