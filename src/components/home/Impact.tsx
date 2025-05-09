
import React, { useState, useEffect } from 'react';
import { MapPin, Users, Award, Heart } from 'lucide-react';
import { ImpactData, defaultImpactData } from './impact/ImpactData';
import StatsSection from './impact/StatsSection';
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
    const savedImpact = localStorage.getItem('utu-impact');
    if (savedImpact) {
      try {
        const parsedData = JSON.parse(savedImpact);
        if (parsedData.stats?.length > 0) {
          setImpactData(parsedData);
        }
      } catch (error) {
        console.error("Error parsing impact data:", error);
      }
    } else {
      // Initialize data if not present
      localStorage.setItem('utu-impact', JSON.stringify(defaultImpactData));
    }
  }, []);

  return (
    <section id="impact" className="py-12 sm:py-20 bg-gradient-to-b from-white to-utu-light-gray">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 font-heading text-utu-black">Our Impact</h2>
          <div className="w-16 sm:w-20 h-1 bg-utu-red mx-auto mb-6"></div>
          <p className="text-base sm:text-lg text-utu-gray">
            Since our founding, we've made significant strides in improving lives across Africa.
            From education and healthcare to clean water and economic empowerment, our initiatives 
            have already reached thousands of people in need.
          </p>
        </div>

        {/* Key Statistics */}
        <StatsSection stats={impactData.stats} iconComponents={iconComponents} />

        {/* Impact Areas */}
        <div className="mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
          <h3 className="text-xl sm:text-2xl font-bold mb-8 text-center font-heading text-utu-black">Areas of Impact</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Education */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-3 text-utu-black">Education</h4>
              <p className="text-utu-gray mb-4">
                We've built 15 schools, provided over 2,000 scholarships, and distributed learning
                materials to more than 5,000 students across East Africa. Our teacher training
                programs have equipped 300+ educators with improved teaching methodologies.
              </p>
              <div className="bg-utu-light-gray rounded-lg p-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-utu-black">School Construction</span>
                  <span className="text-sm font-medium text-utu-black">60%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-utu-red h-2.5 rounded-full" style={{ width: '60%' }}></div>
                </div>

                <div className="flex justify-between mb-1 mt-3">
                  <span className="text-sm font-medium text-utu-black">Scholarship Programs</span>
                  <span className="text-sm font-medium text-utu-black">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-utu-red h-2.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>

            {/* Healthcare */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-3 text-utu-black">Healthcare</h4>
              <p className="text-utu-gray mb-4">
                Our mobile clinics have served over 7,500 patients in remote areas. We've conducted
                health education campaigns reaching 12,000+ community members, and provided essential
                medical supplies to 22 rural health centers across Uganda, Kenya, and Tanzania.
              </p>
              <div className="bg-utu-light-gray rounded-lg p-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-utu-black">Mobile Clinics</span>
                  <span className="text-sm font-medium text-utu-black">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-utu-red h-2.5 rounded-full" style={{ width: '85%' }}></div>
                </div>

                <div className="flex justify-between mb-1 mt-3">
                  <span className="text-sm font-medium text-utu-black">Medication Supply</span>
                  <span className="text-sm font-medium text-utu-black">70%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-utu-red h-2.5 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>

            {/* Water Projects */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-3 text-utu-black">Clean Water</h4>
              <p className="text-utu-gray mb-4">
                We've installed 75 water wells and 30 rainwater harvesting systems, providing
                clean water to over 15,000 people. Our water purification initiatives have reduced
                waterborne diseases by 65% in the communities we serve.
              </p>
              <div className="bg-utu-light-gray rounded-lg p-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-utu-black">Well Construction</span>
                  <span className="text-sm font-medium text-utu-black">80%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-utu-red h-2.5 rounded-full" style={{ width: '80%' }}></div>
                </div>

                <div className="flex justify-between mb-1 mt-3">
                  <span className="text-sm font-medium text-utu-black">Water Treatment</span>
                  <span className="text-sm font-medium text-utu-black">65%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-utu-red h-2.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>

            {/* Economic Empowerment */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-3 text-utu-black">Economic Empowerment</h4>
              <p className="text-utu-gray mb-4">
                Our microfinance programs have supported 500+ entrepreneurs with small business loans.
                We've conducted vocational training for 1,200 youth and women, with 78% of graduates
                securing employment or starting their own businesses.
              </p>
              <div className="bg-utu-light-gray rounded-lg p-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-utu-black">Entrepreneurship</span>
                  <span className="text-sm font-medium text-utu-black">70%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-utu-red h-2.5 rounded-full" style={{ width: '70%' }}></div>
                </div>

                <div className="flex justify-between mb-1 mt-3">
                  <span className="text-sm font-medium text-utu-black">Skills Development</span>
                  <span className="text-sm font-medium text-utu-black">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-utu-red h-2.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <SuccessStories stories={impactData.successStories} />

        {/* Annual Impact Report */}
        <div className="mb-16 bg-white p-8 rounded-lg shadow-md animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
          <div className="md:flex items-center">
            <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
              <img 
                src="/lovable-uploads/b07d8f50-577a-4699-87ba-8759e7ace688.png" 
                alt="Impact Report" 
                className="rounded-lg shadow-md"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
            </div>
            <div className="md:w-2/3">
              <h3 className="text-xl font-bold mb-4 text-utu-black">2024 Annual Impact Report</h3>
              <p className="text-utu-gray mb-4">
                Our latest impact report details the progress we've made across our key focus areas,
                highlights successful initiatives, and outlines our strategic priorities for the coming year.
              </p>
              <ul className="list-disc pl-5 mb-4 text-utu-gray">
                <li>25% increase in educational support programs</li>
                <li>35% growth in healthcare services provided</li>
                <li>18 new water projects completed</li>
                <li>200+ new businesses supported through microfinance</li>
              </ul>
              <button className="bg-utu-red hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors">
                Download Full Report
              </button>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <CallToAction />
      </div>
    </section>
  );
};

export default Impact;
