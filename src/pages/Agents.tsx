import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AgentGrid from '@/components/agents/AgentGrid';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Cpu, Users, Briefcase, Filter, SortDesc } from 'lucide-react';
import OfficeFloorPlan from '@/components/agents/OfficeFloorPlan';
import AgencyMetrics from '@/components/agents/AgencyMetrics';
import { useLanguage } from '@/contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Agents = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [filterOptions, setFilterOptions] = useState({
    division: 'all',
    status: 'all',
    sortBy: 'name'
  });
  
  const handleFilterChange = (key: string, value: string) => {
    setFilterOptions(prev => ({
      ...prev,
      [key]: value
    }));
    
    toast({
      title: "Filter applied",
      description: `Filtering agents by ${key}: ${value}`,
      duration: 3000,
    });
  };
  
  return (
    <div className="min-h-screen bg-flow-background text-flow-foreground flex flex-col cyber-grid">
      <Helmet>
        <title>{t('agents')} | {t('agency')}</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-28 pb-12">
        <TransitionWrapper>
          <div className="flex flex-col md:flex-row justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-1 neon-text">{t('agencyHQ')}</h1>
              <p className="text-flow-foreground/70">
                {t('monitorAgents')}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center gap-2">
              <div className="text-xs bg-flow-muted/50 px-3 py-1.5 rounded-full flex items-center">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse mr-2"></span>
                24 {t('activeAgents')}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className="text-xs bg-flow-muted/30 hover:bg-flow-muted/50 border-flow-border"
                onClick={() => toast({
                  title: "Quick Actions",
                  description: "Customizable quick actions panel can be added here",
                  duration: 3000,
                })}
              >
                Quick Actions
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="office" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3 neon-border">
              <TabsTrigger value="office" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span className="hidden sm:inline">{t('officeView')}</span>
              </TabsTrigger>
              <TabsTrigger value="agents" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">{t('agentList')}</span>
              </TabsTrigger>
              <TabsTrigger value="metrics" className="flex items-center gap-2">
                <Cpu className="h-4 w-4" />
                <span className="hidden sm:inline">{t('systemMetrics')}</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="office" className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-flow-foreground/60 mb-4">
                <div>
                  {t('interactiveOffice')}
                </div>
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <Select onValueChange={(value) => handleFilterChange('division', value)}>
                    <SelectTrigger className="w-[140px] h-8 text-xs">
                      <SelectValue placeholder="Filter Division" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Divisions</SelectItem>
                      <SelectItem value="kb">Knowledge Base</SelectItem>
                      <SelectItem value="analytics">Analytics</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                      <SelectItem value="strategy">Strategy</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-8 px-2 text-xs flex items-center gap-1"
                    onClick={() => toast({
                      title: "View Controls",
                      description: "Customize the office view with additional controls",
                      duration: 3000,
                    })}
                  >
                    <Filter className="h-3 w-3" />
                    View
                  </Button>
                </div>
              </div>
              
              <OfficeFloorPlan />
              
              <div className="flex justify-end items-center mt-2">
                <div className="text-xs text-flow-foreground/60">
                  <span className="text-flow-accent">{t('proTip')}</span> {t('openTerminal')}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="agents" className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-flow-foreground/60 mb-4">
                <div>
                  {t('allActiveAgents')}
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
                  <Select onValueChange={(value) => handleFilterChange('division', value)}>
                    <SelectTrigger className="w-[140px] h-8 text-xs">
                      <SelectValue placeholder="Division" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Divisions</SelectItem>
                      <SelectItem value="kb">Knowledge Base</SelectItem>
                      <SelectItem value="analytics">Analytics</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                      <SelectItem value="strategy">Strategy</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select onValueChange={(value) => handleFilterChange('status', value)}>
                    <SelectTrigger className="w-[140px] h-8 text-xs">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="working">Working</SelectItem>
                      <SelectItem value="idle">Idle</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select onValueChange={(value) => handleFilterChange('sortBy', value)}>
                    <SelectTrigger className="w-[140px] h-8 text-xs">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="efficiency">Efficiency</SelectItem>
                      <SelectItem value="activity">Recent Activity</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-8 px-2 text-xs flex items-center gap-1"
                    onClick={() => toast({
                      title: "Sort Applied",
                      description: `Agents sorted by ${filterOptions.sortBy}`,
                      duration: 3000,
                    })}
                  >
                    <SortDesc className="h-3 w-3" />
                    Sort
                  </Button>
                </div>
              </div>
              
              <AgentGrid />
            </TabsContent>
            
            <TabsContent value="metrics" className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-flow-foreground/60 mb-4">
                <div>
                  {t('performanceMetrics')}
                </div>
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <Select defaultValue="7d">
                    <SelectTrigger className="w-[140px] h-8 text-xs">
                      <SelectValue placeholder="Time Period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">Last 24 Hours</SelectItem>
                      <SelectItem value="7d">Last 7 Days</SelectItem>
                      <SelectItem value="30d">Last 30 Days</SelectItem>
                      <SelectItem value="90d">Last Quarter</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-8 px-2 text-xs"
                    onClick={() => toast({
                      title: "Export Data",
                      description: "Metrics data export functionality can be added here",
                      duration: 3000,
                    })}
                  >
                    Export
                  </Button>
                </div>
              </div>
              
              <AgencyMetrics />
            </TabsContent>
          </Tabs>
        </TransitionWrapper>
      </main>
      
      <Footer />
    </div>
  );
};

export default Agents;
