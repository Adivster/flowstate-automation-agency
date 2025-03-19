
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface CommandProps {
  text: string;
  status: 'success' | 'error' | 'running' | 'idle';
  timestamp: Date;
}

const CommandTerminal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [commandInput, setCommandInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<CommandProps[]>([
    { 
      text: 'system --init', 
      status: 'success', 
      timestamp: new Date(Date.now() - 60000) 
    },
    { 
      text: 'agent --list', 
      status: 'success', 
      timestamp: new Date(Date.now() - 45000) 
    }
  ]);
  
  // Demo command execution
  const executeCommand = (command: string) => {
    if (!command.trim()) return;
    
    // Add command to history as running
    setCommandHistory(prev => [
      ...prev, 
      { text: command, status: 'running', timestamp: new Date() }
    ]);
    
    setCommandInput('');
    
    // Simulate command processing
    setTimeout(() => {
      let status: 'success' | 'error';
      let message = '';
      
      if (command.includes('--help')) {
        status = 'success';
        message = 'Available commands: agent, task, workflow, division, system';
      } 
      else if (command.startsWith('agent')) {
        status = 'success';
        message = 'Agent command executed successfully';
      }
      else if (command.startsWith('error')) {
        status = 'error';
        message = 'Command failed: Invalid syntax';
      }
      else {
        // Random success/error
        status = Math.random() > 0.3 ? 'success' : 'error';
        message = status === 'success' 
          ? 'Command executed successfully' 
          : 'Command failed: Insufficient permissions';
      }
      
      // Update command status
      setCommandHistory(prev => 
        prev.map((cmd, i) => 
          i === prev.length - 1 ? { ...cmd, status } : cmd
        )
      );
      
      // Show toast notification
      if (status === 'success') {
        toast.success(message);
      } else {
        toast.error(message);
      }
    }, 800);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(commandInput);
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <Check className="h-3 w-3 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-3 w-3 text-red-500" />;
      case 'running':
        return <motion.div 
          className="h-3 w-3 rounded-full bg-amber-500"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />;
      default:
        return null;
    }
  };
  
  // Demo: periodically add system messages
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7 && isOpen) {
        const systemMessages = [
          "agent-001 completed task #45392",
          "workflow scan-documents initiated",
          "system resources at 42% utilization",
          "new agent spawned: research division",
          "knowledge base updated successfully"
        ];
        
        const randomMessage = systemMessages[Math.floor(Math.random() * systemMessages.length)];
        
        setCommandHistory(prev => [
          ...prev, 
          { 
            text: `system: ${randomMessage}`, 
            status: 'success', 
            timestamp: new Date() 
          }
        ]);
      }
    }, 10000);
    
    return () => clearInterval(interval);
  }, [isOpen]);
  
  // Auto-open terminal when the component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      {/* Terminal toggle button */}
      <motion.div 
        className="fixed bottom-6 right-6 z-50"
        whileHover={{ scale: 1.05 }}
        initial={{ scale: 0.9 }}
        animate={{ scale: [0.9, 1.1, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 0.5, repeat: 2, repeatDelay: 3 }}
      >
        <Button
          size="sm"
          variant="outline"
          className="rounded-full p-3 bg-flow-background shadow-lg border-2 border-green-500 animate-pulse"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Terminal className={`h-5 w-5 ${isOpen ? 'text-green-500' : 'text-green-400'}`} />
        </Button>
      </motion.div>
      
      {/* Terminal window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4"
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <Card className="mx-auto max-w-3xl h-64 border border-flow-border bg-black/80 text-white overflow-hidden shadow-lg backdrop-blur">
              <div className="flex justify-between items-center p-2 border-b border-gray-800 bg-gray-900">
                <div className="flex items-center">
                  <Terminal className="h-3 w-3 mr-2" />
                  <span className="text-xs font-mono">FlowState Terminal</span>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 hover:bg-gray-800 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              
              <div className="p-3 h-[calc(100%-64px)] overflow-y-auto font-mono text-xs">
                {/* Command history */}
                <div className="space-y-2">
                  {commandHistory.map((cmd, i) => (
                    <div key={i} className="flex items-start">
                      <div className="mr-2 mt-0.5">
                        {getStatusIcon(cmd.status)}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className="text-green-500 mr-1">$</span>
                          <span>{cmd.text}</span>
                        </div>
                        <div className="text-gray-500 text-[0.65rem]">
                          {cmd.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Command input */}
              <div className="p-2 border-t border-gray-800 flex items-center">
                <span className="text-green-500 mr-2">$</span>
                <input
                  type="text"
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type command or 'help' for options"
                  className="bg-transparent flex-1 outline-none text-xs font-mono"
                  autoFocus
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 px-2 hover:bg-gray-800 text-xs"
                  onClick={() => executeCommand(commandInput)}
                >
                  <ArrowRight className="h-3 w-3 mr-1" />
                  Run
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandTerminal;
