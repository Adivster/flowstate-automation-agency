
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
  
  // Render decoration items inside division with improved visual distinction
  const renderDecoration = (item: any) => {
    const getIcon = () => {
      switch (item.type) {
        case 'boards': return <div className="h-4 w-6 bg-white/70 rounded-sm"></div>;
        case 'computer': return <div className="h-4 w-5 bg-blue-500/70 rounded-sm flex items-center justify-center">
          <div className="h-2 w-3 bg-blue-200/90 rounded-sm"></div>
        </div>;
        case 'chart': return <div className="h-4 w-4 bg-cyan-500/70 rounded-sm flex items-center justify-center">
          <div className="h-2 w-2 border-b border-l border-cyan-200"></div>
        </div>;
        case 'desk': return <div className="h-2 w-5 bg-gray-300/70 dark:bg-gray-600/70 rounded-sm"></div>;
        case 'server': return <div className="h-4 w-3 bg-purple-500/70 rounded-sm flex flex-col justify-around items-center">
          <div className="h-0.5 w-2 bg-purple-200"></div>
          <div className="h-0.5 w-2 bg-purple-200"></div>
        </div>;
        case 'monitor': return <div className="h-3 w-4 bg-blue-400/70 rounded-t-sm flex items-center justify-center">
          <div className="h-1.5 w-3 bg-blue-100/80 rounded-[1px]"></div>
        </div>;
        case 'coffee': return <div className="h-3 w-2.5 bg-amber-700/70 rounded-sm">
          <div className="h-0.5 w-1.5 bg-amber-200/70 mx-auto"></div>
        </div>;
        case 'sofa': return <div className="h-2 w-5 bg-amber-400/70 rounded-sm">
          <div className="h-0.5 w-4 bg-amber-200/70 mx-auto"></div>
        </div>;
        case 'plant': return <div className="h-3 w-3 flex flex-col items-center">
          <div className="h-2 w-2 bg-green-500/70 rounded-full"></div>
          <div className="h-1 w-0.5 bg-green-800/70"></div>
        </div>;
        case 'meeting': return <div className="h-4 w-4 bg-gray-400/40 rounded-full flex items-center justify-center">
          <div className="h-2 w-2 bg-gray-600/70 rounded-full"></div>
        </div>;
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
        <div className="rounded-sm">
          {getIcon()}
        </div>
      </div>
    );
  };
  
  // Get hex color from Tailwind class
  const getTailwindColor = (colorClass: string) => {
    // Base color mapping - these correspond to Tailwind's color system
    const colorMap: Record<string, string> = {
      'bg-purple-500': '#a855f7',
      'bg-green-500': '#22c55e',
      'bg-blue-500': '#3b82f6',
      'bg-amber-500': '#f59e0b',
      'bg-indigo-500': '#6366f1',
      'bg-emerald-500': '#10b981',
      'bg-cyan-500': '#06b6d4',
      'bg-red-500': '#ef4444',
      'bg-lime-500': '#84cc16',
      'bg-pink-500': '#ec4899',
      'bg-yellow-500': '#eab308',
      'bg-flow-accent': '#3b82f6'
    };
    
    return colorMap[colorClass] || '#3b82f6'; // Default to flow-accent if not found
  };
  
  return (
    <motion.div
      key={division.id}
      className={`absolute rounded-md ${division.color} bg-opacity-20 border-2 cursor-pointer transition-colors duration-200 
        ${isSelected ? 'border-white shadow-lg' : 'border-opacity-70'}
        ${isPulsing ? 'shadow-lg' : ''}`}
      style={{
        left: `${division.position.x}%`,
        top: `${division.position.y}%`,
        width: `${division.position.width}%`,
        height: `${division.position.height}%`,
        zIndex: isSelected ? 30 : 20,
        borderColor: isSelected ? '#ffffff' : getTailwindColor(division.color),
        boxShadow: isPulsing ? `0 0 15px ${getTailwindColor(division.color)}` : ''
      }}
      onClick={() => onDivisionClick(division.id)}
      whileHover={{ scale: 1.01 }}
      animate={
        isSelected ? { 
          scale: 1.03,
        } : 
        isPulsing ? {
          boxShadow: [
            `0 0 5px ${getTailwindColor(division.color)}`,
            `0 0 15px ${getTailwindColor(division.color)}`,
            `0 0 5px ${getTailwindColor(division.color)}`
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
        <div className="p-1 rounded-full bg-black/30 backdrop-blur-sm mr-1">
          <Icon className="h-4 w-4 text-white" />
        </div>
        <div className="text-xs font-semibold text-white drop-shadow-md">{division.name}</div>
      </div>
      
      <div className="absolute bottom-1 right-1 flex space-x-1">
        <Badge variant="outline" className="text-[0.6rem] py-0 px-1 bg-black/30 backdrop-blur-sm text-white border-white/20">
          {agentsInDivision.length} {t('activeAgents')}
        </Badge>
      </div>
      
      {/* Division decoration items with improved spacing */}
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
