import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Terminal, MessageSquare, Bell } from 'lucide-react';
import { useCommunicationTerminal } from './useCommunicationTerminal';
import TerminalHeader from './TerminalHeader';
import CommandTerminalContent from './CommandTerminalContent';
import ChatBotContent from './ChatBotContent';

const CommunicationTerminal = () => {
  const {
    isOpen,
    setIsOpen,
    activeTab,
    setActiveTab,
    command,
    setCommand,
    commandHistory,
    newMessage,
    setNewMessage,
    messages,
    pendingPrompts,
    activeSuggestions,
    hasUnreadInsights,
    handleCommand,
    handleSendMessage,
    handleKeyPress,
    formatTime,
    clearTerminal,
    handleActionResponse,
    activeContext,
    contextEntity
  } = useCommunicationTerminal();

  const terminalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      if (
        isOpen && 
        terminalContentRef.current && 
        !terminalContentRef.current.contains(target) && 
        !target.closest('.terminal-toggle-btn')
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    const handleOpenTerminal = () => {
      setIsOpen(true);
    };

    window.addEventListener('openCommunicationTerminal', handleOpenTerminal);
    window.addEventListener('openCommandTerminal', handleOpenTerminal);
    
    return () => {
      window.removeEventListener('openCommunicationTerminal', handleOpenTerminal);
      window.removeEventListener('openCommandTerminal', handleOpenTerminal);
    };
  }, [setIsOpen]);

  const getContextTitle = () => {
    if (activeContext === 'global') {
      return 'Global System';
    } else if (contextEntity) {
      return `${contextEntity.name} ${activeContext}`;
    }
    return 'Communication Terminal';
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={terminalContentRef}
            initial={{ opacity: 0, x: -50, y: 50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -50, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-20 left-4 w-[500px] z-40 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(79,70,229,0.3)]"
          >
            <Tabs 
              value={activeTab} 
              onValueChange={(val) => setActiveTab(val as 'command' | 'chat')} 
              className="w-full bg-gray-900/90 backdrop-blur-md border border-indigo-500/30 rounded-xl"
            >
              <div className="flex items-center justify-between p-3 border-b border-indigo-500/30">
                <TabsList className="bg-gray-900/70 h-8">
                  <TabsTrigger value="command" className="text-xs flex items-center gap-1.5 data-[state=active]:text-cyan-300">
                    <Terminal className="h-3.5 w-3.5" />
                    Command
                  </TabsTrigger>
                  <TabsTrigger value="chat" className="text-xs flex items-center gap-1.5 data-[state=active]:text-green-300">
                    <MessageSquare className="h-3.5 w-3.5" />
                    Assistant
                    {pendingPrompts.length > 0 && (
                      <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500/80 text-[10px] text-white">
                        {pendingPrompts.length}
                      </span>
                    )}
                  </TabsTrigger>
                </TabsList>

                <div className="flex items-center">
                  <span className="text-xs text-indigo-300/70 mr-2">
                    {activeContext !== 'global' && contextEntity ? (
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></span>
                        {getContextTitle()}
                      </span>
                    ) : null}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 w-7 rounded-md text-indigo-300/70 hover:text-indigo-300 hover:bg-indigo-500/10 p-0"
                    onClick={clearTerminal}
                  >
                    <Bell className="h-3.5 w-3.5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 w-7 rounded-md text-indigo-300/70 hover:text-indigo-300 hover:bg-indigo-500/10 p-0"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </Button>
                </div>
              </div>
              
              <div className="max-h-[600px]">
                <TabsContent value="command" className="m-0 p-0">
                  <CommandTerminalContent
                    commandHistory={commandHistory}
                    command={command}
                    setCommand={setCommand}
                    handleCommand={handleCommand}
                    handleKeyPress={handleKeyPress}
                    clearTerminal={clearTerminal}
                  />
                </TabsContent>
                
                <TabsContent value="chat" className="m-0 p-0">
                  <ChatBotContent
                    messages={messages}
                    newMessage={newMessage}
                    setNewMessage={setNewMessage}
                    handleSendMessage={handleSendMessage}
                    handleKeyPress={handleKeyPress}
                    formatTime={formatTime}
                    activeSuggestions={activeSuggestions}
                    pendingPrompts={pendingPrompts}
                    onActionResponse={handleActionResponse}
                    activeContext={activeContext}
                    contextEntity={contextEntity}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Button
        size="icon"
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="terminal-toggle-btn rounded-full h-12 w-12 shadow-lg bg-black/70 border border-indigo-500/50 hover:bg-indigo-900/30 hover:border-indigo-400/80 transition-all duration-300 flex items-center justify-center"
      >
        {activeTab === 'command' ? (
          <Terminal className="h-5 w-5 text-cyan-300" />
        ) : (
          <MessageSquare className="h-5 w-5 text-green-300" />
        )}
        
        {(hasUnreadInsights || pendingPrompts.length > 0) && (
          <span className="absolute -top-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full animate-pulse"></span>
        )}
      </Button>
      
      <style>
        {`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.3);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.5);
        }
        
        .scan-lines::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            0deg,
            transparent 0,
            rgba(0, 170, 255, 0.03) 1px,
            transparent 2px
          );
          pointer-events: none;
        }
        `}
      </style>
    </>
  );
};

export default CommunicationTerminal;
