import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ProjectTask, OrgProject, OrgStaff } from '@/hooks/useOrgManagement';

interface Props {
  tasks: ProjectTask[];
  projects: OrgProject[];
  staff: OrgStaff[];
  selectedProjectId: string | null;
}

const statusColors: Record<string, string> = {
  todo: '#9CA3AF',
  'in-progress': '#3B82F6',
  review: '#F59E0B',
  done: '#10B981',
};

const priorityBorder: Record<string, string> = {
  critical: '2px solid #EF4444',
  high: '2px solid #F97316',
  medium: '2px solid #3B82F6',
  low: '2px solid #9CA3AF',
};

const GanttTimeline = ({ tasks, projects, staff, selectedProjectId }: Props) => {
  const [filterProject, setFilterProject] = useState<string>(selectedProjectId || 'all');
  const [weekOffset, setWeekOffset] = useState(0);

  const filteredTasks = useMemo(() => {
    let t = tasks.filter(t => t.due_date || t.created_at);
    if (filterProject !== 'all') t = t.filter(tk => tk.project_id === filterProject);
    return t.sort((a, b) => {
      const da = a.due_date || a.created_at;
      const db = b.due_date || b.created_at;
      return da.localeCompare(db);
    });
  }, [tasks, filterProject]);

  // Generate 8-week window
  const { weeks, startDate, endDate } = useMemo(() => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(start.getDate() - start.getDay() + 1 + weekOffset * 7); // Monday
    const weeks: { label: string; start: Date; end: Date }[] = [];
    for (let i = 0; i < 8; i++) {
      const ws = new Date(start);
      ws.setDate(ws.getDate() + i * 7);
      const we = new Date(ws);
      we.setDate(we.getDate() + 6);
      weeks.push({
        label: `${ws.getMonth() + 1}/${ws.getDate()}`,
        start: ws,
        end: we,
      });
    }
    return { weeks, startDate: weeks[0].start, endDate: weeks[weeks.length - 1].end };
  }, [weekOffset]);

  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const today = new Date();
  const todayOffset = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  const getTaskPosition = (task: ProjectTask) => {
    const taskStart = task.created_at ? new Date(task.created_at) : new Date();
    const taskEnd = task.due_date ? new Date(task.due_date) : new Date(taskStart.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const startDay = Math.max(0, Math.ceil((taskStart.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
    const endDay = Math.min(totalDays, Math.ceil((taskEnd.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
    
    if (endDay < 0 || startDay > totalDays) return null;
    
    const left = (Math.max(0, startDay) / totalDays) * 100;
    const width = Math.max(2, ((Math.min(totalDays, endDay) - Math.max(0, startDay)) / totalDays) * 100);
    return { left, width };
  };

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" /> Timeline View
          </CardTitle>
          <CardDescription>Visual schedule of tasks across projects</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          {!selectedProjectId && (
            <Select value={filterProject} onValueChange={setFilterProject}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projects.map(p => (
                  <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Button variant="outline" size="icon" onClick={() => setWeekOffset(w => w - 4)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setWeekOffset(0)}>Today</Button>
          <Button variant="outline" size="icon" onClick={() => setWeekOffset(w => w + 4)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            {/* Week headers */}
            <div className="flex border-b pb-2 mb-2">
              <div className="w-[200px] shrink-0 text-sm font-medium text-muted-foreground">Task</div>
              <div className="flex-1 flex relative">
                {weeks.map((w, i) => (
                  <div key={i} className="flex-1 text-center text-xs text-muted-foreground border-l border-border/30">
                    {w.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Today indicator description */}
            {todayOffset >= 0 && todayOffset <= totalDays && (
              <div className="flex mb-1">
                <div className="w-[200px] shrink-0" />
                <div className="flex-1 relative h-0">
                  <div
                    className="absolute top-0 w-px h-[999px] bg-destructive/50 z-10"
                    style={{ left: `${(todayOffset / totalDays) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Task rows */}
            {filteredTasks.length > 0 ? (
              <div className="space-y-1">
                {filteredTasks.map(task => {
                  const pos = getTaskPosition(task);
                  const assignee = task.org_staff ? `${task.org_staff.first_name} ${task.org_staff.last_name[0]}.` : '';
                  const isOverdue = task.due_date && task.due_date < today.toISOString().split('T')[0] && task.status !== 'done';

                  return (
                    <div key={task.id} className="flex items-center group hover:bg-muted/30 rounded py-1">
                      <div className="w-[200px] shrink-0 pr-3">
                        <p className="text-sm font-medium truncate" title={task.title}>{task.title}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {task.org_projects?.title || ''} {assignee && `· ${assignee}`}
                        </p>
                      </div>
                      <div className="flex-1 relative h-8">
                        {/* Week grid lines */}
                        {weeks.map((_, i) => (
                          <div key={i} className="absolute top-0 bottom-0 border-l border-border/20" style={{ left: `${(i / weeks.length) * 100}%` }} />
                        ))}
                        {pos && (
                          <div
                            className="absolute top-1 h-6 rounded-md flex items-center px-2 text-xs text-white font-medium cursor-default transition-opacity group-hover:opacity-90"
                            style={{
                              left: `${pos.left}%`,
                              width: `${pos.width}%`,
                              minWidth: '20px',
                              backgroundColor: statusColors[task.status] || '#9CA3AF',
                              border: priorityBorder[task.priority] || 'none',
                              opacity: task.status === 'done' ? 0.6 : 1,
                            }}
                            title={`${task.title} — ${task.status} (${task.priority})\nDue: ${task.due_date || 'No date'}`}
                          >
                            <span className="truncate">{task.title}</span>
                          </div>
                        )}
                        {!pos && (
                          <div className="absolute inset-0 flex items-center">
                            <span className="text-xs text-muted-foreground italic">Outside range</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No tasks to display in this range.</p>
            )}

            {/* Legend */}
            <div className="flex items-center gap-4 mt-4 pt-4 border-t">
              {Object.entries(statusColors).map(([status, color]) => (
                <div key={status} className="flex items-center gap-1.5 text-xs">
                  <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: color }} />
                  <span className="capitalize">{status.replace('-', ' ')}</span>
                </div>
              ))}
              <div className="ml-4 flex items-center gap-1.5 text-xs text-destructive">
                <div className="w-px h-3 bg-destructive" />
                <span>Today</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GanttTimeline;
