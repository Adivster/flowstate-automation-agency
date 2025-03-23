
import React, { useState, useEffect } from 'react';
import { BookOpen, BarChart, LayoutGrid, Shield, DollarSign, MessagesSquare, Search, Filter, RefreshCw } from 'lucide-react';
import AgentCard from './AgentCard';
import TransitionWrapper from '../ui/TransitionWrapper';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

// Extended agent type with more properties
interface Agent {
  id: number;
  name: string;
  role: string;
  icon: React.ElementType;
  status: 'working' | 'idle' | 'paused' | 'error';
  efficiency: number;
  lastActivity: string;
  division: string;
  tags?: string[];
}

const AgentGrid: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'efficiency' | 'lastActivity'>('name');
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Full agents data
  const allAgents: Agent[] = [
    {
      id: 1,
      name: 'KB Content Agent',
      role: 'Knowledge Base Division',
      division: 'kb',
      icon: BookOpen,
      status: 'working',
      efficiency: 92,
      lastActivity: '2 minutes ago',
      tags: ['content', 'knowledge']
    },
    {
      id: 2,
      name: 'Security Agent',
      role: 'Strategy Division',
      division: 'strategy',
      icon: Shield,
      status: 'idle',
      efficiency: 87,
      lastActivity: '15 minutes ago',
      tags: ['security', 'compliance']
    },
    {
      id: 3,
      name: 'Dashboard Agent',
      role: 'Analytics Division',
      division: 'analytics',
      icon: BarChart,
      status: 'working',
      efficiency: 78,
      lastActivity: 'Just now',
      tags: ['data', 'visualization']
    },
    {
      id: 4,
      name: 'Integration Agent',
      role: 'Operations Division',
      division: 'operations',
      icon: LayoutGrid,
      status: 'paused',
      efficiency: 65,
      lastActivity: '1 hour ago',
      tags: ['integration', 'api']
    },
    {
      id: 5,
      name: 'Budget Agent',
      role: 'Finance Division',
      division: 'finance',
      icon: DollarSign,
      status: 'working',
      efficiency: 94,
      lastActivity: '5 minutes ago',
      tags: ['finance', 'reporting']
    },
    {
      id: 6,
      name: 'Support Agent',
      role: 'Customer Support Division',
      division: 'support',
      icon: MessagesSquare,
      status: 'working',
      efficiency: 89,
      lastActivity: 'Just now',
      tags: ['support', 'communication']
    },
  ];

  // Filter and sort agents
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      let filteredAgents = [...allAgents];
      
      // Apply search filter
      if (searchTerm) {
        filteredAgents = filteredAgents.filter(agent => 
          agent.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          agent.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agent.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
      
      // Apply division filter
      if (selectedDivision) {
        filteredAgents = filteredAgents.filter(agent => 
          agent.division === selectedDivision
        );
      }
      
      // Apply status filter
      if (selectedStatus) {
        filteredAgents = filteredAgents.filter(agent => 
          agent.status === selectedStatus
        );
      }
      
      // Apply sorting
      filteredAgents.sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        } else if (sortBy === 'efficiency') {
          return b.efficiency - a.efficiency;
        } else if (sortBy === 'lastActivity') {
          // Simple sort for demo (in real app would parse the time)
          if (a.lastActivity === 'Just now') return -1;
          if (b.lastActivity === 'Just now') return 1;
          if (a.lastActivity.includes('minute') && b.lastActivity.includes('hour')) return -1;
          if (a.lastActivity.includes('hour') && b.lastActivity.includes('minute')) return 1;
          return 0;
        }
        return 0;
      });
      
      setAgents(filteredAgents);
      setIsLoading(false);
    }, 400);
  }, [searchTerm, selectedDivision, selectedStatus, sortBy]);

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedDivision(null);
    setSelectedStatus(null);
    setSortBy('name');
    
    toast({
      title: "Filters reset",
      description: "All filters have been cleared",
      duration: 3000,
    });
  };

  // Apply a division filter
  const handleDivisionFilter = (division: string) => {
    setSelectedDivision(selectedDivision === division ? null : division);
  };

  // Apply a status filter
  const handleStatusFilter = (status: string) => {
    setSelectedStatus(selectedStatus === status ? null : status);
  };

  // Handle agent action (demo purpose)
  const handleAgentAction = (agentId: number, action: string) => {
    toast({
      title: `${action} initiated`,
      description: `Action ${action} has been sent to Agent #${agentId}`,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-flow-muted/20 p-3 rounded-lg">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-flow-foreground/50" />
          <Input
            placeholder="Search agents by name, role, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 bg-flow-background border-flow-border text-sm"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <Button 
            variant="outline" 
            size="sm"
            className={`text-xs ${selectedDivision === 'kb' ? 'bg-flow-accent/20 border-flow-accent' : ''}`}
            onClick={() => handleDivisionFilter('kb')}
          >
            <BookOpen className="h-3 w-3 mr-1" />
            Knowledge
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            className={`text-xs ${selectedDivision === 'analytics' ? 'bg-flow-accent/20 border-flow-accent' : ''}`}
            onClick={() => handleDivisionFilter('analytics')}
          >
            <BarChart className="h-3 w-3 mr-1" />
            Analytics
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            className={`text-xs ${selectedDivision === 'operations' ? 'bg-flow-accent/20 border-flow-accent' : ''}`}
            onClick={() => handleDivisionFilter('operations')}
          >
            <LayoutGrid className="h-3 w-3 mr-1" />
            Operations
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            className="text-xs"
            onClick={resetFilters}
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Reset
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-3">
        <Badge 
          variant="outline" 
          className={`cursor-pointer ${selectedStatus === 'working' ? 'bg-green-500/10 border-green-500 text-green-500' : ''}`}
          onClick={() => handleStatusFilter('working')}
        >
          Working
        </Badge>
        
        <Badge 
          variant="outline" 
          className={`cursor-pointer ${selectedStatus === 'idle' ? 'bg-gray-500/10 border-gray-500 text-gray-500' : ''}`}
          onClick={() => handleStatusFilter('idle')}
        >
          Idle
        </Badge>
        
        <Badge 
          variant="outline" 
          className={`cursor-pointer ${selectedStatus === 'paused' ? 'bg-amber-500/10 border-amber-500 text-amber-500' : ''}`}
          onClick={() => handleStatusFilter('paused')}
        >
          Paused
        </Badge>
        
        <Badge 
          variant="outline" 
          className={`cursor-pointer ${selectedStatus === 'error' ? 'bg-red-500/10 border-red-500 text-red-500' : ''}`}
          onClick={() => handleStatusFilter('error')}
        >
          Error
        </Badge>
        
        <div className="ml-auto flex gap-2">
          <Badge 
            variant="outline" 
            className={`cursor-pointer ${sortBy === 'name' ? 'bg-flow-accent/10 border-flow-accent text-flow-accent' : ''}`}
            onClick={() => setSortBy('name')}
          >
            Sort: Name
          </Badge>
          
          <Badge 
            variant="outline" 
            className={`cursor-pointer ${sortBy === 'efficiency' ? 'bg-flow-accent/10 border-flow-accent text-flow-accent' : ''}`}
            onClick={() => setSortBy('efficiency')}
          >
            Sort: Efficiency
          </Badge>
          
          <Badge 
            variant="outline" 
            className={`cursor-pointer ${sortBy === 'lastActivity' ? 'bg-flow-accent/10 border-flow-accent text-flow-accent' : ''}`}
            onClick={() => setSortBy('lastActivity')}
          >
            Sort: Recent Activity
          </Badge>
        </div>
      </div>
      
      {searchTerm || selectedDivision || selectedStatus ? (
        <div className="text-sm text-flow-foreground/70 mb-3">
          Showing {agents.length} {agents.length === 1 ? 'agent' : 'agents'} matching your filters
        </div>
      ) : null}
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[180px] bg-flow-muted/20 animate-pulse rounded-xl"></div>
          ))}
        </div>
      ) : agents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, index) => (
            <TransitionWrapper key={agent.id} delay={100 * (index % 6 + 1)}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <AgentCard 
                  {...agent} 
                  className="cursor-pointer transition-all duration-300 hover:shadow-lg"
                  onClick={() => handleAgentAction(agent.id, 'inspect')}
                />
              </motion.div>
            </TransitionWrapper>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-flow-muted/10 rounded-lg">
          <Filter className="h-12 w-12 text-flow-foreground/30 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-flow-foreground/70">No agents found</h3>
          <p className="text-sm text-flow-foreground/50 max-w-md mx-auto mt-2">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <Button 
            variant="outline" 
            size="sm"
            className="mt-4"
            onClick={resetFilters}
          >
            <RefreshCw className="h-3 w-3 mr-2" />
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default AgentGrid;
