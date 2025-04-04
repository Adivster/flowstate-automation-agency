
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Division as DivisionType } from './types/officeTypes';

interface DivisionProps {
  division: DivisionType;
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
  
  // Division color schemes with enhanced cyberpunk look
  const divisionStyles = {
    kb: { 
      bg: 'rgba(99, 102, 241, 0.10)', 
      border: '#6366f1',
      shadow: '0 0 25px rgba(99, 102, 241, 0.7)',
      text: '#6366f1',
      pattern: 'repeating-linear-gradient(45deg, rgba(99, 102, 241, 0.05) 0px, transparent 1px, transparent 3px)'
    },
    analytics: { 
      bg: 'rgba(234, 179, 8, 0.10)', 
      border: '#eab308',
      shadow: '0 0 25px rgba(234, 179, 8, 0.7)',
      text: '#eab308',
      pattern: 'repeating-linear-gradient(45deg, rgba(234, 179, 8, 0.05) 0px, transparent 1px, transparent 3px)'
    },
    operations: { 
      bg: 'rgba(168, 85, 247, 0.10)', 
      border: '#a855f7',
      shadow: '0 0 25px rgba(168, 85, 247, 0.7)',
      text: '#a855f7',
      pattern: 'repeating-linear-gradient(45deg, rgba(168, 85, 247, 0.05) 0px, transparent 1px, transparent 3px)'
    },
    strategy: { 
      bg: 'rgba(59, 130, 246, 0.10)', 
      border: '#3b82f6',
      shadow: '0 0 25px rgba(59, 130, 246, 0.7)',
      text: '#3b82f6',
      pattern: 'repeating-linear-gradient(45deg, rgba(59, 130, 246, 0.05) 0px, transparent 1px, transparent 3px)'
    },
    research: { 
      bg: 'rgba(34, 197, 94, 0.10)', 
      border: '#22c55e',
      shadow: '0 0 25px rgba(34, 197, 94, 0.7)',
      text: '#22c55e',
      pattern: 'repeating-linear-gradient(45deg, rgba(34, 197, 94, 0.05) 0px, transparent 1px, transparent 3px)'
    },
    lounge: { 
      bg: 'rgba(245, 158, 11, 0.10)', 
      border: '#f59e0b',
      shadow: '0 0 25px rgba(245, 158, 11, 0.7)',
      text: '#f59e0b',
      pattern: 'repeating-linear-gradient(45deg, rgba(245, 158, 11, 0.05) 0px, transparent 1px, transparent 3px)'
    }
  };
  
  const style = divisionStyles[division.id] || divisionStyles.kb;
  
  // Generate default decorations for divisions based on their ID
  const getDefaultDecorations = (divisionId: string) => {
    switch(divisionId) {
      case 'kb':
        return [
          { type: 'boards', x: 30, y: 40 },
          { type: 'computer', x: 70, y: 60 }
        ];
      case 'analytics':
        return [
          { type: 'chart', x: 30, y: 40 },
          { type: 'computer', x: 70, y: 60 }
        ];
      case 'operations':
        return [
          { type: 'server', x: 30, y: 40 },
          { type: 'monitor', x: 70, y: 60 }
        ];
      case 'strategy':
        return [
          { type: 'boards', x: 30, y: 40 },
          { type: 'desk', x: 70, y: 60 }
        ];
      case 'research':
        return [
          { type: 'monitor', x: 30, y: 40 },
          { type: 'plant', x: 70, y: 60 }
        ];
      case 'lounge':
        return [
          { type: 'coffee', x: 30, y: 40 },
          { type: 'sofa', x: 70, y: 60 }
        ];
      default:
        return [];
    }
  };
  
  // Get default decorations for this division
  const decorations = getDefaultDecorations(division.id);
  
