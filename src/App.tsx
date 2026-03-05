
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect, ComponentType } from "react";
import ChatBot from "./components/home/ChatBot";
import ScrollToTop from "./components/layout/ScrollToTop";
import { supabase } from "@/integrations/supabase/client";

const CHUNK_RELOAD_KEY = 'chunk-reload-attempted';

// Retry wrapper for lazy imports (handles stale cache/service worker issues)
function lazyRetry<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  return lazy(() =>
    factory().catch((error) => {
      const hasReloaded = sessionStorage.getItem(CHUNK_RELOAD_KEY) === 'true';

      if (!hasReloaded) {
        sessionStorage.setItem(CHUNK_RELOAD_KEY, 'true');
        window.location.reload();
        return new Promise<{ default: T }>(() => {});
      }

      console.error('Lazy chunk failed after reload:', error);
      const FallbackComponent = (() => (
        <div className="min-h-screen bg-gradient-to-br from-utu-cream via-white to-utu-cream flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold text-utu-black mb-2">Update required</h1>
            <p className="text-utu-gray mb-4">We couldn’t load the latest page assets. Please refresh to continue.</p>
            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem(CHUNK_RELOAD_KEY);
                window.location.reload();
              }}
              className="inline-flex items-center justify-center rounded-md px-4 py-2 bg-utu-red text-white font-medium hover:opacity-90"
            >
              Refresh page
            </button>
          </div>
        </div>
      )) as unknown as T;

      return { default: FallbackComponent };
    })
  );
}

// Lazy load all page components for better performance
const Index = lazyRetry(() => import("./pages/Index"));
const AboutPage = lazyRetry(() => import("./pages/About"));
const ProgramsPage = lazyRetry(() => import("./pages/Programs"));
const Events = lazyRetry(() => import("./pages/Events"));
const TeamPage = lazyRetry(() => import("./pages/TeamPage"));
const ImpactPage = lazyRetry(() => import("./pages/ImpactPage"));
const SuccessStoriesPage = lazyRetry(() => import("./pages/SuccessStories"));
const ContactPage = lazyRetry(() => import("./pages/ContactPage"));
const Donate = lazyRetry(() => import("./pages/Donate"));
const Admin = lazyRetry(() => import("./pages/NewAdmin"));
const ContentManagement = lazyRetry(() => import("./pages/Admin/ContentManagement"));
const AdminAuth = lazyRetry(() => import("./pages/AdminAuth"));
const VolunteerAuth = lazyRetry(() => import("./pages/VolunteerAuth"));
const VolunteerDashboard = lazyRetry(() => import("./pages/VolunteerDashboard"));
const ProjectDetail = lazyRetry(() => import("./pages/ProjectDetail"));
const NotFound = lazyRetry(() => import("./pages/NotFound"));

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="min-h-screen bg-gradient-to-br from-utu-cream via-white to-utu-cream flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-utu-red mb-4"></div>
      <p className="text-utu-gray font-medium">Loading...</p>
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes - prevents unnecessary refetches
      gcTime: 10 * 60 * 1000, // 10 minutes cache
    },
  },
});

const App = () => {
  useEffect(() => {
    const run = async () => {
      try {
        const bootstrapped = localStorage.getItem('adminBootstrappedV3');
        if (bootstrapped === 'true') {
          console.log('Admin bootstrap already completed');
          return;
        }
        
        console.log('Starting admin bootstrap...');
        const { data, error } = await supabase.functions.invoke('create-admin', { body: {} });
        
        if (error) {
          console.error('create-admin invoke error:', error);
          // Don't block the app if admin creation fails
          return;
        } else {
          localStorage.setItem('adminBootstrappedV3', 'true');
          console.info('Admin bootstrap complete:', data);
        }
      } catch (e) {
        console.error('admin bootstrap error:', e);
        // Don't block the app if bootstrap fails
      }
    };
    run();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/events" element={<Events />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/impact" element={<ImpactPage />} />
            <Route path="/stories" element={<SuccessStoriesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/volunteers/auth" element={<VolunteerAuth />} />
            <Route path="/volunteers/dashboard" element={<VolunteerDashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/content" element={<ContentManagement />} />
            <Route path="/admin/auth" element={<AdminAuth />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/admin/*" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <ChatBot />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
