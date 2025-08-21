-- Clean up the invalid user we created earlier
DELETE FROM user_roles WHERE user_id IN (
  SELECT id FROM auth.users WHERE email = 'admin@utuafrika.org'
);

DELETE FROM auth.users WHERE email = 'admin@utuafrika.org';

-- Create a function to automatically promote a specific email to admin after signup
CREATE OR REPLACE FUNCTION public.handle_admin_promotion()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if this is the designated admin email
  IF NEW.email = 'admin@utuafrica.org' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin'::app_role);
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger to auto-promote admin email
CREATE OR REPLACE TRIGGER on_admin_signup
  AFTER INSERT ON auth.users
  FOR EACH ROW
  WHEN (NEW.email = 'admin@utuafrica.org')
  EXECUTE FUNCTION public.handle_admin_promotion();