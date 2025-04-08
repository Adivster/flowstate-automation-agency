
import React, { useState } from 'react';
import { 
  BookOpen, 
  BarChart, 
  LayoutGrid, 
  Shield, 
  DollarSign, 
  Users, 
  Share2, 
  MessagesSquare,
  TestTube,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OverviewTab from './tabs/OverviewTab';
import DivisionsTab from './tabs/DivisionsTab';
import AgentsTab from './tabs/AgentsTab';
import SystemTab from './tabs/SystemTab';
import WelcomeHeader from './WelcomeHeader';

const AgencyDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="p-4">
      <WelcomeHeader />
      
      <Tabs 
        defaultValue="overview" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="flex items-center justify-between mb-3">
          <TabsList className="bg-flow-background/30">
            <TabsTrigger value="overview" className="data-[state=active]:bg-flow-accent/20">Overview</TabsTrigger>
            <TabsTrigger value="divisions" className="data-[state=active]:bg-flow-accent/20">Divisions</TabsTrigger>
            <TabsTrigger value="agents" className="data-[state=active]:bg-flow-accent/20">Agents</TabsTrigger>
            <TabsTrigger value="system" className="data-[state=active]:bg-flow-accent/20">System</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="overview" className="space-y-4 mt-0">
          <OverviewTab />
        </TabsContent>
        
        <TabsContent value="divisions" className="mt-0">
          <DivisionsTab />
        </TabsContent>
        
        <TabsContent value="agents" className="mt-0">
          <AgentsTab />
        </TabsContent>
        
        <TabsContent value="system" className="mt-0">
          <SystemTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgencyDashboard;
