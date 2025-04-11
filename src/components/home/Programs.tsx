
import React from 'react';
import { BookOpen, Heart, Home, Lightbulb, Droplet, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProgramProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ProgramCard = ({ title, description, icon }: ProgramProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-100">
      <div className="bg-utu-red/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-utu-black">{title}</h3>
      <p className="text-utu-gray">{description}</p>
      <Button variant="link" className="text-utu-red p-0 mt-4 hover:text-red-700">
        Learn more
      </Button>
    </div>
  );
};

const Programs = () => {
  const programs = [
    {
      title: "Education Support",
      description: "Providing scholarships, school supplies, and infrastructure to support quality education across Africa.",
      icon: <BookOpen className="h-6 w-6 text-utu-red" />
    },
    {
      title: "Healthcare Initiatives",
      description: "Improving access to quality healthcare through mobile clinics, medical supplies, and health education programs.",
      icon: <Heart className="h-6 w-6 text-utu-red" />
    },
    {
      title: "Housing & Infrastructure",
      description: "Building and renovating homes, schools, and community centers to improve living conditions.",
      icon: <Home className="h-6 w-6 text-utu-red" />
    },
    {
      title: "Clean Water Projects",
      description: "Providing access to clean, safe water through well construction and water purification systems.",
      icon: <Droplet className="h-6 w-6 text-utu-red" />
    },
    {
      title: "Skills Development",
      description: "Training programs that equip individuals with valuable skills for employment and entrepreneurship.",
      icon: <Briefcase className="h-6 w-6 text-utu-red" />
    },
    {
      title: "Innovation Grants",
      description: "Supporting African innovators and entrepreneurs with grants to solve local challenges.",
      icon: <Lightbulb className="h-6 w-6 text-utu-red" />
    }
  ];

  return (
    <section id="programs" className="py-16 md:py-24 bg-utu-light-gray">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-utu-black font-heading">Our Programs</h2>
          <div className="w-20 h-1 bg-utu-red mx-auto mb-6"></div>
          <p className="text-lg text-utu-gray">
            We implement a wide range of programs designed to address the most pressing challenges
            facing African communities and create sustainable impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {programs.map((program, index) => (
            <ProgramCard
              key={index}
              title={program.title}
              description={program.description}
              icon={program.icon}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button className="bg-utu-red hover:bg-red-700 text-white px-8 py-6">
            View All Programs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Programs;
