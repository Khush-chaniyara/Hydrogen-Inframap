import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { DataProvider } from "@/contexts/DataContext";
import Login from "./pages/Login";
import ProducerDashboard from "./pages/ProducerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import RegulatorDashboard from "./pages/RegulatorDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Routes>
      <Route path="/" element={
        user?.role === 'producer' ? <ProducerDashboard /> :
        user?.role === 'buyer' ? <BuyerDashboard /> :
        user?.role === 'regulator' ? <RegulatorDashboard /> :
        <NotFound />
      } />
      <Route path="/producer" element={
        user?.role === 'producer' ? <ProducerDashboard /> : <NotFound />
      } />
      <Route path="/buyer" element={
        user?.role === 'buyer' ? <BuyerDashboard /> : <NotFound />
      } />
      <Route path="/regulator" element={
        user?.role === 'regulator' ? <RegulatorDashboard /> : <NotFound />
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <DataProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
