
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, Send } from 'lucide-react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

interface ChatBotContentProps {
  messages: Message[];
  newMessage: string;
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  formatTime: (date: Date) => string;
}

const ChatBotContent: React.FC<ChatBotContentProps> = ({
  messages,
  newMessage,
  setNewMessage,
  handleSendMessage,
  handleKeyPress,
  formatTime
}) => {
  const chatRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);
  
  return (
    <>
      <div 
        ref={chatRef}
        className="p-4 h-[300px] overflow-y-auto bg-gray-900/80"
      >
        {messages.map((message, index) => (
          <motion.div 
            key={index}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-3`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {message.sender === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center mr-2">
                <Bot className="h-4 w-4 text-indigo-400" />
              </div>
            )}
            <div 
              className={`max-w-[80%] px-3 py-2 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-indigo-500 text-white' 
                  : 'bg-flow-muted text-flow-foreground'
              }`}
            >
              <div className="text-sm">{message.text}</div>
              <div className="text-[10px] text-right mt-1 opacity-70">
                {formatTime(message.timestamp)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="p-3 border-t border-flow-accent/50 bg-black bg-opacity-70 flex items-center">
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="What can I help you with?"
          className="flex-1 bg-transparent border-flow-accent/30 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
        />
        <Button 
          size="sm" 
          onClick={handleSendMessage}
          className="ml-2 bg-indigo-500 hover:bg-indigo-600 min-w-10"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};

export default ChatBotContent;
