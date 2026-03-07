-- Fix community_registrations: Convert restrictive policies to permissive where needed
-- Drop existing policies
DROP POLICY IF EXISTS "Admins can view community registrations" ON public.community_registrations;
DROP POLICY IF EXISTS "Admins can update community registrations" ON public.community_registrations;
DROP POLICY IF EXISTS "Admins can delete community registrations" ON public.community_registrations;
DROP POLICY IF EXISTS "Anyone can submit community registration" ON public.community_registrations;

-- Re-create as PERMISSIVE policies (default) so they actually grant access
CREATE POLICY "Admins can view community registrations"
  ON public.community_registrations FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update community registrations"
  ON public.community_registrations FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete community registrations"
  ON public.community_registrations FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can submit community registration"
  ON public.community_registrations FOR INSERT TO anon, authenticated
  WITH CHECK (true);