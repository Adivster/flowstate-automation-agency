
import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ActionPromptCard from './ActionPromptCard';
import { ActionPrompt } from './useConversationalFlow';
import AIControlPanel from './AIControlPanel';
import { ControlAction, SystemMetric } from './types/conversationTypes';

interface ChatBotContentProps {
  messages: Array<{sender: 'user' | 'bot', text: string, timestamp: Date, isAction?: boolean, actionId?: string}>;
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  formatTime: (date: Date) => string;
  activeSuggestions: string[];
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
  activeSuggestions,
  pendingPrompts,
  onActionResponse,
  activeContext,
  contextEntity
}) => {
  const chatRef = useRef<HTMLDivElement>(null);
  const [isControlPanelExpanded, setIsControlPanelExpanded] = useState(true);
  
  const generateQuickActions = (): ControlAction[] => {
    if (activeContext === 'global') {
      return [
        {
          id: 'action-1',
          label: 'System Diagnostics',
          icon: 'chart',
          action: 'diagnose',
          severity: 'low',
        },
        {
          id: 'action-2',
          label: 'Optimize Network',
          icon: 'zap',
          action: 'optimize',
          severity: 'medium',
        },
        {
          id: 'action-3',
          label: 'Resource Allocation',
          icon: 'sliders',
          action: 'tune',
          severity: 'low',
        },
        {
          id: 'action-4',
          label: 'Performance Report',
          icon: 'chart',
          action: 'report',
          severity: 'low',
        }
      ];
    } else if (activeContext === 'division' && contextEntity) {
      return [
        {
          id: `${contextEntity.id}-action-1`,
          label: 'Division Tune-up',
          icon: 'sliders',
          action: 'tune',
          entityType: 'division',
          entityId: contextEntity.id,
          severity: 'medium',
        },
        {
          id: `${contextEntity.id}-action-2`,
          label: 'Resource Reallocation',
          icon: 'refresh',
          action: 'reassign',
          entityType: 'division',
          entityId: contextEntity.id,
          severity: 'high',
        },
        {
          id: `${contextEntity.id}-action-3`,
          label: 'Performance Test',
          icon: 'chart',
          action: 'simulate',
          entityType: 'division',
          entityId: contextEntity.id,
          severity: 'low',
        },
        {
          id: `${contextEntity.id}-action-4`,
          label: 'Agent Management',
          icon: 'users',
          action: 'optimize',
          entityType: 'division',
          entityId: contextEntity.id,
          severity: 'medium',
        }
      ];
    } else if (activeContext === 'agent' && contextEntity) {
      return [
        {
          id: `${contextEntity.id}-action-1`,
          label: 'Optimize Agent',
          icon: 'zap',
          action: 'optimize',
          entityType: 'agent',
          entityId: contextEntity.id,
          severity: 'medium',
        },
        {
          id: `${contextEntity.id}-action-2`,
          label: 'Run Diagnostics',
          icon: 'cpu',
          action: 'diagnose',
          entityType: 'agent',
          entityId: contextEntity.id,
          severity: 'low',
        },
        {
          id: `${contextEntity.id}-action-3`,
          label: 'Reassign Tasks',
          icon: 'refresh',
          action: 'reassign',
          entityType: 'agent',
          entityId: contextEntity.id,
          severity: 'high',
        },
        {
          id: `${contextEntity.id}-action-4`,
          label: 'Simulate Workload',
          icon: 'chart',
          action: 'simulate',
          entityType: 'agent',
          entityId: contextEntity.id,
          severity: 'low',
        }
      ];
    }
    
    return [];
  };
  
  const generateSystemMetrics = (): SystemMetric[] => {
    if (activeContext === 'global') {
      return [
        {
          id: 'metric-1',
          label: 'Overall Efficiency',
          value: 87,
          previousValue: 85, 
          unit: '%',
          trend: 'up',
          status: 'normal'
        },
        {
          id: 'metric-2',
          label: 'Resource Utilization',
          value: 72,
          previousValue: 78,
          unit: '%', 
          trend: 'down',
          status: 'warning'
        },
        {
          id: 'metric-3',
          label: 'Response Time',
          value: 120,
          previousValue: 150,
          unit: 'ms',
          trend: 'down',
          status: 'normal'
        },
        {
          id: 'metric-4',
          label: 'Error Rate',
          value: 2.3,
          previousValue: 1.8,
          unit: '%',
          trend: 'up',
          status: 'warning'
        }
      ];
    } else if (activeContext === 'division' && contextEntity) {
      return [
        {
          id: `${contextEntity.id}-metric-1`,
          label: 'Division Efficiency',
          value: 84,
          previousValue: 79,
          unit: '%',
          trend: 'up',
          status: 'normal'
        },
        {
          id: `${contextEntity.id}-metric-2`,
          label: 'Agent Utilization',
          value: 68,
          previousValue: 70,
          unit: '%',
          trend: 'down',
          status: 'normal'
        },
        {
          id: `${contextEntity.id}-metric-3`,
          label: 'Task Completion Rate',
          value: 91,
          previousValue: 89,
          unit: '%',
          trend: 'up',
          status: 'normal'
        },
        {
          id: `${contextEntity.id}-metric-4`,
          label: 'Bottleneck Index',
          value: 12,
          previousValue: 8,
          unit: '%',
          trend: 'up',
          status: 'critical'
        }
      ];
    } else if (activeContext === 'agent' && contextEntity) {
      return [
        {
          id: `${contextEntity.id}-metric-1`,
          label: 'Processing Capacity',
          value: 76,
          previousValue: 72,
          unit: '%',
          trend: 'up',
          status: 'normal'
        },
        {
          id: `${contextEntity.id}-metric-2`,
          label: 'Response Accuracy',
          value: 94,
          previousValue: 96,
          unit: '%',
          trend: 'down',
          status: 'warning'
        },
        {
          id: `${contextEntity.id}-metric-3`,
          label: 'Task Completion Time',
          value: 3.2,
          previousValue: 3.5,
          unit: 'min',
          trend: 'down',
          status: 'normal'
        },
        {
          id: `${contextEntity.id}-metric-4`,
          label: 'Cognitive Load',
          value: 87,
          previousValue: 80,
          unit: '%',
          trend: 'up',
          status: 'warning'
        }
      ];
    }
    
    return [];
  };
  
  const handleExecuteAction = (actionId: string) => {
    const action = quickActions.find(a => a.id === actionId);
    if (action) {
      onActionResponse(actionId, 'confirm');
      setNewMessage(`Execute ${action.action} on ${action.entityType || 'system'} ${action.entityId || ''}`);
      setTimeout(() => {
        handleSendMessage();
      }, 100);
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const findPromptFromJson = (jsonString: string): ActionPrompt | null => {
    try {
      const promptData = JSON.parse(jsonString);
      return promptData.id ? promptData as ActionPrompt : null;
    } catch {
      return null;
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setNewMessage(suggestion);
  };

  // Generate quick actions and system metrics based on context
  const quickActions = generateQuickActions();
  const systemMetrics = generateSystemMetrics();

  return (
    <div className="flex h-full">
      {/* Chat Window */}
      <div className="flex-1 flex flex-col h-full scan-lines overflow-hidden">
        <div 
          ref={chatRef}
          className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-black/60 backdrop-blur-lg"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, rgba(90, 70, 255, 0.1) 0%, transparent 50%)",
          }}
        >
          {messages.map((message, index) => {
            if (message.sender === 'bot' && message.isAction && message.text.startsWith('{')) {
              const promptData = findPromptFromJson(message.text);
              if (promptData) {
                return (
                  <ActionPromptCard 
                    key={index}
                    prompt={promptData}
                    onAction={(action) => onActionResponse(promptData.id, action)}
                    timestamp={formatTime(message.timestamp)}
                  />
                );
              }
            }
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`mb-4 ${message.sender === 'user' ? 'text-right' : ''}`}
              >
                <div 
                  className={`inline-block rounded-lg px-4 py-2 max-w-[85%] break-words ${
                    message.sender === 'user' 
                      ? 'bg-indigo-600/40 text-white border border-indigo-500/30' 
                      : 'bg-gray-800/70 text-gray-100 border border-gray-700/50'
                  }`}
                >
                  {message.text}
                </div>
                <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-indigo-400/70' : 'text-gray-400/70'}`}>
                  {formatTime(message.timestamp)}
                </div>
              </motion.div>
            );
          })}

          {activeSuggestions.length > 0 && (
            <div className="mb-4 mt-2">
              <div className="text-xs text-cyan-400/70 mb-2">Suggested commands:</div>
              <div className="flex flex-wrap gap-2">
                {activeSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs bg-gray-800/70 border-cyan-500/30 hover:bg-cyan-900/20 hover:text-cyan-300"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
          className="p-3 border-t border-indigo-500/30 bg-black/70"
        >
          <div className="flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-gray-800/50 text-gray-100 rounded-l-md border-y border-l border-gray-600/50 px-3 py-2 outline-none focus:ring-1 focus:ring-indigo-500/50"
              placeholder="Type your message..."
            />
            <Button 
              type="submit" 
              size="sm"
              className="rounded-l-none bg-indigo-600 hover:bg-indigo-700 text-white h-[38px]"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
      
      {/* AI Control Panel - Now positioned on the right side */}
      <div className="w-64 border-l border-indigo-500/30 bg-gray-900/80 backdrop-blur-md">
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
    </div>
  );
};

export default ChatBotContent;
