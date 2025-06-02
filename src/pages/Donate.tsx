
import React from 'react';
import Layout from '@/components/layout/Layout';
import DonationForm from '@/components/donation/DonationForm';

const Donate = () => {
  return (
    <Layout>
      <div className="bg-utu-light-gray py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-utu-black font-heading">Make a Donation</h1>
            <div className="w-20 h-1 bg-utu-red mx-auto mb-6"></div>
            <p className="text-lg text-utu-gray">
              Your generous contribution helps us continue our mission of providing 
              sustainable solutions and support to African communities.
            </p>
          </div>

          <DonationForm />
        </div>
      </div>
    </Layout>
  );
};

export default Donate;
