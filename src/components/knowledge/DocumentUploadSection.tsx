
import React from 'react';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Upload, FolderPlus, FileText, FilePlus, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { divisionColors } from '@/utils/colorSystem';

const DocumentUploadSection = () => {
  return (
    <GlassMorphism className="p-6 rounded-2xl mt-8 border-flow-border/30 bg-gradient-to-r from-purple-500/5 to-blue-500/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-flow-background/30 border-flow-border/40 overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(79,70,229,0.3)]">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-indigo-500/20">
                <Upload className="h-5 w-5 text-indigo-400" />
              </div>
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Upload Documents</span>
            </CardTitle>
            <CardDescription>
              Upload existing documents to the knowledge base
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-flow-border/50 rounded-lg p-6 text-center hover:border-indigo-500/50 transition-colors cursor-pointer group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Upload className="h-8 w-8 mx-auto text-flow-foreground/40 mb-2 group-hover:text-indigo-400 transition-colors" />
              <p className="text-sm text-flow-foreground/70 mb-2 relative">
                Drag and drop files here or click to browse
              </p>
              <p className="text-xs text-flow-foreground/50 relative">
                Supports PDF, DOCX, TXT, MD, HTML files (max 10MB)
              </p>
              
              <div className="mt-4 flex flex-wrap justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                {['PDF', 'DOCX', 'MD', 'TXT'].map((format) => (
                  <span key={format} className="text-xs py-1 px-2 bg-indigo-500/20 text-indigo-400 rounded-full">
                    {format}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
              <Upload className="h-4 w-4 mr-2" /> Upload Files
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="bg-flow-background/30 border-flow-border/40 overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <FolderPlus className="h-5 w-5 text-blue-400" />
              </div>
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Organize Knowledge</span>
            </CardTitle>
            <CardDescription>
              Create and manage knowledge categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-flow-border/40 bg-gradient-to-br from-blue-500/5 to-transparent">
                <p className="text-sm text-flow-foreground/70">
                  Create new categories, reorganize documents, and manage your knowledge base structure.
                </p>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Button variant="outline" size="sm" className="justify-start group hover:border-blue-400/50 hover:bg-blue-500/10">
                    <div className={cn(
                      "p-1 rounded mr-2 group-hover:bg-blue-500/20 transition-colors",
                      "bg-blue-500/10"
                    )}>
                      <FolderPlus className="h-3.5 w-3.5 text-blue-400" />
                    </div>
                    New Category
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start group hover:border-cyan-400/50 hover:bg-cyan-500/10">
                    <div className={cn(
                      "p-1 rounded mr-2 group-hover:bg-cyan-500/20 transition-colors",
                      "bg-cyan-500/10"
                    )}>
                      <FilePlus className="h-3.5 w-3.5 text-cyan-400" />
                    </div>
                    New Document
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                <div className="p-2 rounded-full bg-blue-500/20">
                  <FolderOpen className="h-4 w-4 text-blue-400" />
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm font-medium">Knowledge Categories</h4>
                  <p className="text-xs text-flow-foreground/60">Organize documents by project, team, or topic</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
              <FolderPlus className="h-4 w-4 mr-2" /> Manage Categories
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-6 p-4 rounded-lg bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20 flex flex-col sm:flex-row items-center gap-4">
        <div className="p-3 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20">
          <FileText className="h-6 w-6 text-blue-400" />
        </div>
        <div className="flex-grow text-center sm:text-left">
          <h4 className="text-lg font-medium mb-1">Need help organizing your knowledge?</h4>
          <p className="text-sm text-flow-foreground/70">
            Our AI can automatically categorize, tag, and summarize your documents for easy retrieval.
          </p>
        </div>
        <Button className="whitespace-nowrap bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
          Try AI Organization
        </Button>
      </div>
    </GlassMorphism>
  );
};

export default DocumentUploadSection;
