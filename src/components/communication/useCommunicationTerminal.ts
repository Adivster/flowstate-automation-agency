
import { useState, useEffect, useRef } from 'react';

export interface CommandHistoryItem {
  type: 'input' | 'output';
  content: string;
}

export interface Message {
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export const useCommunicationTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'command' | 'chat'>('command');
  
  // Command terminal state
  const [command, setCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<CommandHistoryItem[]>([
    { type: 'output', content: '> Welcome to the Agency Command Interface v3.2' },
    { type: 'output', content: '> Type "help" for available commands' },
  ]);
  
  // Chat bot state
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: 'Hello! I\'m your agency communication assistant. How can I help you today?', timestamp: new Date() }
  ]);
  
  // Handle command submission
  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    // Add command to history
    setCommandHistory([...commandHistory, { type: 'input', content: command }]);

    // Process command
    let response = 'Command not recognized. Type "help" for available commands.';

    if (command.toLowerCase() === 'help') {
      response = `Available commands:
- status: Check agent status
- spawn [agent-type]: Create new agent
- list agents: List all agents
- assign [task] to [agent]: Assign task
- clear: Clear terminal`;
    } else if (command.toLowerCase() === 'status') {
      response = 'System Status: 24 agents active, 18 tasks in progress, all systems operational.';
    } else if (command.toLowerCase() === 'list agents') {
      response = 'Active Agents: Knowledge Agent, Data Analysis Agent, Security Agent, Development Agent, Research Agent...';
    } else if (command.toLowerCase() === 'clear') {
      setCommandHistory([]);
      setCommand('');
      return;
    } else if (command.toLowerCase().startsWith('spawn')) {
      const agentType = command.split(' ')[1];
      response = `Initiating spawn sequence for new ${agentType || 'generic'} agent...`;
      
      // Add second response after a delay
      setTimeout(() => {
        setCommandHistory(prev => [...prev, { 
          type: 'output', 
          content: `Agent initialization complete. New ${agentType || 'generic'} agent is now active.` 
        }]);
      }, 1500);
    }

    // Add response to history
    setTimeout(() => {
      setCommandHistory(prev => [...prev, { type: 'output', content: response }]);
    }, 300);

    setCommand('');
  };
  
  // Handle chat message submission
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: newMessage, timestamp: new Date() }]);
    setNewMessage('');
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = [
        "I'll connect you with the appropriate agent team right away.",
        "Your request has been logged and an agent will follow up within 2 hours.",
        "I've analyzed your question and am routing it to our knowledge base experts.",
        "Based on your query, I recommend checking our analytics division for insights.",
        "That's a great question! Let me find the best agent to help you with that."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages(prev => [...prev, { sender: 'bot', text: randomResponse, timestamp: new Date() }]);
    }, 1000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (activeTab === 'command') {
        handleCommand(e);
      } else {
        handleSendMessage();
      }
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };
  
  const clearTerminal = () => {
    if (activeTab === 'command') {
      setCommandHistory([
        { type: 'output', content: '> Terminal cleared.' },
        { type: 'output', content: '> Welcome to the Agency Command Interface v3.2' },
        { type: 'output', content: '> Type "help" for available commands' }
      ]);
    } else {
      setMessages([
        { sender: 'bot', text: 'Chat history cleared. How can I help you today?', timestamp: new Date() }
      ]);
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
    clearTerminal,
  };
};
