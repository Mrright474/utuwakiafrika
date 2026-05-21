import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Users, MessageSquare, Mail, LogOut, Clock, User, Phone, MapPin, Settings, CheckCircle, XCircle, Calendar, Download, Globe, Briefcase, Building2, UserCog, FolderKanban, ListTodo, LayoutDashboard } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useAdminData } from '@/hooks/useAdminData';
import { useOrgManagement } from '@/hooks/useOrgManagement';
import { exportToCSV, exportColumns } from '@/utils/exportData';
import DepartmentsTab from '@/components/admin/DepartmentsTab';
import StaffTab from '@/components/admin/StaffTab';
import ProjectsTab from '@/components/admin/ProjectsTab';
import WorkplanTab from '@/components/admin/WorkplanTab';
import OrgOverviewTab from '@/components/admin/OrgOverviewTab';
import GanttTimeline from '@/components/admin/GanttTimeline';
import MfaSettings from '@/components/admin/MfaSettings';
import { Shield } from 'lucide-react';

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'new':
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'active':
    case 'approved':
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'rejected':
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800';
    case 'unsubscribed':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const NewAdmin = () => {
  const { user, isAdmin, loading, signOut } = useAdminAuth();
  const { 
    contactSubmissions, 
    newsletterSubscribers, 
    volunteerProfiles,
    volunteerHours,
    communityRegistrations,
    loading: dataLoading,
    updateContactStatus,
    updateVolunteerStatus,
    verifyVolunteerHours,
    deleteContactSubmission,
    updateCommunityRegistrationStatus,
    deleteCommunityRegistration
  } = useAdminData(isAdmin);
  const {
    departments, staff, projects, tasks,
    loading: orgLoading,
    saveDepartment, deleteDepartment,
    saveStaff, deleteStaff,
    saveProject, deleteProject,
    saveTask, deleteTask,
  } = useOrgManagement(isAdmin);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  if (!loading && (!user || !isAdmin)) {
    return <Navigate to="/admin/auth" replace />;
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-utu-red" />
        </div>
      </Layout>
    );
  }

  const handleSignOut = async () => {
    await signOut();
  };

  const pendingHours = volunteerHours.filter(h => !h.verified);
  const totalHoursLogged = volunteerHours.reduce((sum, h) => sum + Number(h.hours), 0);
  const verifiedHours = volunteerHours.filter(h => h.verified).reduce((sum, h) => sum + Number(h.hours), 0);

  const handleExportProfiles = () => {
    const today = new Date().toISOString().split('T')[0];
    exportToCSV(volunteerProfiles, exportColumns.volunteerProfiles, `volunteer-profiles-${today}`);
  };

  const handleExportHours = () => {
    const today = new Date().toISOString().split('T')[0];
    const hoursWithNames = volunteerHours.map(h => ({
      ...h,
      volunteer_name: `${h.volunteer_profiles?.first_name || ''} ${h.volunteer_profiles?.last_name || ''}`.trim()
    }));
    exportToCSV(hoursWithNames, exportColumns.volunteerHours, `volunteer-hours-${today}`);
  };

  return (
    <Layout>
      <div className="bg-utu-light-gray py-8 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-utu-black">Admin Dashboard</h1>
              <p className="text-utu-gray">Manage website content and user data</p>
            </div>
            <div className="flex gap-2">
              <Link to="/admin/content">
                <Button variant="outline" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Content Management
                </Button>
              </Link>
              <Button 
                onClick={handleSignOut}
                variant="outline" 
                className="flex items-center"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>

          {dataLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-utu-red" />
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); if (v !== 'workplan') setSelectedProjectId(null); }} className="w-full">
              <TabsList className="grid w-full grid-cols-10 mb-8">
                <TabsTrigger value="overview">
                  <LayoutDashboard className="mr-1 h-4 w-4" />
                  <span className="hidden lg:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="volunteers">
                  <Users className="mr-1 h-4 w-4" />
                  <span className="hidden lg:inline">Volunteers</span> ({volunteerProfiles.length})
                </TabsTrigger>
                <TabsTrigger value="hours">
                  <Clock className="mr-1 h-4 w-4" />
                  <span className="hidden lg:inline">Hours</span> ({pendingHours.length})
                </TabsTrigger>
                <TabsTrigger value="communities">
                  <Globe className="mr-1 h-4 w-4" />
                  <span className="hidden lg:inline">Communities</span>
                </TabsTrigger>
                <TabsTrigger value="contacts">
                  <MessageSquare className="mr-1 h-4 w-4" />
                  <span className="hidden lg:inline">Contacts</span>
                </TabsTrigger>
                <TabsTrigger value="newsletter">
                  <Mail className="mr-1 h-4 w-4" />
                  <span className="hidden lg:inline">Newsletter</span>
                </TabsTrigger>
                <TabsTrigger value="departments">
                  <Building2 className="mr-1 h-4 w-4" />
                  <span className="hidden lg:inline">Departments</span>
                </TabsTrigger>
                <TabsTrigger value="staff">
                  <UserCog className="mr-1 h-4 w-4" />
                  <span className="hidden lg:inline">Staff</span> ({staff.length})
                </TabsTrigger>
                <TabsTrigger value="projects">
                  <FolderKanban className="mr-1 h-4 w-4" />
                  <span className="hidden lg:inline">Projects</span> ({projects.length})
                </TabsTrigger>
                <TabsTrigger value="workplan">
                  <ListTodo className="mr-1 h-4 w-4" />
                  <span className="hidden lg:inline">Workplan</span> ({tasks.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="volunteers">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Volunteer Profiles</CardTitle>
                      <CardDescription>
                        Manage volunteer applications and profiles.
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleExportProfiles}>
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {volunteerProfiles.map((volunteer) => (
                        <div key={volunteer.id} className="border rounded-lg p-4 space-y-3">
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <h3 className="font-semibold text-lg">
                                {volunteer.first_name} {volunteer.last_name}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <User className="h-4 w-4" />
                                  {volunteer.volunteer_id || 'No ID assigned'}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Mail className="h-4 w-4" />
                                  {volunteer.email}
                                </div>
                                {volunteer.phone && (
                                  <div className="flex items-center gap-1">
                                    <Phone className="h-4 w-4" />
                                    {volunteer.phone}
                                  </div>
                                )}
                              </div>
                              {volunteer.city && volunteer.country && (
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <MapPin className="h-4 w-4" />
                                  {volunteer.city}, {volunteer.country}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(volunteer.status || 'pending')}>
                                {volunteer.status || 'pending'}
                              </Badge>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateVolunteerStatus(volunteer.id, 
                                    volunteer.status === 'pending' ? 'approved' : 'pending'
                                  )}
                                >
                                  {volunteer.status === 'pending' ? 'Approve' : 'Set Pending'}
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          {volunteer.skills && (
                            <div>
                              <span className="font-medium text-sm">Skills: </span>
                              <span className="text-sm">{volunteer.skills}</span>
                            </div>
                          )}
                          
                          {volunteer.experience && (
                            <div>
                              <span className="font-medium text-sm">Experience: </span>
                              <span className="text-sm">{volunteer.experience}</span>
                            </div>
                          )}
                          
                          <div className="text-xs text-muted-foreground">
                            Applied: {formatDate(volunteer.created_at)}
                          </div>
                        </div>
                      ))}
                      
                      {volunteerProfiles.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          No volunteer applications yet.
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="hours">
                <div className="grid gap-4 md:grid-cols-3 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Hours Logged</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{totalHoursLogged.toFixed(1)}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Verified Hours</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">{verifiedHours.toFixed(1)}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Pending Verification</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-yellow-600">{pendingHours.length}</div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Volunteer Hours</CardTitle>
                      <CardDescription>
                        Review and verify volunteer hours submissions.
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleExportHours}>
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {volunteerHours.map((hours) => (
                        <div key={hours.id} className="border rounded-lg p-4 space-y-3">
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <h3 className="font-semibold">
                                {hours.volunteer_profiles?.first_name} {hours.volunteer_profiles?.last_name}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {formatDate(hours.activity_date)}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {hours.hours} hours
                                </div>
                                <Badge variant="outline">{hours.activity_type}</Badge>
                              </div>
                              {hours.location && (
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <MapPin className="h-4 w-4" />
                                  {hours.location}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              {hours.verified ? (
                                <Badge className="bg-green-100 text-green-800">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              ) : (
                                <Badge className="bg-yellow-100 text-yellow-800">
                                  <Clock className="h-3 w-3 mr-1" />
                                  Pending
                                </Badge>
                              )}
                              <Button
                                size="sm"
                                variant={hours.verified ? "outline" : "default"}
                                onClick={() => verifyVolunteerHours(hours.id, !hours.verified)}
                              >
                                {hours.verified ? (
                                  <>
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Unverify
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Verify
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                          
                          {hours.description && (
                            <div>
                              <span className="font-medium text-sm">Description: </span>
                              <span className="text-sm">{hours.description}</span>
                            </div>
                          )}
                          
                          <div className="text-xs text-muted-foreground">
                            Submitted: {formatDate(hours.created_at)}
                          </div>
                        </div>
                      ))}
                      
                      {volunteerHours.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          No volunteer hours logged yet.
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contacts">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Submissions</CardTitle>
                    <CardDescription>
                      Review and respond to contact form submissions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {contactSubmissions.map((contact) => (
                        <div key={contact.id} className="border rounded-lg p-4 space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{contact.name}</h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Mail className="h-4 w-4" />
                                  {contact.email}
                                </div>
                                {contact.phone && (
                                  <div className="flex items-center gap-1">
                                    <Phone className="h-4 w-4" />
                                    {contact.phone}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(contact.status)}>
                                {contact.status}
                              </Badge>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateContactStatus(contact.id, 
                                    contact.status === 'new' ? 'in_progress' : 'completed'
                                  )}
                                >
                                  {contact.status === 'new' ? 'Mark In Progress' : 'Complete'}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => deleteContactSubmission(contact.id)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          {contact.subject && (
                            <div>
                              <span className="font-medium text-sm">Subject: </span>
                              <span className="text-sm">{contact.subject}</span>
                            </div>
                          )}
                          
                          <div>
                            <span className="font-medium text-sm">Message:</span>
                            <p className="text-sm mt-1 p-2 bg-muted rounded">{contact.message}</p>
                          </div>
                          
                          <div className="text-xs text-muted-foreground">
                            Submitted: {formatDate(contact.created_at)}
                          </div>
                        </div>
                      ))}
                      
                      {contactSubmissions.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          No contact submissions yet.
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="communities">
                <Card>
                  <CardHeader>
                    <CardTitle>Community Chapter Registrations</CardTitle>
                    <CardDescription>
                      Manage requests to join or start Ubuntu Community chapters.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {communityRegistrations.map((reg) => (
                        <div key={reg.id} className="border rounded-lg p-4 space-y-3">
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <h3 className="font-semibold text-lg">{reg.full_name}</h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                                <div className="flex items-center gap-1">
                                  <Mail className="h-4 w-4" />
                                  {reg.email}
                                </div>
                                {reg.phone && (
                                  <div className="flex items-center gap-1">
                                    <Phone className="h-4 w-4" />
                                    {reg.phone}
                                  </div>
                                )}
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {reg.city}, {reg.country}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">
                                  {reg.registration_type === 'start' ? 'Wants to start a chapter' : 'Wants to join'}
                                </Badge>
                                {reg.business_type && (
                                  <Badge variant="secondary" className="flex items-center gap-1">
                                    <Briefcase className="h-3 w-3" />
                                    {reg.business_type}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(reg.status)}>
                                {reg.status}
                              </Badge>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateCommunityRegistrationStatus(reg.id, 
                                    reg.status === 'pending' ? 'approved' : 'pending'
                                  )}
                                >
                                  {reg.status === 'pending' ? 'Approve' : 'Set Pending'}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => deleteCommunityRegistration(reg.id)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                          {reg.message && (
                            <div>
                              <span className="font-medium text-sm">Message:</span>
                              <p className="text-sm mt-1 p-2 bg-muted rounded">{reg.message}</p>
                            </div>
                          )}
                          <div className="text-xs text-muted-foreground">
                            Submitted: {formatDate(reg.created_at)}
                          </div>
                        </div>
                      ))}
                      {communityRegistrations.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          No community registrations yet.
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="newsletter">
                <Card>
                  <CardHeader>
                    <CardTitle>Newsletter Subscribers</CardTitle>
                    <CardDescription>
                      View and manage newsletter subscriptions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {newsletterSubscribers.map((subscriber) => (
                        <div key={subscriber.id} className="border rounded-lg p-4 flex justify-between items-center">
                          <div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{subscriber.email}</span>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              Subscribed: {formatDate(subscriber.subscribed_at)}
                              {subscriber.unsubscribed_at && (
                                <span className="ml-2">
                                  • Unsubscribed: {formatDate(subscriber.unsubscribed_at)}
                                </span>
                              )}
                            </div>
                          </div>
                          <Badge className={getStatusColor(subscriber.status)}>
                            {subscriber.status}
                          </Badge>
                        </div>
                      ))}
                      {newsletterSubscribers.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          No newsletter subscribers yet.
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="departments">
                <DepartmentsTab departments={departments} staff={staff} onSave={saveDepartment} onDelete={deleteDepartment} />
              </TabsContent>

              <TabsContent value="staff">
                <StaffTab staff={staff} departments={departments} onSave={saveStaff} onDelete={deleteStaff} />
              </TabsContent>

              <TabsContent value="projects">
                <ProjectsTab
                  projects={projects}
                  departments={departments}
                  staff={staff}
                  tasks={tasks}
                  onSave={saveProject}
                  onDelete={deleteProject}
                  onSelectProject={(id) => { setSelectedProjectId(id); setActiveTab('workplan'); }}
                />
              </TabsContent>

              <TabsContent value="workplan">
                <WorkplanTab
                  tasks={tasks}
                  projects={projects}
                  staff={staff}
                  selectedProjectId={selectedProjectId}
                  onSave={saveTask}
                  onDelete={deleteTask}
                  onBack={() => { setSelectedProjectId(null); setActiveTab('projects'); }}
                />
                <GanttTimeline
                  tasks={tasks}
                  projects={projects}
                  staff={staff}
                  selectedProjectId={selectedProjectId}
                />
              </TabsContent>

              <TabsContent value="overview">
                <OrgOverviewTab
                  departments={departments}
                  staff={staff}
                  projects={projects}
                  tasks={tasks}
                />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default NewAdmin;