
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { BookOpen, FileText, BookMarked, Book } from 'lucide-react';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { cn } from '@/lib/utils';

interface CategorySectionProps {
  title: string;
  description: string;
  categories: Array<{
    id: string;
    name: string;
    description: string;
    count: number;
    icon: 'book' | 'file' | 'bookmarked';
    color?: string;
  }>;
  onSelectCategory: (categoryId: string) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ 
  title, 
  description, 
  categories,
  onSelectCategory
}) => {
  const getCategoryIcon = (iconType: string, color: string = 'text-blue-500') => {
    switch (iconType) {
      case 'book':
        return <BookOpen className={`h-6 w-6 ${color}`} />;
      case 'bookmarked':
        return <BookMarked className={`h-6 w-6 ${color}`} />;
      case 'file':
      default:
        return <FileText className={`h-6 w-6 ${color}`} />;
    }
  };

  return (
    <GlassMorphism className="p-6 rounded-2xl mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
          <Book className="h-6 w-6 text-blue-500" />
          {title}
        </h2>
        <p className="text-flow-foreground/70">{description}</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Card 
            key={category.id}
            className="bg-flow-background/30 border-flow-border/40 hover:border-blue-500/50 transition-all duration-300 cursor-pointer group"
            onClick={() => onSelectCategory(category.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className={cn(
                  "p-2 rounded-lg",
                  category.color ? category.color : "bg-blue-500/10"
                )}>
                  {getCategoryIcon(category.icon, category.color ? '' : 'text-blue-500')}
                </div>
                <span className="bg-flow-background/50 px-2 py-1 rounded-full text-xs font-medium text-flow-foreground/70">
                  {category.count} {category.count === 1 ? 'doc' : 'docs'}
                </span>
              </div>
              <CardTitle className="text-xl mt-2 group-hover:text-blue-500 transition-colors">
                {category.name}
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {category.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </GlassMorphism>
  );
};

export default CategorySection;
