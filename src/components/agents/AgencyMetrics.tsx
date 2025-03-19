
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, Shield, Zap, Trophy } from 'lucide-react';

const AgencyMetrics: React.FC = () => {
  // Sample achievement data
  const achievements = [
    { name: "First Workflow", completed: true, icon: <Zap className="h-3 w-3" /> },
    { name: "Agent Squad", completed: true, icon: <Shield className="h-3 w-3" /> },
    { name: "System Master", completed: false, icon: <Cpu className="h-3 w-3" /> },
    { name: "Knowledge Guru", completed: false, icon: <Trophy className="h-3 w-3" /> },
  ];
  
  // System stats with pixel-art style health bars
  const systemStats = [
    { name: "CPU Load", value: 42, maxValue: 100 },
    { name: "Memory", value: 68, maxValue: 100 },
    { name: "API Credits", value: 3250, maxValue: 5000 },
    { name: "Task Queue", value: 12, maxValue: 50 },
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="border border-flow-border bg-flow-card/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-pixel flex items-center">
            <Trophy className="h-4 w-4 mr-2 text-amber-500" />
            Agency Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.name}
                className={`border rounded p-2 flex items-center ${
                  achievement.completed 
                    ? 'border-amber-500/50 bg-amber-500/10' 
                    : 'border-gray-500/30 bg-gray-500/5 opacity-60'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`rounded-full p-1 mr-2 ${
                  achievement.completed ? 'bg-amber-500/20' : 'bg-gray-500/20'
                }`}>
                  {achievement.icon}
                </div>
                <div className="text-xs">
                  {achievement.name}
                </div>
                {achievement.completed && (
                  <div className="ml-auto">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.2, type: 'spring' }}
                    >
                      ⭐
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="border border-flow-border bg-flow-card/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-pixel flex items-center">
            <Cpu className="h-4 w-4 mr-2 text-blue-500" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {systemStats.map((stat) => (
            <div key={stat.name}>
              <div className="flex justify-between items-center mb-1">
                <div className="text-xs">{stat.name}</div>
                <div className="text-xs font-mono">
                  {stat.value} / {stat.maxValue}
                </div>
              </div>
              
              {/* Pixelated health bar */}
              <div className="h-4 bg-flow-muted rounded-sm overflow-hidden border border-flow-border relative">
                {/* Background grid for pixel effect */}
                <div className="absolute inset-0 grid grid-cols-10 grid-rows-1 pointer-events-none">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="border-r border-flow-border/10 h-full"></div>
                  ))}
                </div>
                
                {/* Actual progress */}
                <motion.div 
                  className="h-full bg-flow-accent"
                  style={{ width: '0%' }}
                  animate={{ width: `${(stat.value / stat.maxValue) * 100}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
                
                {/* Color indicators */}
                {Array.from({ length: 10 }).map((_, i) => {
                  const percentFilled = (stat.value / stat.maxValue) * 100;
                  const segmentPosition = (i + 1) * 10;
                  const isFilled = percentFilled >= segmentPosition;
                  const colorClass = 
                    segmentPosition > 80 ? 'bg-red-500' : 
                    segmentPosition > 60 ? 'bg-amber-500' : 
                    'bg-green-500';
                  
                  return (
                    <div 
                      key={i}
                      className={`absolute top-0 bottom-0 w-[8%] ${isFilled ? colorClass : 'bg-transparent'} opacity-40`}
                      style={{ left: `${(i * 10) + 1}%` }}
                    ></div>
                  );
                })}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AgencyMetrics;
