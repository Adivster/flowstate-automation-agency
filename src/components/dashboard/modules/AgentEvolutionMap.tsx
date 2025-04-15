import React from 'react';
import { Card } from '@/components/ui/card';
import { Network, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AgentEvolutionMap: React.FC = () => {
  // Mock data for agent nodes
  const nodes = [
    { id: 1, x: 50, y: 20, size: 12, label: 'Base Model', type: 'root' },
    { id: 2, x: 30, y: 40, size: 10, label: 'KB Training', type: 'training' },
    { id: 3, x: 70, y: 40, size: 10, label: 'Task Adaptation', type: 'training' },
    { id: 4, x: 20, y: 60, size: 8, label: 'Specialist A', type: 'agent' },
    { id: 5, x: 40, y: 60, size: 8, label: 'Specialist B', type: 'agent' },
    { id: 6, x: 60, y: 60, size: 8, label: 'Specialist C', type: 'agent' },
    { id: 7, x: 80, y: 60, size: 8, label: 'Specialist D', type: 'agent' },
    { id: 8, x: 30, y: 80, size: 6, label: 'Task Agent', type: 'task' },
    { id: 9, x: 70, y: 80, size: 6, label: 'Task Agent', type: 'task' },
  ];

  // Define connections between nodes
  const connections = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
    { from: 3, to: 6 },
    { from: 3, to: 7 },
    { from: 4, to: 8 },
    { from: 6, to: 9 },
  ];

  // Node type colors
  const nodeColors = {
    root: { bg: '#8b5cf6', border: '#a78bfa' },
    training: { bg: '#0ea5e9', border: '#7dd3fc' },
    agent: { bg: '#22c55e', border: '#86efac' },
    task: { bg: '#f97316', border: '#fdba74' },
  };

  return (
    <Card className="p-4 border-flow-border/30 bg-black/30 backdrop-blur-md h-full relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/10" />
        <svg className="absolute inset-0" width="100%" height="100%">
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-indigo-500/20" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="flex justify-between items-center mb-4 relative">
        <h3 className="text-lg font-medium bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent flex items-center">
          <Network className="mr-2 h-5 w-5 text-blue-400" />
          Agent Evolution
        </h3>
        <motion.div whileHover={{ x: 3 }} transition={{ type: 'spring', stiffness: 400 }}>
          <a href="#" className="text-xs text-flow-foreground/70 hover:text-flow-accent flex items-center">
            View Details <ChevronRight className="ml-1 h-3 w-3" />
          </a>
        </motion.div>
      </div>
      
      <div className="h-[220px] relative">
        {/* Draw connections first so they appear behind the nodes */}
        <svg className="w-full h-full absolute top-0 left-0 pointer-events-none">
          {connections.map((conn, i) => {
            const from = nodes.find(n => n.id === conn.from);
            const to = nodes.find(n => n.id === conn.to);
            if (!from || !to) return null;
            
            return (
              <motion.path 
                key={`conn-${i}`}
                d={`M${from.x}% ${from.y}% L${to.x}% ${to.y}%`}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1"
                strokeDasharray="3,2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.2 + i * 0.1 }}
              />
            );
          })}
        </svg>
        
        {/* Draw nodes */}
        {nodes.map((node) => {
          const { bg, border } = nodeColors[node.type];
          return (
            <motion.div
              key={`node-${node.id}`}
              className="absolute rounded-full flex items-center justify-center cursor-pointer"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                width: `${node.size}px`,
                height: `${node.size}px`,
                backgroundColor: bg,
                border: `1px solid ${border}`,
                transform: 'translate(-50%, -50%)',
                boxShadow: `0 0 8px ${bg}80`
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', delay: 0.1 * node.id }}
              whileHover={{ scale: 1.2 }}
            >
              <div className="absolute whitespace-nowrap text-[9px] mt-5 text-center font-mono leading-tight">
                {node.label}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Enhanced legend with pulsing indicators */}
      <div className="flex justify-center gap-4 mt-4">
        {Object.entries(nodeColors).map(([type, { bg, border }]) => (
          <div key={type} className="flex items-center gap-1.5">
            <motion.div 
              className="h-2.5 w-2.5 rounded-full relative"
              style={{ backgroundColor: bg, border: `1px solid ${border}` }}
              animate={{ 
                boxShadow: [`0 0 4px ${bg}80`, `0 0 8px ${bg}80`, `0 0 4px ${bg}80`] 
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs text-flow-foreground/70 capitalize">{type}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AgentEvolutionMap;
