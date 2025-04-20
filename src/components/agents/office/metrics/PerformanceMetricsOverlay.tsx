
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { LineChart, Cpu, Activity, Gauge, AlertTriangle, CheckCircle, Clock, ChevronDown, ChevronUp, Users, Server, BarChart3 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import MiniSparkline from '../MiniSparkline';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface PerformanceData {
  cpu: number;
  memory: number;
  network: number;
  agentsActive: number;
  totalAgents: number;
  systemLoad: number[];
  alerts: number;
  status: 'healthy' | 'warning' | 'critical';
  // Additional metrics
  responseTime?: number;
  uptime?: number;
  efficiency?: number;
  throughput?: number[];
  errorRate?: number;
}

interface PerformanceMetricsOverlayProps {
  data: PerformanceData;
  visible: boolean;
  position?: 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left';
  onClose?: () => void;
  onViewDetails?: () => void;
}

export const PerformanceMetricsOverlay: React.FC<PerformanceMetricsOverlayProps> = ({
  data,
  visible,
  position = 'bottom-right',
  onClose,
  onViewDetails
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('system');
  const overlayRef = useRef<HTMLDivElement>(null);
  
  const getPositionClasses = () => {
    switch (position) {
      case 'top-right': return 'top-4 right-4';
      case 'bottom-left': return 'bottom-4 left-4';
      case 'top-left': return 'top-4 left-4';
      case 'bottom-right':
      default: return 'bottom-4 right-4';
    }
  };
  
  const getStatusColor = () => {
    switch (data.status) {
      case 'critical': return 'text-red-500';
      case 'warning': return 'text-amber-500';
      case 'healthy':
      default: return 'text-green-500';
    }
  };
  
  const getStatusBadgeVariant = () => {
    switch (data.status) {
      case 'critical': return 'destructive';
      case 'warning': return 'warning';
      case 'healthy':
      default: return 'success';
    }
  };
  
  const getStatusIcon = () => {
    switch (data.status) {
      case 'critical': return <AlertTriangle className="h-3 w-3" />;
      case 'warning': return <AlertTriangle className="h-3 w-3" />;
      case 'healthy':
      default: return <CheckCircle className="h-3 w-3" />;
    }
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Handle clicking outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
        if (onClose) onClose();
      }
    };

    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible, onClose]);
  
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={overlayRef}
          className={`absolute ${getPositionClasses()} z-40`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <Card className={cn(
            "overflow-hidden backdrop-blur-md border shadow-lg transition-all duration-300",
            expanded ? "w-[420px]" : "w-72",
            isDark 
              ? "bg-black/80 border-white/10 text-white shadow-black/50" 
              : "bg-white/80 border-emerald-200/50 text-gray-800 shadow-gray-200/50"
          )}>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-500" />
                  <h3 className="text-sm font-medium">System Performance</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusBadgeVariant()} className="text-[10px] h-5 flex items-center gap-1">
                    {getStatusIcon()}
                    {data.status}
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6" 
                    onClick={toggleExpand}
                  >
                    {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  </Button>
                </div>
              </div>
              
              {expanded ? (
                <div className="space-y-4">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 h-8">
                      <TabsTrigger value="system" className="text-xs">System</TabsTrigger>
                      <TabsTrigger value="agents" className="text-xs">Agents</TabsTrigger>
                      <TabsTrigger value="network" className="text-xs">Network</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="system" className="space-y-3 mt-3 pt-1">
                      {/* CPU Usage */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center gap-1">
                            <Cpu className="h-3 w-3 text-blue-400 opacity-80" />
                            <span className="text-xs opacity-70">CPU</span>
                          </div>
                          <span className="text-xs font-medium">{data.cpu}%</span>
                        </div>
                        <Progress value={data.cpu} className={cn(
                          "h-1",
                          isDark ? "bg-white/10" : "bg-black/10" 
                        )} />
                      </div>
                      
                      {/* Memory Usage */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs opacity-70">Memory</span>
                          <span className="text-xs font-medium">{data.memory}%</span>
                        </div>
                        <Progress value={data.memory} className={cn(
                          "h-1",
                          isDark ? "bg-white/10" : "bg-black/10" 
                        )} />
                      </div>
                      
                      {/* System Load */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center gap-1">
                            <Gauge className="h-3 w-3 text-purple-400 opacity-80" />
                            <span className="text-xs opacity-70">System Load</span>
                          </div>
                        </div>
                        <div className="h-14">
                          <MiniSparkline
                            data={data.systemLoad}
                            width={370}
                            height={40}
                            color={isDark ? '#8B5CF6' : '#10B981'}
                            fillOpacity={0.2}
                            animated={true}
                          />
                        </div>
                      </div>
                      
                      {/* Additional System Metrics */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className={cn(
                          "p-2 rounded",
                          isDark ? "bg-white/5" : "bg-black/5"
                        )}>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3 w-3 text-cyan-400" />
                            <span className="text-xs font-medium">Uptime</span>
                          </div>
                          <div className="text-sm font-bold mt-1">{data.uptime || 99.9}%</div>
                        </div>
                        
                        <div className={cn(
                          "p-2 rounded",
                          isDark ? "bg-white/5" : "bg-black/5"
                        )}>
                          <div className="flex items-center gap-1.5">
                            <AlertTriangle className="h-3 w-3 text-amber-400" />
                            <span className="text-xs font-medium">Alerts</span>
                          </div>
                          <div className="text-sm font-bold mt-1">{data.alerts}</div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="agents" className="space-y-3 mt-3 pt-1">
                      {/* Agent Status */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3 text-green-400 opacity-80" />
                            <span className="text-xs opacity-70">Agents Active</span>
                          </div>
                          <span className="text-xs font-medium">{data.agentsActive}/{data.totalAgents}</span>
                        </div>
                        <Progress value={data.agentsActive / data.totalAgents * 100} className={cn(
                          "h-1",
                          isDark ? "bg-white/10" : "bg-black/10" 
                        )} />
                      </div>
                      
                      {/* Agent Efficiency */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs opacity-70">Agent Efficiency</span>
                          <span className="text-xs font-medium">{data.efficiency || 85}%</span>
                        </div>
                        <Progress value={data.efficiency || 85} className={cn(
                          "h-1",
                          isDark ? "bg-white/10" : "bg-black/10" 
                        )} />
                      </div>
                      
                      {/* Response Time */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs opacity-70">Response Time</span>
                          <span className="text-xs font-medium">{data.responseTime || 324}ms</span>
                        </div>
                        <Progress value={data.responseTime ? Math.min(100, (data.responseTime / 10)) : 32.4} className={cn(
                          "h-1",
                          isDark ? "bg-white/10" : "bg-black/10" 
                        )} />
                      </div>
                      
                      {/* Agent Distribution */}
                      <div className={cn(
                        "p-2 rounded",
                        isDark ? "bg-white/5" : "bg-black/5"
                      )}>
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-medium">Distribution</div>
                        </div>
                        <div className="flex mt-1.5 gap-1">
                          <div className="h-1.5 rounded-full bg-green-500" style={{width: '40%'}}></div>
                          <div className="h-1.5 rounded-full bg-blue-500" style={{width: '30%'}}></div>
                          <div className="h-1.5 rounded-full bg-amber-500" style={{width: '20%'}}></div>
                          <div className="h-1.5 rounded-full bg-red-500" style={{width: '10%'}}></div>
                        </div>
                        <div className="flex text-[10px] justify-between mt-1">
                          <span>Working</span>
                          <span>Idle</span>
                          <span>Paused</span>
                          <span>Error</span>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="network" className="space-y-3 mt-3 pt-1">
                      {/* Network Status */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center gap-1">
                            <Server className="h-3 w-3 text-blue-400 opacity-80" />
                            <span className="text-xs opacity-70">Network Usage</span>
                          </div>
                          <span className="text-xs font-medium">{data.network}%</span>
                        </div>
                        <Progress value={data.network} className={cn(
                          "h-1",
                          isDark ? "bg-white/10" : "bg-black/10" 
                        )} />
                      </div>
                      
                      {/* Throughput */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs opacity-70">Throughput</span>
                          <span className="text-xs font-medium">
                            {data.throughput ? data.throughput[data.throughput.length - 1] : 256} req/s
                          </span>
                        </div>
                        <div className="h-10">
                          <MiniSparkline
                            data={data.throughput || [220, 230, 210, 250, 270, 240, 256]}
                            width={370}
                            height={30}
                            color={isDark ? '#3B82F6' : '#2563EB'}
                            fillOpacity={0.2}
                            animated={true}
                          />
                        </div>
                      </div>
                      
                      {/* Error Rate */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs opacity-70">Error Rate</span>
                          <span className="text-xs font-medium">{data.errorRate || 0.8}%</span>
                        </div>
                        <Progress value={data.errorRate || 0.8} max={10} className={cn(
                          "h-1",
                          isDark ? "bg-white/10" : "bg-black/10" 
                        )} />
                      </div>
                      
                      {/* Data Transfer */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className={cn(
                          "p-2 rounded",
                          isDark ? "bg-white/5" : "bg-black/5"
                        )}>
                          <div className="flex items-center gap-1.5">
                            <BarChart3 className="h-3 w-3 text-green-400" />
                            <span className="text-xs font-medium">Inbound</span>
                          </div>
                          <div className="text-sm font-bold mt-1">2.4 GB</div>
                        </div>
                        
                        <div className={cn(
                          "p-2 rounded",
                          isDark ? "bg-white/5" : "bg-black/5"
                        )}>
                          <div className="flex items-center gap-1.5">
                            <BarChart3 className="h-3 w-3 text-blue-400" />
                            <span className="text-xs font-medium">Outbound</span>
                          </div>
                          <div className="text-sm font-bold mt-1">1.8 GB</div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              ) : (
                <div className="space-y-3 mt-3">
                  {/* CPU Usage */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-1">
                        <Cpu className="h-3 w-3 text-blue-400 opacity-80" />
                        <span className="text-xs opacity-70">CPU</span>
                      </div>
                      <span className="text-xs font-medium">{data.cpu}%</span>
                    </div>
                    <Progress value={data.cpu} className={cn(
                      "h-1",
                      isDark ? "bg-white/10" : "bg-black/10" 
                    )} />
                  </div>
                  
                  {/* Memory Usage */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs opacity-70">Memory</span>
                      <span className="text-xs font-medium">{data.memory}%</span>
                    </div>
                    <Progress value={data.memory} className={cn(
                      "h-1",
                      isDark ? "bg-white/10" : "bg-black/10" 
                    )} />
                  </div>
                  
                  {/* Agent Status */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs opacity-70">Agents Active</span>
                      <span className="text-xs font-medium">{data.agentsActive}/{data.totalAgents}</span>
                    </div>
                    <Progress value={data.agentsActive / data.totalAgents * 100} className={cn(
                      "h-1",
                      isDark ? "bg-white/10" : "bg-black/10" 
                    )} />
                  </div>
                  
                  {/* System Load */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-1">
                        <Gauge className="h-3 w-3 text-purple-400 opacity-80" />
                        <span className="text-xs opacity-70">System Load</span>
                      </div>
                    </div>
                    <div className="h-14">
                      <MiniSparkline
                        data={data.systemLoad}
                        width={240}
                        height={40}
                        color={isDark ? '#8B5CF6' : '#10B981'}
                        fillOpacity={0.2}
                        animated={true}
                      />
                    </div>
                  </div>
                  
                  {/* Alerts */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs opacity-70">Active Alerts</span>
                    <Badge variant={data.alerts > 0 ? "destructive" : "outline"} className="text-[10px]">
                      {data.alerts}
                    </Badge>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs h-7"
                  onClick={onViewDetails}
                >
                  <LineChart className="h-3 w-3 mr-1" />
                  Details
                </Button>
                
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs h-7"
                  onClick={onClose}
                >
                  Close
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
