
import React from 'react';

interface ProfileImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ProfileImage = ({ src, alt, className }: ProfileImageProps) => {
  return (
    <div className="aspect-square overflow-hidden rounded-lg shadow-md">
      <img 
        src={src} 
        alt={alt} 
        className={`w-full h-full object-cover transition-transform hover:scale-105 duration-300 ${className || ''}`}
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/placeholder.svg";
        }}
      />
    </div>
  );
};

export default ProfileImage;
