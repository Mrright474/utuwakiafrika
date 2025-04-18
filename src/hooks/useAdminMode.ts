
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

export const useAdminMode = () => {
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(() => {
    // Check if admin mode was stored in localStorage
    const storedAdminMode = localStorage.getItem('adminMode');
    return storedAdminMode === 'true';
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        const newAdminState = !isAdmin;
        setIsAdmin(newAdminState);
        // Save admin state to localStorage
        localStorage.setItem('adminMode', newAdminState.toString());
        
        toast({
          title: newAdminState ? "Admin mode enabled" : "Admin mode disabled",
          description: newAdminState ? "You can now edit team members" : "You are now viewing as a regular user",
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAdmin, toast]);

  return { isAdmin };
};
