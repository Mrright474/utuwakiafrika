
import React, { memo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Heart, Users, Globe, HandHeart } from 'lucide-react';
import { Link } from 'react-router-dom';
import OptimizedImage from '@/components/ui/optimized-image';

const Hero = memo(() => {
  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section id="hero" className="relative bg-gradient-to-br from-utu-black via-utu-black to-gray-900 text-white overflow-hidden min-h-[90vh] flex items-center">
      {/* Ubuntu-inspired background patterns */}
      <div className="absolute inset-0">
        <OptimizedImage 
          src="/lovable-uploads/b07d8f50-577a-4699-87ba-8759e7ace688.png" 
          alt="African children representing Ubuntu - unity and community" 
          className="w-full h-full object-cover opacity-20"
          eager={true}
          quality="high"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-utu-black via-black/90 to-transparent"></div>
        <div className="absolute inset-0 ubuntu-pattern opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl">
          {/* Ubuntu Philosophy Highlight */}
          <div className="mb-6 animate-fade-in-up">
            <div className="inline-flex items-center bg-utu-red/20 backdrop-blur-sm border border-utu-red/30 rounded-full px-6 py-2 text-sm font-medium">
              <Users className="mr-2 h-4 w-4 text-utu-gold" />
              Ubuntu Philosophy: "I am because we are"
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-8 font-heading leading-tight animate-fade-in-up">
            <span className="text-white">Creating</span>{' '}
            <span className="text-gradient bg-gradient-to-r from-utu-red via-utu-gold to-utu-green bg-clip-text text-transparent">
              Ubuntu-Centered
            </span>
            <br />
            <span className="text-white">Communities</span>{' '}
            <span className="text-utu-gold">Across Africa</span>
          </h1>

          {/* Tagline */}
          <div className="mb-6 animate-fade-in-up delay-200">
            <p className="text-xl sm:text-2xl font-semibold text-utu-gold mb-2">
              "A Helping Hand For Every African"
            </p>
            <p className="text-lg text-gray-200 italic">
              Utu wa Kiafrika - African Humanity
            </p>
          </div>

          {/* Mission Statement */}
          <p className="text-lg sm:text-xl mb-10 text-gray-200 max-w-3xl leading-relaxed animate-fade-in-up delay-300">
            Rooted in Ubuntu philosophy, we build compassionate and self-sustaining African communities 
            through education, empowerment, health, gender equality, and cultural revival. 
            Together, we create a united, empowered, and dignified Africa where every community thrives.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-6 mb-12 animate-fade-in-up delay-400">
            <Link to="/donate">
              <Button className="donate-button group">
                <Heart className="mr-2 h-5 w-5 group-hover:animate-ubuntu-pulse" />
                Join Our Ubuntu Circle
                <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">Donate</span>
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              className="border-2 border-utu-gold text-utu-gold hover:bg-utu-gold hover:text-utu-black px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-white/10"
              onClick={() => scrollToSection('programs')}
            >
              Discover Our Impact <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          {/* Ubuntu Values */}
          <div className="mb-12 animate-fade-in-up delay-500">
            <p className="text-sm text-gray-300 mb-4 font-semibold">Our Ubuntu Foundation:</p>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: Heart, label: "Compassion", color: "text-utu-red" },
                { icon: Users, label: "Unity", color: "text-utu-gold" },
                { icon: HandHeart, label: "Dignity", color: "text-utu-green" },
                { icon: Globe, label: "Community", color: "text-blue-400" }
              ].map((value, index) => (
                <div key={value.label} className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                  <value.icon className={`h-4 w-4 mr-2 ${value.color}`} />
                  <span className="text-white text-sm font-medium">{value.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Statistics - Enhanced */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-up delay-600">
            {[
              { number: "150+", label: "Schools Supported", description: "Educational empowerment" },
              { number: "75", label: "Water Projects", description: "Clean water access" },
              { number: "25K+", label: "Lives Impacted", description: "Ubuntu in action" },
              { number: "45", label: "Communities", description: "United in dignity" }
            ].map((stat, index) => (
              <div key={stat.label} className="text-center ubuntu-card rounded-xl p-6 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                <p className="text-3xl sm:text-4xl font-bold text-utu-red mb-2">{stat.number}</p>
                <p className="text-gray-800 font-semibold text-sm mb-1">{stat.label}</p>
                <p className="text-xs text-gray-600">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Ubuntu Elements */}
      <div className="absolute top-20 right-10 opacity-20 animate-ubuntu-pulse">
        <div className="w-20 h-20 border-2 border-utu-gold rounded-full flex items-center justify-center">
          <Heart className="h-8 w-8 text-utu-gold" />
        </div>
      </div>
      
      <div className="absolute bottom-20 left-10 opacity-20 animate-ubuntu-pulse delay-1000">
        <div className="w-16 h-16 border-2 border-utu-green rounded-full flex items-center justify-center">
          <Users className="h-6 w-6 text-utu-green" />
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
