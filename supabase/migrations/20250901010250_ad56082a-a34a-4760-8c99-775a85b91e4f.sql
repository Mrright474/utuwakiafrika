-- Create a SECURITY DEFINER function to promote the current user to admin when appropriate
-- Conditions:
-- 1) Email matches admin@utuafrika.org OR
-- 2) No admin users exist yet (bootstrap)
-- This avoids modifying reserved schemas via triggers and can be safely called from the app.

create or replace function public.promote_self_to_admin()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid := auth.uid();
  current_email text;
  admin_count integer := 0;
begin
  -- If no authenticated user, nothing to do
  if current_user_id is null then
    return;
  end if;

  -- Read email from auth.users (read-only)
  select email into current_email from auth.users where id = current_user_id;

  -- Count existing admins
  select count(*) into admin_count from public.user_roles where role = 'admin'::app_role;

  -- Promote if matches explicit admin email OR if no admin exists yet
  if current_email is not null and (
    lower(current_email) = lower('admin@utuafrika.org') or admin_count = 0
  ) then
    insert into public.user_roles (user_id, role)
    values (current_user_id, 'admin'::app_role)
    on conflict do nothing;
  end if;
end;
$$;