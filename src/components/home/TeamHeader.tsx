
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface TeamHeaderProps {
  isAdmin: boolean;
  onAddMember: () => void;
}

const TeamHeader = ({ isAdmin, onAddMember }: TeamHeaderProps) => {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-utu-black font-heading">Our Team</h2>
      <div className="w-20 h-1 bg-utu-red mx-auto mb-6"></div>
      <p className="text-lg text-utu-gray">
        Meet the dedicated professionals who work tirelessly to achieve our mission of providing
        a helping hand for every African.
      </p>
      {isAdmin && (
        <>
          <Button 
            onClick={onAddMember} 
            className="mt-6 bg-utu-red hover:bg-red-700"
          >
            <Plus className="mr-2" size={16} />
            Add Team Member
          </Button>
        </>
      )}
    </div>
  );
};

export default TeamHeader;
