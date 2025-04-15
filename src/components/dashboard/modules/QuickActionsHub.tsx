
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, PlayCircle, UserPlus, Building2, Terminal, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDashboardActions } from '@/hooks/useDashboardActions';

const QuickActionsHub: React.FC = () => {
  const dashboardActions = useDashboardActions();
  
  const QuickActionButton = ({ icon, label, onClick, className = "" }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button 
        variant="outline" 
        className={`flex flex-col items-center justify-center h-24 bg-black/30 border-indigo-500/20 hover:bg-indigo-500/10 hover:border-indigo-500/40 transition-all duration-300 group ${className}`}
        onClick={onClick}
      >
        <div className="bg-indigo-600/20 p-2 rounded-full mb-2 group-hover:bg-indigo-600/30 transition-colors">
          {icon}
        </div>
        <span className="text-xs text-flow-foreground/80 group-hover:text-flow-foreground">{label}</span>
      </Button>
    </motion.div>
  );

  return (
    <Card className="p-4 border-flow-border/30 bg-black/30 backdrop-blur-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium neon-text-green flex items-center">
          <Zap className="mr-2 h-5 w-5 text-green-400" />
          Quick Actions
        </h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <QuickActionButton
          icon={<PlayCircle className="h-6 w-6 text-cyan-400" />}
          label="Start Workflow"
          onClick={dashboardActions.handleStartWorkflow}
        />
        <QuickActionButton
          icon={<UserPlus className="h-6 w-6 text-green-400" />}
          label="Deploy Agent"
          onClick={dashboardActions.handleCreateAgent}
        />
        <QuickActionButton
          icon={<Building2 className="h-6 w-6 text-yellow-400" />}
          label="Create Division"
          onClick={dashboardActions.handleCreateDivision}
        />
        <QuickActionButton
          icon={<Terminal className="h-6 w-6 text-indigo-400" />}
          label="Open CLI"
          onClick={dashboardActions.handleOpenCommandTerminal}
        />
      </div>
    </Card>
  );
};

export default QuickActionsHub;
