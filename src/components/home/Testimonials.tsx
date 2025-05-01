
import React, { useEffect, useState } from 'react';
import { Quote } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  image: string;
}

const Testimonial = ({ quote, name, role, image }: TestimonialProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <Quote className="h-10 w-10 text-utu-red/30 mb-4" />
      <p className="text-utu-gray mb-6 italic">"{quote}"</p>
      <div className="flex items-center">
        <img 
          src={image} 
          alt={name}
          className="w-12 h-12 rounded-full object-cover mr-4"
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
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&auto=format&fit=crop"
    },
    {
      quote: "As a Masai elder, I've seen how the clean water wells have changed our village. Children are healthier, and women no longer walk for hours to fetch water.",
      name: "Lenkume Konee",
      role: "Community Elder, Masai Mara",
      image: "https://images.unsplash.com/photo-1586657463815-2ceec4d2f4e3?q=80&w=200&auto=format&fit=crop"
    },
    {
      quote: "The entrepreneurship training I received in Kibera helped me start my tailoring business. Now I employ four other women from my community, creating a ripple effect.",
      name: "Akinyi Otieno",
      role: "Entrepreneur, Kibera",
      image: "https://images.unsplash.com/photo-1531123414780-f74242c2b052?q=80&w=200&auto=format&fit=crop"
    }
  ];

  const [testimonials, setTestimonials] = useState<TestimonialProps[]>(defaultTestimonials);

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

  return (
    <section className="py-16 bg-gradient-to-b from-utu-light-gray to-white animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-utu-black font-heading">Testimonials</h2>
          <div className="w-20 h-1 bg-utu-red mx-auto mb-6"></div>
          <p className="text-lg text-utu-gray">
            Hear from individuals whose lives have been transformed through our programs and initiatives in communities like Kibera and Masai Mara.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              role={testimonial.role}
              image={testimonial.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
