
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export const useCommunicationTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'command' | 'chat'>('command');
  const [command, setCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<Array<{type: 'input' | 'output', content: string}>>([
    { type: 'output', content: 'Welcome to FlowState Command Terminal v1.0\nType "help" for available commands.' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Hello! I am your AI assistant. How can I help you with your agency today?',
      timestamp: new Date()
    }
  ]);
  const { toast } = useToast();

  // Keyboard shortcut to open terminal with Ctrl+K
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Handle command execution
  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim() === '') return;
    
    // Record command in history
    setCommandHistory(prev => [...prev, { type: 'input', content: command }]);
    
    // Process command
    const commandLower = command.toLowerCase().trim();
    let response = '';
    
    if (commandLower === 'help') {
      response = `Available commands:
help - Show this help message
status - Check system status
clear - Clear terminal history
agents - List active agents
divisions - List agency divisions
create [agent|division] - Create a new resource
deploy - Deploy pending changes`;
    } else if (commandLower === 'status') {
      response = 'System Status: ONLINE\nCPU: 23% | Memory: 45% | Network: Stable\nActive Agents: 14/24\nPending Tasks: 7';
    } else if (commandLower === 'clear') {
      setCommandHistory([{ type: 'output', content: 'Terminal cleared.' }]);
      setCommand('');
      return;
    } else if (commandLower === 'agents') {
      response = 'Active Agents (14):\n- Agent001: Processing data (Analytics Div)\n- Agent007: Executing tasks (Ops Div)\n- Agent013: Learning new models (R&D Div)';
    } else if (commandLower === 'divisions') {
      response = 'Agency Divisions (4):\n- Analytics: 6 agents, 87% efficiency\n- Operations: 8 agents, 92% efficiency\n- R&D: 5 agents, 78% efficiency\n- Strategy: 5 agents, 91% efficiency';
    } else if (commandLower.startsWith('create agent')) {
      response = 'Initializing agent creation wizard...\nNew agent deployment in progress.\nAgent ID will be assigned upon completion.';
    } else if (commandLower.startsWith('create division')) {
      response = 'Initializing division creation wizard...\nPlease specify division name and purpose.';
    } else if (commandLower === 'deploy') {
      response = 'Deployment process initiated.\nValidating configurations...\nDeploying resources to production environment.\nDeployment completed successfully.';
    } else {
      response = `Command not recognized: ${command}\nType "help" for available commands.`;
    }
    
    // Add response to history
    setCommandHistory(prev => [...prev, { type: 'output', content: response }]);
    
    // Clear input
    setCommand('');
  };

  // Handle sending a chat message
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      sender: 'user',
      text: newMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input
    const sentMessage = newMessage;
    setNewMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      let botResponse: string;
      
      if (sentMessage.toLowerCase().includes('help')) {
        botResponse = "I can help with managing your agents, creating workflows, or analyzing performance data. What would you like assistance with?";
      } else if (sentMessage.toLowerCase().includes('agent') || sentMessage.toLowerCase().includes('division')) {
        botResponse = "I can help you manage your agents and divisions. Would you like me to show you the current status, or help you create new ones?";
      } else if (sentMessage.toLowerCase().includes('workflow')) {
        botResponse = "Workflows help automate your agency processes. Would you like to create a new workflow or optimize existing ones?";
      } else if (sentMessage.toLowerCase().includes('task')) {
        botResponse = "I can help manage your tasks. Should I show you pending tasks or help prioritize them?";
      } else if (sentMessage.toLowerCase().includes('performance') || sentMessage.toLowerCase().includes('analytics')) {
        botResponse = "I can provide insights on your agency's performance. Would you like to see key metrics or detailed analytics?";
      } else {
        botResponse = "I'm here to assist with your agency management needs. I can help with agents, divisions, workflows, tasks, and analytics. What area would you like to focus on?";
      }
      
      const botMessage: Message = {
        sender: 'bot',
        text: botResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Notify user if terminal is closed
      if (!isOpen) {
        toast({
          title: "New message from AI Assistant",
          description: botResponse.slice(0, 60) + (botResponse.length > 60 ? "..." : ""),
          duration: 5000,
        });
      }
    }, 1000);
  };

  // Handle key presses in inputs
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (activeTab === 'command') {
        handleCommand(e as any);
      } else {
        handleSendMessage();
      }
    }
  };

  // Format time for chat messages
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Clear terminal history
  const clearTerminal = () => {
    if (activeTab === 'command') {
      setCommandHistory([{ type: 'output', content: 'Terminal cleared. Type "help" for available commands.' }]);
    } else {
      setMessages([{
        sender: 'bot',
        text: 'Chat history cleared. How can I help you today?',
        timestamp: new Date()
      }]);
    }
  };

  return {
    isOpen,
    setIsOpen,
    activeTab,
    setActiveTab,
    command,
    setCommand,
    commandHistory,
    newMessage,
    setNewMessage,
    messages,
    handleCommand,
    handleSendMessage,
    handleKeyPress,
    formatTime,
    clearTerminal
  };
};
