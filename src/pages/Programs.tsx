
import React from 'react';
import Layout from '@/components/layout/Layout';
import Programs from '@/components/home/Programs';

const ProgramsPage = () => {
  return (
    <Layout>
      <div className="overflow-x-hidden w-full">
        <Programs />
      </div>
    </Layout>
  );
};

export default ProgramsPage;
