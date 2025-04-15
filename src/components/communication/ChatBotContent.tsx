
import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, Send } from 'lucide-react';
import ActionPromptCard from './ActionPromptCard';
import { ActionPrompt } from './useConversationalFlow';

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
  onActionResponse
}) => {
  const chatRef = useRef<HTMLDivElement>(null);
  
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
  
  return (
    <>
      <div 
        ref={chatRef}
        className="p-4 h-[320px] overflow-y-auto custom-scrollbar"
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