  // Render decoration items inside division with improved cyberpunk visual style
  const renderDecoration = (item: any) => {
    const getIcon = () => {
      switch (item.type) {
        case 'boards': return <div className="h-4 w-6 bg-white/30 rounded-sm border border-white/20 shadow-glow"></div>;
        case 'computer': return (
          <div className="h-4 w-5 bg-blue-500/30 rounded-sm flex items-center justify-center border border-blue-500/30 shadow-[0_0_3px_rgba(59,130,246,0.5)]">
            <div className="h-2 w-3 bg-blue-200/50 rounded-sm"></div>
          </div>
        );
        case 'chart': return (
          <div className="h-4 w-4 bg-cyan-500/30 rounded-sm flex items-center justify-center border border-cyan-500/30 shadow-[0_0_3px_rgba(8,145,178,0.5)]">
            <div className="h-2 w-2 border-b border-l border-cyan-200/70"></div>
          </div>
        );
        case 'desk': return <div className="h-2 w-5 bg-gray-300/30 dark:bg-gray-600/30 rounded-sm border border-gray-300/20 dark:border-gray-600/20"></div>;
        case 'server': return (
          <div className="h-4 w-3 bg-purple-500/30 rounded-sm flex flex-col justify-around items-center border border-purple-500/30 shadow-[0_0_3px_rgba(168,85,247,0.5)]">
            <div className="h-0.5 w-2 bg-purple-200/70"></div>
            <div className="h-0.5 w-2 bg-purple-200/70"></div>
          </div>
        );
        case 'monitor': return (
          <div className="h-3 w-4 bg-blue-400/30 rounded-t-sm flex items-center justify-center border border-blue-400/30 shadow-[0_0_3px_rgba(96,165,250,0.5)]">
            <div className="h-1.5 w-3 bg-blue-100/50 rounded-[1px]"></div>
          </div>
        );
        case 'coffee': return (
          <div className="h-3 w-2.5 bg-amber-700/30 rounded-sm border border-amber-700/20">
            <div className="h-0.5 w-1.5 bg-amber-200/40 mx-auto"></div>
          </div>
        );
        case 'sofa': return (
          <div className="h-2 w-5 bg-amber-400/30 rounded-sm border border-amber-400/20">
            <div className="h-0.5 w-4 bg-amber-200/40 mx-auto"></div>
          </div>
        );
        case 'plant': return (
          <div className="h-3 w-3 flex flex-col items-center">
            <div className="h-2 w-2 bg-green-500/40 rounded-full border border-green-500/30 shadow-[0_0_3px_rgba(34,197,94,0.5)]"></div>
            <div className="h-1 w-0.5 bg-green-800/40"></div>
          </div>
        );
        case 'meeting': return (
          <div className="h-4 w-4 bg-gray-400/20 rounded-full flex items-center justify-center border border-gray-400/20">
            <div className="h-2 w-2 bg-gray-600/30 rounded-full"></div>
          </div>
        );
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
      className={`absolute rounded-lg overflow-hidden transition-all duration-300 backdrop-blur-sm`}
      style={{
        left: `${division.position.x}%`,
        top: `${division.position.y}%`,
        width: `${division.position.width}%`,
        height: `${division.position.height}%`,
        backgroundColor: division.backgroundColor || style.bg,
        backgroundImage: style.pattern,
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: isSelected ? '#ffffff' : division.borderColor || style.border,
        boxShadow: isSelected ? style.shadow : isPulsing ? `0 0 15px ${style.border}60` : 'none',
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
            `0 0 5px ${style.border}30`,
            style.shadow,
            `0 0 5px ${style.border}30`
          ]
        } : { 
          scale: 1
        }
      }
      transition={{
        boxShadow: {
          duration: 1.8,
          repeat: isPulsing ? Infinity : 0,
          repeatType: "reverse"
        }
      }}
    >
      {/* Division Header with enhanced cyberpunk styling */}
      <div className="absolute top-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-1.5 flex items-center justify-between border-b" style={{ borderColor: `${style.border}40` }}>
        <div className="flex items-center">
          <div className="p-1 rounded-full mr-1.5" style={{ 
            backgroundColor: `${style.border}20`,
            boxShadow: isSelected || isPulsing ? `0 0 5px ${style.border}` : 'none',
          }}>
            <Icon className="h-4 w-4" style={{ color: style.text }} />
          </div>
          <div className="text-xs font-semibold font-cyber" style={{ color: style.text }}>
            {division.name}
          </div>
        </div>
      </div>
      
      {/* Active Agents Count */}
      <div className="absolute bottom-1 right-1">
        <Badge 
          variant="outline" 
          className="text-[0.6rem] py-0 px-1.5 bg-black/50 backdrop-blur-sm text-white border-white/20 flex items-center gap-1"
          style={{ 
            borderColor: style.border, 
            boxShadow: isSelected ? `0 0 5px ${style.border}80` : 'none' 
          }}
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: style.text }}></span>
          {activeAgents.length} {t('activeAgents')}
        </Badge>
      </div>
      
      {/* Division decoration items with improved spacing */}
      {decorations.map(item => renderDecoration(item))}
      
      {/* Activity indicators - enhanced visibility */}
      {isPulsing && (
        <div className="absolute right-2 top-9 flex items-center">
          <span className="animate-ping absolute h-2 w-2 rounded-full opacity-75" style={{ backgroundColor: style.text }}></span>
          <span className="relative h-2 w-2 rounded-full" style={{ backgroundColor: style.text }}></span>
        </div>
      )}
      
      {/* Division Border Glow Effect for selected state */}
      {isSelected && (
        <div 
          className="absolute inset-0 rounded-lg pointer-events-none" 
          style={{ 
            boxShadow: `inset 0 0 15px ${style.border}40`,
            border: `1px solid ${style.border}60`
          }}
        />
      )}
      
      {/* Scan Lines Effect */}
      <div className="absolute inset-0 scan-lines pointer-events-none"></div>
    </motion.div>
  );
};

export default Division;
