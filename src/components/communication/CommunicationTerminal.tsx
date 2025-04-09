
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Terminal, X, Send, ChevronDown, Bot, MessageCircle, RotateCcw } from 'lucide-react';

const CommunicationTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'command' | 'chat'>('command');
  
  // Command terminal state
  const [command, setCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<Array<{type: 'input' | 'output', content: string}>>([
    { type: 'output', content: 'Welcome to the Agency Command Interface v3.0' },
    { type: 'output', content: 'Type "help" for available commands' },
  ]);
  
  // Chat bot state
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot', text: string, timestamp: Date }[]>([
    { sender: 'bot', text: 'Hello! I\'m your agency communication assistant. How can I help you today?', timestamp: new Date() }
  ]);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const terminalWrapperRef = useRef<HTMLDivElement>(null);

  // Listen for the custom event to open the terminal
  useEffect(() => {
    const handleOpenTerminal = () => {
      setIsOpen(true);
    };
    
    const handleOpenCommandTerminal = () => {
      setIsOpen(true);
      setActiveTab('command');
    };
    
    window.addEventListener('openCommunicationTerminal', handleOpenTerminal);
    window.addEventListener('openCommandTerminal', handleOpenCommandTerminal);
    
    return () => {
      window.removeEventListener('openCommunicationTerminal', handleOpenTerminal);
      window.removeEventListener('openCommandTerminal', handleOpenCommandTerminal);
    };
  }, []);

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen && 
        terminalWrapperRef.current && 
        !terminalWrapperRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('.terminal-toggle-btn')
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Scroll to bottom when new messages/commands arrive
  useEffect(() => {
    if (terminalRef.current && activeTab === 'command') {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
    if (chatRef.current && activeTab === 'chat') {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [commandHistory, messages, isOpen, activeTab]);

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
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const clearTerminal = () => {
    setCommandHistory([
      { type: 'output', content: 'Terminal cleared.' },
      { type: 'output', content: 'Welcome to the Agency Command Interface v3.0' },
      { type: 'output', content: 'Type "help" for available commands' }
    ]);
  };

  return (
    <>
      {/* Terminal toggle button positioned in bottom right */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          size="icon"
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="terminal-toggle-btn rounded-full h-12 w-12 shadow-lg neon-border bg-flow-background hover:bg-flow-background/90"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Terminal className="h-5 w-5" />}
        </Button>
      </div>

      {/* Terminal panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={terminalWrapperRef}
            initial={{ y: 400, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-[450px] z-40 rounded-xl overflow-hidden"
          >
            <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as 'command' | 'chat')} className="w-full bg-gray-900 border-2 border-flow-accent/30 rounded-xl shadow-lg neon-border">
              <div className="flex justify-between items-center p-3 border-b border-flow-accent/50 bg-black/50">
                <TabsList className="h-8 bg-black/30 border border-flow-accent/20">
                  <TabsTrigger value="command" className="text-xs">
                    <Terminal className="h-3.5 w-3.5 mr-1.5" />
                    Command Terminal
                  </TabsTrigger>
                  <TabsTrigger value="chat" className="text-xs">
                    <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
                    Communication Bot
                  </TabsTrigger>
                </TabsList>
                
                <div className="flex gap-2">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-6 w-6 text-flow-muted-foreground hover:text-flow-accent hover:bg-transparent"
                    onClick={clearTerminal}
                    title="Clear terminal"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-6 w-6 text-flow-muted-foreground hover:text-flow-accent hover:bg-transparent"
                    onClick={() => setIsOpen(false)}
                    title="Close terminal"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div>
                {/* Terminal Tab */}
                <TabsContent value="command" className="m-0 p-0">
                  <div 
                    ref={terminalRef}
                    className="p-4 h-[300px] overflow-y-auto scan-lines font-mono"
                    style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
                  >
                    {commandHistory.map((item, index) => {
                      if (item.type === 'input') {
                        return (
                          <div key={index} className="flex gap-2 text-xs text-flow-accent font-mono py-1">
                            <span className="text-flow-accent-foreground">&gt;</span>
                            <span>{item.content}</span>
                          </div>
                        );
                      } else {
                        return (
                          <div key={index} className="text-xs text-flow-foreground font-mono mt-1 mb-2">
                            {item.content.split('\n').map((line, i) => (
                              <div key={i}>{line}</div>
                            ))}
                          </div>
                        );
                      }
                    })}
                  </div>
                  
                  <form onSubmit={handleCommand} className="p-3 border-t border-flow-accent/50 bg-black bg-opacity-70 flex items-center">
                    <Input
                      type="text"
                      value={command}
                      onChange={(e) => setCommand(e.target.value)}
                      placeholder="Enter command..."
                      className="flex-1 bg-transparent border-flow-accent/30 text-flow-foreground text-sm"
                      onKeyPress={handleKeyPress}
                    />
                    <Button 
                      type="submit" 
                      size="sm" 
                      className="ml-2 bg-flow-accent hover:bg-flow-accent/80 neon-glow min-w-20"
                    >
                      <Send className="h-4 w-4 mr-1" />
                      Execute
                    </Button>
                  </form>
                </TabsContent>
                
                {/* Chat Tab */}
                <TabsContent value="chat" className="m-0 p-0">
                  <div 
                    ref={chatRef}
                    className="p-4 h-[300px] overflow-y-auto bg-gray-900/80"
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
                  
                  <div className="p-3 border-t border-flow-accent/50 bg-black bg-opacity-70 flex items-center">
                    <Input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="What can I help you with?"
                      className="flex-1 bg-transparent border-flow-accent/30 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    />
                    <Button 
                      size="sm" 
                      onClick={handleSendMessage}
                      className="ml-2 bg-indigo-500 hover:bg-indigo-600 min-w-10"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommunicationTerminal;
