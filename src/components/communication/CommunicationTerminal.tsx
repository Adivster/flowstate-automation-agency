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
      {/* Floating Terminal Button */}
      <motion.button
        onClick={toggleTerminal}
        className={cn(
          "fixed bottom-6 left-6 z-50",
          "w-14 h-14 rounded-full flex items-center justify-center",
          "bg-gradient-to-br from-purple-900/90 to-blue-900/90",
          "border border-purple-500/30 shadow-lg",
          "hover:shadow-purple-500/20 hover:border-purple-500/50",
          "transition-all duration-500 group"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="relative font-mono text-lg">
          <span className="text-purple-300">{'>'}</span>
          <span className="text-cyan-300">_</span>
          <motion.div
            className="absolute inset-0 blur-sm"
            animate={{
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="text-purple-400">{'>'}</span>
            <span className="text-cyan-400">_</span>
          </motion.div>
        </div>

        {/* Notification Indicator */}
        {!isOpen && (pendingPrompts.length > 0 || hasUnreadInsights) && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold animate-pulse">
            {pendingPrompts.length || '!'}
          </div>
        )}
      </motion.button>

      {/* Terminal Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed bottom-24 left-6 z-50 w-[80vw] h-[70vh] max-w-3xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
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
