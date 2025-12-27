import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminProvider, useAdmin } from "@/contexts/AdminContext";
import { SiteContentProvider } from "@/contexts/SiteContentContext";
import { Layout } from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ContentManager from "./pages/admin/ContentManager";
import UserManager from "./pages/admin/UserManager";
import PageManager from "./pages/admin/PageManager";
import Analytics from "./pages/admin/Analytics";
import ContactManager from "./pages/admin/ContactManager";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin } = useAdmin();
  return isAdmin ? <>{children}</> : <Navigate to="/admin/login" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SiteContentProvider>
        <AdminProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/about" element={<Layout><About /></Layout>} />
              <Route path="/services" element={<Layout><Services /></Layout>} />
              <Route path="/contact" element={<Layout><Contact /></Layout>} />
              <Route path="/careers" element={<Layout><Careers /></Layout>} />
              
              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/admin/content" element={<ProtectedRoute><ContentManager /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute><UserManager /></ProtectedRoute>} />
              <Route path="/admin/pages" element={<ProtectedRoute><PageManager /></ProtectedRoute>} />
              <Route path="/admin/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
              <Route path="/admin/contacts" element={<ProtectedRoute><ContactManager /></ProtectedRoute>} />
              
              {/* Catch-all route */}
              <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
          </BrowserRouter>
        </AdminProvider>
      </SiteContentProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
