
import React, { useState } from 'react';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Button } from '@/components/ui/button';
import { X, Download, Star, BookmarkPlus, Share2, ExternalLink, Maximize2, Minimize2, BookOpen, FileText } from 'lucide-react';
import { getDivisionColorScheme } from '@/utils/colorSystem';

interface DocumentViewerProps {
  document: {
    id: number;
    title: string;
    description: string;
    content?: string;
    category: string;
    tags: string[];
    updatedAt: string;
    author: string;
    fileType?: 'pdf' | 'doc' | 'txt' | 'md' | 'html';
    fileUrl?: string;
    status?: string;
    icon: string;
    pinned?: boolean;
    views: number;
    likes: number;
  } | null;
  onClose: () => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ document, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  if (!document) return null;
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // Get color scheme based on category
  const getCategoryColor = () => {
    const category = document.category.toLowerCase();
    let divisionId = 'kb';
    
    if (category.includes('technical') || category.includes('system')) divisionId = 'strategy';
    else if (category.includes('process') || category.includes('workflow')) divisionId = 'operations';
    else if (category.includes('guideline') || category.includes('standard')) divisionId = 'analytics';
    else if (category.includes('market') || category.includes('brand')) divisionId = 'lounge';
    else if (category.includes('template') || category.includes('form')) divisionId = 'research';
    
    return getDivisionColorScheme(divisionId);
  };
  
  const colorScheme = getCategoryColor();

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm ${isFullscreen ? 'overflow-hidden' : 'overflow-auto'}`}>
      <GlassMorphism className={`relative w-full flex flex-col rounded-xl shadow-xl border-flow-border/40 ${isFullscreen ? 'h-full m-0' : 'max-w-4xl max-h-[85vh]'}`}>
        {/* Document Header */}
        <div className={`flex items-center justify-between p-5 border-b border-flow-border/30 bg-gradient-to-r from-${colorScheme.text}/20 to-${colorScheme.secondary}/20`}>
          <div className="flex-grow">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-lg ${colorScheme.bg}`}>
                {document.icon === 'book' ? 
                  <BookOpen className={`h-5 w-5 text-${colorScheme.text}`} /> : 
                  <FileText className={`h-5 w-5 text-${colorScheme.text}`} />
                }
              </div>
              <h2 className="text-2xl font-semibold text-white">{document.title}</h2>
            </div>
            <p className="text-sm text-flow-foreground/70 mt-1 ml-11">{document.category} • Last updated {document.updatedAt} by {document.author}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleBookmark}
              className={`rounded-full ${isBookmarked ? 'text-yellow-400' : 'text-flow-foreground/70'}`}
            >
              {isBookmarked ? <Star className="h-5 w-5 fill-yellow-400" /> : <BookmarkPlus className="h-5 w-5" />}
            </Button>
            
            <Button variant="ghost" size="icon" className="rounded-full text-flow-foreground/70">
              <Share2 className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="rounded-full text-flow-foreground/70">
              <Download className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full text-flow-foreground/70"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="rounded-full hover:bg-red-500/20 hover:text-red-500"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Document Content */}
        <div className={`flex-grow overflow-auto p-6 bg-gradient-to-b from-transparent to-${colorScheme.text}/5`}>
          {document.fileUrl ? (
            <div className="relative h-full w-full flex flex-col items-center">
              {document.fileType === 'pdf' && (
                <iframe 
                  src={`${document.fileUrl}#toolbar=0`}
                  className={`w-full h-full min-h-[500px] rounded-lg border border-${colorScheme.text}/20 bg-white/5 shadow-[0_0_30px_${colorScheme.glow}]`}
                  title={document.title}
                />
              )}
              
              {document.fileType === 'html' && (
                <iframe 
                  src={document.fileUrl}
                  className={`w-full h-full min-h-[500px] rounded-lg border border-${colorScheme.text}/20 shadow-[0_0_30px_${colorScheme.glow}]`}
                  title={document.title}
                />
              )}
              
              {!document.fileType && document.content && (
                <div className="prose prose-invert w-full max-w-none">
                  {document.content}
                </div>
              )}
              
              {!document.fileType && !document.content && (
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-flow-foreground/70 mb-4">This document cannot be previewed directly.</p>
                  <Button asChild>
                    <a href={document.fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Open in new tab
                    </a>
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="prose prose-invert w-full max-w-none">
              <p className="text-xl">{document.description}</p>
              
              <div className="mt-6">
                {document.content || (
                  <p className="text-flow-foreground/70 italic">
                    No content available for this document. This might be a placeholder or a recently added document.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Document Footer */}
        <div className={`p-4 border-t border-flow-border/30 bg-${colorScheme.text}/5`}>
          <div className="flex flex-wrap gap-2">
            {document.tags.map(tag => (
              <span 
                key={tag} 
                className={`bg-${colorScheme.text}/20 text-${colorScheme.text} text-xs py-1.5 px-2.5 rounded-full`}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </GlassMorphism>
    </div>
  );
};

export default DocumentViewer;
