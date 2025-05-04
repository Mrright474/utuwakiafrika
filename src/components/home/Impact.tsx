
import React, { useState, useEffect } from 'react';
import { MapPin, Users, Award, School, Heart, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface ImpactData {
  stats: Array<{
    value: string | number;
    label: string;
    icon: string;
  }>;
  ugandaProjects: Array<{
    title: string;
    description: string;
    location: string;
    image: string;
    year: number;
    beneficiaries: number;
  }>;
  successStories: Array<{
    quote: string;
    name: string;
    location: string;
    image: string;
  }>;
}

const defaultImpactData: ImpactData = {
  stats: [
    { value: '15+', label: 'Projects in Uganda', icon: 'Award' },
    { value: '5,000+', label: 'Ugandans Supported', icon: 'Users' },
    { value: '12', label: 'Districts Reached', icon: 'MapPin' },
    { value: '8', label: 'Years in Uganda', icon: 'Heart' }
  ],
  ugandaProjects: [
    {
      title: "Clean Water Initiative in Kampala",
      description: "Installed 8 water purification systems serving 2,500 residents in slum areas of Kampala, reducing waterborne disease incidents by 65%.",
      location: "Kampala",
      image: "/lovable-uploads/7e1302ab-dabd-404d-b089-b1c7bdf0e631.png",
      year: 2022,
      beneficiaries: 2500
    },
    {
      title: "Rural Education Support in Jinja",
      description: "Built 3 classrooms and provided educational materials to 4 schools in Jinja district, enabling 450 more children to access quality education.",
      location: "Jinja",
      image: "/lovable-uploads/969161e6-4a43-456e-8ceb-4578f7e45935.png",
      year: 2021,
      beneficiaries: 450
    },
    {
      title: "Women's Empowerment in Mbale",
      description: "Trained 120 women in entrepreneurship and provided microloans, resulting in 85 sustainable small businesses in Mbale communities.",
      location: "Mbale",
      image: "/lovable-uploads/b07d8f50-577a-4699-87ba-8759e7ace688.png",
      year: 2022,
      beneficiaries: 120
    },
    {
      title: "Healthcare Outreach in Gulu",
      description: "Mobile clinics provided essential healthcare services to 1,800 patients in remote villages of Gulu district, with focus on maternal care.",
      location: "Gulu",
      image: "/lovable-uploads/52fedddf-3da6-485c-af83-de0020326139.png",
      year: 2023,
      beneficiaries: 1800
    }
  ],
  successStories: [
    {
      quote: "Thanks to the agricultural training program, I can now support my six children through farming. My crop yield has tripled since applying the techniques I learned.",
      name: "Sarah Namukasa",
      location: "Masaka, Uganda",
      image: "/lovable-uploads/f18d343d-5225-4a78-9319-ab494bfd2de3.png"
    },
    {
      quote: "The scholarship from Utu Wa Kiafrika changed my life. I was able to complete my education and now I work as a teacher in my community.",
      name: "Joseph Okello",
      location: "Tororo, Uganda",
      image: "/lovable-uploads/eccb4f96-1438-49ba-947c-c55ac2356fd0.png"
    },
    {
      quote: "Our village now has clean water thanks to the well that was constructed. Our children no longer miss school due to waterborne diseases.",
      name: "Mary Atim",
      location: "Lira, Uganda",
      image: "/lovable-uploads/a382b382-f2d2-4832-9343-db9d8abb367d.png"
    }
  ]
};

const iconComponents = {
  MapPin: <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-utu-red" />,
  Users: <Users className="h-6 w-6 sm:h-8 sm:w-8 text-utu-red" />,
  Award: <Award className="h-6 w-6 sm:h-8 sm:w-8 text-utu-red" />,
  School: <School className="h-6 w-6 sm:h-8 sm:w-8 text-utu-red" />,
  Heart: <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-utu-red" />,
  Book: <Book className="h-6 w-6 sm:h-8 sm:w-8 text-utu-red" />
};

const Impact = () => {
  const [impactData, setImpactData] = useState<ImpactData>(defaultImpactData);

  useEffect(() => {
    const savedImpact = localStorage.getItem('utu-uganda-impact');
    if (savedImpact) {
      try {
        const parsedData = JSON.parse(savedImpact);
        if (parsedData.stats?.length > 0 || parsedData.ugandaProjects?.length > 0) {
          setImpactData(parsedData);
        }
      } catch (error) {
        console.error("Error parsing Uganda impact data:", error);
      }
    } else {
      // Initialize data if not present
      localStorage.setItem('utu-uganda-impact', JSON.stringify(defaultImpactData));
    }
  }, []);

  const getIconComponent = (iconName: string) => {
    return iconComponents[iconName as keyof typeof iconComponents] || 
           <Award className="h-6 w-6 sm:h-8 sm:w-8 text-utu-red" />;
  };

  return (
    <section id="impact" className="py-12 sm:py-20 bg-gradient-to-b from-white to-utu-light-gray">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 font-heading text-utu-black">Our Impact in Uganda</h2>
          <div className="w-16 sm:w-20 h-1 bg-utu-red mx-auto mb-6"></div>
          <p className="text-base sm:text-lg text-utu-gray">
            Since beginning our work in Uganda, we've made significant strides in improving lives across the country.
            From education and healthcare to clean water and economic empowerment, our initiatives have reached thousands.
          </p>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
          {impactData.stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-all duration-300">
              <div className="bg-utu-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                {getIconComponent(stat.icon)}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-2 text-utu-black">{stat.value}</h3>
              <p className="text-sm sm:text-base text-utu-gray">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Uganda Map with Impact Points */}
        <div className="mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
          <h3 className="text-xl sm:text-2xl font-bold mb-8 text-center font-heading text-utu-black">Where We Work in Uganda</h3>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="aspect-w-16 aspect-h-9 relative">
              <img
                src="/lovable-uploads/b9465bc7-3765-4b25-a3ec-30f8bed81725.png"
                alt="Map of Uganda showing our impact locations"
                className="w-full h-auto object-contain rounded-md"
              />
              {/* Map pins could be added here with absolute positioning if needed */}
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
          <h3 className="text-xl sm:text-2xl font-bold mb-8 text-center font-heading text-utu-black">Featured Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {impactData.ugandaProjects.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute bottom-0 left-0 bg-utu-red text-white py-1 px-3 rounded-tr-md">
                    {project.location}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-lg font-bold text-utu-black">{project.title}</h4>
                    <span className="text-sm font-medium bg-utu-light-gray px-2 py-1 rounded-full">{project.year}</span>
                  </div>
                  <p className="text-utu-gray mb-4">{project.description}</p>
                  <div className="flex items-center text-sm text-utu-gray">
                    <Users className="h-4 w-4 mr-1" />
                    <span><strong>{project.beneficiaries.toLocaleString()}</strong> beneficiaries</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
          <h3 className="text-xl sm:text-2xl font-bold mb-8 text-center font-heading text-utu-black">Success Stories</h3>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {impactData.successStories.map((story, index) => (
                <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1">
                  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/4 flex justify-center">
                      <img 
                        src={story.image} 
                        alt={story.name} 
                        className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    <div className="md:w-3/4">
                      <p className="text-utu-gray italic mb-4">&ldquo;{story.quote}&rdquo;</p>
                      <div>
                        <h5 className="font-bold text-utu-black">{story.name}</h5>
                        <p className="text-sm text-utu-gray">{story.location}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6">
              <CarouselPrevious className="static translate-y-0 mr-2" />
              <CarouselNext className="static translate-y-0 ml-2" />
            </div>
          </Carousel>
        </div>

        {/* Call to Action */}
        <div className="text-center animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 font-heading text-utu-black">Help Us Make a Difference in Uganda</h3>
          <p className="text-utu-gray mb-6 max-w-2xl mx-auto">
            Your support can help us expand our impact across Uganda, bringing clean water,
            education, healthcare, and economic opportunities to more communities in need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-utu-red hover:bg-red-700 text-white"
              onClick={() => window.location.href = '/donate'}
            >
              Donate Now
            </Button>
            <Button 
              variant="outline"
              className="border-utu-red text-utu-red hover:bg-utu-red hover:text-white"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
