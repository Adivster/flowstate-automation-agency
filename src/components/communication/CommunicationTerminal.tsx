
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommunicationTerminal } from './useCommunicationTerminal';
import TerminalHeader from './TerminalHeader';
import ChatBotContent from './ChatBotContent';
import CommandTerminalContent from './CommandTerminalContent';
import { MessageSquare, Terminal, Sparkles, Zap } from 'lucide-react';

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
    pendingPrompts,
    hasUnreadInsights
  } = useCommunicationTerminal();

  const closeTerminal = () => setIsOpen(false);

  // Toggle button for showing/hiding terminal
  const toggleTerminal = () => setIsOpen(!isOpen);
  
  // Effect for animation on new insights
  const [pulseAnimation, setPulseAnimation] = useState(false);
  
  useEffect(() => {
    // Pulse animation when there are new insights or prompts
    if (pendingPrompts.length > 0 || hasUnreadInsights) {
      setPulseAnimation(true);
      
      // Reset pulse after animation
      const timer = setTimeout(() => {
        setPulseAnimation(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [pendingPrompts, hasUnreadInsights]);

  return (
    <>
      {/* Terminal Toggle Button - Always Visible */}
      <motion.button
        onClick={toggleTerminal}
        className={cn(
          "fixed bottom-4 left-4 z-50 flex items-center justify-center gap-2",
          "px-4 py-3 rounded-xl text-sm font-medium backdrop-blur-md shadow-lg",
          isOpen 
            ? "bg-black/80 border-purple-500/50 shadow-[0_0_15px_rgba(139,92,246,0.4)] text-purple-300" 
            : "bg-gradient-to-r from-purple-700/90 via-indigo-600/90 to-blue-600/90 border-purple-400/30 text-white shadow-[0_0_20px_rgba(139,92,246,0.6)]",
          "border hover:shadow-[0_0_25px_rgba(139,92,246,0.8)] transition-all duration-500",
          "group overflow-hidden relative"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={pulseAnimation ? { scale: 1 } : false}
        animate={pulseAnimation ? { 
          scale: [1, 1.1, 1],
          boxShadow: [
            '0 0 15px rgba(139,92,246,0.4)', 
            '0 0 30px rgba(139,92,246,0.8)', 
            '0 0 15px rgba(139,92,246,0.4)'
          ]
        } : {}}
        transition={pulseAnimation ? { duration: 1.5, repeat: 1 } : {}}
      >
        <span className={cn(
          "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          "bg-gradient-to-r from-purple-500/20 via-indigo-500/30 to-blue-500/20 backdrop-blur-sm"
        )}></span>
        
        {/* Animated particles when button is hovered */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl opacity-0 group-hover:opacity-100">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-purple-300/70"
              initial={{ 
                x: Math.random() * 100,
                y: Math.random() * 40,
                opacity: 0
              }}
              animate={{ 
                y: -20 - Math.random() * 20,
                opacity: [0, 1, 0],
                scale: [0, 1, 0.5]
              }}
              transition={{ 
                repeat: Infinity,
                duration: 1 + Math.random() * 2,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
        
        {isOpen ? (
          <Terminal className="h-4 w-4 relative z-10" />
        ) : (
          <>
            <MessageSquare className="h-4 w-4 relative z-10" />
            {pendingPrompts.length > 0 && (
              <Sparkles className="h-3 w-3 text-yellow-300 animate-pulse relative z-10" />
            )}
          </>
        )}
        <span className="relative z-10 font-medium">{isOpen ? "Close Terminal" : "FlowBot Terminal"}</span>
        
        {/* Notification Indicator */}
        {!isOpen && (pendingPrompts.length > 0 || hasUnreadInsights) && (
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold animate-bounce">
            {pendingPrompts.length || '!'}
          </div>
        )}
      </motion.button>

      {/* Terminal Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed bottom-16 left-4 z-50 w-[50vw] h-[70vh]"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <div className={cn(
              "flex flex-col h-full mx-auto",
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
