
import React from 'react';
import { Heart, Users, Globe, Handshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutCallToAction = () => {
  return (
    <div className="text-center bg-gradient-to-br from-utu-black via-gray-900 to-utu-black text-white p-12 md:p-16 rounded-3xl bg-[url('/lovable-uploads/b07d8f50-577a-4699-87ba-8759e7ace688.png')] bg-cover bg-center bg-blend-overlay">
      <div className="bg-black/70 p-8 rounded-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white font-heading">Join Our Ubuntu Circle</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-utu-red via-utu-gold to-utu-green mx-auto mb-8"></div>
        
        <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
          The spirit of Ubuntu calls us to remember that we rise by lifting others. 
          Your involvement — whether as a volunteer, donor, or ambassador — strengthens 
          our collective impact and brings dignity to communities across Africa.
        </p>
        
        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10 italic">
          "Umuntu ngumuntu ngabantu" — A person is a person through other persons.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button 
            className="donate-button group px-8 py-4 text-lg"
            asChild
          >
            <Link to="/donate">
              <Heart className="mr-2 h-5 w-5 group-hover:animate-ubuntu-pulse" />
              Become a Ubuntu Supporter
            </Link>
          </Button>
          <Button 
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-utu-black px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-white/10"
            asChild
          >
            <Link to="/contact">
              <Users className="mr-2 h-5 w-5" />
              Get Involved
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="text-center">
            <Heart className="h-8 w-8 text-utu-red mx-auto mb-3" />
            <h4 className="font-bold text-white mb-2">Volunteer</h4>
            <p className="text-white/80 text-sm">Share your skills and passion with communities in need.</p>
          </div>
          <div className="text-center">
            <Globe className="h-8 w-8 text-utu-gold mx-auto mb-3" />
            <h4 className="font-bold text-white mb-2">Advocate</h4>
            <p className="text-white/80 text-sm">Spread awareness and champion African dignity.</p>
          </div>
          <div className="text-center">
            <Handshake className="h-8 w-8 text-utu-green mx-auto mb-3" />
            <h4 className="font-bold text-white mb-2">Partner</h4>
            <p className="text-white/80 text-sm">Collaborate with us to amplify our collective impact.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCallToAction;
