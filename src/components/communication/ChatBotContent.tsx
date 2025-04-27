
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User, Sparkles, Play, Zap } from 'lucide-react';
import ActionPromptCard from './ActionPromptCard';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

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
  const chatContainerRef = React.useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Scroll to bottom on new messages
  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  // Parse action cards (JSON) from message
  const parseActionCard = (message: string, actionId?: string) => {
    try {
      const actionData = JSON.parse(message);
      return (
        <ActionPromptCard 
          key={actionId || actionData.id}
          prompt={actionData} // Changed from actionPrompt to prompt to match the component's props
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
    setNewMessage(suggestion);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
    
    // Show toast for optimistic feedback
    toast({
      title: "Executing action",
      description: `Processing: ${suggestion}`,
      duration: 2000,
    });
  };
  
  return (
    <div className="flex flex-col h-full">
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
      
      <div className="p-3 border-t border-purple-500/30 bg-black/30">
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center gap-2">
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message or command..."
            className="flex-1 bg-black/30 border-purple-500/30 focus-visible:ring-purple-500/50 text-sm"
            onKeyPress={handleKeyPress}
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
        </form>
      </div>
    </div>
  );
};

export default ChatBotContent;
