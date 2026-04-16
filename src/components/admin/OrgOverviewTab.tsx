import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, FolderKanban, AlertTriangle, Building2, CheckCircle2, Clock, TrendingUp } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import type { OrgDepartment, OrgStaff, OrgProject, ProjectTask } from '@/hooks/useOrgManagement';

interface Props {
  departments: OrgDepartment[];
  staff: OrgStaff[];
  projects: OrgProject[];
  tasks: ProjectTask[];
}

const COLORS = ['#E53E3E', '#DD6B20', '#D69E2E', '#38A169', '#3182CE', '#805AD5', '#D53F8C', '#319795'];

const OrgOverviewTab = ({ departments, staff, projects, tasks }: Props) => {
  const activeStaff = staff.filter(s => s.status === 'active');
  const activeProjects = projects.filter(p => ['active', 'in-progress'].includes(p.status));
  const today = new Date().toISOString().split('T')[0];
  const overdueTasks = tasks.filter(t => t.due_date && t.due_date < today && t.status !== 'done');
  const completedTasks = tasks.filter(t => t.status === 'done');

  const deptDistribution = useMemo(() => {
    const counts: Record<string, { name: string; staff: number; projects: number; color: string }> = {};
    departments.forEach(d => {
      counts[d.id] = { name: d.name, staff: 0, projects: 0, color: d.color || '#3B82F6' };
    });
    staff.forEach(s => {
      if (s.department_id && counts[s.department_id]) counts[s.department_id].staff++;
    });
    projects.forEach(p => {
      if (p.department_id && counts[p.department_id]) counts[p.department_id].projects++;
    });
    return Object.values(counts);
  }, [departments, staff, projects]);

  const projectStatusData = useMemo(() => {
    const map: Record<string, number> = {};
    projects.forEach(p => { map[p.status] = (map[p.status] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [projects]);

  const taskStatusData = useMemo(() => {
    const map: Record<string, number> = {};
    tasks.forEach(t => { map[t.status] = (map[t.status] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [tasks]);

  const chartConfig = {
    staff: { label: 'Staff', color: '#E53E3E' },
    projects: { label: 'Projects', color: '#3182CE' },
    value: { label: 'Count' },
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeStaff.length}</div>
            <p className="text-xs text-muted-foreground">{staff.length - activeStaff.length} inactive</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjects.length}</div>
            <p className="text-xs text-muted-foreground">{projects.length} total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{overdueTasks.length}</div>
            <p className="text-xs text-muted-foreground">{tasks.length} total tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedTasks.length}</div>
            <p className="text-xs text-muted-foreground">
              {tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0}% completion
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Department Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Building2 className="h-5 w-5" /> Department Distribution</CardTitle>
            <CardDescription>Staff and projects per department</CardDescription>
          </CardHeader>
          <CardContent>
            {deptDistribution.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-[280px]">
                <BarChart data={deptDistribution} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="staff" fill="var(--color-staff)" radius={[0, 4, 4, 0]} name="Staff" />
                  <Bar dataKey="projects" fill="var(--color-projects)" radius={[0, 4, 4, 0]} name="Projects" />
                </BarChart>
              </ChartContainer>
            ) : (
              <p className="text-center text-muted-foreground py-8">No departments yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Project Status Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5" /> Project Status</CardTitle>
            <CardDescription>Breakdown by current status</CardDescription>
          </CardHeader>
          <CardContent>
            {projectStatusData.length > 0 ? (
              <div className="flex items-center gap-6">
                <ChartContainer config={chartConfig} className="h-[240px] w-[240px]">
                  <PieChart>
                    <Pie data={projectStatusData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, value }) => `${name} (${value})`}>
                      {projectStatusData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
                <div className="space-y-2">
                  {projectStatusData.map((d, i) => (
                    <div key={d.name} className="flex items-center gap-2 text-sm">
                      <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="capitalize">{d.name}</span>
                      <span className="font-bold">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No projects yet.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Overdue Tasks List */}
      {overdueTasks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" /> Overdue Tasks
            </CardTitle>
            <CardDescription>Tasks past their due date that are not completed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {overdueTasks.map(t => (
                <div key={t.id} className="flex items-center justify-between border rounded-lg p-3">
                  <div>
                    <p className="font-medium">{t.title}</p>
                    <p className="text-sm text-muted-foreground">{t.org_projects?.title || 'Unknown project'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive">Due: {t.due_date}</Badge>
                    <Badge className="bg-gray-100 text-gray-800 capitalize">{t.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrgOverviewTab;
