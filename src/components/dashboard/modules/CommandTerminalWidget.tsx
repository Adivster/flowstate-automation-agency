
import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Terminal, ChevronRight, ArrowRight, Maximize2, Code, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const CommandTerminalWidget: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{type: 'input' | 'output' | 'system'; content: string; timestamp: Date}>>([
    { type: 'system', content: 'Terminal ready. Type "help" for available commands.', timestamp: new Date() }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Suggested commands based on system state
  const suggestedCommands = [
    { command: 'help', description: 'Show available commands' },
    { command: 'status', description: 'Check system status' },
    { command: 'agents', description: 'List active agents' },
    { command: 'tasks', description: 'View current tasks' }
  ];
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    // Listen for the custom event to open the command terminal
    const handleOpenCommandTerminal = () => {
      // Focus the input field when the terminal opens
      if (inputRef.current) {
        inputRef.current.focus();
      }
      setIsCollapsed(false);
    };
    
    window.addEventListener('openCommandTerminal', handleOpenCommandTerminal);
    
    return () => {
      window.removeEventListener('openCommandTerminal', handleOpenCommandTerminal);
    };
  }, []);

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
      return 'Available commands:\n- help: Show this help message\n- status: Check system status\n- list agents: Show all agents\n- connect [name]: Connect to an agent\n- deploy: Deploy a new agent\n- tasks: View current tasks\n- clear: Clear terminal history';
    } else if (lowerCmd === 'status') {
      return 'System: OPERATIONAL\nAll agents functioning within normal parameters.\nCPU: 32% | Memory: 67% | Network: 53%';
    } else if (lowerCmd === 'list agents' || lowerCmd === 'agents') {
      return 'Active Agents:\n- Knowledge Engineer (working)\n- Data Architect (working)\n- Strategy Planner (idle)\n\nUse "connect [agent name]" to establish connection.';
    } else if (lowerCmd.startsWith('connect')) {
      const agent = cmd.substring(8);
      return `Establishing connection to ${agent || "agent"}...\nConnection established. You now have direct access to ${agent || "agent"}'s command interface.`;
    } else if (lowerCmd === 'tasks') {
      return 'Current Tasks:\n- Update knowledge base (85%)\n- Generate analytics report (60%)\n- Resource optimization (35%)\n\nUse "task details [id]" for more information.';
    } else if (lowerCmd === 'deploy') {
      return 'Usage: deploy [agent type] [division]\n\nAvailable agent types:\n- data\n- security\n- research\n- strategy';
    } else if (lowerCmd === 'clear') {
      setTimeout(() => {
        setHistory([{ type: 'system', content: 'Terminal cleared.', timestamp: new Date() }]);
      }, 100);
      return '';
    } else if (lowerCmd === 'theme') {
      return `Current theme: ${theme === 'dark' ? 'Cyberpunk (Dark)' : 'Solarpunk (Light)'}`;
    } else if (lowerCmd.startsWith('theme ')) {
      const themeArg = lowerCmd.substring(6).trim();
      if (themeArg === 'dark' || themeArg === 'light' || themeArg === 'cyberpunk' || themeArg === 'solarpunk') {
        return `Theme command recognized. Use the theme toggle button to change themes.`;
      }
      return `Invalid theme: ${themeArg}. Available themes: dark/cyberpunk, light/solarpunk`;
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

  const handleQuickCommand = (cmd: string) => {
    setInput(cmd);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const isDark = theme === 'dark';
  
  if (isCollapsed) {
    return (
      <Card className={`p-2 border-flow-border/30 ${isDark ? 'bg-black/30' : 'bg-white/70'} backdrop-blur-md`}>
        <Button 
          variant="ghost" 
          className="w-full text-xs flex items-center justify-between"
          onClick={() => setIsCollapsed(false)}
        >
          <div className="flex items-center">
            <Terminal className={`mr-2 h-4 w-4 ${isDark ? 'text-cyan-400' : 'text-emerald-600'}`} />
            Command Terminal
          </div>
          <ChevronRight className="h-3 w-3" />
        </Button>
      </Card>
    );
  }

  return (
    <Card className={`p-4 border-flow-border/30 ${isDark ? 'bg-black/30' : 'bg-white/70'} backdrop-blur-md h-full`}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className={`text-lg font-medium ${isDark ? 'neon-text-cyan' : 'text-emerald-800'} flex items-center`}>
            <Terminal className={`mr-2 h-5 w-5 ${isDark ? 'text-cyan-400' : 'text-emerald-600'}`} />
            Command Terminal
          </h3>
          <p className="text-xs text-flow-foreground/60 mt-1">Execute system commands and queries</p>
        </div>
        <div className="flex items-center gap-1">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setIsCollapsed(true)}
              title="Collapse terminal"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </motion.div>
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
      </div>
      
      <div className={`${isDark ? 'bg-black/70' : 'bg-white/70'} rounded-md ${isDark ? 'border border-cyan-500/20' : 'border border-emerald-300/40'} overflow-hidden mb-3`}>
        <ScrollArea className="h-[200px] p-2">
          <div ref={scrollRef} className="font-mono text-xs space-y-1">
            {history.map((entry, index) => (
              <div key={index} className="leading-relaxed">
                <span className={`text-[10px] ${isDark ? 'text-cyan-500/60' : 'text-emerald-600/70'} mr-2`}>{formatTime(entry.timestamp)}</span>
                {entry.type === 'input' && (
                  <><span className={isDark ? 'text-green-400' : 'text-emerald-600'}>{'>'}</span> <span className="text-foreground">{entry.content}</span></>
                )}
                {entry.type === 'output' && (
                  <div className={isDark ? 'text-cyan-300 whitespace-pre-wrap pl-4' : 'text-emerald-700 whitespace-pre-wrap pl-4'}>{entry.content}</div>
                )}
                {entry.type === 'system' && (
                  <div className={isDark ? 'text-amber-300 italic' : 'text-amber-600 italic'}>{entry.content}</div>
                )}
              </div>
            ))}
            {isProcessing && (
              <motion.div 
                className={isDark ? 'text-cyan-500/60 pl-4' : 'text-emerald-600/60 pl-4'}
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
          className={`w-full ${
            isDark 
              ? 'bg-black/50 border border-cyan-500/30 text-cyan-100 focus:border-cyan-500/60 focus:ring-cyan-500/40' 
              : 'bg-white/60 border border-emerald-300/40 text-emerald-800 focus:border-emerald-500/60 focus:ring-emerald-500/40'
          } rounded-md px-8 py-1.5 text-xs focus:outline-none focus:ring-1`}
          placeholder="Type command..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <ArrowRight className={`absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 ${isDark ? 'text-cyan-500/60' : 'text-emerald-500/60'}`} />
        <Button 
          type="submit"
          size="sm"
          variant="ghost"
          className={`absolute right-1 top-1/2 -translate-y-1/2 h-5 w-5 p-0 ${
            isDark 
              ? 'text-cyan-500/60 hover:text-cyan-500' 
              : 'text-emerald-500/60 hover:text-emerald-600'
          }`}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </form>
      
      <div className="mt-2">
        <div className="flex items-center mb-1">
          <Lightbulb className={`h-3 w-3 mr-1 ${isDark ? 'text-yellow-400' : 'text-amber-600'}`} />
          <span className={`text-[10px] ${isDark ? 'text-yellow-400/80' : 'text-amber-600/80'}`}>Suggested Commands</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5 text-[10px]">
          {suggestedCommands.map((cmd, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`h-6 px-2 text-[10px] ${isDark ? 'text-cyan-400/70' : 'text-emerald-600/70'}`} 
                    onClick={() => handleQuickCommand(cmd.command)}
                  >
                    {cmd.command}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-[10px] py-1 px-2">
                  {cmd.description}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default CommandTerminalWidget;
