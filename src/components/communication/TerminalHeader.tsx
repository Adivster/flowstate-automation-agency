
import React from 'react';
import { cn } from '@/lib/utils';
import { Terminal, X, RefreshCw } from 'lucide-react';

interface TerminalHeaderProps {
  clearTerminal: () => void;
  closeTerminal: () => void;
}

const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  clearTerminal,
  closeTerminal
}) => {
  return (
    <div className="flex justify-between items-center p-2 border-b border-purple-500/30">
      <div className="flex items-center gap-2">
        <Terminal className="h-4 w-4 text-purple-400" />
        <span className="text-sm font-medium text-purple-300">FlowBot Terminal</span>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={clearTerminal}
          className="p-1.5 hover:bg-white/10 rounded-md transition-colors"
          title="Clear Terminal"
        >
          <RefreshCw className="h-3.5 w-3.5 opacity-70 hover:opacity-100" />
        </button>
        <button
          onClick={closeTerminal}
          className="p-1.5 hover:bg-white/10 rounded-md transition-colors"
          title="Close Terminal"
        >
          <X className="h-3.5 w-3.5 opacity-70 hover:opacity-100" />
        </button>
      </div>
    </div>
  );
};

export default TerminalHeader;
