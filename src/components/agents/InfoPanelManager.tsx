
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Settings, 
  MessageCircle, 
  BarChart2, 
  History, 
  PieChart, 
  Zap, 
  AlertTriangle, 
  Clock, 
  CheckCircle,
  ChevronRight,
  Minimize2,
  Maximize2,
  Headphones,
  Brain,
  Award,
  ExternalLink,
  Send,
  User,
  Share2
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { usePerformanceData } from '@/hooks/usePerformanceData';
import { AreaChart } from '@/components/ui/chart';
import { getDivisionColorScheme, getDivisionHexColors } from '@/utils/colorSystem';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

interface InfoPanelManagerProps {
  selectedDivision: string | null;
  selectedDivisionObject: any;
  selectedAgent: number | null;
  selectedAgentObject: any;
  showInfoPanel: boolean;
  agents: any[];
  onClose: () => void;
}

interface ChatMessage {
  sender: 'user' | 'agent';
  content: string;
  timestamp: Date;
}

const InfoPanelManager: React.FC<InfoPanelManagerProps> = ({
  selectedDivision,
  selectedDivisionObject,
  selectedAgent,
  selectedAgentObject,
  showInfoPanel,
  agents,
  onClose
}) => {
  // Default to insights tab
  const [activeTab, setActiveTab] = useState('insights');
  const [minimized, setMinimized] = useState(false);
  const { toast } = useToast();
  const performanceData = usePerformanceData(selectedDivision);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Filter agents by division
  const divisionAgents = selectedDivision 
    ? agents.filter(agent => agent.division === selectedDivision)
    : [];
  
  if (!showInfoPanel) return null;

  // Handle sending a chat message
  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      sender: 'user',
      content: chatInput,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    
    // Simulate agent/division response
    setTimeout(() => {
      const responseContent = selectedDivision 
        ? `Thank you for your message. ${selectedDivisionObject?.name} division will process your request shortly.`
        : `Agent #${selectedAgentObject?.id} acknowledges your message and will respond shortly.`;
      
      const agentMessage: ChatMessage = {
        sender: 'agent',
        content: responseContent,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, agentMessage]);
      
      // Scroll to bottom of chat
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      
    }, 1000);
  };

  const handleAction = (action: string) => {
    let message = '';
    
    if (selectedDivision) {
      message = `${action} action for ${selectedDivisionObject?.name || 'division'}`;
    } else if (selectedAgent) {
      message = `${action} action for ${selectedAgentObject?.name || 'agent'}`;
    }
    
    toast({
      title: 'Action Triggered',
      description: message,
      duration: 3000,
    });
  };

  // Get color scheme based on division or agent
  const getColorScheme = () => {
    if (selectedDivision && selectedDivisionObject) {
      return getDivisionColorScheme(selectedDivision);
    } else if (selectedAgent && selectedAgentObject && selectedAgentObject.division) {
      return getDivisionColorScheme(selectedAgentObject.division);
    }
    return { primary: 'bg-flow-accent', border: 'border-flow-accent', text: 'text-flow-accent', glow: 'rgba(139, 92, 246, 0.4)', pattern: 'bg-gradient-to-br from-flow-accent/10 to-indigo-700/10' };
  };

  const colorScheme = getColorScheme();
  const headerBgClass = colorScheme.primary.replace('bg-', 'bg-');
  const borderClass = colorScheme.border.replace('border-', 'border-');
  const textClass = colorScheme.text;
  
  // Get hex colors for styling
  const hexColors = selectedDivision 
    ? getDivisionHexColors(selectedDivision) 
    : selectedAgent && selectedAgentObject?.division 
      ? getDivisionHexColors(selectedAgentObject.division)
      : { primary: '#8b5cf6', shadow: '#8b5cf640' };
  
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const toggleMinimize = () => {
    setMinimized(!minimized);
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" 
      onClick={handleBackgroundClick}
    >
      <AnimatePresence>
        <motion.div
          className={`absolute right-0 top-0 ${minimized ? 'w-64 h-12' : 'w-full md:w-96 h-full'} bg-black/80 border-l ${borderClass} backdrop-blur-xl z-50 overflow-hidden`}
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30, duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          style={{ 
            boxShadow: `0 0 25px ${hexColors.shadow}`,
          }}
        >
          <div 
            className={`p-3 flex justify-between items-center ${headerBgClass} border-b ${borderClass}`}
            style={{ 
              background: `linear-gradient(to right, ${hexColors.primary}40, ${hexColors.primary}20)`,
              boxShadow: `0 2px 10px ${hexColors.shadow}`
            }}
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: hexColors.primary }}
              />
              <h3 className={`text-lg font-medium ${textClass} drop-shadow-md`}>
                {selectedDivision ? selectedDivisionObject?.name : selectedAgentObject?.name}
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={toggleMinimize} className="h-7 w-7 hover:bg-white/10 text-white/90">
                {minimized ? <Maximize2 className="h-3.5 w-3.5" /> : <Minimize2 className="h-3.5 w-3.5" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose} className="h-7 w-7 hover:bg-white/10 text-white/90">
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
          
          {!minimized && (
            <div className="flex flex-col h-[calc(100%-44px)]">
              {/* Tabs navigation */}
              <div className="border-b border-white/10">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                  defaultValue={activeTab}
                >
                  <TabsList 
                    className="grid grid-cols-3 bg-black/50 border border-white/10 rounded-none p-0 m-0"
                  >
                    <TabsTrigger 
                      value="insights" 
                      className={`rounded-none border-r border-white/10 data-[state=active]:${textClass} data-[state=active]:shadow-[inset_0_-2px_0] data-[state=active]:shadow-current data-[state=active]:bg-black/30 py-2`}
                    >
                      Insights
                    </TabsTrigger>
                    <TabsTrigger 
                      value="chat" 
                      className={`rounded-none border-r border-white/10 data-[state=active]:${textClass} data-[state=active]:shadow-[inset_0_-2px_0] data-[state=active]:shadow-current data-[state=active]:bg-black/30 py-2`}
                    >
                      Chat
                    </TabsTrigger>
                    <TabsTrigger 
                      value="actions" 
                      className={`rounded-none data-[state=active]:${textClass} data-[state=active]:shadow-[inset_0_-2px_0] data-[state=active]:shadow-current data-[state=active]:bg-black/30 py-2`}
                    >
                      Actions
                    </TabsTrigger>
                  </TabsList>
                
                  <TabsContent value="insights" className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
                    {/* PROMINENT INSIGHTS SECTION */}
                    <div 
                      className="bg-black/40 backdrop-blur-sm border rounded-lg p-3 mb-4 animate-fade-in"
                      style={{ 
                        borderColor: hexColors.primary,
                        boxShadow: `0 0 15px ${hexColors.shadow}`,
                        background: `linear-gradient(to bottom right, ${hexColors.primary}30, rgba(0,0,0,0.6))`
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Brain 
                          className="h-5 w-5"
                          style={{ color: hexColors.primary }}
                        />
                        <h3 className="font-medium text-white">
                          {selectedDivision ? "Division Insights" : "Agent Insights"}
                        </h3>
                      </div>
                      
                      <div className="text-sm text-white/90 bg-black/30 p-3 rounded-md border border-white/10 mb-3">
                        {selectedDivision ? (
                          <>
                            <p className="mb-2">Division efficiency at <span className="font-bold text-green-400">{performanceData.efficiency}%</span>, with resource utilization at <span className="font-bold text-amber-400">{performanceData.resourceUtilization}%</span>.</p>
                            <p>Task completion rate increased by <span className="font-bold text-green-400">+{Math.floor(Math.random() * 5) + 2}%</span> since last week.</p>
                          </>
                        ) : (
                          <>
                            <p className="mb-2">Agent performance at <span className="font-bold text-green-400">{selectedAgentObject?.efficiency || 85}%</span> efficiency.</p>
                            <p>Currently handling <span className="font-bold text-amber-400">{Math.floor(Math.random() * 5) + 1}</span> active tasks with priority focus on data processing.</p>
                          </>
                        )}
                      </div>
                      
                      <Button 
                        className="w-full text-white font-medium border border-white/20"
                        style={{ 
                          background: `linear-gradient(to right, ${hexColors.primary}90, ${hexColors.primary}70)`,
                        }}
                        onClick={() => handleAction(selectedDivision ? 'GetDivisionInsights' : 'GetAgentInsights')}
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        Get {selectedDivision ? "Division" : "Agent"} Insights
                      </Button>
                    </div>
                    
                    {selectedDivision && (
                      <>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-black/30 border border-white/20 rounded-md p-2">
                            <div className="text-xs text-flow-foreground/60">Efficiency</div>
                            <div className="text-lg font-medium mt-1 font-mono">
                              {performanceData.efficiency}%
                            </div>
                          </div>
                          <div className="bg-black/30 border border-white/20 rounded-md p-2">
                            <div className="text-xs text-flow-foreground/60">Workload</div>
                            <div className="text-lg font-medium mt-1 font-mono">
                              {performanceData.resourceUtilization}%
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-black/30 border border-white/20 rounded-md p-3">
                          <div className="text-sm font-medium mb-2 flex items-center">
                            <BarChart2 className="h-4 w-4 mr-1 text-white/70" />
                            <span>Performance Trend</span>
                          </div>
                          <div className="h-28">
                            <AreaChart
                              data={performanceData.historicalData.taskCompletion}
                              showGrid={false}
                              showXAxis={true}
                              showYAxis={false}
                              lineColor={hexColors.primary}
                            />
                          </div>
                          <div className="text-xs text-center mt-1 text-flow-foreground/60">
                            Weekly Task Completion
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm font-medium flex items-center">
                            <Award className="h-4 w-4 mr-1 text-white/70" />
                            <span>Top Performing Agents</span>
                          </div>
                          <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                            {divisionAgents.sort((a, b) => b.efficiency - a.efficiency).slice(0, 3).map((agent, index) => (
                              <div 
                                key={agent.id}
                                className="flex items-center p-2 hover:bg-white/10 rounded-md cursor-pointer transition-colors"
                                style={{
                                  boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
                                  background: `linear-gradient(to right, rgba(0,0,0,0.2), ${hexColors.primary}10)`
                                }}
                              >
                                <div 
                                  className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-xs font-medium`}
                                  style={{ 
                                    backgroundColor: index === 0 ? '#ffc107' : index === 1 ? '#9e9e9e' : '#cd7f32',
                                    color: '#000'
                                  }}
                                >
                                  {index+1}
                                </div>
                                <div className="text-sm">{agent.name}</div>
                                <div className="text-xs ml-auto font-mono flex items-center">
                                  {agent.efficiency}%
                                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 ml-1.5"></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                    
                    {selectedAgent && (
                      <>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-black/30 border border-white/20 rounded-md p-2">
                            <div className="text-xs text-flow-foreground/60">Efficiency</div>
                            <div className="text-lg font-medium mt-1 font-mono">
                              {selectedAgentObject.efficiency || 0}%
                            </div>
                          </div>
                          <div className="bg-black/30 border border-white/20 rounded-md p-2">
                            <div className="text-xs text-flow-foreground/60">Last Active</div>
                            <div className="text-sm font-medium mt-1">
                              {selectedAgentObject.lastActive || 'Just now'}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <div className="flex-1 bg-black/30 border border-white/10 rounded-md p-2 text-center">
                            <div className="text-2xl font-bold" style={{ color: hexColors.primary }}>
                              {Math.round(Math.random() * 200) + 50}
                            </div>
                            <div className="text-xs text-flow-foreground/60">Completed Tasks</div>
                          </div>
                          <div className="flex-1 bg-black/30 border border-white/10 rounded-md p-2 text-center">
                            <div className="text-2xl font-bold text-amber-400">
                              {Math.round(Math.random() * 10) + 2}
                            </div>
                            <div className="text-xs text-flow-foreground/60">Current Tasks</div>
                          </div>
                        </div>
                        
                        <div className="bg-black/30 border border-white/10 rounded-md p-2">
                          <div className="mb-1 text-sm flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-white/70" />
                            Current Status
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded bg-black/20">
                            {selectedAgentObject.status === 'working' && (
                              <>
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="text-xs">Processing tasks normally</span>
                              </>
                            )}
                            {selectedAgentObject.status === 'paused' && (
                              <>
                                <Clock className="h-4 w-4 text-amber-500" />
                                <span className="text-xs">Operations temporarily suspended</span>
                              </>
                            )}
                            {selectedAgentObject.status === 'error' && (
                              <>
                                <AlertTriangle className="h-4 w-4 text-red-500" />
                                <span className="text-xs">Attention required: System error</span>
                              </>
                            )}
                            {selectedAgentObject.status === 'idle' && (
                              <>
                                <Clock className="h-4 w-4 text-blue-500" />
                                <span className="text-xs">Standing by for tasks</span>
                              </>
                            )}
                          </div>
                        </div>
                        
                        <div className="bg-black/30 border border-white/10 rounded-md p-3">
                          <div className="text-sm font-medium mb-2 flex items-center">
                            <BarChart2 className="h-4 w-4 mr-1 text-white/70" />
                            <span>Performance History</span>
                          </div>
                          <div className="h-28">
                            <AreaChart
                              data={[
                                { name: 'Day 1', value: Math.round(Math.random() * 30) + 60 },
                                { name: 'Day 2', value: Math.round(Math.random() * 30) + 60 },
                                { name: 'Day 3', value: Math.round(Math.random() * 30) + 60 },
                                { name: 'Day 4', value: Math.round(Math.random() * 30) + 60 },
                                { name: 'Day 5', value: Math.round(Math.random() * 30) + 60 },
                                { name: 'Day 6', value: Math.round(Math.random() * 30) + 60 },
                                { name: 'Day 7', value: Math.round(Math.random() * 30) + 60 }
                              ]}
                              showGrid={false}
                              showXAxis={true}
                              showYAxis={true}
                              lineColor={hexColors.primary}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="chat" className="flex flex-col h-full">
                    <div className="flex-1 overflow-y-auto pr-1 mb-4">
                      {/* Chat Messages */}
                      {chatMessages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-48 text-center p-4">
                          <MessageCircle className="h-10 w-10 text-white/20 mb-2" />
                          <p className="text-white/50 text-sm">No messages yet.</p>
                          <p className="text-white/30 text-xs mt-1">
                            Start a conversation with {selectedDivision ? "this division" : "this agent"}.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {chatMessages.map((message, index) => (
                            <div 
                              key={index} 
                              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div 
                                className={`max-w-[80%] rounded-lg p-2.5 ${
                                  message.sender === 'user' 
                                    ? 'bg-blue-600/30 border border-blue-500/30' 
                                    : `border ${borderClass}/50`
                                }`}
                                style={
                                  message.sender === 'agent' 
                                    ? { backgroundColor: `${hexColors.primary}20` } 
                                    : {}
                                }
                              >
                                <div className="flex items-center mb-1">
                                  {message.sender === 'user' ? (
                                    <>
                                      <span className="text-xs font-medium text-blue-300">You</span>
                                      <span className="text-[10px] text-white/30 ml-2">
                                        {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <div 
                                        className="w-2 h-2 rounded-full mr-1"
                                        style={{ backgroundColor: hexColors.primary }}
                                      />
                                      <span className="text-xs font-medium" style={{ color: hexColors.primary }}>
                                        {selectedDivision ? selectedDivisionObject?.name : `Agent #${selectedAgentObject?.id}`}
                                      </span>
                                      <span className="text-[10px] text-white/30 ml-2">
                                        {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                      </span>
                                    </>
                                  )}
                                </div>
                                <p className="text-sm text-white/90">{message.content}</p>
                              </div>
                            </div>
                          ))}
                          <div ref={chatEndRef} />
                        </div>
                      )}
                    </div>
                    
                    {/* Chat Input */}
                    <div className="bg-black/40 rounded-lg border border-white/10 p-2 flex items-center">
                      <Input
                        placeholder={`Message ${selectedDivision ? selectedDivisionObject?.name : `Agent #${selectedAgentObject?.id}`}...`}
                        className="flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-white"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button 
                        size="icon" 
                        className="ml-2 h-8 w-8"
                        style={{ 
                          background: chatInput.trim() ? `${hexColors.primary}90` : 'rgba(255,255,255,0.1)',
                          color: chatInput.trim() ? 'white' : 'rgba(255,255,255,0.5)'
                        }}
                        disabled={!chatInput.trim()}
                        onClick={handleSendMessage}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="actions" className="space-y-3 p-4">
                    {selectedDivision && (
                      <>
                        <Button 
                          className="w-full flex justify-between items-center text-white border-white/10"
                          style={{ 
                            backgroundImage: `linear-gradient(to right, ${hexColors.primary}50, ${hexColors.primary}30)`,
                            boxShadow: `0 3px 10px ${hexColors.shadow}`
                          }}
                          onClick={() => handleAction('Optimize')}
                        >
                          <div className="flex items-center">
                            <Zap className="h-4 w-4 mr-2" />
                            <span>Optimize Division</span>
                          </div>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                        
                        <Button 
                          className="w-full flex justify-between items-center bg-white/10 hover:bg-white/15 text-white border-white/10"
                          onClick={() => handleAction('Analyze')}
                        >
                          <div className="flex items-center">
                            <BarChart2 className="h-4 w-4 mr-2" />
                            <span>Analyze Performance</span>
                          </div>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                        
                        <Button 
                          className="w-full flex justify-between items-center bg-white/10 hover:bg-white/15 text-white border-white/10"
                          onClick={() => handleAction('Configure')}
                        >
                          <div className="flex items-center">
                            <Settings className="h-4 w-4 mr-2" />
                            <span>Configure Settings</span>
                          </div>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                        
                        <Button 
                          className="w-full flex justify-between items-center bg-white/10 hover:bg-white/15 text-white border-white/10"
                          onClick={() => handleAction('AddAgent')}
                        >
                          <div className="flex items-center">
                            <PieChart className="h-4 w-4 mr-2" />
                            <span>Add New Agent</span>
                          </div>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    
                    {selectedAgent && (
                      <>
                        {selectedAgentObject?.status === 'working' && (
                          <Button 
                            className="w-full flex justify-between items-center bg-amber-500/20 hover:bg-amber-500/30 border-amber-500/30" 
                            onClick={() => handleAction('Pause')}
                          >
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2" />
                              <span>Pause Agent</span>
                            </div>
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        )}
                        
                        {selectedAgentObject?.status === 'paused' && (
                          <Button 
                            className="w-full flex justify-between items-center bg-green-500/20 hover:bg-green-500/30 border-green-500/30" 
                            onClick={() => handleAction('Resume')}
                          >
                            <div className="flex items-center">
                              <Zap className="h-4 w-4 mr-2" />
                              <span>Resume Agent</span>
                            </div>
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        )}
                        
                        {selectedAgentObject?.status === 'error' && (
                          <Button 
                            className="w-full flex justify-between items-center bg-red-500/20 hover:bg-red-500/30 border-red-500/30" 
                            onClick={() => handleAction('Restart')}
                          >
                            <div className="flex items-center">
                              <AlertTriangle className="h-4 w-4 mr-2" />
                              <span>Restart Agent</span>
                            </div>
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        )}
                        
                        <Button 
                          className="w-full flex justify-between items-center bg-white/10 hover:bg-white/15 text-white border-white/10"
                          onClick={() => handleAction('Tune')}
                        >
                          <div className="flex items-center">
                            <Settings className="h-4 w-4 mr-2" />
                            <span>Tune Agent</span>
                          </div>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                        
                        <Button 
                          className="w-full flex justify-between items-center bg-white/10 hover:bg-white/15 text-white border-white/10"
                          onClick={() => handleAction('History')}
                        >
                          <div className="flex items-center">
                            <History className="h-4 w-4 mr-2" />
                            <span>View History</span>
                          </div>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
          
          <style>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 4px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-track {
              background: rgba(0, 0, 0, 0.2);
            }
            
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(139, 92, 246, 0.5);
              border-radius: 10px;
            }
            
            @keyframes fade-in {
              from { opacity: 0; transform: translateY(8px); }
              to { opacity: 1; transform: translateY(0); }
            }
            
            .animate-fade-in {
              animation: fade-in 0.3s ease-out forwards;
            }
          `}</style>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default InfoPanelManager;
