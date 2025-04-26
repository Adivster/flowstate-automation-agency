
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommunicationTerminal } from './useCommunicationTerminal';
import TerminalHeader from './TerminalHeader';
import ChatBotContent from './ChatBotContent';
import CommandTerminalContent from './CommandTerminalContent';
import { MessageSquare, Terminal } from 'lucide-react';

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

  // Toggle button for showing/hiding terminal
  const toggleTerminal = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Terminal Toggle Button - Always Visible */}
      <motion.button
        onClick={toggleTerminal}
        className={cn(
          "flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium",
          "bg-gradient-to-r from-purple-600/80 to-blue-600/80 text-white",
          "shadow-[0_0_15px_rgba(139,92,246,0.5)] border border-purple-500/30",
          "hover:shadow-[0_0_20px_rgba(139,92,246,0.7)] transition-all duration-300"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        {isOpen ? (
          <Terminal className="h-4 w-4" />
        ) : (
          <MessageSquare className="h-4 w-4" />
        )}
        {isOpen ? "Close Terminal" : "Open Terminal"}
      </motion.button>

      {/* Terminal Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed bottom-16 left-4 z-50 h-auto w-full sm:w-[500px] lg:w-[550px]"
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <div className={cn(
              "flex flex-col h-[500px] mx-auto sm:mx-0",
              "bg-gradient-to-br from-gray-900/95 via-purple-950/30 to-gray-900/95",
              "backdrop-blur-xl border border-purple-500/30 shadow-lg shadow-purple-900/30",
              "rounded-xl"
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
    </>
  );
};

export default CommunicationTerminal;
