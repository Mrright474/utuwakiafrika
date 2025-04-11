
import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo and brand name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/7645e834-1078-4707-9732-786fd4d93d8c.png" 
                alt="Utu Wa Kiafrika Logo" 
                className="h-12 w-auto"
              />
              <div className="ml-3 hidden md:block">
                <h1 className="text-xl font-bold text-utu-black">UTU WA KIAFRIKA</h1>
                <p className="text-xs text-utu-gray">A Helping Hand For Every African</p>
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#about" className="text-utu-black hover:text-utu-red transition-colors font-medium">About</a>
            <a href="#programs" className="text-utu-black hover:text-utu-red transition-colors font-medium">Programs</a>
            <a href="#team" className="text-utu-black hover:text-utu-red transition-colors font-medium">Our Team</a>
            <a href="#contact" className="text-utu-black hover:text-utu-red transition-colors font-medium">Contact</a>
            <Button className="bg-utu-red hover:bg-red-700 text-white">Donate Now</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-utu-black hover:text-utu-red focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <a 
                href="#about" 
                className="text-utu-black hover:text-utu-red transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#programs" 
                className="text-utu-black hover:text-utu-red transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Programs
              </a>
              <a 
                href="#team" 
                className="text-utu-black hover:text-utu-red transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Team
              </a>
              <a 
                href="#contact" 
                className="text-utu-black hover:text-utu-red transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <Button className="bg-utu-red hover:bg-red-700 text-white w-full">Donate Now</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
