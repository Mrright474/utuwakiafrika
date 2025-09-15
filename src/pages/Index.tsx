
import React, { useEffect, memo } from 'react';
import Layout from '@/components/layout/Layout';
import BackgroundImage from '@/components/layout/BackgroundImage';
import Hero from '@/components/home/Hero';
import GetInvolved from '@/components/home/GetInvolved';
import Testimonials from '@/components/home/Testimonials';
import Programs from '@/components/home/Programs';
import VisualGallery from '@/components/home/VisualGallery';
import { useLocation } from 'react-router-dom';
import LazySection from '@/components/utils/LazySection';
import usePerformance from '@/hooks/usePerformance';
import { usePerformanceOptimizations } from '@/hooks/usePerformanceOptimizations';

const Index = memo(() => {
  const location = useLocation();
  
  // Track performance metrics
  usePerformance(true);
  
  // Initialize performance optimizations
  usePerformanceOptimizations({
    enableMetrics: true,
    enablePreloading: true,
    criticalResources: [
      '/lovable-uploads/b07d8f50-577a-4699-87ba-8759e7ace688.png', // Hero image
      '/lovable-uploads/6cd3fe56-1a5f-44a7-9c67-f1e38eff4112.png', // Gallery image 1
      '/lovable-uploads/6e4d1df8-d37f-467d-8f9d-092e8406b823.png', // Gallery image 2
      '/lovable-uploads/688ac280-0ee5-48ac-8a44-82ad202140e7.png', // Background image
    ]
  });

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
        <link rel="preload" as="image" href="/lovable-uploads/688ac280-0ee5-48ac-8a44-82ad202140e7.png" />
        <link rel="preload" as="image" href="/lovable-uploads/b07d8f50-577a-4699-87ba-8759e7ace688.png" />
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
          <LazySection>
            <VisualGallery />
          </LazySection>
          <LazySection>
            <Testimonials />
          </LazySection>
          <LazySection rootMargin="600px">
            <GetInvolved />
          </LazySection>
        </div>
      </div>
    </Layout>
  );
});

Index.displayName = 'Index';

export default Index;
