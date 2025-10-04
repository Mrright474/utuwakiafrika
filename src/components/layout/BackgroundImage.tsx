import React, { memo } from 'react';


interface BackgroundImageProps {
  src: string;
  alt: string;
  opacity?: number;
  overlayOpacity?: number;
  className?: string;
}

const BackgroundImage: React.FC<BackgroundImageProps> = memo(({
  src,
  alt,
  opacity = 0.2,
  overlayOpacity = 0.85,
  className = ""
}) => {
  return (
    <div className={`fixed inset-0 z-0 ${className}`}>
      <img 
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ opacity }}
        loading="eager"
      />
      <div 
        className="absolute inset-0 bg-white"
        style={{ opacity: overlayOpacity }}
      ></div>
    </div>
  );
});

BackgroundImage.displayName = 'BackgroundImage';

export default BackgroundImage;