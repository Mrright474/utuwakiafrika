-- Add missing admin policies for volunteer management

-- Allow admins to view all volunteer profiles
CREATE POLICY "Admins can view all volunteer profiles" 
ON public.volunteer_profiles 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to update volunteer profiles (for status changes, approvals, etc.)
CREATE POLICY "Admins can update all volunteer profiles" 
ON public.volunteer_profiles 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to view all volunteer activities
CREATE POLICY "Admins can view all volunteer activities" 
ON public.volunteer_activities 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to update volunteer activities
CREATE POLICY "Admins can update all volunteer activities" 
ON public.volunteer_activities 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to create volunteer activities (for manual entry)
CREATE POLICY "Admins can create volunteer activities" 
ON public.volunteer_activities 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));