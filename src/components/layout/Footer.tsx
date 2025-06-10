
import React from 'react';
import FooterLogo from './footer/FooterLogo';
import FooterQuickLinks from './footer/FooterQuickLinks';
import FooterPrograms from './footer/FooterPrograms';
import FooterContact from './footer/FooterContact';
import FooterCopyright from './footer/FooterCopyright';
import ScrollToTopButton from './footer/ScrollToTopButton';

const Footer = () => {
  return (
    <footer className="bg-utu-black text-white pt-12 sm:pt-16 pb-6 sm:pb-8 relative">
      <ScrollToTopButton />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <FooterLogo />
          <FooterQuickLinks />
          <FooterPrograms />
          <FooterContact />
        </div>

        <FooterCopyright />
      </div>
    </footer>
  );
};

export default Footer;
