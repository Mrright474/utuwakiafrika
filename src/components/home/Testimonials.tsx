
import React, { useEffect, useState } from 'react';
import { Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  image: string;
}

const Testimonial = ({ quote, name, role, image }: TestimonialProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <Quote className="h-10 w-10 text-utu-red/30 mb-4" />
      <p className="text-utu-gray mb-6 italic flex-grow">"{quote}"</p>
      <div className="flex items-center mt-auto">
        <img 
          src={image} 
          alt={name}
          className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-utu-red"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
        <div>
          <h4 className="font-bold text-utu-black">{name}</h4>
          <p className="text-sm text-utu-gray">{role}</p>
        </div>
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
    },
    {
      quote: "Thanks to the medical outreach program, my children received vaccinations and health check-ups for the first time. The impact on our community's health has been immense.",
      name: "Joseph Okoth",
      role: "Father of three, Rural Uganda",
      image: "/lovable-uploads/6cc22289-337a-4964-ab0f-4058feb43e63.png"
    },
    {
      quote: "The agricultural training provided by Utu Wa Kiafrika has helped us increase our crop yields by 40%. Now we can feed our families and sell surplus at the market.",
      name: "Grace Nyambura",
      role: "Farmer, Tanzania",
      image: "/lovable-uploads/da74094e-d355-4e7f-bda9-811435437ab1.png"
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
    <section id="testimonials" className="py-16 bg-gradient-to-b from-utu-light-gray to-white animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-utu-black font-heading">Voices of Impact</h2>
          <div className="w-20 h-1 bg-utu-red mx-auto mb-6"></div>
          <p className="text-lg text-utu-gray">
            Hear from individuals whose lives have been transformed through our programs and initiatives in communities across Africa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {currentTestimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="opacity-0 translate-y-10 animate-on-scroll" 
              style={{ animationDelay: `${index * 200}ms` }}
            >
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
          <div className="flex justify-center space-x-4 mt-8">
            <Button 
              variant="outline" 
              className="border-utu-red text-utu-red hover:bg-utu-red hover:text-white"
              onClick={handlePrevious}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <div className="flex space-x-2">
              {Array.from({ length: maxSets }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSet(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentSet ? 'bg-utu-red' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial set ${index + 1}`}
                />
              ))}
            </div>
            <Button 
              variant="outline" 
              className="border-utu-red text-utu-red hover:bg-utu-red hover:text-white"
              onClick={handleNext}
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
