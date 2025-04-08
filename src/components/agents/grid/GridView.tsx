
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon, BookOpen, Shield, BarChart, Settings, TrendingUp, Flask, Database, Server, FileText, Coffee } from 'lucide-react';
import AgentCard from '../AgentCard';

interface GridViewProps {
  filteredAgents: Array<{
    id: number;
    name: string;
    role: string;
    status: string;
    division: string;
    efficiency: number;
    lastActive: string;
    icon: string;
    tags?: string[];
  }>;
  expandedAgent: number | null;
  handleExpandAgent: (id: number) => void;
  handleAgentAction: (action: string, agent: any) => void;
  divisionColors: Record<string, { bg: string; text: string; border: string; }>;
  getDivisionName?: (division: string) => string;
}

const GridView: React.FC<GridViewProps> = ({
  filteredAgents,
  expandedAgent,
  handleExpandAgent,
  handleAgentAction,
  divisionColors,
  getDivisionName = (d) => d
}) => {
  // Map string icon names to actual Lucide components
  const iconMap: Record<string, LucideIcon> = {
    'Book': BookOpen,
    'Shield': Shield,
    'BarChart': BarChart,
    'Settings': Settings,
    'TrendingUp': TrendingUp,
    'Flask': Flask,
    'Database': Database,
    'Server': Server,
    'FileText': FileText,
    'Coffee': Coffee
  };

  return (
    <AnimatePresence>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAgents.map((agent, index) => {
          const IconComponent = iconMap[agent.icon] || BookOpen;
          
          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="h-full"
            >
              <AgentCard
                name={agent.name}
                role={agent.role}
                icon={IconComponent}
                status={agent.status as 'idle' | 'working' | 'paused' | 'error'}
                efficiency={agent.efficiency}
                lastActivity={agent.lastActive}
                tags={agent.tags}
                onClick={() => handleExpandAgent(agent.id)}
                className={`h-full border-l-2 ${expandedAgent === agent.id ? 'border-l-flow-accent' : 
                  agent.division === 'kb' ? 'border-l-indigo-500' : 
                  agent.division === 'analytics' ? 'border-l-yellow-500' : 
                  agent.division === 'operations' ? 'border-l-purple-500' :
                  agent.division === 'strategy' ? 'border-l-blue-500' :
                  agent.division === 'research' ? 'border-l-green-500' :
                  'border-l-amber-500'
                }`}
              />
            </motion.div>
          );
        })}
      </div>
    </AnimatePresence>
  );
};

export default GridView;
