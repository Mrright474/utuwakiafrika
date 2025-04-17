
import React from 'react';

interface ProfileImageProps {
  src: string;
  alt: string;
}

const ProfileImage = ({ src, alt }: ProfileImageProps) => {
  return (
    <div className="aspect-square overflow-hidden">
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/placeholder.svg";
        }}
      />
    </div>
  );
};

export default ProfileImage;
