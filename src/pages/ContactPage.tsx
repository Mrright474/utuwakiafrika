
import React from 'react';
import Layout from '@/components/layout/Layout';
import Contact from '@/components/home/Contact';

const ContactPage = () => {
  return (
    <Layout>
      <div className="overflow-x-hidden w-full">
        <Contact />
      </div>
    </Layout>
  );
};

export default ContactPage;
