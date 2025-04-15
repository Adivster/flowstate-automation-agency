
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BadgeDollarSign, 
  ChevronDown, 
  Filter, 
  RefreshCw, 
  Database,
  PhoneCall,
  ShoppingCart, 
  FileSpreadsheet,
  LineChart,
  Briefcase,
  UserPlus
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ThemedBackground from '@/components/ui/ThemedBackground';
import PageHeader from '@/components/ui/design-system/PageHeader';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FinancialOverview from '@/features/business/FinancialOverview';
import CRMIntegration from '@/features/business/CRMIntegration';
import BudgetManagement from '@/features/business/BudgetManagement';
import ApiSynchronization from '@/features/business/ApiSynchronization';
import ERPDashboard from '@/features/business/ERPDashboard';
import CallCenterDashboard from '@/features/business/CallCenterDashboard';
import InventoryDashboard from '@/features/business/InventoryDashboard';
import { useLanguage } from '@/contexts/LanguageContext';

const Business = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('30d');
  const { t } = useLanguage();

  return (
    <ThemedBackground>
      <Helmet>
        <title>Business Intelligence | Agent HQ</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-20 pb-12">
        <div className="max-w-7xl mx-auto space-y-6">
          <PageHeader 
            title="Business"
            extendedTitle="Business Intelligence"
            description="Track financial performance, manage budgets, and optimize revenue channels."
            icon={<Briefcase className="h-12 w-12 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]" />}
            variant="business"
            glassEffect={true}
            actions={
              <div className="flex flex-wrap items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-amber-500/10 border-amber-500/50 hover:bg-amber-500/20 text-amber-500 dark:text-amber-400"
                  onClick={() => setActiveTab('budget')}
                >
                  <BadgeDollarSign className="h-4 w-4 mr-2" />
                  View Budget
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-amber-500/10 border-amber-500/50 hover:bg-amber-500/20 text-amber-500 dark:text-amber-400"
                >
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Revenue Report
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-amber-500/10 border-amber-500/50 hover:bg-amber-500/20 text-amber-500 dark:text-amber-400"
                >
                  <LineChart className="h-4 w-4 mr-2" />
                  Analyze ROI
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-amber-500/10 border-amber-500/50 hover:bg-amber-500/20 text-amber-500 dark:text-amber-400"
                  onClick={() => setActiveTab('crm')}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Manage CRM
                </Button>
                
                <Select defaultValue={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[140px] text-xs h-8 bg-flow-muted/30 border-flow-border/50">
                    <SelectValue placeholder="Time Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 Days</SelectItem>
                    <SelectItem value="30d">Last 30 Days</SelectItem>
                    <SelectItem value="90d">Last Quarter</SelectItem>
                    <SelectItem value="1y">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            }
          />
          
          <GlassMorphism className="border border-flow-border/30 rounded-2xl overflow-hidden hover-scale">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="p-6">
              <TabsList className="grid max-w-md grid-cols-7 mb-6 bg-flow-background/30 gap-1">
                <TabsTrigger value="overview" className="data-[state=active]:bg-flow-accent data-[state=active]:text-white">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="budget" className="data-[state=active]:bg-flow-accent data-[state=active]:text-white">
                  Budget
                </TabsTrigger>
                <TabsTrigger value="crm" className="data-[state=active]:bg-flow-accent data-[state=active]:text-white">
                  CRM
                </TabsTrigger>
                <TabsTrigger value="erp" className="data-[state=active]:bg-flow-accent data-[state=active]:text-white">
                  ERP
                </TabsTrigger>
                <TabsTrigger value="call-center" className="data-[state=active]:bg-flow-accent data-[state=active]:text-white">
                  Call Center
                </TabsTrigger>
                <TabsTrigger value="inventory" className="data-[state=active]:bg-flow-accent data-[state=active]:text-white">
                  Inventory
                </TabsTrigger>
                <TabsTrigger value="api" className="data-[state=active]:bg-flow-accent data-[state=active]:text-white">
                  API Sync
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <FinancialOverview timeRange={timeRange} />
              </TabsContent>
              
              <TabsContent value="budget" className="space-y-6">
                <BudgetManagement />
              </TabsContent>
              
              <TabsContent value="crm" className="space-y-6">
                <CRMIntegration />
              </TabsContent>
              
              <TabsContent value="erp" className="space-y-6">
                <ERPDashboard />
              </TabsContent>
              
              <TabsContent value="call-center" className="space-y-6">
                <CallCenterDashboard />
              </TabsContent>
              
              <TabsContent value="inventory" className="space-y-6">
                <InventoryDashboard />
              </TabsContent>
              
              <TabsContent value="api" className="space-y-6">
                <ApiSynchronization />
              </TabsContent>
            </Tabs>
          </GlassMorphism>
        </div>
      </main>
      
      <Footer />
    </ThemedBackground>
  );
};

export default Business;
