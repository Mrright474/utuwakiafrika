import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import type { OrgProject, ProjectTask, OrgStaff, OrgDepartment } from '@/hooks/useOrgManagement';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: OrgProject | null;
  tasks: ProjectTask[];
  staff: OrgStaff[];
  departments: OrgDepartment[];
}

const ProjectReportDialog = ({ open, onOpenChange, project, tasks, staff, departments }: Props) => {
  if (!project) return null;

  const projectTasks = tasks.filter(t => t.project_id === project.id);
  const department = departments.find(d => d.id === project.department_id);
  const lead = staff.find(s => s.id === project.project_lead_id);

  // Team assignments derived from task assignees
  const assignedIds = Array.from(new Set(projectTasks.map(t => t.assigned_to).filter(Boolean) as string[]));
  const team = staff.filter(s => assignedIds.includes(s.id));

  const totalEstimated = projectTasks.reduce((sum, t) => sum + (Number(t.estimated_hours) || 0), 0);
  const totalActual = projectTasks.reduce((sum, t) => sum + (Number(t.actual_hours) || 0), 0);
  const completedCount = projectTasks.filter(t => t.status === 'done').length;

  const handlePrint = () => window.print();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto print:max-w-full print:shadow-none">
        <DialogHeader className="print:hidden">
          <DialogTitle>Project Report</DialogTitle>
        </DialogHeader>

        <div id="project-report" className="space-y-6 print:p-0">
          {/* Header */}
          <header className="border-b pb-4">
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Generated {new Date().toLocaleDateString()} • Status: {project.status} • Priority: {project.priority}
            </p>
          </header>

          {/* Overview */}
          <section>
            <h2 className="text-xl font-semibold mb-3">Overview</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><strong>Department:</strong> {department?.name || '—'}</div>
              <div><strong>Project Lead:</strong> {lead ? `${lead.first_name} ${lead.last_name}` : '—'}</div>
              <div><strong>Start Date:</strong> {project.start_date || '—'}</div>
              <div><strong>End Date:</strong> {project.end_date || '—'}</div>
              <div><strong>Progress:</strong> {project.progress || 0}%</div>
              <div><strong>Tasks:</strong> {completedCount} / {projectTasks.length} complete</div>
            </div>
            {project.description && (
              <div className="mt-3 text-sm">
                <strong>Description:</strong>
                <p className="mt-1 whitespace-pre-wrap">{project.description}</p>
              </div>
            )}
          </section>

          {/* Budget */}
          <section>
            <h2 className="text-xl font-semibold mb-3">Budget & Hours</h2>
            <table className="w-full text-sm border-collapse">
              <tbody>
                <tr className="border-b">
                  <td className="py-2 font-medium">Total Budget</td>
                  <td className="py-2 text-right">{project.budget ? `$${Number(project.budget).toLocaleString()}` : '—'}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">Estimated Hours</td>
                  <td className="py-2 text-right">{totalEstimated.toFixed(1)} hrs</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">Actual Hours Logged</td>
                  <td className="py-2 text-right">{totalActual.toFixed(1)} hrs</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Variance</td>
                  <td className="py-2 text-right">{(totalActual - totalEstimated).toFixed(1)} hrs</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Team */}
          <section>
            <h2 className="text-xl font-semibold mb-3">Team Assignments ({team.length})</h2>
            {team.length === 0 ? (
              <p className="text-sm text-muted-foreground">No team members assigned to tasks.</p>
            ) : (
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-2 px-2 text-left">Name</th>
                    <th className="py-2 px-2 text-left">Position</th>
                    <th className="py-2 px-2 text-left">Email</th>
                    <th className="py-2 px-2 text-right">Tasks</th>
                  </tr>
                </thead>
                <tbody>
                  {team.map(m => {
                    const memberTasks = projectTasks.filter(t => t.assigned_to === m.id).length;
                    return (
                      <tr key={m.id} className="border-b">
                        <td className="py-2 px-2">{m.first_name} {m.last_name}</td>
                        <td className="py-2 px-2">{m.position}</td>
                        <td className="py-2 px-2">{m.email}</td>
                        <td className="py-2 px-2 text-right">{memberTasks}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </section>

          {/* Tasks */}
          <section>
            <h2 className="text-xl font-semibold mb-3">Workplan ({projectTasks.length} tasks)</h2>
            {projectTasks.length === 0 ? (
              <p className="text-sm text-muted-foreground">No tasks created for this project.</p>
            ) : (
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-2 px-2 text-left">Task</th>
                    <th className="py-2 px-2 text-left">Assignee</th>
                    <th className="py-2 px-2 text-left">Status</th>
                    <th className="py-2 px-2 text-left">Priority</th>
                    <th className="py-2 px-2 text-left">Due</th>
                    <th className="py-2 px-2 text-right">Est</th>
                    <th className="py-2 px-2 text-right">Actual</th>
                  </tr>
                </thead>
                <tbody>
                  {projectTasks.map(t => (
                    <tr key={t.id} className="border-b">
                      <td className="py-2 px-2">{t.title}</td>
                      <td className="py-2 px-2">{t.org_staff ? `${t.org_staff.first_name} ${t.org_staff.last_name}` : '—'}</td>
                      <td className="py-2 px-2">{t.status}</td>
                      <td className="py-2 px-2">{t.priority}</td>
                      <td className="py-2 px-2">{t.due_date || '—'}</td>
                      <td className="py-2 px-2 text-right">{t.estimated_hours ?? '—'}</td>
                      <td className="py-2 px-2 text-right">{t.actual_hours ?? 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>

          <footer className="pt-4 border-t text-xs text-muted-foreground print:fixed print:bottom-4">
            Confidential — Internal organizational report
          </footer>
        </div>

        <DialogFooter className="print:hidden">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          <Button onClick={handlePrint}><Printer className="h-4 w-4 mr-1" /> Print / Save PDF</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectReportDialog;
