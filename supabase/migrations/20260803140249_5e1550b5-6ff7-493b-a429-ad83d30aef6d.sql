CREATE TABLE public.unp_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  actor_name text,
  actor_email text,
  action text NOT NULL,
  module_id text,
  module_label text,
  record_id uuid,
  record_label text,
  description text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_unp_audit_log_created_at ON public.unp_audit_log (created_at DESC);
CREATE INDEX idx_unp_audit_log_module ON public.unp_audit_log (module_id);
CREATE INDEX idx_unp_audit_log_user ON public.unp_audit_log (user_id);

GRANT SELECT, INSERT ON public.unp_audit_log TO authenticated;
GRANT ALL ON public.unp_audit_log TO service_role;

ALTER TABLE public.unp_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approved staff can write audit entries"
  ON public.unp_audit_log FOR INSERT TO authenticated
  WITH CHECK (public.unp_is_approved(auth.uid()) AND user_id = auth.uid());

CREATE POLICY "Staff can view their own audit entries"
  ON public.unp_audit_log FOR SELECT TO authenticated
  USING (public.unp_is_approved(auth.uid()) AND user_id = auth.uid());

CREATE POLICY "Managers and admins can view all audit entries"
  ON public.unp_audit_log FOR SELECT TO authenticated
  USING (public.unp_access(auth.uid()) IN ('admin','manager'));