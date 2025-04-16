
import React, { useState } from 'react';
import { 
  Chart as BaseChart,
  LineChart as BaseLineChart,
  BarChart as BaseBarChart,
  PieChart as BasePieChart, 
  AreaChart as BaseAreaChart
} from '@/components/ui/chart';
import { Card } from './card';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, X } from 'lucide-react';
import { Button } from './button';

// Extended types for data points with tooltip and annotation
export interface EnhancedDataPoint {
  name: string;
  value: number;
  color?: string;
  description?: string;
  tooltip?: string;
  annotation?: {
    text: string;
    position?: 'top' | 'right' | 'bottom' | 'left';
    importance?: 'low' | 'medium' | 'high';
    icon?: React.ReactNode;
  };
}

export interface EnhancedChartProps {
  data: EnhancedDataPoint[];
  title?: string;
  description?: string;
  type?: "line" | "bar" | "pie" | "area";
  height?: number;
  width?: number;
  colors?: string[];
  showLegend?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  className?: string;
  
  // Drill-down functionality
  onDataPointClick?: (dataPoint: EnhancedDataPoint, index: number) => void;
  drillDownContent?: React.ReactNode;
  
  // Chart-specific properties
  lineColor?: string;
  areaOpacity?: number;
  showArea?: boolean;
  donut?: boolean;
  legendPosition?: string;
}

interface AnnotationMarkerProps {
  annotation: EnhancedDataPoint['annotation'];
  position: { x: number; y: number };
  onClick: () => void;
}

const AnnotationMarker: React.FC<AnnotationMarkerProps> = ({ annotation, position, onClick }) => {
  if (!annotation) return null;
  
  // Determine the color based on importance
  let bgColor = 'bg-blue-500/20';
  let borderColor = 'border-blue-500/30';
  let textColor = 'text-blue-400';
  
  if (annotation.importance === 'high') {
    bgColor = 'bg-amber-500/20';
    borderColor = 'border-amber-500/30';
    textColor = 'text-amber-400';
  } else if (annotation.importance === 'medium') {
    bgColor = 'bg-indigo-500/20';
    borderColor = 'border-indigo-500/30';
    textColor = 'text-indigo-400';
  }
  
  return (
    <div 
      className={`absolute ${bgColor} border ${borderColor} rounded-full h-5 w-5 flex items-center justify-center cursor-help`}
      style={{ top: position.y, left: position.x }}
      onClick={onClick}
    >
      <span className={`text-[10px] ${textColor}`}>
        {annotation.icon || '!'}
      </span>
    </div>
  );
};

