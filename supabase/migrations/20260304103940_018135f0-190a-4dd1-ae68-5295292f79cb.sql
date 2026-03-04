
CREATE TABLE public.event_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  organization TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'registered',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

-- Anyone can register for events
CREATE POLICY "Anyone can register for events"
  ON public.event_registrations FOR INSERT
  WITH CHECK (true);

-- Admins can view all registrations
CREATE POLICY "Admins can view all registrations"
  ON public.event_registrations FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update registrations
CREATE POLICY "Admins can update registrations"
  ON public.event_registrations FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete registrations
CREATE POLICY "Admins can delete registrations"
  ON public.event_registrations FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));
