
import React, { useState } from 'react';
import { SolarpunkPanel } from '@/components/ui/design-system/SolarpunkPanel';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { History, X, Search, Filter, Calendar, DownloadCloud, RotateCcw, ArrowLeftRight, Check, Code } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

interface WorkflowVersionHistoryProps {
  workflowId: string;
  onClose: () => void;
}

// Mock version data
const mockVersions = [
  {
    id: 'v1.2.0',
    version: 'v1.2.0',
    timestamp: new Date(2025, 3, 22, 14, 23),
    author: {
      id: 'user1',
      name: 'Adiv Sterman',
      avatarUrl: 'https://api.dicebear.com/7.x/notionists/svg?seed=Adiv'
    },
    summary: 'Added retry step on API failures',
    changes: {
      added: 2,
      removed: 0,
      modified: 1
    },
    isCurrentVersion: true,
  },
  {
    id: 'v1.1.0',
    version: 'v1.1.0',
    timestamp: new Date(2025, 3, 20, 10, 15),
    author: {
      id: 'user2',
      name: 'Barak Drori',
      avatarUrl: 'https://api.dicebear.com/7.x/notionists/svg?seed=Barak'
    },
    summary: 'Optimized data processing steps',
    changes: {
      added: 0,
      removed: 1,
      modified: 3
    },
    isCurrentVersion: false,
  },
  {
    id: 'v1.0.0',
    version: 'v1.0.0',
    timestamp: new Date(2025, 3, 15, 9, 45),
    author: {
      id: 'user1',
      name: 'Adiv Sterman',
      avatarUrl: 'https://api.dicebear.com/7.x/notionists/svg?seed=Adiv'
    },
    summary: 'Initial workflow creation',
    changes: {
      added: 5,
      removed: 0,
      modified: 0
    },
    isCurrentVersion: false,
  }
];

