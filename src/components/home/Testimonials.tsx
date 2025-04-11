
import React from 'react';
import { Quote } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  image: string;
}

const Testimonial = ({ quote, name, role, image }: TestimonialProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Quote className="h-10 w-10 text-utu-red/30 mb-4" />
      <p className="text-utu-gray mb-6 italic">"{quote}"</p>
      <div className="flex items-center">
        <img 
          src={image} 
          alt={name}
          className="w-12 h-12 rounded-full object-cover mr-4" 
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
  const testimonials = [
    {
      quote: "The educational support provided by Utu Wa Kiafrika changed my life. I was able to complete my education and now I'm giving back to my community as a teacher.",
      name: "Grace Muthoni",
      role: "Teacher, Kenya",
      image: "/lovable-uploads/f18d343d-5225-4a78-9319-ab494bfd2de3.png"
    },
    {
      quote: "The clean water project in our village has dramatically reduced waterborne diseases. Children now spend more time in school instead of fetching water from distant sources.",
      name: "Joseph Onyango",
      role: "Community Leader, Tanzania",
      image: "/lovable-uploads/eccb4f96-1438-49ba-947c-c55ac2356fd0.png"
    },
    {
      quote: "The entrepreneurship training and microloan I received helped me start my small business. Now I can provide for my family and employ three people from my community.",
      name: "Amina Mohammed",
      role: "Entrepreneur, Uganda",
      image: "/lovable-uploads/a382b382-f2d2-4832-9343-db9d8abb367d.png"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-utu-light-gray to-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-utu-black font-heading">Testimonials</h2>
          <div className="w-20 h-1 bg-utu-red mx-auto mb-6"></div>
          <p className="text-lg text-utu-gray">
            Hear from individuals whose lives have been transformed through our programs and initiatives.
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
