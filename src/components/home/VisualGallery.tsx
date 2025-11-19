
import React, { useState, memo, useCallback, useMemo } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TouchButton } from '@/components/ui/touch-button';
import GalleryGrid from '@/components/home/gallery/GalleryGrid';
import SwipeGallery from '@/components/ui/swipe-gallery';
import ImageViewer from '@/components/home/gallery/ImageViewer';
import { useGalleryManagement } from '@/hooks/useGalleryManagement';
import { useIsMobile } from '@/hooks/use-mobile';
import SkeletonLoader from '@/components/ui/skeleton-loader';
import { Image } from '@/components/home/gallery/types';
import { Badge } from '@/components/ui/badge';

const VisualGallery = memo(() => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { images: galleryData, loading: isLoading } = useGalleryManagement();
  const isMobile = useIsMobile();

  // Extract unique categories
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    galleryData.forEach(image => {
      if (image.category) {
        uniqueCategories.add(image.category);
      }
    });
    return Array.from(uniqueCategories).sort();
  }, [galleryData]);

  // Map Supabase data to component format and filter by category
  const visibleImages = useMemo<Image[]>(() => {
    const filteredData = selectedCategory
      ? galleryData.filter(image => image.category === selectedCategory)
      : galleryData;

    return filteredData.map(image => ({
      src: image.image_url,
      alt: image.title,
      caption: image.description || undefined,
      location: image.category || undefined,
    }));
  }, [galleryData, selectedCategory]);

  const handleImageClick = useCallback((index: number) => {
    setSelectedImageIndex(index);
    setIsDialogOpen(true);
  }, []);

  const handleNext = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % visibleImages.length);
    }
  }, [selectedImageIndex, visibleImages.length]);

  const handlePrevious = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + visibleImages.length) % visibleImages.length);
    }
  }, [selectedImageIndex, visibleImages.length]);

  const handleCloseDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-3xl font-bold mb-4 text-utu-black">Our Work in Action</h2>
          <p className="text-utu-gray">
            Explore visual stories of our initiatives creating positive change across communities in Africa.
          </p>
        </div>

        {/* Category Filters */}
        {!isLoading && categories.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <Badge
              variant={selectedCategory === null ? "default" : "outline"}
              className="cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105"
              onClick={() => setSelectedCategory(null)}
            >
              All ({galleryData.length})
            </Badge>
            {categories.map((category) => {
              const count = galleryData.filter(img => img.category === category).length;
              return (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category} ({count})
                </Badge>
              );
            })}
          </div>
        )}

        {isLoading ? (
          <SkeletonLoader variant="gallery" count={6} />
        ) : visibleImages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-utu-gray">No images found in this category.</p>
          </div>
        ) : (
          <GalleryGrid 
            images={visibleImages} 
            onImageClick={handleImageClick} 
          />
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          {selectedImageIndex !== null && (
            <>
              {isMobile ? (
                <SwipeGallery
                  images={visibleImages.map(img => ({
                    src: img.src,
                    alt: img.alt,
                    caption: img.caption || img.alt
                  }))}
                  currentIndex={selectedImageIndex}
                  onClose={handleCloseDialog}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                />
              ) : (
                <ImageViewer
                  images={visibleImages}
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
