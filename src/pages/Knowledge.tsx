
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
  ThumbsUp, BookOpen, CheckCircle, PenLine
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
import GlassMorphism from '@/components/ui/GlassMorphism';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

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
      completion: 85
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
      completion: 92
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
      completion: 78
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
      completion: 64
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
      completion: 100
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
      completion: 88
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
      completion: 72
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
      completion: 95
    }
  ];

  const allTags = [...new Set(allKnowledgeItems.flatMap(item => item.tags))];
  
  const allTypes = [...new Set(allKnowledgeItems.map(item => item.type))];

  useEffect(() => {
    let filtered = [...allKnowledgeItems];
    
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
  }, [searchTerm, selectedTags, selectedTypes, sortBy, sortOrder]);

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
      
      <main className="flex-1 container mx-auto px-4 py-24">
        <TransitionWrapper>
          <GlassMorphism intensity="low" className="p-6 rounded-xl border-flow-accent/30 animate-glow-pulse mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start">
              <div>
                <div className="flex items-center mb-4">
                  <div className="mr-4 bg-purple-500/20 p-3 rounded-xl backdrop-blur-sm border border-purple-500/30">
                    <Book className="h-8 w-8 text-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                  </div>
                  <h1 className="text-3xl font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                    Knowledge Base
                  </h1>
                </div>
                <p className="text-flow-foreground/70">
                  Access and manage the collective intelligence of FlowState Agency. 
                  Our knowledge base automatically updates with new insights and best practices.
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center gap-2">
                <div className="text-xs bg-flow-muted/50 px-3 py-1.5 rounded-full flex items-center backdrop-blur-sm border border-flow-border/30">
                  <span className="inline-block h-2 w-2 rounded-full bg-purple-500 animate-pulse mr-2"></span>
                  8 Categories
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs bg-flow-muted/30 hover:bg-flow-muted/50 border-flow-border"
                  onClick={() => toast({
                    title: "Knowledge Actions",
                    description: "Quick knowledge base actions panel",
                    duration: 3000,
                  })}
                >
                  <FileText className="h-3 w-3 mr-1" />
                  Quick Access
                </Button>
              </div>
            </div>
          </GlassMorphism>
          
          <GlassMorphism 
            intensity="medium" 
            variant="default" 
            className="mb-8 p-5 space-y-4 relative overflow-hidden"
            style={{
              boxShadow: `0 0 15px rgba(85, 120, 255, 0.3)`,
              borderColor: 'rgba(85, 120, 255, 0.3)'
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
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className={`border-flow-border hover:border-flow-accent transition-all duration-300 h-11 ${selectedTags.length > 0 ? 'bg-flow-accent/20 border-flow-accent/50' : ''}`}
                    >
                      <Tag className="w-4 h-4 mr-2" />
                      Tags {selectedTags.length > 0 && `(${selectedTags.length})`}
                    </Button>
                  </PopoverTrigger>
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
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className={`border-flow-border hover:border-flow-accent transition-all duration-300 h-11 ${selectedTypes.length > 0 ? 'bg-flow-accent/20 border-flow-accent/50' : ''}`}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Types {selectedTypes.length > 0 && `(${selectedTypes.length})`}
                    </Button>
                  </PopoverTrigger>
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
                
                <Button 
                  variant="outline" 
                  className="border-flow-border hover:border-flow-accent transition-all duration-300 h-11"
                  onClick={toggleSortOrder}
                >
                  <ArrowUpDown className={`w-4 h-4 mr-2 transition-transform duration-300 ${sortOrder === 'desc' ? 'rotate-0' : 'rotate-180'}`} />
                  {sortBy === 'lastUpdated' ? 'Date' : 
                   sortBy === 'title' ? 'Title' :
                   sortBy === 'views' ? 'Views' : 'Likes'}
                </Button>
              </div>
              
              <div className="flex">
                <Button 
                  variant="ghost"
                  size="sm"
                  className={`${sortBy === 'lastUpdated' ? 'text-flow-accent' : 'text-flow-foreground/60'} hover:text-flow-accent transition-colors duration-300`}
                  onClick={() => setSortBy('lastUpdated')}
                >
                  <Calendar className="w-4 h-4 mr-1" />
                  Date
                </Button>
                <Button 
                  variant="ghost"
                  size="sm"
                  className={`${sortBy === 'title' ? 'text-flow-accent' : 'text-flow-foreground/60'} hover:text-flow-accent transition-colors duration-300`}
                  onClick={() => setSortBy('title')}
                >
                  <BookOpen className="w-4 h-4 mr-1" />
                  Title
                </Button>
                <Button 
                  variant="ghost"
                  size="sm"
                  className={`${sortBy === 'views' ? 'text-flow-accent' : 'text-flow-foreground/60'} hover:text-flow-accent transition-colors duration-300`}
                  onClick={() => setSortBy('views')}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Views
                </Button>
                <Button 
                  variant="ghost"
                  size="sm"
                  className={`${sortBy === 'likes' ? 'text-flow-accent' : 'text-flow-foreground/60'} hover:text-flow-accent transition-colors duration-300`}
                  onClick={() => setSortBy('likes')}
                >
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  Likes
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 items-center mt-2">
              <span className="text-sm text-flow-foreground/60">Active filters:</span>
              
              {selectedTags.map(tag => (
                <Badge 
                  key={tag} 
                  className="bg-flow-accent/20 text-flow-accent border-flow-accent/30 cursor-pointer hover:bg-flow-accent/30 transition-colors duration-300"
                  onClick={() => toggleTagFilter(tag)}
                >
                  {tag} ×
                </Badge>
              ))}
              
              {selectedTypes.map(type => (
                <Badge 
                  key={type} 
                  className="bg-flow-muted/30 text-flow-foreground/80 border-flow-border cursor-pointer hover:bg-flow-muted/50 transition-colors duration-300"
                  onClick={() => toggleTypeFilter(type)}
                >
                  {type} ×
                </Badge>
              ))}
              
              {(selectedTags.length > 0 || selectedTypes.length > 0 || searchTerm) && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-flow-foreground/60 hover:text-flow-accent h-7 transition-colors duration-300"
                  onClick={resetFilters}
                >
                  Clear all
                </Button>
              )}
            </div>
          </GlassMorphism>
          
          <Tabs defaultValue="all" className="mb-6">
            <TabsList className="w-full max-w-md mb-8 bg-[rgba(11,15,25,0.5)] border border-flow-border/30 p-1">
              <TabsTrigger value="all" className="flex-1 data-[state=active]:bg-flow-accent/20 data-[state=active]:text-flow-accent data-[state=active]:shadow-[0_0_10px_rgba(85,120,255,0.3)] transition-all duration-300">All</TabsTrigger>
              <TabsTrigger value="internal" className="flex-1 data-[state=active]:bg-flow-accent/20 data-[state=active]:text-flow-accent data-[state=active]:shadow-[0_0_10px_rgba(85,120,255,0.3)] transition-all duration-300">Internal</TabsTrigger>
              <TabsTrigger value="client-facing" className="flex-1 data-[state=active]:bg-flow-accent/20 data-[state=active]:text-flow-accent data-[state=active]:shadow-[0_0_10px_rgba(85,120,255,0.3)] transition-all duration-300">Client Facing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map(item => (
                  <div 
                    key={item.id}
                    className="group relative"
                    onMouseEnter={() => setHoveredCard(item.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-flow-accent/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                    <Card 
                      className="border border-flow-border bg-[rgba(11,15,25,0.7)] hover:border-flow-accent/50 transition-all h-full flex flex-col rounded-xl overflow-hidden relative"
                    >
                      <div className={`absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden`}>
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-flow-accent to-transparent"></div>
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-flow-accent to-transparent"></div>
                        <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-flow-accent to-transparent"></div>
                        <div className="absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-flow-accent to-transparent"></div>
                      </div>
                      
                      <div className="absolute -top-[150%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(85,120,255,0.15),transparent_20%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      
                      <CardHeader className="pb-2 relative">
                        <div className="flex items-center gap-2 mb-2">
                          <div 
                            className="p-1 rounded-md text-white transition-all duration-300"
                            style={{ 
                              backgroundColor: hoveredCard === item.id ? getTypeColor(item.type) : 'rgba(30, 41, 59, 0.7)',
                              boxShadow: hoveredCard === item.id ? `0 0 10px ${getTypeColor(item.type)}` : 'none'
                            }}
                          >
                            {getTypeIcon(item.type)}
                          </div>
                          <Badge 
                            variant="outline" 
                            className="text-xs capitalize border-flow-border/50 transition-colors duration-300"
                            style={{
                              borderColor: hoveredCard === item.id ? getTypeColor(item.type) : 'rgba(75, 85, 99, 0.5)'
                            }}
                          >
                            {item.type}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg font-orbitron group-hover:text-flow-accent transition-colors duration-300">{item.title}</CardTitle>
                        <CardDescription className="flex justify-between items-center mt-1">
                          <span>{item.author}</span>
                          <span className="text-xs">Updated {item.lastUpdated}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="mt-3 mb-4 text-sm text-flow-foreground/80 bg-[rgba(11,15,25,0.5)] p-3 rounded-md border border-flow-border/30 transition-all duration-300 group-hover:border-flow-border/50 line-clamp-3">
                          {item.preview}
                        </div>
                        
                        <div className="mb-4 px-1">
                          <div className="flex justify-between text-xs text-flow-foreground/60 mb-1">
                            <span>Completion</span>
                            <span>{item.completion}%</span>
                          </div>
                          <Progress 
                            value={item.completion} 
                            className="h-1.5"
                            indicatorColor={getTypeColor(item.type)}
                          />
                        </div>
                        
                        <div className="flex justify-between text-xs text-flow-foreground/60 mb-3">
                          <div className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {item.views} views
                          </div>
                          <div className="flex items-center">
                            <ThumbsUp className="w-3 h-3 mr-1" />
                            {item.likes} likes
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.tags.map(tag => (
                            <Badge 
                              key={tag} 
                              variant="secondary" 
                              className="text-xs cursor-pointer hover:bg-flow-muted/30 transition-colors duration-300 bg-[rgba(30,41,59,0.3)]"
                              onClick={() => toggleTagFilter(tag)}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0 flex justify-between">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-flow-foreground/60 hover:text-flow-accent transition-colors duration-300"
                        >
                          <PenLine className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          size="sm"
                          className="text-flow-accent hover:text-white hover:bg-flow-accent/20 flex items-center transition-all duration-300 border border-flow-accent/20 hover:border-flow-accent/60 bg-transparent"
                          onClick={() => handleViewItem(item)}
                          style={{
                            boxShadow: hoveredCard === item.id ? `0 0 15px rgba(85, 120, 255, 0.3)` : 'none'
                          }}
                        >
                          View Details
                          <ExternalLink className="w-4 h-4 ml-1" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </TransitionWrapper>
      </main>
      
      <Footer />
      
      {/* Item Details Dialog */}
      {selectedItem && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-[rgba(11,15,25,0.95)] border-flow-accent/20 max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-3">
                <div 
                  className="p-2 rounded-md"
                  style={{ backgroundColor: getTypeColor(selectedItem.type) }}
                >
                  {getTypeIcon(selectedItem.type)}
                </div>
                {selectedItem.title}
              </DialogTitle>
              <DialogDescription className="flex justify-between items-center">
                <span>{selectedItem.author}</span>
                <span>Last updated {selectedItem.lastUpdated}</span>
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="bg-[rgba(11,15,25,0.7)] p-4 rounded-lg border border-flow-border/30">
                <p>{selectedItem.preview}</p>
                <p className="mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget justo nec nisi efficitur tincidunt. 
                  Mauris euismod, nisi id faucibus hendrerit, nisl nunc ultricies risus, eget ultricies nisl nunc id nisi.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedItem.tags.map(tag => (
                  <Badge 
                    key={tag}
                    variant="outline"
                    className="bg-flow-accent/10 text-flow-accent/90 border-flow-accent/30"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex justify-between items-center text-sm text-flow-foreground/70">
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {selectedItem.views} views
                  </div>
                  <div className="flex items-center">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    {selectedItem.likes} likes
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className="mr-2">Completion:</span>
                  <Progress 
                    value={selectedItem.completion} 
                    className="h-2 w-24"
                    indicatorColor={getTypeColor(selectedItem.type)}
                  />
                  <span className="ml-2">{selectedItem.completion}%</span>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Knowledge;
