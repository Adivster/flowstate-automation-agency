
import React from 'react';
import { PieChart } from '@/components/ui/chart';
import { InfoChip } from '@/components/ui/InfoChip';

type CustomerRetentionProps = {
  data: any;
  timeRange: string;
};

const CustomerRetention: React.FC<CustomerRetentionProps> = ({ data, timeRange }) => {
  // Sample data for customer segments
  const customerSegments = [
    { name: 'New Customers', value: 30, color: '#8884d8' },
    { name: 'Returning', value: 45, color: '#82ca9d' },
    { name: 'Loyal', value: 25, color: '#ffc658' }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium">Customer Retention</h3>
          <p className="text-xs text-flow-foreground/60">User satisfaction & retention metrics</p>
        </div>
        <InfoChip label="Satisfaction" />
      </div>
      
      <div className="flex-1 min-h-0">
        <PieChart 
          data={customerSegments} 
          height={210} 
          donut 
          showTooltip
          showLegend
          legendPosition="bottom"
        />
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="p-2 bg-flow-background/20 rounded-md">
          <p className="text-xs text-flow-foreground/60">Retention Rate</p>
          <p className="text-lg font-medium">76%</p>
        </div>
        <div className="p-2 bg-flow-background/20 rounded-md">
          <p className="text-xs text-flow-foreground/60">NPS Score</p>
          <p className="text-lg font-medium">68</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerRetention;
