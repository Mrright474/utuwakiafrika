
import React from 'react';
import { Facebook, Twitter, Linkedin, Edit } from 'lucide-react';

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
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow relative">
      {isAdmin && (
        <button 
          onClick={() => onEdit?.(id)}
          className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md z-10 hover:bg-gray-100"
          aria-label="Edit team member"
        >
          <Edit size={16} className="text-utu-red" />
        </button>
      )}
      <div className="aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1 text-utu-black">{name}</h3>
        <p className="text-utu-red font-medium mb-3">{position}</p>
        <p className="text-utu-gray text-sm mb-4">{bio}</p>
        <div className="flex space-x-3">
          <a href="#" className="text-gray-500 hover:text-utu-red transition-colors">
            <Facebook size={18} />
          </a>
          <a href="#" className="text-gray-500 hover:text-utu-red transition-colors">
            <Twitter size={18} />
          </a>
          <a href="#" className="text-gray-500 hover:text-utu-red transition-colors">
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
