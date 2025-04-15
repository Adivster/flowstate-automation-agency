import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BadgeDollarSign, 
  ChevronDown, 
  Filter, 
  RefreshCw, 
  Database,     // For ERP
  PhoneCall,    // For Call Center
  ShoppingCart, // For Inventory
  FileSpreadsheet // For Reports
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

const Business = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('30d');

  return (
    <ThemedBackground>
      <Helmet>
        <title>Business Intelligence | Agent HQ</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-20 pb-12">
        <div className="max-w-7xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PageHeader 
              title="Business Intelligence"
              description="Connect business systems, manage budgets, and analyze performance metrics."
              icon={<BadgeDollarSign className="h-8 w-8 text-purple-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]" />}
              glassEffect={true}
              className="mb-6"
              actions={
                <div className="flex flex-wrap items-center gap-2">
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
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs h-8 bg-flow-muted/30 border-flow-border/50"
                  >
                    <RefreshCw className="h-3 w-3 mr-2" />
                    Refresh Data
                  </Button>
                </div>
              }
            />
          </motion.div>
          
          <GlassMorphism className="border border-flow-border/30 rounded-2xl overflow-hidden hover-scale">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="p-6">
              <TabsList className="grid max-w-md grid-cols-7 mb-6 bg-flow-background/30">
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
                <Card className="bg-flow-background/20 backdrop-blur-md border-flow-border p-4">
                  <div className="flex items-center justify-center h-64">
                    <p className="text-muted-foreground">Inventory Management Coming Soon</p>
                  </div>
                </Card>
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
