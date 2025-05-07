
import React from 'react';
import { Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

interface Project {
  title: string;
  description: string;
  location: string;
  image: string;
  year: number;
  beneficiaries: number;
}

interface ProjectCardsProps {
  projects: Project[];
}

const ProjectCard = ({ project }: { project: Project }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.log("Image failed to load:", project.image);
    toast.error(`Failed to load image for ${project.title}`);
    (e.target as HTMLImageElement).src = "/placeholder.svg";
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-48 object-cover"
          onError={handleImageError}
          loading="eager"
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
  );
};

const ProjectCards = ({ projects }: ProjectCardsProps) => {
  return (
    <div className="mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
      <h3 className="text-xl sm:text-2xl font-bold mb-8 text-center font-heading text-utu-black">Featured Projects</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectCards;
