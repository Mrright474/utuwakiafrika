-- One-time promotion for the designated admin email if the user already exists
INSERT INTO public.user_roles (user_id, role)
SELECT u.id, 'admin'::app_role
FROM auth.users u
WHERE lower(u.email) = lower('admin@utuafrika.org')
ON CONFLICT (user_id, role) DO NOTHING;