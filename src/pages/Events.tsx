
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Calendar, MapPin, Clock, Users, Loader2, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useEventsManagement } from '@/hooks/useEventsManagement';
import { useRegistrationCounts } from '@/hooks/useRegistrationCounts';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import EventRegistrationForm from '@/components/events/EventRegistrationForm';

const Events = () => {
  const { events, loading } = useEventsManagement();
  const registrationCounts = useRegistrationCounts();
  const [registerEvent, setRegisterEvent] = useState<{ id: string; title: string; date: string } | null>(null);
  const [registerSpecial, setRegisterSpecial] = useState<{ id: string; title: string } | null>(null);

  // Fetch special events from programs table
  const { data: specialEvents = [], isLoading: loadingSpecial } = useQuery({
    queryKey: ['special-events-programs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .eq('category', 'special-events')
        .eq('active', true)
        .order('display_order');
      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const upcomingEvents = events.filter(e => e.category === 'upcoming' && e.active !== false);
  const pastEvents = events.filter(e => e.category === 'past' && e.active !== false);

  return (
    <Layout>
      <div className="bg-gradient-to-b from-white to-utu-light-gray">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-utu-red to-red-700">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-heading">
              Our Events
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Join us in our mission to transform lives across Africa. Participate in our events, 
              workshops, and community gatherings that drive positive change.
            </p>
          </div>
        </section>

        {/* Special Events Section */}
        {(loadingSpecial || specialEvents.length > 0) && (
          <section className="py-16 bg-gradient-to-br from-utu-gold/5 via-white to-utu-red/5">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <div className="inline-flex items-center bg-utu-gold/10 border border-utu-gold/20 rounded-full px-6 py-2 text-sm font-medium text-utu-gold mb-4">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Signature Programs
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">
                  Special Events
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Our flagship annual events that bring together communities across Africa for unity, celebration, and collective impact.
                </p>
              </div>

              {loadingSpecial ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {specialEvents.map((event) => (
                    <Card key={event.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-utu-gold/40 group">
                      <div className="md:flex">
                        <div className="md:w-2/5 aspect-video md:aspect-auto relative overflow-hidden bg-muted">
                          {event.image_url ? (
                            <img
                              src={event.image_url}
                              alt={event.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center min-h-[200px]">
                              <Star className="h-12 w-12 text-utu-gold" />
                            </div>
                          )}
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-utu-gold text-white border-0">
                              <Star className="h-3 w-3 mr-1" />
                              Annual Event
                            </Badge>
                          </div>
                        </div>
                        <div className="md:w-3/5 p-6 flex flex-col justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-foreground mb-3">{event.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                              {event.description}
                            </p>
                          </div>
                          <div className="flex gap-3">
                            <Button 
                              className="flex-1 bg-gradient-to-r from-utu-gold to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-full"
                              onClick={() => setRegisterSpecial({ id: event.id, title: event.title })}
                            >
                              Register Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Upcoming Events */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">
                Upcoming Events
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Don't miss out on these exciting opportunities to make a difference in African communities.
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : upcomingEvents.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No upcoming events at the moment. Check back soon!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video relative overflow-hidden bg-muted">
                      {event.image_url ? (
                        <img 
                          src={event.image_url} 
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Calendar className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-xl text-foreground">{event.title}</CardTitle>
                        {(registrationCounts[event.id] || 0) > 0 && (
                          <Badge className="bg-utu-green/10 text-utu-green border-utu-green/20 shrink-0">
                            <Users className="h-3 w-3 mr-1" />
                            {registrationCounts[event.id]} registered
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                        {event.event_date}
                      </div>
                      {event.event_time && (
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-2 text-primary" />
                          {event.event_time}
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-2 text-primary" />
                          {event.location}
                        </div>
                      )}
                      {event.attendees && (
                        <div className="flex items-center text-muted-foreground">
                          <Users className="h-4 w-4 mr-2 text-primary" />
                          {event.attendees}
                        </div>
                      )}
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {event.description}
                      </p>
                      <Button 
                        onClick={() => setRegisterEvent({ id: event.id, title: event.title, date: event.event_date })}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-4"
                      >
                        Register for Event
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Past Events Impact */}
        {pastEvents.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">
                  Recent Event Impact
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  See the lasting impact of our recent events and initiatives across African communities.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pastEvents.map((event) => (
                  <Card key={event.id} className="text-center p-6">
                    <CardContent className="space-y-4">
                      <h3 className="text-xl font-bold text-foreground">{event.title}</h3>
                      <p className="text-muted-foreground font-medium">{event.event_date}</p>
                      <p className="text-primary font-semibold">{event.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-utu-gold to-yellow-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-heading">
              Want to Host an Event?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Partner with us to organize impactful events in your community. 
              Together, we can create lasting change across Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white text-utu-gold hover:bg-gray-100"
                asChild
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-utu-gold"
                asChild
              >
                <Link to="/programs">View Our Programs</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* Registration Dialog */}
      {registerEvent && (
        <EventRegistrationForm
          open={!!registerEvent}
          onOpenChange={(open) => { if (!open) setRegisterEvent(null); }}
          eventId={registerEvent.id}
          eventTitle={registerEvent.title}
          eventDate={registerEvent.date}
        />
      )}
    </Layout>
  );
};

export default Events;
