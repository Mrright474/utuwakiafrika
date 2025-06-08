
import React from 'react';
import { Button } from "@/components/ui/button";
import { Users } from 'lucide-react';
import TeamMemberCard from '../TeamMemberCard';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  role?: string;
}

interface YouthVolunteersSectionProps {
  members: TeamMember[];
  onEditMember: (id: string) => void;
  onVolunteerClick: () => void;
  isAdmin: boolean;
}

const YouthVolunteersSection = ({ 
  members, 
  onEditMember, 
  onVolunteerClick, 
  isAdmin 
}: YouthVolunteersSectionProps) => {
  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-3 text-utu-black">Youth Ambassadors & Volunteers</h3>
        <p className="text-utu-gray max-w-2xl mx-auto">
          Young changemakers across the continent driving grassroots impact and community transformation.
        </p>
        <div className="w-16 h-1 bg-utu-red mx-auto mt-4"></div>
      </div>
      
      {members.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
          {members.map((member) => (
            <TeamMemberCard
              key={member.id}
              {...member}
              onEdit={() => onEditMember(member.id)}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      )}

      <div className="text-center">
        <Button 
          onClick={onVolunteerClick}
          className="bg-utu-red hover:bg-red-700 text-white px-8 py-3 rounded-md transition-colors text-lg"
        >
          <Users className="w-5 h-5 mr-2" />
          Join Our Volunteer Family
        </Button>
      </div>
    </div>
  );
};

export default YouthVolunteersSection;
