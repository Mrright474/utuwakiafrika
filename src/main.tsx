import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'

// Register service worker in production only
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', registration.scope);
      
      // Check for updates
      registration.update();
    } catch (error) {
      console.warn('Service Worker registration failed:', error);
    }
  });
}


// Preload critical resources
const preloadCriticalResources = () => {
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
    // Add error handling
    link.onerror = () => console.warn(`Failed to preload: ${src}`);
    document.head.appendChild(link);
  });
};

// Initialize performance optimizations
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', preloadCriticalResources);
} else {
  preloadCriticalResources();
}

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
