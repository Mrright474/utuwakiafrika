import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit2, Trash2, ListTodo, ArrowLeft, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import type { ProjectTask, OrgProject, OrgStaff } from '@/hooks/useOrgManagement';

interface Props {
  tasks: ProjectTask[];
  projects: OrgProject[];
  staff: OrgStaff[];
  selectedProjectId: string | null;
  onSave: (t: any) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
  onBack: () => void;
}

const emptyTask = { title: '', description: '', project_id: '', assigned_to: '', status: 'todo', priority: 'medium', due_date: '', estimated_hours: '', actual_hours: '' };

const statusIcons: Record<string, React.ReactNode> = {
  todo: <Clock className="h-3 w-3" />,
  'in-progress': <AlertCircle className="h-3 w-3" />,
  review: <ListTodo className="h-3 w-3" />,
  done: <CheckCircle2 className="h-3 w-3" />,
};

const statusColors: Record<string, string> = {
  todo: 'bg-gray-100 text-gray-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  review: 'bg-yellow-100 text-yellow-800',
  done: 'bg-green-100 text-green-800',
};

const priorityColors: Record<string, string> = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-blue-100 text-blue-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800',
};

const WorkplanTab = ({ tasks, projects, staff, selectedProjectId, onSave, onDelete, onBack }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<any>(emptyTask);
  const [editing, setEditing] = useState(false);

  const project = projects.find(p => p.id === selectedProjectId);
  const projectTasks = selectedProjectId ? tasks.filter(t => t.project_id === selectedProjectId) : tasks;

  const openAdd = () => {
    setForm({ ...emptyTask, project_id: selectedProjectId || '' });
    setEditing(false);
    setDialogOpen(true);
  };

  const openEdit = (t: ProjectTask) => {
    setForm({ ...t, assigned_to: t.assigned_to || '', estimated_hours: t.estimated_hours?.toString() || '', actual_hours: t.actual_hours?.toString() || '' });
    setEditing(true);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    const data = {
      ...form,
      assigned_to: form.assigned_to || null,
      estimated_hours: form.estimated_hours ? parseFloat(form.estimated_hours) : null,
      actual_hours: form.actual_hours ? parseFloat(form.actual_hours) : 0,
    };
    const ok = await onSave(data);
    if (ok) setDialogOpen(false);
  };

  const tasksByStatus = {
    todo: projectTasks.filter(t => t.status === 'todo'),
    'in-progress': projectTasks.filter(t => t.status === 'in-progress'),
    review: projectTasks.filter(t => t.status === 'review'),
    done: projectTasks.filter(t => t.status === 'done'),
  };

  const totalEstimated = projectTasks.reduce((s, t) => s + (t.estimated_hours || 0), 0);
  const totalActual = projectTasks.reduce((s, t) => s + (t.actual_hours || 0), 0);

  return (
    <>
      {selectedProjectId && (
        <div className="mb-4">
          <Button variant="ghost" onClick={onBack} className="mb-2"><ArrowLeft className="h-4 w-4 mr-1" /> Back to Projects</Button>
          {project && (
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold">{project.title} — Workplan</h2>
              <Badge className={statusColors[project.status] || 'bg-gray-100'}>{project.status}</Badge>
            </div>
          )}
        </div>
      )}

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        {Object.entries(tasksByStatus).map(([status, items]) => (
          <Card key={status}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium capitalize flex items-center gap-1">{statusIcons[status]} {status.replace('-', ' ')}</CardTitle>
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{items.length}</div></CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2"><ListTodo className="h-5 w-5" /> Tasks ({projectTasks.length})</CardTitle>
            <CardDescription>Est. {totalEstimated}h · Actual {totalActual}h logged</CardDescription>
          </div>
          <Button onClick={openAdd} size="sm"><Plus className="h-4 w-4 mr-1" /> Add Task</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                {!selectedProjectId && <TableHead>Project</TableHead>}
                <TableHead>Assigned To</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Hours (Est/Act)</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectTasks.map(t => (
                <TableRow key={t.id}>
                  <TableCell>
                    <div className="font-medium">{t.title}</div>
                    {t.description && <p className="text-xs text-muted-foreground line-clamp-1">{t.description}</p>}
                  </TableCell>
                  {!selectedProjectId && <TableCell className="text-sm">{t.org_projects?.title || '—'}</TableCell>}
                  <TableCell className="text-sm">{t.org_staff ? `${t.org_staff.first_name} ${t.org_staff.last_name}` : '—'}</TableCell>
                  <TableCell><Badge className={priorityColors[t.priority]}>{t.priority}</Badge></TableCell>
                  <TableCell><Badge className={statusColors[t.status] || 'bg-gray-100'}>{t.status}</Badge></TableCell>
                  <TableCell className="text-sm">{t.due_date || '—'}</TableCell>
                  <TableCell className="text-sm">{t.estimated_hours || 0} / {t.actual_hours || 0}</TableCell>
                  <TableCell className="text-right">
                    <Button size="icon" variant="ghost" onClick={() => openEdit(t)}><Edit2 className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => onDelete(t.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </TableCell>
                </TableRow>
              ))}
              {projectTasks.length === 0 && (
                <TableRow><TableCell colSpan={selectedProjectId ? 7 : 8} className="text-center py-8 text-muted-foreground">No tasks yet. Add your first task to get started.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? 'Edit Task' : 'Add Task'}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div><Label>Title *</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
            <div><Label>Description</Label><Textarea value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
            {!selectedProjectId && (
              <div><Label>Project *</Label>
                <Select value={form.project_id} onValueChange={v => setForm({ ...form, project_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Select project" /></SelectTrigger>
                  <SelectContent>{projects.map(p => <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            )}
            <div><Label>Assigned To</Label>
              <Select value={form.assigned_to} onValueChange={v => setForm({ ...form, assigned_to: v })}>
                <SelectTrigger><SelectValue placeholder="Select staff" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Unassigned</SelectItem>
                  {staff.map(s => <SelectItem key={s.id} value={s.id}>{s.first_name} {s.last_name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Status</Label>
                <Select value={form.status} onValueChange={v => setForm({ ...form, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
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
            <div><Label>Due Date</Label><Input type="date" value={form.due_date || ''} onChange={e => setForm({ ...form, due_date: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Estimated Hours</Label><Input type="number" value={form.estimated_hours} onChange={e => setForm({ ...form, estimated_hours: e.target.value })} /></div>
              <div><Label>Actual Hours</Label><Input type="number" value={form.actual_hours} onChange={e => setForm({ ...form, actual_hours: e.target.value })} /></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={!form.title || !form.project_id}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WorkplanTab;
