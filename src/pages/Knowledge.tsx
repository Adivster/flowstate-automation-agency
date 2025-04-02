
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
import { useState, useEffect } from 'react';
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
import GlassMorphism from '@/components/ui/GlassMorphism';

const Knowledge = () => {
  // States for filtering and sorting
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

  // Sample knowledge base data - in a real app, this would come from an API
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

  // All unique tags from knowledge items
  const allTags = [...new Set(allKnowledgeItems.flatMap(item => item.tags))];
  
  // All unique document types
  const allTypes = [...new Set(allKnowledgeItems.map(item => item.type))];

  // Filter and sort items based on search term, filters, and sorting options
  useEffect(() => {
    let filtered = [...allKnowledgeItems];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.preview.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply tag filters
    if (selectedTags.length > 0) {
      filtered = filtered.filter(item => 
        selectedTags.some(tag => item.tags.includes(tag))
      );
    }
    
    // Apply type filters
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(item => 
        selectedTypes.includes(item.type)
      );
    }
    
    // Apply sorting
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
        // Default sort by lastUpdated
        // Simple string-based comparison for demo
        if (a.lastUpdated.includes('day') && b.lastUpdated.includes('week')) return sortOrder === 'desc' ? -1 : 1;
        if (a.lastUpdated.includes('week') && b.lastUpdated.includes('day')) return sortOrder === 'desc' ? 1 : -1;
        if (a.lastUpdated.includes('day') && b.lastUpdated.includes('month')) return sortOrder === 'desc' ? -1 : 1;
        if (a.lastUpdated.includes('month') && b.lastUpdated.includes('day')) return sortOrder === 'desc' ? 1 : -1;
        if (a.lastUpdated.includes('week') && b.lastUpdated.includes('month')) return sortOrder === 'desc' ? -1 : 1;
        if (a.lastUpdated.includes('month') && b.lastUpdated.includes('week')) return sortOrder === 'desc' ? 1 : -1;
        
        // If same unit, compare numbers
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

  return (
    <div className="min-h-screen bg-flow-background text-flow-foreground flex flex-col bg-[#0c0e16] bg-[radial-gradient(circle_at_center,rgba(30,41,59,0.4)_0,rgba(12,14,22,0.8)_50%)]">
      <Helmet>
        <title>Knowledge Base | FlowState Agency</title>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-24">
        <TransitionWrapper>
          <div className="mb-8">
            <h1 className="text-3xl font-orbitron font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-flow-accent to-blue-400 animate-pulse">Knowledge Base</h1>
            <p className="text-flow-foreground/80 max-w-3xl font-light">
              Access and manage the collective intelligence of FlowState Agency. 
              Our knowledge base automatically updates with new insights and best practices.
            </p>
            <div className="w-32 h-1 mt-3 mb-6 bg-gradient-to-r from-flow-accent via-blue-400 to-flow-accent rounded-full"></div>
          </div>
          
          {/* Enhanced Search and Filter Section */}
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
                {/* Tag Filter */}
                <div className="relative">
                  <Button 
                    variant="outline" 
                    className={`border-flow-border hover:border-flow-accent transition-all duration-300 h-11 ${selectedTags.length > 0 ? 'bg-flow-accent/20 border-flow-accent/50' : ''}`}
                    onClick={() => setOpenTagMenu(!openTagMenu)}
                  >
                    <Tag className="w-4 h-4 mr-2" />
                    Tags {selectedTags.length > 0 && `(${selectedTags.length})`}
                  </Button>
                  {openTagMenu && (
                    <div className="absolute z-10 mt-2 w-56 p-2 bg-[rgba(11,15,25,0.9)] border border-flow-border rounded-md shadow-[0_0_15px_rgba(85,120,255,0.2)] backdrop-blur-md">
                      <Command className="rounded-lg bg-transparent">
                        <CommandInput placeholder="Search tags..." className="border-b border-flow-border/30 h-9" />
                        <CommandList>
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
                    </div>
                  )}
                </div>
                
                {/* Type Filter */}
                <div className="relative">
                  <Button 
                    variant="outline" 
                    className={`border-flow-border hover:border-flow-accent transition-all duration-300 h-11 ${selectedTypes.length > 0 ? 'bg-flow-accent/20 border-flow-accent/50' : ''}`}
                    onClick={() => setOpenTypeMenu(!openTypeMenu)}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Types {selectedTypes.length > 0 && `(${selectedTypes.length})`}
                  </Button>
                  {openTypeMenu && (
                    <div className="absolute z-10 mt-2 w-56 p-2 bg-[rgba(11,15,25,0.9)] border border-flow-border rounded-md shadow-[0_0_15px_rgba(85,120,255,0.2)] backdrop-blur-md">
                      <Command className="rounded-lg bg-transparent">
                        <CommandInput placeholder="Search types..." className="border-b border-flow-border/30 h-9" />
                        <CommandList>
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
                    </div>
                  )}
                </div>
                
                {/* Sort Button */}
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
              
              {/* Sort Options */}
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
            
            {/* Active Filters */}
            {(selectedTags.length > 0 || selectedTypes.length > 0 || searchTerm) && (
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
            )}
          </GlassMorphism>
          
          {/* Tabs for Category Filtering */}
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
                        {/* Content Preview */}
                        <div className="mt-3 mb-4 text-sm text-flow-foreground/80 bg-[rgba(11,15,25,0.5)] p-3 rounded-md border border-flow-border/30 transition-all duration-300 group-hover:border-flow-border/50 line-clamp-3">
                          {item.preview}
                        </div>
                        
                        {/* Progress bar */}
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
              
              {filteredItems.length === 0 && (
                <div className="text-center py-12 text-flow-foreground/50">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <h3 className="text-lg font-medium">No knowledge items found</h3>
                  <p className="text-sm">Try adjusting your search or filters</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="internal" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems
                  .filter(item => item.category === 'internal')
                  .map(item => (
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
                          {/* Content Preview */}
                          <div className="mt-3 mb-4 text-sm text-flow-foreground/80 bg-[rgba(11,15,25,0.5)] p-3 rounded-md border border-flow-border/30 transition-all duration-300 group-hover:border-flow-border/50 line-clamp-3">
                            {item.preview}
                          </div>
                          
                          {/* Progress bar */}
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
                  
                {filteredItems.filter(item => item.category === 'internal').length === 0 && (
                  <div className="text-center py-12 text-flow-foreground/50 col-span-3">
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <h3 className="text-lg font-medium">No internal knowledge items found</h3>
                    <p className="text-sm">Try adjusting your search or filters</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="client-facing" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems
                  .filter(item => item.category === 'client-facing')
                  .map(item => (
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
                          {/* Content Preview */}
                          <div className="mt-3 mb-4 text-sm text-flow-foreground/80 bg-[rgba(11,15,25,0.5)] p-3 rounded-md border border-flow-border/30 transition-all duration-300 group-hover:border-flow-border/50 line-clamp-3">
                            {item.preview}
                          </div>
                          
                          {/* Progress bar */}
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
                  
                {filteredItems.filter(item => item.category === 'client-facing').length === 0 && (
                  <div className="text-center py-12 text-flow-foreground/50 col-span-3">
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <h3 className="text-lg font-medium">No client-facing knowledge items found</h3>
                    <p className="text-sm">Try adjusting your search or filters</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Document Preview Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-4xl bg-[rgba(11,15,25,0.9)] border-flow-border/50 shadow-[0_0_30px_rgba(85,120,255,0.2)] backdrop-blur-lg rounded-xl">
              {selectedItem && (
                <>
                  <DialogHeader className="relative">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-flow-accent to-transparent"></div>
                    <div className="absolute -left-5 -right-5 -top-5 h-20 pointer-events-none bg-gradient-to-b from-flow-accent/10 to-transparent opacity-50"></div>
                    <div className="flex items-center gap-2 mb-2">
                      <div 
                        className="p-1.5 rounded-md text-white"
                        style={{ 
                          backgroundColor: getTypeColor(selectedItem.type),
                          boxShadow: `0 0 15px ${getTypeColor(selectedItem.type)}`
                        }}
                      >
                        {getTypeIcon(selectedItem.type)}
                      </div>
                      <Badge variant="outline" className="text-xs capitalize border-flow-accent/30">
                        {selectedItem.type}
                      </Badge>
                      <Badge 
                        variant={selectedItem.category === 'internal' ? 'default' : 'secondary'} 
                        className="text-xs"
                        style={{
                          backgroundColor: selectedItem.category === 'internal' 
                            ? 'rgba(85, 120, 255, 0.2)' 
                            : 'rgba(30, 41, 59, 0.3)',
                          borderColor: selectedItem.category === 'internal'
                            ? 'rgba(85, 120, 255, 0.3)'
                            : 'rgba(75, 85, 99, 0.3)',
                          boxShadow: selectedItem.category === 'internal'
                            ? '0 0 10px rgba(85, 120, 255, 0.2)'
                            : 'none'
                        }}
                      >
                        {selectedItem.category}
                      </Badge>
                    </div>
                    <DialogTitle className="text-2xl font-orbitron text-flow-accent">{selectedItem.title}</DialogTitle>
                    <DialogDescription className="flex justify-between items-center mt-1">
                      <span>Created by {selectedItem.author}</span>
                      <span className="text-sm">Updated {selectedItem.lastUpdated}</span>
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="mt-4">
                    {/* Progress indicator */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-flow-foreground/60 mb-1">
                        <span>Document Completion</span>
                        <span>{selectedItem.completion}%</span>
                      </div>
                      <Progress 
                        value={selectedItem.completion} 
                        className="h-2"
                        indicatorColor={getTypeColor(selectedItem.type)}
                      />
                    </div>
                    
                    {/* Full Content Preview */}
                    <GlassMorphism 
                      intensity="low" 
                      className="p-5 mb-6 text-flow-foreground/90 relative overflow-hidden"
                      style={{
                        boxShadow: `0 0 20px rgba(85, 120, 255, 0.1)`,
                        borderColor: 'rgba(85, 120, 255, 0.2)'
                      }}
                    >
                      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
                        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(0deg,transparent_0%,rgba(32,164,243,.1)_50%,transparent_100%)] animate-[scan_4s_ease-in-out_infinite]"></div>
                      </div>
                      
                      <p className="mb-4">
                        {selectedItem.preview}
                      </p>
                      <p>
                        This is an extended preview of the document contents. In a production environment, 
                        this would contain the full document content. The content could include formatting,
                        images, links, and other interactive elements.
                      </p>
                    </GlassMorphism>
                    
                    {/* Related Data */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="text-lg font-semibold font-orbitron mb-3 text-flow-accent">Related Documents</h3>
                        <div className="space-y-3">
                          {allKnowledgeItems
                            .filter(item => 
                              item.id !== selectedItem.id && 
                              item.tags.some(tag => selectedItem.tags.includes(tag))
                            )
                            .slice(0, 3)
                            .map(item => (
                              <div 
                                key={item.id} 
                                className="p-3 border border-flow-border/30 rounded-md flex items-center hover:border-flow-accent/50 transition-all cursor-pointer bg-[rgba(11,15,25,0.5)] hover:bg-[rgba(11,15,25,0.7)] group"
                                onClick={() => setSelectedItem(item)}
                              >
                                <div 
                                  className="p-1 rounded-md text-white mr-3 transition-all duration-300 group-hover:scale-110"
                                  style={{ 
                                    backgroundColor: 'rgba(30, 41, 59, 0.7)',
                                    boxShadow: 'none'
                                  }}
                                >
                                  {getTypeIcon(item.type)}
                                </div>
                                <div>
                                  <div className="font-medium group-hover:text-flow-accent transition-colors duration-300">{item.title}</div>
                                  <div className="text-xs text-flow-foreground/60">{item.author}</div>
                                </div>
                                <div 
                                  className="ml-auto w-1.5 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                  style={{ 
                                    backgroundColor: getTypeColor(item.type),
                                    boxShadow: `0 0 8px ${getTypeColor(item.type)}`
                                  }}
                                ></div>
                              </div>
                            ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold font-orbitron mb-3 text-flow-accent">Document Stats</h3>
                        <div className="space-y-3">
                          <div className="p-3 border border-flow-border/30 rounded-md flex items-center justify-between bg-[rgba(11,15,25,0.5)] group hover:border-flow-border/60 transition-all duration-300">
                            <div className="flex items-center">
                              <Eye className="w-4 h-4 mr-2 text-flow-accent/80" />
                              <span>Views</span>
                            </div>
                            <span className="font-semibold group-hover:text-flow-accent transition-colors duration-300">{selectedItem.views}</span>
                          </div>
                          <div className="p-3 border border-flow-border/30 rounded-md flex items-center justify-between bg-[rgba(11,15,25,0.5)] group hover:border-flow-border/60 transition-all duration-300">
                            <div className="flex items-center">
                              <ThumbsUp className="w-4 h-4 mr-2 text-flow-accent/80" />
                              <span>Likes</span>
                            </div>
                            <span className="font-semibold group-hover:text-flow-accent transition-colors duration-300">{selectedItem.likes}</span>
                          </div>
                          <div className="p-3 border border-flow-border/30 rounded-md flex items-center justify-between bg-[rgba(11,15,25,0.5)] group hover:border-flow-border/60 transition-all duration-300">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2 text-flow-accent/80" />
                              <span>Last Updated</span>
                            </div>
                            <span className="font-semibold group-hover:text-flow-accent transition-colors duration-300">{selectedItem.lastUpdated}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tags Section */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold font-orbitron mb-3 text-flow-accent">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.tags.map(tag => (
                          <Badge 
                            key={tag} 
                            className="bg-flow-accent/20 text-flow-accent border-flow-accent/30 cursor-pointer hover:bg-flow-accent/30 transition-all duration-300 hover:scale-105"
                            onClick={() => {
                              toggleTagFilter(tag);
                              setIsDialogOpen(false);
                            }}
                            style={{
                              boxShadow: '0 0 10px rgba(85, 120, 255, 0.2)'
                            }}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex justify-end gap-3 mt-6">
                    <Button 
                      variant="outline"
                      className="border-flow-border hover:border-flow-accent transition-colors duration-300"
                    >
                      <PenLine className="w-4 h-4 mr-2" />
                      Edit Document
                    </Button>
                    <Button 
                      variant="default" 
                      className="bg-flow-accent/20 hover:bg-flow-accent/30 text-flow-accent border border-flow-accent/30 hover:border-flow-accent/50 transition-all duration-300"
                      style={{
                        boxShadow: '0 0 15px rgba(85, 120, 255, 0.2)'
                      }}
                    >
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      Like Document
                    </Button>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </TransitionWrapper>
      </main>
      
      <Footer />
    </div>
  );
};

export default Knowledge;
