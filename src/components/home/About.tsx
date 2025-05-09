
import React from 'react';
import { Heart, Award, Users, Globe, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
              <p className="mb-4">
                What started as a grassroots movement by a group of passionate individuals has now grown into 
                a significant force for positive change across multiple African countries.
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

        {/* Timeline Section */}
        <div className="my-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-10 text-center text-utu-black font-heading">Our Journey</h3>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-0 left-1/2 w-0.5 h-full bg-utu-red transform -translate-x-1/2 hidden md:block"></div>
            
            {/* Timeline items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 2018 */}
              <div className="md:text-right md:pr-12 relative">
                <div className="hidden md:block absolute top-0 right-0 w-3 h-3 rounded-full bg-utu-red transform translate-x-1.5"></div>
                <h4 className="text-xl font-bold text-utu-black mb-2">2018</h4>
                <p className="text-utu-gray">Foundation of Utu Wa Kiafrika with first education project supporting 50 children in Uganda.</p>
              </div>
              <div className="md:pl-12"></div>

              {/* 2019 */}
              <div className="md:pl-12"></div>
              <div className="md:pl-12 relative">
                <div className="hidden md:block absolute top-0 left-0 w-3 h-3 rounded-full bg-utu-red transform -translate-x-1.5"></div>
                <h4 className="text-xl font-bold text-utu-black mb-2">2019</h4>
                <p className="text-utu-gray">Expanded into healthcare with our first mobile clinic serving rural communities in Kenya.</p>
              </div>

              {/* 2020 */}
              <div className="md:text-right md:pr-12 relative">
                <div className="hidden md:block absolute top-0 right-0 w-3 h-3 rounded-full bg-utu-red transform translate-x-1.5"></div>
                <h4 className="text-xl font-bold text-utu-black mb-2">2020</h4>
                <p className="text-utu-gray">Launched clean water initiatives with 10 well projects across Tanzania and Uganda.</p>
              </div>
              <div className="md:pl-12"></div>

              {/* 2021 */}
              <div className="md:pl-12"></div>
              <div className="md:pl-12 relative">
                <div className="hidden md:block absolute top-0 left-0 w-3 h-3 rounded-full bg-utu-red transform -translate-x-1.5"></div>
                <h4 className="text-xl font-bold text-utu-black mb-2">2021</h4>
                <p className="text-utu-gray">Started economic empowerment programs with microfinance services for women entrepreneurs.</p>
              </div>

              {/* 2022 */}
              <div className="md:text-right md:pr-12 relative">
                <div className="hidden md:block absolute top-0 right-0 w-3 h-3 rounded-full bg-utu-red transform translate-x-1.5"></div>
                <h4 className="text-xl font-bold text-utu-black mb-2">2022</h4>
                <p className="text-utu-gray">Reached milestone of supporting 5,000 beneficiaries across our various programs.</p>
              </div>
              <div className="md:pl-12"></div>

              {/* 2023 */}
              <div className="md:pl-12"></div>
              <div className="md:pl-12 relative">
                <div className="hidden md:block absolute top-0 left-0 w-3 h-3 rounded-full bg-utu-red transform -translate-x-1.5"></div>
                <h4 className="text-xl font-bold text-utu-black mb-2">2023</h4>
                <p className="text-utu-gray">Expanded operations to 3 new countries and established international partnerships.</p>
              </div>

              {/* 2024 */}
              <div className="md:text-right md:pr-12 relative">
                <div className="hidden md:block absolute top-0 right-0 w-3 h-3 rounded-full bg-utu-red transform translate-x-1.5"></div>
                <h4 className="text-xl font-bold text-utu-black mb-2">2024</h4>
                <p className="text-utu-gray">Celebrating 5 years with impact on over 10,000 lives and launching our long-term strategic plan.</p>
              </div>
              <div className="md:pl-12"></div>
            </div>
          </div>
        </div>

        {/* Core Principles */}
        <div className="my-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-10 text-center text-utu-black font-heading">Our Core Principles</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-start mb-4">
                <div className="bg-utu-red/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <CheckCircle className="h-6 w-6 text-utu-red" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-utu-black">Community-Led Initiatives</h4>
                </div>
              </div>
              <p className="text-utu-gray">We believe that sustainable solutions must be driven by the communities themselves. We work closely with local leaders and community members to ensure our interventions address real needs.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-start mb-4">
                <div className="bg-utu-red/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <Globe className="h-6 w-6 text-utu-red" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-utu-black">Cultural Sensitivity</h4>
                </div>
              </div>
              <p className="text-utu-gray">We respect and honor the unique cultural contexts of each community we work with, ensuring that our programs align with local values, traditions, and practices.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-start mb-4">
                <div className="bg-utu-red/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <Clock className="h-6 w-6 text-utu-red" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-utu-black">Long-Term Sustainability</h4>
                </div>
              </div>
              <p className="text-utu-gray">Rather than providing temporary aid, we focus on implementing solutions that can continue to benefit communities for years to come through knowledge transfer and capacity building.</p>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold mb-4 text-utu-black">Join Our Mission</h3>
          <p className="text-utu-gray max-w-2xl mx-auto mb-8">
            Whether you're interested in volunteering, donating, or partnering with us,
            there are many ways to contribute to our mission of empowering African communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-utu-red hover:bg-red-700 text-white"
              asChild
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button 
              variant="outline"
              className="border-utu-red text-utu-red hover:bg-utu-red hover:text-white"
              asChild
            >
              <Link to="/programs">Explore Our Programs</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
