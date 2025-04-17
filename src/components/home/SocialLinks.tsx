
import React from 'react';
import { Facebook, Twitter, Linkedin } from 'lucide-react';

const SocialLinks = () => {
  return (
    <div className="flex space-x-3">
      <a href="#" className="text-gray-500 hover:text-utu-red transition-colors">
        <Facebook size={18} />
      </a>
      <a href="#" className="text-gray-500 hover:text-utu-red transition-colors">
        <Twitter size={18} />
      </a>
      <a href="#" className="text-gray-500 hover:text-utu-red transition-colors">
        <Linkedin size={18} />
      </a>
    </div>
  );
};

export default SocialLinks;
