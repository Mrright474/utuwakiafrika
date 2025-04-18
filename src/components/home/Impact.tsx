
import React, { useEffect, useState } from 'react';
import { User, School, Home, Heart, Landmark, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface StatCardProps {
  value: string | number;
  label: string;
  icon: React.ReactNode;
}

interface ImpactData {
  stats: Array<{
    value: string | number;
    label: string;
  }>;
  successStories: Array<{
    title: string;
    description: string;
    image: string;
  }>;
}

const StatCard = ({ value, label, icon }: StatCardProps) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center">
      <div className="bg-utu-red/10 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
        {icon}
      </div>
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-utu-black">{value}</h3>
      <p className="text-sm sm:text-base text-utu-gray">{label}</p>
    </div>
  );
};

// Map icon names to components
const iconMap = {
  'User': <User className="h-6 w-6 sm:h-8 sm:w-8 text-utu-red" />,
  'School': <School className="h-6 w-6 sm:h-8 sm:w-8 text-utu-red" />,
  'Home': <Home className="h-6 w-6 sm:h-8 sm:w-8 text-utu-red" />,
  'Heart': <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-utu-red" />,
  'Landmark': <Landmark className="h-6 w-6 sm:h-8 sm:w-8 text-utu-red" />,
  'Briefcase': <Briefcase className="h-6 w-6 sm:h-8 sm:w-8 text-utu-red" />
};

// Default impact data
const defaultImpactData: ImpactData = {
  stats: [
    { value: '5,000+', label: 'People Supported', },
    { value: '200+', label: 'Schools Built/Renovated' },
    { value: '150+', label: 'Homes Constructed' },
    { value: '12', label: 'Countries Reached' }
  ],
  successStories: [
    {
      title: "Education for Rural Communities",
      description: "We built 5 new schools in remote villages, providing education to over 500 children who previously had no access to schooling.",
      image: "/lovable-uploads/969161e6-4a43-456e-8ceb-4578f7e45935.png"
    },
    {
      title: "Clean Water Initiative",
      description: "Our team installed 20 water wells in drought-affected regions, providing clean drinking water to more than 10,000 people.",
      image: "/lovable-uploads/a382b382-f2d2-4832-9343-db9d8abb367d.png"
    }
  ]
};

const Impact = () => {
  const [impactData, setImpactData] = useState<ImpactData>(defaultImpactData);

  useEffect(() => {
    const savedImpact = localStorage.getItem('utu-impact');
    if (savedImpact) {
      try {
        const parsedData = JSON.parse(savedImpact);
        if (parsedData.stats?.length > 0 || parsedData.successStories?.length > 0) {
          setImpactData(parsedData);
        }
      } catch (error) {
        console.error("Error parsing impact data:", error);
      }
    }
  }, []);

  // Get default icon if not matching any in our map
  const getIcon = (index: number) => {
    const icons = Object.values(iconMap);
    // Use the icon from the map if we have one for this index, otherwise cycle through our icons
    return icons[index % icons.length];
  };

  return (
    <section id="impact" className="py-12 sm:py-16 bg-gradient-to-r from-utu-black to-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 font-heading">Our Impact</h2>
          <div className="w-16 sm:w-20 h-1 bg-utu-red mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg text-gray-300">
            Since our founding, we've made significant strides in improving the lives of thousands
            of people across Africa. Here's the impact we've created so far.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {impactData.stats.map((stat, index) => (
            <StatCard 
              key={index}
              value={stat.value} 
              label={stat.label} 
              icon={getIcon(index)} 
            />
          ))}
        </div>

        {/* Success Stories */}
        {impactData.successStories.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xl sm:text-2xl font-bold mb-8 text-center font-heading">Success Stories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {impactData.successStories.map((story, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-0 overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    {story.image && (
                      <div className="md:w-1/3 h-48 md:h-auto">
                        <img 
                          src={story.image} 
                          alt={story.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className={`p-6 ${story.image ? 'md:w-2/3' : 'w-full'}`}>
                      <h4 className="text-xl font-bold mb-2">{story.title}</h4>
                      <p className="text-gray-300 mb-4">{story.description}</p>
                      <Button variant="outline" className="border-white text-white hover:bg-white/20">
                        Read More
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Impact;
