
import React from 'react';
import { X, RotateCcw, Terminal, MessageSquare } from 'lucide-react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

interface TerminalHeaderProps {
  activeTab: 'command' | 'chat';
  setActiveTab: React.Dispatch<React.SetStateAction<'command' | 'chat'>>;
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
    <div className="border-b border-indigo-500/30 flex items-center justify-between p-2 bg-gray-900/90">
      <div className="flex items-center gap-2">
        <TabsList className="bg-gray-800/70 border border-indigo-500/20">
          <TabsTrigger 
            value="command" 
            className={`text-xs py-1 px-3 ${activeTab === 'command' ? 'data-[state=active]:bg-indigo-600/40' : ''} flex items-center gap-1`}
            onClick={() => setActiveTab('command')}
          >
            <Terminal className="h-3.5 w-3.5 text-cyan-400" />
            CLI
          </TabsTrigger>
          <TabsTrigger 
            value="chat"
            className={`text-xs py-1 px-3 ${activeTab === 'chat' ? 'data-[state=active]:bg-indigo-600/40' : ''} flex items-center gap-1`}
            onClick={() => setActiveTab('chat')}
          >
            <MessageSquare className="h-3.5 w-3.5 text-green-400" />
            Chat
          </TabsTrigger>
        </TabsList>
        
        <span className="text-sm font-medium text-flow-foreground/80">
          {activeTab === 'command' ? 'Command Terminal' : 'AI Assistant'}
        </span>
      </div>
      
      <div className="flex items-center gap-1">
        <Button 
          variant="ghost" 
          size="icon"
          className="h-7 w-7 hover:bg-indigo-500/20"
          onClick={clearTerminal}
        >
          <RotateCcw className="h-3.5 w-3.5 text-flow-foreground/70" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          className="h-7 w-7 hover:bg-indigo-500/20"
          onClick={closeTerminal}
        >
          <X className="h-3.5 w-3.5 text-flow-foreground/70" />
        </Button>
      </div>
      
      <div className="absolute left-0 bottom-0 w-full h-0.5 overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${
          activeTab === 'command' ? 'from-cyan-500/70 to-indigo-500/70' : 'from-green-500/70 to-teal-500/70'
        } animate-pulse-subtle`}>
        </div>
      </div>
    </div>
  );
};

export default TerminalHeader;
