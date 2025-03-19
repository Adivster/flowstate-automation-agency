
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, FileSearch, User, Code, Shield, BrainCog, Monitor, Coffee, ChartBar, BookOpen, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AgentCharacter from './AgentCharacter';
import { useLanguage } from '@/contexts/LanguageContext';

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
  
  // Define office furniture and decorations with cyberpunk style
  const furniture = [
    { id: 'desk1', type: 'desk', position: { x: 10, y: 45, width: 5, height: 3 } },
    { id: 'desk2', type: 'desk', position: { x: 85, y: 45, width: 5, height: 3 } },
    { id: 'plant1', type: 'plant', position: { x: 5, y: 10, width: 3, height: 3 } },
    { id: 'plant2', type: 'plant', position: { x: 90, y: 10, width: 3, height: 3 } },
    { id: 'server', type: 'server', position: { x: 90, y: 75, width: 5, height: 8 } },
    { id: 'coffeeMachine', type: 'coffee', position: { x: 7, y: 60, width: 3, height: 3 } },
    { id: 'mainframe', type: 'mainframe', position: { x: 48, y: 10, width: 4, height: 10 } },
  ];
  
  // Define agents working in the office
  const agents = [
    {
      id: 1,
      name: 'Data Agent',
      role: 'Data Analysis',
      status: 'working' as const,
      icon: Database,
      division: 'research',
      position: { x: 25, y: 35 },
      route: [
        { division: 'research', x: 25, y: 35 },
        { division: 'development', x: 60, y: 35 },
        { division: 'research', x: 30, y: 45 },
      ]
    },
    {
      id: 2,
      name: 'Sec Agent',
      role: 'Security',
      status: 'idle' as const,
      icon: Shield,
      division: 'security',
      position: { x: 60, y: 75 },
      route: [
        { division: 'security', x: 60, y: 75 },
        { division: 'strategy', x: 30, y: 78 },
        { division: 'security', x: 65, y: 75 },
      ]
    },
    {
      id: 3,
      name: 'Dev Agent',
      role: 'Coding',
      status: 'working' as const,
      icon: Code,
      division: 'development',
      position: { x: 65, y: 40 },
      route: [
        { division: 'development', x: 65, y: 40 },
        { division: 'research', x: 30, y: 45 },
        { division: 'development', x: 60, y: 38 },
      ]
    },
    {
      id: 4,
      name: 'Researcher',
      role: 'Data Mining',
      status: 'working' as const,
      icon: FileSearch,
      division: 'research',
      position: { x: 30, y: 45 },
      route: [
        { division: 'research', x: 30, y: 45 },
        { division: 'development', x: 65, y: 40 },
        { division: 'security', x: 65, y: 75 },
        { division: 'research', x: 25, y: 35 },
      ]
    },
    {
      id: 5,
      name: 'PM Agent',
      role: 'Management',
      status: 'paused' as const,
      icon: User,
      division: 'strategy',
      position: { x: 25, y: 75 },
      route: [
        { division: 'strategy', x: 25, y: 75 },
        { division: 'research', x: 25, y: 35 },
        { division: 'strategy', x: 30, y: 78 },
      ]
    },
    {
      id: 6,
      name: 'AI Agent',
      role: 'Strategy',
      status: 'error' as const,
      icon: BrainCog,
      division: 'strategy',
      position: { x: 35, y: 80 },
      route: [
        { division: 'strategy', x: 35, y: 80 },
        { division: 'security', x: 60, y: 75 },
        { division: 'development', x: 60, y: 35 },
        { division: 'strategy', x: 30, y: 78 },
      ]
    }
  ];
  
  // Get a division by id
  const getDivision = (id: string) => divisions.find(d => d.id === id);
  
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
  
  // Render a piece of furniture
  const renderFurniture = (item: typeof furniture[0]) => {
    const { position, type } = item;
    
    const getColor = () => {
      switch (type) {
        case 'desk': return 'bg-gray-400 dark:bg-gray-700';
        case 'plant': return 'bg-green-700';
        case 'server': return 'bg-gray-600 dark:bg-gray-800 neon-border';
        case 'coffee': return 'bg-red-700 dark:bg-red-900';
        case 'mainframe': return 'bg-blue-800 dark:bg-blue-900 neon-border';
        default: return 'bg-gray-500';
      }
    };
    
    const renderFurnitureIcon = () => {
      switch (type) {
        case 'server': return <Database className="h-3 w-3 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />;
        case 'coffee': return <Coffee className="h-3 w-3 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />;
        case 'mainframe': return <Zap className="h-3 w-3 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />;
        default: return null;
      }
    };
    
    return (
      <div 
        key={item.id}
        className={`absolute rounded-sm ${getColor()} scan-lines`}
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          width: `${position.width}%`,
          height: `${position.height}%`,
          zIndex: 5
        }}
      >
        {renderFurnitureIcon()}
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
        
        {/* Decorative elements */}
        <div className="absolute top-2 left-2 p-1 bg-gray-300 dark:bg-gray-700 rounded text-xs neon-border">Floor Plan v2.0</div>
        <div className="absolute bottom-2 right-2 p-1 bg-gray-300 dark:bg-gray-700 rounded text-xs neon-border">Agency HQ</div>
        
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
              
              {/* Render division decoration items */}
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
        
        {/* Render furniture and decorations */}
        {furniture.map(item => renderFurniture(item))}
        
        {/* Render agents */}
        {agents.map(agent => (
          <AgentCharacter 
            key={agent.id} 
            agent={agent}
            routePath={agent.route}
          />
        ))}
      </div>
    </Card>
  );
};

export default OfficeFloorPlan;
