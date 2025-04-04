
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, Database, Book, BarChart3, Coffee, TestTube, AlertTriangle, 
  Play, Pause, X, Zap, MessageCircle, Search, ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import GlassMorphism from '@/components/ui/GlassMorphism';

// Sample data
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

const AgentGrid: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedAgent, setExpandedAgent] = useState<number | null>(null);
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const statusColors = {
    working: 'bg-green-500 text-green-50',
    idle: 'bg-gray-500 text-gray-50',
    paused: 'bg-amber-500 text-amber-50',
    error: 'bg-red-500 text-red-50'
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
    
    // For the message action, open the communication terminal
    if (action === 'message') {
      const event = new CustomEvent('openCommunicationTerminal');
      window.dispatchEvent(event);
    }
  };
  
  const filteredAgents = agentsData.filter(agent => 
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getDivisionName(agent.division).toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-flow-muted-foreground" />
          <Input
            placeholder={t('searchAgents')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-flow-background/30 border-flow-border/50"
          />
        </div>
        <Button
          variant="outline"
          className="border-flow-accent/50 hover:bg-flow-accent/20 text-flow-accent"
          onClick={() => toast({
            title: "Quick Deploy",
            description: "Deploy new agent functionality coming soon",
            duration: 3000,
          })}
        >
          <Zap className="h-4 w-4 mr-2" />
          Quick Deploy
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => {
          const colors = divisionColors[agent.division] || divisionColors.kb;
          const isExpanded = expandedAgent === agent.id;
          
          return (
            <motion.div
              key={agent.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={`rounded-xl overflow-hidden transition-all ${isExpanded ? 'md:col-span-2 xl:col-span-3 row-span-2' : ''}`}
            >
              <GlassMorphism 
                intensity="low" 
                className={`h-full border ${colors.border} rounded-xl overflow-hidden ${agent.status === 'error' ? 'border-red-500/50 animate-pulse-subtle' : ''}`}
              >
                <div className="p-4 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg ${colors.bg}`}>
                          <agent.icon className={`h-4 w-4 ${colors.text}`} />
                        </div>
                        <h3 className="font-semibold text-flow-foreground">{agent.name}</h3>
                        <Badge className={`${statusColors[agent.status]} text-xs px-2 py-0.5`}>
                          {t(agent.status)}
                        </Badge>
                      </div>
                      <div className="text-xs text-flow-foreground/60 mt-1">{agent.role}</div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 rounded-full"
                      onClick={() => handleExpandAgent(agent.id)}
                    >
                      {isExpanded ? (
                        <X className="h-4 w-4" />
                      ) : (
                        <ExternalLink className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs text-flow-foreground/70">
                      <span>{t('division')}</span>
                      <span className={colors.text}>{getDivisionName(agent.division)}</span>
                    </div>
                    
                    <div className="flex justify-between text-xs text-flow-foreground/70">
                      <span>{t('efficiency')}</span>
                      <div className="flex items-center gap-1.5">
                        <Progress value={agent.efficiency} className="h-1.5 w-16" />
                        <span className="text-flow-foreground">{agent.efficiency}%</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-xs text-flow-foreground/70">
                      <span>{t('lastActive')}</span>
                      <span className="text-flow-foreground">{agent.lastActive}</span>
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-5 pt-4 border-t border-flow-border/30"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">{t('agentActivity')}</h4>
                          <div className="space-y-2 text-xs text-flow-foreground/70">
                            <div className="flex items-center gap-2 p-2 rounded-md bg-flow-background/30">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                              <span>Task processing completed at 14:32</span>
                            </div>
                            <div className="flex items-center gap-2 p-2 rounded-md bg-flow-background/30">
                              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                              <span>Data synchronization with KB at 14:15</span>
                            </div>
                            <div className="flex items-center gap-2 p-2 rounded-md bg-flow-background/30">
                              <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                              <span>Resource allocation optimized at 13:45</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">{t('currentTasks')}</h4>
                          <div className="space-y-2 text-xs">
                            <div className="p-2 rounded-md bg-flow-background/30">
                              <div className="flex justify-between mb-1">
                                <span className="text-flow-foreground">Data Processing Task #4872</span>
                                <span className="text-green-500">82%</span>
                              </div>
                              <Progress value={82} className="h-1"/>
                            </div>
                            <div className="p-2 rounded-md bg-flow-background/30">
                              <div className="flex justify-between mb-1">
                                <span className="text-flow-foreground">System Optimization #3391</span>
                                <span className="text-amber-500">45%</span>
                              </div>
                              <Progress value={45} className="h-1"/>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-flow-border/30">
                        <h4 className="text-sm font-medium mb-2">{t('agentDetails')}</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                          <div className="flex flex-col p-2 rounded-md bg-flow-background/30">
                            <span className="text-flow-foreground/70">{t('version')}</span>
                            <span className="text-flow-foreground">v3.2.1</span>
                          </div>
                          <div className="flex flex-col p-2 rounded-md bg-flow-background/30">
                            <span className="text-flow-foreground/70">{t('memory')}</span>
                            <span className="text-flow-foreground">1.8 GB / 2.0 GB</span>
                          </div>
                          <div className="flex flex-col p-2 rounded-md bg-flow-background/30">
                            <span className="text-flow-foreground/70">{t('uptime')}</span>
                            <span className="text-flow-foreground">31 days, 4 hours</span>
                          </div>
                          <div className="flex flex-col p-2 rounded-md bg-flow-background/30">
                            <span className="text-flow-foreground/70">{t('tasksCompleted')}</span>
                            <span className="text-flow-foreground">1,452</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div className="mt-auto pt-3 flex flex-wrap gap-2">
                    {agent.status === 'working' ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-xs h-7 bg-flow-background/30 border-flow-border/50"
                        onClick={() => handleAgentAction('pause', agent)}
                      >
                        <Pause className="h-3 w-3 mr-1" />
                        {t('pause')}
                      </Button>
                    ) : agent.status === 'paused' ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-xs h-7 bg-flow-background/30 border-flow-border/50"
                        onClick={() => handleAgentAction('resume', agent)}
                      >
                        <Play className="h-3 w-3 mr-1" />
                        {t('resume')}
                      </Button>
                    ) : agent.status === 'error' ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-xs h-7 border-red-500/50 text-red-500 hover:bg-red-500/10"
                        onClick={() => handleAgentAction('restart', agent)}
                      >
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {t('restart')}
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-xs h-7 bg-flow-background/30 border-flow-border/50"
                        onClick={() => handleAgentAction('activate', agent)}
                      >
                        <Play className="h-3 w-3 mr-1" />
                        {t('activate')}
                      </Button>
                    )}
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs h-7 bg-flow-background/30 border-flow-border/50"
                      onClick={() => handleAgentAction('message', agent)}
                    >
                      <MessageCircle className="h-3 w-3 mr-1" />
                      {t('message')}
                    </Button>
                    
                    {!isExpanded && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-xs h-7 bg-flow-background/30 border-flow-border/50"
                        onClick={() => handleAgentAction('details', agent)}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        {t('details')}
                      </Button>
                    )}
                  </div>
                </div>
              </GlassMorphism>
            </motion.div>
          );
        })}
      </div>
      
      {filteredAgents.length === 0 && (
        <div className="text-center py-12">
          <div className="text-flow-muted-foreground text-sm">{t('noAgentsFound')}</div>
          <Button 
            variant="link" 
            onClick={() => setSearchTerm('')}
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
