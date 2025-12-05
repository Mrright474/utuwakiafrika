import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from './button';
import { Slider } from './slider';
import { Label } from './label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './dialog';
import { FileDown, Check, X, Upload, Trash2, Image } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Progress } from './progress';
import { ScrollArea } from './scroll-area';

interface BatchImageEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: File[];
  onSave: (files: File[]) => void;
}

interface ProcessedImage {
  original: File;
  preview: string;
  processed?: Blob;
  estimatedSize?: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

async function processImage(
  file: File,
  quality: number,
  outputFormat: 'jpeg' | 'png' | 'webp',
  maxWidth: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      
      let width = img.naturalWidth;
      let height = img.naturalHeight;
      
      // Apply max width constraint
      if (maxWidth > 0 && width > maxWidth) {
        const ratio = maxWidth / width;
        width = maxWidth;
        height = Math.floor(height * ratio);
      }
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('No 2d context'));
        return;
      }
      
      canvas.width = width;
      canvas.height = height;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);
      
      const mimeType = `image/${outputFormat}`;
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Canvas is empty'));
          }
        },
        mimeType,
        outputFormat === 'png' ? undefined : quality
      );
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    
    img.src = url;
  });
}

const MAX_WIDTH_OPTIONS = [
  { value: '0', label: 'Original' },
  { value: '1920', label: '1920px (Full HD)' },
  { value: '1280', label: '1280px (HD)' },
  { value: '800', label: '800px (Web)' },
  { value: '400', label: '400px (Thumbnail)' },
];

export function BatchImageEditor({
  open,
  onOpenChange,
  images,
  onSave,
}: BatchImageEditorProps) {
  const [quality, setQuality] = useState(0.85);
  const [outputFormat, setOutputFormat] = useState<'jpeg' | 'png' | 'webp'>('jpeg');
  const [maxWidth, setMaxWidth] = useState<number>(1280);
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalEstimatedSize, setTotalEstimatedSize] = useState<string>('');

  // Initialize processed images when dialog opens
  useEffect(() => {
    if (open && images.length > 0) {
      const initialImages: ProcessedImage[] = images.map((file) => ({
        original: file,
        preview: URL.createObjectURL(file),
      }));
      setProcessedImages(initialImages);
      
      return () => {
        initialImages.forEach((img) => URL.revokeObjectURL(img.preview));
      };
    }
  }, [open, images]);

  // Estimate sizes when settings change
  useEffect(() => {
    const estimateSizes = async () => {
      if (processedImages.length === 0) return;
      
      let totalSize = 0;
      const updated = await Promise.all(
        processedImages.map(async (img) => {
          try {
            const processed = await processImage(
              img.original,
              quality,
              outputFormat,
              maxWidth
            );
            totalSize += processed.size;
            return {
              ...img,
              processed,
              estimatedSize: formatFileSize(processed.size),
            };
          } catch {
            return img;
          }
        })
      );
      
      setProcessedImages(updated);
      setTotalEstimatedSize(formatFileSize(totalSize));
    };

    const debounce = setTimeout(estimateSizes, 500);
    return () => clearTimeout(debounce);
  }, [quality, outputFormat, maxWidth, processedImages.length]);

  const handleRemoveImage = (index: number) => {
    setProcessedImages((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleSave = async () => {
    if (processedImages.length === 0) return;

    setIsProcessing(true);
    setProgress(0);
    
    try {
      const files: File[] = [];
      
      for (let i = 0; i < processedImages.length; i++) {
        const img = processedImages[i];
        const blob = await processImage(
          img.original,
          quality,
          outputFormat,
          maxWidth
        );
        
        const ext = outputFormat === 'png' ? 'png' : outputFormat === 'webp' ? 'webp' : 'jpg';
        const originalName = img.original.name.replace(/\.[^/.]+$/, '');
        const file = new File([blob], `${originalName}.${ext}`, { type: `image/${outputFormat}` });
        files.push(file);
        
        setProgress(Math.round(((i + 1) / processedImages.length) * 100));
      }
      
      onSave(files);
      onOpenChange(false);
    } catch (error) {
      console.error('Error processing images:', error);
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const resetSettings = () => {
    setQuality(0.85);
    setOutputFormat('jpeg');
    setMaxWidth(1280);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Batch Image Processing ({processedImages.length} images)
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Image previews */}
          <div className="border rounded-lg p-3">
            <Label className="text-sm font-medium mb-2 block">Selected Images</Label>
            <ScrollArea className="h-[200px]">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {processedImages.map((img, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                      <img
                        src={img.preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {img.estimatedSize && (
                      <div className="absolute bottom-1 left-1 right-1 text-xs text-center bg-black/70 text-white rounded px-1 py-0.5">
                        {img.estimatedSize}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Compression settings */}
          <div className="border-t pt-4">
            <Label className="flex items-center gap-2 text-sm font-medium mb-3">
              <FileDown className="h-4 w-4" />
              Compression Settings (Applied to All)
              {totalEstimatedSize && (
                <span className="ml-auto text-xs font-normal bg-primary/10 text-primary px-2 py-1 rounded">
                  Total est. size: {totalEstimatedSize}
                </span>
              )}
            </Label>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Quality slider */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">
                  Quality: {Math.round(quality * 100)}%
                </Label>
                <Slider
                  value={[quality]}
                  min={0.1}
                  max={1}
                  step={0.05}
                  onValueChange={([value]) => setQuality(value)}
                  disabled={outputFormat === 'png'}
                />
              </div>

              {/* Max width */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Max Width</Label>
                <Select
                  value={maxWidth.toString()}
                  onValueChange={(v) => setMaxWidth(parseInt(v))}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MAX_WIDTH_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Format */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Format</Label>
                <Select
                  value={outputFormat}
                  onValueChange={(v) => setOutputFormat(v as 'jpeg' | 'png' | 'webp')}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jpeg">JPEG (smaller)</SelectItem>
                    <SelectItem value="webp">WebP (best)</SelectItem>
                    <SelectItem value="png">PNG (lossless)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          {isProcessing && (
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">
                Processing... {progress}%
              </Label>
              <Progress value={progress} />
            </div>
          )}

          {/* Quick actions */}
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={resetSettings}>
              Reset Settings
            </Button>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isProcessing}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isProcessing || processedImages.length === 0}>
            <Check className="h-4 w-4 mr-2" />
            {isProcessing ? 'Processing...' : `Process ${processedImages.length} Images`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
