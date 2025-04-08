
import React, { useState } from 'react';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Brain, Workflow, Database, Users, Network } from 'lucide-react';
import { motion } from 'framer-motion';

const InteractiveSystemDiagram: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  
  const systemNodes = [
    { id: 'agents', label: 'Agents', icon: <Users />, position: { x: '50%', y: '15%' }, color: 'blue' },
    { id: 'tasks', label: 'Tasks', icon: <Workflow />, position: { x: '80%', y: '50%' }, color: 'purple' },
    { id: 'knowledge', label: 'Knowledge', icon: <Database />, position: { x: '50%', y: '85%' }, color: 'green' },
    { id: 'core', label: 'AI Core', icon: <Brain />, position: { x: '20%', y: '50%' }, color: 'pink' },
  ];
  
  const connections = [
    { from: 'core', to: 'agents' },
    { from: 'core', to: 'tasks' },
    { from: 'core', to: 'knowledge' },
    { from: 'agents', to: 'tasks' },
    { from: 'knowledge', to: 'agents' },
    { from: 'tasks', to: 'knowledge' },
  ];
  
  const descriptions = {
    agents: 'AI agents perform specialized tasks across divisions',
    tasks: 'Tasks are assigned to agents and tracked to completion',
    knowledge: 'Knowledge base provides context for AI operations',
    core: 'Central AI system coordinates all operations',
  };

  return (
    <GlassMorphism className="p-6 rounded-xl bg-flow-background/20 backdrop-blur-lg relative h-[320px] overflow-hidden">
      <div className="mb-4 flex items-center">
        <Network className="h-5 w-5 mr-2 text-flow-accent" />
        <h3 className="text-lg font-medium">System Architecture</h3>
      </div>
      
      <div className="absolute inset-0 mt-12">
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          {connections.map((connection, index) => {
            const fromNode = systemNodes.find(node => node.id === connection.from);
            const toNode = systemNodes.find(node => node.id === connection.to);
            if (!fromNode || !toNode) return null;
            
            const isHighlighted = hoveredNode === connection.from || hoveredNode === connection.to;
            
            return (
              <motion.line
                key={`${connection.from}-${connection.to}`}
                x1={fromNode.position.x}
                y1={fromNode.position.y}
                x2={toNode.position.x}
                y2={toNode.position.y}
                stroke={isHighlighted ? `rgba(217, 70, 239, 0.8)` : `rgba(255, 255, 255, 0.15)`}
                strokeWidth={isHighlighted ? 2 : 1}
                strokeDasharray={isHighlighted ? "none" : "5,5"}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
              />
            );
          })}
        </svg>
        
        {/* Nodes */}
        {systemNodes.map((node) => {
          const isHovered = hoveredNode === node.id;
          const colorMap = {
            blue: 'bg-blue-500/70 shadow-blue-500/30',
            green: 'bg-green-500/70 shadow-green-500/30',
            purple: 'bg-purple-500/70 shadow-purple-500/30',
            pink: 'bg-pink-500/70 shadow-pink-500/30',
          };
          
          return (
            <motion.div
              key={node.id}
              className={`absolute flex flex-col items-center justify-center cursor-pointer transition-all`}
              style={{
                left: node.position.x,
                top: node.position.y,
                transform: 'translate(-50%, -50%)',
                zIndex: isHovered ? 3 : 2,
              }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className={`rounded-full p-3 text-white ${colorMap[node.color]} flex items-center justify-center`}
                animate={{
                  scale: isHovered ? 1.1 : 1,
                  boxShadow: isHovered ? `0 0 20px rgba(255, 255, 255, 0.3)` : '0 0 0px transparent'
                }}
              >
                <div className="h-7 w-7">{node.icon}</div>
              </motion.div>
              <div className="mt-2 text-center">
                <div className="text-xs font-medium">{node.label}</div>
                {isHovered && (
                  <motion.div
                    className="text-[10px] text-flow-foreground/70 max-w-20 text-center mt-1 bg-flow-background/80 backdrop-blur-sm rounded-md p-1"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {descriptions[node.id]}
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="absolute bottom-4 right-4 text-xs text-flow-foreground/60">
        Hover over elements to explore connections
      </div>
    </GlassMorphism>
  );
};

export default InteractiveSystemDiagram;
