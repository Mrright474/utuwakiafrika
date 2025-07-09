
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
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 relative group transform hover:-translate-y-1">
      {isAdmin && (
        <button 
          onClick={() => onEdit?.(id)}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Edit team member"
        >
          <Edit size={16} className="text-utu-red" />
        </button>
      )}
      
      {/* Much larger image container with better aspect ratio */}
      <div className="relative w-full h-64 overflow-hidden bg-gray-100">
        <img 
          src={image} 
          alt={name} 
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110" 
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
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6 text-center">
        <h3 className="text-xl font-bold mb-1 text-utu-black leading-tight">{name}</h3>
        <p className="text-utu-red font-semibold mb-4 text-base uppercase tracking-wide">{position}</p>
        <p className="text-utu-gray text-sm mb-6 line-clamp-3 leading-relaxed text-justify px-2">{bio}</p>
        
        {/* Enhanced social links section */}
        <div className="border-t border-gray-100 pt-4">
          <div className="flex justify-center">
            <SocialLinks />
          </div>
        </div>
      </div>
      
      {/* African-inspired accent border */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-utu-red via-utu-gold to-utu-green"></div>
    </div>
  );
};

export default TeamMemberCard;
