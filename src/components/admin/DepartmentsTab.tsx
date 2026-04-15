import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Plus, Edit2, Trash2, Building2, Users } from 'lucide-react';
import type { OrgDepartment, OrgStaff } from '@/hooks/useOrgManagement';

interface Props {
  departments: OrgDepartment[];
  staff: OrgStaff[];
  onSave: (dept: any) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
}

const emptyDept = { name: '', description: '', status: 'active', color: '#3B82F6', head_staff_id: '' };

const DepartmentsTab = ({ departments, staff, onSave, onDelete }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<any>(emptyDept);
  const [editing, setEditing] = useState(false);

  const openAdd = () => { setForm({ ...emptyDept }); setEditing(false); setDialogOpen(true); };
  const openEdit = (d: OrgDepartment) => { setForm({ ...d, head_staff_id: d.head_staff_id || '' }); setEditing(true); setDialogOpen(true); };

  const handleSave = async () => {
    const data = { ...form, head_staff_id: form.head_staff_id || null };
    const ok = await onSave(data);
    if (ok) setDialogOpen(false);
  };

  const getHeadName = (id: string | null) => {
    if (!id) return 'Not assigned';
    const s = staff.find(s => s.id === id);
    return s ? `${s.first_name} ${s.last_name}` : 'Unknown';
  };

  const staffInDept = (deptId: string) => staff.filter(s => s.department_id === deptId && s.status === 'active').length;

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2"><Building2 className="h-5 w-5" /> Departments</CardTitle>
            <CardDescription>Manage organizational departments and their leadership.</CardDescription>
          </div>
          <Button onClick={openAdd} size="sm"><Plus className="h-4 w-4 mr-1" /> Add Department</Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {departments.map(d => (
              <div key={d.id} className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color || '#3B82F6' }} />
                    <h3 className="font-semibold">{d.name}</h3>
                  </div>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => openEdit(d)}><Edit2 className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => onDelete(d.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                </div>
                {d.description && <p className="text-sm text-muted-foreground">{d.description}</p>}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Head: {getHeadName(d.head_staff_id)}</span>
                  <Badge variant="outline" className="flex items-center gap-1"><Users className="h-3 w-3" /> {staffInDept(d.id)} staff</Badge>
                </div>
                <Badge className={d.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>{d.status}</Badge>
              </div>
            ))}
            {departments.length === 0 && <p className="text-muted-foreground col-span-full text-center py-8">No departments yet. Add your first one.</p>}
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? 'Edit Department' : 'Add Department'}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div><Label>Name *</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Programs Department" /></div>
            <div><Label>Description</Label><Textarea value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Department purpose and responsibilities" /></div>
            <div><Label>Department Head</Label>
              <Select value={form.head_staff_id} onValueChange={v => setForm({ ...form, head_staff_id: v })}>
                <SelectTrigger><SelectValue placeholder="Select staff member" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {staff.map(s => <SelectItem key={s.id} value={s.id}>{s.first_name} {s.last_name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-4">
              <div className="flex-1"><Label>Color</Label><Input type="color" value={form.color || '#3B82F6'} onChange={e => setForm({ ...form, color: e.target.value })} /></div>
              <div className="flex-1"><Label>Status</Label>
                <Select value={form.status} onValueChange={v => setForm({ ...form, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={!form.name}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DepartmentsTab;
