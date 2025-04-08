
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon, BookOpen, Shield, BarChart, Settings, TrendingUp, TestTube, Database, Server, FileText, Coffee } from 'lucide-react';
import AgentCard from '../AgentCard';
import { getDivisionColorScheme } from '@/utils/colorSystem';

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
    'Flask': TestTube, // Changed Flask to TestTube which is available
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
          const colorScheme = getDivisionColorScheme(agent.division);
          
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
                divisionColor={colorScheme}
                division={agent.division}
                onClick={() => handleExpandAgent(agent.id)}
                className={`h-full border-l-2 ${expandedAgent === agent.id ? 'border-l-flow-accent' : `border-l-${colorScheme.primary}`}`}
              />
            </motion.div>
          );
        })}
      </div>
    </AnimatePresence>
  );
};

export default GridView;
