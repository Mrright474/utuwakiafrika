import React from 'react';
import { cn } from '@/lib/utils';

const SkipLinks = () => {
  return (
    <div className="sr-only focus-within:not-sr-only">
      <a
        href="#main-content"
        className={cn(
          "fixed top-4 left-4 z-[100] px-4 py-2 bg-primary text-primary-foreground",
          "rounded-md font-medium text-sm",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "transition-all duration-200"
        )}
      >
        Skip to main content
      </a>
      <a
        href="#navigation"
        className={cn(
          "fixed top-4 left-32 z-[100] px-4 py-2 bg-primary text-primary-foreground",
          "rounded-md font-medium text-sm",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "transition-all duration-200"
        )}
      >
        Skip to navigation
      </a>
    </div>
  );
};

export default SkipLinks;