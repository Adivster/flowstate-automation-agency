
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Network, ChevronRight, Info, Database, Code, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

const AgentEvolutionMap: React.FC = () => {
  const { toast } = useToast();
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'network' | 'timeline'>('network');
  const [selectedNodeHistory, setSelectedNodeHistory] = useState<any[]>([]);
  
  const nodes = [
    { id: 1, x: 50, y: 20, size: 12, label: 'Base Model', type: 'root', stats: { accuracy: 92, tasks: 450, evolution: 'v1.0' } },
    { id: 2, x: 30, y: 40, size: 10, label: 'KB Training', type: 'training', stats: { accuracy: 88, tasks: 320, evolution: 'v1.2' } },
    { id: 3, x: 70, y: 40, size: 10, label: 'Task Adaptation', type: 'training', stats: { accuracy: 85, tasks: 280, evolution: 'v1.1' } },
    { id: 4, x: 20, y: 60, size: 8, label: 'Specialist A', type: 'agent', stats: { accuracy: 95, tasks: 150, evolution: 'v1.3' } },
    { id: 5, x: 40, y: 60, size: 8, label: 'Specialist B', type: 'agent', stats: { accuracy: 91, tasks: 180, evolution: 'v1.2' } },
    { id: 6, x: 60, y: 60, size: 8, label: 'Specialist C', type: 'agent', stats: { accuracy: 89, tasks: 210, evolution: 'v1.2' } },
    { id: 7, x: 80, y: 60, size: 8, label: 'Specialist D', type: 'agent', stats: { accuracy: 87, tasks: 190, evolution: 'v1.1' } },
    { id: 8, x: 30, y: 80, size: 6, label: 'Task Agent', type: 'task', stats: { accuracy: 94, tasks: 120, evolution: 'v1.4' } },
    { id: 9, x: 70, y: 80, size: 6, label: 'Task Agent', type: 'task', stats: { accuracy: 92, tasks: 140, evolution: 'v1.3' } },
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
  
  // Evolution history data for nodes
  const evolutionHistory = {
    4: [
      { version: 'v1.0', date: '2025-03-01', accuracy: 85, improvement: null },
      { version: 'v1.1', date: '2025-03-15', accuracy: 89, improvement: '+4%' },
      { version: 'v1.2', date: '2025-03-30', accuracy: 92, improvement: '+3%' },
      { version: 'v1.3', date: '2025-04-10', accuracy: 95, improvement: '+3%' },
    ],
    5: [
      { version: 'v1.0', date: '2025-03-05', accuracy: 82, improvement: null },
      { version: 'v1.1', date: '2025-03-20', accuracy: 85, improvement: '+3%' },
      { version: 'v1.2', date: '2025-04-05', accuracy: 91, improvement: '+6%' },
    ],
    8: [
      { version: 'v1.0', date: '2025-03-10', accuracy: 81, improvement: null },
      { version: 'v1.1', date: '2025-03-18', accuracy: 85, improvement: '+4%' },
      { version: 'v1.2', date: '2025-03-25', accuracy: 88, improvement: '+3%' },
      { version: 'v1.3', date: '2025-04-02', accuracy: 91, improvement: '+3%' },
      { version: 'v1.4', date: '2025-04-12', accuracy: 94, improvement: '+3%' },
    ]
  };

  const nodeColors = {
    root: { bg: '#8b5cf6', border: '#a78bfa', shadow: 'rgba(139, 92, 246, 0.5)' },
    training: { bg: '#0ea5e9', border: '#7dd3fc', shadow: 'rgba(14, 165, 233, 0.5)' },
    agent: { bg: '#22c55e', border: '#86efac', shadow: 'rgba(34, 197, 94, 0.5)' },
    task: { bg: '#f97316', border: '#fdba74', shadow: 'rgba(249, 115, 22, 0.5)' },
  };
  
  const handleNodeClick = (nodeId: number) => {
    if (selectedNode === nodeId) {
      setSelectedNode(null);
      setSelectedNodeHistory([]);
    } else {
      setSelectedNode(nodeId);
      setSelectedNodeHistory(evolutionHistory[nodeId as keyof typeof evolutionHistory] || []);
    }
  };
  
  const handleAction = (action: string) => {
    toast({
      title: "Evolution Action",
      description: `Performing ${action}`,
      duration: 3000
    });
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
        
        <div className="flex items-center gap-2">
          <Tabs
            value={viewMode}
            onValueChange={(value) => setViewMode(value as 'network' | 'timeline')}
            className="border-0"
          >
            <TabsList className="h-7 p-0 bg-black/30">
              <TabsTrigger value="network" className="h-7 px-2 text-xs">Network</TabsTrigger>
              <TabsTrigger value="timeline" className="h-7 px-2 text-xs">Timeline</TabsTrigger>
            </TabsList>
          </Tabs>
          
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
      </div>
      
      <div className="h-[220px] relative">
        {viewMode === 'network' ? (
          <>
            <svg className="w-full h-full absolute top-0 left-0">
              {connections.map((conn, i) => {
                const from = nodes.find(n => n.id === conn.from);
                const to = nodes.find(n => n.id === conn.to);
                if (!from || !to) return null;
                
                const highlight = selectedNode === from.id || selectedNode === to.id;
                
                return (
                  <motion.path 
                    key={`conn-${i}`}
                    d={`M${from.x}% ${from.y}% L${to.x}% ${to.y}%`}
                    stroke={highlight ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.2)"}
                    strokeWidth={highlight ? "1.5" : "1"}
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
              const isSelected = selectedNode === node.id;
              
              return (
                <motion.div
                  key={node.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                  }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => handleNodeClick(node.id)}
                >
                  <motion.div
                    className="relative rounded-full flex items-center justify-center"
                    style={{
                      width: `${node.size * 3}px`,
                      height: `${node.size * 3}px`,
                      backgroundColor: color.bg,
                      border: `2px solid ${isSelected ? 'white' : color.border}`,
                      boxShadow: isSelected ? `0 0 20px ${color.shadow}` : `0 0 10px ${color.shadow}`,
                    }}
                    animate={{
                      boxShadow: isSelected 
                        ? [`0 0 20px ${color.shadow}`, `0 0 30px ${color.shadow}`, `0 0 20px ${color.shadow}`]
                        : [`0 0 10px ${color.shadow}`, `0 0 20px ${color.shadow}`, `0 0 10px ${color.shadow}`],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Info className="h-3 w-3 text-white/70" />
                  </motion.div>
                  
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black/90 rounded-lg p-2 border border-white/10 text-xs whitespace-nowrap z-10"
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
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-flow-foreground/70">Version:</span>
                            <span className="text-flow-accent">{node.stats.evolution}</span>
                          </div>
                        </div>
                        
                        {evolutionHistory[node.id as keyof typeof evolutionHistory] && (
                          <div className="mt-2 pt-1 border-t border-white/10 flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="p-0 h-6 text-[10px] text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAction('View History');
                              }}
                            >
                              History
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="p-0 h-6 text-[10px] text-green-400 hover:text-green-300 hover:bg-green-900/20"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAction('Optimize');
                              }}
                            >
                              Optimize
                            </Button>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </>
        ) : (
          <div className="h-full overflow-y-auto custom-scrollbar px-2">
            {selectedNode && selectedNodeHistory.length > 0 ? (
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-flow-accent/30"></div>
                {selectedNodeHistory.map((history, idx) => (
                  <div key={idx} className="ml-6 mb-4 relative">
                    <div className="absolute -left-6 w-4 h-4 rounded-full bg-flow-accent flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                    
                    <div className="bg-black/40 rounded-md p-2 border border-flow-border/20">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">{history.version}</span>
                        <span className="text-[10px] text-flow-foreground/70">{history.date}</span>
                      </div>
                      <div className="mt-1 grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-[10px] text-flow-foreground/60">Accuracy</p>
                          <p className="text-sm text-flow-accent">{history.accuracy}%</p>
                        </div>
                        {history.improvement && (
                          <div>
                            <p className="text-[10px] text-flow-foreground/60">Improvement</p>
                            <p className="text-sm text-green-400">{history.improvement}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-1 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 text-[10px] px-2 flex-1"
                          onClick={() => handleAction(`View ${history.version} details`)}
                        >
                          <Database className="h-3 w-3 mr-1" />
                          Details
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 text-[10px] px-2 flex-1"
                          onClick={() => handleAction(`Restore to ${history.version}`)}
                        >
                          <Cpu className="h-3 w-3 mr-1" />
                          Restore
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <p className="text-flow-foreground/70 text-sm">Select an agent node to view evolution timeline</p>
                <p className="text-flow-foreground/50 text-xs mt-1">Click on any agent node in the network view to see its evolution timeline</p>
              </div>
            )}
          </div>
        )}
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
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.3);
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.5);
        }
      `}</style>
    </Card>
  );
};

export default AgentEvolutionMap;
