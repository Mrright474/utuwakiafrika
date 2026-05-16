import React from 'react';
import Layout from '@/components/layout/Layout';
import Team from '@/components/home/Team';
import SEO from '@/components/seo/SEO';

const TeamPage = () => {
  return (
    <Layout>
      <SEO
        title="Our Team — Leadership at Utu Wa Kiafrika"
        description="Meet the dedicated leadership and staff driving Utu Wa Kiafrika's Ubuntu-rooted mission across African communities."
        path="/team"
      />
      <div className="overflow-x-hidden w-full">
        <Team />
      </div>
    </Layout>
  );
};

export default TeamPage;
