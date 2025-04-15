
import React from 'react';
import { SolarpunkPanel } from '@/components/ui/design-system/SolarpunkPanel';
import { Play, Pause, Settings, Users, ActivitySquare, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Mock data for workflows
const mockWorkflows = [
  {
    id: '1',
    name: 'Data Processing Pipeline',
    description: 'Automated data processing and analysis workflow',
    status: 'active',
    lastRun: '2h ago',
    nextRun: 'in 4h',
    steps: 8,
    agents: 3,
  },
  {
    id: '2',
    name: 'Content Generation',
    description: 'AI-powered content creation and optimization',
    status: 'paused',
    lastRun: '1d ago',
    nextRun: 'manual',
    steps: 5,
    agents: 2,
  },
  {
    id: '3',
    name: 'Market Analysis',
    description: 'Real-time market data analysis and reporting',
    status: 'active',
    lastRun: '30m ago',
    nextRun: 'in 1h',
    steps: 6,
    agents: 4,
  },
];

const WorkflowGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockWorkflows.map((workflow) => (
        <SolarpunkPanel
          key={workflow.id}
          interactive
          accentColor="orange"
          className="relative overflow-hidden hover:scale-102 transition-transform duration-300"
        >
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-400">
                {workflow.name}
              </h3>
              <Badge 
                variant={workflow.status === 'active' ? 'success' : 'warning'}
                className="capitalize"
              >
                {workflow.status}
              </Badge>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {workflow.description}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <ActivitySquare className="h-4 w-4" />
                  <span>Last run: {workflow.lastRun}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <Users className="h-4 w-4" />
                  <span>{workflow.agents} Agents</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <ArrowRight className="h-4 w-4" />
                  <span>Next: {workflow.nextRun}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <Settings className="h-4 w-4" />
                  <span>{workflow.steps} Steps</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              {workflow.status === 'active' ? (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1 bg-orange-500/10 border-orange-500/50 hover:bg-orange-500/20 text-orange-500 dark:text-orange-400"
                >
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1 bg-orange-500/10 border-orange-500/50 hover:bg-orange-500/20 text-orange-500 dark:text-orange-400"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start
                </Button>
              )}
              <Button 
                variant="outline" 
                size="sm"
                className="flex-1 bg-orange-500/10 border-orange-500/50 hover:bg-orange-500/20 text-orange-500 dark:text-orange-400"
              >
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
            </div>
          </div>
        </SolarpunkPanel>
      ))}
    </div>
  );
};

export default WorkflowGrid;
