import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AgentGrid from '@/components/agents/AgentGrid';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Cpu, Users, Briefcase, Filter, SortDesc, Terminal, Zap, LayoutGrid, LayoutList } from 'lucide-react';
import OfficeFloorPlan from '@/components/agents/OfficeFloorPlan';
import AgencyMetrics from '@/components/agents/AgencyMetrics';
import { useLanguage } from '@/contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import GlassMorphism from '@/components/ui/GlassMorphism';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useMemo } from 'react';
import PageHeader from '@/components/ui/design-system/PageHeader';
import { motion } from 'framer-motion';

const Agents = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [filterOptions, setFilterOptions] = useState({
    division: 'all',
    status: 'all',
    sortBy: 'name'
  });
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('office');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const contentLoaded = useRef(false);
  
  const agentStats = useMemo(() => ({
    total: 24,
    active: 14,
    idle: 7,
    paused: 2,
    error: 1
  }), []);
  
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
    <div className="min-h-screen flex flex-col bg-flow-background circuit-background">
      <Helmet>
        <title>{t('agents')} | {t('agency')}</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-20 pb-12">
        <TransitionWrapper>
          <div className="max-w-7xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PageHeader 
                title={t('agencyHQ')}
                description={t('monitorAgents')}
                icon={<Users className="h-8 w-8 text-purple-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]" />}
                glassEffect={true}
                className="mb-6"
                actions={
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="text-xs bg-flow-muted/50 px-3 py-1.5 rounded-full flex items-center backdrop-blur-sm border border-flow-border/30">
                      <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse mr-2"></span>
                      <span className="font-medium">{agentStats.active}</span> / {agentStats.total} {t('activeAgents')}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs bg-flow-muted/30 hover:bg-flow-muted/50 border-flow-border"
                      onClick={(e) => toast({
                        title: "Terminal",
                        description: "Opening agent command terminal",
                        duration: 3000,
                      })}
                    >
                      <Terminal className="h-3 w-3 mr-1" />
                      Terminal
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
              >
                <GlassMorphism intensity="low" className="p-4 rounded-xl border-green-500/30 flex items-center">
                  <div className="bg-green-500/20 p-2 rounded-lg mr-4">
                    <Zap className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">{agentStats.active}</div>
                    <div className="text-xs text-flow-foreground/70">Active Agents</div>
                  </div>
                  <Badge className="ml-auto bg-green-500 text-xs">Working</Badge>
                </GlassMorphism>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <GlassMorphism intensity="low" className="p-4 rounded-xl border-blue-500/30 flex items-center">
                  <div className="bg-blue-500/20 p-2 rounded-lg mr-4">
                    <Cpu className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">{agentStats.idle}</div>
                    <div className="text-xs text-flow-foreground/70">Idle Agents</div>
                  </div>
                  <Badge className="ml-auto bg-blue-500/70 text-xs">Ready</Badge>
                </GlassMorphism>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <GlassMorphism intensity="low" className="p-4 rounded-xl border-amber-500/30 flex items-center">
                  <div className="bg-amber-500/20 p-2 rounded-lg mr-4">
                    <Cpu className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">{agentStats.paused}</div>
                    <div className="text-xs text-flow-foreground/70">Paused Agents</div>
                  </div>
                  <Badge className="ml-auto bg-amber-500 text-xs">Paused</Badge>
                </GlassMorphism>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <GlassMorphism intensity="low" className="p-4 rounded-xl border-red-500/30 flex items-center">
                  <div className="bg-red-500/20 p-2 rounded-lg mr-4">
                    <Terminal className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">{agentStats.error}</div>
                    <div className="text-xs text-flow-foreground/70">Error State</div>
                  </div>
                  <Badge className="ml-auto bg-red-500 text-xs">Action Required</Badge>
                </GlassMorphism>
              </motion.div>
            </div>
            
            <GlassMorphism className="border border-flow-border/30 rounded-2xl overflow-hidden">
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
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-flow-foreground/60 mb-4">
                    <div className="flex items-center">
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
                    <div className="text-xs text-flow-foreground/60 px-3 py-1.5 bg-flow-background/30 backdrop-blur-sm rounded-full border border-flow-accent/30 animate-pulse-subtle">
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
                      <div className="flex items-center text-flow-foreground/70">
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
        </TransitionWrapper>
      </main>
      
      <Footer />
      
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <motion.div
          className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.03) 0%, rgba(139, 92, 246, 0) 70%)" }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(219, 39, 119, 0.03) 0%, rgba(219, 39, 119, 0) 70%)" }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>
      
      <style>{`
        .animate-pulse-subtle {
          animation: pulse-subtle 3s infinite ease-in-out;
        }
        @keyframes pulse-subtle {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes scan {
          0%, 100% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
        }
        .circuit-background {
          background-size: 50px 50px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }
        
        @media (max-width: 640px) {
          .circuit-background {
            background-size: 25px 25px;
          }
        }
      `}</style>
    </div>
  );
};

export default Agents;
