
import React from 'react';
import { ChevronLeft, ChevronRight, X, Info, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DialogContent } from '@/components/ui/dialog';
import { Image } from '@/components/home/gallery/types';

interface ImageViewerProps {
  images: Image[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const ImageViewer = ({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrevious
}: ImageViewerProps) => {
  const currentImage = images[currentIndex];

  return (
    <DialogContent className="max-w-3xl bg-white text-utu-black p-0 overflow-hidden rounded-md">
      <div className="relative">
        <img
          src={currentImage.src}
          alt={currentImage.alt || currentImage.caption || 'Utu Wa Kiafrika gallery photograph'}
          loading="lazy"
          decoding="async"
          className="w-full max-h-[70vh] object-contain"
        />
        <Button
          variant="outline"
          size="icon"
          className="absolute top-2 right-2 rounded-full bg-white/80 border-none"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-4">
          <h3 className="font-bold">{currentImage.alt}</h3>
          <p className="text-sm text-gray-600">{currentImage.caption}</p>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <div className="flex items-center">
              <Info className="h-3 w-3 mr-1" />
              {currentImage.location}
            </div>
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {currentImage.date}
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 border-none"
          onClick={onPrevious}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 border-none"
          onClick={onNext}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </DialogContent>
  );
};

export default ImageViewer;
