
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
        // Prompt for admin password
        const enteredPassword = prompt("Enter admin password:");
        
        if (enteredPassword === "African195") {
          const newAdminState = !isAdmin;
          setIsAdmin(newAdminState);
          // Save admin state to localStorage
          localStorage.setItem('adminMode', newAdminState.toString());
          
          toast({
            title: newAdminState ? "Admin mode enabled" : "Admin mode disabled",
            description: newAdminState ? "You can now edit team members" : "You are now viewing as a regular user",
          });
        } else {
          toast({
            title: "Incorrect Password",
            description: "The entered password is incorrect.",
            variant: "destructive"
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAdmin, toast]);

  return { isAdmin };
};

