import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Clock, Loader2, Heart, BookOpen, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const VolunteerOpportunities = () => {
  const { data: upcomingEvents = [], isLoading: loadingEvents } = useQuery({
    queryKey: ['volunteer-upcoming-events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('active', true)
        .eq('category', 'upcoming')
        .order('event_date')
        .limit(6);
      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const { data: programs = [], isLoading: loadingPrograms } = useQuery({
    queryKey: ['volunteer-programs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('programs')
        .select('id, title, description, image_url, category')
        .eq('active', true)
        .eq('category', 'core')
        .order('display_order')
        .limit(4);
      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const isLoading = loadingEvents || loadingPrograms;

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-utu-red" />
            Upcoming Events
          </CardTitle>
          <CardDescription>
            Events you can participate in or volunteer at
          </CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingEvents.length > 0 ? (
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="border rounded-lg p-4 hover:border-utu-red/30 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-foreground">{event.title}</h4>
                    <Badge variant="outline" className="text-utu-green border-utu-green/30 shrink-0">
                      Upcoming
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{event.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" /> {event.event_date}
                    </span>
                    {event.event_time && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {event.event_time}
                      </span>
                    )}
                    {event.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" /> {event.location}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <Link to="/events">
                <Button variant="outline" className="w-full mt-2">
                  View All Events
                </Button>
              </Link>
            </div>
          ) : (
            <div className="text-center py-6">
              <Calendar className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">No upcoming events right now. Check back soon!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Programs to Volunteer For */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-utu-red" />
            Programs You Can Support
          </CardTitle>
          <CardDescription>
            Our core programs where volunteers make the biggest impact
          </CardDescription>
        </CardHeader>
        <CardContent>
          {programs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {programs.map((program) => (
                <div key={program.id} className="border rounded-lg overflow-hidden hover:border-utu-gold/40 transition-colors group">
                  {program.image_url && (
                    <div className="h-28 overflow-hidden">
                      <img
                        src={program.image_url}
                        alt={`Photo from the ${program.title} volunteer program`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-3">
                    <h4 className="font-semibold text-foreground text-sm mb-1">{program.title}</h4>
                    <p className="text-muted-foreground text-xs line-clamp-2">{program.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <Globe className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">Programs loading...</p>
            </div>
          )}
          <Link to="/programs">
            <Button variant="outline" className="w-full mt-4">
              <BookOpen className="w-4 h-4 mr-2" />
              Explore All Programs
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default VolunteerOpportunities;
