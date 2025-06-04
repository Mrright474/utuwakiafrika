
import React from 'react';
import { Heart, Handshake, CheckCircle, Globe } from 'lucide-react';

const CoreValues = () => {
  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We lead with empathy and understanding in all our interactions.",
      color: "text-utu-red"
    },
    {
      icon: Handshake,
      title: "Unity",
      description: "We believe in the power of collective action and solidarity.",
      color: "text-utu-gold"
    },
    {
      icon: CheckCircle,
      title: "Integrity",
      description: "We operate with transparency and accountability in everything we do.",
      color: "text-utu-green"
    },
    {
      icon: Globe,
      title: "Pan-Africanism",
      description: "We celebrate our African identity and work towards continental unity.",
      color: "text-blue-600"
    }
  ];

  return (
    <div className="mb-20">
      <h3 className="text-2xl md:text-3xl font-bold mb-10 text-center text-utu-black font-heading">Our Ubuntu Values</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((value, index) => (
          <div key={value.title} className="text-center ubuntu-card rounded-2xl p-6 border border-white/20 hover:shadow-lg transition-all duration-300">
            <div className="bg-white/80 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
              <value.icon className={`h-8 w-8 ${value.color}`} />
            </div>
            <h4 className="font-bold text-lg text-utu-black mb-2">{value.title}</h4>
            <p className="text-utu-gray text-sm leading-relaxed">{value.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoreValues;
