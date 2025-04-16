
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Activity, Zap, BarChart, ArrowUpRight, MessageCircle, PieChart, Maximize2, RefreshCw, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface HotspotProps {
  x: number;
  y: number;
  type: 'agent' | 'workstation' | 'division' | 'server';
  id: string;
  name: string;
  metrics?: {
    efficiency?: number;
    load?: number;
    status?: 'normal' | 'warning' | 'critical';
    trend?: 'up' | 'down' | 'stable';
  };
  onAction?: (action: string, id: string) => void;
}

const InteractiveHotspot: React.FC<HotspotProps> = ({ 
  x, 
  y, 
  type, 
  id, 
  name,
  metrics,
  onAction
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const getHotspotColor = () => {
    if (!metrics?.status) return isDark ? 'bg-blue-500' : 'bg-blue-400';
    
    switch (metrics.status) {
      case 'critical':
        return isDark ? 'bg-red-500' : 'bg-red-400';
      case 'warning':
        return isDark ? 'bg-amber-500' : 'bg-amber-400';
      case 'normal':
      default:
        return isDark ? 'bg-green-500' : 'bg-green-400';
    }
  };

  const getHotspotSize = () => {
    switch (type) {
      case 'division':
        return 'h-4 w-4';
      case 'server':
        return 'h-5 w-5';
      default:
        return 'h-3 w-3';
    }
  };

  const getPulseColor = () => {
    if (!metrics?.status) return isDark ? 'rgba(59, 130, 246, 0.5)' : 'rgba(96, 165, 250, 0.5)';
    
    switch (metrics.status) {
      case 'critical':
        return isDark ? 'rgba(239, 68, 68, 0.5)' : 'rgba(248, 113, 113, 0.5)';
      case 'warning':
        return isDark ? 'rgba(245, 158, 11, 0.5)' : 'rgba(251, 191, 36, 0.5)';
      case 'normal':
      default:
        return isDark ? 'rgba(34, 197, 94, 0.5)' : 'rgba(74, 222, 128, 0.5)';
    }
  };
  
  const handleAction = (action: string) => {
    if (onAction) {
      onAction(action, id);
      setIsOpen(false);
    } else {
      toast({
        title: `Action: ${action}`,
        description: `Performing ${action} on ${name} (${id})`,
        duration: 3000,
      });
    }
  };
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <motion.div
          className={`absolute rounded-full cursor-pointer ${getHotspotSize()} ${getHotspotColor()} shadow-lg overflow-visible`}
          style={{
            left: `${x}%`,
            top: `${y}%`,
            zIndex: 50,
          }}
          initial={{ scale: 0.8, opacity: 0.6 }}
          animate={{ 
            scale: isOpen ? 1.4 : isHovered ? 1.2 : metrics?.status === 'critical' ? [1, 1.2, 1] : 1,
            opacity: isOpen ? 1 : isHovered ? 1 : 0.8,
          }}
          transition={metrics?.status === 'critical' ? { 
            repeat: Infinity, 
            duration: 1.5 
          } : { 
            duration: 0.2 
          }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={() => setIsOpen(true)}
        >
          {/* Pulse effect */}
          <AnimatePresence>
            {(isHovered || metrics?.status === 'critical' || isOpen) && (
              <motion.div
                className="absolute inset-0 rounded-full z-[-1]"
                initial={{ scale: 1, opacity: 0.7 }}
                animate={{ 
                  scale: isOpen ? 1.7 : 1.5, 
                  opacity: 0,
                }}
                exit={{ opacity: 0, scale: 1.8 }}
                transition={{ 
                  repeat: Infinity, 
                  duration: metrics?.status === 'critical' ? 1.2 : 1.8 
                }}
                style={{ 
                  backgroundColor: getPulseColor(),
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </PopoverTrigger>
      <PopoverContent 
        className={cn(
          "w-72 p-0 border backdrop-blur-lg z-50",
          isDark 
            ? "bg-black/90 border-white/10 text-white" 
            : "bg-white/90 border-gray-200 text-gray-800"
        )}
        side="top"
      >
        <div className="p-3">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-sm">{name}</h4>
            <div className={cn(
              "px-2 py-0.5 text-xs rounded-full", 
              metrics?.status === 'critical' 
                ? isDark ? "bg-red-500/30 text-red-300" : "bg-red-100 text-red-700" 
                : metrics?.status === 'warning' 
                  ? isDark ? "bg-amber-500/30 text-amber-300" : "bg-amber-100 text-amber-700"
                  : isDark ? "bg-green-500/30 text-green-300" : "bg-green-100 text-green-700"
            )}>
              {metrics?.status || 'Normal'}
            </div>
          </div>
          
          {metrics && (
            <div className={cn(
              "flex gap-3 mb-4 p-3 rounded-md",
              isDark ? "bg-white/5" : "bg-gray-50"
            )}>
              {metrics.efficiency !== undefined && (
                <div className="flex-1">
                  <div className={cn(
                    "text-xs mb-1",
                    isDark ? "text-white/60" : "text-gray-500"
                  )}>Efficiency</div>
                  <div className="flex items-center gap-1">
                    <span className={cn(
                      "text-sm font-medium",
                      metrics.efficiency > 80 
                        ? isDark ? "text-green-400" : "text-green-600"
                        : metrics.efficiency > 50
                          ? isDark ? "text-amber-400" : "text-amber-600"
                          : isDark ? "text-red-400" : "text-red-600"
                    )}>{metrics.efficiency}%</span>
                    {metrics.trend === 'up' && <span className="text-green-400 text-xs">↑</span>}
                    {metrics.trend === 'down' && <span className="text-red-400 text-xs">↓</span>}
                  </div>
                </div>
              )}
              
              {metrics.load !== undefined && (
                <div className="flex-1">
                  <div className={cn(
                    "text-xs mb-1",
                    isDark ? "text-white/60" : "text-gray-500"
                  )}>Load</div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">{metrics.load}%</span>
                    <div 
                      className={cn(
                        "w-full h-1.5 rounded-full overflow-hidden",
                        isDark ? "bg-white/10" : "bg-gray-200"
                      )}
                    >
                      <div 
                        className={cn(
                          "h-full rounded-full",
                          metrics.load > 80 
                            ? "bg-red-500" 
                            : metrics.load > 60 
                              ? "bg-amber-500" 
                              : "bg-green-500"
                        )}
                        style={{ width: `${metrics.load}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className={cn(
            "border-t pt-3",
            isDark ? "border-white/10" : "border-gray-200"
          )}>
            <div className="flex flex-wrap gap-2 justify-end">
              {type === 'division' && (
                <>
                  <Button 
                    size="sm" 
                    variant={isDark ? "ghost" : "outline"}
                    className={cn(
                      "h-7 text-xs",
                      isDark 
                        ? "hover:bg-white/10" 
                        : "bg-white hover:bg-gray-100 border-gray-200"
                    )}
                    onClick={() => handleAction('analyze')}
                  >
                    <PieChart className="h-3 w-3 mr-1" />
                    Analyze
                  </Button>
                  <Button 
                    size="sm" 
                    variant={isDark ? "ghost" : "outline"}
                    className={cn(
                      "h-7 text-xs", 
                      isDark 
                        ? "hover:bg-white/10" 
                        : "bg-white hover:bg-gray-100 border-gray-200"
                    )}
                    onClick={() => handleAction('optimize')}
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    Optimize
                  </Button>
                </>
              )}
              
              {(type === 'agent' || type === 'workstation') && (
                <>
                  <Button 
                    size="sm" 
                    variant={isDark ? "ghost" : "outline"}
                    className={cn(
                      "h-7 text-xs",
                      isDark 
                        ? "hover:bg-white/10" 
                        : "bg-white hover:bg-gray-100 border-gray-200"
                    )}
                    onClick={() => handleAction('diagnose')}
                  >
                    <Activity className="h-3 w-3 mr-1" />
                    Diagnose
                  </Button>
                  <Button 
                    size="sm" 
                    variant={isDark ? "ghost" : "outline"}
                    className={cn(
                      "h-7 text-xs",
                      isDark 
                        ? "hover:bg-white/10" 
                        : "bg-white hover:bg-gray-100 border-gray-200"
                    )}
                    onClick={() => handleAction('chat')}
                  >
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Chat
                  </Button>
                </>
              )}
              
              {type === 'server' && (
                <>
                  <Button 
                    size="sm" 
                    variant={isDark ? "ghost" : "outline"}
                    className={cn(
                      "h-7 text-xs",
                      isDark 
                        ? "hover:bg-white/10" 
                        : "bg-white hover:bg-gray-100 border-gray-200"
                    )}
                    onClick={() => handleAction('diagnose')}
                  >
                    <BrainCircuit className="h-3 w-3 mr-1" />
                    Monitor
                  </Button>
                  <Button 
                    size="sm" 
                    variant={isDark ? "ghost" : "outline"}
                    className={cn(
                      "h-7 text-xs",
                      isDark 
                        ? "hover:bg-white/10" 
                        : "bg-white hover:bg-gray-100 border-gray-200"
                    )}
                    onClick={() => handleAction('restart')}
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Restart
                  </Button>
                </>
              )}
              
              <Button 
                size="sm" 
                className={cn(
                  "h-7 text-xs",
                  isDark
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-500 hover:bg-blue-600"
                )}
                onClick={() => handleAction('details')}
              >
                <Maximize2 className="h-3 w-3 mr-1" />
                Details
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default InteractiveHotspot;
