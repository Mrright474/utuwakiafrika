import React, { useState } from 'react';
import { Menu, X, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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
            <Link to="/#about" className="text-utu-black hover:text-utu-red transition-colors font-medium">About</Link>
            <Link to="/#programs" className="text-utu-black hover:text-utu-red transition-colors font-medium">Programs</Link>
            <Link to="/#team" className="text-utu-black hover:text-utu-red transition-colors font-medium">Our Team</Link>
            <Link to="/#contact" className="text-utu-black hover:text-utu-red transition-colors font-medium">Contact</Link>
            <Link to="/donate">
              <Button className="bg-utu-red hover:bg-red-700 text-white">Donate Now</Button>
            </Link>
            <Link 
              to="/admin" 
              className="flex items-center text-utu-black hover:text-utu-red transition-colors font-medium"
            >
              <LogIn className="mr-2" size={18} />
              Admin
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Link to="/admin" className="text-utu-black hover:text-utu-red">
              <LogIn size={24} />
            </Link>
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
                to="/#about" 
                className="text-utu-black hover:text-utu-red transition-colors font-medium"
                onClick={closeMenu}
              >
                About
              </Link>
              <Link 
                to="/#programs" 
                className="text-utu-black hover:text-utu-red transition-colors font-medium"
                onClick={closeMenu}
              >
                Programs
              </Link>
              <Link 
                to="/#team" 
                className="text-utu-black hover:text-utu-red transition-colors font-medium"
                onClick={closeMenu}
              >
                Our Team
              </Link>
              <Link 
                to="/#contact" 
                className="text-utu-black hover:text-utu-red transition-colors font-medium"
                onClick={closeMenu}
              >
                Contact
              </Link>
              <Link to="/donate" onClick={closeMenu}>
                <Button className="bg-utu-red hover:bg-red-700 text-white w-full">Donate Now</Button>
              </Link>
              <Link 
                to="/admin" 
                className="text-utu-black hover:text-utu-red transition-colors font-medium flex items-center"
                onClick={closeMenu}
              >
                <LogIn className="mr-2" size={18} />
                Admin Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
