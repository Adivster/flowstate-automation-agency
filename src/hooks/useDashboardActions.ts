
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export const useDashboardActions = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCreateAgent = () => {
    toast({
      title: "Create New Agent",
      description: "Opening agent creation wizard...",
      duration: 3000
    });
    // In a real app, this would open a modal or navigate to agent creation page
    setTimeout(() => {
      navigate('/agents');
    }, 800);
  };

  const handleStartWorkflow = () => {
    toast({
      title: "Start Workflow",
      description: "Opening workflow selection dialog...",
      duration: 3000
    });
    // In a real app, this would open a modal or navigate to workflow page
    setTimeout(() => {
      navigate('/workflows');
    }, 800);
  };

  const handleQuickTask = () => {
    const event = new CustomEvent('openTaskCreator');
    window.dispatchEvent(event);
    // In a real app, this would open a modal for quick task creation
  };
  
  const handleOptimizeResources = () => {
    toast({
      title: "Resource Optimization",
      description: "Analyzing and optimizing system resources...",
      duration: 3000
    });
    
    setTimeout(() => {
      toast({
        title: "Optimization Complete",
        description: "System resources have been optimized. Performance improved by 12%.",
        duration: 4000
      });
    }, 2000);
  };
  
  const handleRunAnalysis = () => {
    toast({
      title: "Running Analysis",
      description: "Analyzing performance data and generating insights...",
      duration: 3000
    });
    
    setTimeout(() => {
      navigate('/analytics');
    }, 1500);
  };
  
  const handleSystemAlert = (message: string) => {
    toast({
      title: "System Alert",
      description: message,
      duration: 5000,
      variant: "destructive"
    });
  };
  
  const handleAiConsult = () => {
    toast({
      title: "AI Consultation",
      description: "Opening AI advisor interface...",
      duration: 3000
    });
    
    // Trigger communication terminal opening
    const event = new CustomEvent('openCommunication');
    window.dispatchEvent(event);
  };

  const handleCreateDivision = () => {
    toast({
      title: "Create Division",
      description: "Opening division creation interface...",
      duration: 3000
    });
    
    setTimeout(() => {
      navigate('/divisions');
    }, 800);
  };

  return {
    handleCreateAgent,
    handleStartWorkflow,
    handleQuickTask,
    handleOptimizeResources,
    handleRunAnalysis,
    handleSystemAlert,
    handleAiConsult,
    handleCreateDivision
  };
};
