
import { useState } from 'react';
import { RefreshCw, UserPlus, Filter, ArrowRight, Check, Clock, BarChart, Zap, Link, LinkOff } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCrmIntegration } from '@/features/crm/hooks/useCrmIntegration';
import { CRMProvider, CRMContact, CRMDeal } from '@/features/crm/types';
import { format, parseISO } from 'date-fns';

const CRMIntegration = () => {
  const [subTab, setSubTab] = useState('providers');
  const { 
    providers, 
    contacts, 
    deals, 
    syncStats, 
    isLoading,
    selectedProvider,
    connectProvider,
    syncCrmData
  } = useCrmIntegration();

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return format(parseISO(dateString), 'dd MMM yyyy, HH:mm');
    } catch (e) {
      return 'Invalid date';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-medium mb-1">CRM Integration</h2>
          <p className="text-sm text-muted-foreground">Connect and synchronize with external CRM systems</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs h-8 bg-flow-background/30 border-flow-accent/50"
            onClick={() => syncCrmData()}
            disabled={!selectedProvider || isLoading}
          >
            <RefreshCw className={`h-3 w-3 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Sync Now
          </Button>
        </div>
      </div>
      
      <Tabs value={subTab} onValueChange={setSubTab} className="space-y-4">
        <TabsList className="bg-flow-background/30 border border-flow-border/20 inline-flex h-9 items-center text-muted-foreground w-full sm:w-auto">
          <TabsTrigger 
            value="providers" 
            className="text-xs data-[state=active]:bg-flow-accent/20 data-[state=active]:text-flow-accent"
          >
            Providers
          </TabsTrigger>
          <TabsTrigger 
            value="contacts" 
            className="text-xs data-[state=active]:bg-flow-accent/20 data-[state=active]:text-flow-accent"
          >
            Contacts
          </TabsTrigger>
          <TabsTrigger 
            value="deals" 
            className="text-xs data-[state=active]:bg-flow-accent/20 data-[state=active]:text-flow-accent"
          >
            Deals
          </TabsTrigger>
          <TabsTrigger 
            value="stats" 
            className="text-xs data-[state=active]:bg-flow-accent/20 data-[state=active]:text-flow-accent"
          >
            Sync Stats
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="providers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {providers.map((provider) => (
              <ProviderCard 
                key={provider.id} 
                provider={provider} 
                onConnect={() => connectProvider(provider.id)} 
                isLoading={isLoading}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="contacts" className="space-y-4">
          <Card className="bg-flow-background/20 backdrop-blur-md border-flow-border p-4">
            <div className="mb-4 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium">Imported Contacts</h3>
                <p className="text-xs text-muted-foreground">{contacts.length} contacts synced from CRM</p>
              </div>
              <Button variant="outline" size="sm" className="text-xs h-7">
                <Filter className="h-3 w-3 mr-2" />
                Filter
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                    <TableHead>Last Interaction</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell>{contact.company || 'N/A'}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {contact.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{contact.value ? `$${contact.value}` : '-'}</TableCell>
                      <TableCell>{formatDate(contact.lastInteraction)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="deals" className="space-y-4">
          <Card className="bg-flow-background/20 backdrop-blur-md border-flow-border p-4">
            <div className="mb-4 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium">Active Deals</h3>
                <p className="text-xs text-muted-foreground">{deals.length} deals synced from CRM</p>
              </div>
              <Button variant="outline" size="sm" className="text-xs h-7">
                <Filter className="h-3 w-3 mr-2" />
                Filter
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Deal Name</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead className="text-right">Probability</TableHead>
                    <TableHead>Expected Close</TableHead>
                    <TableHead>Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deals.map((deal) => (
                    <TableRow key={deal.id}>
                      <TableCell className="font-medium">{deal.name}</TableCell>
                      <TableCell className="text-right">${deal.value.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {deal.stage}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{deal.probability}%</TableCell>
                      <TableCell>{formatDate(deal.expectedCloseDate)}</TableCell>
                      <TableCell>{formatDate(deal.lastUpdated)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="stats" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <GlassMorphism className="p-4 rounded-xl border-flow-border/30">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs text-muted-foreground">Data Synced</h3>
                <UserPlus className="h-4 w-4 text-blue-500" />
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-lg font-medium">{syncStats?.contacts || 0}</div>
                  <div className="text-xs text-muted-foreground">Contacts</div>
                </div>
                <div>
                  <div className="text-lg font-medium">{syncStats?.deals || 0}</div>
                  <div className="text-xs text-muted-foreground">Deals</div>
                </div>
                <div>
                  <div className="text-lg font-medium">{syncStats?.activities || 0}</div>
                  <div className="text-xs text-muted-foreground">Activities</div>
                </div>
              </div>
            </GlassMorphism>
            
            <GlassMorphism className="p-4 rounded-xl border-flow-border/30">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs text-muted-foreground">Sync Schedule</h3>
                <Clock className="h-4 w-4 text-amber-500" />
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium">Last Synchronization</div>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(syncStats?.lastSyncTime)}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Next Scheduled Sync</div>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(syncStats?.nextScheduledSync)}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className={`h-2 w-2 rounded-full ${syncStats?.errors ? 'bg-red-500' : 'bg-green-500'} mr-2`}></div>
                  <div className="text-xs">
                    {syncStats?.errors ? `${syncStats.errors} errors detected` : 'All systems operational'}
                  </div>
                </div>
              </div>
            </GlassMorphism>
            
            <GlassMorphism className="p-4 rounded-xl border-flow-border/30">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs text-muted-foreground">Integration Health</h3>
                <Zap className="h-4 w-4 text-green-500" />
              </div>
              <div className="flex flex-col justify-between h-[calc(100%-2rem)]">
                <div>
                  {selectedProvider ? (
                    <>
                      <div className="text-sm font-medium">
                        Connected to {providers.find(p => p.id === selectedProvider)?.name}
                      </div>
                      <div className="flex items-center mt-1">
                        <Check className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-xs">Active connection</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-sm font-medium">No Active Connection</div>
                  )}
                </div>
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs h-8 mt-6"
                    onClick={() => setSubTab('providers')}
                  >
                    Manage Connections
                    <ArrowRight className="h-3 w-3 ml-2" />
                  </Button>
                </div>
              </div>
            </GlassMorphism>
          </div>
          
          {syncStats && (
            <Card className="bg-flow-background/20 backdrop-blur-md border-flow-border p-4">
              <div className="mb-3">
                <h3 className="text-sm font-medium">Sync History</h3>
                <p className="text-xs text-muted-foreground">Recent synchronization events</p>
              </div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => {
                  const date = new Date();
                  date.setDate(date.getDate() - i);
                  const success = i !== 2;
                  
                  return (
                    <div 
                      key={i}
                      className="flex items-center justify-between border-b border-flow-border/30 pb-2"
                    >
                      <div className="flex items-center">
                        {success ? (
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                        ) : (
                          <div className="h-4 w-4 text-red-500 mr-2 flex items-center justify-center">
                            ×
                          </div>
                        )}
                        <div>
                          <div className="text-xs font-medium">{success ? 'Successful Sync' : 'Failed Sync'}</div>
                          <div className="text-[10px] text-muted-foreground">
                            {format(date, 'dd MMM yyyy, HH:mm')}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs">
                        {success ? (
                          <span className="text-green-400">{Math.floor(Math.random() * 100) + 50} items</span>
                        ) : (
                          <span className="text-red-400">Error</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ProviderCardProps {
  provider: CRMProvider;
  onConnect: () => void;
  isLoading: boolean;
}

const ProviderCard = ({ provider, onConnect, isLoading }: ProviderCardProps) => {
  return (
    <Card className="bg-flow-background/20 backdrop-blur-md border-flow-border p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-flow-muted/50 rounded flex items-center justify-center mr-3">
            {provider.logo ? (
              <img src={provider.logo} alt={provider.name} className="w-6 h-6" />
            ) : (
              <BarChart className="w-4 h-4 text-flow-accent" />
            )}
          </div>
          <h3 className="font-medium">{provider.name}</h3>
        </div>
        {provider.isConnected && (
          <Badge variant="outline" className="bg-green-500/20 text-green-500 text-xs">
            Connected
          </Badge>
        )}
      </div>
      
      <p className="text-xs text-muted-foreground mb-4">{provider.description}</p>
      
      {provider.isConnected ? (
        <div className="space-y-2">
          <div className="flex items-center text-xs">
            <Clock className="h-3 w-3 mr-2 text-flow-foreground/70" />
            <span className="text-flow-foreground/70">Last sync: </span>
            <span className="ml-1">{provider.lastSync ? formatDate(provider.lastSync) : 'Never'}</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-xs h-8 mt-2 border-flow-border/50"
          >
            <LinkOff className="h-3 w-3 mr-2" />
            Disconnect
          </Button>
        </div>
      ) : (
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full text-xs h-8 mt-2 border-flow-accent/50 bg-flow-accent/10 hover:bg-flow-accent/20 text-flow-accent"
          onClick={onConnect}
          disabled={isLoading}
        >
          {isLoading ? (
            <RefreshCw className="h-3 w-3 mr-2 animate-spin" />
          ) : (
            <Link className="h-3 w-3 mr-2" />
          )}
          Connect
        </Button>
      )}
    </Card>
  );
};

export default CRMIntegration;
