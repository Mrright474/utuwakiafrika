import React from 'react';
import Layout from '@/components/layout/Layout';
import About from '@/components/home/About';
import SEO from '@/components/seo/SEO';

const AboutPage = () => {
  return (
    <Layout>
      <SEO
        title="About Utu Wa Kiafrika — Our Ubuntu Mission"
        description="Learn about our Ubuntu-rooted mission, founding story, leadership team, and the African communities where we work."
        path="/about"
      />
      <div className="overflow-x-hidden w-full">
        <About />
      </div>
    </Layout>
  );
};

export default AboutPage;
