// Service Worker for caching and performance optimization
const CACHE_NAME = 'utu-foundation-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Assets to cache immediately (avoid caching index.html to prevent stale chunk references)
const STATIC_ASSETS = [
  '/manifest.json',
  '/favicon.ico',
  '/robots.txt',
];

// Assets to cache on request
const DYNAMIC_ASSETS_PATTERNS = [
  /\.(js|css|png|jpg|jpeg|svg|webp|woff2?)$/,
  /^\/assets\//,
  /^\/lovable-uploads\//
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Caching static assets...');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Failed to cache static assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and external domains
  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  // Always prefer fresh HTML for navigation to avoid stale chunk references
  if (isPageRequest(request)) {
    event.respondWith(networkFirst(request));
    return;
  }

  if (isStaticAsset(request.url)) {
    event.respondWith(cacheFirst(request));
  } else if (isDynamicAsset(request.url)) {
    event.respondWith(staleWhileRevalidate(request));
  }
});

// Cache strategies
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Cache first strategy failed:', error);
    return new Response('Asset not available', { status: 503 });
  }
}

async function staleWhileRevalidate(request) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    const networkPromise = fetch(request).then(response => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    });

    return cachedResponse || networkPromise;
  } catch (error) {
    console.error('Stale while revalidate strategy failed:', error);
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('Content not available', { status: 503 });
  }
}

async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Network first strategy failed, trying cache:', error);
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page or basic response
    return new Response(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Offline - UTU Foundation</title>
          <style>
            body { font-family: system-ui; text-align: center; padding: 2rem; }
            .offline { color: #666; margin: 2rem 0; }
          </style>
        </head>
        <body>
          <h1>UTU Foundation</h1>
          <div class="offline">You are currently offline</div>
          <p>Please check your internet connection and try again.</p>
        </body>
      </html>
    `, {
      status: 200,
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

// Helper functions
function isStaticAsset(url) {
  return STATIC_ASSETS.some(asset => url.includes(asset)) ||
         url.includes('.css') || 
         url.includes('.js') ||
         url.includes('/assets/');
}

function isDynamicAsset(url) {
  return DYNAMIC_ASSETS_PATTERNS.some(pattern => pattern.test(url));
}

function isPageRequest(request) {
  return request.destination === 'document' ||
         (request.headers.get('accept') && request.headers.get('accept').includes('text/html'));
}

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(handleBackgroundSync());
  }
});

async function handleBackgroundSync() {
  // Handle any queued operations when back online
  console.log('Background sync triggered');
  // Implementation would handle offline form submissions, etc.
}

// Push notifications (if needed later)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/favicon.ico',
      badge: '/badge.png',
      vibrate: [200, 100, 200],
      data: data.data || {}
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});