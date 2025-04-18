
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Programs from '@/components/home/Programs';
import Impact from '@/components/home/Impact';
import Team from '@/components/home/Team';
import GetInvolved from '@/components/home/GetInvolved';
import Testimonials from '@/components/home/Testimonials';
import Contact from '@/components/home/Contact';

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if we have a section to scroll to in the state
    if (location.state && location.state.scrollTo) {
      const sectionId = location.state.scrollTo;
      const section = document.getElementById(sectionId);
      
      if (section) {
        // Use a small timeout to ensure the page has fully loaded
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <Layout>
      <div className="overflow-x-hidden w-full">
        <Hero />
        <About />
        <Programs />
        <Impact />
        <Team />
        <Testimonials />
        <GetInvolved />
        <Contact />
      </div>
    </Layout>
  );
};

export default Index;
