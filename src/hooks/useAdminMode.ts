
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

export const useAdminMode = () => {
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setIsAdmin(!isAdmin);
        toast({
          title: isAdmin ? "Admin mode disabled" : "Admin mode enabled",
          description: isAdmin ? "You are now viewing as a regular user" : "You can now edit team members",
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
