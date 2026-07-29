DO $$
DECLARE t text;
DECLARE tables text[] := ARRAY['org_departments','org_staff','org_projects','project_tasks'];
BEGIN
  FOREACH t IN ARRAY tables LOOP
    EXECUTE format($f$CREATE POLICY "unp staff read %1$s" ON public.%1$I FOR SELECT TO authenticated USING (public.unp_is_approved(auth.uid()))$f$, t);
    EXECUTE format($f$CREATE POLICY "unp staff insert %1$s" ON public.%1$I FOR INSERT TO authenticated WITH CHECK (public.unp_can_write(auth.uid()))$f$, t);
    EXECUTE format($f$CREATE POLICY "unp staff update %1$s" ON public.%1$I FOR UPDATE TO authenticated USING (public.unp_can_write(auth.uid())) WITH CHECK (public.unp_can_write(auth.uid()))$f$, t);
    EXECUTE format($f$CREATE POLICY "unp managers delete %1$s" ON public.%1$I FOR DELETE TO authenticated USING (public.unp_can_delete(auth.uid()))$f$, t);
  END LOOP;
END $$;