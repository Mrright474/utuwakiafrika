
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect, ComponentType } from "react";
import ChatBot from "./components/home/ChatBot";
import ScrollToTop from "./components/layout/ScrollToTop";
import { prefetchAllRoutes } from "@/utils/routePrefetch";

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
const Communities = lazyRetry(() => import("./pages/Communities"));
const NotFound = lazyRetry(() => import("./pages/NotFound"));
const UnpAuth = lazyRetry(() => import("./pages/unp/UnpAuth"));
const UnpDashboard = lazyRetry(() => import("./pages/unp/UnpDashboard"));
const UnpApprovals = lazyRetry(() => import("./pages/unp/UnpApprovals"));
const UnpModulePage = lazyRetry(() => import("./pages/unp/UnpModulePage"));
const UnpPermissions = lazyRetry(() => import("./pages/unp/UnpPermissions"));
const UnpAuditLog = lazyRetry(() => import("./pages/unp/UnpAuditLog"));
const UnpFieldCollect = lazyRetry(() => import("./pages/unp/UnpFieldCollect"));

import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";
import UnpProtectedRoute from "./components/unp/UnpProtectedRoute";
import UnpLayout from "./components/unp/UnpLayout";


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
  // Prefetch all route chunks after initial load for instant navigation
  useEffect(() => {
    prefetchAllRoutes();
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
            <Route path="/admin/auth" element={<AdminAuth />} />
            <Route path="/admin" element={<ProtectedAdminRoute><Admin /></ProtectedAdminRoute>} />
            <Route path="/admin/content" element={<ProtectedAdminRoute><ContentManagement /></ProtectedAdminRoute>} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/unp/auth" element={<UnpAuth />} />
            <Route path="/unp" element={<UnpProtectedRoute><UnpLayout><UnpDashboard /></UnpLayout></UnpProtectedRoute>} />
            <Route path="/unp/approvals" element={<UnpProtectedRoute adminOnly><UnpLayout><UnpApprovals /></UnpLayout></UnpProtectedRoute>} />
            <Route path="/unp/permissions" element={<UnpProtectedRoute adminOnly><UnpLayout><UnpPermissions /></UnpLayout></UnpProtectedRoute>} />
            <Route path="/unp/audit" element={<UnpProtectedRoute><UnpLayout><UnpAuditLog /></UnpLayout></UnpProtectedRoute>} />
            <Route path="/unp/field" element={<UnpProtectedRoute><UnpLayout><UnpFieldCollect /></UnpLayout></UnpProtectedRoute>} />
            <Route path="/unp/m/:moduleId" element={<UnpProtectedRoute><UnpLayout><UnpModulePage /></UnpLayout></UnpProtectedRoute>} />
            {import.meta.env.DEV && (
              <Route path="/dev/offline-harness" element={<OfflineHarness />} />
            )}
            <Route path="/admin/*" element={<ProtectedAdminRoute><Admin /></ProtectedAdminRoute>} />


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
