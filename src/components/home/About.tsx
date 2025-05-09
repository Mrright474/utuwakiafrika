
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 font-heading text-utu-black">Our Story</h3>
            <p className="mb-4 text-utu-gray">
              Founded in 2024, Utu Wa Kiafrika Charity Network began as a small initiative to support 
              underprivileged children in East Africa. The term "Utu Wa Kiafrika" embodies the essence 
              of African humanity and compassion.
            </p>
            <p className="mb-4 text-utu-gray">
              What started as a grassroots movement by a group of passionate individuals has quickly grown into 
              a significant force for positive change across multiple African countries.
            </p>
            <p className="text-utu-gray">
              Though young, we've already established a network of dedicated volunteers and professionals working 
              across multiple African countries, implementing sustainable programs that address 
              the most pressing challenges facing African communities.
            </p>
          </div>
          <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
            <img 
              src="/lovable-uploads/969161e6-4a43-456e-8ceb-4578f7e45935.png" 
              alt="Community work" 
              className="rounded-lg shadow-xl w-full h-48 object-cover" 
            />
            <img 
              src="/lovable-uploads/7e1302ab-dabd-404d-b089-b1c7bdf0e631.png" 
              alt="African children" 
              className="rounded-lg shadow-xl w-full h-48 object-cover" 
            />
            <img 
              src="/lovable-uploads/6e61272d-7786-4ccc-950e-4ae86bc5f39d.png" 
              alt="School classroom" 
              className="rounded-lg shadow-xl w-full h-48 object-cover" 
            />
            <img 
              src="/lovable-uploads/6f761c26-afdc-468f-8580-4cbc8c3cab83.png" 
              alt="Community member" 
              className="rounded-lg shadow-xl w-full h-48 object-cover" 
            />
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
              {/* 2024 - January */}
              <div className="md:text-right md:pr-12 relative">
                <div className="hidden md:block absolute top-0 right-0 w-3 h-3 rounded-full bg-utu-red transform translate-x-1.5"></div>
                <h4 className="text-xl font-bold text-utu-black mb-2">January 2024</h4>
                <p className="text-utu-gray">Foundation of Utu Wa Kiafrika with first education project supporting 50 children in Uganda.</p>
                <img 
                  src="/lovable-uploads/7645e834-1078-4707-9732-786fd4d93d8c.png" 
                  alt="Foundation event" 
                  className="mt-3 rounded-lg shadow-md w-full h-32 object-cover" 
                />
              </div>
              <div className="md:pl-12"></div>

              {/* 2024 - March */}
              <div className="md:pl-12"></div>
              <div className="md:pl-12 relative">
                <div className="hidden md:block absolute top-0 left-0 w-3 h-3 rounded-full bg-utu-red transform -translate-x-1.5"></div>
                <h4 className="text-xl font-bold text-utu-black mb-2">March 2024</h4>
                <p className="text-utu-gray">Launched our first mobile clinic serving rural communities in Kenya.</p>
                <img 
                  src="/lovable-uploads/53460912-2f2a-428b-b6e5-bc12ccf03604.png" 
                  alt="Healthcare initiative" 
                  className="mt-3 rounded-lg shadow-md w-full h-32 object-cover" 
                />
              </div>

              {/* 2024 - May */}
              <div className="md:text-right md:pr-12 relative">
                <div className="hidden md:block absolute top-0 right-0 w-3 h-3 rounded-full bg-utu-red transform translate-x-1.5"></div>
                <h4 className="text-xl font-bold text-utu-black mb-2">May 2024</h4>
                <p className="text-utu-gray">Started clean water initiatives with our first well project in Tanzania.</p>
                <img 
                  src="/lovable-uploads/c520e25e-9088-4335-9397-90370407dd62.png" 
                  alt="Water project" 
                  className="mt-3 rounded-lg shadow-md w-full h-32 object-cover" 
                />
              </div>
              <div className="md:pl-12"></div>

              {/* 2024 - July */}
              <div className="md:pl-12"></div>
              <div className="md:pl-12 relative">
                <div className="hidden md:block absolute top-0 left-0 w-3 h-3 rounded-full bg-utu-red transform -translate-x-1.5"></div>
                <h4 className="text-xl font-bold text-utu-black mb-2">July 2024</h4>
                <p className="text-utu-gray">Launched economic empowerment programs for women entrepreneurs.</p>
                <img 
                  src="/lovable-uploads/ed5bbc34-0ff2-46df-8898-3ee804b9d1ce.png" 
                  alt="Women entrepreneurs" 
                  className="mt-3 rounded-lg shadow-md w-full h-32 object-cover" 
                />
              </div>

              {/* 2024 - September */}
              <div className="md:text-right md:pr-12 relative">
                <div className="hidden md:block absolute top-0 right-0 w-3 h-3 rounded-full bg-utu-red transform translate-x-1.5"></div>
                <h4 className="text-xl font-bold text-utu-black mb-2">September 2024</h4>
                <p className="text-utu-gray">Reached milestone of supporting 1,000 beneficiaries across our various programs.</p>
                <img 
                  src="/lovable-uploads/52fedddf-3da6-485c-af83-de0020326139.png" 
                  alt="Milestone celebration" 
                  className="mt-3 rounded-lg shadow-md w-full h-32 object-cover" 
                />
              </div>
              <div className="md:pl-12"></div>

              {/* 2024 - November */}
              <div className="md:pl-12"></div>
              <div className="md:pl-12 relative">
                <div className="hidden md:block absolute top-0 left-0 w-3 h-3 rounded-full bg-utu-red transform -translate-x-1.5"></div>
                <h4 className="text-xl font-bold text-utu-black mb-2">November 2024</h4>
                <p className="text-utu-gray">Established new partnerships with international organizations to expand our reach.</p>
                <img 
                  src="/lovable-uploads/b9465bc7-3765-4b25-a3ec-30f8bed81725.png" 
                  alt="Partnership meeting" 
                  className="mt-3 rounded-lg shadow-md w-full h-32 object-cover" 
                />
              </div>

              {/* 2024 - December */}
              <div className="md:text-right md:pr-12 relative">
                <div className="hidden md:block absolute top-0 right-0 w-3 h-3 rounded-full bg-utu-red transform translate-x-1.5"></div>
                <h4 className="text-xl font-bold text-utu-black mb-2">December 2024</h4>
                <p className="text-utu-gray">Planning our 1-year anniversary celebration with ambitious goals for 2025.</p>
                <img 
                  src="/lovable-uploads/f90b8fff-8fac-4c94-8b28-10ed3702cc33.png" 
                  alt="Planning session" 
                  className="mt-3 rounded-lg shadow-md w-full h-32 object-cover" 
                />
              </div>
              <div className="md:pl-12"></div>
            </div>
          </div>
        </div>

        {/* Core Principles */}
        <div className="my-16 bg-utu-light-gray p-8 rounded-lg">
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
        
        {/* Image Gallery */}
        <div className="my-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-utu-black font-heading">Our Impact in Images</h3>
          <p className="text-center text-utu-gray mb-8 max-w-2xl mx-auto">
            A glimpse into our work across different communities in Africa. These images capture the essence of our mission and the impact we're making together.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <img 
              src="/lovable-uploads/b07d8f50-577a-4699-87ba-8759e7ace688.png" 
              alt="Education program" 
              className="rounded-lg h-40 object-cover w-full transition-transform hover:scale-105"
            />
            <img 
              src="/lovable-uploads/6cc22289-337a-4964-ab0f-4058feb43e63.png" 
              alt="Healthcare outreach" 
              className="rounded-lg h-40 object-cover w-full transition-transform hover:scale-105"
            />
            <img 
              src="/lovable-uploads/48b1317c-a8a6-4e8b-837f-20bb05632713.png" 
              alt="Water project" 
              className="rounded-lg h-40 object-cover w-full transition-transform hover:scale-105"
            />
            <img 
              src="/lovable-uploads/eccb4f96-1438-49ba-947c-c55ac2356fd0.png" 
              alt="Community leader" 
              className="rounded-lg h-40 object-cover w-full transition-transform hover:scale-105"
            />
            <img 
              src="/lovable-uploads/a382b382-f2d2-4832-9343-db9d8abb367d.png" 
              alt="Women entrepreneurs" 
              className="rounded-lg h-40 object-cover w-full transition-transform hover:scale-105"
            />
            <img 
              src="/lovable-uploads/f18d343d-5225-4a78-9319-ab494bfd2de3.png" 
              alt="Community member" 
              className="rounded-lg h-40 object-cover w-full transition-transform hover:scale-105"
            />
            <img 
              src="/lovable-uploads/23b57522-ea5d-4ead-b599-c148558a4474.png" 
              alt="Infrastructure project" 
              className="rounded-lg h-40 object-cover w-full transition-transform hover:scale-105"
            />
            <img 
              src="/lovable-uploads/da74094e-d355-4e7f-bda9-811435437ab1.png" 
              alt="Agricultural training" 
              className="rounded-lg h-40 object-cover w-full transition-transform hover:scale-105"
            />
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16 bg-utu-black text-white p-8 md:p-12 rounded-lg bg-[url('/lovable-uploads/b07d8f50-577a-4699-87ba-8759e7ace688.png')] bg-cover bg-center bg-blend-overlay">
          <div className="bg-black/60 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-white">Join Our Mission</h3>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
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
                className="border-white text-white hover:bg-white/20"
                asChild
              >
                <Link to="/programs">Explore Our Programs</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
