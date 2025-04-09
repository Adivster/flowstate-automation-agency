
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { X, RotateCcw, Terminal, MessageCircle } from 'lucide-react';

interface TerminalHeaderProps {
  activeTab: 'command' | 'chat';
  setActiveTab: (value: 'command' | 'chat') => void;
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
    <div className="flex justify-between items-center p-3 border-b border-flow-accent/50 bg-black/50">
      <TabsList className="h-8 bg-black/30 border border-flow-accent/20">
        <TabsTrigger value="command" className="text-xs">
          <Terminal className="h-3.5 w-3.5 mr-1.5" />
          Command Terminal
        </TabsTrigger>
        <TabsTrigger value="chat" className="text-xs">
          <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
          Communication Bot
        </TabsTrigger>
      </TabsList>
      
      <div className="flex gap-2">
        <Button 
          size="icon" 
          variant="ghost" 
          className="h-6 w-6 text-flow-muted-foreground hover:text-flow-accent hover:bg-transparent"
          onClick={clearTerminal}
          title="Clear terminal"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>
        <Button 
          size="icon" 
          variant="ghost" 
          className="h-6 w-6 text-flow-muted-foreground hover:text-flow-accent hover:bg-transparent"
          onClick={closeTerminal}
          title="Close terminal"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TerminalHeader;
