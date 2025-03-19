
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TransitionWrapper from '@/components/ui/TransitionWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Book, FileText, Search, Star, Tag, Users } from 'lucide-react';

const Knowledge = () => {
  // Sample knowledge base data - in a real app, this would come from an API
  const knowledgeItems = [
    {
      id: 'kb-1',
      title: 'AI Agent Collaboration Protocol',
      type: 'documentation',
      category: 'internal',
      lastUpdated: '2 days ago',
      author: 'Research Division',
      tags: ['agents', 'workflows', 'automation']
    },
    {
      id: 'kb-2',
      title: 'Client Onboarding Workflow',
      type: 'process',
      category: 'client-facing',
      lastUpdated: '1 week ago',
      author: 'Operations Division',
      tags: ['onboarding', 'clients']
    },
    {
      id: 'kb-3',
      title: 'Content Generation Best Practices',
      type: 'guide',
      category: 'internal',
      lastUpdated: '3 days ago',
      author: 'Content Division',
      tags: ['content', 'automation', 'best-practices']
    },
    {
      id: 'kb-4',
      title: 'SEO Optimization Techniques',
      type: 'research',
      category: 'client-facing',
      lastUpdated: '5 days ago',
      author: 'Research Division',
      tags: ['seo', 'marketing', 'optimization']
    },
    {
      id: 'kb-5',
      title: 'Agency Security Protocols',
      type: 'policy',
      category: 'internal',
      lastUpdated: '1 month ago',
      author: 'Security Division',
      tags: ['security', 'compliance', 'protocols']
    },
    {
      id: 'kb-6',
      title: 'Market Analysis Framework',
      type: 'template',
      category: 'client-facing',
      lastUpdated: '2 weeks ago',
      author: 'Strategy Division',
      tags: ['market-analysis', 'templates', 'strategy']
    }
  ];

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

  return (
    <div className="min-h-screen bg-flow-background text-flow-foreground flex flex-col">
      <Helmet>
        <title>Knowledge Base | FlowState Agency</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-24">
        <TransitionWrapper>
          <h1 className="text-4xl font-bold mb-8">Knowledge Base</h1>
          
          <div className="mb-8">
            <p className="text-flow-foreground/80 max-w-3xl">
              Access and manage the collective intelligence of FlowState Agency. 
              Our knowledge base automatically updates with new insights and best practices.
            </p>
          </div>
          
          <div className="mb-8 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-flow-foreground/50" />
              <Input 
                placeholder="Search knowledge base..." 
                className="pl-10 bg-flow-background border-flow-border focus:border-flow-accent"
              />
            </div>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="w-full max-w-md mb-8">
              <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
              <TabsTrigger value="internal" className="flex-1">Internal</TabsTrigger>
              <TabsTrigger value="client-facing" className="flex-1">Client Facing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {knowledgeItems.map(item => (
                  <Card key={item.id} className="border border-flow-border hover:border-flow-accent/50 transition-all">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1 rounded-md bg-flow-muted text-flow-accent">
                          {getTypeIcon(item.type)}
                        </div>
                        <Badge variant="outline" className="text-xs">{item.type}</Badge>
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription className="flex justify-between items-center mt-1">
                        <span>{item.author}</span>
                        <span className="text-xs">Updated {item.lastUpdated}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="internal" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {knowledgeItems
                  .filter(item => item.category === 'internal')
                  .map(item => (
                    <Card key={item.id} className="border border-flow-border hover:border-flow-accent/50 transition-all">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-1 rounded-md bg-flow-muted text-flow-accent">
                            {getTypeIcon(item.type)}
                          </div>
                          <Badge variant="outline" className="text-xs">{item.type}</Badge>
                        </div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <CardDescription className="flex justify-between items-center mt-1">
                          <span>{item.author}</span>
                          <span className="text-xs">Updated {item.lastUpdated}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="client-facing" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {knowledgeItems
                  .filter(item => item.category === 'client-facing')
                  .map(item => (
                    <Card key={item.id} className="border border-flow-border hover:border-flow-accent/50 transition-all">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-1 rounded-md bg-flow-muted text-flow-accent">
                            {getTypeIcon(item.type)}
                          </div>
                          <Badge variant="outline" className="text-xs">{item.type}</Badge>
                        </div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <CardDescription className="flex justify-between items-center mt-1">
                          <span>{item.author}</span>
                          <span className="text-xs">Updated {item.lastUpdated}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </TransitionWrapper>
      </main>
      
      <Footer />
    </div>
  );
};

export default Knowledge;
