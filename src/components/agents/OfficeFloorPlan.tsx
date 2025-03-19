
import React from 'react';
import { motion } from 'framer-motion';
import { User, Database, FileSearch, Shield, Code, BookOpen, Briefcase, LayoutGrid } from 'lucide-react';
import { Card } from '@/components/ui/card';
import AgentCharacter from './AgentCharacter';

interface DivisionProps {
  name: string;
  color: string;
  icon: React.ReactNode;
  agents: number;
  x: number;
  y: number;
}

const Division: React.FC<DivisionProps> = ({ name, color, icon, agents, x, y }) => {
  return (
    <motion.div 
      className="absolute rounded-lg border-2 border-dashed"
      style={{ 
        left: `${x}%`, 
        top: `${y}%`, 
        width: '22%', 
        height: '28%',
        borderColor: color,
        backgroundColor: `${color}10`,
      }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="p-3 h-full flex flex-col">
        <div className="flex items-center mb-2">
          <div className={`p-1.5 rounded bg-${color.replace('#', '')}/10 mr-2`}>
            {icon}
          </div>
          <h3 className="text-xs font-bold">{name}</h3>
        </div>
        
        <div className="flex-1 flex items-end justify-end">
          <span className="text-xs bg-flow-muted px-2 py-1 rounded-full">
            {agents} agents
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const OfficeFloorPlan: React.FC = () => {
  const divisions = [
    { 
      name: 'Strategy', 
      color: '#3b82f6', // blue
      icon: <Briefcase className="h-3 w-3 text-blue-500" />,
      agents: 5,
      x: 10,
      y: 10
    },
    { 
      name: 'Development', 
      color: '#10b981', // green
      icon: <Code className="h-3 w-3 text-green-500" />,
      agents: 7,
      x: 40,
      y: 15
    },
    { 
      name: 'Research', 
      color: '#f59e0b', // amber
      icon: <FileSearch className="h-3 w-3 text-amber-500" />,
      agents: 4,
      x: 70,
      y: 10
    },
    { 
      name: 'Data', 
      color: '#6366f1', // indigo
      icon: <Database className="h-3 w-3 text-indigo-500" />,
      agents: 3,
      x: 15,
      y: 50
    },
    { 
      name: 'Compliance', 
      color: '#ef4444', // red
      icon: <Shield className="h-3 w-3 text-red-500" />,
      agents: 2,
      x: 45,
      y: 60
    },
    { 
      name: 'Knowledge', 
      color: '#8b5cf6', // purple
      icon: <BookOpen className="h-3 w-3 text-purple-500" />,
      agents: 3,
      x: 70,
      y: 55
    },
  ];

  // Data for agents that will move around the office
  const agents = [
    { 
      id: 1, 
      name: 'Data Analyst', 
      role: 'Research',
      status: 'working',
      icon: Database,
      division: 'Research',
      position: { x: 75, y: 15 }
    },
    { 
      id: 2, 
      name: 'Security Agent', 
      role: 'Compliance',
      status: 'idle',
      icon: Shield,
      division: 'Compliance',
      position: { x: 48, y: 65 }
    },
    { 
      id: 3, 
      name: 'Research Agent', 
      role: 'Research',
      status: 'working',
      icon: FileSearch,
      division: 'Research',
      position: { x: 72, y: 20 }
    },
    { 
      id: 4, 
      name: 'Client Agent', 
      role: 'Strategy',
      status: 'paused',
      icon: User,
      division: 'Strategy',
      position: { x: 15, y: 15 }
    },
    { 
      id: 5, 
      name: 'Dev Lead', 
      role: 'Development',
      status: 'working',
      icon: Code,
      division: 'Development',
      position: { x: 42, y: 20 }
    },
    { 
      id: 6, 
      name: 'KB Curator', 
      role: 'Knowledge',
      status: 'idle',
      icon: BookOpen,
      division: 'Knowledge',
      position: { x: 72, y: 58 }
    },
  ];

  return (
    <Card className="w-full relative aspect-video border border-flow-border bg-flow-card/30 overflow-hidden">
      {/* Grid lines for the pixel-art feel */}
      <div className="absolute inset-0 grid grid-cols-20 grid-rows-10 opacity-10">
        {Array.from({ length: 200 }).map((_, i) => (
          <div key={i} className="border border-flow-border/10"></div>
        ))}
      </div>
      
      {/* Office divisions */}
      {divisions.map((division) => (
        <Division 
          key={division.name}
          name={division.name}
          color={division.color}
          icon={division.icon}
          agents={division.agents}
          x={division.x}
          y={division.y}
        />
      ))}
      
      {/* Agent characters */}
      {agents.map((agent) => (
        <AgentCharacter
          key={agent.id}
          agent={agent}
        />
      ))}
      
      {/* Office assets - furniture, walls, etc. */}
      {/* Main hallway */}
      <div className="absolute left-[35%] top-[42%] w-[30%] h-[3%] bg-flow-muted/30 rounded"></div>
      <div className="absolute left-[35%] top-[39%] w-[3%] h-[16%] bg-flow-muted/30 rounded"></div>
      <div className="absolute left-[62%] top-[39%] w-[3%] h-[16%] bg-flow-muted/30 rounded"></div>
      
      {/* Meeting table */}
      <div className="absolute left-[48%] top-[40%] w-[6%] h-[4%] bg-flow-muted/50 rounded-full"></div>
      
      {/* Server room */}
      <div className="absolute left-[20%] top-[65%] w-[8%] h-[10%] border border-indigo-500/30 bg-indigo-500/5 rounded-md"></div>
      <div className="absolute left-[21%] top-[67%] w-[2%] h-[6%] bg-indigo-500/20 rounded-sm"></div>
      <div className="absolute left-[24%] top-[67%] w-[2%] h-[6%] bg-indigo-500/20 rounded-sm"></div>
    </Card>
  );
};

export default OfficeFloorPlan;
