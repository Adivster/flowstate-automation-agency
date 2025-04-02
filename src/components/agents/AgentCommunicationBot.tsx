
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, Minimize, Maximize } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

// This component is now integrated into the CommunicationTerminal
// and is kept for reference or potential standalone use
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
  
  // This is now hidden by default as it's integrated into the CommunicationTerminal
  return null;
};

export default AgentCommunicationBot;
