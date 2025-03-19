
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, FileSearch, User, Code, Shield, BrainCog } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AgentCharacter from './AgentCharacter';

const OfficeFloorPlan = () => {
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  
  // Define office divisions
  const divisions = [
    {
      id: 'research',
      name: 'Research Division',
      color: 'bg-blue-500',
      icon: FileSearch,
      position: { x: 20, y: 30, width: 25, height: 30 },
      description: 'Specialized in data collection and analysis',
      agents: 6,
      tasks: 12,
    },
    {
      id: 'development',
      name: 'Development Division',
      color: 'bg-green-500',
      icon: Code,
      position: { x: 55, y: 30, width: 25, height: 30 },
      description: 'Builds and deploys AI solutions',
      agents: 8,
      tasks: 15,
    },
    {
      id: 'strategy',
      name: 'Strategy Division',
      color: 'bg-amber-500',
      icon: BrainCog,
      position: { x: 20, y: 70, width: 25, height: 20 },
      description: 'Plans and coordinates agency efforts',
      agents: 4,
      tasks: 8,
    },
    {
      id: 'security',
      name: 'Security Division',
      color: 'bg-red-500',
      icon: Shield,
      position: { x: 55, y: 70, width: 25, height: 20 },
      description: 'Ensures data privacy and security compliance',
      agents: 5,
      tasks: 10,
    },
  ];
  
  // Define office furniture and decorations
  const furniture = [
    { id: 'desk1', type: 'desk', position: { x: 10, y: 45, width: 5, height: 3 } },
    { id: 'desk2', type: 'desk', position: { x: 85, y: 45, width: 5, height: 3 } },
    { id: 'plant1', type: 'plant', position: { x: 5, y: 10, width: 3, height: 3 } },
    { id: 'plant2', type: 'plant', position: { x: 90, y: 10, width: 3, height: 3 } },
    { id: 'server', type: 'server', position: { x: 90, y: 75, width: 5, height: 8 } },
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
      position: { x: 25, y: 35 }
    },
    {
      id: 2,
      name: 'Sec Agent',
      role: 'Security',
      status: 'idle' as const,
      icon: Shield,
      division: 'security',
      position: { x: 60, y: 75 }
    },
    {
      id: 3,
      name: 'Dev Agent',
      role: 'Coding',
      status: 'working' as const,
      icon: Code,
      division: 'development',
      position: { x: 65, y: 40 }
    },
    {
      id: 4,
      name: 'Researcher',
      role: 'Data Mining',
      status: 'working' as const,
      icon: FileSearch,
      division: 'research',
      position: { x: 30, y: 45 }
    },
    {
      id: 5,
      name: 'PM Agent',
      role: 'Management',
      status: 'paused' as const,
      icon: User,
      division: 'strategy',
      position: { x: 25, y: 75 }
    },
    {
      id: 6,
      name: 'AI Agent',
      role: 'Strategy',
      status: 'error' as const,
      icon: BrainCog,
      division: 'strategy',
      position: { x: 35, y: 80 }
    }
  ];
  
  // Get a division by id
  const getDivision = (id: string) => divisions.find(d => d.id === id);
  
  // Handle division selection
  const handleDivisionClick = (divisionId: string) => {
    setSelectedDivision(selectedDivision === divisionId ? null : divisionId);
  };
  
  // Render a piece of furniture
  const renderFurniture = (item: typeof furniture[0]) => {
    const { position, type } = item;
    
    const getColor = () => {
      switch (type) {
        case 'desk': return 'bg-gray-400';
        case 'plant': return 'bg-green-700';
        case 'server': return 'bg-gray-600';
        default: return 'bg-gray-500';
      }
    };
    
    return (
      <div 
        key={item.id}
        className={`absolute rounded-sm ${getColor()}`}
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          width: `${position.width}%`,
          height: `${position.height}%`,
          zIndex: 5
        }}
      />
    );
  };
  
  // Filter agents by division
  const getAgentsInDivision = (divisionId: string) => {
    return agents.filter(agent => agent.division === divisionId);
  };
  
  return (
    <Card className="relative w-full h-[500px] overflow-hidden border-2 p-0 bg-gray-100 dark:bg-gray-900">
      {/* Office floor */}
      <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: 'linear-gradient(to right, rgba(156, 163, 175, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(156, 163, 175, 0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />
        
        {/* Decorative elements */}
        <div className="absolute top-2 left-2 p-1 bg-gray-300 dark:bg-gray-700 rounded text-xs">Floor Plan v1.0</div>
        <div className="absolute bottom-2 right-2 p-1 bg-gray-300 dark:bg-gray-700 rounded text-xs">Agency HQ</div>
        
        {/* Render divisions */}
        {divisions.map((division) => {
          const isSelected = selectedDivision === division.id;
          const agentsInDivision = getAgentsInDivision(division.id);
          const Icon = division.icon;
          
          return (
            <motion.div
              key={division.id}
              className={`absolute rounded-md ${division.color} bg-opacity-20 border-2 cursor-pointer transition-colors duration-200 ${isSelected ? 'border-white' : `border-${division.color}`}`}
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
                <Icon className="h-4 w-4 mr-1 text-white" />
                <div className="text-xs font-semibold text-white">{division.name}</div>
              </div>
              
              <div className="absolute bottom-1 right-1 flex space-x-1">
                <Badge variant="outline" className="text-[0.6rem] py-0 px-1 bg-white/20">
                  {agentsInDivision.length} Agents
                </Badge>
              </div>
              
              {isSelected && (
                <motion.div 
                  className="absolute inset-0 bg-black bg-opacity-50 rounded-md p-3 flex flex-col justify-between"
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
                      <div className="text-white/70 text-[0.6rem]">Active Agents</div>
                    </div>
                    <div className="bg-white/10 rounded p-1 text-center">
                      <div className="text-white text-xs font-semibold">{division.tasks}</div>
                      <div className="text-white/70 text-[0.6rem]">Pending Tasks</div>
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
          <AgentCharacter key={agent.id} agent={agent} />
        ))}
      </div>
    </Card>
  );
};

export default OfficeFloorPlan;
