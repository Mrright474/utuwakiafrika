
import React, { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import GalleryGrid from '@/components/home/gallery/GalleryGrid';
import ImageViewer from '@/components/home/gallery/ImageViewer';
import { galleryImages } from '@/components/home/gallery/galleryData';

const VisualGallery = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [visibleImages] = useState(galleryImages);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsDialogOpen(true);
  };

  const handleNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length);
    }
  };

  const handlePrevious = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4 text-utu-black">Our Work in Action</h2>
          <p className="text-utu-gray">
            Explore visual stories of our initiatives creating positive change across communities in Africa.
            <span className="block mt-2 text-sm italic">*Images created with AI to protect privacy while representing our work</span>
          </p>
        </div>

        <GalleryGrid 
          images={visibleImages} 
          onImageClick={handleImageClick} 
        />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          {selectedImageIndex !== null && (
            <ImageViewer
              images={galleryImages}
              currentIndex={selectedImageIndex}
              onClose={handleCloseDialog}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          )}
        </Dialog>

        <div className="mt-12 text-center">
          <Button 
            asChild
            className="bg-utu-red hover:bg-red-700 text-white px-6 py-2 rounded-md"
          >
            <a href="/impact">View Our Full Impact Report</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VisualGallery;
