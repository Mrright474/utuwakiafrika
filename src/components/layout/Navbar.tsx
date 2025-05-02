
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Function to handle smooth scrolling to anchor elements
  const scrollToSection = (sectionId: string) => {
    closeMenu();
    
    // If we're not on the home page, navigate there first and then scroll
    if (window.location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
      return;
    }
    
    // Get the section element
    const section = document.getElementById(sectionId);
    
    // If we found the section, scroll to it
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDonateClick = () => {
    closeMenu();
    navigate('/donate');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo and brand name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <img 
                src="/lovable-uploads/7645e834-1078-4707-9732-786fd4d93d8c.png" 
                alt="Utu Wa Kiafrika Logo" 
                className="h-10 sm:h-12 w-auto"
              />
              <div className="ml-2 sm:ml-3 hidden md:block">
                <h1 className="text-lg sm:text-xl font-bold text-utu-black">UTU WA KIAFRIKA</h1>
                <p className="text-xs text-utu-gray">A Helping Hand For Every African</p>
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-utu-black hover:text-utu-red transition-colors font-medium"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('programs')} 
              className="text-utu-black hover:text-utu-red transition-colors font-medium"
            >
              Programs
            </button>
            <button 
              onClick={() => scrollToSection('impact')} 
              className="text-utu-black hover:text-utu-red transition-colors font-medium"
            >
              Our Impact
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-utu-black hover:text-utu-red transition-colors font-medium"
            >
              Contact
            </button>
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
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-utu-black hover:text-utu-red transition-colors font-medium text-left"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('programs')} 
                className="text-utu-black hover:text-utu-red transition-colors font-medium text-left"
              >
                Programs
              </button>
              <button 
                onClick={() => scrollToSection('impact')} 
                className="text-utu-black hover:text-utu-red transition-colors font-medium text-left"
              >
                Our Impact
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-utu-black hover:text-utu-red transition-colors font-medium text-left"
              >
                Contact
              </button>
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
