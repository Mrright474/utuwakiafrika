
import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const SocialLinks = () => {
  return (
    <div className="flex space-x-3">
      <a 
        href="https://www.facebook.com/profile.php?id=61572472550592&mibextid=ZbWKwL" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-utu-red transition-colors"
        aria-label="Facebook"
      >
        <Facebook size={18} />
      </a>
      <a 
        href="https://x.com/utuwakiafrika?t=ZevVoM9c0uTf9eMa54RlkQ&s=09" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-utu-red transition-colors"
        aria-label="X (Twitter)"
      >
        <Twitter size={18} />
      </a>
      <a 
        href="https://www.instagram.com/utuwakiafrikacharitynetwork?igsh=MWp3NXR0MmRyczUyOA==" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-utu-red transition-colors"
        aria-label="Instagram"
      >
        <Instagram size={18} />
      </a>
    </div>
  );
};

export default SocialLinks;
