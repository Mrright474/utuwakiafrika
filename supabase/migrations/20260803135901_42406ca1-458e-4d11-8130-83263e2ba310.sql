CREATE TABLE public.unp_module_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  department_id uuid NOT NULL REFERENCES public.org_departments(id) ON DELETE CASCADE,
  module_id text NOT NULL,
  can_view boolean NOT NULL DEFAULT true,
  can_create boolean NOT NULL DEFAULT false,
  can_edit boolean NOT NULL DEFAULT false,
  can_delete boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (department_id, module_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.unp_module_permissions TO authenticated;
GRANT ALL ON public.unp_module_permissions TO service_role;

ALTER TABLE public.unp_module_permissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approved staff can read module permissions"
ON public.unp_module_permissions FOR SELECT TO authenticated
USING (public.unp_is_approved(auth.uid()));

CREATE POLICY "Platform admins manage module permissions"
ON public.unp_module_permissions FOR ALL TO authenticated
USING (public.unp_access(auth.uid()) = 'admin'::unp_access_level)
WITH CHECK (public.unp_access(auth.uid()) = 'admin'::unp_access_level);

CREATE TRIGGER set_updated_at_unp_module_permissions
BEFORE UPDATE ON public.unp_module_permissions
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();