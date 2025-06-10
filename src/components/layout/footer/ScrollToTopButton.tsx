
import React from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button 
      onClick={scrollToTop}
      className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-utu-red text-white w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default ScrollToTopButton;
