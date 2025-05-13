
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Info, Calendar } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface Image {
  src: string;
  alt: string;
  caption?: string;
  location?: string;
  date?: string;
}

const galleryImages: Image[] = [
  {
    src: "/lovable-uploads/b07d8f50-577a-4699-87ba-8759e7ace688.png",
    alt: "Education program",
    caption: "Students at our sponsored school in Uganda",
    location: "Kampala, Uganda",
    date: "March 2024"
  },
  {
    src: "/lovable-uploads/969161e6-4a43-456e-8ceb-4578f7e45935.png",
    alt: "Community work",
    caption: "Community engagement session in Kenya",
    location: "Nairobi, Kenya",
    date: "February 2024"
  },
  {
    src: "/lovable-uploads/7e1302ab-dabd-404d-b089-b1c7bdf0e631.png",
    alt: "African children",
    caption: "Children participating in our education program",
    location: "Tanzania",
    date: "April 2024"
  },
  {
    src: "/lovable-uploads/6e61272d-7786-4ccc-950e-4ae86bc5f39d.png",
    alt: "School classroom",
    caption: "Newly renovated classroom in Tanzania",
    location: "Arusha, Tanzania",
    date: "January 2024"
  }
];

const VisualGallery = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [visibleImages, setVisibleImages] = useState<Image[]>(galleryImages);

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

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4 text-utu-black">Our Work in Action</h2>
          <p className="text-utu-gray">
            Discover how our initiatives are creating positive change across communities in Africa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visibleImages.map((image, index) => (
            <div
              key={index}
              className="cursor-pointer rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              onClick={() => handleImageClick(index)}
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

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl bg-white text-utu-black p-0 overflow-hidden rounded-md">
            {selectedImageIndex !== null && (
              <div className="relative">
                <img
                  src={galleryImages[selectedImageIndex].src}
                  alt={galleryImages[selectedImageIndex].alt}
                  className="w-full max-h-[70vh] object-contain"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-2 right-2 rounded-full bg-white/80 border-none"
                  onClick={() => setIsDialogOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
                <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-4">
                  <h3 className="font-bold">{galleryImages[selectedImageIndex].alt}</h3>
                  <p className="text-sm text-gray-600">{galleryImages[selectedImageIndex].caption}</p>
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Info className="h-3 w-3 mr-1" />
                      {galleryImages[selectedImageIndex].location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {galleryImages[selectedImageIndex].date}
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 border-none"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 border-none"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            )}
          </DialogContent>
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
