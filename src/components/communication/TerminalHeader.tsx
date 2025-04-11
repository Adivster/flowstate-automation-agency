
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
    <div className="flex justify-between items-center p-3 border-b border-indigo-500/30 bg-black/70">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'command' | 'chat')}>
        <TabsList className="h-8 bg-black/50 border border-indigo-400/20 rounded-md">
          <TabsTrigger 
            value="command" 
            className={`text-xs ${activeTab === 'command' ? 'text-cyan-300' : 'text-flow-muted-foreground'}`}
          >
            <Terminal className="h-3.5 w-3.5 mr-1.5" />
            Command Terminal
          </TabsTrigger>
          <TabsTrigger 
            value="chat" 
            className={`text-xs flex items-center justify-between ${activeTab === 'chat' ? 'text-cyan-300' : 'text-flow-muted-foreground'}`}
          >
            <span className="flex items-center">
              <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
              Communication Bot
            </span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="flex gap-1">
        <Button 
          size="sm" 
          variant="ghost" 
          className="h-7 w-7 rounded-md text-cyan-300 hover:text-cyan-200 hover:bg-black/30 p-0 flex items-center justify-center"
          onClick={clearTerminal}
          title="Clear terminal"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>
        <Button 
          size="sm" 
          variant="ghost" 
          className="h-7 w-7 rounded-md text-red-500 hover:text-red-400 hover:bg-black/30 p-0 flex items-center justify-center"
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
