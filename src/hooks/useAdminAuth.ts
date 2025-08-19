import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

interface AdminProfile {
  id: string;
  user_id: string;
  display_name?: string;
  department?: string;
  permissions: string[];
}

export const useAdminAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check initial auth state
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          setTimeout(() => {
            checkAdminStatus(session.user.id);
          }, 0);
        } else {
          setAdminProfile(null);
          setIsAdmin(false);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await checkAdminStatus(session.user.id);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error checking user:', error);
      setLoading(false);
    }
  };

  const checkAdminStatus = async (userId: string) => {
    try {
      // Check if user has admin role
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle();

      if (roleError) {
        console.error('Error checking admin role:', roleError);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      const hasAdminRole = !!roleData;
      setIsAdmin(hasAdminRole);

      // Get admin profile if they are an admin
      if (hasAdminRole) {
        const { data: profileData, error: profileError } = await supabase
          .from('admin_profiles')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle();

        if (profileError) {
          console.error('Error fetching admin profile:', profileError);
        } else {
          setAdminProfile(profileData);
        }
      }

      setLoading(false);
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Sign In Failed",
          description: error.message,
          variant: "destructive"
        });
        return { success: false, error };
      }

      toast({
        title: "Signed In Successfully",
        description: "Welcome back!",
      });

      return { success: true, data };
    } catch (error: any) {
      toast({
        title: "Sign In Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
      return { success: false, error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          title: "Sign Out Failed",
          description: error.message,
          variant: "destructive"
        });
        return { success: false, error };
      }

      setUser(null);
      setAdminProfile(null);
      setIsAdmin(false);

      toast({
        title: "Signed Out",
        description: "You have been signed out successfully.",
      });

      return { success: true };
    } catch (error: any) {
      toast({
        title: "Sign Out Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
      return { success: false, error };
    }
  };

  return {
    user,
    adminProfile,
    isAdmin,
    loading,
    signIn,
    signOut,
    checkAdminStatus: () => user?.id && checkAdminStatus(user.id)
  };
};