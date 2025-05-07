
import React from 'react';
import Layout from '@/components/layout/Layout';
import Team from '@/components/home/Team';

const TeamPage = () => {
  return (
    <Layout>
      <div className="overflow-x-hidden w-full">
        <Team />
      </div>
    </Layout>
  );
};

export default TeamPage;
