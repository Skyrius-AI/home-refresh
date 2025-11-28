import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { useAuth } from "@/hooks/useAuth";
import { TourProvider } from "@/contexts/TourContext";
import { GlobalTour } from "@/components/GlobalTour";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Index from "./pages/Index";
import Library from "./pages/Library";
import Notes from "./pages/Notes";
import Recall from "./pages/Recall";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-accent border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/landing" replace />;
  }

  return <>{children}</>;
}

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full relative">
        <BackgroundBeams className="opacity-30" />
        <AppSidebar />
        <SidebarInset className="flex-1 relative z-10">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

function AppContent() {
  return (
    <div className="dark">
      <Toaster />
      <Sonner />
      <Routes>
        {/* Public routes */}
        <Route path="/landing" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/onboarding" element={<Onboarding />} />

        {/* Protected routes with sidebar */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Index />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/library"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Library />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Notes />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/recall"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Recall />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Profile />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <TourProvider>
          <GlobalTour />
          <AppContent />
        </TourProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
