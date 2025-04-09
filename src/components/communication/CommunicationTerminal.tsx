
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Terminal, X } from 'lucide-react';
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
    terminalWrapperRef,
    handleCommand,
    handleSendMessage,
    handleKeyPress,
    formatTime,
    clearTerminal,
  } = useCommunicationTerminal();

  return (
    <>
      {/* Terminal toggle button positioned in bottom right */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          size="icon"
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="terminal-toggle-btn rounded-full h-12 w-12 shadow-lg neon-border bg-flow-background hover:bg-flow-background/90"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Terminal className="h-5 w-5" />}
        </Button>
      </div>

      {/* Terminal panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={terminalWrapperRef}
            initial={{ y: 400, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-[450px] z-40 rounded-xl overflow-hidden"
          >
            <Tabs 
              value={activeTab} 
              onValueChange={(val) => setActiveTab(val as 'command' | 'chat')} 
              className="w-full bg-gray-900 border-2 border-flow-accent/30 rounded-xl shadow-lg neon-border"
            >
              <TerminalHeader 
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                clearTerminal={clearTerminal}
                closeTerminal={() => setIsOpen(false)}
              />
              
              <div>
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
    </>
  );
};

export default CommunicationTerminal;
