
import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Terminal } from 'lucide-react';
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
    handleCommand,
    handleSendMessage,
    handleKeyPress,
    formatTime,
    clearTerminal,
  } = useCommunicationTerminal();

  // Create a separate ref for the terminal content
  const terminalContentRef = useRef<HTMLDivElement>(null);

  // Handle outside clicks - improved implementation
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if terminal is open and click was outside terminal and not on toggle button
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

    // Add event listener for mouse clicks
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  // Custom event listener to open terminal
  useEffect(() => {
    const handleOpenTerminal = () => {
      setIsOpen(true);
    };

    window.addEventListener('openCommunicationTerminal', handleOpenTerminal);
    
    return () => {
      window.removeEventListener('openCommunicationTerminal', handleOpenTerminal);
    };
  }, [setIsOpen]);

  return (
    <>
      {/* Terminal toggle button positioned in bottom right */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          size="icon"
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="terminal-toggle-btn rounded-full h-12 w-12 shadow-lg bg-black/70 border border-indigo-500/50 hover:bg-indigo-900/30 hover:border-indigo-400/80 transition-all duration-300"
        >
          <Terminal className="h-5 w-5 text-cyan-300" />
        </Button>
      </div>

      {/* Terminal panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={terminalContentRef}
            initial={{ y: 400, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-[500px] z-40 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(79,70,229,0.3)]"
          >
            <Tabs 
              value={activeTab} 
              onValueChange={(val) => setActiveTab(val as 'command' | 'chat')} 
              className="w-full bg-gray-900/90 backdrop-blur-md border border-indigo-500/30 rounded-xl"
            >
              <TerminalHeader 
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                clearTerminal={clearTerminal}
                closeTerminal={() => setIsOpen(false)}
              />
              
              <div className="max-h-[600px]">
                {/* Terminal Tab */}
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
                
                {/* Chat Tab */}
                <TabsContent value="chat" className="m-0 p-0">
                  <ChatBotContent
                    messages={messages}
                    newMessage={newMessage}
                    setNewMessage={setNewMessage}
                    handleSendMessage={handleSendMessage}
                    handleKeyPress={handleKeyPress}
                    formatTime={formatTime}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Add global styles for scrollbar and scan-lines effect */}
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
