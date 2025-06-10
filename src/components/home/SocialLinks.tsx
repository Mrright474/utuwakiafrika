
import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

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
      <a 
        href="#" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-utu-red transition-colors"
        aria-label="TikTok"
      >
        <svg 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="currentColor"
          className="w-[18px] h-[18px]"
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      </a>
      <a 
        href="#" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-utu-red transition-colors"
        aria-label="YouTube"
      >
        <Youtube size={18} />
      </a>
    </div>
  );
};

export default SocialLinks;
