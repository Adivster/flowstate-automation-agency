
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommunicationTerminal } from './useCommunicationTerminal';
import TerminalHeader from './TerminalHeader';
import ChatBotContent from './ChatBotContent';
import { Terminal, Sparkles, Zap } from 'lucide-react';
import AIControlPanel from './AIControlPanel';

const CommunicationTerminal: React.FC = () => {
  const { 
    isOpen, 
    setIsOpen,
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
  const toggleTerminal = () => setIsOpen(!isOpen);
  const [pulseAnimation, setPulseAnimation] = useState(false);
  
  useEffect(() => {
    if (pendingPrompts.length > 0 || hasUnreadInsights) {
      setPulseAnimation(true);
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
        
        {/* Command prompt symbol with glowing effect */}
        <div className="relative z-10 mr-1.5 font-mono text-lg text-cyan-300 font-bold">
          <span className="text-purple-300">{'>'}</span>
          <span className="text-cyan-300 relative">
            _
            <motion.span 
              className="absolute top-0 left-0 w-full h-full bg-cyan-500/30 blur-sm"
              animate={{ opacity: [0.3, 0.9, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </span>
        </div>
        <span className="relative z-10 font-medium">
          {isOpen ? "Close Terminal" : "FlowBot Terminal"}
        </span>
        
        {/* Notification Indicator */}
        {!isOpen && (pendingPrompts.length > 0 || hasUnreadInsights) && (
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold animate-bounce shadow-[0_0_8px_rgba(236,72,153,0.7)]">
            {pendingPrompts.length || '!'}
          </div>
        )}
      </motion.button>

      {/* Terminal Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed bottom-16 left-4 z-50 w-[80vw] h-[70vh]"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <div className={cn(
              "flex flex-col h-full mx-auto",
              "bg-gradient-to-br from-gray-900/95 via-purple-950/30 to-gray-900/95",
              "backdrop-blur-xl border border-purple-500/30 shadow-xl shadow-purple-900/30",
              "rounded-xl overflow-hidden neon-border-purple"
            )}>
              <TerminalHeader
                clearTerminal={clearTerminal}
                closeTerminal={closeTerminal}
              />

              <div className="flex flex-1 overflow-hidden">
                <div className="flex-grow">
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
                    command={command}
                    setCommand={setCommand}
                    commandHistory={commandHistory}
                    handleCommand={handleCommand}
                  />
                </div>
                
                {/* AI Control Panel - Right side panel */}
                <div className="w-64 border-l border-indigo-500/30 bg-gray-900/80 backdrop-blur-md">
                  <AIControlPanel
                    activeContext="global"
                    contextEntity={null}
                    quickActions={[
                      {
                        id: 'cmd-action-1',
                        label: 'Clear Terminal',
                        icon: 'refresh',
                        action: 'optimize',
                        severity: 'low',
                      },
                      {
                        id: 'cmd-action-2',
                        label: 'System Status',
                        icon: 'chart',
                        action: 'diagnose',
                        severity: 'low',
                      },
                      {
                        id: 'cmd-action-3',
                        label: 'List Agents',
                        icon: 'users',
                        action: 'report',
                        severity: 'low',
                      }
                    ]}
                    systemMetrics={[
                      {
                        id: 'metric-1',
                        label: 'CPU Load',
                        value: 42,
                        previousValue: 38, 
                        unit: '%',
                        trend: 'up',
                        status: 'normal'
                      },
                      {
                        id: 'metric-2',
                        label: 'Memory Usage',
                        value: 68,
                        previousValue: 65,
                        unit: '%', 
                        trend: 'up',
                        status: 'normal'
                      },
                      {
                        id: 'metric-3',
                        label: 'Network I/O',
                        value: 12.4,
                        previousValue: 10.8,
                        unit: 'MB/s',
                        trend: 'up',
                        status: 'normal'
                      }
                    ]}
                    onExecuteAction={() => {}}
                    isExpanded={true}
                    setIsExpanded={() => {}}
                  />
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
