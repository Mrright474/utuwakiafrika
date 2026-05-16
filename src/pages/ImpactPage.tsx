import React from 'react';
import Layout from '@/components/layout/Layout';
import Impact from '@/components/home/Impact';
import SEO from '@/components/seo/SEO';

const ImpactPage = () => {
  return (
    <Layout>
      <SEO
        title="Our Impact — Lives Changed Across Africa"
        description="See the measurable impact of Utu Wa Kiafrika: schools supported, water projects built, and thousands of lives uplifted."
        path="/impact"
      />
      <div className="overflow-x-hidden w-full">
        <Impact />
      </div>
    </Layout>
  );
};

export default ImpactPage;
