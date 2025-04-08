
import { useToast } from '@/hooks/use-toast';

export const useDashboardActions = () => {
  const { toast } = useToast();

  const handleCreateAgent = () => {
    toast({
      title: "Create New Agent",
      description: "Opening agent creation wizard...",
      duration: 3000
    });
    // In a real app, this would open a modal or navigate to agent creation page
  };

  const handleStartWorkflow = () => {
    toast({
      title: "Start Workflow",
      description: "Opening workflow selection dialog...",
      duration: 3000
    });
    // In a real app, this would open a modal or navigate to workflow page
  };

  const handleQuickTask = () => {
    const event = new CustomEvent('openTaskCreator');
    window.dispatchEvent(event);
    // In a real app, this would open a modal for quick task creation
  };

  return {
    handleCreateAgent,
    handleStartWorkflow,
    handleQuickTask
  };
};
