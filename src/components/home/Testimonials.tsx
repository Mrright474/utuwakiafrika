
import React, { useState } from 'react';
import { Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useTestimonialsManagement } from '@/hooks/useTestimonialsManagement';

interface TestimonialProps {
  quote: string;
  name: string;
  role: string | null;
  image_url: string | null;
}

const Testimonial = ({ quote, name, role }: TestimonialProps) => {
  return (
    <div className="bg-white p-6 rounded-md shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
      <Quote className="h-8 w-8 text-utu-red/20 mb-4" />
      <p className="text-utu-gray mb-6 italic flex-grow">"{quote}"</p>
      <div>
        <h4 className="font-bold text-utu-black">{name}</h4>
        {role && <p className="text-sm text-utu-gray">{role}</p>}
      </div>
    </div>
  );
};

const Testimonials = () => {
  const { testimonials, loading } = useTestimonialsManagement();
  const [currentSet, setCurrentSet] = useState<number>(0);
  const testimonialsPerView = 3;
  const maxSets = Math.ceil(testimonials.length / testimonialsPerView);

  const handleNext = () => {
    setCurrentSet((prev) => (prev + 1) % maxSets);
  };

  const handlePrevious = () => {
    setCurrentSet((prev) => (prev - 1 + maxSets) % maxSets);
  };

  const currentTestimonials = testimonials.slice(
    currentSet * testimonialsPerView,
    (currentSet + 1) * testimonialsPerView
  );

  if (loading) {
    return (
      <section id="testimonials" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-md shadow-sm">
                <Skeleton className="h-8 w-8 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-6" />
                <Skeleton className="h-5 w-32 mb-1" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4 text-utu-black">Voices of Impact</h2>
          <p className="text-utu-gray">
            Hear directly from individuals whose lives have been transformed through our initiatives.
          </p>
        </div>

        {testimonials.length === 0 ? (
          <div className="text-center text-utu-gray">
            <p>No testimonials available yet.</p>
          </div>
        ) : (
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {currentTestimonials.map((testimonial) => (
                <div key={testimonial.id}>
                  <Testimonial
                    quote={testimonial.quote}
                    name={testimonial.name}
                    role={testimonial.role}
                    image_url={testimonial.image_url}
                  />
                </div>
              ))}
            </div>

            {testimonials.length > testimonialsPerView && (
              <div className="flex justify-center items-center space-x-4 mt-8">
                <Button 
                  variant="outline" 
                  className="p-2 rounded-full"
                  onClick={handlePrevious}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className="flex space-x-2">
                  {Array.from({ length: maxSets }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSet(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSet ? 'bg-utu-red' : 'bg-gray-300'
                      }`}
                      aria-label={`Go to testimonial set ${index + 1}`}
                    />
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="p-2 rounded-full"
                  onClick={handleNext}
                >
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        )}

        <div className="mt-16 text-center">
          <Button 
            className="bg-utu-red hover:bg-red-700 text-white px-6 py-2 rounded-md"
          >
            Submit Your Testimonial
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
