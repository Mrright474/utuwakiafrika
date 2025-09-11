import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ProgressiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  lowQualitySrc?: string;
  className?: string;
  fallback?: React.ReactNode;
  onLoad?: () => void;
  onError?: () => void;
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  lowQualitySrc,
  className = "",
  fallback,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLowQualityLoaded, setIsLowQualityLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = new Image();
    
    // Load low quality image first if available
    if (lowQualitySrc) {
      const lowQualityImg = new Image();
      lowQualityImg.onload = () => setIsLowQualityLoaded(true);
      lowQualityImg.src = lowQualitySrc;
    }

    // Load high quality image
    img.onload = () => {
      setIsLoaded(true);
      onLoad?.();
    };
    
    img.onerror = () => {
      setHasError(true);
      onError?.();
    };
    
    img.src = src;
  }, [src, lowQualitySrc, onLoad, onError]);

  if (hasError && fallback) {
    return <>{fallback}</>;
  }

  return (
    <div ref={imgRef} className={cn("relative overflow-hidden", className)}>
      {/* Low quality placeholder */}
      {lowQualitySrc && isLowQualityLoaded && !isLoaded && (
        <img
          src={lowQualitySrc}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110"
          loading="eager"
        />
      )}
      
      {/* High quality image */}
      <img
        src={src}
        alt={alt}
        {...props}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-700",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        loading="lazy"
        decoding="async"
      />
      
      {/* Loading indicator */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
          <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default ProgressiveImage;