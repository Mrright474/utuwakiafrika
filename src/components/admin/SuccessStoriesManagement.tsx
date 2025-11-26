import React, { useState } from 'react';
import { useSuccessStoriesManagement } from '@/hooks/useSuccessStoriesManagement';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const SuccessStoriesManagement = () => {
  const { stories, loading, addStory, updateStory, deleteStory } = useSuccessStoriesManagement();
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: null as File | null,
  });

  const handleAdd = async () => {
    if (!formData.title || !formData.description) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      await addStory({
        story: {
          title: formData.title,
          description: formData.description,
          category: formData.category || null,
          image_url: null,
          display_order: 0,
          active: true,
        },
        imageFile: formData.image || undefined,
      });
      setIsAddDialogOpen(false);
      setFormData({ title: '', description: '', category: '', image: null });
    } catch (error) {
      console.error('Error adding story:', error);
    }
  };

  const handleEdit = async () => {
    if (!selectedStory || !formData.title || !formData.description) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      await updateStory({
        story: {
          ...selectedStory,
          title: formData.title,
          description: formData.description,
          category: formData.category || null,
        },
        imageFile: formData.image || undefined,
      });
      setIsEditDialogOpen(false);
      setSelectedStory(null);
      setFormData({ title: '', description: '', category: '', image: null });
    } catch (error) {
      console.error('Error updating story:', error);
    }
  };

  const handleDelete = async (story: any) => {
    if (!confirm('Are you sure you want to delete this success story?')) return;

    try {
      await deleteStory(story);
    } catch (error) {
      console.error('Error deleting story:', error);
    }
  };

  const openEditDialog = (story: any) => {
    setSelectedStory(story);
    setFormData({
      title: story.title,
      description: story.description,
      category: story.category || '',
      image: null,
    });
    setIsEditDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Success Stories Management</CardTitle>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-utu-red hover:bg-red-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Story
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Success Story</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="add-title">Title *</Label>
                <Input
                  id="add-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter story title"
                />
              </div>
              <div>
                <Label htmlFor="add-category">Category (Location)</Label>
                <Input
                  id="add-category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Kampala, Uganda"
                />
              </div>
              <div>
                <Label htmlFor="add-description">Description *</Label>
                <Textarea
                  id="add-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter the full success story"
                  rows={8}
                />
              </div>
              <div>
                <Label htmlFor="add-image">Image</Label>
                <Input
                  id="add-image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAdd} className="bg-utu-red hover:bg-red-700">
                  Add Story
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-utu-red"></div>
          </div>
        ) : stories.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">No success stories yet</p>
        ) : (
          <div className="space-y-4">
            {stories.map((story) => (
              <Card key={story.id} className="border-l-4 border-l-utu-red">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{story.title}</h3>
                        {story.category && (
                          <Badge variant="secondary">{story.category}</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {story.description}
                      </p>
                      {story.image_url && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                          <ImageIcon className="h-4 w-4" />
                          <span>Has image</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openEditDialog(story)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(story)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Success Story</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Title *</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter story title"
              />
            </div>
            <div>
              <Label htmlFor="edit-category">Category (Location)</Label>
              <Input
                id="edit-category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., Kampala, Uganda"
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description *</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter the full success story"
                rows={8}
              />
            </div>
            <div>
              <Label htmlFor="edit-image">Image (leave empty to keep current)</Label>
              <Input
                id="edit-image"
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEdit} className="bg-utu-red hover:bg-red-700">
                Update Story
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
