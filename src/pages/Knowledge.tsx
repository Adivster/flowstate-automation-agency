
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { useLanguage } from '@/contexts/LanguageContext';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { BookOpen, Search, FileText, Filter, Tag, Clock, Star, BookMarked, Calendar, Eye, User, X, ChevronDown } from 'lucide-react';
import PageHeader from '@/components/ui/design-system/PageHeader';
import Section from '@/components/ui/design-system/Section';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DataCard from '@/components/ui/design-system/DataCard';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const Knowledge = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Sample categories
  const categories = [
    { id: 'all', name: 'All Documents' },
    { id: 'process', name: 'Process', count: 2 },
    { id: 'guidelines', name: 'Guidelines', count: 1 },
    { id: 'templates', name: 'Templates', count: 1 },
    { id: 'technical', name: 'Technical', count: 1 },
    { id: 'marketing', name: 'Marketing', count: 1 },
    { id: 'security', name: 'Security', count: 1 },
  ];
  
  // Sample knowledge documents with extended metadata
  const documents = [
    {
      id: 1,
      title: 'Agency Onboarding Guide',
      description: 'Step-by-step guide for onboarding new clients to the agency platform.',
      category: 'Process',
      tags: ['onboarding', 'clients'],
      updatedAt: '2025-03-22',
      author: 'Admin',
      views: 253,
      likes: 42,
      status: 'updated',
      icon: 'file',
      pinned: true,
    },
    {
      id: 2,
      title: 'Content Creation Best Practices',
      description: 'Guidelines and standards for creating high-quality AI-generated content.',
      category: 'Guidelines',
      tags: ['content', 'quality'],
      updatedAt: '2025-03-18',
      author: 'Content Team',
      views: 187,
      likes: 31,
      status: 'popular',
      icon: 'book',
      pinned: false,
    },
    {
      id: 3,
      title: 'Client Communication Templates',
      description: 'Pre-approved templates for common client communications and scenarios.',
      category: 'Templates',
      tags: ['communication', 'templates'],
      updatedAt: '2025-04-01',
      author: 'Operations Team',
      views: 145,
      likes: 27,
      status: 'new',
      icon: 'file',
      pinned: true,
    },
    {
      id: 4,
      title: 'System Architecture Documentation',
      description: 'Technical documentation of the agency platform architecture and components.',
      category: 'Technical',
      tags: ['system', 'architecture'],
      updatedAt: '2025-03-15',
      author: 'Tech Team',
      views: 112,
      likes: 19,
      status: '',
      icon: 'file',
      pinned: false,
    },
    {
      id: 5,
      title: 'Marketing Campaign Playbook',
      description: 'Strategic framework for planning and executing effective marketing campaigns.',
      category: 'Marketing',
      tags: ['campaigns', 'strategy'],
      updatedAt: '2025-03-28',
      author: 'Marketing Team',
      views: 98,
      likes: 23,
      status: '',
      icon: 'book',
      pinned: false,
    },
    {
      id: 6,
      title: 'Data Security Protocol',
      description: 'Comprehensive guide on data security measures and compliance requirements.',
      category: 'Security',
      tags: ['security', 'compliance'],
      updatedAt: '2025-03-10',
      author: 'Security Team',
      views: 78,
      likes: 15,
      status: '',
      icon: 'file',
      pinned: false,
    },
  ];
  
  // Filter documents based on search query, selected category, and active filters
  const filteredDocuments = documents.filter(doc => {
    // Search query filter
    const matchesSearch = 
      searchQuery === '' || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Category filter
    const matchesCategory = 
      !selectedCategory || 
      selectedCategory === 'all' || 
      doc.category.toLowerCase() === selectedCategory.toLowerCase();
    
    // Active tag filters
    const matchesTags = 
      activeFilters.length === 0 || 
      doc.tags.some(tag => activeFilters.includes(tag));
    
    return matchesSearch && matchesCategory && matchesTags;
  });
  
  // Get all unique tags from documents
  const allTags = [...new Set(documents.flatMap(doc => doc.tags))];
  
  const toggleFilter = (tag: string) => {
    setActiveFilters(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };
  
  const clearFilters = () => {
    setActiveFilters([]);
    setSelectedCategory(null);
    setSearchQuery('');
  };
  
  // Get pinned or popular documents for quick access
  const quickAccessDocs = documents.filter(doc => doc.pinned || doc.status === 'popular').slice(0, 3);
  
  return (
    <div className="min-h-screen bg-flow-background text-flow-foreground flex flex-col circuit-background">
      <Helmet>
        <title>{t('knowledge')} | {t('agency')}</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-28 pb-12">
        <TransitionWrapper>
          <div className="max-w-7xl mx-auto">
            <PageHeader 
              title={t('knowledge')}
              description="Access your agency's collective intelligence repository. Search, browse, and utilize AI-optimized knowledge documents."
              icon={<BookOpen className="h-8 w-8 text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />}
              glassEffect={false}
            />
            
            {/* Quick Access Section */}
            {quickAccessDocs.length > 0 && (
              <GlassMorphism className="rounded-2xl p-6 md:p-8 mb-6 shadow-sm border-flow-border/30 scan-lines bg-blue-500/5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium flex items-center gap-2">
                    <Star className="h-5 w-5 text-blue-500" />
                    <span>Quick Access</span>
                  </h2>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {quickAccessDocs.map((doc) => (
                    <Card key={`quick-${doc.id}`} className="bg-flow-background/30 border-flow-border/50 hover:border-blue-500/50 hover:shadow-md transition-all duration-300 cursor-pointer">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <span className="text-blue-500 font-medium text-sm">{doc.category}</span>
                          {doc.status && (
                            <Badge variant="outline" className={`
                              ${doc.status === 'new' ? 'bg-green-500/10 text-green-500 border-green-500/20' : ''}
                              ${doc.status === 'updated' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : ''}
                              ${doc.status === 'popular' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : ''}
                            `}>
                              {doc.status}
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-base">{doc.title}</CardTitle>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </GlassMorphism>
            )}
            
            {/* Search and Filter Area */}
            <GlassMorphism className="rounded-2xl p-6 md:p-8 mb-6 shadow-sm border-flow-border/30 scan-lines">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="relative w-full md:w-2/3 group">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-flow-foreground/50 group-hover:text-blue-500 transition-colors duration-200" />
                    <Input
                      placeholder="Search knowledge base..."
                      className="pl-10 bg-flow-background/30 border-flow-border/50 h-12 text-base group-hover:border-blue-500/50 focus:border-blue-500 transition-all duration-200"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2" 
                        onClick={() => setSearchQuery('')}
                      >
                        <X className="h-4 w-4 text-flow-foreground/50 hover:text-flow-foreground" />
                      </button>
                    )}
                  </div>
                  
                  <div className="flex gap-2 w-full md:w-auto justify-end">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Filter className="h-4 w-4" />
                          <span>Filter</span>
                          {activeFilters.length > 0 && (
                            <Badge variant="secondary" className="ml-1 bg-blue-500/20 text-blue-500">
                              {activeFilters.length}
                            </Badge>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64" align="end">
                        <div className="space-y-2">
                          <div className="font-medium">Filter by Tags</div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {allTags.map(tag => (
                              <Badge 
                                key={tag} 
                                variant={activeFilters.includes(tag) ? "default" : "outline"}
                                className={`cursor-pointer ${activeFilters.includes(tag) ? 'bg-blue-500' : ''}`}
                                onClick={() => toggleFilter(tag)}
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        {(activeFilters.length > 0 || selectedCategory || searchQuery) && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="mt-3 text-flow-foreground/70 hover:text-flow-foreground w-full"
                            onClick={clearFilters}
                          >
                            Clear all filters
                          </Button>
                        )}
                      </PopoverContent>
                    </Popover>
                    
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Tag className="h-4 w-4" />
                          <span>Category</span>
                          {selectedCategory && selectedCategory !== 'all' && (
                            <Badge variant="secondary" className="ml-1 bg-blue-500/20 text-blue-500">1</Badge>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64" align="end">
                        <div className="space-y-2">
                          <div className="font-medium">Filter by Category</div>
                          <div className="grid gap-1 mt-2">
                            {categories.map(category => (
                              <Button 
                                key={category.id} 
                                variant={selectedCategory === category.id ? "default" : "ghost"}
                                className={`justify-between h-8 px-2 ${selectedCategory === category.id ? 'bg-blue-500' : ''}`}
                                onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
                              >
                                <span>{category.name}</span>
                                {category.count && <Badge variant="secondary" className="ml-auto">{category.count}</Badge>}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    
                    <Button className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span>New Document</span>
                    </Button>
                  </div>
                </div>
                
                {/* Active filters display */}
                {(activeFilters.length > 0 || selectedCategory) && (
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-sm text-flow-foreground/70">Active filters:</span>
                    
                    {selectedCategory && selectedCategory !== 'all' && (
                      <Badge 
                        variant="secondary" 
                        className="bg-blue-500/10 text-blue-500 border border-blue-500/20 flex items-center gap-1"
                      >
                        <span>Category: {categories.find(c => c.id === selectedCategory)?.name}</span>
                        <X 
                          className="h-3 w-3 ml-1 cursor-pointer" 
                          onClick={() => setSelectedCategory(null)} 
                        />
                      </Badge>
                    )}
                    
                    {activeFilters.map(filter => (
                      <Badge 
                        key={filter} 
                        variant="secondary" 
                        className="bg-blue-500/10 text-blue-500 border border-blue-500/20 flex items-center gap-1"
                      >
                        <span>Tag: {filter}</span>
                        <X 
                          className="h-3 w-3 ml-1 cursor-pointer" 
                          onClick={() => toggleFilter(filter)} 
                        />
                      </Badge>
                    ))}
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs text-flow-foreground/70 hover:text-flow-foreground h-6 px-2"
                      onClick={clearFilters}
                    >
                      Clear all
                    </Button>
                  </div>
                )}
                
                {/* View Toggle */}
                <div className="flex items-center justify-between border-t border-flow-border/30 pt-3 mt-2">
                  <div className="text-sm text-flow-foreground/70">
                    {filteredDocuments.length} {filteredDocuments.length === 1 ? 'document' : 'documents'} available
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant={viewMode === 'grid' ? 'default' : 'outline'} 
                      size="sm" 
                      onClick={() => setViewMode('grid')}
                      className="h-8 px-3"
                    >
                      Grid
                    </Button>
                    <Button 
                      variant={viewMode === 'list' ? 'default' : 'outline'} 
                      size="sm" 
                      onClick={() => setViewMode('list')}
                      className="h-8 px-3"
                    >
                      List
                    </Button>
                  </div>
                </div>
              </div>
            </GlassMorphism>
            
            {/* Content Tabs */}
            <Tabs defaultValue="all" className="mb-6">
              <TabsList className="bg-flow-background/30 p-1">
                <TabsTrigger value="all" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">All Documents</TabsTrigger>
                <TabsTrigger value="pinned" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">Pinned</TabsTrigger>
                <TabsTrigger value="recent" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">Recently Updated</TabsTrigger>
                <TabsTrigger value="popular" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">Popular</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-4">
                {/* Documents Grid/List View */}
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredDocuments.map((doc) => (
                      <Card 
                        key={doc.id} 
                        className="bg-flow-background/30 border-flow-border/50 hover:border-blue-500/50 hover:shadow-md transition-all duration-300 cursor-pointer group"
                      >
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div className="bg-blue-500/10 p-2 rounded text-blue-500">
                              {doc.icon === 'file' ? (
                                <FileText className="h-5 w-5" />
                              ) : (
                                <BookMarked className="h-5 w-5" />
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              {doc.status && (
                                <Badge variant="outline" className={`
                                  ${doc.status === 'new' ? 'bg-green-500/10 text-green-500 border-green-500/20' : ''}
                                  ${doc.status === 'updated' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : ''}
                                  ${doc.status === 'popular' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : ''}
                                `}>
                                  {doc.status}
                                </Badge>
                              )}
                              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Star className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <CardTitle className="text-lg mt-2 group-hover:text-blue-500 transition-colors">{doc.title}</CardTitle>
                          <CardDescription className="line-clamp-2">{doc.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex flex-wrap gap-1">
                            <span className="bg-blue-500/10 text-blue-500 text-xs py-1 px-2 rounded-full">{doc.category}</span>
                            {doc.tags.map((tag) => (
                              <span 
                                key={tag} 
                                className={`${
                                  activeFilters.includes(tag) 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-flow-background/50 text-flow-foreground/70'
                                } text-xs py-1 px-2 rounded-full cursor-pointer hover:bg-blue-500/50 hover:text-white transition-colors`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFilter(tag);
                                }}
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="pt-2 text-xs text-flow-foreground/60 flex justify-between border-t border-flow-border/30 mt-2">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" /> 
                              {doc.updatedAt}
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {doc.author}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {doc.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-current" />
                              {doc.likes}
                            </span>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredDocuments.map((doc) => (
                      <div 
                        key={doc.id} 
                        className="bg-flow-background/30 border border-flow-border/50 rounded-lg p-4 hover:border-blue-500/50 hover:shadow-md transition-all duration-300 cursor-pointer group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="bg-blue-500/10 p-2 rounded text-blue-500 flex-shrink-0">
                            {doc.icon === 'file' ? (
                              <FileText className="h-5 w-5" />
                            ) : (
                              <BookMarked className="h-5 w-5" />
                            )}
                          </div>
                          
                          <div className="flex-grow min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <div className="flex items-center gap-2">
                                <h3 className="text-lg font-medium group-hover:text-blue-500 transition-colors truncate">{doc.title}</h3>
                                {doc.status && (
                                  <Badge variant="outline" className={`
                                    ${doc.status === 'new' ? 'bg-green-500/10 text-green-500 border-green-500/20' : ''}
                                    ${doc.status === 'updated' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : ''}
                                    ${doc.status === 'popular' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : ''}
                                  `}>
                                    {doc.status}
                                  </Badge>
                                )}
                              </div>
                              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                                <Star className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            <p className="text-flow-foreground/70 text-sm line-clamp-1 mb-2">{doc.description}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-2">
                              <span className="bg-blue-500/10 text-blue-500 text-xs py-1 px-2 rounded-full">{doc.category}</span>
                              {doc.tags.map((tag) => (
                                <span 
                                  key={tag} 
                                  className={`${
                                    activeFilters.includes(tag) 
                                      ? 'bg-blue-500 text-white' 
                                      : 'bg-flow-background/50 text-flow-foreground/70'
                                  } text-xs py-1 px-2 rounded-full cursor-pointer hover:bg-blue-500/50 hover:text-white transition-colors`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFilter(tag);
                                  }}
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                            
                            <div className="text-xs text-flow-foreground/60 flex justify-between flex-wrap gap-2">
                              <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" /> 
                                  {doc.updatedAt}
                                </span>
                                <span className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  {doc.author}
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1">
                                  <Eye className="h-3 w-3" />
                                  {doc.views}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-current" />
                                  {doc.likes}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="pinned" className="mt-4">
                <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-3"}>
                  {documents.filter(doc => doc.pinned).length > 0 ? (
                    documents.filter(doc => doc.pinned).map((doc) => (
                      <Card key={`pinned-${doc.id}`} className="bg-flow-background/30 border-flow-border/50 hover:border-blue-500/50 transition-all duration-300 cursor-pointer group">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div className="bg-blue-500/10 p-2 rounded text-blue-500">
                              {doc.icon === 'file' ? (
                                <FileText className="h-5 w-5" />
                              ) : (
                                <BookMarked className="h-5 w-5" />
                              )}
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Star className="h-4 w-4 fill-current text-blue-500" />
                            </Button>
                          </div>
                          <CardTitle className="text-lg mt-2 group-hover:text-blue-500 transition-colors">{doc.title}</CardTitle>
                          <CardDescription className="line-clamp-2">{doc.description}</CardDescription>
                        </CardHeader>
                        <CardFooter className="pt-2 text-xs text-flow-foreground/60 flex justify-between">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> 
                            {doc.updatedAt}
                          </span>
                          <span className="bg-blue-500/10 text-blue-500 text-xs py-1 px-2 rounded-full">{doc.category}</span>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-12 col-span-full">
                      <Star className="h-12 w-12 mx-auto text-flow-foreground/30 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No pinned documents</h3>
                      <p className="text-flow-foreground/60 max-w-md mx-auto">
                        Pin important documents for quick access by clicking the star icon on any document card.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="recent" className="mt-4">
                {/* Recently Updated Documents */}
                <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-3"}>
                  {documents
                    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                    .slice(0, 6)
                    .map((doc) => (
                      <Card key={`recent-${doc.id}`} className="bg-flow-background/30 border-flow-border/50 hover:border-blue-500/50 transition-all duration-300 cursor-pointer group">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <span className="bg-blue-500/10 text-blue-500 text-xs py-1 px-2 rounded-full">{doc.category}</span>
                            <span className="flex items-center gap-1 text-xs text-flow-foreground/60">
                              <Calendar className="h-3 w-3" />
                              {doc.updatedAt}
                            </span>
                          </div>
                          <CardTitle className="text-lg mt-2 group-hover:text-blue-500 transition-colors">{doc.title}</CardTitle>
                          <CardDescription className="line-clamp-2">{doc.description}</CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="popular" className="mt-4">
                {/* Popular Documents (sorted by views) */}
                <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-3"}>
                  {documents
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 6)
                    .map((doc) => (
                      <Card key={`popular-${doc.id}`} className="bg-flow-background/30 border-flow-border/50 hover:border-blue-500/50 transition-all duration-300 cursor-pointer group">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <span className="bg-blue-500/10 text-blue-500 text-xs py-1 px-2 rounded-full">{doc.category}</span>
                            <span className="flex items-center gap-1 text-xs text-flow-foreground/70 bg-flow-background/40 py-1 px-2 rounded-full">
                              <Eye className="h-3 w-3" />
                              {doc.views}
                            </span>
                          </div>
                          <CardTitle className="text-lg mt-2 group-hover:text-blue-500 transition-colors">{doc.title}</CardTitle>
                          <CardDescription className="line-clamp-2">{doc.description}</CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
            
            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-flow-foreground/30 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No documents found</h3>
                <p className="text-flow-foreground/60 max-w-md mx-auto">
                  Try adjusting your search query or filters
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={clearFilters}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </TransitionWrapper>
      </main>
      
      <Footer />
    </div>
  );
};

export default Knowledge;
