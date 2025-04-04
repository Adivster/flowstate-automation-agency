
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, Shield, Zap, Trophy, BarChart2, Database, Server, Brain } from 'lucide-react';
import GlassMorphism from '@/components/ui/GlassMorphism';
import { useLanguage } from '@/contexts/LanguageContext';

const AgencyMetrics: React.FC = () => {
  const { t } = useLanguage();
  
  // Sample achievement data with enhanced descriptions
  const achievements = [
    { 
      name: "First Workflow", 
      description: "Created and deployed a complete AI workflow",
      completed: true, 
      icon: <Zap className="h-4 w-4" />,
      color: "#f97316"
    },
    { 
      name: "Agent Squad", 
      description: "Connected 5+ agents in a single division",
      completed: true, 
      icon: <Shield className="h-4 w-4" />,
      color: "#0ea5e9"
    },
    { 
      name: "System Master", 
      description: "Optimized system performance to 95%+",
      completed: false, 
      icon: <Cpu className="h-4 w-4" />,
      color: "#8b5cf6"
    },
    { 
      name: "Knowledge Guru", 
      description: "Integrated 10+ knowledge sources",
      completed: false, 
      icon: <Brain className="h-4 w-4" />,
      color: "#22c55e"
    },
  ];
  
  // Enhanced system stats with more descriptive names
  const systemStats = [
    { name: "Neural Processing", icon: <Cpu className="h-4 w-4 text-cyan-400" />, value: 42, maxValue: 100, color: "cyan" },
    { name: "Memory Matrix", icon: <Database className="h-4 w-4 text-amber-400" />, value: 68, maxValue: 100, color: "amber" },
    { name: "API Bandwidth", icon: <Server className="h-4 w-4 text-purple-400" />, value: 3250, maxValue: 5000, color: "purple" },
    { name: "Task Throughput", icon: <BarChart2 className="h-4 w-4 text-green-400" />, value: 12, maxValue: 50, color: "green" },
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <GlassMorphism intensity="medium" className="rounded-xl overflow-hidden backdrop-blur-md border-flow-accent/30 animate-glow-pulse">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-cyber flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-amber-500" />
            <span className="neon-text-orange">{t('agencyAchievements')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.name}
                className={`rounded-lg p-3 backdrop-blur-sm ${
                  achievement.completed 
                    ? 'border border-flow-accent/50 bg-flow-accent/10' 
                    : 'border border-flow-border/50 bg-flow-muted/10 opacity-60'
                }`}
                style={{
                  boxShadow: achievement.completed ? `0 0 15px ${achievement.color}30` : 'none',
                  borderColor: achievement.completed ? achievement.color : 'transparent'
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="flex items-start">
                  <div className={`rounded-full p-2 mr-3 ${
                    achievement.completed ? `bg-${achievement.color}/20` : 'bg-flow-muted/30'
                  }`}
                  style={{ backgroundColor: achievement.completed ? `${achievement.color}20` : '' }}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium mb-1">
                      {achievement.name}
                    </div>
                    <div className="text-xs text-flow-foreground/70">
                      {achievement.description}
                    </div>
                  </div>
                  {achievement.completed && (
                    <div className="ml-auto">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.2, type: 'spring' }}
                        className="text-lg animate-pulse-subtle"
                      >
                        ⭐
                      </motion.div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </GlassMorphism>
      
      <GlassMorphism intensity="medium" className="rounded-xl overflow-hidden backdrop-blur-md border-flow-accent/30 animate-glow-pulse">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-cyber flex items-center">
            <Cpu className="h-5 w-5 mr-2 text-blue-500" />
            <span className="neon-text-blue">{t('systemStatus')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {systemStats.map((stat, index) => (
            <motion.div 
              key={stat.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.15 }}
            >
              <div className="flex justify-between items-center mb-1.5">
                <div className="text-sm font-medium flex items-center">
                  {stat.icon}
                  <span className="ml-2">{stat.name}</span>
                </div>
                <div className="text-xs font-mono px-2 py-0.5 bg-flow-background/30 rounded-md border border-flow-border/50">
                  {stat.value} / {stat.maxValue}
                </div>
              </div>
              
              {/* Enhanced cyberpunk pixelated health bar */}
              <div className="h-5 bg-flow-muted/30 rounded-md overflow-hidden border border-flow-border relative backdrop-blur-sm scan-lines">
                {/* Background grid for pixel effect */}
                <div className="absolute inset-0 grid grid-cols-20 grid-rows-1 pointer-events-none">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="border-r border-flow-border/10 h-full"></div>
                  ))}
                </div>
                
                {/* Actual progress with neon glow */}
                <motion.div 
                  className={`h-full`}
                  style={{ 
                    width: '0%',
                    background: `linear-gradient(90deg, ${stat.color === 'amber' ? '#f59e0b40' : stat.color === 'cyan' ? '#22d3ee40' : stat.color === 'purple' ? '#8b5cf640' : '#22c55e40'}, ${stat.color === 'amber' ? '#f59e0b' : stat.color === 'cyan' ? '#22d3ee' : stat.color === 'purple' ? '#8b5cf6' : '#22c55e'})`,
                    boxShadow: `0 0 10px ${stat.color === 'amber' ? '#f59e0b' : stat.color === 'cyan' ? '#22d3ee' : stat.color === 'purple' ? '#8b5cf6' : '#22c55e'}50`
                  }}
                  animate={{ width: `${(stat.value / stat.maxValue) * 100}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 + index * 0.1 }}
                />
                
                {/* Individual segments for more cyberpunk style */}
                <div className="absolute inset-0 flex pointer-events-none">
                  {Array.from({ length: 20 }).map((_, i) => {
                    const percentFilled = (stat.value / stat.maxValue) * 100;
                    const segmentPosition = (i + 1) * 5;
                    const isFilled = percentFilled >= segmentPosition;
                    
                    return (
                      <motion.div 
                        key={i}
                        className="h-full"
                        style={{ 
                          width: '5%',
                          opacity: 0,
                          background: isFilled ? (
                            segmentPosition > 80 ? 'rgba(239, 68, 68, 0.6)' : 
                            segmentPosition > 60 ? 'rgba(245, 158, 11, 0.6)' : 
                            'rgba(34, 197, 94, 0.6)'
                          ) : 'transparent'
                        }}
                        animate={{ opacity: isFilled ? 1 : 0 }}
                        transition={{ duration: 0.2, delay: 1 + (i * 0.05) }}
                      />
                    );
                  })}
                </div>
                
                {/* Digital pulse overlay */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <motion.div 
                    className="absolute inset-0 opacity-20"
                    animate={{ 
                      backgroundPosition: ['0% 0%', '100% 100%']
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'linear'
                    }}
                    style={{
                      backgroundImage: `linear-gradient(90deg, transparent, ${stat.color === 'amber' ? '#f59e0b' : stat.color === 'cyan' ? '#22d3ee' : stat.color === 'purple' ? '#8b5cf6' : '#22c55e'}40, transparent)`,
                      backgroundSize: '200% 100%'
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </GlassMorphism>
      
      {/* Additional cyberpunk system visualization */}
      <GlassMorphism intensity="medium" className="rounded-xl overflow-hidden backdrop-blur-md border-flow-accent/30 animate-glow-pulse col-span-1 md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-cyber flex items-center">
            <Server className="h-5 w-5 mr-2 text-indigo-400" />
            <span className="neon-text-blue">Network Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div 
              className="bg-flow-background/20 rounded-lg border border-flow-border/50 p-4 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="font-medium text-sm">Data Throughput</div>
                <div className="text-xs font-mono text-flow-accent">874 MB/s</div>
              </div>
              <div className="h-[60px] circuit-background rounded relative overflow-hidden">
                {/* Animated data visualization */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-[2px] bg-flow-accent"
                    style={{ 
                      left: `${i * 20}%`,
                      top: `${30 + (i * 8)}%`,
                      width: '40%',
                      opacity: 0.7,
                    }}
                    animate={{
                      left: [`${i * 20}%`, '100%'],
                      opacity: [0.7, 0]
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.4,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  />
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-flow-background/20 rounded-lg border border-flow-border/50 p-4 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="font-medium text-sm">System Uptime</div>
                <div className="text-xs font-mono text-green-400">99.8%</div>
              </div>
              <div className="flex items-center justify-center h-[60px]">
                <div className="text-2xl font-mono animate-pulse-subtle neon-text-green">347:08:56</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-flow-background/20 rounded-lg border border-flow-border/50 p-4 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="font-medium text-sm">Active Connections</div>
                <div className="text-xs font-mono text-amber-400">42</div>
              </div>
              <div className="relative h-[60px] overflow-hidden">
                {/* Connection nodes visualization */}
                <svg width="100%" height="100%" viewBox="0 0 100 60" className="absolute inset-0">
                  <g>
                    {Array.from({ length: 8 }).map((_, i) => (
                      <motion.circle
                        key={i}
                        cx={15 + (i % 4) * 25}
                        cy={15 + Math.floor(i / 4) * 30}
                        r={3}
                        fill="rgba(245, 158, 11, 0.5)"
                        stroke="#f59e0b"
                        strokeWidth="1"
                        animate={{
                          r: [3, 4, 3],
                          opacity: [0.8, 1, 0.8]
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.2,
                          repeat: Infinity,
                          repeatType: 'reverse'
                        }}
                      />
                    ))}
                    {/* Connection lines */}
                    {Array.from({ length: 6 }).map((_, i) => (
                      <motion.line
                        key={`line-${i}`}
                        x1={15 + (i % 3) * 25}
                        y1={15 + Math.floor(i / 3) * 30}
                        x2={40 + (i % 3) * 25}
                        y2={15 + Math.floor(i / 3) * 30 + (i % 2 ? 30 : 0)}
                        stroke="#f59e0b"
                        strokeWidth="1"
                        strokeDasharray="3,3"
                        className="animated-path"
                      />
                    ))}
                  </g>
                </svg>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </GlassMorphism>
    </div>
  );
};

export default AgencyMetrics;
