
import React from 'react';
import ProgramsHeader from './programs/ProgramsHeader';
import CorePrograms from './programs/CorePrograms';
import SpecialEvents from './programs/SpecialEvents';
import ProgramsApproach from './programs/ProgramsApproach';
import ProgramsCallToAction from './programs/ProgramsCallToAction';

const Programs = () => {
  return (
    <section id="programs" className="py-16 md:py-24 bg-gradient-to-br from-white via-utu-light-gray to-white section-ubuntu">
      <div className="container mx-auto px-4">
        <ProgramsHeader />
        <CorePrograms />
        <SpecialEvents />
        <ProgramsApproach />
        <ProgramsCallToAction />
      </div>
    </section>
  );
};

export default Programs;
