
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, Send, Download, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import GlassMorphism from '@/components/ui/GlassMorphism';
import { useLanguage } from '@/contexts/LanguageContext';

// This is a refactored version of CommandTerminal with real-time updates
const CommandTerminal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{type: 'input' | 'output' | 'error' | 'system', content: string, timestamp: Date}>>([
    { type: 'system', content: 'Terminal initialized. Connected to agency network.', timestamp: new Date() }
  ]);
  const { toast } = useToast();
  const { t } = useLanguage();
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'j') {
        setIsVisible(v => !v);
      }
    };
    
    const handleOpenTerminal = () => {
      setIsVisible(true);
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('openCommunicationTerminal', handleOpenTerminal);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('openCommunicationTerminal', handleOpenTerminal);
    };
  }, []);
  
  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus();
    }
    
    // Scroll to bottom when history changes
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [isVisible, history]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add input to history
    setHistory(prev => [...prev, { type: 'input', content: input, timestamp: new Date() }]);
    setIsProcessing(true);
    
    // Process the command - this would connect to an actual API in a real app
    setTimeout(() => {
      processCommand(input);
      setInput('');
      setIsProcessing(false);
    }, 300);
  };
  
  const processCommand = (cmd: string) => {
    const lowerCmd = cmd.toLowerCase().trim();
    
    // Simple command processing logic
    if (lowerCmd.startsWith('help')) {
      addOutput('Available commands: help, status, list agents, connect [agent name], deploy, restart');
    } 
    else if (lowerCmd.startsWith('status')) {
      addOutput('System Status: OPERATIONAL\nAll systems nominal. Agency network at 97% efficiency.');
    }
    else if (lowerCmd.startsWith('list agents')) {
      addOutput('Active Agents:\n- Knowledge Engineer (working)\n- Data Architect (working)\n- Strategic Planner (working)\n- Content Curator (idle)\nPaused Agents:\n- Operations Manager (paused)\nError State:\n- Security Officer (error)');
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
      addOutput('Initiating deployment sequence...');
      
      // Simulate deployment
      setTimeout(() => {
        toast({
          title: "Deployment Initiated",
          description: "New agent deployment in progress",
          duration: 3000,
        });
      }, 1000);
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
                  <div className="flex items-center text-flow-foreground">
                    <Terminal className="h-4 w-4 mr-2 text-flow-accent" />
                    <span className="text-sm font-medium">Agency Command Terminal</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
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
                
                <form onSubmit={handleSubmit} className="flex p-3 border-t border-flow-border/30 bg-flow-background/40">
                  <input
                    type="text"
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t('typeCommand')}
                    className="flex-1 bg-transparent text-flow-foreground border-none outline-none text-sm placeholder:text-flow-foreground/50"
                  />
                  
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
      
      <style jsx global>{`
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
      `}</style>
    </>
  );
};

export default CommandTerminal;
