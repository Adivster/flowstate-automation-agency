
import React, { useState, useEffect, useCallback } from 'react';
import { divisionStyles } from '../office/styles/divisionStyles';

// Sample agent data
const agentSampleData = [
  {
    id: 1,
    name: "Knowledge Engineer",
    role: "Information Architect",
    status: "working",
    division: "kb",
    efficiency: 95,
    lastActive: "2 mins ago",
    icon: "Book",
    tags: ["AI", "Research"]
  },
  {
    id: 2,
    name: "Security Analyst",
    role: "Threat Detector",
    status: "working",
    division: "strategy",
    efficiency: 87,
    lastActive: "5 mins ago",
    icon: "Shield",
    tags: ["Security", "Defense"]
  },
  {
    id: 3,
    name: "Data Analyst",
    role: "Pattern Recognition",
    status: "working",
    division: "analytics",
    efficiency: 93,
    lastActive: "Just now",
    icon: "BarChart",
    tags: ["Analytics", "Data"]
  },
  {
    id: 4,
    name: "Operations Manager",
    role: "Process Coordinator",
    status: "working",
    division: "operations",
    efficiency: 89,
    lastActive: "1 min ago",
    icon: "Settings",
    tags: ["Operations", "Management"]
  },
  {
    id: 5,
    name: "Strategic Planner",
    role: "Business Intelligence",
    status: "paused",
    division: "strategy",
    efficiency: 76,
    lastActive: "30 mins ago",
    icon: "TrendingUp",
    tags: ["Strategy", "Planning"]
  },
  {
    id: 6,
    name: "Research Lead",
    role: "Innovation Director",
    status: "working",
    division: "research",
    efficiency: 91,
    lastActive: "3 mins ago",
    icon: "Flask",
    tags: ["Research", "Development"]
  },
  {
    id: 7,
    name: "Data Architect",
    role: "Information Systems",
    status: "working",
    division: "analytics",
    efficiency: 88,
    lastActive: "7 mins ago",
    icon: "Database",
    tags: ["Architecture", "Data"]
  },
  {
    id: 8,
    name: "DevOps Engineer",
    role: "Infrastructure Specialist",
    status: "error",
    division: "operations",
    efficiency: 65,
    lastActive: "15 mins ago",
    icon: "Server",
    tags: ["DevOps", "Infrastructure"]
  },
  {
    id: 9,
    name: "KB Expert",
    role: "Knowledge Management",
    status: "idle",
    division: "kb",
    efficiency: 83,
    lastActive: "10 mins ago",
    icon: "FileText",
    tags: ["Knowledge", "Management"]
  },
  {
    id: 10,
    name: "Lounge Attendant",
    role: "Resource Coordinator",
    status: "working",
    division: "lounge",
    efficiency: 92,
    lastActive: "Just now",
    icon: "Coffee",
    tags: ["Support", "Resources"]
  }
];

export const useAgentData = (maxAgents?: number) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedAgent, setExpandedAgent] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    status: 'all',
    division: 'all',
    efficiency: 'all'
  });
  
  // Create a map of division colors for consistent styling
  const divisionColors = {
    kb: {
      bg: 'bg-indigo-500/10',
      text: 'text-indigo-500',
      border: 'border-indigo-500/30'
    },
    analytics: {
      bg: 'bg-yellow-500/10',
      text: 'text-yellow-500',
      border: 'border-yellow-500/30'
    },
    operations: {
      bg: 'bg-purple-500/10',
      text: 'text-purple-500',
      border: 'border-purple-500/30'
    },
    strategy: {
      bg: 'bg-blue-500/10',
      text: 'text-blue-500',
      border: 'border-blue-500/30'
    },
    research: {
      bg: 'bg-green-500/10',
      text: 'text-green-500',
      border: 'border-green-500/30'
    },
    lounge: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-500',
      border: 'border-amber-500/30'
    },
  };
  
  // Function to handle data refresh
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    
    setTimeout(() => {
      // In a real app, this would fetch fresh data
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 1000);
  }, []);
  
  // Format the last update time
  const formatLastUpdateTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins === 1) return '1 minute ago';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return '1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };
  
  // Filter agents based on search term and filters
  const filteredAgents = React.useMemo(() => {
    let result = [...agentSampleData];
    
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      result = result.filter(agent => 
        agent.name.toLowerCase().includes(lowerCaseSearch) || 
        agent.role.toLowerCase().includes(lowerCaseSearch) ||
        agent.division.toLowerCase().includes(lowerCaseSearch)
      );
    }
    
    if (searchFilters.status !== 'all') {
      result = result.filter(agent => agent.status === searchFilters.status);
    }
    
    if (searchFilters.division !== 'all') {
      result = result.filter(agent => agent.division === searchFilters.division);
    }
    
    if (searchFilters.efficiency !== 'all') {
      switch(searchFilters.efficiency) {
        case 'high':
          result = result.filter(agent => agent.efficiency >= 90);
          break;
        case 'medium':
          result = result.filter(agent => agent.efficiency >= 70 && agent.efficiency < 90);
          break;
        case 'low':
          result = result.filter(agent => agent.efficiency < 70);
          break;
      }
    }
    
    if (maxAgents && result.length > maxAgents) {
      result = result.slice(0, maxAgents);
    }
    
    return result;
  }, [searchTerm, searchFilters, maxAgents]);
  
  // Return all needed values and functions
  return {
    searchTerm,
    setSearchTerm,
    expandedAgent,
    setExpandedAgent,
    viewMode,
    setViewMode,
    lastUpdated,
    isRefreshing,
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
