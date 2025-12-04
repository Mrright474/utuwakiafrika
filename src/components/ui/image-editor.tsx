import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Button } from './button';
import { Slider } from './slider';
import { Label } from './label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './dialog';
import { Crop as CropIcon, RotateCw, ZoomIn, Check, X, FileDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

interface ImageEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageSrc: string;
  onSave: (blob: Blob) => void;
  aspectRatio?: number;
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

async function getCroppedImg(
  image: HTMLImageElement,
  crop: PixelCrop,
  scale: number = 1,
  rotation: number = 0,
  quality: number = 0.9,
  outputFormat: 'jpeg' | 'png' | 'webp' = 'jpeg',
  maxWidth?: number
): Promise<Blob> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  let outputWidth = Math.floor(crop.width * scaleX);
  let outputHeight = Math.floor(crop.height * scaleY);

  // Apply max width constraint if specified
  if (maxWidth && outputWidth > maxWidth) {
    const ratio = maxWidth / outputWidth;
    outputWidth = maxWidth;
    outputHeight = Math.floor(outputHeight * ratio);
  }

  const pixelRatio = 1;

  canvas.width = outputWidth * pixelRatio;
  canvas.height = outputHeight * pixelRatio;

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = 'high';

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;
  const cropWidth = crop.width * scaleX;
  const cropHeight = crop.height * scaleY;

  // Handle rotation
  if (rotation !== 0) {
    const rotateRads = (rotation * Math.PI) / 180;
    
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) throw new Error('No temp context');

    const sin = Math.abs(Math.sin(rotateRads));
    const cos = Math.abs(Math.cos(rotateRads));
    const newWidth = image.naturalWidth * cos + image.naturalHeight * sin;
    const newHeight = image.naturalWidth * sin + image.naturalHeight * cos;

    tempCanvas.width = newWidth;
    tempCanvas.height = newHeight;

    tempCtx.translate(newWidth / 2, newHeight / 2);
    tempCtx.rotate(rotateRads);
    tempCtx.scale(scale, scale);
    tempCtx.drawImage(
      image,
      -image.naturalWidth / 2,
      -image.naturalHeight / 2
    );

    ctx.drawImage(
      tempCanvas,
      cropX + (newWidth - image.naturalWidth) / 2,
      cropY + (newHeight - image.naturalHeight) / 2,
      cropWidth,
      cropHeight,
      0,
      0,
      outputWidth,
      outputHeight
    );
  } else {
    ctx.drawImage(
      image,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      outputWidth,
      outputHeight
    );
  }

  const mimeType = `image/${outputFormat}`;

  return new Promise((resolve, reject) => {
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
  });
}

const MAX_WIDTH_OPTIONS = [
  { value: '0', label: 'Original' },
  { value: '1920', label: '1920px (Full HD)' },
  { value: '1280', label: '1280px (HD)' },
  { value: '800', label: '800px (Web)' },
  { value: '400', label: '400px (Thumbnail)' },
];

export function ImageEditor({
  open,
  onOpenChange,
  imageSrc,
  onSave,
  aspectRatio,
}: ImageEditorProps) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [quality, setQuality] = useState(0.85);
  const [outputFormat, setOutputFormat] = useState<'jpeg' | 'png' | 'webp'>('jpeg');
  const [maxWidth, setMaxWidth] = useState<number>(1280);
  const [estimatedSize, setEstimatedSize] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget;
      const newCrop = aspectRatio
        ? centerAspectCrop(width, height, aspectRatio)
        : {
            unit: '%' as const,
            x: 5,
            y: 5,
            width: 90,
            height: 90,
          };
      setCrop(newCrop);
    },
    [aspectRatio]
  );

  // Estimate file size when settings change
  useEffect(() => {
    const estimateSize = async () => {
      if (!imgRef.current || !completedCrop) {
        setEstimatedSize('');
        return;
      }

      try {
        const blob = await getCroppedImg(
          imgRef.current,
          completedCrop,
          scale,
          rotation,
          quality,
          outputFormat,
          maxWidth || undefined
        );
        setEstimatedSize(formatFileSize(blob.size));
      } catch {
        setEstimatedSize('');
      }
    };

    const debounce = setTimeout(estimateSize, 300);
    return () => clearTimeout(debounce);
  }, [completedCrop, scale, rotation, quality, outputFormat, maxWidth]);

  const handleSave = async () => {
    if (!imgRef.current || !completedCrop) return;

    setIsProcessing(true);
    try {
      const blob = await getCroppedImg(
        imgRef.current,
        completedCrop,
        scale,
        rotation,
        quality,
        outputFormat,
        maxWidth || undefined
      );
      onSave(blob);
      onOpenChange(false);
    } catch (error) {
      console.error('Error cropping image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const resetEdits = () => {
    setScale(1);
    setRotation(0);
    setQuality(0.85);
    setOutputFormat('jpeg');
    setMaxWidth(1280);
    if (imgRef.current) {
      const { width, height } = imgRef.current;
      const newCrop = aspectRatio
        ? centerAspectCrop(width, height, aspectRatio)
        : {
            unit: '%' as const,
            x: 5,
            y: 5,
            width: 90,
            height: 90,
          };
      setCrop(newCrop);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CropIcon className="h-5 w-5" />
            Edit Image
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Crop area */}
          <div className="flex justify-center bg-muted/50 rounded-lg p-4 overflow-hidden">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspectRatio}
              className="max-h-[350px]"
            >
              <img
                ref={imgRef}
                src={imageSrc}
                alt="Edit"
                style={{
                  transform: `scale(${scale}) rotate(${rotation}deg)`,
                  maxHeight: '350px',
                  width: 'auto',
                }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Zoom control */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm">
                <ZoomIn className="h-4 w-4" />
                Zoom: {Math.round(scale * 100)}%
              </Label>
              <Slider
                value={[scale]}
                min={0.5}
                max={3}
                step={0.1}
                onValueChange={([value]) => setScale(value)}
              />
            </div>

            {/* Rotation control */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm">
                <RotateCw className="h-4 w-4" />
                Rotation: {rotation}°
              </Label>
              <div className="flex gap-2">
                <Slider
                  value={[rotation]}
                  min={0}
                  max={360}
                  step={1}
                  onValueChange={([value]) => setRotation(value)}
                  className="flex-1"
                />
                <Button variant="outline" size="sm" onClick={handleRotate}>
                  +90°
                </Button>
              </div>
            </div>
          </div>

          {/* Compression settings */}
          <div className="border-t pt-4">
            <Label className="flex items-center gap-2 text-sm font-medium mb-3">
              <FileDown className="h-4 w-4" />
              Compression Settings
              {estimatedSize && (
                <span className="ml-auto text-xs font-normal bg-primary/10 text-primary px-2 py-1 rounded">
                  Est. size: {estimatedSize}
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

          {/* Quick actions */}
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={resetEdits}>
              Reset All
            </Button>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isProcessing || !completedCrop}>
            <Check className="h-4 w-4 mr-2" />
            {isProcessing ? 'Processing...' : 'Apply Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
