
import React from 'react';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ChevronRight, BookOpen, Clock, BarChart } from 'lucide-react';
import { getDivisionColorScheme } from '@/utils/colorSystem';
import { motion } from 'framer-motion';

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
  
  // Get color for each document based on category
  const getDocumentColor = (doc: Document) => {
    const category = doc.category.toLowerCase();
    let divisionId = 'kb';
    
    if (category.includes('technical') || category.includes('system')) divisionId = 'strategy';
    else if (category.includes('process') || category.includes('workflow')) divisionId = 'operations';
    else if (category.includes('guideline') || category.includes('standard')) divisionId = 'analytics';
    else if (category.includes('market') || category.includes('brand')) divisionId = 'lounge';
    else if (category.includes('template') || category.includes('form')) divisionId = 'research';
    
    return getDivisionColorScheme(divisionId);
  };
  
  return (
    <GlassMorphism className="rounded-2xl p-6 md:p-8 mb-6 border-flow-border/30 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/10 shadow-[0_5px_20px_rgba(59,130,246,0.15)]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-500/30">
            <Star className="h-5 w-5 text-yellow-400" />
          </div>
          <h2 className="text-xl font-medium bg-gradient-to-br from-yellow-400 to-amber-500 bg-clip-text text-transparent">
            Quick Access
          </h2>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10 group"
        >
          View All <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {documents.map((doc, index) => {
          const colorScheme = getDocumentColor(doc);
          
          return (
            <motion.div 
              key={`quick-${doc.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card 
                className={`relative overflow-hidden bg-flow-background/30 border-flow-border/50 hover:border-${colorScheme.text}/50 hover:shadow-[0_0_15px_${colorScheme.glow}] transition-all duration-300 cursor-pointer group`}
                onClick={() => onSelectDocument(doc)}
              >
                <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-${colorScheme.text} to-${colorScheme.secondary}`}></div>
                
                {/* Subtle background pattern */}
                <div 
                  className="absolute inset-0 opacity-5 pointer-events-none" 
                  style={{ 
                    backgroundImage: `${colorScheme.pattern}`,
                    backgroundSize: 'cover'
                  }}
                />
                
                <CardHeader className="pb-2 relative">
                  <div className="flex justify-between">
                    <span className={`text-${colorScheme.text} font-medium text-sm flex items-center gap-1.5`}>
                      <div className={`w-1.5 h-1.5 rounded-full bg-${colorScheme.text}`}></div>
                      {doc.category}
                    </span>
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
                  <CardTitle className={`text-base group-hover:text-${colorScheme.text} transition-colors flex items-center gap-1.5`}>
                    <BookOpen className={`h-4 w-4 text-${colorScheme.text} opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all duration-300`} />
                    {doc.title}
                  </CardTitle>
                  
                  {/* Enhanced stats indicator */}
                  <div className="mt-3 flex justify-between items-center text-xs text-flow-foreground/60">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {doc.updatedAt}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <BarChart className="h-3 w-3 text-blue-400" />
                        {doc.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {doc.likes}
                      </span>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          );
        })}
      </div>
      
      <div className="mt-4 text-xs text-flow-foreground/50 text-right">
        <span className="bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-md inline-block">
          Updated documents and frequently accessed content appear here
        </span>
      </div>
    </GlassMorphism>
  );
};

export default QuickAccess;
