import React, { memo } from 'react';
import LazyImage from '@/components/ui/lazy-image';

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
      <LazyImage 
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ opacity }}
        placeholder="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZmlsbD0ibm9uZSI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNGNEY0RjUiLz48L3N2Zz4="
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