
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GeminiAIProvider } from "@/hooks/useGeminiAI";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./components/dashboard/Layout";
import ConversationLog from "./components/dashboard/ConversationLog";
import Analytics from "./components/dashboard/Analytics";
import Settings from "./components/dashboard/Settings";
import ParentalControls from "./components/dashboard/ParentalControls";
import Notifications from "./components/dashboard/Notifications";
import NotFound from "./pages/NotFound";
import Features from "./pages/Features";
import AdminSetup from "./pages/AdminSetup";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Customize from "./pages/Customize";
import PreOrderSignup from "./pages/PreOrderSignup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <GeminiAIProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/features" element={<Features />} />
            <Route path="/admin-setup" element={<AdminSetup />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/customize" element={<Customize />} />
            <Route path="/pre-order" element={<PreOrderSignup />} />
            
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="conversations" element={<ConversationLog />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
              <Route path="controls" element={<ParentalControls />} />
              <Route path="notifications" element={<Notifications />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </GeminiAIProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
