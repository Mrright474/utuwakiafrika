
import React from 'react';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <div className="text-center animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
      <h3 className="text-xl sm:text-2xl font-bold mb-4 font-heading text-utu-black">Help Us Make a Difference in Uganda</h3>
      <p className="text-utu-gray mb-6 max-w-2xl mx-auto">
        Your support can help us expand our impact across Uganda, bringing clean water,
        education, healthcare, and economic opportunities to more communities in need.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          className="bg-utu-red hover:bg-red-700 text-white"
          onClick={() => window.location.href = '/donate'}
        >
          Donate Now
        </Button>
        <Button 
          variant="outline"
          className="border-utu-red text-utu-red hover:bg-utu-red hover:text-white"
          onClick={() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Contact Us
        </Button>
      </div>
    </div>
  );
};

export default CallToAction;
