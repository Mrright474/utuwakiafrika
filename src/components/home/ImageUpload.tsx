import React, { useRef, useState } from 'react';
import { UploadCloud, X, Crop } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageEditor } from "@/components/ui/image-editor";

interface ImageUploadProps {
  mode: 'add' | 'edit';
  currentImage?: string;
  onImageSelect: (file: File) => void;
  onImageRemove?: () => void;
  isUploading?: boolean;
  aspectRatio?: number;
}

const ImageUpload = ({ 
  mode, 
  currentImage, 
  onImageSelect, 
  onImageRemove, 
  isUploading,
  aspectRatio 
}: ImageUploadProps) => {
  const imageInputId = `${mode}-image-upload`;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a temporary URL for the editor
      const url = URL.createObjectURL(file);
      setTempImageSrc(url);
      setEditorOpen(true);
    }
    // Reset the input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEditorSave = (blob: Blob) => {
    // Convert blob to File
    const file = new File([blob], 'edited-image.jpg', { type: 'image/jpeg' });
    onImageSelect(file);
    
    // Clean up temporary URL
    if (tempImageSrc) {
      URL.revokeObjectURL(tempImageSrc);
      setTempImageSrc('');
    }
  };

  const handleEditorClose = (open: boolean) => {
    setEditorOpen(open);
    if (!open && tempImageSrc) {
      URL.revokeObjectURL(tempImageSrc);
      setTempImageSrc('');
    }
  };

  const handleEditCurrentImage = () => {
    if (currentImage) {
      setTempImageSrc(currentImage);
      setEditorOpen(true);
    }
  };

  return (
    <>
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
              <div className="absolute top-2 right-2 flex gap-1">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleEditCurrentImage}
                  title="Crop & Edit"
                >
                  <Crop className="h-4 w-4" />
                </Button>
                {onImageRemove && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={onImageRemove}
                    title="Remove"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="mx-auto flex flex-col items-center justify-center">
              <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="mb-2 text-sm text-muted-foreground">
                {mode === 'add' ? 'Upload an image' : 'Upload a new image'}
              </p>
              <p className="text-xs text-muted-foreground/70">
                Images will be cropped & resized before upload
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

      {/* Image Editor Dialog */}
      <ImageEditor
        open={editorOpen}
        onOpenChange={handleEditorClose}
        imageSrc={tempImageSrc}
        onSave={handleEditorSave}
        aspectRatio={aspectRatio}
      />
    </>
  );
};

export default ImageUpload;
