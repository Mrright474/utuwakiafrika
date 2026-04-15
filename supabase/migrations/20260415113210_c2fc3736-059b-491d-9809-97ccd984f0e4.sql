
-- Departments table
CREATE TABLE public.org_departments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  head_staff_id UUID,
  status TEXT NOT NULL DEFAULT 'active',
  color TEXT DEFAULT '#3B82F6',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.org_departments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage departments" ON public.org_departments FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Public can view active departments" ON public.org_departments FOR SELECT USING (status = 'active');

-- Staff table
CREATE TABLE public.org_staff (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  position TEXT NOT NULL,
  department_id UUID REFERENCES public.org_departments(id) ON DELETE SET NULL,
  employment_type TEXT NOT NULL DEFAULT 'full-time',
  status TEXT NOT NULL DEFAULT 'active',
  hire_date DATE,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.org_staff ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage staff" ON public.org_staff FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Add FK for department head
ALTER TABLE public.org_departments ADD CONSTRAINT fk_head_staff FOREIGN KEY (head_staff_id) REFERENCES public.org_staff(id) ON DELETE SET NULL;

-- Projects table
CREATE TABLE public.org_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  department_id UUID REFERENCES public.org_departments(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'planning',
  priority TEXT NOT NULL DEFAULT 'medium',
  start_date DATE,
  end_date DATE,
  budget NUMERIC,
  project_lead_id UUID REFERENCES public.org_staff(id) ON DELETE SET NULL,
  progress INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.org_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage projects" ON public.org_projects FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Project tasks / workplan items
CREATE TABLE public.project_tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.org_projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  assigned_to UUID REFERENCES public.org_staff(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'todo',
  priority TEXT NOT NULL DEFAULT 'medium',
  due_date DATE,
  estimated_hours NUMERIC,
  actual_hours NUMERIC DEFAULT 0,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.project_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage tasks" ON public.project_tasks FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Triggers for updated_at
CREATE TRIGGER update_org_departments_updated_at BEFORE UPDATE ON public.org_departments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_org_staff_updated_at BEFORE UPDATE ON public.org_staff FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_org_projects_updated_at BEFORE UPDATE ON public.org_projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_project_tasks_updated_at BEFORE UPDATE ON public.project_tasks FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
