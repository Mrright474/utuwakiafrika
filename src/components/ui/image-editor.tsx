import React, { useState, useRef, useCallback } from 'react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Button } from './button';
import { Slider } from './slider';
import { Label } from './label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './dialog';
import { Crop as CropIcon, RotateCw, ZoomIn, Check, X } from 'lucide-react';

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

async function getCroppedImg(
  image: HTMLImageElement,
  crop: PixelCrop,
  scale: number = 1,
  rotation: number = 0
): Promise<Blob> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  const pixelRatio = window.devicePixelRatio || 1;

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = 'high';

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const rotateRads = (rotation * Math.PI) / 180;
  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  ctx.save();

  ctx.translate(-cropX, -cropY);
  ctx.translate(centerX, centerY);
  ctx.rotate(rotateRads);
  ctx.scale(scale, scale);
  ctx.translate(-centerX, -centerY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  ctx.restore();

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Canvas is empty'));
        }
      },
      'image/jpeg',
      0.9
    );
  });
}

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

  const handleSave = async () => {
    if (!imgRef.current || !completedCrop) return;

    setIsProcessing(true);
    try {
      const blob = await getCroppedImg(
        imgRef.current,
        completedCrop,
        scale,
        rotation
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
              className="max-h-[400px]"
            >
              <img
                ref={imgRef}
                src={imageSrc}
                alt="Edit"
                style={{
                  transform: `scale(${scale}) rotate(${rotation}deg)`,
                  maxHeight: '400px',
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
              <Label className="flex items-center gap-2">
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
              <Label className="flex items-center gap-2">
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
