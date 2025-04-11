
import React, { useState } from 'react';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Download, Star, BookmarkPlus, Share2, ExternalLink, Maximize2, Minimize2 } from 'lucide-react';

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

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm ${isFullscreen ? 'overflow-hidden' : 'overflow-auto'}`}>
      <GlassMorphism className={`relative w-full flex flex-col rounded-xl shadow-xl border-flow-border/40 ${isFullscreen ? 'h-full m-0' : 'max-w-4xl max-h-[85vh]'}`}>
        {/* Document Header */}
        <div className="flex items-center justify-between p-5 border-b border-flow-border/30 bg-gradient-to-r from-blue-500/20 to-purple-500/20">
          <div className="flex-grow">
            <h2 className="text-2xl font-semibold text-white">{document.title}</h2>
            <p className="text-sm text-flow-foreground/70">{document.category} • Last updated {document.updatedAt} by {document.author}</p>
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
        <div className="flex-grow overflow-auto p-6 bg-gradient-to-b from-transparent to-blue-900/10">
          {document.fileUrl ? (
            <div className="relative h-full w-full flex flex-col items-center">
              {document.fileType === 'pdf' && (
                <iframe 
                  src={`${document.fileUrl}#toolbar=0`}
                  className="w-full h-full min-h-[500px] rounded-lg border border-flow-border/20 bg-white/5"
                  title={document.title}
                />
              )}
              
              {document.fileType === 'html' && (
                <iframe 
                  src={document.fileUrl}
                  className="w-full h-full min-h-[500px] rounded-lg border border-flow-border/20"
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
        <div className="p-4 border-t border-flow-border/30 bg-flow-background/30">
          <div className="flex flex-wrap gap-2">
            {document.tags.map(tag => (
              <span 
                key={tag} 
                className="bg-blue-500/20 text-blue-400 text-xs py-1.5 px-2.5 rounded-full"
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
