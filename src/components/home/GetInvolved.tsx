
import React from 'react';
import { Heart, HandHelping, DollarSign, BookOpen, Globe, Users, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const GetInvolved = () => {
  return (
    <section id="get-involved" className="africa-section bg-gradient-to-br from-utu-light-gray via-white to-gray-50 section-ubuntu">
      <div className="container mx-auto px-4 relative z-10">
        {/* Ubuntu-inspired header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="mb-6">
            <div className="inline-flex items-center bg-utu-red/10 backdrop-blur-sm border border-utu-red/20 rounded-full px-6 py-2 text-sm font-medium text-utu-red mb-4">
              <Users className="mr-2 h-4 w-4" />
              Ubuntu in Action: "Your contribution creates our collective strength"
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-utu-black font-heading">
            Join Our <span className="text-gradient bg-gradient-to-r from-utu-red via-utu-gold to-utu-green bg-clip-text text-transparent">Ubuntu Circle</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-utu-red via-utu-gold to-utu-green mx-auto mb-8"></div>
          <p className="text-xl text-utu-gray leading-relaxed">
            There are many ways to embody Ubuntu and support our Pan-African mission. 
            Every act of compassion, unity, and dignity creates ripples of positive change 
            across African communities. Here's how you can be part of our collective humanity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Ubuntu Giving - Donate */}
          <Card className="ubuntu-card rounded-2xl border-2 hover:border-utu-red transition-all duration-500 relative overflow-hidden group hover:shadow-ubuntu">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-utu-red/20 to-transparent rounded-bl-full transition-all duration-500 group-hover:w-full group-hover:h-full group-hover:rounded-none group-hover:opacity-10"></div>
            <CardHeader className="text-center relative z-10 pb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-utu-red to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-utu-black">Ubuntu Giving</CardTitle>
              <CardDescription className="text-utu-gray">Support our collective mission financially</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-utu-gray mb-6 leading-relaxed">
                Your generous contribution embodies the Ubuntu spirit of shared responsibility. 
                Every donation, regardless of size, strengthens our collective ability to 
                uplift African communities and create lasting change.
              </p>
              
              <div className="bg-white/80 rounded-xl p-4 mb-6 border border-utu-red/20">
                <h4 className="font-semibold text-utu-black mb-3 flex items-center">
                  <Heart className="mr-2 h-4 w-4 text-utu-red" />
                  Impact Levels
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2 bg-utu-red/10 rounded-lg border border-utu-red/20 hover:bg-utu-red hover:text-white transition-colors cursor-pointer">
                    <p className="font-bold text-sm">$25</p>
                    <p className="text-xs">Unity</p>
                  </div>
                  <div className="text-center p-2 bg-utu-gold/10 rounded-lg border border-utu-gold/20 hover:bg-utu-gold hover:text-white transition-colors cursor-pointer">
                    <p className="font-bold text-sm">$50</p>
                    <p className="text-xs">Dignity</p>
                  </div>
                  <div className="text-center p-2 bg-utu-green/10 rounded-lg border border-utu-green/20 hover:bg-utu-green hover:text-white transition-colors cursor-pointer">
                    <p className="font-bold text-sm">$100</p>
                    <p className="text-xs">Ubuntu</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="relative z-10">
              <Link to="/donate" className="w-full">
                <Button className="w-full donate-button">
                  <Heart className="mr-2 h-4 w-4" />
                  Contribute via Airtel Money
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Ubuntu Service - Volunteer */}
          <Card className="ubuntu-card rounded-2xl border-2 hover:border-utu-gold transition-all duration-500 relative overflow-hidden group hover:shadow-africa">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-utu-gold/20 to-transparent rounded-bl-full transition-all duration-500 group-hover:w-full group-hover:h-full group-hover:rounded-none group-hover:opacity-10"></div>
            <CardHeader className="text-center relative z-10 pb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-utu-gold to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <HandHelping className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-utu-black">Ubuntu Service</CardTitle>
              <CardDescription className="text-utu-gray">Share your skills and time with purpose</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-utu-gray mb-6 leading-relaxed">
                Ubuntu teaches us that our humanity is interconnected. By volunteering your skills 
                and time, you directly contribute to building stronger, more resilient African communities.
              </p>
              <div className="space-y-3 mb-6">
                {[
                  { icon: Globe, text: "Field volunteers across Africa", color: "text-utu-red" },
                  { icon: Lightbulb, text: "Professional services & mentorship", color: "text-utu-gold" },
                  { icon: BookOpen, text: "Educational program support", color: "text-utu-green" },
                  { icon: Users, text: "Virtual assistance & advocacy", color: "text-blue-600" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start p-2 rounded-lg hover:bg-white/60 transition-colors">
                    <item.icon className={`h-5 w-5 ${item.color} mr-3 mt-0.5 shrink-0`} /> 
                    <span className="text-utu-gray text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="relative z-10">
              <Link to="/volunteers/auth" className="w-full">
                <Button className="w-full bg-gradient-to-r from-utu-gold to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105">
                  <HandHelping className="mr-2 h-4 w-4" />
                  Join Our Ubuntu Network
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Ubuntu Partnership */}
          <Card className="ubuntu-card rounded-2xl border-2 hover:border-utu-green transition-all duration-500 relative overflow-hidden group hover:shadow-africa">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-utu-green/20 to-transparent rounded-bl-full transition-all duration-500 group-hover:w-full group-hover:h-full group-hover:rounded-none group-hover:opacity-10"></div>
            <CardHeader className="text-center relative z-10 pb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-utu-green to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Globe className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-utu-black">Ubuntu Partnerships</CardTitle>
              <CardDescription className="text-utu-gray">Collaborate for Pan-African impact</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-utu-gray mb-6 leading-relaxed">
                Ubuntu believes in the power of collective action. Partner with us as an organization, 
                business, or institution to amplify our shared impact across African communities.
              </p>
              <div className="space-y-3 mb-6">
                {[
                  { icon: Globe, text: "Corporate social responsibility", color: "text-utu-red" },
                  { icon: Users, text: "Institutional collaborations", color: "text-utu-gold" },
                  { icon: BookOpen, text: "NGO networks & alliances", color: "text-utu-green" },
                  { icon: Heart, text: "Resource sharing & capacity building", color: "text-blue-600" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start p-2 rounded-lg hover:bg-white/60 transition-colors">
                    <item.icon className={`h-5 w-5 ${item.color} mr-3 mt-0.5 shrink-0`} /> 
                    <span className="text-utu-gray text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="relative z-10">
              <Link to="/contact" className="w-full">
                <Button className="w-full bg-gradient-to-r from-utu-green to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105">
                  <Globe className="mr-2 h-4 w-4" />
                  Build Ubuntu Together
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        
        {/* Ubuntu Community Newsletter */}
        <div className="ubuntu-card rounded-3xl p-10 shadow-xl border border-white/20 bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-sm">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-utu-red via-utu-gold to-utu-green rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-utu-black">Stay Connected to Our Ubuntu Journey</h3>
              <p className="text-utu-gray mb-8 text-lg leading-relaxed">
                Subscribe to receive inspiring stories of Ubuntu in action, project updates, 
                and opportunities to deepen your involvement in building compassionate African communities.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-6 py-4 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-utu-red focus:border-transparent text-lg bg-white/80 backdrop-blur-sm"
              />
              <Button className="donate-button whitespace-nowrap">
                <Heart className="mr-2 h-4 w-4" />
                Join Ubuntu Updates
              </Button>
            </div>
            
            <p className="text-sm text-utu-gray mt-4 flex items-center justify-center">
              <Users className="mr-2 h-4 w-4" />
              We honor your privacy and will never share your information. Ubuntu values trust.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;
