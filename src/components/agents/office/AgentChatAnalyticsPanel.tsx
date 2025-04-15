
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send, BarChart2, Zap, MessageSquare, Clock, Activity, User } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import MiniSparkline from './MiniSparkline';
import { AgentData } from './types/officeTypes';
import { cn } from '@/lib/utils';

interface AgentChatAnalyticsPanelProps {
  agent: AgentData;
  onClose: () => void;
}

const AgentChatAnalyticsPanel: React.FC<AgentChatAnalyticsPanelProps> = ({ 
  agent, 
  onClose 
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState('analytics');
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{sender: 'user' | 'agent', text: string}>>([
    { sender: 'agent', text: `Hello, I'm ${agent.name}. How can I assist you today?` }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message
    setChatMessages(prev => [...prev, { sender: 'user', text: message }]);
    
    // Clear input
    setMessage('');
    
    // Simulate agent response after a short delay
    setTimeout(() => {
      const responses = [
        `I'm currently ${agent.workload && agent.workload > 75 ? 'quite busy' : 'available'} and working on ${agent.currentTask?.description || 'various tasks'}.`,
        `I've been focusing on optimizing our ${agent.division} operations lately.`,
        `My current efficiency is ${agent.efficiency}%. I'm ${agent.mood === 'optimal' ? 'performing optimally' : agent.mood === 'overwhelmed' ? 'feeling a bit overwhelmed' : 'working steadily'}.`,
        `Is there anything specific about the ${agent.division} division you'd like to know?`
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatMessages(prev => [...prev, { sender: 'agent', text: randomResponse }]);
    }, 1000);
  };
  
  const generateMockPerformanceData = () => {
    return [
      { label: "Efficiency", value: agent.efficiency || 75, color: "bg-blue-500" },
      { label: "Task Completion", value: Math.floor(Math.random() * 30) + 70, color: "bg-green-500" },
      { label: "Response Time", value: Math.floor(Math.random() * 20) + 80, color: "bg-purple-500" },
      { label: "Accuracy", value: Math.floor(Math.random() * 15) + 85, color: "bg-amber-500" }
    ];
  };
  
  const mockPerformanceData = generateMockPerformanceData();
  
  const mockActivities = [
    { time: "10 min ago", action: `${agent.currentTask?.description || 'Completed task analysis'}` },
    { time: "25 min ago", action: "Collaborated with Research division" },
    { time: "1 hour ago", action: "Processed data batch #4872" },
    { time: "3 hours ago", action: "System resource optimization" }
  ];

  return (
    <motion.div 
      className={cn(
        "fixed right-0 top-20 h-[calc(100vh-80px)] w-full max-w-md z-50 overflow-hidden",
        isDark 
          ? "bg-gray-900/95 border-l border-purple-500/30" 
          : "bg-white/95 border-l border-emerald-300/50"
      )}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className={cn(
          "flex items-center justify-between px-4 py-3 border-b",
          isDark ? "border-gray-800" : "border-gray-200"
        )}>
          <div className="flex items-center space-x-3">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              isDark ? "bg-purple-500/20" : "bg-emerald-100"
            )}>
              <agent.icon className={cn(
                "h-5 w-5",
                isDark ? "text-purple-400" : "text-emerald-600"
              )} />
            </div>
            <div>
              <h3 className={cn(
                "font-medium",
                isDark ? "text-white" : "text-gray-800"
              )}>
                {agent.name}
              </h3>
              <p className={cn(
                "text-xs",
                isDark ? "text-gray-400" : "text-gray-500"
              )}>
                {agent.role} • {agent.division?.toUpperCase()}
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className={isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className={cn(
            "grid grid-cols-2 mx-4 mt-2",
            isDark ? "bg-gray-800" : "bg-gray-100"
          )}>
            <TabsTrigger 
              value="analytics" 
              className={cn(
                "flex items-center gap-2",
                isDark
                  ? "data-[state=active]:bg-purple-500 data-[state=active]:text-white"
                  : "data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              )}
            >
              <BarChart2 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger 
              value="chat" 
              className={cn(
                "flex items-center gap-2",
                isDark
                  ? "data-[state=active]:bg-purple-500 data-[state=active]:text-white"
                  : "data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              )}
            >
              <MessageSquare className="h-4 w-4" />
              <span>Chat</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Analytics Tab Content */}
          <TabsContent value="analytics" className="flex-1 overflow-y-auto p-4 space-y-6">
            <div className={cn(
              "p-4 rounded-lg",
              isDark ? "bg-gray-800/50" : "bg-gray-100"
            )}>
              <h4 className={cn(
                "text-sm font-medium mb-3",
                isDark ? "text-gray-300" : "text-gray-700"
              )}>
                Status Overview
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={cn(
                    "text-xs",
                    isDark ? "text-gray-400" : "text-gray-500"
                  )}>
                    Status
                  </span>
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full",
                    agent.status === 'working' 
                      ? 'bg-green-500/20 text-green-500'
                      : agent.status === 'idle'
                      ? 'bg-gray-500/20 text-gray-500'
                      : agent.status === 'paused'
                      ? 'bg-amber-500/20 text-amber-500'
                      : 'bg-red-500/20 text-red-500'
                  )}>
                    {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={cn(
                    "text-xs",
                    isDark ? "text-gray-400" : "text-gray-500"
                  )}>
                    Current Mood
                  </span>
                  <span className={cn(
                    "text-xs font-medium capitalize",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}>
                    {agent.mood}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={cn(
                    "text-xs",
                    isDark ? "text-gray-400" : "text-gray-500"
                  )}>
                    Workload
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full",
                          agent.workload && agent.workload > 80 ? "bg-red-500" :
                          agent.workload && agent.workload > 60 ? "bg-amber-500" :
                          "bg-green-500"
                        )}
                        style={{width: `${agent.workload}%`}}
                      />
                    </div>
                    <span className={cn(
                      "text-xs font-medium",
                      isDark ? "text-gray-300" : "text-gray-700"
                    )}>
                      {agent.workload}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={cn(
              "p-4 rounded-lg",
              isDark ? "bg-gray-800/50" : "bg-gray-100"
            )}>
              <div className="flex items-center justify-between mb-3">
                <h4 className={cn(
                  "text-sm font-medium",
                  isDark ? "text-gray-300" : "text-gray-700"
                )}>
                  Performance Metrics
                </h4>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={cn(
                    "h-7 text-xs",
                    isDark ? "text-purple-400" : "text-emerald-600"
                  )}
                >
                  <Activity className="h-3 w-3 mr-1" />
                  Details
                </Button>
              </div>
              
              <div className="space-y-4">
                {mockPerformanceData.map((metric, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className={cn(
                        "text-xs",
                        isDark ? "text-gray-400" : "text-gray-500"
                      )}>
                        {metric.label}
                      </span>
                      <span className={cn(
                        "text-xs font-medium",
                        isDark ? "text-gray-300" : "text-gray-700"
                      )}>
                        {metric.value}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={cn(metric.color, "h-full")}
                        style={{width: `${metric.value}%`}}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={cn(
              "p-4 rounded-lg",
              isDark ? "bg-gray-800/50" : "bg-gray-100"
            )}>
              <h4 className={cn(
                "text-sm font-medium mb-3",
                isDark ? "text-gray-300" : "text-gray-700"
              )}>
                Performance History
              </h4>
              <div className="h-40">
                {agent.performanceData && (
                  <MiniSparkline 
                    data={agent.performanceData} 
                    width={330} 
                    height={150} 
                    color={isDark ? "#a78bfa" : "#10b981"}
                    fillOpacity={0.2}
                    animated={true}
                    showDots={true}
                    showGrid={true}
                  />
                )}
              </div>
            </div>
            
            <div className={cn(
              "p-4 rounded-lg",
              isDark ? "bg-gray-800/50" : "bg-gray-100"
            )}>
              <h4 className={cn(
                "text-sm font-medium mb-3",
                isDark ? "text-gray-300" : "text-gray-700"
              )}>
                Recent Activities
              </h4>
              <div className="space-y-3">
                {mockActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={cn(
                      "mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                      isDark ? "bg-gray-700" : "bg-gray-200"
                    )}>
                      <Clock className={cn(
                        "h-3 w-3",
                        isDark ? "text-gray-400" : "text-gray-500"
                      )} />
                    </div>
                    <div>
                      <p className={cn(
                        "text-xs",
                        isDark ? "text-gray-300" : "text-gray-700"
                      )}>
                        {activity.action}
                      </p>
                      <p className={cn(
                        "text-xs mt-0.5",
                        isDark ? "text-gray-500" : "text-gray-500"
                      )}>
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Chat Tab Content */}
          <TabsContent value="chat" className="flex-1 flex flex-col h-full overflow-hidden">
            <div className={cn(
              "flex-1 overflow-y-auto p-4 space-y-3",
              isDark ? "bg-gray-900" : "bg-gray-50"
            )}>
              {chatMessages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={cn(
                    "max-w-[80%] rounded-lg px-4 py-2",
                    msg.sender === 'user' 
                      ? isDark 
                        ? "bg-purple-500 text-white" 
                        : "bg-emerald-600 text-white"
                      : isDark
                        ? "bg-gray-800 text-gray-200"
                        : "bg-white text-gray-800 border border-gray-200"
                  )}>
                    <div className="flex items-center gap-2 mb-1">
                      {msg.sender === 'agent' && (
                        <>
                          <div className="w-5 h-5 rounded-full flex items-center justify-center bg-gray-700">
                            <agent.icon className="h-3 w-3 text-gray-300" />
                          </div>
                          <span className={cn(
                            "text-xs font-medium",
                            isDark ? "text-gray-400" : "text-gray-600"
                          )}>
                            {agent.name}
                          </span>
                        </>
                      )}
                      {msg.sender === 'user' && (
                        <>
                          <span className={cn(
                            "text-xs font-medium",
                            isDark ? "text-gray-100" : "text-gray-100"
                          )}>
                            You
                          </span>
                          <div className="w-5 h-5 rounded-full flex items-center justify-center bg-gray-100">
                            <User className="h-3 w-3 text-gray-700" />
                          </div>
                        </>
                      )}
                    </div>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <form 
              onSubmit={handleSendMessage}
              className={cn(
                "p-3 border-t flex gap-2",
                isDark ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"
              )}
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Message ${agent.name}...`}
                className={cn(
                  "flex-1 rounded-lg px-4 py-2 text-sm",
                  isDark 
                    ? "bg-gray-800 text-gray-200 border-gray-700 focus:ring-purple-500 focus:border-purple-500" 
                    : "bg-gray-100 text-gray-800 border-gray-200 focus:ring-emerald-500 focus:border-emerald-500"
                )}
              />
              <Button 
                type="submit" 
                className={cn(
                  isDark 
                    ? "bg-purple-500 hover:bg-purple-600" 
                    : "bg-emerald-600 hover:bg-emerald-700"
                )}
                disabled={!message.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default AgentChatAnalyticsPanel;
