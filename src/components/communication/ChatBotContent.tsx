
import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, Send } from 'lucide-react';
import ActionPromptCard from './ActionPromptCard';
import { ActionPrompt } from './useConversationalFlow';
import AIControlPanel from './AIControlPanel';
import { ControlAction, SystemMetric } from './types/conversationTypes';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  isAction?: boolean;
  actionId?: string;
}

interface ChatBotContentProps {
  messages: Message[];
  newMessage: string;
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  formatTime: (date: Date) => string;
  activeSuggestions?: string[];
  pendingPrompts: ActionPrompt[];
  onActionResponse: (promptId: string, action: 'confirm' | 'decline' | 'moreInfo') => void;
  activeContext: 'global' | 'division' | 'agent';
  contextEntity: {id: string; name: string; type: string} | null;
}

const ChatBotContent: React.FC<ChatBotContentProps> = ({
  messages,
  newMessage,
  setNewMessage,
  handleSendMessage,
  handleKeyPress,
  formatTime,
  activeSuggestions = [],
  pendingPrompts,
  onActionResponse,
  activeContext,
  contextEntity
}) => {
  const chatRef = useRef<HTMLDivElement>(null);
  const [isControlPanelExpanded, setIsControlPanelExpanded] = useState(true);
  
  // Generate context-aware quick actions
  const generateQuickActions = (): ControlAction[] => {
    if (activeContext === 'global') {
      return [
        { id: 'global-optimize', label: 'Optimize System', icon: 'zap', action: 'optimize' },
        { id: 'global-report', label: 'Generate Report', icon: 'chart', action: 'report' },
        { id: 'global-diagnose', label: 'System Diagnostic', icon: 'refresh', action: 'diagnose' },
        { id: 'global-tune', label: 'Balance Resources', icon: 'sliders', action: 'tune' }
      ];
    } else if (contextEntity) {
      const entitySpecificActions: ControlAction[] = [
        { 
          id: `${contextEntity.id}-optimize`, 
          label: `Optimize ${contextEntity.name}`, 
          icon: 'zap', 
          action: 'optimize',
          entityType: contextEntity.type,
          entityId: contextEntity.id,
          severity: Math.random() > 0.7 ? 'high' : Math.random() > 0.5 ? 'medium' : 'low'
        },
        { 
          id: `${contextEntity.id}-diagnose`, 
          label: `Diagnose ${contextEntity.name}`, 
          icon: 'refresh', 
          action: 'diagnose',
          entityType: contextEntity.type,
          entityId: contextEntity.id
        }
      ];
      
      if (contextEntity.type === 'division') {
        entitySpecificActions.push({ 
          id: `${contextEntity.id}-agents`, 
          label: 'Manage Agents', 
          icon: 'users', 
          action: 'reassign',
          entityType: contextEntity.type,
          entityId: contextEntity.id
        });
      } else {
        entitySpecificActions.push({ 
          id: `${contextEntity.id}-tune`, 
          label: 'Tune Parameters', 
          icon: 'sliders', 
          action: 'tune',
          entityType: contextEntity.type,
          entityId: contextEntity.id
        });
      }
      
      entitySpecificActions.push({ 
        id: `${contextEntity.id}-simulate`, 
        label: 'Run Simulation', 
        icon: 'cpu', 
        action: 'simulate',
        entityType: contextEntity.type,
        entityId: contextEntity.id
      });
      
      return entitySpecificActions;
    }
    
    return [];
  };
  
  // Generate system metrics
  const generateSystemMetrics = (): SystemMetric[] => {
    if (activeContext === 'global') {
      return [
        { 
          id: 'system-cpu', 
          label: 'System Load', 
          value: Math.floor(Math.random() * 30) + 50, 
          unit: '%',
          trend: Math.random() > 0.5 ? 'up' : 'down',
          status: 'normal'
        },
        { 
          id: 'system-efficiency', 
          label: 'Overall Efficiency', 
          value: Math.floor(Math.random() * 15) + 80, 
          unit: '%',
          trend: Math.random() > 0.7 ? 'down' : 'stable',
          status: Math.random() > 0.8 ? 'warning' : 'normal'
        },
        { 
          id: 'system-tasks', 
          label: 'Active Tasks', 
          value: Math.floor(Math.random() * 20) + 30, 
          unit: '',
          trend: 'stable',
          status: 'normal'
        }
      ];
    } else if (contextEntity) {
      const randomEfficiency = Math.floor(Math.random() * 30) + 70;
      const randomStatus = randomEfficiency < 80 ? 
        (randomEfficiency < 75 ? 'critical' : 'warning') : 
        'normal';
        
      return [
        { 
          id: `${contextEntity.id}-efficiency`, 
          label: 'Efficiency', 
          value: randomEfficiency, 
          unit: '%',
          trend: randomEfficiency < 80 ? 'down' : 'up',
          status: randomStatus
        },
        { 
          id: `${contextEntity.id}-load`, 
          label: 'Current Load', 
          value: Math.floor(Math.random() * 50) + 40, 
          unit: '%',
          trend: Math.random() > 0.5 ? 'up' : 'down',
          status: 'normal'
        },
        { 
          id: `${contextEntity.id}-response`, 
          label: 'Response Time', 
          value: Math.floor(Math.random() * 200) + 100, 
          unit: 'ms',
          trend: Math.random() > 0.7 ? 'up' : 'stable',
          status: Math.random() > 0.8 ? 'warning' : 'normal'
        }
      ];
    }
    
    return [];
  };
  
  // Handle execution of actions from the control panel
  const handleExecuteAction = (actionId: string) => {
    const action = quickActions.find(a => a.id === actionId);
    if (action) {
      const prompt = `${action.action} ${action.entityType || 'system'} ${action.entityId || ''}`.trim();
      setNewMessage(prompt);
      setTimeout(() => {
        handleSendMessage();
      }, 100);
    }
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Find prompt from JSON string
  const findPromptFromJson = (jsonString: string): ActionPrompt | null => {
    try {
      const promptData = JSON.parse(jsonString);
      return promptData;
    } catch (e) {
      return null;
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setNewMessage(suggestion);
  };
  
  const quickActions = generateQuickActions();
  const systemMetrics = generateSystemMetrics();
  
  return (
    <>
      <div 
        ref={chatRef}
        className="p-4 h-[260px] overflow-y-auto custom-scrollbar"
        style={{ 
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(17, 24, 39, 0.7), rgba(6, 8, 15, 0.95))',
          backgroundSize: '100% 100%'
        }}
      >
        {messages.map((message, index) => {
          // Check if this is an action prompt
          if (message.sender === 'bot' && message.isAction && message.text.startsWith('{')) {
            const promptData = findPromptFromJson(message.text);
            if (promptData) {
              return (
                <div key={index} className="mb-4">
                  <ActionPromptCard 
                    prompt={promptData} 
                    onAction={onActionResponse}
                  />
                </div>
              );
            }
          }
          
          // Regular message
          return (
            <motion.div 
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {message.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center mr-2 shadow-[0_0_10px_rgba(79,70,229,0.3)]">
                  <Bot className="h-4 w-4 text-cyan-300" />
                </div>
              )}
              <div 
                className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]' 
                    : 'bg-gray-900/80 border border-indigo-500/20 text-cyan-100 shadow-[0_0_10px_rgba(79,70,229,0.2)]'
                }`}
              >
                <div className="text-sm whitespace-pre-wrap">{message.text}</div>
                <div className="text-[10px] text-right mt-1.5 opacity-70">
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Show active suggestions if available */}
        {activeSuggestions.length > 0 && (
          <div className="mb-4 mt-2">
            <div className="text-xs text-cyan-400/70 mb-2">Suggested commands:</div>
            <div className="flex flex-wrap gap-2">
              {activeSuggestions.slice(0, 3).map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs bg-indigo-500/10 border border-indigo-500/30 hover:bg-indigo-500/20"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* AI Control Panel */}
      <div className="px-3 pt-3">
        <AIControlPanel
          activeContext={activeContext}
          contextEntity={contextEntity}
          quickActions={quickActions}
          systemMetrics={systemMetrics}
          onExecuteAction={handleExecuteAction}
          isExpanded={isControlPanelExpanded}
          setIsExpanded={setIsControlPanelExpanded}
        />
      </div>
      
      <div className="p-3 border-t border-indigo-500/30 bg-black/80 flex items-center">
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="What can I help you with?"
          className="flex-1 bg-black/50 border-indigo-500/30 rounded-full px-4 py-1.5 text-sm text-cyan-100 focus:border-cyan-400/70 focus:ring-1 focus:ring-cyan-400/40"
        />
        <Button 
          onClick={handleSendMessage}
          size="sm" 
          className="ml-2 bg-indigo-600 hover:bg-indigo-700 min-w-10 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.5)]"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};

export default ChatBotContent;
