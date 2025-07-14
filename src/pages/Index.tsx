
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import BackgroundImage from '@/components/layout/BackgroundImage';
import Hero from '@/components/home/Hero';
import GetInvolved from '@/components/home/GetInvolved';
import Testimonials from '@/components/home/Testimonials';
import Programs from '@/components/home/Programs';
import VisualGallery from '@/components/home/VisualGallery';
import { useLocation } from 'react-router-dom';

const Index = () => {
  const location = useLocation();

  // Enhanced animation for better scroll-triggered effects
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
      { 
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px" 
      }
    );

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Scroll to section if coming from another page with a specific target
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    } else {
      // If no specific scroll target, ensure we're at the top of the page
      window.scrollTo(0, 0);
    }
  }, [location.state]);

  return (
    <Layout>
      <div className="relative overflow-x-hidden w-full">
        <BackgroundImage 
          src="/lovable-uploads/688ac280-0ee5-48ac-8a44-82ad202140e7.png"
          alt="Ubuntu spirit and creating communities across Africa"
          opacity={0.2}
          overlayOpacity={0.85}
        />
        
        {/* Content layer */}
        <div className="relative z-10">
          <Hero />
          <Programs />
          <VisualGallery />
          <Testimonials />
          <GetInvolved />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
