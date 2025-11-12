
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import ChatBot from "./components/home/ChatBot";
import ScrollToTop from "./components/layout/ScrollToTop";
import { supabase } from "@/integrations/supabase/client";

// Lazy load all page components for better performance
const Index = lazy(() => import("./pages/Index"));
const AboutPage = lazy(() => import("./pages/About"));
const ProgramsPage = lazy(() => import("./pages/Programs"));
const Events = lazy(() => import("./pages/Events"));
const TeamPage = lazy(() => import("./pages/TeamPage"));
const ImpactPage = lazy(() => import("./pages/ImpactPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const Donate = lazy(() => import("./pages/Donate"));
const Admin = lazy(() => import("./pages/NewAdmin"));
const ContentManagement = lazy(() => import("./pages/Admin/ContentManagement"));
const AdminAuth = lazy(() => import("./pages/AdminAuth"));
const VolunteerAuth = lazy(() => import("./pages/VolunteerAuth"));
const VolunteerDashboard = lazy(() => import("./pages/VolunteerDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
      retry: 1
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
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/volunteers/auth" element={<VolunteerAuth />} />
            <Route path="/volunteers/dashboard" element={<VolunteerDashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/content" element={<ContentManagement />} />
            <Route path="/admin/auth" element={<AdminAuth />} />
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
