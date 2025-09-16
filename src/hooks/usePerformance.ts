import { useEffect } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  domContentLoaded: number;
  firstPaint: number;
  firstContentfulPaint: number;
}

export const usePerformance = (enabled: boolean = true) => {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const measurePerformance = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      const metrics: PerformanceMetrics = {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
      };

      // Log metrics in development
      if (import.meta.env.MODE === 'development') {
        console.group('🚀 Performance Metrics');
        console.log('Load Time:', `${metrics.loadTime.toFixed(2)}ms`);
        console.log('DOM Content Loaded:', `${metrics.domContentLoaded.toFixed(2)}ms`);
        console.log('First Paint:', `${metrics.firstPaint.toFixed(2)}ms`);
        console.log('First Contentful Paint:', `${metrics.firstContentfulPaint.toFixed(2)}ms`);
        console.groupEnd();
      }

      return metrics;
    };

    // Measure after load
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
      return () => window.removeEventListener('load', measurePerformance);
    }
  }, [enabled]);
};

export default usePerformance;