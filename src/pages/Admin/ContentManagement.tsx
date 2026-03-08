import React, { useState, useMemo, useCallback } from 'react';
import { Navigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Users, FileText, MessageSquare, BarChart, Plus, Edit, Trash2, LogOut, ArrowLeft, Star, Image as ImageIcon, Images, EyeOff, Eye, CheckSquare, Square, Filter, Search, X, Sparkles, Calendar, ClipboardList } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useTeamManagement, TeamMember } from '@/hooks/useTeamManagement';
import { useProgramsManagement } from '@/hooks/useProgramsManagement';
import { useTestimonialsManagement } from '@/hooks/useTestimonialsManagement';
import { useMetricsManagement } from '@/hooks/useMetricsManagement';
import { useSuccessStoriesManagement } from '@/hooks/useSuccessStoriesManagement';
import { useGalleryManagement } from '@/hooks/useGalleryManagement';
import { useEventsManagement } from '@/hooks/useEventsManagement';
import { useEventRegistrations } from '@/hooks/useEventRegistrations';
import ImageUpload from '@/components/home/ImageUpload';
import BatchImageUpload from '@/components/home/BatchImageUpload';
import SortableTeamList from '@/components/admin/SortableTeamList';
import SortableContentList, { ProgramContent, TestimonialContent, MetricContent, StoryContent, GalleryContent } from '@/components/admin/SortableContentList';
import BulkActionBar from '@/components/admin/BulkActionBar';
import ExportButton from '@/components/admin/ExportButton';
import { ImportButton } from '@/components/admin/ImportButton';
import { exportColumns } from '@/utils/exportData';
import { toast } from 'sonner';
import ImageGenerator from './ImageGenerator';

type StatusFilter = 'all' | 'active' | 'inactive';

