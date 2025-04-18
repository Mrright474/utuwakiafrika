
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
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
    <footer className="bg-utu-black text-white pt-12 sm:pt-16 pb-6 sm:pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <div className="mb-6 sm:mb-0">
            <img 
              src="/lovable-uploads/7645e834-1078-4707-9732-786fd4d93d8c.png" 
              alt="Utu Wa Kiafrika Logo" 
              className="h-14 w-auto mb-4"
            />
            <p className="text-gray-400 mb-4">
              A Helping Hand For Every African
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/utuwakiafrikacharitynetwork" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com/utuwakiafrikacharitynetwork" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com/utuwakiafrikacharitynetwork" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => navigateToSection('/', 'about')} 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateToSection('/', 'programs')} 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Our Programs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateToSection('/', 'team')} 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Our Team
                </button>
              </li>
              <li>
                <Link to="/donate" className="text-gray-400 hover:text-white transition-colors">
                  Donate
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-lg font-bold mb-4">Our Programs</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Education Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Healthcare Initiatives
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Clean Water Projects
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Community Development
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Food Security
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-utu-red shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  Uganda
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
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-gray-500 text-xs sm:text-sm">
          <p>&copy; {new Date().getFullYear()} Utu Wa Kiafrika Charity Network. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
