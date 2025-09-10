import React from 'react';
import { cn } from '@/lib/utils';

interface VisuallyHiddenProps {
  children: React.ReactNode;
  asChild?: boolean;
}

const VisuallyHidden: React.FC<VisuallyHiddenProps> = ({ 
  children, 
  asChild = false 
}) => {
  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      className: cn((children as React.ReactElement).props.className, 'sr-only')
    });
  }

  return (
    <span className="sr-only">
      {children}
    </span>
  );
};

export default VisuallyHidden;