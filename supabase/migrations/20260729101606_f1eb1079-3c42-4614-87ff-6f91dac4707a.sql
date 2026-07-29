-- ============ ENUMS ============
CREATE TYPE public.unp_access_level AS ENUM ('admin','manager','staff','viewer');
CREATE TYPE public.unp_account_status AS ENUM ('pending','approved','suspended','rejected');

-- ============ STAFF ACCOUNTS ============
CREATE TABLE public.unp_staff_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  position text,
  department_id uuid REFERENCES public.org_departments(id) ON DELETE SET NULL,
  access_level public.unp_access_level NOT NULL DEFAULT 'viewer',
  status public.unp_account_status NOT NULL DEFAULT 'pending',
  approved_by uuid,
  approved_at timestamptz,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.unp_staff_accounts TO authenticated;
GRANT ALL ON public.unp_staff_accounts TO service_role;
ALTER TABLE public.unp_staff_accounts ENABLE ROW LEVEL SECURITY;

-- ============ HELPER FUNCTIONS (private + invoker wrappers) ============
CREATE OR REPLACE FUNCTION private.unp_is_approved(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.unp_staff_accounts
                 WHERE user_id = _user_id AND status = 'approved');
$$;

CREATE OR REPLACE FUNCTION private.unp_access(_user_id uuid)
RETURNS public.unp_access_level LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT access_level FROM public.unp_staff_accounts
  WHERE user_id = _user_id AND status = 'approved' LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION private.unp_department(_user_id uuid)
RETURNS uuid LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT department_id FROM public.unp_staff_accounts
  WHERE user_id = _user_id AND status = 'approved' LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.unp_is_approved(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SET search_path = public AS $$
  SELECT private.unp_is_approved(_user_id);
$$;

CREATE OR REPLACE FUNCTION public.unp_access(_user_id uuid)
RETURNS public.unp_access_level LANGUAGE sql STABLE SET search_path = public AS $$
  SELECT private.unp_access(_user_id);
$$;

CREATE OR REPLACE FUNCTION public.unp_department(_user_id uuid)
RETURNS uuid LANGUAGE sql STABLE SET search_path = public AS $$
  SELECT private.unp_department(_user_id);
$$;

CREATE OR REPLACE FUNCTION public.unp_can_write(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SET search_path = public AS $$
  SELECT private.unp_access(_user_id) IN ('admin','manager','staff');
$$;

CREATE OR REPLACE FUNCTION public.unp_can_delete(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SET search_path = public AS $$
  SELECT private.unp_access(_user_id) IN ('admin','manager');
$$;

-- staff account policies
CREATE POLICY "own account visible" ON public.unp_staff_accounts
  FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.unp_is_approved(auth.uid()));
CREATE POLICY "self signup" ON public.unp_staff_accounts
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "admins manage accounts" ON public.unp_staff_accounts
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.unp_access(auth.uid()) = 'admin')
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.unp_access(auth.uid()) = 'admin');
CREATE POLICY "admins delete accounts" ON public.unp_staff_accounts
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.unp_access(auth.uid()) = 'admin');

