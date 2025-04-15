
import React from 'react';
import { 
  Package,
  PackageSearch,
  PackageCheck,
  PackagePlus,
  Boxes,
  AlertCircle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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

const InventoryDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <MetricCard
          title="Total Items"
          value="2,847"
          icon={Package}
          trend={{ value: "+124 from last month", positive: true }}
        />
        <MetricCard
          title="Low Stock Items"
          value="43"
          icon={AlertCircle}
          trend={{ value: "-12 from last week", positive: true }}
        />
        <MetricCard
          title="Pending Orders"
          value="156"
          icon={PackageSearch}
        />
        <MetricCard
          title="Fulfilled Today"
          value="67"
          icon={PackageCheck}
          trend={{ value: "+15% from yesterday", positive: true }}
        />
        <MetricCard
          title="Storage Usage"
          value="78%"
          icon={Boxes}
          trend={{ value: "+5% from last month", positive: false }}
        />
      </div>

      <Card className="bg-flow-background/20 backdrop-blur-md border-flow-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Stock Updates</CardTitle>
          <Button variant="outline" size="sm" className="h-8">
            <PackagePlus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center text-muted-foreground">
            Stock management table coming soon
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryDashboard;
