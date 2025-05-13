
import React, { useEffect, useState } from 'react';
import { Quote, ArrowLeft, ArrowRight, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  image: string;
}

const Testimonial = ({ quote, name, role, image }: TestimonialProps) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <Quote className="h-12 w-12 text-utu-red/20 mb-6" />
      <p className="text-utu-gray text-lg mb-8 italic flex-grow">"{quote}"</p>
      <div className="flex items-center mt-auto">
        <div className="mr-4 relative">
          <img 
            src={image} 
            alt={name}
            className="w-14 h-14 rounded-full object-cover border-2 border-utu-red"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
          <div className="absolute -bottom-2 -right-2 bg-utu-red rounded-full p-1">
            <User className="h-3 w-3 text-white" />
          </div>
        </div>
        <div>
          <h4 className="font-bold text-utu-black text-lg">{name}</h4>
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
    <section id="testimonials" className="py-24 md:py-32 bg-gradient-to-b from-utu-light-gray to-white">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <p className="text-utu-red font-semibold mb-2">TESTIMONIALS</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-utu-black font-heading">Voices of Impact</h2>
          <div className="w-24 h-1 bg-utu-red mx-auto mb-8"></div>
          <p className="text-xl text-utu-gray">
            Hear directly from individuals whose lives have been transformed through our initiatives across Africa.
          </p>
        </div>

        <div className="relative px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
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
            <div className="flex justify-center items-center space-x-6 mt-12">
              <Button 
                variant="outline" 
                className="border-2 border-utu-red text-utu-red hover:bg-utu-red hover:text-white rounded-full p-3"
                onClick={handlePrevious}
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>
              <div className="flex space-x-3">
                {Array.from({ length: maxSets }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSet(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      index === currentSet ? 'bg-utu-red scale-125' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to testimonial set ${index + 1}`}
                  />
                ))}
              </div>
              <Button 
                variant="outline" 
                className="border-2 border-utu-red text-utu-red hover:bg-utu-red hover:text-white rounded-full p-3"
                onClick={handleNext}
              >
                <ArrowRight className="h-6 w-6" />
              </Button>
            </div>
          )}
        </div>

        <div className="mt-24 text-center p-8 md:p-12 bg-gradient-to-r from-utu-red/10 to-utu-red/5 rounded-2xl">
          <h3 className="text-2xl font-bold mb-4">Share Your Story</h3>
          <p className="text-utu-gray mb-8 max-w-2xl mx-auto">
            Have you been impacted by our work? We'd love to hear your story and share it with our community.
            Your testimonial could inspire others to get involved.
          </p>
          <Button 
            className="bg-utu-red hover:bg-red-700 text-white text-lg py-6 px-10 rounded-full"
          >
            Submit Your Testimonial
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
