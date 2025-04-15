
import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AgentGrid from '@/components/agents/AgentGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Cpu, Users, Briefcase, Filter, Terminal, Zap, Building2, RefreshCw, Eye, Grid, Layers } from 'lucide-react';
import OfficeFloorPlan from '@/components/agents/OfficeFloorPlan';
import AgencyMetrics from '@/components/agents/AgencyMetrics';
import { useLanguage } from '@/contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { GlassMorphism } from '@/components/ui/GlassMorphism'; 
import { Badge } from '@/components/ui/badge';
import PageHeader from '@/components/ui/design-system/PageHeader';
import { motion } from 'framer-motion';
import ThemedBackground from '@/components/ui/ThemedBackground';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

const Office = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [filterOptions, setFilterOptions] = useState({
    division: 'all',
    status: 'all',
    sortBy: 'name'
  });
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('office');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const contentLoaded = useRef(false);
  
  const agentStats = {
    total: 24,
    active: 14,
    idle: 7,
    paused: 2,
    error: 1
  };
  
  useEffect(() => {
    if (contentLoaded.current) return;
    
    setTimeout(() => {
      contentLoaded.current = true;
      setLoaded(true);
    }, 10);
    
    return () => {
      contentLoaded.current = true;
    };
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
  
  if (!loaded) {
    return (
      <div className="fixed inset-0 bg-flow-background flex flex-col items-center justify-center z-50">
        <div className="w-12 h-12 border-4 border-flow-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <ThemedBackground>
      <Helmet>
        <title>{t('office')} | {t('agency')}</title>
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
              title="Office"
              extendedTitle="Digital Workspace"
              description="Navigate your AI teams with an interactive, real-time floor plan."
              icon={<Building2 className="h-12 w-12 text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]" />}
              variant="office"
              glassEffect={true}
              actions={
                <div className="flex flex-wrap items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-purple-500/10 border-purple-500/50 hover:bg-purple-500/20 text-purple-500 dark:text-purple-400"
                  >
                    <Grid className="h-4 w-4 mr-2" />
                    Reorganize Office
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-purple-500/10 border-purple-500/50 hover:bg-purple-500/20 text-purple-500 dark:text-purple-400"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    View Agent Details
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-purple-500/10 border-purple-500/50 hover:bg-purple-500/20 text-purple-500 dark:text-purple-400"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh Status
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-purple-500/10 border-purple-500/50 hover:bg-purple-500/20 text-purple-500 dark:text-purple-400"
                  >
                    <Layers className="h-4 w-4 mr-2" />
                    Toggle Heatmap
                  </Button>
                </div>
              }
            />
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="hover-scale"
            >
              <GlassMorphism intensity="low" className="p-4 rounded-xl border-green-500/30 flex items-center">
                <div className="bg-green-500/20 p-2 rounded-lg mr-4">
                  <Zap className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <div className={cn("text-xl font-bold", isDark ? "text-white" : "text-gray-800")}>{agentStats.active}</div>
                  <div className={cn("text-xs", isDark ? "text-flow-foreground/70" : "text-gray-600")}>Active Agents</div>
                </div>
                <Badge className="ml-auto bg-green-500 text-xs">Working</Badge>
              </GlassMorphism>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="hover-scale"
            >
              <GlassMorphism intensity="low" className="p-4 rounded-xl border-blue-500/30 flex items-center">
                <div className="bg-blue-500/20 p-2 rounded-lg mr-4">
                  <Cpu className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <div className={cn("text-xl font-bold", isDark ? "text-white" : "text-gray-800")}>{agentStats.idle}</div>
                  <div className={cn("text-xs", isDark ? "text-flow-foreground/70" : "text-gray-600")}>Idle Agents</div>
                </div>
                <Badge className="ml-auto bg-blue-500/70 text-xs">Ready</Badge>
              </GlassMorphism>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="hover-scale"
            >
              <GlassMorphism intensity="low" className="p-4 rounded-xl border-amber-500/30 flex items-center">
                <div className="bg-amber-500/20 p-2 rounded-lg mr-4">
                  <Cpu className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <div className={cn("text-xl font-bold", isDark ? "text-white" : "text-gray-800")}>{agentStats.paused}</div>
                  <div className={cn("text-xs", isDark ? "text-flow-foreground/70" : "text-gray-600")}>Paused Agents</div>
                </div>
                <Badge className="ml-auto bg-amber-500 text-xs">Paused</Badge>
              </GlassMorphism>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="hover-scale"
            >
              <GlassMorphism intensity="low" className="p-4 rounded-xl border-red-500/30 flex items-center">
                <div className="bg-red-500/20 p-2 rounded-lg mr-4">
                  <Terminal className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <div className={cn("text-xl font-bold", isDark ? "text-white" : "text-gray-800")}>{agentStats.error}</div>
                  <div className={cn("text-xs", isDark ? "text-flow-foreground/70" : "text-gray-600")}>Error State</div>
                </div>
                <Badge className="ml-auto bg-red-500 text-xs">Action Required</Badge>
              </GlassMorphism>
            </motion.div>
          </div>
          
          <GlassMorphism className="border border-flow-border/30 rounded-2xl overflow-hidden hover-scale">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 p-6">
              <TabsList className="grid w-full max-w-md grid-cols-3 bg-flow-background/30 border border-flow-border/50">
                <TabsTrigger value="office" className="flex items-center gap-2 data-[state=active]:bg-flow-accent data-[state=active]:text-white">
                  <Briefcase className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('officeView')}</span>
                </TabsTrigger>
                <TabsTrigger value="agents" className="flex items-center gap-2 data-[state=active]:bg-flow-accent data-[state=active]:text-white">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('agentList')}</span>
                </TabsTrigger>
                <TabsTrigger value="metrics" className="flex items-center gap-2 data-[state=active]:bg-flow-accent data-[state=active]:text-white">
                  <Cpu className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('systemMetrics')}</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="office" className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm mb-4">
                  <div className={cn("flex items-center", isDark ? "text-flow-foreground/60" : "text-gray-600")}>
                    <Zap className="h-4 w-4 mr-2 text-flow-accent" />
                    {t('interactiveOffice')}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
                    <Select onValueChange={(value) => handleFilterChange('division', value)}>
                      <SelectTrigger className="w-[140px] h-8 text-xs bg-flow-background/30 border-flow-border/50">
                        <SelectValue placeholder="Filter Division" />
                      </SelectTrigger>
                      <SelectContent className="bg-flow-background/90 backdrop-blur-md border-flow-border">
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
                
                <div className="min-h-[550px] h-[550px] relative">
                  <OfficeFloorPlan />
                </div>
                
                <div className="flex justify-end items-center mt-2">
                  <div className={cn("text-xs px-3 py-1.5 bg-flow-background/30 backdrop-blur-sm rounded-full border border-flow-accent/30 animate-pulse-subtle", isDark ? "text-flow-foreground/60" : "text-gray-600")}>
                    <span className="text-flow-accent">{t('proTip')}</span> {t('openTerminal')}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="agents" className="space-y-6">
                <div className="h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
                  <AgentGrid />
                </div>
                
                <div className="flex justify-center mt-4">
                  <Button variant="outline" className="border-flow-accent/50 bg-flow-accent/10 hover:bg-flow-accent/20 text-flow-accent">
                    <Zap className="h-4 w-4 mr-2" />
                    Deploy New Agent
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="metrics" className="space-y-6">
                <GlassMorphism intensity="low" className="p-4 rounded-xl border-flow-border/30 mb-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm">
                    <div className={cn("flex items-center", isDark ? "text-flow-foreground/70" : "text-gray-600")}>
                      <Cpu className="h-4 w-4 mr-2 text-cyan-400" />
                      {t('performanceMetrics')}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-3 sm:mt-0">
                      <Select defaultValue="7d">
                        <SelectTrigger className="w-[140px] h-8 text-xs bg-flow-background/30 border-flow-border/50">
                          <SelectValue placeholder="Time Period" />
                        </SelectTrigger>
                        <SelectContent className="bg-flow-background/90 backdrop-blur-md border-flow-border">
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
                
                <div className="min-h-[550px] h-[550px] relative">
                  <AgencyMetrics />
                </div>
              </TabsContent>
            </Tabs>
          </GlassMorphism>
        </div>
      </main>
      
      <Footer />
    </ThemedBackground>
  );
};

export default Office;
