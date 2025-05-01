
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

const iconMap = {
  'User': <User className="h-6 w-6 sm:h-8 sm:w-8 text-utu-red" />,
  'School': <School className="h-6 w-6 sm:h-8 sm:w-8 text-utu-red" />,
  'Home': <Home className="h-6 w-6 sm:h-8 sm:w-8 text-utu-red" />,
  'Heart': <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-utu-red" />,
  'Landmark': <Landmark className="h-6 w-6 sm:h-8 sm:w-8 text-utu-red" />,
  'Briefcase': <Briefcase className="h-6 w-6 sm:h-8 sm:w-8 text-utu-red" />
};

const defaultImpactData: ImpactData = {
  stats: [
    { value: '5,000+', label: 'People Supported', },
    { value: '200+', label: 'Schools Built/Renovated' },
    { value: '150+', label: 'Homes Constructed' },
    { value: '12', label: 'Countries Reached' }
  ],
  successStories: [
    {
      title: "Education for Kibera Children",
      description: "We built 3 new schools in Kibera, Kenya's largest urban slum, providing quality education to over 500 children who previously had no access to proper schooling facilities.",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=500&auto=format&fit=crop"
    },
    {
      title: "Masai Community Water Initiative",
      description: "Our team installed 15 water wells in Masai Mara regions, providing clean drinking water to more than 8,000 people and reducing water-borne diseases by 60%.",
      image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=500&auto=format&fit=crop"
    },
    {
      title: "Kibera Youth Entrepreneurship",
      description: "We've empowered 200 young adults in Kibera with business skills and microloans, leading to the creation of 75 sustainable small businesses within the community.",
      image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=500&auto=format&fit=crop"
    },
    {
      title: "Masai Healthcare Outreach",
      description: "Our mobile clinics have provided essential healthcare services to remote Masai villages, treating over 3,000 patients and administering vaccinations to 1,200 children.",
      image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?q=80&w=500&auto=format&fit=crop"
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

  const getIcon = (index: number) => {
    const icons = Object.values(iconMap);
    return icons[index % icons.length];
  };

  const impactGallery = [
    {
      image: "https://images.unsplash.com/photo-1526766489887-ca6e6e44f012?q=80&w=500&auto=format&fit=crop",
      caption: "Kibera Community Projects"
    },
    {
      image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?q=80&w=500&auto=format&fit=crop",
      caption: "Masai Village Support"
    },
    {
      image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?q=80&w=500&auto=format&fit=crop",
      caption: "Masai Wildlife Conservation"
    },
    {
      image: "https://images.unsplash.com/photo-1484712401471-05c7215830eb?q=80&w=500&auto=format&fit=crop",
      caption: "Kibera Youth Programs"
    }
  ];

  return (
    <section id="impact" className="py-12 sm:py-16 bg-gradient-to-r from-utu-black to-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 font-heading">Our Impact</h2>
          <div className="w-16 sm:w-20 h-1 bg-utu-red mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg text-gray-300">
            Since our founding, we've made significant strides in improving the lives of thousands
            of people across Africa. Here's the impact we've created so far.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
          {impactData.stats.map((stat, index) => (
            <StatCard 
              key={index}
              value={stat.value} 
              label={stat.label} 
              icon={getIcon(index)} 
            />
          ))}
        </div>

        <div className="mt-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
          <h3 className="text-xl sm:text-2xl font-bold mb-8 text-center font-heading">Our Impact in Pictures</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {impactGallery.map((item, index) => (
              <div key={index} className="relative group overflow-hidden rounded-lg">
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white p-4 text-sm">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {impactData.successStories.length > 0 && (
          <div className="mt-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
            <h3 className="text-xl sm:text-2xl font-bold mb-8 text-center font-heading">Success Stories</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {impactData.successStories.map((story, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-0 overflow-hidden hover:bg-white/15 transition-colors duration-300">
                  <div className="flex flex-col md:flex-row">
                    {story.image && (
                      <div className="md:w-1/3 h-48 md:h-auto">
                        <img 
                          src={story.image} 
                          alt={story.title} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                      </div>
                    )}
                    <div className={`p-6 ${story.image ? 'md:w-2/3' : 'w-full'}`}>
                      <h4 className="text-xl font-bold mb-2">{story.title}</h4>
                      <p className="text-gray-300 mb-4">{story.description}</p>
                      <Button variant="outline" className="border-white text-white hover:bg-white/20 transition-colors duration-300">
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
