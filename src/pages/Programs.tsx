import React from 'react';
import Layout from '@/components/layout/Layout';
import Programs from '@/components/home/Programs';
import SEO from '@/components/seo/SEO';

const ProgramsPage = () => {
  return (
    <Layout>
      <SEO
        title="Our Programs — Education, Health & Empowerment"
        description="Explore our core programs: education support, clean water, healthcare, women's empowerment, and youth leadership across Africa."
        path="/programs"
      />
      <div className="overflow-x-hidden w-full">
        <Programs />
      </div>
    </Layout>
  );
};

export default ProgramsPage;
