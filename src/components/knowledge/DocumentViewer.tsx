
import React, { useState } from 'react';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Button } from '@/components/ui/button';
import { X, Download, Star, BookmarkPlus, Share2, ExternalLink, Maximize2, Minimize2, BookOpen, FileText, Eye, Clock, User, ThumbsUp } from 'lucide-react';
import { getDivisionColorScheme } from '@/utils/colorSystem';
import { cn } from '@/lib/utils';

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
  const [currentTab, setCurrentTab] = useState<'preview' | 'stats'>('preview');

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
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm ${isFullscreen ? 'overflow-hidden' : 'overflow-auto'}`}>
      <GlassMorphism className={`relative w-full flex flex-col rounded-xl shadow-xl border-flow-border/40 overflow-hidden ${isFullscreen ? 'h-full m-0' : 'max-w-5xl max-h-[85vh]'}`}>
        {/* Document Header with improved styling */}
        <div 
          className="relative flex items-center justify-between p-5 border-b border-flow-border/30 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${colorScheme.primary}25, ${colorScheme.secondary}15)`
          }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-flow-foreground/10 to-transparent"></div>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: colorScheme.pattern }}></div>
          
          <div className="flex-grow relative z-10">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${colorScheme.bg} shadow-lg`}>
                {document.icon === 'book' ? 
                  <BookOpen className={`h-5 w-5 text-${colorScheme.text}`} /> : 
                  <FileText className={`h-5 w-5 text-${colorScheme.text}`} />
                }
              </div>
              <div>
                <h2 className={`text-2xl font-semibold bg-gradient-to-r from-${colorScheme.text} to-${colorScheme.secondary} bg-clip-text text-transparent`}>
                  {document.title}
                </h2>
                <p className="text-sm text-flow-foreground/70 mt-1">
                  {document.category} • Last updated {document.updatedAt} by {document.author}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 relative z-10">
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

        {/* Document Navigation Tabs */}
        <div className={`flex border-b border-flow-border/30 bg-${colorScheme.text}/5`}>
          <Button 
            variant="ghost" 
            className={cn(
              "flex-1 rounded-none border-b-2 py-2 text-sm font-medium transition-colors",
              currentTab === 'preview' 
                ? `border-${colorScheme.text} text-${colorScheme.text}` 
                : "border-transparent hover:text-flow-foreground/80"
            )}
            onClick={() => setCurrentTab('preview')}
          >
            <Eye className="h-4 w-4 mr-2" /> Preview
          </Button>
          <Button 
            variant="ghost" 
            className={cn(
              "flex-1 rounded-none border-b-2 py-2 text-sm font-medium transition-colors",
              currentTab === 'stats' 
                ? `border-${colorScheme.text} text-${colorScheme.text}` 
                : "border-transparent hover:text-flow-foreground/80"
            )}
            onClick={() => setCurrentTab('stats')}
          >
            <ThumbsUp className="h-4 w-4 mr-2" /> Insights & Stats
          </Button>
        </div>
        
        {/* Document Content based on tab */}
        <div className={`flex-grow overflow-auto p-6 bg-gradient-to-b from-transparent to-${colorScheme.text}/5`}>
          {currentTab === 'preview' && (
            <>
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
            </>
          )}

          {currentTab === 'stats' && (
            <div className="space-y-6">
              <div className={`p-4 rounded-xl bg-${colorScheme.text}/10 border border-${colorScheme.text}/20`}>
                <h3 className={`text-lg font-medium text-${colorScheme.text} mb-4`}>Document Insights</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-flow-background/30 p-4 rounded-lg border border-flow-border/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-full bg-${colorScheme.text}/20`}>
                          <Eye className={`h-4 w-4 text-${colorScheme.text}`} />
                        </div>
                        <span className="text-flow-foreground/80">Total Views</span>
                      </div>
                      <span className={`text-xl font-bold text-${colorScheme.text}`}>{document.views}</span>
                    </div>
                    <div className="mt-2 h-2 bg-flow-background/50 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-${colorScheme.text}`} 
                        style={{ width: `${Math.min(100, (document.views / 300) * 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-flow-foreground/60 mt-1">
                      {document.views > 200 ? 'High engagement' : document.views > 100 ? 'Medium engagement' : 'Low engagement'}
                    </p>
                  </div>
                  
                  <div className="bg-flow-background/30 p-4 rounded-lg border border-flow-border/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-full bg-${colorScheme.text}/20`}>
                          <ThumbsUp className={`h-4 w-4 text-${colorScheme.text}`} />
                        </div>
                        <span className="text-flow-foreground/80">Total Likes</span>
                      </div>
                      <span className={`text-xl font-bold text-${colorScheme.text}`}>{document.likes}</span>
                    </div>
                    <div className="mt-2 h-2 bg-flow-background/50 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-${colorScheme.text}`} 
                        style={{ width: `${Math.min(100, (document.likes / 50) * 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-flow-foreground/60 mt-1">
                      {document.likes > 30 ? 'Highly rated' : document.likes > 15 ? 'Well rated' : 'Standard rating'}
                    </p>
                  </div>
                  
                  <div className="bg-flow-background/30 p-4 rounded-lg border border-flow-border/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-full bg-${colorScheme.text}/20`}>
                          <Clock className={`h-4 w-4 text-${colorScheme.text}`} />
                        </div>
                        <span className="text-flow-foreground/80">Last Updated</span>
                      </div>
                      <span className="text-flow-foreground/90">{document.updatedAt}</span>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <User className="h-4 w-4 text-flow-foreground/70" />
                      <span className="text-flow-foreground/90">{document.author}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={`p-4 rounded-xl bg-${colorScheme.text}/10 border border-${colorScheme.text}/20`}>
                <h3 className={`text-lg font-medium text-${colorScheme.text} mb-4`}>Usage Trends</h3>
                
                <div className="h-40 w-full bg-flow-background/30 rounded-lg border border-flow-border/30 p-4">
                  <div className="flex h-full items-end justify-between">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, i) => {
                      // Generate fake view heights for visual effect
                      const height = 30 + Math.floor(Math.random() * 55);
                      return (
                        <div key={month} className="flex flex-col items-center">
                          <div 
                            className={`w-10 rounded-t-md bg-gradient-to-t from-${colorScheme.text} to-${colorScheme.secondary}`}
                            style={{ height: `${height}%` }}
                          ></div>
                          <span className="text-xs mt-1 text-flow-foreground/70">{month}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <p className="text-sm text-flow-foreground/70 mt-2">
                  Monthly views trend shows increasing engagement over time.
                </p>
              </div>
              
              <div className={`p-4 rounded-xl bg-${colorScheme.text}/10 border border-${colorScheme.text}/20`}>
                <h3 className={`text-lg font-medium text-${colorScheme.text} mb-2`}>Related Documents</h3>
                <p className="text-sm text-flow-foreground/70 mb-4">
                  Users who viewed this document also frequently access:
                </p>
                
                <div className="space-y-2">
                  {[
                    { title: "Content Creation Best Practices", category: "Guidelines", views: 187 },
                    { title: "Client Communication Templates", category: "Templates", views: 145 }
                  ].map((relatedDoc, i) => (
                    <div 
                      key={i} 
                      className="p-3 rounded-lg bg-flow-background/30 border border-flow-border/30 flex justify-between items-center cursor-pointer hover:bg-flow-background/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-flow-foreground/70" />
                        <span>{relatedDoc.title}</span>
                        <span className="text-xs text-flow-foreground/60">({relatedDoc.category})</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-flow-foreground/60">
                        <Eye className="h-3 w-3" />
                        {relatedDoc.views}
                      </div>
                    </div>
                  ))}
                </div>
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
