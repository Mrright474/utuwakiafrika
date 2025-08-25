-- Create trigger to auto-promote designated admin email upon signup
DO $$
BEGIN
  -- If trigger already exists, do nothing
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_admin_promotion'
  ) THEN
    CREATE TRIGGER on_auth_admin_promotion
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_admin_promotion();
  END IF;
END $$;

-- Also promote existing user if present (idempotent)
INSERT INTO public.user_roles (user_id, role)
SELECT u.id, 'admin'::app_role
FROM auth.users u
WHERE lower(u.email) = lower('admin@utuafrika.org')
ON CONFLICT (user_id, role) DO NOTHING;