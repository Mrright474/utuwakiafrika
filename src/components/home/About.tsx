
import React from 'react';
import AboutHeader from './about/AboutHeader';
import WhoWeAre from './about/WhoWeAre';
import MissionVisionPhilosophy from './about/MissionVisionPhilosophy';
import OurFounder from './about/OurFounder';
import OrganizationalStructure from './about/OrganizationalStructure';
import WhereWeWork from './about/WhereWeWork';
import CoreValues from './about/CoreValues';
import AboutCallToAction from './about/AboutCallToAction';

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white section-ubuntu">
      <div className="container mx-auto px-4">
        <AboutHeader />
        <WhoWeAre />
        <MissionVisionPhilosophy />
        <OurFounder />
        <OrganizationalStructure />
        <WhereWeWork />
        <CoreValues />
        <AboutCallToAction />
      </div>
    </section>
  );
};

export default About;
