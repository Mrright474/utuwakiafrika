
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const FooterLogo = () => {
  return (
    <div className="mb-6 sm:mb-0">
      <Link to="/" className="inline-block mb-4">
        <img 
          src="/lovable-uploads/7645e834-1078-4707-9732-786fd4d93d8c.png" 
          alt="Utu Wa Kiafrika Logo" 
          className="h-16 w-auto"
        />
      </Link>
      <p className="text-gray-400 mb-4">
        A Helping Hand For Every African
      </p>
      <p className="text-gray-400 mb-4 text-sm">
        Empowering communities across Africa through sustainable development programs.
      </p>
      <div className="flex space-x-4">
        <a 
          href="https://www.facebook.com/profile.php?id=61572472550592&mibextid=ZbWKwL" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-utu-red transition-colors" 
          aria-label="Facebook"
        >
          <Facebook size={20} />
        </a>
        <a 
          href="https://x.com/utuwakiafrika?t=ZevVoM9c0uTf9eMa54RlkQ&s=09" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-utu-red transition-colors" 
          aria-label="X (Twitter)"
        >
          <Twitter size={20} />
        </a>
        <a 
          href="https://www.instagram.com/utuwakiafrikacharitynetwork?igsh=MWp3NXR0MmRyczUyOA==" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-utu-red transition-colors" 
          aria-label="Instagram"
        >
          <Instagram size={20} />
        </a>
      </div>
    </div>
  );
};

export default FooterLogo;