export const EnhancedChart: React.FC<EnhancedChartProps> = ({
  data,
  title,
  description,
  type = "line",
  height = 300,
  width,
  colors,
  showLegend = true,
  showGrid = true,
  showTooltip = true,
  showXAxis = true,
  showYAxis = true,
  className,
  onDataPointClick,
  drillDownContent,
  lineColor,
  areaOpacity,
  showArea,
  donut,
  legendPosition,
}) => {
  const [selectedPoint, setSelectedPoint] = useState<EnhancedDataPoint | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showAnnotation, setShowAnnotation] = useState<EnhancedDataPoint['annotation'] | null>(null);
  const [annotationPosition, setAnnotationPosition] = useState({ x: 0, y: 0 });
  
  // Handle click events on data points
  const handleClick = (data: any, index: number) => {
    // For recharts data structure, extract the actual data point
    const actualData = data?.payload || data;
    const dataPoint = actualData.name ? actualData : data;
    
    // Find the matching data point in our original data array
    const originalDataPoint = typeof dataPoint.name === 'string' 
      ? data[index] || data : dataPoint;
    
    setSelectedPoint(originalDataPoint);
    setSelectedIndex(index);
    
    if (onDataPointClick) {
      onDataPointClick(originalDataPoint, index);
    }
  };
  
  // Determine where to show annotations
  const calculateAnnotationPositions = () => {
    // This would be more sophisticated in a real app with access to chart dimensions
    // Here we're using placeholder positions
    return data
      .map((point, index) => {
        if (!point.annotation) return null;
        
        // Position calculation would typically use chart dimensions and data point position
        // Here we're using simplified logic
        const totalPoints = data.length;
        const segmentWidth = width ? width / totalPoints : 300 / totalPoints;
        const x = segmentWidth * (index + 0.5); // Center of the segment
        
        // For line/bar charts, y position would depend on the value
        const maxValue = Math.max(...data.map(d => d.value));
        const normalizedValue = point.value / maxValue;
        const y = height ? height * (1 - normalizedValue) * 0.8 : 100;
        
        return { point, x, y, index };
      })
      .filter(item => item !== null);
  };
  
  const handleAnnotationClick = (annotation: EnhancedDataPoint['annotation'], position: { x: number, y: number }) => {
    setShowAnnotation(annotation);
    setAnnotationPosition(position);
  };
  
  // Determine chart component based on type
  const ChartComponent = type === 'line' ? BaseLineChart :
                        type === 'bar' ? BaseBarChart :
                        type === 'pie' ? BasePieChart : 
                        BaseAreaChart;

  // Convert our enhanced data points to the format expected by the base chart component
  const chartData = data.map(point => ({
    name: point.name,
    value: point.value,
    color: point.color
  }));
  
  return (
    <div className={`relative ${className}`}>
      {title && (
        <div className="mb-2">
          <h3 className="text-sm font-medium">{title}</h3>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
      )}
      
      <div className="relative" style={{ height }}>
        <ChartComponent
          data={chartData}
          height={height}
          width={width}
          colors={colors}
          showLegend={showLegend}
          showGrid={showGrid}
          showTooltip={showTooltip}
          showXAxis={showXAxis}
          showYAxis={showYAxis}
          lineColor={lineColor}
          areaOpacity={areaOpacity}
          showArea={showArea}
          donut={donut}
          legendPosition={legendPosition}
          onClick={handleClick}
        />
        
        {/* Annotation markers */}
        {calculateAnnotationPositions()?.map((item, i) => (
          item && item.point.annotation && (
            <AnnotationMarker
              key={i}
              annotation={item.point.annotation}
              position={{ x: item.x, y: item.y }}
              onClick={() => handleAnnotationClick(item.point.annotation, { x: item.x, y: item.y })}
            />
          )
        ))}
      </div>
      
      {/* Annotation popover */}
      <AnimatePresence>
        {showAnnotation && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute bg-flow-background/90 border border-flow-border/50 rounded-md p-3 shadow-lg max-w-[200px] z-10"
            style={{ 
              top: annotationPosition.y - 10, 
              left: annotationPosition.x + 20 
            }}
          >
            <div className="flex justify-between items-start mb-1">
              <span className="text-xs font-medium">Note</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-5 w-5 p-0" 
                onClick={() => setShowAnnotation(null)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <p className="text-xs">{showAnnotation.text}</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Drill-down content */}
      <AnimatePresence>
        {selectedPoint && drillDownContent && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 overflow-hidden"
          >
            <Card className="p-3 bg-flow-background/20 border-flow-border/30">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-xs font-medium">Details for {selectedPoint.name}</h4>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0" 
                  onClick={() => setSelectedPoint(null)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              {React.isValidElement(drillDownContent) ? 
                drillDownContent : 
                <div className="text-xs">{selectedPoint.description || `Value: ${selectedPoint.value}`}</div>
              }
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Specialized chart components
export const EnhancedLineChart: React.FC<Omit<EnhancedChartProps, 'type'>> = (props) => (
  <EnhancedChart {...props} type="line" />
);

export const EnhancedBarChart: React.FC<Omit<EnhancedChartProps, 'type'>> = (props) => (
  <EnhancedChart {...props} type="bar" />
);

export const EnhancedPieChart: React.FC<Omit<EnhancedChartProps, 'type'>> = (props) => (
  <EnhancedChart {...props} type="pie" />
);

export const EnhancedAreaChart: React.FC<Omit<EnhancedChartProps, 'type'>> = (props) => (
  <EnhancedChart {...props} type="area" />
);
