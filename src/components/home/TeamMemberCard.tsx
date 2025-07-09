
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
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 relative group">
      {isAdmin && (
        <button 
          onClick={() => onEdit?.(id)}
          className="absolute top-1 right-1 bg-white p-1 rounded-full shadow-md z-10 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Edit team member"
        >
          <Edit size={12} className="text-utu-red" />
        </button>
      )}
      
      {/* Compact image container */}
      <div className="relative w-full h-20 overflow-hidden bg-gray-100">
        <img 
          src={image} 
          alt={name} 
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105" 
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
      
      <div className="p-3">
        <h3 className="text-sm font-bold mb-1 text-utu-black leading-tight">{name}</h3>
        <p className="text-utu-red font-medium mb-2 text-xs">{position}</p>
        <p className="text-utu-gray text-xs mb-2 line-clamp-2 leading-relaxed">{bio}</p>
        <div className="scale-75 origin-left">
          <SocialLinks />
        </div>
      </div>
      
      {/* African-inspired accent border */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-utu-red via-utu-gold to-utu-green opacity-60"></div>
    </div>
  );
};

export default TeamMemberCard;
