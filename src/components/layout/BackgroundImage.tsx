import React from 'react';

interface BackgroundImageProps {
  src: string;
  alt: string;
  opacity?: number;
  overlayOpacity?: number;
  className?: string;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({
  src,
  alt,
  opacity = 0.2,
  overlayOpacity = 0.85,
  className = ""
}) => {
  return (
    <div className={`fixed inset-0 z-0 ${className}`}>
      <img 
        src={`${src}?t=${Date.now()}`}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ opacity }}
      />
      <div 
        className="absolute inset-0 bg-white"
        style={{ opacity: overlayOpacity }}
      ></div>
    </div>
  );
};

export default BackgroundImage;