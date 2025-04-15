
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Globe, ChevronRight, Server, Wifi, Shield, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const GlobalMeshStatus: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [pulsingNodes, setPulsingNodes] = useState<Record<number, boolean>>({});
  
  const nodes = [
    { id: 1, x: 400, y: 50, region: 'North America', status: 'online', latency: 32 },
    { id: 2, x: 250, y: 150, region: 'Europe', status: 'online', latency: 85 },
    { id: 3, x: 400, y: 250, region: 'Asia Pacific', status: 'warning', latency: 120 },
    { id: 4, x: 550, y: 150, region: 'South America', status: 'online', latency: 95 },
    { id: 5, x: 550, y: 350, region: 'Australia', status: 'online', latency: 150 },
    { id: 6, x: 250, y: 350, region: 'Africa', status: 'degraded', latency: 210 },
  ];
  
  const connections = [
    { from: 1, to: 2, traffic: 'high' },
    { from: 1, to: 3, traffic: 'medium' },
    { from: 1, to: 4, traffic: 'medium' },
    { from: 2, to: 3, traffic: 'low' },
    { from: 3, to: 5, traffic: 'medium' },
    { from: 2, to: 6, traffic: 'low' },
    { from: 4, to: 6, traffic: 'low' },
  ];
  
  // Add random pulsing to nodes 
  useEffect(() => {
    const interval = setInterval(() => {
      const randomNodeId = Math.floor(Math.random() * nodes.length) + 1;
      
      setPulsingNodes(prev => ({
        ...prev,
        [randomNodeId]: true
      }));
      
      setTimeout(() => {
        setPulsingNodes(prev => ({
          ...prev,
          [randomNodeId]: false
        }));
      }, 3000);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const getNodeColor = (status: string) => {
    switch(status) {
      case 'online': return { fill: 'rgb(34, 197, 94)', stroke: 'rgb(134, 239, 172)' };
      case 'warning': return { fill: 'rgb(234, 179, 8)', stroke: 'rgb(253, 224, 71)' };
      case 'degraded': return { fill: 'rgb(249, 115, 22)', stroke: 'rgb(253, 186, 116)' };
      case 'offline': return { fill: 'rgb(239, 68, 68)', stroke: 'rgb(252, 165, 165)' };
      default: return { fill: 'rgb(99, 102, 241)', stroke: 'rgb(165, 180, 252)' };
    }
  };
  
  const getConnectionStyle = (traffic: string) => {
    switch(traffic) {
      case 'high': return { stroke: 'rgba(99, 102, 241, 0.8)', width: 2, dasharray: '0' };
      case 'medium': return { stroke: 'rgba(99, 102, 241, 0.5)', width: 1.5, dasharray: '0' };
      case 'low': return { stroke: 'rgba(99, 102, 241, 0.3)', width: 1, dasharray: '5,5' };
      default: return { stroke: 'rgba(255, 255, 255, 0.2)', width: 1, dasharray: '5,5' };
    }
  };

  return (
    <Card className="p-4 border-flow-border/30 bg-black/30 backdrop-blur-md overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent flex items-center">
          <Globe className="mr-2 h-5 w-5 text-green-400" />
          Global Mesh Status
        </h3>
        <motion.div whileHover={{ x: 3 }} transition={{ type: 'spring', stiffness: 400 }}>
          <a href="/analytics/network" className="text-xs text-flow-foreground/70 hover:text-flow-accent flex items-center">
            View Network <ChevronRight className="ml-1 h-3 w-3" />
          </a>
        </motion.div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-black/20 border border-flow-border/20">
          <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
          <TabsTrigger value="topology" className="text-xs">Topology</TabsTrigger>
          <TabsTrigger value="alerts" className="text-xs">Alerts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 relative overflow-hidden h-[190px] border border-flow-border/20 rounded-lg bg-black/20">
              <div className="absolute inset-0">
                <svg width="100%" height="100%" viewBox="0 0 800 400" className="opacity-70">
                  {/* Draw connections between nodes */}
                  {connections.map((conn, i) => {
                    const from = nodes.find(n => n.id === conn.from);
                    const to = nodes.find(n => n.id === conn.to);
                    if (!from || !to) return null;
                    
                    const style = getConnectionStyle(conn.traffic);
                    const isHighlighted = selectedNode === conn.from || selectedNode === conn.to;
                    
                    return (
                      <g key={`conn-${i}`}>
                        <path 
                          d={`M${from.x} ${from.y} Q${(from.x + to.x) / 2} ${(from.y + to.y) / 2 - 30} ${to.x} ${to.y}`} 
                          fill="none" 
                          stroke={isHighlighted ? "rgba(99, 102, 241, 0.8)" : style.stroke} 
                          strokeWidth={isHighlighted ? style.width + 0.5 : style.width} 
                          strokeDasharray={style.dasharray}
                        />
                        <motion.circle 
                          cx="0" cy="0" r="3"
                          fill="#8b5cf6" 
                          opacity="0.8"
                          style={{ display: conn.traffic === 'high' ? 'block' : 'none' }}
                        >
                          <animateMotion
                            path={`M${from.x} ${from.y} Q${(from.x + to.x) / 2} ${(from.y + to.y) / 2 - 30} ${to.x} ${to.y}`}
                            dur={`${3 + Math.random() * 2}s`}
                            repeatCount="indefinite"
                          />
                        </motion.circle>
                      </g>
                    );
                  })}
                  
                  {/* Draw nodes */}
                  {nodes.map((node, i) => {
                    const color = getNodeColor(node.status);
                    const isPulsing = pulsingNodes[node.id] || false;
                    const isSelected = selectedNode === node.id;
                    
                    return (
                      <g key={`node-${i}`} onClick={() => setSelectedNode(isSelected ? null : node.id)} style={{cursor: 'pointer'}}>
                        <motion.circle
                          cx={node.x} cy={node.y} r={isSelected ? 8 : 7}
                          fill={color.fill}
                          stroke={color.stroke}
                          strokeWidth={isSelected ? 2 : 1}
                          animate={isPulsing ? {
                            r: [isSelected ? 8 : 7, isSelected ? 12 : 10, isSelected ? 8 : 7],
                            opacity: [1, 0.8, 1],
                          } : {}}
                          transition={{ duration: 2, repeat: isPulsing ? 2 : 0 }}
                        />
                        <text
                          x={node.x} y={node.y + 20}
                          textAnchor="middle"
                          fill="rgba(255,255,255,0.8)"
                          fontSize="12"
                          fontWeight={isSelected ? "bold" : "normal"}
                        >
                          {node.region}
                        </text>
                        {isSelected && (
                          <foreignObject x={node.x - 60} y={node.y - 60} width="120" height="40">
                            <div className="bg-black/80 p-1 rounded text-xs text-center border border-flow-border/30">
                              <div className="text-flow-accent font-medium">{node.region}</div>
                              <div className="flex justify-between text-[10px] mt-0.5">
                                <span>Status: {node.status}</span>
                                <span>Latency: {node.latency}ms</span>
                              </div>
                            </div>
                          </foreignObject>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
              
              <div className="absolute top-2 left-3 text-xs font-medium text-flow-foreground/80">Global Agent Network</div>
              
              <div className="absolute bottom-2 right-2 flex gap-1">
                <Badge variant="outline" className="h-5 text-[10px] bg-black/40 flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  Online
                </Badge>
                <Badge variant="outline" className="h-5 text-[10px] bg-black/40 flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  Warning
                </Badge>
                <Badge variant="outline" className="h-5 text-[10px] bg-black/40 flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  Degraded
                </Badge>
              </div>
            </div>
            
            <div className="bg-black/20 border border-flow-border/20 rounded-lg p-3">
              <div className="text-xs font-medium mb-2 text-flow-foreground/80 flex items-center">
                <Server className="h-3.5 w-3.5 mr-1.5 text-green-400" />
                Network Status
              </div>
              <div className="space-y-2">
                {[
                  { color: 'indigo', text: 'Mesh stability: 98%' },
                  { color: 'green', text: 'Active nodes: 24/24' },
                  { color: 'amber', text: '3 pending connections' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <motion.div 
                      className={`h-2 w-2 rounded-full bg-${item.color}-400`}
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.7, 1] 
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3 
                      }}
                    />
                    <span className="text-xs text-flow-foreground/70">{item.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-3 pt-2 border-t border-flow-border/10">
                <div className="text-xs font-medium mb-2 text-flow-foreground/80 flex items-center">
                  <Wifi className="h-3.5 w-3.5 mr-1.5 text-blue-400" />
                  Performance Metrics
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-black/30 p-2 rounded-md">
                    <div className="text-[10px] text-flow-foreground/60">Avg. Latency</div>
                    <div className="text-sm text-flow-foreground">82ms</div>
                  </div>
                  <div className="bg-black/30 p-2 rounded-md">
                    <div className="text-[10px] text-flow-foreground/60">Packet Loss</div>
                    <div className="text-sm text-flow-foreground">0.03%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="topology" className="mt-2">
          <div className="flex flex-col items-center justify-center h-40 text-flow-foreground/70 text-center">
            <p className="text-sm">Detailed network topology view</p>
            <p className="text-xs mt-1 text-flow-foreground/50">Click to expand and view detailed mesh connections</p>
            <Button variant="outline" className="mt-3 text-xs h-7">Open Topology Explorer</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="alerts" className="mt-2">
          <div className="space-y-2">
            <div className="bg-red-500/10 border border-red-500/30 p-2 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 text-red-400 mr-2" />
                <span className="text-sm font-medium text-red-400">High latency detected</span>
              </div>
              <p className="text-xs mt-1 text-flow-foreground/70">Africa region showing 210ms latency (threshold: 150ms)</p>
            </div>
            
            <div className="bg-amber-500/10 border border-amber-500/30 p-2 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 text-amber-400 mr-2" />
                <span className="text-sm font-medium text-amber-400">Connection stability issue</span>
              </div>
              <p className="text-xs mt-1 text-flow-foreground/70">Asia Pacific node experiencing intermittent packet loss</p>
            </div>
            
            <div className="mt-2 flex justify-end">
              <Button variant="ghost" size="sm" className="text-xs h-7">
                View All Alerts
                <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default GlobalMeshStatus;
