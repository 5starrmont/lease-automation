
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Houses from "./pages/Houses";
import Tenants from "./pages/Tenants";
import Payments from "./pages/Payments";
import Maintenance from "./pages/Maintenance";
import KplcTokens from "./pages/KplcTokens";
import MoveEvents from "./pages/MoveEvents";
import Receipts from "./pages/Receipts";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

// Role-based route protection
const RoleRoute = ({ 
  children, 
  allowedRoles 
}: { 
  children: React.ReactNode, 
  allowedRoles: string[] 
}) => {
  const { isAuthenticated, isLoading, role } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (role && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      
      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* House Management Routes */}
      <Route 
        path="/houses" 
        element={
          <ProtectedRoute>
            <Houses />
          </ProtectedRoute>
        } 
      />
      
      {/* Tenant Management Routes */}
      <Route 
        path="/tenants" 
        element={
          <ProtectedRoute>
            <Tenants />
          </ProtectedRoute>
        } 
      />
      
      {/* Payment Routes */}
      <Route 
        path="/payments" 
        element={
          <ProtectedRoute>
            <Payments />
          </ProtectedRoute>
        } 
      />
      
      {/* Maintenance Routes */}
      <Route 
        path="/maintenance" 
        element={
          <RoleRoute allowedRoles={['admin', 'landlord', 'tenant', 'caretaker']}>
            <Maintenance />
          </RoleRoute>
        } 
      />
      
      {/* Reminder Routes */}
      <Route 
        path="/reminders" 
        element={
          <RoleRoute allowedRoles={['admin', 'landlord']}>
            <NotFound /> {/* Placeholder until we create this page */}
          </RoleRoute>
        } 
      />
      
      {/* KPLC Token Routes for Tenants */}
      <Route 
        path="/kplc" 
        element={
          <RoleRoute allowedRoles={['tenant']}>
            <KplcTokens />
          </RoleRoute>
        } 
      />
      
      {/* Receipt Routes */}
      <Route 
        path="/receipts" 
        element={
          <RoleRoute allowedRoles={['tenant', 'landlord']}>
            <Receipts />
          </RoleRoute>
        } 
      />
      
      {/* Move In/Out Routes for Caretakers */}
      <Route 
        path="/moves" 
        element={
          <RoleRoute allowedRoles={['caretaker', 'landlord']}>
            <MoveEvents />
          </RoleRoute>
        } 
      />
      
      {/* User Management Routes for Admin */}
      <Route 
        path="/users" 
        element={
          <RoleRoute allowedRoles={['admin']}>
            <NotFound /> {/* Placeholder until we create this page */}
          </RoleRoute>
        } 
      />
      
      {/* Settings Route */}
      <Route 
        path="/settings" 
        element={
          <RoleRoute allowedRoles={['admin', 'landlord']}>
            <NotFound /> {/* Placeholder until we create this page */}
          </RoleRoute>
        } 
      />
      
      {/* Profile Route */}
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
