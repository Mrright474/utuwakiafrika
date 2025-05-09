
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Info, Calendar } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

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
  },
  {
    src: "/lovable-uploads/53460912-2f2a-428b-b6e5-bc12ccf03604.png",
    alt: "Healthcare initiative",
    caption: "Mobile clinic providing essential healthcare services",
    location: "Rural Uganda",
    date: "March 2024"
  },
  {
    src: "/lovable-uploads/c520e25e-9088-4335-9397-90370407dd62.png",
    alt: "Water project",
    caption: "Clean water well inauguration in a rural village",
    location: "Western Kenya",
    date: "February 2024"
  },
  {
    src: "/lovable-uploads/ed5bbc34-0ff2-46df-8898-3ee804b9d1ce.png",
    alt: "New school building",
    caption: "New school facility opening ceremony",
    location: "Ethiopia",
    date: "April 2024"
  },
  {
    src: "/lovable-uploads/f90b8fff-8fac-4c94-8b28-10ed3702cc33.png",
    alt: "Agricultural program",
    caption: "Sustainable farming techniques workshop",
    location: "Rural Rwanda",
    date: "March 2024"
  },
];

const VisualGallery = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [visibleImages, setVisibleImages] = useState<Image[]>([]);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  useEffect(() => {
    // Start with first 4 images
    setVisibleImages(galleryImages.slice(0, 4));
    
    // Set a timeout to consider all images loaded after 2 seconds
    const timer = setTimeout(() => {
      setAllImagesLoaded(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

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

  const handleViewMore = () => {
    setVisibleImages(galleryImages);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-utu-light-gray to-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-utu-black font-heading">Our Impact Gallery</h2>
          <div className="w-20 h-1 bg-utu-red mx-auto mb-6"></div>
          <p className="text-lg text-utu-gray">
            Witness our journey through these visual stories from communities across Africa.
            Each image represents lives touched and communities transformed since our inception in 2024.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {visibleImages.map((image, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg cursor-pointer animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 aspect-square"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleImageClick(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p className="text-white text-sm font-semibold">{image.alt}</p>
                <p className="text-white/80 text-xs flex items-center mt-1">
                  <Info className="h-3 w-3 mr-1" />
                  {image.location}
                </p>
                <p className="text-white/70 text-xs flex items-center mt-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  {image.date}
                </p>
              </div>
            </div>
          ))}
        </div>

        {visibleImages.length < galleryImages.length && (
          <div className="mt-8 text-center">
            <Button 
              onClick={handleViewMore} 
              variant="outline"
              className="border-utu-red text-utu-red hover:bg-utu-red hover:text-white"
            >
              View More Images
            </Button>
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-5xl bg-black/95 text-white border-none p-0 overflow-hidden">
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
                  <h3 className="font-bold text-lg">{galleryImages[selectedImageIndex].alt}</h3>
                  <p className="text-sm text-gray-300">{galleryImages[selectedImageIndex].caption}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center text-xs text-gray-400">
                      <Info className="h-4 w-4 mr-1" />
                      {galleryImages[selectedImageIndex].location}
                    </div>
                    <div className="flex items-center text-xs text-gray-400">
                      <Calendar className="h-4 w-4 mr-1" />
                      {galleryImages[selectedImageIndex].date}
                    </div>
                  </div>
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

        <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4 text-center text-utu-black">Our Visual Impact Journey</h3>
          <p className="text-utu-gray mb-6 text-center">
            Since our founding in 2024, we've been dedicated to creating meaningful change across African communities.
            Our visual journey showcases the real impact of our programs and initiatives.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="bg-utu-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-utu-red" />
              </div>
              <h4 className="font-semibold mb-2">Started in 2024</h4>
              <p className="text-sm text-utu-gray">
                Our journey began with a commitment to sustainable development and community empowerment.
              </p>
            </div>
            <div className="text-center p-4">
              <div className="bg-utu-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <img 
                  src="/lovable-uploads/53460912-2f2a-428b-b6e5-bc12ccf03604.png" 
                  alt="Impact"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
              <h4 className="font-semibold mb-2">Real Stories</h4>
              <p className="text-sm text-utu-gray">
                Each image represents authentic stories of transformation and hope from the communities we serve.
              </p>
            </div>
            <div className="text-center p-4">
              <div className="bg-utu-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <img 
                  src="/lovable-uploads/969161e6-4a43-456e-8ceb-4578f7e45935.png" 
                  alt="Community"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
              <h4 className="font-semibold mb-2">Community-Centered</h4>
              <p className="text-sm text-utu-gray">
                Our work is driven by the needs and aspirations of the communities we partner with across Africa.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button 
            asChild
            className="bg-utu-red hover:bg-red-700 text-white"
          >
            <a href="/impact">Explore Our Full Impact</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VisualGallery;
