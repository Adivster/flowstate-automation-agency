import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, Database, Book, BarChart3, Coffee, TestTube, AlertTriangle, 
  Play, Pause, X, Zap, MessageCircle, Search, ExternalLink, 
  Filter, LayoutGrid, LayoutList, RefreshCcw, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import GlassMorphism from '@/components/ui/GlassMorphism';
import AgentCard from '../agents/AgentCard';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const agentsData = [
  // Knowledge Base Agents
  { 
    id: 1, 
    name: 'Knowledge Engineer', 
    role: 'Information Specialist',
    status: 'working',
    division: 'kb',
    efficiency: 92,
    lastActive: '2 min ago',
    icon: Book
  },
  { 
    id: 2, 
    name: 'Content Curator', 
    role: 'Documentation Expert',
    status: 'idle',
    division: 'kb',
    efficiency: 88,
    lastActive: '15 min ago',
    icon: Book
  },
  
  // Analytics Division Agents
  { 
    id: 3, 
    name: 'Data Architect', 
    role: 'Pattern Analyst',
    status: 'working',
    division: 'analytics',
    efficiency: 95,
    lastActive: '1 min ago',
    icon: BarChart3
  },
  { 
    id: 4, 
    name: 'Insight Generator', 
    role: 'Trend Predictor',
    status: 'working',
    division: 'analytics',
    efficiency: 91,
    lastActive: '5 min ago',
    icon: BarChart3
  },
  
  // Operations Agents
  { 
    id: 5, 
    name: 'Infrastructure Specialist', 
    role: 'Systems Engineer',
    status: 'working',
    division: 'operations',
    efficiency: 89,
    lastActive: '3 min ago',
    icon: Cpu
  },
  { 
    id: 6, 
    name: 'Operations Manager', 
    role: 'Process Optimizer',
    status: 'paused',
    division: 'operations',
    efficiency: 87,
    lastActive: '25 min ago',
    icon: Cpu
  },
  
  // Strategy Agents
  { 
    id: 7, 
    name: 'Strategic Planner', 
    role: 'Future Forecaster',
    status: 'working',
    division: 'strategy',
    efficiency: 94,
    lastActive: '4 min ago',
    icon: Database
  },
  { 
    id: 8, 
    name: 'Strategy Consultant', 
    role: 'Decision Support',
    status: 'working',
    division: 'strategy',
    efficiency: 90,
    lastActive: '7 min ago',
    icon: Database
  },
  
  // Research Agents
  { 
    id: 9, 
    name: 'Research Scientist', 
    role: 'Innovation Leader',
    status: 'working',
    division: 'research',
    efficiency: 93,
    lastActive: '2 min ago',
    icon: TestTube
  },
  
  // Error state example
  { 
    id: 10, 
    name: 'Security Officer', 
    role: 'Threat Detection',
    status: 'error',
    division: 'operations',
    efficiency: 45,
    lastActive: '12 min ago',
    icon: Cpu
  },
];

interface AgentGridProps {
  maxAgents?: number;
  showAsGrid?: boolean;
}

