import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BookOpen } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { useLanguage } from '@/contexts/LanguageContext';
import PageHeader from '@/components/ui/design-system/PageHeader';
import CategorySection from '@/components/knowledge/CategorySection';
import DocumentViewer from '@/components/knowledge/DocumentViewer';
import QuickAccess from '@/components/knowledge/QuickAccess';
import KnowledgeSearch from '@/components/knowledge/KnowledgeSearch';
import KnowledgeTabs from '@/components/knowledge/KnowledgeTabs';
import EmptyState from '@/components/knowledge/EmptyState';
import DocumentUploadSection from '@/components/knowledge/DocumentUploadSection';

const Knowledge = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showCategorySection, setShowCategorySection] = useState(true);
  const [selectedDocument, setSelectedDocument] = useState<any | null>(null);
  
  // Sample categories
  const categories = [
    { id: 'all', name: 'All Documents', count: 6 },
    { id: 'process', name: 'Process', count: 2 },
    { id: 'guidelines', name: 'Guidelines', count: 1 },
    { id: 'templates', name: 'Templates', count: 1 },
    { id: 'technical', name: 'Technical', count: 1 },
    { id: 'marketing', name: 'Marketing', count: 1 },
    { id: 'security', name: 'Security', count: 1 },
  ];
  
  // Enhanced categories with descriptions and icons for the visual section - FIX: ensure icon is one of the allowed types
  const categoriesWithDetails = [
    { 
      id: 'process', 
      name: 'Process Documentation', 
      count: 2, 
      icon: 'book' as 'book',
      description: 'Standard operating procedures and workflow documentation',
      color: 'bg-gradient-to-br from-blue-500/20 to-purple-500/30 text-blue-400'
    },
    { 
      id: 'guidelines', 
      name: 'Guidelines & Standards', 
      count: 1, 
      icon: 'bookmarked' as 'bookmarked',
      description: 'Best practices and compliance standards',
      color: 'bg-gradient-to-br from-emerald-500/20 to-green-500/30 text-emerald-400'
    },
    { 
      id: 'templates', 
      name: 'Templates & Forms', 
      count: 1, 
      icon: 'file' as 'file',
      description: 'Reusable templates for common business documents',
      color: 'bg-gradient-to-br from-amber-500/20 to-yellow-500/30 text-amber-400'
    },
    { 
      id: 'technical', 
      name: 'Technical Documentation', 
      count: 1, 
      icon: 'file' as 'file',
      description: 'System architecture and technical specifications',
      color: 'bg-gradient-to-br from-indigo-500/20 to-blue-500/30 text-indigo-400'
    },
    { 
      id: 'marketing', 
      name: 'Marketing Resources', 
      count: 1, 
      icon: 'bookmarked' as 'bookmarked',
      description: 'Brand guidelines and marketing materials',
      color: 'bg-gradient-to-br from-rose-500/20 to-pink-500/30 text-rose-400'
    },
    { 
      id: 'security', 
      name: 'Security Protocols', 
      count: 1, 
      icon: 'book' as 'book',
      description: 'Security guidelines and compliance documentation',
      color: 'bg-gradient-to-br from-red-500/20 to-orange-500/30 text-red-400'
    },
  ];
  
  // Enhanced sample knowledge documents with extended metadata
  const documents = [
    {
      id: 1,
      title: 'Agency Onboarding Guide',
      description: 'Step-by-step guide for onboarding new clients to the agency platform.',
      content: 'This comprehensive guide covers all aspects of onboarding new clients to our agency platform. From initial contact to full integration, every step is detailed with best practices and tips for success.',
      category: 'Process',
      tags: ['onboarding', 'clients'],
      updatedAt: '2025-03-22',
      author: 'Admin',
      views: 253,
      likes: 42,
      status: 'updated',
      icon: 'file',
      pinned: true,
      fileType: 'pdf',
      fileUrl: 'https://example.com/files/onboarding-guide.pdf'
    },
    {
      id: 2,
      title: 'Content Creation Best Practices',
      description: 'Guidelines and standards for creating high-quality AI-generated content.',
      content: 'Learn how to create compelling, accurate, and ethical AI-generated content with these industry-leading best practices. Covers tone, style, fact-checking, and quality assurance processes.',
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
      content: 'A collection of professionally crafted templates for various client communication scenarios, including project updates, feedback requests, and issue resolution communications.',
      category: 'Templates',
      tags: ['communication', 'templates'],
      updatedAt: '2025-04-01',
      author: 'Operations Team',
      views: 145,
      likes: 27,
      status: 'new',
      icon: 'file',
      pinned: true,
      fileType: 'doc',
      fileUrl: 'https://example.com/files/communication-templates.docx'
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
      fileType: 'html',
      fileUrl: 'https://example.com/files/system-architecture.html'
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
      fileType: 'pdf',
      fileUrl: 'https://example.com/files/security-protocol.pdf'
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
  
  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId === 'all' ? null : categoryId);
    setShowCategorySection(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Get pinned or popular documents for quick access
  const quickAccessDocs = documents.filter(doc => doc.pinned || doc.status === 'popular').slice(0, 3);
  
  return (
    <div className="min-h-screen bg-flow-background text-flow-foreground flex flex-col circuit-background bg-gradient-to-b from-transparent via-blue-900/10 to-blue-900/20">
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
              icon={<BookOpen className="h-8 w-8 text-blue-500 drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]" />}
              glassEffect={true}
              className="bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-b border-t border-blue-500/20"
            />
            
            {/* Quick Access Section */}
            <QuickAccess 
              documents={quickAccessDocs}
              onSelectDocument={setSelectedDocument}
            />
            
            {/* Category showcase section - only shown when no category is selected */}
            {showCategorySection && (
              <CategorySection 
                title="Knowledge Categories"
                description="Browse our knowledge base by category to find the information you need."
                categories={categoriesWithDetails}
                onSelectCategory={handleSelectCategory}
              />
            )}
            
            {/* Search and Filter Area */}
            <KnowledgeSearch 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
              viewMode={viewMode}
              setViewMode={setViewMode}
              categories={categories}
              allTags={allTags}
              filteredDocumentsCount={filteredDocuments.length}
              clearFilters={clearFilters}
            />
            
            {/* Content Tabs */}
            {filteredDocuments.length > 0 ? (
              <KnowledgeTabs 
                documents={documents}
                filteredDocuments={filteredDocuments}
                activeFilters={activeFilters}
                toggleFilter={toggleFilter}
                viewMode={viewMode}
                onSelectDocument={setSelectedDocument}
                clearFilters={clearFilters}
              />
            ) : (
              <EmptyState clearFilters={clearFilters} />
            )}
            
            {/* Upload/Create Documents Section */}
            <DocumentUploadSection />
          </div>
        </TransitionWrapper>
      </main>
      
      {/* Document Viewer Modal */}
      {selectedDocument && (
        <DocumentViewer 
          document={selectedDocument} 
          onClose={() => setSelectedDocument(null)} 
        />
      )}
      
      <Footer />
    </div>
  );
};

export default Knowledge;
