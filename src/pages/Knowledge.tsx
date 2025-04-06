import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TransitionWrapper from '@/components/ui/TransitionWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Book, FileText, Search, Star, Tag, Users, 
  Calendar, Eye, Filter, ArrowUpDown, ExternalLink, 
  ThumbsUp, BookOpen, CheckCircle, PenLine, 
  Clock, TrendingUp, Bookmark, HelpCircle, Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from '@/components/ui/command';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import GlassMorphism from '@/components/ui/GlassMorphism';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';

const Knowledge = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('lastUpdated');
  const [sortOrder, setSortOrder] = useState('desc');
  const [openTagMenu, setOpenTagMenu] = useState(false);
  const [openTypeMenu, setOpenTypeMenu] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    // Load content with a slight delay to prevent flash
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const allKnowledgeItems = [
    {
      id: 'kb-1',
      title: 'AI Agent Collaboration Protocol',
      type: 'documentation',
      category: 'internal',
      lastUpdated: '2 days ago',
      author: 'Research Division',
      tags: ['agents', 'workflows', 'automation'],
      preview: 'This documentation outlines how AI agents collaborate within our ecosystem to accomplish complex tasks. It includes communication protocols, task delegation rules, and conflict resolution strategies.',
      views: 145,
      likes: 23,
      completion: 85,
      isNew: true,
      isBookmarked: false
    },
    {
      id: 'kb-2',
      title: 'Client Onboarding Workflow',
      type: 'process',
      category: 'client-facing',
      lastUpdated: '1 week ago',
      author: 'Operations Division',
      tags: ['onboarding', 'clients'],
      preview: 'A step-by-step guide on how to onboard new clients to our AI agency services. Includes questionnaire templates, kick-off meeting agenda, and initial configuration checklists.',
      views: 89,
      likes: 17,
      completion: 92,
      isNew: false,
      isBookmarked: true
    },
    {
      id: 'kb-3',
      title: 'Content Generation Best Practices',
      type: 'guide',
      category: 'internal',
      lastUpdated: '3 days ago',
      author: 'Content Division',
      tags: ['content', 'automation', 'best-practices'],
      preview: 'Guidelines for generating high-quality content using our AI agents. Covers tone adjustment, fact-checking procedures, and optimization techniques for different platforms.',
      views: 203,
      likes: 41,
      completion: 78,
      isNew: false,
      isBookmarked: false
    },
    {
      id: 'kb-4',
      title: 'SEO Optimization Techniques',
      type: 'research',
      category: 'client-facing',
      lastUpdated: '5 days ago',
      author: 'Research Division',
      tags: ['seo', 'marketing', 'optimization'],
      preview: 'Comprehensive research on the latest SEO optimization techniques. Includes analysis of recent algorithm changes, ranking factors, and practical implementation strategies.',
      views: 176,
      likes: 32,
      completion: 64,
      isNew: false,
      isBookmarked: false
    },
    {
      id: 'kb-5',
      title: 'Agency Security Protocols',
      type: 'policy',
      category: 'internal',
      lastUpdated: '1 month ago',
      author: 'Security Division',
      tags: ['security', 'compliance', 'protocols'],
      preview: 'Official security protocols for handling sensitive data within the agency. Includes access control policies, data encryption standards, and breach response procedures.',
      views: 82,
      likes: 9,
      completion: 100,
      isNew: false,
      isBookmarked: false
    },
    {
      id: 'kb-6',
      title: 'Market Analysis Framework',
      type: 'template',
      category: 'client-facing',
      lastUpdated: '2 weeks ago',
      author: 'Strategy Division',
      tags: ['market-analysis', 'templates', 'strategy'],
      preview: 'Framework template for conducting comprehensive market analysis. Includes competitor research methods, market sizing calculations, and trend identification strategies.',
      views: 124,
      likes: 27,
      completion: 88,
      isNew: false,
      isBookmarked: false
    },
    {
      id: 'kb-7',
      title: 'Brand Voice Development Guide',
      type: 'guide',
      category: 'client-facing',
      lastUpdated: '1 day ago',
      author: 'Brand Division',
      tags: ['branding', 'voice', 'identity'],
      preview: 'A comprehensive guide to developing consistent brand voice and tone. Includes exercises for brand personality definition, voice attribute selection, and application examples.',
      views: 67,
      likes: 15,
      completion: 72,
      isNew: false,
      isBookmarked: false
    },
    {
      id: 'kb-8',
      title: 'AI Ethics Framework',
      type: 'policy',
      category: 'internal',
      lastUpdated: '2 months ago',
      author: 'Ethics Committee',
      tags: ['ethics', 'AI', 'governance'],
      preview: 'Our agency\'s ethical guidelines for AI development and deployment. Covers data privacy, fairness, transparency, accountability, and responsible innovation practices.',
      views: 193,
      likes: 46,
      completion: 95,
      isNew: false,
      isBookmarked: false
    }
  ];

  const allTags = [...new Set(allKnowledgeItems.flatMap(item => item.tags))];
  
  const allTypes = [...new Set(allKnowledgeItems.map(item => item.type))];

  useEffect(() => {
    let filtered = [...allKnowledgeItems];
    
    // Filter by tab selection (category)
    if (activeTab !== 'all') {
      filtered = filtered.filter(item => item.category === activeTab);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.preview.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(item => 
        selectedTags.some(tag => item.tags.includes(tag))
      );
    }
    
    // Filter by types
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(item => 
        selectedTypes.includes(item.type)
      );
    }
    
    // Sort the filtered items
    filtered.sort((a, b) => {
      if (sortBy === 'title') {
        return sortOrder === 'asc' 
          ? a.title.localeCompare(b.title) 
          : b.title.localeCompare(a.title);
      } else if (sortBy === 'views') {
        return sortOrder === 'asc' 
          ? a.views - b.views 
          : b.views - a.views;
      } else if (sortBy === 'likes') {
        return sortOrder === 'asc' 
          ? a.likes - b.likes 
          : b.likes - a.likes;
      } else {
        // Sort by last updated
        if (a.lastUpdated.includes('day') && b.lastUpdated.includes('week')) return sortOrder === 'desc' ? -1 : 1;
        if (a.lastUpdated.includes('week') && b.lastUpdated.includes('day')) return sortOrder === 'desc' ? 1 : -1;
        if (a.lastUpdated.includes('day') && b.lastUpdated.includes('month')) return sortOrder === 'desc' ? -1 : 1;
        if (a.lastUpdated.includes('month') && b.lastUpdated.includes('day')) return sortOrder === 'desc' ? 1 : -1;
        if (a.lastUpdated.includes('week') && b.lastUpdated.includes('month')) return sortOrder === 'desc' ? -1 : 1;
        if (a.lastUpdated.includes('month') && b.lastUpdated.includes('week')) return sortOrder === 'desc' ? 1 : -1;
        
        const aNumber = parseInt(a.lastUpdated.split(' ')[0]);
        const bNumber = parseInt(b.lastUpdated.split(' ')[0]);
        return sortOrder === 'asc' ? aNumber - bNumber : bNumber - aNumber;
      }
    });
    
    setFilteredItems(filtered);
  }, [searchTerm, selectedTags, selectedTypes, sortBy, sortOrder, activeTab]);

  const toggleTagFilter = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const toggleTypeFilter = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleViewItem = (item) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };
  
  const toggleBookmark = (itemId) => {
    // In a real app, this would update the state and persist to a database
    toast({
      title: "Bookmark Updated",
      description: "Article has been added to your bookmarks",
      duration: 3000,
    });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'documentation':
        return <Book className="w-5 h-5" />;
      case 'process':
        return <Users className="w-5 h-5" />;
      case 'guide':
        return <FileText className="w-5 h-5" />;
      case 'research':
        return <Search className="w-5 h-5" />;
      case 'policy':
        return <Star className="w-5 h-5" />;
      case 'template':
        return <Tag className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'documentation':
        return 'rgba(96, 165, 250, 0.8)'; // blue
      case 'process':
        return 'rgba(139, 92, 246, 0.8)'; // purple
      case 'guide':
        return 'rgba(34, 197, 94, 0.8)'; // green
      case 'research':
        return 'rgba(249, 115, 22, 0.8)'; // orange
      case 'policy':
        return 'rgba(236, 72, 153, 0.8)'; // pink
      case 'template':
        return 'rgba(234, 179, 8, 0.8)'; // yellow
      default:
        return 'rgba(75, 85, 99, 0.8)'; // gray
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
    setSelectedTypes([]);
    setSortBy('lastUpdated');
    setSortOrder('desc');
  };

  const getTrendingArticles = () => {
    // In a real app, this would fetch trending articles from an API
    return allKnowledgeItems
      .sort((a, b) => b.views - a.views)
      .slice(0, 3);
  };

  const getRecentlyUpdated = () => {
    // In a real app, this would fetch recently updated articles from an API
    const now = new Date();
    // Simulate some recent articles
    return allKnowledgeItems
      .filter(item => item.lastUpdated.includes('day'))
      .slice(0, 3);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-flow-background flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-flow-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-flow-background text-flow-foreground flex flex-col bg-[#0c0e16] bg-[radial-gradient(circle_at_center,rgba(30,41,59,0.4)_0,rgba(12,14,22,0.8)_50%)]">
      <Helmet>
        <title>Knowledge Base | FlowState Agency</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-16">
        <TransitionWrapper>
          {/* Header Section */}
          <GlassMorphism intensity="low" className="p-6 md:p-8 rounded-xl border border-flow-accent/20 mb-8 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div>
                <div className="flex items-center mb-4">
                  <div className="mr-4 bg-purple-500/20 p-3 rounded-xl backdrop-blur-sm border border-purple-500/30">
                    <Book className="h-8 w-8 text-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                      Knowledge Base
                    </h1>
                    <p className="text-flow-foreground/70 mt-1">
                      Access and manage the collective intelligence of FlowState Agency
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <div className="text-xs bg-flow-muted/50 px-3 py-1.5 rounded-full flex items-center backdrop-blur-sm border border-flow-border/30">
                  <span className="inline-block h-2 w-2 rounded-full bg-purple-500 animate-pulse mr-2"></span>
                  {filteredItems.length} Items
                </div>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs bg-flow-muted/30 hover:bg-flow-muted/50 border-flow-border"
                        onClick={() => toast({
                          title: "New Knowledge Item",
                          description: "Create a new knowledge base item",
                          duration: 3000,
                        })}
                      >
                        <PenLine className="h-3 w-3 mr-1" />
                        New Item
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Create a new knowledge item
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs bg-flow-muted/30 hover:bg-flow-muted/50 border-flow-border"
                        onClick={() => toast({
                          title: "Import Knowledge",
                          description: "Import knowledge from external sources",
                          duration: 3000,
                        })}
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        Import
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Import knowledge items from external sources
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="text-xs bg-flow-muted/30 hover:bg-flow-muted/50 border-flow-border h-9 px-3 py-2 rounded-md">
                        <HelpCircle className="h-3 w-3 mr-1" />
                        Help
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                          <li className="row-span-3">
                            <NavigationMenuLink asChild>
                              <a
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-flow-muted/50 to-flow-muted p-6 no-underline outline-none focus:shadow-md"
                                href="#"
                              >
                                <div className="mb-2 mt-4 text-lg font-medium text-flow-foreground">
                                  Knowledge Base Guide
                                </div>
                                <p className="text-sm text-flow-foreground/70">
                                  Learn how to effectively use and manage the knowledge base system.
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink asChild>
                              <a
                                href="#"
                                className="block select-none space-y-1 rounded-md p-3 hover:bg-flow-muted/30 hover:text-flow-accent"
                              >
                                <div className="text-sm font-medium">Quick Start</div>
                                <p className="text-xs text-flow-foreground/70">
                                  Get started with the knowledge base in minutes
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink asChild>
                              <a
                                href="#"
                                className="block select-none space-y-1 rounded-md p-3 hover:bg-flow-muted/30 hover:text-flow-accent"
                              >
                                <div className="text-sm font-medium">Search Tips</div>
                                <p className="text-xs text-flow-foreground/70">
                                  Learn advanced search techniques
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink asChild>
                              <a
                                href="#"
                                className="block select-none space-y-1 rounded-md p-3 hover:bg-flow-muted/30 hover:text-flow-accent"
                              >
                                <div className="text-sm font-medium">Contact Support</div>
                                <p className="text-xs text-flow-foreground/70">
                                  Get help from our support team
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>
          </GlassMorphism>
          
          {/* Quick Access Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <GlassMorphism 
              intensity="low" 
              className="p-5 rounded-xl animate-fade-in" 
              style={{ animationDelay: '100ms' }}
            >
              <div className="flex items-center mb-4">
                <TrendingUp className="h-5 w-5 text-blue-400 mr-2" />
                <h3 className="text-lg font-semibold">Trending</h3>
              </div>
              <div className="space-y-3">
                {getTrendingArticles().map((item, index) => (
                  <div 
                    key={`trending-${item.id}`}
                    className="flex items-center space-x-3 p-2 hover:bg-flow-muted/20 rounded-md transition-colors cursor-pointer"
                    onClick={() => handleViewItem(item)}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: getTypeColor(item.type) }}>
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.title}</p>
                      <div className="flex items-center text-xs text-flow-foreground/60">
                        <Eye className="h-3 w-3 mr-1" /> {item.views}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassMorphism>
            
            <GlassMorphism 
              intensity="low" 
              className="p-5 rounded-xl animate-fade-in" 
              style={{ animationDelay: '200ms' }}
            >
              <div className="flex items-center mb-4">
                <Clock className="h-5 w-5 text-green-400 mr-2" />
                <h3 className="text-lg font-semibold">Recently Updated</h3>
              </div>
              <div className="space-y-3">
                {getRecentlyUpdated().map((item, index) => (
                  <div 
                    key={`recent-${item.id}`}
                    className="flex items-center space-x-3 p-2 hover:bg-flow-muted/20 rounded-md transition-colors cursor-pointer"
                    onClick={() => handleViewItem(item)}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: getTypeColor(item.type) }}>
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.title}</p>
                      <div className="flex items-center text-xs text-flow-foreground/60">
                        <Calendar className="h-3 w-3 mr-1" /> {item.lastUpdated}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassMorphism>
            
            <GlassMorphism 
              intensity="low" 
              className="p-5 rounded-xl animate-fade-in" 
              style={{ animationDelay: '300ms' }}
            >
              <div className="flex items-center mb-4">
                <Bookmark className="h-5 w-5 text-purple-400 mr-2" />
                <h3 className="text-lg font-semibold">Bookmarked</h3>
              </div>
              <div className="space-y-3">
                {allKnowledgeItems.filter(item => item.isBookmarked).map((item, index) => (
                  <div 
                    key={`bookmark-${item.id}`}
                    className="flex items-center space-x-3 p-2 hover:bg-flow-muted/20 rounded-md transition-colors cursor-pointer"
                    onClick={() => handleViewItem(item)}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: getTypeColor(item.type) }}>
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.title}</p>
                      <div className="flex items-center text-xs text-flow-foreground/60">
                        <Calendar className="h-3 w-3 mr-1" /> {item.lastUpdated}
                      </div>
                    </div>
                  </div>
                ))}
                {allKnowledgeItems.filter(item => item.isBookmarked).length === 0 && (
                  <p className="text-sm text-flow-foreground/60 p-2">No bookmarked items yet. Click the bookmark icon on any knowledge item to save it for quick access.</p>
                )}
              </div>
            </GlassMorphism>
          </div>
          
          {/* Search & Filter Section */}
          <GlassMorphism 
            intensity="medium" 
            variant="default" 
            className="mb-8 p-5 space-y-4 relative overflow-hidden animate-fade-in"
            style={{
              boxShadow: `0 0 15px rgba(85, 120, 255, 0.3)`,
              borderColor: 'rgba(85, 120, 255, 0.3)',
              animationDelay: '400ms'
            }}
          >
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(0deg,transparent_0%,rgba(32,164,243,.1)_50%,transparent_100%)] animate-[scan_4s_ease-in-out_infinite]"></div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1 group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-flow-foreground/50 group-hover:text-flow-accent transition-colors duration-300" />
                <Input 
                  placeholder="Search knowledge base..." 
                  className="pl-10 bg-[rgba(11,15,25,0.8)] border-flow-border focus:border-flow-accent transition-all duration-300 h-11"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-flow-accent to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
              
              <div className="flex gap-2">
                <Popover open={openTagMenu} onOpenChange={setOpenTagMenu}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <PopoverTrigger asChild>
                          <Button 
                            variant="outline" 
                            className={`border-flow-border hover:border-flow-accent transition-all duration-300 h-11 ${selectedTags.length > 0 ? 'bg-flow-accent/20 border-flow-accent/50' : ''}`}
                          >
                            <Tag className="w-4 h-4 mr-2" />
                            Tags {selectedTags.length > 0 && `(${selectedTags.length})`}
                          </Button>
                        </PopoverTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        Filter by tags
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <PopoverContent className="w-56 p-2 bg-[rgba(11,15,25,0.9)] border border-flow-border rounded-md shadow-[0_0_15px_rgba(85,120,255,0.2)] backdrop-blur-md z-50">
                    <Command className="rounded-lg bg-transparent">
                      <CommandInput placeholder="Search tags..." className="border-b border-flow-border/30 h-9" />
                      <CommandList className="max-h-60 overflow-auto">
                        <CommandEmpty>No tags found.</CommandEmpty>
                        <CommandGroup>
                          {allTags.map((tag) => (
                            <CommandItem 
                              key={tag}
                              onSelect={() => toggleTagFilter(tag)}
                              className="flex items-center cursor-pointer hover:bg-flow-accent/10 transition-colors duration-300"
                            >
                              <div className={`mr-2 h-4 w-4 rounded-sm border flex items-center justify-center transition-colors duration-300 ${
                                selectedTags.includes(tag) ? 'bg-flow-accent border-flow-accent shadow-[0_0_8px_rgba(85,120,255,0.5)]' : 'border-flow-border'
                              }`}>
                                {selectedTags.includes(tag) && <CheckCircle className="h-3 w-3 text-white" />}
                              </div>
                              {tag}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                
                <Popover open={openTypeMenu} onOpenChange={setOpenTypeMenu}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <PopoverTrigger asChild>
                          <Button 
                            variant="outline" 
                            className={`border-flow-border hover:border-flow-accent transition-all duration-300 h-11 ${selectedTypes.length > 0 ? 'bg-flow-accent/20 border-flow-accent/50' : ''}`}
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Types {selectedTypes.length > 0 && `(${selectedTypes.length})`}
                          </Button>
                        </PopoverTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        Filter by content types
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <PopoverContent className="w-56 p-2 bg-[rgba(11,15,25,0.9)] border border-flow-border rounded-md shadow-[0_0_15px_rgba(85,120,255,0.2)] backdrop-blur-md z-50">
                    <Command className="rounded-lg bg-transparent">
                      <CommandInput placeholder="Search types..." className="border-b border-flow-border/30 h-9" />
                      <CommandList className="max-h-60 overflow-auto">
                        <CommandEmpty>No types found.</CommandEmpty>
                        <CommandGroup>
                          {allTypes.map((type) => (
                            <CommandItem 
                              key={type}
                              onSelect={() => toggleTypeFilter(type)}
                              className="flex items-center cursor-pointer hover:bg-flow-accent/10 transition-colors duration-300"
                            >
                              <div className={`mr-2 h-4 w-4 rounded-sm border flex items-center justify-center transition-colors duration-300 ${
                                selectedTypes.includes(type) ? 'bg-flow-accent border-flow-accent shadow-[0_0_8px_rgba(85,120,255,0.5)]' : 'border-flow-border'
                              }`}>
                                {selectedTypes.includes(type) && <CheckCircle className="h-3 w-3 text-white" />}
                              </div>
                              <span className="capitalize">{type}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="border-flow-border hover:border-flow
