// Map of routes to their dynamic import functions for prefetching
const routeImports: Record<string, () => Promise<any>> = {
  '/': () => import('@/pages/Index'),
  '/about': () => import('@/pages/About'),
  '/programs': () => import('@/pages/Programs'),
  '/events': () => import('@/pages/Events'),
  '/team': () => import('@/pages/TeamPage'),
  '/impact': () => import('@/pages/ImpactPage'),
  '/stories': () => import('@/pages/SuccessStories'),
  '/contact': () => import('@/pages/ContactPage'),
  '/donate': () => import('@/pages/Donate'),
  '/communities': () => import('@/pages/Communities'),
  '/volunteers/auth': () => import('@/pages/VolunteerAuth'),
};

const prefetched = new Set<string>();

/** Prefetch a route's JS chunk so navigation is instant */
export function prefetchRoute(path: string) {
  if (prefetched.has(path)) return;
  const importFn = routeImports[path];
  if (importFn) {
    prefetched.add(path);
    importFn().catch(() => {
      // Remove from set so it can retry
      prefetched.delete(path);
    });
  }
}

/** Prefetch all primary routes after idle (call once on app mount) */
export function prefetchAllRoutes() {
  const prefetchAll = () => {
    Object.keys(routeImports).forEach((path) => {
      prefetchRoute(path);
    });
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(prefetchAll, { timeout: 3000 });
  } else {
    setTimeout(prefetchAll, 2000);
  }
}
