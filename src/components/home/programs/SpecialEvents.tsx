
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useProgramsManagement } from '@/hooks/useProgramsManagement';
import { Calendar, Gift } from 'lucide-react';

const iconMap: Record<string, any> = {
  Calendar,
  Gift
};

const SpecialEvents = () => {
  const { programs, loading } = useProgramsManagement();
  
  const specialEvents = programs.filter(p => p.category === 'event');

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-16 ubuntu-card">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-utu-black font-heading">
          Special Events & Initiatives
        </h2>
        <div className="w-20 h-1 bg-utu-gold mx-auto mb-12"></div>
        <div className="text-center text-muted-foreground">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-16 ubuntu-card">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-utu-black font-heading">
        Special Events & Initiatives
      </h2>
      <div className="w-20 h-1 bg-utu-gold mx-auto mb-12"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {specialEvents.map((event) => {
          const IconComponent = event.icon && iconMap[event.icon];
          const icon = IconComponent ? <IconComponent className="h-8 w-8" /> : null;
          
          return (
            <Card key={event.id} className="ubuntu-card hover:shadow-xl transition-all duration-300 border-0">
              <div className={`h-2 ${event.color || 'bg-utu-gold'}`}></div>
              <CardHeader className="text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${(event.color || 'bg-utu-gold').replace('bg-', 'bg-').replace('-500', '-100')}`}>
                  {icon}
                </div>
                <CardTitle className="text-xl text-utu-black font-heading">{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-utu-gray leading-relaxed text-center">
                  {event.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-utu-gray italic">
          📌 <strong>Note:</strong> Visit our Events page for detailed information about upcoming conferences, 
          National Donation Days, and other community initiatives happening across Africa.
        </p>
      </div>
    </div>
  );
};

export default SpecialEvents;
