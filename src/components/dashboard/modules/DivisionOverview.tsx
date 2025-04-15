
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { LayoutGrid, ChevronRight, CheckCircle, AlertTriangle, XCircle, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { PieChart } from '@/components/ui/chart';
import { getDivisionColorScheme } from '@/utils/colorSystem';
import { useToast } from '@/hooks/use-toast';

const DivisionOverview: React.FC = () => {
  const { toast } = useToast();
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  
  // Mock data for divisions
  const divisions = [
    { id: 'kb', name: 'Knowledge Base', status: 'healthy', load: 42, trends: [40, 45, 42, 38, 42] },
    { id: 'analytics', name: 'Analytics', status: 'warning', load: 78, trends: [65, 70, 75, 78, 78] },
    { id: 'operations', name: 'Operations', status: 'healthy', load: 51, trends: [48, 50, 49, 52, 51] },
    { id: 'strategy', name: 'Strategy', status: 'error', load: 25, trends: [35, 30, 28, 26, 25] }
  ];

  const loadData = divisions.map(d => ({
    name: d.name,
    value: d.load,
    color: getDivisionColorScheme(d.id).primary
  }));

  const statusIcon = {
    healthy: <CheckCircle className="h-3 w-3 text-green-500" />,
    warning: <AlertTriangle className="h-3 w-3 text-yellow-500" />,
    error: <XCircle className="h-3 w-3 text-red-500" />
  };

  return (
    <Card className="p-4 border-flow-border/30 bg-black/30 backdrop-blur-md h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent flex items-center">
          <LayoutGrid className="mr-2 h-5 w-5 text-green-400" />
          Division Overview
        </h3>
        <motion.div whileHover={{ x: 3 }} transition={{ type: 'spring', stiffness: 400 }}>
          <button 
            onClick={() => {
              toast({
                title: "Division Map",
                description: "Opening detailed division map view..."
              });
            }}
            className="text-xs text-flow-foreground/70 hover:text-flow-accent flex items-center"
          >
            View Map <ChevronRight className="ml-1 h-3 w-3" />
          </button>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 grid grid-cols-2 gap-2">
          {divisions.map((division) => {
            const colorScheme = getDivisionColorScheme(division.id);
            return (
              <motion.div
                key={division.id}
                className="relative overflow-hidden bg-black/20 border rounded-md p-3 cursor-pointer"
                style={{ borderColor: `${colorScheme.border}50` }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: `0 0 8px ${colorScheme.glow}`
                }}
                onClick={() => setSelectedDivision(division.id === selectedDivision ? null : division.id)}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-medium" style={{ color: colorScheme.text }}>{division.name}</div>
                  {statusIcon[division.status]}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-grow">
                    <div className="w-full h-1 bg-flow-border/20 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full rounded-full" 
                        style={{ backgroundColor: colorScheme.primary }}
                        initial={{ width: '0%' }}
                        animate={{ width: `${division.load}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>
                  <div className="text-[10px] text-flow-foreground/60 w-8 text-right">{division.load}%</div>
                </div>
                
                {/* Mini sparkline */}
                <div className="h-6 mt-2">
                  <div className="flex items-end h-full gap-0.5">
                    {division.trends.map((value, i) => (
                      <motion.div
                        key={i}
                        className="flex-1"
                        style={{ 
                          backgroundColor: colorScheme.primary,
                          height: `${value}%`,
                          opacity: 0.5
                        }}
                        initial={{ height: 0 }}
                        animate={{ height: `${value}%` }}
                        transition={{ delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="text-2xl font-bold text-flow-foreground/20"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {Math.round(divisions.reduce((acc, div) => acc + div.load, 0) / divisions.length)}%
            </motion.div>
          </div>
          <PieChart 
            data={loadData}
            showLabel={false}
            showLegend={false}
            donut={true}
          />
        </div>
        
        <div className="space-y-1.5">
          {divisions.map(division => {
            const colorScheme = getDivisionColorScheme(division.id);
            return (
              <motion.div 
                key={division.id} 
                className="flex items-center gap-2 p-1.5 rounded-md hover:bg-flow-background/20 cursor-pointer"
                whileHover={{ x: 2 }}
              >
                <div 
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: colorScheme.primary }}
                />
                <span className="text-xs text-flow-foreground/70 flex-grow">{division.name}</span>
                <span className="text-[10px] text-flow-foreground/50">{division.load}%</span>
                <Share2 className="h-3 w-3 text-flow-foreground/30 hover:text-flow-accent" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default DivisionOverview;
