import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import type { OrgDepartment, OrgProject, OrgStaff, ProjectTask } from '@/hooks/useOrgManagement';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  departments: OrgDepartment[];
  projects: OrgProject[];
  staff: OrgStaff[];
  tasks: ProjectTask[];
}

const DepartmentReportDialog = ({ open, onOpenChange, departments, projects, staff, tasks }: Props) => {
  const deptSummaries = departments.map(dept => {
    const deptProjects = projects.filter(p => p.department_id === dept.id);
    const deptStaff = staff.filter(s => s.department_id === dept.id);
    const deptTasks = tasks.filter(t => deptProjects.some(p => p.id === t.project_id));

    const totalBudget = deptProjects.reduce((sum, p) => sum + (Number(p.budget) || 0), 0);
    const totalEstHours = deptTasks.reduce((sum, t) => sum + (Number(t.estimated_hours) || 0), 0);
    const totalActHours = deptTasks.reduce((sum, t) => sum + (Number(t.actual_hours) || 0), 0);
    const completedTasks = deptTasks.filter(t => t.status === 'done').length;
    const overdueTasks = deptTasks.filter(t => t.due_date && new Date(t.due_date) < new Date() && t.status !== 'done').length;

    const statusCounts = deptProjects.reduce((acc, p) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const completionRate = deptTasks.length > 0 ? (completedTasks / deptTasks.length) * 100 : 0;
    const tasksWithDueDate = deptTasks.filter(t => t.due_date);
    const onTimeTasks = tasksWithDueDate.filter(t => {
      if (t.status === 'done') return new Date(t.updated_at) <= new Date(t.due_date!);
      return new Date(t.due_date!) >= new Date();
    }).length;
    const onTimeRate = tasksWithDueDate.length > 0 ? (onTimeTasks / tasksWithDueDate.length) * 100 : 0;
    const budgetVariance = totalEstHours > 0 ? ((totalActHours - totalEstHours) / totalEstHours) * 100 : 0;

    return { dept, deptProjects, deptStaff, deptTasks, totalBudget, totalEstHours, totalActHours, completedTasks, overdueTasks, statusCounts, completionRate, onTimeRate, budgetVariance };
  });

  const grandTotalBudget = deptSummaries.reduce((s, d) => s + d.totalBudget, 0);
  const grandTotalStaff = staff.length;
  const grandTotalProjects = projects.length;

  const handlePrint = () => window.print();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto print:max-w-full print:shadow-none">
        <DialogHeader className="print:hidden">
          <DialogTitle>Department Summary Report</DialogTitle>
        </DialogHeader>

        <div id="project-report" className="space-y-6 print:p-0">
          {/* Letterhead */}
          <header className="border-b-2 border-primary pb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src="/lovable-uploads/8c92f756-dfe1-496d-8f40-b05da33fb433.png"
                  alt="Utu Wa Kiafrika Charity Network Logo"
                  className="h-16 w-auto print:h-20"
                />
                <div>
                  <h2 className="text-xl font-bold leading-tight">Utu Wa Kiafrika</h2>
                  <p className="text-sm text-muted-foreground">Charity Network</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    www.utuwakiafrika.org • info@utuafrika.org
                  </p>
                </div>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                <p className="font-semibold uppercase tracking-wide">Department Summary</p>
                <p className="mt-1">Generated {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </header>

          {/* Organization Totals */}
          <section>
            <h2 className="text-xl font-semibold mb-3">Organization Overview</h2>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="border rounded p-3 text-center">
                <p className="text-2xl font-bold">{departments.length}</p>
                <p className="text-muted-foreground">Departments</p>
              </div>
              <div className="border rounded p-3 text-center">
                <p className="text-2xl font-bold">{grandTotalStaff}</p>
                <p className="text-muted-foreground">Total Staff</p>
              </div>
              <div className="border rounded p-3 text-center">
                <p className="text-2xl font-bold">{grandTotalProjects}</p>
                <p className="text-muted-foreground">Total Projects</p>
              </div>
              <div className="border rounded p-3 text-center">
                <p className="text-2xl font-bold">${grandTotalBudget.toLocaleString()}</p>
                <p className="text-muted-foreground">Total Budget</p>
              </div>
            </div>
          </section>

          {/* Per-Department Breakdown */}
          {deptSummaries.map(({ dept, deptProjects, deptStaff, deptTasks, totalBudget, totalEstHours, totalActHours, completedTasks, overdueTasks, statusCounts }) => (
            <section key={dept.id} className="border rounded-lg p-4 break-inside-avoid">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color || '#3B82F6' }} />
                <h3 className="text-lg font-semibold">{dept.name}</h3>
                <span className="text-xs text-muted-foreground ml-auto capitalize">{dept.status}</span>
              </div>
              {dept.description && <p className="text-sm text-muted-foreground mb-3">{dept.description}</p>}

              <div className="grid grid-cols-3 gap-3 text-sm mb-3">
                <div><strong>Staff:</strong> {deptStaff.length}</div>
                <div><strong>Projects:</strong> {deptProjects.length}</div>
                <div><strong>Budget:</strong> ${totalBudget.toLocaleString()}</div>
                <div><strong>Est. Hours:</strong> {totalEstHours.toFixed(1)}</div>
                <div><strong>Actual Hours:</strong> {totalActHours.toFixed(1)}</div>
                <div><strong>Tasks:</strong> {completedTasks}/{deptTasks.length} done{overdueTasks > 0 && <span className="text-destructive ml-1">({overdueTasks} overdue)</span>}</div>
              </div>

              {/* Project statuses */}
              {Object.keys(statusCounts).length > 0 && (
                <div className="flex gap-2 flex-wrap text-xs mb-3">
                  {Object.entries(statusCounts).map(([status, count]) => (
                    <span key={status} className="px-2 py-0.5 rounded bg-muted capitalize">{status}: {count}</span>
                  ))}
                </div>
              )}

              {/* Staff workload table */}
              {deptStaff.length > 0 && (
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-1.5 px-2 text-left">Staff Member</th>
                      <th className="py-1.5 px-2 text-left">Position</th>
                      <th className="py-1.5 px-2 text-right">Assigned Tasks</th>
                      <th className="py-1.5 px-2 text-right">Est. Hours</th>
                      <th className="py-1.5 px-2 text-right">Actual Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deptStaff.map(s => {
                      const memberTasks = deptTasks.filter(t => t.assigned_to === s.id);
                      const est = memberTasks.reduce((sum, t) => sum + (Number(t.estimated_hours) || 0), 0);
                      const act = memberTasks.reduce((sum, t) => sum + (Number(t.actual_hours) || 0), 0);
                      return (
                        <tr key={s.id} className="border-b">
                          <td className="py-1.5 px-2">{s.first_name} {s.last_name}</td>
                          <td className="py-1.5 px-2">{s.position}</td>
                          <td className="py-1.5 px-2 text-right">{memberTasks.length}</td>
                          <td className="py-1.5 px-2 text-right">{est.toFixed(1)}</td>
                          <td className="py-1.5 px-2 text-right">{act.toFixed(1)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}

              {/* Projects list */}
              {deptProjects.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs font-semibold mb-1">Projects</p>
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="py-1.5 px-2 text-left">Title</th>
                        <th className="py-1.5 px-2 text-left">Status</th>
                        <th className="py-1.5 px-2 text-left">Priority</th>
                        <th className="py-1.5 px-2 text-right">Budget</th>
                        <th className="py-1.5 px-2 text-right">Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deptProjects.map(p => (
                        <tr key={p.id} className="border-b">
                          <td className="py-1.5 px-2">{p.title}</td>
                          <td className="py-1.5 px-2 capitalize">{p.status}</td>
                          <td className="py-1.5 px-2 capitalize">{p.priority}</td>
                          <td className="py-1.5 px-2 text-right">{p.budget ? `$${Number(p.budget).toLocaleString()}` : '—'}</td>
                          <td className="py-1.5 px-2 text-right">{p.progress || 0}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}

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

export default DepartmentReportDialog;
