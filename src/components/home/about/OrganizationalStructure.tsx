
import React from 'react';
import { Shield, Users, BookOpen, Heart, Star, Globe } from 'lucide-react';

const OrganizationalStructure = () => {
  const departments = [
    {
      title: "Board of Trustees",
      description: "Provides strategic oversight and governance, ensuring our mission stays true to Ubuntu principles.",
      icon: Shield,
      color: "from-utu-red to-red-600"
    },
    {
      title: "Executive Leadership",
      description: "Led by our founder, driving vision and operational excellence across all programs.",
      icon: Users,
      color: "from-utu-gold to-yellow-600"
    },
    {
      title: "Programs Department",
      description: "Designs and implements education, health, and empowerment initiatives.",
      icon: BookOpen,
      color: "from-utu-green to-green-600"
    },
    {
      title: "Women's Empowerment",
      description: "Focuses on gender equality and economic empowerment for African women.",
      icon: Heart,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Youth Development",
      description: "Nurtures the next generation of African leaders and change-makers.",
      icon: Star,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Grassroots Network",
      description: "Community-based teams working at national, regional, and local levels.",
      icon: Globe,
      color: "from-teal-500 to-teal-600"
    }
  ];

  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-utu-black font-heading">Organizational Structure</h2>
        <div className="w-20 h-1 bg-utu-gold mx-auto mb-6"></div>
        <p className="text-lg text-utu-gray max-w-3xl mx-auto">
          Our structure reflects our Ubuntu values — every level of our organization works in harmony 
          to serve our communities with transparency, accountability, and collective wisdom.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((department, index) => (
          <div key={department.title} className="ubuntu-card rounded-2xl p-6 border border-white/20 hover:shadow-lg transition-all duration-300">
            <div className={`w-14 h-14 bg-gradient-to-br ${department.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
              <department.icon className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-utu-black mb-3">{department.title}</h3>
            <p className="text-utu-gray text-sm leading-relaxed">{department.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizationalStructure;
