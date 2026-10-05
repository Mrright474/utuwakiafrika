CREATE POLICY "UNP admins and managers can view donations"
ON public.donation_requests FOR SELECT TO authenticated
USING (public.unp_is_approved(auth.uid()) AND public.unp_access(auth.uid()) IN ('admin','manager'));