const AgentGrid: React.FC<AgentGridProps> = ({ maxAgents }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedAgent, setExpandedAgent] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    status: 'all',
    division: 'all',
    efficiency: 'all'
  });
  const { toast } = useToast();
  const { t } = useLanguage();
  
  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000);
    
    return () => clearInterval(timer);
  }, []);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsRefreshing(false);
      
      toast({
        title: "Agents Refreshed",
        description: "Agent data has been updated",
        duration: 3000,
      });
    }, 800);
  };
  
  const divisionColors = {
    kb: { bg: 'bg-indigo-500/10', text: 'text-indigo-500', border: 'border-indigo-500/50', highlight: 'bg-indigo-500' },
    analytics: { bg: 'bg-yellow-500/10', text: 'text-yellow-500', border: 'border-yellow-500/50', highlight: 'bg-yellow-500' },
    operations: { bg: 'bg-purple-500/10', text: 'text-purple-500', border: 'border-purple-500/50', highlight: 'bg-purple-500' },
    strategy: { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/50', highlight: 'bg-blue-500' },
    research: { bg: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500/50', highlight: 'bg-green-500' }
  };
  
  const getDivisionName = (division: string) => {
    const divisions = {
      kb: t('knowledgeBase'),
      analytics: t('analyticsDivision'),
      operations: t('operationsDivision'),
      strategy: t('strategyDivision'),
      research: t('researchDivision')
    };
    return divisions[division] || division;
  };
  
  const handleExpandAgent = (id: number) => {
    setExpandedAgent(expandedAgent === id ? null : id);
  };
  
  const handleAgentAction = (action: string, agent: any) => {
    const actions = {
      pause: `Paused ${agent.name}`,
      resume: `Resumed ${agent.name}`,
      stop: `Stopped ${agent.name}`,
      message: `Opened chat with ${agent.name}`,
      details: `Viewing details for ${agent.name}`
    };
    
    toast({
      title: actions[action] || `Action on ${agent.name}`,
      description: `Agent ${action} request sent`,
      duration: 3000,
    });
    
    if (action === 'message') {
      const event = new CustomEvent('openCommunicationTerminal');
      window.dispatchEvent(event);
    }
  };
  
  const formatLastUpdateTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(date);
  };

  const applyFilters = (agents: any[]) => {
    return agents.filter(agent => {
      const matchesSearch = 
        searchTerm === '' || 
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getDivisionName(agent.division).toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesStatus = searchFilters.status === 'all' || agent.status === searchFilters.status;
      const matchesDivision = searchFilters.division === 'all' || agent.division === searchFilters.division;
      
      let matchesEfficiency = true;
      if (searchFilters.efficiency === 'high') {
        matchesEfficiency = agent.efficiency >= 90;
      } else if (searchFilters.efficiency === 'medium') {
        matchesEfficiency = agent.efficiency >= 70 && agent.efficiency < 90;
      } else if (searchFilters.efficiency === 'low') {
        matchesEfficiency = agent.efficiency < 70;
      }
      
      return matchesSearch && matchesStatus && matchesDivision && matchesEfficiency;
    });
  };
  
  const filteredAgents = applyFilters(agentsData).slice(0, maxAgents || agentsData.length);
  
  return (
    <div className="space-y-6">
      <GlassMorphism className="p-4 rounded-xl border-flow-border/40">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-flow-muted-foreground" />
            <Input
              placeholder={t('searchAgents')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-flow-background/30 border-flow-border/50"
            />
          </div>
          
          <div className="flex flex-wrap gap-3 items-center">
            <Button
              variant="outline"
              size="icon"
              className={`h-9 w-9 ${viewMode === 'grid' ? 'bg-flow-accent/20 border-flow-accent' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className={`h-9 w-9 ${viewMode === 'list' ? 'bg-flow-accent/20 border-flow-accent' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <LayoutList className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="border-flow-border/50"
              onClick={() => setAdvancedSearch(!advancedSearch)}
            >
              <Filter className="h-4 w-4 mr-1" />
              Filters
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="border-flow-accent/50 hover:bg-flow-accent/20 text-flow-accent"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCcw className={`h-4 w-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>
        </div>
        
        {advancedSearch && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 pt-4 border-t border-flow-border/30"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-flow-foreground/70">Status</label>
                <Select 
                  value={searchFilters.status} 
                  onValueChange={(value) => setSearchFilters({...searchFilters, status: value})}
                >
                  <SelectTrigger className="bg-flow-background/30 border-flow-border/50">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="working">Working</SelectItem>
                    <SelectItem value="idle">Idle</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs text-flow-foreground/70">Division</label>
                <Select 
                  value={searchFilters.division} 
                  onValueChange={(value) => setSearchFilters({...searchFilters, division: value})}
                >
                  <SelectTrigger className="bg-flow-background/30 border-flow-border/50">
                    <SelectValue placeholder="Filter by Division" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Divisions</SelectItem>
                    <SelectItem value="kb">Knowledge Base</SelectItem>
                    <SelectItem value="analytics">Analytics</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="strategy">Strategy</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs text-flow-foreground/70">Efficiency</label>
                <Select 
                  value={searchFilters.efficiency} 
                  onValueChange={(value) => setSearchFilters({...searchFilters, efficiency: value})}
                >
                  <SelectTrigger className="bg-flow-background/30 border-flow-border/50">
                    <SelectValue placeholder="Filter by Efficiency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="high">High (90%+)</SelectItem>
                    <SelectItem value="medium">Medium (70-89%)</SelectItem>
                    <SelectItem value="low">Low (Below 70%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-between mt-4">
              <div className="text-xs text-flow-foreground/70 flex items-center">
                <Clock className="w-3 h-3 mr-1" /> 
                Last updated: {formatLastUpdateTime(lastUpdated)}
              </div>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setSearchFilters({
                    status: 'all',
                    division: 'all',
                    efficiency: 'all'
                  });
                  setSearchTerm('');
                }}
              >
                Reset Filters
              </Button>
            </div>
          </motion.div>
        )}
      </GlassMorphism>
      
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAgents.map((agent) => {
            const isExpanded = expandedAgent === agent.id;
            
            return (
              <motion.div
                key={agent.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {isExpanded ? (
                  <GlassMorphism 
                    intensity="low" 
                    className={`h-full border ${divisionColors[agent.division].border} rounded-xl overflow-hidden ${agent.status === 'error' ? 'border-red-500/50 animate-pulse-subtle' : ''}`}
                  >
                    <div className="p-5">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${divisionColors[agent.division].bg}`}>
                            <agent.icon className={`h-5 w-5 ${divisionColors[agent.division].text}`} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-flow-foreground">{agent.name}</h3>
                              <Badge className={`${agent.status === 'working' ? 'bg-green-500 text-green-50' : agent.status === 'paused' ? 'bg-amber-500 text-amber-50' : agent.status === 'error' ? 'bg-red-500 text-red-50' : 'bg-gray-500 text-gray-50'} text-xs px-2 py-0.5`}>
                                {t(agent.status)}
                              </Badge>
                            </div>
                            <div className="text-xs text-flow-foreground/60">{agent.role}</div>
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 rounded-full"
                          onClick={() => handleExpandAgent(agent.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-flow-foreground/70">{t('division')}</span>
                            <span className={divisionColors[agent.division].text}>{getDivisionName(agent.division)}</span>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-flow-foreground/70">{t('efficiency')}</span>
                              <span className={agent.efficiency > 90 ? 'text-green-500' : agent.efficiency > 70 ? 'text-yellow-500' : 'text-flow-foreground/70'}>
                                {agent.efficiency}%
                              </span>
                            </div>
                            <Progress value={agent.efficiency} className="h-2" />
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-flow-foreground/70">{t('lastActive')}</span>
                            <span className="text-flow-foreground">{agent.lastActive}</span>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-3">{t('currentTasks')}</h4>
                          <div className="space-y-3">
                            <div className="p-3 rounded-md bg-flow-background/30">
                              <div className="flex justify-between mb-2">
                                <span className="text-sm text-flow-foreground">Data Processing Task #4872</span>
                                <span className="text-sm text-green-500">82%</span>
                              </div>
                              <Progress value={82} className="h-1.5" />
                            </div>
                            <div className="p-3 rounded-md bg-flow-background/30">
                              <div className="flex justify-between mb-2">
                                <span className="text-sm text-flow-foreground">System Optimization #3391</span>
                                <span className="text-sm text-amber-500">45%</span>
                              </div>
                              <Progress value={45} className="h-1.5" />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-4 border-t border-flow-border/30">
                        <h4 className="text-sm font-medium mb-3">{t('agentActivity')}</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 p-2 rounded-md bg-flow-background/30">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <span className="text-sm">Task processing completed at 14:32</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded-md bg-flow-background/30">
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                            <span className="text-sm">Data synchronization with KB at 14:15</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded-md bg-flow-background/30">
                            <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                            <span className="text-sm">Resource allocation optimized at 13:45</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-4 border-t border-flow-border/30">
                        <h4 className="text-sm font-medium mb-3">{t('agentDetails')}</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div className="flex flex-col p-2 rounded-md bg-flow-background/30">
                            <span className="text-xs text-flow-foreground/70">{t('version')}</span>
                            <span className="text-sm text-flow-foreground">v3.2.1</span>
                          </div>
                          <div className="flex flex-col p-2 rounded-md bg-flow-background/30">
                            <span className="text-xs text-flow-foreground/70">{t('memory')}</span>
                            <span className="text-sm text-flow-foreground">1.8 GB / 2.0 GB</span>
                          </div>
                          <div className="flex flex-col p-2 rounded-md bg-flow-background/30">
                            <span className="text-xs text-flow-foreground/70">{t('uptime')}</span>
                            <span className="text-sm text-flow-foreground">31 days, 4 hours</span>
                          </div>
                          <div className="flex flex-col p-2 rounded-md bg-flow-background/30">
                            <span className="text-xs text-flow-foreground/70">{t('tasksCompleted')}</span>
                            <span className="text-sm text-flow-foreground">1,452</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex flex-wrap gap-3">
                        {agent.status === 'working' ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-xs h-8 bg-flow-background/30 border-flow-border/50"
                            onClick={() => handleAgentAction('pause', agent)}
                          >
                            <Pause className="h-3 w-3 mr-1" />
                            {t('pause')}
                          </Button>
                        ) : agent.status === 'paused' ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-xs h-8 bg-flow-background/30 border-flow-border/50"
                            onClick={() => handleAgentAction('resume', agent)}
                          >
                            <Play className="h-3 w-3 mr-1" />
                            {t('resume')}
                          </Button>
                        ) : agent.status === 'error' ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-xs h-8 border-red-500/50 text-red-500 hover:bg-red-500/10"
                            onClick={() => handleAgentAction('restart', agent)}
                          >
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            {t('restart')}
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-xs h-8 bg-flow-background/30 border-flow-border/50"
                            onClick={() => handleAgentAction('activate', agent)}
                          >
                            <Play className="h-3 w-3 mr-1" />
                            {t('activate')}
                          </Button>
                        )}
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs h-8 bg-flow-background/30 border-flow-border/50"
                          onClick={() => handleAgentAction('message', agent)}
                        >
                          <MessageCircle className="h-3 w-3 mr-1" />
                          {t('message')}
                        </Button>
                      </div>
                    </div>
                  </GlassMorphism>
                ) : (
                  <AgentCard 
                    name={agent.name}
                    role={agent.role}
                    icon={agent.icon}
                    status={agent.status as 'idle' | 'working' | 'paused' | 'error'}
                    efficiency={agent.efficiency}
                    lastActivity={agent.lastActive}
                    className={`border-${agent.division}-500/30 hover:border-${agent.division}-500/50`}
                    onClick={() => handleExpandAgent(agent.id)}
                    tags={['v3.2', agent.division, agent.status]}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col space-y-2">
          {filteredAgents.map((agent) => {
            const colors = divisionColors[agent.division] || divisionColors.kb;
            
            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <GlassMorphism 
                  className="border border-flow-border/50 hover:border-flow-accent/50 transition-all duration-200 hover:shadow-[0_0_15px_rgba(85,120,255,0.15)] rounded-lg p-3 cursor-pointer"
                  onClick={() => handleExpandAgent(agent.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${colors.bg}`}>
                        <agent.icon className={`h-4 w-4 ${colors.text}`} />
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{agent.name}</h3>
                          <Badge className={`${
                            agent.status === 'working' ? 'bg-green-500 text-white' :
                            agent.status === 'paused' ? 'bg-amber-500 text-white' :
                            agent.status === 'error' ? 'bg-red-500 text-white' :
                            'bg-gray-500 text-white'
                          } text-xs`}>
                            {agent.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-flow-foreground/70">{agent.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="hidden sm:flex items-center space-x-1">
                        <span className="text-xs text-flow-foreground/70">Efficiency:</span>
                        <span className={`text-xs font-medium ${
                          agent.efficiency > 90 ? 'text-green-500' : 
                          agent.efficiency > 70 ? 'text-yellow-500' : 
                          'text-red-500'
                        }`}>
                          {agent.efficiency}%
                        </span>
                      </div>
                      
                      <div className="hidden md:flex items-center space-x-1">
                        <span className="text-xs text-flow-foreground/70">Last active:</span>
                        <span className="text-xs">{agent.lastActive}</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        {agent.status === 'working' ? (
                          <Button
                            variant="ghost" 
                            size="sm"
                            className="h-7 px-2 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAgentAction('pause', agent);
                            }}
                          >
                            <Pause className="h-3 w-3 mr-1" />
                            Pause
                          </Button>
                        ) : agent.status === 'paused' ? (
                          <Button
                            variant="ghost" 
                            size="sm"
                            className="h-7 px-2 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAgentAction('resume', agent);
                            }}
                          >
                            <Play className="h-3 w-3 mr-1" />
                            Resume
                          </Button>
                        ) : null}
                        
                        <Button
                          variant="outline" 
                          size="sm"
                          className="h-7 px-2 text-xs border-flow-border"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAgentAction('message', agent);
                          }}
                        >
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </div>
                </GlassMorphism>
              </motion.div>
            );
          })}
        </div>
      )}
      
      {filteredAgents.length === 0 && (
        <div className="text-center py-12">
          <div className="text-flow-muted-foreground text-sm">{t('noAgentsFound')}</div>
          <Button 
            variant="link" 
            onClick={() => {
              setSearchTerm('');
              setSearchFilters({
                status: 'all',
                division: 'all',
                efficiency: 'all'
              });
            }}
            className="mt-2 text-flow-accent"
          >
            {t('clearSearch')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AgentGrid;
