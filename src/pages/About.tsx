
import React from 'react';
import Layout from '@/components/layout/Layout';
import About from '@/components/home/About';

const AboutPage = () => {
  return (
    <Layout>
      <div className="overflow-x-hidden w-full">
        <About />
      </div>
    </Layout>
  );
};

export default AboutPage;
