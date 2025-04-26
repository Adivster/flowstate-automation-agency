
import React from 'react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Terminal, X, RefreshCw } from 'lucide-react';

interface TerminalHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  clearTerminal: () => void;
  closeTerminal: () => void;
}

const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  activeTab,
  setActiveTab,
  clearTerminal,
  closeTerminal
}) => {
  return (
    <div className="flex justify-between items-center p-2 border-b border-purple-500/30">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-black/20 border border-purple-500/20">
          <TabsTrigger value="chat" className="px-3 py-1 text-xs data-[state=active]:bg-purple-500/30">
            <MessageSquare className="h-3 w-3 mr-1" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="command" className="px-3 py-1 text-xs data-[state=active]:bg-purple-500/30">
            <Terminal className="h-3 w-3 mr-1" />
            Command
          </TabsTrigger>
        </TabsList>
      </Tabs>

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
