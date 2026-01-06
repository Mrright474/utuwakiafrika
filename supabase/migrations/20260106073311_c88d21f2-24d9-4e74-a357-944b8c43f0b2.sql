-- Drop and recreate the INSERT policy to be more permissive for new signups
DROP POLICY IF EXISTS "Users can create their volunteer profile" ON public.volunteer_profiles;

-- Create a more permissive INSERT policy that allows authenticated users to create their profile
CREATE POLICY "Users can create their volunteer profile" 
ON public.volunteer_profiles 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Also add a policy to allow users to insert during signup flow
-- This handles the case where the session is being established
CREATE POLICY "Service role can insert profiles" 
ON public.volunteer_profiles 
FOR INSERT 
TO service_role
WITH CHECK (true);

-- Create volunteer_hours table for tracking volunteer hours
CREATE TABLE IF NOT EXISTS public.volunteer_hours (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  volunteer_id UUID NOT NULL REFERENCES public.volunteer_profiles(id) ON DELETE CASCADE,
  activity_date DATE NOT NULL,
  hours DECIMAL(5,2) NOT NULL CHECK (hours > 0 AND hours <= 24),
  activity_type TEXT NOT NULL,
  description TEXT,
  location TEXT,
  verified BOOLEAN DEFAULT false,
  verified_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on volunteer_hours
ALTER TABLE public.volunteer_hours ENABLE ROW LEVEL SECURITY;

-- Policies for volunteer_hours
CREATE POLICY "Volunteers can view their own hours"
ON public.volunteer_hours
FOR SELECT
USING (
  volunteer_id IN (
    SELECT id FROM public.volunteer_profiles WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Volunteers can insert their own hours"
ON public.volunteer_hours
FOR INSERT
TO authenticated
WITH CHECK (
  volunteer_id IN (
    SELECT id FROM public.volunteer_profiles WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Volunteers can update their own unverified hours"
ON public.volunteer_hours
FOR UPDATE
USING (
  volunteer_id IN (
    SELECT id FROM public.volunteer_profiles WHERE user_id = auth.uid()
  ) AND verified = false
);

CREATE POLICY "Volunteers can delete their own unverified hours"
ON public.volunteer_hours
FOR DELETE
USING (
  volunteer_id IN (
    SELECT id FROM public.volunteer_profiles WHERE user_id = auth.uid()
  ) AND verified = false
);

CREATE POLICY "Admins can view all hours"
ON public.volunteer_hours
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update all hours"
ON public.volunteer_hours
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_volunteer_hours_updated_at
BEFORE UPDATE ON public.volunteer_hours
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();