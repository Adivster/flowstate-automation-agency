
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Network, ChevronRight, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const AgentEvolutionMap: React.FC = () => {
  const { toast } = useToast();
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  
  const nodes = [
    { id: 1, x: 50, y: 20, size: 12, label: 'Base Model', type: 'root', stats: { accuracy: 92, tasks: 450 } },
    { id: 2, x: 30, y: 40, size: 10, label: 'KB Training', type: 'training', stats: { accuracy: 88, tasks: 320 } },
    { id: 3, x: 70, y: 40, size: 10, label: 'Task Adaptation', type: 'training', stats: { accuracy: 85, tasks: 280 } },
    { id: 4, x: 20, y: 60, size: 8, label: 'Specialist A', type: 'agent', stats: { accuracy: 95, tasks: 150 } },
    { id: 5, x: 40, y: 60, size: 8, label: 'Specialist B', type: 'agent', stats: { accuracy: 91, tasks: 180 } },
    { id: 6, x: 60, y: 60, size: 8, label: 'Specialist C', type: 'agent', stats: { accuracy: 89, tasks: 210 } },
    { id: 7, x: 80, y: 60, size: 8, label: 'Specialist D', type: 'agent', stats: { accuracy: 87, tasks: 190 } },
    { id: 8, x: 30, y: 80, size: 6, label: 'Task Agent', type: 'task', stats: { accuracy: 94, tasks: 120 } },
    { id: 9, x: 70, y: 80, size: 6, label: 'Task Agent', type: 'task', stats: { accuracy: 92, tasks: 140 } },
  ];

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

  const nodeColors = {
    root: { bg: '#8b5cf6', border: '#a78bfa', shadow: 'rgba(139, 92, 246, 0.5)' },
    training: { bg: '#0ea5e9', border: '#7dd3fc', shadow: 'rgba(14, 165, 233, 0.5)' },
    agent: { bg: '#22c55e', border: '#86efac', shadow: 'rgba(34, 197, 94, 0.5)' },
    task: { bg: '#f97316', border: '#fdba74', shadow: 'rgba(249, 115, 22, 0.5)' },
  };

  return (
    <Card className="p-4 border-flow-border/30 bg-black/30 backdrop-blur-md h-full relative overflow-hidden">
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
        <motion.button
          whileHover={{ x: 3 }}
          className="text-xs text-flow-foreground/70 hover:text-flow-accent flex items-center"
          onClick={() => {
            toast({
              title: "Agent Evolution Details",
              description: "Opening detailed evolution view..."
            });
          }}
        >
          View Details <ChevronRight className="ml-1 h-3 w-3" />
        </motion.button>
      </div>
      
      <div className="h-[220px] relative">
        <svg className="w-full h-full absolute top-0 left-0">
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
                strokeDasharray="4,4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: i * 0.2 }}
              />
            );
          })}
        </svg>

        {nodes.map((node) => {
          const color = nodeColors[node.type as keyof typeof nodeColors];
          
          return (
            <motion.div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
              }}
              whileHover={{ scale: 1.1 }}
              onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
            >
              <motion.div
                className="relative rounded-full flex items-center justify-center"
                style={{
                  width: `${node.size * 3}px`,
                  height: `${node.size * 3}px`,
                  backgroundColor: color.bg,
                  border: `2px solid ${color.border}`,
                  boxShadow: `0 0 10px ${color.shadow}`,
                }}
                animate={{
                  boxShadow: [
                    `0 0 10px ${color.shadow}`,
                    `0 0 20px ${color.shadow}`,
                    `0 0 10px ${color.shadow}`,
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Info className="h-3 w-3 text-white/70" />
              </motion.div>
              
              <AnimatePresence>
                {selectedNode === node.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black/90 rounded-lg p-2 border border-white/10 text-xs whitespace-nowrap"
                  >
                    <div className="font-medium mb-1">{node.label}</div>
                    <div className="text-[10px] space-y-0.5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-flow-foreground/70">Accuracy:</span>
                        <span className="text-flow-accent">{node.stats.accuracy}%</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-flow-foreground/70">Tasks:</span>
                        <span className="text-flow-accent">{node.stats.tasks}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-center gap-4 mt-4">
        {Object.entries(nodeColors).map(([type, color]) => (
          <div key={type} className="flex items-center text-xs">
            <div
              className="w-3 h-3 rounded-full mr-1.5"
              style={{ backgroundColor: color.bg, border: `2px solid ${color.border}` }}
            />
            <span className="text-flow-foreground/70 capitalize">{type}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AgentEvolutionMap;
