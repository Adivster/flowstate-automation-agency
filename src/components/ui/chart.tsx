
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
  Cell
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
  // Create a unique gradient ID based on the lineColor
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

export const PieChart = ({ data = sampleData, ...props }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
  return (
    <ResponsiveContainer width="100%" height={250}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};
