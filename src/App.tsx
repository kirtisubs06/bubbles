
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import TeddyDemo from "./pages/TeddyDemo";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import PreOrderSignup from "./pages/PreOrderSignup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/teddy-demo" element={<TeddyDemo />} />
          <Route path="/pre-order" element={<PreOrderSignup />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="conversations" element={<ConversationLog />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
            <Route path="controls" element={<ParentalControls />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
