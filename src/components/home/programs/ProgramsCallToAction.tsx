
import React from 'react';
import { Button } from '@/components/ui/button';

const ProgramsCallToAction = () => {
  return (
    <div className="text-center bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-3xl ubuntu-card">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-utu-black font-heading">
        Support a Program. Be Part of the Change.
      </h2>
      <p className="text-xl text-utu-red font-semibold mb-8 font-ubuntu">
        Utu Begins With You.
      </p>
      <p className="text-lg text-utu-gray mb-8 max-w-2xl mx-auto leading-relaxed">
        Every program represents hope, dignity, and possibility. Your support — whether through 
        donations, volunteering, or advocacy — becomes part of a movement that's transforming 
        communities across Africa.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button className="donate-button text-lg px-8 py-4">
          Donate to a Program
        </Button>
        <Button variant="outline" className="border-utu-red text-utu-red hover:bg-utu-red hover:text-white text-lg px-8 py-4">
          Become a Volunteer
        </Button>
      </div>
    </div>
  );
};

export default ProgramsCallToAction;
