
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Heart, Users } from 'lucide-react';

const AboutCallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-utu-red to-red-700">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-heading">
          Ready to Make a Difference?
        </h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          Join our mission to transform lives across Africa. Whether through donations, 
          volunteering, or partnerships, every contribution creates lasting impact.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="bg-white text-utu-red hover:bg-gray-100 flex items-center gap-2"
            asChild
          >
            <Link to="/donate">
              <Heart className="h-4 w-4" />
              Donate Now
            </Link>
          </Button>
          <Button 
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-utu-red flex items-center gap-2"
            asChild
          >
            <Link to="/contact">
              <Users className="h-4 w-4" />
              Get Involved
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutCallToAction;
