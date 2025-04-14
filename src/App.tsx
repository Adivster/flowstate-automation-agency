
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Agents from "./pages/Agents";
import Workflows from "./pages/Workflows";
import Knowledge from "./pages/Knowledge";
import Analytics from "./pages/Analytics";
import Courses from "./pages/Courses";
import Tasks from "./pages/Tasks";
import { LanguageProvider } from "./contexts/LanguageContext";
import { TaskProvider } from "./contexts/TaskContext";
import CommandTerminal from "./components/agents/CommandTerminal";
import { useEffect } from "react";
import { useToast } from "./hooks/use-toast";

const queryClient = new QueryClient();

// Task creator event handler component
const TaskCreatorEventHandler = () => {
  const { toast } = useToast();

  useEffect(() => {
    const handleOpenTaskCreator = () => {
      // In a real app this would open a modal
      toast({
        title: "Quick Task Creation",
        description: "Opening task creation form...",
        duration: 3000,
      });
      
      // This is a simple demonstration. In a real app, we would:
      // 1. Open a modal with a task creation form
      // 2. Or navigate to the tasks page with the form pre-opened
      setTimeout(() => {
        window.location.href = "/tasks";
      }, 1000);
    };

    window.addEventListener("openTaskCreator", handleOpenTaskCreator);
    return () => {
      window.removeEventListener("openTaskCreator", handleOpenTaskCreator);
    };
  }, [toast]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <LanguageProvider>
          <TaskProvider>
            <BrowserRouter>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <TaskCreatorEventHandler />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/agents" element={<Agents />} />
                  <Route path="/workflows" element={<Workflows />} />
                  <Route path="/knowledge" element={<Knowledge />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/tasks" element={<Tasks />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <CommandTerminal />
              </TooltipProvider>
            </BrowserRouter>
          </TaskProvider>
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
