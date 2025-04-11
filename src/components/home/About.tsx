
import React from 'react';
import { Heart, Award, Users } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-utu-black font-heading">About Utu Wa Kiafrika</h2>
          <div className="w-20 h-1 bg-utu-red mx-auto mb-6"></div>
          <p className="text-lg text-utu-gray">
            Utu Wa Kiafrika Charity Network is a non-profit organization dedicated to providing sustainable
            solutions to challenges facing African communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="bg-utu-light-gray p-8 rounded-lg text-center hover:shadow-lg transition-shadow">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
              <Heart className="h-8 w-8 text-utu-red" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-utu-black">Our Mission</h3>
            <p className="text-utu-gray">
              To empower African communities through sustainable programs and initiatives that promote self-reliance,
              education, healthcare, and economic development.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-utu-light-gray p-8 rounded-lg text-center hover:shadow-lg transition-shadow">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
              <Award className="h-8 w-8 text-utu-red" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-utu-black">Our Vision</h3>
            <p className="text-utu-gray">
              A prosperous Africa where every individual has access to basic needs, quality education,
              healthcare, and economic opportunities to lead a dignified life.
            </p>
          </div>

          {/* Values */}
          <div className="bg-utu-light-gray p-8 rounded-lg text-center hover:shadow-lg transition-shadow">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
              <Users className="h-8 w-8 text-utu-red" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-utu-black">Our Values</h3>
            <p className="text-utu-gray">
              Integrity, transparency, compassion, accountability, innovation, and community-centered
              approach in all our programs and operations.
            </p>
          </div>
        </div>

        <div className="mt-16 bg-utu-black text-white p-8 md:p-12 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 font-heading">Our Story</h3>
              <p className="mb-4">
                Founded in 2018, Utu Wa Kiafrika Charity Network began as a small initiative to support 
                underprivileged children in East Africa. The term "Utu Wa Kiafrika" embodies the essence 
                of African humanity and compassion.
              </p>
              <p>
                Today, we've grown into a network of dedicated volunteers and professionals working 
                across multiple African countries, implementing sustainable programs that address 
                the most pressing challenges facing African communities.
              </p>
            </div>
            <div className="md:text-right">
              <img 
                src="/lovable-uploads/969161e6-4a43-456e-8ceb-4578f7e45935.png" 
                alt="Team Member" 
                className="rounded-lg inline-block max-w-full md:max-w-sm shadow-xl" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
