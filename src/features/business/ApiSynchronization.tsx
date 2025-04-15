
import { useState } from 'react';
import { 
  Link, 
  Calendar, 
  BarChart, 
  RefreshCw, 
  PlusCircle, 
  Activity, 
  Clock, 
  CheckCircle2,
  XCircle,
  PauseCircle,
  PlayCircle
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApiSync } from '@/features/api/hooks/useApiSync';
import { format, parseISO } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ApiSynchronization = () => {
  const [subTab, setSubTab] = useState('endpoints');
  const { 
    endpoints, 
    syncJobs, 
    syncConfigs, 
    syncStatus, 
    isLoading,
    syncEndpoint
  } = useApiSync();

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return format(parseISO(dateString), 'dd MMM yyyy, HH:mm');
    } catch (e) {
      return 'Invalid date';
    }
  };

  // Format milliseconds as duration
  const formatDuration = (milliseconds?: number) => {
    if (!milliseconds) return 'N/A';
    const seconds = Math.floor(milliseconds / 1000);
    if (seconds < 60) return `${seconds}s`;
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-medium mb-1">API Synchronization</h2>
          <p className="text-sm text-muted-foreground">Manage data synchronization with external systems</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs h-8 bg-flow-accent/10 text-flow-accent border-flow-accent/50"
          >
            <PlusCircle className="h-3 w-3 mr-2" />
            New Sync Config
          </Button>
        </div>
      </div>
      
      {syncStatus && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <GlassMorphism className="p-4 rounded-xl border-flow-border/30">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs text-muted-foreground">Active Jobs</h3>
              <Activity className="h-4 w-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold">{syncStatus.activeJobs}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-2 gap-1">
              <Clock className="h-3 w-3" />
              <span>Currently running</span>
            </div>
          </GlassMorphism>
          
          <GlassMorphism className="p-4 rounded-xl border-flow-border/30">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs text-muted-foreground">Completed Today</h3>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold">{syncStatus.completedToday}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-2 gap-1">
              <Calendar className="h-3 w-3" />
              <span>Last 24 hours</span>
            </div>
          </GlassMorphism>
          
          <GlassMorphism className="p-4 rounded-xl border-flow-border/30">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs text-muted-foreground">Failed Today</h3>
              <XCircle className="h-4 w-4 text-red-500" />
            </div>
            <div className="text-2xl font-bold">{syncStatus.failedToday}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-2 gap-1">
              <RefreshCw className="h-3 w-3" />
              <span>Retry available</span>
            </div>
          </GlassMorphism>
          
          <GlassMorphism className="p-4 rounded-xl border-flow-border/30">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs text-muted-foreground">Avg Response Time</h3>
              <BarChart className="h-4 w-4 text-purple-500" />
            </div>
            <div className="text-2xl font-bold">{syncStatus.averageResponseTime}ms</div>
            <div className="flex items-center text-xs text-muted-foreground mt-2 gap-1">
              <Activity className="h-3 w-3" />
              <span>{syncStatus.dataProcessedToday}KB processed</span>
            </div>
          </GlassMorphism>
        </div>
      )}
      
      <Tabs value={subTab} onValueChange={setSubTab} className="space-y-4">
        <TabsList className="bg-flow-background/30 border border-flow-border/20 inline-flex h-9 items-center text-muted-foreground w-full sm:w-auto">
          <TabsTrigger 
            value="endpoints" 
            className="text-xs data-[state=active]:bg-flow-accent/20 data-[state=active]:text-flow-accent"
          >
            Endpoints
          </TabsTrigger>
          <TabsTrigger 
            value="jobs" 
            className="text-xs data-[state=active]:bg-flow-accent/20 data-[state=active]:text-flow-accent"
          >
            Sync Jobs
          </TabsTrigger>
          <TabsTrigger 
            value="configs" 
            className="text-xs data-[state=active]:bg-flow-accent/20 data-[state=active]:text-flow-accent"
          >
            Configurations
          </TabsTrigger>
          <TabsTrigger 
            value="logs" 
            className="text-xs data-[state=active]:bg-flow-accent/20 data-[state=active]:text-flow-accent"
          >
            Sync Logs
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="endpoints" className="space-y-4">
          <Card className="bg-flow-background/20 backdrop-blur-md border-flow-border p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-sm font-medium">API Endpoints</h3>
                <p className="text-xs text-muted-foreground">{endpoints.length} available endpoints</p>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[120px] h-7 text-xs bg-flow-background/30 border-flow-border/50">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="crm">CRM</SelectItem>
                    <SelectItem value="budget">Budget</SelectItem>
                    <SelectItem value="analytics">Analytics</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead>Response Time</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {endpoints.map((endpoint) => (
                    <TableRow key={endpoint.id}>
                      <TableCell className="font-medium">{endpoint.name}</TableCell>
                      <TableCell className="font-mono text-xs truncate max-w-[150px]">{endpoint.url}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`
                            ${endpoint.method === 'GET' ? 'bg-blue-500/20 text-blue-500' : 
                              endpoint.method === 'POST' ? 'bg-green-500/20 text-green-500' : 
                              endpoint.method === 'PUT' ? 'bg-amber-500/20 text-amber-500' : 
                              'bg-red-500/20 text-red-500'}
                          `}
                        >
                          {endpoint.method}
                        </Badge>
                      </TableCell>
                      <TableCell className="capitalize">{endpoint.category}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className={`h-2 w-2 rounded-full ${endpoint.isActive ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                          <span className="text-xs">{endpoint.isActive ? 'Active' : 'Inactive'}</span>
                        </div>
                      </TableCell>
                      <TableCell>{endpoint.lastUsed ? formatDate(endpoint.lastUsed) : 'Never'}</TableCell>
                      <TableCell>{endpoint.responseTime ? `${endpoint.responseTime}ms` : 'N/A'}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 w-7 p-0" 
                          onClick={() => syncEndpoint(endpoint.id)}
                          disabled={isLoading || !endpoint.isActive}
                        >
                          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                          <span className="sr-only">Sync</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="jobs" className="space-y-4">
          <Card className="bg-flow-background/20 backdrop-blur-md border-flow-border p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-sm font-medium">Synchronization Jobs</h3>
                <p className="text-xs text-muted-foreground">{syncJobs.length} total jobs</p>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[120px] h-7 text-xs bg-flow-background/30 border-flow-border/50">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>End Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Data Processed</TableHead>
                    <TableHead>Next Scheduled</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {syncJobs.map((job) => {
                    // Find the endpoint for this job
                    const endpoint = endpoints.find(e => e.id === job.endpoint);
                    
                    return (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.name}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`
                              ${job.status === 'completed' ? 'bg-green-500/20 text-green-500' : 
                                job.status === 'in_progress' ? 'bg-blue-500/20 text-blue-500' : 
                                job.status === 'pending' ? 'bg-amber-500/20 text-amber-500' : 
                                'bg-red-500/20 text-red-500'}
                            `}
                          >
                            {job.status.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>{endpoint?.name || job.endpoint}</TableCell>
                        <TableCell>{formatDate(job.startTime)}</TableCell>
                        <TableCell>{formatDate(job.endTime)}</TableCell>
                        <TableCell>{formatDuration(job.duration)}</TableCell>
                        <TableCell>{job.dataProcessed ? `${job.dataProcessed}KB` : 'N/A'}</TableCell>
                        <TableCell>{formatDate(job.nextScheduled)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="configs" className="space-y-4">
          <Card className="bg-flow-background/20 backdrop-blur-md border-flow-border p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-sm font-medium">Synchronization Configurations</h3>
                <p className="text-xs text-muted-foreground">Scheduled sync tasks</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs h-7 bg-flow-accent/10 text-flow-accent border-flow-accent/50"
              >
                <PlusCircle className="h-3 w-3 mr-2" />
                New Config
              </Button>
            </div>
            
            <div className="space-y-4">
              {syncConfigs.map((config) => {
                // Find the endpoints for this config
                const configEndpoints = endpoints.filter(e => config.endpoints.includes(e.id));
                
                return (
                  <GlassMorphism 
                    key={config.id} 
                    className="p-4 rounded-xl border-flow-border/30"
                  >
                    <div className="flex justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-sm flex items-center">
                          {config.name}
                          <Badge 
                            variant="outline" 
                            className="ml-2 text-[10px] bg-flow-muted/30" 
                          >
                            {config.schedule}
                          </Badge>
                        </h3>
                        <p className="text-xs text-muted-foreground">{config.description}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          {config.isActive ? (
                            <PauseCircle className="h-4 w-4 text-amber-500" />
                          ) : (
                            <PlayCircle className="h-4 w-4 text-green-500" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-3 text-xs">
                      <div>
                        <div className="text-muted-foreground mb-1">Last Run</div>
                        <div>{formatDate(config.lastRun)}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground mb-1">Next Run</div>
                        <div>{formatDate(config.nextRun)}</div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-xs text-muted-foreground mb-1">Endpoints ({configEndpoints.length})</div>
                      <div className="flex flex-wrap gap-2">
                        {configEndpoints.map((endpoint) => (
                          <Badge 
                            key={endpoint.id} 
                            variant="outline" 
                            className="text-[10px]"
                          >
                            {endpoint.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-3 text-right">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs h-7"
                      >
                        <RefreshCw className="h-3 w-3 mr-2" />
                        Run Now
                      </Button>
                    </div>
                  </GlassMorphism>
                );
              })}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs" className="space-y-4">
          <Card className="bg-flow-background/20 backdrop-blur-md border-flow-border p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-sm font-medium">Synchronization Logs</h3>
                <p className="text-xs text-muted-foreground">Recent system activity</p>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[120px] h-7 text-xs bg-flow-background/30 border-flow-border/50">
                    <SelectValue placeholder="All Logs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Logs</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="font-mono text-xs space-y-2 max-h-[400px] overflow-y-auto p-2">
              {[
                { timestamp: '2025-04-15T10:30:15Z', level: 'info', message: 'Sync job "Daily CRM Contacts Sync" completed successfully' },
                { timestamp: '2025-04-15T10:30:10Z', level: 'info', message: 'Processed 256KB of data from CRM API' },
                { timestamp: '2025-04-15T10:29:45Z', level: 'info', message: 'Starting sync job "Daily CRM Contacts Sync"' },
                { timestamp: '2025-04-15T08:38:15Z', level: 'info', message: 'Sync job "Daily CRM Deals Sync" completed successfully' },
                { timestamp: '2025-04-15T08:35:10Z', level: 'info', message: 'Starting sync job "Daily CRM Deals Sync"' },
                { timestamp: '2025-04-15T00:06:30Z', level: 'error', message: 'Sync job "Analytics Export" failed: API rate limit exceeded' },
                { timestamp: '2025-04-15T00:05:45Z', level: 'warning', message: 'API response time exceeding threshold: 890ms' },
                { timestamp: '2025-04-15T00:05:10Z', level: 'info', message: 'Starting sync job "Analytics Export"' },
                { timestamp: '2025-04-14T16:20:30Z', level: 'info', message: 'Budget data successfully updated' },
                { timestamp: '2025-04-14T16:20:15Z', level: 'info', message: 'Starting budget update process' },
              ].map((log, index) => (
                <div 
                  key={index} 
                  className={`p-2 rounded-sm ${
                    log.level === 'error' ? 'bg-red-500/10 border-l-2 border-red-500' : 
                    log.level === 'warning' ? 'bg-amber-500/10 border-l-2 border-amber-500' : 
                    'bg-flow-background/30 border-l-2 border-blue-500'
                  }`}
                >
                  <span className="text-flow-foreground/60">[{formatDate(log.timestamp)}]</span>{' '}
                  <span className={
                    log.level === 'error' ? 'text-red-500' : 
                    log.level === 'warning' ? 'text-amber-500' : 
                    'text-blue-500'
                  }>
                    [{log.level.toUpperCase()}]
                  </span>{' '}
                  <span>{log.message}</span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiSynchronization;
