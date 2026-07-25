
CREATE SCHEMA IF NOT EXISTS private;
GRANT USAGE ON SCHEMA private TO authenticated, anon;

-- Drop unused RPC (admin promotion is handled by handle_admin_promotion trigger)
DROP FUNCTION IF EXISTS public.promote_self_to_admin();

-- ============ has_role ============
CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  );
$$;
REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, anon;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY INVOKER SET search_path = public
AS $$
  SELECT private.has_role(_user_id, _role);
$$;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, anon;

-- ============ get_current_user_role ============
CREATE OR REPLACE FUNCTION private.get_current_user_role()
RETURNS public.app_role
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT role FROM public.user_roles
  WHERE user_id = auth.uid()
  ORDER BY CASE role WHEN 'admin' THEN 1 WHEN 'volunteer' THEN 2 WHEN 'user' THEN 3 END
  LIMIT 1;
$$;
REVOKE ALL ON FUNCTION private.get_current_user_role() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.get_current_user_role() TO authenticated;

CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS public.app_role
LANGUAGE sql STABLE SECURITY INVOKER SET search_path = public
AS $$
  SELECT private.get_current_user_role();
$$;
REVOKE ALL ON FUNCTION public.get_current_user_role() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_current_user_role() TO authenticated;

-- ============ increment_story_view_count ============
CREATE OR REPLACE FUNCTION private.increment_story_view_count(story_id uuid)
RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  UPDATE public.success_stories SET view_count = view_count + 1 WHERE id = story_id;
END;
$$;
REVOKE ALL ON FUNCTION private.increment_story_view_count(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.increment_story_view_count(uuid) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.increment_story_view_count(story_id uuid)
RETURNS void
LANGUAGE sql SECURITY INVOKER SET search_path = public
AS $$
  SELECT private.increment_story_view_count(story_id);
$$;
REVOKE ALL ON FUNCTION public.increment_story_view_count(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.increment_story_view_count(uuid) TO anon, authenticated;
