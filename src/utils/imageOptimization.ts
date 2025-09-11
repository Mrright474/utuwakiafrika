// Image optimization utilities
export const generateOptimizedImageSrc = (
  originalSrc: string,
  options: {
    format?: 'webp' | 'auto';
    quality?: number;
    width?: number;
    height?: number;
  } = {}
) => {
  const { format = 'auto', quality = 80, width, height } = options;
  
  // For external images, return as-is
  if (originalSrc.startsWith('http')) {
    return originalSrc;
  }
  
  // Generate WebP version if format is auto or webp
  if (format === 'webp' || format === 'auto') {
    const baseName = originalSrc.replace(/\.[^/.]+$/, '');
    return `${baseName}.webp`;
  }
  
  return originalSrc;
};

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

export const preloadCriticalImages = async (images: string[]) => {
  const preloadPromises = images.map(src => preloadImage(src));
  
  try {
    await Promise.allSettled(preloadPromises);
  } catch (error) {
    console.warn('Some images failed to preload:', error);
  }
};

// Check if browser supports WebP
export const supportsWebP = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
};

// Generate responsive image sizes
export const generateResponsiveSizes = (
  breakpoints: { [key: string]: number } = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280
  }
) => {
  return Object.entries(breakpoints)
    .map(([key, width]) => `(max-width: ${width}px) 100vw`)
    .join(', ') + ', 100vw';
};