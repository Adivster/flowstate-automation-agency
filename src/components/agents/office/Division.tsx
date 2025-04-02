
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
  const activeAgents = agentsInDivision.filter(agent => agent.status === 'working');
  
  // Division color schemes
  const divisionStyles = {
    kb: { 
      bg: 'rgba(99, 102, 241, 0.15)', 
      border: '#6366f1',
      shadow: '0 0 20px rgba(99, 102, 241, 0.6)',
      text: '#6366f1'
    },
    analytics: { 
      bg: 'rgba(234, 179, 8, 0.15)', 
      border: '#eab308',
      shadow: '0 0 20px rgba(234, 179, 8, 0.6)',
      text: '#eab308'
    },
    operations: { 
      bg: 'rgba(168, 85, 247, 0.15)', 
      border: '#a855f7',
      shadow: '0 0 20px rgba(168, 85, 247, 0.6)',
      text: '#a855f7'
    },
    strategy: { 
      bg: 'rgba(59, 130, 246, 0.15)', 
      border: '#3b82f6',
      shadow: '0 0 20px rgba(59, 130, 246, 0.6)',
      text: '#3b82f6'
    },
    research: { 
      bg: 'rgba(34, 197, 94, 0.15)', 
      border: '#22c55e',
      shadow: '0 0 20px rgba(34, 197, 94, 0.6)',
      text: '#22c55e'
    },
    lounge: { 
      bg: 'rgba(245, 158, 11, 0.15)', 
      border: '#f59e0b',
      shadow: '0 0 20px rgba(245, 158, 11, 0.6)',
      text: '#f59e0b'
    }
  };
  
  const style = divisionStyles[division.id] || divisionStyles.kb;
  
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
  
  return (
    <motion.div
      key={division.id}
      className={`absolute rounded-lg overflow-hidden transition-colors duration-200`}
      style={{
        left: `${division.position.x}%`,
        top: `${division.position.y}%`,
        width: `${division.position.width}%`,
        height: `${division.position.height}%`,
        backgroundColor: style.bg,
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: isSelected ? '#ffffff' : style.border,
        boxShadow: isSelected || isPulsing ? style.shadow : 'none',
        zIndex: isSelected ? 30 : 20,
        cursor: 'pointer'
      }}
      onClick={() => onDivisionClick(division.id)}
      whileHover={{ scale: 1.01 }}
      animate={
        isSelected ? { 
          scale: 1.03,
        } : 
        isPulsing ? {
          boxShadow: [
            'none',
            style.shadow,
            'none'
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
      {/* Division Header */}
      <div className="absolute top-0 left-0 right-0 bg-black/40 backdrop-blur-sm p-1 flex items-center justify-between">
        <div className="flex items-center">
          <div className="p-1 rounded-full bg-black/30 mr-1">
            <Icon className="h-4 w-4 text-white" />
          </div>
          <div className="text-xs font-semibold text-white">{division.name}</div>
        </div>
      </div>
      
      {/* Active Agents Count */}
      <div className="absolute bottom-1 right-1">
        <Badge variant="outline" className="text-[0.6rem] py-0 px-1 bg-black/30 backdrop-blur-sm text-white border-white/20">
          {activeAgents.length} {t('activeAgents')}
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
      
      {/* Division Background Pattern - adds visual interest */}
      <div className="absolute inset-0 opacity-10" 
        style={{ 
          backgroundImage: `radial-gradient(circle, ${style.text} 1px, transparent 1px)`,
          backgroundSize: '15px 15px',
          pointerEvents: 'none'
        }} 
      />
    </motion.div>
  );
};

export default Division;
