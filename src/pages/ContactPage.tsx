import React from 'react';
import Layout from '@/components/layout/Layout';
import Contact from '@/components/home/Contact';
import SEO from '@/components/seo/SEO';

const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "name": "Utu Wa Kiafrika Charity Network",
  "url": "https://utuwakiafrika.lovable.app/",
  "email": "info@utuafrika.org",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Kampala Road",
    "addressLocality": "Kampala",
    "addressCountry": "UG"
  },
  "areaServed": "Africa"
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How can I donate to Utu Wa Kiafrika?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Visit our Donate page to make a one-time or recurring contribution securely online."
      }
    },
    {
      "@type": "Question",
      "name": "Can I volunteer with Utu Wa Kiafrika?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — register on our Volunteers page to join community projects and log your service hours."
      }
    },
    {
      "@type": "Question",
      "name": "Where do you operate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We run programs across East Africa with chapters expanding into other regions of the continent."
      }
    }
  ]
};

const ContactPage = () => {
  return (
    <Layout>
      <SEO
        title="Contact Us — Utu Wa Kiafrika"
        description="Get in touch with Utu Wa Kiafrika. Visit us in Kampala, send a message, or find answers to frequently asked questions."
        path="/contact"
        jsonLd={[localBusinessLd, faqLd]}
      />
      <div className="overflow-x-hidden w-full">
        <Contact />
      </div>
    </Layout>
  );
};

export default ContactPage;
