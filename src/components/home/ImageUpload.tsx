
import React from 'react';
import { UploadCloud } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImageUploadProps {
  mode: 'add' | 'edit';
}

const ImageUpload = ({ mode }: ImageUploadProps) => {
  const imageInputId = `${mode}-team-image`;

  return (
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
  );
};

export default ImageUpload;
