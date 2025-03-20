
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

interface DivisionProps {
  division: {
    id: string;
    name: string;
    color: string;
    icon: LucideIcon;
    position: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    description: string;
    agents: number;
    tasks: number;
    decoration: Array<{
      type: string;
      x: number;
      y: number;
    }>;
  };
  isSelected: boolean;
  onDivisionClick: (id: string) => void;
  agents: Array<any>;
}

const Division: React.FC<DivisionProps> = ({ division, isSelected, onDivisionClick, agents }) => {
  const { t } = useLanguage();
  const Icon = division.icon;
  const agentsInDivision = agents.filter(agent => agent.division === division.id);
  
  // Render decoration items inside division
  const renderDecoration = (item: any, divisionColor: string) => {
    const getIcon = () => {
      switch (item.type) {
        case 'boards': return <div className="h-4 w-4 bg-white rounded-sm"></div>;
        case 'computer': return <div className="h-4 w-4 bg-blue-500 rounded-sm"></div>;
        case 'chart': return <div className="h-4 w-4 bg-cyan-500 rounded-sm"></div>;
        case 'desk': return <div className="h-2 w-3 bg-gray-300 dark:bg-gray-600 rounded-sm"></div>;
        case 'server': return <div className="h-4 w-4 bg-purple-500 rounded-sm"></div>;
        case 'monitor': return <div className="h-4 w-4 bg-blue-400 rounded-sm"></div>;
        case 'coffee': return <div className="h-4 w-4 bg-red-500 rounded-full"></div>;
        case 'mainframe': return <div className="h-4 w-4 bg-flow-accent rounded-sm"></div>;
        default: return null;
      }
    };
    
    return (
      <div 
        key={`${item.type}-${item.x}-${item.y}`}
        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
        style={{
          left: `${item.x}%`,
          top: `${item.y}%`
        }}
      >
        <div className={`p-1 rounded-sm ${divisionColor} bg-opacity-30 neon-glow`}>
          {getIcon()}
        </div>
      </div>
    );
  };
  
  return (
    <motion.div
      key={division.id}
      className={`absolute rounded-md ${division.color} bg-opacity-20 border-2 cursor-pointer transition-colors duration-200 scan-lines ${isSelected ? 'neon-border border-white shadow-lg' : `border-${division.color}`}`}
      style={{
        left: `${division.position.x}%`,
        top: `${division.position.y}%`,
        width: `${division.position.width}%`,
        height: `${division.position.height}%`,
        zIndex: isSelected ? 30 : 20
      }}
      onClick={() => onDivisionClick(division.id)}
      whileHover={{ scale: 1.01 }}
      animate={isSelected ? { scale: 1.03 } : { scale: 1 }}
    >
      <div className="absolute top-2 left-2 flex items-center">
        <Icon className="h-4 w-4 mr-1 text-white neon-glow" />
        <div className="text-xs font-semibold text-white">{division.name}</div>
      </div>
      
      <div className="absolute bottom-1 right-1 flex space-x-1">
        <Badge variant="outline" className="text-[0.6rem] py-0 px-1 bg-white/20">
          {agentsInDivision.length} {t('activeAgents')}
        </Badge>
      </div>
      
      {/* Division decoration items */}
      {division.decoration.map(item => renderDecoration(item, division.color))}
      
      {isSelected && (
        <motion.div 
          className="absolute inset-0 bg-black bg-opacity-70 rounded-md p-3 flex flex-col justify-between backdrop-blur-sm z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div>
            <h3 className="text-white text-sm font-bold">{division.name}</h3>
            <p className="text-white/80 text-xs mt-1">{division.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="bg-white/10 rounded p-1 text-center">
              <div className="text-white text-xs font-semibold">{division.agents}</div>
              <div className="text-white/70 text-[0.6rem]">{t('activeAgents')}</div>
            </div>
            <div className="bg-white/10 rounded p-1 text-center">
              <div className="text-white text-xs font-semibold">{division.tasks}</div>
              <div className="text-white/70 text-[0.6rem]">{t('pendingTasks')}</div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Division;
