
import React from 'react';
import { CyberCard } from '@/components/ui/cyber-card';
import { useTheme } from '@/providers/theme-provider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Settings, ChevronRight, Zap, Sparkles } from 'lucide-react';

const SnapshotGrid = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const snapshotData = [
    {
      title: 'Agent Performance',
      count: '12',
      label: 'Active Agents',
      status: { label: 'Healthy', type: 'success' },
      color: 'cyan',
      action: 'View Agents'
    },
    {
      title: 'Knowledge Base',
      count: '176',
      label: 'Documents',
      status: { label: 'Updated', type: 'success' },
      color: 'blue',
      action: 'Browse KB'
    },
    {
      title: 'Workflow Status',
      count: '8',
      label: 'Running Workflows',
      status: { label: 'Warning', type: 'warning' },
      color: 'magenta',
      action: 'Manage Flows'
    },
    {
      title: 'System Resources',
      count: '43%',
      label: 'CPU Utilization',
      status: { label: 'Nominal', type: 'info' },
      color: 'lime',
      action: 'View Resources'
    }
  ];
  
  const getStatusBadge = (status: { label: string; type: string }) => {
    switch (status.type) {
      case 'success':
        return (
          <Badge variant="outline" className={isDark ? 
            "bg-lime-500/20 text-lime-400 border-lime-400/50" : 
            "bg-green-50 text-green-600 border-green-200"
          }>
            {status.label}
          </Badge>
        );
      case 'warning':
        return (
          <Badge variant="outline" className={isDark ? 
            "bg-amber-500/20 text-amber-400 border-amber-400/50" : 
            "bg-amber-50 text-amber-600 border-amber-200"
          }>
            {status.label}
          </Badge>
        );
      case 'error':
        return (
          <Badge variant="outline" className={isDark ? 
            "bg-pink-500/20 text-pink-400 border-pink-400/50" : 
            "bg-red-50 text-red-600 border-red-200"
          }>
            {status.label}
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className={isDark ? 
            "bg-cyan-500/20 text-cyan-400 border-cyan-400/50" : 
            "bg-blue-50 text-blue-600 border-blue-200"
          }>
            {status.label}
          </Badge>
        );
    }
  };
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      {snapshotData.map((snapshot, index) => (
        <CyberCard 
          key={index}
          title={snapshot.title}
          badge={getStatusBadge(snapshot.status)}
          headerAction={
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 rounded-full opacity-70 hover:opacity-100"
            >
              <Settings className="h-3.5 w-3.5" />
            </Button>
          }
          color={snapshot.color as any}
          animation={index % 2 === 0 ? "glow" : "pulse"}
          elevation="raised"
        >
          <div className="mt-3">
            <div className="flex items-end">
              <span className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                {snapshot.count}
              </span>
              <span className={`text-sm ml-2 mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                {snapshot.label}
              </span>
            </div>
            
            {index === 2 && isDark && (
              <div className="mt-3 py-2 px-3 rounded-md bg-flow-accent-tertiary/20 border border-flow-accent-tertiary/30 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-flow-accent-tertiary" />
                <span className="text-xs text-flow-accent-tertiary">Optimization available</span>
              </div>
            )}
          </div>
          
          <div className="mt-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`w-full justify-between ${
                isDark ? 
                  (snapshot.color === 'magenta' ? 'text-pink-400 hover:text-pink-300 hover:bg-pink-950/30' : 
                   snapshot.color === 'lime' ? 'text-lime-400 hover:text-lime-300 hover:bg-lime-950/30' :
                   snapshot.color === 'blue' ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-950/30' :
                   'text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/30') :
                  'text-gray-700'
              }`}
            >
              {snapshot.action}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CyberCard>
      ))}
    </div>
  );
};

export default SnapshotGrid;
