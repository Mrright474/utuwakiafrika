
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-utu-black text-white overflow-hidden min-h-[90vh] sm:min-h-[80vh] flex items-center">
      {/* Background image with overlay */}
      <div className="absolute inset-0 opacity-30 bg-black">
        <img 
          src="/lovable-uploads/b07d8f50-577a-4699-87ba-8759e7ace688.png" 
          alt="African children at school" 
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0 bg-gradient-to-r from-utu-black to-transparent"
          style={{ mixBlendMode: 'multiply' }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 font-heading leading-tight">
            A Helping Hand For Every African
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-200 max-w-2xl">
            Utu Wa Kiafrika Charity Network is committed to empowering African communities
            through sustainable programs that address education, healthcare, infrastructure,
            and economic development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/donate">
              <Button className="bg-utu-red hover:bg-red-700 text-white px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg w-full sm:w-auto transition-transform hover:scale-105">
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
