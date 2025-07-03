
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
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative group transform hover:-translate-y-1">
      {isAdmin && (
        <button 
          onClick={() => onEdit?.(id)}
          className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md z-10 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Edit team member"
        >
          <Edit size={16} className="text-utu-red" />
        </button>
      )}
      
      {/* Much smaller image container */}
      <div className="relative w-full h-32 overflow-hidden bg-gray-100">
        <img 
          src={image} 
          alt={name} 
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" 
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
      
      <div className="p-6">
        <h3 className="text-lg font-bold mb-1 text-utu-black leading-tight">{name}</h3>
        <p className="text-utu-red font-medium mb-3 text-sm">{position}</p>
        <p className="text-utu-gray text-sm mb-4 line-clamp-3 leading-relaxed">{bio}</p>
        <SocialLinks />
      </div>
      
      {/* African-inspired accent border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-utu-red via-utu-gold to-utu-green opacity-60"></div>
    </div>
  );
};

export default TeamMemberCard;
