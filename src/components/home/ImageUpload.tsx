
import React, { useRef } from 'react';
import { UploadCloud, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImageUploadProps {
  mode: 'add' | 'edit';
  currentImage?: string;
  onImageSelect: (file: File) => void;
  onImageRemove?: () => void;
  isUploading?: boolean;
}

const ImageUpload = ({ mode, currentImage, onImageSelect, onImageRemove, isUploading }: ImageUploadProps) => {
  const imageInputId = `${mode}-image-upload`;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  return (
    <div className="space-y-2">
      <Label>Image</Label>
      <div className="border-2 border-dashed rounded-lg p-4 text-center">
        {currentImage ? (
          <div className="relative">
            <img 
              src={currentImage} 
              alt="Preview" 
              className="mx-auto max-h-48 rounded-lg object-cover"
            />
            {onImageRemove && (
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={onImageRemove}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ) : (
          <div className="mx-auto flex flex-col items-center justify-center">
            <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="mb-2 text-sm text-muted-foreground">
              {mode === 'add' ? 'Upload an image' : 'Upload a new image'}
            </p>
          </div>
        )}
        <Input 
          ref={fileInputRef}
          id={imageInputId} 
          type="file" 
          className="hidden" 
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
          onChange={handleFileChange}
        />
        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="mt-2"
          disabled={isUploading}
        >
          {isUploading ? 'Uploading...' : (currentImage ? 'Change Image' : 'Upload Image')}
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
