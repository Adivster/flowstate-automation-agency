
import React, { useState } from "react";
import { 
  ResponsiveContainer, 
  AreaChart as RechartsAreaChart,
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  PieChart as RechartsPieChart,
  Area,
  Bar,
  Line,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  Sector,
  PieProps,
  ReferenceLine
} from "recharts";

const sampleData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
];

export const AreaChart = ({ data = sampleData, ...props }) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <RechartsAreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorValue)" />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
};

export const BarChart = ({ data = sampleData, ...props }) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <RechartsBarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

interface LineChartProps {
  data?: { name: string; value: number }[];
  lineColor?: string;
  dotColor?: string;
  height?: number;
  showArea?: boolean;
  areaOpacity?: number;
  animate?: boolean;
  focusAnimation?: boolean;
  referenceLineY?: number | null;
  referenceLineLabel?: string;
  referenceLineColor?: string;
  domain?: [number, number] | null;
  onClick?: (data: any, index: number) => void;
  showGrid?: boolean;
  [x: string]: any;
}

export const LineChart: React.FC<LineChartProps> = ({ 
  data = sampleData, 
  lineColor = "#8884d8", 
  dotColor = "#ffffff",
  height = 250,
  showArea = false,
  areaOpacity = 0.1,
  animate = true,
  focusAnimation = true,
  referenceLineY = null,
  referenceLineLabel = "",
  referenceLineColor = "#ff7300",
  domain = null,
  onClick = () => {},
  showGrid = true,
  ...props 
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const gradientId = `line-gradient-${lineColor.replace('#', '')}`;
  const areaGradientId = `area-gradient-${lineColor.replace('#', '')}`;
  
  const effectiveDomain = domain || (() => {
    const values = data.map(item => item.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = (max - min) * 0.2;
    
    const lowerBound = Math.max(0, min - padding);
    const upperBound = max + padding;
    
    return [lowerBound, upperBound];
  })();
  
  const handleMouseMove = (e: any) => {
    if (focusAnimation && e && e.activeTooltipIndex !== undefined) {
      setActiveIndex(e.activeTooltipIndex);
    }
  };
  
  const handleMouseLeave = () => {
    if (focusAnimation) {
      setActiveIndex(null);
    }
  };
  
  const handleClick = (data: any, index: number) => {
    if (onClick) {
      onClick(data, index);
    }
  };
  
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart 
        data={data} 
        margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={(data, index) => handleClick(data, index)}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={`${lineColor}90`} />
            <stop offset="100%" stopColor={lineColor} />
          </linearGradient>
          {showArea && (
            <linearGradient id={areaGradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={lineColor} stopOpacity={areaOpacity * 2} />
              <stop offset="100%" stopColor={lineColor} stopOpacity={0} />
            </linearGradient>
          )}
        </defs>
        <XAxis 
          dataKey="name" 
          stroke="#888888" 
          fontSize={10} 
          tickLine={false}
          axisLine={{ stroke: '#33333350' }}
        />
        <YAxis 
          stroke="#888888" 
          fontSize={10} 
          tickLine={false} 
          axisLine={{ stroke: '#33333350' }}
          width={25}
          domain={effectiveDomain as any}
        />
        {showGrid && (
          <CartesianGrid 
            stroke="#33333330" 
            strokeDasharray="3 3" 
            vertical={false}
          />
        )}
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'rgba(15, 15, 20, 0.9)',
            borderColor: lineColor,
            borderRadius: '4px',
            fontSize: '12px',
            boxShadow: `0 0 10px ${lineColor}40`
          }}
          itemStyle={{ color: '#ffffff' }}
          labelStyle={{ color: '#aaaaaa' }}
          cursor={{ stroke: `${lineColor}50`, strokeWidth: 1 }}
        />
        {referenceLineY && (
          <ReferenceLine 
            y={referenceLineY} 
            stroke={referenceLineColor} 
            strokeDasharray="3 3" 
            label={{ 
              value: referenceLineLabel || `${referenceLineY}`, 
              fill: referenceLineColor,
              fontSize: 10,
              position: 'insideTopRight' 
            }}
          />
        )}
        {showArea && (
          <Area 
            type="monotone"
            dataKey="value"
            stroke="none"
            fillOpacity={1}
            fill={`url(#${areaGradientId})`}
            animationDuration={1500}
          />
        )}
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={`url(#${gradientId})`}
          strokeWidth={2.5}
          dot={(props: any) => {
            const { cx, cy, payload, dataIndex } = props;
            const index = dataIndex !== undefined ? dataIndex : -1;
            const size = index === activeIndex ? 6 : 4;
            const strokeWidth = index === activeIndex ? 2.5 : 2;
            
            return (
              <circle
                cx={cx}
                cy={cy}
                r={size}
                stroke={lineColor}
                strokeWidth={strokeWidth}
                fill={dotColor}
                style={{ 
                  filter: index === activeIndex ? `drop-shadow(0 0 3px ${lineColor})` : 'none',
                  cursor: 'pointer'
                }}
              />
            );
          }}
          activeDot={{ 
            r: 6, 
            stroke: lineColor,
            strokeWidth: 2,
            fill: dotColor,
            style: { 
              filter: `drop-shadow(0 0 4px ${lineColor})`,
              cursor: 'pointer'
            }
          }}
          isAnimationActive={animate}
          animationDuration={1500}
          animationEasing="ease-in-out"
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

const renderActiveShape = (props: any) => {
  const { 
    cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, 
    payload, percent, value, name
  } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        stroke={fill}
        strokeWidth={2}
        strokeOpacity={0.8}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 12}
        outerRadius={outerRadius + 16}
        fill={fill}
        stroke="none"
        strokeOpacity={0.8}
      />
      <text 
        x={cx} 
        y={cy - 16} 
        dy={8} 
        textAnchor="middle" 
        fill="#ffffff"
        className="text-base font-semibold"
      >
        {name}
      </text>
      <text 
        x={cx} 
        y={cy + 8} 
        dy={8} 
        textAnchor="middle" 
        fill="#ffffff"
        className="text-sm font-mono"
      >
        {value}
      </text>
      <text 
        x={cx} 
        y={cy + 32} 
        dy={8} 
        textAnchor="middle" 
        fill="#888888"
        className="text-xs"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    </g>
  );
};

