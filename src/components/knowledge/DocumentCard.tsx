
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, BookMarked, Clock, Star, Eye, User, ThumbsUp, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getDivisionColorScheme } from '@/utils/colorSystem';

interface Document {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  updatedAt: string;
  author: string;
  views: number;
  likes: number;
  status: string;
  icon: string;
  pinned: boolean;
}

interface DocumentCardProps {
  document: Document;
  activeFilters: string[];
  onToggleFilter: (tag: string) => void;
  onClick: () => void;
  isGridView: boolean;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ 
  document, 
  activeFilters, 
  onToggleFilter,
  onClick,
  isGridView
}) => {
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

  if (isGridView) {
    // Grid view card
    return (
      <Card 
        onClick={onClick}
        className={`relative overflow-hidden transition-all duration-300 cursor-pointer group bg-gradient-to-br from-flow-background/60 to-flow-background/40 hover:shadow-[0_0_20px_${colorScheme.glow}]`}
        style={{
          borderWidth: '1px',
          borderStyle: 'solid',
          borderImage: `linear-gradient(to bottom right, ${colorScheme.primary}30, ${colorScheme.secondary}20) 1`
        }}
      >
        {/* Top color bar */}
        <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-${colorScheme.text} to-${colorScheme.secondary}`}></div>
        
        {/* Subtle background pattern */}
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none z-0" 
          style={{ 
            backgroundImage: `${colorScheme.pattern}`,
            backgroundSize: 'cover'
          }}
        />
        
        <CardHeader className="pb-2 relative z-10">
          <div className="flex justify-between items-start">
            <div className={`${colorScheme.bg} p-2 rounded-lg text-${colorScheme.text} shadow-sm backdrop-blur-sm`}>
              {document.icon === 'file' ? (
                <FileText className="h-5 w-5" />
              ) : (
                <BookMarked className="h-5 w-5" />
              )}
            </div>
            <div className="flex items-center gap-1">
              {document.status && (
                <Badge variant="outline" className={cn(
                  document.status === 'new' ? 'bg-green-500/10 text-green-500 border-green-500/20' : '',
                  document.status === 'updated' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : '',
                  document.status === 'popular' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : ''
                )}>
                  {document.status}
                </Badge>
              )}
              
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "h-8 w-8 transition-opacity",
                  document.pinned ? "text-yellow-400" : "opacity-0 group-hover:opacity-100"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  // Toggle pin functionality would go here
                }}
              >
                <Star className={document.pinned ? "h-4 w-4 fill-current" : "h-4 w-4"} />
              </Button>
            </div>
          </div>
          <CardTitle className={`text-lg mt-2 group-hover:text-${colorScheme.text} transition-colors line-clamp-1`}>
            {document.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {document.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pb-2 relative z-10">
          <div className="flex flex-wrap gap-1">
            <span className={`${colorScheme.bg} text-${colorScheme.text} text-xs py-1 px-2 rounded-full shadow-sm`}>
              {document.category}
            </span>
            {document.tags.map((tag) => (
              <span 
                key={tag} 
                className={cn(
                  activeFilters.includes(tag) 
                    ? `bg-${colorScheme.text} text-white` 
                    : 'bg-flow-background/50 text-flow-foreground/70',
                  "text-xs py-1 px-2 rounded-full cursor-pointer hover:bg-blue-500/50 hover:text-white transition-colors"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFilter(tag);
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
          
          {/* Document Stats - Added visual stats */}
          <div className={`mt-4 p-2 rounded-lg bg-${colorScheme.text}/5 border border-${colorScheme.text}/10`}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <BarChart className={`h-3.5 w-3.5 text-${colorScheme.text}`} />
                <span className={`text-xs font-medium text-${colorScheme.text}`}>Stats</span>
              </div>
              <div className={`text-xs text-${colorScheme.text}/80 flex gap-2`}>
                <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {document.views}</span>
                <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" /> {document.likes}</span>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="pt-2 text-xs text-flow-foreground/60 flex justify-between border-t border-flow-border/20 mt-2 bg-flow-background/30 relative z-10">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> 
              {document.updatedAt}
            </span>
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {document.author}
            </span>
          </div>
        </CardFooter>
      </Card>
    );
  }
  
  // List view card
  return (
    <div 
      onClick={onClick}
      className={`relative overflow-hidden transition-all duration-300 cursor-pointer group rounded-lg bg-gradient-to-br from-flow-background/60 to-flow-background/40 hover:shadow-[0_0_20px_${colorScheme.glow}] p-4`}
      style={{
        borderWidth: '1px',
        borderStyle: 'solid',
        borderImage: `linear-gradient(to bottom right, ${colorScheme.primary}30, ${colorScheme.secondary}20) 1`
      }}
    >
      {/* Left color bar */}
      <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-${colorScheme.text} to-${colorScheme.secondary}`}></div>
      
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none z-0" 
        style={{ 
          backgroundImage: `${colorScheme.pattern}`,
          backgroundSize: 'cover'
        }}
      />
      
      <div className="flex items-start gap-4 relative z-10">
        <div className={`${colorScheme.bg} p-2 rounded-lg text-${colorScheme.text} flex-shrink-0 shadow-sm backdrop-blur-sm`}>
          {document.icon === 'file' ? (
            <FileText className="h-5 w-5" />
          ) : (
            <BookMarked className="h-5 w-5" />
          )}
        </div>
        
        <div className="flex-grow min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2">
              <h3 className={`text-lg font-medium group-hover:text-${colorScheme.text} transition-colors truncate`}>
                {document.title}
              </h3>
              {document.status && (
                <Badge variant="outline" className={cn(
                  document.status === 'new' ? 'bg-green-500/10 text-green-500 border-green-500/20' : '',
                  document.status === 'updated' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : '',
                  document.status === 'popular' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : ''
                )}>
                  {document.status}
                </Badge>
              )}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "h-8 w-8 transition-opacity flex-shrink-0",
                document.pinned ? "text-yellow-400" : "opacity-0 group-hover:opacity-100"
              )}
              onClick={(e) => {
                e.stopPropagation();
                // Toggle pin functionality would go here
              }}
            >
              <Star className={document.pinned ? "h-4 w-4 fill-current" : "h-4 w-4"} />
            </Button>
          </div>
          
          <p className="text-flow-foreground/70 text-sm line-clamp-1 mb-2">
            {document.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-2">
            <span className={`${colorScheme.bg} text-${colorScheme.text} text-xs py-1 px-2 rounded-full shadow-sm`}>
              {document.category}
            </span>
            {document.tags.map((tag) => (
              <span 
                key={tag} 
                className={cn(
                  activeFilters.includes(tag) 
                    ? `bg-${colorScheme.text} text-white` 
                    : 'bg-flow-background/50 text-flow-foreground/70',
                  "text-xs py-1 px-2 rounded-full cursor-pointer hover:bg-blue-500/50 hover:text-white transition-colors"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFilter(tag);
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
          
          {/* Document Stats - Visual representation */}
          <div className={`p-2 rounded-lg bg-${colorScheme.text}/5 border border-${colorScheme.text}/10 mb-2 flex justify-between`}>
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <Eye className={`h-4 w-4 text-${colorScheme.text}`} />
                <div>
                  <div className="text-xs text-flow-foreground/70">Views</div>
                  <div className={`font-medium text-sm text-${colorScheme.text}`}>{document.views}</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <ThumbsUp className={`h-4 w-4 text-${colorScheme.text}`} />
                <div>
                  <div className="text-xs text-flow-foreground/70">Likes</div>
                  <div className={`font-medium text-sm text-${colorScheme.text}`}>{document.likes}</div>
                </div>
              </div>
            </div>
            
            {/* Usage trend indicator (simplified visual) */}
            <div className="flex items-end gap-0.5 h-8">
              {[0.3, 0.5, 0.4, 0.7, 0.6, 0.9].map((height, i) => (
                <div 
                  key={i} 
                  className={`w-1 rounded-t bg-${colorScheme.text}/70`} 
                  style={{ height: `${height * 100}%` }}
                ></div>
              ))}
            </div>
          </div>
          
          <div className="text-xs text-flow-foreground/60 flex justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> 
                {document.updatedAt}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {document.author}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
