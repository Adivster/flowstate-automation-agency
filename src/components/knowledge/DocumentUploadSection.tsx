
import React from 'react';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Upload, FolderPlus, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DocumentUploadSection = () => {
  return (
    <GlassMorphism className="p-6 rounded-2xl mt-8 border-flow-border/30 bg-gradient-to-r from-purple-500/5 to-blue-500/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-flow-background/30 border-flow-border/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-blue-500" />
              Upload Documents
            </CardTitle>
            <CardDescription>
              Upload existing documents to the knowledge base
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-flow-border/50 rounded-lg p-6 text-center hover:border-blue-500/50 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 mx-auto text-flow-foreground/40 mb-2" />
              <p className="text-sm text-flow-foreground/70 mb-2">
                Drag and drop files here or click to browse
              </p>
              <p className="text-xs text-flow-foreground/50">
                Supports PDF, DOCX, TXT, MD, HTML files (max 10MB)
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Upload Files</Button>
          </CardFooter>
        </Card>
        
        <Card className="bg-flow-background/30 border-flow-border/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderPlus className="h-5 w-5 text-blue-500" />
              Organize Knowledge
            </CardTitle>
            <CardDescription>
              Create and manage knowledge categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-flow-foreground/70">
                Create new categories, reorganize documents, and manage your knowledge base structure.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="justify-start">
                  <FolderPlus className="h-4 w-4 mr-2" /> New Category
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <FileText className="h-4 w-4 mr-2" /> New Document
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Manage Categories</Button>
          </CardFooter>
        </Card>
      </div>
    </GlassMorphism>
  );
};

export default DocumentUploadSection;
