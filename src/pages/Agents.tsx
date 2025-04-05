
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AgentGrid from '@/components/agents/AgentGrid';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Cpu, Users, Briefcase, Filter, SortDesc, Terminal, Shield, Zap } from 'lucide-react';
import OfficeFloorPlan from '@/components/agents/OfficeFloorPlan';
import AgencyMetrics from '@/components/agents/AgencyMetrics';
import { useLanguage } from '@/contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import GlassMorphism from '@/components/ui/GlassMorphism';

const Agents = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [filterOptions, setFilterOptions] = useState({
    division: 'all',
    status: 'all',
    sortBy: 'name'
  });
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Prevent the blinking by ensuring content is only displayed once fully loaded
  useEffect(() => {
    // Short delay to ensure all components are mounted
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
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
  
  // Safely render content only after loading is complete
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-flow-background flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-flow-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-flow-background text-flow-foreground flex flex-col cyber-grid">
      <Helmet>
        <title>{t('agents')} | {t('agency')}</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-28 pb-12">
        <TransitionWrapper>
          <GlassMorphism intensity="low" className="p-6 rounded-xl border-flow-accent/30 animate-glow-pulse mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start">
              <div>
                <div className="flex items-center mb-4">
                  <div className="mr-4 bg-cyan-500/20 p-3 rounded-xl backdrop-blur-sm border border-cyan-500/30">
                    <Users className="h-8 w-8 text-cyan-500 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                  </div>
                  <h1 className="text-3xl font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                    {t('agencyHQ')}
                  </h1>
                </div>
                <p className="text-flow-foreground/70">
                  {t('monitorAgents')}
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center gap-2">
                <div className="text-xs bg-flow-muted/50 px-3 py-1.5 rounded-full flex items-center backdrop-blur-sm border border-flow-border/30">
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
                  <Terminal className="h-3 w-3 mr-1" />
                  Quick Actions
                </Button>
              </div>
            </div>
          </GlassMorphism>
          
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
            
            {/* Wrapped each TabsContent with a div that has a fixed height to prevent layout shifts */}
            <TabsContent value="office" className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-flow-foreground/60 mb-4">
                <div className="flex items-center">
                  <Zap className="h-4 w-4 mr-2 text-flow-accent" />
                  {t('interactiveOffice')}
                </div>
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <Select onValueChange={(value) => handleFilterChange('division', value)}>
                    <SelectTrigger className="w-[140px] h-8 text-xs bg-flow-background/30 border-flow-border/50">
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
                    className="h-8 px-2 text-xs flex items-center gap-1 bg-flow-background/30 border-flow-border/50"
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
              
              {/* Fixed height container for the floor plan */}
              <div className="min-h-[550px]">
                <OfficeFloorPlan />
              </div>
              
              <div className="flex justify-end items-center mt-2">
                <div className="text-xs text-flow-foreground/60 px-3 py-1.5 bg-flow-background/30 backdrop-blur-sm rounded-full border border-flow-border/30 animate-pulse-subtle">
                  <span className="text-flow-accent">{t('proTip')}</span> {t('openTerminal')}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="agents" className="space-y-6">
              <GlassMorphism intensity="low" className="p-4 rounded-xl border-flow-border/30 mb-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm">
                  <div className="flex items-center text-flow-foreground/70">
                    <Users className="h-4 w-4 mr-2 text-flow-accent" />
                    {t('allActiveAgents')}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-3 sm:mt-0">
                    <Select onValueChange={(value) => handleFilterChange('division', value)}>
                      <SelectTrigger className="w-[140px] h-8 text-xs bg-flow-background/30 border-flow-border/50">
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
                      <SelectTrigger className="w-[140px] h-8 text-xs bg-flow-background/30 border-flow-border/50">
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
                      <SelectTrigger className="w-[140px] h-8 text-xs bg-flow-background/30 border-flow-border/50">
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
                      className="h-8 px-2 text-xs flex items-center gap-1 bg-flow-background/30 border-flow-border/50"
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
              </GlassMorphism>
              
              {/* Fixed height container for agent grid */}
              <div className="min-h-[550px]">
                <AgentGrid />
              </div>
              
              <div className="flex justify-center mt-4">
                <Button variant="outline" className="border-flow-accent/50 hover:bg-flow-accent/20 text-flow-accent">
                  <Zap className="h-4 w-4 mr-2" />
                  Deploy New Agent
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="metrics" className="space-y-6">
              <GlassMorphism intensity="low" className="p-4 rounded-xl border-flow-border/30 mb-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm">
                  <div className="flex items-center text-flow-foreground/70">
                    <Cpu className="h-4 w-4 mr-2 text-cyan-400" />
                    {t('performanceMetrics')}
                  </div>
                  <div className="flex items-center gap-2 mt-3 sm:mt-0">
                    <Select defaultValue="7d">
                      <SelectTrigger className="w-[140px] h-8 text-xs bg-flow-background/30 border-flow-border/50">
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
                      className="h-8 px-2 text-xs bg-flow-background/30 border-flow-border/50"
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
              </GlassMorphism>
              
              {/* Fixed height container for metrics */}
              <div className="min-h-[550px]">
                <AgencyMetrics />
              </div>
            </TabsContent>
          </Tabs>
        </TransitionWrapper>
      </main>
      
      <Footer />
      
      <style jsx>{`
        .animate-pulse-subtle {
          animation: pulse-subtle 3s infinite ease-in-out;
        }
        @keyframes pulse-subtle {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Agents;
