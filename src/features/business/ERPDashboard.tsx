
import React from 'react';
import { 
  Database,
  Users,
  Boxes,
  FileSpreadsheet,
  Settings
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ERPModuleCard = ({ title, description, icon: Icon }: { 
  title: string; 
  description: string; 
  icon: React.ElementType;
}) => (
  <Card className="bg-flow-background/20 backdrop-blur-md border-flow-border">
    <CardHeader>
      <div className="flex items-center space-x-3">
        <Icon className="h-6 w-6 text-flow-accent" />
        <CardTitle className="text-lg">{title}</CardTitle>
      </div>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <Button variant="outline" className="w-full">
        Configure
      </Button>
    </CardContent>
  </Card>
);

const ERPDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ERPModuleCard
          title="Database Management"
          description="Configure and manage your enterprise databases"
          icon={Database}
        />
        <ERPModuleCard
          title="Human Resources"
          description="Employee management and payroll systems"
          icon={Users}
        />
        <ERPModuleCard
          title="Inventory Control"
          description="Track and manage enterprise inventory"
          icon={Boxes}
        />
        <ERPModuleCard
          title="Financial Reports"
          description="Generate and analyze financial reports"
          icon={FileSpreadsheet}
        />
        <ERPModuleCard
          title="System Settings"
          description="Configure ERP system parameters"
          icon={Settings}
        />
      </div>
    </div>
  );
};

export default ERPDashboard;
