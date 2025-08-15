-- Fix security warnings by setting search_path on functions

-- Update the update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Update the generate_volunteer_id function
CREATE OR REPLACE FUNCTION public.generate_volunteer_id()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.volunteer_id = 'UTU-' || LPAD(EXTRACT(YEAR FROM NOW())::TEXT, 4, '0') || '-' || LPAD(nextval('volunteer_id_seq')::TEXT, 4, '0');
  RETURN NEW;
END;
$$;