
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Programs from '@/components/home/Programs';
import Testimonials from '@/components/home/Testimonials';
import GetInvolved from '@/components/home/GetInvolved';
import Contact from '@/components/home/Contact';
import Team from '@/components/home/Team';
import Impact from '@/components/home/Impact';

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
        }, 300); // Increased timeout for more reliable scrolling
      }
    } else if (location.hash) {
      // Handle direct URL hash links like /#programs
      const sectionId = location.hash.substring(1); // Remove the # character
      const section = document.getElementById(sectionId);
      
      if (section) {
        // Use a small timeout to ensure the page has fully loaded
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  }, [location]);

  // Add intersection observer for animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <Layout>
      <div className="overflow-x-hidden w-full">
        <Hero />
        <About />
        <Programs />
        <Team />
        <Impact />
        <Testimonials />
        <GetInvolved />
        <Contact />
      </div>
    </Layout>
  );
};

export default Index;
