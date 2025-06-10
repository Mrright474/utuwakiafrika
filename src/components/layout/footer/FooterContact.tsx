
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';

const FooterContact = () => {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4 relative">
        <span className="after:content-[''] after:absolute after:w-8 after:h-1 after:bg-utu-red after:left-0 after:bottom-0 after:mt-1 pb-2">
          Contact Us
        </span>
      </h3>
      <ul className="space-y-4">
        <li className="flex items-start">
          <MapPin className="mr-2 h-5 w-5 text-utu-red shrink-0 mt-0.5" />
          <span className="text-gray-400">
            Uganda, East Africa
          </span>
        </li>
        <li className="flex items-start">
          <Phone className="mr-2 h-5 w-5 text-utu-red shrink-0 mt-0.5" />
          <span className="text-gray-400 text-sm sm:text-base">
            +256 744 552 195 / +256 778 777 976
          </span>
        </li>
        <li className="flex items-start">
          <Mail className="mr-2 h-5 w-5 text-utu-red shrink-0 mt-0.5" />
          <span className="text-gray-400 text-sm sm:text-base break-all">
            utuwakiafrikacharitynetwork@gmail.com
          </span>
        </li>
        <li>
          <Link to="/contact" className="inline-flex items-center bg-utu-red/20 hover:bg-utu-red/30 text-white px-4 py-2 rounded-md mt-2 transition-colors">
            <Heart className="mr-2 h-5 w-5" /> Get in Touch
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default FooterContact;
