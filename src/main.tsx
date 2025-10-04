import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Temporarily disable service worker and actively unregister any existing registrations
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((reg) => reg.unregister()));
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));
      console.log('Service workers unregistered and caches cleared');
    } catch (err) {
      console.warn('Failed to unregister SW or clear caches', err);
    }
  });
}


// Preload critical resources
const preloadCriticalResources = () => {
  // Temporarily disabled to troubleshoot caching/412 issues
  return;
  // Preload hero images and critical assets
  const criticalImages = [
    '/lovable-uploads/688ac280-0ee5-48ac-8a44-82ad202140e7.png',
    '/lovable-uploads/b07d8f50-577a-4699-87ba-8759e7ace688.png'
  ];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = src;
    link.as = 'image';
    document.head.appendChild(link);
  });
};

// Initialize performance optimizations
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', preloadCriticalResources);
} else {
  preloadCriticalResources();
}

createRoot(document.getElementById("root")!).render(<App />);
