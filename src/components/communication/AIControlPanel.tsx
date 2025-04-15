
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Gauge, Activity, ArrowUpRight, ArrowDownRight, AlertTriangle, Terminal, 
  ZapIcon, BarChart3, RefreshCw, Sliders, Users, CpuIcon } from 'lucide-react';
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
      className={`${
        isDark 
          ? 'bg-black/60 border-indigo-500/30' 
          : 'bg-white/80 border-emerald-500/30'
      } border backdrop-blur-md rounded-lg overflow-hidden transition-all`}
      initial={{ height: isExpanded ? 'auto' : '40px' }}
      animate={{ height: isExpanded ? 'auto' : '40px' }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className="flex items-center justify-between p-2 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <Terminal className={`h-4 w-4 mr-2 ${isDark ? 'text-cyan-400' : 'text-emerald-600'}`} />
          <span className={`text-sm font-medium ${isDark ? 'text-cyan-300' : 'text-emerald-700'}`}>
            AI Control Panel {contextEntity ? `- ${contextEntity.name}` : ''}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0"
          >
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
      
      {isExpanded && (
        <div className="p-3">
          <Tabs defaultValue="actions" className="w-full">
            <TabsList className="w-full mb-3">
              <TabsTrigger value="actions" className="text-xs flex-1">Quick Actions</TabsTrigger>
              <TabsTrigger value="metrics" className="text-xs flex-1">System Metrics</TabsTrigger>
              <TabsTrigger value="insights" className="text-xs flex-1">AI Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="actions" className="mt-0">
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <TooltipProvider key={action.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onExecuteAction(action.id)}
                          className={`text-xs justify-start ${
                            action.severity === 'high' ? 'border-red-500/50' : 
                            action.severity === 'medium' ? 'border-amber-500/50' : ''
                          } ${isDark ? 'bg-black/50' : 'bg-white/70'}`}
                        >
                          {action.icon === 'zap' && <ZapIcon className="h-3.5 w-3.5 mr-1.5" />}
                          {action.icon === 'chart' && <BarChart3 className="h-3.5 w-3.5 mr-1.5" />}
                          {action.icon === 'refresh' && <RefreshCw className="h-3.5 w-3.5 mr-1.5" />}
                          {action.icon === 'users' && <Users className="h-3.5 w-3.5 mr-1.5" />}
                          {action.icon === 'cpu' && <CpuIcon className="h-3.5 w-3.5 mr-1.5" />}
                          {action.icon === 'sliders' && <Sliders className="h-3.5 w-3.5 mr-1.5" />}
                          {action.label}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="text-xs">
                        {`${action.action.charAt(0).toUpperCase() + action.action.slice(1)} ${
                          action.entityType === 'division' ? 'Division' : 
                          action.entityType === 'agent' ? 'Agent' : 'System'
                        }`}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="metrics" className="mt-0">
              <div className="space-y-2">
                {systemMetrics.map((metric) => (
                  <div 
                    key={metric.id} 
                    className={`p-2 rounded-md flex justify-between items-center ${
                      isDark ? 'bg-gray-900/60' : 'bg-gray-100/80'
                    } ${
                      metric.status === 'warning' ? 'border-l-2 border-amber-500' :
                      metric.status === 'critical' ? 'border-l-2 border-red-500' :
                      'border-l-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center">
                      {metric.status === 'critical' && (
                        <AlertTriangle className="h-3.5 w-3.5 mr-1.5 text-red-400" />
                      )}
                      <span className="text-xs">{metric.label}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`text-xs font-medium ${
                        metric.status === 'warning' ? 'text-amber-400' :
                        metric.status === 'critical' ? 'text-red-400' :
                        isDark ? 'text-cyan-400' : 'text-emerald-600'
                      }`}>
                        {metric.value}{metric.unit}
                      </span>
                      {renderTrendIcon(metric.trend, metric.status)}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="insights" className="mt-0">
              <div className={`p-3 rounded-md text-xs ${
                isDark ? 'bg-gray-900/60 text-cyan-100' : 'bg-gray-100/80 text-emerald-700'
              }`}>
                {activeContext !== 'global' && contextEntity ? (
                  <div className="space-y-2">
                    <p><strong>{contextEntity.name} {contextEntity.type}</strong> analysis:</p>
                    <p>• Performance is {Math.random() > 0.5 ? 'above' : 'below'} expected thresholds</p>
                    <p>• Recommended action: {Math.random() > 0.5 ? 'Optimization' : 'Task reassignment'}</p>
                    <p>• Efficiency improvement potential: {Math.floor(Math.random() * 15) + 5}%</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p><strong>System-wide analysis</strong></p>
                    <p>• Overall performance at {Math.floor(Math.random() * 20) + 80}% efficiency</p>
                    <p>• 2 divisions showing optimization opportunities</p>
                    <p>• Resource utilization can be improved by {Math.floor(Math.random() * 10) + 5}%</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </motion.div>
  );
};

export default AIControlPanel;
