
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Image } from '@/components/home/gallery/types';

interface GalleryGridProps {
  images: Image[];
  onImageClick: (index: number) => void;
}

const GalleryGrid = ({ images, onImageClick }: GalleryGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {images.map((image, index) => (
        <div
          key={index}
          className="cursor-pointer rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          onClick={() => onImageClick(index)}
        >
          <AspectRatio ratio={4/3} className="bg-muted">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </AspectRatio>
          <div className="p-3 bg-white">
            <p className="font-medium">{image.alt}</p>
            <p className="text-sm text-utu-gray">{image.location}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
