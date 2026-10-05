ALTER TABLE public.donation_requests ADD COLUMN IF NOT EXISTS status_updated_at timestamptz;
UPDATE public.donation_requests SET status = 'rejected' WHERE status = 'cancelled';

CREATE OR REPLACE FUNCTION public.donation_requests_status_guard()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.status NOT IN ('pending','confirmed','rejected') THEN
    RAISE EXCEPTION 'Invalid donation status: %', NEW.status;
  END IF;
  IF TG_OP = 'UPDATE' AND NEW.status IS DISTINCT FROM OLD.status THEN
    NEW.status_updated_at = now();
  END IF;
  RETURN NEW;
END; $$;

CREATE TRIGGER donation_requests_status_guard
BEFORE INSERT OR UPDATE ON public.donation_requests
FOR EACH ROW EXECUTE FUNCTION public.donation_requests_status_guard();