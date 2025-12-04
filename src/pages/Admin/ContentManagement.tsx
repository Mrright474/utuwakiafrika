import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Users, FileText, MessageSquare, BarChart, Plus, Edit, Trash2, LogOut, ArrowLeft, Star, Image as ImageIcon } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useTeamManagement } from '@/hooks/useTeamManagement';
import { useProgramsManagement } from '@/hooks/useProgramsManagement';
import { useTestimonialsManagement } from '@/hooks/useTestimonialsManagement';
import { useMetricsManagement } from '@/hooks/useMetricsManagement';
import { useSuccessStoriesManagement } from '@/hooks/useSuccessStoriesManagement';
import { useGalleryManagement } from '@/hooks/useGalleryManagement';
import ImageUpload from '@/components/home/ImageUpload';

const ContentManagement = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAdminAuth();
  const [activeTab, setActiveTab] = useState('team');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Management hooks
  const { teamMembers, loading: teamLoading, addTeamMember, updateTeamMember, deleteTeamMember } = useTeamManagement();
  const { programs, loading: programsLoading, addProgram, updateProgram, deleteProgram } = useProgramsManagement();
  const { testimonials, loading: testimonialsLoading, addTestimonial, updateTestimonial, deleteTestimonial } = useTestimonialsManagement();
  const { metrics, loading: metricsLoading, addMetric, updateMetric, deleteMetric } = useMetricsManagement();
  const { stories, loading: storiesLoading, addStory, updateStory, deleteStory } = useSuccessStoriesManagement();
  const { images, loading: galleryLoading, addImage, updateImage, deleteImage } = useGalleryManagement();

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
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      if (type === 'team') await deleteTeamMember(id);
      else if (type === 'programs') await deleteProgram(id);
      else if (type === 'testimonials') await deleteTestimonial(id);
      else if (type === 'metrics') await deleteMetric(id);
      else if (type === 'stories') {
        const story = stories.find((s: any) => s.id === id);
        if (story) await deleteStory(story);
      } else if (type === 'gallery') {
        const image = images.find((i: any) => i.id === id);
        if (image) await deleteImage(image);
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEditingItem((prev: any) => ({ ...prev, [field]: value }));
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
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8">
              <TabsTrigger value="team">
                <Users className="mr-2 h-4 w-4" />
                Team ({teamMembers.length})
              </TabsTrigger>
              <TabsTrigger value="programs">
                <FileText className="mr-2 h-4 w-4" />
                Programs ({programs.length})
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
            </TabsList>

            {/* Team Members Tab */}
            <TabsContent value="team">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Team Members</CardTitle>
                      <CardDescription>Manage your organization's team members</CardDescription>
                    </div>
                    <Button onClick={() => handleAdd('team')}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Member
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {teamLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {teamMembers.map((member: any) => (
                        <div key={member.id} className={`border rounded-lg p-4 flex justify-between items-center ${member.active === false ? 'opacity-60 bg-muted' : ''}`}>
                          <div className="flex items-center gap-4">
                            {member.image ? (
                              <img src={member.image} alt={member.name} className="w-12 h-12 rounded-full object-cover" />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                <Users className="h-6 w-6 text-muted-foreground" />
                              </div>
                            )}
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{member.name}</h3>
                                {member.active === false && (
                                  <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded">Inactive</span>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{member.position}</p>
                              <p className="text-xs text-muted-foreground/70">{member.role}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleEdit(member, 'team')}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDelete(member.id, 'team')}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {teamMembers.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          No team members yet. Click "Add Member" to get started.
                        </div>
                      )}
                    </div>
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
                    <Button onClick={() => handleAdd('programs')}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Program
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {programsLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {programs.map((program: any) => (
                        <div key={program.id} className="border rounded-lg p-4 flex justify-between items-start">
                          <div className="flex gap-4 flex-1">
                            {program.image ? (
                              <img src={program.image} alt={program.title} className="w-20 h-20 rounded object-cover" />
                            ) : (
                              <div className="w-20 h-20 rounded bg-muted flex items-center justify-center">
                                <FileText className="h-8 w-8 text-muted-foreground" />
                              </div>
                            )}
                            <div>
                              <h3 className="font-semibold">{program.title}</h3>
                              <p className="text-sm text-gray-600 mt-1">{program.description}</p>
                              <p className="text-xs text-gray-500 mt-1">Category: {program.category || 'None'}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleEdit(program, 'programs')}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDelete(program.id, 'programs')}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {programs.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          No programs yet. Click "Add Program" to get started.
                        </div>
                      )}
                    </div>
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
                    <Button onClick={() => handleAdd('testimonials')}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Testimonial
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {testimonialsLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {testimonials.map((testimonial: any) => (
                        <div key={testimonial.id} className="border rounded-lg p-4 flex justify-between items-start">
                          <div className="flex items-start gap-4">
                            {testimonial.image_url ? (
                              <img src={testimonial.image_url} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                <MessageSquare className="h-6 w-6 text-muted-foreground" />
                              </div>
                            )}
                            <div>
                              <h3 className="font-semibold">{testimonial.name}</h3>
                              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                              <p className="text-sm mt-2 italic line-clamp-2">"{testimonial.quote}"</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleEdit(testimonial, 'testimonials')}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDelete(testimonial.id, 'testimonials')}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {testimonials.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          No testimonials yet. Click "Add Testimonial" to get started.
                        </div>
                      )}
                    </div>
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
                    <Button onClick={() => handleAdd('metrics')}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Metric
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {metricsLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {metrics.map((metric: any) => (
                        <div key={metric.id} className="border rounded-lg p-4 flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold text-2xl">{metric.metric_value}</h3>
                            <p className="text-sm text-gray-600">{metric.metric_name}</p>
                            <p className="text-xs text-gray-500">Category: {metric.category || 'None'}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleEdit(metric, 'metrics')}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDelete(metric.id, 'metrics')}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {metrics.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          No metrics yet. Click "Add Metric" to get started.
                        </div>
                      )}
                    </div>
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
                      <CardDescription>Manage inspiring success stories with view analytics</CardDescription>
                    </div>
                    <Button onClick={() => handleAdd('stories')}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Story
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {storiesLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {[...stories].sort((a: any, b: any) => (b.view_count || 0) - (a.view_count || 0)).map((story: any) => (
                        <div key={story.id} className="border rounded-lg p-4 flex justify-between items-start">
                          <div className="flex gap-4 flex-1">
                            {story.image_url ? (
                              <img src={story.image_url} alt={story.title} className="w-20 h-20 rounded object-cover" />
                            ) : (
                              <div className="w-20 h-20 rounded bg-muted flex items-center justify-center">
                                <Star className="h-8 w-8 text-muted-foreground" />
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <h3 className="font-semibold">{story.title}</h3>
                                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{story.description}</p>
                                  <div className="flex items-center gap-3 mt-2">
                                    <p className="text-xs text-gray-500">Category: {story.category || 'None'}</p>
                                    <div className="flex items-center gap-1 text-xs font-medium text-utu-red">
                                      <BarChart className="h-3 w-3" />
                                      <span>{story.view_count || 0} views</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleEdit(story, 'stories')}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDelete(story.id, 'stories')}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {stories.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          No success stories yet. Click "Add Story" to get started.
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Gallery Tab */}
            <TabsContent value="gallery">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Gallery</CardTitle>
                      <CardDescription>Manage gallery images</CardDescription>
                    </div>
                    <Button onClick={() => handleAdd('gallery')}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Image
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {galleryLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {images.map((image: any) => (
                        <div key={image.id} className="border rounded-lg overflow-hidden">
                          <img src={image.image_url} alt={image.title} className="w-full h-48 object-cover" />
                          <div className="p-4">
                            <h3 className="font-semibold">{image.title}</h3>
                            {image.description && (
                              <p className="text-sm text-gray-600 mt-1">{image.description}</p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">Category: {image.category || 'None'}</p>
                            <div className="flex gap-2 mt-3">
                              <Button size="sm" variant="outline" onClick={() => handleEdit(image, 'gallery')}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleDelete(image.id, 'gallery')}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      {images.length === 0 && (
                        <div className="col-span-full text-center py-8 text-gray-500">
                          No gallery images yet. Click "Add Image" to get started.
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
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
                   activeTab === 'stories' ? 'Success Story' : 'Gallery Image'}
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
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Layout>
  );
};

export default ContentManagement;