const WorkflowVersionHistory: React.FC<WorkflowVersionHistoryProps> = ({ workflowId, onClose }) => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const isDark = theme === 'dark';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRangeFilter, setDateRangeFilter] = useState('all');
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [isRevertDialogOpen, setIsRevertDialogOpen] = useState(false);
  const [versionToRevert, setVersionToRevert] = useState<string | null>(null);
  
  // Filter versions based on search term and date range
  const filteredVersions = mockVersions.filter(version => {
    const matchesSearch = 
      version.version.toLowerCase().includes(searchTerm.toLowerCase()) ||
      version.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      version.summary.toLowerCase().includes(searchTerm.toLowerCase());
      
    // Apply date filter (simplified for demo)
    let matchesDateRange = true;
    if (dateRangeFilter === 'week') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      matchesDateRange = version.timestamp > oneWeekAgo;
    } else if (dateRangeFilter === 'month') {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      matchesDateRange = version.timestamp > oneMonthAgo;
    }
    
    return matchesSearch && matchesDateRange;
  });
  
  const handleVersionSelect = (versionId: string) => {
    // For single select, just set the version
    if (!compareMode) {
      setSelectedVersions([versionId]);
    } else {
      // For compare mode, toggle selection or replace if already 2 selected
      if (selectedVersions.includes(versionId)) {
        setSelectedVersions(selectedVersions.filter(id => id !== versionId));
      } else {
        if (selectedVersions.length >= 2) {
          setSelectedVersions([selectedVersions[1], versionId]);
        } else {
          setSelectedVersions([...selectedVersions, versionId]);
        }
      }
    }
  };
  
  const handleRevert = (versionId: string) => {
    setVersionToRevert(versionId);
    setIsRevertDialogOpen(true);
  };
  
  const confirmRevert = () => {
    if (versionToRevert) {
      const version = mockVersions.find(v => v.id === versionToRevert);
      toast({
        title: "Workflow Reverted",
        description: `Successfully reverted to version ${version?.version}`,
        duration: 3000,
      });
      setIsRevertDialogOpen(false);
      // In a real app, you would perform the actual revert operation here
    }
  };
  
  const downloadAuditLog = () => {
    toast({
      title: "Audit Log Downloaded",
      description: "Workflow version history has been exported",
      duration: 3000,
    });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-5xl"
      style={{ height: "80vh" }}
    >
      <SolarpunkPanel accentColor="orange" className="rounded-t-xl overflow-hidden h-full flex flex-col">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className={cn(
                "text-lg font-semibold flex items-center",
                isDark ? "text-orange-400" : "text-orange-600"
              )}>
                <History className="h-5 w-5 mr-2" />
                Workflow Version History
              </h2>
              <p className="text-sm text-muted-foreground">Track changes, compare versions, and roll back when needed</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8"
                onClick={downloadAuditLog}
              >
                <DownloadCloud className="h-4 w-4 mr-1" />
                Audit Log
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search versions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 h-8 w-[200px]"
                />
              </div>
              
              <Select value={dateRangeFilter} onValueChange={setDateRangeFilter}>
                <SelectTrigger className="h-8 w-[120px]">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="week">Past Week</SelectItem>
                  <SelectItem value="month">Past Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={compareMode ? "default" : "outline"}
                size="sm"
                className={cn(
                  "h-8",
                  compareMode ? 
                    (isDark ? "bg-orange-500 hover:bg-orange-600" : "bg-orange-500 hover:bg-orange-600") 
                    : ""
                )}
                onClick={() => {
                  setCompareMode(!compareMode);
                  setSelectedVersions(compareMode ? [] : selectedVersions);
                }}
              >
                <ArrowLeftRight className="h-4 w-4 mr-2" />
                Compare Mode {compareMode ? 'On' : 'Off'}
              </Button>
            </div>
          </div>
          
          <div className="overflow-y-auto flex-grow" style={{ maxHeight: "calc(80vh - 180px)" }}>
            <div className="rounded-md border">
              <div className="grid grid-cols-12 bg-muted/50 p-2 text-xs font-medium text-muted-foreground">
                <div className="col-span-2">Version</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-2">Author</div>
                <div className="col-span-4">Summary</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>
              
              {filteredVersions.map((version) => (
                <div 
                  key={version.id}
                  className={cn(
                    "grid grid-cols-12 p-2 text-sm items-center border-t transition-colors",
                    selectedVersions.includes(version.id) 
                      ? isDark ? "bg-orange-500/20" : "bg-orange-50" 
                      : "hover:bg-muted/30",
                    version.isCurrentVersion && "border-l-4 border-l-orange-500"
                  )}
                  onClick={() => handleVersionSelect(version.id)}
                >
                  <div className="col-span-2 font-mono font-medium flex items-center gap-2">
                    {selectedVersions.includes(version.id) && compareMode && (
                      <Badge variant="outline" className="h-5 w-5 p-0 flex items-center justify-center">
                        {selectedVersions.indexOf(version.id) + 1}
                      </Badge>
                    )}
                    {version.version}
                    {version.isCurrentVersion && (
                      <Badge variant="secondary" className="text-[10px]">Current</Badge>
                    )}
                  </div>
                  <div className="col-span-2 text-muted-foreground">
                    {format(version.timestamp, 'MMM d, yyyy')}
                    <div className="text-xs">{format(version.timestamp, 'HH:mm')}</div>
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={version.author.avatarUrl} />
                      <AvatarFallback>{version.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{version.author.name}</span>
                  </div>
                  <div className="col-span-4 flex items-center gap-2">
                    <span>{version.summary}</span>
                    <div className="flex gap-1">
                      {version.changes.added > 0 && (
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/30 text-[10px]">
                          +{version.changes.added}
                        </Badge>
                      )}
                      {version.changes.removed > 0 && (
                        <Badge variant="outline" className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/30 text-[10px]">
                          -{version.changes.removed}
                        </Badge>
                      )}
                      {version.changes.modified > 0 && (
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/30 text-[10px]">
                          ~{version.changes.modified}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="col-span-2 flex justify-end gap-1">
                    {!version.isCurrentVersion && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRevert(version.id);
                        }}
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7"
                      onClick={(e) => {
                        e.stopPropagation();
                        // View code implementation would go here
                        toast({
                          title: "View Code",
                          description: `Viewing code for version ${version.version}`,
                          duration: 2000,
                        });
                      }}
                    >
                      <Code className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {filteredVersions.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  No versions found matching your search criteria.
                </div>
              )}
            </div>
          </div>
          
          {/* Compare View (shown when in compare mode and 2 versions are selected) */}
          {compareMode && selectedVersions.length === 2 && (
            <div className="mt-4 border rounded-md p-4 bg-muted/20">
              <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                <ArrowLeftRight className="h-4 w-4" />
                Comparing Versions
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded bg-muted/30 border">
                  <h4 className="text-xs font-medium text-muted-foreground mb-1">
                    {mockVersions.find(v => v.id === selectedVersions[0])?.version || 'Version A'}
                  </h4>
                  <p className="text-sm">
                    {mockVersions.find(v => v.id === selectedVersions[0])?.summary || 'Selected version'}
                  </p>
                </div>
                <div className="p-3 rounded bg-muted/30 border">
                  <h4 className="text-xs font-medium text-muted-foreground mb-1">
                    {mockVersions.find(v => v.id === selectedVersions[1])?.version || 'Version B'}
                  </h4>
                  <p className="text-sm">
                    {mockVersions.find(v => v.id === selectedVersions[1])?.summary || 'Selected version'}
                  </p>
                </div>
              </div>
              
              <div className="mt-3 flex justify-end">
                <Button size="sm">
                  View Full Comparison
                </Button>
              </div>
            </div>
          )}
        </div>
      </SolarpunkPanel>
      
      {/* Revert Confirmation Dialog */}
      <Dialog open={isRevertDialogOpen} onOpenChange={setIsRevertDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Revert</DialogTitle>
            <DialogDescription>
              Are you sure you want to revert to version {mockVersions.find(v => v.id === versionToRevert)?.version}?
              This will replace the current version of the workflow.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRevertDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={confirmRevert}
              className={isDark ? "bg-orange-500 hover:bg-orange-600" : "bg-orange-500 hover:bg-orange-600"}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Revert to This Version
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default WorkflowVersionHistory;
