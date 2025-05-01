
import React from 'react';
import { Edit } from 'lucide-react';
import ProfileImage from './ProfileImage';
import SocialLinks from './SocialLinks';

interface TeamMemberCardProps {
  id: string;
  image: string;
  name: string;
  position: string;
  bio: string;
  onEdit?: (id: string) => void;
  isAdmin?: boolean;
}

const TeamMemberCard = ({ 
  id, 
  image, 
  name, 
  position, 
  bio, 
  onEdit, 
  isAdmin = false 
}: TeamMemberCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow relative group">
      {isAdmin && (
        <button 
          onClick={() => onEdit?.(id)}
          className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md z-10 hover:bg-gray-100"
          aria-label="Edit team member"
        >
          <Edit size={16} className="text-utu-red" />
        </button>
      )}
      <div className="overflow-hidden">
        <ProfileImage 
          src={image} 
          alt={name} 
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" 
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1 text-utu-black">{name}</h3>
        <p className="text-utu-red font-medium mb-3">{position}</p>
        <p className="text-utu-gray text-sm mb-4 line-clamp-3">{bio}</p>
        <SocialLinks />
      </div>
    </div>
  );
};

export default TeamMemberCard;
