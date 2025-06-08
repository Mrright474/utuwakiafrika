
import React from 'react';

interface WorkWithUsSectionProps {
  onVolunteerClick: () => void;
}

const WorkWithUsSection = ({ onVolunteerClick }: WorkWithUsSectionProps) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-12">
      <h3 className="text-xl font-bold mb-4 text-center text-utu-black">Work With Us</h3>
      <p className="text-utu-gray text-center mb-6 max-w-2xl mx-auto">
        We're always looking for passionate individuals to join our team, whether as staff, volunteers, or
        board members. If you're committed to making a difference in African communities, we'd love to hear from you.
      </p>
      <div className="flex justify-center gap-4">
        <button 
          onClick={onVolunteerClick}
          className="bg-utu-red hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors"
        >
          View Open Positions
        </button>
        <button 
          onClick={onVolunteerClick}
          className="border border-utu-red text-utu-red hover:bg-utu-red hover:text-white px-6 py-2 rounded-md transition-colors"
        >
          Volunteer With Us
        </button>
      </div>
    </div>
  );
};

export default WorkWithUsSection;
