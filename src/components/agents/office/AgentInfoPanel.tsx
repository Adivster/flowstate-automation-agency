
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AgentInfoPanelProps {
  agent: any;
  onClose: () => void;
}

const AgentInfoPanel: React.FC<AgentInfoPanelProps> = ({ agent, onClose }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Handle clicking outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // If click is outside the panel and not on a button or interactive element
      if (target && !target.closest('.agent-info-panel') && 
          !target.closest('button') &&
          !target.closest('[role="button"]') &&
          !target.closest('[data-popover-dialog]') &&
          !target.closest('[data-radix-menu]')) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Handle escape key to close
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        className={cn(
          "agent-info-panel w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-lg shadow-xl p-6",
          isDark 
            ? "bg-gray-900 border border-purple-500/30" 
            : "bg-white border border-emerald-200"
        )}
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className={cn(
            "text-xl font-semibold",
            isDark ? "text-white" : "text-gray-800"
          )}>
            {agent.name || "Agent Details"}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 rounded-full",
              isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
            )}
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className={cn(
            "p-4 rounded-lg",
            isDark ? "bg-gray-800/50" : "bg-gray-50"
          )}>
            <p className={cn(
              "text-sm",
              isDark ? "text-gray-300" : "text-gray-600"
            )}>
              Agent ID: {agent.id || "Unknown"}
            </p>
            <p className={cn(
              "text-sm",
              isDark ? "text-gray-300" : "text-gray-600"
            )}>
              Role: {agent.role || "Unknown"}
            </p>
            <p className={cn(
              "text-sm",
              isDark ? "text-gray-300" : "text-gray-600"
            )}>
              Status: {agent.status || "Unknown"}
            </p>
            <p className={cn(
              "text-sm",
              isDark ? "text-gray-300" : "text-gray-600"
            )}>
              Division: {agent.division || "Unassigned"}
            </p>
          </div>
          
          {/* Additional agent info would go here */}
          <div className={cn(
            "p-4 rounded-lg",
            isDark ? "bg-gray-800/50" : "bg-gray-50"
          )}>
            <h4 className={cn(
              "text-sm font-medium mb-2",
              isDark ? "text-gray-200" : "text-gray-700"
            )}>
              Performance Metrics
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className={cn(
                  "text-xs",
                  isDark ? "text-gray-400" : "text-gray-500"
                )}>
                  Efficiency
                </span>
                <span className={cn(
                  "text-xs font-medium",
                  isDark ? "text-purple-300" : "text-purple-600"
                )}>
                  {agent.efficiency || 0}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={cn(
                  "text-xs",
                  isDark ? "text-gray-400" : "text-gray-500"
                )}>
                  Workload
                </span>
                <span className={cn(
                  "text-xs font-medium",
                  isDark ? "text-blue-300" : "text-blue-600"
                )}>
                  {agent.workload || 0}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={cn(
                  "text-xs",
                  isDark ? "text-gray-400" : "text-gray-500"
                )}>
                  Task Completion
                </span>
                <span className={cn(
                  "text-xs font-medium",
                  isDark ? "text-green-300" : "text-green-600"
                )}>
                  {agent.taskCompletion || 0}%
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            variant={isDark ? "cyberpunk" : "eco"}
            size="sm"
          >
            View Details
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AgentInfoPanel;
