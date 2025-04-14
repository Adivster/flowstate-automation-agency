
import React from 'react';
import { LineChart } from '@/components/ui/chart';
import { InfoChip } from '@/components/ui/InfoChip';
import { Users } from 'lucide-react';

type EngagementDashboardProps = {
  data: any;
  timeRange: string;
};

const EngagementDashboard: React.FC<EngagementDashboardProps> = ({ data, timeRange }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium">Engagement Dashboard</h3>
          <p className="text-xs text-flow-foreground/60">User activity & retention metrics</p>
        </div>
        <InfoChip icon={Users} label="Users" />
      </div>
      
      <div className="flex-1 min-h-0">
        <LineChart 
          data={data.userEngagement || []} 
          height={230} 
          lineColor="#1EAEDB"
          showXAxis
          showYAxis
          showTooltip
          showGrid={false}
        />
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="p-2 bg-flow-background/20 rounded-md">
          <p className="text-xs text-flow-foreground/60">Active Users</p>
          <p className="text-lg font-medium">1,249</p>
        </div>
        <div className="p-2 bg-flow-background/20 rounded-md">
          <p className="text-xs text-flow-foreground/60">Churn Rate</p>
          <p className="text-lg font-medium">4.3%</p>
        </div>
      </div>
    </div>
  );
};

export default EngagementDashboard;
