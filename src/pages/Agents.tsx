
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
  
  // Agent statistics
  const agentStats = useMemo(() => ({
    total: 24,
    active: 14,
    idle: 7,
    paused: 2,
    error: 1
  }), []);
  
  // Load only once to prevent blinking
  useEffect(() => {
    // Skip re-render if already loaded
    if (contentLoaded.current) return;
    
    // Set a timeout to allow for immediate rendering without perceived delay
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
  
  // Show loading placeholder only on initial load
  if (!loaded) {
    return (
      <div className="fixed inset-0 bg-flow-background flex flex-col items-center justify-center z-50">
        <div className="w-12 h-12 border-4 border-flow-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-flow-background text-flow-foreground cyber-grid">
      <Helmet>
        <title>{t('agents')} | {t('agency')}</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-28 pb-12">
        <TransitionWrapper>
          <GlassMorphism intensity="low" className="p-6 rounded-xl border-flow-accent/30 animate-glow-pulse mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
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
              
              <div className="flex flex-wrap items-center gap-2">
                <div className="text-xs bg-flow-muted/50 px-3 py-1.5 rounded-full flex items-center backdrop-blur-sm border border-flow-border/30">
                  <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse mr-2"></span>
                  <span className="font-medium">{agentStats.active}</span> / {agentStats.total} {t('activeAgents')}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs bg-flow-muted/30 hover:bg-flow-muted/50 border-flow-border"
                  onClick={() => toast({
                    title: "Terminal",
                    description: "Opening agent command terminal",
                    duration: 3000,
                  })}
                >
                  <Terminal className="h-3 w-3 mr-1" />
                  Terminal
                </Button>
              </div>
            </div>
          </GlassMorphism>
          
          {/* Agent Status Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
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
                <div className="flex items-center">
                  <Zap className="h-4 w-4 mr-2 text-flow-accent" />
                  {t('interactiveOffice')}
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
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
              
              {/* Fixed height container to avoid content shift/jump */}
              <div className="min-h-[550px] h-[550px] relative">
                <OfficeFloorPlan />
              </div>
              
              <div className="flex justify-end items-center mt-2">
                <div className="text-xs text-flow-foreground/60 px-3 py-1.5 bg-flow-background/30 backdrop-blur-sm rounded-full border border-flow-border/30 animate-pulse-subtle">
                  <span className="text-flow-accent">{t('proTip')}</span> {t('openTerminal')}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="agents" className="space-y-6">
              {/* Set proper height for scrollable content */}
              <div className="h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
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
                  <div className="flex flex-wrap items-center gap-2 mt-3 sm:mt-0">
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
              
              {/* Fixed height container to avoid content shift/jump */}
              <div className="min-h-[550px] h-[550px] relative">
                <AgencyMetrics />
              </div>
            </TabsContent>
          </Tabs>
        </TransitionWrapper>
      </main>
      
      <Footer />
      
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
        .cyber-grid {
          background-size: 50px 50px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }
        
        @media (max-width: 640px) {
          .cyber-grid {
            background-size: 25px 25px;
          }
        }
      `}</style>
    </div>
  );
};

export default Agents;