-- ============ GENERIC MODULE TABLES ============
CREATE TABLE public.unp_donors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  donor_type text NOT NULL DEFAULT 'institutional',
  country text, contact_person text, email text, phone text,
  relationship_status text NOT NULL DEFAULT 'prospect',
  total_funded numeric DEFAULT 0, currency text DEFAULT 'USD',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.unp_grants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  donor_id uuid REFERENCES public.unp_donors(id) ON DELETE SET NULL,
  reference_no text,
  stage text NOT NULL DEFAULT 'opportunity',
  amount numeric, currency text DEFAULT 'USD',
  start_date date, end_date date, submission_deadline date,
  department_id uuid REFERENCES public.org_departments(id) ON DELETE SET NULL,
  project_id uuid REFERENCES public.org_projects(id) ON DELETE SET NULL,
  description text, reporting_schedule text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.unp_beneficiaries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  beneficiary_code text,
  full_name text NOT NULL,
  gender text, date_of_birth date, national_id text,
  household_size integer, household_head text,
  phone text, district text, village text, country text DEFAULT 'Uganda',
  latitude numeric, longitude numeric,
  programme text, status text NOT NULL DEFAULT 'active',
  photo_url text, notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.unp_cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_number text,
  beneficiary_id uuid REFERENCES public.unp_beneficiaries(id) ON DELETE SET NULL,
  case_type text NOT NULL DEFAULT 'general',
  priority text NOT NULL DEFAULT 'medium',
  status text NOT NULL DEFAULT 'intake',
  opened_date date DEFAULT CURRENT_DATE, closed_date date,
  assigned_to uuid REFERENCES public.org_staff(id) ON DELETE SET NULL,
  department_id uuid REFERENCES public.org_departments(id) ON DELETE SET NULL,
  summary text, action_taken text, referral text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.unp_indicators (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  project_id uuid REFERENCES public.org_projects(id) ON DELETE CASCADE,
  indicator_level text NOT NULL DEFAULT 'output',
  unit text, baseline numeric DEFAULT 0, target numeric,
  achieved numeric DEFAULT 0,
  frequency text, data_source text, disaggregation text,
  status text NOT NULL DEFAULT 'on-track',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.unp_indicator_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  indicator_id uuid NOT NULL REFERENCES public.unp_indicators(id) ON DELETE CASCADE,
  period_label text, entry_date date NOT NULL DEFAULT CURRENT_DATE,
  value numeric NOT NULL DEFAULT 0,
  district text, evidence_url text, notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.unp_finance_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_date date NOT NULL DEFAULT CURRENT_DATE,
  transaction_type text NOT NULL DEFAULT 'expense',
  category text, description text NOT NULL,
  amount numeric NOT NULL DEFAULT 0, currency text NOT NULL DEFAULT 'UGX',
  cost_center text,
  grant_id uuid REFERENCES public.unp_grants(id) ON DELETE SET NULL,
  project_id uuid REFERENCES public.org_projects(id) ON DELETE SET NULL,
  department_id uuid REFERENCES public.org_departments(id) ON DELETE SET NULL,
  payment_method text, reference_no text,
  status text NOT NULL DEFAULT 'recorded',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.unp_procurement_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_no text, title text NOT NULL, description text,
  department_id uuid REFERENCES public.org_departments(id) ON DELETE SET NULL,
  requested_by uuid REFERENCES public.org_staff(id) ON DELETE SET NULL,
  stage text NOT NULL DEFAULT 'request',
  estimated_cost numeric, actual_cost numeric, currency text DEFAULT 'UGX',
  supplier text, request_date date DEFAULT CURRENT_DATE, delivery_date date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.unp_inventory_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_name text NOT NULL, sku text, category text,
  unit text DEFAULT 'pcs',
  quantity numeric NOT NULL DEFAULT 0, reorder_level numeric DEFAULT 0,
  warehouse text, unit_cost numeric, expiry_date date,
  status text NOT NULL DEFAULT 'in-stock', notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.unp_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_tag text, name text NOT NULL, category text,
  purchase_date date, purchase_cost numeric, currency text DEFAULT 'UGX',
  location text,
  custodian_id uuid REFERENCES public.org_staff(id) ON DELETE SET NULL,
  department_id uuid REFERENCES public.org_departments(id) ON DELETE SET NULL,
  condition text DEFAULT 'good', warranty_expiry date,
  status text NOT NULL DEFAULT 'in-use', notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.unp_vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plate_number text NOT NULL, make text, model text, year integer,
  vehicle_type text, assigned_driver text,
  department_id uuid REFERENCES public.org_departments(id) ON DELETE SET NULL,
  insurance_expiry date, last_service_date date, odometer numeric,
  status text NOT NULL DEFAULT 'available', notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.unp_trips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id uuid REFERENCES public.unp_vehicles(id) ON DELETE CASCADE,
  trip_date date NOT NULL DEFAULT CURRENT_DATE,
  purpose text, origin text, destination text,
  driver text, distance_km numeric, fuel_cost numeric,
  status text NOT NULL DEFAULT 'completed',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.unp_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL, doc_type text, description text,
  file_url text, version text DEFAULT '1.0',
  department_id uuid REFERENCES public.org_departments(id) ON DELETE SET NULL,
  project_id uuid REFERENCES public.org_projects(id) ON DELETE SET NULL,
  owner text, review_date date, confidentiality text DEFAULT 'internal',
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.unp_partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL, partner_type text NOT NULL DEFAULT 'ngo',
  country text, focal_person text, email text, phone text,
  agreement_type text, agreement_start date, agreement_end date,
  status text NOT NULL DEFAULT 'active', collaboration_areas text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.unp_community_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL, activity_type text NOT NULL DEFAULT 'meeting',
  activity_date date NOT NULL DEFAULT CURRENT_DATE,
  district text, village text, facilitator text,
  participants_total integer DEFAULT 0, participants_female integer DEFAULT 0,
  participants_youth integer DEFAULT 0,
  project_id uuid REFERENCES public.org_projects(id) ON DELETE SET NULL,
  group_name text, outcomes text, photo_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.unp_knowledge (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL, knowledge_type text NOT NULL DEFAULT 'lesson-learned',
  summary text, content text, author text, tags text,
  project_id uuid REFERENCES public.org_projects(id) ON DELETE SET NULL,
  file_url text, published_date date DEFAULT CURRENT_DATE,
  status text NOT NULL DEFAULT 'published',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.unp_field_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL, report_date date NOT NULL DEFAULT CURRENT_DATE,
  submitted_by text, district text, village text,
  latitude numeric, longitude numeric,
  project_id uuid REFERENCES public.org_projects(id) ON DELETE SET NULL,
  findings text, challenges text, recommendations text,
  photo_url text, sync_status text NOT NULL DEFAULT 'synced',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.unp_risks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL, category text,
  likelihood text NOT NULL DEFAULT 'medium',
  impact text NOT NULL DEFAULT 'medium',
  mitigation text, owner text,
  project_id uuid REFERENCES public.org_projects(id) ON DELETE SET NULL,
  review_date date, status text NOT NULL DEFAULT 'open',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ============ GRANTS + RLS + POLICIES + TRIGGERS FOR MODULE TABLES ============
DO $$
DECLARE t text;
DECLARE tables text[] := ARRAY[
  'unp_donors','unp_grants','unp_beneficiaries','unp_cases','unp_indicators',
  'unp_indicator_entries','unp_finance_transactions','unp_procurement_requests',
  'unp_inventory_items','unp_assets','unp_vehicles','unp_trips','unp_documents',
  'unp_partners','unp_community_activities','unp_knowledge','unp_field_reports','unp_risks'
];
BEGIN
  FOREACH t IN ARRAY tables LOOP
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO authenticated', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format($f$CREATE POLICY "staff read %1$s" ON public.%1$I FOR SELECT TO authenticated USING (public.unp_is_approved(auth.uid()))$f$, t);
    EXECUTE format($f$CREATE POLICY "staff insert %1$s" ON public.%1$I FOR INSERT TO authenticated WITH CHECK (public.unp_can_write(auth.uid()))$f$, t);
    EXECUTE format($f$CREATE POLICY "staff update %1$s" ON public.%1$I FOR UPDATE TO authenticated USING (public.unp_can_write(auth.uid())) WITH CHECK (public.unp_can_write(auth.uid()))$f$, t);
    EXECUTE format($f$CREATE POLICY "managers delete %1$s" ON public.%1$I FOR DELETE TO authenticated USING (public.unp_can_delete(auth.uid()))$f$, t);
    EXECUTE format('CREATE TRIGGER set_updated_at_%1$s BEFORE UPDATE ON public.%1$I FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column()', t);
  END LOOP;
END $$;

CREATE TRIGGER set_updated_at_unp_staff_accounts BEFORE UPDATE ON public.unp_staff_accounts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- indexes
CREATE INDEX idx_unp_staff_user ON public.unp_staff_accounts(user_id);
CREATE INDEX idx_unp_grants_donor ON public.unp_grants(donor_id);
CREATE INDEX idx_unp_cases_beneficiary ON public.unp_cases(beneficiary_id);
CREATE INDEX idx_unp_indicators_project ON public.unp_indicators(project_id);
CREATE INDEX idx_unp_entries_indicator ON public.unp_indicator_entries(indicator_id);
CREATE INDEX idx_unp_finance_grant ON public.unp_finance_transactions(grant_id);