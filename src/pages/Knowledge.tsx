
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TransitionWrapper from '@/components/ui/TransitionWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Book, FileText, Search, Star, Tag, Users, 
  Calendar, Eye, Filter, ArrowUpDown, ExternalLink, 
  ThumbsUp, BookOpen, CheckCircle, PenLine
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
      likes: 23
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
      likes: 17
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
      likes: 41
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
      likes: 32
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
      likes: 9
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
      likes: 27
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
      likes: 15
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
      likes: 46
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

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
    setSelectedTypes([]);
    setSortBy('lastUpdated');
    setSortOrder('desc');
  };

  return (
    <div className="min-h-screen bg-flow-background text-flow-foreground flex flex-col">
      <Helmet>
        <title>Knowledge Base | FlowState Agency</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-24">
        <TransitionWrapper>
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 neon-text">Knowledge Base</h1>
            <p className="text-flow-foreground/80 max-w-3xl">
              Access and manage the collective intelligence of FlowState Agency. 
              Our knowledge base automatically updates with new insights and best practices.
            </p>
          </div>
          
          {/* Enhanced Search and Filter Section */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-flow-foreground/50" />
                <Input 
                  placeholder="Search knowledge base..." 
                  className="pl-10 bg-flow-background border-flow-border focus:border-flow-accent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                {/* Tag Filter */}
                <div className="relative">
                  <Button 
                    variant="outline" 
                    className={`border-flow-border ${selectedTags.length > 0 ? 'bg-flow-accent/20' : ''}`}
                    onClick={() => setOpenTagMenu(!openTagMenu)}
                  >
                    <Tag className="w-4 h-4 mr-2" />
                    Tags {selectedTags.length > 0 && `(${selectedTags.length})`}
                  </Button>
                  {openTagMenu && (
                    <div className="absolute z-10 mt-2 w-56 p-2 bg-flow-background border border-flow-border rounded-md shadow-lg">
                      <Command>
                        <CommandInput placeholder="Search tags..." />
                        <CommandList>
                          <CommandEmpty>No tags found.</CommandEmpty>
                          <CommandGroup>
                            {allTags.map((tag) => (
                              <CommandItem 
                                key={tag}
                                onSelect={() => toggleTagFilter(tag)}
                                className="flex items-center cursor-pointer"
                              >
                                <div className={`mr-2 h-4 w-4 rounded-sm border flex items-center justify-center ${
                                  selectedTags.includes(tag) ? 'bg-flow-accent border-flow-accent' : 'border-flow-border'
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
                    className={`border-flow-border ${selectedTypes.length > 0 ? 'bg-flow-accent/20' : ''}`}
                    onClick={() => setOpenTypeMenu(!openTypeMenu)}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Types {selectedTypes.length > 0 && `(${selectedTypes.length})`}
                  </Button>
                  {openTypeMenu && (
                    <div className="absolute z-10 mt-2 w-56 p-2 bg-flow-background border border-flow-border rounded-md shadow-lg">
                      <Command>
                        <CommandInput placeholder="Search types..." />
                        <CommandList>
                          <CommandEmpty>No types found.</CommandEmpty>
                          <CommandGroup>
                            {allTypes.map((type) => (
                              <CommandItem 
                                key={type}
                                onSelect={() => toggleTypeFilter(type)}
                                className="flex items-center cursor-pointer"
                              >
                                <div className={`mr-2 h-4 w-4 rounded-sm border flex items-center justify-center ${
                                  selectedTypes.includes(type) ? 'bg-flow-accent border-flow-accent' : 'border-flow-border'
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
                  className="border-flow-border"
                  onClick={toggleSortOrder}
                >
                  <ArrowUpDown className={`w-4 h-4 mr-2 transition-transform ${sortOrder === 'desc' ? 'rotate-0' : 'rotate-180'}`} />
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
                  className={`${sortBy === 'lastUpdated' ? 'text-flow-accent' : 'text-flow-foreground/60'}`}
                  onClick={() => setSortBy('lastUpdated')}
                >
                  <Calendar className="w-4 h-4 mr-1" />
                  Date
                </Button>
                <Button 
                  variant="ghost"
                  size="sm"
                  className={`${sortBy === 'title' ? 'text-flow-accent' : 'text-flow-foreground/60'}`}
                  onClick={() => setSortBy('title')}
                >
                  <BookOpen className="w-4 h-4 mr-1" />
                  Title
                </Button>
                <Button 
                  variant="ghost"
                  size="sm"
                  className={`${sortBy === 'views' ? 'text-flow-accent' : 'text-flow-foreground/60'}`}
                  onClick={() => setSortBy('views')}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Views
                </Button>
                <Button 
                  variant="ghost"
                  size="sm"
                  className={`${sortBy === 'likes' ? 'text-flow-accent' : 'text-flow-foreground/60'}`}
                  onClick={() => setSortBy('likes')}
                >
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  Likes
                </Button>
              </div>
            </div>
            
            {/* Active Filters */}
            {(selectedTags.length > 0 || selectedTypes.length > 0 || searchTerm) && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-flow-foreground/60">Active filters:</span>
                
                {selectedTags.map(tag => (
                  <Badge 
                    key={tag} 
                    className="bg-flow-accent/20 text-flow-accent border-flow-accent/30 cursor-pointer"
                    onClick={() => toggleTagFilter(tag)}
                  >
                    {tag} ×
                  </Badge>
                ))}
                
                {selectedTypes.map(type => (
                  <Badge 
                    key={type} 
                    className="bg-flow-muted/30 text-flow-foreground/80 border-flow-border cursor-pointer"
                    onClick={() => toggleTypeFilter(type)}
                  >
                    {type} ×
                  </Badge>
                ))}
                
                {(selectedTags.length > 0 || selectedTypes.length > 0 || searchTerm) && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-flow-foreground/60 h-7"
                    onClick={resetFilters}
                  >
                    Clear all
                  </Button>
                )}
              </div>
            )}
          </div>
          
          {/* Tabs for Category Filtering */}
          <Tabs defaultValue="all" className="mb-6">
            <TabsList className="w-full max-w-md mb-8">
              <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
              <TabsTrigger value="internal" className="flex-1">Internal</TabsTrigger>
              <TabsTrigger value="client-facing" className="flex-1">Client Facing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map(item => (
                  <Card 
                    key={item.id} 
                    className="border border-flow-border hover:border-flow-accent/50 transition-all h-full flex flex-col"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1 rounded-md bg-flow-muted text-flow-accent">
                          {getTypeIcon(item.type)}
                        </div>
                        <Badge variant="outline" className="text-xs capitalize">{item.type}</Badge>
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription className="flex justify-between items-center mt-1">
                        <span>{item.author}</span>
                        <span className="text-xs">Updated {item.lastUpdated}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      {/* Content Preview */}
                      <div className="mt-3 mb-4 text-sm text-flow-foreground/80 line-clamp-3 bg-flow-muted/10 p-3 rounded-md border border-flow-border/30">
                        {item.preview}
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
                            className="text-xs cursor-pointer hover:bg-flow-muted/30"
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
                        className="text-flow-foreground/60 hover:text-flow-foreground"
                      >
                        <PenLine className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        size="sm"
                        className="text-flow-accent hover:text-flow-accent/80 flex items-center"
                        onClick={() => handleViewItem(item)}
                      >
                        View Details
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems
                  .filter(item => item.category === 'internal')
                  .map(item => (
                    <Card 
                      key={item.id} 
                      className="border border-flow-border hover:border-flow-accent/50 transition-all h-full flex flex-col"
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-1 rounded-md bg-flow-muted text-flow-accent">
                            {getTypeIcon(item.type)}
                          </div>
                          <Badge variant="outline" className="text-xs capitalize">{item.type}</Badge>
                        </div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <CardDescription className="flex justify-between items-center mt-1">
                          <span>{item.author}</span>
                          <span className="text-xs">Updated {item.lastUpdated}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        {/* Content Preview */}
                        <div className="mt-3 mb-4 text-sm text-flow-foreground/80 line-clamp-3 bg-flow-muted/10 p-3 rounded-md border border-flow-border/30">
                          {item.preview}
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
                              className="text-xs cursor-pointer hover:bg-flow-muted/30"
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
                          className="text-flow-foreground/60 hover:text-flow-foreground"
                        >
                          <PenLine className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          size="sm"
                          className="text-flow-accent hover:text-flow-accent/80 flex items-center"
                          onClick={() => handleViewItem(item)}
                        >
                          View Details
                          <ExternalLink className="w-4 h-4 ml-1" />
                        </Button>
                      </CardFooter>
                    </Card>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems
                  .filter(item => item.category === 'client-facing')
                  .map(item => (
                    <Card 
                      key={item.id} 
                      className="border border-flow-border hover:border-flow-accent/50 transition-all h-full flex flex-col"
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-1 rounded-md bg-flow-muted text-flow-accent">
                            {getTypeIcon(item.type)}
                          </div>
                          <Badge variant="outline" className="text-xs capitalize">{item.type}</Badge>
                        </div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <CardDescription className="flex justify-between items-center mt-1">
                          <span>{item.author}</span>
                          <span className="text-xs">Updated {item.lastUpdated}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        {/* Content Preview */}
                        <div className="mt-3 mb-4 text-sm text-flow-foreground/80 line-clamp-3 bg-flow-muted/10 p-3 rounded-md border border-flow-border/30">
                          {item.preview}
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
                              className="text-xs cursor-pointer hover:bg-flow-muted/30"
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
                          className="text-flow-foreground/60 hover:text-flow-foreground"
                        >
                          <PenLine className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          size="sm"
                          className="text-flow-accent hover:text-flow-accent/80 flex items-center"
                          onClick={() => handleViewItem(item)}
                        >
                          View Details
                          <ExternalLink className="w-4 h-4 ml-1" />
                        </Button>
                      </CardFooter>
                    </Card>
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
            <DialogContent className="max-w-4xl bg-flow-background border-flow-border">
              {selectedItem && (
                <>
                  <DialogHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1 rounded-md bg-flow-muted text-flow-accent">
                        {getTypeIcon(selectedItem.type)}
                      </div>
                      <Badge variant="outline" className="text-xs capitalize">{selectedItem.type}</Badge>
                      <Badge variant={selectedItem.category === 'internal' ? 'default' : 'secondary'} className="text-xs">
                        {selectedItem.category}
                      </Badge>
                    </div>
                    <DialogTitle className="text-2xl">{selectedItem.title}</DialogTitle>
                    <DialogDescription className="flex justify-between items-center mt-1">
                      <span>Created by {selectedItem.author}</span>
                      <span className="text-sm">Updated {selectedItem.lastUpdated}</span>
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="mt-4">
                    {/* Full Content Preview */}
                    <GlassMorphism 
                      intensity="low" 
                      className="p-5 mb-6 text-flow-foreground/90"
                    >
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
                        <h3 className="text-lg font-semibold mb-2">Related Documents</h3>
                        <div className="space-y-2">
                          {allKnowledgeItems
                            .filter(item => 
                              item.id !== selectedItem.id && 
                              item.tags.some(tag => selectedItem.tags.includes(tag))
                            )
                            .slice(0, 3)
                            .map(item => (
                              <div 
                                key={item.id} 
                                className="p-3 border border-flow-border rounded-md flex items-center hover:border-flow-accent/50 transition-all cursor-pointer"
                                onClick={() => setSelectedItem(item)}
                              >
                                <div className="p-1 rounded-md bg-flow-muted/50 text-flow-accent/80 mr-3">
                                  {getTypeIcon(item.type)}
                                </div>
                                <div>
                                  <div className="font-medium">{item.title}</div>
                                  <div className="text-xs text-flow-foreground/60">{item.author}</div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Document Stats</h3>
                        <div className="space-y-2">
                          <div className="p-3 border border-flow-border rounded-md flex items-center justify-between">
                            <div className="flex items-center">
                              <Eye className="w-4 h-4 mr-2 text-flow-accent/80" />
                              <span>Views</span>
                            </div>
                            <span className="font-semibold">{selectedItem.views}</span>
                          </div>
                          <div className="p-3 border border-flow-border rounded-md flex items-center justify-between">
                            <div className="flex items-center">
                              <ThumbsUp className="w-4 h-4 mr-2 text-flow-accent/80" />
                              <span>Likes</span>
                            </div>
                            <span className="font-semibold">{selectedItem.likes}</span>
                          </div>
                          <div className="p-3 border border-flow-border rounded-md flex items-center justify-between">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2 text-flow-accent/80" />
                              <span>Last Updated</span>
                            </div>
                            <span className="font-semibold">{selectedItem.lastUpdated}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tags Section */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.tags.map(tag => (
                          <Badge 
                            key={tag} 
                            className="bg-flow-accent/20 text-flow-accent border-flow-accent/30 cursor-pointer"
                            onClick={() => {
                              toggleTagFilter(tag);
                              setIsDialogOpen(false);
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
                    <Button variant="outline">
                      <PenLine className="w-4 h-4 mr-2" />
                      Edit Document
                    </Button>
                    <Button variant="default" className="bg-flow-accent hover:bg-flow-accent/80">
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
