
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Calendar, MapPin, Users, Clock, Gift, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Events = () => {
  const upcomingEvents = [
    {
      title: "UTU Yearly Conference 2024",
      date: "August 15-18, 2024",
      location: "Accra, Ghana",
      description: "Join 500+ youth leaders, activists, and changemakers from across Africa for workshops, cultural showcases, and leadership forums.",
      image: "/lovable-uploads/b07d8f50-577a-4699-87ba-8759e7ace688.png",
      type: "Conference",
      participants: "500+ Expected"
    },
    {
      title: "Kenya National Donation Day",
      date: "September 21, 2024",
      location: "Nationwide, Kenya",
      description: "A day of mass mobilization where citizens, schools, and businesses unite to contribute resources toward community aid efforts.",
      image: "/lovable-uploads/969161e6-4a43-456e-8ceb-4578f7e45935.png",
      type: "National Event",
      participants: "10,000+ Expected"
    },
    {
      title: "Youth Leadership Camp",
      date: "October 10-15, 2024",
      location: "Kampala, Uganda",
      description: "A week-long intensive program for emerging youth leaders to develop skills in community organizing and social entrepreneurship.",
      image: "/lovable-uploads/a382b382-f2d2-4832-9343-db9d8abb367d.png",
      type: "Training",
      participants: "100+ Youth"
    }
  ];

  const pastEvents = [
    {
      title: "UTU Conference 2023",
      location: "Lagos, Nigeria",
      impact: "450 participants, 25 countries represented",
      description: "Focused on 'Digital Innovation for African Development'"
    },
    {
      title: "Tanzania National Donation Day 2023",
      location: "Dar es Salaam, Tanzania",
      impact: "15,000 participants, $50,000 raised",
      description: "Record-breaking participation in community aid mobilization"
    }
  ];

  return (
    <Layout>
      <div className="py-16 md:py-24 bg-gradient-to-br from-white via-utu-light-gray to-white section-ubuntu">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="mb-6">
              <div className="inline-flex items-center bg-utu-red/10 backdrop-blur-sm border border-utu-red/20 rounded-full px-6 py-3 text-sm font-medium text-utu-red mb-6">
                <Calendar className="mr-2 h-4 w-4" />
                Events & Gatherings
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-utu-black font-heading">
              Utu <span className="text-gradient bg-gradient-to-r from-utu-red via-utu-gold to-utu-green bg-clip-text text-transparent">Events</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-utu-red via-utu-gold to-utu-green mx-auto mb-8"></div>
            <p className="text-xl text-utu-gray leading-relaxed">
              Join us in celebrating African unity, sharing knowledge, and building movements 
              that transform communities across our beautiful continent.
            </p>
          </div>

          {/* Upcoming Events */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-utu-black font-heading">
              Upcoming Events
            </h2>
            <div className="w-20 h-1 bg-utu-red mx-auto mb-12"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => (
                <Card key={index} className="ubuntu-card hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-utu-red/10 text-utu-red text-xs px-2 py-1 rounded-full font-medium">
                        {event.type}
                      </span>
                      <span className="text-utu-gray text-xs flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {event.participants}
                      </span>
                    </div>
                    <CardTitle className="text-xl text-utu-black font-heading">{event.title}</CardTitle>
                    <div className="space-y-1 text-sm text-utu-gray">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-utu-gray leading-relaxed mb-4">
                      {event.description}
                    </CardDescription>
                    <Button className="w-full bg-utu-red hover:bg-red-700 text-white">
                      Register Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* National Donation Days */}
          <div className="bg-ubuntu-gradient text-white p-8 md:p-12 rounded-3xl mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
                National Donation Days
              </h2>
              <p className="text-white/90 text-lg leading-relaxed max-w-3xl mx-auto">
                In every country where Utu operates, we organize National Donation Days — 
                powerful demonstrations of collective action and community solidarity.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {['Kenya', 'Uganda', 'Tanzania', 'Ghana'].map((country, index) => (
                <div key={country} className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gift className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{country}</h3>
                  <p className="text-white/80 text-sm">
                    Next event: Coming Soon
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Past Events */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-utu-black font-heading">
              Past Events & Impact
            </h2>
            <div className="w-20 h-1 bg-utu-green mx-auto mb-12"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pastEvents.map((event, index) => (
                <Card key={index} className="ubuntu-card border-0">
                  <CardHeader>
                    <CardTitle className="text-xl text-utu-black font-heading">{event.title}</CardTitle>
                    <div className="flex items-center text-utu-gray">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-utu-gray mb-3">{event.description}</p>
                    <div className="bg-utu-light-gray p-3 rounded-lg">
                      <p className="text-sm font-semibold text-utu-black">Impact:</p>
                      <p className="text-sm text-utu-gray">{event.impact}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-3xl ubuntu-card">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-utu-black font-heading">
              Be Part of the Movement
            </h2>
            <p className="text-lg text-utu-gray mb-8 max-w-2xl mx-auto leading-relaxed">
              Every event is an opportunity to connect, learn, and contribute to the African renaissance. 
              Join us in person or support our events from wherever you are.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="donate-button text-lg px-8 py-4">
                Sponsor an Event
              </Button>
              <Button variant="outline" className="border-utu-red text-utu-red hover:bg-utu-red hover:text-white text-lg px-8 py-4">
                Get Event Updates
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Events;
