
import React, { useRef, useEffect } from 'react';
import { Terminal } from 'lucide-react';
import { CommandHistoryItem } from './types/conversationTypes';

interface CommandTerminalContentProps {
  commandHistory: CommandHistoryItem[];
  command: string;
  setCommand: (cmd: string) => void;
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
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when history updates
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  // Auto-focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div 
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-3 text-sm font-mono custom-scrollbar scan-lines bg-black/60 backdrop-blur-lg"
      >
        {commandHistory.map((entry, index) => (
          <div key={index} className="mb-2">
            {entry.type === 'input' && (
              <div className="flex">
                <span className="text-green-400 mr-2">{'>'}</span>
                <span className="text-indigo-100">{entry.content}</span>
              </div>
            )}
            
            {entry.type === 'output' && (
              <div className="text-cyan-300 pl-4 whitespace-pre-wrap">{entry.content}</div>
            )}
            
            {entry.type === 'error' && (
              <div className="text-red-400 pl-4">{entry.content}</div>
            )}
            
            {entry.type === 'system' && (
              <div className="text-amber-300 italic">{entry.content}</div>
            )}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleCommand} className="p-2 border-t border-indigo-500/30 bg-black/70">
        <div className="flex items-center">
          <span className="text-green-400 mr-2">{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-transparent border-none outline-none text-indigo-100"
            placeholder="Type command..."
            aria-label="Command input"
          />
        </div>
      </form>
    </div>
  );
};

export default CommandTerminalContent;
