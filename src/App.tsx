import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "react-hot-toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Play from "./pages/Play";
import Analysis from "./pages/Analysis";
import Connect from "./pages/Connect";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'hsl(0, 0%, 24%)',
            color: 'hsl(0, 0%, 100%)',
            border: '1px solid hsl(0, 0%, 30%)',
          },
        }}
      />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/play" element={<Play />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/connect" element={<Connect />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
