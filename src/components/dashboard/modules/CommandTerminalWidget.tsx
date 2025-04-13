
import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Terminal, ChevronRight, ArrowRight, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

const CommandTerminalWidget: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{type: 'input' | 'output' | 'system'; content: string; timestamp: Date}>>([
    { type: 'system', content: 'Terminal ready. Type "help" for available commands.', timestamp: new Date() }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user input to history
    const timestamp = new Date();
    setHistory(prev => [...prev, { type: 'input', content: input, timestamp }]);
    setIsProcessing(true);
    
    // Process command
    setTimeout(() => {
      const output = processCommand(input);
      setHistory(prev => [...prev, { type: 'output', content: output, timestamp: new Date() }]);
      setInput('');
      setIsProcessing(false);
    }, 300);
  };
  
  const processCommand = (cmd: string): string => {
    const lowerCmd = cmd.toLowerCase().trim();
    
    if (lowerCmd === 'help') {
      return 'Available commands: help, status, list agents, connect [name], deploy, tasks';
    } else if (lowerCmd === 'status') {
      return 'System: OPERATIONAL\nAll agents functioning within normal parameters.';
    } else if (lowerCmd === 'list agents' || lowerCmd === 'agents') {
      return 'Active Agents:\n- Knowledge Engineer (working)\n- Data Architect (working)\n- Strategy Planner (idle)';
    } else if (lowerCmd.startsWith('connect')) {
      const agent = cmd.substring(8);
      return `Establishing connection to ${agent || "agent"}...`;
    } else if (lowerCmd === 'tasks') {
      return 'Current Tasks:\n- Update knowledge base (85%)\n- Generate analytics report (60%)\n- Resource optimization (35%)';
    } else if (lowerCmd === 'deploy') {
      return 'Usage: deploy [agent type] [division]';
    } else if (lowerCmd === 'clear') {
      setTimeout(() => {
        setHistory([{ type: 'system', content: 'Terminal cleared.', timestamp: new Date() }]);
      }, 100);
      return '';
    } else {
      return `Unknown command: ${cmd}. Type 'help' for available commands.`;
    }
  };
  
  const openFullTerminal = () => {
    const event = new CustomEvent('openCommandTerminal');
    window.dispatchEvent(event);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <Card className="p-4 border-flow-border/30 bg-black/30 backdrop-blur-md h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium neon-text-cyan flex items-center">
          <Terminal className="mr-2 h-5 w-5 text-cyan-400" />
          Command Terminal
        </h3>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={openFullTerminal}
            title="Open full terminal"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </Button>
        </motion.div>
      </div>
      
      <div className="bg-black/70 rounded-md border border-cyan-500/20 overflow-hidden mb-3">
        <ScrollArea className="h-[200px] p-2">
          <div ref={scrollRef} className="font-mono text-xs space-y-1">
            {history.map((entry, index) => (
              <div key={index} className="leading-relaxed">
                <span className="text-[10px] text-cyan-500/60 mr-2">{formatTime(entry.timestamp)}</span>
                {entry.type === 'input' && (
                  <><span className="text-green-400">{'>'}</span> <span className="text-white">{entry.content}</span></>
                )}
                {entry.type === 'output' && (
                  <div className="text-cyan-300 whitespace-pre-wrap pl-4">{entry.content}</div>
                )}
                {entry.type === 'system' && (
                  <div className="text-amber-300 italic">{entry.content}</div>
                )}
              </div>
            ))}
            {isProcessing && (
              <motion.div 
                className="text-cyan-500/60 pl-4"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                Processing...
              </motion.div>
            )}
          </div>
        </ScrollArea>
      </div>
      
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          className="w-full bg-black/50 border border-cyan-500/30 rounded-md px-8 py-1.5 text-xs text-cyan-100 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40"
          placeholder="Type command..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <ArrowRight className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-cyan-500/60" />
        <Button 
          type="submit"
          size="sm"
          variant="ghost"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-5 w-5 p-0 text-cyan-500/60 hover:text-cyan-500"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </form>
      
      <div className="mt-2 flex justify-center">
        <div className="grid grid-cols-4 gap-1.5 text-[10px]">
          <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px] text-cyan-400/70" onClick={() => setInput('help')}>help</Button>
          <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px] text-cyan-400/70" onClick={() => setInput('status')}>status</Button>
          <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px] text-cyan-400/70" onClick={() => setInput('agents')}>agents</Button>
          <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px] text-cyan-400/70" onClick={() => setInput('tasks')}>tasks</Button>
        </div>
      </div>
    </Card>
  );
};

export default CommandTerminalWidget;
