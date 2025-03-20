
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, FileSearch, User, Code, Shield, BrainCog, Monitor, Coffee, ChartBar, BookOpen, Zap, Server, Activity, Cpu } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AgentCharacter from './AgentCharacter';
import { useLanguage } from '@/contexts/LanguageContext';

// Component for rendering desks and workstations
const Workstation = ({ x, y, width = 10, height = 6, rotation = 0, hasComputer = true, hasPerson = false, type = 'desk' }) => {
  const deskColors = {
    'desk': 'bg-gray-400 dark:bg-gray-700',
    'meeting': 'bg-amber-800 dark:bg-amber-900',
    'server': 'bg-slate-600 dark:bg-slate-800'
  };
  
  return (
    <div 
      className={`absolute ${deskColors[type]} rounded-sm`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${width}%`,
        height: `${height}%`,
        transform: `rotate(${rotation}deg)`,
        zIndex: 5
      }}
    >
      {hasComputer && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-1/2 bg-blue-900 dark:bg-blue-800 rounded-sm flex items-center justify-center">
          <div className="w-3/4 h-3/4 bg-cyan-300 dark:bg-cyan-400 opacity-70"></div>
        </div>
      )}
    </div>
  );
};

// Component for decorative elements
const DecorativeElement = ({ type, x, y, size = 3 }) => {
  const getElement = () => {
    switch(type) {
      case 'plant':
        return <div className="w-full h-full bg-green-700 dark:bg-green-800 rounded-full"></div>;
      case 'coffee':
        return <Coffee className="w-full h-full text-red-500" />;
      case 'monitor':
        return (
          <div className="w-full h-full bg-gray-800 rounded border border-gray-600 flex items-center justify-center p-1">
            <Activity className="w-2/3 h-2/3 text-cyan-400" />
          </div>
        );
      case 'server':
        return (
          <div className="w-full h-full bg-gray-800 rounded-sm border border-purple-500 flex flex-col gap-1 p-0.5">
            <div className="h-1/4 w-full bg-purple-500 opacity-70 rounded-sm"></div>
            <div className="h-1/4 w-full bg-cyan-500 opacity-70 rounded-sm"></div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div 
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}%`,
        height: `${size}%`,
        zIndex: 6
      }}
    >
      {getElement()}
    </div>
  );
};

