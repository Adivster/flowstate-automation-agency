
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
  isPulsing?: boolean;
  onDivisionClick: (id: string) => void;
  agents: Array<any>;
}

const Division: React.FC<DivisionProps> = ({ 
  division, 
  isSelected, 
  isPulsing = false,
  onDivisionClick, 
  agents 
}) => {
  const { t } = useLanguage();
  const Icon = division.icon;
  const agentsInDivision = agents.filter(agent => agent.division === division.id);
  
  // Render decoration items inside division
  const renderDecoration = (item: any) => {
    const getIcon = () => {
      switch (item.type) {
        case 'boards': return <div className="h-4 w-4 bg-white rounded-sm"></div>;
        case 'computer': return <div className="h-4 w-4 bg-blue-500 rounded-sm"></div>;
        case 'chart': return <div className="h-4 w-4 bg-cyan-500 rounded-sm"></div>;
        case 'desk': return <div className="h-2 w-3 bg-gray-300 dark:bg-gray-600 rounded-sm"></div>;
        case 'server': return <div className="h-4 w-4 bg-purple-500 rounded-sm"></div>;
        case 'monitor': return <div className="h-4 w-4 bg-blue-400 rounded-sm"></div>;
        case 'coffee': return <div className="h-4 w-4 bg-amber-500 rounded-full"></div>;
        case 'sofa': return <div className="h-3 w-5 bg-amber-400 rounded-sm"></div>;
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
        <div className="p-1 rounded-sm">
          {getIcon()}
        </div>
      </div>
    );
  };
  
  // Get tailwind color class based on division color string
  const getColorClass = (baseColor) => {
    return baseColor.replace('bg-', '');
  };
  
  return (
    <motion.div
      key={division.id}
      className={`absolute rounded-md ${division.color} bg-opacity-20 border-2 cursor-pointer transition-colors duration-200 
        ${isSelected ? 'border-white shadow-lg' : `border-${getColorClass(division.color)}`}
        ${isPulsing ? 'shadow-lg' : ''}`}
      style={{
        left: `${division.position.x}%`,
        top: `${division.position.y}%`,
        width: `${division.position.width}%`,
        height: `${division.position.height}%`,
        zIndex: isSelected ? 30 : 20,
        boxShadow: isPulsing ? `0 0 15px ${getColorClass(division.color)}` : ''
      }}
      onClick={() => onDivisionClick(division.id)}
      whileHover={{ scale: 1.01 }}
      animate={
        isSelected ? { 
          scale: 1.03,
        } : 
        isPulsing ? {
          boxShadow: [
            `0 0 5px ${getColorClass(division.color)}`,
            `0 0 15px ${getColorClass(division.color)}`,
            `0 0 5px ${getColorClass(division.color)}`
          ]
        } : { 
          scale: 1
        }
      }
      transition={{
        boxShadow: {
          duration: 1.5,
          repeat: isPulsing ? Infinity : 0,
          repeatType: "reverse"
        }
      }}
    >
      <div className="absolute top-2 left-2 flex items-center">
        <Icon className="h-4 w-4 mr-1 text-white" />
        <div className="text-xs font-semibold text-white">{division.name}</div>
      </div>
      
      <div className="absolute bottom-1 right-1 flex space-x-1">
        <Badge variant="outline" className="text-[0.6rem] py-0 px-1 bg-white/20">
          {agentsInDivision.length} {t('activeAgents')}
        </Badge>
      </div>
      
      {/* Division decoration items */}
      {division.decoration.map(item => renderDecoration(item))}
      
      {/* Activity indicators - only show when division is active */}
      {isPulsing && (
        <div className="absolute right-2 top-2 flex items-center">
          <span className="animate-ping absolute h-2 w-2 rounded-full bg-white opacity-75"></span>
          <span className="relative h-2 w-2 rounded-full bg-white"></span>
        </div>
      )}
    </motion.div>
  );
};

export default Division;
