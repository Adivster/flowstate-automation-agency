
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, MessageCircle, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

// Global state for managing open chat windows
const globalChatState = {
  openChatId: null,
  setOpenChatId: (id: number | null) => {
    globalChatState.openChatId = id;
    globalChatState.listeners.forEach(listener => listener(id));
  },
  listeners: [] as ((id: number | null) => void)[],
  subscribe: (listener: (id: number | null) => void) => {
    globalChatState.listeners.push(listener);
    return () => {
      globalChatState.listeners = globalChatState.listeners.filter(l => l !== listener);
    };
  }
};

interface RoutePoint {
  division: string;
  x: number;
  y: number;
}

interface AgentProps {
  agent: {
    id: number;
    name: string;
    role: string;
    status: 'working' | 'idle' | 'paused' | 'error';
    icon: LucideIcon;
    division: string;
    position: {
      x: number;
      y: number;
    };
  };
  routePath?: RoutePoint[];
  isSelected?: boolean;
  onAgentClick?: (id: number) => void;
}

const AgentCharacter: React.FC<AgentProps> = ({ 
  agent, 
  routePath = [], 
  isSelected = false, 
  onAgentClick 
}) => {
  const [position, setPosition] = useState(agent.position);
  const [currentRouteIndex, setCurrentRouteIndex] = useState(0);
  const [taskProgress, setTaskProgress] = useState(Math.floor(Math.random() * 30) + 70); // 70-100% initial progress
  const [isMoving, setIsMoving] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{sender: 'user' | 'agent', text: string}>>([
    {sender: 'agent', text: `Hello, I'm ${agent.name}. How can I assist you with my ${agent.role} expertise?`}
  ]);
  const { t } = useLanguage();
  const { toast } = useToast();
  const chatRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  
  // Division-based color schemes
  const divisionColors = {
    kb: { bg: 'bg-indigo-500', text: 'text-indigo-500', border: 'border-indigo-500', avatarBg: 'bg-indigo-100', shadow: '#6366f1' },
    analytics: { bg: 'bg-yellow-500', text: 'text-yellow-500', border: 'border-yellow-500', avatarBg: 'bg-yellow-100', shadow: '#eab308' },
    operations: { bg: 'bg-purple-500', text: 'text-purple-500', border: 'border-purple-500', avatarBg: 'bg-purple-100', shadow: '#a855f7' },
    strategy: { bg: 'bg-blue-500', text: 'text-blue-500', border: 'border-blue-500', avatarBg: 'bg-blue-100', shadow: '#3b82f6' },
    research: { bg: 'bg-green-500', text: 'text-green-500', border: 'border-green-500', avatarBg: 'bg-green-100', shadow: '#22c55e' },
    lounge: { bg: 'bg-amber-500', text: 'text-amber-500', border: 'border-amber-500', avatarBg: 'bg-amber-100', shadow: '#f59e0b' }
  };
  
  const colors = divisionColors[agent.division] || divisionColors.kb;
  
  // Subscribe to global chat state
  useEffect(() => {
    const unsubscribe = globalChatState.subscribe((openId) => {
      if (openId !== agent.id) {
        setChatOpen(false);
      }
    });
    
    return () => unsubscribe();
  }, [agent.id]);
  
  // Handle clicks outside the chat window
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatOpen && 
        chatWindowRef.current && 
        !chatWindowRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest(`.chat-trigger-${agent.id}`)
      ) {
        setChatOpen(false);
      }
    };
    
    if (chatOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [chatOpen, agent.id]);
  
  // Scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatMessages]);
  
  // Simulate task progress changes
  useEffect(() => {
    if (agent.status === 'working') {
      const interval = setInterval(() => {
        // Randomly update task progress for working agents
        setTaskProgress(prev => {
          const change = Math.random() > 0.5 ? Math.random() * 5 : -Math.random() * 3;
          return Math.max(20, Math.min(100, prev + change));
        });
      }, 3000);
      
      return () => clearInterval(interval);
    } else if (agent.status === 'idle') {
      // Idle agents have no active tasks
      setTaskProgress(0);
    }
    // For other statuses (paused, error), keep current progress
  }, [agent.status]);
  
  // Movement between route points with smooth transitions
  useEffect(() => {
    let interval;
    
    if (agent.status === 'working' && routePath.length > 0) {
      // Route-based movement for working agents
      interval = setInterval(() => {
        const nextIndex = (currentRouteIndex + 1) % routePath.length;
        const nextPoint = routePath[nextIndex];
        
        setIsMoving(true);
        
        // Move to next point
        setPosition({
          x: nextPoint.x,
          y: nextPoint.y
        });
        
        setCurrentRouteIndex(nextIndex);
        
        // Set isMoving to false after the transition completes
        setTimeout(() => {
          setIsMoving(false);
        }, 1000);
        
      }, 10000 + (agent.id * 3000)); // Varied movement timing to avoid synchronization
    } else if (agent.status === 'working') {
      // Random small movements within division area for more natural appearance
      interval = setInterval(() => {
        // Create small random movements around the original position
        const newX = agent.position.x + (Math.random() * 3 - 1.5);
        const newY = agent.position.y + (Math.random() * 3 - 1.5);
        
        setPosition({
          x: Math.max(5, Math.min(95, newX)),
          y: Math.max(5, Math.min(85, newY))
        });
      }, 3000 + (agent.id * 500)); // Stagger movements
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [agent, currentRouteIndex, routePath]);
  
  // Determine colors based on status and division
  const statusColors = {
    working: 'bg-green-500',
    idle: 'bg-gray-500',
    paused: 'bg-amber-500',
    error: 'bg-red-500'
  };
  
  // Get task progress color based on status and progress
  const getTaskProgressColor = () => {
    if (agent.status === 'idle') return 'bg-gray-500/50';
    if (agent.status === 'paused') return 'bg-amber-500';
    if (agent.status === 'error') return 'bg-red-500';
    if (taskProgress > 80) return 'bg-green-500';
    if (taskProgress > 50) return 'bg-amber-500';
    return colors.bg;
  };
  
  const Icon = agent.icon;
  
  // Get initials for avatar fallback
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  // Handle opening the chat dialog
  const handleOpenChat = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setChatOpen(true);
    globalChatState.setOpenChatId(agent.id);
  };
  
  // Handle sending a chat message
  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    // Add user message to chat
    setChatMessages([...chatMessages, { sender: 'user', text: chatInput }]);
    
    // Clear input
    setChatInput('');
    
    // Show a notification
    toast({
      title: `Message sent to ${agent.name}`,
      description: chatInput,
      duration: 3000,
    });
    
    // Simulate agent response after a delay
    setTimeout(() => {
      let response = "";
      
      // Generate response based on division and role
      switch (agent.division) {
        case 'kb':
          response = "I've accessed our knowledge base. The information you've requested is being processed. Would you like me to compile a report?";
          break;
        case 'analytics':
          response = "Analyzing your request. I can generate insights based on our data patterns. Would you like me to run predictive models?";
          break;
        case 'operations':
          response = "Your task has been logged. I'll optimize resource allocation to complete this efficiently. Can I help with anything else?";
          break;
        case 'strategy':
          response = "I'm evaluating strategic implications of your request. This aligns with our long-term objectives. Shall I prepare a strategy brief?";
          break;
        case 'research':
          response = "Interesting question. I'll explore potential innovations in this area. Would you like me to schedule a research session?";
          break;
        default:
          response = "I've received your message and will process it according to protocol. Is there anything else you need assistance with?";
      }
      
      setChatMessages(prev => [...prev, { sender: 'agent', text: response }]);
    }, 1000);
  };
  
  // Handle key press in input field
  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  return (
    <motion.div
      className={`absolute cursor-pointer ${isSelected ? 'z-30' : 'z-20'}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transition: isMoving ? 'all 1s cubic-bezier(0.4, 0.0, 0.2, 1)' : 'all 0.3s ease'
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: isSelected ? 1.1 : 1, 
        opacity: 1,
        translateY: agent.status === 'working' ? [0, -3, 0] : 0
      }}
      transition={{
        translateY: { 
          repeat: agent.status === 'working' ? Infinity : 0,
          duration: 1.5
        },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 }
      }}
      onClick={() => onAgentClick && onAgentClick(agent.id)}
    >
      {/* Agent avatar with color coding by division */}
      <div className="flex flex-col items-center">
        {/* Avatar with improved cyberpunk styling */}
        <div className="relative mb-1 group">
          <div 
            className={`rounded-full p-1.5 ${
              agent.status === 'working' 
                ? `${colors.avatarBg} border ${colors.border} shadow-md` 
                : 'bg-gray-200 dark:bg-gray-800'
            } ${isSelected ? 'ring-2 ring-white shadow-lg' : ''}`}
            style={{
              boxShadow: isSelected || isMoving ? `0 0 8px ${colors.shadow}` : 'none'
            }}
          >
            <Avatar className="h-6 w-6">
              <AvatarFallback className={`text-[0.6rem] font-semibold ${colors.bg} text-white`}>
                {getInitials(agent.name)}
              </AvatarFallback>
            </Avatar>
          </div>
          
          {/* Status indicator with enhanced cyberpunk glow */}
          <div 
            className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${statusColors[agent.status]} 
            ${agent.status === 'working' ? 'animate-pulse' : ''}`}
            style={{
              boxShadow: agent.status === 'working' ? `0 0 5px ${statusColors[agent.status]}` : 'none'
            }}
          ></div>
          
          {/* Division icon indicator with enhanced styling */}
          <div className={`absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center border border-white/20`}
               style={{
                 boxShadow: `0 0 4px ${colors.shadow}40`
               }}
          >
            <Icon className={`h-2.5 w-2.5 ${colors.text}`} />
          </div>
          
          {/* Message button - visible on hover or when selected */}
          <Button
            variant="ghost"
            size="icon"
            className={`chat-trigger-${agent.id} absolute -right-6 top-0 h-5 w-5 rounded-full bg-gray-800/80 backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isSelected ? 'opacity-100' : ''}`}
            onClick={handleOpenChat}
          >
            <MessageCircle className="h-3 w-3 text-white" />
          </Button>
        </div>
        
        {/* Task progress bar with enhanced cyberpunk style */}
        <div className="w-12 h-1.5 mb-1 rounded-full overflow-hidden bg-black/60 backdrop-blur-sm border border-white/10">
          {agent.status === 'idle' ? (
            <div className="h-full bg-gray-500/30 w-full"></div>
          ) : (
            <div 
              className={`h-full ${getTaskProgressColor()} transition-all duration-500`}
              style={{ 
                width: `${taskProgress}%`, 
                opacity: agent.status === 'working' ? '1' : '0.7',
                boxShadow: agent.status === 'working' ? `0 0 10px ${getTaskProgressColor()}` : 'none'
              }}
            ></div>
          )}
        </div>
        
        {/* Name with enhanced cyberpunk styling */}
        <div 
          className={`
            px-1.5 py-0.5 
            ${isSelected ? `${colors.avatarBg} ${colors.text} border-${colors.border}/50` : 'bg-black/80 text-white border-gray-700/30'}
            backdrop-blur-sm border rounded text-[0.6rem] whitespace-nowrap shadow-lg
          `}
          style={{
            textShadow: isSelected ? `0 0 5px ${colors.shadow}` : 'none',
            boxShadow: isSelected ? `0 0 5px ${colors.shadow}40` : 'none'
          }}
        >
          {agent.name}
        </div>
        
        {/* Only show role when selected with enhanced styling */}
        {isSelected && (
          <div 
            className="px-1.5 py-0.5 mt-0.5 bg-black/60 backdrop-blur-sm border border-gray-700/30 rounded text-[0.6rem] whitespace-nowrap text-white shadow-lg"
            style={{
              textShadow: `0 0 3px ${colors.shadow}80`
            }}
          >
            {agent.role}
          </div>
        )}
      </div>
      
      {/* Chat dialog - displays when chat is open */}
      {chatOpen && (
        <div 
          ref={chatWindowRef}
          className="fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-64 bg-gray-900/90 backdrop-blur-md rounded-lg border border-gray-700 shadow-xl z-[100] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          style={{
            boxShadow: `0 0 15px ${colors.shadow}50, 0 5px 20px rgba(0,0,0,0.5)`
          }}
        >
          {/* Chat header with agent info */}
          <div 
            className={`flex items-center justify-between p-2 border-b ${colors.border}`}
            style={{
              background: `linear-gradient(to right, ${colors.shadow}20, transparent)`
            }}
          >
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className={`text-[0.6rem] font-semibold ${colors.bg} text-white`}>
                  {getInitials(agent.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-xs font-semibold text-white">{agent.name}</div>
                <div className="text-[0.6rem] text-gray-400">{agent.role}</div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 rounded-full hover:bg-gray-800"
              onClick={() => setChatOpen(false)}
            >
              <X className="h-3 w-3 text-gray-400" />
            </Button>
          </div>
          
          {/* Chat messages */}
          <div 
            ref={chatRef}
            className="p-2 h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
          >
            {chatMessages.map((message, index) => (
              <div 
                key={index}
                className={`mb-2 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] px-2 py-1.5 rounded-lg text-[0.65rem] ${
                    message.sender === 'user' 
                      ? `bg-indigo-600/80 text-white` 
                      : `bg-gray-800/90 text-gray-200 border border-${colors.border}/30`
                  }`}
                  style={{
                    boxShadow: message.sender === 'agent' ? `0 0 5px ${colors.shadow}30` : 'none'
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          
          {/* Chat input */}
          <div className="p-2 border-t border-gray-800 flex gap-2">
            <Input
              className="h-7 text-xs bg-gray-800 border-gray-700 focus:border-gray-600 text-white"
              placeholder="Type your message..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={handleInputKeyPress}
            />
            <Button 
              size="sm"
              className={`h-7 px-2 ${colors.bg}`}
              onClick={handleSendMessage}
            >
              <MessageCircle className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AgentCharacter;
