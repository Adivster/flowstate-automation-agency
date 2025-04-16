
import React, { useState } from 'react';
import { PlusCircle, X, Settings, MoveIcon, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { motion, Reorder } from 'framer-motion';

export type ModuleType = 
  | 'revenue-forecast'
  | 'cash-flow'
  | 'support-metrics'
  | 'sales-pipeline'
  | 'inventory-status'
  | 'marketing-roi'
  | 'custom-kpi';

interface ModuleConfig {
  id: string;
  type: ModuleType;
  title: string;
  description?: string;
  size: 'small' | 'medium' | 'large';
  customSettings?: Record<string, any>;
  isVisible: boolean;
}

// Sample module templates
const MODULE_TEMPLATES: Record<ModuleType, Partial<ModuleConfig>> = {
  'revenue-forecast': {
    title: 'Revenue Forecast',
    description: 'Predicted revenue based on historical data and current trends',
    size: 'medium',
  },
  'cash-flow': {
    title: 'Cash Flow Analysis',
    description: 'Current cash position and projected flow over time',
    size: 'medium',
  },
  'support-metrics': {
    title: 'Support Metrics',
    description: 'Key performance indicators for your support team',
    size: 'small',
  },
  'sales-pipeline': {
    title: 'Sales Pipeline',
    description: 'Overview of deals in your sales funnel',
    size: 'large',
  },
  'inventory-status': {
    title: 'Inventory Status',
    description: 'Current stock levels and reorder notifications',
    size: 'medium',
  },
  'marketing-roi': {
    title: 'Marketing ROI',
    description: 'Return on investment for marketing campaigns',
    size: 'small',
  },
  'custom-kpi': {
    title: 'Custom KPI',
    description: 'Customizable key performance indicator',
    size: 'small',
  }
};

// Module templates for different industries
const INDUSTRY_PRESETS = {
  'ecommerce': ['inventory-status', 'marketing-roi', 'cash-flow'],
  'saas': ['revenue-forecast', 'support-metrics', 'sales-pipeline'],
  'consulting': ['sales-pipeline', 'cash-flow', 'custom-kpi'],
  'manufacturing': ['inventory-status', 'cash-flow', 'custom-kpi'],
  'healthcare': ['revenue-forecast', 'support-metrics', 'cash-flow'],
};

const BusinessModules: React.FC = () => {
  const { toast } = useToast();
  const [modules, setModules] = useState<ModuleConfig[]>([
    {
      id: '1',
      type: 'revenue-forecast',
      title: 'Revenue Forecast',
      description: 'Predicted revenue based on historical data and current trends',
      size: 'medium',
      isVisible: true
    },
    {
      id: '2',
      type: 'support-metrics',
      title: 'Support Metrics',
      description: 'Key performance indicators for your support team',
      size: 'small',
      isVisible: true
    },
    {
      id: '3',
      type: 'sales-pipeline',
      title: 'Sales Pipeline',
      description: 'Overview of deals in your sales funnel',
      size: 'large',
      isVisible: true
    }
  ]);
  
  const [isAddModuleOpen, setIsAddModuleOpen] = useState(false);
  const [newModuleType, setNewModuleType] = useState<ModuleType>('revenue-forecast');
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [selectedPreset, setSelectedPreset] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  
  const handleAddModule = () => {
    const moduleTemplate = MODULE_TEMPLATES[newModuleType];
    const newModule: ModuleConfig = {
      id: Date.now().toString(),
      type: newModuleType,
      title: newModuleTitle || moduleTemplate.title || 'New Module',
      description: moduleTemplate.description || '',
      size: moduleTemplate.size || 'medium',
      isVisible: true
    };
    
    setModules([...modules, newModule]);
    setIsAddModuleOpen(false);
    setNewModuleType('revenue-forecast');
    setNewModuleTitle('');
    
    toast({
      title: "Module Added",
      description: `${newModule.title} has been added to your dashboard.`,
      duration: 3000,
    });
  };
  
  const handleRemoveModule = (id: string) => {
    setModules(modules.filter(module => module.id !== id));
    
    toast({
      title: "Module Removed",
      description: "The module has been removed from your dashboard.",
      duration: 3000,
    });
  };
  
  const handleToggleVisibility = (id: string) => {
    setModules(modules.map(module => 
      module.id === id ? { ...module, isVisible: !module.isVisible } : module
    ));
  };
  
  const handleApplyPreset = (preset: string) => {
    const presetModules = INDUSTRY_PRESETS[preset as keyof typeof INDUSTRY_PRESETS] || [];
    
    const newModules = presetModules.map((type, index) => {
      const moduleTemplate = MODULE_TEMPLATES[type as ModuleType];
      return {
        id: `preset-${index + 1}-${Date.now()}`,
        type: type as ModuleType,
        title: moduleTemplate.title || 'New Module',
        description: moduleTemplate.description || '',
        size: moduleTemplate.size || 'medium',
        isVisible: true
      };
    });
    
    setModules(newModules);
    setSelectedPreset('');
    
    toast({
      title: "Preset Applied",
      description: `Applied the ${preset} industry preset to your dashboard.`,
      duration: 3000,
    });
  };

  const renderModuleContent = (module: ModuleConfig) => {
    switch (module.type) {
      case 'revenue-forecast':
        return (
          <div className="p-4">
            <h4 className="text-sm font-medium mb-3">{module.title}</h4>
            <div className="h-32 flex items-center justify-center bg-flow-background/20 rounded-md">
              <div className="w-full px-4">
                <div className="h-20 w-full flex items-end justify-between">
                  {[...Array(12)].map((_, i) => {
                    const height = 30 + Math.sin(i / 2) * 20 + Math.random() * 40;
                    return (
                      <div 
                        key={i}
                        className="w-2 bg-gradient-to-t from-purple-600/50 to-blue-400/50 rounded-t"
                        style={{ height: `${height}%` }}
                      ></div>
                    );
                  })}
                </div>
                <div className="grid grid-cols-4 text-[10px] text-center mt-2 text-flow-foreground/50">
                  <div>Q1</div>
                  <div>Q2</div>
                  <div>Q3</div>
                  <div>Q4</div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div>
                <div className="text-xs text-flow-foreground/70">Projected Annual Revenue</div>
                <div className="text-sm font-medium">$1.4M</div>
              </div>
              <div>
                <div className="text-xs text-flow-foreground/70">Growth</div>
                <div className="text-sm font-medium text-green-400">+12.3%</div>
              </div>
            </div>
          </div>
        );
        
      case 'support-metrics':
        return (
          <div className="p-4">
            <h4 className="text-sm font-medium mb-2">{module.title}</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-xs text-flow-foreground/70">Response Time</span>
                <span className="text-xs font-medium">1h 12m</span>
              </div>
              <div className="w-full h-1.5 bg-flow-background/30 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '62%' }}></div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-xs text-flow-foreground/70">Resolution Rate</span>
                <span className="text-xs font-medium">94.2%</span>
              </div>
              <div className="w-full h-1.5 bg-flow-background/30 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '94%' }}></div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-xs text-flow-foreground/70">Customer Satisfaction</span>
                <span className="text-xs font-medium">4.7/5</span>
              </div>
              <div className="w-full h-1.5 bg-flow-background/30 rounded-full overflow-hidden">
                <div className="h-full bg-flow-accent rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
          </div>
        );
        
      case 'sales-pipeline':
        return (
          <div className="p-4">
            <h4 className="text-sm font-medium mb-3">{module.title}</h4>
            <div className="flex justify-between mb-4 text-xs">
              <div>
                <div className="text-flow-foreground/70">Total Value</div>
                <div className="font-medium">$3.2M</div>
              </div>
              <div>
                <div className="text-flow-foreground/70">Open Deals</div>
                <div className="font-medium">37</div>
              </div>
              <div>
                <div className="text-flow-foreground/70">Avg. Deal Size</div>
                <div className="font-medium">$86K</div>
              </div>
              <div>
                <div className="text-flow-foreground/70">Close Rate</div>
                <div className="font-medium">23%</div>
              </div>
            </div>
            
            <div className="space-y-2">
              {[
                { stage: 'Lead', count: 42, value: '$4.6M', color: 'bg-blue-500/30' },
                { stage: 'Qualified', count: 28, value: '$3.2M', color: 'bg-indigo-500/30' },
                { stage: 'Proposal', count: 16, value: '$1.9M', color: 'bg-violet-500/30' },
                { stage: 'Negotiation', count: 7, value: '$920K', color: 'bg-purple-500/30' },
                { stage: 'Closed', count: 8, value: '$1.1M', color: 'bg-green-500/30' }
              ].map((stage, i) => (
                <div key={i} className={`p-2 rounded ${stage.color}`}>
                  <div className="flex justify-between">
                    <span className="text-xs font-medium">{stage.stage}</span>
                    <div className="flex space-x-4">
                      <span className="text-xs">{stage.count} deals</span>
                      <span className="text-xs font-medium">{stage.value}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'inventory-status':
        return (
          <div className="p-4">
            <h4 className="text-sm font-medium mb-3">{module.title}</h4>
            <div className="space-y-3">
              {[
                { product: 'Product A', status: 'In Stock', level: 78, alert: false },
                { product: 'Product B', status: 'Low Stock', level: 12, alert: true },
                { product: 'Product C', status: 'Out of Stock', level: 0, alert: true },
                { product: 'Product D', status: 'In Stock', level: 45, alert: false }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div 
                      className={`w-2 h-2 rounded-full mr-2 ${
                        item.status === 'In Stock' ? 'bg-green-500' : 
                        item.status === 'Low Stock' ? 'bg-amber-500' : 'bg-red-500'
                      }`}>
                    </div>
                    <span className="text-xs">{item.product}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`text-xs ${item.alert ? 'text-amber-500 font-medium' : ''}`}>
                      {item.status}
                    </span>
                    <div className="w-16 h-1.5 bg-flow-background/30 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          item.level > 50 ? 'bg-green-500' :
                          item.level > 20 ? 'bg-amber-500' : 'bg-red-500'
                        }`} 
                        style={{ width: `${item.level}%` }}>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="p-4">
            <h4 className="text-sm font-medium mb-2">{module.title}</h4>
            <p className="text-xs text-flow-foreground/70">{module.description}</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Customizable Business Modules</h3>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            size="sm"
            className="text-xs bg-flow-background/30 border-flow-border/30"
            onClick={() => setIsEditMode(!isEditMode)}
          >
            <Settings className="h-3.5 w-3.5 mr-1.5" />
            {isEditMode ? 'Done' : 'Edit Modules'}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            className="text-xs bg-flow-background/30 border-flow-border/30"
            onClick={() => setIsAddModuleOpen(true)}
          >
            <PlusCircle className="h-3.5 w-3.5 mr-1.5" />
            Add Module
          </Button>
        </div>
      </div>
      
      {isEditMode && (
        <GlassMorphism className="p-3 border-flow-border/30 mb-6 rounded">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-medium">Module Settings</h4>
            <Select value={selectedPreset} onValueChange={handleApplyPreset}>
              <SelectTrigger className="w-[180px] h-8 text-xs">
                <SelectValue placeholder="Apply Industry Template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ecommerce">E-Commerce</SelectItem>
                <SelectItem value="saas">SaaS</SelectItem>
                <SelectItem value="consulting">Consulting</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Reorder.Group values={modules} onReorder={setModules} className="space-y-2">
            {modules.map((module) => (
              <Reorder.Item key={module.id} value={module} className="cursor-grab active:cursor-grabbing">
                <motion.div
                  initial={{ opacity: 1 }}
                  className="flex items-center justify-between p-2 bg-flow-background/40 border border-flow-border/30 rounded"
                >
                  <div className="flex items-center">
                    <MoveIcon className="h-3.5 w-3.5 mr-3 text-flow-foreground/50" />
                    <span className="text-xs font-medium">{module.title}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleVisibility(module.id);
                      }}
                    >
                      <span className={`h-4 w-4 rounded border ${module.isVisible ? 'bg-flow-accent/20 border-flow-accent' : 'bg-transparent border-flow-foreground/30'}`}>
                        {module.isVisible && <CheckCircle className="h-4 w-4 text-flow-accent" />}
                      </span>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 hover:text-red-400"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveModule(module.id);
                      }}
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </motion.div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </GlassMorphism>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {modules.filter(module => module.isVisible).map((module) => (
          <Card 
            key={module.id}
            className={`bg-flow-background/20 backdrop-blur-md border-flow-border overflow-hidden ${
              module.size === 'large' ? 'xl:col-span-2' : module.size === 'small' ? '' : ''
            }`}
          >
            {renderModuleContent(module)}
          </Card>
        ))}
      </div>
      
      <Dialog open={isAddModuleOpen} onOpenChange={setIsAddModuleOpen}>
        <DialogContent className="bg-flow-background border-flow-border/30 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Module</DialogTitle>
            <DialogDescription>
              Select a module type and customize its settings.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm">Module Type</label>
              <Tabs 
                defaultValue="revenue-forecast" 
                value={newModuleType}
                onValueChange={(value) => setNewModuleType(value as ModuleType)}
                className="w-full"
              >
                <TabsList className="grid grid-cols-3 h-auto p-1 bg-flow-background/30">
                  <TabsTrigger value="revenue-forecast" className="text-xs py-1.5">Revenue</TabsTrigger>
                  <TabsTrigger value="support-metrics" className="text-xs py-1.5">Support</TabsTrigger>
                  <TabsTrigger value="sales-pipeline" className="text-xs py-1.5">Sales</TabsTrigger>
                  <TabsTrigger value="cash-flow" className="text-xs py-1.5">Cash Flow</TabsTrigger>
                  <TabsTrigger value="inventory-status" className="text-xs py-1.5">Inventory</TabsTrigger>
                  <TabsTrigger value="custom-kpi" className="text-xs py-1.5">Custom</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm">Module Title</label>
              <Input 
                placeholder={MODULE_TEMPLATES[newModuleType]?.title || 'Enter title'} 
                value={newModuleTitle} 
                onChange={(e) => setNewModuleTitle(e.target.value)} 
                className="bg-flow-background/20 border-flow-border/30"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModuleOpen(false)}>Cancel</Button>
            <Button onClick={handleAddModule}>Add Module</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BusinessModules;
