
import React, { useState, useEffect } from 'react';
import { MapPin, Users, Award, Heart } from 'lucide-react';
import { ImpactData, defaultImpactData } from './impact/ImpactData';
import StatsSection from './impact/StatsSection';
import UgandaMap from './impact/UgandaMap';
import SuccessStories from './impact/SuccessStories';
import CallToAction from './impact/CallToAction';

const iconComponents = {
  MapPin: <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-utu-red" />,
  Users: <Users className="h-6 w-6 sm:h-8 sm:w-8 text-utu-red" />,
  Award: <Award className="h-6 w-6 sm:h-8 sm:w-8 text-utu-red" />,
  Heart: <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-utu-red" />
};

const Impact = () => {
  const [impactData, setImpactData] = useState<ImpactData>(defaultImpactData);

  useEffect(() => {
    const savedImpact = localStorage.getItem('utu-uganda-impact');
    if (savedImpact) {
      try {
        const parsedData = JSON.parse(savedImpact);
        if (parsedData.stats?.length > 0 || parsedData.ugandaProjects?.length > 0) {
          setImpactData(parsedData);
        }
      } catch (error) {
        console.error("Error parsing Uganda impact data:", error);
      }
    } else {
      // Initialize data if not present
      localStorage.setItem('utu-uganda-impact', JSON.stringify(defaultImpactData));
    }
  }, []);

  return (
    <section id="impact" className="py-12 sm:py-20 bg-gradient-to-b from-white to-utu-light-gray">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 font-heading text-utu-black">Our Impact in Uganda</h2>
          <div className="w-16 sm:w-20 h-1 bg-utu-red mx-auto mb-6"></div>
          <p className="text-base sm:text-lg text-utu-gray">
            Since beginning our work in Uganda in 2023, we've made significant strides in improving lives across the country.
            From education and healthcare to clean water and economic empowerment, our new initiatives have already reached thousands.
          </p>
        </div>

        {/* Key Statistics */}
        <StatsSection stats={impactData.stats} iconComponents={iconComponents} />

        {/* Uganda Map with Impact Points */}
        <UgandaMap />

        {/* Testimonials Carousel */}
        <SuccessStories stories={impactData.successStories} />

        {/* Call to Action */}
        <CallToAction />
      </div>
    </section>
  );
};

export default Impact;
