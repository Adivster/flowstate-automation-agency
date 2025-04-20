
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { LineChart, Cpu, Activity, Gauge, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { MiniSparkline } from '../MiniSparkline';

interface PerformanceData {
  cpu: number;
  memory: number;
  network: number;
  agentsActive: number;
  totalAgents: number;
  systemLoad: number[];
  alerts: number;
  status: 'healthy' | 'warning' | 'critical';
}

interface PerformanceMetricsOverlayProps {
  data: PerformanceData;
  visible: boolean;
  position?: 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left';
  onClose?: () => void;
}

export const PerformanceMetricsOverlay: React.FC<PerformanceMetricsOverlayProps> = ({
  data,
  visible,
  position = 'bottom-right',
  onClose
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
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
  
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`absolute ${getPositionClasses()} z-40`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <Card className={cn(
            "w-72 overflow-hidden backdrop-blur-md border shadow-lg",
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
                <Badge variant={getStatusBadgeVariant()} className="text-[10px] h-5 flex items-center gap-1">
                  {getStatusIcon()}
                  {data.status}
                </Badge>
              </div>
              
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
              
              <div className="flex justify-between mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs h-7"
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
