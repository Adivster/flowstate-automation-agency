
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Terminal, X, Send, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const CommandTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [command, setCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<Array<{type: 'input' | 'output', content: string}>>([
    { type: 'output', content: 'Welcome to the Agency Command Interface v2.0' },
    { type: 'output', content: 'Type "help" for available commands' },
  ]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory, isOpen]);

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
      response = 'Active Agents: Data Agent, Sec Agent, Dev Agent, Researcher, PM Agent, AI Agent...';
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
  
  const renderCommandOutput = (item: {type: 'input' | 'output', content: string}, index: number) => {
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
  };

  return (
    <>
      {/* Terminal toggle button - positioned higher */}
      <div className="terminal-button">
        <Button
          size="icon"
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className={`rounded-full h-12 w-12 shadow-lg neon-border ${isOpen ? 'bg-flow-accent' : 'bg-flow-background'}`}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Terminal className="h-5 w-5" />}
        </Button>
      </div>

      {/* Terminal panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 400, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-gray-900 border-t-2 border-flow-accent neon-border"
            style={{ height: '300px' }}
          >
            <div className="flex justify-between items-center p-3 border-b border-flow-accent/50">
              <h3 className="text-flow-accent text-sm font-bold neon-text">{t('commandTerminal')}</h3>
              <div className="flex gap-2">
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-6 w-6 text-flow-muted-foreground hover:text-flow-accent"
                  onClick={() => setIsOpen(false)}
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-6 w-6 text-flow-muted-foreground hover:text-flow-accent"
                  onClick={() => setCommandHistory([])}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Terminal output */}
            <div 
              ref={terminalRef}
              className="p-4 h-[205px] overflow-y-auto scan-lines font-mono"
              style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
            >
              {commandHistory.map((item, index) => renderCommandOutput(item, index))}
            </div>
            
            {/* Command input with fixed layout */}
            <form onSubmit={handleCommand} className="p-3 border-t border-flow-accent/50 bg-black bg-opacity-70 flex items-center">
              <Input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder={t('enterCommand')}
                className="flex-1 bg-transparent border-flow-accent/30 text-flow-foreground text-sm"
              />
              <Button 
                type="submit" 
                size="sm" 
                className="ml-2 bg-flow-accent hover:bg-flow-accent/80 neon-glow min-w-20"
              >
                <Send className="h-4 w-4 mr-1" />
                {t('execute')}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandTerminal;
