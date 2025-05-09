
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface Image {
  src: string;
  alt: string;
  caption?: string;
}

const galleryImages: Image[] = [
  {
    src: "/lovable-uploads/b07d8f50-577a-4699-87ba-8759e7ace688.png",
    alt: "Education program",
    caption: "Students at our sponsored school in Uganda"
  },
  {
    src: "/lovable-uploads/969161e6-4a43-456e-8ceb-4578f7e45935.png",
    alt: "Community work",
    caption: "Community engagement session in Kenya"
  },
  {
    src: "/lovable-uploads/7e1302ab-dabd-404d-b089-b1c7bdf0e631.png",
    alt: "African children",
    caption: "Children participating in our education program"
  },
  {
    src: "/lovable-uploads/6e61272d-7786-4ccc-950e-4ae86bc5f39d.png",
    alt: "School classroom",
    caption: "Newly renovated classroom in Tanzania"
  },
  {
    src: "/lovable-uploads/53460912-2f2a-428b-b6e5-bc12ccf03604.png",
    alt: "Healthcare initiative",
    caption: "Mobile clinic providing essential healthcare services"
  },
  {
    src: "/lovable-uploads/c520e25e-9088-4335-9397-90370407dd62.png",
    alt: "Water project",
    caption: "Clean water well inauguration in a rural village"
  },
  {
    src: "/lovable-uploads/f18d343d-5225-4a78-9319-ab494bfd2de3.png",
    alt: "Community member",
    caption: "Local community leader sharing success stories"
  },
  {
    src: "/lovable-uploads/eccb4f96-1438-49ba-947c-c55ac2356fd0.png",
    alt: "Elder community member",
    caption: "Elder sharing traditional knowledge with youth"
  },
];

const VisualGallery = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    <section className="py-16 md:py-24 bg-utu-light-gray">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-utu-black font-heading">Visual Impact</h2>
          <div className="w-20 h-1 bg-utu-red mx-auto mb-6"></div>
          <p className="text-lg text-utu-gray">
            Explore our journey through these visual stories from various communities we serve across Africa.
            Each image represents lives touched and communities transformed.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg cursor-pointer animate-on-scroll opacity-0 translate-y-10 transition-all duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleImageClick(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-sm">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl bg-black/95 text-white border-none p-0 overflow-hidden" closeButton={false}>
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
                  className="absolute top-4 right-4 rounded-full bg-black/50 border-none text-white hover:bg-black/70"
                  onClick={() => setIsDialogOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
                  <p className="font-bold">{galleryImages[selectedImageIndex].alt}</p>
                  <p className="text-sm text-gray-300">{galleryImages[selectedImageIndex].caption}</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 border-none text-white hover:bg-black/70"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 border-none text-white hover:bg-black/70"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <div className="mt-12 text-center">
          <Button className="bg-utu-red hover:bg-red-700 text-white">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VisualGallery;
