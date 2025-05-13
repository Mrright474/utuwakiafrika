
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
    <section className="py-24 md:py-32 bg-gradient-to-b from-white to-utu-light-gray overflow-hidden">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <p className="text-utu-red font-semibold mb-2">OUR WORK IN ACTION</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-utu-black font-heading">Impact Gallery</h2>
          <div className="w-24 h-1 bg-utu-red mx-auto mb-8"></div>
          <p className="text-xl text-utu-gray">
            Discover the transformative power of our initiatives through these visual stories 
            from communities across Africa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {visibleImages.map((image, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-2xl cursor-pointer animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 aspect-[4/5] shadow-lg"
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() => handleImageClick(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-lg font-semibold mb-2">{image.alt}</p>
                  <div className="flex flex-col space-y-2">
                    <p className="text-white/90 text-sm flex items-center">
                      <Info className="h-4 w-4 mr-2" />
                      {image.location}
                    </p>
                    <p className="text-white/80 text-sm flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {image.date}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleImages.length < galleryImages.length && (
          <div className="mt-14 text-center">
            <Button 
              onClick={handleViewMore} 
              className="bg-transparent hover:bg-utu-red border-2 border-utu-red text-utu-red hover:text-white text-lg py-6 px-10 rounded-full transition-colors duration-300"
            >
              View More Images
            </Button>
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-5xl bg-black/95 text-white border-none p-0 overflow-hidden rounded-2xl">
            {selectedImageIndex !== null && (
              <div className="relative">
                <img
                  src={galleryImages[selectedImageIndex].src}
                  alt={galleryImages[selectedImageIndex].alt}
                  className="w-full max-h-[80vh] object-contain"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-4 right-4 rounded-full bg-black/60 border-none text-white hover:bg-black/80"
                  onClick={() => setIsDialogOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-6">
                  <h3 className="font-bold text-xl">{galleryImages[selectedImageIndex].alt}</h3>
                  <p className="text-base text-gray-300 mt-2">{galleryImages[selectedImageIndex].caption}</p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center text-sm text-gray-400">
                      <Info className="h-4 w-4 mr-2" />
                      {galleryImages[selectedImageIndex].location}
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <Calendar className="h-4 w-4 mr-2" />
                      {galleryImages[selectedImageIndex].date}
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 border-none text-white hover:bg-black/80"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 border-none text-white hover:bg-black/80"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <div className="mt-20 bg-white p-12 rounded-2xl shadow-xl">
          <h3 className="text-2xl font-bold mb-6 text-center text-utu-black">Our Visual Impact Journey</h3>
          <p className="text-utu-gray mb-10 text-center text-lg max-w-4xl mx-auto">
            Since our founding in 2024, we've been dedicated to creating meaningful change across African communities.
            Our visual journey showcases the real impact of our programs and initiatives.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center p-6 rounded-xl hover:bg-utu-light-gray transition-colors duration-300">
              <div className="bg-utu-red/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-10 w-10 text-utu-red" />
              </div>
              <h4 className="font-bold text-xl mb-3">Started in 2024</h4>
              <p className="text-utu-gray">
                Our journey began with a commitment to sustainable development and community empowerment.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl hover:bg-utu-light-gray transition-colors duration-300">
              <div className="bg-utu-red/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <img 
                  src="/lovable-uploads/53460912-2f2a-428b-b6e5-bc12ccf03604.png" 
                  alt="Impact"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <h4 className="font-bold text-xl mb-3">Real Stories</h4>
              <p className="text-utu-gray">
                Each image represents authentic stories of transformation and hope from the communities we serve.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl hover:bg-utu-light-gray transition-colors duration-300">
              <div className="bg-utu-red/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <img 
                  src="/lovable-uploads/969161e6-4a43-456e-8ceb-4578f7e45935.png" 
                  alt="Community"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <h4 className="font-bold text-xl mb-3">Community-Centered</h4>
              <p className="text-utu-gray">
                Our work is driven by the needs and aspirations of the communities we partner with across Africa.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button 
            asChild
            className="bg-utu-red hover:bg-red-700 text-white text-lg py-6 px-10 rounded-full"
          >
            <a href="/impact">Explore Full Impact Report</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VisualGallery;
