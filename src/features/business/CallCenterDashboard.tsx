
import React from 'react';
import {
  PhoneCall,
  UserSquare2,
  BarChart3,
  MessageSquare,
  Clock
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const MetricCard = ({ title, value, icon: Icon, trend }: {
  title: string;
  value: string;
  icon: React.ElementType;
  trend?: { value: string; positive: boolean };
}) => (
  <Card className="bg-flow-background/20 backdrop-blur-md border-flow-border">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">
        {title}
      </CardTitle>
      <Icon className="h-4 w-4 text-flow-accent" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {trend && (
        <p className={`text-xs ${trend.positive ? 'text-green-500' : 'text-red-500'}`}>
          {trend.value}
        </p>
      )}
    </CardContent>
  </Card>
);

const CallCenterDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <MetricCard
          title="Active Calls"
          value="24"
          icon={PhoneCall}
          trend={{ value: "+12% from last hour", positive: true }}
        />
        <MetricCard
          title="Agents Online"
          value="18"
          icon={UserSquare2}
        />
        <MetricCard
          title="Avg. Wait Time"
          value="2m 34s"
          icon={Clock}
          trend={{ value: "-30s from yesterday", positive: true }}
        />
        <MetricCard
          title="Resolution Rate"
          value="92%"
          icon={MessageSquare}
          trend={{ value: "+5% from last week", positive: true }}
        />
        <MetricCard
          title="Total Calls Today"
          value="487"
          icon={BarChart3}
        />
      </div>

      <Card className="bg-flow-background/20 backdrop-blur-md border-flow-border">
        <CardHeader>
          <CardTitle>Real-time Queue Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center text-muted-foreground">
            Queue visualization coming soon
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CallCenterDashboard;
