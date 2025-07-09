
import React from 'react';
import { Edit } from 'lucide-react';
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
    <div className="bg-white rounded-lg p-6 text-center relative group">
      {isAdmin && (
        <button 
          onClick={() => onEdit?.(id)}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Edit team member"
        >
          <Edit size={16} className="text-utu-red" />
        </button>
      )}
      
      {/* Circular profile image */}
      <div className="relative w-40 h-40 mx-auto mb-6">
        <div className="w-full h-full rounded-full overflow-hidden bg-gray-100">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105" 
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
            onLoad={(e) => {
              (e.target as HTMLImageElement).style.opacity = '1';
            }}
            style={{ 
              opacity: '0',
              transition: 'opacity 0.3s ease-in-out'
            }}
          />
        </div>
      </div>
      
      {/* Name */}
      <h3 className="text-2xl font-bold mb-2 text-black">{name}</h3>
      
      {/* Position in blue */}
      <p className="text-blue-600 font-medium mb-4 text-lg">{position}</p>
      
      {/* Bio description */}
      <p className="text-gray-600 text-base leading-relaxed max-w-sm mx-auto">
        {bio}
      </p>
    </div>
  );
};

export default TeamMemberCard;
