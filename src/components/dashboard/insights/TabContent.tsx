
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import SystemStatusModule from '../modules/SystemStatusModule';
import AIInsightsPanel from '../modules/AIInsightsPanel';
import PerformanceMap from '../modules/PerformanceMap';
import DivisionOverview from '../modules/DivisionOverview';
import AgentEvolutionMap from '../modules/AgentEvolutionMap';
import RecentActivityFeed from '../modules/RecentActivityFeed';
import TaskFeed from '../modules/TaskFeed';
import GlobalMeshStatus from '../modules/GlobalMeshStatus';
import DivisionsTab from '../tabs/DivisionsTab';
import AgentsTab from '../tabs/AgentsTab';
import SystemTab from '../tabs/SystemTab';

interface TabContentProps {
  systemHealth: number;
  searchTerm?: string;
  dateRange?: 'day' | 'week' | 'month' | 'year';
  hasAnomalyAlert?: boolean;
  anomalyData?: any;
}

const TabContent: React.FC<TabContentProps> = ({ 
  systemHealth,
  searchTerm,
  dateRange,
  hasAnomalyAlert,
  anomalyData
}) => {
  return (
    <>
      <TabsContent value="mission-control">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <SystemStatusModule systemHealth={systemHealth} />
          <AIInsightsPanel />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="lg:col-span-1">
            <PerformanceMap />
          </div>
          
          <div className="lg:col-span-1">
            <DivisionOverview />
          </div>
          
          <div className="lg:col-span-1">
            <AgentEvolutionMap />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="lg:col-span-1">
            <RecentActivityFeed />
          </div>
          
          <div className="lg:col-span-1">
            <TaskFeed />
          </div>
        </div>
        
        <div className="mt-4">
          <GlobalMeshStatus />
        </div>
      </TabsContent>
      
      <TabsContent value="divisions">
        <DivisionsTab />
      </TabsContent>
      
      <TabsContent value="agents">
        <AgentsTab />
      </TabsContent>
      
      <TabsContent value="system">
        <SystemTab />
      </TabsContent>
    </>
  );
};

export default TabContent;
