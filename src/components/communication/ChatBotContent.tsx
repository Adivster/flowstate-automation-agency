
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User, Sparkles, Play, Zap, Terminal, ChevronRight } from 'lucide-react';
import ActionPromptCard from './ActionPromptCard';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { CommandHistoryItem } from './types/conversationTypes';

interface ChatBotContentProps {
  messages: Array<{sender: 'user' | 'bot', text: string, timestamp: Date, isAction?: boolean, actionId?: string}>;
  newMessage: string;
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  formatTime: (date: Date) => string;
  activeSuggestions: string[];
  pendingPrompts: any[];
  onActionResponse: (promptId: string, action: 'confirm' | 'decline' | 'moreInfo') => void;
  activeContext?: string;
  contextEntity?: {id: string, name: string};
  command: string;
  setCommand: (cmd: string) => void;
  commandHistory: CommandHistoryItem[];
  handleCommand: (e: React.FormEvent) => void;
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
  contextEntity,
  command,
  setCommand,
  commandHistory,
  handleCommand
}) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = React.useState<'chat' | 'command'>('chat');
  
  // Scroll to bottom on new messages or commands
  useEffect(() => {
    if (chatContainerRef.current && activeTab === 'chat') {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
    if (terminalContainerRef.current && activeTab === 'command') {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [messages, commandHistory, activeTab]);
  
  // Focus input on mount and tab change
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeTab]);
  
  // Parse action cards (JSON) from message
  const parseActionCard = (message: string, actionId?: string) => {
    try {
      const actionData = JSON.parse(message);
      return (
        <ActionPromptCard 
          key={actionId || actionData.id}
          prompt={actionData}
          onAction={(action) => onActionResponse(actionData.id, action)}
        />
      );
    } catch (e) {
      // Handle markdown formatting
      if (message.includes('**')) {
        return (
          <div className="whitespace-pre-wrap">
            {message.split('\n\n').map((paragraph, i) => {
              // Bold text between ** markers
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return <h4 key={i} className="font-bold text-purple-300 mb-2">{paragraph.slice(2, -2)}</h4>;
              }
              return <p key={i} className="mb-2">{paragraph}</p>;
            })}
          </div>
        );
      }
      
      // Just return the plain text if not JSON or markdown
      return <div className="whitespace-pre-wrap">{message}</div>;
    }
  };

  // Handle quick action button click
  const handleQuickAction = (suggestion: string) => {
    if (activeTab === 'chat') {
      setNewMessage(suggestion);
      setTimeout(() => {
        handleSendMessage();
      }, 100);
    } else {
      setCommand(suggestion);
      const formEvent = new Event('submit', { cancelable: true }) as unknown as React.FormEvent;
      setTimeout(() => {
        handleCommand(formEvent);
      }, 100);
    }
    
    // Show toast for optimistic feedback
    toast({
      title: "Executing action",
      description: `Processing: ${suggestion}`,
      duration: 2000,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'chat') {
      handleSendMessage();
    } else {
      handleCommand(e);
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Tab navigation */}
      <div className="flex border-b border-purple-500/30 bg-black/30">
        <button
          className={cn(
            "flex-1 py-1.5 text-xs font-medium flex items-center justify-center",
            activeTab === 'chat' 
              ? "bg-purple-500/20 text-purple-300 border-b-2 border-purple-500"
              : "text-gray-400 hover:bg-purple-500/10"
          )}
          onClick={() => setActiveTab('chat')}
        >
          <Bot className="h-3.5 w-3.5 mr-1.5" />
          Chat Mode
        </button>
        <button
          className={cn(
            "flex-1 py-1.5 text-xs font-medium flex items-center justify-center",
            activeTab === 'command' 
              ? "bg-cyan-500/20 text-cyan-300 border-b-2 border-cyan-500"
              : "text-gray-400 hover:bg-cyan-500/10" 
          )}
          onClick={() => setActiveTab('command')}
        >
          <Terminal className="h-3.5 w-3.5 mr-1.5" />
          Command Mode
        </button>
      </div>
      
      {/* Chat content */}
      {activeTab === 'chat' && (
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
        >
          {activeContext && contextEntity && (
            <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-3 mb-4">
              <div className="text-xs text-flow-foreground/70">Currently focused on:</div>
              <div className="text-sm text-purple-300 font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                {activeContext}: {contextEntity.name}
              </div>
            </div>
          )}
          
          {messages.map((message, index) => (
            <motion.div 
              key={index}
              className={cn(
                "flex gap-3",
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              )}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {message.sender === 'bot' && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              )}
              
              <div className={cn(
                "max-w-[85%] p-3 rounded-lg",
                message.sender === 'user' 
                  ? "bg-blue-600/30 border border-blue-500/30 shadow-md shadow-blue-900/10" 
                  : message.isAction
                    ? "bg-transparent" // Action cards have their own styling
                    : "bg-purple-500/10 border border-purple-500/20 shadow-md shadow-purple-900/10"
              )}>
                {message.isAction 
                  ? parseActionCard(message.text, message.actionId)
                  : parseActionCard(message.text)
                }
                <div className="text-[10px] text-flow-foreground/50 mt-1">
                  {formatTime(message.timestamp)}
                </div>
              </div>
              
              {message.sender === 'user' && (
                <div className="w-7 h-7 rounded-full bg-blue-600/50 border border-blue-500/30 flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-100" />
                </div>
              )}
            </motion.div>
          ))}
          
          {activeSuggestions.length > 0 && (
            <motion.div 
              className="flex flex-wrap gap-2 mt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="w-full mb-1 text-xs text-purple-400/80 flex items-center gap-2">
                <Sparkles className="h-3 w-3" />
                <span>Suggested actions:</span>
              </div>
              {activeSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="bg-purple-900/20 hover:bg-purple-900/30 border-purple-500/30 text-xs group relative overflow-hidden"
                  onClick={() => handleQuickAction(suggestion)}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                  <Play className="h-3 w-3 mr-1.5 text-purple-400" />
                  {suggestion}
                </Button>
              ))}
            </motion.div>
          )}
          
          {pendingPrompts.length > 0 && (
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="w-full mb-2 text-xs text-amber-400/90 flex items-center gap-2">
                <Zap className="h-3 w-3" />
                <span>Opportunities requiring attention:</span>
              </div>
              <div className="space-y-3">
                {pendingPrompts.slice(0, 2).map((prompt, index) => (
                  <ActionPromptCard 
                    key={`pending-${prompt.id}-${index}`}
                    prompt={prompt}
                    onAction={(action) => onActionResponse(prompt.id, action)}
                  />
                ))}
                {pendingPrompts.length > 2 && (
                  <div className="text-xs text-flow-foreground/60 text-center">
                    + {pendingPrompts.length - 2} more opportunities
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      )}
      
      {/* Command terminal content */}
      {activeTab === 'command' && (
        <div 
          ref={terminalContainerRef}
          className="flex-1 overflow-y-auto p-3 text-sm font-mono custom-scrollbar scan-lines bg-black/60 backdrop-blur-lg"
        >
          {commandHistory.map((entry, index) => (
            <div key={index} className="mb-2">
              {entry.type === 'input' && (
                <div className="flex">
                  <span className="text-green-400 mr-2">{'>'}</span>
                  <span className="text-indigo-100">{entry.content}</span>
                </div>
              )}
              
              {entry.type === 'output' && (
                <div className="text-cyan-300 pl-4 whitespace-pre-wrap">{entry.content}</div>
              )}
              
              {entry.type === 'error' && (
                <div className="text-red-400 pl-4">{entry.content}</div>
              )}
              
              {entry.type === 'system' && (
                <div className="text-amber-300 italic">{entry.content}</div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Input area - adapts based on active tab */}
      <div className="p-3 border-t border-purple-500/30 bg-black/30">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          {activeTab === 'chat' ? (
            <>
              <Input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message or command..."
                className="flex-1 bg-black/30 border-purple-500/30 focus-visible:ring-purple-500/50 text-sm"
                onKeyPress={handleKeyPress}
                ref={inputRef}
              />
              <Button 
                type="submit"
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 group relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></span>
                <Send className="h-4 w-4 mr-1 relative z-10" />
                <span className="relative z-10">Send</span>
              </Button>
            </>
          ) : (
            <div className="flex items-center w-full">
              <span className="text-green-400 mr-2">{'>'}</span>
              <input
                ref={inputRef}
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-transparent border-none outline-none text-indigo-100"
                placeholder="Type command..."
                aria-label="Command input"
              />
              <Button 
                type="submit"
                variant="ghost"
                size="sm"
                className="p-1 h-8 w-8 text-cyan-400/60 hover:text-cyan-400 hover:bg-transparent"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChatBotContent;
