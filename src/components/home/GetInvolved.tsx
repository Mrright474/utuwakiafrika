
import React from 'react';
import { Heart, HandHelping, DollarSign, BookOpen, GlobeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const GetInvolved = () => {
  return (
    <section id="get-involved" className="py-16 md:py-24 bg-gradient-to-b from-white to-utu-light-gray">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-utu-black font-heading">Get Involved</h2>
          <div className="w-20 h-1 bg-utu-red mx-auto mb-6"></div>
          <p className="text-lg text-utu-gray">
            There are many ways you can support our mission and make a difference in the lives of
            people across Africa. Here's how you can help us create lasting change.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Donate */}
          <Card className="border-2 hover:border-utu-red transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-utu-red/10 rounded-bl-full transition-all duration-300 group-hover:w-full group-hover:h-full group-hover:rounded-none group-hover:opacity-10"></div>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-utu-red/10 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110">
                <DollarSign className="h-8 w-8 text-utu-red" />
              </div>
              <CardTitle className="text-2xl">Donate</CardTitle>
              <CardDescription>Support our programs financially</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-utu-gray mb-4">
                Your generous donation helps us implement our programs and reach more people in need.
                Every contribution, no matter how small, makes a difference in the lives of communities across Africa.
              </p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <Button variant="outline" className="border-utu-red text-utu-red hover:bg-utu-red hover:text-white">$25</Button>
                <Button variant="outline" className="border-utu-red text-utu-red hover:bg-utu-red hover:text-white">$50</Button>
                <Button variant="outline" className="border-utu-red text-utu-red hover:bg-utu-red hover:text-white">$100</Button>
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/donate" className="w-full">
                <Button className="w-full bg-utu-red hover:bg-red-700 text-white">Donate Now</Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Volunteer */}
          <Card className="border-2 hover:border-utu-red transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-utu-red/10 rounded-bl-full transition-all duration-300 group-hover:w-full group-hover:h-full group-hover:rounded-none group-hover:opacity-10"></div>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-utu-red/10 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110">
                <HandHelping className="h-8 w-8 text-utu-red" />
              </div>
              <CardTitle className="text-2xl">Volunteer</CardTitle>
              <CardDescription>Share your skills and time</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-utu-gray mb-4">
                We welcome volunteers with diverse skills and backgrounds. Whether you can volunteer
                in person or virtually, your time and expertise can make a significant impact.
              </p>
              <ul className="space-y-2 mb-4 text-utu-gray">
                <li className="flex items-start">
                  <BookOpen className="h-5 w-5 text-utu-red mr-2 mt-0.5 shrink-0" /> 
                  <span>Field volunteers in Africa</span>
                </li>
                <li className="flex items-start">
                  <BookOpen className="h-5 w-5 text-utu-red mr-2 mt-0.5 shrink-0" /> 
                  <span>Professional services</span>
                </li>
                <li className="flex items-start">
                  <BookOpen className="h-5 w-5 text-utu-red mr-2 mt-0.5 shrink-0" /> 
                  <span>Skilled mentors</span>
                </li>
                <li className="flex items-start">
                  <BookOpen className="h-5 w-5 text-utu-red mr-2 mt-0.5 shrink-0" /> 
                  <span>Virtual assistance</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link to="/contact" className="w-full">
                <Button className="w-full bg-utu-red hover:bg-red-700 text-white">Become a Volunteer</Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Partner */}
          <Card className="border-2 hover:border-utu-red transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-utu-red/10 rounded-bl-full transition-all duration-300 group-hover:w-full group-hover:h-full group-hover:rounded-none group-hover:opacity-10"></div>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-utu-red/10 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110">
                <Heart className="h-8 w-8 text-utu-red" />
              </div>
              <CardTitle className="text-2xl">Partner With Us</CardTitle>
              <CardDescription>Collaborate for greater impact</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-utu-gray mb-4">
                We believe in the power of partnerships. Partner with us as an organization, business,
                or institution to create sustainable impact across African communities.
              </p>
              <ul className="space-y-2 mb-4 text-utu-gray">
                <li className="flex items-start">
                  <BookOpen className="h-5 w-5 text-utu-red mr-2 mt-0.5 shrink-0" /> 
                  <span>Corporate partnerships</span>
                </li>
                <li className="flex items-start">
                  <BookOpen className="h-5 w-5 text-utu-red mr-2 mt-0.5 shrink-0" /> 
                  <span>Institutional collaborations</span>
                </li>
                <li className="flex items-start">
                  <BookOpen className="h-5 w-5 text-utu-red mr-2 mt-0.5 shrink-0" /> 
                  <span>NGO networks</span>
                </li>
                <li className="flex items-start">
                  <BookOpen className="h-5 w-5 text-utu-red mr-2 mt-0.5 shrink-0" /> 
                  <span>Resource sharing</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link to="/contact" className="w-full">
                <Button className="w-full bg-utu-red hover:bg-red-700 text-white">Partner With Us</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        
        {/* Newsletter signup */}
        <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-utu-black">Stay Updated</h3>
            <p className="text-utu-gray mb-6">
              Subscribe to our newsletter to receive updates on our projects, impact stories, and opportunities to get involved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-utu-red"
              />
              <Button className="bg-utu-red hover:bg-red-700 text-white">Subscribe</Button>
            </div>
            <p className="text-xs text-utu-gray mt-3">
              We respect your privacy and will never share your information.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;
