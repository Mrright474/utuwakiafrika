
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
        <div className="grid grid-cols-2 gap-4">
          <img 
            src="/lovable-uploads/b07d8f50-577a-4699-87ba-8759e7ace688.png" 
            alt="African children embodying Ubuntu spirit" 
            className="rounded-2xl shadow-xl w-full h-48 object-cover ubuntu-card" 
          />
          <img 
            src="/lovable-uploads/eccb4f96-1438-49ba-947c-c55ac2356fd0.png" 
            alt="Community leader" 
            className="rounded-2xl shadow-xl w-full h-48 object-cover ubuntu-card mt-8" 
          />
          <img 
            src="/lovable-uploads/a382b382-f2d2-4832-9343-db9d8abb367d.png" 
            alt="Empowered women" 
            className="rounded-2xl shadow-xl w-full h-48 object-cover ubuntu-card -mt-8" 
          />
          <img 
            src="/lovable-uploads/6cc22289-337a-4964-ab0f-4058feb43e63.png" 
            alt="Healthcare outreach" 
            className="rounded-2xl shadow-xl w-full h-48 object-cover ubuntu-card" 
          />
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
