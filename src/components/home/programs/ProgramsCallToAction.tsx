
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Heart, Users, ArrowRight } from 'lucide-react';

const ProgramsCallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-utu-green to-green-700">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-heading">
          Support Our Programs
        </h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          Your support enables us to expand these vital programs and reach more communities 
          across Africa. Join us in creating sustainable change that lasts generations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="bg-white text-utu-green hover:bg-gray-100 flex items-center gap-2"
            asChild
          >
            <Link to="/donate">
              <Heart className="h-4 w-4" />
              Fund Our Programs
            </Link>
          </Button>
          <Button 
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-utu-green flex items-center gap-2"
            asChild
          >
            <Link to="/contact">
              <Users className="h-4 w-4" />
              Volunteer With Us
            </Link>
          </Button>
          <Button 
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-utu-green flex items-center gap-2"
            asChild
          >
            <Link to="/impact">
              <ArrowRight className="h-4 w-4" />
              See Our Impact
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProgramsCallToAction;
