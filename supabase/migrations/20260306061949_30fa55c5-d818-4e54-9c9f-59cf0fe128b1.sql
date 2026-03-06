
CREATE TABLE public.community_registrations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  country text NOT NULL,
  city text NOT NULL,
  registration_type text NOT NULL DEFAULT 'join',
  business_type text,
  message text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.community_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit community registration"
  ON public.community_registrations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view community registrations"
  ON public.community_registrations
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update community registrations"
  ON public.community_registrations
  FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete community registrations"
  ON public.community_registrations
  FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));