const OfficeFloorPlan = () => {
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const { t, isRTL } = useLanguage();
  
  // Define office divisions with enhanced visual themes
  const divisions = [
    {
      id: 'research',
      name: t('researchDivision'),
      color: 'bg-cyan-500',
      icon: FileSearch,
      position: { x: 20, y: 30, width: 25, height: 30 },
      description: t('researchDesc'),
      agents: 6,
      tasks: 12,
      decoration: [
        { type: 'boards', x: 25, y: 35 },
        { type: 'desk', x: 22, y: 40 },
        { type: 'computer', x: 22, y: 38 },
        { type: 'chart', x: 35, y: 35 },
      ]
    },
    {
      id: 'development',
      name: t('developmentDivision'),
      color: 'bg-green-500',
      icon: Code,
      position: { x: 55, y: 30, width: 25, height: 30 },
      description: t('developmentDesc'),
      agents: 8,
      tasks: 15,
      decoration: [
        { type: 'computer', x: 60, y: 35 },
        { type: 'computer', x: 65, y: 35 },
        { type: 'server', x: 70, y: 40 },
        { type: 'desk', x: 60, y: 38 },
        { type: 'desk', x: 65, y: 38 },
      ]
    },
    {
      id: 'strategy',
      name: t('strategyDivision'),
      color: 'bg-purple-500',
      icon: BrainCog,
      position: { x: 20, y: 70, width: 25, height: 20 },
      description: t('strategyDesc'),
      agents: 4,
      tasks: 8,
      decoration: [
        { type: 'boards', x: 25, y: 75 },
        { type: 'desk', x: 30, y: 78 },
        { type: 'chart', x: 35, y: 75 },
      ]
    },
    {
      id: 'security',
      name: t('securityDivision'),
      color: 'bg-red-500',
      icon: Shield,
      position: { x: 55, y: 70, width: 25, height: 20 },
      description: t('securityDesc'),
      agents: 5,
      tasks: 10,
      decoration: [
        { type: 'server', x: 65, y: 75 },
        { type: 'computer', x: 60, y: 72 },
        { type: 'monitor', x: 70, y: 72 },
      ]
    },
  ];
  
  // Workstations - more visible desks matching the reference images
  const workstations = [
    // Research division workstations
    { x: 25, y: 35, width: 12, height: 5, type: 'desk' },
    { x: 25, y: 42, width: 12, height: 5, type: 'desk' },
    { x: 32, y: 49, width: 8, height: 5, type: 'desk', rotation: 90 },
    
    // Development division workstations
    { x: 60, y: 35, width: 12, height: 5, type: 'desk' },
    { x: 60, y: 42, width: 12, height: 5, type: 'desk' },
    { x: 67, y: 49, width: 8, height: 5, type: 'desk', rotation: 90 },
    
    // Strategy division - meeting table
    { x: 25, y: 75, width: 15, height: 8, type: 'meeting' },
    
    // Security division - server racks
    { x: 60, y: 75, width: 5, height: 8, type: 'server' },
    { x: 67, y: 75, width: 5, height: 8, type: 'server' },
  ];
  
  // Decorative elements
  const decorations = [
    { type: 'plant', x: 5, y: 10, size: 4 },
    { type: 'plant', x: 90, y: 10, size: 4 },
    { type: 'coffee', x: 7, y: 60, size: 3 },
    { type: 'monitor', x: 48, y: 15, size: 4 },
    { type: 'server', x: 90, y: 75, size: 5 },
    { type: 'monitor', x: 15, y: 35, size:.3 },
    { type: 'monitor', x: 15, y: 40, size: 3 },
    { type: 'monitor', x: 82, y: 35, size: 3 },
    { type: 'monitor', x: 82, y: 40, size: 3 },
  ];
  
  // Define agents with more varied positions around workstations
  const agents = [
    {
      id: 1,
      name: 'Data Analyst',
      role: 'Data Analysis',
      status: 'working' as const,
      icon: Database,
      division: 'research',
      position: { x: 27, y: 33 }, // Positioned at workstation
      route: [
        { division: 'research', x: 27, y: 33 },
        { division: 'research', x: 27, y: 42 },
        { division: 'development', x: 62, y: 33 },
      ]
    },
    {
      id: 2,
      name: 'Security Lead',
      role: 'Security',
      status: 'idle' as const,
      icon: Shield,
      division: 'security',
      position: { x: 58, y: 75 }, // Positioned at security console
      route: [
        { division: 'security', x: 58, y: 75 },
        { division: 'strategy', x: 30, y: 78 },
        { division: 'security', x: 65, y: 75 },
      ]
    },
    {
      id: 3,
      name: 'Senior Dev',
      role: 'Coding',
      status: 'working' as const,
      icon: Code,
      division: 'development',
      position: { x: 62, y: 40 }, // At dev workstation
      route: [
        { division: 'development', x: 62, y: 40 },
        { division: 'research', x: 30, y: 45 },
        { division: 'development', x: 62, y: 33 },
      ]
    },
    {
      id: 4,
      name: 'Research Lead',
      role: 'Data Mining',
      status: 'working' as const,
      icon: FileSearch,
      division: 'research',
      position: { x: 30, y: 45 }, // Near research boards
      route: [
        { division: 'research', x: 30, y: 45 },
        { division: 'development', x: 65, y: 40 },
        { division: 'security', x: 65, y: 75 },
        { division: 'research', x: 25, y: 35 },
      ]
    },
    {
      id: 5,
      name: 'Project Manager',
      role: 'Management',
      status: 'paused' as const,
      icon: User,
      division: 'strategy',
      position: { x: 25, y: 75 }, // At meeting table
      route: [
        { division: 'strategy', x: 25, y: 75 },
        { division: 'research', x: 25, y: 35 },
        { division: 'strategy', x: 30, y: 78 },
      ]
    },
    {
      id: 6,
      name: 'AI Engineer',
      role: 'Strategy',
      status: 'error' as const,
      icon: BrainCog,
      division: 'strategy',
      position: { x: 35, y: 75 }, // At strategy table
      route: [
        { division: 'strategy', x: 35, y: 75 },
        { division: 'security', x: 60, y: 75 },
        { division: 'development', x: 60, y: 35 },
        { division: 'strategy', x: 30, y: 78 },
      ]
    },
    {
      id: 7, 
      name: 'Backend Dev',
      role: 'Systems',
      status: 'working' as const,
      icon: Server,
      division: 'development',
      position: { x: 58, y: 33 }, // At first dev desk
      route: [
        { division: 'development', x: 58, y: 33 },
        { division: 'development', x: 67, y: 47 },
        { division: 'security', x: 58, y: 75 },
      ]
    },
    {
      id: 8,
      name: 'Hardware Specialist',
      role: 'Infrastructure',
      status: 'working' as const,
      icon: Cpu,
      division: 'security',
      position: { x: 66, y: 73 }, // Working on servers
      route: [
        { division: 'security', x: 66, y: 73 },
        { division: 'security', x: 58, y: 75 },
        { division: 'development', x: 67, y: 47 },
      ]
    }
  ];
  
  // Handle division selection
  const handleDivisionClick = (divisionId: string) => {
    setSelectedDivision(selectedDivision === divisionId ? null : divisionId);
  };
  
  // Render decoration items inside division
  const renderDecoration = (item: any, divisionColor: string) => {
    const getIcon = () => {
      switch (item.type) {
        case 'boards': return <ChartBar className="h-4 w-4 text-white" />;
        case 'computer': return <Monitor className="h-4 w-4 text-white" />;
        case 'chart': return <ChartBar className="h-4 w-4 text-white" />;
        case 'desk': return <div className="h-2 w-3 bg-gray-300 dark:bg-gray-600 rounded-sm"></div>;
        case 'server': return <Database className="h-4 w-4 text-white" />;
        case 'monitor': return <Monitor className="h-4 w-4 text-white" />;
        case 'coffee': return <Coffee className="h-4 w-4 text-white" />;
        case 'mainframe': return <Zap className="h-4 w-4 text-white" />;
        default: return null;
      }
    };
    
    return (
      <div 
        key={`${item.type}-${item.x}-${item.y}`}
        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
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
  
  // Filter agents by division
  const getAgentsInDivision = (divisionId: string) => {
    return agents.filter(agent => agent.division === divisionId);
  };
  
  return (
    <Card className="relative w-full h-[500px] overflow-hidden border-2 p-0 bg-gray-100 dark:bg-gray-900 scan-lines neon-border">
      {/* Office floor */}
      <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 cyber-grid">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: 'linear-gradient(to right, rgba(156, 163, 175, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(156, 163, 175, 0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />
        
        {/* Render divisions */}
        {divisions.map((division) => {
          const isSelected = selectedDivision === division.id;
          const agentsInDivision = getAgentsInDivision(division.id);
          const Icon = division.icon;
          
          return (
            <motion.div
              key={division.id}
              className={`absolute rounded-md ${division.color} bg-opacity-20 border-2 cursor-pointer transition-colors duration-200 scan-lines ${isSelected ? 'neon-border border-white' : `border-${division.color}`}`}
              style={{
                left: `${division.position.x}%`,
                top: `${division.position.y}%`,
                width: `${division.position.width}%`,
                height: `${division.position.height}%`,
                zIndex: isSelected ? 30 : 10
              }}
              onClick={() => handleDivisionClick(division.id)}
              whileHover={{ scale: 1.02 }}
              animate={isSelected ? { scale: 1.05 } : { scale: 1 }}
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
                  className="absolute inset-0 bg-black bg-opacity-70 rounded-md p-3 flex flex-col justify-between backdrop-blur-sm"
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
        })}
        
        {/* Render workstations */}
        {workstations.map((station, index) => (
          <Workstation
            key={`station-${index}`}
            x={station.x}
            y={station.y}
            width={station.width}
            height={station.height}
            rotation={station.rotation || 0}
            type={station.type}
          />
        ))}
        
        {/* Render decorative elements */}
        {decorations.map((item, index) => (
          <DecorativeElement
            key={`decor-${index}`}
            type={item.type}
            x={item.x}
            y={item.y}
            size={item.size}
          />
        ))}
        
        {/* Render agents */}
        {agents.map(agent => (
          <AgentCharacter 
            key={agent.id} 
            agent={agent}
            routePath={agent.route}
          />
        ))}
        
        {/* Decorative elements */}
        <div className="absolute top-2 left-2 p-1 bg-gray-300 dark:bg-gray-700 rounded text-xs neon-border">Floor Plan v2.0</div>
        <div className="absolute bottom-2 right-2 p-1 bg-gray-300 dark:bg-gray-700 rounded text-xs neon-border">Agency HQ</div>
        
        {/* Central server/mainframe */}
        <div className="absolute left-1/2 top-[15%] -translate-x-1/2 w-6 h-12 bg-blue-900 dark:bg-blue-800 rounded-sm border border-flow-accent/50 neon-border flex flex-col items-center justify-center gap-1 overflow-hidden">
          <div className="w-5 h-1 bg-flow-accent/80 animate-pulse-subtle rounded-sm"></div>
          <div className="w-5 h-1 bg-green-500/80 animate-pulse-subtle rounded-sm"></div>
          <div className="w-5 h-1 bg-purple-500/80 animate-pulse-subtle rounded-sm"></div>
          <Cpu className="w-4 h-4 text-flow-accent/90" />
        </div>
        
        {/* Floor markings */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-flow-accent/20 opacity-30"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-flow-accent/30 opacity-30"></div>
      </div>
    </Card>
  );
};

export default OfficeFloorPlan;
