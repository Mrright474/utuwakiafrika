
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CreditCard } from 'lucide-react';

const CallToAction = () => {
  return (
    <div className="text-center">
      <h3 className="text-xl sm:text-2xl font-bold mb-4 font-heading text-utu-black">Help Us Make a Difference</h3>
      <p className="text-utu-gray mb-6 max-w-2xl mx-auto">
        Your support can help us expand our impact across Africa, bringing clean water,
        education, healthcare, and economic opportunities to more communities in need.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          className="bg-utu-red hover:bg-red-700 text-white flex items-center gap-2"
          asChild
        >
          <Link to="/donate">
            <CreditCard className="h-4 w-4" />
            Donate via Airtel Money Card
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CallToAction;
