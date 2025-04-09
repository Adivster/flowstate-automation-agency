
import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, RotateCcw } from 'lucide-react';

interface CommandTerminalContentProps {
  commandHistory: Array<{type: 'input' | 'output', content: string}>;
  command: string;
  setCommand: React.Dispatch<React.SetStateAction<string>>;
  handleCommand: (e: React.FormEvent) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  clearTerminal: () => void;
}

const CommandTerminalContent: React.FC<CommandTerminalContentProps> = ({
  commandHistory,
  command,
  setCommand,
  handleCommand,
  handleKeyPress,
  clearTerminal
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when new messages/commands arrive
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);
  
  return (
    <>
      <div 
        ref={terminalRef}
        className="p-4 h-[320px] overflow-y-auto scan-lines font-mono custom-scrollbar"
        style={{ 
          backgroundColor: 'rgba(0,0,0,0.85)',
          backgroundImage: 'linear-gradient(rgba(0, 70, 100, 0.05) 50%, transparent 50%)',
          backgroundSize: '100% 4px'
        }}
      >
        {commandHistory.map((item, index) => {
          if (item.type === 'input') {
            return (
              <div key={index} className="flex gap-2 text-xs text-cyan-400 font-mono py-1">
                <span className="text-cyan-400/70">&gt;</span>
                <span>{item.content}</span>
              </div>
            );
          } else {
            return (
              <div key={index} className="text-xs text-green-300 font-mono mt-1 mb-2">
                {item.content.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            );
          }
        })}
      </div>
      
      <form onSubmit={handleCommand} className="p-3 border-t border-indigo-500/30 bg-black/80 flex items-center">
        <Input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Enter command..."
          className="flex-1 bg-black/50 border-indigo-500/30 text-cyan-100 text-sm font-mono focus:border-cyan-400/70 focus:ring-1 focus:ring-cyan-400/40"
          onKeyPress={handleKeyPress}
        />
        <Button 
          type="submit" 
          size="sm" 
          className="ml-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_0_10px_rgba(79,70,229,0.5)] min-w-20"
        >
          <Send className="h-4 w-4 mr-1" />
          Execute
        </Button>
      </form>
    </>
  );
};

export default CommandTerminalContent;
