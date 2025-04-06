
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  Cpu, Database, Book, BarChart3, TestTube
} from 'lucide-react';

export const useAgentData = (maxAgents?: number) => {
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
        agent.division.toLowerCase().includes(searchTerm.toLowerCase());
        
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
  
  return {
    searchTerm,
    setSearchTerm,
    expandedAgent,
    setExpandedAgent,
    viewMode,
    setViewMode,
    lastUpdated,
    isRefreshing,
    setIsRefreshing,
    advancedSearch,
    setAdvancedSearch,
    searchFilters,
    setSearchFilters,
    handleRefresh,
    divisionColors,
    formatLastUpdateTime,
    filteredAgents
  };
};
