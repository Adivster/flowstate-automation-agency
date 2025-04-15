
import { useState, useEffect } from 'react';
import { useConversationalFlow } from './useConversationalFlow';

export const useCommunicationTerminal = () => {
  // Terminal state
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'command' | 'chat'>('command');
  const [command, setCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<Array<{type: 'input' | 'output' | 'error' | 'system', content: string}>>([
    { type: 'system', content: 'Terminal initialized. Type "help" for available commands.' }
  ]);
  
  // Chat state
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Array<{sender: 'user' | 'bot', text: string, timestamp: Date, isAction?: boolean, actionId?: string}>>([
    { sender: 'bot', text: 'Hello! I\'m your agency communication assistant. How can I help you today?', timestamp: new Date() }
  ]);
  
  // Conversational flow integration
  const conversationalFlow = useConversationalFlow();
  const { 
    activeContext, 
    contextEntity, 
    pendingPrompts, 
    activeSuggestions,
    hasUnreadInsights,
    processConversationalInput, 
    handlePromptAction,
    markInsightsAsRead 
  } = conversationalFlow;
  
  // Handle anomaly alerts from the useDisplayState hook
  useEffect(() => {
    const handleAnomalyAlert = (event: CustomEvent) => {
      const { anomaly } = event.detail;
      
      if (anomaly) {
        setActiveTab('chat');
        setIsOpen(true);
        
        // Create an action prompt message with the anomaly
        const actionPrompt = {
          id: `anomaly-${Date.now()}`,
          title: `Anomaly Detected: ${anomaly.title}`,
          description: anomaly.description,
          actionType: 'diagnose',
          severity: anomaly.severity,
          entityType: 'division',
          entityId: anomaly.division.toLowerCase(),
          entityName: anomaly.division,
          actions: {
            confirm: 'Investigate',
            decline: 'Dismiss',
            moreInfo: 'Details'
          },
          metrics: {
            before: anomaly.severity === 'high' ? 70 : anomaly.severity === 'medium' ? 80 : 90,
            after: 95,
            unit: '%'
          }
        };
        
        // Add a system message about the anomaly
        setMessages(prev => [
          ...prev,
          {
            sender: 'bot',
            text: `⚠️ Alert: Anomaly detected in ${anomaly.division} division. ${anomaly.description}`,
            timestamp: new Date()
          },
          {
            sender: 'bot',
            text: JSON.stringify(actionPrompt),
            timestamp: new Date(),
            isAction: true,
            actionId: actionPrompt.id
          }
        ]);
      }
    };
    
    // Listen for anomaly alerts
    window.addEventListener('anomalyAlert', handleAnomalyAlert as EventListener);
    
    return () => {
      window.removeEventListener('anomalyAlert', handleAnomalyAlert as EventListener);
    };
  }, [setIsOpen]);
  
  // Handle command submission
  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;
    
    // Add the command to history
    setCommandHistory(prev => [...prev, { type: 'input', content: command }]);
    
    // Process command
    if (command.toLowerCase() === 'clear') {
      clearTerminal();
    } else {
      // Process through the command processor
      setTimeout(() => {
        const output = processCommand(command);
        setCommandHistory(prev => [...prev, { type: 'output', content: output }]);
      }, 300);
    }
    
    // Clear the input
    setCommand('');
  };
  
  // Clear terminal
  const clearTerminal = () => {
    setCommandHistory([{ type: 'system', content: 'Terminal cleared.' }]);
  };
  
  // Handle sending chat messages
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage = { sender: 'user' as const, text: newMessage, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    const userInput = newMessage;
    setNewMessage('');
    
    // Process message through conversational flow
    setTimeout(() => {
      const response = processConversationalInput(userInput);
      
      // Check if this is a context switch
      if (response.message) {
        // Regular message response
        setMessages(prev => [
          ...prev, 
          { 
            sender: 'bot', 
            text: response.message, 
            timestamp: new Date(),
            isAction: !!response.actionTaken
          }
        ]);
      }
      
      // If insights should be shown
      if (response.showInsights && response.insights?.length) {
        markInsightsAsRead();
        
        // Add a message for each insight as an action card
        response.insights.forEach(insight => {
          setMessages(prev => [
            ...prev, 
            { 
              sender: 'bot', 
              text: JSON.stringify(insight), // We'll parse this in the component
              timestamp: new Date(),
              isAction: true,
              actionId: insight.id
            }
          ]);
        });
      }
      
      // If suggestions should be shown
      if (activeSuggestions.length > 0 && Math.random() > 0.5) {
        setTimeout(() => {
          const suggestionText = "Here are some commands you might find helpful:";
          setMessages(prev => [
            ...prev, 
            { 
              sender: 'bot', 
              text: suggestionText, 
              timestamp: new Date(),
            }
          ]);
        }, 1000);
      }
    }, 500);
  };
  
  // Handle key press in terminal
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (activeTab === 'command') {
        handleCommand(e as unknown as React.FormEvent);
      } else {
        handleSendMessage();
      }
    }
  };
  
  // Format time for display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };
  
  // Process terminal commands
  const processCommand = (cmd: string): string => {
    const lowerCmd = cmd.toLowerCase().trim();
    
    if (lowerCmd === 'help') {
      return 'Available commands:\n- help: Show this message\n- status: Check system status\n- list agents: List active agents\n- list divisions: List active divisions\n- chat: Switch to chat mode\n- clear: Clear terminal history\n- show insights: Display pending AI insights';
    }
    
    if (lowerCmd === 'chat') {
      setTimeout(() => setActiveTab('chat'), 500);
      return 'Switching to chat interface...';
    }
    
    if (lowerCmd === 'show insights' || lowerCmd === 'insights') {
      if (pendingPrompts.length === 0) {
        return 'No pending AI insights at the moment.';
      }
      
      let response = `Found ${pendingPrompts.length} pending insights:\n\n`;
      
      pendingPrompts.forEach((prompt, index) => {
        response += `${index + 1}. ${prompt.title} - ${prompt.severity.toUpperCase()} priority\n`;
        response += `   ${prompt.description}\n\n`;
      });
      
      response += `\nUse the chat interface for a more interactive experience with these insights.`;
      
      setTimeout(() => {
        setActiveTab('chat');
        markInsightsAsRead();
      }, 2000);
      
      return response;
    }
    
    // Process other commands through the conversational engine
    const response = processConversationalInput(cmd);
    return response.message || 'Command processed.';
  };
  
  // Handle action responses from the chat
  const handleActionResponse = (promptId: string, action: 'confirm' | 'decline' | 'moreInfo') => {
    const response = handlePromptAction(promptId, action);
    
    if (response) {
      setMessages(prev => [
        ...prev, 
        { 
          sender: 'bot', 
          text: response.message, 
          timestamp: new Date(),
          isAction: !!response.actionTaken
        }
      ]);
    }
  };
  
  // Update notification badge when insights change
  useEffect(() => {
    // If we have unread insights and the terminal is closed, we should show a notification
    // This could be used by the parent component to show a badge
  }, [hasUnreadInsights, isOpen]);
  
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
    hasUnreadInsights,
    pendingPrompts,
    activeSuggestions,
    handleCommand,
    handleSendMessage,
    handleKeyPress,
    formatTime,
    clearTerminal,
    handleActionResponse,
    activeContext,
    contextEntity
  };
};
