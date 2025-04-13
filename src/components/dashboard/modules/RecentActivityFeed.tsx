
import React from 'react';
import { Card } from '@/components/ui/card';
import { History, ChevronRight, Zap, Brain, Wrench, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';

const RecentActivityFeed: React.FC = () => {
  // Mock data for activity feed
  const activities = [
    { 
      id: 1, 
      type: 'task', 
      icon: <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />, 
      title: 'Task completed', 
      details: 'Update knowledge base entries',
      time: '3 min ago',
      division: 'knowledge'
    },
    { 
      id: 2, 
      type: 'learning', 
      icon: <Brain className="h-3.5 w-3.5 text-indigo-400" />, 
      title: 'Learning session', 
      details: 'Agent absorbed 43 new data points',
      time: '12 min ago',
      division: 'analytics'
    },
    { 
      id: 3, 
      type: 'update', 
      icon: <Wrench className="h-3.5 w-3.5 text-orange-400" />, 
      title: 'System update', 
      details: 'Security patches applied',
      time: '1 hour ago',
      division: 'operations'
    },
    { 
      id: 4, 
      type: 'task', 
      icon: <Zap className="h-3.5 w-3.5 text-cyan-400" />, 
      title: 'Task started', 
      details: 'Generate quarterly predictions',
      time: '2 hours ago',
      division: 'strategy'
    },
    { 
      id: 5, 
      type: 'alert', 
      icon: <AlertCircle className="h-3.5 w-3.5 text-red-400" />, 
      title: 'System alert', 
      details: 'Unusual resource usage detected',
      time: '3 hours ago',
      division: 'operations'
    },
    { 
      id: 6, 
      type: 'task', 
      icon: <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />, 
      title: 'Task completed', 
      details: 'Content optimization',
      time: '4 hours ago',
      division: 'knowledge'
    },
  ];

  // Division colors
  const divisionColors = {
    knowledge: 'border-indigo-500/30',
    analytics: 'border-yellow-500/30',
    operations: 'border-purple-500/30',
    strategy: 'border-green-500/30',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: 'spring' } }
  };

  return (
    <Card className="p-4 border-flow-border/30 bg-black/30 backdrop-blur-md h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium neon-text-blue flex items-center">
          <History className="mr-2 h-5 w-5 text-blue-400" />
          Recent Activity
        </h3>
        <motion.div whileHover={{ x: 3 }} transition={{ type: 'spring', stiffness: 400 }}>
          <a href="#" className="text-xs text-flow-foreground/70 hover:text-flow-accent flex items-center">
            View All <ChevronRight className="ml-1 h-3 w-3" />
          </a>
        </motion.div>
      </div>
      
      <ScrollArea className="h-[280px] pr-4">
        <motion.div 
          className="space-y-2"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              className={`bg-black/20 rounded-md p-2.5 border-l-2 ${divisionColors[activity.division] || 'border-flow-border/30'} cursor-pointer hover:bg-black/30 transition-colors`}
              variants={itemVariants}
            >
              <div className="flex items-start gap-2">
                <div className="mt-0.5">
                  {activity.icon}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-medium text-flow-foreground">{activity.title}</span>
                    <span className="text-[10px] text-flow-foreground/50">{activity.time}</span>
                  </div>
                  <div className="text-xs text-flow-foreground/70 mt-0.5">{activity.details}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </ScrollArea>
    </Card>
  );
};

export default RecentActivityFeed;
