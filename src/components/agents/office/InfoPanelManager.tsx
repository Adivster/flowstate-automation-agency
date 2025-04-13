
import React, { useState } from 'react';
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
  Brain
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
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

const InfoPanelManager: React.FC<InfoPanelManagerProps> = ({
  selectedDivision,
  selectedDivisionObject,
  selectedAgent,
  selectedAgentObject,
  showInfoPanel,
  agents,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [minimized, setMinimized] = useState(false);
  const { toast } = useToast();
  const performanceData = usePerformanceData(selectedDivision);
  
  // Filter agents by division
  const divisionAgents = selectedDivision 
    ? agents.filter(agent => agent.division === selectedDivision)
    : [];
  
  if (!showInfoPanel) return null;

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
          className={`absolute right-0 top-0 ${minimized ? 'w-64 h-12' : 'w-full md:w-96 h-full'} bg-black/80 border-l ${borderClass} backdrop-blur-xl z-50 overflow-hidden transition-all duration-300`}
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
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
            <h3 className={`text-lg font-medium ${textClass} drop-shadow-md`}>
              {selectedDivision ? selectedDivisionObject?.name : selectedAgentObject?.name}
            </h3>
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
            <div className="p-4 h-[calc(100%-44px)] overflow-y-auto custom-scrollbar">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className={`grid grid-cols-3 mb-4 bg-black/50 border ${borderClass}/50`}>
                  <TabsTrigger 
                    value="overview" 
                    className={`data-[state=active]:${textClass} data-[state=active]:shadow-[inset_0_-1px_0] data-[state=active]:shadow-current data-[state=active]:bg-black/30`}
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="stats" 
                    className={`data-[state=active]:${textClass} data-[state=active]:shadow-[inset_0_-1px_0] data-[state=active]:shadow-current data-[state=active]:bg-black/30`}
                  >
                    Stats
                  </TabsTrigger>
                  <TabsTrigger 
                    value="actions" 
                    className={`data-[state=active]:${textClass} data-[state=active]:shadow-[inset_0_-1px_0] data-[state=active]:shadow-current data-[state=active]:bg-black/30`}
                  >
                    Actions
                  </TabsTrigger>
                </TabsList>
                
                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-4">
                  {selectedDivision && selectedDivisionObject && (
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full animate-pulse mr-2"
                          style={{ backgroundColor: hexColors.primary }}
                        ></div>
                        <span className="text-sm text-flow-foreground/70">
                          {divisionAgents.length} Agents Active
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-black/30 border border-flow-border/30 rounded-md p-2">
                          <div className="text-xs text-flow-foreground/60">Efficiency</div>
                          <div className="text-lg font-medium mt-1 font-mono">
                            {performanceData.efficiency}%
                          </div>
                        </div>
                        <div className="bg-black/30 border border-flow-border/30 rounded-md p-2">
                          <div className="text-xs text-flow-foreground/60">Workload</div>
                          <div className="text-lg font-medium mt-1 font-mono">
                            {performanceData.resourceUtilization}%
                          </div>
                        </div>
                      </div>
                      
                      {/* Contact Division Manager - Prominent Section */}
                      <div 
                        className="bg-black/40 border rounded-lg p-3"
                        style={{ 
                          borderColor: hexColors.primary,
                          boxShadow: `0 0 15px ${hexColors.shadow}` 
                        }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Headphones className={`h-5 w-5 ${textClass}`} />
                          <h3 className="font-medium text-white">Division Manager</h3>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            className="flex-1 bg-white/10 hover:bg-white/20 text-white border-white/20"
                            onClick={() => handleAction('Message')}
                            size="sm"
                          >
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                          <Button 
                            className="flex-1 bg-white/10 hover:bg-white/20 text-white border-white/20"
                            onClick={() => handleAction('Call')}
                            size="sm"
                          >
                            <Headphones className="h-4 w-4 mr-1" />
                            Call
                          </Button>
                        </div>
                      </div>
                      
                      <div className="bg-black/30 border border-flow-border/20 rounded-md p-3">
                        <div className="text-sm font-medium mb-2">Performance Trend</div>
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
                      
                      {/* Division Insights - Prominent Section */}
                      <div 
                        className="bg-black/40 border rounded-lg p-3"
                        style={{ 
                          borderColor: hexColors.primary,
                          boxShadow: `0 0 15px ${hexColors.shadow}` 
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className={`h-5 w-5 ${textClass}`} />
                          <h3 className="font-medium text-white">Division Insights</h3>
                        </div>
                        
                        <Button 
                          className={`w-full ${headerBgClass} hover:opacity-90 border border-white/10 text-white`}
                          style={{ 
                            background: `linear-gradient(to right, ${hexColors.primary}60, ${hexColors.primary}40)`,
                          }}
                          onClick={() => handleAction('GetInsights')}
                        >
                          <Zap className="h-4 w-4 mr-1" />
                          Get Division Insights
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Division Agents</div>
                        <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                          {divisionAgents.map(agent => (
                            <div 
                              key={agent.id}
                              className="flex items-center p-2 hover:bg-white/10 rounded-md cursor-pointer"
                              style={{
                                boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)'
                              }}
                            >
                              <div className={`w-2 h-2 rounded-full mr-2 ${
                                agent.status === 'working' ? 'bg-green-500' : 
                                agent.status === 'paused' ? 'bg-amber-500' : 
                                agent.status === 'error' ? 'bg-red-500' : 
                                'bg-gray-500'
                              }`}></div>
                              <div className="text-sm">{agent.name}</div>
                              <div className="text-xs text-flow-foreground/60 ml-auto">{agent.status}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {selectedAgent && selectedAgentObject && (
                    <div className="space-y-4">
                      <div className="flex items-center text-sm text-flow-foreground/70">
                        <div 
                          className={`w-2 h-2 rounded-full mr-2 ${
                            selectedAgentObject.status === 'working' ? 'bg-green-500' : 
                            selectedAgentObject.status === 'paused' ? 'bg-amber-500' : 
                            selectedAgentObject.status === 'error' ? 'bg-red-500' : 
                            'bg-gray-500'
                          }`}
                        ></div>
                        <span>Status: {selectedAgentObject.status}</span>
                      </div>
                      
                      <div>
                        <div className="text-xs text-flow-foreground/60">Role</div>
                        <div className="text-sm">{selectedAgentObject.role || 'Unknown Role'}</div>
                      </div>
                      
                      {/* Contact Agent - Prominent Section */}
                      <div 
                        className="bg-black/40 border rounded-lg p-3"
                        style={{ 
                          borderColor: hexColors.primary,
                          boxShadow: `0 0 15px ${hexColors.shadow}` 
                        }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Headphones className={`h-5 w-5 ${textClass}`} />
                          <h3 className="font-medium text-white">Contact Agent</h3>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            className="flex-1 bg-white/10 hover:bg-white/20 text-white border-white/20"
                            onClick={() => handleAction('Message')}
                            size="sm"
                          >
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                          <Button 
                            className="flex-1 bg-white/10 hover:bg-white/20 text-white border-white/20"
                            onClick={() => handleAction('Call')}
                            size="sm"
                          >
                            <Headphones className="h-4 w-4 mr-1" />
                            Call
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-black/30 border border-flow-border/30 rounded-md p-2">
                          <div className="text-xs text-flow-foreground/60">Efficiency</div>
                          <div className="text-lg font-medium mt-1 font-mono">
                            {selectedAgentObject.efficiency || 0}%
                          </div>
                        </div>
                        <div className="bg-black/30 border border-flow-border/30 rounded-md p-2">
                          <div className="text-xs text-flow-foreground/60">Last Active</div>
                          <div className="text-sm font-medium mt-1">
                            {selectedAgentObject.lastActive || 'Unknown'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <div className="flex-1 bg-black/30 border border-flow-border/20 rounded-md p-2 text-center">
                          <div className="text-2xl font-bold text-green-400">
                            {Math.round(Math.random() * 200) + 50}
                          </div>
                          <div className="text-xs text-flow-foreground/60">Completed Tasks</div>
                        </div>
                        <div className="flex-1 bg-black/30 border border-flow-border/20 rounded-md p-2 text-center">
                          <div className="text-2xl font-bold text-amber-400">
                            {Math.round(Math.random() * 10) + 2}
                          </div>
                          <div className="text-xs text-flow-foreground/60">Current Tasks</div>
                        </div>
                        <div className="flex-1 bg-black/30 border border-flow-border/20 rounded-md p-2 text-center">
                          <div className="text-2xl font-bold text-blue-400">
                            {Math.round(Math.random() * 5)}
                          </div>
                          <div className="text-xs text-flow-foreground/60">Alerts</div>
                        </div>
                      </div>
                      
                      {/* Agent Insights - Prominent Section */}
                      <div 
                        className="bg-black/40 border rounded-lg p-3"
                        style={{ 
                          borderColor: hexColors.primary,
                          boxShadow: `0 0 15px ${hexColors.shadow}` 
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className={`h-5 w-5 ${textClass}`} />
                          <h3 className="font-medium text-white">Agent Insights</h3>
                        </div>
                        
                        <Button 
                          className={`w-full ${headerBgClass} hover:opacity-90 border border-white/10 text-white`}
                          style={{ 
                            background: `linear-gradient(to right, ${hexColors.primary}60, ${hexColors.primary}40)`,
                          }}
                          onClick={() => handleAction('GetAgentInsights')}
                        >
                          <Zap className="h-4 w-4 mr-1" />
                          Get Agent Insights
                        </Button>
                      </div>
                      
                      <div className="bg-black/30 border border-flow-border/20 rounded-md p-2">
                        <div className="mb-1 text-sm">Current Status</div>
                        <div className="flex items-center gap-2">
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
                    </div>
                  )}
                </TabsContent>
                
                {/* Stats Tab */}
                <TabsContent value="stats" className="space-y-4">
                  {selectedDivision && (
                    <>
                      <div className="bg-black/30 border border-flow-border/20 rounded-md p-3">
                        <div className="text-sm font-medium mb-2">Resource Utilization</div>
                        <div className="h-28">
                          <AreaChart
                            data={performanceData.historicalData.resource}
                            showGrid={false}
                            showXAxis={true}
                            showYAxis={true}
                            lineColor="#22c55e"
                          />
                        </div>
                      </div>
                      
                      <div className="bg-black/30 border border-flow-border/20 rounded-md p-3">
                        <div className="text-sm font-medium mb-2">Response Times</div>
                        <div className="h-28">
                          <AreaChart
                            data={performanceData.historicalData.responseTime}
                            showGrid={false}
                            showXAxis={true}
                            showYAxis={true}
                            lineColor="#3b82f6"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-black/30 border border-flow-border/30 rounded-md p-3 text-center">
                          <div className="text-xs text-flow-foreground/60 mb-1">Avg. Response</div>
                          <div className="text-lg font-medium">{performanceData.averageResponseTime}</div>
                        </div>
                        <div className="bg-black/30 border border-flow-border/30 rounded-md p-3 text-center">
                          <div className="text-xs text-flow-foreground/60 mb-1">Uptime</div>
                          <div className="text-lg font-medium">{performanceData.uptime}%</div>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {selectedAgent && (
                    <>
                      <div className="bg-black/30 border border-flow-border/20 rounded-md p-3">
                        <div className="text-sm font-medium mb-2">Performance History</div>
                        <div className="h-32">
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
                            lineColor="#8b5cf6"
                          />
                        </div>
                        <div className="text-xs text-center mt-1 text-flow-foreground/60">
                          Weekly Performance
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="text-sm font-medium">Performance Metrics</div>
                        
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span>Task Completion Rate</span>
                              <span className="text-green-400">92%</span>
                            </div>
                            <div className="h-1.5 bg-black/40 rounded-full overflow-hidden">
                              <div className="bg-green-500 h-full rounded-full" style={{ width: '92%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span>Response Accuracy</span>
                              <span className="text-blue-400">87%</span>
                            </div>
                            <div className="h-1.5 bg-black/40 rounded-full overflow-hidden">
                              <div className="bg-blue-500 h-full rounded-full" style={{ width: '87%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span>Resource Efficiency</span>
                              <span className="text-purple-400">78%</span>
                            </div>
                            <div className="h-1.5 bg-black/40 rounded-full overflow-hidden">
                              <div className="bg-purple-500 h-full rounded-full" style={{ width: '78%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span>Learning Rate</span>
                              <span className="text-amber-400">95%</span>
                            </div>
                            <div className="h-1.5 bg-black/40 rounded-full overflow-hidden">
                              <div className="bg-amber-500 h-full rounded-full" style={{ width: '95%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </TabsContent>
                
                {/* Actions Tab */}
                <TabsContent value="actions" className="space-y-4">
                  {selectedDivision && (
                    <div className="space-y-3">
                      <Button 
                        className="w-full flex justify-between items-center bg-gradient-to-r hover:opacity-90 text-white border-white/10"
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
                    </div>
                  )}
                  
                  {selectedAgent && (
                    <div className="space-y-3">
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
                        className="w-full flex justify-between items-center bg-gradient-to-r hover:opacity-90 text-white border-white/10"
                        style={{ 
                          backgroundImage: `linear-gradient(to right, ${hexColors.primary}50, ${hexColors.primary}30)`,
                          boxShadow: `0 3px 10px ${hexColors.shadow}`
                        }}
                        onClick={() => handleAction('Message')}
                      >
                        <div className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          <span>Message Agent</span>
                        </div>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      
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
                    </div>
                  )}
                </TabsContent>
              </Tabs>
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
          `}</style>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default InfoPanelManager;
