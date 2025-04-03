import React from "react";
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
  PieProps
} from "recharts";

// Sample data for testing
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

export const LineChart = ({ 
  data = sampleData, 
  lineColor = "#8884d8", 
  dotColor = "#ffffff",
  height = 250,
  ...props 
}) => {
  const gradientId = `line-gradient-${lineColor.replace('#', '')}`;
  
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={`${lineColor}90`} />
            <stop offset="100%" stopColor={lineColor} />
          </linearGradient>
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
        />
        <CartesianGrid 
          stroke="#33333330" 
          strokeDasharray="3 3" 
          vertical={false}
        />
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
        />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={`url(#${gradientId})`}
          strokeWidth={2.5}
          dot={{ 
            stroke: lineColor,
            strokeWidth: 2,
            r: 4,
            fill: dotColor
          }} 
          activeDot={{ 
            r: 6, 
            stroke: lineColor,
            strokeWidth: 2,
            fill: dotColor
          }} 
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

const renderActiveShape = (props) => {
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

const CustomPieTooltip = ({ active, payload }) => {
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
  ...props 
}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const effectiveInnerRadius = donut ? outerRadius * 0.65 : innerRadius;
  
  const onPieEnter = (_: any, index: number) => {
    if (interactive) {
      setActiveIndex(index);
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
          label={!interactive ? ({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)` : undefined}
          stroke="#00000022"
          strokeWidth={1}
        >
          {dataWithPercentages.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={gradient ? `url(#${gradientIds![index % colors.length]})` : colors[index % colors.length]} 
              strokeWidth={1}
              stroke="#00000022" 
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
          />
        )}
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};
