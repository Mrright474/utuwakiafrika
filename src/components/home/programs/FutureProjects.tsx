
import React from 'react';
import { GraduationCap, Hospital, ShieldAlert, Share2, Cpu } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const futureProjects = [
  {
    title: "Ubuntu University",
    description: "A Pan-African institution of higher learning dedicated to nurturing Africa's brightest minds. Ubuntu University will offer world-class education rooted in African values, producing leaders who serve their communities with integrity and innovation.",
    icon: <GraduationCap className="h-8 w-8" />,
    category: "Infrastructure",
    gradient: "from-amber-500 to-orange-600",
    accent: "bg-amber-100 text-amber-800",
  },
  {
    title: "Ubuntu Hospital",
    description: "A state-of-the-art healthcare facility providing accessible, quality medical care across the continent. Ubuntu Hospital will combine modern medicine with community health approaches to serve those who need it most.",
    icon: <Hospital className="h-8 w-8" />,
    category: "Infrastructure",
    gradient: "from-rose-500 to-red-600",
    accent: "bg-rose-100 text-rose-800",
  },
  {
    title: "UTU Disaster Relief Arm",
    description: "A rapid-response humanitarian unit embedded within each UTU Wakiafrika country branch. This arm mobilizes local volunteers and resources to provide immediate aid and long-term recovery support to communities affected by natural disasters and crises.",
    icon: <ShieldAlert className="h-8 w-8" />,
    category: "Humanitarian",
    gradient: "from-sky-500 to-blue-600",
    accent: "bg-sky-100 text-sky-800",
  },
  {
    title: "Ubuntu — Africa's Social Media",
    description: "A homegrown digital platform built for Africans, by Africans. Ubuntu Social Media will celebrate African culture, foster continental connections, and provide a safe, empowering space for storytelling, commerce, and community building across the continent.",
    icon: <Share2 className="h-8 w-8" />,
    category: "Business & Tech",
    gradient: "from-violet-500 to-purple-600",
    accent: "bg-violet-100 text-violet-800",
  },
  {
    title: "Ubuntu Technologies",
    description: "A tech enterprise building transformative digital products for Africa — from global payment systems enabling seamless cross-border transactions, to infrastructure solutions that power businesses and governments across the continent.",
    icon: <Cpu className="h-8 w-8" />,
    category: "Business & Tech",
    gradient: "from-emerald-500 to-teal-600",
    accent: "bg-emerald-100 text-emerald-800",
  },
];

const FutureProjects = () => {
  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <Badge variant="outline" className="mb-4 text-sm px-4 py-1 border-utu-red text-utu-red">
          Vision 2030+
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-utu-black font-heading">
          Our Pipeline & Future Projects
        </h2>
        <div className="w-20 h-1 bg-utu-red mx-auto mb-6"></div>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Bold, long-term initiatives that will reshape Africa's future — from world-class institutions 
          to cutting-edge technology platforms, all driven by the spirit of Ubuntu.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {futureProjects.map((project, index) => (
          <Card
            key={index}
            className="group border-0 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden relative"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
            <div className={`h-1.5 bg-gradient-to-r ${project.gradient}`} />
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-white shadow-lg`}>
                  {project.icon}
                </div>
                <Badge className={`${project.accent} border-0 text-xs font-medium`}>
                  {project.category}
                </Badge>
              </div>
              <CardTitle className="text-lg text-utu-black font-heading leading-tight">
                {project.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {project.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FutureProjects;
