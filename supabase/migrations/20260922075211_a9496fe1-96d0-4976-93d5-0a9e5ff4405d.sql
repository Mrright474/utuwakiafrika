CREATE TABLE public.donation_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  amount NUMERIC NOT NULL CHECK (amount > 0),
  currency TEXT NOT NULL DEFAULT 'UGX',
  provider TEXT NOT NULL CHECK (provider IN ('airtel','mtn')),
  note TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.donation_requests TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.donation_requests TO authenticated;
GRANT ALL ON public.donation_requests TO service_role;

ALTER TABLE public.donation_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a donation request"
ON public.donation_requests FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Admins can view donation requests"
ON public.donation_requests FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update donation requests"
ON public.donation_requests FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete donation requests"
ON public.donation_requests FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_donation_requests_updated_at
BEFORE UPDATE ON public.donation_requests
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();