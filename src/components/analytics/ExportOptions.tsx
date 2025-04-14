
import React from 'react';
import { Download, Mail, Share2, FileText, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InfoChip } from '@/components/ui/InfoChip';

type ExportOptionsProps = {
  data: any;
  timeRange: string;
};

const ExportOptions: React.FC<ExportOptionsProps> = ({ data, timeRange }) => {
  const exportOptions = [
    { 
      name: 'PDF Report', 
      icon: FileText, 
      description: 'Full analytics report with visualizations',
      className: 'bg-flow-background/30 hover:bg-flow-background/40'
    },
    { 
      name: 'CSV Data', 
      icon: FileSpreadsheet, 
      description: 'Raw data export for spreadsheet analysis',
      className: 'bg-flow-background/30 hover:bg-flow-background/40'
    },
    { 
      name: 'Schedule Email', 
      icon: Mail, 
      description: 'Set up periodic email reports',
      className: 'bg-flow-accent/20 hover:bg-flow-accent/30 text-flow-accent'
    },
    { 
      name: 'Share Dashboard', 
      icon: Share2, 
      description: 'Generate shareable link or invite others',
      className: 'bg-flow-background/30 hover:bg-flow-background/40'
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium">Export & Reporting</h3>
          <p className="text-xs text-flow-foreground/60">Download or share your analytics</p>
        </div>
        <InfoChip icon={Download} label="Export" />
      </div>
      
      <div className="flex-1 flex flex-col gap-3">
        {exportOptions.map((option) => (
          <Button 
            key={option.name} 
            variant="ghost" 
            className={`h-auto py-3 px-4 justify-start ${option.className}`}
          >
            <div className="flex items-center gap-3 w-full">
              <option.icon className="h-5 w-5" />
              <div className="text-left">
                <p className="text-sm font-medium">{option.name}</p>
                <p className="text-xs text-flow-foreground/60">{option.description}</p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ExportOptions;
