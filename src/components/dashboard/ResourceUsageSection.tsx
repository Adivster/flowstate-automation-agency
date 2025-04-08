
import React, { useState } from 'react';
import { BarChart, ChevronDown } from 'lucide-react';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PieChart } from '@/components/ui/chart';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const ResourceUsageSection: React.FC = () => {
  const [isResourcesOpen, setIsResourcesOpen] = useState(true);

  return (
    <Collapsible
      open={isResourcesOpen}
      onOpenChange={setIsResourcesOpen}
      className="w-full"
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost" 
          className="flex items-center justify-between w-full text-left p-2 rounded-lg border border-flow-border/20 bg-flow-background/30 mt-2"
        >
          <div className="flex items-center">
            <BarChart className="h-4 w-4 mr-2 text-flow-accent" />
            <span className="text-md font-medium">Resource Usage & Analytics</span>
          </div>
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isResourcesOpen ? 'transform rotate-180' : ''}`} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlassMorphism className="p-4 rounded-xl bg-flow-background/20 hover:bg-flow-background/30 transition-all duration-300">
            <h4 className="text-lg font-medium mb-3 flex items-center">
              <BarChart className="w-4 h-4 mr-2 text-flow-accent" />
              Division Resource Allocation
            </h4>
            <div className="h-[260px]">
              <PieChart 
                data={[
                  { name: 'Knowledge Base', value: 32, description: 'Content management and retrieval systems' },
                  { name: 'Marketing', value: 25, description: 'Campaign automation and analytics' },
                  { name: 'Operations', value: 20, description: 'Workflow optimization and task management' },
                  { name: 'Strategy', value: 15, description: 'Planning and market intelligence' },
                  { name: 'Support', value: 8, description: 'Customer ticketing and feedback analysis' },
                ]} 
                donut={true} 
                gradient={true}
                interactive={true}
                colors={['#6366f1', '#f97316', '#0ea5e9', '#8b5cf6', '#22c55e']}
              />
            </div>
            <div className="text-right mt-2">
              <Link to="/analytics">
                <Button variant="link" size="sm" className="text-flow-accent hover:text-flow-accent/80 text-xs p-0 h-auto">
                  View detailed analytics <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </div>
          </GlassMorphism>
          <GlassMorphism className="p-4 rounded-xl bg-flow-background/20 hover:bg-flow-background/30 transition-all duration-300">
            <h4 className="text-lg font-medium mb-3 flex items-center">
              <BarChart className="w-4 h-4 mr-2 text-flow-accent" />
              Key Performance Indicators
            </h4>
            <div className="space-y-3">
              {['Workflow Efficiency', 'Agent Productivity', 'Task Completion Rate', 'System Reliability'].map((metric, index) => (
                <div key={index} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span>{metric}</span>
                    <span className="font-mono">{75 + index * 5}%</span>
                  </div>
                  <div className="w-full bg-flow-muted/20 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-2 rounded-full transition-all duration-500 animate-pulse-subtle"
                      style={{ 
                        width: `${75 + index * 5}%`,
                        background: `linear-gradient(90deg, #8b5cf670, ${['#6366f1', '#f97316', '#0ea5e9', '#8b5cf6'][index % 4]})`,
                        boxShadow: `0 0 8px ${['#6366f1', '#f97316', '#0ea5e9', '#8b5cf6'][index % 4]}`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="text-right mt-4">
              <Link to="/analytics">
                <Button variant="link" size="sm" className="text-flow-accent hover:text-flow-accent/80 text-xs p-0 h-auto">
                  View performance details <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </div>
          </GlassMorphism>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ResourceUsageSection;
