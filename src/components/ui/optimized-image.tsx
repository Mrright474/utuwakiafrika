import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
  fallback?: React.ReactNode;
  eager?: boolean;
  quality?: 'low' | 'medium' | 'high';
  sizes?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  placeholder,
  className = "",
  fallback,
  eager = false,
  quality = 'medium',
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(eager);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate WebP and fallback sources
  const generateSources = (originalSrc: string) => {
    const isExternal = originalSrc.startsWith('http');
    if (isExternal) return { webp: originalSrc, fallback: originalSrc };
    
    const extension = originalSrc.split('.').pop()?.toLowerCase();
    const baseName = originalSrc.replace(/\.[^/.]+$/, '');
    
    return {
      webp: `${baseName}.webp`,
      fallback: originalSrc
    };
  };

  // Check WebP support
  const supportsWebP = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  };

  useEffect(() => {
    if (eager) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: '300px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [eager]);

  useEffect(() => {
    if (isInView && src) {
      const sources = generateSources(src);
      const preferredSrc = supportsWebP() ? sources.webp : sources.fallback;
      
      // Preload the image
      const img = new Image();
      img.onload = () => {
        setCurrentSrc(preferredSrc);
        setIsLoaded(true);
        setHasError(false);
      };
      img.onerror = () => {
        if (preferredSrc !== sources.fallback) {
          // Try fallback if WebP fails
          const fallbackImg = new Image();
          fallbackImg.onload = () => {
            setCurrentSrc(sources.fallback);
            setIsLoaded(true);
            setHasError(false);
          };
          fallbackImg.onerror = () => {
            setHasError(true);
            setIsLoaded(false);
          };
          fallbackImg.src = sources.fallback;
        } else {
          setHasError(true);
          setIsLoaded(false);
        }
      };
      img.src = preferredSrc;
    }
  }, [isInView, src]);

  if (hasError && fallback) {
    return <>{fallback}</>;
  }

  const qualityClass = {
    low: 'image-rendering: -webkit-optimize-contrast;',
    medium: '',
    high: 'image-rendering: -webkit-crisp-edges;'
  }[quality];

  return (
    <div ref={imgRef} className={cn("relative overflow-hidden", className)}>
      {/* Placeholder with blur effect */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted animate-pulse"
          style={{
            backgroundImage: placeholder ? `url(${placeholder})` : undefined,
            filter: 'blur(2px)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      )}
      
      {/* Main optimized image */}
      {isInView && currentSrc && (
        <img
          src={currentSrc}
          alt={alt}
          {...props}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          sizes={sizes}
          style={props.style}
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          )}
        />
      )}
      
      {/* Loading indicator */}
      {isInView && !isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;