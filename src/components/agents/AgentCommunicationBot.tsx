
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Bot, X, Minimize, Maximize, MessagesSquare } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const AgentCommunicationBot: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot', text: string, timestamp: Date }[]>([
    { sender: 'bot', text: 'Hello! I\'m your agency communication assistant. How can I help you today?', timestamp: new Date() }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const { t } = useLanguage();
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: newMessage, timestamp: new Date() }]);
    setNewMessage('');
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = [
        "I'll connect you with the appropriate agent team right away.",
        "Your request has been logged and an agent will follow up within 2 hours.",
        "I've analyzed your question and am routing it to our knowledge base experts.",
        "Based on your query, I recommend checking our analytics division for insights.",
        "That's a great question! Let me find the best agent to help you with that."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages(prev => [...prev, { sender: 'bot', text: randomResponse, timestamp: new Date() }]);
    }, 1000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="relative">
      <motion.div 
        layout
        className={`${isExpanded ? 'fixed bottom-4 right-4 left-4 md:left-auto md:w-96 z-50' : 'w-full'}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="overflow-hidden border-2 neon-border backdrop-blur-sm">
          <div className="bg-flow-muted/30 p-3 flex justify-between items-center border-b border-flow-border">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/20">
                <Bot className="h-4 w-4 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-sm font-medium">{t('communicationBot')}</h3>
                <div className="flex items-center text-xs text-flow-foreground/60">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 mr-1"></span>
                  {t('online')}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6" 
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? <Minimize className="h-3 w-3" /> : <Maximize className="h-3 w-3" />}
              </Button>
              {isExpanded && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6" 
                  onClick={() => setIsExpanded(false)}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div 
                className="h-80 overflow-y-auto p-3 space-y-3 bg-flow-background/30"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 320, opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {messages.map((message, index) => (
                  <motion.div 
                    key={index}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
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
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="p-3 border-t border-flow-border flex items-center gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('typeMessage')}
              className="flex-1 bg-flow-muted/30 border border-flow-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
            <Button 
              size="sm" 
              onClick={handleSendMessage}
              className="bg-indigo-500 hover:bg-indigo-600"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </motion.div>
      
      {!isExpanded && (
        <div className="mt-4 text-center">
          <button 
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 text-indigo-300 rounded-full hover:bg-indigo-500/30 transition-colors"
            onClick={() => setIsExpanded(true)}
          >
            <MessagesSquare className="h-4 w-4" />
            {t('startConversation')}
          </button>
        </div>
      )}
    </div>
  );
};

export default AgentCommunicationBot;
