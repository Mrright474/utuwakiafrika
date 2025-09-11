import { useEffect, useCallback, useRef } from 'react';
import { performanceMonitor, preloadResource, monitorMemoryUsage } from '@/utils/performance';
import { preloadCriticalImages } from '@/utils/imageOptimization';

interface UsePerformanceOptimizationsOptions {
  enableMetrics?: boolean;
  enablePreloading?: boolean;
  enableMemoryMonitoring?: boolean;
  criticalResources?: string[];
}

export const usePerformanceOptimizations = ({
  enableMetrics = true,
  enablePreloading = true,
  enableMemoryMonitoring = false,
  criticalResources = []
}: UsePerformanceOptimizationsOptions = {}) => {
  const metricsReported = useRef(false);
  const memoryInterval = useRef<NodeJS.Timeout>();

  // Preload critical resources including optimized images
  useEffect(() => {
    if (enablePreloading && criticalResources.length > 0) {
      const images = criticalResources.filter(resource => 
        resource.match(/\.(jpg|jpeg|png|webp|svg)$/)
      );
      const otherResources = criticalResources.filter(resource => 
        !resource.match(/\.(jpg|jpeg|png|webp|svg)$/)
      );

      // Preload images with optimized loading
      if (images.length > 0) {
        preloadCriticalImages(images).catch(console.warn);
      }

      // Preload other resources (CSS, JS)
      otherResources.forEach(resource => {
        if (resource.endsWith('.css')) {
          preloadResource(resource, 'style');
        } else if (resource.match(/\.(js|ts)$/)) {
          preloadResource(resource, 'script');
        }
      });
    }
  }, [enablePreloading, criticalResources]);

  // Report performance metrics
  const reportMetrics = useCallback(() => {
    if (enableMetrics && !metricsReported.current) {
      // Wait for page to be fully loaded
      if (document.readyState === 'complete') {
        setTimeout(() => {
          performanceMonitor.reportMetrics();
          metricsReported.current = true;
        }, 1000);
      }
    }
  }, [enableMetrics]);

  // Monitor memory usage
  useEffect(() => {
    if (enableMemoryMonitoring && process.env.NODE_ENV === 'development') {
      memoryInterval.current = setInterval(() => {
        const memory = monitorMemoryUsage();
        if (memory && memory.used > memory.limit * 0.8) {
          console.warn('High memory usage detected:', memory);
        }
      }, 10000); // Check every 10 seconds

      return () => {
        if (memoryInterval.current) {
          clearInterval(memoryInterval.current);
        }
      };
    }
  }, [enableMemoryMonitoring]);

  // Set up performance reporting
  useEffect(() => {
    if (document.readyState === 'complete') {
      reportMetrics();
    } else {
      window.addEventListener('load', reportMetrics);
      return () => window.removeEventListener('load', reportMetrics);
    }
  }, [reportMetrics]);

  // Enhanced image optimization utilities
  const optimizeImage = useCallback((src: string, options: {
    quality?: number;
    format?: 'webp' | 'avif' | 'auto';
    width?: number;
    height?: number;
  } = {}) => {
    const { quality = 80, format = 'auto', width, height } = options;
    
    // For external images or if no optimization service is available
    if (src.startsWith('http') || !src.includes('/lovable-uploads/')) {
      return src;
    }

    // Generate WebP version for better performance
    if (format === 'webp' || format === 'auto') {
      const baseName = src.replace(/\.[^/.]+$/, '');
      return `${baseName}.webp`;
    }

    return src;
  }, []);

  // Debounced resize handler for performance
  const createDebouncedResize = useCallback((callback: () => void, delay = 250) => {
    let timeoutId: NodeJS.Timeout;
    
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(callback, delay);
    };
  }, []);

  // Intersection observer for performance monitoring
  const createPerformanceObserver = useCallback((
    callback: (entries: IntersectionObserverEntry[]) => void,
    options: IntersectionObserverInit = {}
  ) => {
    if ('IntersectionObserver' in window) {
      return new IntersectionObserver(callback, {
        rootMargin: '50px',
        threshold: 0.1,
        ...options
      });
    }
    return null;
  }, []);

  return {
    optimizeImage,
    createDebouncedResize,
    createPerformanceObserver,
    reportMetrics: () => performanceMonitor.reportMetrics(),
    getMetrics: () => performanceMonitor.getMetrics(),
    getMemoryUsage: () => monitorMemoryUsage(),
    preloadImages: (images: string[]) => preloadCriticalImages(images)
  };
};