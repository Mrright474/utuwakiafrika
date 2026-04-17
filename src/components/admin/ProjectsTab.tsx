import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Plus, Edit2, Trash2, FolderKanban, Calendar, DollarSign, FileText } from 'lucide-react';
import type { OrgProject, OrgDepartment, OrgStaff, ProjectTask } from '@/hooks/useOrgManagement';
import ExportButton from './ExportButton';
import { exportColumns } from '@/utils/exportData';
import ProjectReportDialog from './ProjectReportDialog';

interface Props {
  projects: OrgProject[];
  departments: OrgDepartment[];
  staff: OrgStaff[];
  tasks: ProjectTask[];
  onSave: (p: any) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
  onSelectProject: (id: string) => void;
}

const emptyProject = { title: '', description: '', department_id: '', status: 'planning', priority: 'medium', start_date: '', end_date: '', budget: '', project_lead_id: '', progress: 0 };

const statusColors: Record<string, string> = {
  planning: 'bg-blue-100 text-blue-800',
  active: 'bg-green-100 text-green-800',
  'on-hold': 'bg-yellow-100 text-yellow-800',
  completed: 'bg-purple-100 text-purple-800',
};

const priorityColors: Record<string, string> = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-blue-100 text-blue-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800',
};

const ProjectsTab = ({ projects, departments, staff, tasks, onSave, onDelete, onSelectProject }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<any>(emptyProject);
  const [editing, setEditing] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [reportProject, setReportProject] = useState<OrgProject | null>(null);

  const openAdd = () => { setForm({ ...emptyProject }); setEditing(false); setDialogOpen(true); };
  const openEdit = (p: OrgProject, e: React.MouseEvent) => {
    e.stopPropagation();
    setForm({ ...p, department_id: p.department_id || '', project_lead_id: p.project_lead_id || '', budget: p.budget?.toString() || '' });
    setEditing(true);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    const data = {
      ...form,
      department_id: form.department_id || null,
      project_lead_id: form.project_lead_id || null,
      budget: form.budget ? parseFloat(form.budget) : null,
      progress: parseInt(form.progress) || 0,
    };
    const ok = await onSave(data);
    if (ok) setDialogOpen(false);
  };

  const filtered = statusFilter === 'all' ? projects : projects.filter(p => p.status === statusFilter);

  const exportRows = filtered.map(p => ({
    title: p.title,
    description: p.description || '',
    department: p.org_departments?.name || '',
    project_lead: p.org_staff ? `${p.org_staff.first_name} ${p.org_staff.last_name}` : '',
    status: p.status,
    priority: p.priority,
    start_date: p.start_date || '',
    end_date: p.end_date || '',
    budget: p.budget ?? '',
    progress: p.progress ?? 0,
  }));

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2"><FolderKanban className="h-5 w-5" /> Projects ({projects.length})</CardTitle>
            <CardDescription>Track organizational projects, budgets, and progress. Click a project to view its workplan.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <ExportButton data={exportRows} columns={exportColumns.projects} filename="projects" />
            <Button onClick={openAdd} size="sm"><Plus className="h-4 w-4 mr-1" /> New Project</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filtered.map(p => (
              <div key={p.id} className="border rounded-lg p-4 space-y-3 cursor-pointer hover:shadow-md transition-shadow" onClick={() => onSelectProject(p.id)}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{p.title}</h3>
                    {p.description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{p.description}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={priorityColors[p.priority]}>{p.priority}</Badge>
                    <Badge className={statusColors[p.status] || 'bg-gray-100'}>{p.status}</Badge>
                    <Button size="icon" variant="ghost" onClick={(e) => openEdit(p, e)}><Edit2 className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); onDelete(p.id); }}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  {p.org_departments?.name && <span>Dept: {p.org_departments.name}</span>}
                  {p.org_staff && <span>Lead: {p.org_staff.first_name} {p.org_staff.last_name}</span>}
                  {p.start_date && <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{p.start_date} → {p.end_date || '...'}</span>}
                  {p.budget && <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />{p.budget.toLocaleString()}</span>}
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={p.progress || 0} className="flex-1 h-2" />
                  <span className="text-sm font-medium">{p.progress || 0}%</span>
                </div>
              </div>
            ))}
            {filtered.length === 0 && <p className="text-center py-8 text-muted-foreground">No projects found.</p>}
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editing ? 'Edit Project' : 'New Project'}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2 max-h-[60vh] overflow-y-auto">
            <div><Label>Title *</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
            <div><Label>Description</Label><Textarea value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Department</Label>
                <Select value={form.department_id} onValueChange={v => setForm({ ...form, department_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {departments.map(d => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Project Lead</Label>
                <Select value={form.project_lead_id} onValueChange={v => setForm({ ...form, project_lead_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {staff.map(s => <SelectItem key={s.id} value={s.id}>{s.first_name} {s.last_name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Status</Label>
                <Select value={form.status} onValueChange={v => setForm({ ...form, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Priority</Label>
                <Select value={form.priority} onValueChange={v => setForm({ ...form, priority: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Start Date</Label><Input type="date" value={form.start_date || ''} onChange={e => setForm({ ...form, start_date: e.target.value })} /></div>
              <div><Label>End Date</Label><Input type="date" value={form.end_date || ''} onChange={e => setForm({ ...form, end_date: e.target.value })} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Budget</Label><Input type="number" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} placeholder="0.00" /></div>
              <div><Label>Progress (%)</Label><Input type="number" min={0} max={100} value={form.progress} onChange={e => setForm({ ...form, progress: e.target.value })} /></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={!form.title}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectsTab;
