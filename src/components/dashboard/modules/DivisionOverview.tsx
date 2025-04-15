import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { LayoutGrid, ChevronRight, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { PieChart } from '@/components/ui/chart';
import { getDivisionColorScheme } from '@/utils/colorSystem';

const DivisionOverview: React.FC = () => {
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  
  // Mock data for divisions
  const divisions = [
    { id: 'kb', name: 'Knowledge Base', status: 'healthy', load: 42 },
    { id: 'analytics', name: 'Analytics', status: 'warning', load: 78 },
    { id: 'operations', name: 'Operations', status: 'healthy', load: 51 },
    { id: 'strategy', name: 'Strategy', status: 'error', load: 25 }
  ];

  // Chart data for division load distribution
  const loadData = divisions.map(d => ({
    name: d.name,
    value: d.load,
    color: getDivisionColorScheme(d.id).primary
  }));

  // Status icon mapping
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
          <a href="#" className="text-xs text-flow-foreground/70 hover:text-flow-accent flex items-center">
            View Map <ChevronRight className="ml-1 h-3 w-3" />
          </a>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-4">
        {divisions.map((division) => {
          const colorScheme = getDivisionColorScheme(division.id);
          return (
            <motion.div
              key={division.id}
              className="bg-black/20 border rounded-md p-2 cursor-pointer"
              style={{ borderColor: `${colorScheme.border}50` }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: `0 0 8px ${colorScheme.glow}`
              }}
              onClick={() => setSelectedDivision(division.id === selectedDivision ? null : division.id)}
            >
              <div className="flex justify-between items-center">
                <div className="text-xs" style={{ color: colorScheme.text }}>{division.name}</div>
                {statusIcon[division.status]}
              </div>
              <div className="flex items-center mt-1.5">
                <div className="w-full h-1 bg-flow-border/20 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full rounded-full" 
                    style={{ 
                      backgroundColor: colorScheme.primary,
                      width: `${division.load}%`
                    }}
                    initial={{ width: '0%' }}
                    animate={{ width: `${division.load}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <div className="text-[10px] ml-2 text-flow-foreground/60 w-7 text-right">{division.load}%</div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <div className="h-36">
            <PieChart 
              data={loadData}
              showLabel={false}
              showLegend={false}
              donut={true}
            />
          </div>
          <div className="text-xs text-center text-flow-foreground/50 mt-2">
            Load Distribution
          </div>
        </div>
        
        <div className="col-span-1">
          <div className="space-y-2">
            {divisions.map(division => {
              const colorScheme = getDivisionColorScheme(division.id);
              return (
                <div key={division.id} className="flex items-center gap-2">
                  <div 
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: colorScheme.primary }}
                  />
                  <span className="text-xs text-flow-foreground/70">{division.name}</span>
                  <span className="text-xs text-flow-foreground/50 ml-auto">{division.load}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DivisionOverview;
