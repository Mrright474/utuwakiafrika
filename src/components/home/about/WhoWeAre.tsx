
import React from 'react';
import helpingHandsImage from '../../../assets/helping-hands-bread.jpg';

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
          {/* Single powerful symbolic image */}
          <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
            <img 
              src={helpingHandsImage}
              alt="Hands sharing bread - symbol of our mission to feed and help vulnerable communities" 
              className="w-full h-96 object-cover transition-all duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="font-bold text-2xl mb-2 text-shadow-lg">A Helping Hand For Every African</h3>
              <p className="text-lg text-white/95 font-medium">Nourishing communities, empowering lives</p>
            </div>
            
            {/* Floating animation elements */}
            <div className="absolute top-4 right-4 w-3 h-3 bg-white/60 rounded-full animate-pulse"></div>
            <div className="absolute top-12 right-8 w-2 h-2 bg-white/40 rounded-full animate-pulse delay-300"></div>
            <div className="absolute top-20 right-6 w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse delay-700"></div>
          </div>
          
          {/* Decorative elements representing hope and unity */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-4 -left-8 w-24 h-24 bg-gradient-to-tr from-accent/15 to-primary/15 rounded-full blur-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
