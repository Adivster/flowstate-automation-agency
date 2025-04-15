
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Activity, Zap, BarChart, ArrowUpRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  
  const getHotspotColor = () => {
    if (!metrics?.status) return 'bg-blue-500';
    
    switch (metrics.status) {
      case 'critical':
        return 'bg-red-500';
      case 'warning':
        return 'bg-amber-500';
      case 'normal':
      default:
        return 'bg-green-500';
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
  
  const handleAction = (action: string) => {
    if (onAction) {
      onAction(action, id);
    } else {
      toast({
        title: `Action: ${action}`,
        description: `Performing ${action} on ${name} (${id})`,
        duration: 3000,
      });
    }
  };
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <motion.div
          className={`absolute rounded-full cursor-pointer ${getHotspotSize()} ${getHotspotColor()} shadow-lg`}
          style={{
            left: `${x}%`,
            top: `${y}%`,
            zIndex: 50,
          }}
          initial={{ scale: 0.8, opacity: 0.6 }}
          animate={{ 
            scale: isHovered ? 1.4 : metrics?.status === 'critical' ? [1, 1.2, 1] : 1,
            opacity: isHovered ? 1 : 0.8,
            boxShadow: isHovered ? `0 0 10px ${getHotspotColor().replace('bg-', '')}` : 'none',
          }}
          transition={metrics?.status === 'critical' ? { 
            repeat: Infinity, 
            duration: 1.5 
          } : { 
            duration: 0.2 
          }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        />
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0 bg-black/80 border-white/10 backdrop-blur-lg text-white" side="top">
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-sm">{name}</h4>
            <div className={`px-2 py-0.5 text-xs rounded-full ${
              metrics?.status === 'critical' ? 'bg-red-500/30 text-red-300' : 
              metrics?.status === 'warning' ? 'bg-amber-500/30 text-amber-300' : 
              'bg-green-500/30 text-green-300'
            }`}>
              {metrics?.status || 'Normal'}
            </div>
          </div>
          
          {metrics && (
            <div className="flex gap-3 mb-3 bg-white/5 p-2 rounded-md">
              {metrics.efficiency !== undefined && (
                <div className="flex-1">
                  <div className="text-xs text-white/60">Efficiency</div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">{metrics.efficiency}%</span>
                    {metrics.trend === 'up' && <span className="text-green-400 text-xs">↑</span>}
                    {metrics.trend === 'down' && <span className="text-red-400 text-xs">↓</span>}
                  </div>
                </div>
              )}
              
              {metrics.load !== undefined && (
                <div className="flex-1">
                  <div className="text-xs text-white/60">Load</div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">{metrics.load}%</span>
                    <div 
                      className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden" 
                      style={{ 
                        background: `linear-gradient(to right, 
                        ${metrics.load > 80 ? '#ef4444' : metrics.load > 60 ? '#f59e0b' : '#22c55e'} ${metrics.load}%, 
                        rgba(255,255,255,0.1) ${metrics.load}%)` 
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className="border-t border-white/10 pt-2">
            <div className="flex flex-wrap gap-1 justify-end">
              {type === 'division' && (
                <>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-7 text-xs hover:bg-white/10"
                    onClick={() => handleAction('analyze')}
                  >
                    <Activity className="h-3 w-3 mr-1" />
                    Analyze
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-7 text-xs hover:bg-white/10"
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
                    variant="ghost" 
                    className="h-7 text-xs hover:bg-white/10"
                    onClick={() => handleAction('diagnose')}
                  >
                    <BarChart className="h-3 w-3 mr-1" />
                    Diagnose
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-7 text-xs hover:bg-white/10"
                    onClick={() => handleAction('chat')}
                  >
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Chat
                  </Button>
                </>
              )}
              
              <Button 
                size="sm" 
                className="h-7 text-xs bg-blue-600 hover:bg-blue-700"
                onClick={() => handleAction('details')}
              >
                <ArrowUpRight className="h-3 w-3 mr-1" />
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
