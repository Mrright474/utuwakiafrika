
import React, { useState } from 'react';
import { Menu, X, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleDonateClick = () => {
    closeMenu();
    navigate('/donate');
    window.scrollTo(0, 0);
  };

  const handleNavLinkClick = (path: string) => {
    closeMenu();
    if (location.pathname === path) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo and brand name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group" onClick={() => handleNavLinkClick('/')}>
              <div className="relative">
                <img 
                  src="/lovable-uploads/8c92f756-dfe1-496d-8f40-b05da33fb433.png" 
                  alt="Utu Wa Kiafrika Charity Network Logo" 
                  className="h-12 sm:h-14 w-auto transition-transform group-hover:scale-105"
                />
              </div>
              <div className="ml-3 sm:ml-4">
                <h1 className="text-xl sm:text-2xl font-bold text-utu-black font-heading leading-tight">
                  <span className="bg-gradient-to-r from-utu-red via-utu-gold to-utu-green bg-clip-text text-transparent">
                    UTU WA KIAFRIKA
                  </span>
                </h1>
                <h2 className="text-sm sm:text-base font-bold text-utu-black hidden sm:block">
                  <span className="bg-gradient-to-r from-utu-green via-utu-gold to-utu-red bg-clip-text text-transparent">
                    CHARITY NETWORK
                  </span>
                </h2>
                <p className="text-xs sm:text-sm font-semibold">
                  <span className="bg-gradient-to-r from-utu-gold via-utu-red to-utu-green bg-clip-text text-transparent">
                    A Helping Hand For Every African
                  </span>
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Link 
              to="/"
              className={`flex items-center gap-1 ${isActive('/') ? 'text-utu-red font-semibold' : 'text-utu-black hover:text-utu-red'} transition-colors font-medium`}
              onClick={() => handleNavLinkClick('/')}
            >
              <Home size={18} />
              Home
            </Link>
            <Link 
              to="/about"
              className={`${isActive('/about') ? 'text-utu-red font-semibold' : 'text-utu-black hover:text-utu-red'} transition-colors font-medium`}
              onClick={() => handleNavLinkClick('/about')}
            >
              About
            </Link>
            <Link 
              to="/programs"
              className={`${isActive('/programs') ? 'text-utu-red font-semibold' : 'text-utu-black hover:text-utu-red'} transition-colors font-medium`}
              onClick={() => handleNavLinkClick('/programs')}
            >
              Programs
            </Link>
            <Link 
              to="/events"
              className={`${isActive('/events') ? 'text-utu-red font-semibold' : 'text-utu-black hover:text-utu-red'} transition-colors font-medium`}
              onClick={() => handleNavLinkClick('/events')}
            >
              Events
            </Link>
            <Link 
              to="/team"
              className={`${isActive('/team') ? 'text-utu-red font-semibold' : 'text-utu-black hover:text-utu-red'} transition-colors font-medium`}
              onClick={() => handleNavLinkClick('/team')}
            >
              Our Team
            </Link>
            <Link 
              to="/impact"
              className={`${isActive('/impact') ? 'text-utu-red font-semibold' : 'text-utu-black hover:text-utu-red'} transition-colors font-medium`}
              onClick={() => handleNavLinkClick('/impact')}
            >
              Impact
            </Link>
            <Link 
              to="/contact"
              className={`${isActive('/contact') ? 'text-utu-red font-semibold' : 'text-utu-black hover:text-utu-red'} transition-colors font-medium`}
              onClick={() => handleNavLinkClick('/contact')}
            >
              Contact
            </Link>
            <Button 
              onClick={handleDonateClick} 
              className="bg-utu-red hover:bg-red-700 text-white"
            >
              Donate Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-utu-black hover:text-utu-red focus:outline-none"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/"
                className={`flex items-center gap-1 ${isActive('/') ? 'text-utu-red font-semibold' : 'text-utu-black hover:text-utu-red'} transition-colors font-medium text-left`}
                onClick={() => handleNavLinkClick('/')}
              >
                <Home size={18} />
                Home
              </Link>
              <Link 
                to="/about"
                className={`${isActive('/about') ? 'text-utu-red font-semibold' : 'text-utu-black hover:text-utu-red'} transition-colors font-medium text-left`}
                onClick={() => handleNavLinkClick('/about')}
              >
                About
              </Link>
              <Link 
                to="/programs"
                className={`${isActive('/programs') ? 'text-utu-red font-semibold' : 'text-utu-black hover:text-utu-red'} transition-colors font-medium text-left`}
                onClick={() => handleNavLinkClick('/programs')}
              >
                Programs
              </Link>
              <Link 
                to="/events"
                className={`${isActive('/events') ? 'text-utu-red font-semibold' : 'text-utu-black hover:text-utu-red'} transition-colors font-medium text-left`}
                onClick={() => handleNavLinkClick('/events')}
              >
                Events
              </Link>
              <Link 
                to="/team"
                className={`${isActive('/team') ? 'text-utu-red font-semibold' : 'text-utu-black hover:text-utu-red'} transition-colors font-medium text-left`}
                onClick={() => handleNavLinkClick('/team')}
              >
                Our Team
              </Link>
              <Link 
                to="/impact"
                className={`${isActive('/impact') ? 'text-utu-red font-semibold' : 'text-utu-black hover:text-utu-red'} transition-colors font-medium text-left`}
                onClick={() => handleNavLinkClick('/impact')}
              >
                Impact
              </Link>
              <Link 
                to="/contact"
                className={`${isActive('/contact') ? 'text-utu-red font-semibold' : 'text-utu-black hover:text-utu-red'} transition-colors font-medium text-left`}
                onClick={() => handleNavLinkClick('/contact')}
              >
                Contact
              </Link>
              <Button 
                onClick={handleDonateClick}
                className="bg-utu-red hover:bg-red-700 text-white w-full"
              >
                Donate Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
