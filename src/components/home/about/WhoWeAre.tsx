
import React from 'react';

const WhoWeAre = () => {
  return (
    <div className="mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-utu-black font-heading">Who We Are</h2>
          <div className="w-16 h-1 bg-utu-red mb-6"></div>
          <p className="text-lg text-utu-gray leading-relaxed mb-6">
            Utu Wa Kiafrika Charity Network is more than an organization — we are a movement rooted in 
            the ancient African philosophy of Ubuntu. Born from the hearts of passionate African youth, 
            we exist to uplift the most vulnerable in our communities through compassion and collective action.
          </p>
          <p className="text-lg text-utu-gray leading-relaxed mb-6">
            Our name speaks to our essence: <em>Utu</em> represents the humanity that binds us all, 
            while <em>Kiafrika</em> celebrates our proud African identity. Together, we embody the 
            spirit of Pan-African unity and the belief that when we lift each other, we all rise.
          </p>
          <p className="text-lg text-utu-gray leading-relaxed">
            Since our founding in 2024, we have grown from a small group of dedicated individuals 
            into a continent-wide network of change-makers, all united by the vision of a dignified, 
            empowered Africa where every person can thrive.
          </p>
        </div>
        <div className="relative">
          {/* Main featured image */}
          <div className="mb-6">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
              <img 
                src="/lovable-uploads/b07d8f50-577a-4699-87ba-8759e7ace688.png" 
                alt="African children embodying Ubuntu spirit" 
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-semibold text-lg">Ubuntu Spirit in Action</h3>
                <p className="text-sm text-white/90">Children embodying our core values</p>
              </div>
            </div>
          </div>
          
          {/* Grid of smaller images */}
          <div className="grid grid-cols-3 gap-4">
            <div className="relative overflow-hidden rounded-2xl shadow-lg group hover:shadow-xl transition-all duration-300">
              <img 
                src="/lovable-uploads/eccb4f96-1438-49ba-947c-c55ac2356fd0.png" 
                alt="Community leader" 
                className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <div className="relative overflow-hidden rounded-2xl shadow-lg group hover:shadow-xl transition-all duration-300 transform translate-y-2">
              <img 
                src="/lovable-uploads/a382b382-f2d2-4832-9343-db9d8abb367d.png" 
                alt="Empowered women" 
                className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <div className="relative overflow-hidden rounded-2xl shadow-lg group hover:shadow-xl transition-all duration-300">
              <img 
                src="/lovable-uploads/6cc22289-337a-4964-ab0f-4058feb43e63.png" 
                alt="Healthcare outreach" 
                className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-8 -left-6 w-32 h-32 bg-secondary/10 rounded-full blur-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
