
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Calendar, MapPin, Clock, Users, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useEventsManagement } from '@/hooks/useEventsManagement';

const Events = () => {
  const { events, loading } = useEventsManagement();

  const upcomingEvents = events.filter(e => e.category === 'upcoming' && e.active !== false);
  const pastEvents = events.filter(e => e.category === 'past' && e.active !== false);

  const handleEventRegistration = (eventTitle: string) => {
    alert(`Registration for "${eventTitle}" would be available here. Please contact us to register for this event.`);
  };

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
                      <CardTitle className="text-xl text-foreground">{event.title}</CardTitle>
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
                        onClick={() => handleEventRegistration(event.title)}
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
    </Layout>
  );
};

export default Events;
