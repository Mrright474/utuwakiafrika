
import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Hospital, ShieldAlert, Share2, Cpu, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useProgramsManagement } from '@/hooks/useProgramsManagement';

const iconMap: Record<string, any> = {
  GraduationCap,
  Hospital,
  ShieldAlert,
  Share2,
  Cpu,
};

const gradientMap: Record<string, string> = {
  GraduationCap: 'from-amber-500 to-orange-600',
  Hospital: 'from-rose-500 to-red-600',
  ShieldAlert: 'from-sky-500 to-blue-600',
  Share2: 'from-violet-500 to-purple-600',
  Cpu: 'from-emerald-500 to-teal-600',
};

const categoryBadgeMap: Record<string, string> = {
  GraduationCap: 'bg-amber-100 text-amber-800',
  Hospital: 'bg-rose-100 text-rose-800',
  ShieldAlert: 'bg-sky-100 text-sky-800',
  Share2: 'bg-violet-100 text-violet-800',
  Cpu: 'bg-emerald-100 text-emerald-800',
};

const slugMap: Record<string, string> = {
  GraduationCap: 'ubuntu-university',
  Hospital: 'ubuntu-hospital',
  ShieldAlert: 'utu-disaster-relief',
  Share2: 'ubuntu-social-media',
  Cpu: 'ubuntu-technologies',
};

const FutureProjects = () => {
  const { programs, loading } = useProgramsManagement();
  const futureProjects = programs.filter(p => p.category === 'future');

  if (loading) {
    return (
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground font-heading">
            Our Pipeline & Future Projects
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <div className="text-center text-muted-foreground">Loading projects...</div>
        </div>
      </div>
    );
  }

  if (futureProjects.length === 0) return null;

  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <Badge variant="outline" className="mb-4 text-sm px-4 py-1 border-primary text-primary">
          Vision 2030+
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground font-heading">
          Our Pipeline & Future Projects
        </h2>
        <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Bold, long-term initiatives that will reshape Africa's future — from world-class institutions 
          to cutting-edge technology platforms, all driven by the spirit of Ubuntu.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {futureProjects.map((project) => {
          const iconKey = project.icon || '';
          const IconComponent = iconMap[iconKey];
          const gradient = gradientMap[iconKey] || 'from-gray-500 to-gray-600';
          const badgeColor = categoryBadgeMap[iconKey] || 'bg-gray-100 text-gray-800';

          return (
            <Link to={`/projects/${slugMap[iconKey] || project.id}`} key={project.id}>
              <Card
                className="group border-0 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden relative h-full"
              >
                {project.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge className={`${badgeColor} border-0 text-xs font-medium absolute top-3 right-3`}>
                      Future Project
                    </Badge>
                  </div>
                )}
                
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                {!project.image && <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />}
                
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg`}>
                      {IconComponent ? <IconComponent className="h-8 w-8" /> : null}
                    </div>
                    {!project.image && (
                      <Badge className={`${badgeColor} border-0 text-xs font-medium`}>
                        Future Project
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg text-foreground font-heading leading-tight">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FutureProjects;
