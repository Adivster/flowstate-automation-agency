
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
  Clock, TrendingUp, Bookmark, HelpCircle, Info,
  Grid, List, MoreHorizontal
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
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
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
    
    if (activeTab !== 'all') {
      filtered = filtered.filter(item => item.category === activeTab);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.preview.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (selectedTags.length > 0) {
      filtered = filtered.filter(item => 
        selectedTags.some(tag => item.tags.includes(tag))
      );
    }
    
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(item => 
        selectedTypes.includes(item.type)
      );
    }
    
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
    return allKnowledgeItems
      .sort((a, b) => b.views - a.views)
      .slice(0, 3);
  };

  const getRecentlyUpdated = () => {
    const now = new Date();
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
                        className="border-flow-border hover:border-flow-accent transition-all duration-300 h-11"
                        onClick={toggleSortOrder}
                      >
                        <ArrowUpDown className="w-4 h-4 mr-2" />
                        {sortOrder === 'asc' ? 'Asc' : 'Desc'}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Toggle sort direction
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className="border-flow-border hover:border-flow-accent transition-all duration-300 h-11"
                        onClick={resetFilters}
                      >
                        <Filter className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Reset all filters
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className="border-flow-border hover:border-flow-accent transition-all duration-300 h-11"
                        onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                      >
                        {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Toggle view mode
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            
            <Tabs defaultValue="all" className="w-full mt-4" onValueChange={value => setActiveTab(value)}>
              <TabsList className="bg-flow-muted/30 border border-flow-border/30 p-1 w-full flex mb-4 rounded-md overflow-x-auto">
                <TabsTrigger 
                  value="all"
                  className="flex-1 data-[state=active]:bg-flow-accent/20 data-[state=active]:text-flow-accent rounded-sm transition-all"
                >
                  All
                </TabsTrigger>
                <TabsTrigger 
                  value="internal"
                  className="flex-1 data-[state=active]:bg-flow-accent/20 data-[state=active]:text-flow-accent rounded-sm transition-all"
                >
                  Internal
                </TabsTrigger>
                <TabsTrigger 
                  value="client-facing"
                  className="flex-1 data-[state=active]:bg-flow-accent/20 data-[state=active]:text-flow-accent rounded-sm transition-all"
                >
                  Client Facing
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                <div className={cn(
                  'grid gap-6',
                  viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
                )}>
                  {filteredItems.map((item) => (
                    <Card
                      key={item.id}
                      className={cn(
                        'border border-flow-border/30 bg-[rgba(11,15,25,0.6)] backdrop-blur-md transition-all duration-300',
                        viewMode === 'grid' ? '' : 'flex flex-row',
                        hoveredCard === item.id ? 'shadow-[0_0_15px_rgba(85,120,255,0.3)] border-flow-accent/30' : ''
                      )}
                      onMouseEnter={() => setHoveredCard(item.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      onClick={() => handleViewItem(item)}
                    >
                      {viewMode === 'grid' ? (
                        <>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div 
                                className="p-2 rounded-md flex items-center justify-center" 
                                style={{ backgroundColor: getTypeColor(item.type) }}
                              >
                                {getTypeIcon(item.type)}
                              </div>
                              {item.isNew && (
                                <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">New</Badge>
                              )}
                            </div>
                            <CardTitle className="mt-3 line-clamp-1">{item.title}</CardTitle>
                            <CardDescription className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1 text-flow-foreground/60" /> 
                              <span>Updated {item.lastUpdated}</span>
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-flow-foreground/70 line-clamp-2 mb-3">{item.preview}</p>
                            <div className="flex flex-wrap gap-1">
                              {item.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} className="bg-flow-accent/10 text-flow-accent hover:bg-flow-accent/20">
                                  {tag}
                                </Badge>
                              ))}
                              {item.tags.length > 3 && (
                                <Badge className="bg-flow-muted/30 hover:bg-flow-muted/40">
                                  +{item.tags.length - 3}
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                          <CardFooter className="border-t border-flow-border/20 pt-4 flex justify-between">
                            <div className="flex items-center text-sm text-flow-foreground/60">
                              <Progress 
                                value={item.completion} 
                                className="h-1.5 w-24" 
                                indicatorColor={getTypeColor(item.type)} 
                              />
                              <span className="ml-2 text-xs">{item.completion}%</span>
                            </div>
                            <div className="flex gap-2">
                              <div className="flex items-center text-xs text-flow-foreground/60">
                                <Eye className="h-3 w-3 mr-1" /> 
                                {item.views}
                              </div>
                              <div className="flex items-center text-xs text-flow-foreground/60">
                                <ThumbsUp className="h-3 w-3 mr-1" /> 
                                {item.likes}
                              </div>
                            </div>
                          </CardFooter>
                        </>
                      ) : (
                        <>
                          <div 
                            className="flex items-center justify-center p-4 border-r border-flow-border/30"
                            style={{ backgroundColor: `${getTypeColor(item.type)}10` }}
                          >
                            <div 
                              className="w-12 h-12 rounded-md flex items-center justify-center" 
                              style={{ backgroundColor: getTypeColor(item.type) }}
                            >
                              {getTypeIcon(item.type)}
                            </div>
                          </div>
                          <div className="flex flex-col flex-1 p-4">
                            <div className="flex justify-between items-start">
                              <h3 className="font-semibold">{item.title}</h3>
                              {item.isNew && (
                                <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 ml-2">New</Badge>
                              )}
                            </div>
                            <p className="text-sm text-flow-foreground/70 line-clamp-1 mt-1">{item.preview}</p>
                            <div className="flex items-center mt-2 text-xs text-flow-foreground/60">
                              <Calendar className="h-3 w-3 mr-1" /> 
                              <span className="mr-4">Updated {item.lastUpdated}</span>
                              <Eye className="h-3 w-3 mr-1" /> 
                              <span className="mr-4">{item.views}</span>
                              <ThumbsUp className="h-3 w-3 mr-1" /> 
                              <span>{item.likes}</span>
                            </div>
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex flex-wrap gap-1">
                                {item.tags.slice(0, 2).map((tag) => (
                                  <Badge key={tag} className="bg-flow-accent/10 text-flow-accent hover:bg-flow-accent/20">
                                    {tag}
                                  </Badge>
                                ))}
                                {item.tags.length > 2 && (
                                  <Badge className="bg-flow-muted/30 hover:bg-flow-muted/40">
                                    +{item.tags.length - 2}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center">
                                <Progress 
                                  value={item.completion} 
                                  className="h-1.5 w-24" 
                                  indicatorColor={getTypeColor(item.type)} 
                                />
                                <span className="ml-2 text-xs">{item.completion}%</span>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </Card>
                  ))}
                </div>
                
                {filteredItems.length === 0 && (
                  <div className="p-12 text-center rounded-lg border border-flow-border/30 bg-flow-muted/20">
                    <HelpCircle className="h-12 w-12 mx-auto text-flow-foreground/30 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No results found</h3>
                    <p className="text-flow-foreground/60">
                      Try adjusting your search or filters to find what you're looking for.
                    </p>
                    <Button 
                      onClick={resetFilters} 
                      variant="outline" 
                      className="mt-4"
                    >
                      Reset all filters
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="internal" className="mt-0">
                {/* This content is dynamically filtered by the useEffect */}
              </TabsContent>
              
              <TabsContent value="client-facing" className="mt-0">
                {/* This content is dynamically filtered by the useEffect */}
              </TabsContent>
            </Tabs>
          </GlassMorphism>
        </TransitionWrapper>
      </main>
      
      <Footer />
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto bg-[rgba(11,15,25,0.95)] backdrop-blur-lg border-flow-border/40">
          {selectedItem && (
            <>
              <DialogHeader>
                <div className="flex items-center mb-2">
                  <div 
                    className="p-2 rounded-md flex items-center justify-center mr-3" 
                    style={{ backgroundColor: getTypeColor(selectedItem.type) }}
                  >
                    {getTypeIcon(selectedItem.type)}
                  </div>
                  <DialogTitle className="text-2xl">{selectedItem.title}</DialogTitle>
                </div>
                <DialogDescription className="flex flex-wrap gap-3 items-center">
                  <Badge variant="outline" className="bg-flow-muted/30">{selectedItem.type}</Badge>
                  <span className="text-flow-foreground/60 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" /> Updated {selectedItem.lastUpdated}
                  </span>
                  <span className="text-flow-foreground/60 flex items-center">
                    <Users className="h-3 w-3 mr-1" /> By {selectedItem.author}
                  </span>
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Progress 
                    value={selectedItem.completion} 
                    className="h-2 flex-1" 
                    indicatorColor={getTypeColor(selectedItem.type)} 
                  />
                  <span className="ml-3 text-sm">{selectedItem.completion}% complete</span>
                </div>
                
                <p className="text-flow-foreground/80 leading-relaxed">
                  {selectedItem.preview}
                </p>
                
                <p className="text-flow-foreground/80 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam convallis libero in vulputate feugiat. 
                  Phasellus viverra ex in tempus lobortis. Aenean faucibus congue lacinia. 
                  Nullam auctor, nisi nec egestas volutpat, augue felis pellentesque libero, non consequat sem metus ac metus.
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Key points:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Implementation strategies for agency workflows</li>
                    <li>Integration with existing systems and processes</li>
                    <li>Performance metrics and measuring success</li>
                    <li>Common challenges and troubleshooting</li>
                  </ul>
                </div>
                
                <Separator className="my-4 bg-flow-border/20" />
                
                <div className="flex flex-wrap gap-2">
                  <h4 className="font-semibold mr-2">Tags:</h4>
                  {selectedItem.tags.map((tag) => (
                    <Badge key={tag} className="bg-flow-accent/10 text-flow-accent hover:bg-flow-accent/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <Separator className="my-4 bg-flow-border/20" />
                
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    className="bg-flow-muted/30 border-flow-border"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Close
                  </Button>
                  <div className="space-x-2">
                    <Button
                      variant="ghost"
                      className="border border-flow-border"
                      onClick={() => toggleBookmark(selectedItem.id)}
                    >
                      <Bookmark className="h-4 w-4 mr-2" />
                      Bookmark
                    </Button>
                    <Button
                      variant="default"
                      className="bg-flow-accent hover:bg-flow-accent/80"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Full Document
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Knowledge;
