-- 1. Remove vulnerable newsletter UPDATE policies (unsubscribe handled via service role in edge function)
DROP POLICY IF EXISTS "Anyone can unsubscribe by email" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Subscribers can unsubscribe themselves" ON public.newsletter_subscribers;

-- 2. Fix promote_self_to_admin: remove admin_count=0 backdoor
CREATE OR REPLACE FUNCTION public.promote_self_to_admin()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  current_user_id uuid := auth.uid();
  current_email text;
begin
  if current_user_id is null then
    return;
  end if;

  select email into current_email from auth.users where id = current_user_id;

  -- Only promote the designated admin email, not any first user
  if current_email is not null and lower(current_email) = lower('admin@utuafrika.org') then
    insert into public.user_roles (user_id, role)
    values (current_user_id, 'admin'::app_role)
    on conflict do nothing;
  end if;
end;
$function$;

-- 3. Add email format validation constraint to newsletter_subscribers
ALTER TABLE public.newsletter_subscribers
  DROP CONSTRAINT IF EXISTS valid_email_format;
ALTER TABLE public.newsletter_subscribers
  ADD CONSTRAINT valid_email_format
  CHECK (email ~ '^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$');

-- 4. Add email format validation constraint to contact_submissions
ALTER TABLE public.contact_submissions
  DROP CONSTRAINT IF EXISTS valid_contact_email_format;
ALTER TABLE public.contact_submissions
  ADD CONSTRAINT valid_contact_email_format
  CHECK (email ~ '^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$');