
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { useLanguage } from '@/contexts/LanguageContext';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { BookOpen, Search, FileText, Filter, Tag, Clock, Star } from 'lucide-react';
import PageHeader from '@/components/ui/design-system/PageHeader';
import Section from '@/components/ui/design-system/Section';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Knowledge = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample knowledge documents
  const documents = [
    {
      id: 1,
      title: 'Agency Onboarding Guide',
      description: 'Step-by-step guide for onboarding new clients to the agency platform.',
      category: 'Process',
      tags: ['onboarding', 'clients'],
      updatedAt: '2025-03-22',
      author: 'Admin',
    },
    {
      id: 2,
      title: 'Content Creation Best Practices',
      description: 'Guidelines and standards for creating high-quality AI-generated content.',
      category: 'Guidelines',
      tags: ['content', 'quality'],
      updatedAt: '2025-03-18',
      author: 'Content Team',
    },
    {
      id: 3,
      title: 'Client Communication Templates',
      description: 'Pre-approved templates for common client communications and scenarios.',
      category: 'Templates',
      tags: ['communication', 'templates'],
      updatedAt: '2025-04-01',
      author: 'Operations Team',
    },
    {
      id: 4,
      title: 'System Architecture Documentation',
      description: 'Technical documentation of the agency platform architecture and components.',
      category: 'Technical',
      tags: ['system', 'architecture'],
      updatedAt: '2025-03-15',
      author: 'Tech Team',
    },
    {
      id: 5,
      title: 'Marketing Campaign Playbook',
      description: 'Strategic framework for planning and executing effective marketing campaigns.',
      category: 'Marketing',
      tags: ['campaigns', 'strategy'],
      updatedAt: '2025-03-28',
      author: 'Marketing Team',
    },
    {
      id: 6,
      title: 'Data Security Protocol',
      description: 'Comprehensive guide on data security measures and compliance requirements.',
      category: 'Security',
      tags: ['security', 'compliance'],
      updatedAt: '2025-03-10',
      author: 'Security Team',
    },
  ];
  
  const filteredDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
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
            
            <GlassMorphism className="rounded-2xl p-6 md:p-8 mb-6 shadow-sm border-flow-border/30 scan-lines">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-2/3">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-flow-foreground/50" />
                  <Input
                    placeholder="Search knowledge base..."
                    className="pl-10 bg-flow-background/30 border-flow-border/50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 w-full md:w-auto justify-end">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Tag className="h-4 w-4" />
                    <span>Category</span>
                  </Button>
                  <Button className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    <span>New Document</span>
                  </Button>
                </div>
              </div>
            </GlassMorphism>
            
            <Section 
              title="Knowledge Repository" 
              icon={<FileText className="h-5 w-5" />} 
              description={`${filteredDocuments.length} documents available`}
              noPadding
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDocuments.map((doc) => (
                  <Card key={doc.id} className="bg-flow-background/30 border-flow-border/50 hover:border-blue-500/50 transition-all duration-300 cursor-pointer group">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="bg-blue-500/10 p-2 rounded text-blue-500">
                          <FileText className="h-5 w-5" />
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardTitle className="text-lg mt-2 group-hover:text-blue-500 transition-colors">{doc.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{doc.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex flex-wrap gap-1">
                        <span className="bg-blue-500/10 text-blue-500 text-xs py-1 px-2 rounded-full">{doc.category}</span>
                        {doc.tags.map((tag) => (
                          <span key={tag} className="bg-flow-background/50 text-flow-foreground/70 text-xs py-1 px-2 rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2 text-xs text-flow-foreground/60 flex justify-between">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> 
                        {doc.updatedAt}
                      </span>
                      <span>{doc.author}</span>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </Section>
            
            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-flow-foreground/30 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No documents found</h3>
                <p className="text-flow-foreground/60">
                  Try adjusting your search query or filters
                </p>
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
