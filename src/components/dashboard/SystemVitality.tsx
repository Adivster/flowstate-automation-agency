
import React from 'react';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Button } from '@/components/ui/button';
import { Activity, Settings, Zap, ExternalLink } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface GaugeProps {
  label: string;
  value: number;
  color: string;
}

const Gauge: React.FC<GaugeProps> = ({ label, value, color }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-24 w-24">
        <svg viewBox="0 0 100 50" className="w-full h-full">
          {/* Background arc */}
          <path 
            d="M 10,50 A 40,40 0 0,1 90,50" 
            fill="none" 
            strokeWidth="8" 
            stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
            strokeLinecap="round"
          />
          {/* Value arc */}
          <path 
            d={`M 10,50 A 40,40 0 0,1 ${10 + (value/100) * 80},${50 - Math.sin((value/100) * Math.PI) * 40}`}
            fill="none" 
            strokeWidth="8" 
            stroke={color}
            strokeLinecap="round"
          />
          <text 
            x="50" 
            y="50" 
            dominantBaseline="middle" 
            textAnchor="middle" 
            className="text-2xl font-medium"
            fill={color}
          >
            {value}%
          </text>
        </svg>
      </div>
      <span className="text-sm mt-2">{label}</span>
    </div>
  );
};

const SystemVitality: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { toast } = useToast();
  
  const handleOptimize = () => {
    toast({
      title: "System optimization started",
      description: "Running performance enhancements and resource allocation...",
      duration: 3000,
    });
  };
  
  return (
    <TransitionWrapper delay={250}>
      <GlassMorphism className="p-5 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className={cn(
              "p-2 rounded-lg mr-3",
              isDark ? "bg-green-500/20" : "bg-green-500/10"
            )}>
              <Activity className="h-5 w-5 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold">System Vitality</h3>
          </div>
          
          <span className={cn(
            "text-xs px-2 py-1 rounded-full",
            isDark ? "bg-green-500/20 text-green-400" : "bg-green-500/10 text-green-600"
          )}>
            🌟 Thriving
          </span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-4">
          <Gauge label="Throughput" value={92} color="#10b981" />
          <Gauge label="Success Rate" value={97} color="#059669" />
          <Gauge label="Avg Speed" value={88} color="#10b981" />
        </div>
        
        <div className={cn(
          "p-3 rounded-lg mb-3 text-sm",
          isDark ? "bg-blue-950/30 border border-blue-900/30" : "bg-blue-50 border border-blue-100"
        )}>
          <div className="flex items-start">
            <Zap className="h-4 w-4 text-blue-400 mt-0.5 mr-2" />
            <div>
              <p className="font-medium text-blue-400">Opportunity to optimize</p>
              <p className="text-flow-foreground/70">Speed could be improved by 10% with parallel processing on document indexing.</p>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button
            size="sm"
            className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30"
            onClick={handleOptimize}
          >
            <Settings className="h-4 w-4 mr-2" />
            Optimize Now
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-flow-foreground/70 border-flow-border"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            View Details
          </Button>
        </div>
      </GlassMorphism>
    </TransitionWrapper>
  );
};

export default SystemVitality;
