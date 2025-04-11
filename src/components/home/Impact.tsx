
import React from 'react';
import { User, School, Home, Heart } from 'lucide-react';

interface StatCardProps {
  count: string;
  label: string;
  icon: React.ReactNode;
}

const StatCard = ({ count, label, icon }: StatCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="bg-utu-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-3xl md:text-4xl font-bold mb-2 text-utu-black">{count}</h3>
      <p className="text-utu-gray">{label}</p>
    </div>
  );
};

const Impact = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-utu-black to-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Our Impact</h2>
          <div className="w-20 h-1 bg-utu-red mx-auto mb-6"></div>
          <p className="text-lg text-gray-300">
            Since our founding, we've made significant strides in improving the lives of thousands
            of people across Africa. Here's the impact we've created so far.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            count="5,000+" 
            label="People Supported" 
            icon={<User className="h-8 w-8 text-utu-red" />} 
          />
          <StatCard 
            count="200+" 
            label="Schools Built/Renovated" 
            icon={<School className="h-8 w-8 text-utu-red" />} 
          />
          <StatCard 
            count="150+" 
            label="Homes Constructed" 
            icon={<Home className="h-8 w-8 text-utu-red" />} 
          />
          <StatCard 
            count="12" 
            label="Countries Reached" 
            icon={<Heart className="h-8 w-8 text-utu-red" />} 
          />
        </div>
      </div>
    </section>
  );
};

export default Impact;
