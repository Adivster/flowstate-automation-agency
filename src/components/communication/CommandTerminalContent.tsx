
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
    </>
  );
};

export default CommandTerminalContent;
