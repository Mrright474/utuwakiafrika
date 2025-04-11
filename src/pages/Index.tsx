
import React from 'react';
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
