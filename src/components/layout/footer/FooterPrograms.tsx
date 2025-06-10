
import React from 'react';
import { Link } from 'react-router-dom';

const FooterPrograms = () => {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4 relative">
        <span className="after:content-[''] after:absolute after:w-8 after:h-1 after:bg-utu-red after:left-0 after:bottom-0 after:mt-1 pb-2">
          Our Programs
        </span>
      </h3>
      <ul className="space-y-3">
        <li>
          <Link to="/programs" className="text-gray-400 hover:text-white transition-colors flex items-center">
            <span className="mr-2">•</span> Education Support
          </Link>
        </li>
        <li>
          <Link to="/programs" className="text-gray-400 hover:text-white transition-colors flex items-center">
            <span className="mr-2">•</span> Healthcare Initiatives
          </Link>
        </li>
        <li>
          <Link to="/programs" className="text-gray-400 hover:text-white transition-colors flex items-center">
            <span className="mr-2">•</span> Clean Water Projects
          </Link>
        </li>
        <li>
          <Link to="/programs" className="text-gray-400 hover:text-white transition-colors flex items-center">
            <span className="mr-2">•</span> Community Development
          </Link>
        </li>
        <li>
          <Link to="/programs" className="text-gray-400 hover:text-white transition-colors flex items-center">
            <span className="mr-2">•</span> Food Security
          </Link>
        </li>
        <li>
          <Link to="/impact" className="text-gray-400 hover:text-white transition-colors flex items-center">
            <span className="mr-2">•</span> View Our Impact
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default FooterPrograms;
