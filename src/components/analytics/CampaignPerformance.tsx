
import React from 'react';
import { BarChart } from '@/components/ui/chart';
import { InfoChip } from '@/components/ui/InfoChip';

type CampaignPerformanceProps = {
  data: any;
  timeRange: string;
};

const CampaignPerformance: React.FC<CampaignPerformanceProps> = ({ data, timeRange }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium">Campaign Performance</h3>
          <p className="text-xs text-flow-foreground/60">Impressions & conversions across channels</p>
        </div>
        <InfoChip label="Campaigns" />
      </div>
      
      <div className="flex-1 min-h-0">
        <BarChart 
          data={data.adCampaignPerformance || []} 
          height={230} 
          lineColor="#82ca9d"
          showXAxis
          showYAxis
          showTooltip
          showGrid={false}
        />
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="p-2 bg-flow-background/20 rounded-md">
          <p className="text-xs text-flow-foreground/60">CTR</p>
          <p className="text-lg font-medium">3.8%</p>
        </div>
        <div className="p-2 bg-flow-background/20 rounded-md">
          <p className="text-xs text-flow-foreground/60">ROAS</p>
          <p className="text-lg font-medium">2.4x</p>
        </div>
      </div>
    </div>
  );
};

export default CampaignPerformance;
