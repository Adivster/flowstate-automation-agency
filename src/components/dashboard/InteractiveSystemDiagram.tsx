
import React, { useState, useEffect } from 'react';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Brain, Workflow, Database, Users, Network, HelpCircle, Link as LinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const InteractiveSystemDiagram: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const { toast } = useToast();
  
  // System node definitions
  const systemNodes = [
    { 
      id: 'agents', 
      label: 'Agents', 
      icon: <Users />, 
      position: { x: '50%', y: '15%' }, 
      color: 'blue',
      link: '/agents' 
    },
    { 
      id: 'tasks', 
      label: 'Tasks', 
      icon: <Workflow />, 
      position: { x: '80%', y: '50%' }, 
      color: 'purple',
      link: '/tasks'
    },
    { 
      id: 'knowledge', 
      label: 'Knowledge', 
      icon: <Database />, 
      position: { x: '50%', y: '85%' }, 
      color: 'green',
      link: '/knowledge' 
    },
    { 
      id: 'core', 
      label: 'AI Core', 
      icon: <Brain />, 
      position: { x: '20%', y: '50%' }, 
      color: 'pink' 
    },
  ];
  
  // Connection definitions between nodes
  const connections = [
    { from: 'core', to: 'agents', active: false },
    { from: 'core', to: 'tasks', active: false },
    { from: 'core', to: 'knowledge', active: false },
    { from: 'agents', to: 'tasks', active: false },
    { from: 'knowledge', to: 'agents', active: false },
    { from: 'tasks', to: 'knowledge', active: false },
  ];

  // Node descriptions
  const descriptions = {
    agents: 'AI agents perform specialized tasks across divisions',
    tasks: 'Tasks are assigned to agents and tracked to completion',
    knowledge: 'Knowledge base provides context for AI operations',
    core: 'Central AI system coordinates all operations',
  };

  // Detailed info for each node when clicked
  const detailedInfo = {
    agents: {
      title: 'Agent Network',
      stats: [
        { label: 'Active Agents', value: '28' },
        { label: 'Agent Types', value: '7' },
        { label: 'Efficiency', value: '92%' }
      ],
      description: 'Your agent network consists of specialized AI assistants that perform tasks throughout your organization.'
    },
    tasks: {
      title: 'Task Management',
      stats: [
        { label: 'Active Tasks', value: '42' },
        { label: 'Completion Rate', value: '87%' },
        { label: 'Avg Turnaround', value: '1.8h' }
      ],
      description: 'Tasks are automatically assigned, prioritized and tracked through your workflow system.'
    },
    knowledge: {
      title: 'Knowledge Repository',
      stats: [
        { label: 'Total Documents', value: '1,240' },
        { label: 'Topics', value: '56' },
        { label: 'Retrieval Rate', value: '98%' }
      ],
      description: 'Your knowledge base contains the collective information used by your agent network.'
    },
    core: {
      title: 'AI Core System',
      stats: [
        { label: 'Model Version', value: '4.2.7' },
        { label: 'Uptime', value: '99.8%' },
        { label: 'Processing Units', value: '64' }
      ],
      description: 'The AI Core coordinates all agent activities and maintains system-wide intelligence.'
    }
  };

  // Set up pulse effect for data transmission simulation
  const [activeConnections, setActiveConnections] = useState<{[key: string]: boolean}>({});
  
  useEffect(() => {
    const interval = setInterval(() => {
      const randomConnection = connections[Math.floor(Math.random() * connections.length)];
      const connectionKey = `${randomConnection.from}-${randomConnection.to}`;
      
      setActiveConnections(prev => ({
        ...prev,
        [connectionKey]: true
      }));
      
      setTimeout(() => {
        setActiveConnections(prev => ({
          ...prev,
          [connectionKey]: false
        }));
      }, 800);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const handleNodeClick = (id: string) => {
    const node = systemNodes.find(node => node.id === id);
    
    if (activeNode === id) {
      setActiveNode(null);
      return;
    }
    
    setActiveNode(id);
    
    if (node && node.link) {
      toast({
        title: `${node.label} System`,
        description: `View detailed information about your ${node.label.toLowerCase()} system`,
        action: (
          <Link to={node.link}>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="bg-flow-accent/80 text-white px-3 py-1 rounded-md text-xs"
            >
              Go to {node.label}
            </motion.button>
          </Link>
        )
      });
    }
  };

  // Color map for nodes
  const colorMap = {
    blue: { bg: 'bg-blue-500/70', shadow: 'shadow-blue-500/30', border: 'border-blue-500/50', glow: '#3b82f6' },
    green: { bg: 'bg-green-500/70', shadow: 'shadow-green-500/30', border: 'border-green-500/50', glow: '#22c55e' },
    purple: { bg: 'bg-purple-500/70', shadow: 'shadow-purple-500/30', border: 'border-purple-500/50', glow: '#8b5cf6' },
    pink: { bg: 'bg-pink-500/70', shadow: 'shadow-pink-500/30', border: 'border-pink-500/50', glow: '#ec4899' },
  };

  return (
    <GlassMorphism className="p-6 rounded-xl bg-flow-background/20 backdrop-blur-lg relative h-[320px] overflow-hidden">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <Network className="h-5 w-5 mr-2 text-flow-accent" />
          <h3 className="text-lg font-medium">System Architecture</h3>
        </div>
        <div className="flex items-center">
          <HelpCircle className="h-4 w-4 mr-1 text-flow-foreground/60" />
          <span className="text-xs text-flow-foreground/60">Click nodes to explore</span>
        </div>
      </div>
      
      <div className="absolute inset-0 mt-12">
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          {connections.map((connection, index) => {
            const fromNode = systemNodes.find(node => node.id === connection.from);
            const toNode = systemNodes.find(node => node.id === connection.to);
            if (!fromNode || !toNode) return null;
            
            const isHighlighted = hoveredNode === connection.from || hoveredNode === connection.to || 
                                 activeNode === connection.from || activeNode === connection.to;
            const isActive = activeConnections[`${connection.from}-${connection.to}`];
            
            return (
              <g key={`${connection.from}-${connection.to}`}>
                <motion.line
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
                
                {isActive && (
                  <motion.circle
                    r={4}
                    fill="#D946EF"
                    filter="drop-shadow(0 0 4px #D946EF)"
                    initial={{
                      x: fromNode.position.x,
                      y: fromNode.position.y
                    }}
                    animate={{
                      x: toNode.position.x,
                      y: toNode.position.y,
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </g>
            );
          })}
        </svg>
        
        {/* Nodes */}
        {systemNodes.map((node) => {
          const isHovered = hoveredNode === node.id;
          const isActive = activeNode === node.id;
          const nodeColor = colorMap[node.color];
          
          return (
            <motion.div
              key={node.id}
              className={`absolute flex flex-col items-center justify-center cursor-pointer transition-all`}
              style={{
                left: node.position.x,
                top: node.position.y,
                transform: 'translate(-50%, -50%)',
                zIndex: isHovered || isActive ? 3 : 2,
              }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => handleNodeClick(node.id)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className={`rounded-full p-3 text-white ${nodeColor.bg} ${isActive ? 'ring-2 ring-offset-2 ring-offset-flow-background/10 ring-flow-accent' : ''} flex items-center justify-center`}
                animate={{
                  scale: isHovered || isActive ? 1.1 : 1,
                  boxShadow: isHovered || isActive ? `0 0 20px ${nodeColor.glow}` : '0 0 0px transparent'
                }}
              >
                <div className="h-7 w-7">{node.icon}</div>
              </motion.div>
              <div className="mt-2 text-center">
                <div className="text-xs font-medium">{node.label}</div>
                
                {(isHovered || isActive) && (
                  <motion.div
                    className="text-[10px] text-flow-foreground/70 max-w-24 text-center mt-1 bg-flow-background/80 backdrop-blur-sm rounded-md p-1"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {descriptions[node.id]}
                    
                    {node.link && (
                      <Link to={node.link} className="flex items-center justify-center mt-1 text-flow-accent text-[8px]">
                        <LinkIcon className="h-2 w-2 mr-0.5" />
                        View Details
                      </Link>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Details panel for selected node */}
      <AnimatePresence>
        {activeNode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 left-4 right-4 bg-flow-background/80 backdrop-blur-md rounded-lg p-3 border border-flow-border/30 z-10"
          >
            <div className="flex justify-between items-start">
              <h4 className="text-sm font-medium">
                {detailedInfo[activeNode].title}
              </h4>
              <button 
                onClick={() => setActiveNode(null)}
                className="text-flow-foreground/70 hover:text-flow-foreground"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mt-1.5 mb-2">
              {detailedInfo[activeNode].stats.map((stat, idx) => (
                <div key={idx} className="bg-flow-background/40 p-1.5 rounded text-center">
                  <div className="text-[10px] text-flow-foreground/70">{stat.label}</div>
                  <div className="text-xs font-mono font-medium">{stat.value}</div>
                </div>
              ))}
            </div>
            
            <p className="text-[10px] text-flow-foreground/80">
              {detailedInfo[activeNode].description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="absolute bottom-4 right-4 text-xs text-flow-foreground/60">
        {!activeNode && "Hover over elements to explore connections"}
      </div>
    </GlassMorphism>
  );
};

export default InteractiveSystemDiagram;
