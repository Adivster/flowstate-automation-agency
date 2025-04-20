
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { 
  MessageCircle, BarChart3, Activity, Settings, Users, RefreshCw, Play,
  Pause, Ban, CheckCircle, Eye, Trash, Edit, Plus, ArrowRight
} from 'lucide-react';

type EntityType = 'division' | 'agent' | 'workstation' | 'server' | 'none';

interface ContextualActionPanelProps {
  visible: boolean;
  entityType: EntityType;
  entityId: string | number | null;
  entityName: string;
  entityStatus?: 'working' | 'idle' | 'paused' | 'error';
  position?: 'right' | 'left' | 'top' | 'bottom';
  onAction: (action: string, entityId: string | number, entityType: EntityType) => void;
  onClose: () => void;
}

export const ContextualActionPanel: React.FC<ContextualActionPanelProps> = ({
  visible,
  entityType,
  entityId,
  entityName,
  entityStatus,
  position = 'right',
  onAction,
  onClose
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const getPositionStyles = () => {
    switch(position) {
      case 'left': return { right: '100%', top: '0', marginRight: '8px' };
      case 'top': return { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '8px' };
      case 'bottom': return { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '8px' };
      case 'right':
      default: return { left: '100%', top: '0', marginLeft: '8px' };
    }
  };
  
  const getActions = () => {
    switch(entityType) {
      case 'division':
        return [
          { icon: Eye, label: 'View Details', action: 'view' },
          { icon: Users, label: 'Manage Agents', action: 'manage-agents' },
          { icon: BarChart3, label: 'Analytics', action: 'analytics' },
          { icon: Settings, label: 'Settings', action: 'settings' },
          { icon: Edit, label: 'Edit Division', action: 'edit' },
        ];
      case 'agent':
        return [
          { icon: MessageCircle, label: 'Chat', action: 'chat' },
          { icon: Activity, label: 'Performance', action: 'performance' },
          { icon: entityStatus === 'working' ? Pause : Play, label: entityStatus === 'working' ? 'Pause Agent' : 'Activate Agent', action: entityStatus === 'working' ? 'pause' : 'activate' },
          { icon: RefreshCw, label: 'Reset Agent', action: 'reset' },
          { icon: ArrowRight, label: 'Assign Task', action: 'assign' },
        ];
      case 'workstation':
        return [
          { icon: Eye, label: 'View Details', action: 'view' },
          { icon: Settings, label: 'Configure', action: 'configure' },
          { icon: RefreshCw, label: 'Reset', action: 'reset' },
        ];
      case 'server':
        return [
          { icon: Activity, label: 'Monitor', action: 'monitor' },
          { icon: Settings, label: 'Configure', action: 'configure' },
          { icon: RefreshCw, label: 'Restart', action: 'restart' },
        ];
      default:
        return [];
    }
  };
  
  const handleAction = (actionType: string) => {
    if (entityId !== null) {
      onAction(actionType, entityId, entityType);
    }
    onClose();
  };
  
  const getStatusColor = () => {
    if (!entityStatus) return '';
    
    switch(entityStatus) {
      case 'working': return isDark ? 'text-green-400' : 'text-green-600';
      case 'idle': return isDark ? 'text-gray-400' : 'text-gray-600';
      case 'paused': return isDark ? 'text-amber-400' : 'text-amber-600';
      case 'error': return isDark ? 'text-red-400' : 'text-red-600';
      default: return '';
    }
  };
  
  const getStatusIcon = () => {
    if (!entityStatus) return null;
    
    switch(entityStatus) {
      case 'working': return <CheckCircle className="h-3.5 w-3.5 text-green-500" />;
      case 'idle': return <Activity className="h-3.5 w-3.5 text-gray-500" />;
      case 'paused': return <Pause className="h-3.5 w-3.5 text-amber-500" />;
      case 'error': return <Ban className="h-3.5 w-3.5 text-red-500" />;
      default: return null;
    }
  };

  return (
    <AnimatePresence>
      {visible && entityId !== null && (
        <motion.div
          className="absolute z-50"
          style={getPositionStyles()}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <div className={cn(
            "rounded-lg overflow-hidden backdrop-blur-md shadow-lg border",
            isDark 
              ? "bg-black/80 border-white/10 text-white shadow-black/30" 
              : "bg-white/80 border-emerald-200/50 text-gray-800 shadow-emerald-100/30"
          )}>
            <div className="p-3 border-b flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">{entityName}</h3>
                {entityStatus && (
                  <div className="flex items-center gap-1 mt-0.5">
                    {getStatusIcon()}
                    <span className={cn("text-xs capitalize", getStatusColor())}>
                      {entityStatus}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-2">
              <div className="grid grid-cols-1 gap-1">
                {getActions().map((action, index) => (
                  <Button 
                    key={action.action}
                    size="sm" 
                    variant="ghost" 
                    className="justify-start text-xs h-8"
                    onClick={() => handleAction(action.action)}
                  >
                    <action.icon className="h-3.5 w-3.5 mr-2" />
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
