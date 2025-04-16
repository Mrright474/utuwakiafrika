
import React from 'react';
import { UploadCloud } from 'lucide-react';
import { 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface TeamMemberDialogProps {
  mode: 'add' | 'edit';
  member: {
    id?: string;
    name: string;
    position: string;
    bio: string;
    image: string;
  };
  onClose: () => void;
  onSave: () => void;
  onDelete?: () => void;
  onChange: (field: string, value: string) => void;
}

const TeamMemberDialog = ({ 
  mode, 
  member, 
  onClose, 
  onSave, 
  onDelete, 
  onChange 
}: TeamMemberDialogProps) => {
  const title = mode === 'add' ? 'Add New Team Member' : 'Edit Team Member';
  const imageInputId = `${mode}-team-image`;

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor={`${mode}-name`}>Name</Label>
          <Input 
            id={`${mode}-name`}
            value={member.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Full Name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${mode}-position`}>Position</Label>
          <Input 
            id={`${mode}-position`}
            value={member.position}
            onChange={(e) => onChange('position', e.target.value)}
            placeholder="Job Title"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${mode}-bio`}>Bio</Label>
          <Textarea 
            id={`${mode}-bio`}
            value={member.bio}
            onChange={(e) => onChange('bio', e.target.value)}
            placeholder="Short biography"
            className="min-h-[100px]"
          />
        </div>
        <div className="space-y-2">
          <Label>Profile Image</Label>
          <div className="border-2 border-dashed rounded-lg p-4 text-center">
            <div className="mx-auto flex flex-col items-center justify-center">
              <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="mb-2 text-sm text-muted-foreground">
                {mode === 'add' ? 'Upload an image' : 'Upload a new image'}
              </p>
              <Input id={imageInputId} type="file" className="hidden" />
              <Button
                variant="outline"
                onClick={() => document.getElementById(imageInputId)?.click()}
                className="mt-2"
              >
                {mode === 'add' ? 'Upload Image' : 'Change Image'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <DialogFooter className="flex justify-between">
        {mode === 'edit' && onDelete && (
          <Button 
            variant="destructive" 
            onClick={onDelete}
          >
            Delete
          </Button>
        )}
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSave} className="bg-utu-red hover:bg-red-700">
            {mode === 'add' ? 'Add Member' : 'Save Changes'}
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

export default TeamMemberDialog;
