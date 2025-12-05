import React, { useRef, useState } from 'react';
import { UploadCloud, Images } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BatchImageEditor } from "@/components/ui/batch-image-editor";

interface BatchImageUploadProps {
  onImagesSelect: (files: File[]) => void;
  isUploading?: boolean;
  maxFiles?: number;
}

const BatchImageUpload = ({ 
  onImagesSelect, 
  isUploading,
  maxFiles = 20
}: BatchImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const limitedFiles = files.slice(0, maxFiles);
      setSelectedFiles(limitedFiles);
      setEditorOpen(true);
    }
    // Reset the input so the same files can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEditorSave = (processedFiles: File[]) => {
    onImagesSelect(processedFiles);
    setSelectedFiles([]);
  };

  const handleEditorClose = (open: boolean) => {
    setEditorOpen(open);
    if (!open) {
      setSelectedFiles([]);
    }
  };

  return (
    <>
      <div className="space-y-2">
        <Label>Batch Image Upload</Label>
        <div className="border-2 border-dashed rounded-lg p-6 text-center">
          <div className="mx-auto flex flex-col items-center justify-center">
            <Images className="h-12 w-12 text-muted-foreground mb-3" />
            <p className="mb-2 text-sm font-medium">
              Upload multiple images at once
            </p>
            <p className="text-xs text-muted-foreground mb-3">
              Same compression settings applied to all images (max {maxFiles} files)
            </p>
          </div>
          <Input 
            ref={fileInputRef}
            type="file" 
            className="hidden" 
            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
            onChange={handleFileChange}
            multiple
          />
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            <UploadCloud className="h-4 w-4 mr-2" />
            {isUploading ? 'Uploading...' : 'Select Images'}
          </Button>
        </div>
      </div>

      {/* Batch Image Editor Dialog */}
      <BatchImageEditor
        open={editorOpen}
        onOpenChange={handleEditorClose}
        images={selectedFiles}
        onSave={handleEditorSave}
      />
    </>
  );
};

export default BatchImageUpload;
