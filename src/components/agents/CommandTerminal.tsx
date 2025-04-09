
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, Send, Download, RotateCcw, Plus, Code, MessageCircle, ChevronDown, Bot } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

// This is a refactored version of CommandTerminal with real-time updates
const CommandTerminal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'command' | 'chat'>('command');
  const { toast } = useToast();
  const { t } = useLanguage();
  const terminalRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  
  // Command terminal state
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{type: 'input' | 'output' | 'error' | 'system', content: string, timestamp: Date}>>([
    { type: 'system', content: 'Terminal initialized. Connected to agency network.', timestamp: new Date() }
  ]);
  const [showExamples, setShowExamples] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Chat bot state
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot', text: string, timestamp: Date }[]>([
    { sender: 'bot', text: 'Hello! I\'m your agency communication assistant. How can I help you today?', timestamp: new Date() }
  ]);
  
  const exampleCommands = [
    { label: 'System Status', command: 'status' },
    { label: 'List Agents', command: 'list agents' },
    { label: 'Connect to Agent', command: 'connect Knowledge Engineer' },
    { label: 'Deploy New Agent', command: 'deploy Marketing Specialist' },
    { label: 'Create Task', command: 'create task "Update knowledge base" priority:high' },
  ];
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'j') {
        setIsVisible(v => !v);
      }
    };
    
    const handleOpenTerminal = () => {
      setIsVisible(true);
    };
    
    const handleOpenCommandTerminal = () => {
      setIsVisible(true);
      setActiveTab('command');
    };
    
    const handleOpenCommunicationTerminal = () => {
      setIsVisible(true);
      setActiveTab('chat');
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('openCommunicationTerminal', handleOpenCommunicationTerminal);
    window.addEventListener('openCommandTerminal', handleOpenCommandTerminal);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('openCommunicationTerminal', handleOpenCommunicationTerminal);
      window.removeEventListener('openCommandTerminal', handleOpenCommandTerminal);
    };
  }, []);
  
  useEffect(() => {
    if (isVisible) {
      if (activeTab === 'command' && inputRef.current) {
        inputRef.current.focus();
      }
    }
    
    // Scroll to bottom when history/messages change
    if (terminalRef.current && activeTab === 'command') {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
    if (chatRef.current && activeTab === 'chat') {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [isVisible, history, messages, activeTab]);
  
  // Handle command submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add input to history
    setHistory(prev => [...prev, { type: 'input', content: input, timestamp: new Date() }]);
    setIsProcessing(true);
    setShowExamples(false);
    
    // Process the command - this would connect to an actual API in a real app
    setTimeout(() => {
      processCommand(input);
      setInput('');
      setIsProcessing(false);
    }, 300);
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
        handleSubmit(e);
      } else {
        handleSendMessage();
      }
    }
  };

  const handleExampleClick = (command: string) => {
    setInput(command);
    setShowExamples(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  const processCommand = (cmd: string) => {
    const lowerCmd = cmd.toLowerCase().trim();
    
    // Simple command processing logic
    if (lowerCmd.startsWith('help')) {
      addOutput('Available commands: help, status, list agents, connect [agent name], deploy [agent type], create task "[description]" [attributes], restart');
    } 
    else if (lowerCmd.startsWith('status')) {
      addOutput('System Status: OPERATIONAL\nAll systems nominal. Agency network at 97% efficiency.\n\nActive AI Processes: 14\nAgent Utilization: 78%\nKnowledge Base: Updated 15 minutes ago');
      
      setTimeout(() => {
        addOutput('Would you like to see detailed metrics? Try: "status details"');
      }, 500);
    }
    else if (lowerCmd.startsWith('list agents')) {
      addOutput('Active Agents:\n- Knowledge Engineer (working)\n- Data Architect (working)\n- Strategic Planner (working)\n- Content Curator (idle)\nPaused Agents:\n- Operations Manager (paused)\nError State:\n- Security Officer (error)');
      
      setTimeout(() => {
        addOutput('To interact with an agent, try: "connect [agent name]"');
      }, 500);
    }
    else if (lowerCmd.startsWith('connect')) {
      const agentName = cmd.substring(7).trim();
      if (agentName) {
        addOutput(`Establishing secure connection to ${agentName}...`);
        
        // Simulate a connection process
        setTimeout(() => {
          addOutput(`Connection established. Agent ${agentName} ready for communication.`);
          toast({
            title: "Connection Established",
            description: `Connected to agent: ${agentName}`,
            duration: 3000,
          });
        }, 1500);
      } else {
        addError('Please specify an agent name.');
      }
    }
    else if (lowerCmd.startsWith('deploy')) {
      const agentType = cmd.substring(6).trim();
      if (agentType) {
        addOutput(`Initiating deployment sequence for ${agentType}...`);
        
        // Simulate deployment
        setTimeout(() => {
          addOutput(`Allocating resources for ${agentType}...`);
          setTimeout(() => {
            addOutput(`${agentType} deployed successfully. Agent is now initializing knowledge base.`);
            toast({
              title: "Deployment Complete",
              description: `${agentType} is now active`,
              duration: 3000,
            });
          }, 1500);
        }, 1000);
      } else {
        addError('Please specify an agent type to deploy.');
      }
    }
    else if (lowerCmd.startsWith('create task')) {
      try {
        const taskContent = cmd.match(/"([^"]+)"/)?.[1] || "";
        if (!taskContent) throw new Error("Task description required in quotes");
        
        const priorityMatch = cmd.match(/priority:(\w+)/);
        const priority = priorityMatch ? priorityMatch[1] : "normal";
        
        addOutput(`Creating new task: "${taskContent}"\nPriority: ${priority}`);
        
        setTimeout(() => {
          addOutput(`Task created successfully. ID: TSK-${Math.floor(Math.random() * 1000)}`);
          toast({
            title: "Task Created",
            description: `New task added to your dashboard`,
            duration: 3000,
          });
        }, 800);
      } catch (error) {
        addError(`Error creating task: ${error.message}`);
        addOutput('Example format: create task "Update knowledge base" priority:high');
      }
    }
    else if (lowerCmd.startsWith('restart')) {
      const serviceName = cmd.substring(7).trim() || 'system';
      addOutput(`Restarting ${serviceName}...`);
      
      // Simulate restart
      setTimeout(() => {
        addOutput(`${serviceName} successfully restarted.`);
      }, 2000);
    }
    else {
      addError(`Unknown command: ${cmd}. Type 'help' for a list of available commands.`);
    }
  };
  
  const addOutput = (content: string) => {
    setHistory(prev => [...prev, { type: 'output', content, timestamp: new Date() }]);
  };
  
  const addError = (content: string) => {
    setHistory(prev => [...prev, { type: 'error', content, timestamp: new Date() }]);
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };
  
  const clearTerminal = () => {
    setHistory([{ type: 'system', content: 'Terminal cleared.', timestamp: new Date() }]);
  };
  
  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed bottom-4 right-4 w-full max-w-lg z-50"
          >
            <GlassMorphism intensity="medium" className="border border-flow-accent/30 rounded-lg overflow-hidden">
              <div className="bg-flow-background/80 backdrop-blur-lg">
                <div className="p-3 border-b border-flow-border/30 flex justify-between items-center">
                  <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as 'command' | 'chat')} className="flex-1">
                    <TabsList className="h-8 bg-flow-background/30 border border-flow-border/50">
                      <TabsTrigger value="command" className="text-xs flex items-center">
                        <Terminal className="h-3.5 w-3.5 mr-1.5" />
                        Command Terminal
                      </TabsTrigger>
                      <TabsTrigger value="chat" className="text-xs flex items-center">
                        <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
                        Communication Bot
                      </TabsTrigger>
                    </TabsList>
                  
                    <div className="mt-0">
                      {/* Command Terminal Tab */}
                      <TabsContent value="command" className="m-0 border-none outline-none">
                        <div 
                          ref={terminalRef}
                          className="h-72 overflow-y-auto p-3 space-y-2 bg-black/20 backdrop-blur-lg custom-scrollbar"
                        >
                          {history.map((item, index) => (
                            <div key={index} className="text-sm">
                              <div className="flex items-start">
                                <span className="text-xs text-flow-foreground/50 mr-2 min-w-[70px]">
                                  {formatTime(item.timestamp)}
                                </span>
                                
                                {item.type === 'input' && (
                                  <div className="flex-1">
                                    <span className="text-green-400">{'>'}</span> 
                                    <span className="text-white ml-1">{item.content}</span>
                                  </div>
                                )}
                                
                                {item.type === 'output' && (
                                  <div className="flex-1 whitespace-pre-wrap text-cyan-200">
                                    {item.content}
                                  </div>
                                )}
                                
                                {item.type === 'error' && (
                                  <div className="flex-1 text-red-400">
                                    {item.content}
                                  </div>
                                )}
                                
                                {item.type === 'system' && (
                                  <div className="flex-1 text-yellow-300">
                                    {item.content}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                          
                          {isProcessing && (
                            <div className="flex items-center text-flow-accent animate-pulse">
                              <span className="text-xs">Processing</span>
                              <span className="ml-1">...</span>
                            </div>
                          )}
                        </div>
                        
                        <AnimatePresence>
                          {showExamples && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="border-t border-flow-border/30 overflow-hidden bg-flow-background/60"
                            >
                              <div className="p-3">
                                <div className="text-xs text-flow-foreground/70 mb-2">Example commands:</div>
                                <div className="flex flex-wrap gap-2">
                                  {exampleCommands.map((example, index) => (
                                    <Button
                                      key={index}
                                      variant="outline"
                                      size="sm"
                                      className="text-xs bg-flow-background/40 border-flow-border/30"
                                      onClick={() => handleExampleClick(example.command)}
                                    >
                                      {example.label}
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        <form onSubmit={handleSubmit} className="flex p-3 border-t border-flow-border/30 bg-flow-background/40">
                          <div className="flex-grow relative">
                            <input
                              type="text"
                              ref={inputRef}
                              value={input}
                              onChange={(e) => setInput(e.target.value)}
                              placeholder={t('typeCommand')}
                              className="w-full bg-transparent text-flow-foreground border-none outline-none text-sm placeholder:text-flow-foreground/50"
                              onKeyPress={handleKeyPress}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 rounded-full absolute right-0 top-1/2 -translate-y-1/2 text-flow-foreground/50 hover:text-flow-accent"
                              onClick={() => setShowExamples(!showExamples)}
                            >
                              <Code className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                          
                          <Button
                            type="submit"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full text-flow-accent hover:bg-flow-accent/10"
                            disabled={isProcessing}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </form>
                      </TabsContent>
                      
                      {/* Chat Bot Tab */}
                      <TabsContent value="chat" className="m-0 border-none outline-none">
                        <div 
                          ref={chatRef}
                          className="h-72 overflow-y-auto p-3 space-y-2 bg-black/20 backdrop-blur-lg custom-scrollbar"
                        >
                          {messages.map((message, index) => (
                            <motion.div 
                              key={index}
                              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-3`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {message.sender === 'bot' && (
                                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center mr-2">
                                  <Bot className="h-4 w-4 text-indigo-400" />
                                </div>
                              )}
                              <div 
                                className={`max-w-[80%] px-3 py-2 rounded-lg ${
                                  message.sender === 'user' 
                                    ? 'bg-indigo-500 text-white' 
                                    : 'bg-flow-muted text-flow-foreground'
                                }`}
                              >
                                <div className="text-sm">{message.text}</div>
                                <div className="text-[10px] text-right mt-1 opacity-70">
                                  {formatTime(message.timestamp)}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        
                        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex p-3 border-t border-flow-border/30 bg-flow-background/40">
                          <Input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="What can I help you with?"
                            className="flex-1 bg-transparent border-flow-accent/30 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                          />
                          <Button 
                            type="submit"
                            size="sm" 
                            className="ml-2 bg-indigo-500 hover:bg-indigo-600 min-w-10"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </form>
                      </TabsContent>
                    </div>
                  </Tabs>
                  
                  <div className="flex items-center gap-2 ml-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-full hover:bg-flow-muted/30"
                      onClick={clearTerminal}
                    >
                      <RotateCcw className="h-3 w-3" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-full hover:bg-flow-muted/30"
                      onClick={() => setIsVisible(false)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </GlassMorphism>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Button
        variant="outline"
        size="sm"
        className="fixed bottom-4 right-4 h-10 w-10 rounded-full bg-flow-background/70 border-flow-accent/50 shadow-lg hover:shadow-flow-accent/20 hover:bg-flow-accent/20 z-40"
        onClick={() => setIsVisible(v => !v)}
      >
        <Terminal className="h-4 w-4 text-flow-accent" />
      </Button>
      
      <style>
        {`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        
        @keyframes pulse-subtle {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 2s infinite ease-in-out;
        }
        `}
      </style>
    </>
  );
};

export default CommandTerminal;
