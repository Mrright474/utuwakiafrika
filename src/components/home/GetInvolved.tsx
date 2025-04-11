
import React from 'react';
import { Heart, HandHelping, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const GetInvolved = () => {
  return (
    <section id="get-involved" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-utu-black font-heading">Get Involved</h2>
          <div className="w-20 h-1 bg-utu-red mx-auto mb-6"></div>
          <p className="text-lg text-utu-gray">
            There are many ways you can support our mission and make a difference in the lives of
            people across Africa. Here's how you can help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Donate */}
          <Card className="border-2 hover:border-utu-red transition-colors">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-utu-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-utu-red" />
              </div>
              <CardTitle className="text-2xl">Donate</CardTitle>
              <CardDescription>Support our programs financially</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-utu-gray mb-4">
                Your generous donation helps us implement our programs and reach more people in need.
                Every contribution, no matter how small, makes a difference.
              </p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <Button variant="outline" className="border-utu-red text-utu-red hover:bg-utu-red hover:text-white">$25</Button>
                <Button variant="outline" className="border-utu-red text-utu-red hover:bg-utu-red hover:text-white">$50</Button>
                <Button variant="outline" className="border-utu-red text-utu-red hover:bg-utu-red hover:text-white">$100</Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-utu-red hover:bg-red-700 text-white">Donate Now</Button>
            </CardFooter>
          </Card>

          {/* Volunteer */}
          <Card className="border-2 hover:border-utu-red transition-colors">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-utu-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
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
                <li>• Field volunteers</li>
                <li>• Professional services</li>
                <li>• Skilled mentors</li>
                <li>• Virtual assistance</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-utu-red hover:bg-red-700 text-white">Become a Volunteer</Button>
            </CardFooter>
          </Card>

          {/* Partner */}
          <Card className="border-2 hover:border-utu-red transition-colors">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-utu-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
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
                <li>• Corporate partnerships</li>
                <li>• Institutional collaborations</li>
                <li>• NGO networks</li>
                <li>• Resource sharing</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-utu-red hover:bg-red-700 text-white">Partner With Us</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;
