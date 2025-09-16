import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Register service worker for performance optimization
if ('serviceWorker' in navigator && import.meta.env.MODE === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
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
