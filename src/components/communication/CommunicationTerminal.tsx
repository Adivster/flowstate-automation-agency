
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
          "fixed bottom-4 left-4 z-50 flex items-center justify-center gap-1.5",
          "px-4 py-2.5 rounded-xl text-sm font-medium backdrop-blur-md",
          isOpen 
            ? "bg-black/80 border-purple-500/50 shadow-[0_0_15px_rgba(139,92,246,0.4)] text-purple-300" 
            : "bg-gradient-to-r from-purple-600/90 to-blue-600/90 border-purple-500/30 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]",
          "border hover:shadow-[0_0_20px_rgba(139,92,246,0.7)] transition-all duration-300",
          "group"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className={cn(
          "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          "bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm"
        )}></span>
        
        {isOpen ? (
          <Terminal className="h-4 w-4 relative z-10" />
        ) : (
          <MessageSquare className="h-4 w-4 relative z-10" />
        )}
        <span className="relative z-10">{isOpen ? "Close Terminal" : "Open Terminal"}</span>
        
        {!isOpen && pendingPrompts.length > 0 && (
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold">
            {pendingPrompts.length}
          </span>
        )}
      </motion.button>

      {/* Terminal Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed bottom-16 left-4 z-50 w-1/2 max-w-3xl min-w-[500px]"
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <div className={cn(
              "flex flex-col h-[500px] mx-auto",
              "bg-gradient-to-br from-gray-900/95 via-purple-950/30 to-gray-900/95",
              "backdrop-blur-xl border border-purple-500/30 shadow-xl shadow-purple-900/30",
              "rounded-xl overflow-hidden"
            )}>
              <TerminalHeader
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                clearTerminal={clearTerminal}
                closeTerminal={closeTerminal}
              />

              <div className="flex flex-1 overflow-hidden">
                <div className="flex-grow">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommunicationTerminal;
