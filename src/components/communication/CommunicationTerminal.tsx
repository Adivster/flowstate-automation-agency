
import React from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommunicationTerminal } from './useCommunicationTerminal';
import TerminalHeader from './TerminalHeader';
import ChatBotContent from './ChatBotContent';
import CommandTerminalContent from './CommandTerminalContent';

const CommunicationTerminal: React.FC = () => {
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
    handleActionResponse,
    activeContext,
    contextEntity,
    activeSuggestions,
    pendingPrompts
  } = useCommunicationTerminal();

  const closeTerminal = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed bottom-0 right-0 z-50 h-auto w-full sm:w-[500px] lg:w-[550px]"
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.3 }}
        >
          <div className={cn(
            "flex flex-col h-[500px] mx-auto sm:mx-4",
            // Updated for lighter background in dark mode for better contrast
            "bg-gradient-to-br from-gray-900/95 via-purple-950/30 to-gray-900/90",
            "backdrop-blur-lg border border-purple-500/30 shadow-lg shadow-black/50",
            "rounded-t-xl"
          )}>
            <TerminalHeader
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              clearTerminal={clearTerminal}
              closeTerminal={closeTerminal}
            />

            <div className="flex-1 overflow-y-auto overflow-x-hidden terminal-content">
              {activeTab === 'chat' ? (
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
              ) : (
                <CommandTerminalContent
                  commandHistory={commandHistory}
                  command={command}
                  setCommand={setCommand}
                  handleCommand={handleCommand}
                  handleKeyPress={handleKeyPress}
                  clearTerminal={clearTerminal}
                />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommunicationTerminal;
