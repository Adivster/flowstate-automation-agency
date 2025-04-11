
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { BrainCircuit, Star, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DocumentCard from '@/components/knowledge/DocumentCard';

interface Document {
  id: number;
  title: string;
  description: string;
  category: string;
  status?: string;
  pinned?: boolean;
  fileType?: string;
  fileUrl?: string;
  content?: string;
  tags: string[];
  updatedAt: string;
  author: string;
  views: number;
  likes: number;
  icon: string;
}

interface KnowledgeTabsProps {
  documents: Document[];
  filteredDocuments: Document[];
  activeFilters: string[];
  toggleFilter: (tag: string) => void;
  viewMode: 'grid' | 'list';
  onSelectDocument: (doc: Document) => void;
  clearFilters: () => void;
}

const KnowledgeTabs: React.FC<KnowledgeTabsProps> = ({ 
  documents, 
  filteredDocuments, 
  activeFilters, 
  toggleFilter,
  viewMode,
  onSelectDocument,
  clearFilters
}) => {
  return (
    <Tabs defaultValue="all" className="mb-6">
      <TabsList className="bg-flow-background/30 p-1">
        <TabsTrigger value="all" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
          All Documents
        </TabsTrigger>
        <TabsTrigger value="pinned" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
          Pinned
        </TabsTrigger>
        <TabsTrigger value="recent" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
          Recently Updated
        </TabsTrigger>
        <TabsTrigger value="popular" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
          Popular
        </TabsTrigger>
        <TabsTrigger value="ai" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
          <BrainCircuit className="h-4 w-4 mr-1" /> AI Recommendations
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="mt-4">
        {/* Documents Grid/List View */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                activeFilters={activeFilters}
                onToggleFilter={toggleFilter}
                onClick={() => onSelectDocument(doc)}
                isGridView={true}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredDocuments.map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                activeFilters={activeFilters}
                onToggleFilter={toggleFilter}
                onClick={() => onSelectDocument(doc)}
                isGridView={false}
              />
            ))}
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="pinned" className="mt-4">
        <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-3"}>
          {documents.filter(doc => doc.pinned).length > 0 ? (
            documents.filter(doc => doc.pinned).map((doc) => (
              <DocumentCard
                key={`pinned-${doc.id}`}
                document={doc}
                activeFilters={activeFilters}
                onToggleFilter={toggleFilter}
                onClick={() => onSelectDocument(doc)}
                isGridView={viewMode === 'grid'}
              />
            ))
          ) : (
            <div className="text-center py-12 col-span-full">
              <GlassMorphism className="p-8 max-w-md mx-auto rounded-xl bg-gradient-to-br from-blue-900/10 to-blue-900/5">
                <Star className="h-12 w-12 mx-auto text-flow-foreground/30 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No pinned documents</h3>
                <p className="text-flow-foreground/60 max-w-md mx-auto">
                  Pin important documents for quick access by clicking the star icon on any document card.
                </p>
                <Button variant="outline" className="mt-4">
                  Browse all documents
                </Button>
              </GlassMorphism>
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
              <DocumentCard
                key={`recent-${doc.id}`}
                document={doc}
                activeFilters={activeFilters}
                onToggleFilter={toggleFilter}
                onClick={() => onSelectDocument(doc)}
                isGridView={viewMode === 'grid'}
              />
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
              <DocumentCard
                key={`popular-${doc.id}`}
                document={doc}
                activeFilters={activeFilters}
                onToggleFilter={toggleFilter}
                onClick={() => onSelectDocument(doc)}
                isGridView={viewMode === 'grid'}
              />
            ))}
        </div>
      </TabsContent>
      
      <TabsContent value="ai" className="mt-4">
        <div className="bg-gradient-to-br from-pink-500/5 to-purple-500/10 p-6 rounded-xl border border-pink-500/20 shadow-[0_0_15px_rgba(236,72,153,0.2)] mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-pink-500/20">
              <BrainCircuit className="h-5 w-5 text-pink-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">AI Knowledge Recommendations</h3>
              <p className="text-sm text-flow-foreground/70">
                Personalized document suggestions based on your recent activity and role.
              </p>
            </div>
          </div>
          
          <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-3 gap-4" : "space-y-3"}>
            {documents.slice(0, 3).map((doc) => (
              <DocumentCard
                key={`ai-${doc.id}`}
                document={doc}
                activeFilters={activeFilters}
                onToggleFilter={toggleFilter}
                onClick={() => onSelectDocument(doc)}
                isGridView={viewMode === 'grid'}
              />
            ))}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default KnowledgeTabs;
