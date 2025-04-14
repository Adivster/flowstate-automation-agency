
import React from 'react';
import { AreaChart } from '@/components/ui/chart';
import { InfoChip } from '@/components/ui/InfoChip';

type PerformanceOverviewProps = {
  data: any;
  timeRange: string;
};

const PerformanceOverview: React.FC<PerformanceOverviewProps> = ({ data, timeRange }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium">Performance Overview</h3>
          <p className="text-xs text-flow-foreground/60">Website traffic & user engagement</p>
        </div>
        <InfoChip label="Website Traffic" />
      </div>
      
      <div className="flex-1 min-h-0">
        <AreaChart 
          data={data.websiteTraffic || []} 
          height={230}
          lineColor="#8884d8"
          showXAxis
          showYAxis
          showTooltip
          showGrid={false}
        />
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="p-2 bg-flow-background/20 rounded-md">
          <p className="text-xs text-flow-foreground/60">Avg. Time on Site</p>
          <p className="text-lg font-medium">4.2 min</p>
        </div>
        <div className="p-2 bg-flow-background/20 rounded-md">
          <p className="text-xs text-flow-foreground/60">Bounce Rate</p>
          <p className="text-lg font-medium">32%</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceOverview;
