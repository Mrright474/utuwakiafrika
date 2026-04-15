import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface OrgDepartment {
  id: string;
  name: string;
  description: string | null;
  head_staff_id: string | null;
  status: string;
  color: string | null;
  display_order: number | null;
  created_at: string;
  updated_at: string;
}

export interface OrgStaff {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  position: string;
  department_id: string | null;
  employment_type: string;
  status: string;
  hire_date: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
  org_departments?: { name: string } | null;
}

export interface OrgProject {
  id: string;
  title: string;
  description: string | null;
  department_id: string | null;
  status: string;
  priority: string;
  start_date: string | null;
  end_date: string | null;
  budget: number | null;
  project_lead_id: string | null;
  progress: number | null;
  created_at: string;
  updated_at: string;
  org_departments?: { name: string } | null;
  org_staff?: { first_name: string; last_name: string } | null;
}

export interface ProjectTask {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  assigned_to: string | null;
  status: string;
  priority: string;
  due_date: string | null;
  estimated_hours: number | null;
  actual_hours: number | null;
  display_order: number | null;
  created_at: string;
  updated_at: string;
  org_staff?: { first_name: string; last_name: string } | null;
  org_projects?: { title: string } | null;
}

export const useOrgManagement = (isAdmin: boolean) => {
  const [departments, setDepartments] = useState<OrgDepartment[]>([]);
  const [staff, setStaff] = useState<OrgStaff[]>([]);
  const [projects, setProjects] = useState<OrgProject[]>([]);
  const [tasks, setTasks] = useState<ProjectTask[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAll = useCallback(async () => {
    if (!isAdmin) { setLoading(false); return; }
    setLoading(true);
    try {
      const [deptRes, staffRes, projRes, taskRes] = await Promise.all([
        supabase.from('org_departments').select('*').order('display_order'),
        supabase.from('org_staff').select('*, org_departments(name)').order('last_name'),
        supabase.from('org_projects').select('*, org_departments(name), org_staff(first_name, last_name)').order('created_at', { ascending: false }),
        supabase.from('project_tasks').select('*, org_staff(first_name, last_name), org_projects(title)').order('display_order'),
      ]);
      if (deptRes.data) setDepartments(deptRes.data);
      if (staffRes.data) setStaff(staffRes.data);
      if (projRes.data) setProjects(projRes.data);
      if (taskRes.data) setTasks(taskRes.data);
    } catch (e) {
      console.error('Error loading org data:', e);
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // Department CRUD
  const saveDepartment = async (dept: Partial<OrgDepartment> & { name: string }) => {
    if (dept.id) {
      const { error } = await supabase.from('org_departments').update(dept).eq('id', dept.id);
      if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return false; }
    } else {
      const { error } = await supabase.from('org_departments').insert(dept);
      if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return false; }
    }
    toast({ title: 'Saved', description: 'Department saved successfully.' });
    await fetchAll();
    return true;
  };

  const deleteDepartment = async (id: string) => {
    const { error } = await supabase.from('org_departments').delete().eq('id', id);
    if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return false; }
    toast({ title: 'Deleted', description: 'Department deleted.' });
    await fetchAll();
    return true;
  };

  // Staff CRUD
  const saveStaff = async (member: Partial<OrgStaff> & { first_name: string; last_name: string; email: string; position: string }) => {
    const { org_departments, ...data } = member as any;
    if (data.id) {
      const { error } = await supabase.from('org_staff').update(data).eq('id', data.id);
      if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return false; }
    } else {
      const { error } = await supabase.from('org_staff').insert(data);
      if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return false; }
    }
    toast({ title: 'Saved', description: 'Staff member saved successfully.' });
    await fetchAll();
    return true;
  };

  const deleteStaff = async (id: string) => {
    const { error } = await supabase.from('org_staff').delete().eq('id', id);
    if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return false; }
    toast({ title: 'Deleted', description: 'Staff member removed.' });
    await fetchAll();
    return true;
  };

  // Project CRUD
  const saveProject = async (proj: Partial<OrgProject> & { title: string }) => {
    const { org_departments, org_staff, ...data } = proj as any;
    if (data.id) {
      const { error } = await supabase.from('org_projects').update(data).eq('id', data.id);
      if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return false; }
    } else {
      const { error } = await supabase.from('org_projects').insert(data);
      if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return false; }
    }
    toast({ title: 'Saved', description: 'Project saved successfully.' });
    await fetchAll();
    return true;
  };

  const deleteProject = async (id: string) => {
    const { error } = await supabase.from('org_projects').delete().eq('id', id);
    if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return false; }
    toast({ title: 'Deleted', description: 'Project deleted.' });
    await fetchAll();
    return true;
  };

  // Task CRUD
  const saveTask = async (task: Partial<ProjectTask> & { title: string; project_id: string }) => {
    const { org_staff, org_projects, ...data } = task as any;
    if (data.id) {
      const { error } = await supabase.from('project_tasks').update(data).eq('id', data.id);
      if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return false; }
    } else {
      const { error } = await supabase.from('project_tasks').insert(data);
      if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return false; }
    }
    toast({ title: 'Saved', description: 'Task saved successfully.' });
    await fetchAll();
    return true;
  };

  const deleteTask = async (id: string) => {
    const { error } = await supabase.from('project_tasks').delete().eq('id', id);
    if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return false; }
    toast({ title: 'Deleted', description: 'Task deleted.' });
    await fetchAll();
    return true;
  };

  return {
    departments, staff, projects, tasks, loading,
    refetch: fetchAll,
    saveDepartment, deleteDepartment,
    saveStaff, deleteStaff,
    saveProject, deleteProject,
    saveTask, deleteTask,
  };
};
