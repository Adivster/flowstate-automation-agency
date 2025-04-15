import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Gauge, Activity, ArrowUpRight, ArrowDownRight, AlertTriangle, Terminal, 
  ZapIcon, BarChart3, RefreshCw, Sliders, Users, CpuIcon, HardDrive, Zap,
  LineChart, GitBranch, Maximize2, Flame, Braces, FlaskConical, Network } from 'lucide-react';
import { useTheme } from 'next-themes';
import { ControlAction, SystemMetric } from './types/conversationTypes';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface AIControlPanelProps {
  activeContext: 'global' | 'division' | 'agent';
  contextEntity: {id: string; name: string; type: string} | null;
  quickActions: ControlAction[];
  systemMetrics: SystemMetric[];
  onExecuteAction: (actionId: string) => void;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

const AIControlPanel: React.FC<AIControlPanelProps> = ({
  activeContext,
  contextEntity,
  quickActions,
  systemMetrics,
  onExecuteAction,
  isExpanded,
  setIsExpanded
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeInsightIndex, setActiveInsightIndex] = useState(0);
  const [pulsing, setPulsing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveInsightIndex(prev => (prev + 1) % 4);
      setPulsing(true);
      setTimeout(() => setPulsing(false), 1000);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const generateMetricData = () => {
    return Array.from({ length: 12 }, () => Math.floor(Math.random() * 60) + 20);
  };

  const renderTrendIcon = (trend?: 'up' | 'down' | 'stable', status?: 'normal' | 'warning' | 'critical') => {
    if (trend === 'up') {
      return <ArrowUpRight className={`h-3 w-3 ${status === 'warning' || status === 'critical' ? 'text-red-400' : 'text-green-400'}`} />;
    }
    if (trend === 'down') {
      return <ArrowDownRight className={`h-3 w-3 ${status === 'warning' || status === 'critical' ? 'text-red-400' : 'text-green-400'}`} />;
    }
    return null;
  };

  return (
    <motion.div
      className="h-full flex flex-col overflow-hidden scan-lines"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className="flex items-center justify-between p-2 cursor-pointer bg-gray-900/90 border-b border-indigo-500/30"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <Terminal className="h-4 w-4 mr-2 text-cyan-400" />
          <span className="text-sm font-medium text-cyan-300">
            AI Control Panel
          </span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0 text-cyan-400 hover:text-cyan-300 hover:bg-transparent"
          >
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-1">
        <Tabs defaultValue="actions" className="w-full">
          <TabsList className="w-full bg-black/40 mb-3">
            <TabsTrigger 
              value="actions" 
              className="text-xs flex-1 data-[state=active]:bg-indigo-900/40 data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-cyan-300 data-[state=active]:shadow-[0_0_10px_rgba(139,92,246,0.5)]"
            >
              Actions
            </TabsTrigger>
            <TabsTrigger 
              value="metrics" 
              className="text-xs flex-1 data-[state=active]:bg-indigo-900/40 data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-cyan-300 data-[state=active]:shadow-[0_0_10px_rgba(139,92,246,0.5)]"
            >
              Metrics
            </TabsTrigger>
            <TabsTrigger 
              value="insights" 
              className="text-xs flex-1 data-[state=active]:bg-indigo-900/40 data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-cyan-300 data-[state=active]:shadow-[0_0_10px_rgba(139,92,246,0.5)]"
            >
              Insights
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="actions" className="mt-0 space-y-2 p-1">
            {quickActions.map((action) => (
              <TooltipProvider key={action.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onExecuteAction(action.id)}
                      className={`text-xs justify-start w-full mb-1 relative overflow-hidden group
                        ${action.severity === 'high' 
                          ? 'border-red-500/50 bg-red-900/20' : 
                          action.severity === 'medium' 
                          ? 'border-amber-500/50 bg-amber-900/10' : 
                          'border-cyan-500/50 bg-cyan-900/10'
                        }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      
                      <div className="flex items-center relative z-10">
                        {action.icon === 'zap' && <ZapIcon className="h-3.5 w-3.5 mr-1.5 text-cyan-400" />}
                        {action.icon === 'chart' && <BarChart3 className="h-3.5 w-3.5 mr-1.5 text-cyan-400" />}
                        {action.icon === 'refresh' && <RefreshCw className="h-3.5 w-3.5 mr-1.5 text-cyan-400" />}
                        {action.icon === 'users' && <Users className="h-3.5 w-3.5 mr-1.5 text-cyan-400" />}
                        {action.icon === 'cpu' && <CpuIcon className="h-3.5 w-3.5 mr-1.5 text-cyan-400" />}
                        {action.icon === 'sliders' && <Sliders className="h-3.5 w-3.5 mr-1.5 text-cyan-400" />}
                        <span className="group-hover:text-cyan-300 transition-colors">{action.label}</span>
                      </div>
                      
                      {action.severity === 'high' && (
                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="left" 
                    className="text-xs bg-black/80 border-cyan-500/30"
                  >
                    {`${action.action.charAt(0).toUpperCase() + action.action.slice(1)} ${
                      action.entityType === 'division' ? 'Division' : 
                      action.entityType === 'agent' ? 'Agent' : 'System'
                    }`}
                    {action.severity === 'high' && 
                      <div className="text-red-400 mt-1 flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1" /> High Priority
                      </div>
                    }
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
            
            <div className="mt-4 pt-2 border-t border-indigo-500/20">
              <h4 className="text-[10px] uppercase tracking-wider text-indigo-400/70 mb-2">Advanced Controls</h4>
              <div className="grid grid-cols-2 gap-1">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-[10px] h-8 bg-black/30 border-cyan-500/30 hover:bg-cyan-900/20"
                >
                  <Network className="h-3 w-3 mr-1 text-cyan-400" />
                  Network
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-[10px] h-8 bg-black/30 border-cyan-500/30 hover:bg-cyan-900/20"
                >
                  <HardDrive className="h-3 w-3 mr-1 text-cyan-400" />
                  Storage
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-[10px] h-8 bg-black/30 border-cyan-500/30 hover:bg-cyan-900/20"
                >
                  <Braces className="h-3 w-3 mr-1 text-cyan-400" />
                  Routines
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-[10px] h-8 bg-black/30 border-cyan-500/30 hover:bg-cyan-900/20"
                >
                  <FlaskConical className="h-3 w-3 mr-1 text-cyan-400" />
                  Testing
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="metrics" className="mt-0 space-y-2 p-1">
            {systemMetrics.map((metric) => (
              <motion.div 
                key={metric.id} 
                className={`p-2 rounded-md flex justify-between items-center bg-black/40 border border-cyan-900/50
                  ${metric.status === 'warning' ? 'border-l-2 border-l-amber-500' :
                    metric.status === 'critical' ? 'border-l-2 border-l-red-500' :
                    'border-l-2 border-l-cyan-500'
                  }`}
                whileHover={{ scale: 1.02, boxShadow: '0 0 8px rgba(6, 182, 212, 0.3)' }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center">
                  {metric.status === 'critical' && (
                    <AlertTriangle className="h-3.5 w-3.5 mr-1.5 text-red-400" />
                  )}
                  {metric.status === 'warning' && (
                    <AlertTriangle className="h-3.5 w-3.5 mr-1.5 text-amber-400" />
                  )}
                  {metric.status === 'normal' && (
                    <Activity className="h-3.5 w-3.5 mr-1.5 text-cyan-400" />
                  )}
                  <span className="text-xs">{metric.label}</span>
                </div>
                <div className="flex items-center">
                  <span className={`text-xs font-medium ${
                    metric.status === 'warning' ? 'text-amber-400' :
                    metric.status === 'critical' ? 'text-red-400' :
                    'text-cyan-400'
                  }`}>
                    {metric.value}{metric.unit}
                  </span>
                  {renderTrendIcon(metric.trend, metric.status)}
                </div>
              </motion.div>
            ))}

            <div className="mt-4 bg-black/40 rounded-md border border-cyan-900/50 p-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-cyan-400">Performance Trend</span>
                <div className="flex items-center">
                  <LineChart className="h-3.5 w-3.5 mr-1 text-cyan-400" />
                </div>
              </div>
              <div className="h-16 w-full flex items-end justify-between gap-0.5">
                {generateMetricData().map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: '0%' }}
                    animate={{ height: `${value}%` }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className={`flex-1 rounded-sm ${
                      index === 8 ? 'bg-red-500' :
                      index === 9 ? 'bg-amber-500' :
                      'bg-cyan-500/70'
                    }`}
                  />
                ))}
              </div>
              <div className="mt-1 flex justify-between">
                <span className="text-[10px] text-gray-400">-12h</span>
                <span className="text-[10px] text-gray-400">Now</span>
              </div>
            </div>

            <div className="mt-2 bg-black/40 rounded-md border border-cyan-900/50 p-2">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-cyan-400">System Load</span>
                <span className="text-xs text-cyan-300">72%</span>
              </div>
              <div className="w-full bg-gray-900 rounded-full h-1.5">
                <motion.div 
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 h-1.5 rounded-full relative overflow-hidden"
                  style={{ width: '72%' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                </motion.div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="insights" className="mt-0 p-1">
            <div className="bg-black/40 rounded-md border border-cyan-900/50 p-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 to-indigo-900/10" />
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeInsightIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`relative z-10 ${pulsing ? 'animate-pulse' : ''}`}
                >
                  {activeInsightIndex === 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Zap className="h-4 w-4 mr-1.5 text-cyan-400" />
                        <span className="text-xs font-medium text-cyan-300">Performance Analysis</span>
                      </div>
                      <p className="text-[11px] text-gray-300">System efficiency has increased by 7% after the latest optimization routine.</p>
                      <div className="flex gap-2 mt-1">
                        <div className="flex-1">
                          <div className="text-[10px] text-gray-400">Before</div>
                          <div className="text-xs text-amber-400">65%</div>
                        </div>
                        <div className="flex items-center text-cyan-400">
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </div>
                        <div className="flex-1 text-right">
                          <div className="text-[10px] text-gray-400">After</div>
                          <div className="text-xs text-green-400">72%</div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeInsightIndex === 1 && (
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-1.5 text-amber-400" />
                        <span className="text-xs font-medium text-amber-300">Attention Required</span>
                      </div>
                      <p className="text-[11px] text-gray-300">Analytics Division shows resource bottleneck. Consider reallocation.</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Flame className="h-3.5 w-3.5 text-amber-500" />
                        <div className="text-[10px] text-amber-400">High resource consumption detected</div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full text-[10px] h-7 mt-1 border-amber-500/50 text-amber-300 hover:bg-amber-500/20"
                      >
                        <RefreshCw className="h-3 w-3 mr-1.5" /> Auto-Balance Resources
                      </Button>
                    </div>
                  )}
                  
                  {activeInsightIndex === 2 && (
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <GitBranch className="h-4 w-4 mr-1.5 text-cyan-400" />
                        <span className="text-xs font-medium text-cyan-300">Workflow Optimization</span>
                      </div>
                      <p className="text-[11px] text-gray-300">Task distribution pattern suggests opportunity for parallel processing.</p>
                      <div className="flex items-center gap-1 mt-1 justify-between">
                        <div className="text-[10px] text-cyan-400 flex items-center">
                          <Maximize2 className="h-3 w-3 mr-1" /> Parallelization potential
                        </div>
                        <div className="text-xs font-medium text-cyan-300">+18%</div>
                      </div>
                      <div className="w-full bg-gray-900/70 h-1.5 rounded-full">
                        <div className="bg-cyan-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                  )}
                  
                  {activeInsightIndex === 3 && (
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <CpuIcon className="h-4 w-4 mr-1.5 text-purple-400" />
                        <span className="text-xs font-medium text-purple-300">AI Recommendation</span>
                      </div>
                      <p className="text-[11px] text-gray-300">Agent cognitive models can be trained for 15% improved response accuracy.</p>
                      <div className="grid grid-cols-2 gap-1 mt-1">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-[10px] h-7 border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
                        >
                          <ZapIcon className="h-3 w-3 mr-1" /> Quick Train
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-[10px] h-7 border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/20"
                        >
                          <Gauge className="h-3 w-3 mr-1" /> Full Tune
                        </Button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
              
              <div className="flex justify-center gap-1.5 mt-3">
                {[0, 1, 2, 3].map(i => (
                  <button 
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${activeInsightIndex === i ? 'bg-cyan-400' : 'bg-gray-600'}`}
                    onClick={() => setActiveInsightIndex(i)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-3 bg-black/40 rounded-md border border-cyan-900/50 p-2">
              <h3 className="text-xs font-medium text-cyan-300 mb-2">{
                activeContext === 'global' ? 'Global System' : 
                activeContext === 'division' ? `${contextEntity?.name} Division` :
                `Agent ${contextEntity?.name}`
              }</h3>
              
              <div className="space-y-1.5">
                {activeContext === 'global' ? (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-400">Divisions</span>
                      <span className="text-[10px] text-cyan-300">5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-400">Agents</span>
                      <span className="text-[10px] text-cyan-300">24</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-400">Active Tasks</span>
                      <span className="text-[10px] text-cyan-300">43</span>
                    </div>
                  </>
                ) : activeContext === 'division' ? (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-400">Agents</span>
                      <span className="text-[10px] text-cyan-300">7</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-400">Performance</span>
                      <span className="text-[10px] text-green-400">92%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-400">Task Queue</span>
                      <span className="text-[10px] text-cyan-300">12</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-400">Status</span>
                      <span className="text-[10px] text-green-400">Active</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-400">Efficiency</span>
                      <span className="text-[10px] text-cyan-300">87%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-400">Tasks</span>
                      <span className="text-[10px] text-cyan-300">3</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="p-1.5 bg-black/50 border-t border-indigo-500/30 flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse mr-1.5"></div>
          <span className="text-[10px] text-gray-300">AI Core Active</span>
        </div>
        <span className="text-[10px] text-cyan-500/70">v1.4.2</span>
      </div>
      
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </motion.div>
  );
};

export default AIControlPanel;
