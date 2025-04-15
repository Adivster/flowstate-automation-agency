
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  AlertCircle, 
  TrendingUp, 
  Zap, 
  Info,
  BarChart
} from 'lucide-react';

interface InsightFiltersProps {
  filterType: string;
  filterSeverity: string;
  setFilterType: (type: string) => void;
  setFilterSeverity: (severity: string) => void;
  typeCount: Record<string, number>;
  severityCount: Record<string, number>;
}

const InsightFilters: React.FC<InsightFiltersProps> = ({
  filterType,
  filterSeverity,
  setFilterType,
  setFilterSeverity,
  typeCount,
  severityCount
}) => {
  const typeFilters = [
    { id: 'all', label: 'All', icon: BarChart, color: 'bg-gradient-to-r from-indigo-400 to-blue-400' },
    { id: 'anomaly', label: 'Anomalies', icon: AlertCircle, color: 'bg-gradient-to-r from-red-400 to-rose-400' },
    { id: 'prediction', label: 'Predictions', icon: TrendingUp, color: 'bg-gradient-to-r from-purple-400 to-indigo-400' },
    { id: 'opportunity', label: 'Opportunities', icon: Zap, color: 'bg-gradient-to-r from-green-400 to-emerald-400' },
    { id: 'insight', label: 'Insights', icon: Info, color: 'bg-gradient-to-r from-blue-400 to-cyan-400' }
  ];

  const severityFilters = [
    { id: 'all', label: 'All Priorities', color: 'bg-gradient-to-r from-gray-400 to-slate-400' },
    { id: 'high', label: 'High', color: 'bg-gradient-to-r from-red-400 to-rose-400' },
    { id: 'medium', label: 'Medium', color: 'bg-gradient-to-r from-amber-400 to-yellow-400' },
    { id: 'low', label: 'Low', color: 'bg-gradient-to-r from-green-400 to-emerald-400' }
  ];

  return (
    <div className="mb-4 space-y-3">
      <div className="flex flex-wrap gap-2">
        {typeFilters.map(filter => {
          const Icon = filter.icon;
          const isActive = filterType === filter.id;
          const count = filter.id === 'all' 
            ? Object.values(typeCount).reduce((a, b) => a + b, 0) 
            : typeCount[filter.id] || 0;
          
          return (
            <Badge
              key={filter.id}
              variant={isActive ? "default" : "outline"}
              className={`
                cursor-pointer px-2 py-0.5 h-6 font-medium
                ${isActive ? `${filter.color} text-white` : 'hover:bg-flow-background/50'}
                transition-all
              `}
              onClick={() => setFilterType(filter.id)}
            >
              <Icon className="h-3 w-3 mr-1" />
              {filter.label}
              <span className="ml-1 text-[10px] bg-flow-background/30 px-1 rounded-full">
                {count}
              </span>
            </Badge>
          );
        })}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {severityFilters.map(filter => {
          const isActive = filterSeverity === filter.id;
          const count = filter.id === 'all' 
            ? Object.values(severityCount).reduce((a, b) => a + b, 0) 
            : severityCount[filter.id] || 0;
          
          return (
            <Badge
              key={filter.id}
              variant={isActive ? "default" : "outline"}
              className={`
                cursor-pointer px-2 py-0.5 h-6
                ${isActive ? `${filter.color} text-white` : 'hover:bg-flow-background/50'}
                transition-all
              `}
              onClick={() => setFilterSeverity(filter.id)}
            >
              {filter.label}
              <span className="ml-1 text-[10px] bg-flow-background/30 px-1 rounded-full">
                {count}
              </span>
            </Badge>
          );
        })}
      </div>
    </div>
  );
};

export default InsightFilters;
