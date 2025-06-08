
import React from 'react';
import TeamMemberCard from '../TeamMemberCard';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  role?: string;
}

interface TeamSectionProps {
  title: string;
  description: string;
  members: TeamMember[];
  gridCols?: string;
  onEditMember: (id: string) => void;
  isAdmin: boolean;
}

const TeamSection = ({ 
  title, 
  description, 
  members, 
  gridCols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  onEditMember,
  isAdmin 
}: TeamSectionProps) => {
  if (members.length === 0) return null;

  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-3 text-utu-black">{title}</h3>
        <p className="text-utu-gray max-w-2xl mx-auto">
          {description}
        </p>
        <div className="w-16 h-1 bg-utu-red mx-auto mt-4"></div>
      </div>
      <div className={`grid ${gridCols} gap-6 md:gap-8`}>
        {members.map((member) => (
          <TeamMemberCard
            key={member.id}
            {...member}
            onEdit={() => onEditMember(member.id)}
            isAdmin={isAdmin}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
