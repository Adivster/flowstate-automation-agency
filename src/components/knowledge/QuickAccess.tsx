
import React from 'react';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

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

interface QuickAccessProps {
  documents: Document[];
  onSelectDocument: (doc: Document) => void;
}

const QuickAccess: React.FC<QuickAccessProps> = ({ documents, onSelectDocument }) => {
  if (documents.length === 0) return null;
  
  return (
    <GlassMorphism className="rounded-2xl p-6 md:p-8 mb-6 border-flow-border/30 bg-gradient-to-r from-blue-500/5 to-purple-500/10 shadow-[0_5px_15px_rgba(59,130,246,0.2)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <Star className="h-5 w-5 text-blue-500" />
          <span>Quick Access</span>
        </h2>
        <Button variant="ghost" size="sm">View All</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <Card 
            key={`quick-${doc.id}`} 
            className="bg-flow-background/30 border-flow-border/50 hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300 cursor-pointer group"
            onClick={() => onSelectDocument(doc)}
          >
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
              <CardTitle className="text-base group-hover:text-blue-500 transition-colors">
                {doc.title}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </GlassMorphism>
  );
};

export default QuickAccess;
