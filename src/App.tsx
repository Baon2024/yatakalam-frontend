import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PhoneForm from "./pages/PhoneForm";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Onboard from "./pages/Onboard";
import { AuthProvider } from "./hooks/authState";
import DeveloperDetails from "./pages/DeveloperDetails";
import HowToIntegrate from "./pages/HowToIntegrate";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Onboard />} />
          <Route path="/index" element={<Index />} />
          <Route path="/phone-form" element={<PhoneForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/howToIntegrate" element={<HowToIntegrate />} />
          <Route path='/developer-details' element={<DeveloperDetails />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
