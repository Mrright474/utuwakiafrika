
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Annual Fundraising Gala",
      date: "March 15, 2024",
      time: "6:00 PM - 10:00 PM",
      location: "Kampala Serena Hotel, Uganda",
      description: "Join us for an evening of celebration and fundraising to support our ongoing projects across Africa.",
      image: "/lovable-uploads/b07d8f50-577a-4699-87ba-8759e7ace688.png",
      attendees: "200+ expected"
    },
    {
      id: 2,
      title: "Community Health Workshop",
      date: "April 8, 2024",
      time: "9:00 AM - 4:00 PM",
      location: "Jinja Community Center, Uganda",
      description: "Educational workshop on preventive healthcare and hygiene practices for rural communities.",
      image: "/lovable-uploads/52fedddf-3da6-485c-af83-de0020326139.png",
      attendees: "150+ expected"
    },
    {
      id: 3,
      title: "Youth Leadership Summit",
      date: "May 20, 2024",
      time: "8:00 AM - 6:00 PM",
      location: "Nairobi Conference Center, Kenya",
      description: "Empowering young African leaders with skills and knowledge for community development.",
      image: "/lovable-uploads/969161e6-4a43-456e-8ceb-4578f7e45935.png",
      attendees: "300+ expected"
    }
  ];

  const pastEvents = [
    {
      title: "Water Project Launch - Mbarara",
      date: "January 2024",
      impact: "Provided clean water access to 5,000 residents"
    },
    {
      title: "Educational Support Initiative",
      date: "December 2023",
      impact: "Distributed school supplies to 1,200 students"
    },
    {
      title: "Women's Empowerment Workshop",
      date: "November 2023",
      impact: "Trained 85 women in entrepreneurship skills"
    }
  ];

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
              <h2 className="text-3xl md:text-4xl font-bold text-utu-black mb-4 font-heading">
                Upcoming Events
              </h2>
              <p className="text-utu-gray text-lg max-w-2xl mx-auto">
                Don't miss out on these exciting opportunities to make a difference in African communities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-utu-black">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-utu-gray">
                      <Calendar className="h-4 w-4 mr-2 text-utu-red" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-utu-gray">
                      <Clock className="h-4 w-4 mr-2 text-utu-red" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-utu-gray">
                      <MapPin className="h-4 w-4 mr-2 text-utu-red" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-utu-gray">
                      <Users className="h-4 w-4 mr-2 text-utu-red" />
                      {event.attendees}
                    </div>
                    <p className="text-utu-gray text-sm leading-relaxed">
                      {event.description}
                    </p>
                    <Button 
                      onClick={() => handleEventRegistration(event.title)}
                      className="w-full bg-utu-red hover:bg-red-700 text-white mt-4"
                    >
                      Register for Event
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Past Events Impact */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-utu-black mb-4 font-heading">
                Recent Event Impact
              </h2>
              <p className="text-utu-gray text-lg max-w-2xl mx-auto">
                See the lasting impact of our recent events and initiatives across African communities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pastEvents.map((event, index) => (
                <Card key={index} className="text-center p-6">
                  <CardContent className="space-y-4">
                    <h3 className="text-xl font-bold text-utu-black">{event.title}</h3>
                    <p className="text-utu-gray font-medium">{event.date}</p>
                    <p className="text-utu-red font-semibold">{event.impact}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

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