interface CustomPieTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      name: string;
      value: number;
      percent: number;
      description?: string;
    };
  }>;
}

const CustomPieTooltip: React.FC<CustomPieTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip bg-flow-background/90 border border-flow-border/50 p-3 rounded-md shadow-lg backdrop-blur-sm">
        <p className="font-semibold text-sm mb-1">{data.name}</p>
        <p className="text-xs font-mono flex items-center justify-between gap-4">
          <span>Value:</span> 
          <span className="font-semibold">{data.value}</span>
        </p>
        <p className="text-xs font-mono flex items-center justify-between gap-4">
          <span>Percentage:</span> 
          <span className="font-semibold">{`${(data.percent * 100).toFixed(1)}%`}</span>
        </p>
        {data.description && (
          <p className="text-xs mt-2 text-flow-foreground/70 max-w-[200px]">{data.description}</p>
        )}
      </div>
    );
  }
  return null;
};

interface EnhancedPieChartProps {
  data?: any[];
  colors?: string[];
  innerRadius?: number;
  outerRadius?: number;
  height?: number;
  showLegend?: boolean;
  legendPosition?: 'top' | 'right' | 'bottom' | 'left';
  dataKey?: string;
  nameKey?: string;
  interactive?: boolean;
  paddingAngle?: number;
  donut?: boolean;
  gradient?: boolean;
  onClick?: (data: any, index: number) => void;
}

export const PieChart: React.FC<EnhancedPieChartProps> = ({ 
  data = sampleData, 
  colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#D946EF', '#F97316', '#0EA5E9', '#22C55E'],
  innerRadius = 0,
  outerRadius = 80,
  height = 250,
  showLegend = true,
  legendPosition = 'bottom',
  dataKey = "value",
  nameKey = "name",
  interactive = false,
  paddingAngle = 2,
  donut = false,
  gradient = false,
  onClick,
  ...props 
}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const effectiveInnerRadius = donut ? outerRadius * 0.65 : innerRadius;
  
  const onPieEnter = (_: any, index: number) => {
    if (interactive) {
      setActiveIndex(index);
    }
  };

  const handleClick = (data: any, index: number) => {
    if (onClick) {
      onClick(data, index);
    }
  };

  const dataWithPercentages = React.useMemo(() => {
    const total = data.reduce((sum, entry) => sum + entry[dataKey], 0);
    return data.map(entry => ({
      ...entry,
      percent: entry[dataKey] / total
    }));
  }, [data, dataKey]);

  const gradientIds = React.useMemo(() => {
    if (!gradient) return null;
    return colors.map((color, index) => `pieGradient-${index}-${color.replace('#', '')}`);
  }, [colors, gradient]);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        {gradient && (
          <defs>
            {colors.map((color, index) => (
              <linearGradient key={index} id={gradientIds![index]} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={1} />
                <stop offset="100%" stopColor={color} stopOpacity={0.8} />
              </linearGradient>
            ))}
          </defs>
        )}
        <Pie
          data={dataWithPercentages}
          cx="50%"
          cy="50%"
          labelLine={!interactive}
          activeIndex={interactive ? activeIndex : undefined}
          activeShape={interactive ? renderActiveShape : undefined}
          innerRadius={effectiveInnerRadius}
          outerRadius={outerRadius}
          paddingAngle={paddingAngle}
          dataKey={dataKey}
          nameKey={nameKey}
          onMouseEnter={onPieEnter}
          onClick={handleClick}
          label={!interactive ? ({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)` : undefined}
          stroke="#00000022"
          strokeWidth={1}
          isAnimationActive={true}
          animationBegin={0}
          animationDuration={1200}
          animationEasing="ease-out"
        >
          {dataWithPercentages.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={gradient ? `url(#${gradientIds![index % colors.length]})` : colors[index % colors.length]} 
              strokeWidth={1}
              stroke="#00000022" 
              style={{ cursor: onClick ? 'pointer' : 'default' }}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomPieTooltip />} />
        {showLegend && (
          <Legend 
            layout={legendPosition === 'left' || legendPosition === 'right' ? 'vertical' : 'horizontal'}
            align={legendPosition === 'bottom' ? 'center' : legendPosition === 'right' ? 'right' : 'left'}
            verticalAlign={legendPosition === 'top' ? 'top' : legendPosition === 'bottom' ? 'bottom' : 'middle'}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ cursor: onClick ? 'pointer' : 'default' }}
            onClick={(data) => {
              if (onClick && data) {
                // Use a simpler approach to find the index
                const index = data.payload ? 
                  dataWithPercentages.findIndex(item => 
                    item[nameKey] === data.payload[nameKey]) : 0;
                onClick(data, index);
              }
            }}
          />
        )}
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};