const ContentManagement = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAdminAuth();
  const [activeTab, setActiveTab] = useState('team');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Status filter state for each tab
  const [teamFilter, setTeamFilter] = useState<StatusFilter>('all');
  const [programsFilter, setProgramsFilter] = useState<StatusFilter>('all');
  const [testimonialsFilter, setTestimonialsFilter] = useState<StatusFilter>('all');
  const [metricsFilter, setMetricsFilter] = useState<StatusFilter>('all');
  const [storiesFilter, setStoriesFilter] = useState<StatusFilter>('all');
  const [galleryFilter, setGalleryFilter] = useState<StatusFilter>('all');

  // Search state for each tab
  const [teamSearch, setTeamSearch] = useState('');
  const [programsSearch, setProgramsSearch] = useState('');
  const [testimonialsSearch, setTestimonialsSearch] = useState('');
  const [metricsSearch, setMetricsSearch] = useState('');
  const [storiesSearch, setStoriesSearch] = useState('');
  const [gallerySearch, setGallerySearch] = useState('');

  // Bulk selection state
  const [selectedPrograms, setSelectedPrograms] = useState<Set<string>>(new Set());
  const [selectedTestimonials, setSelectedTestimonials] = useState<Set<string>>(new Set());
  const [selectedMetrics, setSelectedMetrics] = useState<Set<string>>(new Set());
  const [selectedStories, setSelectedStories] = useState<Set<string>>(new Set());
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());

  // Management hooks
  const { teamMembers, loading: teamLoading, addTeamMember, updateTeamMember, deleteTeamMember, reorderTeamMembers, toggleTeamMemberActive } = useTeamManagement();
  const { programs, loading: programsLoading, addProgram, updateProgram, deleteProgram, toggleProgramActive, bulkToggleProgramsActive, bulkDeletePrograms, reorderPrograms } = useProgramsManagement();
  const { testimonials, loading: testimonialsLoading, addTestimonial, updateTestimonial, deleteTestimonial, toggleTestimonialActive, bulkToggleTestimonialsActive, bulkDeleteTestimonials, reorderTestimonials } = useTestimonialsManagement();
  const { metrics, loading: metricsLoading, addMetric, updateMetric, deleteMetric, toggleMetricActive, bulkToggleMetricsActive, bulkDeleteMetrics, reorderMetrics } = useMetricsManagement();
  const { stories, loading: storiesLoading, addStory, updateStory, deleteStory, toggleStoryActive, bulkToggleStoriesActive, bulkDeleteStories, reorderStories } = useSuccessStoriesManagement();
  const { images, loading: galleryLoading, addImage, batchAddImages, isBatchUploading, updateImage, deleteImage, toggleImageActive, bulkToggleImagesActive, bulkDeleteImages, reorderImages } = useGalleryManagement();
  const { events: eventsList, loading: eventsLoading, addEvent, updateEvent, deleteEvent, toggleEventActive } = useEventsManagement();
  const { registrations, loading: registrationsLoading, updateRegistrationStatus, deleteRegistration } = useEventRegistrations();
  const [batchDialogOpen, setBatchDialogOpen] = useState(false);
  const [batchCategory, setBatchCategory] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; type: string; name: string } | null>(null);

  // Filter helper function
  const filterByStatus = <T extends { active?: boolean }>(items: T[], filter: StatusFilter): T[] => {
    if (filter === 'all') return items;
    if (filter === 'active') return items.filter(item => item.active !== false);
    return items.filter(item => item.active === false);
  };

  // Filtered and searched data
  const filteredTeamMembers = useMemo(() => {
    let items = filterByStatus(teamMembers, teamFilter);
    if (teamSearch.trim()) {
      const search = teamSearch.toLowerCase();
      items = items.filter(m => 
        m.name.toLowerCase().includes(search) || 
        m.position.toLowerCase().includes(search) || 
        m.role.toLowerCase().includes(search)
      );
    }
    return items;
  }, [teamMembers, teamFilter, teamSearch]);

  const filteredPrograms = useMemo(() => {
    let items = filterByStatus(programs, programsFilter);
    if (programsSearch.trim()) {
      const search = programsSearch.toLowerCase();
      items = items.filter(p => 
        p.title.toLowerCase().includes(search) || 
        p.description.toLowerCase().includes(search) ||
        (p.category?.toLowerCase().includes(search) ?? false)
      );
    }
    return items;
  }, [programs, programsFilter, programsSearch]);

  const filteredTestimonials = useMemo(() => {
    let items = filterByStatus(testimonials, testimonialsFilter);
    if (testimonialsSearch.trim()) {
      const search = testimonialsSearch.toLowerCase();
      items = items.filter(t => 
        t.name.toLowerCase().includes(search) || 
        t.quote.toLowerCase().includes(search) ||
        (t.role?.toLowerCase().includes(search) ?? false)
      );
    }
    return items;
  }, [testimonials, testimonialsFilter, testimonialsSearch]);

  const filteredMetrics = useMemo(() => {
    let items = filterByStatus(metrics, metricsFilter);
    if (metricsSearch.trim()) {
      const search = metricsSearch.toLowerCase();
      items = items.filter(m => 
        m.metric_name.toLowerCase().includes(search) || 
        m.metric_value.toLowerCase().includes(search) ||
        (m.category?.toLowerCase().includes(search) ?? false)
      );
    }
    return items;
  }, [metrics, metricsFilter, metricsSearch]);

  const filteredStories = useMemo(() => {
    let items = filterByStatus(stories, storiesFilter);
    if (storiesSearch.trim()) {
      const search = storiesSearch.toLowerCase();
      items = items.filter(s => 
        s.title.toLowerCase().includes(search) || 
        s.description.toLowerCase().includes(search) ||
        (s.category?.toLowerCase().includes(search) ?? false)
      );
    }
    return items;
  }, [stories, storiesFilter, storiesSearch]);

  const filteredImages = useMemo(() => {
    let items = filterByStatus(images, galleryFilter);
    if (gallerySearch.trim()) {
      const search = gallerySearch.toLowerCase();
      items = items.filter(i => 
        i.title.toLowerCase().includes(search) || 
        (i.description?.toLowerCase().includes(search) ?? false) ||
        (i.category?.toLowerCase().includes(search) ?? false)
      );
    }
    return items;
  }, [images, galleryFilter, gallerySearch]);

  // Bulk selection helpers
  const toggleSelection = (id: string, selected: Set<string>, setSelected: React.Dispatch<React.SetStateAction<Set<string>>>) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelected(newSelected);
  };

  const selectAll = (items: any[], selected: Set<string>, setSelected: React.Dispatch<React.SetStateAction<Set<string>>>) => {
    if (selected.size === items.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(items.map(item => item.id)));
    }
  };

  const handleBulkActivate = async (type: string, ids: Set<string>, active: boolean) => {
    const idArray = Array.from(ids);
    if (idArray.length === 0) return;
    
    try {
      if (type === 'programs') {
        await bulkToggleProgramsActive(idArray, active);
        setSelectedPrograms(new Set());
      } else if (type === 'testimonials') {
        await bulkToggleTestimonialsActive(idArray, active);
        setSelectedTestimonials(new Set());
      } else if (type === 'metrics') {
        await bulkToggleMetricsActive(idArray, active);
        setSelectedMetrics(new Set());
      } else if (type === 'stories') {
        await bulkToggleStoriesActive(idArray, active);
        setSelectedStories(new Set());
      } else if (type === 'gallery') {
        await bulkToggleImagesActive(idArray, active);
        setSelectedImages(new Set());
      }
    } catch (error) {
      console.error('Bulk action failed:', error);
    }
  };

  const handleBulkDelete = async (type: string, ids: Set<string>) => {
    const idArray = Array.from(ids);
    if (idArray.length === 0) return;
    
    if (!confirm(`Are you sure you want to permanently delete ${idArray.length} item(s)? This cannot be undone.`)) return;
    
    try {
      if (type === 'programs') {
        await bulkDeletePrograms(idArray);
        setSelectedPrograms(new Set());
      } else if (type === 'testimonials') {
        await bulkDeleteTestimonials(idArray);
        setSelectedTestimonials(new Set());
      } else if (type === 'metrics') {
        await bulkDeleteMetrics(idArray);
        setSelectedMetrics(new Set());
      } else if (type === 'stories') {
        await bulkDeleteStories(idArray);
        setSelectedStories(new Set());
      } else if (type === 'gallery') {
        await bulkDeleteImages(idArray);
        setSelectedImages(new Set());
      }
    } catch (error) {
      console.error('Bulk delete failed:', error);
    }
  };

  if (!authLoading && (!user || !isAdmin)) {
    return <Navigate to="/admin/auth" replace />;
  }

  if (authLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-utu-red" />
        </div>
      </Layout>
    );
  }

  const handleAdd = (type: string) => {
    setDialogMode('add');
    setActiveTab(type);
    
    // Initialize empty object based on type
    if (type === 'team') {
      setEditingItem({ name: '', position: '', role: '', bio: '', image: '' });
    } else if (type === 'programs') {
      setEditingItem({ title: '', description: '', category: '', icon: '', image: '' });
    } else if (type === 'testimonials') {
      setEditingItem({ name: '', role: '', quote: '', image_url: '' });
    } else if (type === 'metrics') {
      setEditingItem({ metric_name: '', metric_value: '', category: '', icon: '' });
    } else if (type === 'stories') {
      setEditingItem({ title: '', description: '', category: '', image_url: '' });
    } else if (type === 'gallery') {
      setEditingItem({ title: '', description: '', category: '', image_url: '' });
    } else if (type === 'events') {
      setEditingItem({ title: '', description: '', event_date: '', event_time: '', location: '', attendees: '', category: 'upcoming', impact: '', image_url: '' });
    }
    
    setSelectedFile(null);
    setImagePreview('');
    setDialogOpen(true);
  };

  const handleEdit = (item: any, type: string) => {
    setDialogMode('edit');
    setEditingItem(item);
    setSelectedFile(null);
    setImagePreview(item.image || item.image_url || '');
    setActiveTab(type);
    setDialogOpen(true);
  };

  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      if (activeTab === 'team') {
        if (dialogMode === 'add') {
          const { id, ...data } = editingItem;
          await addTeamMember(data, selectedFile || undefined);
        } else {
          await updateTeamMember(editingItem, selectedFile || undefined);
        }
      } else if (activeTab === 'programs') {
        if (dialogMode === 'add') {
          const { id, ...data } = editingItem;
          await addProgram(data, selectedFile || undefined);
        } else {
          await updateProgram(editingItem, selectedFile || undefined);
        }
      } else if (activeTab === 'testimonials') {
        if (dialogMode === 'add') {
          const { id, ...data } = editingItem;
          await addTestimonial(data, selectedFile || undefined);
        } else {
          await updateTestimonial(editingItem, selectedFile || undefined);
        }
      } else if (activeTab === 'metrics') {
        if (dialogMode === 'add') {
          const { id, ...data } = editingItem;
          await addMetric(data);
        } else {
          await updateMetric(editingItem);
        }
      } else if (activeTab === 'stories') {
        if (dialogMode === 'add') {
          const { id, image_url, ...data } = editingItem;
          await addStory({ story: { ...data, image_url: '', display_order: 0, active: true }, imageFile: selectedFile });
        } else {
          await updateStory({ story: editingItem, imageFile: selectedFile });
        }
      } else if (activeTab === 'gallery') {
        if (dialogMode === 'add') {
          const { id, image_url, ...data } = editingItem;
          if (!selectedFile) {
            throw new Error('Image is required for gallery items');
          }
          await addImage({ image: { ...data, display_order: 0, active: true }, imageFile: selectedFile });
        } else {
          await updateImage({ image: editingItem, imageFile: selectedFile });
        }
      } else if (activeTab === 'events') {
        if (dialogMode === 'add') {
          const { id, ...data } = editingItem;
          await addEvent(data, selectedFile);
        } else {
          await updateEvent(editingItem, selectedFile);
        }
      }
      setDialogOpen(false);
      setEditingItem(null);
      setSelectedFile(null);
      setImagePreview('');
    } catch (error) {
      console.error('Error saving:', error);
    }
  };

  const handleDelete = async (id: string, type: string) => {
    if (type === 'team') {
      const member = teamMembers.find((m: any) => m.id === id);
      setDeleteConfirm({ id, type, name: member?.name || 'this team member' });
      return;
    }
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      if (type === 'programs') await deleteProgram(id);
      else if (type === 'testimonials') await deleteTestimonial(id);
      else if (type === 'metrics') await deleteMetric(id);
      else if (type === 'stories') {
        const story = stories.find((s: any) => s.id === id);
        if (story) await deleteStory(story);
      } else if (type === 'gallery') {
        const image = images.find((i: any) => i.id === id);
        if (image) await deleteImage(image);
      } else if (type === 'events') {
        await deleteEvent(id);
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const confirmDeleteTeamMember = async () => {
    if (!deleteConfirm) return;
    try {
      await deleteTeamMember(deleteConfirm.id);
    } catch (error) {
      console.error('Error deleting team member:', error);
    } finally {
      setDeleteConfirm(null);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEditingItem((prev: any) => ({ ...prev, [field]: value }));
  };

  // Import handlers
  const handleImportTeam = async (data: Record<string, string>[]) => {
    let successCount = 0;
    for (const row of data) {
      try {
        await addTeamMember({
          name: row.name,
          position: row.position,
          role: row.role,
          bio: row.bio,
          image: '',
        });
        successCount++;
      } catch (error) {
        console.error('Failed to import team member:', row, error);
      }
    }
    toast.success(`Imported ${successCount} of ${data.length} team members`);
  };

  const handleImportPrograms = async (data: Record<string, string>[]) => {
    let successCount = 0;
    for (const row of data) {
      try {
        await addProgram({
          title: row.title,
          description: row.description,
          category: row.category || '',
          icon: row.icon || '',
          color: '',
          image: '',
        });
        successCount++;
      } catch (error) {
        console.error('Failed to import program:', row, error);
      }
    }
    toast.success(`Imported ${successCount} of ${data.length} programs`);
  };

  const handleImportTestimonials = async (data: Record<string, string>[]) => {
    let successCount = 0;
    for (const row of data) {
      try {
        await addTestimonial({
          name: row.name,
          role: row.role || '',
          quote: row.quote,
          image_url: '',
        });
        successCount++;
      } catch (error) {
        console.error('Failed to import testimonial:', row, error);
      }
    }
    toast.success(`Imported ${successCount} of ${data.length} testimonials`);
  };

  const handleImportMetrics = async (data: Record<string, string>[]) => {
    let successCount = 0;
    for (const row of data) {
      try {
        await addMetric({
          metric_name: row.metric_name,
          metric_value: row.metric_value,
          category: row.category || '',
          icon: row.icon || '',
        });
        successCount++;
      } catch (error) {
        console.error('Failed to import metric:', row, error);
      }
    }
    toast.success(`Imported ${successCount} of ${data.length} metrics`);
  };

  const handleImportStories = async (data: Record<string, string>[]) => {
    let successCount = 0;
    for (const row of data) {
      try {
        await addStory({
          story: {
            title: row.title,
            description: row.description,
            category: row.category || '',
            image_url: '',
            display_order: 0,
            active: true,
          },
          imageFile: null,
        });
        successCount++;
      } catch (error) {
        console.error('Failed to import story:', row, error);
      }
    }
    toast.success(`Imported ${successCount} of ${data.length} stories`);
  };

  const handleImportGallery = async (data: Record<string, string>[]) => {
    toast.info('Gallery import requires images. Use batch upload instead.');
  };

  return (
    <Layout>
      <div className="bg-utu-light-gray py-8 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link to="/admin">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-utu-black">Content Management</h1>
                <p className="text-utu-gray">Manage website content and data</p>
              </div>
            </div>
            <Button 
              onClick={() => signOut()}
              variant="outline" 
              className="flex items-center"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 lg:grid-cols-9 mb-8">
              <TabsTrigger value="team">
                <Users className="mr-2 h-4 w-4" />
                Team ({teamMembers.length})
              </TabsTrigger>
              <TabsTrigger value="programs">
                <FileText className="mr-2 h-4 w-4" />
                Programs ({programs.length})
              </TabsTrigger>
              <TabsTrigger value="events">
                <Calendar className="mr-2 h-4 w-4" />
                Events ({eventsList.length})
              </TabsTrigger>
              <TabsTrigger value="registrations">
                <ClipboardList className="mr-2 h-4 w-4" />
                Registrations ({registrations.length})
              </TabsTrigger>
              <TabsTrigger value="testimonials">
                <MessageSquare className="mr-2 h-4 w-4" />
                Testimonials ({testimonials.length})
              </TabsTrigger>
              <TabsTrigger value="metrics">
                <BarChart className="mr-2 h-4 w-4" />
                Metrics ({metrics.length})
              </TabsTrigger>
              <TabsTrigger value="stories">
                <Star className="mr-2 h-4 w-4" />
                Stories ({stories.length})
              </TabsTrigger>
              <TabsTrigger value="gallery">
                <ImageIcon className="mr-2 h-4 w-4" />
                Gallery ({images.length})
              </TabsTrigger>
              <TabsTrigger value="image-generator">
                <Sparkles className="mr-2 h-4 w-4" />
                AI Images
              </TabsTrigger>
            </TabsList>

            {/* Team Members Tab */}
            <TabsContent value="team">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Team Members</CardTitle>
                      <CardDescription>Manage your organization's team members. Drag to reorder.</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <ImportButton dataType="team" onImport={handleImportTeam} />
                      <ExportButton
                        data={filteredTeamMembers}
                        columns={exportColumns.team}
                        filename={`team-members-${new Date().toISOString().split('T')[0]}`}
                      />
                      <Button onClick={() => handleAdd('team')}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Member
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {teamLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                        <div className="relative flex-1 max-w-sm">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search team members..."
                            value={teamSearch}
                            onChange={(e) => setTeamSearch(e.target.value)}
                            className="pl-9 pr-9"
                          />
                          {teamSearch && (
                            <button onClick={() => setTeamSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                            </button>
                          )}
                        </div>
                        <Select value={teamFilter} onValueChange={(v) => setTeamFilter(v as StatusFilter)}>
                          <SelectTrigger className="w-[140px]">
                            <Filter className="h-4 w-4 mr-2" />
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {filteredTeamMembers.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          {teamMembers.length === 0 ? "No team members yet. Click \"Add Member\" to get started." : "No team members match your search."}
                        </div>
                      ) : (
                        <SortableTeamList
                          members={filteredTeamMembers}
                          onReorder={reorderTeamMembers}
                          onEdit={(member) => handleEdit(member, 'team')}
                          onDelete={(id) => handleDelete(id, 'team')}
                          onToggleActive={(id, active) => toggleTeamMemberActive(id, active)}
                        />
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Programs Tab */}
            <TabsContent value="programs">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Programs</CardTitle>
                      <CardDescription>Manage your organization's programs</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <ImportButton dataType="programs" onImport={handleImportPrograms} />
                      <ExportButton
                        data={filteredPrograms}
                        columns={exportColumns.programs}
                        filename={`programs-${new Date().toISOString().split('T')[0]}`}
                      />
                      <Button onClick={() => handleAdd('programs')}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Program
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {programsLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                        <div className="relative flex-1 max-w-sm">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search programs..."
                            value={programsSearch}
                            onChange={(e) => setProgramsSearch(e.target.value)}
                            className="pl-9 pr-9"
                          />
                          {programsSearch && (
                            <button onClick={() => setProgramsSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                            </button>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4 text-muted-foreground" />
                          <Select value={programsFilter} onValueChange={(value: StatusFilter) => setProgramsFilter(value)}>
                            <SelectTrigger className="w-[140px]">
                              <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All ({programs.length})</SelectItem>
                              <SelectItem value="active">Active ({programs.filter(p => p.active !== false).length})</SelectItem>
                              <SelectItem value="inactive">Inactive ({programs.filter(p => p.active === false).length})</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <BulkActionBar
                        selectedCount={selectedPrograms.size}
                        onActivate={() => handleBulkActivate('programs', selectedPrograms, true)}
                        onDeactivate={() => handleBulkActivate('programs', selectedPrograms, false)}
                        onDelete={() => handleBulkDelete('programs', selectedPrograms)}
                        onClearSelection={() => setSelectedPrograms(new Set())}
                      />
                      {filteredPrograms.length > 0 && (
                        <div className="flex items-center gap-2 mb-4">
                          <Checkbox
                            checked={selectedPrograms.size === filteredPrograms.length && filteredPrograms.length > 0}
                            onCheckedChange={() => selectAll(filteredPrograms, selectedPrograms, setSelectedPrograms)}
                          />
                          <span className="text-sm text-muted-foreground">Select all ({filteredPrograms.length})</span>
                        </div>
                      )}
                      <SortableContentList
                        items={filteredPrograms}
                        onReorder={reorderPrograms}
                        onEdit={(item) => handleEdit(item, 'programs')}
                        onDelete={(id) => handleDelete(id, 'programs')}
                        onToggleActive={toggleProgramActive}
                        selectedIds={selectedPrograms}
                        onToggleSelect={(id) => toggleSelection(id, selectedPrograms, setSelectedPrograms)}
                        renderContent={(item) => <ProgramContent item={item} />}
                        emptyMessage={programs.length === 0 ? "No programs yet. Click \"Add Program\" to get started." : "No programs match the current filter."}
                      />
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Testimonials Tab */}
            <TabsContent value="testimonials">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Testimonials</CardTitle>
                      <CardDescription>Manage testimonials from beneficiaries</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <ImportButton dataType="testimonials" onImport={handleImportTestimonials} />
                      <ExportButton
                        data={filteredTestimonials}
                        columns={exportColumns.testimonials}
                        filename={`testimonials-${new Date().toISOString().split('T')[0]}`}
                      />
                      <Button onClick={() => handleAdd('testimonials')}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Testimonial
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {testimonialsLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                        <div className="relative flex-1 max-w-sm">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search testimonials..."
                            value={testimonialsSearch}
                            onChange={(e) => setTestimonialsSearch(e.target.value)}
                            className="pl-9 pr-9"
                          />
                          {testimonialsSearch && (
                            <button onClick={() => setTestimonialsSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                            </button>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4 text-muted-foreground" />
                          <Select value={testimonialsFilter} onValueChange={(value: StatusFilter) => setTestimonialsFilter(value)}>
                            <SelectTrigger className="w-[140px]">
                              <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All ({testimonials.length})</SelectItem>
                              <SelectItem value="active">Active ({testimonials.filter(t => t.active !== false).length})</SelectItem>
                              <SelectItem value="inactive">Inactive ({testimonials.filter(t => t.active === false).length})</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <BulkActionBar
                        selectedCount={selectedTestimonials.size}
                        onActivate={() => handleBulkActivate('testimonials', selectedTestimonials, true)}
                        onDeactivate={() => handleBulkActivate('testimonials', selectedTestimonials, false)}
                        onDelete={() => handleBulkDelete('testimonials', selectedTestimonials)}
                        onClearSelection={() => setSelectedTestimonials(new Set())}
                      />
                      {filteredTestimonials.length > 0 && (
                        <div className="flex items-center gap-2 mb-4">
                          <Checkbox
                            checked={selectedTestimonials.size === filteredTestimonials.length && filteredTestimonials.length > 0}
                            onCheckedChange={() => selectAll(filteredTestimonials, selectedTestimonials, setSelectedTestimonials)}
                          />
                          <span className="text-sm text-muted-foreground">Select all ({filteredTestimonials.length})</span>
                        </div>
                      )}
                      <SortableContentList
                        items={filteredTestimonials}
                        onReorder={reorderTestimonials}
                        onEdit={(item) => handleEdit(item, 'testimonials')}
                        onDelete={(id) => handleDelete(id, 'testimonials')}
                        onToggleActive={toggleTestimonialActive}
                        selectedIds={selectedTestimonials}
                        onToggleSelect={(id) => toggleSelection(id, selectedTestimonials, setSelectedTestimonials)}
                        renderContent={(item) => <TestimonialContent item={item} />}
                        emptyMessage={testimonials.length === 0 ? "No testimonials yet. Click \"Add Testimonial\" to get started." : "No testimonials match the current filter."}
                      />
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Metrics Tab */}
            <TabsContent value="metrics">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Success Metrics</CardTitle>
                      <CardDescription>Manage impact statistics and metrics</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <ImportButton dataType="metrics" onImport={handleImportMetrics} />
                      <ExportButton
                        data={filteredMetrics}
                        columns={exportColumns.metrics}
                        filename={`metrics-${new Date().toISOString().split('T')[0]}`}
                      />
                      <Button onClick={() => handleAdd('metrics')}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Metric
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {metricsLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                        <div className="relative flex-1 max-w-sm">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search metrics..."
                            value={metricsSearch}
                            onChange={(e) => setMetricsSearch(e.target.value)}
                            className="pl-9 pr-9"
                          />
                          {metricsSearch && (
                            <button onClick={() => setMetricsSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                            </button>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4 text-muted-foreground" />
                          <Select value={metricsFilter} onValueChange={(value: StatusFilter) => setMetricsFilter(value)}>
                            <SelectTrigger className="w-[140px]">
                              <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All ({metrics.length})</SelectItem>
                              <SelectItem value="active">Active ({metrics.filter(m => m.active !== false).length})</SelectItem>
                              <SelectItem value="inactive">Inactive ({metrics.filter(m => m.active === false).length})</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <BulkActionBar
                        selectedCount={selectedMetrics.size}
                        onActivate={() => handleBulkActivate('metrics', selectedMetrics, true)}
                        onDeactivate={() => handleBulkActivate('metrics', selectedMetrics, false)}
                        onDelete={() => handleBulkDelete('metrics', selectedMetrics)}
                        onClearSelection={() => setSelectedMetrics(new Set())}
                      />
                      {filteredMetrics.length > 0 && (
                        <div className="flex items-center gap-2 mb-4">
                          <Checkbox checked={selectedMetrics.size === filteredMetrics.length && filteredMetrics.length > 0} onCheckedChange={() => selectAll(filteredMetrics, selectedMetrics, setSelectedMetrics)} />
                          <span className="text-sm text-muted-foreground">Select all ({filteredMetrics.length})</span>
                        </div>
                      )}
                      <SortableContentList
                        items={filteredMetrics}
                        onReorder={reorderMetrics}
                        onEdit={(item) => handleEdit(item, 'metrics')}
                        onDelete={(id) => handleDelete(id, 'metrics')}
                        onToggleActive={toggleMetricActive}
                        selectedIds={selectedMetrics}
                        onToggleSelect={(id) => toggleSelection(id, selectedMetrics, setSelectedMetrics)}
                        renderContent={(item) => <MetricContent item={item} />}
                        emptyMessage={metrics.length === 0 ? "No metrics yet." : "No metrics match the current filter."}
                      />
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Success Stories Tab */}
            <TabsContent value="stories">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Success Stories</CardTitle>
                      <CardDescription>Manage inspiring success stories</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <ImportButton dataType="stories" onImport={handleImportStories} />
                      <ExportButton
                        data={filteredStories}
                        columns={exportColumns.stories}
                        filename={`success-stories-${new Date().toISOString().split('T')[0]}`}
                      />
                      <Button onClick={() => handleAdd('stories')}><Plus className="mr-2 h-4 w-4" />Add Story</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {storiesLoading ? (
                    <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin" /></div>
                  ) : (
                    <>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                        <div className="relative flex-1 max-w-sm">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search stories..."
                            value={storiesSearch}
                            onChange={(e) => setStoriesSearch(e.target.value)}
                            className="pl-9 pr-9"
                          />
                          {storiesSearch && (
                            <button onClick={() => setStoriesSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                            </button>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4 text-muted-foreground" />
                          <Select value={storiesFilter} onValueChange={(value: StatusFilter) => setStoriesFilter(value)}>
                            <SelectTrigger className="w-[140px]">
                              <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All ({stories.length})</SelectItem>
                              <SelectItem value="active">Active ({stories.filter(s => s.active !== false).length})</SelectItem>
                              <SelectItem value="inactive">Inactive ({stories.filter(s => s.active === false).length})</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <BulkActionBar
                        selectedCount={selectedStories.size}
                        onActivate={() => handleBulkActivate('stories', selectedStories, true)}
                        onDeactivate={() => handleBulkActivate('stories', selectedStories, false)}
                        onDelete={() => handleBulkDelete('stories', selectedStories)}
                        onClearSelection={() => setSelectedStories(new Set())}
                      />
                      {filteredStories.length > 0 && (
                        <div className="flex items-center gap-2 mb-4">
                          <Checkbox checked={selectedStories.size === filteredStories.length && filteredStories.length > 0} onCheckedChange={() => selectAll(filteredStories, selectedStories, setSelectedStories)} />
                          <span className="text-sm text-muted-foreground">Select all ({filteredStories.length})</span>
                        </div>
                      )}
                      <div className="space-y-4">
                        {[...filteredStories].sort((a: any, b: any) => (b.view_count || 0) - (a.view_count || 0)).map((story: any) => (
                          <div key={story.id} className={`border rounded-lg p-4 flex justify-between items-start ${story.active === false ? 'opacity-60 bg-muted/50' : ''}`}>
                            <div className="flex gap-4 flex-1">
                              <Checkbox checked={selectedStories.has(story.id)} onCheckedChange={() => toggleSelection(story.id, selectedStories, setSelectedStories)} className="mt-1" />
                              {story.image_url ? <img src={story.image_url} alt={story.title} className={`w-20 h-20 rounded object-cover ${story.active === false ? 'grayscale' : ''}`} /> : <div className="w-20 h-20 rounded bg-muted flex items-center justify-center"><Star className="h-8 w-8 text-muted-foreground" /></div>}
                              <div className="flex-1">
                                <div className="flex items-center gap-2"><h3 className="font-semibold">{story.title}</h3>{story.active === false && <Badge variant="secondary" className="text-xs"><EyeOff className="h-3 w-3 mr-1" />Inactive</Badge>}</div>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{story.description}</p>
                                <div className="flex items-center gap-3 mt-2"><p className="text-xs text-gray-500">Category: {story.category || 'None'}</p><div className="flex items-center gap-1 text-xs font-medium text-utu-red"><BarChart className="h-3 w-3" /><span>{story.view_count || 0} views</span></div></div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Switch checked={story.active !== false} onCheckedChange={(checked) => toggleStoryActive(story.id, checked)} />
                              <Button size="sm" variant="outline" onClick={() => handleEdit(story, 'stories')}><Edit className="h-4 w-4" /></Button>
                              <Button size="sm" variant="destructive" onClick={() => handleDelete(story.id, 'stories')}><Trash2 className="h-4 w-4" /></Button>
                            </div>
                          </div>
                        ))}
                        {filteredStories.length === 0 && <div className="text-center py-8 text-gray-500">{stories.length === 0 ? "No success stories yet." : "No stories match the current filter."}</div>}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Gallery Tab */}
            <TabsContent value="gallery">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div><CardTitle>Gallery</CardTitle><CardDescription>Manage gallery images</CardDescription></div>
                    <div className="flex gap-2">
                      <ImportButton dataType="gallery" onImport={handleImportGallery} />
                      <ExportButton
                        data={filteredImages}
                        columns={exportColumns.gallery}
                        filename={`gallery-${new Date().toISOString().split('T')[0]}`}
                      />
                      <Button variant="outline" onClick={() => setBatchDialogOpen(true)}><Images className="mr-2 h-4 w-4" />Batch Upload</Button>
                      <Button onClick={() => handleAdd('gallery')}><Plus className="mr-2 h-4 w-4" />Add Image</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {galleryLoading ? (
                    <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin" /></div>
                  ) : (
                    <>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                        <div className="relative flex-1 max-w-sm">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search gallery..."
                            value={gallerySearch}
                            onChange={(e) => setGallerySearch(e.target.value)}
                            className="pl-9 pr-9"
                          />
                          {gallerySearch && (
                            <button onClick={() => setGallerySearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                            </button>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4 text-muted-foreground" />
                          <Select value={galleryFilter} onValueChange={(value: StatusFilter) => setGalleryFilter(value)}>
                            <SelectTrigger className="w-[140px]">
                              <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All ({images.length})</SelectItem>
                              <SelectItem value="active">Active ({images.filter(i => i.active !== false).length})</SelectItem>
                              <SelectItem value="inactive">Inactive ({images.filter(i => i.active === false).length})</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <BulkActionBar
                        selectedCount={selectedImages.size}
                        onActivate={() => handleBulkActivate('gallery', selectedImages, true)}
                        onDeactivate={() => handleBulkActivate('gallery', selectedImages, false)}
                        onDelete={() => handleBulkDelete('gallery', selectedImages)}
                        onClearSelection={() => setSelectedImages(new Set())}
                      />
                      {filteredImages.length > 0 && (
                        <div className="flex items-center gap-2 mb-4">
                          <Checkbox checked={selectedImages.size === filteredImages.length && filteredImages.length > 0} onCheckedChange={() => selectAll(filteredImages, selectedImages, setSelectedImages)} />
                          <span className="text-sm text-muted-foreground">Select all ({filteredImages.length})</span>
                        </div>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredImages.map((image: any) => (
                          <div key={image.id} className={`border rounded-lg overflow-hidden ${image.active === false ? 'opacity-60 bg-muted/50' : ''}`}>
                            <div className="relative">
                              <Checkbox checked={selectedImages.has(image.id)} onCheckedChange={() => toggleSelection(image.id, selectedImages, setSelectedImages)} className="absolute top-2 left-2 z-10 bg-background" />
                              <img src={image.image_url} alt={image.title} className={`w-full h-48 object-cover ${image.active === false ? 'grayscale' : ''}`} />
                              {image.active === false && <Badge variant="secondary" className="absolute top-2 right-2 text-xs"><EyeOff className="h-3 w-3 mr-1" />Inactive</Badge>}
                            </div>
                            <div className="p-4">
                              <h3 className="font-semibold">{image.title}</h3>
                              {image.description && <p className="text-sm text-gray-600 mt-1">{image.description}</p>}
                              <p className="text-xs text-gray-500 mt-1">Category: {image.category || 'None'}</p>
                              <div className="flex items-center justify-between gap-2 mt-3">
                                <Switch checked={image.active !== false} onCheckedChange={(checked) => toggleImageActive(image.id, checked)} />
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline" onClick={() => handleEdit(image, 'gallery')}><Edit className="h-4 w-4" /></Button>
                                  <Button size="sm" variant="destructive" onClick={() => handleDelete(image.id, 'gallery')}><Trash2 className="h-4 w-4" /></Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        {filteredImages.length === 0 && <div className="col-span-full text-center py-8 text-gray-500">{images.length === 0 ? "No gallery images yet." : "No images match the current filter."}</div>}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Events</CardTitle>
                      <CardDescription>Manage upcoming and past events</CardDescription>
                    </div>
                    <Button onClick={() => handleAdd('events')}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Event
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {eventsLoading ? (
                    <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin" /></div>
                  ) : (
                    <div className="space-y-4">
                      {eventsList.map((event: any) => (
                        <div key={event.id} className={`border rounded-lg p-4 flex justify-between items-start ${event.active === false ? 'opacity-60 bg-muted/50' : ''}`}>
                          <div className="flex gap-4 flex-1">
                            {event.image_url ? (
                              <img src={event.image_url} alt={event.title} className="w-24 h-20 rounded object-cover" />
                            ) : (
                              <div className="w-24 h-20 rounded bg-muted flex items-center justify-center">
                                <Calendar className="h-8 w-8 text-muted-foreground" />
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{event.title}</h3>
                                <Badge variant="outline" className="text-xs">{event.category || 'upcoming'}</Badge>
                                {event.active === false && <Badge variant="secondary" className="text-xs"><EyeOff className="h-3 w-3 mr-1" />Inactive</Badge>}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{event.event_date} {event.event_time && `• ${event.event_time}`}</p>
                              {event.location && <p className="text-xs text-muted-foreground">{event.location}</p>}
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{event.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch checked={event.active !== false} onCheckedChange={(checked) => toggleEventActive(event.id, checked)} />
                            <Button size="sm" variant="outline" onClick={() => handleEdit(event, 'events')}><Edit className="h-4 w-4" /></Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDelete(event.id, 'events')}><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        </div>
                      ))}
                      {eventsList.length === 0 && <div className="text-center py-8 text-muted-foreground">No events yet. Click "Add Event" to get started.</div>}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Registrations Tab */}
            <TabsContent value="registrations">
              <Card>
                <CardHeader>
                  <div>
                    <CardTitle>Event Registrations</CardTitle>
                    <CardDescription>View and manage event registrations from attendees</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  {registrationsLoading ? (
                    <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin" /></div>
                  ) : registrations.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No registrations yet.</div>
                  ) : (
                    <div className="space-y-3">
                      {registrations.map((reg) => (
                        <div key={reg.id} className="border rounded-lg p-4 flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{reg.full_name}</h3>
                              <Badge variant={reg.status === 'registered' ? 'default' : reg.status === 'confirmed' ? 'secondary' : 'outline'} className="text-xs">
                                {reg.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Event: <strong>{reg.event_title}</strong></p>
                            <p className="text-sm text-muted-foreground">{reg.email}{reg.phone ? ` • ${reg.phone}` : ''}</p>
                            {reg.organization && <p className="text-xs text-muted-foreground">Org: {reg.organization}</p>}
                            {reg.message && <p className="text-xs text-muted-foreground mt-1 italic">"{reg.message}"</p>}
                            <p className="text-xs text-muted-foreground mt-1">{new Date(reg.created_at).toLocaleDateString()}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Select value={reg.status} onValueChange={(val) => updateRegistrationStatus(reg.id, val)}>
                              <SelectTrigger className="w-[120px] h-8 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="registered">Registered</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                                <SelectItem value="attended">Attended</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button size="sm" variant="destructive" onClick={() => { if (confirm('Delete this registration?')) deleteRegistration(reg.id); }}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* AI Image Generator Tab */}
            <TabsContent value="image-generator">
              <ImageGenerator />
            </TabsContent>
          </Tabs>

          {/* Universal Edit/Add Dialog */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {dialogMode === 'add' ? 'Add' : 'Edit'}{' '}
                  {activeTab === 'team' ? 'Team Member' : 
                   activeTab === 'programs' ? 'Program' : 
                   activeTab === 'testimonials' ? 'Testimonial' : 
                   activeTab === 'metrics' ? 'Metric' :
                   activeTab === 'stories' ? 'Success Story' :
                   activeTab === 'events' ? 'Event' : 'Gallery Image'}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                {activeTab === 'team' && (
                  <>
                    <div>
                      <Label>Name</Label>
                      <Input value={editingItem?.name || ''} onChange={(e) => handleInputChange('name', e.target.value)} />
                    </div>
                    <div>
                      <Label>Position</Label>
                      <Input value={editingItem?.position || ''} onChange={(e) => handleInputChange('position', e.target.value)} />
                    </div>
                    <div>
                      <Label>Role</Label>
                      <Input value={editingItem?.role || ''} onChange={(e) => handleInputChange('role', e.target.value)} />
                    </div>
                    <div>
                      <Label>Bio</Label>
                      <Textarea value={editingItem?.bio || ''} onChange={(e) => handleInputChange('bio', e.target.value)} rows={4} />
                    </div>
                    <ImageUpload
                      mode={dialogMode}
                      currentImage={imagePreview || editingItem?.image}
                      onImageSelect={handleImageSelect}
                      onImageRemove={() => {
                        setSelectedFile(null);
                        setImagePreview('');
                      }}
                    />
                  </>
                )}

                {activeTab === 'programs' && (
                  <>
                    <div>
                      <Label>Title</Label>
                      <Input value={editingItem?.title || ''} onChange={(e) => handleInputChange('title', e.target.value)} />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea value={editingItem?.description || ''} onChange={(e) => handleInputChange('description', e.target.value)} rows={4} />
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Input value={editingItem?.category || ''} onChange={(e) => handleInputChange('category', e.target.value)} placeholder="e.g., core, special-events" />
                    </div>
                    <div>
                      <Label>Icon (Lucide icon name)</Label>
                      <Input value={editingItem?.icon || ''} onChange={(e) => handleInputChange('icon', e.target.value)} placeholder="e.g., BookOpen, Heart" />
                    </div>
                    <ImageUpload
                      mode={dialogMode}
                      currentImage={imagePreview || editingItem?.image}
                      onImageSelect={handleImageSelect}
                      onImageRemove={() => {
                        setSelectedFile(null);
                        setImagePreview('');
                      }}
                    />
                  </>
                )}

                {activeTab === 'testimonials' && (
                  <>
                    <div>
                      <Label>Name</Label>
                      <Input value={editingItem?.name || ''} onChange={(e) => handleInputChange('name', e.target.value)} />
                    </div>
                    <div>
                      <Label>Role</Label>
                      <Input value={editingItem?.role || ''} onChange={(e) => handleInputChange('role', e.target.value)} />
                    </div>
                    <div>
                      <Label>Quote</Label>
                      <Textarea value={editingItem?.quote || ''} onChange={(e) => handleInputChange('quote', e.target.value)} rows={4} />
                    </div>
                    <ImageUpload
                      mode={dialogMode}
                      currentImage={imagePreview || editingItem?.image_url}
                      onImageSelect={handleImageSelect}
                      onImageRemove={() => {
                        setSelectedFile(null);
                        setImagePreview('');
                      }}
                    />
                  </>
                )}

                {activeTab === 'metrics' && (
                  <>
                    <div>
                      <Label>Metric Value</Label>
                      <Input value={editingItem?.metric_value || ''} onChange={(e) => handleInputChange('metric_value', e.target.value)} placeholder="e.g., 10,000+" />
                    </div>
                    <div>
                      <Label>Metric Name</Label>
                      <Input value={editingItem?.metric_name || ''} onChange={(e) => handleInputChange('metric_name', e.target.value)} placeholder="e.g., Lives Impacted" />
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Input value={editingItem?.category || ''} onChange={(e) => handleInputChange('category', e.target.value)} />
                    </div>
                    <div>
                      <Label>Icon (Lucide icon name)</Label>
                      <Input value={editingItem?.icon || ''} onChange={(e) => handleInputChange('icon', e.target.value)} placeholder="e.g., Users, Heart" />
                    </div>
                  </>
                )}

                {activeTab === 'stories' && (
                  <>
                    <div>
                      <Label>Title</Label>
                      <Input value={editingItem?.title || ''} onChange={(e) => handleInputChange('title', e.target.value)} />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea value={editingItem?.description || ''} onChange={(e) => handleInputChange('description', e.target.value)} rows={4} />
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Input value={editingItem?.category || ''} onChange={(e) => handleInputChange('category', e.target.value)} />
                    </div>
                    <ImageUpload
                      mode={dialogMode}
                      currentImage={imagePreview || editingItem?.image_url}
                      onImageSelect={handleImageSelect}
                      onImageRemove={() => {
                        setSelectedFile(null);
                        setImagePreview('');
                      }}
                    />
                  </>
                )}

                {activeTab === 'gallery' && (
                  <>
                    <div>
                      <Label>Title</Label>
                      <Input value={editingItem?.title || ''} onChange={(e) => handleInputChange('title', e.target.value)} />
                    </div>
                    <div>
                      <Label>Description (Optional)</Label>
                      <Textarea value={editingItem?.description || ''} onChange={(e) => handleInputChange('description', e.target.value)} rows={3} />
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Input value={editingItem?.category || ''} onChange={(e) => handleInputChange('category', e.target.value)} />
                    </div>
                    <ImageUpload
                      mode={dialogMode}
                      currentImage={imagePreview || editingItem?.image_url}
                      onImageSelect={handleImageSelect}
                      onImageRemove={() => {
                        setSelectedFile(null);
                        setImagePreview('');
                      }}
                    />
                  </>
                )}

                {activeTab === 'events' && (
                  <>
                    <div>
                      <Label>Title</Label>
                      <Input value={editingItem?.title || ''} onChange={(e) => handleInputChange('title', e.target.value)} />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea value={editingItem?.description || ''} onChange={(e) => handleInputChange('description', e.target.value)} rows={3} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Event Date</Label>
                        <Input value={editingItem?.event_date || ''} onChange={(e) => handleInputChange('event_date', e.target.value)} placeholder="e.g., March 15, 2025" />
                      </div>
                      <div>
                        <Label>Event Time</Label>
                        <Input value={editingItem?.event_time || ''} onChange={(e) => handleInputChange('event_time', e.target.value)} placeholder="e.g., 6:00 PM - 10:00 PM" />
                      </div>
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Input value={editingItem?.location || ''} onChange={(e) => handleInputChange('location', e.target.value)} placeholder="e.g., Kampala, Uganda" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Expected Attendees</Label>
                        <Input value={editingItem?.attendees || ''} onChange={(e) => handleInputChange('attendees', e.target.value)} placeholder="e.g., 200+ expected" />
                      </div>
                      <div>
                        <Label>Category</Label>
                        <Select value={editingItem?.category || 'upcoming'} onValueChange={(value) => handleInputChange('category', value)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="upcoming">Upcoming</SelectItem>
                            <SelectItem value="past">Past</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>Impact (for past events)</Label>
                      <Input value={editingItem?.impact || ''} onChange={(e) => handleInputChange('impact', e.target.value)} placeholder="e.g., Provided clean water to 5,000 residents" />
                    </div>
                    <ImageUpload
                      mode={dialogMode}
                      currentImage={imagePreview || editingItem?.image_url}
                      onImageSelect={handleImageSelect}
                      onImageRemove={() => {
                        setSelectedFile(null);
                        setImagePreview('');
                      }}
                    />
                  </>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Batch Upload Dialog */}
          <Dialog open={batchDialogOpen} onOpenChange={setBatchDialogOpen}>
            <DialogContent className="max-w-xl">
              <DialogHeader>
                <DialogTitle>Batch Upload Gallery Images</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label>Category (Optional)</Label>
                  <Input 
                    value={batchCategory} 
                    onChange={(e) => setBatchCategory(e.target.value)} 
                    placeholder="e.g., events, community"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    All uploaded images will be assigned this category
                  </p>
                </div>
                <BatchImageUpload
                  onImagesSelect={async (files) => {
                    await batchAddImages({ files, category: batchCategory || undefined });
                    setBatchDialogOpen(false);
                    setBatchCategory('');
                  }}
                  isUploading={isBatchUploading}
                  maxFiles={20}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Team Member Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Team Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete <strong>{deleteConfirm?.name}</strong>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteTeamMember}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default ContentManagement;