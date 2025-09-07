
import React, { useState, memo, useCallback } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TouchButton } from '@/components/ui/touch-button';
import GalleryGrid from '@/components/home/gallery/GalleryGrid';
import SwipeGallery from '@/components/ui/swipe-gallery';
import ImageViewer from '@/components/home/gallery/ImageViewer';
import { galleryImages } from '@/components/home/gallery/galleryData';
import { useIsMobile } from '@/hooks/use-mobile';

const VisualGallery = memo(() => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [visibleImages] = useState(galleryImages);
  const isMobile = useIsMobile();

  const handleImageClick = useCallback((index: number) => {
    setSelectedImageIndex(index);
    setIsDialogOpen(true);
  }, []);

  const handleNext = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length);
    }
  }, [selectedImageIndex]);

  const handlePrevious = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  }, [selectedImageIndex]);

  const handleCloseDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4 text-utu-black">Our Work in Action</h2>
          <p className="text-utu-gray">
            Explore visual stories of our initiatives creating positive change across communities in Africa.
          </p>
        </div>

        <GalleryGrid 
          images={visibleImages} 
          onImageClick={handleImageClick} 
        />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          {selectedImageIndex !== null && (
            <>
              {isMobile ? (
                <SwipeGallery
                  images={galleryImages.map(img => ({
                    src: img.src,
                    alt: img.alt,
                    caption: img.alt
                  }))}
                  currentIndex={selectedImageIndex}
                  onClose={handleCloseDialog}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                />
              ) : (
                <ImageViewer
                  images={galleryImages}
                  currentIndex={selectedImageIndex}
                  onClose={handleCloseDialog}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                />
              )}
            </>
          )}
        </Dialog>

        <div className="mt-12 text-center">
          <TouchButton 
            asChild
            size={isMobile ? "touch-lg" : "default"}
            className="bg-utu-red hover:bg-red-700 text-white px-6 py-2 rounded-md"
          >
            <a href="/impact">View Our Full Impact Report</a>
          </TouchButton>
        </div>
      </div>
    </section>
  );
});

VisualGallery.displayName = 'VisualGallery';

export default VisualGallery;
