
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FooterQuickLinks = () => {
  const navigate = useNavigate();

  const navigateToSection = (path: string, sectionId: string) => {
    if (window.location.pathname === path) {
      // Already on the right page, just scroll
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to the page first
      navigate(path, { state: { scrollTo: sectionId } });
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-4 relative">
        <span className="after:content-[''] after:absolute after:w-8 after:h-1 after:bg-utu-red after:left-0 after:bottom-0 after:mt-1 pb-2">
          Quick Links
        </span>
      </h3>
      <ul className="space-y-3">
        <li>
          <button 
            onClick={() => navigateToSection('/', 'about')} 
            className="text-gray-400 hover:text-white transition-colors flex items-center"
          >
            <span className="mr-2">•</span> About Us
          </button>
        </li>
        <li>
          <button 
            onClick={() => navigateToSection('/', 'programs')} 
            className="text-gray-400 hover:text-white transition-colors flex items-center"
          >
            <span className="mr-2">•</span> Our Programs
          </button>
        </li>
        <li>
          <button 
            onClick={() => navigateToSection('/', 'team')} 
            className="text-gray-400 hover:text-white transition-colors flex items-center"
          >
            <span className="mr-2">•</span> Our Team
          </button>
        </li>
        <li>
          <button 
            onClick={() => navigateToSection('/', 'testimonials')} 
            className="text-gray-400 hover:text-white transition-colors flex items-center"
          >
            <span className="mr-2">•</span> Testimonials
          </button>
        </li>
        <li>
          <Link to="/volunteers/auth" className="text-gray-400 hover:text-white transition-colors flex items-center">
            <span className="mr-2">•</span> Volunteer Portal
          </Link>
        </li>
        <li>
          <Link to="/donate" className="text-gray-400 hover:text-white transition-colors flex items-center">
            <span className="mr-2">•</span> Donate
          </Link>
        </li>
        <li>
          <Link to="/admin" className="text-gray-400 hover:text-white transition-colors flex items-center text-sm">
            <span className="mr-2">•</span> Admin Login
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default FooterQuickLinks;
