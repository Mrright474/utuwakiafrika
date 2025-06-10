
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-utu-black text-white pt-12 sm:pt-16 pb-6 sm:pb-8 relative">
      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-utu-red text-white w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo and Mission */}
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

          {/* Quick Links */}
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
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-gray-500 text-xs sm:text-sm">
          <p>&copy; {currentYear} Utu Wa Kiafrika Charity Network. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
