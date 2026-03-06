import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TouchButton } from '@/components/ui/touch-button';
import { useNavigate, useLocation } from 'react-router-dom';
import PrefetchLink from '@/components/layout/PrefetchLink';
import { useIsMobile, useTouchDevice } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { useFocusManagement } from '@/hooks/useFocusManagement';
import VisuallyHidden from '@/components/accessibility/VisuallyHidden';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const isTouchDevice = useTouchDevice();
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useFocusManagement(isMenuOpen, {
    trapFocus: true,
    restoreFocus: true,
    autoFocus: false
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

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
    <nav 
      id="navigation"
      role="navigation"
      aria-label="Main navigation"
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg border-gray-200" 
          : "bg-white shadow-lg border-gray-100"
      )}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo and brand name */}
          <div className="flex items-center">
            <PrefetchLink 
              to="/" 
              className="flex items-center group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md" 
              onClick={() => handleNavLinkClick('/')}
              aria-label="Utu Wa Kiafrika Charity Network - Home"
            >
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
            </PrefetchLink>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6" role="menubar">
            <PrefetchLink 
              to="/"
              role="menuitem"
              className={cn(
                "flex items-center gap-1 transition-colors font-medium rounded-md px-2 py-1",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                isActive('/') ? 'text-utu-red font-semibold' : 'text-utu-black hover:text-utu-red'
              )}
              onClick={() => handleNavLinkClick('/')}
              aria-current={isActive('/') ? 'page' : undefined}
            >
              <Home size={18} aria-hidden="true" />
              Home
            </PrefetchLink>
            {[
              { to: '/about', label: 'About' },
              { to: '/programs', label: 'Programs' },
              { to: '/communities', label: 'Communities' },
              { to: '/events', label: 'Events' },
              { to: '/impact', label: 'Impact' },
              { to: '/stories', label: 'Stories' },
              { to: '/team', label: 'Our Team' },
              { to: '/contact', label: 'Contact' },
              { to: '/volunteers/auth', label: 'Volunteer Portal' },
            ].map(link => (
              <PrefetchLink
                key={link.to}
                to={link.to}
                className={`${isActive(link.to) ? 'text-utu-red font-semibold' : 'text-utu-black hover:text-utu-red'} transition-colors font-medium`}
                onClick={() => handleNavLinkClick(link.to)}
              >
                {link.label}
              </PrefetchLink>
            ))}
            <Button 
              onClick={handleDonateClick} 
              className="bg-utu-red hover:bg-red-700 text-white"
            >
              Donate Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <TouchButton
              variant="ghost"
              size="touch"
              onClick={toggleMenu}
              className="text-utu-black hover:text-utu-red focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
              aria-label={isMenuOpen ? "Close main menu" : "Open main menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="relative w-6 h-6">
                <Menu 
                  className={cn(
                    "absolute inset-0 transition-all duration-300",
                    isMenuOpen ? "rotate-180 opacity-0" : "rotate-0 opacity-100"
                  )} 
                  size={24} 
                />
                <X 
                  className={cn(
                    "absolute inset-0 transition-all duration-300",
                    isMenuOpen ? "rotate-0 opacity-100" : "-rotate-180 opacity-0"
                  )} 
                  size={24} 
                />
              </div>
            </TouchButton>
          </div>
        </div>

        {/* Mobile navigation */}
        <div 
          ref={mobileMenuRef as any}
          id="mobile-menu"
          role="menu"
          aria-labelledby="mobile-menu-button"
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="flex flex-col space-y-1 px-4 py-4 bg-gray-50/80 backdrop-blur-sm border-t border-gray-100">
            <TouchButton
              variant="ghost"
              size="touch"
              asChild
              className={cn(
                "justify-start gap-3 w-full rounded-lg",
                isActive('/') 
                  ? 'text-utu-red font-semibold bg-utu-red/10' 
                  : 'text-utu-black hover:text-utu-red hover:bg-utu-red/5'
              )}
            >
              <PrefetchLink 
                to="/" 
                role="menuitem"
                onClick={() => handleNavLinkClick('/')}
                aria-current={isActive('/') ? 'page' : undefined}
              >
                <Home size={20} aria-hidden="true" />
                Home
                <VisuallyHidden>{isActive('/') ? ' (current page)' : ''}</VisuallyHidden>
              </PrefetchLink>
            </TouchButton>
            
            {[
              { to: '/about', label: 'About' },
              { to: '/programs', label: 'Programs' },
              { to: '/communities', label: 'Communities' },
              { to: '/events', label: 'Events' },
              { to: '/impact', label: 'Impact' },
              { to: '/stories', label: 'Stories' },
              { to: '/team', label: 'Our Team' },
              { to: '/contact', label: 'Contact' },
              { to: '/volunteers/auth', label: 'Volunteer Portal' },
            ].map(link => (
              <TouchButton
                key={link.to}
                variant="ghost"
                size="touch"
                asChild
                className={cn(
                  "justify-start gap-3 w-full rounded-lg",
                  isActive(link.to) 
                    ? 'text-utu-red font-semibold bg-utu-red/10' 
                    : 'text-utu-black hover:text-utu-red hover:bg-utu-red/5'
                )}
              >
                <PrefetchLink to={link.to} onClick={() => handleNavLinkClick(link.to)}>
                  {link.label}
                </PrefetchLink>
              </TouchButton>
            ))}
            
            <TouchButton
              size="touch"
              onClick={handleDonateClick}
              className="bg-utu-red hover:bg-red-700 text-white w-full mt-4"
            >
              Donate Now
            </TouchButton>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
