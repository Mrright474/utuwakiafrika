
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-utu-black text-white overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-black">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-utu-black to-transparent"
          style={{ mixBlendMode: 'multiply' }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-heading">
            A Helping Hand For Every African
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl">
            Utu Wa Kiafrika Charity Network is committed to empowering African communities
            through sustainable programs that address education, healthcare, infrastructure,
            and economic development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-utu-red hover:bg-red-700 text-white px-8 py-6 text-lg">
              Donate Now
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
              Our Programs <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
