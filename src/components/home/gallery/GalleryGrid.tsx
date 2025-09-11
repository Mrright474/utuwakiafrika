
import React, { memo } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

import OptimizedImage from '@/components/ui/optimized-image';
import { Image } from '@/components/home/gallery/types';

interface GalleryGridProps {
  images: Image[];
  onImageClick: (index: number) => void;
}

const GalleryGrid = memo(({ images, onImageClick }: GalleryGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {images.map((image, index) => (
        <div
          key={`${image.src}-${index}`}
          className="cursor-pointer rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 transform hover:scale-[1.02]"
          onClick={() => onImageClick(index)}
        >
          <AspectRatio ratio={4/3} className="bg-utu-cream/20">
            <OptimizedImage
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              quality="medium"
              sizes="(max-width: 768px) 100vw, 50vw"
              fallback={
                <div className="w-full h-full bg-utu-cream/50 flex items-center justify-center">
                  <span className="text-utu-gray text-sm">Image unavailable</span>
                </div>
              }
            />
          </AspectRatio>
          <div className="p-3 bg-white">
            <p className="font-medium text-utu-black">{image.alt}</p>
            <p className="text-sm text-utu-gray">{image.location}</p>
          </div>
        </div>
      ))}
    </div>
  );
});

GalleryGrid.displayName = 'GalleryGrid';

export default GalleryGrid;
