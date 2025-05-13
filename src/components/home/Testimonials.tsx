
import React, { useState, useEffect } from 'react';
import { Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  image: string;
}

const Testimonial = ({ quote, name, role }: TestimonialProps) => {
  return (
    <div className="bg-white p-6 rounded-md shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
      <Quote className="h-8 w-8 text-utu-red/20 mb-4" />
      <p className="text-utu-gray mb-6 italic flex-grow">"{quote}"</p>
      <div>
        <h4 className="font-bold text-utu-black">{name}</h4>
        <p className="text-sm text-utu-gray">{role}</p>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const defaultTestimonials = [
    {
      quote: "The educational programs in Kibera have transformed our community. My daughter is the first in our family to attend high school, thanks to Utu Wa Kiafrika's scholarship program.",
      name: "Wangari Muthoni",
      role: "Parent, Kibera, Kenya",
      image: "/lovable-uploads/f18d343d-5225-4a78-9319-ab494bfd2de3.png"
    },
    {
      quote: "As a Masai elder, I've seen how the clean water wells have changed our village. Children are healthier, and women no longer walk for hours to fetch water.",
      name: "Lenkume Konee",
      role: "Community Elder, Masai Mara",
      image: "/lovable-uploads/eccb4f96-1438-49ba-947c-c55ac2356fd0.png"
    },
    {
      quote: "The entrepreneurship training I received in Kibera helped me start my tailoring business. Now I employ four other women from my community, creating a ripple effect.",
      name: "Akinyi Otieno",
      role: "Entrepreneur, Kibera",
      image: "/lovable-uploads/a382b382-f2d2-4832-9343-db9d8abb367d.png"
    }
  ];

  const [testimonials, setTestimonials] = useState<TestimonialProps[]>(defaultTestimonials);
  const [currentSet, setCurrentSet] = useState<number>(0);
  const testimonialsPerView = 3;
  const maxSets = Math.ceil(testimonials.length / testimonialsPerView);

  useEffect(() => {
    // Load testimonials from localStorage if available
    const savedTestimonials = localStorage.getItem('utu-testimonials');
    if (savedTestimonials) {
      try {
        const parsedData = JSON.parse(savedTestimonials);
        setTestimonials(parsedData);
      } catch (error) {
        console.error("Error parsing testimonials data:", error);
        // If there's an error, use the default testimonials
        setTestimonials(defaultTestimonials);
      }
    }
  }, []);

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

  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4 text-utu-black">Voices of Impact</h2>
          <p className="text-utu-gray">
            Hear directly from individuals whose lives have been transformed through our initiatives.
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {currentTestimonials.map((testimonial, index) => (
              <div key={index}>
                <Testimonial
                  quote={testimonial.quote}
                  name={testimonial.name}
                  role={testimonial.role}
                  image={testimonial.image}
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
